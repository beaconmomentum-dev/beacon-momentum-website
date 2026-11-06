import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import type { Express, Request, Response } from "express";
import { ENV } from "../_core/env";

const COMMUNITY_BRIDGE_URL = "https://beaconcommunity.net/api/watch/checkout-session";
const CHECKOUT_HOST = "checkout.stripe.com";
const REQUEST_TIMEOUT_MS = 15_000;
const ATTEMPT_COOKIE = "watch_checkout_attempt";

function setRedirectSafetyHeaders(res: Response) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
}

function unavailable(res: Response) {
  setRedirectSafetyHeaders(res);
  res.status(503).type("html").send(
    "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Secure enrollment unavailable</title><body style=\"font:16px system-ui;max-width:40rem;margin:12vh auto;padding:0 1.25rem;line-height:1.6;color:#162433\"><h1>Secure enrollment is temporarily unavailable</h1><p>No payment was taken. Please try again shortly or contact <a href=\"mailto:support@beaconmomentum.com\">support@beaconmomentum.com</a>.</p><p><a href=\"https://beaconmomentum.com/the-watch/\">Return to The Watch</a></p></body></html>",
  );
}

function safeCheckoutUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== CHECKOUT_HOST || url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function attemptCookieValue(requestId: string, secret: string): string {
  const signature = createHmac("sha256", secret).update(requestId).digest("hex");
  return `${requestId}.${signature}`;
}

function requestIdFromCookie(cookieHeader: string | undefined, secret: string): string | null {
  const entry = cookieHeader?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${ATTEMPT_COOKIE}=`));
  const value = entry?.slice(ATTEMPT_COOKIE.length + 1) ?? "";
  const match = /^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.([0-9a-f]{64})$/i.exec(value);
  if (!match) return null;
  const expected = createHmac("sha256", secret).update(match[1]).digest();
  const supplied = Buffer.from(match[2], "hex");
  return supplied.length === expected.length && timingSafeEqual(supplied, expected) ? match[1] : null;
}

export function createWatchCheckoutSessionHandler(options: {
  enabled: boolean;
  bridgeUrl: string;
  bridgeSecret: string;
  fetchImpl?: typeof fetch;
  now?: () => number;
  requestIdFactory?: () => string;
}) {
  return async (req: Request, res: Response) => {
    if (
      !options.enabled ||
      options.bridgeUrl !== COMMUNITY_BRIDGE_URL ||
      options.bridgeSecret.length < 32
    ) {
      unavailable(res);
      return;
    }

    setRedirectSafetyHeaders(res);
    const requestId = requestIdFromCookie(req.headers?.cookie, options.bridgeSecret) ??
      (options.requestIdFactory ?? randomUUID)();
    const cookie = attemptCookieValue(requestId, options.bridgeSecret);
    res.setHeader(
      "Set-Cookie",
      `${ATTEMPT_COOKIE}=${cookie}; Path=/the-watch/checkout; Max-Age=3600; HttpOnly; Secure; SameSite=Lax`,
    );
    const body = JSON.stringify({ requestId });
    const timestamp = String(Math.floor((options.now?.() ?? Date.now()) / 1000));
    const signature = createHmac("sha256", options.bridgeSecret)
      .update(`${timestamp}.${body}`)
      .digest("hex");

    try {
      const response = await (options.fetchImpl ?? fetch)(options.bridgeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Watch-Checkout-Timestamp": timestamp,
          "X-Watch-Checkout-Signature": signature,
        },
        body,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        redirect: "manual",
      });
      if (!response.ok) {
        console.warn("[Watch checkout bridge] Community did not create a Checkout Session", { status: response.status });
        unavailable(res);
        return;
      }
      const payload: unknown = await response.json();
      const destination = payload && typeof payload === "object"
        ? safeCheckoutUrl((payload as { url?: unknown }).url)
        : null;
      if (!destination) {
        console.error("[Watch checkout bridge] Community response did not contain an approved Stripe Checkout URL");
        unavailable(res);
        return;
      }
      setRedirectSafetyHeaders(res);
      res.redirect(303, destination);
    } catch {
      console.error("[Watch checkout bridge] Community request failed; no customer details were transmitted");
      unavailable(res);
    }
  };
}

export function registerWatchPaymentLinkRoutes(app: Express) {
  const handler = createWatchCheckoutSessionHandler({
    enabled:
      ENV.isProduction &&
      ENV.watchCheckoutSessionsEnabled &&
      process.env.WATCH_BILLING_MODE === "LIVE",
    bridgeUrl: ENV.watchCheckoutBridgeUrl,
    bridgeSecret: ENV.watchCheckoutBridgeSecret,
  });
  app.get("/the-watch/checkout", handler);
  // Old enrollment-request URLs now enter the same single-step hosted Checkout path.
  app.get("/the-watch/intake", (_req, res) => res.redirect(303, "/the-watch/checkout"));
}

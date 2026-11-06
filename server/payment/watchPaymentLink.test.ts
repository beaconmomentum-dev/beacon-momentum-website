import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { Request, Response } from "express";
import { createWatchCheckoutSessionHandler } from "./watchPaymentLink";

const BRIDGE_URL = "https://beaconcommunity.net/api/watch/checkout-session";
const SECRET = "a-test-only-bridge-secret-with-at-least-32-bytes";
const REQUEST_ID = "550e8400-e29b-41d4-a716-446655440000";
const CHECKOUT_URL = "https://checkout.stripe.com/c/pay/cs_live_example";

function responseRecorder() {
  const result: { statusCode?: number; location?: string; body?: string; headers: Record<string, string> } = { headers: {} };
  const response = {
    setHeader(name: string, value: string) { result.headers[name] = value; return this; },
    status(code: number) { result.statusCode = code; return this; },
    type(_type: string) { return this; },
    send(body: string) { result.body = body; return this; },
    redirect(code: number, location: string) { result.statusCode = code; result.location = location; return this; },
  };
  return { result, response: response as unknown as Response };
}

function bridgeResponse(payload: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => payload } as Response;
}

describe("Watch Checkout Session bridge", () => {
  it("sends only a signed request ID and redirects directly to Stripe Checkout", async () => {
    const calls: Array<{ url: string | URL | Request; init?: RequestInit }> = [];
    const fetchImpl: typeof fetch = async (url, init) => {
      calls.push({ url, init });
      return bridgeResponse({ url: CHECKOUT_URL });
    };
    const handler = createWatchCheckoutSessionHandler({
      enabled: true,
      bridgeUrl: BRIDGE_URL,
      bridgeSecret: SECRET,
      fetchImpl,
      now: () => 1_800_000_000_000,
      requestIdFactory: () => REQUEST_ID,
    });
    const { result, response } = responseRecorder();

    await handler({ headers: {} } as Request, response);

    expect(result.statusCode).toBe(303);
    expect(result.location).toBe(CHECKOUT_URL);
    expect(result.headers["Cache-Control"]).toContain("no-store");
    expect(result.headers["Referrer-Policy"]).toBe("no-referrer");
    expect(result.headers["Set-Cookie"]).toContain("HttpOnly; Secure; SameSite=Lax");
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(BRIDGE_URL);
    expect(calls[0].init?.method).toBe("POST");
    expect(calls[0].init?.redirect).toBe("manual");
    expect(JSON.parse(String(calls[0].init?.body))).toEqual({ requestId: REQUEST_ID });
    expect(String(calls[0].init?.body)).not.toMatch(/email|name|customer|price/i);
    const headers = calls[0].init?.headers as Record<string, string>;
    const timestamp = headers["X-Watch-Checkout-Timestamp"];
    const signature = headers["X-Watch-Checkout-Signature"];
    const expected = createHmac("sha256", SECRET).update(`${timestamp}.${String(calls[0].init?.body)}`).digest("hex");
    expect(signature).toBe(expected);
  });

  it("reuses only a valid signed browser attempt cookie", async () => {
    const calls: Array<{ init?: RequestInit }> = [];
    const fetchImpl: typeof fetch = async (_url, init) => {
      calls.push({ init });
      return bridgeResponse({ url: CHECKOUT_URL });
    };
    const signature = createHmac("sha256", SECRET).update(REQUEST_ID).digest("hex");
    const freshId = "e9b1c9a9-b0de-4f7f-9c30-15a32e107242";
    const handler = createWatchCheckoutSessionHandler({ enabled: true, bridgeUrl: BRIDGE_URL, bridgeSecret: SECRET, fetchImpl, requestIdFactory: () => freshId });
    const { response } = responseRecorder();
    await handler({ headers: { cookie: `watch_checkout_attempt=${REQUEST_ID}.${signature}` } } as Request, response);
    expect(JSON.parse(String(calls[0].init?.body))).toEqual({ requestId: REQUEST_ID });
  });

  it("does not trust an altered attempt cookie", async () => {
    const calls: Array<{ init?: RequestInit }> = [];
    const fetchImpl: typeof fetch = async (_url, init) => {
      calls.push({ init });
      return bridgeResponse({ url: CHECKOUT_URL });
    };
    const freshId = "e9b1c9a9-b0de-4f7f-9c30-15a32e107242";
    const handler = createWatchCheckoutSessionHandler({ enabled: true, bridgeUrl: BRIDGE_URL, bridgeSecret: SECRET, fetchImpl, requestIdFactory: () => freshId });
    const { response } = responseRecorder();
    await handler({ headers: { cookie: `watch_checkout_attempt=${REQUEST_ID}.${"0".repeat(64)}` } } as Request, response);
    expect(JSON.parse(String(calls[0].init?.body))).toEqual({ requestId: freshId });
  });

  it("fails closed without contacting Community when the gate or secret is missing", async () => {
    let callCount = 0;
    const fetchImpl: typeof fetch = async () => { callCount += 1; return bridgeResponse({ url: CHECKOUT_URL }); };
    const handler = createWatchCheckoutSessionHandler({ enabled: false, bridgeUrl: BRIDGE_URL, bridgeSecret: "", fetchImpl });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(result.location).toBeUndefined();
    expect(callCount).toBe(0);
  });

  it("fails closed if the bridge URL is not the canonical Community endpoint", async () => {
    let callCount = 0;
    const fetchImpl: typeof fetch = async () => { callCount += 1; return bridgeResponse({ url: CHECKOUT_URL }); };
    const handler = createWatchCheckoutSessionHandler({ enabled: true, bridgeUrl: "https://attacker.example/checkout", bridgeSecret: SECRET, fetchImpl });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(callCount).toBe(0);
  });

  it("rejects upstream errors and never falls back to a Payment Link", async () => {
    const fetchImpl: typeof fetch = async () => bridgeResponse({ url: CHECKOUT_URL }, 503);
    const handler = createWatchCheckoutSessionHandler({ enabled: true, bridgeUrl: BRIDGE_URL, bridgeSecret: SECRET, fetchImpl });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(result.location).toBeUndefined();
  });

  it.each([
    "https://attacker.example/capture",
    "http://checkout.stripe.com/c/pay/cs_live_example",
    "https://checkout.stripe.com.attacker.example/c/pay/cs_live_example",
    "javascript:alert(1)",
  ])("rejects unsafe Checkout URL %s", async (url) => {
    const fetchImpl: typeof fetch = async () => bridgeResponse({ url });
    const handler = createWatchCheckoutSessionHandler({ enabled: true, bridgeUrl: BRIDGE_URL, bridgeSecret: SECRET, fetchImpl });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(result.location).toBeUndefined();
  });
});

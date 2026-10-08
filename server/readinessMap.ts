import type { Express, Request, Response } from "express";
import path from "path";
import { z } from "zod/v4";
import { ENV } from "./_core/env";
import {
  captureInputSchema,
  isAllowedOrigin,
  submitCaptureToGhl,
} from "./routers/capture";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;
const MAX_RATE_LIMIT_BUCKETS = 10_000;
const PDF_FILENAME = "beacon-readiness-map-worksheet-2026-10-02.pdf";

const requestSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  firstName: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((value) => value || undefined),
  /** Marketing consent is deliberately optional and defaults to false. */
  marketingConsent: z.boolean().optional().default(false),
  /** Browser-facing copy/version label. Server owns all CRM destinations. */
  consentVersion: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .optional()
    .default("readiness-map-v1"),
});

type ReadinessMapRequest = z.infer<typeof requestSchema>;

type RateLimitBucket = { count: number; resetAt: number };
const rateLimitBuckets = new Map<string, RateLimitBucket>();

export function isReadinessMapDeliveryDisabled(
  environment: NodeJS.ProcessEnv = process.env,
) {
  return environment.READINESS_MAP_STAGING_NO_DELIVERY === "1";
}

function consumeRateLimit(key: string, now: number): boolean {
  if (rateLimitBuckets.size > MAX_RATE_LIMIT_BUCKETS) {
    rateLimitBuckets.forEach((bucket, bucketKey) => {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(bucketKey);
    });
  }

  const existing = rateLimitBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }
  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  existing.count += 1;
  return true;
}

function clientIdentifier(req: Request): string {
  const forwarded = req.get("cf-connecting-ip") ?? req.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function publicError(res: Response, status: number, message: string) {
  res.status(status).json({
    ok: false,
    message,
  });
}

function productionPdfPath() {
  return ENV.isProduction
    ? path.resolve(import.meta.dirname, "public", "downloads", PDF_FILENAME)
    : path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "public",
        "downloads",
        PDF_FILENAME,
      );
}

/**
 * Registers the narrow Readiness Map request broker and the Beacon-owned download
 * route. The browser never sees CRM or email-provider credentials.
 */
export function registerReadinessMapRoutes(app: Express) {
  app.post("/api/readiness-map/request", async (req, res) => {
    if (!isAllowedOrigin(req.get("origin"))) {
      publicError(res, 403, "This request origin is not allowed.");
      return;
    }

    const parsed = requestSchema.safeParse(req.body);
    if (!parsed.success) {
      publicError(res, 400, "Check the email address and try again.");
      return;
    }

    const input = parsed.data;
    const rateLimitKey = `${clientIdentifier(req)}:readiness-map-request`;
    if (!consumeRateLimit(rateLimitKey, Date.now())) {
      publicError(res, 429, "Please wait a few minutes before trying again.");
      return;
    }

    if (isReadinessMapDeliveryDisabled()) {
      publicError(
        res,
        503,
        "The worksheet delivery test is not available in this private staging environment.",
      );
      return;
    }

    try {
      // Transactional delivery is a distinct CRM event and always occurs.
      await submitCaptureToGhl(
        captureInputSchema.parse({
          event: "readiness_map_delivery_requested",
          email: input.email,
          firstName: input.firstName,
          consentVersion: input.consentVersion,
        }),
      );
    } catch (error) {
      const reason = error instanceof Error ? error.message : "unknown";
      console.warn("[readiness-map] request failed", { reason });
      publicError(
        res,
        503,
        "The worksheet could not be sent right now. Please try again shortly or contact support@beaconmomentum.com.",
      );
      return;
    }

    // Optional updates are recorded only after an affirmative checkbox action.
    // Their recording must never block or retract the requested free delivery.
    if (input.marketingConsent) {
      try {
        await submitCaptureToGhl(
          captureInputSchema.parse({
            event: "readiness_map_marketing_consent_granted",
            email: input.email,
            firstName: input.firstName,
            consentVersion: input.consentVersion,
          }),
        );
      } catch (error) {
        const reason = error instanceof Error ? error.message : "unknown";
        console.warn("[readiness-map] optional consent record failed", {
          reason,
        });
      }
    }

    console.info("[readiness-map] delivery request accepted", {
      email: input.email.replace(/(.{2}).*(@.*)/, "$1***$2"),
      marketingConsent: input.marketingConsent,
    });
    res.status(202).json({ ok: true, downloadUrl: "/downloads/readiness-map" });
  });

  app.get("/downloads/readiness-map", (_req, res) => {
    res.set({
      "Cache-Control": "private, no-store",
      "Content-Disposition": 'attachment; filename="Beacon_Readiness_Map.pdf"',
      "X-Content-Type-Options": "nosniff",
    });
    res.sendFile(productionPdfPath(), (error) => {
      if (!error) return;
      console.error(
        "[readiness-map] controlled download failed",
        error.message,
      );
      const statusCode = (error as Error & { statusCode?: number }).statusCode;
      if (!res.headersSent)
        res.status(statusCode || 404).send("Download unavailable.");
    });
  });
}

export const readinessMapRequestSchema = requestSchema;
export { PDF_FILENAME };

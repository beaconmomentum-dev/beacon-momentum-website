/**
 * Beacon public-capture relay — candidate implementation.
 *
 * The browser may ask for a named public event, but it may not choose a CRM
 * location, tag, custom field, or API credential. This router maps a narrow
 * event allow-list to the verified Beacon Momentum HighLevel location.
 *
 * Deliberately excluded pending ownership and field-contract confirmation:
 * Contact, Digital Grandpa Library, and Watch Intake.
 */

import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { z } from "zod/v4";
import { ENV } from "../_core/env";
import { publicProcedure, router } from "../_core/trpc";

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const BEACON_MOMENTUM_LOCATION_ID = "vvhkYM6iySBVh5kOcFGM";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_EVENTS = 6;
const MAX_RATE_LIMIT_BUCKETS = 10_000;

const emailSchema = z.string().trim().toLowerCase().email().max(254);
const optionalFirstNameSchema = z
  .string()
  .trim()
  .max(80)
  .optional()
  .transform(value => value || undefined);

const commonCaptureFields = {
  email: emailSchema,
  firstName: optionalFirstNameSchema,
  /** Stable UI copy/version identifier, stored only as a receipt attribute. */
  consentVersion: z.string().trim().min(1).max(80).default("2026-07-26"),
};

export const captureInputSchema = z.discriminatedUnion("event", [
  z.object({
    ...commonCaptureFields,
    event: z.literal("newsletter_signup"),
    placement: z.enum(["home", "blog", "digital_grandpa"]).optional(),
  }),
  z.object({
    ...commonCaptureFields,
    event: z.literal("starter_pack_request"),
  }),
  z.object({
    ...commonCaptureFields,
    event: z.literal("pathfinder_result"),
    pillar: z.enum(["life", "work", "venture", "systems", "labs"]),
  }),
  z.object({
    ...commonCaptureFields,
    event: z.literal("watch_brief_premium_interest"),
  }),
  z.object({
    ...commonCaptureFields,
    event: z.literal("watch_join"),
  }),
]);

export type CaptureInput = z.infer<typeof captureInputSchema>;

type GhlCustomField = {
  id: string;
  field_value: string;
};

export type GhlUpsertPayload = {
  email: string;
  firstName?: string;
  locationId: string;
  source: string;
  tags: string[];
  customFields?: GhlCustomField[];
};

type GhlUpsertResponse = {
  succeeded?: boolean;
  /** HighLevel has returned this misspelling in older API responses. */
  succeded?: boolean;
  contact?: { id?: string };
};

type RelayOptions = {
  apiKey?: string;
  fetchImpl?: typeof fetch;
};

type CaptureFailureReason = "not_configured" | "upstream_rejected" | "upstream_unavailable";

class CaptureRelayError extends Error {
  constructor(readonly reason: CaptureFailureReason) {
    super(reason);
  }
}

/**
 * The source and tags are intentionally derived here rather than accepted from
 * the browser. New public form types require an explicit code review addition.
 */
export function buildGhlUpsertPayload(input: CaptureInput): GhlUpsertPayload {
  const payload: GhlUpsertPayload = {
    email: input.email,
    locationId: BEACON_MOMENTUM_LOCATION_ID,
    source: "beaconmomentum.com",
    tags: [],
  };

  if (input.firstName) payload.firstName = input.firstName;

  switch (input.event) {
    case "newsletter_signup":
      return {
        ...payload,
        source: "beaconmomentum.com/newsletter",
        tags: ["BM_Newsletter", "BM_Beacon_Brief"],
      };
    case "starter_pack_request":
      return {
        ...payload,
        source: "beaconmomentum.com/start",
        tags: ["BM_Starter_Pack", "BM_YouTube_Optin"],
      };
    case "pathfinder_result":
      return {
        ...payload,
        source: "beaconmomentum.com/assessment",
        tags: ["BM_Pathfinder", `BM_Path_${input.pillar.charAt(0).toUpperCase()}${input.pillar.slice(1)}`],
        customFields: [
          {
            id: "4KG5TRT5jHFIv4rO7bqg",
            field_value: input.pillar,
          },
        ],
      };
    case "watch_brief_premium_interest":
      return {
        ...payload,
        source: "beaconmomentum.com/watch-brief-premium",
        tags: ["BM_Watch_Brief_Premium_Interest"],
      };
    case "watch_join":
      return {
        ...payload,
        source: "beaconmomentum.com/the-watch",
        tags: ["BM_Watch_Join", "BM_Watch_Sentinel", "BM_Community"],
      };
  }
}

/**
 * Performs a server-only HighLevel upsert. It intentionally returns no upstream
 * response body or contact data to public callers.
 */
export async function submitCaptureToGhl(
  input: CaptureInput,
  options: RelayOptions = {},
): Promise<void> {
  const apiKey = options.apiKey ?? ENV.ghlApiKey;
  const fetchImpl = options.fetchImpl ?? fetch;

  if (!apiKey) {
    throw new CaptureRelayError("not_configured");
  }

  let response: Response;
  try {
    response = await fetchImpl(`${GHL_BASE_URL}/contacts/upsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(buildGhlUpsertPayload(input)),
    });
  } catch {
    throw new CaptureRelayError("upstream_unavailable");
  }

  if (!response.ok) {
    if (response.status === 429 || response.status >= 500) {
      throw new CaptureRelayError("upstream_unavailable");
    }
    throw new CaptureRelayError("upstream_rejected");
  }

  const body = (await response.json().catch(() => null)) as GhlUpsertResponse | null;
  if (!body || (body.succeeded !== true && body.succeded !== true)) {
    throw new CaptureRelayError("upstream_rejected");
  }
}

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();

function consumeRateLimit(key: string, now: number): boolean {
  if (rateLimitBuckets.size > MAX_RATE_LIMIT_BUCKETS) {
    rateLimitBuckets.forEach((bucket, bucketKey) => {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(bucketKey);
    });
  }

  const existing = rateLimitBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (existing.count >= RATE_LIMIT_MAX_EVENTS) return false;
  existing.count += 1;
  return true;
}

function clientIdentifier(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers["cf-connecting-ip"] ?? headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(",")[0]?.trim() || "unknown";
}

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  const productionOrigins = new Set([
    "https://beaconmomentum.com",
    "https://www.beaconmomentum.com",
    "https://digitalgrandpa.org",
    "https://www.digitalgrandpa.org",
  ]);
  if (productionOrigins.has(origin)) return true;
  return !ENV.isProduction && /^http:\/\/localhost(?::\d+)?$/.test(origin);
}

function publicCaptureError(reason: CaptureFailureReason, requestId: string): TRPCError {
  const code = reason === "upstream_rejected" ? "BAD_REQUEST" : "SERVICE_UNAVAILABLE";
  return new TRPCError({
    code,
    message: `We could not receive that request right now. Please try again later. Reference: ${requestId}`,
  });
}

export const captureRouter = router({
  submit: publicProcedure.input(captureInputSchema).mutation(async ({ input, ctx }) => {
    const requestId = randomUUID();
    const origin = ctx.req.get("origin");
    if (!isAllowedOrigin(origin)) {
      console.warn("[capture] rejected disallowed origin", { requestId, event: input.event });
      throw new TRPCError({ code: "FORBIDDEN", message: "This request origin is not allowed." });
    }

    const rateLimitKey = `${clientIdentifier(ctx.req.headers)}:${input.event}`;
    if (!consumeRateLimit(rateLimitKey, Date.now())) {
      console.warn("[capture] rejected rate-limited request", { requestId, event: input.event });
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Please wait a few minutes before trying again.",
      });
    }

    try {
      await submitCaptureToGhl(input);
      console.info("[capture] accepted", { requestId, event: input.event, consentVersion: input.consentVersion });
      return { success: true, requestId };
    } catch (error) {
      const reason = error instanceof CaptureRelayError ? error.reason : "upstream_unavailable";
      console.warn("[capture] upstream delivery failed", { requestId, event: input.event, reason });
      throw publicCaptureError(reason, requestId);
    }
  }),
});

import { describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import {
  createWatchPaymentLinkHandler,
  isWatchCheckoutEnabled,
  selectWatchTier,
} from "./watchPaymentLink";

const CLAIM_SENT_URL = "https://beaconcommunity.net/watch/claim-sent";
const FOUNDING_URL = "https://buy.stripe.com/founding-example";
const STANDARD_URL = "https://buy.stripe.com/standard-example";

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

function mockStripeReader(options: { count: number; foundingActive: boolean; standardActive: boolean; livemode: boolean }) {
  const links = {
    founding: {
      id: "plink_founder",
      active: options.foundingActive,
      livemode: options.livemode,
      url: FOUNDING_URL,
      after_completion: { type: "redirect", redirect: { url: CLAIM_SENT_URL } },
      consent_collection: { terms_of_service: "required" },
      payment_method_types: ["card"],
      allow_promotion_codes: false,
      subscription_data: { trial_period_days: 0 },
      restrictions: { completed_sessions: { limit: 1000, count: options.count } },
    },
    standard: {
      id: "plink_standard",
      active: options.standardActive,
      livemode: options.livemode,
      url: STANDARD_URL,
      after_completion: { type: "redirect", redirect: { url: CLAIM_SENT_URL } },
      consent_collection: { terms_of_service: "required" },
      payment_method_types: ["card"],
      allow_promotion_codes: false,
      subscription_data: { trial_period_days: 0 },
    },
  };
  return {
    paymentLinks: {
      retrieve: vi.fn(async (id: string) => id === "plink_founder" ? links.founding : links.standard),
      listLineItems: vi.fn(async (id: string) => ({
        data: [{ price: id === "plink_founder" ? "price_founder" : "price_standard", quantity: 1, adjustable_quantity: { enabled: false } }],
        has_more: false,
      })),
    },
    prices: {
      retrieve: vi.fn(async (id: string) => ({
        id,
        active: true,
        currency: "usd",
        unit_amount: id === "price_founder" ? 49_700 : 99_700,
        recurring: { interval: "year", interval_count: 1 },
      })),
    },
  };
}

const baseOptions = {
  enabled: true,
  expectedLiveMode: true,
  secretKey: "sk_test_placeholder_not_used_by_mock",
  foundingLinkId: "plink_founder",
  foundingPriceId: "price_founder",
  standardLinkId: "plink_standard",
  standardPriceId: "price_standard",
};

describe("Watch price-tier routing", () => {
  it("keeps the founding price while 999 completed paid checkouts are recorded, so the next is the 1,000th", () => {
    expect(selectWatchTier({ foundingActive: true, foundingCompletedCount: 999, standardActive: true })).toBe("founding");
  });

  it("routes checkout to standard once 1,000 completed paid sessions are reached", () => {
    expect(selectWatchTier({ foundingActive: false, foundingCompletedCount: 1000, standardActive: true })).toBe("standard");
  });

  it("never offers the founding rate at or above the cap and fails closed on invalid counts", () => {
    expect(selectWatchTier({ foundingActive: true, foundingCompletedCount: 1000, standardActive: true })).toBe("standard");
    expect(selectWatchTier({ foundingActive: false, foundingCompletedCount: 1001, standardActive: true })).toBe("standard");
    expect(selectWatchTier({ foundingActive: true, foundingCompletedCount: -1, standardActive: true })).toBeNull();
    expect(selectWatchTier({ foundingActive: true, foundingCompletedCount: 2.5, standardActive: true })).toBeNull();
    expect(selectWatchTier({ foundingActive: false, foundingCompletedCount: 1000, standardActive: false })).toBeNull();
  });

  it("routes only to the verified test-mode links when TEST mode is expected", async () => {
    const stripe = mockStripeReader({ count: 999, foundingActive: true, standardActive: true, livemode: false });
    const factory = vi.fn(() => stripe as never);
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, expectedLiveMode: false, stripeFactory: factory });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(303);
    expect(result.location).toBe(FOUNDING_URL);
    expect(result.headers["Cache-Control"]).toContain("no-store");
    expect(result.headers["Referrer-Policy"]).toBe("no-referrer");
    expect(factory).toHaveBeenCalledWith(baseOptions.secretKey);
  });

  it("rejects a live link when TEST mode is expected", async () => {
    const stripe = mockStripeReader({ count: 999, foundingActive: true, standardActive: true, livemode: true });
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, expectedLiveMode: false, stripeFactory: () => stripe as never });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(result.location).toBeUndefined();
  });

  it("does not contact Stripe while the route is disabled", async () => {
    const factory = vi.fn();
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, enabled: false, stripeFactory: factory });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(factory).not.toHaveBeenCalled();
  });
});

describe("Watch checkout mode isolation", () => {
  it("allows TEST checkout only outside production when explicitly enabled", () => {
    expect(isWatchCheckoutEnabled({ billingMode: "TEST", isProduction: false, liveEnabled: false, testEnabled: true })).toBe(true);
    expect(isWatchCheckoutEnabled({ billingMode: "TEST", isProduction: true, liveEnabled: false, testEnabled: true })).toBe(false);
  });

  it("requires both LIVE gates and rejects unknown modes", () => {
    expect(isWatchCheckoutEnabled({ billingMode: "LIVE", isProduction: true, liveEnabled: true, testEnabled: false })).toBe(true);
    expect(isWatchCheckoutEnabled({ billingMode: "LIVE", isProduction: true, liveEnabled: false, testEnabled: true })).toBe(false);
    expect(isWatchCheckoutEnabled({ billingMode: "OTHER", isProduction: false, liveEnabled: true, testEnabled: true })).toBe(false);
  });
});

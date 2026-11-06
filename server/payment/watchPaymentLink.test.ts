import { describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import {
  createWatchPaymentLinkHandler,
  isWatchCheckoutEnabled,
  selectWatchTier,
} from "./watchPaymentLink";
const CLAIM_SENT_URL = "https://beaconcommunity.net/watch/claim-sent";
const TEST_CLAIM_SENT_URL = "http://127.0.0.1:3015/watch/claim-sent";
const FOUNDING_URL = "https://buy.stripe.com/founding-example";
const FINAL_FOUNDING_URL = "https://buy.stripe.com/final-founding-example";
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
function mockStripeReader(options: {
  foundingCount: number;
  finalFoundingCount: number;
  foundingActive?: boolean;
  finalFoundingActive?: boolean;
  standardActive?: boolean;
  livemode: boolean;
  claimSentUrl?: string;
  foundingLimit?: number;
  finalFoundingLimit?: number;
}) {
  const shared = {
    livemode: options.livemode,
    after_completion: {
      type: "redirect",
      redirect: { url: options.claimSentUrl ?? TEST_CLAIM_SENT_URL },
    },
    consent_collection: { terms_of_service: "required" },
    payment_method_types: ["card"],
    allow_promotion_codes: false,
    subscription_data: { trial_period_days: 0 },
  };
  const links = {
    founding: {
      ...shared, id: "plink_founder", active: options.foundingActive ?? true,
      url: FOUNDING_URL, priceId: "price_founder",
      restrictions: { completed_sessions: { limit: options.foundingLimit ?? 999, count: options.foundingCount } },
    },
    finalFounding: {
      ...shared, id: "plink_final_founder", active: options.finalFoundingActive ?? true,
      url: FINAL_FOUNDING_URL, priceId: "price_founder",
      restrictions: { completed_sessions: { limit: options.finalFoundingLimit ?? 1, count: options.finalFoundingCount } },
    },
    standard: {
      ...shared, id: "plink_standard", active: options.standardActive ?? true,
      url: STANDARD_URL, priceId: "price_standard",
    },
  };
  const allLinks = Object.values(links);
  const byId = new Map(allLinks.map((link) => [link.id, link]));
  return {
    paymentLinks: {
      retrieve: vi.fn(async (id: string) => byId.get(id)!),
      listLineItems: vi.fn(async (id: string) => {
        const link = byId.get(id)!;
        return { data: [{ price: link.priceId, quantity: 1, adjustable_quantity: { enabled: false } }], has_more: false };
      }),
    },
    prices: {
      retrieve: vi.fn(async (id: string) => ({
        id, active: true, currency: "usd",
        unit_amount: id === "price_founder" ? 49_700 : 99_700,
        recurring: { interval: "year", interval_count: 1 },
      })),
    },
  };
}
const baseOptions = {
  enabled: true,
  expectedLiveMode: false,
  secretKey: "sk_test_placeholder_not_used_by_mock",
  foundingLinkId: "plink_founder",
  finalFoundingLinkId: "plink_final_founder",
  foundingPriceId: "price_founder",
  standardLinkId: "plink_standard",
  standardPriceId: "price_standard",
  testClaimSentUrl: TEST_CLAIM_SENT_URL,
};
describe("Watch price-tier routing with a 999 + 1 Stripe cap", () => {
  it("uses the primary founder link until its 999 completed sessions are exhausted", () => {
    expect(selectWatchTier({ foundingActive: true, foundingCompletedCount: 998, finalFoundingActive: true, finalFoundingCompletedCount: 0, standardActive: true })).toBe("founding");
  });
  it("routes the 1,000th founder session through the separate one-session link", () => {
    expect(selectWatchTier({ foundingActive: false, foundingCompletedCount: 999, finalFoundingActive: true, finalFoundingCompletedCount: 0, standardActive: true })).toBe("final-founding");
  });
  it("preserves 1,000 founders if the one-session link is used before the primary link is full", () => {
    expect(selectWatchTier({ foundingActive: true, foundingCompletedCount: 998, finalFoundingActive: false, finalFoundingCompletedCount: 1, standardActive: true })).toBe("founding");
  });
  it("routes to standard only after the combined completed-session total reaches 1,000", () => {
    expect(selectWatchTier({ foundingActive: false, foundingCompletedCount: 999, finalFoundingActive: false, finalFoundingCompletedCount: 1, standardActive: true })).toBe("standard");
  });
  it("fails closed on invalid, over-cap, or unavailable states", () => {
    const base = { foundingActive: true, finalFoundingActive: true, standardActive: true };
    expect(selectWatchTier({ ...base, foundingCompletedCount: -1, finalFoundingCompletedCount: 0 })).toBeNull();
    expect(selectWatchTier({ ...base, foundingCompletedCount: 1.5, finalFoundingCompletedCount: 0 })).toBeNull();
    expect(selectWatchTier({ ...base, foundingCompletedCount: 1000, finalFoundingCompletedCount: 0 })).toBeNull();
    expect(selectWatchTier({ ...base, foundingCompletedCount: 999, finalFoundingCompletedCount: 2 })).toBeNull();
    expect(selectWatchTier({ ...base, foundingCompletedCount: 999, finalFoundingActive: false, finalFoundingCompletedCount: 0 })).toBeNull();
    expect(selectWatchTier({ ...base, foundingCompletedCount: 999, finalFoundingActive: true, finalFoundingCompletedCount: 1, standardActive: false })).toBeNull();
  });
  it("redirects to the separately capped final-founder link at the exact boundary", async () => {
    const stripe = mockStripeReader({ foundingCount: 999, finalFoundingCount: 0, livemode: false });
    const factory = vi.fn(() => stripe as never);
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, stripeFactory: factory });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(303);
    expect(result.location).toBe(FINAL_FOUNDING_URL);
    expect(result.headers["Cache-Control"]).toContain("no-store");
    expect(result.headers["Referrer-Policy"]).toBe("no-referrer");
    expect(factory).toHaveBeenCalledWith(baseOptions.secretKey);
  });
  it("redirects to the standard link only at 1,000 combined completed sessions", async () => {
    const stripe = mockStripeReader({ foundingCount: 999, finalFoundingCount: 1, livemode: false });
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, stripeFactory: () => stripe as never });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(303);
    expect(result.location).toBe(STANDARD_URL);
  });
  it("rejects a founding link whose Stripe cap is 1,000 instead of 999", async () => {
    const stripe = mockStripeReader({ foundingCount: 0, finalFoundingCount: 0, foundingLimit: 1000, livemode: false });
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, stripeFactory: () => stripe as never });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(result.location).toBeUndefined();
  });
  it("rejects a live Stripe link when TEST mode is expected", async () => {
    const stripe = mockStripeReader({ foundingCount: 0, finalFoundingCount: 0, livemode: true });
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, stripeFactory: () => stripe as never });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
  });
  it("accepts the isolated loopback claim-sent destination in TEST mode", async () => {
    const stripe = mockStripeReader({ foundingCount: 0, finalFoundingCount: 0, livemode: false });
    const handler = createWatchPaymentLinkHandler({ ...baseOptions, stripeFactory: () => stripe as never });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(303);
    expect(result.location).toBe(FOUNDING_URL);
  });
  it("fails closed when TEST return is not an explicit loopback URL", async () => {
    const factory = vi.fn();
    const handler = createWatchPaymentLinkHandler({
      ...baseOptions,
      testClaimSentUrl: "https://beaconcommunity.net/watch/claim-sent",
      stripeFactory: factory,
    });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
    expect(factory).not.toHaveBeenCalled();
  });
  it("keeps LIVE callback pinned to the canonical Community destination", async () => {
    const stripe = mockStripeReader({
      foundingCount: 0,
      finalFoundingCount: 0,
      livemode: true,
      claimSentUrl: CLAIM_SENT_URL,
    });
    const handler = createWatchPaymentLinkHandler({
      ...baseOptions,
      expectedLiveMode: true,
      testClaimSentUrl: TEST_CLAIM_SENT_URL,
      stripeFactory: () => stripe as never,
    });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(303);
    expect(result.location).toBe(FOUNDING_URL);
  });
  it("rejects a loopback callback on a LIVE Stripe link", async () => {
    const stripe = mockStripeReader({
      foundingCount: 0,
      finalFoundingCount: 0,
      livemode: true,
      claimSentUrl: TEST_CLAIM_SENT_URL,
    });
    const handler = createWatchPaymentLinkHandler({
      ...baseOptions,
      expectedLiveMode: true,
      testClaimSentUrl: TEST_CLAIM_SENT_URL,
      stripeFactory: () => stripe as never,
    });
    const { result, response } = responseRecorder();
    await handler({} as Request, response);
    expect(result.statusCode).toBe(503);
  });
  it("does not contact Stripe when checkout is disabled or the final-founder link is missing", async () => {
    const factory = vi.fn();
    const disabled = createWatchPaymentLinkHandler({ ...baseOptions, enabled: false, stripeFactory: factory });
    const missingFinal = createWatchPaymentLinkHandler({ ...baseOptions, finalFoundingLinkId: "", stripeFactory: factory });
    const a = responseRecorder(); const b = responseRecorder();
    await disabled({} as Request, a.response);
    await missingFinal({} as Request, b.response);
    expect(a.result.statusCode).toBe(503);
    expect(b.result.statusCode).toBe(503);
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

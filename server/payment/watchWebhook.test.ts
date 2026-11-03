import { describe, expect, it } from "vitest";
import type Stripe from "stripe";
import { isWatchSubscription } from "./watchWebhook";

const WATCH_PRICE_IDS = ["price_watch_founder", "price_watch_standard"] as const;

function subscription(priceId: string, offering = ""): Stripe.Subscription {
  return {
    metadata: offering ? { beacon_offering: offering } : {},
    items: { data: [{ price: { id: priceId } }] },
  } as unknown as Stripe.Subscription;
}

describe("Watch subscription price mapping", () => {
  it("recognizes the founding annual Price", () => {
    expect(isWatchSubscription(subscription(WATCH_PRICE_IDS[0]), WATCH_PRICE_IDS)).toBe(true);
  });

  it("recognizes the standard annual Price", () => {
    expect(isWatchSubscription(subscription(WATCH_PRICE_IDS[1]), WATCH_PRICE_IDS)).toBe(true);
  });

  it("does not classify an unrelated Price as Watch from metadata alone", () => {
    expect(isWatchSubscription(subscription("price_unrelated", "the_watch_founding_year_2026"), WATCH_PRICE_IDS)).toBe(false);
  });
});

import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { ENV } from "../_core/env";

const FOUNDING_PRIMARY_LIMIT = 999;
const FOUNDING_FINAL_LIMIT = 1;
const FOUNDING_LIMIT = 1_000;
const CLAIM_SENT_URL = "https://beaconcommunity.net/watch/claim-sent";
const FOUNDING_AMOUNT = 49_700;
const STANDARD_AMOUNT = 99_700;

type LinkTier = "founding" | "final-founding" | "standard";

interface LinkConfig {
  id: string;
  priceId: string;
  amount: number;
  tier: LinkTier;
}

interface StripeLinkReader {
  paymentLinks: Pick<Stripe["paymentLinks"], "retrieve" | "listLineItems">;
  prices: Pick<Stripe["prices"], "retrieve">;
}

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

function priceIdFromLineItem(item: { price: string | Stripe.Price | null }): string | null {
  if (!item.price) return null;
  return typeof item.price === "string" ? item.price : item.price.id;
}

async function verifyLink(
  stripe: StripeLinkReader,
  config: LinkConfig,
  expectedLiveMode: boolean,
): Promise<{ active: boolean; completedCount: number; url: string }> {
  const link = await stripe.paymentLinks.retrieve(config.id);
  if (link.livemode !== expectedLiveMode) throw new Error("wrong_mode");
  if (link.consent_collection?.terms_of_service !== "required") throw new Error("terms_not_required");
  if (link.payment_method_types?.length !== 1 || link.payment_method_types[0] !== "card") {
    throw new Error("payment_methods_not_card_only");
  }
  const discounts = (link as unknown as { discounts?: unknown[] }).discounts;
  if (link.allow_promotion_codes || (discounts?.length ?? 0) > 0) throw new Error("discounts_enabled");
  if ((link.subscription_data?.trial_period_days ?? 0) !== 0) throw new Error("trial_enabled");
  const completion = link.after_completion;
  if (completion.type !== "redirect" || !("redirect" in completion) || completion.redirect?.url !== CLAIM_SENT_URL) {
    throw new Error("unexpected_completion_destination");
  }

  const url = new URL(link.url);
  if (url.protocol !== "https:" || url.hostname !== "buy.stripe.com") throw new Error("unsafe_checkout_host");

  const lineItems = await stripe.paymentLinks.listLineItems(config.id, { limit: 2 });
  if (lineItems.data.length !== 1 || lineItems.has_more) throw new Error("unexpected_line_items");
  const item = lineItems.data[0];
  if (item.quantity !== 1 || item.adjustable_quantity?.enabled) throw new Error("quantity_not_fixed");
  if (priceIdFromLineItem(item) !== config.priceId) throw new Error("unexpected_price_id");

  const price = await stripe.prices.retrieve(config.priceId);
  if (
    !price.active ||
    price.currency !== "usd" ||
    price.unit_amount !== config.amount ||
    price.recurring?.interval !== "year" ||
    price.recurring.interval_count !== 1
  ) {
    throw new Error("price_terms_mismatch");
  }

  const completed = link.restrictions?.completed_sessions;
  if (config.tier === "founding" || config.tier === "final-founding") {
    const expectedLimit = config.tier === "founding" ? FOUNDING_PRIMARY_LIMIT : FOUNDING_FINAL_LIMIT;
    if (
      !completed ||
      completed.limit !== expectedLimit ||
      !Number.isInteger(completed.count) ||
      completed.count < 0 ||
      completed.count > expectedLimit
    ) {
      throw new Error("founding_cap_mismatch");
    }
  } else if (completed) {
    throw new Error("standard_link_must_not_have_founders_cap");
  }
  return { active: link.active, completedCount: completed?.count ?? 0, url: link.url };
}

export function selectWatchTier(input: {
  foundingActive: boolean;
  foundingCompletedCount: number;
  finalFoundingActive: boolean;
  finalFoundingCompletedCount: number;
  standardActive: boolean;
}): LinkTier | null {
  const { foundingCompletedCount, finalFoundingCompletedCount } = input;
  if (
    !Number.isInteger(foundingCompletedCount) ||
    foundingCompletedCount < 0 ||
    foundingCompletedCount > FOUNDING_PRIMARY_LIMIT ||
    !Number.isInteger(finalFoundingCompletedCount) ||
    finalFoundingCompletedCount < 0 ||
    finalFoundingCompletedCount > FOUNDING_FINAL_LIMIT
  ) return null;

  const totalFoundingSessions = foundingCompletedCount + finalFoundingCompletedCount;
  if (totalFoundingSessions >= FOUNDING_LIMIT) return input.standardActive ? "standard" : null;
  if (foundingCompletedCount < FOUNDING_PRIMARY_LIMIT) return input.foundingActive ? "founding" : null;
  return input.finalFoundingActive ? "final-founding" : null;
}
export function isWatchCheckoutEnabled(input: {
  billingMode: string | undefined;
  isProduction: boolean;
  liveEnabled: boolean;
  testEnabled: boolean;
}): boolean {
  if (input.billingMode === "LIVE") return input.liveEnabled;
  if (input.billingMode === "TEST") return !input.isProduction && input.testEnabled;
  return false;
}

export function createWatchPaymentLinkHandler(options: {
  enabled: boolean;
  expectedLiveMode: boolean;
  secretKey: string;
  foundingLinkId: string;
  finalFoundingLinkId: string;
  foundingPriceId: string;
  standardLinkId: string;
  standardPriceId: string;
  stripeFactory?: (secretKey: string) => StripeLinkReader;
}) {
  return async (_req: Request, res: Response) => {
    if (
      !options.enabled ||
      !options.secretKey ||
      !options.foundingLinkId ||
      !options.finalFoundingLinkId ||
      !options.foundingPriceId ||
      !options.standardLinkId ||
      !options.standardPriceId
    ) {
      unavailable(res);
      return;
    }

    try {
      const stripe = options.stripeFactory
        ? options.stripeFactory(options.secretKey)
        : new Stripe(options.secretKey);
      const [founding, finalFounding, standard] = await Promise.all([
        verifyLink(stripe, {
          id: options.foundingLinkId,
          priceId: options.foundingPriceId,
          amount: FOUNDING_AMOUNT,
          tier: "founding",
        }, options.expectedLiveMode),
        verifyLink(stripe, {
          id: options.finalFoundingLinkId,
          priceId: options.foundingPriceId,
          amount: FOUNDING_AMOUNT,
          tier: "final-founding",
        }, options.expectedLiveMode),
        verifyLink(stripe, {
          id: options.standardLinkId,
          priceId: options.standardPriceId,
          amount: STANDARD_AMOUNT,
          tier: "standard",
        }, options.expectedLiveMode),
      ]);
      const tier = selectWatchTier({
        foundingActive: founding.active,
        foundingCompletedCount: founding.completedCount,
        finalFoundingActive: finalFounding.active,
        finalFoundingCompletedCount: finalFounding.completedCount,
        standardActive: standard.active,
      });
      if (!tier) {
        console.error("[Watch direct checkout] Link state did not match the approved cohort transition", {
          foundingActive: founding.active,
          foundingCompletedCount: founding.completedCount,
          finalFoundingActive: finalFounding.active,
          finalFoundingCompletedCount: finalFounding.completedCount,
          standardActive: standard.active,
        });
        unavailable(res);
        return;
      }

      setRedirectSafetyHeaders(res);
      const destination = tier === "standard"
        ? standard.url
        : tier === "final-founding"
          ? finalFounding.url
          : founding.url;
      res.redirect(303, destination);
    } catch (error) {
      console.error("[Watch direct checkout] Stripe link validation failed", {
        reason: error instanceof Error ? error.message : "unknown",
      });
      unavailable(res);
    }
  };
}

export function registerWatchPaymentLinkRoutes(app: Express) {
  const mode = process.env.WATCH_BILLING_MODE;
  const isLive = mode === "LIVE";
  const isTest = mode === "TEST";
  const enabled = isWatchCheckoutEnabled({
    billingMode: mode,
    isProduction: ENV.isProduction,
    liveEnabled: ENV.watchDirectPaymentEnabled && ENV.watchLiveCheckoutEnabled,
    testEnabled: ENV.watchTestDirectPaymentEnabled,
  });
  const handler = createWatchPaymentLinkHandler({
    enabled,
    expectedLiveMode: isLive,
    secretKey: isTest ? ENV.stripeTestSecretKey : ENV.stripeSecretKey,
    foundingLinkId: isTest ? ENV.stripeTestWatchFoundingPaymentLinkId : ENV.stripeWatchFoundingPaymentLinkId,
    finalFoundingLinkId: isTest ? ENV.stripeTestWatchFinalFoundingPaymentLinkId : ENV.stripeWatchFinalFoundingPaymentLinkId,
    foundingPriceId: isTest ? ENV.stripeTestWatchAnnualPriceId : ENV.stripeWatchAnnualPriceId,
    standardLinkId: isTest ? ENV.stripeTestWatchStandardPaymentLinkId : ENV.stripeWatchStandardPaymentLinkId,
    standardPriceId: isTest ? ENV.stripeTestWatchStandardPriceId : ENV.stripeWatchStandardPriceId,
  });
  app.get("/the-watch/checkout", handler);
  // Old enrollment-request URLs now enter the single-step hosted Checkout path.
  app.get("/the-watch/intake", (_req, res) => res.redirect(303, "/the-watch/checkout"));
}

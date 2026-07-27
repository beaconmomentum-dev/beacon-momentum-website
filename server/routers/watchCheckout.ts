/**
 * Beacon Momentum — The Watch on-site enrollment
 *
 * Customer-facing card entry is rendered through Stripe Elements on Beacon's
 * domain. The client never receives a Stripe secret key or a server-selected
 * price identifier. Stripe remains the processor and source of billing truth.
 */
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod/v4";
import { ENV } from "../_core/env";
import { publicProcedure, router } from "../_core/trpc";

const OFFERING_KEY = "the_watch_founding_year_2026";
type BillingMode = "live" | "test";

interface WatchCheckoutConfig {
  mode: BillingMode;
  secretKey: string;
  publishableKey: string;
  priceId: string;
  webhookSecret: string;
  enrollmentSource: string;
}

function getStripeClient(config: WatchCheckoutConfig) {
  if (!config.secretKey) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "The Watch enrollment is not configured yet. Please contact support@beaconmomentum.com.",
    });
  }
  return new Stripe(config.secretKey);
}

function getPriceId(config: WatchCheckoutConfig) {
  if (!config.priceId) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "The Watch enrollment is not configured yet. Please contact support@beaconmomentum.com.",
    });
  }
  return config.priceId;
}

async function verifyFoundingYearPrice(stripe: Stripe, priceId: string) {
  const price = await stripe.prices.retrieve(priceId);
  const isExpectedAnnualPrice =
    price.active &&
    price.currency.toLowerCase() === "usd" &&
    price.unit_amount === 49_700 &&
    price.recurring?.interval === "year" &&
    price.recurring.interval_count === 1;

  if (!isExpectedAnnualPrice) {
    console.error("[Watch checkout] Configured price did not match the approved Founding Year annual terms", {
      priceId: price.id,
      active: price.active,
      currency: price.currency,
      unitAmount: price.unit_amount,
      recurringInterval: price.recurring?.interval ?? null,
      recurringIntervalCount: price.recurring?.interval_count ?? null,
    });
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "The Watch enrollment is not configured yet. Please contact support@beaconmomentum.com.",
    });
  }

  return price;
}

function getStripeCustomerId(customer: Stripe.Customer | Stripe.DeletedCustomer) {
  if (customer.deleted) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Please contact support@beaconmomentum.com to complete enrollment." });
  }
  return customer.id;
}

function createWatchCheckoutRouter(config: WatchCheckoutConfig) {
  return router({
  /** A publishable key is safe to expose; secrets and price IDs never leave the server. */
  publicConfig: publicProcedure.query(() => ({
    ready: Boolean(
      config.publishableKey &&
        config.secretKey &&
        config.priceId &&
        config.webhookSecret
    ),
    publishableKey: config.publishableKey || null,
    priceLabel: "$497 USD / year",
  })),

  /**
   * Creates an incomplete annual subscription and returns only the invoice
   * PaymentIntent client secret needed by Stripe Elements to collect card data.
   */
  createSubscription: publicProcedure
    .input(
      z.object({
        email: z.string().trim().email().max(320),
        name: z.string().trim().min(1).max(128),
        termsAccepted: z.literal(true),
        checkoutAttemptId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const stripe = getStripeClient(config);
      const priceId = getPriceId(config);

      try {
        await verifyFoundingYearPrice(stripe, priceId);
        const matchingCustomers = await stripe.customers.list({ email: input.email, limit: 1 });
        const customer = matchingCustomers.data[0]
          ? matchingCustomers.data[0]
          : await stripe.customers.create({
              email: input.email,
              name: input.name,
              metadata: {
                beacon_offering: OFFERING_KEY,
                billing_mode: config.mode,
                enrollment_source: config.enrollmentSource,
              },
            });

        const subscription = await stripe.subscriptions.create(
          {
            customer: getStripeCustomerId(customer),
            collection_method: "charge_automatically",
            items: [{ price: priceId }],
            payment_behavior: "default_incomplete",
            payment_settings: { save_default_payment_method: "on_subscription" },
            metadata: {
              beacon_offering: OFFERING_KEY,
              founding_year: "2026",
              billing_mode: config.mode,
              enrollment_source: config.enrollmentSource,
            },
            expand: ["latest_invoice.confirmation_secret"],
          },
          { idempotencyKey: `watch-${config.mode}-enrollment-${input.checkoutAttemptId}` }
        );

        const invoice =
          typeof subscription.latest_invoice === "string"
            ? await stripe.invoices.retrieve(subscription.latest_invoice, { expand: ["confirmation_secret"] })
            : subscription.latest_invoice;
        const clientSecret = invoice && typeof invoice !== "string" ? invoice.confirmation_secret?.client_secret : null;

        if (!clientSecret) {
          console.error("[Watch checkout] Stripe did not return an invoice confirmation secret", {
            subscriptionId: subscription.id,
          });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "We could not prepare secure payment entry. Please try again or contact support@beaconmomentum.com.",
          });
        }

        return {
          clientSecret,
          subscriptionId: subscription.id,
          customerId: getStripeCustomerId(customer),
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Watch checkout] Subscription preparation failed", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "We could not prepare secure payment entry. Please try again or contact support@beaconmomentum.com.",
        });
      }
    }),
  });
}

export const watchCheckoutRouter = createWatchCheckoutRouter({
  mode: "live",
  secretKey: ENV.stripeSecretKey,
  publishableKey: ENV.stripePublishableKey,
  priceId: ENV.stripeWatchAnnualPriceId,
  webhookSecret: ENV.stripeWatchWebhookSecret,
  enrollmentSource: "beaconmomentum.com/the-watch",
});

/**
 * Internal-only Stripe test namespace. It is intentionally not mounted on the
 * customer-facing enrollment path and can only point to test-mode credentials.
 */
export const watchTestCheckoutRouter = createWatchCheckoutRouter({
  mode: "test",
  secretKey: ENV.stripeTestSecretKey,
  publishableKey: ENV.stripeTestPublishableKey,
  priceId: ENV.stripeTestWatchAnnualPriceId,
  webhookSecret: ENV.stripeTestWatchWebhookSecret,
  enrollmentSource: "beaconmomentum.com/_ops/the-watch/test-checkout",
});

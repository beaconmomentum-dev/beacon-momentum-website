/**
 * One-time voluntary support stays on Beacon-controlled routes. Stripe is the
 * processor and billing record; this server never handles card details and
 * exposes neither a secret key nor a processor-selected amount to the browser.
 */
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod/v4";
import { ENV } from "../_core/env";
import { publicProcedure, router } from "../_core/trpc";
import {
  FOUNDATION_SUPPORT_MAX_CENTS,
  FOUNDATION_SUPPORT_MIN_CENTS,
  foundationSupportAmountMessage,
  isValidFoundationSupportAmount,
} from "../payment/foundationSupportPolicy";

const OFFERING_KEY = "foundation_year_voluntary_support_2026";

function unavailable() {
  return new TRPCError({ code: "PRECONDITION_FAILED", message: "Foundation Year support is not accepting payments at this time. Please contact support@beaconmomentum.com." });
}

function stripeClient() {
  if (!ENV.stripeSecretKey || !ENV.stripePublishableKey || !ENV.stripeWatchWebhookSecret) throw unavailable();
  return new Stripe(ENV.stripeSecretKey);
}

export const foundationSupportRouter = router({
  publicConfig: publicProcedure.query(() => ({
    ready: Boolean(ENV.stripeSecretKey && ENV.stripePublishableKey && ENV.stripeWatchWebhookSecret),
    publishableKey: ENV.stripePublishableKey || null,
    minimumAmountCents: FOUNDATION_SUPPORT_MIN_CENTS,
    maximumAmountCents: FOUNDATION_SUPPORT_MAX_CENTS,
  })),

  createPaymentIntent: publicProcedure.input(z.object({
    name: z.string().trim().min(1).max(128),
    email: z.string().trim().email().max(320),
    amountCents: z.number().int(),
    boundaryAccepted: z.literal(true),
    supportAttemptId: z.string().uuid(),
  })).mutation(async ({ input }) => {
    if (!isValidFoundationSupportAmount(input.amountCents)) {
      throw new TRPCError({ code: "BAD_REQUEST", message: foundationSupportAmountMessage() });
    }

    try {
      const paymentIntent = await stripeClient().paymentIntents.create({
        amount: input.amountCents,
        currency: "usd",
        receipt_email: input.email,
        description: "Beacon Momentum Foundation Year voluntary support",
        automatic_payment_methods: { enabled: true, allow_redirects: "never" },
        metadata: {
          beacon_offering: OFFERING_KEY,
          support_boundary: "voluntary_support_no_membership_or_return",
          supporter_name: input.name,
          support_attempt_id: input.supportAttemptId,
        },
      }, { idempotencyKey: `foundation-year-support-${input.supportAttemptId}` });

      if (!paymentIntent.client_secret) throw new Error("Stripe did not return a client secret for Foundation Year support.");
      return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      console.error("[Foundation Year support] PaymentIntent preparation failed", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "We could not prepare secure payment entry. Please try again or contact support@beaconmomentum.com." });
    }
  }),
});

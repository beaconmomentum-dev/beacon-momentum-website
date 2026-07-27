/**
 * Stripe webhook boundary for The Watch.
 *
 * This route verifies the signed raw body before updating the durable Watch
 * enrollment state. Stripe remains the only billing source of truth; repeated
 * delivery is safe because records are uniquely keyed by subscription ID.
 */
import type { Express, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { ENV } from "../_core/env";
import { updateWatchEnrollmentStatus, upsertWatchEnrollment } from "../db";

const OFFERING_KEY = "the_watch_founding_year_2026";

function stripeObjectId(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const legacyInvoice = invoice as Stripe.Invoice & {
    subscription?: string | Stripe.Subscription | null;
    parent?: { subscription_details?: { subscription?: string | Stripe.Subscription | null } | null } | null;
  };
  return (
    stripeObjectId(legacyInvoice.subscription) ??
    stripeObjectId(legacyInvoice.parent?.subscription_details?.subscription) ??
    null
  );
}

function getRenewsAt(subscription: Stripe.Subscription): Date | null {
  const periodEnd = subscription.items.data.reduce(
    (latest, item) => Math.max(latest, item.current_period_end ?? 0),
    0
  );
  return periodEnd > 0 ? new Date(periodEnd * 1000) : null;
}

function isWatchSubscription(subscription: Stripe.Subscription): boolean {
  return (
    subscription.metadata.beacon_offering === OFFERING_KEY ||
    subscription.items.data.some((item) => item.price.id === ENV.stripeWatchAnnualPriceId)
  );
}

function mapSubscriptionStatus(status: Stripe.Subscription.Status): "active" | "past_due" | "cancelled" | "pending" {
  if (status === "active" || status === "trialing") return "active";
  if (status === "past_due" || status === "unpaid") return "past_due";
  if (status === "canceled" || status === "incomplete_expired") return "cancelled";
  return "pending";
}

function logWatchBillingEvent(event: Stripe.Event) {
  const object = event.data.object as { id?: string; status?: string };
  console.info(
    JSON.stringify({
      system: "the-watch-stripe",
      eventId: event.id,
      eventType: event.type,
      objectId: object.id ?? null,
      status: object.status ?? null,
      createdAt: new Date(event.created * 1000).toISOString(),
    })
  );
}

export function registerWatchStripeWebhook(app: Express) {
  app.post("/api/the-watch/stripe-webhook", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
    if (!ENV.stripeSecretKey || !ENV.stripeWatchWebhookSecret) {
      res.status(503).json({ received: false, message: "Webhook is not configured." });
      return;
    }

    const signature = req.header("stripe-signature");
    if (!signature || !Buffer.isBuffer(req.body)) {
      res.status(400).json({ received: false, message: "Missing Stripe signature or raw request body." });
      return;
    }

    let event: Stripe.Event;
    try {
      const stripe = new Stripe(ENV.stripeSecretKey);
      event = stripe.webhooks.constructEvent(req.body, signature, ENV.stripeWatchWebhookSecret);
    } catch (error) {
      console.error("[Watch webhook] Signature verification failed", error);
      res.status(400).json({ received: false });
      return;
    }

    try {
      const stripe = new Stripe(ENV.stripeSecretKey);

      switch (event.type) {
        case "invoice.paid": {
          const invoice = event.data.object as Stripe.Invoice;
          const subscriptionId = invoiceSubscriptionId(invoice);
          if (!subscriptionId) break;

          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          if (!isWatchSubscription(subscription)) break;

          const customer = await stripe.customers.retrieve(stripeObjectId(subscription.customer) ?? "");
          if (customer.deleted || !customer.email) {
            throw new Error(`Watch subscription ${subscription.id} has no usable customer email.`);
          }

          await upsertWatchEnrollment({
            email: customer.email,
            firstName: customer.name?.trim().split(/\s+/)[0] ?? null,
            stripeCustomerId: customer.id,
            stripeSubscriptionId: subscription.id,
            enrollmentStatus: "active",
            paidAt: new Date(event.created * 1000),
            renewsAt: getRenewsAt(subscription),
          });
          logWatchBillingEvent(event);
          break;
        }
        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          const subscriptionId = invoiceSubscriptionId(invoice);
          if (!subscriptionId) break;

          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          if (!isWatchSubscription(subscription)) break;
          await updateWatchEnrollmentStatus(subscription.id, "past_due", getRenewsAt(subscription));
          logWatchBillingEvent(event);
          break;
        }
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          if (!isWatchSubscription(subscription)) break;
          await updateWatchEnrollmentStatus(subscription.id, mapSubscriptionStatus(subscription.status), getRenewsAt(subscription));
          logWatchBillingEvent(event);
          break;
        }
        default:
          // Acknowledge unrelated events on this narrow endpoint without side effects.
          break;
      }
    } catch (error) {
      console.error("[Watch webhook] Lifecycle persistence failed", {
        eventId: event.id,
        eventType: event.type,
        error,
      });
      // Stripe retries non-2xx responses, preserving the event for recovery.
      res.status(500).json({ received: false });
      return;
    }

    res.json({ received: true });
  });
}

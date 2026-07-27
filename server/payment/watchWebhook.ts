/**
 * Stripe webhook boundary for The Watch.
 *
 * Each endpoint verifies the signed raw body before updating durable enrollment
 * state. The live and test endpoints have independent Stripe credentials and
 * write a billing-mode marker so validation data cannot enter the live cohort.
 */
import type { Express, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { ENV } from "../_core/env";
import { type WatchBillingMode, updateWatchEnrollmentStatus, upsertWatchEnrollment } from "../db";

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

function isWatchSubscription(subscription: Stripe.Subscription, priceId: string): boolean {
  return (
    subscription.metadata.beacon_offering === OFFERING_KEY ||
    subscription.items.data.some((item) => item.price.id === priceId)
  );
}

function mapSubscriptionStatus(status: Stripe.Subscription.Status): "active" | "past_due" | "cancelled" | "pending" {
  if (status === "active" || status === "trialing") return "active";
  if (status === "past_due" || status === "unpaid") return "past_due";
  if (status === "canceled" || status === "incomplete_expired") return "cancelled";
  return "pending";
}

function logWatchBillingEvent(event: Stripe.Event, billingMode: WatchBillingMode) {
  const object = event.data.object as { id?: string; status?: string };
  console.info(
    JSON.stringify({
      system: `the-watch-stripe-${billingMode}`,
      eventId: event.id,
      eventType: event.type,
      objectId: object.id ?? null,
      status: object.status ?? null,
      createdAt: new Date(event.created * 1000).toISOString(),
    })
  );
}

interface WatchWebhookConfig {
  path: string;
  billingMode: WatchBillingMode;
  secretKey: string;
  priceId: string;
  webhookSecret: string;
}

function registerWatchWebhook(app: Express, config: WatchWebhookConfig) {
  app.post(config.path, express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
    if (!config.secretKey || !config.webhookSecret || !config.priceId) {
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
      const stripe = new Stripe(config.secretKey);
      event = stripe.webhooks.constructEvent(req.body, signature, config.webhookSecret);
    } catch (error) {
      console.error("[Watch webhook] Signature verification failed", error);
      res.status(400).json({ received: false });
      return;
    }

    try {
      const stripe = new Stripe(config.secretKey);
      switch (event.type) {
        case "invoice.paid": {
          const invoice = event.data.object as Stripe.Invoice;
          const subscriptionId = invoiceSubscriptionId(invoice);
          if (!subscriptionId) break;

          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          if (!isWatchSubscription(subscription, config.priceId)) break;

          const customer = await stripe.customers.retrieve(stripeObjectId(subscription.customer) ?? "");
          if (customer.deleted || !customer.email) {
            throw new Error(`Watch subscription ${subscription.id} has no usable customer email.`);
          }

          await upsertWatchEnrollment({
            email: customer.email,
            firstName: customer.name?.trim().split(/\s+/)[0] ?? null,
            stripeCustomerId: customer.id,
            stripeSubscriptionId: subscription.id,
            billingMode: config.billingMode,
            enrollmentStatus: "active",
            paidAt: new Date(event.created * 1000),
            renewsAt: getRenewsAt(subscription),
          });
          logWatchBillingEvent(event, config.billingMode);
          break;
        }
        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          const subscriptionId = invoiceSubscriptionId(invoice);
          if (!subscriptionId) break;

          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          if (!isWatchSubscription(subscription, config.priceId)) break;
          await updateWatchEnrollmentStatus(subscription.id, "past_due", getRenewsAt(subscription));
          logWatchBillingEvent(event, config.billingMode);
          break;
        }
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          if (!isWatchSubscription(subscription, config.priceId)) break;
          await updateWatchEnrollmentStatus(subscription.id, mapSubscriptionStatus(subscription.status), getRenewsAt(subscription));
          logWatchBillingEvent(event, config.billingMode);
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

export function registerWatchStripeWebhook(app: Express) {
  registerWatchWebhook(app, {
    path: "/api/the-watch/stripe-webhook",
    billingMode: "live",
    secretKey: ENV.stripeSecretKey,
    priceId: ENV.stripeWatchAnnualPriceId,
    webhookSecret: ENV.stripeWatchWebhookSecret,
  });
}

/** Separately signed endpoint for test-mode validation; it never shares live Stripe credentials. */
export function registerWatchStripeTestWebhook(app: Express) {
  registerWatchWebhook(app, {
    path: "/api/_ops/the-watch/stripe-test-webhook",
    billingMode: "test",
    secretKey: ENV.stripeTestSecretKey,
    priceId: ENV.stripeTestWatchAnnualPriceId,
    webhookSecret: ENV.stripeTestWatchWebhookSecret,
  });
}

/**
 * Stripe webhook boundary for The Watch.
 *
 * This route verifies the signed raw body before writing only operational logs.
 * Member provisioning is deliberately not simulated: production activation must
 * be connected to the final Beacon Community delivery workflow before release.
 */
import type { Express, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { ENV } from "../_core/env";

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
  app.post("/api/the-watch/stripe-webhook", express.raw({ type: "application/json" }), (req: Request, res: Response) => {
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

    switch (event.type) {
      case "invoice.paid":
      case "invoice.payment_failed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        logWatchBillingEvent(event);
        break;
      default:
        // Acknowledge unrelated events on this narrow endpoint without side effects.
        break;
    }

    res.json({ received: true });
  });
}

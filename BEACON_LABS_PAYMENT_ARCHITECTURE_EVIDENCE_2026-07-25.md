# Beacon Labs Signal Check — On-Site Payment Architecture Evidence

**Status:** Technical evidence record supporting the owner-approved on-site checkout and verified-webhook model  
**Date:** July 25, 2026  
**Applies to:** The $297 expanded Beacon Labs Signal Check follow-up

## 1. Owner-approved requirement

The expanded Signal Check must retain the customer inside a Beacon-branded payment page. The browser may render the processor’s secure embedded payment fields, but it must not determine fulfillment, unlock paid work, or claim payment success as authoritative. A verified server-side payment event controls the paid state, report queue, receipt, CRM lifecycle, and subsequent service-handoff eligibility.

## 2. Official processor evidence

| Requirement | Verified processor capability | Implementation consequence |
|---|---|---|
| Branded on-site payment experience | The Payment Intents API supports a custom payment form embedded in a website; its Payment Element is mounted inside the site and uses processor-hosted secure iframes for payment collection. | Use the embedded payment component in a Beacon page rather than a hosted-checkout redirect. |
| Server-controlled charge amount | The server creates the PaymentIntent and returns a client secret for the embedded form. | Fix the expanded follow-up amount server-side at 29,700 cents; never trust a browser-supplied amount. |
| Fulfillment only after payment | The processor documents that fulfillment should be driven by payment webhooks rather than a client callback. | The browser may show a pending or received state, but only the verified webhook transitions the record to `expanded_paid` and queues work. |
| Webhook authenticity | The processor’s webhook documentation requires verification of the signature against the raw request body and endpoint signing secret. | Register the webhook route before JSON parsing; reject signature failures; record event IDs for idempotency. |
| Timely acknowledgment | The webhook handler should return a successful response before complex processing. | Persist the verified state and enqueue follow-on report/CRM work; do not perform long-running generation synchronously in the webhook handler. |

> Stripe’s official payment-status guidance states: “Don’t attempt to handle order fulfillment on the client side … Instead, use webhooks to monitor the payment event and handle its completion asynchronously.” [1]

## 3. Existing Beacon implementation to reuse

The canonical source `beaconmomentum-dev/beacon-guides-store` already implements the required shape. It uses an on-site Payment Element in `client/src/pages/GuidesPage.tsx`, server-created PaymentIntents in `server/routers.ts`, a raw-body verified webhook in `server/stripeWebhook.ts`, an idempotent paid-state check before fulfillment, and webhook registration before `express.json()` in `server/_core/index.ts`.[3] [4] [5] [6]

The Signal Check implementation must adapt this pattern—not create a hosted checkout or browser-trusted fulfillment path. The main adaptation is replacing instant download-token fulfillment with a paid diagnostic queue, receipt, CRM lifecycle event, and controlled report delivery.

## 4. Required implementation controls

| Control | Required behavior |
|---|---|
| Amount and metadata | Server calculates 29,700 cents and attaches only minimum necessary internal identifiers and offer metadata. |
| Payment record | Create a pending expanded-diagnostic record before returning a client secret; bind it uniquely to the PaymentIntent. |
| Webhook verification | Verify the signature against the raw body; process only expected payment events; log the event ID; apply idempotent transitions. |
| Fulfillment | On `payment_intent.succeeded`, mark the record paid, create receipt/report-queue work, issue the CRM lifecycle event, and return promptly. |
| Failure and retry | Preserve failed/pending state and show a non-sensitive retry message. Do not create report work for failed or unverified payments. |
| Client experience | Display the embedded secure fields inside the Beacon page; reveal no secret values; present a clear pending/confirmation state without treating it as fulfillment authority. |

## References

[1] [Stripe, “Payment status updates”](https://docs.stripe.com/payments/payment-intents/verifying-status)  
[2] [Stripe, “Receive Stripe events in your webhook endpoint”](https://docs.stripe.com/webhooks)  
[3] [Stripe, “Build a checkout page with Payment Intents API”](https://docs.stripe.com/payments/quickstart)  
[4] [`beacon-guides-store/client/src/pages/GuidesPage.tsx`](https://github.com/beaconmomentum-dev/beacon-guides-store/blob/main/client/src/pages/GuidesPage.tsx)  
[5] [`beacon-guides-store/server/stripeWebhook.ts`](https://github.com/beaconmomentum-dev/beacon-guides-store/blob/main/server/stripeWebhook.ts)  
[6] [`beacon-guides-store/server/_core/index.ts`](https://github.com/beaconmomentum-dev/beacon-guides-store/blob/main/server/_core/index.ts)

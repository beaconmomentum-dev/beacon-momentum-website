# Beacon The Watch — Embedded Payment Integration Evidence

**Date:** July 27, 2026
**Status:** Architecture evidence only. This document does not create a Stripe product, alter a subscription, collect payment data, or authorize public release.

## Decision boundary

The Watch must use **Beacon-controlled pages on `beaconmomentum.com`** for discovery, card entry, confirmation, cancellation, and payment-method updates. Stripe is the processor only. The customer journey must not use a Stripe Payment Link, Stripe-hosted Checkout, Stripe Billing Portal, Manus domain, Manus storage URL, Manus analytics endpoint, or managed-preview URL.

| Required result | Selected technical direction | Explicitly excluded |
|---|---|---|
| Branded card entry | Stripe Elements/Payment Element embedded inside a Beacon page | Stripe-hosted Checkout redirect or Payment Link |
| Annual renewal | Server-created subscription using the server-owned annual Price ID | Client-provided price or amount |
| Customer control | Beacon-hosted billing-management route backed by same-origin server endpoints | Stripe Billing Portal redirect |
| Access and payment state | Signed Stripe webhook handled by the Beacon Node process | Browser-only “success” assumption |
| Deployment | Canonical GitHub repository, build, and DigitalOcean origin `159.203.81.39` | Manus runtime, storage, or hosting dependency |

## Official Stripe evidence

Stripe’s Elements subscription documentation supports a custom payment flow in which the application creates a customer and subscription server-side, returns a client secret to the customer-facing page, and collects payment information through an embedded payment element. The documentation distinguishes this from hosted Checkout and Payment Links, which are intentionally not the selected customer experience here.[^elements]

Stripe’s webhook documentation requires a public HTTPS endpoint, verification of incoming event signatures using the raw request body, and a prompt `2xx` response before slow follow-on work. The subscription guidance identifies payment failure and subscription-status events as the reliable mechanism for access and renewal state rather than relying on a browser success screen.[^webhooks] [^subscription-webhooks]

## Proposed owned-domain flow

1. A customer enters through `https://beaconmomentum.com/the-watch` and chooses **Enroll in The Watch**.
2. The site opens `https://beaconmomentum.com/the-watch/checkout`. The page displays the exact annual price, automatic-renewal terms, rate-lock condition, cancellation policy, and the required non-investment disclosure before any confirmation control.
3. The Beacon Node process receives a same-origin request, validates the selected offering against a server-side catalog, creates or reuses a Stripe Customer, and creates a subscription using a server-held recurring annual Price ID. The browser never submits a price ID, secret key, or amount that the server trusts.
4. The server returns the client secret needed to mount Stripe Elements. Card entry occurs inside the Beacon-branded page. Stripe’s secure embedded field handles card data; Beacon does not receive or store PAN/CVC data.
5. The browser confirms the payment using Stripe.js/Elements and remains on `beaconmomentum.com` for its confirmation page. A successful client response is provisional until the signed webhook confirms the relevant subscription/invoice state.
6. Stripe posts signed events to `https://beaconmomentum.com/api/the-watch/webhook`. The server verifies the signature against a private webhook signing secret, records/reconciles the subscription state, and triggers the approved member-access workflow.
7. An on-site `https://beaconmomentum.com/the-watch/billing` screen provides cancellation-at-period-end and payment-method update flows through Beacon endpoints. No redirect to Stripe’s hosted billing portal is permitted.

## Minimum endpoint and event register

| Beacon endpoint | Purpose | Security/property requirement |
|---|---|---|
| `POST /api/the-watch/checkout` | Create/retrieve customer and create incomplete annual subscription | Rate limit, input validation, server-side price lookup, idempotency key |
| `POST /api/the-watch/webhook` | Receive Stripe lifecycle events | Raw body, signature verification, idempotent event handling, rapid success response |
| `GET /api/the-watch/billing/session` | Load authenticated member billing summary | Beacon account/session authorization; do not expose arbitrary Stripe records |
| `POST /api/the-watch/billing/cancel` | Mark active subscription to cancel at period end | Authenticated ownership check and confirmation state |
| `POST /api/the-watch/billing/payment-method` | Create/setup intent for a member’s card update | Authenticated ownership check; card data remains in Elements |

| Stripe event | Initial Beacon handling expectation |
|---|---|
| `customer.subscription.created` / `customer.subscription.updated` | Reconcile active, past-due, incomplete, cancellation-at-period-end, and cancellation status. |
| `invoice.paid` | Confirm paid access/renewal and record period state. |
| `invoice.payment_failed` | Trigger the approved payment-failure communication and retain/revoke access only under published terms. |
| `invoice.payment_action_required` | Tell the member to complete required authentication on the Beacon billing route. |
| `customer.subscription.deleted` | End future access at the effective entitlement boundary. |

## Pre-implementation decisions still required

| Decision | Owner/action needed before live collection |
|---|---|
| Live Stripe Product and recurring Price ID | Verify the exact Beacon Momentum LLC-owned annual $497 record; do not guess, recreate, or expose it in client code. |
| Webhook signing secret and publishable key | Store only in the owned production secret manager/environment; never commit to Git or browser code. |
| Member identity and entitlement destination | Confirm the existing Beacon account, community, and CRM handoff after `invoice.paid`. |
| Cancellation, failed-payment, refund, and re-enrollment terms | Approve actual operating policy before opening checkout; a rate lock applies only to uninterrupted, paid renewals. |
| Tax, receipts, and chargeback operations | Confirm the issuer record, invoice/receipt language, tax treatment, and support responsibility. |

[^elements]: [Stripe, “Build a subscriptions integration with Elements.”](https://docs.stripe.com/payments/advanced/build-subscriptions)
[^webhooks]: [Stripe, “Receive Stripe events in your webhook endpoint.”](https://docs.stripe.com/webhooks)
[^subscription-webhooks]: [Stripe, “Using webhooks with subscriptions.”](https://docs.stripe.com/billing/subscriptions/webhooks)

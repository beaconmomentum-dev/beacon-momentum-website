# The Watch — Owned Infrastructure Release Runbook

**Release source:** `beaconmomentum-dev/beacon-momentum-website` commit `4948b0e`
**Production origin:** `root@159.203.81.39`, `/var/www/beacon-momentum-www`
**Public origin:** `https://beaconmomentum.com`
**Release status:** Code is built, committed, and pushed. Live payment collection remains intentionally disabled until the controls in this runbook are completed and verified.

## Non-negotiable architecture

The customer journey must remain on Beacon-controlled URLs. The Watch page, checkout route, confirmation route, future billing route, and webhook receiver run from the Beacon Momentum application and its owned DigitalOcean origin. Stripe processes card data through embedded Elements; it is not the customer-facing checkout host.

| Customer-facing component | Required Beacon-controlled route or service | Not permitted |
|---|---|---|
| Enrollment landing page | `/the-watch` | Managed preview, temporary application URL, or third-party landing page |
| Card entry | `/the-watch/checkout` using embedded Payment Element | Stripe Payment Link or hosted Checkout redirect |
| Confirmation | `/the-watch/confirmation` | External success page |
| Lifecycle verification | `POST /api/the-watch/webhook` in the Beacon Node runtime | Browser-only success assumption |
| Payment account controls | Future Beacon-hosted `/the-watch/billing` flow | Stripe Billing Portal redirect |

## Required production configuration

Set the following values **only** in `/var/www/beacon-momentum-www/.env.production`. Do not commit them, send them through chat, or expose them in client code.

```dotenv
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WATCH_ANNUAL_PRICE_ID=price_...
STRIPE_WATCH_WEBHOOK_SECRET=whsec_...
```

The application will refuse to report checkout as ready unless all four values are present. It will also retrieve the configured live Price server-side and reject it unless it is active, denominated in USD, priced at exactly **49,700 cents**, and renews every **one year**. The browser never selects the price ID or amount.

## Stripe configuration checklist

Before changing the production environment, verify the selected existing Stripe Price is owned by Beacon Momentum LLC and corresponds to the approved Founding Year membership. Do not create a new product or price as part of this release. Create a Stripe webhook endpoint at:

```text
https://beaconmomentum.com/api/the-watch/webhook
```

Subscribe it to at least the following events:

| Stripe event | Beacon handling purpose |
|---|---|
| `invoice.paid` | Confirm paid enrollment or paid renewal state |
| `invoice.payment_failed` | Trigger the approved payment-failure path |
| `invoice.payment_action_required` | Direct the member to a Beacon-hosted recovery path |
| `customer.subscription.created` | Reconcile the new subscription record |
| `customer.subscription.updated` | Reconcile status, renewal, and cancellation state |
| `customer.subscription.deleted` | Apply the approved entitlement-ending rule |

The webhook endpoint verifies the Stripe signature using the raw request body before it accepts an event. This is a required Stripe security pattern; no access decision may rely solely on the browser confirmation page.[1]

## Ordered release steps

1. On the production origin, confirm the working tree is clean enough to update and that its `origin` remote is `beaconmomentum-dev/beacon-momentum-website`.
2. Pull GitHub commit `4948b0e` (or its verified descendant) into `/var/www/beacon-momentum-www`.
3. Set the four server-only Stripe values in `.env.production` through the server’s protected configuration workflow.
4. Configure the existing live annual Price and the signed webhook endpoint in Stripe. Retain evidence of the product, Price, and webhook configuration outside client code.
5. Build from the pulled source on the production origin, then restart `beacon-momentum-www` through PM2.
6. Verify the public `/the-watch` and `/the-watch/checkout` routes on desktop and mobile. Confirm that the checkout is unavailable if any required server configuration is absent.
7. Conduct a founder-approved test payment using an approved test mode or controlled refundable production procedure, verify the signed webhook log, and confirm the member-access handoff before accepting general enrollment.
8. Verify the live customer journey never leaves `beaconmomentum.com` for payment, confirmation, or billing management.

## Release gates still open

The following gates remain open and must not be represented as complete:

| Gate | Why it remains open |
|---|---|
| Exact live Stripe Price ID | It was not present in the accessible Beacon production environment and must be verified rather than guessed. |
| Webhook signing secret | It must be created/configured in Stripe and stored only in production configuration. |
| Member entitlement handoff | A confirmed post-`invoice.paid` destination and idempotent access workflow are required before public collection. |
| Beacon-hosted billing controls | The present code safely blocks live launch without a billing-management implementation; cancellation and payment-method updates require an authenticated same-origin route. |
| Terms and operating policy | Cancellation, failure, refund, re-enrollment, privacy, and support mechanics need final public-link verification beside the payment control. |

## Reference

[1] [Stripe, “Receive Stripe events in your webhook endpoint.”](https://docs.stripe.com/webhooks)

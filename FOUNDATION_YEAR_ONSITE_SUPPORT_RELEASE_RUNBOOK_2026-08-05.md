# Foundation Year — Direct On-Site Support Release Runbook

**Repository:** `beaconmomentum-dev/beacon-momentum-website`  
**Production origin:** `https://beaconmomentum.com`  
**Status:** The code uses the established Beacon Momentum LLC Stripe account and existing signed webhook boundary. It is ready for controlled configuration and verification on the production host.

## Architecture

Foundation Year is a one-time voluntary-support flow on Beacon-controlled routes. It uses embedded Stripe Payment Element fields; it does not use Stripe Checkout, a Payment Link, hosted processor success pages, a managed payment runtime, or another account.

| Stage | Beacon-controlled location | Processor responsibility | Beacon responsibility |
|---|---|---|---|
| Public explanation | `/foundation` | None | Explain the voluntary-support relationship and boundaries. |
| Support form | `/foundation/support` | Securely collect card details inside embedded Elements. | Server-select amount, display boundary, never handle raw card data. |
| Browser return | `/foundation/thank-you` | Confirm payment state to embedded Elements. | Display a non-entitlement thank-you state. |
| Signed confirmation | Existing `POST /api/the-watch/stripe-webhook` | Deliver signed lifecycle events. | Verify raw signed body; log metadata only; keep no raw payload or card data. |

## Existing production configuration

The flow reuses the server-only credentials already established for Beacon’s direct Stripe account:

```dotenv
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WATCH_WEBHOOK_SECRET=whsec_...
```

No new product, Price, Stripe Checkout configuration, managed secret, or additional payment provider is required for Foundation Year support. The existing webhook must be subscribed to `payment_intent.succeeded` and `payment_intent.payment_failed` in addition to the Watch lifecycle events it already receives.

## Payment policy encoded in the application

The form accepts one-time, whole-dollar voluntary-support amounts from **$5** to **$25,000**. It displays $25, $50, $100, and $250 as convenience choices. These values are not membership tiers, service packages, ownership levels, access rights, charitable contributions, tax-deductible donations, or promises of a return.

## Verification sequence

1. Confirm the production keys belong to Beacon Momentum LLC and that the existing signed webhook endpoint is active.
2. Add the two PaymentIntent events to that existing endpoint’s event selection in Stripe.
3. Deploy from the approved GitHub commit through the standard DigitalOcean workflow.
4. Run one owner-approved test in the established Stripe test environment or other controlled validation procedure.
5. Verify browser return, processor receipt, signed webhook log, and the absence of any membership or entitlement change.
6. Confirm the customer journey stays on `beaconmomentum.com` other than embedded processor fields.

If a signature, boundary, or confirmation check fails, disable the public support CTA at the source and correct the server configuration before accepting any further payments.

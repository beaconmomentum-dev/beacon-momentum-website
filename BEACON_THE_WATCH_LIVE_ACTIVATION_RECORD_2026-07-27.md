# Beacon Momentum — The Watch Live Activation Record

**Date:** 2026-07-27
**Scope:** Beacon-controlled public landing and on-domain annual enrollment

## Confirmed live Stripe catalog record

| Item | Verified state |
|---|---|
| Product | `The Watch — Annual Enrollment` (`prod_UxniwByWhAzDIY`) |
| Price | `price_1Txs7XE69P40ey9pbuu2ry2Y` |
| Terms | Active, USD, $497.00, recurring annually |
| Public-key handling | Configured only as the Stripe publishable browser credential; no secret key is exposed to the client |

## Owned production activation

The Beacon-owned production service is configured with the existing live Stripe secret key, the approved annual price, and a server-only webhook signing secret. The active Watch webhook endpoint is `we_1TxvRyE69P40ey9pV1608b8T` and delivers only the operational subscription and invoice events required by the Watch payment boundary.

No customer-facing Stripe-hosted checkout redirect, Manus URL, Manus storage route, managed runtime hook, or customer-facing Manus asset is part of the published enrollment journey.

## Safe production validation

| Check | Result |
|---|---|
| `https://beaconmomentum.com/the-watch` | HTTP 200 |
| `https://beaconmomentum.com/the-watch/checkout` | HTTP 200 |
| `watchCheckout.publicConfig` | `ready: true` |
| Unsigned webhook POST | HTTP 400, confirming that the public endpoint rejects unauthenticated requests |
| Browser review | The Founding Year enrollment page renders the $497 annual rate, rate-lock terms, purchase boundary, name/email form, terms consent, and on-domain secure-payment control |

## Deliberate validation boundary

No subscription, customer, payment method, or charge was created during the activation test. A real card submission will create the annual Stripe subscription only after the purchaser completes the enrollment form, affirmatively accepts the stated terms, and confirms payment through the on-domain Stripe Elements flow.

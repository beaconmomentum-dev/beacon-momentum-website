# The Watch — Public Release Controls

**Public offer:** The Watch is Beacon Momentum's annual membership, listed at $497 per year. A request-first enrollment is not a payment, subscription, or account-activation event.

## Customer journey

The public customer journey should remain on Beacon-controlled routes. Use the Watch enrollment and confirmation routes for Beacon-hosted pages; do not send customers to a third-party landing page or imply that a browser confirmation alone grants member access.

Payment processing must use the owner-approved, server-authoritative annual price. The browser must not choose or submit an amount or price identifier. A signed payment-provider webhook and idempotent server-side entitlement workflow are required before any paid enrollment can activate access.

## Release controls

Live payment collection remains disabled until the selected price and billing cadence, signed webhook, account-provisioning handoff, cancellation/refund/support terms, privacy notices, and controlled end-to-end test have been verified and documented by the authorized owner. Existing member access must not be changed by closing a new-enrollment route.

Requests for information do not create a paid subscription or grant The Watch access. Any change from request-first enrollment to direct payment requires a separate release approval after those gates are closed.

## Private operational information

Production host addresses, administrative accounts, filesystem locations, secret names/values, deployment credentials, and rollback commands are intentionally maintained in owner-only infrastructure records and are not published in this repository.

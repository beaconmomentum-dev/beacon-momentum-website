# Signal Check Two-Stage Funnel — Pre-Deployment Verification

**Repository:** `beaconmomentum-dev/beacon-momentum-website`  
**Scope:** Canonical `/pricing` route only  
**Decision applied:** Session-approved two-stage Beacon Labs funnel

| Offer | Verified public treatment | Boundary preserved |
|---|---|---|
| **Initial Signal Check** | Free first-step diagnostic with a dedicated “Get Your Free Signal Check” action. | It is not presented as a membership benefit or a paid offer. |
| **Expanded B2B follow-up** | Optional separate **$297** entry-level diagnostic for organizations continuing after the free first step. | It is not presented as a charge for the initial Signal Check or as part of The Watch. |
| **The Watch** | **$497/year** annual membership. | No $297 membership reference remains. |

## Checks completed before commit

| Check | Result |
|---|---|
| Source-string audit | Passed. No one-stage “paid Signal Check” language and no `$297` / The Watch conflation remained in `client/src/pages/PricingPage.tsx`. |
| Diff hygiene | Passed. `git diff --check` reported no whitespace errors. |
| Production client build | Passed with local non-persistent validation values. |
| Desktop local render | Passed. The two stages appear as separate, labeled offer panels. |
| Mobile local render | Passed. The Pricing route retains readable hierarchy and stacks the offer panels without collapsing their free/paid distinction. |

This file records a pre-deployment check only. The canonical deployment remains GitHub commit → CI/CD → live-route verification.

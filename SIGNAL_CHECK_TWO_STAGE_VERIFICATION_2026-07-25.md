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

## Deployment and live verification

| Check | Result |
|---|---|
| Canonical commit | `24b6260d19df79980cb962e5e517b724f8390db4` — `fix: restore two-stage signal check funnel`. |
| CI/CD deployment | Passed: [Deploy to Production run 30173349404](https://github.com/beaconmomentum-dev/beacon-momentum-website/actions/runs/30173349404). |
| Live route | Passed: [`https://beaconmomentum.com/pricing`](https://beaconmomentum.com/pricing) displays The Watch at `$497/year`, a free initial Signal Check, and a separate optional `$297` expanded B2B follow-up. |
| Expanded-follow-up handoff | Passed: [`/contact?interest=signal-check-expanded`](https://beaconmomentum.com/contact?interest=signal-check-expanded) resolves to the live Beacon Momentum contact route with a Signal Check Report inquiry option. |

The canonical deployment path was followed: GitHub commit → CI/CD → live-route verification. No managed preview is a source of truth or deployment dependency for this release.

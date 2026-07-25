# Execution Engine Self-Contained Migration Record

## User-approved constraint

The Execution Engine must be rebuilt as a **self-contained Beacon Venture asset**. The resulting member curriculum and any public handoff must not depend on an outside funnel service, third-party checkout, remote analytics/widget, externally loaded course asset, or unaffiliated hosted resource.

## Published-funnel dependency inventory

The current standalone page at `https://exec-funnel-aqf76wtd.manus.space/offer` contains the following outside dependencies or standalone-funnel elements that must not carry into the new asset:

| Element | Current role | Required disposition |
|---|---|---|
| Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) | Remote `Inter` font loading | Remove; use the canonical Beacon typography system and locally bundled application styling. |
| Manus CDN social-image URLs and Manus Space dispatcher | Published-site hosting/editor infrastructure | Do not reuse in the canonical Beacon build. |
| Umami (`manus-analytics.com/umami`) and Plausible (`plausible.io`) | Published-page analytics scripts | Remove; do not carry forward any third-party tracking dependency. |
| Stripe Elements / payment-intent implementation | Standalone $197 checkout flow | Remove completely; The Venture Execution Sprint has no separate price or checkout. |
| $197/$297 price, 72-hour timer, early-bird copy, guarantee, instant-access promise | Standalone conversion mechanics | Remove completely. |
| Beacon Labs naming | Misaligned pillar ownership | Replace with Beacon Venture / The Watch member curriculum framing. |

## Source-discovery status

The current standalone page is a published Manus Space named `exec-funnel-aqf76wtd`. Its source was not found in the canonical `beaconmomentum-dev` GitHub organization search and is not present in the canonical Beacon Momentum repository. The authenticated Manus workspace confirms a Beacon Momentum project, but the funnel source task has not yet been identified in its historical task list.

The authenticated workspace permits access to the Beacon Momentum project and its visible task history. A direct page-level search for “Execution Engine” returned no match, so the page appears not to be represented in the currently loaded project-task list. No source modification, checkout interaction, or deployment action was attempted during this discovery step.

The public page exposes `spaceId` `Aqf76wTDchHiTptc7cmqvj` and session identifier `K9pJEiXR28eOWruKvS49Ge` in its published editor configuration. These identifiers confirm that the site is a separately published Manus Space and provide a concrete handle for locating its owner task or website record; they are recorded here only for source retirement and are not an authorization credential.

## Migration principle

Preserve only the edited instructional value. Rebuild the curriculum in the canonical Beacon repository as a **Venture Execution Sprint** inside The Watch; do not copy or preserve the standalone frontend, payment implementation, hosted assets, or external dependencies.

## Sources

1. [Published Execution Engine page](https://exec-funnel-aqf76wtd.manus.space/offer)
2. [Canonical Beacon Venture definition](https://github.com/beaconmomentum-dev/beacon-momentum-website/blob/main/client/src/pages/PillarPage.tsx)

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

An independent controllable deployment was subsequently identified on the Beacon production origin: PM2 process `execution-engine` (ID 4), working directory `/var/www/execution-engine/`, serving the legacy `exec.beaconmomentum.com` surface. Its source is a version-controlled repository named `beaconmomentum-dev/execution-engine-funnel`, currently present on the production server. The repository contains a full standalone application and payment stack; no credentials or secrets from that legacy application are retained in this record.

The authenticated GitHub CLI cannot currently resolve that private repository, and its existing deployment credential was not accepted by the GitHub API. The canonical Beacon integration remains committed in its own repository; the controllable production source can still be converted safely into a dependency-free internal redirect on the server while repository access is repaired separately.

## Migration principle

Preserve only the edited instructional value. Rebuild the curriculum in the canonical Beacon repository as a **Venture Execution Sprint** inside The Watch; do not copy or preserve the standalone frontend, payment implementation, hosted assets, or external dependencies.

## Canonical release verification

The canonical Beacon production build was completed on July 25, 2026 using the existing production environment and restarted successfully. A public verification of both `/the-watch?release=7629ba6` and `/pillar/venture?release=7629ba6` confirmed that **Venture Execution Sprint** is present as Beacon Venture curriculum included in The Watch. The published wording presents it as a member sequence and exposes no standalone price, checkout, urgency device, or external course-platform handoff.

This verification applies to the canonical Beacon release only. The separate legacy Manus Space remains publicly reachable until its owner task or source project is identified and explicitly retired or internally redirected.

## Controlled legacy-host retirement

On July 25, 2026, the controllable `exec.beaconmomentum.com` Execution Engine process was replaced with a Node.js-core-only redirect service. The new source is stored in `infrastructure/execution-engine-retirement/` in the canonical Beacon repository at commit `10fb40b`. It has no package dependencies, checkout code, database access, analytics integration, remote asset loading, or runtime secret requirement.

Public verification confirmed that `https://exec.beaconmomentum.com/offer?release=10fb40b` returns `302 Found` with `Location: https://beaconmomentum.com/pillar/venture` and a `no-store` cache policy. The previously independent public Manus Space at `https://exec-funnel-aqf76wtd.manus.space/offer` still responds independently with `200 OK`; it cannot be truthfully described as retired until its owning Manus task or Space-management access is available.

## Final self-contained release verification

The canonical release at `https://beaconmomentum.com/the-watch?release=43a8ca5` was verified publicly after the build cleanup. The page exposes **Beacon Venture · Included Member Curriculum** and **Venture Execution Sprint**, describing it as “validate, launch, and systematize a working offer.” The generated production bundle was audited for Google Fonts, external analytics, Stripe, and the former Manus funnel URL; no such runtime resource remains in the output. The external Manus Space remains the sole known independent surface pending owner-task access.

## Sources

1. [Published Execution Engine page](https://exec-funnel-aqf76wtd.manus.space/offer)
2. [Canonical Beacon Venture definition](https://github.com/beaconmomentum-dev/beacon-momentum-website/blob/main/client/src/pages/PillarPage.tsx)

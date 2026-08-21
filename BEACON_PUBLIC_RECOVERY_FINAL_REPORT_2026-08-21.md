# Beacon Momentum Public-Site Recovery and Legacy Retirement

**Date:** August 21, 2026
**Canonical site:** [https://beaconmomentum.com](https://beaconmomentum.com)
**Canonical source:** `beaconmomentum-dev/beacon-momentum-website`
**Recovery source revision:** `19ef7e9`
**Status:** Restored, guarded, visually reconciled, and verified

## Executive result

The `beaconmomentum.com` white screen was caused by a split static deployment. The live entry document referenced a new hashed JavaScript and stylesheet build, while the matching files were absent from Nginx's shared asset directory. Cloudflare correctly passed the broken origin response; cache purging could not repair missing origin files.

The missing matching assets were published with hash-conflict protection, restoring the site. The permanent GitHub release adds a guarded PM2 launcher and deployment contract that synchronize and verify every referenced asset before the Node runtime starts. Startup now fails closed rather than serving an entry document whose required bundles are absent.

## Canonical identity correction

The inconsistent square `Field Systems` symbol and alternate legacy lighthouse variants were removed from canonical identity surfaces. The approved Beacon parent mark now anchors the homepage, Watch, checkout, support, legal, company, pillar, cohort, and footer identity surfaces. Structured-data logo references were aligned to the same approved asset family.

The homepage descriptor is now **Beacon Momentum · Public Front Door**. The Watch retains its membership-specific descriptor while using the same parent-mark family. The favicon, application icon family, route lockups, and public structured-data logo no longer compete with unrelated Beacon marks.

## Live acceptance

The following canonical routes rendered successfully after deployment:

| Route | Result |
|---|---|
| `/` | `200`; complete React render; approved parent mark |
| `/the-watch` | `200`; $497 annual membership content; approved parent mark |
| `/the-watch/checkout` | `200`; canonical enrollment terms and Stripe boundary |
| `/pricing` | `200`; current pricing content and unified identity |
| `/contact` | `200`; support path and form render |
| `/about` | `200`; current narrative and assets |
| `/privacy` | `200`; current policy and footer routes |
| `/terms` | `200`; current membership and payment terms |
| `/refund` | `200`; current refund and cancellation language |

The deterministic acceptance harness passed **18 desktop/mobile checks** across these identity surfaces. It verified rendered content, approved mark loading, critical assets, stable headings, route descriptors, and zero horizontal overflow. Independent browser diagnostics reported no JavaScript errors, failed requests, or HTTP asset errors after recovery.

## Legacy Manus Watch disposition

The legacy `beaconhome-ejdfdk4g.manus.space` Watch page was classified as superseded. It contained a conflicting logo and lockup, a visible Manus badge, stale founder-funding language, and an enrollment control without a canonical checkout destination.

After explicit point-of-action approval, the site was unpublished through its owning Manus project. Public verification now returns **`404`** for the legacy address. The restored DigitalOcean homepage, Watch, and checkout remain canonical and return `200`.

The two redundant local HTML captures of the obsolete Manus page were removed from the sandbox. Private GitHub and audit records were retained. The Manus management interface preserves the unpublished project's private data and settings; it does not expose a separate permanent website-data deletion control. The obsolete address is no longer publicly accessible.

## Operational safeguards

1. GitHub remains the source of truth.
2. The deployment publishes matching hashed assets before the entry document.
3. The guarded launcher verifies referenced assets before runtime start.
4. Hash conflicts fail closed instead of overwriting unrelated shared assets.
5. DigitalOcean rollback evidence is retained.
6. The canonical Watch and checkout were not redirected to the legacy Manus surface.
7. No payment, membership, legal, or publishing-policy behavior was changed by the icon correction or white-screen recovery.

## Final canonical state

The only public Watch path is the GitHub-backed DigitalOcean experience:

- [Beacon Momentum public front door](https://beaconmomentum.com/)
- [The Watch](https://beaconmomentum.com/the-watch)
- [The Watch checkout](https://beaconmomentum.com/the-watch/checkout)

The obsolete Manus address is offline and should not be republished.

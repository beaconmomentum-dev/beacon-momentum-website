# Homepage Redesign Notes

## Live Baseline

On July 24, 2026, the production homepage at <https://beaconmomentum.com/> was confirmed to be serving the prior Deep Water Editorial implementation from commit `ae5f5682fb2bd6cf2c7e525a2eae257c663852d6`. Its conversion paths included the Pathfinder Assessment, pricing, resources, The Signal, and the Beacon portfolio.

## Migration Decision

The homepage is being migrated into the canonical GitHub repository as **Tide & Tension**: maritime modernism with Swiss editorial discipline. The final implementation preserves real internal routes, verified portfolio destinations, the Beacon Brief subscription integration, accessible skip-navigation targeting, and legal/contact links. It deliberately removes fabricated member-review content rather than presenting invented testimonials.

## Source Evidence

The prior live baseline was inspected at <https://beaconmomentum.com/>. The approved Tide & Tension implementation and its locally generated visual assets were reconciled into this repository; the related assets now live under `public/images/home/` and are versioned with the application.

## Local Preview Validation

The canonical local server responded on the preview URL with the correct Beacon Momentum document title on July 24, 2026. Initial diagnostics exposed a pre-existing development-server defect: the Vite config factory was spread instead of resolved, causing module requests to fall through to the HTML catch-all. This was corrected in `server/_core/vite.ts`.

After the correction, the preview rendered the Tide & Tension homepage, including the hero, Watch membership offer, Five Pillars, portfolio registry, Beacon Brief subscription form, and footer. The custom Beacon mark and lighthouse hero image were also confirmed after relocating the versioned WebP assets to `client/public/images/home/`, Vite’s served public directory.

The local preview was further checked with the nonessential cookie notice dismissed. The hero retained readable contrast over the lighthouse image, both primary calls to action remained visible, and the responsive navigation control opened a keyboard-addressable list of Watch, Pillars, Resources, Signal, Portfolio, Assessment, and membership routes.

At a 375 × 812 mobile viewport, the header lockup, menu control, coordinate label, and editorial hero hierarchy retained their intended scale without clipping. A settled capture confirmed the hero headline appears after its entrance transition; the compact cookie notice occupies the lower viewport only until a visitor chooses a preference.

## Local-First Review Outcome

The locally hosted `llama3.1:8b` model reviewed the route, asset, newsletter, and Vite middleware evidence. Its only material concern was whether the Vite repair could affect production. The canonical server entry resolves this directly: `setupVite()` is called only when `NODE_ENV === "development"`; production invokes `serveStatic()` instead. The repair therefore applies only to the local development middleware path and does not alter the DigitalOcean production static-serving path.

## Production Verification

The canonical commit `c1c3ece` was confirmed as the checked-out revision at `/var/www/beacon-momentum-www` on the DigitalOcean host. PM2 reported `beacon-momentum-www` online, the local health endpoint returned HTTP 200, and all five versioned homepage WebP assets were present in the production build.

The public `https://beaconmomentum.com/` site rendered the Tide & Tension hero, Watch offer, and primary assessment/membership calls to action. Its production navigation control opened the expected primary-route list successfully.

## Funnel Destination Audit — July 24, 2026

- The existing membership target `https://beaconcommunity.net/upgrade` redirects publicly to `https://beaconcommunity.net/login` rather than exposing a purchasable upgrade flow. It must not be presented as immediate checkout until a real purchase destination is confirmed.
- The intended public progression is **The Signal** (open editorial) → **The Beacon Brief** (free weekly email) → **Watch Brief Premium** (a distinct paid $27/month briefing, with a confirmed purchase destination) → **The Watch** (annual membership, with a confirmed application or checkout destination).

# Beacon Production Release Smoke Log

**Date:** July 26, 2026  
**Purpose:** Record public-browser observations made during the preservation-first Beacon Brand System release.

| Property | Public URL | Observation | Release status |
|---|---|---|---|
| Beacon Community | https://beaconcommunity.net/ | The public route returned a page titled `Beacon Community — Member Portal` after the source worktree was fast-forwarded and the PM2 process restarted. The production `.next` artifact was subsequently found to predate the facelift, and the owner confirmed the public presentation is still pre-facelift. | **Build-and-restart remediation required.** |
| Hollow Threads | https://hollowthreads.store/ | The public storefront returned a page titled `Hollow Threads \| Emo & Grunge Apparel` and displayed the already-approved updated storefront presentation after its production fast-forward and service restart. | **Released; no further action in this pass.** |

## Beacon Community release boundary

The source worktree initially reached canonical commit `003edec`, but its `.next` artifact timestamps were from July 15, 2026. The active PM2 command runs `npm run start -- -p 3014`, which served that stale build output. A current production build was therefore required before the facelift could become visible at the public URL.

## Rebuild and public confirmation

The release was rebuilt under `NODE_ENV=production` and deployed from canonical commit `5b28f5b` (`fix(community): unblock production facelift build`). The production `.next/BUILD_ID` was regenerated at `2026-07-26 04:24:07 UTC`; PM2 reported the `beacon-community` process online, and the local port `3014` returned HTTP `200`.

The cache-busted public route `https://beaconcommunity.net/?release=5b28f5b` then returned the current member-orientation content, including the title **“Start with the pressure point—not a perfect plan.”** and the **“Three Pathways. One Lighthouse.”** section. This differs from the prior pre-facelift public response and is evidence that the rebuilt artifact is serving publicly. A subsequent visual-extension inspection timed out, so it is recorded as an inspection-tool limitation rather than a release failure.

An independent public HTTP request to `https://beaconcommunity.net/?release=5b28f5b` returned **HTTP 200** with `cache-control: private, no-cache, no-store, max-age=0, must-revalidate` and `cf-cache-status: DYNAMIC`. The served HTML contained **“Three Pathways. One Lighthouse.”** and the shared-property footer record **“Beacon Community · A Beacon Momentum, LLC property.”**

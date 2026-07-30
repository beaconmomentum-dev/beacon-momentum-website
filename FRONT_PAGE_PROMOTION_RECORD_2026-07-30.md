# Beacon Momentum Front-Page Promotion Record — July 30, 2026

## Approved Replacement Source

The intended replacement front page is the **Tide & Tension public-front-door / route-board** page visible at:

`https://beaconhome-ejdfdk4g.manus.space/#routes`

The exact source checkpoint is:

| Item | Verified value |
|---|---|
| Project | `beacon-momentum-homepage` |
| Approved checkpoint | `a48f93774179c0a4deabc160e14f5365960b7aa6` |
| Checkpoint purpose | Tide & Tension public front door; routing to Beacon Community and Beacon Labs; $497/year Watch positioning; route/account-boundary clarification |
| Current Manus project head | `14d869d` — a later, distinct The Watch annual-enrollment landing page; **not** the approved public-front-door source to promote |

The approved page uses these route destinations:

| Route | Destination |
|---|---|
| The Watch / individual membership | `https://beaconcommunity.net` |
| Beacon Labs / organization services | `https://beaconlabs.ai` |
| Beacon Trading | `https://beacontrading.ai` |
| Hollow Threads | `https://hollowthreads.store` |
| Digital Grandpa | `https://digitalgrandpa.org` |

## Asset Ownership Migration

The approved page originally referenced six `/manus-storage/` assets. On July 30, 2026, each was retrieved successfully from the public Manus deployment and staged outside both application repositories at:

`/home/ubuntu/webdev-static-assets/beacon-routeboard-2026-07-30/`

| Canonical target filename | Verified decoded format | Role |
|---|---|---|
| `beacon-routeboard-mark.webp` | WebP | Beacon roundel |
| `beacon-routeboard-hero.webp` | WebP, 1920 × 1080 | Hero horizon |
| `beacon-routeboard-wayfinding.webp` | WebP, 1536 × 1920 | Wayfinding/table image |
| `beacon-routeboard-watch.webp` | WebP, 1536 × 1920 | Watch route card |
| `beacon-routeboard-labs.webp` | WebP, 1536 × 1920 | Labs route card |
| `beacon-routeboard-atlas.webp` | WebP, 1920 × 1280 | Ecosystem atlas |

These assets must be copied into the canonical repo’s `client/public/images/home/` directory and referenced there. No final production page should retain `/manus-storage/` URLs.

## Canonical Production Path

| Layer | Verified value |
|---|---|
| Canonical GitHub repository | `https://github.com/beaconmomentum-dev/beacon-momentum-website` |
| Canonical branch | `main` |
| Canonical source checkout | `/home/ubuntu/beacon-momentum-website/` |
| Production origin | `159.203.81.39` — Beacon-Brands-Hub |
| PM2 process | `beacon-momentum-www` |
| Production web root | `/var/www/beacon-momentum-www/dist/public/` |
| Public domain | `https://beaconmomentum.com` |

The canonical repository was synchronized cleanly to GitHub `main` at commit `0bb0b95b01d507e1fa48628495fc13d181ab33c7` before this promotion work began. The current direct-production page is a separate, stale deployment and does not yet render the approved route-board page.

## Promotion Requirements

1. Preserve the canonical site’s existing non-homepage routes, shared navigation, consent mechanism, and operational pages.
2. Replace only the canonical home page with the approved route-board component, adapting asset paths to the owned local files.
3. Use the canonical project’s existing Tide & Tension stylesheet support, supplementing only necessary scoped styles rather than replacing global styles.
4. Build and test the canonical site, including desktop and mobile routes, before committing.
5. Commit the change to canonical GitHub `main`, then deploy the matching static build to the verified DigitalOcean production web root and restart `beacon-momentum-www`.
6. Verify `https://beaconmomentum.com` shows the approved replacement design before restricting or retiring the Manus-hosted copy.

## Local Validation Record

The migrated canonical source completed a full production build on July 30, 2026 using a nonpersistent, validation-only value for the locally missing `VITE_GHL_API_KEY`. No `.env` file or production configuration was modified during this validation.

An isolated Vite preview was then opened at `https://4175-ihv4t0p5rwkmwa7938hpy-1e2c1e90.us2.manus.computer/`. It rendered the expected canonical page title, **“Beacon Momentum — Find a Steadier Next Move.”**, together with the hero, route board, Watch offer, five-pillar registry, and portfolio content. The hero lighthouse, roundel, route-card images, and atlas image loaded from canonical local paths rather than `/manus-storage/`.

The first `390 × 844` phone-viewport capture showed the intended compact header, roundel, field-position strip, hamburger control, and vertical hero composition without horizontal overflow. Because the route-board hero deliberately uses an entrance sequence, the final mobile visual confirmation must be captured after the motion settles rather than inferred from the initial frame.

The settled `390 × 844` capture confirmed readable hero typography, accessible-looking contrast on the ivory and brass headline treatment, a visible supporting paragraph, and two full-width, comfortably sized route actions. The compact header and the top of the orientation panel remained within the viewport without any observed clipping or horizontal overflow.

The final pre-commit preview check returned HTTP `200` for the root page and all six migrated local assets. `git diff --check` completed cleanly. A standalone repository-wide `tsc --noEmit` run still reports existing type debt in `AboutPage.tsx`, `BlogArticlePage.tsx`, and `BlogPage.tsx`; its diagnostic output contains no `Home.tsx` finding. The production build itself completed successfully, so the migration does not introduce a blocking build failure.

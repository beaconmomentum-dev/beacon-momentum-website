# Validation Record — July 24, 2026

## Approved Watch Price Update

The public production-preview route `/the-watch` was reviewed after the approved pricing change. It visibly presents **The Watch at $497/year** and uses the accurate approximate monthly equivalent of **about $41/month**.

The page also confirms that Sentinel is the sole paid entry stage, while Navigator and Quartermaster remain **earned** stages. No public $1,497 Quartermaster purchase offer is present.

## Build and Source Sweep

- `pnpm exec vite build` completed successfully.
- A source sweep found no remaining active `$297` Watch references in `client/`.
- The `$497` annual price is aligned across the homepage, Watch page, pricing page, pillar page, Signal CTA, and JSON-LD structured data.

## Additional Visual Checks

The rebuilt `/pricing` preview displays a single Watch card at **$497/year** and states that Sentinel, Navigator, and Quartermaster are progression stages. The rebuilt homepage renders `$497` in its hero CTA, annual-entry rail, and Watch offer card.

## Known Pre-existing Type-Check Status

`pnpm run check` remains blocked by pre-existing type errors in `AboutPage.tsx`, `BlogArticlePage.tsx`, and `BlogPage.tsx` that are outside this pricing change. The Vite production build itself completed successfully.

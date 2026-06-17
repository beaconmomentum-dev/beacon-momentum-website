# Beacon Momentum — beaconmomentum.com

React 19 + Vite + TypeScript + Tailwind 4 + shadcn/ui static frontend.

**No vendor lock-in. No third-party auth dependencies. Self-hosted on DigitalOcean.**

## Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Routing**: Wouter (client-side SPA)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Hosting**: DigitalOcean droplet + Nginx (static file serving)

## Development

```bash
pnpm install
pnpm dev
```

## Production Build

```bash
pnpm build:client
# Output: dist/public/
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`deploy.yml`) which:
1. SSHes to the production droplet
2. Runs `/usr/local/bin/deploy-beacon-www.sh` (git pull + build + nginx reload)

## Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `PRODUCTION_SERVER_IP` | DigitalOcean droplet IP (159.203.81.39) |
| `PRODUCTION_SSH_KEY` | Base64-encoded private SSH key for root@droplet |
| `VITE_GHL_API_KEY` | GoHighLevel PIT API key |

## Pages

- `/` — Homepage
- `/assessment` — Pathfinder Assessment (7-question quiz → GHL CRM)
- `/pillar/:id` — Pillar detail pages
- `/path/:pillar` — Pillar share landing pages (life, work, venture, systems, labs)
- `/about` — About Beacon Momentum
- `/company` — Company / holding company overview
- `/contact` — Contact form (GHL-wired)
- `/blog` — Blog
- `/pricing` — Pricing / membership tiers
- `/resources` — Resources page
- `/digital-grandpa` — Digital Grandpa author/persona page
- `/digital-grandpa/library` — Digital Grandpa book library
- `/beacon-trading` — Beacon Trading / Simulation Academy
- `/the-watch` — The Watch community page
- `/the-watch/intake` — The Watch cohort placement questionnaire
- `/the-watch/cohort` — Cohort Lead Dashboard (password-protected, no external auth)
- `/privacy` — Privacy Policy
- `/terms` — Terms of Use
- `/cookies` — Cookie Policy
- `/disclaimer` — Disclaimer

## Cloudflare Worker

`cloudflare-og-worker.js` — Deployed as `beacon-og-injector` on Cloudflare.
Injects static OG tags for `/path/*` and `/assessment` routes for social sharing.

## Architecture Notes

- The `server/_core/` directory contains scaffolding from the original project template.
  Only `server/index.ts` (simple Express static server) and `server/routers/cohort.ts`
  (password-protected cohort dashboard API) are used in production.
- The cohort dashboard uses a shared password stored in `COHORT_LEAD_PASSWORD` env var —
  no OAuth, no external auth provider.
- GitHub is the single source of truth. All changes must be committed here before deployment.

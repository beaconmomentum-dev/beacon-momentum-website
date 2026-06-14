# Beacon Momentum — beaconmomentum.com

React 19 + Vite + TypeScript + Tailwind 4 + shadcn/ui static frontend.

## Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Routing**: Wouter (client-side SPA)
- **Language**: TypeScript
- **Package Manager**: pnpm

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

Pushes to `main` trigger the GitHub Actions workflow which:
1. Installs dependencies
2. Builds the client (`pnpm build:client`)
3. Rsyncs `dist/public/` to `/var/www/beaconmomentum` on the production server
4. Reloads Nginx

## Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `PRODUCTION_SERVER_IP` | DigitalOcean droplet IP |
| `PRODUCTION_SSH_KEY` | Private SSH key for deployment |
| `VITE_GHL_API_KEY` | GoHighLevel PIT API key |

## Pages

- `/` — Homepage
- `/assessment` — Pathfinder Assessment (7-question quiz → GHL CRM)
- `/path/:pillar` — Pillar share landing pages (life, work, venture, systems, labs)
- `/contact` — Contact form (GHL-wired)
- `/digital-grandpa` — Digital Grandpa author/persona page
- `/digital-grandpa/library` — Digital Grandpa book library (coming soon)
- `/resources` — Resources page
- `/privacy-policy`, `/terms-of-use`, `/cookie-policy` — Legal pages
- `/disclaimer` — Disclaimer page

## Cloudflare Worker

`cloudflare-og-worker.js` — Deployed as `beacon-og-injector` on Cloudflare.
Injects static OG tags for `/path/*` and `/assessment` routes for social sharing.

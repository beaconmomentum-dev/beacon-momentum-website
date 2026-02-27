# Beacon Ecosystem: Project State & Ground Truth

**Last Updated:** 2026-02-27
**Updated By:** Manus AI (Session: Storm Navigator + Infrastructure Audit)

---

This document is the single source of truth for the Beacon Momentum ecosystem. It is maintained automatically by Manus AI and serves as a persistent memory to survive session compaction. It is read at the start of every session and updated at the end.

## 1. Core Infrastructure

The ecosystem runs across three DigitalOcean droplets, all in the NYC3 region, with Cloudflare managing DNS and SSL proxy for all domains.

| Component | Detail | Status |
|---|---|---|
| **Production Server** | DigitalOcean Droplet `Beacon-Web-Production` | `active` |
| **Production IP** | `143.198.23.240` | `static` |
| **Brands Hub Server** | DigitalOcean Droplet `Beacon-Brands-Hub` | `active` |
| **Brands Hub IP** | `159.203.81.39` | `static` |
| **Bosun AI Server** | DigitalOcean Droplet `Beacon-ClawBot-2026` | `active` |
| **Bosun AI IP** | `143.198.20.188` | `static` |
| **Primary User** | `root` (all droplets) | `active` |
| **Web Server** | Nginx (all droplets) | `active` |
| **Process Manager** | PM2 (all droplets) | `active` |
| **CI/CD** | GitHub Webhook (`deploy-webhook.js` on port 9000, Production only) | `active` |
| **Databases** | MySQL on Production and Brands Hub (port 3306, localhost) | `active` |
| **DNS & Caching** | Cloudflare | `active` |
| **SSH Access** | `manus-agent@beacon` ed25519 key in authorized_keys on all 3 droplets | `active` |
| **Est. Monthly Cost** | ~$36/month (3 droplets) | — |

### 1.1. Production Server Detail (143.198.23.240)

This droplet hosts the main Beacon Momentum website, the member app, the 2026 Dashboard, Digital Grandpa, and VitalYears Fitness (WordPress).

| PM2 Process | Port | Status | Uptime |
|---|---|---|---|
| `beacon-momentum` | 3000 | online | 6 days (as of Feb 12) |
| `beacon-2026` | 3001 | online | 6 days (as of Feb 12) |

| Nginx Config | Domain | Backend |
|---|---|---|
| `beaconmomentum.com` | beaconmomentum.com, www | Static site at `/var/www/beaconmomentum.com` |
| `app.beaconmomentum.com` | app.beaconmomentum.com | Proxy to localhost:3000 |
| `new.beaconmomentum.com` | new.beaconmomentum.com | Proxy to localhost:3001 (SSL via Let's Encrypt) |
| `digitalgrandpa.org` | digitalgrandpa.org, www | Static site at `/var/www/digitalgrandpa.org/public` |
| `vitalyears.fitness` | vitalyears.fitness, www | PHP/WordPress at `/var/www/vitalyearsfitness.com` |
| `vitalyearsfitness` | 143.198.23.240:8080 | Same WordPress site (direct IP access) |

SSL certificates (Let's Encrypt) are active for: `beaconmomentum.com`, `beaconmomentum.net`, `new.beaconmomentum.com`, `vitalyears.fitness`.

Known issues on Production: Two duplicate Beacon app directories (`/var/www/beacon-repo/` with live Stripe vs `/var/www/beacon-momentum/` with test Stripe). Two stale backup directories from December 9 and December 15. An unused `/var/www/beaconmomentum.io/` directory.

### 1.2. Brands Hub Server Detail (159.203.81.39)

This droplet hosts the e-commerce brand stores, the Beacon Dashboard, Beacon Labs landing page, and n8n automation.

| PM2 Process | Port | Status | Notes |
|---|---|---|---|
| `hollowthreads-chat` | — | online | Chat service |
| `hollowthreads-main` | 3002 | online | 4 restarts observed |
| `caskcuisine` | 3004 | online | Port mismatch: .env says 3003 |
| `beacon-dashboard` | 3005 | online | Stable |

| Nginx Config | Domain | Backend |
|---|---|---|
| `beacon-stores` | — | Reverse proxy for stores (3002, 3004) |
| `beacon-dashboard` | — | Reverse proxy for Dashboard (3005) |
| `beaconlabs.ai` | beaconlabs.ai | Static site from `/var/www/beaconlabs-ai` |
| `n8n` | n8n.beaconlabs.ai | Reverse proxy to Docker port 5678 |

Additional services: n8n automation (Docker, port 5678), MySQL (port 3306, localhost only). No local SSL certificates — relies entirely on Cloudflare proxy.

Known issues on Brands Hub: Forge Caps directory exists but is empty (being built in parallel session). VitalYears has code deployed but no PM2 process. Beacon Customer Hub deployed at `/var/www/beacon-hub/` but no PM2 process. Three stores (Hollow Threads, Cask & Cuisine, VitalYears) share the same Stripe secret key.

### 1.3. Bosun AI Server Detail (143.198.20.188)

This droplet hosts the Bosun AI agent (OpenClaw platform).

| PM2 Process | Port | Status | Notes |
|---|---|---|---|
| `bosun` | 3200 | online | 101 restarts — memory pressure on 1.9GB |

| Additional Port | Service |
|---|---|
| 18789 | OpenClaw gateway (localhost only) |
| 18792 | OpenClaw gateway (localhost only) |

Known issues on Bosun-AI: 101 restarts indicate memory pressure or crashes on the 1.9GB droplet. No git remote configured on the server (GitHub repo `bosun-openclaw-appplatform` exists but is not linked for CI/CD pulls). No local SSL — relies on Cloudflare.

## 2. Brand & Asset Registry

This table maps every brand to its domain, GitHub repository, and live status.

| Brand | Domain(s) | GitHub Repo | Live Directory | Server | Status |
|---|---|---|---|---|---|
| **Beacon Momentum** | `beaconmomentum.com` | `beacon-momentum-website` | `/var/www/beaconmomentum.com` | Production | `Live` (Static HTML) |
| **Beacon Labs** | `beaconlabs.ai` | `beaconlabs-ai` | `/var/www/beaconlabs-ai` | Brands Hub | `Live` (Vite/React App) |
| **Beacon Dashboard** | `app.beaconmomentum.com` | `beacon-2026-dashboard` | `/var/www/beacon-2026-dashboard` | Production | `Live` (Node.js :3000) |
| **Beacon 2026 Dashboard** | `new.beaconmomentum.com` | `beacon-2026-dashboard` | `/var/www/beacon-2026-dashboard` | Production | `Live` (Node.js :3001) |
| **Digital Grandpa** | `digitalgrandpa.org` | `digitalgrandpa-org` | `/var/www/digitalgrandpa.org` | Production | `Live` (Static HTML) |
| **Vitality (WordPress)** | `vitalyears.fitness` | `vitalyears-fitness` | `/var/www/vitalyearsfitness.com` | Production | `Live` (WordPress/PHP) |
| **Vitality (Store)** | — | `vitalyears-fitness-store` | `/var/www/vitalyears` | Brands Hub | `Rebuilding` (parallel session) |
| **Hollow Threads** | `hollowthreads.store` | `hollow-threads-store` | `/var/www/hollowthreads` | Brands Hub | `Live` (Node.js :3002) |
| **Cask & Cuisine** | `caskandcuisine.com` | `cask-cuisine-store` | `/var/www/caskcuisine` | Brands Hub | `Live` (Node.js :3004) |
| **Forge Caps** | `forgecaps.com` | `forge-caps-store` | `/var/www/forge-caps-store` | Brands Hub | `Building` (parallel session) |
| **Beacon Customer Hub** | — | `beacon-customer-hub` | `/var/www/beacon-hub` | Brands Hub | `Deployed, Not Running` |
| **The Void** | `discord.gg/thevoid` | (N/A) | (N/A) | — | `Live` (Discord) |

### 2.1. Stripe Configuration

| Store / App | Stripe Account | Notes |
|---|---|---|
| Hollow Threads | `sk_live...5I1` | Shared key |
| Cask & Cuisine | `sk_live...5I1` | Shared key (same as HT) |
| VitalYears Store | `sk_live...5I1` | Shared key (same as HT) |
| Beacon Dashboard | `sk_live...Qe1` | Different account |
| Webhook Signing Secret | `whsec_FynBkJnHSuHtvLbRqnsO90lqC4zr4WL5` | For Stripe event verification |

### 2.2. GHL Configuration

| Integration Point | API Key Reference | Status |
|---|---|---|
| Beacon Labs Form Service | `pit-491c7d0b...` (in `beaconlabs-form.service`) | Active |
| Hollow Threads (Brands Hub) | `JXPzvx...` (in store .env) | Active |
| Beacon Dashboard | `pit-32e...` (in dashboard .env) | Active |

## 3. GitHub Repository Inventory

All repositories are under the `beaconmomentum-dev` organization. The working PAT is embedded in git remotes on the Brands Hub droplet. The previously stored PAT (`ghp_ktx2CNQ...`) is **expired**.

| Repository | Last Updated | Visibility | Last Commit Summary | Branches |
|---|---|---|---|---|
| `forge-caps-store` | 2026-02-12 | Private | Initial build from Hollow Threads template | master |
| `hollow-threads-store` | 2026-02-12 | Private | Add GHL CRM integration | master |
| `bosun-openclaw-appplatform` | 2026-02-10 | Private | Integrate LinkedIn, Facebook, Slack into scheduler | main, master |
| `graduate-stores` | 2026-02-09 | Private | Add data-driven analysis report with 30-day action plan | main, master |
| `beacon-2026-dashboard` | 2026-02-06 | Private | Update phone number to toll-free (888) 437-7657 | fix/marketing-page-updates, main |
| `beacon-ecosystem-archive` | 2026-02-06 | Private | Phase 1 Nautical Modernism theme overhaul | main |
| `beacon-momentum-website` | 2026-02-04 | Public | Update welcome video to GHL-hosted version | fix/restore-lost-elements, main, master |
| `cask-cuisine-store` | 2026-01-31 | Private | Fix port to 3004 | master |
| `vitalyears-fitness-store` | 2026-01-30 | Private | Add product images for Vitality store | master |
| `beacon-customer-hub` | 2026-01-27 | Private | Add segregated lists and cross-sell tracking | master |
| `vitalyears-fitness` | 2025-12-24 | Public | — | — |
| `ghl-video-metrics-reporter` | 2025-12-22 | Public | — | — |
| `beacon-momentum-platform` | 2025-12-18 | Private | — | — |
| `joinriseandreclaim-com` | 2025-11-01 | Public | — | — |
| `beaconlabs-ai` | 2025-11-01 | Public | Add GHL demo request form | main |
| `digitalgrandpa-org` | 2025-11-01 | Public | — | — |

## 4. Services & Automation Pipelines

This section details the status of all known automated workflows.

### 4.1. Bosun Voice AI

Bosun runs as a PM2 process on the dedicated Bosun-AI droplet (143.198.20.188), not via systemd as previously documented.

*   **Process Manager:** PM2 (process name: `bosun`)
*   **Port:** 3200
*   **Repo:** `bosun-openclaw-appplatform`
*   **Live Directory:** `/home/ubuntu/bosun/` (on Bosun-AI droplet)
*   **Status:** `ACTIVE but UNSTABLE`. Running with 101 restarts observed, indicating memory pressure on the 1.9GB droplet. No git remote configured on the server for CI/CD.

### 4.2. GoHighLevel (GHL) Integration

*   **Primary Logic:** Resides within the `bosun-openclaw-appplatform` repo (`ghl.js`).
*   **API Keys:** Multiple keys in use across different services (see Section 2.2).
*   **Status:** `PARTIALLY ACTIVE`.
    *   **Beacon Labs Form -> GHL:** `ACTIVE`. The `beaconlabs-form.service` correctly creates contacts and opportunities in the `AI_NEW_INQUIRY` pipeline.
    *   **Hollow Threads -> GHL:** `ACTIVE`. CRM integration for automatic customer sync (added Feb 12).
    *   **Voice/Stripe -> GHL:** `INACTIVE`. Dependent on Bosun stability.

### 4.3. Stripe Integration

*   **Primary Logic:** Resides within the `bosun-openclaw-appplatform` repo (`stripe-webhook.js`).
*   **Webhook Signing Secret:** Stored (see Section 2.1).
*   **Status:** `PARTIALLY ACTIVE`. Live Stripe keys are configured on all stores and the Dashboard. Webhook processing depends on Bosun stability.

### 4.4. Beacon Signal Check Pipeline

*   **Skill:** `beacon-signal-check-pipeline`
*   **Core Logic:** `fulfillment_pipeline.py`
*   **Status:** `OPERATIONAL`. The workflow (AI Scan -> PDF Report -> GHL -> Email) is documented and ready for execution. Triggered manually.

### 4.5. Avatar Video Pipeline

*   **Skill:** `avatar-video-pipeline`
*   **Core Logic:** A series of Python scripts (`generate_voiceover.py`, `render_avatar_video.py`, etc.)
*   **Status:** `OPERATIONAL`. External API integrations (HeyGen, ElevenLabs) are defined and ready.

### 4.6. CI/CD Auto-Deploy

*   **Service:** `deploy-webhook.service` (Node.js app at `/opt/deploy-webhook.js`)
*   **Server:** Production droplet only
*   **Status:** `ACTIVE`. Automatically pulls changes from GitHub for all mapped repositories.
*   **Note:** Brands Hub and Bosun-AI droplets do NOT have CI/CD auto-deploy configured. Changes must be pulled manually via SSH.

### 4.7. n8n Automation

*   **Server:** Brands Hub (159.203.81.39)
*   **Access:** `n8n.beaconlabs.ai` (proxied via Nginx to Docker port 5678)
*   **Status:** `ACTIVE`. Running in Docker container.

## 5. Key People & Personas

| Name | Role | Avatar/Voice Details |
|---|---|---|
| **Bob Burr** | Founder, Host | Primary avatar for intros, outros, and milestones. |
| **Marcus Cole** | Mentor (Beacon Rise) | Avatar: `Brandon_expressive_public`, Voice: `nPczCjzI2devNBz1zQrb` |
| **Elena Voss** | Mentor (Beacon Academy) | Avatar: `Caroline_expressive2_public`, Voice: `Xb7hH8MSUJpSbSDYk0k2` |
| **Dante Rivera** | Mentor (Beacon Launch) | Avatar: `Armando_Suit_Front_public`, Voice: `cjVigY5qzO86Huf0OWal` |
| **Digital Grandpa** | Persona | Cartoon image/persona for lip-sync and video generation. |
| **Phoenix** | Agentic AI Assistant | User's preferred name for their personal AI assistant. |
| **Mubashira Amanat** | Virtual Assistant | Email: `mubashiraamanat786@gmail.com`. Authorized to receive marketing details and postable assets. |

## 6. Products & Content Assets

### 6.1. The Storm Navigator's Guide

A PLR content product rebranded for the Beacon ecosystem, produced as a multimedia bundle.

| Asset | Format | Duration / Size | Status |
|---|---|---|---|
| **Audiobook** | MP3 | 4h 6m 54s / 227 MB | Complete |
| **Video Book** | MP4 (1920x1080, H.264) | 4h 12m 47s / 745 MB | Complete but **narration is flawed** |
| **Front Cover** | PNG | 6.3 MB | Complete |
| **Back Cover** | PNG | 6.2 MB | Complete |
| **Author Photo** | PNG | 6.0 MB | Complete |

All assets are uploaded to Google Drive under a "Storm Navigators Guide" folder with subfolders for Audiobook, Video Book, Book Covers, Marketing Assets, and Strategy Docs.

**Known Issues:** The video book narration severely misinterprets callout boxes and formatting in the source material. The entire narration needs to be regenerated from corrected scripts. The scroll effect on tall text pages is jerky due to 24 FPS limitation. A sync issue with the Part 2 title page (page 061) was fixed by reducing its display from 55s to 4s.

**Strategy Documents Created:**
*   `monetization_traffic_strategy.md` — Funnel architecture: free sampler lead magnet -> $2.99 Amazon loss leader -> $34.99 bundle -> $97/month Beacon membership. Three-tier Meta ad campaign, Google Search campaigns, TikTok strategy, 5-week launch timeline.
*   `ad_placement_guide_for_bosun.md` — Step-by-step GHL Ad Manager instructions, ad copy, audience targeting, $75/day starting budget.
*   `product_listing_copy.md` — Amazon/store listing copy.

## 7. Core Workflows & Preferences

*   **GitHub Protocol:** All changes must be committed to GitHub and deployed via the CI/CD pipeline. No direct edits on the server. Deviation has previously led to significant loss of work.
*   **Single Unified Repo:** When multiple sites share a droplet, consolidate into a single GitHub repository where possible.
*   **Website Congruence:** All websites must have a unified look and feel (headers, footers, logos, etc.) to present a single, cohesive brand identity.
*   **Video Content:** Use a variety of appearances for the user's avatar. Prioritize Vimeo for private content. User dislikes YouTube.
*   **Task Estimation:** Provide granular, truthful time estimates in minutes. No padding.
*   **Troubleshooting:** Do not repeat suggestions the user has already tried. Pivot to deeper diagnosis immediately.
*   **Lead Capture:** Forms must be hosted in-house, require name/email, and use webhooks for data collection.
*   **Autonomous Work:** When instructed to work for a duration, work continuously until complete. If blocked, pivot to another solvable task. Prepare a full report when done.
*   **Batch Production:** Line up entire workflow and produce sequentially until complete. No stopping for confirmation mid-batch.
*   **Mobile Review:** Mandatory mobile review before any deployment.
*   **Community Strategy:** "Transformation over transactions." No free trials — they attract uncommitted users.
*   **Project Legacy:** All projects must be built to "outlive and surpass" the founder.
*   **Content Standards:** Eliminate all generic placeholders and stock emojis. Use custom iconography. Maintain inclusive messaging that avoids labeling or blame-shifting.
*   **Logo Format:** PNG or JPEG only.
*   **PAT Preference:** GitHub Personal Access Tokens should be configured with no expiration.

## 8. Open Items & Session Handoff

*This section is updated at the end of each Manus session.*

*   **Last Session Date:** 2026-02-27
*   **Last Session Goal:** Complete Storm Navigator's Guide video book, upload assets, audit infrastructure, create monetization strategy.
*   **Completed Actions:**
    1.  Rendered all 223 video segments for the Storm Navigator's Guide video book (4h 12m 47s, 745 MB).
    2.  Fixed Part 2 title page sync issue (page 061 duration reduced from 55s to 4s).
    3.  Uploaded all book assets (audiobook, video book, covers, strategy docs) to Google Drive.
    4.  Created monetization & traffic strategy document.
    5.  Created ad placement guide for Bosun.
    6.  Full infrastructure audit of all 3 DigitalOcean droplets and 16 GitHub repos.
    7.  Established SSH access (ed25519 key) to all 3 droplets.
    8.  Updated this ground truth file with all new findings.

*   **In Progress (Parallel Session):**
    *   Forge Caps store build (based on Hollow Threads template) on Brands Hub.
    *   VitalYears store rebuild (based on Hollow Threads template) on Brands Hub.
    *   Cask & Cuisine store updates on Brands Hub.

*   **Open Items for Future Sessions:**
    1.  **Video book narration redo** — Narration severely misinterprets callout boxes and formatting. Needs complete script regeneration and re-recording.
    2.  **Storm Navigator Asset Hub website** — Initialized (`webdev_init_project`) but not built. Intended as a searchable dashboard for all book assets.
    3.  **New GitHub PAT** — The stored PAT (`ghp_ktx2CNQ...`) is expired. A new no-expiration PAT needs to be generated.
    4.  **Production droplet cleanup** — Remove duplicate Beacon app directories, stale December backups, unused `beaconmomentum.io` directory.
    5.  **Bosun stability** — Investigate 101 restarts. Consider upsizing the droplet or optimizing memory usage.
    6.  **Bosun CI/CD** — Configure git remote on the Bosun-AI droplet for automated deployments.
    7.  **VitalYears consolidation** — Two implementations exist (WordPress on Production, Node.js on Brands Hub). Consolidate to one.
    8.  **Stripe account separation** — Three stores share one Stripe key. Create separate accounts for proper revenue tracking.
    9.  **Beacon Customer Hub** — Deployed on Brands Hub but not running in PM2. Determine if it should be started or deprecated.
    10. **Ad execution** — Strategy and guide created but no ads have been placed. Over 30 hours without active advertising.
    11. **Cask & Cuisine port mismatch** — `.env` says PORT=3003 but actually running on 3004.
    12. **Google Drive rclone** — Token expired during overnight work. No refresh token configured. Needs re-auth for future uploads.

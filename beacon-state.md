# Beacon Ecosystem: Project State & Ground Truth

**Last Updated:** 2026-02-27
**Updated By:** Manus AI
**Session:** Lighthouse Video V6 Final, Site Copy Overhaul, Pricing Restructure, Hollow Threads SSL Fix

---

This document is the single source of truth for the Beacon Momentum ecosystem. It is maintained automatically by Manus AI and serves as a persistent memory to survive session compaction. It is read at the start of every session and updated at the end.

## 1. Core Infrastructure

### 1.1. Server Architecture

The Beacon ecosystem runs across **two** DigitalOcean droplets. Manus must always deploy to the correct server.

| Server | IP Address | Nickname | Brands Hosted | SSH Access |
|---|---|---|---|---|
| **Beacon-Web-Production** | `143.198.23.240` | Primary / Web Production | Beacon Labs, Beacon Momentum, Beacon Dashboard, Digital Grandpa | `ssh -i ~/.ssh/id_ed25519 root@143.198.23.240` |
| **Beacon-Brands** | `159.203.81.39` | Brands / E-Commerce | Hollow Threads, Cask & Cuisine, Forge Caps, Vitality | `ssh -i ~/.ssh/id_ed25519 root@159.203.81.39` |

### 1.2. Shared Infrastructure

| Component | Detail | Status |
|---|---|---|
| **Web Server** | Nginx (on both servers) | `active` |
| **Process Manager** | PM2 / systemd | `active` |
| **CI/CD** | GitHub Webhook (`deploy-webhook.js` on port 9000) | `active` (143.198.23.240) |
| **Database** | MySQL | `active` (143.198.23.240) |
| **DNS & Caching** | Cloudflare (manages all domains) | `active` |

### 1.3. Cloudflare SSL/TLS Configuration

| Domain | Cloudflare SSL Mode | Notes |
|---|---|---|
| `beaconlabs.ai` | Full | Origin has SSL config with no-cache headers. A record → 143.198.23.240 |
| `hollowthreads.store` | Full (Strict) | Changed from Flexible on 2026-02-21 to fix ERR_TOO_MANY_REDIRECTS |
| `beaconmomentum.com` | (Check) | — |
| `caskandcuisine.com` | (Check) | — |

## 2. Brand & Asset Registry

This table maps every brand to its domain, GitHub repository, server, and live status.

| Brand | Domain(s) | GitHub Repo | Server IP | Live Directory | Status |
|---|---|---|---|---|---|
| **Beacon Momentum** | `beaconmomentum.com` | `beacon-momentum-website` | `143.198.23.240` | `/var/www/beaconmomentum.com` | `Live` (Static HTML) |
| **Beacon Labs** | `beaconlabs.ai` | `beaconlabs-ai` | `143.198.23.240` | `/var/www/beaconlabs.ai` | `Live` (Vite/React App) |
| **Beacon Dashboard** | `app.beaconmomentum.com` | `beacon-2026-dashboard` | `143.198.23.240` | `/var/www/beacon-2026-dashboard` | `Live` (Node.js App) |
| **Digital Grandpa** | `digitalgrandpa.org` | `digitalgrandpa-org` | `143.198.23.240` | `/var/www/digitalgrandpa.org` | `Live` (Static HTML) |
| **Vitality** | `vitalyears.fitness` | (Not in CI/CD map) | `159.203.81.39` | `/var/www/vitalyearsfitness.com` | `Live` (WordPress) |
| **Hollow Threads** | `hollowthreads.store` | `hollow-threads-store` | `159.203.81.39` | `/var/www/hollowthreads` | `Live` |
| **Cask & Cuisine** | `caskandcuisine.com` | `cask-cuisine-store` | `159.203.81.39` | `/var/www/caskcuisine` | `In Dev` |
| **Forge Caps** | (multiple domains) | (TBD) | `159.203.81.39` | (TBD) | `In Dev` |
| **The Void** | `discord.gg/thevoid` | (N/A) | (N/A) | (N/A) | `Live` (Discord) |

### 2.1. beaconlabs.ai Build & Deploy Process

Beacon Labs is a **Vite/React app** — it requires a build step, unlike the static HTML sites.

```
# Deploy workflow for beaconlabs.ai:
cd /var/www/beaconlabs.ai
git pull origin main
pnpm install
pnpm build
# Nginx serves from /var/www/beaconlabs.ai/dist/public/
# After build, copy: cp -r dist/public/* /var/www/beaconlabs.ai/dist/ (if Nginx root is /dist)
# OR ensure Nginx root points to /var/www/beaconlabs.ai/dist/public/
```

### 2.2. beaconlabs.ai Favicon

Deployed 2026-02-21. Beacon Momentum lighthouse badge logo. Files hosted on CDN (manuscdn S3), referenced in `client/index.html` via `<link>` tags.

## 3. Services & Automation Pipelines

This section details the status of all known automated workflows.

### 3.1. Bosun Voice AI

*   **Service File:** `/etc/systemd/system/bosun.service` (Currently missing/inactive on droplet)
*   **Repo:** `bosun-openclaw-appplatform`
*   **Live Directory:** `/opt/bosun`
*   **Status:** `INACTIVE`. The service file is missing and the service is not running. The core logic for voice routing, GHL integration, and Stripe webhooks exists in the repo but is not live.

### 3.2. GoHighLevel (GHL) Integration

*   **Primary Logic:** Resides within the `bosun-openclaw-appplatform` repo (`ghl.js`).
*   **API Key:** `pit-491c7d0b...` (Correct key is set in `beaconlabs-form.service`)
*   **Status:** `PARTIALLY ACTIVE`.
    *   **Beacon Labs Form -> GHL:** `ACTIVE`. The `beaconlabs-form.service` correctly creates contacts and opportunities in the `AI_NEW_INQUIRY` pipeline.
    *   **Voice/Stripe -> GHL:** `INACTIVE`. Dependent on the Bosun service being live.

### 3.3. Stripe Integration

*   **Primary Logic:** Resides within the `bosun-openclaw-appplatform` repo (`stripe-webhook.js`).
*   **Status:** `INACTIVE`. Dependent on the Bosun service being live.

### 3.4. Beacon Signal Check Pipeline

*   **Skill:** `beacon-signal-check-pipeline`
*   **Core Logic:** `fulfillment_pipeline.py`
*   **Status:** `OPERATIONAL`. The skill and scripts are defined. The workflow (AI Scan -> PDF Report -> GHL -> Email) is documented and ready for execution. It is triggered manually via the `fulfillment_pipeline.py` script.

### 3.5. Avatar Video Pipeline

*   **Skill:** `avatar-video-pipeline`
*   **Core Logic:** A series of Python scripts (`generate_voiceover.py`, `render_avatar_video.py`, etc.)
*   **Status:** `OPERATIONAL`. The skill, scripts, and external API integrations (HeyGen, ElevenLabs) are defined and ready for execution.

### 3.6. CI/CD Auto-Deploy

*   **Service:** `deploy-webhook.service` (Node.js app at `/opt/deploy-webhook.js`)
*   **Status:** `ACTIVE` on 143.198.23.240. The webhook listener is running and correctly mapped in Nginx. It automatically pulls changes from GitHub for all mapped repositories.
*   **Note:** beaconlabs.ai requires `pnpm build` after pull — the CI/CD webhook may need to be updated to handle this build step.

### 3.7. Social Media Scheduling (Puber)

*   **Status:** `ACTIVE`. Puber is the social media scheduling tool for the ecosystem.
*   **Beacon Labs:** 4 additional open posting slots available (as of 2026-02-21).
*   **Other Brands:** Bosun is responsible for crafting and uploading daily posts for Hollow Threads, Forge Caps, Cask & Cuisine, Vitality, and The Void.

## 4. Key People & Personas

| Name | Role | Avatar/Voice Details |
|---|---|---|
| **Bob Burr** | Founder, Host, Beacon Labs Spokesperson | Primary avatar for intros, outros, milestones, and the Lighthouse video series. |
| **Marcus Cole** | Mentor (Beacon Rise) | Avatar: `Brandon_expressive_public`, Voice: `nPczCjzI2devNBz1zQrb` |
| **Elena Voss** | Mentor (Beacon Academy) | Avatar: `Caroline_expressive2_public`, Voice: `Xb7hH8MSUJpSbSDYk0k2` |
| **Dante Rivera** | Mentor (Beacon Launch) | Avatar: `Armando_Suit_Front_public`, Voice: `cjVigY5qzO86Huf0OWal` |
| **Digital Grandpa** | Persona | Cartoon image/persona for lip-sync and video generation. |
| **Phoenix** | Agentic AI Assistant | User's preferred name for their personal AI assistant. |

## 5. Core Workflows & Preferences

*   **GitHub Protocol:** All changes must be committed to GitHub and deployed via the CI/CD pipeline. No direct edits on the server. If CI/CD fails, manual SSH pull is acceptable but GitHub is always the source of truth.
*   **Deployment Target:** NEVER leave sites on Manus server. All production sites live on the user's DigitalOcean servers. Manus webdev projects are development environments only.
*   **Server Awareness:** Always confirm which server a domain lives on before deploying. beaconlabs.ai = 143.198.23.240. hollowthreads.store = 159.203.81.39. Getting this wrong wastes significant time.
*   **Website Congruence:** All websites must have a unified look and feel (headers, footers, logos, etc.) to present a single, cohesive brand identity.
*   **White-Label Philosophy:** Everything Beacon Labs builds is white-label. Never expose backend providers (Printful, GHL, HeyGen, ElevenLabs, etc.) on client-facing sites. The client sees their brand, not the tools. Shopify is OK to reference as a competitive comparison point.
*   **Pricing Philosophy:** Price as engineered solutions, not software subscriptions. "If you price like software, that's what people expect" (Nick Ponte's partner). Benchmark against market rates for the expertise ($500K/year AEO skill).
*   **Video Content:** Use a variety of appearances for the user's avatar. Prioritize Vimeo for private content. Closed captions must be confined to letterbox bars using ASS format — never overlapping content. Custom bumpers replace HeyGen branded intros/outros.
*   **Task Estimation:** Provide granular, truthful time estimates in minutes. No padding.
*   **Troubleshooting:** Do not repeat suggestions the user has already tried. Pivot to deeper diagnosis immediately.
*   **Lead Capture:** Forms must be hosted in-house, require name/email, and use webhooks for data collection.

## 6. Video Assets

### 6.1. The Lighthouse of AI (V6 Final)

The primary Beacon Labs explainer/promotional video.

| Property | Value |
|---|---|
| **Version** | V6 (Final) |
| **Source** | Definitive Master Cut (`BeaconLabs_TheLighthouseofAI_DefinitiveMasterCut.mp4`) |
| **Format** | 1920x1180 letterbox, ASS captions in black bar |
| **Duration** | 99.3 seconds |
| **CDN URL (Video)** | `https://manuscdn.s3.us-east-1.amazonaws.com/user-data/GyTuUYUmxcegFSpG.mp4` |
| **CDN URL (Thumbnail)** | `https://manuscdn.s3.us-east-1.amazonaws.com/user-data/0qJjLlJvbVBCwTIr.jpg` |
| **Edits Applied** | Removed HeyGen intro/outro (replaced with custom hero lighthouse bumpers), fixed businessman blip at 24.7s, fixed CTA loop (extended to 86.5s for full dialogue), letterbox captions via ASS |
| **Bumpers** | Custom hero lighthouse imagery (intro_bumper_v2.mp4, outro_bumper_v2.mp4) |

## 7. Beacon Labs Site Copy & Pricing (Current as of 2026-02-21)

### 7.1. Pricing Tiers

| Tier | Monthly Range | Positioning |
|---|---|---|
| **Foundation** | $2,500 – $5,000/mo | AI visibility audit, content strategy, foundational AEO |
| **Digital Infrastructure** | $5,000 – $10,000/mo | Full ecosystem build — web, content automation, custom engineering |
| **Enterprise** | $10,000 – $25,000/mo | Custom agent development, video production, full-stack AI infrastructure |

Section header: "Engineered Solutions, Not Software Subscriptions"
Market anchoring: "The expertise behind these systems commands $500K/year on the open market. We deploy it as infrastructure for your business."

### 7.2. Key Messaging Themes

*   **Competitive urgency:** "Your competitors are already investing in AI visibility — are you?"
*   **Value anchoring:** "$500K/year expertise deployed as a service so you don't have to learn it"
*   **First-mover authority:** Beacon Labs has been doing AEO before the market had a name for it
*   **White-label bespoke:** "We sit down with you, figure out what you need, and build it — white-labeled under your brand"
*   **Market validation:** Christian Peverelli YouTube video ("5 AI Skills Worth $500K/Year by 2027") confirms AEO, AI Automation, and AI Consulting as top growth areas

## 8. Open Items & Session Handoff

*This section is updated at the end of each Manus session.*

*   **Last Session Date:** 2026-02-27
*   **Last Session Goal:** Lighthouse video V6 editing, beaconlabs.ai copy overhaul, pricing restructure, Hollow Threads SSL fix, ground truth update.
*   **Completed Actions:**
    1.  Built Lighthouse video V6 (final) — fixed businessman blip, CTA loop, removed HeyGen outro, letterbox captions.
    2.  Deployed V6 to beaconlabs.ai on DigitalOcean (143.198.23.240) and CDN.
    3.  Fixed Hollow Threads ERR_TOO_MANY_REDIRECTS — changed Cloudflare SSL to Full (Strict).
    4.  Fixed beaconlabs.ai Nginx SSL config — added SSL server block and no-cache headers on 143.198.23.240.
    5.  Updated beaconlabs.ai site copy with competitive urgency, value anchoring, and first-mover authority messaging.
    6.  Restructured pricing from $1,500-$15,000 to $2,500-$25,000, benchmarked against industry AEO rates.
    7.  Removed all backend provider names (Printful, GHL, HeyGen, ElevenLabs) — replaced with capability descriptions.
    8.  Reinforced white-label bespoke positioning across all site sections.
    9.  Deployed favicon (Beacon Momentum lighthouse badge) to beaconlabs.ai.
    10. Identified and documented two-server architecture (143.198.23.240 vs 159.203.81.39).
    11. Updated this ground truth file with all session findings.

*   **Open / Carry-Forward Items:**
    1.  **Social media clips for Beacon Labs** — Extract 15s, 30s, 60s clips from Lighthouse V6 for LinkedIn, Instagram, X. Puber has 4 open spots. OVERDUE from Feb 21.
    2.  **Bosun daily post verification** — Confirm Bosun has crafted/uploaded posts for Hollow Threads, Forge Caps, Cask & Cuisine, Vitality, The Void. Slack MCP OAuth needs re-authorization.
    3.  **beaconmomentum.com mobile white screen** — Reported but never diagnosed. Still outstanding.
    4.  **CI/CD build step for beaconlabs.ai** — The deploy webhook may need updating to run `pnpm build` after pulling beaconlabs-ai (it's a Vite/React app, not static HTML).
    5.  **Forge Caps** — Domain(s) and live directory not yet documented. Has two URLs per user. Lives on 159.203.81.39.
    6.  **Free AI Visibility Audit landing page** — Suggested but not yet built. Dedicated lead capture page separate from main contact section.
    7.  **Case study section** — Suggested for beaconlabs.ai to back premium pricing with proof (e.g., Hollow Threads results).

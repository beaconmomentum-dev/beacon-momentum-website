# Beacon Ecosystem: Project State & Ground Truth

**Last Updated:** 2026-02-27
**Updated By:** Manus AI

---

This document is the single source of truth for the Beacon Momentum ecosystem. It is maintained automatically by Manus AI and serves as a persistent memory to survive session compaction. It is read at the start of every session and updated at the end.

## 1. Core Infrastructure

| Component | Detail | IP Address | Status |
|---|---|---|---|
| **Primary Server** | DigitalOcean Droplet | `143.198.23.240` | `active` |
| **Hollow Threads Server** | DigitalOcean Droplet | `159.203.81.39` | `active` |
| **Primary User** | `root` | (N/A) | `active` |
| **Web Server** | Nginx | (N/A) | `active` |
| **Process Manager** | PM2 / systemd | (N/A) | `active` |
| **CI/CD** | GitHub Webhook (`deploy-webhook.js` on port 9000) | (N/A) | `active` |
| **Database** | MySQL | (N/A) | `active` |
| **DNS & Caching** | Cloudflare | (N/A) | `active` |

## 2. Brand & Asset Registry

This table maps every brand to its domain, GitHub repository, and live status.

| Brand | Domain(s) | GitHub Repo | Live Directory | Status |
|---|---|---|---|---|
| **Beacon Momentum** | `beaconmomentum.com` | `beacon-momentum-website` | `/var/www/beaconmomentum.com` | `Live` (Static HTML) |
| **Beacon Labs** | `beaconlabs.ai` | `beaconlabs-ai` | `/var/www/beaconlabs.ai` | `Live` (Vite/React App) |
| **Beacon Dashboard** | `app.beaconmomentum.com` | `beacon-2026-dashboard` | `/var/www/beacon-2026-dashboard` | `Live` (Node.js App) |
| **Digital Grandpa** | `digitalgrandpa.org` | `digitalgrandpa-org` | `/var/www/digitalgrandpa.org` | `Live` (Static HTML) |
| **Vitality** | `vitalyears.fitness` | (Not in CI/CD map) | `/var/www/vitalyearsfitness.com` | `Live` (WordPress) |
| **Hollow Threads** | `hollowthreads.store` | `hollow-threads-store` | `/var/www/hollowthreads` | `Live` (Node/React App) |
| **Cask & Cuisine** | `caskandcuisine.com` | `cask-cuisine-store` | `/var/www/caskcuisine` | `In Dev` |
| **The Void** | `discord.gg/thevoid` | (N/A) | (N/A) | `Live` (Discord) |

## 3. Brand Details

### 3.1. Hollow Threads

*   **Concept:** A dark, gothic, and emo-inspired apparel brand.
*   **Products:** 24 core designs available on 6 garment types (Classic Tee, Heavy Tee, Crop Top, Long Sleeve, Crewneck, Hoodie) and as a sticker accessory.
*   **Fulfillment:** Print-on-demand via Printful.
*   **Unique Feature:** "Scan the Skull" icon is hidden in every design. Customers who find it on their physical garment can earn a co-design opportunity and lifetime revenue share on a future design.

## 4. Services & Automation Pipelines

This section details the status of all known automated workflows.

### 4.1. Bosun Voice AI

*   **Status:** `INACTIVE`. The `bosun.service` file is missing on the primary server and the service is not running.

### 4.2. GoHighLevel (GHL) Integration

*   **Status:** `PARTIALLY ACTIVE`.
    *   **Beacon Labs Form -> GHL:** `ACTIVE`. The `beaconlabs-form.service` correctly creates contacts and opportunities.
    *   **Voice/Stripe -> GHL:** `INACTIVE`. Dependent on the Bosun service being live.

### 4.3. Stripe Integration

*   **Status:** `INACTIVE`. Dependent on the Bosun service being live.

### 4.4. CI/CD Auto-Deploy

*   **Status:** `ACTIVE`. The webhook listener at `/opt/deploy-webhook.js` automatically deploys changes from GitHub for all mapped repositories.

### 4.5. Hollow Threads AI Virtual Try-On

*   **Status:** `ACTIVE`
*   **Endpoint:** `POST /api/tryon/generate` on `hollowthreads.store`.
*   **Technology:** Replicate IDM-VTON model (`cuuupid/idm-vton`).
*   **API Key:** `REPLICATE_API_TOKEN` stored in `.env` on the Hollow Threads server.
*   **Core Logic:** `tryon-api.js` and `garment-image-generator.js` in the `hollow-threads-store` repo.
*   **Features:** On-the-fly garment image generation, email gate for lead capture, rate limiting.

### 4.6. Hollow Threads Skull Hunt Giveaway

*   **Status:** `ACTIVE`
*   **Concept:** An ongoing viral marketing campaign combining a $100/week cash giveaway with a "Where's Waldo" style hunt for hidden skull icons.
*   **Core Logic:** `giveaway-api.js` and `src/components/SkullHuntSidebar.tsx` in the `hollow-threads-store` repo.
*   **Features:** Homepage sidebar widget for registration, social sharing for extra entries, unique codes hidden in images for bonus entries, and a separate reward track for customers who find the skull on physical garments.

## 5. External Service Integrations

| Service | Brand | Purpose | Status |
|---|---|---|---|
| **Printful** | Hollow Threads | Print-on-demand fulfillment | `Active` |
| **Replicate** | Hollow Threads | AI Virtual Try-On (IDM-VTON) | `Active` |
| **Publer** | All Brands | Social media scheduling (managed by Bosun) | `Active` |
| **Google Drive** | All Brands | Asset storage and sharing | `Active` |

## 6. Key People & Personas

| Name | Role | Avatar/Voice Details |
|---|---|---|
| **Bob Burr** | Founder, Host | Primary avatar for intros, outros, and milestones. |
| **Bosun** | Social Media Manager | Executes content schedules via Publer. |
| **Marcus Cole** | Mentor (Beacon Rise) | Avatar: `Brandon_expressive_public`, Voice: `nPczCjzI2devNBz1zQrb` |
| **Elena Voss** | Mentor (Beacon Academy) | Avatar: `Caroline_expressive2_public`, Voice: `Xb7hH8MSUJpSbSDYk0k2` |
| **Dante Rivera** | Mentor (Beacon Launch) | Avatar: `Armando_Suit_Front_public`, Voice: `cjVigY5qzO86Huf0OWal` |
| **Digital Grandpa** | Persona | Cartoon image/persona for lip-sync and video generation. |
| **Phoenix** | Agentic AI Assistant | User's preferred name for their personal AI assistant. |

## 7. Core Workflows & Preferences

*   **GitHub Protocol:** All changes must be committed to GitHub and deployed via the CI/CD pipeline. No direct edits on the server.
*   **Website Congruence:** All websites must have a unified look and feel (headers, footers, logos, etc.).
*   **Task Estimation:** Provide granular, truthful time estimates in minutes.
*   **Troubleshooting:** Do not repeat suggestions the user has already tried. Pivot to deeper diagnosis.
*   **Lead Capture:** Forms must be hosted in-house, require name/email, and use webhooks for data collection.
*   **AI Judgment:** User trusts AI's judgment on implementation details when specified (e.g., "whatever you believe works best").

## 8. Open Items & Session Handoff

*This section is updated at the end of each Manus session.*

*   **Last Session Goal:** Review session, extract meaningful data, and update this ground truth file.
*   **Completed Actions (This Session):**
    1.  Implemented a full-featured **AI Virtual Try-On** for Hollow Threads using the Replicate API.
    2.  Fixed a bug in the sticker mockup generation process, regenerating all 27 sticker images with proper transparent backgrounds and kiss-cut borders.
    3.  Designed and deployed the **"Skull Hunt" viral giveaway campaign**, including a homepage sidebar widget, server-side API for entry tracking, a content calendar for Bosun, and all required image assets.
    4.  Fixed the **Printful outside label tag** by creating a transparent background version to resolve a production hold.
    5.  Updated this ground truth file with all new infrastructure, code, and campaign details.
*   **Next Action (User):** The user needs to log into Printful, upload the new transparent label file (`outside-label-square-transparent.png`) to the appropriate product template, and remove the hold on order #PF146342309.

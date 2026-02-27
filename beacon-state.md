# Beacon Ecosystem: Project State & Ground Truth

**Last Updated:** 2026-02-27
**Updated By:** Manus AI

---

This document is the single source of truth for the Beacon Momentum ecosystem. It is maintained automatically by Manus AI and serves as a persistent memory to survive session compaction. It is read at the start of every session and updated at the end.

## 1. Core Infrastructure

| Component | Detail | Status |
|---|---|---|
| **Primary Server** | DigitalOcean Droplet | `active` |
| **IP Address** | `143.198.23.240` | `static` |
| **Primary User** | `root` | `active` |
| **Web Server** | Nginx | `active` |
| **Process Manager** | PM2 / systemd | `active` |
| **CI/CD** | GitHub Webhook (`deploy-webhook.js` on port 9000) | `active` |
| **Database** | MySQL | `active` |
| **DNS & Caching** | Cloudflare | `active` |

## 2. Brand & Asset Registry

This table maps every brand to its domain, GitHub repository, and live status.

| Brand | Domain(s) | GitHub Repo | Live Directory | Status |
|---|---|---|---|---|
| **Beacon Momentum** | `beaconmomentum.com` | `beacon-momentum-website` | `/var/www/beaconmomentum.com` | `Live` (Static HTML) |
| **Beacon Labs** | `beaconlabs.ai` | `beaconlabs-ai` | `/var/www/beaconlabs.ai` | `Live` (Vite/React App) |
| **Beacon Dashboard** | `app.beaconmomentum.com` | `beacon-2026-dashboard` | `/var/www/beacon-2026-dashboard` | `Live` (Node.js App) |
| **Digital Grandpa** | `digitalgrandpa.org` | `digitalgrandpa-org` | `/var/www/digitalgrandpa.org` | `Live` (Static HTML) |
| **Vitality** | `vitalyears.fitness` | (Not in CI/CD map) | `/var/www/vitalyearsfitness.com` | `Live` (WordPress) |
| **Hollow Threads** | `hollowthreads.store` | `hollow-threads-store` | `/var/www/hollowthreads` | `In Dev` |
| **Cask & Cuisine** | `caskandcuisine.com` | `cask-cuisine-store` | `/var/www/caskcuisine` | `In Dev` |
| **The Void** | `discord.gg/thevoid` | (N/A) | (N/A) | `Live` (Discord) |

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
*   **Status:** `ACTIVE`. The webhook listener is running and correctly mapped in Nginx. It automatically pulls changes from GitHub for all mapped repositories.

## 4. Key People & Personas

| Name | Role | Avatar/Voice Details |
|---|---|---|
| **Bob Burr** | Founder, Host | Primary avatar for intros, outros, and milestones. |
| **Marcus Cole** | Mentor (Beacon Rise) | Avatar: `Brandon_expressive_public`, Voice: `nPczCjzI2devNBz1zQrb` |
| **Elena Voss** | Mentor (Beacon Academy) | Avatar: `Caroline_expressive2_public`, Voice: `Xb7hH8MSUJpSbSDYk0k2` |
| **Dante Rivera** | Mentor (Beacon Launch) | Avatar: `Armando_Suit_Front_public`, Voice: `cjVigY5qzO86Huf0OWal` |
| **Digital Grandpa** | Persona | Cartoon image/persona for lip-sync and video generation. |
| **Phoenix** | Agentic AI Assistant | User's preferred name for their personal AI assistant. |

## 5. Core Workflows & Preferences

*   **GitHub Protocol:** All changes must be committed to GitHub and deployed via the CI/CD pipeline. No direct edits on the server.
*   **Website Congruence:** All websites must have a unified look and feel (headers, footers, logos, etc.) to present a single, cohesive brand identity.
*   **Video Content:** Use a variety of appearances for the user's avatar. Prioritize Vimeo for private content.
*   **Task Estimation:** Provide granular, truthful time estimates in minutes. No padding.
*   **Troubleshooting:** Do not repeat suggestions the user has already tried. Pivot to deeper diagnosis.
*   **Lead Capture:** Forms must be hosted in-house, require name/email, and use webhooks for data collection.

## 6. Open Items & Session Handoff

*This section is updated at the end of each Manus session.*

*   **Last Session Goal:** Build a persistent project state file.
*   **Completed Actions:**
    1.  Audited all known skills, repos, and live server configurations.
    2.  Identified discrepancies between expected state (Bosun running) and actual state (Bosun inactive).
    3.  Drafted this `beacon-state.md` document to serve as the ground truth.
    4.  Deployed the state file to the droplet and exposed it via a read endpoint.
*   **Next Action:** Write a session-start prompt for Manus to use at the beginning of every session.

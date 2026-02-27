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

## 4. Open Items & Session Handoff

*This section is updated at the end of each Manus session.*

*   **Last Session Goal:** Build a persistent project state file.
*   **Completed Actions:**
    1.  Audited all known skills, repos, and live server configurations.
    2.  Identified discrepancies between expected state (Bosun running) and actual state (Bosun inactive).
    3.  Drafted this `beacon-state.md` document to serve as the ground truth.
*   **Next Action:** Deploy this file to the droplet and expose it via a read endpoint for persistent access.

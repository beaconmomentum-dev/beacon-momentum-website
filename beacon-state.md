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

### 2.1. Digital Grandpa Brand Details

| Attribute | Value |
|---|---|
| **Mailing Address** | P.O. Box 244, Cheshire, Massachusetts 01225-0244 |
| **Primary Color (Navy Blue)** | `#1A2744` |
| **Accent Color (Gold)** | `#D4AF37` |
| **Tagline** | "Sometimes you don't need a guru. You need a grandpa." |
| **Designation** | Veteran Owned |
| **Website** | `digitalgrandpa.org` (NOT `.com`) |

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

| Name | Role | Details |
|---|---|---|
| **Robert "Bob" Burr** | Founder, Host | Primary avatar for intros, outros, and milestones. Formal name: Robert Burr. |
| **Marcus Cole** | Mentor (Beacon Rise) | Avatar: `Brandon_expressive_public`, Voice: `nPczCjzI2devNBz1zQrb` |
| **Elena Voss** | Mentor (Beacon Academy) | Avatar: `Caroline_expressive2_public`, Voice: `Xb7hH8MSUJpSbSDYk0k2` |
| **Dante Rivera** | Mentor (Beacon Launch) | Avatar: `Armando_Suit_Front_public`, Voice: `cjVigY5qzO86Huf0OWal` |
| **Digital Grandpa** | Persona | Cartoon image/persona for lip-sync and video generation. |
| **Phoenix** | Agentic AI Assistant | User's preferred name for their personal AI assistant. |

### 4.1. Depositors & Clients

| Name | Preferred Name | Contact | Address |
|---|---|---|---|
| **James Scott Ferero** | Scott (goes by middle name) | Cell: (970) 471-0354, Email: jsfereroservices@gmail.com | 5744 Apache Street, Zephyrhills, Florida 33542 |

## 5. Core Workflows & Preferences

*   **GitHub Protocol:** All changes must be committed to GitHub and deployed via the CI/CD pipeline. No direct edits on the server.
*   **Website Congruence:** All websites must have a unified look and feel (headers, footers, logos, etc.) to present a single, cohesive brand identity.
*   **Video Content:** Use a variety of appearances for the user's avatar. Prioritize Vimeo for private content.
*   **Task Estimation:** Provide granular, truthful time estimates in minutes. No padding.
*   **Troubleshooting:** Do not repeat suggestions the user has already tried. Pivot to deeper diagnosis.
*   **Lead Capture:** Forms must be hosted in-house, require name/email, and use webhooks for data collection.
*   **Depositor Correspondence:** Use "Dear Scott" (middle name) for James Scott Ferero. Formal documents use full legal name.

## 6. Investment Tracking (Digital Grandpa)

### 6.1. Ferero Investment

| Parameter | Value |
|---|---|
| **Depositor** | James Scott Ferero |
| **Original Deposit** | $200,000.00 (received September 1, 2025) |
| **Prior Seed Capital Credit** | $25,000.00 (pre-9/1/25) |
| **Total Principal** | $225,000.00 |
| **Annual Return Rate** | 20% |
| **Quarterly Rate** | 5.00% |
| **Term** | 2 years (8 quarters) |
| **Start Date** | September 1, 2025 |
| **Maturity Date** | August 31, 2027 |
| **Projected Maturity Value** | $332,427.47 |
| **Total Projected Return** | 47.75% |

### 6.2. Quarterly Distribution Schedule

| Quarter | Period End | Opening Balance | Interest Earned | Closing Balance | Status |
|---|---|---|---|---|---|
| Q1 | Nov 30, 2025 | $225,000.00 | $11,250.00 | $236,250.00 | Reinvested — Acknowledgement letter issued |
| Q2 | Feb 28, 2026 | $236,250.00 | $11,812.50 | $248,062.50 | Reinvested — Acknowledgement letter issued |
| Q3 | May 31, 2026 | $248,062.50 | $12,403.13 | $260,465.63 | Pending |
| Q4 | Aug 31, 2026 | $260,465.63 | $13,023.28 | $273,488.91 | Pending |
| Q5 | Nov 30, 2026 | $273,488.91 | $13,674.45 | $287,163.35 | Pending |
| Q6 | Feb 28, 2027 | $287,163.35 | $14,358.17 | $301,521.52 | Pending |
| Q7 | May 31, 2027 | $301,521.52 | $15,076.08 | $316,597.59 | Pending |
| Q8 | Aug 31, 2027 | $316,597.59 | $15,829.88 | $332,427.47 | Pending (Maturity) |

### 6.3. Documents Issued

| Document | Date | File |
|---|---|---|
| Investment Return Worksheet (Excel) | — | `Digital_Grandpa_Investment_Worksheet.xlsx` |
| Investment Return Worksheet (PDF) | — | `Digital_Grandpa_Investment_Worksheet.pdf` |
| Q1 Reinvestment Acknowledgement Letter | Nov 30, 2025 | `Digital_Grandpa_Reinvestment_Acknowledgement.pdf` |
| Q2 Reinvestment Acknowledgement Letter | Feb 28, 2026 | `Digital_Grandpa_Q2_Reinvestment_Acknowledgement.pdf` |
| #10 Mailing Envelope | — | `Digital_Grandpa_Envelope.pdf` |

## 7. Open Items & Session Handoff

*This section is updated at the end of each Manus session.*

*   **Last Session Goal:** Create Digital Grandpa branded investment return worksheet, reinvestment acknowledgement letters (Q1 & Q2), and printable #10 mailing envelope for depositor James Scott Ferero.
*   **Completed Actions:**
    1.  Created investment return worksheet (Excel + PDF) for $225K principal at 20% annual / 5% quarterly over 8 quarters.
    2.  Created Q1 reinvestment acknowledgement letter (Nov 30, 2025) — $11,250 reinvested, new balance $236,250.
    3.  Created Q2 reinvestment acknowledgement letter (Feb 28, 2026) — $11,812.50 reinvested, new balance $248,062.50.
    4.  Created #10 envelope with Digital Grandpa branding and Robert Burr return address.
    5.  Updated beacon-state.md with all new session data.
*   **Open Items:**
    *   Q3–Q8 reinvestment acknowledgement letters to be generated as each quarter matures.
    *   Final maturity statement to be generated at term end (Aug 31, 2027).
*   **Next Action:** Generate Q3 acknowledgement letter when May 31, 2026 distribution is confirmed.

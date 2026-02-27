# Beacon Ecosystem: Project State & Ground Truth

**Last Updated:** 2026-02-12
**Updated By:** Manus AI
**Session:** Accessing Second Account for Context Consolidation

---

This document is the single source of truth for the Beacon Momentum ecosystem. It is maintained automatically by Manus AI and serves as a persistent memory to survive session compaction. It is read at the start of every session and updated at the end.

## 1. Core Infrastructure

### 1.1. Server Architecture

The Beacon ecosystem runs across **three** DigitalOcean droplets. Manus must always deploy to the correct server.

| Server | IP Address | Nickname | Purpose / Brands Hosted | SSH Access |
|---|---|---|---|---|
| **Beacon-Web-Production** | `143.198.23.240` | Primary / Web Production | Main marketing websites, CI/CD webhook | `ssh -i ~/.ssh/id_ed25519 root@143.198.23.240` |
| **Beacon-Brands-Hub** | `159.203.81.39` | Brands / E-Commerce | n8n, Graduate Stores (Hollow Threads, Cask & Cuisine, Forge Caps, Vitality) | `ssh -i ~/.ssh/id_ed25519 root@159.203.81.39` |
| **Beacon-Bosun-AI** | `143.198.20.188` | Bosun / AI Engine | Bosun AI service, PM2 | `ssh -i ~/.ssh/id_ed25519 root@143.198.20.188` |

### 1.2. Shared Infrastructure

| Component | Detail | Status |
|---|---|---|
| **Web Server** | Nginx (on all servers) | `active` |
| **Process Manager** | PM2 / systemd | `active` |
| **CI/CD** | GitHub Webhook (`deploy-webhook.js` on port 9000) | `active` (143.198.23.240) |
| **Database** | MySQL | `active` (143.198.23.240) |
| **DNS & Caching** | Cloudflare (manages all domains) | `active` |

## 2. Brand & Asset Registry

This table maps every brand to its domain, GitHub repository, server, and live status.

| Brand | Domain(s) | GitHub Repo | Server IP | Live Directory | Status |
|---|---|---|---|---|---|
| **Beacon Momentum** | `beaconmomentum.com` | `beacon-momentum-website` | `143.198.23.240` | `/var/www/beaconmomentum.com` | `Live` (Static HTML) |
| **Beacon Labs** | `beaconlabs.ai` | `beaconlabs-ai` | `143.198.23.240` | `/var/www/beaconlabs.ai` | `Live` (Vite/React App) |
| **Beacon Dashboard** | `app.beaconmomentum.com` | `beacon-2026-dashboard` | `143.198.23.240` | `/var/www/beacon-2026-dashboard` | `Live` (Node.js App) |
| **Digital Grandpa** | `digitalgrandpa.org` | `digitalgrandpa-org` | `143.198.23.240` | `/var/www/digitalgrandpa.org` | `Live` (Static HTML) |
| **Hollow Threads** | `hollowthreads.store` | `hollow-threads-store` | `159.203.81.39` | `/var/www/hollowthreads` | `Live` (No sales) |
| **Cask & Cuisine** | `caskandcuisine.com` | `cask-cuisine-store` | `159.203.81.39` | `/var/www/caskcuisine` | `In Dev` |
| **Forge Caps** | `forgecaps.store` | (TBD) | `159.203.81.39` | (TBD) | `In Dev` |
| **Vitality** | `vitalitywellness.com` | (Not in CI/CD map) | `159.203.81.39` | `/var/www/vitalyearsfitness.com` | `Live` (WordPress) |
| **The Void** | `discord.gg/thevoid` | (N/A) | (N/A) | (N/A) | `Live` (Discord) |

## 3. Services & Automation Pipelines

### 3.1. API Integrations & Credentials

| Service | Status | Credential Location / Notes |
|---|---|---|
| **GoHighLevel (GHL)** | `ACTIVE` | Agency API Key confirmed. Stored in Manus env. |
| **Printful** | `ACTIVE` | API Key confirmed. Stored in Manus env. |
| **ElevenLabs** | `ACTIVE` | API Key confirmed. Stored in Manus env. |
| **Stripe** | `ACTIVE` | Public Key (`pk_live_...`) confirmed. Secret key (`sk_live_...`) required for full access. MCP enabled for next session. |
| **PayPal** | `PENDING` | MCP enabled for next session. |
| **Slack** | `AUTH_ERROR` | MCP enabled for next session, but requires re-authentication. |
| **HeyGen** | `ACTIVE` | Connected via MCP. |
| **Cloudflare** | `ACTIVE` | Connected via MCP. |
| **GitHub** | `ACTIVE` | Connected via MCP. UUID: `bbb0df76-66bd-4a24-ae4f-2aac4750d90b`. |

### 3.2. Social Media Scheduling (Publer)

*   **Status:** `ACTIVE`. Publer is the social media scheduling tool for the ecosystem, accessed via the "Bosun Automation" workspace.
*   **Connected Accounts:**
    *   **Beacon Momentum:** Facebook, LinkedIn, Twitter/X
    *   **Hollow Threads:** Facebook, Instagram, TikTok, Pinterest
*   **Gaps:** No accounts connected for Forge Caps, Cask & Cuisine, or Vital Years. No Instagram for Beacon Momentum.

### 3.3. Bosun AI

*   **Repo:** `bosun-openclaw-appplatform`
*   **Live Directory:** `/opt/bosun` on `143.198.20.188`
*   **Status:** `CRITICAL - DOWN`. The core service is down due to a corrupted `llm.js` file. Manual SSH intervention is required to repair.

### 3.4. n8n Automation

*   **Location:** Hosted on `159.203.81.39` (Beacon-Brands-Hub).
*   **Status:** `ACTIVE`, but key workflows are not yet built.
*   **Priority Workflow:** GHL-to-Printful order routing needs to be built and tested.

## 4. Key People & Personas

| Name | Role | Avatar/Voice Details |
|---|---|---|
| **Bob Burr** | Founder, Host | Primary avatar for intros/outros. Placeholder: `Mido-pro-greysweater-20221209` + Brian voice. |
| **Shannon** | Founder, Forge Caps | His personal story is the core brand asset. |
| **Mubashira Amanat** | VA / Ops Manager | Transitioning to oversee Graduate Store automation. |
| **Domenic, John, Michael**| Founders | Vital Years, Cask & Cuisine. |
| **Marcus Cole** | Mentor (Beacon Rise) | Avatar: `Brandon_expressive_public`, Voice: `nPczCjzI2devNBz1zQrb` (Brian) |
| **Elena Voss** | Mentor (Beacon Academy) | Avatar: `Caroline_expressive2_public`, Voice: `Xb7hH8MSUJpSbSDYk0k2` (Alice) |
| **Dante Rivera** | Mentor (Beacon Launch) | Avatar: `Armando_Suit_Front_public`, Voice: `cjVigY5qzO86Huf0OWal` (Eric) |
| **James Harlow** | Mentor | Avatar: `Bryce_public_1`, Voice: `JBFqnCBsd6RMkjVDRZzb` (George) |
| **Ava Chen** | Mentor | Avatar: `Annie_expressive_public`, Voice: `XrExE9yKIg1WjnnlVkGX` (Matilda) |
| **Sophie Laurent**| Mentor | Avatar: `Bahar_Business_Front_public`, Voice: `hpp4J3VqNfWAUOO0d1Us` (Bella) |
| **Nate Calloway** | Mentor | Avatar: `Byron_Casual_Front_public`, Voice: `iP95p4xoKVk53GoZ742B` (Chris) |
| **Priya Sharma** | Mentor | Avatar: `Candace_Beige_Dress_Front`, Voice: `cgSgspJ2msm6clMCkdW9` (Jessica) |
| **Digital Grandpa**| Persona | Cartoon image/persona for lip-sync and video generation. |
| **Phoenix** | Agentic AI Assistant | User's preferred name for their personal AI assistant. |

## 5. Core Workflows & Preferences

*   **Pricing:** Product price is **$297**. Never $247 or $147.
*   **Personal Time:** Never promise Bob Burr's personal time or direct interaction.
*   **Messaging Theme:** Maintain the "team approach" and "watch" theme: "The Lighthouse Is Lit. Join Us at the Watch."
*   **GitHub Protocol:** All changes must be committed to GitHub and deployed via the CI/CD pipeline. GitHub is the source of truth.
*   **Server Awareness:** Always confirm which server a domain lives on before deploying.
*   **Website Congruence:** All websites must have a unified look and feel.
*   **White-Label Philosophy:** Never expose backend providers on client-facing sites.

## 6. Strategic Imperatives & Open Items

*   **Primary Goal:** Pivot from infrastructure building to revenue generation. The ecosystem has a ~$200K investment with **zero revenue** to date.
*   **Immediate Priority:** Make **Forge Caps** profitable. This involves completing the GHL store setup, which is the #1 blocker.
*   **Go-to-Market Strategy:** Aggressive affiliate and influencer marketing, paying commission-only.
*   **Sales Tactic:** "Results in Advance" — create value for prospects before the first contact.

### 6.1. Open / Carry-Forward Items

1.  **Repair Bosun AI:** SSH into `143.198.20.188` and fix the corrupted `llm.js` file.
2.  **Build Forge Caps Store:** Use the GHL Agency API to programmatically build the store.
3.  **Build n8n Workflow:** Create the GHL -> Stripe -> Printful order fulfillment workflow.
4.  **End-to-End Test:** Test the entire order flow for Forge Caps.
5.  **Deploy Social Content:** Schedule the 120+ existing social media posts via Publer.
6.  **Connect Social Accounts:** Add Forge Caps, Vital Years, and Cask & Cuisine accounts to Publer.
7.  **B2B Materials:** Determine the status of the B2B sales materials.

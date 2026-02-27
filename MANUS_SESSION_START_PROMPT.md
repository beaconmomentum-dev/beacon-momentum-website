# Manus Session-Start Protocol

**This prompt must be executed at the beginning of every session before any planning or action is taken.**

---

## Step 1: Load Project State

Fetch the live project state file from the production server:

```
curl -sL https://beaconlabs.ai/state
```

Read the full contents. This is the ground truth for the Beacon Momentum ecosystem. It tells you what is built, what is live, what is broken, and what the next open item is. Do not proceed until you have read it.

---

## Step 2: Confirm Your Context

After reading the state file, you know the following without asking the user:

**The Operator:** Bob Burr, founder of the Beacon Momentum ecosystem. Non-technical background. Travels frequently. Expects autonomous execution with minimal hand-holding. His personal AI assistant is named **Phoenix**.

**The Business:** Beacon Momentum is a life transition mentorship platform for veterans, rebuilders, and dreamers. It operates five brands: Beacon Momentum (main platform), Beacon Labs (AI services), Digital Grandpa (veterans/seniors/youth), Vitality (wellness), and The Void (Discord community). Two e-commerce brands are in development: Hollow Threads and Cask & Cuisine.

**The Stack:**
- Server: DigitalOcean droplet at `143.198.23.240`, accessed via `root@` with the `bosun_key` SSH key
- DNS: Cloudflare (all domains). When troubleshooting redirects or SSL, Cloudflare is always in the chain.
- CI/CD: GitHub webhook (`deploy-webhook.js`) auto-deploys pushes to `main` for all mapped repos
- CRM: GoHighLevel (GHL), API key `pit-491c7d0b...`, location `Z4OoFmxrotxASibl2PKv`
- Email: SendGrid, key `SG.SvVrrpk7Q0yxx9Zn7TKsqw...`
- Voice: Bosun AI agent (Twilio + OpenAI), currently inactive — service file missing from droplet
- Payments: Stripe, webhook handled by `stripe-webhook.js` in `bosun-openclaw-appplatform` repo
- Video: HeyGen (avatar rendering), ElevenLabs (TTS), FFmpeg (stitching)
- GitHub org: `beaconmomentum-dev`, token: stored in repo remote URL on sandbox (check `git remote -v` in any cloned repo)

---

## Step 3: Apply These Rules Without Being Reminded

These are standing instructions that apply to every session:

**GitHub Protocol:** Every change to any file must be committed to the corresponding GitHub repo and pushed. The CI/CD pipeline handles deployment automatically. Never edit files only on the server. If the CI/CD fails, do a manual pull via SSH — but the repo is always the source of truth.

**Cloudflare Caching:** When a change is not showing on the live site, do not suggest purging the Cloudflare cache if the user has already done it. Diagnose deeper. Cloudflare proxies all HTTP traffic; the server only receives requests that pass through it.

**Troubleshooting:** If the user says they already tried something, accept it as fact and move on. Do not repeat suggestions. Do not gaslight.

**Time Estimates:** Give granular estimates in minutes. No padding. No vague "this will take a while."

**Task Completion:** Do not report a task as done unless you have verified it end-to-end. Check links, test endpoints, confirm services are running.

**Video Content:** When creating avatar videos, vary Bob Burr's appearance across sessions. Prioritize Vimeo for private content. Never recommend YouTube.

**Lead Capture:** All forms must be hosted on the user's own domains, require name and email, and use webhooks for data collection.

**Brand Congruence:** All websites must have unified headers, footers, and branding. They are one ecosystem, not separate sites.

---

## Step 4: Check the Open Items

The state file contains a "Open Items & Session Handoff" section. Read it. The most recent entry tells you exactly what was last worked on and what comes next. If the user's new request conflicts with or extends that context, note it before proceeding.

---

## Step 5: Update the State File at Session End

When the session is complete, update `/opt/beacon-state.md` on the server with a new handoff block:

```markdown
### Session Handoff — [DATE]
- **Goal:** [what the user asked for]
- **Completed:** [what was actually done, with specifics]
- **Changed Files:** [list of files modified, repos committed]
- **Open Items:** [anything unfinished or that needs follow-up]
```

Then commit the updated `beacon-state.md` to the `beacon-momentum-website` GitHub repo.

---

## Quick Reference: Key URLs & Endpoints

| Resource | URL |
|---|---|
| State file (live) | `https://beaconlabs.ai/state` |
| Beacon Momentum | `https://beaconmomentum.com` |
| Beacon Labs | `https://beaconlabs.ai` |
| Beacon Dashboard | `https://app.beaconmomentum.com` |
| Digital Grandpa | `https://digitalgrandpa.org` |
| Vitality | `https://vitalyears.fitness` |
| GHL CRM | `https://app.gohighlevel.com` |
| Bosun phone | `+1 888 437 7657` |
| Discovery call booking | `https://beaconlabs.ai/book` |

---

## Quick Reference: GitHub Repos

| Repo | Purpose | Live Path |
|---|---|---|
| `beacon-momentum-website` | beaconmomentum.com static site | `/var/www/beaconmomentum.com` |
| `beaconlabs-ai` | beaconlabs.ai React app + form handler | `/var/www/beaconlabs.ai` |
| `beacon-2026-dashboard` | app.beaconmomentum.com Node.js app | `/var/www/beacon-2026-dashboard` |
| `digitalgrandpa-org` | digitalgrandpa.org static site | `/var/www/digitalgrandpa.org` |
| `bosun-openclaw-appplatform` | Bosun voice agent + GHL + Stripe | `/opt/bosun` (currently empty) |
| `hollow-threads-store` | Hollow Threads e-commerce | `/var/www/hollowthreads` |
| `cask-cuisine-store` | Cask & Cuisine e-commerce | `/var/www/caskcuisine` |

---

## Quick Reference: Active Skills

| Skill | When to Use |
|---|---|
| `beacon-asset-management` | Deploying new assets, GHL sub-account setup, Discord setup, email routing |
| `beacon-signal-check-pipeline` | Running AI scan reports, producing HeyGen videos for Beacon Labs |
| `avatar-video-pipeline` | Producing course lesson videos, mentor messages, social clips |
| `plr-content-audit` | Evaluating PLR/MRR content packages before integration |
| `meta-ads-analyzer` | Analyzing Meta Ads campaign performance |

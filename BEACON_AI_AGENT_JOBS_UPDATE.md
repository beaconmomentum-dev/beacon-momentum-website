# Agent Jobs Update — June 30, 2026

## Changes Applied

### Agent 08 — The Scheduler (Updated)

**Added:** Mandatory pre-production context load requirement.

Before generating any social media content, Agent 08 MUST load the following context files from `/var/www/beacon-swarm/context/` on the Beacon Brands Hub server:

- `context-voice.md` — Brand voice, tone, and sanitation rules
- `context-audience.md` — ICP, Transformation over Transactions mandate, anti-free-trial policy
- `context-formats.md` — Platform cadence, format, and repurposing strategy

No content may be published without passing the sanitation rules in `context-voice.md`.

**Added:** Repurposing rule. When a Watch Brief or Stack Brief is published, Agent 08 must extract three distinct angles and produce platform-specific snippets for X, LinkedIn, and Facebook within 24 hours of publication.

---

### Agent 12 — The Accountant (Updated)

**Added:** Weekly feedback loop to Agent 08.

Every Monday metrics digest must include a "Top Hook" flag: identify the single highest-performing social post from the previous week (by engagement rate) and pass its structural hook pattern to Agent 08 as the lead angle for the following week's content calendar.

Delivery: The "Top Hook" flag is appended to the Monday metrics digest and copied to `/social/feedback/[week-of]-top-hook.md`.

---

### Foundational Mandate (Added to All Agents)

All outputs, workflows, and integrations produced by any Beacon agent belong exclusively to Beacon Momentum and are stored on Beacon's own architecture. No output may depend on or be locked to any single AI provider, SaaS tool, or platform. If any tool in the stack changes its terms or becomes unavailable, the workflow continues uninterrupted using equivalent open or self-hosted alternatives. This mandate is non-negotiable.

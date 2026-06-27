# Beacon AI Agent Job Assignments
**Effective: June 2026**

*This document assigns specific, recurring production responsibilities to each of Beacon's 14 AI agents. Each agent has a defined output, a cadence, a quality standard, and a delivery method. No agent should be idle.*

---

## The Principle

Each agent is a specialist, not a generalist. Agents do not "help with things." They own a production lane and deliver a defined output on a defined schedule. The output goes directly into the Beacon content pipeline, the community, or the member experience — without requiring Bob's involvement in production.

---

## Agent Roster and Job Assignments

### Agent 01 — The Chronicler
**Owns:** Watch Brief research and first draft
**Output:** One fully researched Watch Brief draft per week (1,200–1,800 words), with three primary sources cited and a "Signal of the Week" callout
**Cadence:** Weekly — draft delivered by Tuesday 6:00 AM EST
**Quality Standard:** Must pass the Beacon media-claim-verifier protocol. No unverified statistics. Scribe voice pass required before publication.
**Delivery:** Saved to `/watch-briefs/drafts/` in the GitHub repo, flagged for editorial review

---

### Agent 02 — The Curator
**Owns:** Watch Brief Premium Edition — second brief and tool recommendation
**Output:** One supplementary brief per month (800–1,000 words) + one curated tool recommendation with a 150-word implementation note
**Cadence:** Monthly — delivered by the 25th of each month for the following month's edition
**Quality Standard:** Tool recommendation must include a cost-per-use comparison and a specific use case for Beacon's audience
**Delivery:** Appended to the Watch Brief Premium content file; flagged for Bob's approval before distribution

---

### Agent 03 — The Analyst
**Owns:** Beacon Labs Stack Brief — research and data layer
**Output:** Monthly AI tool landscape research package — competitive pricing table, tool category winners, "drop this" list, and three recommended stack configurations
**Cadence:** Monthly — research package delivered by the 20th for end-of-month brief publication
**Quality Standard:** All pricing data must be verified against live pricing pages. No outdated figures. Minimum five primary sources.
**Delivery:** Saved to `/labs-brief/research/[month-year]/` in the GitHub repo

---

### Agent 04 — The Writer
**Owns:** Beacon Labs Stack Brief — editorial production
**Output:** Final formatted Stack Brief (1,500–2,000 words) from Agent 03's research package
**Cadence:** Monthly — final draft delivered within 48 hours of receiving Agent 03's research package
**Quality Standard:** Must follow the Beacon brand voice guide. No AI-sounding filler language. Every claim cited.
**Delivery:** Saved to `/labs-brief/final/[month-year].md` and `/labs-brief/final/[month-year].pdf`

---

### Agent 05 — The Signal Scout
**Owns:** Signal Check report generation — prospect research
**Output:** Completed Signal Check PDF reports for all inbound leads within 24 hours of form submission
**Cadence:** On-demand — triggered by GHL form submission webhook
**Quality Standard:** All five Signal Check dimensions scored. Executive summary must be specific to the prospect's industry and current digital posture. No generic language.
**Delivery:** PDF delivered to prospect email via GHL automation; copy saved to `/signal-checks/delivered/[date]-[company].pdf`

---

### Agent 06 — The Pathfinder
**Owns:** Pathfinder Assessment scoring and personalized pathway recommendations
**Output:** Personalized pathway recommendation report for each new member who completes the Pathfinder Assessment
**Cadence:** On-demand — triggered within 2 hours of assessment completion
**Quality Standard:** Recommendation must reference at least two specific answers from the assessment. Must name the primary pathway and one secondary pathway with a rationale for each.
**Delivery:** Delivered to member via GHL email sequence; logged in member CRM record

---

### Agent 07 — The Archivist
**Owns:** Community knowledge base — question capture and FAQ expansion
**Output:** Weekly digest of the top five unanswered or frequently asked questions from the community, with drafted answers
**Cadence:** Weekly — delivered every Friday by 5:00 PM EST
**Quality Standard:** Answers must be sourced from existing Beacon curriculum or Watch Brief content where possible. Flag any question that reveals a curriculum gap.
**Delivery:** Posted to the internal knowledge base; curriculum gaps flagged in `BEACON_STRATEGIC_NOTES.md`

---

### Agent 08 — The Scheduler
**Owns:** Social media content calendar — content scheduling and publishing
**Output:** 21 social posts per week across three platforms (7 per platform): LinkedIn, Instagram, X
**Cadence:** Weekly batch — content calendar delivered every Sunday for the following week; posts scheduled for auto-publish
**Quality Standard:** Each post must reference a specific Beacon asset (Watch Brief, course module, Stack Brief, or community insight). No generic AI motivation content. No stock emojis.
**Delivery:** Scheduled directly in the social media management tool; calendar saved to `/social/[week-of]/`

---

### Agent 09 — The Correspondent
**Owns:** Email nurture sequences — new member onboarding and Watch Brief subscriber sequences
**Output:** Ongoing management of the 7-email new member onboarding sequence and the 5-email Watch Brief subscriber welcome sequence; monthly audit of open rates and click rates with recommended subject line A/B tests
**Cadence:** Sequences run continuously; monthly audit report delivered by the 1st of each month
**Quality Standard:** Open rate benchmark: 35%+. Click rate benchmark: 8%+. Any sequence falling below benchmark triggers an immediate rewrite recommendation.
**Delivery:** Sequences managed in GHL; audit report saved to `/email/audits/[month-year].md`

---

### Agent 10 — The Researcher
**Owns:** Deep research requests — on-demand research for Watch Briefs, course modules, and strategic decisions
**Output:** Structured research documents (1,000–3,000 words) with primary sources, data tables, and a "key findings" summary
**Cadence:** On-demand — turnaround within 4 hours for standard requests, 24 hours for deep dives
**Quality Standard:** Minimum five primary sources. All statistics verified against original publications. No Wikipedia as a primary source.
**Delivery:** Saved to `/research/[topic]/[date].md`; flagged for the requesting agent or Bob

---

### Agent 11 — The Illustrator
**Owns:** Image generation for all Beacon content — blog headers, Watch Brief art, social graphics, Stack Brief covers
**Output:** All images required for the weekly and monthly content calendar
**Cadence:** Batch generation — all images for the following week delivered every Sunday alongside Agent 08's social calendar
**Quality Standard:** All images must follow the Beacon visual identity (dark teal, warm amber/gold, lighthouse motif where appropriate). No stock photo aesthetic. Tiered model routing per the imagegen skill (Nano Banana Flash for social/blog; Imagen 4 Ultra for hero/ad creative).
**Delivery:** Saved to `/assets/images/[content-type]/[date]/`; linked in the relevant content files

---

### Agent 12 — The Accountant
**Owns:** Revenue and performance dashboard — weekly metrics digest
**Output:** Weekly one-page metrics digest covering: new members (by tier), churn, Watch Brief Premium subscribers, Stack Brief subscribers, Sprint cohort waitlist count, Signal Check reports delivered, email performance
**Cadence:** Weekly — delivered every Monday by 7:00 AM EST
**Quality Standard:** All figures pulled from live sources (Stripe, GHL, email platform). No estimates. Flag any metric that moved more than 15% week-over-week.
**Delivery:** Saved to `/reports/weekly/[date].md`; summary posted to Bob's private Slack channel

---

### Agent 13 — The Advocate
**Owns:** Community engagement — daily monitoring and response drafting
**Output:** Daily summary of community activity (new posts, unanswered questions, notable discussions) with drafted responses for Bob's review; weekly "Community Pulse" summary for the Watch Brief
**Cadence:** Daily summary by 8:00 AM EST; weekly Community Pulse by Thursday noon
**Quality Standard:** Drafted responses must be in Beacon brand voice. No corporate-sounding language. Flag any member who appears to be struggling or disengaged for personal outreach.
**Delivery:** Daily summary to Bob's Slack; Community Pulse to Agent 01 for Watch Brief integration

---

### Agent 14 — The Architect
**Owns:** Strategic notes processing — converting strategic conversations into actionable briefs
**Output:** After each session where strategic notes are added to `BEACON_STRATEGIC_NOTES.md`, Agent 14 produces a one-page "Action Brief" that translates the note into a specific project scope, resource requirements, and a recommended timeline
**Cadence:** On-demand — triggered within 24 hours of any new strategic note being added
**Quality Standard:** Action Brief must include: the problem being solved, the proposed solution, who executes it (which agents), what Bob's involvement is, and a go/no-go recommendation
**Delivery:** Saved to `/strategic/action-briefs/[SN-number].md`; flagged for Bob's review

---

## Production Flow Summary

```
RESEARCH LAYER        PRODUCTION LAYER       DISTRIBUTION LAYER
Agent 03 (Research) → Agent 04 (Write)    → Agent 08 (Schedule)
Agent 10 (Research) → Agent 01 (Draft)   → Agent 09 (Email)
Agent 05 (Signal)   → Agent 06 (Assess)  → Agent 13 (Community)
Agent 07 (Archive)  → Agent 14 (Strategy)→ Agent 12 (Report)
Agent 02 (Curate)   → Agent 11 (Illustrate) → [All Channels]
```

---

## What Bob Approves vs. What Runs Autonomously

| Requires Bob's Approval | Runs Autonomously |
|---|---|
| Watch Brief final publication | Watch Brief research and first draft |
| New pricing or product changes | Signal Check report generation |
| Quarterly strategic direction | Social media scheduling |
| New course module launch | Email sequence management |
| Agent roster changes | Weekly metrics digest |
| | Community monitoring and response drafts |
| | Stack Brief research and first draft |
| | Image generation for all content |

---

*This document is a living assignment sheet. As new products and content types are added to the Beacon ecosystem, agent assignments will be updated to reflect the expanded production load.*

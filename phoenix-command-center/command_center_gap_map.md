# Phoenix Dashboard Command-Center Gap Map

**Prepared for:** Bob, Founder  
**Date:** May 26, 2026  
**Scope:** Update `phoenix.beaconmomentum.com` from a mixed legacy Mission Control board into a concise governed AI crew command center for Beacon Momentum and Beacon Labs.

## Strategic Reframe

The dashboard should stop reading primarily as a technical runtime monitor and should instead read as Phoenix’s **governed operating layer**. The local swarm status remains important, but it should support the larger executive question: what is active, what requires approval, what is blocked, what client delivery is moving, what connectors are safe, and what knowledge or incident records need attention.

## Required Information Architecture

| Priority | Dashboard Area | Purpose | Implementation Direction |
|---:|---|---|---|
| 1 | Today’s Watch | Give Bob an immediate morning command view. | Add a hero/brief panel with priorities, blockers, approval count, Beacon Labs readiness, and operating doctrine. |
| 2 | Active Work Orders | Replace noisy task repetition with accountable work. | Rename/reframe Kanban as governed work orders with agent owner, risk class, approval requirement, and due state. |
| 3 | Approval Queue | Make consequence-bearing work visible before action. | Add Bob approval and John escalation lanes, using green/yellow/red classification. |
| 4 | Beacon Labs Delivery Board | Connect Phoenix to external revenue and fulfillment. | Show Signal Check, Visibility Sprint, AI Workflow Audit, Command Center Install, Local Signal Engine, and retainer readiness. |
| 5 | Content and Campaign Queue | Track market-facing assets safely. | Add staged/review/approval/scheduled/published state cards. |
| 6 | Connector Registry | Prevent uncontrolled API and credential sprawl. | Show CRM, Slack, Drive, Gmail, payments, social, web, analytics, Cloudflare, GitHub with permission posture and owner. |
| 7 | Incident and Lessons Log | Convert failures into system learning. | Add severity, owner, current state, lesson, and SOP update status. |
| 8 | Canonical Knowledge Index | Preserve continuity and reduce memory drift. | Add cards for doctrine, offers, templates, source notes, SOPs, launch kit, and audit archive. |
| 9 | AI Crew Roster | Replace legacy role framing with the current governed crew. | Display Scribe, Bosun, Scout, Ledger, Sentinel, Forge, Steward, Herald, and Archivist, while mapping legacy runtime names only where needed. |
| 10 | Autonomy and Ethics | Show that Phoenix is capable but constrained. | Add concise statement: AI prepares, Sentinel verifies, Bob approves, John secures, Phoenix logs, Beacon learns. |

## Content Changes Needed

The current dashboard should preserve its dark command-center visual language but update labels and content. The **Clawbot** section should become **Command Console** and describe Forge/browser execution as one governed capability rather than the core identity of Phoenix. The **Task Board** should become **Work Orders**. The **Brands** section should become **Beacon Labs / Ecosystem**. The **Conversations** section should become **Continuity Log**. The **Architecture** section can remain gated, but the main dashboard should provide a safe non-confidential summary of the operating architecture.

## Deployment Constraint

The downloaded live HTML hash matches `/home/ubuntu/phoenix_repair/phoenix_index.html`, but no dedicated GitHub repository was found locally or through the organization search. To avoid another source-of-truth gap, the update should be developed as a versioned local working copy first and then either committed to a new independent private GitHub repository or attached to the eventual established deployment repository before the live server is changed.

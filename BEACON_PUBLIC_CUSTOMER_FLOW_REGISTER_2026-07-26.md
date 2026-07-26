# Beacon Public Customer-Flow Register

**Discovery date:** 2026-07-26  
**Status:** Evidence-backed inventory; no public form transport has been changed or deployed.  
**Scope:** Public routes in the canonical Beacon Momentum marketing application, including Digital Grandpa pages mounted in the same application.

## Purpose and control rule

This register records what a visitor can submit, where that data currently goes, what the visitor is told will happen, and what must be preserved when browser-side HighLevel access is removed.

> **Non-negotiable rule:** public browser code must not carry a `VITE_GHL_API_KEY`, call `services.leadconnectorhq.com` directly, or report success before the server-side capture result is known.

## Verified platform boundary

| Component | Verified state | Consequence |
|---|---|---|
| Public marketing app | Vite + React with an Express/Node production entry point (`server/_core/index.ts`) that already serves the static client and public tRPC procedures. | A same-origin HTTP endpoint is technically feasible; it can keep CRM credentials server-side. |
| Current shared capture helper | `client/src/lib/ghl.ts` reads `VITE_GHL_API_KEY` and posts directly to the HighLevel v2 contact-upsert API. | This is a credential-exposure defect and must be replaced rather than merely hidden in client code. |
| Primary CRM destination | HighLevel **Beacon Momentum** location `vvhkYM6iySBVh5kOcFGM` was verified through a read-only lookup. Duplicate protection is configured for email and phone. | Shared Beacon Momentum forms can use a single deduplicating server relay after a server-only credential is installed. |
| Verified primary custom fields | `Pathfinder Result` (`4KG5TRT5jHFIv4rO7bqg`), `Pathfinder Answers` (`9zwDjVuo8TNXlRmljoAO`), `Your Message` (`nTuAMCqnYb8xXwS7cNQs`). | Pathfinder mappings are valid. Contact and Watch intake fields require reconciliation before migration. |
| Separate Contact location | `lMSPBMOlJfKMlhLqCnxS` returned **403 Forbidden** to the connected read-only CRM account. | Ownership and field mapping are not verified; do not silently reroute these inquiry submissions. |
| Separate Digital Grandpa Library location | `ve9EPM428h8vShlRW1KT` returned **403 Forbidden** to the connected read-only CRM account. | Keep it isolated from the primary Beacon relay until its owner, credential, and consent responsibilities are confirmed. |

## Customer-flow inventory

| ID | Origin and visitor action | Submitted data | Current CRM / persistence behavior | Visitor-facing promise or confirmation | Consent and data-handling evidence | Migration status |
|---|---|---|---|---|---|---|
| CF-01 | `/` — Beacon Brief newsletter | Required email | `subscribeToBeaconBrief()` → primary Beacon location; tags `BM_Newsletter`, `BM_Beacon_Brief`; source `beaconmomentum.com/newsletter`. | Inline success or retry state. | “Free weekly email. No spam. Unsubscribe at any time.” | **Ready for primary relay contract.** |
| CF-02 | `/blog` — Beacon Brief strip | Required email | Same shared helper and primary tags as CF-01. | Inline success or retry state. | Free weekly digest positioning; no divergent field set identified. | **Ready; reuse CF-01 contract.** |
| CF-03 | `/digital-grandpa` — Digital Grandpa newsletter | Required email | Calls the shared Beacon Brief helper, therefore currently writes to the primary Beacon location. The UI marks success in `finally`, even if the CRM call fails. | “One email a week… No tech jargon. No sales pitch.” | No verified explicit unsubscribe line in the currently reviewed implementation. | **Needs behavior correction** before relay migration: success must reflect acceptance. |
| CF-04 | `/start` — Signal Starter Pack opt-in | Required email; optional first name | Primary shared helper; tags `BM_Starter_Pack`, `BM_YouTube_Optin`; source `beaconmomentum.com/start`. Read-only CRM inspection verified four named Starter Pack delivery templates, but did not expose the workflow/tag trigger that connects them. | On accepted capture, starts `Signal_Starter_Pack.pdf` download and says the first email from Bob is on its way. | “No spam. No countdown timers. Just the foundation. Unsubscribe anytime.” | **Ready for primary relay contract.** Preserve the download only after success; verify the tag-to-workflow trigger before release. |
| CF-05 | `/assessment` — Pathfinder result email gate | Required email; optional first name; computed pillar result | `submitPathfinderResult()` → primary shared helper; tags `BM_Pathfinder` plus `BM_Path_[Pillar]`; source `beaconmomentum.com/assessment`; writes verified Pathfinder result field. The reviewed page passes the result, not raw answer blob. | Result overview is sent to the inbox. | No separate consent copy verified in this inspection. | **Ready for primary relay contract.** Preserve result-only boundary unless a new consent decision is approved. |
| CF-06 | `/watch-brief-premium` — enrollment-details request | Required email; optional first name | Primary shared helper; tag `BM_Watch_Brief_Premium_Interest`; source `beaconmomentum.com/watch-brief-premium`. | Requests current release schedule and secure enrollment instructions; explicitly not checkout. | No checkout or payment capture occurs. | **Ready for primary relay contract.** |
| CF-07 | `/the-watch#join` — Watch request start | Required email; optional first name | Primary shared helper; tags `BM_Watch_Join`, `BM_Watch_Sentinel`, `BM_Community`; stores email/name in `sessionStorage`; routes to `/the-watch/intake`. | Frames the step as an enrollment request, not payment or activation. | Consent language must be carried forward into the intake handoff review. | **Ready for primary relay contract** but must maintain sequential state only after accepted contact upsert. |
| CF-08 | `/the-watch/intake` — six-step Watch intake | Session-carried email/name; current situation, obstacle, time horizon, AI comfort, accountability preference, track choice | CRM upsert with Watch tags plus three **placeholder** field IDs (`watch_intake_track`, `watch_intake_tier`, `watch_intake_answers`); then fire-and-forget public tRPC `cohort.submitIntake` database write. | “Your request is in.” Beacon team review and enrollment details within 24 hours. | Answers are stated to be used only for enrollment review and starting-track recommendation, and never shared outside Beacon. | **Blocked pending field reconciliation and delivery semantics.** Must not show success if database persistence fails after CRM acceptance. |
| CF-09 | `/contact` — general inquiry | First/last name, required email/message, optional phone, subject | Direct browser call to a separate inaccessible location (`lMSPBMOlJfKMlhLqCnxS`); tag `bm_contact_form`; attempts invalid/unverified custom field ID `contact_message_field`. | “Message received.” Team response within one business day. | No explicit marketing-consent control or separate privacy disclosure at form point. | **Blocked pending owner/location/field decision.** No silent primary-location migration. |
| CF-10 | `/digital-grandpa/library` — launch waitlist | Required email | Direct browser call to separate inaccessible location (`ve9EPM428h8vShlRW1KT`); tag `dg_library_waitlist`. Current code displays success even after errors. | “We’ll reach out the moment the library opens.” | “No spam. One email when the library opens. That’s it.” | **Blocked pending separate-location owner and transport decision.** |

## Primary navigational handoffs

These are not submissions themselves but determine which capture owner receives a visitor:

| Origin | Destination | Intended owner |
|---|---|---|
| Home hero / membership CTA | `/the-watch#join` | The Watch request flow (CF-07 → CF-08) |
| Home / Digital Grandpa library CTA | `/assessment` | Pathfinder flow (CF-05) |
| Home Watch Brief CTA | `/watch-brief-premium` | Premium-interest flow (CF-06) |
| Contact success screen | `/assessment` | Pathfinder flow (CF-05) |

## Required relay contract

The eventual primary relay should accept a **named event**, not arbitrary client-provided tags or a raw HighLevel payload. Its server-side event registry should own allowed fields, tags, source labels, consent evidence, custom-field mappings, and user-facing success/failure behavior.

| Relay event | Allowed inputs | Server-owned CRM behavior | Client behavior after accepted response |
|---|---|---|---|
| `newsletter_signup` | Email; optional first name; page source | Apply `BM_Newsletter`, `BM_Beacon_Brief`; primary location. | Confirm subscription. |
| `starter_pack_request` | Email; optional first name | Apply `BM_Starter_Pack`, `BM_YouTube_Optin`; primary location. | Begin PDF download and confirm email follow-up. |
| `pathfinder_result` | Email; optional first name; enumerated pillar | Apply `BM_Pathfinder`, approved `BM_Path_*`; write verified Pathfinder Result field. | Confirm result-email handoff. |
| `watch_brief_interest` | Email; optional first name | Apply `BM_Watch_Brief_Premium_Interest`; primary location. | Confirm schedule/enrollment-detail request. |
| `watch_join` | Email; optional first name | Apply the Watch start tags; primary location. | Store minimal session handoff and route to intake only on success. |
| `watch_intake` | Email/name from validated handoff; explicitly enumerated intake answers; chosen/recommended track | Apply Watch tags and verified custom fields; atomically/observably persist cohort record before declaring success. | Show review confirmation only after both required systems report success, otherwise provide a recoverable error path. |

## Architecture choices for founder review

No architecture has been selected or deployed. All options below keep the key out of the browser; detailed deployment, ownership, and flow-suitability analysis is in `BEACON_CAPTURE_RELAY_OPTIONS_2026-07-26.md`.

| Approach | Tradeoffs | Cost | Setup complexity |
|---|---|---:|---|
| **Extend the existing Beacon Momentum production server with a same-origin capture endpoint** | Reuses the live Node/Express process and existing domain, so form traffic stays first-party and no new public host is introduced. Requires a server-only HighLevel credential, validation/rate limiting, deployment discipline, and a rollback plan. | Uses current infrastructure; no new hosting path identified. | Moderate. |
| **Run the capture endpoint as a Cloudflare Worker** | Keeps CRM integration isolated from the marketing app and can retain a same-origin path. Requires a Worker secret, route deployment, separate monitoring, and form endpoint migration. | Uses existing Cloudflare capability; detailed pricing not assessed. | Moderate. |
| **Use HighLevel-native forms for eligible simple captures** | Removes bearer-key handling from browser code but trades application-level validation, observability, and custom interaction control for HighLevel form configuration. | Uses existing CRM capability; detailed pricing not assessed. | Moderate, with variable design fit. |

## Decision gates before public migration

1. Confirm the owner and correct HighLevel location for the Contact flow; determine whether general inquiries belong in the primary Beacon sub-account and map the message custom field.
2. Confirm the owner and correct HighLevel location for the Digital Grandpa Library waitlist.
3. Create or identify valid primary-location custom fields for Watch intake track, tier, and answers; decide whether the full answers should remain in CRM at all, given the current privacy statement.
4. Choose one relay-hosting approach, then install a **server-only** credential with no `VITE_` prefix. Never write the value in source control, logs, browser bundles, or the register.
5. Define deterministic success semantics for Watch intake: CRM and cohort-database persistence must be observable; the UI must not mask a failed capture as success.
6. Add basic abuse controls before exposure: strict Zod validation, event allow-list, rate limit, origin checks, request-size limit, no token logging, and a support-safe error response.

## Evidence sources

- Canonical client routes: `client/src/App.tsx`
- Shared direct CRM helper: `client/src/lib/ghl.ts`
- Public forms: `client/src/pages/Home.tsx`, `BlogPage.tsx`, `DigitalGrandpaPage.tsx`, `StarterPackPage.tsx`, `Assessment.tsx`, `WatchBriefPremiumPage.tsx`, `TheWatchPage.tsx`, `TheWatchIntakePage.tsx`, `ContactPage.tsx`, `DigitalGrandpaLibraryPage.tsx`
- Existing public cohort persistence seam: `server/routers/cohort.ts`
- Existing server entry: `server/_core/index.ts`
- Read-only HighLevel location, custom-field, and template inventory checks performed on 2026-07-26; detailed integration findings retained in `BEACON_CUSTOMER_FLOW_DISCOVERY_LOG_2026-07-26.md`.

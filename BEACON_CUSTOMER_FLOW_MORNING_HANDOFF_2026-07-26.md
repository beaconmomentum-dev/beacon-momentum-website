# Beacon Customer-Flow Workstream: Morning Handoff

**Prepared:** July 26, 2026  
**Status:** Discovery, governance, and a non-deployed secure relay candidate are complete. **No public form transport, production credential, HighLevel workflow, or live customer record was changed.**

## Executive summary

The public marketing application currently sends multiple forms directly from the browser to HighLevel using a `VITE_GHL_API_KEY`. That is a credential-exposure and integrity risk because the browser can select unbounded payload fields and the UI cannot reliably distinguish a real CRM acceptance from a failure.

The work completed overnight establishes an evidence-backed customer-flow register and a staged replacement path. The verified Beacon Momentum flows now have a non-deployed, server-side relay candidate in canonical source. It accepts a named event only, keeps the credential server-side, derives tags and source labels on the server, validates input, rejects invalid production origins, rate-limits public traffic, and returns support-safe request IDs. The candidate has six passing isolated tests and has **not** been connected to any customer-facing form.

## Completed and preserved

| Deliverable | Completed work | Evidence |
|---|---|---|
| Public customer-flow inventory | Mapped ten current public submissions, their fields, destinations, visible promises, consent evidence, and migration readiness. | `BEACON_PUBLIC_CUSTOMER_FLOW_REGISTER_2026-07-26.md` |
| CRM ownership validation | Verified the primary Beacon Momentum HighLevel location and its Pathfinder/Message custom fields. Identified that Contact and Digital Grandpa Library use inaccessible separate locations. | `BEACON_CUSTOMER_FLOW_DISCOVERY_LOG_2026-07-26.md` |
| Nurture asset evidence | Verified that four Starter Pack email templates exist in the primary location. The available read-only integration cannot prove their trigger/workflow linkage. | Customer-flow register and discovery log |
| Consent and data governance | Defined purpose boundaries, minimum receipt fields, data minimization, owner matrix, retention questions, and release gates. | `BEACON_CAPTURE_GOVERNANCE_2026-07-26.md` |
| Architecture decision paper | Documented three viable approaches: existing application server, Cloudflare Worker, or HighLevel-native forms for selected simple flows. No option has been selected or recommended. | `BEACON_CAPTURE_RELAY_OPTIONS_2026-07-26.md` |
| Relay candidate | Added a same-origin tRPC candidate for five verified primary-location events. It deliberately excludes Contact, Digital Grandpa Library, and Watch Intake. | `server/routers/capture.ts` |
| Offline verification | Six isolated tests pass, covering server-owned mappings, allowed Pathfinder values, CRM rejection, missing secret, production origin enforcement, and server-only authorization. | `server/routers/capture.test.ts` |
| Controlled release plan | Produced a staged test, release, and rollback runbook that begins with one newsletter form and never rolls back to a browser-exposed key. | `BEACON_CAPTURE_RELAY_RELEASE_RUNBOOK_2026-07-26.md` |

The canonical repository contains and has received the work in these commits:

| Commit | Purpose |
|---|---|
| `1e0d5b4` | Customer-flow register, governance, architecture options, and the non-deployed relay candidate. |
| `8a71964` | Production fail-closed origin handling and expanded six-test coverage. |

## What remains intentionally unmodified

The current browser-side forms are still live and retain their current behavior. No HighLevel API credential was printed, copied into source, moved to a server environment, rotated, or tested against a live customer record. No automatic workflow, tag trigger, email delivery, or Contact/Digital Grandpa ownership was assumed from source code alone.

> The system is **prepared for a controlled migration**, not yet migrated. Reporting it as live would be inaccurate.

## Founder decisions needed

| Decision | Available options | Why a decision is needed |
|---|---|---|
| Relay runtime | **A.** Existing Beacon Momentum Express/tRPC server; **B.** Cloudflare Worker; **C.** HighLevel-native forms only for suitable simple forms. | All three keep a bearer credential out of the browser but have different operational ownership, observability, and deployment paths. |
| Contact flow owner | Keep/restore the existing separate location, or formally move it to the primary Beacon Momentum location with a valid message-field contract. | Its referenced location returned 403 to the current read-only integration and the message field is not validly mapped. |
| Digital Grandpa Library owner | Confirm the separate product location/owner, or explicitly establish a new product-specific capture path. | Its referenced location also returned 403 and its waitlist promise must not be silently converted to Beacon Brief marketing. |
| Watch-intake data boundary | Cohort database only, CRM summary plus cohort database, or both systems with explicit full-answer retention. | Current CRM field references are placeholders and the answers are restricted enrollment data. |
| Consent and test authorization | Approve the specific visible copy/version for the first migrated newsletter form and nominate an internal controlled test inbox. | The release test must not create a fabricated or unconsented customer record. |
| Workflow confirmation owner | Identify who will verify each approved tag’s workflow, sender, unsubscribe treatment, and expected delivery. | The connected read-only HighLevel tools do not expose workflow inspection. |

## Recommended next operational sequence after decisions

The release runbook deliberately supports a small, reversible first step:

1. Select a relay runtime and appoint its operational owner.
2. Install a server-only HighLevel credential in that runtime and confirm it is not exposed by a `VITE_*` variable.
3. Have the HighLevel owner prove the Beacon Brief tag-to-workflow path.
4. Migrate only the home-page Beacon Brief form to the named `newsletter_signup` event.
5. Use an approved internal test inbox to validate the full customer and delivery path.
6. Rotate any previously browser-exposed key only after the direct client transport is removed and the new relay is verified.
7. Progress one primary flow at a time; do not move Contact, Digital Grandpa Library, or Watch Intake until their separate ownership/data decisions are complete.

## Morning review checklist

- [ ] Read the architecture comparison and select **A**, **B**, or **C**.
- [ ] Confirm the accountable owner for Contact and Digital Grandpa Library.
- [ ] Choose the Watch intake retention model.
- [ ] Approve the first-form consent copy/version and controlled test inbox.
- [ ] Name the HighLevel owner who will verify the actual workflow triggers.

## Source documents

- `BEACON_PUBLIC_CUSTOMER_FLOW_REGISTER_2026-07-26.md`
- `BEACON_CAPTURE_GOVERNANCE_2026-07-26.md`
- `BEACON_CAPTURE_RELAY_OPTIONS_2026-07-26.md`
- `BEACON_CAPTURE_RELAY_RELEASE_RUNBOOK_2026-07-26.md`
- `BEACON_CUSTOMER_FLOW_DISCOVERY_LOG_2026-07-26.md`

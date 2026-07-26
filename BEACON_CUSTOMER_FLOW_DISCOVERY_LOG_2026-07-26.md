# Beacon Customer-Flow Discovery Log

**Status:** Active Priority 1 evidence log  
**Date:** July 26, 2026  
**Scope:** Public Beacon Momentum capture paths and their HighLevel handoff design.

## Verified source findings

| Source | Current flow | Finding | Risk / consequence |
|---|---|---|---|
| `client/src/lib/ghl.ts` | Beacon Brief subscription, Watch Brief Premium interest, and Pathfinder result submission | The shared browser helper posts directly to HighLevel’s contacts endpoint using `VITE_GHL_API_KEY` and a hard-coded Beacon Momentum location ID. | A HighLevel credential is exposed to public browser bundles; no server-side validation, abuse control, or durable request audit exists. |
| `client/src/pages/ContactPage.tsx` | General contact form | This page bypasses the shared helper, uses a different HighLevel location ID, and references `contact_message_field` as a placeholder custom-field identifier. | Location and custom-field ownership are unverified; the form must be reconciled before migration to avoid misrouted or lost inquiry data. |
| `client/src/pages/TheWatchIntakePage.tsx` | The Watch enrollment request | The form applies multiple Watch tags and separately calls a cohort mutation, but its HighLevel custom-field IDs are placeholders. | The relay must preserve both CRM tagging and cohort persistence while preventing placeholder fields from silently discarding personal intake data. |
| `client/src/pages/StarterPackPage.tsx` | Free starter-pack opt-in and client-side PDF download | This flow uses the shared browser helper with `BM_Starter_Pack` and `BM_YouTube_Optin` tags. | The eventual relay must return a confirmed response before the download and maintain a clear consent record. |
| `client/src/pages/DigitalGrandpaLibraryPage.tsx` | Digital Grandpa library waitlist | This flow sends a browser-side request with a separate location fallback, swallows errors, and always shows success. | It produces false-success risk and requires explicit migration or deprecation treatment in the register. |
| `beacon-community-canonical/lib/ghl.ts` | Community account and lifecycle sync | The membership platform already uses a server-side HighLevel layer with environment-held credentials. | This offers a safer architectural precedent but does not by itself serve the static marketing-site forms. |

## Initial architectural boundary

The public Beacon Momentum site is a static Vite + React build. It must not continue to call HighLevel from browser code or carry credentials prefixed for browser exposure. The existing `beacon-momentum-www` Node/PM2 runtime is the intended candidate for a same-origin server-side capture relay, subject to source and production-configuration verification.

## HighLevel read-only validation

| Check | Result | Implication |
|---|---|---|
| Primary Beacon Momentum location | Verified. `vvhkYM6iySBVh5kOcFGM` is the **Beacon Momentum** HighLevel sub-account for `https://beaconmomentum.com`, with email/phone duplicate protection enabled. | The shared marketing-site helper targets a valid owned location and a relay may safely use this location after its server-side credential path is configured. |
| Primary location custom fields | Verified fields: `Pathfinder Result` (`4KG5TRT5jHFIv4rO7bqg`), `Pathfinder Answers` (`9zwDjVuo8TNXlRmljoAO`), and `Your Message` (`nTuAMCqnYb8xXwS7cNQs`). | Pathfinder field IDs are valid. The Contact form's `contact_message_field` and all three Watch placeholder IDs are not verified mappings for this location. |
| Contact-form location | Read-only HighLevel lookup for `lMSPBMOlJfKMlhLqCnxS` returned **403 Forbidden**. | Treat the Contact form location as unowned or inaccessible until reconciled. Do not migrate its inquiry payload silently or assume its custom-field mapping is valid. |
| Digital Grandpa library location | Read-only HighLevel lookup for `ve9EPM428h8vShlRW1KT` returned **403 Forbidden**. | Treat Digital Grandpa’s direct library capture as a separately owned or inaccessible integration until its location and credential owner are confirmed. |

## Evidence limitations

This log records source-level findings only. It does not assume that HighLevel location IDs, custom-field IDs, active tags, workflows, or consent settings are valid until they are checked against the configured HighLevel account and live capture behavior.

## Completed source inventory and relay candidate

| Check | Result | Implication |
|---|---|---|
| Shared-helper callers | Home, Blog, Digital Grandpa landing, Starter Pack, Pathfinder, Watch Brief Premium, and The Watch use the browser-side HighLevel helper. | These flows can migrate through one event-based server contract after the production runtime is chosen. |
| Direct browser callers | Contact and Digital Grandpa Library bypass the helper and target separate/inaccessible locations. | Do not include them in the primary Beacon Momentum relay rollout until location, message-field, and owner contracts are confirmed. |
| AI chat form | `AIChatBox` is not mounted on a public route and does not create CRM contact records. | It is excluded from the public customer-flow register. |
| Candidate server boundary | The existing Express server mounts tRPC at `/api/trpc` before static delivery, so a same-origin `capture.submit` procedure can coexist with the deployed Vite site. | An application-server relay is technically feasible without adding a second public server. |
| Candidate relay | `server/routers/capture.ts` introduces an allow-listed, non-deployed relay for the five verified primary-location events. It uses a server-only `GHL_API_KEY`, server-owned source/tag mappings, origin checks, best-effort rate limiting, request IDs, and safe errors. | No public form invokes it and no production credential has been configured. It is a reviewed candidate, not a release. |
| Candidate validation | Four isolated relay tests passed: browser tag override stripping, Pathfinder enum validation, rejected HighLevel response handling, and server-only authorization construction. | Core contract behavior is covered without creating a real test contact or invoking a HighLevel workflow. |
| Repository-wide type check | Existing unrelated page errors remain in About and Blog source. The initial full check found one relay compatibility issue, which was corrected; a subsequent isolated type check could not resolve repository path aliases outside the project configuration. | Do not characterize the entire application as type-clean. The relay test suite passes, but full application type cleanup remains separate work. |

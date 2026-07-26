# Beacon Public Capture Relay: Staged Release and Verification Runbook

**Status:** Prepared for founder review. This is a release-control document, not an instruction to deploy the current candidate. No browser form, production service, credential, or HighLevel workflow has been changed through this workstream.

## Purpose

This runbook releases the public-capture relay without converting an infrastructure change into a silent loss of customer requests. The rollout begins with one low-risk, verified Beacon Momentum event and proves that the visible confirmation, CRM record, tag trigger, and failure behavior describe the same outcome.

> **Safety rule:** the rollback must never restore a browser-exposed HighLevel bearer key. If the relay cannot accept a form safely, that form should show a recoverable unavailable state and a support path until the server path is restored.

## Preconditions

| Gate | Required evidence | Release owner |
|---|---|---|
| Architecture selection | Founder selects Option A, B, or C in `BEACON_CAPTURE_RELAY_OPTIONS_2026-07-26.md`. | Founder |
| Event scope | Begin only with `newsletter_signup` on the Beacon Momentum home page. Do not include Contact, Digital Grandpa Library, Watch Intake, or a checkout-adjacent flow. | Product / engineering |
| CRM workflow proof | A HighLevel owner verifies the precise source tag, trigger, template or workflow, sender, unsubscribe handling, and expected delivery timing for `BM_Newsletter` + `BM_Beacon_Brief`. | HighLevel owner |
| Server credential | A least-privilege HighLevel credential is installed only as `GHL_API_KEY` in the selected runtime. It is never placed in a `VITE_*` variable, client build argument, repository, browser console, or support ticket. | Infrastructure owner |
| Existing-key response | If a real `VITE_GHL_API_KEY` has been included in a public bundle, rotate it after the relay is live and the old direct transport is removed. | HighLevel owner |
| Consent copy | The home-page disclosure and stable `consentVersion` are approved for the newsletter event. A legal/privacy professional should review final language where required. | Founder / privacy reviewer |
| Observability | Support can correlate a non-PII `requestId` with an event and outcome. Raw email, CRM response body, access token, or full intake answers must not enter general application logs. | Engineering |

## Staged rollout

### Stage 0 — Offline verification

Run the candidate test suite before each release candidate:

```bash
pnpm vitest run server/routers/capture.test.ts
```

The current candidate is expected to pass six checks: server-owned tag/source mapping, Pathfinder allow-listing, rejected CRM handling, missing-credential fail-closed behavior, production origin enforcement, and server-only authorization construction.

### Stage 1 — Controlled single-event migration

Migrate **only** the Beacon Momentum home-page Beacon Brief signup to `capture.submit` with `event: "newsletter_signup"`. The client must render success only after the relay returns `{ success: true, requestId }`. It must render a retryable error with the request ID after a structured relay failure.

Use an internal, controlled test inbox owned by Beacon operations. Do not create a fabricated customer, use an employee’s personal address without permission, or send a test message to an unconsenting address.

| Test | Expected result | Evidence to retain |
|---|---|---|
| Valid newsletter request | One deduplicated HighLevel contact is created/updated in Beacon Momentum with `BM_Newsletter` and `BM_Beacon_Brief`; UI reports acceptance only after relay success. | Request ID, non-PII event/time record, CRM contact ID held in restricted release notes, and email-delivery observation. |
| Invalid email | Client or relay rejects it before an outbound CRM call. | Test timestamp and safe validation response. |
| Disallowed origin | Production relay returns a generic forbidden response and makes no CRM call. | Server event-only log; no personal data. |
| Missing secret / upstream outage | UI shows a retryable unavailable state; no success confirmation, no token exposure, and no raw upstream error. | Request ID and safe error classification. |
| Rate-limit boundary | Seventh same-event request inside the configured window is throttled safely. | Event-only rate-limit log; do not use a real visitor address. |
| Nurture behavior | Confirm the exact subscribed email receives the expected verified newsletter/welcome behavior, sender, and unsubscribe treatment. | Owner review record; do not store email content in general repository logs. |

### Stage 2 — Progressive primary-flow migration

Only after Stage 1 is accepted, migrate the currently verified primary-location flows one at a time in this order:

1. Blog Beacon Brief strip, reusing `newsletter_signup`.
2. Starter Pack request, proving that the download begins only after relay acceptance and that the named delivery flow triggers.
3. Pathfinder result, proving that only the computed pillar—not raw answers—is sent to the verified custom field.
4. Watch Brief Premium interest.
5. The Watch join handoff, proving the session handoff occurs only after an accepted relay response.

Each move requires the same valid, invalid, unavailable, and follow-up verification before the next event is enabled.

### Stage 3 — Explicitly separate blocked-flow work

The following flows remain outside this release train until their ownership and data contracts are resolved:

| Flow | Why it is blocked | Required approval |
|---|---|---|
| Contact inquiry | Separate inaccessible CRM location; invalid/unverified message field; no distinct marketing-consent rule. | Owner, location, message-field, response SLA, and marketing-boundary decision. |
| Digital Grandpa Library waitlist | Separate inaccessible CRM location and a product-specific waitlist promise. | Separate product owner, destination, launch workflow, and privacy/marketing boundary. |
| Watch intake | Placeholder CRM fields, dual CRM/cohort persistence, and restricted enrollment answers. | Approved data-retention choice, verified field IDs, atomic/observable dual-write behavior, and partial-failure recovery. |

## Rollback and incident response

| Incident | Immediate customer-safe action | Engineering action |
|---|---|---|
| Relay returns elevated failures | Keep the form visible but show a truthful retry/support state; do not report enrollment success. | Disable the migrated client event or revert the client release while retaining the server endpoint for diagnosis. |
| CRM rejects a valid request | Preserve the request ID; do not retry blindly from the browser. | Inspect server-side configuration and the verified tag/field contract; retry only through an approved operational process. |
| Credential is suspected exposed | Disable/rotate the affected HighLevel key immediately. | Verify that the new key is server-only, invalidate old bundles/caches as appropriate, and review request logs for anomalous use. |
| Wrong tag or workflow fires | Pause that event’s client migration. | Correct the server-owned event mapping or HighLevel trigger, then rerun the controlled test before re-enabling. |

## Release completion criteria

The relay is not “complete” until every migrated flow has a verified customer journey, a safe failure path, and its intended CRM destination/workflow proof. The following items are mandatory before declaring the full migration complete:

1. No deployed public bundle contains `VITE_GHL_API_KEY` or a direct HighLevel bearer request.
2. Each migrated form renders a real success only after all required persistence is accepted.
3. Each migrated event has an owner-confirmed HighLevel delivery or nurture trigger.
4. Contact, Digital Grandpa Library, and Watch Intake have completed their separate owner/data-contract decisions.
5. Desktop and mobile customer flows, CTA links, privacy links, and error/retry states have been exercised after each release.

## Related evidence

- `BEACON_PUBLIC_CUSTOMER_FLOW_REGISTER_2026-07-26.md`
- `BEACON_CAPTURE_GOVERNANCE_2026-07-26.md`
- `BEACON_CAPTURE_RELAY_OPTIONS_2026-07-26.md`
- `BEACON_CUSTOMER_FLOW_DISCOVERY_LOG_2026-07-26.md`
- `server/routers/capture.ts`
- `server/routers/capture.test.ts`

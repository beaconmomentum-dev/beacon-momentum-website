# Beacon Capture Governance and Consent Model

**Status:** Proposed operating policy for founder review. It is an implementation specification, not a legal opinion; a qualified privacy professional should review any final consent language or retention policy that carries legal consequences.

## Design intent

The public capture system should be **purpose-bound, truthful, and recoverable**. A visitor should receive only the follow-up they were told to expect; a product owner should know which CRM location holds the record; and a temporary integration failure should never appear as a successful enrollment.

> A form’s visible promise, the data it collects, its CRM destination, its tags, its follow-up workflow, and its confirmation state must describe the same event.

## Capture classifications

| Class | Current flows | Operational rule | CRM treatment |
|---|---|---|---|
| Requested resource or response | Starter Pack, Pathfinder result, Watch Brief Premium details | The visitor asked for a named resource or answer. Record the page and displayed promise, then send the requested fulfillment or response. | Use the event-specific tag/source and only the fields required to deliver the request. |
| Editorial subscription | Home/Blog Beacon Brief, Digital Grandpa newsletter, Digital Grandpa Library waitlist | Record the specific publication or waitlist promise; do not use a generic newsletter tag as a substitute for a separate product subscription. | Apply a publication-specific tag plus source; preserve an unsubscribe path appropriate to the stated promise. |
| Enrollment interest and intake | The Watch join and intake | Collect only data needed to review the request and guide the stated next step. Treat detailed answers as restricted enrollment data rather than generic marketing fields. | Keep the contact upsert and cohort record observable and reconciled before showing completion. |
| General inquiry | Contact page | An inquiry creates a response obligation, not a general marketing opt-in. | Do not automatically add marketing tags unless the visitor gives a distinct affirmative instruction. |

## Minimum capture record

Every accepted public event should create a small, auditable server-side receipt. The receipt must not store raw answer payloads or credentials in application logs.

| Field | Purpose |
|---|---|
| `event` | A fixed server-recognized event name, such as `starter_pack_request`. |
| `requestId` | A generated, non-PII identifier returned to the browser for support follow-up. |
| `receivedAt` | Supports delivery and failure investigation. |
| `originPath` | Confirms the page that made the stated offer. |
| `consentVersion` and `consentTextHash` | Links the submission to the exact displayed disclosure without copying personal data into logs. |
| `outcome` | `accepted`, `rejected_validation`, `rejected_rate_limit`, `crm_failed`, `persistence_failed`, or `partial_failure`. |
| `downstreamReference` | A CRM contact ID or a cohort record ID when available; never an API credential. |

## Data-minimization rules

| Flow | Allowed data in relay | Do not send or persist without a separate approved purpose |
|---|---|---|
| Beacon Brief | Email, optional first name, source page | Assessment answers, Watch choices, contact message. |
| Starter Pack | Email, optional first name, source page | Any information not needed for resource delivery. |
| Pathfinder | Email, optional first name, computed pillar only | Raw response sequence, unless the visible disclosure and CRM field decision are explicitly approved. |
| Watch interest | Email, optional first name | Full intake answers before the visitor reaches the dedicated intake process. |
| Watch intake | Email/name handoff, selected/recommended track, submitted answers only for enrollment review | Reusing answers for general newsletter profiling or other property marketing. |
| Contact | Name, email, optional phone, subject, message | Automatic marketing enrollment absent a separate affirmative choice. |
| Digital Grandpa Library | Email and product-specific waitlist source | Automatic enrollment in the Beacon Brief without a clearly stated cross-publication choice. |

## Ownership matrix

| Flow family | Current intended owner | Approved destination status | Required owner action |
|---|---|---|---|
| Beacon Momentum editorial and resources | Beacon Momentum | **Verified** primary HighLevel location `vvhkYM6iySBVh5kOcFGM`. | Confirm workflow triggers for each source tag before production migration. |
| The Watch | Beacon Momentum / Community operations | Primary CRM location verified; cohort database is a separate persistence surface. | Approve field mapping and decide whether full intake answers belong in CRM, cohort database, or both. |
| General Contact | Unresolved | Current separate location is inaccessible to read-only validation. | Identify accountable owner, correct location, valid message field, response SLA, and whether marketing enrollment is ever permitted. |
| Digital Grandpa Library | Unresolved separate product owner | Current separate location is inaccessible to read-only validation. | Identify accountable owner, correct location, launch workflow, and whether the waitlist is legally/operationally separate from Beacon Brief. |

## Tag and source governance

The server, not the browser, should attach tags and sources. The client may request an event but must never supply an unrestricted `tags` array, a HighLevel location ID, custom-field ID, or workflow identifier.

| Event | Server-owned tag / source policy | Status |
|---|---|---|
| `newsletter_signup` | `BM_Newsletter`, `BM_Beacon_Brief`; page-specific source. | Existing, subject to workflow verification. |
| `starter_pack_request` | `BM_Starter_Pack`, `BM_YouTube_Optin`; `beaconmomentum.com/start`. | Existing, subject to workflow verification. |
| `pathfinder_result` | `BM_Pathfinder` plus a strict enumerated pillar tag; source `/assessment`. | Existing; use verified result field only. |
| `watch_brief_interest` | `BM_Watch_Brief_Premium_Interest`; source `/watch-brief-premium`. | Existing, subject to workflow verification. |
| `watch_join` | `BM_Watch_Join`, `BM_Watch_Sentinel`, `BM_Community`; source `/the-watch`. | Existing, subject to owner review. |
| `watch_intake` | Reuse only approved Watch tags and verified custom-field IDs. | Blocked on mapping and retention decision. |
| `contact_inquiry` | Tag and source require separate-owner confirmation. | Blocked. |
| `digital_grandpa_library_waitlist` | Existing `dg_library_waitlist` should be reviewed against the broader Beacon tag convention before migration. | Blocked on separate-owner confirmation. |

## Required consent and confirmation behavior

| Rule | Implementation requirement |
|---|---|
| A form must not over-promise | The success state only appears after its required downstream systems have accepted the event. `finally { setSubmitted(true) }` is not permitted for capture forms. |
| A specific resource request remains specific | Starter Pack and Pathfinder success responses may promise the requested item or result, not unrelated product marketing. |
| Inquiry is not subscription | The Contact form must remain a response-request channel unless it includes a separately worded affirmative marketing choice. |
| Sensitive enrollment answers remain bounded | The Watch intake disclosure must name its enrollment-review purpose; the implementation must not route the answers to unrelated tags or properties. |
| Consent copy must be versionable | The UI supplies a stable consent-version identifier to the relay; the relay stores a hash or version, not a scrape of arbitrary browser copy. |
| Failure must be recoverable | The user gets a clear retry state and support route. A generic server error must not reveal CRM internals, token state, or location IDs. |

## Candidate release controls

The server-side relay, once selected, should enforce the following before any public traffic is migrated:

1. Strict schema validation for each named event, including normalized and validated email.
2. An allow-list of event names; reject unknown event names before any outbound request.
3. Server-owned tags, locations, custom fields, and source labels.
4. Request-size cap and a lightweight per-IP or per-email rate limit appropriate to public forms.
5. Same-origin or explicitly allow-listed origin checks; no open cross-origin endpoint.
6. No client-side or server-log disclosure of CRM API credentials.
7. Structured error results with support-safe `requestId` values.
8. Correlation between CRM upsert and cohort persistence for the Watch intake, with an explicit partial-failure alert path.
9. Unit and integration tests that simulate CRM success, validation rejection, timeout, 429, and partial persistence failure.

## Decision gates for founder review

| Decision | Why it cannot be inferred safely | Progress without decision |
|---|---|---|
| Relay hosting path | Existing server extension and separate managed relay are both viable but have different operational ownership and deployment implications. | Draft endpoint contract and test plan only. |
| Contact-form CRM ownership | The referenced location is not accessible to the current read-only integration, and its message field is unverified. | Preserve current flow; do not reroute. |
| Digital Grandpa Library CRM ownership | The referenced separate location is inaccessible and the waitlist promise differs from the Beacon Brief. | Preserve current flow; do not fold into Beacon Momentum. |
| Watch answer retention | Current source attempts to place answers in CRM using placeholders while also writing the cohort database. | Preserve existing data boundary and document the required mapping. |
| Workflow proof | The CRM integration does not expose automation-workflow inspection in the current connected toolset. | Record source-code intent only; require owner-led CRM confirmation before claiming nurture is live. |

## Immediate engineering boundary

The next safe engineering step is to prepare a **non-deployed** same-origin endpoint contract and test harness for only the verified primary-location events. Actual deployment and client migration must wait until the founder chooses the hosting path and the server-only CRM credential is placed in the selected runtime.

# Beacon Labs Signal Check — Operating Specification and Implementation Plan

**Status:** Stage 1 intake, consent, CRM routing, and legacy-route consolidation verified on July 25, 2026. Free fulfillment, counsel privacy review, and the $297 stage remain separately release-gated.
**Date:** July 25, 2026  
**Owner:** Beacon Momentum LLC / Beacon Labs  
**Scope:** Free Signal Check, $297 expanded B2B follow-up, and consent-based handoff to Beacon Labs services

> **Operating principle:** First help an organization see the need. Then, if it elects to continue, help it begin to understand how to address the findings. Only then invite a separate conversation about the appropriate Beacon Labs service engagement.

## 1. Approved experience architecture

| Stage | Customer-facing promise | Required result | Not included |
|---|---|---|---|
| **Free initial Signal Check** | A consented request for Beacon Labs to review whether an initial diagnostic is appropriate. | A recorded request in the dedicated CRM intake stage; a report is only delivered after a separately implemented and verified fulfillment path. | An automatic scan, report-delivery promise, implementation plan, credentials, access to systems, guaranteed outcome, or automatic sales enrollment. |
| **$297 Expanded Signal Check follow-up** | A deeper B2B diagnostic that begins to answer how the organization can address the initial findings. | A paid, scoped report with a practical first-path framework and an explicit option to discuss suitable Beacon Labs services. | Implementation itself, open-ended consulting, automatic conversion to services, recurring subscription, or performance promise. |
| **Beacon Labs services** | A separately scoped conversation for implementation, strategy, technical, or ongoing support. | A qualified request for a follow-up discussion under separately agreed commercial terms. | Any implied obligation resulting from a Signal Check report. |

### Verified existing free-stage baseline

The live Beacon Labs free Signal Check at <https://beaconlabs.ai/signal-check> is the sole public Stage 1 entry point. The legacy `/audit` route redirects to it. The form requires first name, last name, email, business name, and affirmative permission for Beacon Labs to review and respond to the request; it optionally accepts website, industry, and public-search context. The public form links to an operational Privacy Notice, and the server rejects a request without consent before it creates or updates a CRM record. Consented requests enter `BL_Signal_Check → SC_Requested`, not the archived Beacon Labs pipeline.[9] [10]

The live free stage currently records a request only. It does **not** automatically start a scan, guarantee a report, make a report-delivery-time promise, or initiate a paid service. The $297 expanded follow-up must extend this experience only after free fulfillment has been separately built and validated, and only after explicit owner approval of the payment, consent, and post-payment controls.[9] [10]

## 2. Canonical funnel state model

Every lead must have one and only one current lifecycle state, with immutable event history for consent, payment, report delivery, and handoff.

| Lifecycle state | Entry condition | Allowed next state | Required evidence |
|---|---|---|---|
| `free_started` | Prospect opens the free form. | `free_submitted`, `abandoned` | Anonymous session event only; do not create a CRM contact until the form is submitted. |
| `free_submitted` | Required free-intake fields and delivery acknowledgement are submitted. | `free_queued`, `free_disqualified` | CRM contact, source/UTM data, consent record, submission timestamp. |
| `free_queued` | The request is eligible for processing. | `free_delivered`, `free_failed` | Assignment owner and delivery target. |
| `free_delivered` | Initial report is sent or securely made available. | `expanded_interested`, `closed` | Report version, delivery timestamp, and delivery outcome. |
| `expanded_interested` | Prospect affirmatively asks to see the paid follow-up scope or checkout. | `expanded_checkout_started`, `closed` | Explicit interest event; no payment assumption. |
| `expanded_paid` | A server-verified $297 payment succeeds. | `expanded_intake_submitted`, `refund_pending` | Payment provider event, payment ID, receipt sent, and scope acceptance. |
| `expanded_intake_submitted` | Required expanded-intake fields are complete. | `expanded_queued`, `expanded_disqualified` | Expanded intake version, consent record, and delivery target. |
| `expanded_delivered` | Paid follow-up is delivered. | `services_interested`, `closed` | Report version, delivery timestamp, and delivery outcome. |
| `services_interested` | Prospect explicitly opts to discuss Beacon Labs services. | `services_qualified`, `services_not_fit`, `closed` | Affirmative handoff action and owner assignment. |

## 3. Intake design and data minimization

### A. Free Signal Check intake

The free stage should capture only what is necessary to identify the organization, evaluate its public presence, and deliver the report.

| Field group | Required fields | Optional fields | Rule |
|---|---|---|---|
| **Contact** | First name, last name, business email, organization name, role/title | Business phone | Require a business purpose; do not request credentials or access. |
| **Public footprint** | Primary website URL, principal business category, primary goal/challenge | Up to two comparison or campaign URLs | Limit analysis to public URLs and organization-provided information. |
| **Context** | A concise statement of the question the organization hopes the review will clarify | Budget range, timeline | Treat budget/timeline as optional qualification data, not a condition of the free report. |
| **Request processing and permission** | Affirmative permission to review and respond to the request; linked Privacy Notice | Separate opt-in for Beacon Labs education/marketing | Do not bundle marketing consent into request processing or future report delivery. |

### B. Expanded $297 follow-up intake

The paid stage should reuse verified contact and free-stage context. It should ask only for additional information required to shape the expanded diagnostic.

| Additional field group | Example data | Guardrail |
|---|---|---|
| **Priority selection** | Which initial finding matters most; desired 30/60/90-day outcome | State clearly that this guides the diagnostic; it is not a performance commitment. |
| **Decision context** | Internal owner, urgency, current constraints, preferred follow-up format | Do not ask for credentials, customer lists, payment-account information, or confidential files in the form. |
| **Commercial acknowledgement** | $297 price, scope summary, report-delivery target, refund/contact route | Require affirmative acknowledgement before checkout. |
| **Service interest** | Optional checkbox: “I would like information about appropriate Beacon Labs services after my report is delivered.” | This must be independent of payment and report delivery. |

## 4. Report scope and handoff rules

| Deliverable | Content standard | Handoff rule |
|---|---|---|
| **Free report** | Clear diagnosis of visible gaps/opportunities, limited evidence, and explanation of why deeper work may be worthwhile. | May include one concise invitation to the expanded follow-up. Do not embed an assumed checkout or sales appointment. |
| **Expanded report** | Deeper interpretation of the initial findings, practical first-path choices, sequenced considerations, and transparent limitations. | May invite an optional Beacon Labs services conversation with an explicit affirmative CTA. |
| **Services handoff** | Human-reviewed qualification summary, agreed next-step type, and a named relationship owner. | A separate conversation, scope, price, and terms process is required. |

## 5. CRM, payment, and delivery model

### A. CRM attribution model

The canonical implementation must use **one approved GoHighLevel location** and server-side credentials. The verified free-stage baseline uses the active `BL_Signal_Check` pipeline and `SC_Requested` stage, with no fallback to the archived pipeline. Later lifecycle states, report delivery, and paid-stage attribution remain implementation work and need a designated CRM owner.[9] [10]

| Data element | Recommended value or pattern |
|---|---|
| **Source** | `beaconlabs.ai/signal-check` for the free stage; `beaconlabs.ai/signal-check/expanded` for the paid stage; preserve UTM/referrer fields. |
| **Stage tags** | `BL_Signal_Check_Free`, `BL_Signal_Check_Free_Delivered`, `BL_Signal_Check_Expanded_Interested`, `BL_Signal_Check_Expanded_Paid`, `BL_Signal_Check_Expanded_Delivered`, `BL_Services_Interested`, `BL_Marketing_Opt_In`. |
| **Custom fields** | Funnel version, free-report ID, expanded-report ID, diagnostic status, primary challenge, website URL, consent timestamp/version, payment status/ID, delivery status, service-interest flag, assigned owner. |
| **Automation** | Trigger on server-verified state changes only; never on unverified query parameters or client-submitted payment claims. |

### B. Payment model

The $297 expanded follow-up must use a **Beacon-branded on-site payment page**, not a hosted-checkout redirect. The browser may use the authorized processor’s secure embedded payment component or tokenization layer, while the Beacon backend creates or coordinates the payment and receives the processor’s signed webhook. Only that verified server-side payment event may transition the prospect to `expanded_paid`, queue work, create the receipt/confirmation state, or trigger CRM/report-delivery automation. The customer must receive a receipt and clear support/refund contact route. Stripe’s official Payment Intents documentation supports this on-site pattern and specifically directs fulfillment to verified webhooks rather than the client.[6] [7]

> No payment credential, CRM credential, webhook secret, or report-generation secret may be exposed in browser code. No browser success callback or client-submitted “paid” flag is sufficient to unlock paid work. The existing client-side GHL pattern is not an approved architecture for the operational funnel.[1] [2]

#### Canonical source and reuse boundary

The live Beacon Labs Signal Check source is the GitHub repository `beaconmomentum-dev/beaconlabs-ai`, not the Beacon Momentum marketing-site repository. Its existing `SignalCheck` page owns the free intake, and its server owns the `POST /api/signal-check` handoff. The app already contains an on-site embedded-payment precedent for a separate Blueprint offer, but that precedent accepts a browser-triggered order-confirmation call after client-side payment confirmation. It must not be copied as the paid Signal Check fulfillment authority. The required Signal Check implementation will instead reuse the established Beacon Guides Store pattern: a server-created payment intent and a signed raw-body processor webhook that is verified before fulfillment, CRM transition, receipt state, or report-queue creation.[8]

### C. Report-generation and delivery model

No Signal Check fulfillment worker, durable job store, monitored transactional delivery path, or delivery-state callback is currently deployed. The legacy fulfillment script is source material only and must not be deployed unchanged. An existing PDF renderer may only be used through an authenticated internal adapter after its access model is reviewed; it does not itself establish request ownership, reviewer approval, delivery evidence, or a safe failure path.[3] [10]

| Event | Operational action | Owner/control |
|---|---|---|
| Free submission accepted | Create a minimum-data lead record; queue report generation. | Designated Beacon Labs operations owner. |
| Free report ready | Deliver report through a secure, tracked method; record completion. | Delivery owner and failure/retry procedure. |
| Expanded payment verified | Create paid-intake task and confirmation communication; unlock expanded form. | Payment webhook + server-side state transition. |
| Expanded report ready | Deliver report; show a separate optional service-conversation CTA. | Delivery owner and relationship owner. |
| Service interest submitted | Assign a human owner; create a qualified follow-up task. | Beacon Labs service lead. |

## 6. Required legal, privacy, and copy updates

The public Beacon Labs Privacy Notice now describes the Signal Check information collected, processing purpose, service-provider category, retention approach, and requestor choices. It is an operational draft and requires appropriate counsel review before broad public acquisition or a paid expansion launch.[9] [10]

| Required update | Release condition |
|---|---|
| Privacy-policy coverage | Explain diagnostic information collected, report-delivery purpose, processor roles, retention/deletion route, and optional marketing permission. |
| Paid follow-up scope | Publish a bounded scope, price, delivery expectation, support route, refund/cancellation treatment, and no-guarantee language. |
| Consent language | Separate report-delivery acknowledgement from optional marketing permission; record version and timestamp. |
| Claims control | Use diagnostic and educational language; avoid claims of guaranteed revenue, rankings, conversion, compliance, implementation, or result. |

## 7. Implementation sequence

| Sequence | Deliverable | Dependency | Release gate |
|---|---|---|---|
| **0. Intake, routing, and consent hardening** | One public `/signal-check` intake; `/audit` redirect; affirmative consent; active CRM pipeline/stage; operational Privacy Notice. | Canonical Beacon Labs source and authorized CRM access. | **Complete for intake only:** CI/CD deployed, consent-negative probe returned HTTP `400`, controlled QA record verified in `BL_Signal_Check → SC_Requested`. |
| **1. Ownership and data map** | One named Beacon Labs operational owner; one CRM location; final custom-field schema; data-flow map. | Owner nomination and authorized GHL access. | Written approval of data ownership and schema. |
| **2. Free intake and delivery** | Dedicated free Signal Check route/form, server-side submission endpoint, free report status/receipt, delivery workflow. | Confirmed report generator and delivery service. | Test submission, consent capture, CRM event, report delivery, failure path. |
| **3. Paid expanded follow-up** | Expanded-offer page, scope acknowledgement, Beacon-branded on-site payment page, server-verified signed webhook event, paid intake, and receipt. | Explicit authorization to create/use the $297 payment product and approved processor components. | Test payment in non-production mode; no hosted redirect, no browser secret exposure, and no browser-trusted payment state. |
| **4. Service handoff** | Optional service-interest CTA, human assignment workflow, qualification dashboard or CRM view. | Named Beacon Labs service owner. | Test handoff and opt-out path. |
| **5. Policy and release audit** | Updated policies/copy, route/link verification, data-minimization review, accessibility and mobile review. | Policy review and authorized source access. | Signed release checklist. |

## 8. Immediate decisions required before implementation

| Decision | Why it is required | Recommended owner |
|---|---|---|
| **Designate the Beacon Labs operations owner** | A named role must own report queues, exceptions, delivery SLAs, and CRM lifecycle standards. | Beacon Momentum LLC. |
| **Select the authoritative GHL location and field schema** | Existing source contains more than one location configuration; new funnel data must not be split or misrouted. | CRM owner. |
| **Authorize the $297 payment product and on-site payment method** | A live payment product and embedded/on-site payment experience are customer-facing financial operations requiring explicit approval. | Beacon Momentum LLC + payment owner. |
| **Approve report scopes and delivery SLAs** | The free and paid reports need bounded templates and feasible human/automation delivery commitments. | Beacon Labs operations/service owner. |
| **Authorize server-side integration approach** | Required to remove client-side credential exposure and enforce verified lifecycle transitions. | Technical owner. |

## References

[1] [`client/src/lib/ghl.ts`](./client/src/lib/ghl.ts)  
[2] [`client/src/pages/ContactPage.tsx`](./client/src/pages/ContactPage.tsx)  
[3] [`/home/ubuntu/skills/beacon-signal-check-pipeline/SKILL.md`](/home/ubuntu/skills/beacon-signal-check-pipeline/SKILL.md)  
[4] [`client/src/pages/PrivacyPage.tsx`](./client/src/pages/PrivacyPage.tsx)
[5] [`BEACON_LABS_SIGNAL_CHECK_FUNNEL_DECISION_2026-07-25.md`](./BEACON_LABS_SIGNAL_CHECK_FUNNEL_DECISION_2026-07-25.md)
[6] [Stripe, “Build a checkout page with Payment Intents API”](https://docs.stripe.com/payments/quickstart)
[7] [Stripe, “Payment status updates”](https://docs.stripe.com/payments/payment-intents/verifying-status)
[8] [`BEACON_LABS_PAYMENT_ARCHITECTURE_EVIDENCE_2026-07-25.md`](./BEACON_LABS_PAYMENT_ARCHITECTURE_EVIDENCE_2026-07-25.md)
[9] [Beacon Labs Signal Check source and deployed form](https://github.com/Beacon-Ecosystem/beaconlabs-ai)
[10] [Beacon Labs Signal Check controlled-test and fulfillment-handoff record](https://github.com/Beacon-Ecosystem/beaconlabs-ai/blob/main/SIGNAL_CHECK_CONTROLLED_TEST_PROTOCOL_2026-07-25.md)

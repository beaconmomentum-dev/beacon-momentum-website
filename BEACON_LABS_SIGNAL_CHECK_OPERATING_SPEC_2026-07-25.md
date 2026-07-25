# Beacon Labs Signal Check — Operating Specification and Implementation Plan

**Status:** Drafted from owner-approved funnel decisions; ready for operational-owner confirmation before live integration work  
**Date:** July 25, 2026  
**Owner:** Beacon Momentum LLC / Beacon Labs  
**Scope:** Free Signal Check, $297 expanded B2B follow-up, and consent-based handoff to Beacon Labs services

> **Operating principle:** First help an organization see the need. Then, if it elects to continue, help it begin to understand how to address the findings. Only then invite a separate conversation about the appropriate Beacon Labs service engagement.

## 1. Approved experience architecture

| Stage | Customer-facing promise | Required result | Not included |
|---|---|---|---|
| **Free initial Signal Check** | A concise review that makes important gaps, opportunities, and the need for attention visible. | A delivered initial report with a transparent explanation of what it assessed and a voluntary invitation to the expanded follow-up. | Full implementation plan, credentials, access to systems, guaranteed outcome, or automatic sales enrollment. |
| **$297 Expanded Signal Check follow-up** | A deeper B2B diagnostic that begins to answer how the organization can address the initial findings. | A paid, scoped report with a practical first-path framework and an explicit option to discuss suitable Beacon Labs services. | Implementation itself, open-ended consulting, automatic conversion to services, recurring subscription, or performance promise. |
| **Beacon Labs services** | A separately scoped conversation for implementation, strategy, technical, or ongoing support. | A qualified request for a follow-up discussion under separately agreed commercial terms. | Any implied obligation resulting from a Signal Check report. |

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
| **Delivery and permission** | Report-delivery acknowledgement; privacy-policy acknowledgement | Separate opt-in for Beacon Labs education/marketing | Do not bundle marketing consent into report delivery. |

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

The canonical implementation must use **one approved GoHighLevel location** and server-side credentials. Current source patterns include a generic contact form and a shared helper configured to different locations; neither is sufficient for this funnel without consolidation and a designated CRM owner.[1] [2]

| Data element | Recommended value or pattern |
|---|---|
| **Source** | `beaconlabs.ai/signal-check` for the free stage; `beaconlabs.ai/signal-check/expanded` for the paid stage; preserve UTM/referrer fields. |
| **Stage tags** | `BL_Signal_Check_Free`, `BL_Signal_Check_Free_Delivered`, `BL_Signal_Check_Expanded_Interested`, `BL_Signal_Check_Expanded_Paid`, `BL_Signal_Check_Expanded_Delivered`, `BL_Services_Interested`, `BL_Marketing_Opt_In`. |
| **Custom fields** | Funnel version, free-report ID, expanded-report ID, diagnostic status, primary challenge, website URL, consent timestamp/version, payment status/ID, delivery status, service-interest flag, assigned owner. |
| **Automation** | Trigger on server-verified state changes only; never on unverified query parameters or client-submitted payment claims. |

### B. Payment model

The $297 expanded follow-up requires a payment processor checkout or payment link created and verified through an authorized Beacon Labs payment account. Payment status must be confirmed by a signed server-side provider event before work is queued. The customer must receive a receipt and clear support/refund contact route.

> No payment credential, CRM credential, or report-generation secret may be exposed in browser code. The existing client-side GHL pattern is not an approved architecture for the operational funnel.[1] [2]

### C. Report-generation and delivery model

The existing Beacon Signal Check fulfillment pipeline can inform the free-report delivery design, but its deployment, APIs, credentials, report templates, and CRM mapping must be confirmed by the designated operational owner before connection to live customer data.[3]

| Event | Operational action | Owner/control |
|---|---|---|
| Free submission accepted | Create a minimum-data lead record; queue report generation. | Designated Beacon Labs operations owner. |
| Free report ready | Deliver report through a secure, tracked method; record completion. | Delivery owner and failure/retry procedure. |
| Expanded payment verified | Create paid-intake task and confirmation communication; unlock expanded form. | Payment webhook + server-side state transition. |
| Expanded report ready | Deliver report; show a separate optional service-conversation CTA. | Delivery owner and relationship owner. |
| Service interest submitted | Assign a human owner; create a qualified follow-up task. | Beacon Labs service lead. |

## 6. Required legal, privacy, and copy updates

The current Privacy page recognizes GHL and Stripe as processors but does not yet describe the two-stage Signal Check purpose, report delivery, consent separation, or related retention treatment.[4]

| Required update | Release condition |
|---|---|
| Privacy-policy coverage | Explain diagnostic information collected, report-delivery purpose, processor roles, retention/deletion route, and optional marketing permission. |
| Paid follow-up scope | Publish a bounded scope, price, delivery expectation, support route, refund/cancellation treatment, and no-guarantee language. |
| Consent language | Separate report-delivery acknowledgement from optional marketing permission; record version and timestamp. |
| Claims control | Use diagnostic and educational language; avoid claims of guaranteed revenue, rankings, conversion, compliance, implementation, or result. |

## 7. Implementation sequence

| Sequence | Deliverable | Dependency | Release gate |
|---|---|---|---|
| **1. Ownership and data map** | One named Beacon Labs operational owner; one CRM location; final custom-field schema; data-flow map. | Owner nomination and authorized GHL access. | Written approval of data ownership and schema. |
| **2. Free intake and delivery** | Dedicated free Signal Check route/form, server-side submission endpoint, free report status/receipt, delivery workflow. | Confirmed report generator and delivery service. | Test submission, consent capture, CRM event, report delivery, failure path. |
| **3. Paid expanded follow-up** | Expanded-offer page, scope acknowledgement, payment checkout, server-verified payment event, paid intake, receipt. | Explicit authorization to create/use the $297 payment product and checkout. | Test payment in non-production mode; no browser secret exposure. |
| **4. Service handoff** | Optional service-interest CTA, human assignment workflow, qualification dashboard or CRM view. | Named Beacon Labs service owner. | Test handoff and opt-out path. |
| **5. Policy and release audit** | Updated policies/copy, route/link verification, data-minimization review, accessibility and mobile review. | Policy review and authorized source access. | Signed release checklist. |

## 8. Immediate decisions required before implementation

| Decision | Why it is required | Recommended owner |
|---|---|---|
| **Designate the Beacon Labs operations owner** | A named role must own report queues, exceptions, delivery SLAs, and CRM lifecycle standards. | Beacon Momentum LLC. |
| **Select the authoritative GHL location and field schema** | Existing source contains more than one location configuration; new funnel data must not be split or misrouted. | CRM owner. |
| **Authorize the $297 payment product and checkout method** | A live payment product/link is a financial and customer-facing operation requiring explicit approval. | Beacon Momentum LLC + payment owner. |
| **Approve report scopes and delivery SLAs** | The free and paid reports need bounded templates and feasible human/automation delivery commitments. | Beacon Labs operations/service owner. |
| **Authorize server-side integration approach** | Required to remove client-side credential exposure and enforce verified lifecycle transitions. | Technical owner. |

## References

[1] [`client/src/lib/ghl.ts`](./client/src/lib/ghl.ts)  
[2] [`client/src/pages/ContactPage.tsx`](./client/src/pages/ContactPage.tsx)  
[3] [`/home/ubuntu/skills/beacon-signal-check-pipeline/SKILL.md`](/home/ubuntu/skills/beacon-signal-check-pipeline/SKILL.md)  
[4] [`client/src/pages/PrivacyPage.tsx`](./client/src/pages/PrivacyPage.tsx)  
[5] [`BEACON_LABS_SIGNAL_CHECK_FUNNEL_DECISION_2026-07-25.md`](./BEACON_LABS_SIGNAL_CHECK_FUNNEL_DECISION_2026-07-25.md)

# Beacon Labs Signal Check Funnel — Owner Decision Record

**Decision status:** Owner-approved  
**Decision date:** July 25, 2026  
**Decision owner:** Bob, Beacon Momentum LLC  
**Applies to:** Beacon Labs acquisition, diagnostic, sales-handoff, CRM, report-delivery, and related Beacon Momentum marketing surfaces

> **Approved intent:** The free Signal Check shows an organization that it has a meaningful need. The separate $297 expanded follow-up begins to answer how the organization can overcome the issues revealed in the initial report. Appropriate Beacon Labs services are then offered only as a distinct, consent-based next step.

## 1. Approved offer architecture

| Stage | Public offer | Price | Purpose | Required boundary |
|---|---|---:|---|---|
| **1** | Initial Signal Check | **Free** | Makes gaps, opportunities, and the need for attention visible through an initial diagnostic report. | It does not promise a complete solution, implementation, or service engagement. |
| **2** | Expanded Signal Check follow-up | **$297** | Begins to answer how to address the findings from the initial report through a deeper B2B diagnostic and practical next-step path. | It is a separate, optional paid engagement—not a replacement for the free report and not a subscription. |
| **3** | Beacon Labs services | Quote- or scope-based as applicable | Provides the appropriate implementation, strategy, technical, or ongoing service engagement when the organization elects to proceed. | It is never automatic, guaranteed, or implied by completion of either diagnostic stage. |

## 2. User journey and qualification logic

| Moment | Approved experience | Commercial and communication rule |
|---|---|---|
| **Free submission** | Prospect provides the minimum business and website information needed to prepare the initial Signal Check. | Collect only required data; clearly state delivery expectations and any marketing consent choice. |
| **Initial report delivery** | Prospect receives a concise diagnostic that identifies meaningful gaps, opportunities, and the rationale for deeper investigation. | The report may recommend consideration of the optional expanded follow-up, but must not pressure the prospect or promise results. |
| **Expanded follow-up request** | Prospect explicitly chooses the paid $297 follow-up, receives clear scope, payment, and delivery details, and completes the paid intake. | Payment confirmation, scope acknowledgement, and consent must precede work. No automatic charge, escalation, or service enrollment. |
| **Expanded report delivery** | Beacon Labs provides a deeper, practical path for beginning to address the initial findings. | The report distinguishes diagnostic recommendations from implementation or ongoing service work. |
| **Service conversation** | A qualified organization can elect to discuss an appropriate Beacon Labs service engagement. | Use a separate affirmative handoff; state that scope, terms, and pricing are determined separately. |

## 3. Non-negotiable distinctions

| Distinction | Governing rule |
|---|---|
| **Signal Check vs. The Watch** | The Signal Check funnel is a Beacon Labs B2B diagnostic pathway. It must not be presented as a The Watch membership benefit, price, or enrollment path. |
| **Free vs. paid diagnostic** | The initial Signal Check is free. The expanded follow-up is the only $297 diagnostic offer. Their CTAs, scope statements, confirmation states, CRM tags, and reports must remain distinct. |
| **Diagnostic vs. services** | Neither diagnostic guarantees outcomes or creates a service engagement. Beacon Labs services require a separate, explicit customer decision and the applicable commercial terms. |
| **Interest vs. consent** | A request for a report does not automatically create consent for marketing beyond the delivery of that report. Marketing permission must be captured separately and recorded. |

## 4. Required implementation controls

| Control | Minimum requirement before operational release |
|---|---|
| **Intake** | Stage-specific forms with required fields, data-minimization rules, source attribution, and a clear business-purpose statement. |
| **CRM** | Separate lifecycle tags and field values for free submission, free delivery, expanded interest, paid/confirmed, expanded delivery, service-qualified, service-declined, and opt-in status. |
| **Payment** | A server-verified $297 payment event and a receipt/confirmation state before expanded work begins. Payment credentials must not be exposed in client-side code. |
| **Report delivery** | A named delivery owner, service-level target, secure report link or attachment policy, and failure/retry procedure. |
| **Consent and privacy** | Clear delivery notice, separate marketing permission, retention/deletion pathway, and policy coverage for both diagnostic stages. |
| **Handoff** | An affirmative “discuss Beacon Labs services” action with scope, qualification, and ownership rules; no automatic sales enrollment. |

## 5. Current implementation status

The live Pricing page correctly presents the two diagnostic stages, but it is still a **presentation and contact-handoff layer**, not the complete operational funnel. The canonical source currently uses client-side GHL contact-upsert patterns and two separate CRM location configurations across existing helpers and the generic contact page. Those patterns must be reconciled behind a secure server-side integration before paid intake, payment, CRM lifecycle automation, or report delivery is operationalized.[1] [2]

## References

[1] [`client/src/pages/PricingPage.tsx`](./client/src/pages/PricingPage.tsx)  
[2] [`client/src/lib/ghl.ts`](./client/src/lib/ghl.ts) and [`client/src/pages/ContactPage.tsx`](./client/src/pages/ContactPage.tsx)

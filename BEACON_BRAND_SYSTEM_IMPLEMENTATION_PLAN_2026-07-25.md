# Beacon Brand System — Detailed Implementation Plan

**Status:** Owner-approved shared visual foundation; implementation remains gated by property-specific source, access, policy, and commercial-truth requirements

**Scope:** Beacon Momentum, LLC; `beaconmomentum.com`; `beaconcommunity.net`; `beacontrading.ai`; `beaconlabs.ai`; and `app.beaconmomentum.com`

**Prepared for:** Beacon Momentum, LLC

**Prepared by:** Manus AI

> **System principle:** Beacon should feel like one well-governed family with distinct disciplines—not one generic site repeated five times, and not five unrelated brands competing for the same visitor.

## 1. Executive decision

The Beacon Brand System should use a **shared foundation, differentiated expressions** model. Beacon Momentum, LLC governs the brand, legal and offer standards, visual primitives, component quality, and cross-property handoffs. Each property retains an individual atmosphere because its visitor, task, risk profile, and conversion goal are different.

The result should make the following truth legible within the first screen of every property: **where the visitor is, what this property is for, what it is not for, and where an intentional next step will lead.** The plan therefore combines a design system with a routing, offer, disclosure, and content-governance system.

| Property | Canonical job | Primary audience | Required emotional signal |
|---|---|---|---|
| **Beacon Momentum** | Public ecosystem front door and route-selection layer | New visitors, readers, prospective members, founders, partners | Orientation, credibility, possibility |
| **Beacon Community** | Membership, community, courses, chat, support, and member training | Committed members and prospective members | Calm, safety, progress, belonging |
| **Beacon Trading** | Educational simulation and market-literacy practice | Learners exploring market methods in a simulation environment | Precision, restraint, analytical curiosity |
| **Beacon Labs** | B2B diagnostics, services, sales, delivery, and client enablement | Organizations, operators, decision-makers | Technical confidence, evidence, commercial clarity |
| **Related app surface** | Technical or legacy service surface pending authorized role inventory | Existing users and administrators only, until role is approved | Utility, clarity, continuity |

This preserves the corrected operating model: `beaconmomentum.com` routes; Beacon Community owns membership; Beacon Trading owns simulation-first financial education; Beacon Labs owns B2B commercial work; and the related app must not position itself as a second public membership front door unless a formal technical-role decision authorizes that role.[1] [2] [3] [4] [5]

## 2. Brand-system objectives and non-negotiables

The Brand System is successful only when it creates clarity without forcing sameness. Every new page, campaign, product card, email destination, public CTA, footer link, or policy surface should be evaluated against the following non-negotiables.

| Objective | Required outcome | Failure to avoid |
|---|---|---|
| **One family** | A visitor recognizes Beacon lineage through shared mark rules, typography, interaction quality, navigation grammar, accessibility, and destination disclosure. | Copying the same hero, colors, or slogans across properties until their purposes blur. |
| **One job per property** | Each property has a visible role descriptor and one principal conversion action. | Public pages that make Beacon Momentum, Beacon Community, and the app all appear to sell or host the same membership. |
| **Purpose-led routing** | Every cross-property CTA states the destination, role, and data boundary before the click. | Silent redirects, imported form data, auto-created accounts, or generic “Get started” links. |
| **Training clarity** | Public orientation, membership learning, simulation education, and client enablement are visually connected but structurally separate. | Treating the public site as a second classroom, presenting B2B implementation as a membership benefit, or presenting simulation as investment advice. |
| **Commercial truth** | Names, prices, qualifications, claims, and policies originate from a controlled offer ledger. | Syndicating stale, conflicting, or incomplete price cards. |
| **Accessible quality** | All public surfaces meet keyboard, focus, contrast, responsive, motion, and semantic-content standards. | Making visual differentiation dependent on color alone, fine gold text, or inaccessible glass/overlay treatments. |

## 3. System architecture

### 3.1 The public route map

The public ecosystem should function as a set of **clear doors**, not as a site maze. Beacon Momentum is the orienting layer; it does not own member accounts, B2B contracts, or simulation access. Each destination must use a short disclosure immediately next to its CTA.

```text
Beacon Momentum, LLC — brand, governance, standards, policy ownership
│
├── beaconmomentum.com — Discover the Beacon ecosystem
│   ├── Membership & Training → beaconcommunity.net
│   ├── Financial Education & Simulation → beacontrading.ai
│   └── For Organizations → beaconlabs.ai
│
├── beaconcommunity.net — Membership, community, courses, chat, support
│   └── Contextual B2B referral → beaconlabs.ai
│
├── beacontrading.ai — Educational simulation and market-literacy practice
│   └── Return to the Beacon ecosystem → beaconmomentum.com
│
├── beaconlabs.ai — B2B diagnostics, services, delivery, client enablement
│   └── Parent-company proof and return path → beaconmomentum.com
│
└── app.beaconmomentum.com — Technical/legacy surface pending approved role
```

| Public route | Destination label | Required pre-click disclosure | Receiving-property rule |
|---|---|---|---|
| **Membership & Training** | “Explore Beacon Community” | “Membership, courses, community, and member support are hosted at Beacon Community.” | The receiving site owns enrollment, account creation, payment, onboarding, and support. |
| **Financial Education & Simulation** | “Explore Beacon Trading” | “Educational simulation and practice only. No brokerage, custody, live execution, or individualized investment advice.” | The receiving site owns access, payment, learning records, and applicable policies. |
| **For Organizations** | “Explore Beacon Labs” | “B2B services delivered by Beacon Labs, a Beacon Momentum, LLC company.” | The receiving site owns inquiry, consent, client records, contracts, payment, and support. |
| **Return to the ecosystem** | “Return to Beacon Momentum” | “Visit the public Beacon ecosystem guide.” | No user data is transferred by the return path. |

### 3.2 Cross-property data rule

Cross-property links are **contextual, disclosed, and stateless by default**. An attribution parameter such as `source=beaconmomentum`, `source=beaconcommunity`, or `source=beacontrading` is permitted only after analytics approval. No link may carry an email address, membership status, account ID, form response, payment status, course progress, health-related information, trading activity, or other personal data.

The required microcopy is:

> “You are continuing to a separate Beacon property with its own experience, policies, and enrollment or inquiry process.”

## 4. Shared parent foundation

### 4.1 Brand promise and narrative system

The shared promise is **steady navigation through complex work**. Beacon language should communicate orientation, practice, evidence, and progress without hype, shame, false urgency, clinical claims, investment claims, or vague “transformation” promises.

| Element | Parent-system standard | Examples |
|---|---|---|
| **Core metaphor** | Navigation, signal, harbor, chart, bearing, lighthouse, current, and steady systems. Use sparingly and concretely. | “Find the next useful bearing.” “A clearer operating map.” |
| **Tone** | Calm, precise, invitational, practical, and non-shaming. | “Choose the path that fits your next step.” |
| **Headline style** | Outcome and role first; imagery second. | “Membership, practice, and support—inside Beacon Community.” |
| **CTA style** | State the next destination or action explicitly. | “Explore Beacon Community,” “Review the Signal Check,” “Open a simulation lab.” |
| **Banned default language** | Generic or misleading conversion phrases. | Avoid “Get started,” “Join now” without context, “Guaranteed,” “Live signal,” “Execute,” “Financial freedom,” and “Elite access.” |
| **Claims standard** | Claims must be specific, documented, dated, and owner-approved. | “Includes ten simulation labs” rather than “The most powerful trading system.” |

### 4.2 Visual token contract

The system must be implemented first as semantic tokens—not a set of copied hex codes. Each property consumes the same token categories, while its property profile selects the accent, surface balance, and illustration/data treatment. The owner approved this shared foundation on July 25, 2026; exact production values must still undergo contrast validation before release.

| Token family | Parent role | Proposed semantic tokens | Rule |
|---|---|---|---|
| **Foundation** | Shared visual recognition | `--beacon-ink`, `--beacon-deep-navy`, `--beacon-paper`, `--beacon-mist`, `--beacon-line` | All properties use the same neutral foundation; they do not each invent new navies or whites. |
| **Signal gold** | Shared Beacon cue and premium/attention accent | `--beacon-gold-fill`, `--beacon-gold-ink`, `--beacon-gold-muted` | Use gold for highlights, rules, marks, and small emphasis. Use the darker gold-ink token for text on light surfaces; never rely on gold alone for meaning. |
| **Property accent** | Pathway confirmation | `--property-accent`, `--property-accent-soft`, `--property-accent-ink` | Each property receives one distinct accent family; use it in route labels, active navigation, callouts, and focused states. |
| **Semantic status** | Shared accessibility and feedback language | `--status-success`, `--status-caution`, `--status-danger`, `--status-info` | Status colors remain consistent across properties; property accents cannot replace warnings or errors. |
| **Surfaces** | Hierarchy and depth | `--surface-base`, `--surface-raised`, `--surface-tinted`, `--surface-inverse` | Use surface hierarchy instead of excessive borders, rounded cards, or gradients. |
| **Type** | Information hierarchy | `--font-display`, `--font-body`, `--font-mono` | Use one approved display/body system across the ecosystem; mono is reserved for data, technical labels, and optional Trading/Labs UI. |
| **Motion** | Shared interaction quality | `--ease-out`, `--ease-in-out`, `--duration-fast`, `--duration-standard` | Motion is brief, intentional, and disabled or reduced for motion-sensitive users. |

### 4.3 Initial color-direction proposal

The owner approved this relationship model on July 25, 2026. Exact production values must be validated through a visual token and contrast review before release.

| Property | Accent direction | Function of the accent | Do not use it for |
|---|---|---|---|
| **Beacon Momentum** | **Signal gold** with restrained harbor teal | Orientation, portfolio emphasis, parent-level confidence | Heavy full-page gold fields or low-contrast gold body text |
| **Beacon Community** | **Harbor green / sea-glass** | Calm progress, belonging, low-friction learning | Clinical or wellness-treatment signaling |
| **Beacon Trading** | **Analytic cyan / tide blue** | Simulation state, data literacy, learning status | Profit/loss celebration, red/green-only meaning, brokerage cues |
| **Beacon Labs** | **Copper / engineering amber** | Technical craft, operating systems, B2B proof | Consumer-membership warmth or speculative-finance imagery |
| **Related app** | **Restrained parent navy with function-specific status colors** | Technical continuity and utility | A competing public-brand hero identity |

### 4.4 Typography, iconography, imagery, and motion

The parent system uses an editorial display face and an unusually legible UI/body face rather than defaulting to a single generic sans-serif. The approved pairing is **Fraunces** for display, **Manrope** for body and interface, and **IBM Plex Mono** for technical labels, data values, and simulation metadata. The implementation team must validate font licensing, variable-font support, loading performance, and fallback stacks before release.

The lighthouse mark is the shared brand anchor. Each property receives a property badge or signal device beside—never instead of—the parent mark. Icons must be custom, geometric, and semantically named. Stock-outline icon sets should be used only as temporary implementation scaffolding and replaced within the property rollout.

Imagery should follow one editorial rule: **show a real environment, artifact, pattern, or illustration that explains the property’s work.** Beacon Community should favor human-scale learning artifacts, notes, quiet spaces, and guided progress. Beacon Trading should favor charts as learning objects, scenario cards, and bounded simulation states. Beacon Labs should favor system maps, implementation artifacts, and evidence-led diagrams. The public landing page should favor ecosystem orientation, not a collage of unrelated product screenshots.

Motion should use transform and opacity only, stay brief, and respect `prefers-reduced-motion`. Animation is for feedback, hierarchy, or orientation—not spectacle. The no-motion experience must remain fully informative.

## 5. Differentiated property profiles

### 5.1 Beacon Momentum — public ecosystem guide

**Role:** The public landing page explains the ecosystem and helps a new visitor choose the right door. It should never impersonate the membership portal, the B2B funnel, or a trading application.

| Dimension | Implementation direction |
|---|---|
| **Visual character** | Editorial, navigational, confident, spacious; navy/paper foundation with signal-gold emphasis and route-specific accent cues. |
| **Primary header** | Beacon parent mark; “How Beacon Works,” “Membership & Training,” “Financial Education,” “For Organizations,” and “Resources.” Each destination label signals its property. |
| **Hero** | One concise portfolio promise followed by three route cards—not a membership-only hero. |
| **Primary CTA pattern** | Route CTA plus short destination disclosure. No generic single-path “Join” CTA. |
| **Proof pattern** | Portfolio map, approved case-study snippets, named content pillars, and clear destination cards. |
| **Footer role** | Parent-company footer with all property roles, legal/policy links, status disclosure, and a compact cross-property map. |
| **Prohibited ambiguity** | “Enroll in The Watch” or “member login” without immediately naming Beacon Community as the destination and system of record. |

### 5.2 Beacon Community — membership and member training

**Role:** Beacon Community is the one membership home. It owns membership enrollment, accounts, community, curriculum, chat, member support, and all membership-facing training.

| Dimension | Implementation direction |
|---|---|
| **Visual character** | Quiet harbor; calm pacing; sea-glass accent; generous reading rhythm; visible progress without gamified pressure. |
| **Primary header** | Clear membership role, “How Membership Works,” “Learning Paths,” “Community,” “Support,” and a single member sign-in path. |
| **Hero** | One approved membership program name, price/term, and outcome statement. The Watch may remain a program name only after product approval. |
| **Learning patterns** | Learning path, lesson rail, reflection card, “next useful step,” completion state, and explicit escalation/support boundary. |
| **Community patterns** | Moderation visibility, conduct expectations, support routes, and a non-clinical coach/support label. |
| **Trading bridge** | A clearly marked educational link to Beacon Trading; no account sharing and no language that equates simulation learning with personalized financial guidance. |
| **Labs bridge** | Contextual organization-level referral only; it must appear as optional B2B exploration, not a membership requirement or implied upgrade. |

### 5.3 Beacon Trading — educational simulation academy

**Role:** Beacon Trading teaches market literacy, risk/process awareness, and method comparison through educational simulation. It is not brokerage, custody, advisory, live execution, or individualized investment direction.

| Dimension | Implementation direction |
|---|---|
| **Visual character** | Analytical academy; tide-blue/cyan accent; high information density with generous whitespace; persistent, compact simulation status. |
| **Persistent disclosure** | A visible “Simulation Mode — No Real Trades” status pattern in dashboard and learning context. |
| **Header and navigation** | “Academy,” “Simulation Labs,” “Practice,” “Guide,” “Pricing,” and legal/disclaimer entry. Avoid “signals” language unless explained as simulation outputs. |
| **Learning patterns** | Scenario card, strategy explainer, assumption panel, backtest exercise, comparison view, confidence/limitation note, and learning badge. |
| **Content grammar** | “Compare,” “test,” “simulate,” “study,” “document assumptions,” and “consider a qualified professional for real decisions.” |
| **Prohibited grammar** | “Execute,” “live signal,” “follow this trade,” “best return,” individual risk recommendations, or implied real-money outcomes. |
| **Footer role** | Full simulation/no-advice disclosure, Terms, Privacy, Disclaimer, access/refund policy, and return-to-Beacon route. |

### 5.4 Beacon Labs — B2B engineering and operating systems

**Role:** Beacon Labs sells and delivers B2B infrastructure, diagnostics, implementation, and client enablement. It must retain a separate sales and data lifecycle from B2C and membership activity.

| Dimension | Implementation direction |
|---|---|
| **Visual character** | Engineering studio; copper/amber accent; structured diagrams, evidence, system maps, and concise operational proof. |
| **Parent endorsement** | “A Beacon Momentum, LLC company” appears in the header/foundation zone and footer, not as a substitute for Labs’ own B2B identity. |
| **Primary navigation** | “Capabilities,” “Diagnostics,” “How Engagements Work,” “Proof,” “Resources,” and “Talk to Labs.” |
| **Offer pattern** | Approved service category, starting investment, scope qualifier, intended buyer, and explicit commercial destination. |
| **Diagnostic pattern** | One named free snapshot and one named paid full diagnostic only after the offer ledger is approved. Each carries scope, data requirement, report delivery, policy, and next-step language. |
| **Form pattern** | Minimal B2B intake; purpose disclosure; privacy/terms links; no imported Beacon Community or public-site data. |
| **Prohibited ambiguity** | Calling Beacon Momentum the membership platform, presenting B2B services as member benefits, or promising delivery/performance unsupported by the claims ledger. |

### 5.5 Related app surface — approved technical role only

**Role:** The app remains a technical or legacy surface until owner-authorized inventory determines its function. Its UI may share tokens and utility components, but it must not publish competing membership positioning.

| Dimension | Implementation direction |
|---|---|
| **Public entry** | No public “primary member portal” claim until the technical-role decision is approved. |
| **Visual character** | Low-chrome, utility-first, parent-navy foundation, with property-specific sub-brand only when the user is inside a verified function. |
| **Authentication** | A single sign-in ownership statement that names the actual system of record or explains the technical relationship. |
| **Migration behavior** | Preserve data and function first; use explicit notices for any redirection, retirement, or migration. |

## 6. Shared component and content system

The Brand System should be delivered as a usable component library, not only a design deck. The following components are mandatory for the first adoption wave.

| Component | Shared requirements | Property-specific behavior |
|---|---|---|
| **Parent bar** | Parent mark, small role statement, accessible contrast, link to public ecosystem guide. | Visible on public properties; optional within authenticated utility screens where it would interrupt task flow. |
| **Primary header** | Shared logo lockup, navigation spacing, active state, responsive menu, focus behavior, and route disclosure support. | Property-specific primary actions and accent state. |
| **Universal footer** | Parent disclosure, property map, support/legal links, policy architecture, reduced-motion-safe interaction. | Property-specific legal blocks: simulation/no-advice for Trading; B2B commercial policies for Labs; membership policies for Community. |
| **Cross-property handoff** | Destination badge, external/continuation copy, optional attribution source, no personal data. | Tone and destination wording adapt to Membership, Simulation, or B2B. |
| **Pathway card** | Role label, one promise, destination, evidence cue, CTA, disclosure. | Community card emphasizes membership; Trading card emphasizes simulation; Labs card emphasizes B2B. |
| **Offer snapshot** | Source-of-truth label, version/updated date, scope qualifier, policy link. | Used on Labs and Trading; public landing uses only approved summaries. |
| **Training module card** | Objective, time/rhythm, level, next action, learning boundary. | Community uses progress/reflection; Trading uses simulation/assumption; Labs uses client-enable­ment context. |
| **Disclosure strip** | Compact, persistent when risk/role clarity is essential; keyboard readable. | Trading: simulation/no-advice; Community: non-clinical support; Labs: separate B2B commercial experience. |
| **FAQ and policy pattern** | One approved answer source, date/version, related policy link. | Membership cancellation language stays on Community surfaces; public site may summarize but must link to the canonical policy. |
| **Data/empty/error states** | Plain language, semantic status, recovery action, no shame-based microcopy. | Trading clearly labels simulated/placeholder data; Community gives support route; Labs provides commercial contact recovery. |

### 6.1 Required design-system artifacts

The implementation team should create the following versioned artifacts in a dedicated `beacon-brand-system` workspace or repository. Property repositories should consume published artifacts instead of copying styles by hand.

| Artifact | Minimum contents | Owner |
|---|---|---|
| **Token package** | Semantic color, type, space, radius, elevation, motion, focus, and status tokens in JSON and CSS variables. | Brand/design systems owner |
| **Figma library** | Foundations, component variants, route cards, disclosures, documentation, and property themes. | Brand/design owner |
| **Web component library** | Shared React/CSS primitives, accessibility behavior, tests, and story examples. | Front-end systems owner |
| **Brand asset kit** | Parent mark, property badges, favicon/app icons, social-card templates, icon set, image direction, and export rules. | Brand owner |
| **Content grammar guide** | Voice, role descriptors, CTA patterns, claim rules, training language, prohibited language, and examples. | Content/policy owner |
| **Offer/claims/link ledgers** | Canonical prices, terms, product names, approved claims, destinations, owners, review dates, and status. | Parent-company operations owner |
| **Cross-property QA checklist** | Visual, content, functional, policy, analytics, privacy, responsive, and accessibility checks. | Quality owner |

## 7. Governance model

The Brand System requires an operating model, because visual drift is usually caused by undocumented product decisions, disconnected offers, and unowned links—not merely by inconsistent CSS.

| Decision area | Accountable owner | Required approvers | Evidence required before publication |
|---|---|---|---|
| **Parent standards and property profile changes** | Brand systems owner | Beacon Momentum, LLC owner; relevant property owner | Updated token/library version and visual review record |
| **Membership name, price, term, and policy** | Beacon Community product owner | Parent-company product owner; policy owner | Offer-ledger entry, canonical policy link, routing test |
| **Trading education/disclaimer language** | Beacon Trading content owner | Policy reviewer | Content review, disclaimer link test, simulation-language check |
| **B2B services, pricing, and diagnostic ladder** | Beacon Labs commercial owner | Parent-company offer owner; policy reviewer | Offer ledger, claims ledger, public policy links, funnel test |
| **Cross-property data/analytics** | Operations/privacy owner | Receiving-property owner | Data map, consent wording, attribution specification |
| **Technical app role** | Related-app technical owner | Parent-company owner; data owner | Authorized inventory and written role decision |

Every offer, claim, route, disclosure, policy, and shared component must have a **named owner, review date, source-of-truth URL or file, and retirement rule**. A page may not publish a new property name, price, “founder” claim, customer proof point, or cross-property CTA without an entry in the appropriate ledger.

## 8. Detailed rollout plan

The rollout is intentionally sequenced so branding work does not conceal unresolved product, policy, or routing issues. Each phase produces usable system assets and ends with a testable exit criterion.

| Phase | Workstream | Core deliverables | Dependencies | Exit criteria |
|---|---|---|---|---|
| **0 — Decisions and inventory** | Establish the product and governance baseline. | Approved membership offer decision; Labs diagnostic ladder decision; Trading education/disclosure standard; related-app inventory; offer/claims/link ledgers. | Parent-company and property-owner decisions. | One role map, one price/offer source, one primary membership destination, and no unresolved owner for a public claim. |
| **1 — Foundation sprint** | Build the shared Brand System package. | Token package, typography decision, mark/badge family, icon rules, parent bar, header, footer, handoff component, QA checklist. | Phase 0 role definitions. | Components render in a component preview; semantic tokens pass contrast and focus checks. |
| **2 — Public landing implementation** | Make `beaconmomentum.com` the clear ecosystem front door. | Three pathway architecture, route cards, destination disclosures, new public header/footer, approved parent/company language, no conflicting membership ownership. | Approved membership and Labs offer summaries. | A first-time visitor can correctly select membership, simulation education, or B2B services without ambiguity. |
| **3 — Beacon Community implementation** | Make Community the unmistakable membership and training home. | Approved membership name/price, member onboarding path, learning templates, community/support patterns, clean legacy navigation, shared shell. | Phase 0 membership decision; Community route/product audit. | One membership proposition, one sign-in/enrollment story, no broken legacy CTA, and consistent non-clinical boundaries. |
| **4 — Beacon Trading implementation** | Align the academy with the parent system while preserving simulation rigor. | Simulation status component, repaired pricing/legal routes, training templates, no-advice disclosure patterns, clean footer, content-language revision. | Trading policy/price verification. | Every paid route and legal link works; every learning screen remains clearly simulation-only. |
| **5 — Beacon Labs implementation** | Build a coherent B2B service and diagnostic experience. | Parent endorsement, capability pages, approved offer snapshots, diagnostic ladder, commercial policy surfaces, client-enable­ment templates, B2B handoff component. | Labs offer ledger, legal/policy surfaces, payment/intake review. | All B2B prices and claims match the ledger; all forms have purpose/policy language; no B2C/membership data import. |
| **6 — Related app role alignment** | Preserve, map, and rationalize the app surface. | Approved role statement, authentication ownership copy, shared utility shell, migration/retirement notices if required. | Authorized app/data inventory. | The app no longer competes publicly with Beacon Community and any migration preserves user data and function. |
| **7 — Ecosystem validation and maintenance** | Certify cross-property continuity. | Link registry test, visual regression set, content/claims review, analytics map, quarterly review cadence. | Completion of all applicable property phases. | All global headers, footers, route labels, disclosures, and primary flows meet the acceptance checklist. |

## 9. Implementation acceptance criteria

No property rollout should be called complete because it “looks better.” It is complete only when it meets the following measurable quality gates.

| Category | Acceptance standard |
|---|---|
| **Role clarity** | Within one viewport, a visitor can identify the property’s job, intended audience, and primary next action. |
| **Cross-property routing** | Every external Beacon CTA states the destination and role; all links resolve to the correct property; no sensitive state crosses a link. |
| **Brand continuity** | Parent mark, role descriptor, typography, token system, focus treatment, footer grammar, and handoff component conform to the approved system. |
| **Differentiation** | Each property uses its approved accent, imagery, content tone, and template set without losing the shared foundation. |
| **Offer truth** | Every public price, product name, term, and claim matches a current ledger entry with owner and review date. |
| **Training clarity** | Public orientation, Community curriculum, Trading simulation education, and Labs client enablement each use the correct owner, tone, disclosure, and CTA. |
| **Financial education** | Trading screens show simulation/no-advice language where decision context exists; content contains no execution prompts or personalized guidance. |
| **Member safety** | Community support/coach language is non-clinical, escalation routes are clear, and policies are reachable. |
| **B2B data separation** | Labs forms collect only approved data, identify their commercial purpose, link policies, and do not import B2C/member records. |
| **Accessibility** | Keyboard navigation, visible focus, semantic headings, labeled controls, contrast, target sizes, responsive behavior, and reduced motion pass review. |
| **Technical quality** | Component tests, route tests, link checks, visual regression checks, performance budgets, and source-map/error monitoring are completed per property. |

## 10. Measurement and maintenance

The Brand System should be measured as a clarity and trust program, not only a design refresh. The analytics model must report aggregate, consent-respecting indicators and avoid profile merging across properties.

| Measure | What it indicates | Review cadence |
|---|---|---|
| **Pathway selection rate** | Whether public visitors understand Membership, Simulation, and Organizations routes. | Weekly during rollout; monthly thereafter |
| **Misrouted-support volume** | Whether members, B2B prospects, and Trading learners land in the wrong support channel. | Monthly |
| **Broken-link and route-health rate** | Whether promises and navigation remain operational. | Automated daily; reviewed weekly |
| **Offer-ledger drift** | Whether published prices/names differ from approved source material. | Before each release; monthly audit |
| **Disclosure visibility/completion** | Whether simulation, policy, and separate-property notices are present at key decision points. | Each release |
| **Accessibility regression count** | Whether changes reduce usability. | Each release |
| **Training progression signals** | Whether learning paths are understandable and used within their correct property. | Monthly, property-local only |

## 11. Immediate approval agenda

Before implementation starts, the parent-company owner should approve or assign the following decisions. These are the only items that block the foundational work; no visual refresh should be used to defer them.

| Decision | Recommended default | Decision owner |
|---|---|---|
| **Canonical membership identity** | One membership name, price/term, enrollment destination, and policy owner on Beacon Community. | Beacon Community + parent product owner |
| **Execution Engine treatment** | Integrate, retire, or position it as a clearly subordinate learning asset—never a conflicting parallel membership sales path. | Beacon Community + parent product owner |
| **Labs diagnostic ladder** | A clearly named free snapshot and a clearly named paid full diagnostic, each with scope and policy. | Beacon Labs commercial owner |
| **Trading language standard** | Simulation-only, education-first vocabulary across homepage, guide, dashboard, pricing, and legal pages. | Beacon Trading owner + policy reviewer |
| **Related app role** | Technical host, companion utility, managed migration target, or retirement candidate—supported by authorized data inventory. | App technical/data owner |
| **Brand foundation** | Token proposal, font pair, parent mark/badge logic, and property accent architecture. | Brand systems owner + parent-company owner |

## 12. First implementation package

Once the approval agenda is resolved, the first executable package should be created in this order:

1. Publish `beacon-brand-tokens.json`, CSS variables, typography styles, focus/motion primitives, and property-theme adapters.
2. Build the parent bar, shared header, universal footer, and cross-property handoff component with accessible variants.
3. Establish the offer ledger, claims ledger, and route registry as release gates.
4. Rebuild the public landing page around the three clear doors and explicit destination disclosures.
5. Normalize Beacon Community’s membership/training shell after the canonical membership decision.
6. Apply Trading’s simulation-status, disclosure, and learning-component patterns after its legal/routing corrections.
7. Apply Labs’ B2B capability, pricing, form, and policy patterns after the diagnostic ladder is approved.
8. Complete the app inventory before changing its public role, authentication claims, or migration behavior.

## References

1. [Beacon Momentum public landing page](https://beaconmomentum.com/)
2. [Beacon Community member portal](https://beaconcommunity.net/)
3. [Beacon Trading public homepage](https://beacontrading.ai/)
4. [Beacon Labs homepage](https://beaconlabs.ai/)
5. [Related Beacon Momentum app surface](https://app.beaconmomentum.com/)
6. [Unified Beacon Ecosystem Coherence Audit](./BEACON_ECOSYSTEM_COHERENCE_AUDIT_2026-07-25.md)

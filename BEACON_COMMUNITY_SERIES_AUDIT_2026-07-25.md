# Beacon Community Series — External Review Record

**Reviewed:** July 25, 2026
**Source:** `https://beaconcommunity.net/`

## Public positioning observed

The public homepage describes Beacon Community as a “quiet harbor for overwhelmed minds,” offering tools and lessons for adults navigating burnout, overwhelm, and executive fatigue, plus people who support them. Its stated tone is anti-hustle, nonjudgmental, and focused on steady systems and small next actions.

The homepage exposes three public pathways:

| Pathway | Public description | Observed scope |
|---|---|---|
| **Storm Navigation** | “Lessons for your Navigator’s Log” | Public page claims 16 short lessons on money, executive function, and steady systems. |
| **Lighthouse Keepers** | Resources for people who support the learner | Four supporter guides covering ADHD, neurodivergent relationships, executive dysfunction, and family orientation. |
| **Safe Harbor** | A conversational coach trained on the material | States it is not therapy, crisis support, financial advice, or account access; says nothing is stored on a server. |

The homepage also presents three high-level pathways: **Reclaim Your Life**, **Build Your Business**, and **Master Modern Finance**. It calls learners “Navigators” and supporters “Lighthouse Keepers.”

## Navigator’s Log lesson inventory

The `/lessons` page currently presents a mix of self-management and money guidance with the six legacy Execution Engine modules:

| Sequence | Lesson or module title | Main promise or subject observed |
|---|---|---|
| Prep | Storm Prep | Name pressure, choose smallest responsible action, record what cannot be forgotten, make it visible and repeatable. |
| 01 | Charting Your Waters: A Friction-free Money Map | Low-pressure view of the money landscape without spreadsheets or shame. |
| 02 | Module 01: The Execution Gap | Planning-to-action friction for solopreneurs. |
| 03 | Automate the Tide: Letting Systems Carry the Load | Bill, savings, and future-planning automation. |
| 04 | Module 02: The Identity Shift | Self-image and execution framing. |
| 05 | The Dopamine Spend: Working With Your Brain, Not Against It | Impulse-spending support through friction, alternatives, and pre-decided rules. |
| 06 | Module 03: The 5-Day Discipline Protocol | Five-day execution-habit sequence. |
| 07 | Building the Storm Fund: Emergency Savings Without Perfectionism | Micro-stage emergency-savings method. |
| 08 | Module 04: The Vibe Coding Method | AI-assisted prototyping for non-technical solopreneurs. |
| 09 | Debt Without Shame: Mapping Your Way Out | Debt-repayment framing and money avoidance. |
| 10 | Module 05: Your First 48-Hour Build | Product-to-launch walkthrough. |
| 11 | The Weather Report: Building a Money Check-In Rhythm | Ten-minute weekly money check-in. |
| 12 | Module 06: Scaling the Engine | Systems, tools, delegation, and scaling output. |
| 13 | Income Currents: Stabilizing Variable and Unpredictable Pay | Variable-income stability. |
| 14 | When You Can’t Open the Mail | Money-avoidance and financial-admin support. |
| 15 | Your People, Your Money | Financial boundaries, body doubles, and supporter roles. |
| 16 | The Long Tide | Long-term planning in small, realistic increments. |

The rendered lesson portal presents progress tracking (`0 / 16`) and an “Open lesson” action for each entry. Its visible navigation includes **Storm Navigation**, **Lighthouse Keepers**, **Safe Harbor**, **Bearings**, **The Dock**, **Execution Engine**, and **Sign in**. The explicit **Execution Engine** navigation item confirms that this public series still embeds the retired standalone course as a parallel pathway rather than treating it as a member-only Beacon Venture asset.

## Supporter-series inventory

The `/supporters` page presents four public guides:

1. **Understanding ADHD in Adults: A Lighthouse Keeper’s Guide**
2. **Supporting Your Neurodivergent Partner: Building a Two-Brain Relationship**
3. **Executive Dysfunction Explained: Why “Just Do It” Doesn’t Work**
4. **Neurodivergence 101 for Family Members**

## Safe Harbor boundaries observed

The `/coach` page describes Safe Harbor as an “ND-aware thinking partner” trained on the platform’s lessons. It expressly says it is **not** a therapist, crisis line, financial advisor, or replacement for professional help, and cannot access financial accounts. It also represents that conversations are not stored on a server.

## Representative lesson-level observations

| Lesson | Reusable method observed | Material risk or required revision |
|---|---|---|
| **The Gap Between Knowing and Doing** | Micro-wins, implementation intentions, work cues, and a 24-hour execution sprint. | Remove unsupported neurological-causation language and universal promises that techniques “rewire” the brain. Recast as optional operating experiments for founders. |
| **The Vibe Coding Method** | One-sentence problem framing, core user action, success criteria, bounded iteration, and early user feedback. | It directs readers to external AI vendors and deployment hosts and promises a prototype in hours. Convert to the self-contained Venture Execution Sprint process, require validation and safety checks, and do not name unaffiliated vendors as a dependency. |
| **Charting Your Waters** | A five-minute financial visibility sweep, simple in/out/outflow framing, automation, and an explicit definition of done. | The empathy and low-friction design are valuable, but the current mental-health/ND-specific framing and money guidance require compliance and audience repositioning before use in Beacon Momentum. |
| **The Long Tide** | Named future goals, automatic saving, small contribution habit, and a stability-first sequence. | It provides specific retirement-account and investment guidance, recommends named financial firms and funds, and makes comparative investment claims. It must not be imported into the current Beacon Momentum release without legal/compliance review and educational—not advisory—rewriting. |

## Additional structural observations

The `/bearings` and `/community` pathways currently resolve to a sign-in surface, and `/enroll` exposes navigation only rather than a confirmed purchase route. The lesson portal’s HTML links to several external ecosystem properties, including `beaconlabs.ai`, `beaconmomentum.com`, `beacontrading.ai`, `digitalgrandpa.org`, and `hollowthreads.store`. Any reuse must preserve only relevant content and eliminate cross-property handoffs that conflict with the current Beacon Momentum route and offer architecture.

### Member-feature verification status — July 25, 2026 follow-up

The initial review did **not** establish that the historical member features no longer exist. It established only that the unauthenticated `/community` route redirects to `login?callbackUrl=/community`, and the visible “The Dock” navigation resolves to that protected route when no active member session is present. The login shell still displays an **Open Harbor Guide** control. Direct interaction confirms that the guide opens with member-oriented prompts, accepts a selected prompt, transitions to a free-text chat interface, and displays a live “Thinking…” state. The guide then returned a complete, context-appropriate response to a supporter-oriented prompt. **The chatbot is therefore still operational from the public login surface.**

The live page metadata still describes the property as a Beacon Momentum member portal where people can “access courses, connect with the community, and tools,” and references `https://app.beaconmomentum.com` as its application URL. This is evidence that community functionality remains part of the portal’s declared purpose, but it is not proof that an active forum or peer-message database currently contains usable member activity. The protected `/community` route remains the key unresolved surface.

The public sitemap still declares a `/dock` route with daily change frequency, but a direct live request to `https://beaconcommunity.net/dock` returns the site’s branded **404** page. This is a material integrity problem: at least one historically community-oriented route is still advertised in metadata while no longer serving an application page. The visible “The Dock” navigation does not resolve to that sitemap route; unauthenticated navigation points instead at the protected `/community` route. The evidence supports treating the historical forum/peer-space status as **unverified and currently inaccessible**, rather than assuming it remains live.

### Newly identified active portal: `app.beaconmomentum.com`

The `beaconcommunity.net` metadata points to `https://app.beaconmomentum.com`, and that subdomain is publicly live as **“Beacon Momentum — Member Portal.”** It presents itself as the membership experience rather than a generic marketing redirect. Its public landing page advertises community forum access, daily check-ins and a mood journal, 24/7 AI chat support, peer matching, private accountability groups, progress tracking, courses, certificates, and member-only community spaces. These are **declared features on a live landing page**, not yet verified authenticated capabilities.

This discovery materially changes the fit assessment: the historical membership platform may not have disappeared; it appears to have been separated into the `app.beaconmomentum.com` portal while `beaconcommunity.net` remains a related but structurally inconsistent legacy surface. The app’s current public offer and vocabulary are also inconsistent with the approved Beacon Momentum release: it advertises legacy Member/Mentor/Lifetime pricing, course language, and subject areas that do not align with the current single annual Watch membership. That portal must be treated as a distinct legacy application requiring a controlled product, content, privacy, identity, and migration audit—not as proof that its advertised private features are active today.

An unauthenticated sign-in control check on the app did not navigate to a visible login route or establish a member session. A transient daily-check-in interface surfaced during that interaction, then the public landing page remained in place; no check-in data was entered and no authentication claim can be made from it. The app’s declared feature list remains meaningful product evidence, but authenticated forum, peer matching, private-group, progress-tracking, and course states still require authorized inspection.

Static bundle review verifies that the application contains lazy-loaded member routes for `/community`, `/ai-chat`, `/dashboard`, `/check-in-history`, `/mentorship`, `/challenges`, `/courses`, and administrative moderation/user-management areas. The Community module includes rendered post, reply, like-count, reply-count, and post-reply interfaces; the AI Chat module includes conversation history, message retrieval, message sending, and feedback controls. A direct request to `https://app.beaconmomentum.com/community` redirects to the protected `/manual-login` route. This establishes that the community and chatbot features are implemented in the live application build and properly gated, while their live data, member activity, and end-to-end member behavior remain unverified pending authorized access.

The architecture recommendation must be read with that boundary in mind: the Community portal should not be assumed retired or empty merely because its private functions were unavailable to the current session. A definitive operational assessment requires authorized member or administrator access, followed by an inside-the-portal feature inventory.

### Corrected operational conclusion

**Yes—the historical membership experience still exists, but it is split across legacy surfaces.** `beaconcommunity.net` retains public lessons, a working Harbor Guide chatbot, and a protected community gateway. `app.beaconmomentum.com` is a live, separate member application that contains implemented, authentication-gated community and AI-chat modules.[1] [9] [10]

| Member capability | Current evidence | Verified status |
|---|---|---|
| **Harbor Guide chatbot** | The public Beacon Community login surface accepts a guided prompt and returns a complete response. | **Operational publicly** |
| **Forum / discussion system** | The live application bundle includes posts, replies, like counts, reply counts, and post-reply controls; direct access to `/community` redirects to member login. | **Implemented and gated; live data unverified** |
| **AI chat** | The live application bundle includes conversation history, message retrieval, message sending, and feedback controls. | **Implemented and gated; member records unverified** |
| **Dashboard, courses, check-ins, mentorship, challenges, moderation** | These member and administrative routes are part of the live application build. | **Implemented and gated; end-to-end behavior unverified** |
| **The Dock on `beaconcommunity.net`** | Listed in the sitemap, but direct route returns a branded 404. | **Broken legacy route** |

The correct immediate posture is **preserve and audit, not rebuild or silently retire**. The remaining question is not whether the membership platform exists; it is whether its authenticated data, member activity, payment state, privacy controls, and legacy claims are healthy enough to rehabilitate, require a controlled migration, or should be archived after preservation.[9] [10]

## Fit map for the current Beacon Momentum architecture

### Architectural decision

**Do not recreate or merge the legacy membership application into the current public Beacon Momentum release by default.** The current Beacon Momentum release has one annual Watch membership, and progression is earned inside the work rather than purchased through separate tiers. The already-integrated Venture Execution Sprint follows that rule: it sits within Beacon Venture and The Watch, carries no separate checkout, and has no external course-platform dependency. However, the live `app.beaconmomentum.com` membership application must now be treated as an existing legacy system to preserve and audit—not a vanished portal to replace casually.

The appropriate unit of integration is therefore a **rewritten, self-contained Watch resource**, assigned to an existing pillar and released only after its specific risk review. It is not a sixth pillar called “Beacon Community,” nor a revival of Storm Navigation, Safe Harbor, or the legacy Execution Engine funnel.

| Beacon Community component | Current disposition | Correct Beacon home | Conditions before any release |
|---|---|---|---|
| **Execution Engine — six modules** | **Complete. Do not duplicate.** The useful operating material is already embedded as the Venture Execution Sprint. | **Beacon Venture** inside **The Watch** | Maintain the current self-contained framing; do not restore a separate course link, price, urgency mechanism, or checkout. |
| **Problem clarity, smallest next action, micro-wins, visible cues, bounded check-ins** | **Compatible method library.** These are useful implementation patterns, not a separate curriculum. | **Beacon Life** for capacity/stabilization tools and **Beacon Venture** for founder execution tools | Rewrite in audience-neutral, non-clinical language; present as experiments and operating practices, not neurological treatment or guaranteed outcomes. |
| **Automation, low-friction setup, recurring operating cadence, ownership checklists** | **Compatible systems pattern.** It complements the existing “Operate” stage rather than creating a new product. | **Beacon Systems** and the **Systematize** stage of Beacon Venture | Keep the material tool-agnostic, self-contained, and documented. Do not depend on the Community portal or unaffiliated vendor instructions. |
| **Money visibility, administrative routines, variable-income planning, financial boundaries** | **Potentially reusable only after a content rewrite and review.** The behavioral-design techniques have value, while the existing financial instructions are too specific for direct import. | Primarily **Beacon Life** “Income Resilience”; selected founder cash-flow habits may later support **Beacon Venture** | Use education-first language; remove financial-product recommendations, investment claims, account-selection directions, and personal-finance prescriptions. Obtain legal/compliance approval before public release. |
| **Debt repayment, retirement accounts, brokers, funds, allocation claims, employer-match instructions** | **Hold. Not approved for current import.** | None at present | Requires separate legal/compliance review, appropriate disclosures, and a deliberate educational-product scope. It does not belong inside the current Beacon Trading simulation by default. |
| **Lighthouse Keepers supporter guides** | **Do not integrate in this release.** | None at present | This is a different audience, with health/neurodivergence-specific subject matter and relationship guidance. Any future adaptation requires a distinct Beacon Life program brief and qualified review. |
| **Safe Harbor conversational coach** | **Do not integrate in this release.** | None at present | A future assistant would need a separate product definition, safety policy, privacy model, consent/retention design, escalation boundaries, and evaluation process. Its existing “not therapy/not financial advice” language alone is not a sufficient integration plan. |
| **Beacon Community portal, navigation, accounts, and cross-property links** | **Preserve as a separate legacy application while it is audited; do not merge or cross-link by default.** | `app.beaconmomentum.com` for the legacy member application; no automatic current-site home | An eventual migration or rehabilitation needs deliberate identity, consent, content-ownership, data-retention, analytics, routing, payment-state, and support planning. It must not be coupled to The Watch merely because some lessons overlap. |

### Recommended integration shape

The strongest near-term outcome is a **small “Operating With Less Friction” resource set inside The Watch**, not a relaunch of the Navigator’s Log. It can use the series’ best non-clinical ideas—visible commitments, low-effort setup, check-in rhythms, clear completion criteria, and system-supported follow-through—without preserving the original audience claims or financial-advisory instructions.

This resource set should be distributed by use case, not as a ten-lesson transfer. **Beacon Life** can house a compact stabilization-oriented card set focused on a weekly situation scan, choosing one responsible next action, and making essential information visible. **Beacon Venture** can add an execution card set aligned to Validate → Launch → Grow → Systematize, where the existing Venture Execution Sprint already owns the larger build-and-delivery sequence. **Beacon Systems** can add operational cadence templates such as a 15-minute weekly systems review, an ownership-and-next-step register, and an automation readiness checklist.

The financial material should be deliberately split rather than copied. General operating methods such as a low-friction review rhythm, named short-term goals, and simple administrative checklists may be candidates for a later **Beacon Life: Income Resilience** rewrite. The content must not tell members which accounts, brokers, funds, allocations, debt programs, or contribution levels to choose. The account-specific investment material in *The Long Tide* should remain held until a qualified review determines whether an educational treatment is appropriate.[5]

### Explicit exclusions for this release

The following elements should remain out of the current Beacon Momentum release: ND/ADHD/mental-health diagnosis or treatment framing; neurological explanations presented as settled causal guidance; therapeutic or crisis-support posture; individualized financial, investment, debt, retirement, or broker guidance; named vendor/platform prescriptions; external checkout, timer, urgency, or standalone-course mechanics; and automatic cross-links to unrelated ecosystem properties.

> **Implementation rule:** preserve the instructional mechanism, not the old product shell. A member should experience a focused Watch resource that stands on its own—not an embedded fragment of Beacon Community or a route back to the retired Execution Engine.

### Recommended sequence

| Priority | Action | Why it comes in this order |
|---|---|---|
| **1 — already complete** | Keep the six Execution Engine modules consolidated as the Venture Execution Sprint within The Watch. | Prevents duplicate curriculum and protects the retired-funnel decision. |
| **2 — next reusable work** | Create a short content brief for 3–5 “Operating With Less Friction” Watch resources, each with a named pillar owner, learner outcome, safety boundary, and source lessons. | Converts the reusable mechanics into the current architecture without importing sensitive framing. |
| **3 — review gate** | Run legal/compliance and editorial review on any money-related rewrite before drafting or publishing it. | The existing series contains specific financial product and investment guidance, including named brokers and account recommendations.[5] |
| **4 — immediate governance** | Use authorized administrator access to inventory active members, roles, forum activity, chat records, courses, check-ins, payment state, integrations, backups, privacy/retention settings, and the apparent `/dock` routing defect. | Determines whether there is member data and live operational value that must be preserved before any product decision. |
| **5 — separate product decision** | Decide whether the legacy application is rehabilitated and aligned, migrated through a consentful plan, or archived after data preservation. | A portal/account decision is a product, privacy, payment, and data-migration decision—not a content-copy task. |
| **6 — only with approved scope** | Build a new member-resource delivery experience on the current Beacon Momentum stack only if the authorized audit supports replacement rather than rehabilitation. | Maintains one canonical source of truth, the single Watch membership, and the self-contained asset rule without destroying existing member value. |

## Sources

1. [Beacon Community homepage](https://beaconcommunity.net/)
2. [The Navigator’s Log](https://beaconcommunity.net/lessons)
3. [Lighthouse Keepers](https://beaconcommunity.net/supporters)
4. [Safe Harbor](https://beaconcommunity.net/coach)
5. [The Long Tide](https://beaconcommunity.net/lessons/the-long-tide)
6. [Charting Your Waters](https://beaconcommunity.net/lessons/charting-your-waters)
7. [The Gap Between Knowing and Doing](https://beaconcommunity.net/lessons/the-execution-gap)
8. [The Vibe Coding Method](https://beaconcommunity.net/lessons/the-vibe-coding-method)
9. [Beacon Momentum Member Portal](https://app.beaconmomentum.com/)
10. [Beacon Momentum Community Route](https://app.beaconmomentum.com/community)
11. [Beacon Momentum Member Login](https://app.beaconmomentum.com/manual-login)
12. [Beacon Community Dock Route](https://beaconcommunity.net/dock)

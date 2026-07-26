# Beacon Relaunch: Source Repository Inventory

**Purpose:** Record the GitHub repositories currently available for the cross-property relaunch program. Repository descriptions are evidence of candidate source roles, not proof of the currently deployed domain, account owner, data controller, payment processor, or operational readiness.

| Public or planned surface | Verified repository candidate | Repository description or inspected role | Source-ownership conclusion |
|---|---|---|---|
| **Beacon Momentum public front door** | `beaconmomentum-dev/beacon-momentum-website` and `Beacon-Ecosystem/beacon-momentum-website` | Public repository descriptions identify an official Beacon Momentum website. The canonical worktree used for current governance records tracks `beaconmomentum-dev/beacon-momentum-website`. | **Candidate canonical public source;** reconcile the two organization copies before assuming one is the deployed source of truth. |
| **Beacon Community** | `beaconmomentum-dev/beacon-community` | Repository description: Next.js 14 community platform with dual-track ND and Execution Engine content, Stripe, Prisma, and PostgreSQL. | **Candidate membership/community source;** does not by itself prove that `beaconcommunity.net` is this deployment or that it owns the public `$497/year` Watch flow. |
| **Beacon Trading** | `beaconmomentum-dev/beacon-trading-bots` | Repository description: Beacon Simulation Academy — educational trading simulation platform. | **Strong candidate source** for `beacontrading.ai`; verify deployment, offer/pricing source, policy routes, and support/data flows. |
| **Beacon Labs** | `Beacon-Ecosystem/beaconlabs-ai` | Canonical source reviewed for Signal Check intake and B2B surface controls. | **Strong candidate source** for `beaconlabs.ai`; live public content still requires reconciliation to the controlled source and parent offer ledger. |
| **Related mobile/app surface** | `beaconmomentum-dev/beacon-mobile` | Private repository with no accessible role description in the inventory. | **Unverified candidate** for `app.beaconmomentum.com`; no public role, account, or data-flow inference is permitted. |
| **Customer-data hub** | `beaconmomentum-dev/beacon-customer-hub` | Private source inspected as a central data hub handling purchase/lead/list data. | **Separate technical/data-risk candidate, not an approved public membership source.** Keep isolated until authorized inventory and remediation decision. |
| **Hollow Threads** | `beaconmomentum-dev/hollow-threads-store` | Repository description: Hollow Threads apparel storefront — `hollowthreads.store`. | **Strong candidate source** for the independent-commerce property; verify operator, payment, fulfillment, policy, and support settings. |
| **Digital Grandpa** | `beaconmomentum-dev/digitalgrandpa-org` | Public repository description is empty; the live domain was separately inspected. | **Strong candidate source** for `digitalgrandpa.org`; high-sensitivity content and claim evidence require review before relaunch alignment. |
| **Rise & Reclaim** | `beaconmomentum-dev/joinriseandreclaim-com` | Public repository description is empty; live Digital Grandpa routes refer to Rise & Reclaim. | **Candidate separate mission/community source;** do not assume its identity, account, payment, or data role. |
| **Shared/public support products** | `beaconmomentum-dev/beacon-guides-store`, `beaconmomentum-dev/phoenix-command-center`, `beaconmomentum-dev/beacon-odysseus`, and other private technical repositories | Inventory identified additional private sources but did not establish a public relaunch role. | **Out of current public-surface scope** unless an owner records a role, audience, data boundary, and release criteria. |

## Source-control implications

1. The relaunch cannot begin as a visual refresh because several public domains have live content that conflicts with the canonical offer, claims, and link ledger.
2. Each candidate source must be confirmed against its production deployment and named operational owner before code changes, account changes, data access, or publishing.
3. Repositories that process customer data, payments, community data, health-adjacent material, financial education, or B2B client information require the relevant authorized owner and policy/security review before any integration or cross-property handoff.

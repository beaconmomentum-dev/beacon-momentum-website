# Beacon Brand Foundation — Decision Record

**Decision status:** Owner-approved  
**Decision date:** July 25, 2026  
**Decision owner:** Bob, Beacon Momentum LLC  
**Applies to:** Beacon Momentum, Beacon Community, Beacon Trading, Beacon Labs, and the related app surface

> **Decision:** Beacon adopts a shared semantic brand foundation with differentiated property expressions. The approved type system is Fraunces, Manrope, and IBM Plex Mono. The approved identity system is the Beacon Roundel operating pair with its compact glyph reserved for favicon and app-icon use.

## 1. Approved foundation

| System layer | Owner-approved standard | Implementation constraint |
|---|---|---|
| **Semantic color system** | Shared deep-navy, paper, mist, line, accessible signal-gold, surface, status, focus, and motion token families. | Implement semantic roles rather than scattered literal colors; validate contrast before production use. |
| **Typography** | Fraunces for editorial display; Manrope for body and interface; IBM Plex Mono for data, technical labels, and Trading/Labs metadata. | Confirm licensing, browser support, loading performance, and appropriate fallback stacks at implementation. |
| **Parent mark** | Light Roundel on light surfaces; Inverse Roundel on dark/navy surfaces. | Maintain approved clear space and never substitute an unapproved property mark for the parent mark. |
| **Compact identity** | Compact Roundel glyph for favicon and app-icon use only. | Do not treat the compact glyph as a default header/logo replacement. |
| **Property distinction** | Momentum: signal gold + restrained harbor teal; Community: sea-glass/harbor green; Trading: analytic cyan/tide blue; Labs: copper/engineering amber; related app: restrained parent navy with functional status colors. | Use accents for pathway confirmation and hierarchy, never as the sole carrier of meaning or status. |
| **Accessibility and motion** | Visible focus, semantic contrast, no color-only meaning, brief transform/opacity motion, and reduced-motion support. | Must be tested on representative desktop and mobile views before any public release. |

## 2. Scope and release boundary

This decision authorizes **visual foundation and token preparation**. It does not authorize cross-property changes to membership enrollment, payments, offers, public pricing, data flows, account sharing, legal/policy claims, or external-property CTAs. Each such change remains governed by the applicable ownership, access, policy, commercial-truth, and route-verification gates.

## 3. Immediate authorized work

| Workstream | Permitted now | Not permitted now |
|---|---|---|
| **Beacon Momentum public-site shell** | Prepare semantic CSS tokens, approved font loading/fallbacks, Roundel light/dark mapping, compact favicon mapping, accessible focus and motion foundations, and route-aware accent primitives. | Publish a new cross-property route, change any price/offer, or imply external membership, account, or data behavior. |
| **Cross-property implementation program** | Build repository/owner/acceptance-criteria documentation and adoption backlogs. | Push visual changes to a property whose source, owner, or policy gate is not authorized. |
| **Merchandise visual direction** | Convert the approved palette direction into supplier-ready specifications only after production validation is scheduled. | Release product artwork, inventory, storefront claims, shipping, returns, tax, or allocation language without the separate commerce review. |

## 4. Evidence and governance references

| Source | Role |
|---|---|
| `BEACON_BRAND_SYSTEM_IMPLEMENTATION_PLAN_2026-07-25.md` | Canonical shared-foundation and differentiated-property implementation standard. |
| `BEACON_PARENT_BADGE_ASSET_HANDOFF_2026-07-25.md` | Approved Roundel asset locations and usage rules. |
| `BEACON_PRE_IMPLEMENTATION_CLOSURE_REGISTER_2026-07-25.md` | Live gate status, unresolved dependencies, and release boundaries. |

## References

[1] [Beacon Brand System Implementation Plan, July 25, 2026](./BEACON_BRAND_SYSTEM_IMPLEMENTATION_PLAN_2026-07-25.md)  
[2] [Beacon Parent Badge Asset Handoff, July 25, 2026](./BEACON_PARENT_BADGE_ASSET_HANDOFF_2026-07-25.md)  
[3] [Beacon Momentum Pre-Implementation Closure Register, July 25, 2026](./BEACON_PRE_IMPLEMENTATION_CLOSURE_REGISTER_2026-07-25.md)

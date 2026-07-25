# Beacon Parent-Badge Asset Handoff Manifest

**Status:** Approved parent-badge assets  
**Prepared:** July 25, 2026  
**Decision source:** Owner approval of the Beacon Roundel light/dark pair and compact glyph

## Approved operating system

The Beacon parent mark is a compact, wordless lighthouse-and-beam system. It uses **deep maritime navy** as the structural color, **signal gold** for illumination and direction, and a restrained **harbor-teal** waterline accent. It is intentionally separate from wordmarks and taglines so it can remain legible at interface-icon scale.

> **Implementation rule:** Use only the asset whose context matches the actual rendered background. Do not place the Light Roundel on a dark navy field, do not place the Inverse Roundel on a light paper field, and do not reintroduce green edge effects, curved text, or illustration-level detail.

| Asset | Canonical path | Approved use | Do not use for |
|---|---|---|---|
| **Light Roundel** | `/manus-storage/beacon-roundel-light_3bdd192b.png` | Light paper/mist surfaces, documents, light footers, and light social-avatar contexts. | Dark headers, dark navigation, or use below a legible minimum size. |
| **Inverse Roundel** | `/manus-storage/beacon-roundel-dark_b1894af8.png` | Dark navy headers, dark-mode navigation, dark app surfaces, and dark social-avatar contexts. | Light paper/mist surfaces or white cards. |
| **Compact glyph** | `/manus-storage/beacon-roundel-favicon-512_3ad802bf.png` | Favicon source, app icon, browser/tab identity, compact utility markers. | Long-form editorial use, certificates, primary header brand lockups, or body-copy decoration. |

## Required implementation rules

| Context | Required asset and treatment | Minimum rule |
|---|---|---|
| Light public-site header | Light Roundel beside separately rendered Beacon Momentum wordmark. | Keep the signet at least 28 px high on desktop and 24 px high on mobile. |
| Dark public-site header or footer | Inverse Roundel beside separately rendered wordmark. | Maintain a clear zone equal to at least one quarter of the mark’s height. |
| Browser and mobile app icon | Compact glyph. | Use the 512 px PNG as the master and generate platform-specific raster sizes from it; do not crop the full Roundel. |
| Certificate or legacy/editorial seal | Architectural Signet may be used as a controlled secondary expression. | It must not replace the primary Roundel in navigation or product ownership cues. |
| Product/app navigation | Compact glyph may identify the parent. The Bearing Mark may be evaluated later for a sub-product/device role. | Do not use a property-specific accent to obscure the parent relationship. |

## Asset ownership and release gate

The source artifacts are maintained in `/home/ubuntu/webdev-static-assets/` for managed web-project use. The paths in the asset table are the implementation references; they must be used exactly as shown by any public-project code. Future replacements require parent-brand owner approval, a visible light/dark review, transparent-alpha validation, and an update to this manifest.

## Related records

1. [Beacon Parent Badge Refinement Brief](./BEACON_PARENT_BADGE_REFINEMENT_BRIEF_2026-07-25.md)
2. [Beacon Brand System Implementation Plan](./BEACON_BRAND_SYSTEM_IMPLEMENTATION_PLAN_2026-07-25.md)
3. [Pre-Implementation Closure Register](./BEACON_PRE_IMPLEMENTATION_CLOSURE_REGISTER_2026-07-25.md)

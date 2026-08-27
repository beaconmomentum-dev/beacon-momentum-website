# Work That Fits Local QA — 2026-08-27

## Scope

This record covers the locally built `/work-that-fits` route and its owned PDF asset before GitHub versioning or production deployment. The preview ran in an isolated sandbox browser against the local Vite server. No production page, CRM contact, email sequence, social post, advertising campaign, or advertising spend was altered.

## Automated Results

| Check | Desktop (1440px) | Mobile (390px) | Result |
|---|---:|---:|---|
| Document title | `Work That Fits — Beacon Momentum` | Same | Pass |
| Primary page heading | Present | Present | Pass |
| Consent form | Present | Present | Pass |
| Privacy links | 2 | 2 | Pass |
| Terms links | 2 | 2 | Pass |
| Card PDF HEAD request | HTTP success, `application/pdf` | HTTP success, `application/pdf` | Pass |
| Refund-policy link | Present and resolves to active policy route | Present and resolves to active policy route | Pass |
| Primary card CTA | Reaches `#request-card` | Reaches `#request-card` | Pass |
| Mobile menu control | Not applicable | One visible menu control | Pass |

TypeScript checking completed without error. The existing automated test suite passed with 15 test files passed, one skipped; 39 tests passed and seven skipped. A subsequent targeted verification passed the capture-relay and sitemap tests. The secure capture-relay suite includes the new `work_that_fits_card_request` event test. A fresh Vite production client build passed; the repository’s wrapped full production build remains locally unavailable because its protected deployment environment variables are intentionally absent from this sandbox.

The critical internal policy routes `/privacy`, `/terms`, and `/refund` each rendered an active titled page in the local preview rather than the Not Found route. The shared footer now exposes all three policy paths.

## Visual Review

The desktop rendering shows a readable asymmetric hero with an original styled card summary, clear primary and secondary CTAs, coherent editorial section structure, a visible card-request form, and the shared Beacon footer. No clipping, overlapping elements, or broken layout were observed in the captured desktop image.

The mobile rendering collapses the hero, method, boundary, condition, request, and footer sections into a single readable column. The form fields, consent checkbox, submit button, card delivery section, navigation control, privacy, terms, refund, and shared footer remain visible and usable. No horizontal overflow, clipping, or overlap was observed in the 390px capture.

The four campaign assets were optimized as JPEG release files after generation and verified at 1080×1350, 1080×1080, 1080×1920, and 1200×675 pixels for 4:5, 1:1, 9:16, and 16:9 placements respectively.

## Remaining Non-Visual Gates

The page has not been deployed. The live consent-and-delivery test cannot be claimed until the page is released and a controlled request is submitted to the server relay. The associated GoHighLevel email workflow was not visible in the read-only workflow area; it remains unverified and must be confirmed before advertising directs people to the form. The existing client-side `client/src/lib/ghl.ts` has not been used by this page; the new route instead calls the server-owned capture relay.

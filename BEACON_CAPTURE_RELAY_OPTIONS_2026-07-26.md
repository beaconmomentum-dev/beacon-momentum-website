# Beacon Public Capture Relay: Architecture Options

**Status:** Decision paper for founder review. The code candidate in `server/routers/capture.ts` demonstrates Option A only; it has not been connected to public forms, deployed, or configured with a production CRM credential.

## Non-negotiable outcome

All public form submissions must reach a **server-controlled boundary** before HighLevel. The browser must not know the HighLevel bearer credential, location identifiers, custom-field identifiers, or unrestricted tag values. The implementation should retain the visible promise of each form, report a genuine failure when delivery fails, and preserve a compact non-PII diagnostic receipt.

| Required property | Meaning in practice |
|---|---|
| Browser secrecy | No `VITE_GHL_API_KEY`, direct HighLevel bearer request, or client-owned CRM configuration remains in a public bundle. |
| Event allow-list | A client asks for `starter_pack_request`; it cannot submit arbitrary tags, field IDs, locations, or workflows. |
| Same visible promise | A successful UI state means the required CRM handoff succeeded. A failure state must not masquerade as enrollment. |
| Bounded ownership | Beacon Momentum, Contact, and Digital Grandpa flows keep their approved data owners rather than silently merging separate locations. |
| Recoverability | A support-safe request ID and non-PII server log permit investigation without exposing response bodies or credentials. |

## Option A — Extend the existing Beacon Momentum application server

The active Express/tRPC server would expose `capture.submit` under its existing same-origin `/api/trpc` route. A server-only `GHL_API_KEY` would be injected into the existing production service environment; public forms would call the same domain they are already visiting.

| Dimension | Assessment |
|---|---|
| Delivery path | `beaconmomentum.com` → existing Nginx/API route → Express/tRPC relay → HighLevel. |
| Operational ownership | Beacon application deployment and existing production server process. |
| Security control | Strong. The current candidate implements server-owned event mapping, location/tag allow-lists, validation, origin checks, best-effort rate limiting, and safe errors. |
| Customer experience | Strong. Same-origin requests make retry, error, and request-ID behavior easy to keep consistent with existing React forms. |
| Availability profile | Coupled to the marketing application server. If that service is unavailable, capture is unavailable. |
| Current state | **Prepared but not released.** `server/routers/capture.ts` and six isolated tests exist in canonical source; no form invokes it and no production secret has been installed. |
| Needed before release | Founder approval; production environment secret; integration confirmation for approved source tags; client migration; controlled tests; deploy/rollback plan. |

## Option B — Use a dedicated Cloudflare Worker relay

Cloudflare would route a same-origin path such as `/api/capture` or a dedicated capture subdomain to a Worker. The Worker would hold the HighLevel credential as a Worker secret and call HighLevel on behalf of public forms.

| Dimension | Assessment |
|---|---|
| Delivery path | `beaconmomentum.com` → Cloudflare Worker → HighLevel, without a dependency on the marketing application process. |
| Operational ownership | Cloudflare deployment, Worker secrets, observability, and a separate release lifecycle. |
| Security control | Strong when Worker secrets, allow-listed events, and origin/rate-limit controls are configured correctly. |
| Customer experience | Strong if retained at a same-origin path; slightly more integration work if placed on a separate subdomain. |
| Availability profile | Decoupled from the application server and naturally suitable for small, bursty public-form traffic. |
| Current state | **Not implemented.** Cloudflare is available as an infrastructure direction, but no Worker, secret, route, or deployment configuration has been created. |
| Needed before release | Founder approval; Worker deployment ownership; secret placement; routing decision; client contract; test and rollback plan. |

## Option C — Adopt HighLevel-native embedded forms for eligible simple captures

Replace selected static forms with HighLevel-native form embeds and use HighLevel’s own form configuration for tags, source, confirmation behavior, and workflows. This could be appropriate for a simple newsletter or waitlist but is not a full substitute for custom enrollment flows.

| Dimension | Assessment |
|---|---|
| Delivery path | Public page → HighLevel-managed form submission. |
| Operational ownership | HighLevel form configuration and embedding controls. |
| Security control | Avoids embedding the bearer credential, but delegates event validation, throttling, and observability to HighLevel. |
| Customer experience | Variable. May constrain custom interactions, inline success states, and visual consistency. |
| Availability profile | Dependent on HighLevel’s embedded-form runtime. |
| Current state | **Not investigated or implemented.** |
| Needed before release | Form inventory by eligible flow; HighLevel form IDs; visual and accessibility review; privacy copy alignment; testing of success/failure behavior. |

## Flow suitability

| Public flow | Option A | Option B | Option C |
|---|---|---|---|
| Beacon Brief signup | Suitable | Suitable | Potentially suitable |
| Starter Pack fulfillment | Suitable | Suitable | Potentially suitable, if resource delivery can remain accurate |
| Pathfinder result | Suitable | Suitable | Poor fit because the server should own the computed path and custom-field mapping |
| Watch Brief Premium interest | Suitable | Suitable | Potentially suitable |
| Watch join + intake | Suitable for the initial handoff; intake still needs dual-write reconciliation | Suitable for the initial handoff; intake still needs dual-write reconciliation | Poor fit for the full flow |
| Contact inquiry | Blocked pending location/message-field owner confirmation | Blocked pending location/message-field owner confirmation | Blocked pending owner confirmation |
| Digital Grandpa Library waitlist | Blocked pending separate-owner confirmation | Blocked pending separate-owner confirmation | Possibly suitable after ownership confirmation |

## Prepared Option A contract

The non-deployed candidate supports only verified primary-location events:

| Event | Server-derived tags | Server-derived source |
|---|---|---|
| `newsletter_signup` | `BM_Newsletter`, `BM_Beacon_Brief` | `beaconmomentum.com/newsletter` |
| `starter_pack_request` | `BM_Starter_Pack`, `BM_YouTube_Optin` | `beaconmomentum.com/start` |
| `pathfinder_result` | `BM_Pathfinder`, computed allowed pillar tag | `beaconmomentum.com/assessment` |
| `watch_brief_premium_interest` | `BM_Watch_Brief_Premium_Interest` | `beaconmomentum.com/watch-brief-premium` |
| `watch_join` | `BM_Watch_Join`, `BM_Watch_Sentinel`, `BM_Community` | `beaconmomentum.com/the-watch` |

The candidate deliberately excludes Contact, Digital Grandpa Library, and Watch Intake. It does not set a public success state after a failed HighLevel response, and it rejects requests without an approved browser origin in production. Its isolated tests cover client tag override stripping, enum restriction, rejected CRM response handling, missing-credential fail-closed behavior, production-origin enforcement, and server-only authorization.

## Approval questions

Before a production migration, the founder should choose one relay option and confirm the following decisions:

1. Which runtime owns the relay: **existing application server**, **Cloudflare Worker**, or **HighLevel-native forms where appropriate**?
2. Who owns the Contact and Digital Grandpa HighLevel locations, and which exact response/workflow behavior is approved for each?
3. Should Watch intake answers live solely in the cohort database, in CRM fields, or in both systems with a defined retention and reconciliation rule?
4. Which visible consent language/version should accompany resource delivery, editorial subscription, inquiry response, and Watch enrollment review?
5. Who will confirm that the listed HighLevel tags actually trigger the intended delivery or nurture workflows before the first public form is migrated?

No option is being recommended or released in this document. The next engineering step should follow the selected operational owner and include a staged migration beginning with a single verified low-risk form.

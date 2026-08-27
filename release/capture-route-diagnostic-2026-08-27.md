# Beacon Public Capture Route — Read-Only Diagnostic Evidence

**Date:** 2026-08-27  
**Source:** GitHub Actions read-only workflow run `33040046562`

| Probe | Result | Interpretation |
|---|---:|---|
| Public `https://beaconmomentum.com/api/trpc/capture.submit?batch=1`, no payload | `404` | The public edge / Nginx route does not reach the capture procedure. No submission body was sent. |
| Local `http://127.0.0.1:3012/api/trpc/capture.submit?batch=1`, no payload | `405` | The deployed Beacon Node process recognizes the capture procedure. `405` is expected for this GET-style no-payload probe because the procedure is a mutation. |
| Beacon Node listener | `3012` online | The application process is available on the expected local listener. |
| PM2 process | `beacon-momentum-www` online, port `3012` | The server bundle is running; the gap is in public routing rather than process availability. |

The diagnostic confirmed that the public Nginx configuration contains Beacon-related `location /api/trpc` and `proxy_pass http://127.0.0.1:3012` directives, but the initial output did not retain enough surrounding virtual-host context to establish why the external request selects a 404 route. The next diagnostic must print a narrowly bounded, redacted context around the matching Beacon TLS server block before any Nginx change is proposed.

## Resolution

The active TLS routing problem was traced to **conflicting Nginx virtual-host definitions**. The initial source-controlled helper targeted an ignored duplicate server block. A later guarded deployment found that a broad domain selector could also choose unrelated Beacon subdomain configurations; both attempts halted without leaving a route change in place.

The final correction introduced exact `server_name` token matching, first-effective TLS server selection based on Nginx load order, a timestamped backup, `nginx -t`, graceful reload, and direct-origin payload-free mutation verification. Production workflow run `33040815652` for commit `db05500` completed successfully. The final public checks returned `405` for the payload-free mutation probe and `400` for an explicitly no-consent Readiness Kit submission, confirming that the live route reaches the expected mutation and rejects the request before any contact can be created.

No lead payload accepted by the relay, credentials, payment data, advertising action, or partner communication was transmitted during the diagnostic or verification sequence.

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

No lead payload, credentials, payment data, advertising action, or partner communication was transmitted during this diagnostic.

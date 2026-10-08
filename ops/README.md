# Beacon Operations Scripts

## Public-site monitor

`beacon-public-site-monitor.sh` is a deterministic, independent public health check for `beaconmomentum.com`. It is intended to run every five minutes from an existing Beacon host separate from the public web host.

The monitor validates the public homepage entry document, every current JavaScript and CSS asset referenced by that document, the canonical `/signal` route, a representative Signal article, and the legacy `/blog` redirect. It detects the static-asset mismatch that caused the 2026-08-09 white-screen incident.

The monitor sends an outage notice only after **two consecutive failures**, then sends one recovery notice when the checks return to normal. The alert connection must be a dedicated private incoming webhook bound only to `#beacon-site-alerts` and stored outside Git in a root-owned system credential file.

The supplied `systemd` service and timer definitions install the monitor as a root-owned one-shot service every five minutes. The timer uses a short random delay to avoid synchronized infrastructure requests, while the monitor state directory provides the consecutive-failure and recovery logic.

> Do not commit webhook URLs, access tokens, or other secrets to this repository.

## Readiness Map delivery route

The Readiness Map is a free public worksheet with a controlled PDF download and a
same-origin request broker. It must be installed with:

```bash
./ops/install-beacon-momentum-downloads-route.sh
```

The installer deploys the source-controlled Nginx prefix routes for both
`/downloads/` and `/api/readiness-map/`, validates Nginx, verifies a known PDF
route, and checks that the broker returns a normal validation error rather than
falling through to another application.

Before building or deploying, configure a server-only `GHL_API_KEY` in the
production runtime configuration (the existing legacy `VITE_GHL_API_KEY` bridge
is accepted temporarily). In the Beacon Momentum HighLevel location, create a
transactional workflow that sends the approved Readiness Map delivery email
only when the `BM_Readiness_Map_Delivery_Requested` tag is applied. A separate
updates workflow may listen only for `BM_Readiness_Map_Updates_Allowed`; it must
never be used to gate or delay the delivery email. Use a verified Beacon Momentum
sender. The browser never receives any credential.

Run `./ops/test-readiness-map-route-contract.sh` in CI/local validation. Do not
submit a live recipient address as a deployment smoke test. Use malformed input
only for the public broker-route check, then perform an owner-controlled delivery
test after deployment.

# Beacon Operations Scripts

## Public-site monitor

`beacon-public-site-monitor.sh` is a deterministic, independent public health check for `beaconmomentum.com`. It is intended to run every five minutes from an existing Beacon host separate from the public web host.

The monitor validates the public homepage entry document, every current JavaScript and CSS asset referenced by that document, the canonical `/signal` route, a representative Signal article, and the legacy `/blog` redirect. It detects the static-asset mismatch that caused the 2026-08-09 white-screen incident.

The monitor sends an outage notice only after **two consecutive failures**, then sends one recovery notice when the checks return to normal. The alert connection must be a dedicated private incoming webhook bound only to `#beacon-site-alerts` and stored outside Git in a root-readable environment file.

> Do not commit webhook URLs, access tokens, or other secrets to this repository.

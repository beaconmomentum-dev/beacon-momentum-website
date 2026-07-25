# Pricing Audit — July 2026

## Finding

The `$597/year` figure was **not** part of the current Watch offer. It came from a discontinued multi-tier membership idea documented in June 2026, later copied into a public FAQPage JSON-LD block during the July 15 AEO/SEO update.

| Location | Origin | Exposure before correction | Resolution |
|---|---|---|---|
| `BEACON_STRATEGIC_NOTES.md` | June 27, 2026 commit `a971b84` | Internal future Digistore24 concept | Marked as historical and superseded. |
| `client/index.html` FAQPage schema | July 15, 2026 commit `e559ea6` | Public, machine-readable homepage schema; present in the live HTML | Replaced with the current offer model. |
| `client/public/audio/watch-brief-ai-reasoning-faithfulness.mp3` | Binary content match only | Not treated as pricing copy without a separate audio-transcript review | No pricing claim changed in this audit. |

## Current Canonical Offer Model

- **The Signal:** public editorial intelligence.
- **The Beacon Brief:** free weekly email.
- **Watch Brief Premium:** `$27/month` paid operating dossier.
- **The Watch:** one annual membership at `$297/year`; Sentinel, Navigator, and Quartermaster are earned stages, not purchasable tiers. Watch Brief Premium is included as a member benefit.

## Correction and Release Evidence

Commit `3f9482d` removed the stale `$597/year` public schema claim and marked the historical marketplace concept as superseded. The local production build completed successfully. The GitHub push was confirmed on the DigitalOcean origin at `159.203.81.39`, where `/var/www/beacon-momentum-www` reported commit `3f9482d` and PM2 process `beacon-momentum-www` was online. Nginx responded with HTTP `301` for the local `Host: beaconmomentum.com` probe, consistent with its HTTPS redirect behavior.

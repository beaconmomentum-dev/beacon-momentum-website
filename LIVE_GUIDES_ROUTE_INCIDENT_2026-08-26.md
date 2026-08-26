# Live `/guides` route incident

**Observed:** 2026-08-26

After production deployment run `32931672481` completed successfully, the live `https://beaconmomentum.com/guides` route returned the expected title but rendered a blank white page in the browser. A second page view confirmed that the application did not recover after load. The release is therefore not considered validated and must be diagnosed and corrected before final handoff.

## Deployment cache finding

The production deployment built and synchronized `index-CCVgn22B-1787719796675.js` and `FieldGuidesPage-B-XYZbA2-1787719796675.js`, but the live `/guides` document initially referenced stale `index-B8tEK_jc.js`. The new assets return the HTTP status recorded by the verification command; the public cache must be refreshed before the route can be considered live.

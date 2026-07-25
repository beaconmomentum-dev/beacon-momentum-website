# Production Deployment Record — July 24, 2026

## GitHub Record

The approved Watch-price update was committed and pushed to `main` as:

```text
bcb4757 Reprice The Watch at $497 annually
```

The canonical repository is `Beacon-Ecosystem/beacon-momentum-website`.

## Production Origin Confirmation

The verified Vite build was synchronized to the documented Beacon origin at `159.203.81.39`, and PM2 process `beacon-momentum-www` was restarted successfully and reported `online`.

The deployed production `index.html` references the new hashed JavaScript bundle `assets/index-CvD3eqcF-1784948427746.js` and contains the structured-data offer price `"497"` in USD.

## Public Endpoint Check

The public URL `https://beaconmomentum.com/the-watch?release=2a0c10d` was fetched directly after deployment. It serves both the `"price": "497"` structured-data value and the new hashed JavaScript bundle `assets/index-CvD3eqcF-1784948427746.js`.

The connected-browser renderer returned the expected page title but did not expose client-rendered body text or a screenshot in this session. The direct public response, production-origin file, local build, and local visual preview together confirm the release.

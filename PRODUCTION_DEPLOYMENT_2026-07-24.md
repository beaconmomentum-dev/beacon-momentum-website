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

The public URL `https://beaconmomentum.com/the-watch?release=bcb4757` responded with the expected page title, but the connected-browser renderer did not expose the client-rendered page content or screenshot. The source, build, preview, and origin-file checks confirm the updated price; a normal browser refresh remains advisable as a final customer-side cache observation.

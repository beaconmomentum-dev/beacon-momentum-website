#!/usr/bin/env node
/**
 * check-env.js — Pre-build environment variable validation
 * Runs before every build. Exits non-zero if any required var is missing or empty.
 * This prevents a broken build from ever reaching production.
 */

// Required for the CLIENT build (baked into the JS bundle at build time)
const REQUIRED_CLIENT = [
  "VITE_OAUTH_PORTAL_URL",   // OAuth portal URL (e.g. https://app.beaconmomentum.com)
  "VITE_APP_ID",             // App identifier for Manus OAuth
  "VITE_GHL_API_KEY",        // GoHighLevel API key
];

// Required for the SERVER at runtime (checked here so a misconfigured deploy is caught early)
const REQUIRED_SERVER = [
  "DATABASE_URL",
  "JWT_SECRET",
  "OAUTH_SERVER_URL",
  "NODE_ENV",
];

// Optional — these are allowed to be absent (analytics, forge API, etc.)
// Listed here for documentation purposes only
const OPTIONAL = [
  "VITE_ANALYTICS_ENDPOINT",
  "VITE_ANALYTICS_WEBSITE_ID",
  "VITE_FRONTEND_FORGE_API_KEY",
  "VITE_FRONTEND_FORGE_API_URL",
  "VITE_GHL_LOCATION_ID",
  "BUILT_IN_FORGE_API_KEY",
  "BUILT_IN_FORGE_API_URL",
  "COHORT_LEAD_PASSWORD",
  "OWNER_OPEN_ID",
  "PORT",
];

let failed = false;

const missing = [...REQUIRED_CLIENT, ...REQUIRED_SERVER].filter(
  (k) => !process.env[k] || process.env[k].trim() === ""
);

if (missing.length > 0) {
  console.error("\n❌  BUILD ABORTED — Missing required environment variables:\n");
  missing.forEach((k) => console.error(`   • ${k}`));
  console.error(
    "\n   Copy .env.example to .env and fill in the missing values, then retry.\n"
  );
  failed = true;
}

// Warn about VITE_ vars that are set to placeholder strings (common copy-paste mistake)
const placeholders = [...REQUIRED_CLIENT].filter(
  (k) => process.env[k] && process.env[k].includes("%VITE_")
);
if (placeholders.length > 0) {
  console.error("\n❌  BUILD ABORTED — These vars still contain unsubstituted placeholders:\n");
  placeholders.forEach((k) => console.error(`   • ${k} = ${process.env[k]}`));
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("✅  All required environment variables are present. Proceeding with build.\n");

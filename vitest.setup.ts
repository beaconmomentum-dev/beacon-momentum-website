// Test-only value. Production must provide its own COHORT_LEAD_PASSWORD through
// the runtime environment and must never depend on this file.
process.env.COHORT_LEAD_PASSWORD ??= "vitest-cohort-password";

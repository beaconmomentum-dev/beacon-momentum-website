export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  /** Server-only HighLevel credential for the public capture relay. Never expose this through VITE_* variables. */
  ghlApiKey: process.env.GHL_API_KEY ?? "",
  /** Shared password for cohort lead dashboard access */
  cohortLeadPassword: process.env.COHORT_LEAD_PASSWORD ?? "",
  /** Server-only Stripe credentials for Beacon-controlled The Watch enrollment. */
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
  stripeWatchAnnualPriceId: process.env.STRIPE_WATCH_ANNUAL_PRICE_ID ?? "",
  stripeWatchWebhookSecret: process.env.STRIPE_WATCH_WEBHOOK_SECRET ?? "",
  /** Server-only Stripe test-mode credentials used exclusively by the internal Watch lifecycle verification path. */
  stripeTestSecretKey: process.env.STRIPE_TEST_SECRET_KEY ?? "",
  stripeTestPublishableKey: process.env.STRIPE_TEST_PUBLISHABLE_KEY ?? "",
  stripeTestWatchAnnualPriceId: process.env.STRIPE_TEST_WATCH_ANNUAL_PRICE_ID ?? "",
  stripeTestWatchWebhookSecret: process.env.STRIPE_TEST_WATCH_WEBHOOK_SECRET ?? "",
};

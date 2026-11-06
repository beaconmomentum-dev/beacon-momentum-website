export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  /** Server-only HighLevel credential. Public-prefixed variables are never used. */
  ghlApiKey: process.env.GHL_API_KEY ?? "",
  /** Shared password for cohort lead dashboard access */
  cohortLeadPassword: process.env.COHORT_LEAD_PASSWORD ?? "",
  /** Server-only Stripe credentials for Beacon-controlled The Watch enrollment. */
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
  stripeWatchAnnualPriceId: process.env.STRIPE_WATCH_ANNUAL_PRICE_ID ?? "",
  stripeWatchWebhookSecret: process.env.STRIPE_WATCH_WEBHOOK_SECRET ?? "",
  /** Direct Stripe-hosted Watch checkout links; these stay server-side. */
  stripeWatchFoundingPaymentLinkId: process.env.STRIPE_WATCH_FOUNDING_PAYMENT_LINK_ID ?? "",
  stripeWatchFinalFoundingPaymentLinkId: process.env.STRIPE_WATCH_FINAL_FOUNDING_PAYMENT_LINK_ID ?? "",
  stripeWatchStandardPaymentLinkId: process.env.STRIPE_WATCH_STANDARD_PAYMENT_LINK_ID ?? "",
  stripeWatchStandardPriceId: process.env.STRIPE_WATCH_STANDARD_PRICE_ID ?? "",
  watchDirectPaymentEnabled: process.env.WATCH_DIRECT_PAYMENT_ENABLED === "true",
  /** Server-to-server HMAC bridge for Watch-specific Stripe Checkout Sessions. */
  watchCheckoutSessionsEnabled: process.env.WATCH_CHECKOUT_SESSION_ENABLED === "true",
  watchCheckoutBridgeUrl: process.env.WATCH_CHECKOUT_BRIDGE_URL ?? "",
  watchCheckoutBridgeSecret: process.env.WATCH_CHECKOUT_BRIDGE_SECRET ?? "",
  /** Server-only Stripe test-mode credentials used exclusively by the internal Watch lifecycle verification path. */
  stripeTestSecretKey: process.env.STRIPE_TEST_SECRET_KEY ?? "",
  stripeTestPublishableKey: process.env.STRIPE_TEST_PUBLISHABLE_KEY ?? "",
  stripeTestWatchAnnualPriceId:
    process.env.STRIPE_TEST_WATCH_ANNUAL_PRICE_ID ?? "",
  stripeTestWatchWebhookSecret:
    process.env.STRIPE_TEST_WATCH_WEBHOOK_SECRET ?? "",
  stripeTestWatchFoundingPaymentLinkId:
    process.env.STRIPE_TEST_WATCH_FOUNDING_PAYMENT_LINK_ID ?? "",
  stripeTestWatchFinalFoundingPaymentLinkId:
    process.env.STRIPE_TEST_WATCH_FINAL_FOUNDING_PAYMENT_LINK_ID ?? "",
  stripeTestWatchStandardPaymentLinkId:
    process.env.STRIPE_TEST_WATCH_STANDARD_PAYMENT_LINK_ID ?? "",
  stripeTestWatchStandardPriceId:
    process.env.STRIPE_TEST_WATCH_STANDARD_PRICE_ID ?? "",
  watchTestDirectPaymentEnabled:
    process.env.WATCH_TEST_DIRECT_PAYMENT_ENABLED === "true",
  /** TEST-mode checkout return; must be an explicit HTTP 127.0.0.1 URL. */
  watchTestClaimSentUrl: process.env.WATCH_TEST_CLAIM_SENT_URL ?? "",
  /** Live Watch checkout remains disabled until the owner release gates are cleared. */
  watchLiveCheckoutEnabled: process.env.WATCH_LIVE_CHECKOUT_ENABLED === "true",
  /** SendGrid API key for other existing transactional notifications. */
  sendgridApiKey: process.env.SENDGRID_API_KEY ?? "",
  /** Admin email for system notifications (defaults to support@beaconmomentum.com). */
  adminNotificationEmail:
    process.env.ADMIN_NOTIFICATION_EMAIL ?? "support@beaconmomentum.com",
  /** Protected machine-to-machine Phoenix intake for durable payment lifecycle notifications. */
  phoenixPaymentNotificationUrl:
    process.env.PHOENIX_PAYMENT_NOTIFICATION_URL ?? "",
  phoenixPaymentNotificationToken:
    process.env.PHOENIX_PAYMENT_NOTIFICATION_TOKEN ?? "",
};

import { publicProcedure, router } from "./_core/trpc";
import { captureRouter } from "./routers/capture";
import { cohortRouter } from "./routers/cohort";
import { foundationSupportRouter } from "./routers/foundationSupport";
import { watchCheckoutRouter, watchTestCheckoutRouter } from "./routers/watchCheckout";

export const appRouter = router({
  /** Cohort lead dashboard — password-protected with Beacon-controlled credentials. */
  cohort: cohortRouter,
  /** Public, server-side CRM capture relay. Client migration is released separately. */
  capture: captureRouter,
  /** One-time Foundation Year support through Beacon-controlled Stripe Elements. */
  foundationSupport: foundationSupportRouter,
  /** Public, same-origin Stripe Elements enrollment for The Watch. */
  watchCheckout: watchCheckoutRouter,
  /** Isolated Stripe test-mode namespace; not linked from the public enrollment flow. */
  watchTestCheckout: watchTestCheckoutRouter,
});

export type AppRouter = typeof appRouter;

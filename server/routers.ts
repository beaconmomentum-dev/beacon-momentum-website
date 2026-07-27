import { publicProcedure, router } from "./_core/trpc";
import { captureRouter } from "./routers/capture";
import { cohortRouter } from "./routers/cohort";
import { watchCheckoutRouter } from "./routers/watchCheckout";

export const appRouter = router({
  /** Cohort lead dashboard — password-protected with Beacon-controlled credentials. */
  cohort: cohortRouter,
  /** Public, server-side CRM capture relay. Client migration is released separately. */
  capture: captureRouter,
  /** Public, same-origin Stripe Elements enrollment for The Watch. */
  watchCheckout: watchCheckoutRouter,
});

export type AppRouter = typeof appRouter;

import { publicProcedure, router } from "./_core/trpc";
import { captureRouter } from "./routers/capture";
import { cohortRouter } from "./routers/cohort";
import { foundationSupportRouter } from "./routers/foundationSupport";
import { watchTestCheckoutRouter } from "./routers/watchCheckout";
import { communityBuildRouter } from "./routers/communityBuild";

export const appRouter = router({
  /** Cohort lead dashboard — password-protected with Beacon-controlled credentials. */
  cohort: cohortRouter,
  /** Public forms use this narrow allow-listed relay; CRM credentials remain server-side. */
  capture: captureRouter,
  /** One-time Foundation Year support through Beacon-controlled Stripe Elements. */
  foundationSupport: foundationSupportRouter,
  /** Isolated Stripe test-mode namespace; not linked from the public enrollment flow. */
  watchTestCheckout: watchTestCheckoutRouter,
  /** Free entry for the annual $4,970 Community Build Award drawing. */
  communityBuildEntry: communityBuildRouter,
});

export type AppRouter = typeof appRouter;

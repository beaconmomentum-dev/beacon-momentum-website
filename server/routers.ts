import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { captureRouter } from "./routers/capture";
import { cohortRouter } from "./routers/cohort";
import { watchCheckoutRouter } from "./routers/watchCheckout";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  /** Cohort lead dashboard — password-protected, no Manus OAuth required */
  cohort: cohortRouter,
  /** Public, server-side CRM capture relay. Client migration is released separately. */
  capture: captureRouter,
  /** Public, same-origin Stripe Elements enrollment for The Watch. */
  watchCheckout: watchCheckoutRouter,
});

export type AppRouter = typeof appRouter;

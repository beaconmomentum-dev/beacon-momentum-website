import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { communityBuildEntries } from "../../drizzle/schema";

/** Current annual cycle identifier */
const CURRENT_CYCLE = "2026-2027";

/** Rate-limit: max entries per IP per 10 minutes */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function consumeRate(key: string, now: number): boolean {
  if (rateBuckets.size > 5000) {
    rateBuckets.forEach((b, k) => { if (b.resetAt <= now) rateBuckets.delete(k); });
  }
  const existing = rateBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (existing.count >= RATE_LIMIT_MAX) return false;
  existing.count += 1;
  return true;
}

function clientIp(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers["cf-connecting-ip"] ?? headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return raw?.split(",")[0]?.trim() || "unknown";
}

const entryInputSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(320),
  city: z.string().min(1).max(128),
  state: z.string().min(1).max(64),
});

export const communityBuildRouter = router({
  enter: publicProcedure.input(entryInputSchema).mutation(async ({ input, ctx }) => {
    const ip = clientIp(ctx.req.headers);

    // Rate limit
    if (!consumeRate(ip, Date.now())) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Please wait a few minutes before trying again.",
      });
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Service temporarily unavailable. Please try again later.",
      });
    }

    try {
      await db.insert(communityBuildEntries).values({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        city: input.city.trim(),
        state: input.state.trim().toUpperCase(),
        cycle: CURRENT_CYCLE,
        ipAddress: ip,
      });

      console.info("[community-build] entry accepted", {
        email: input.email.replace(/(.{2}).*(@.*)/, "$1***$2"),
        cycle: CURRENT_CYCLE,
      });

      return { success: true };
    } catch (error: any) {
      // Duplicate entry (unique constraint on email+cycle)
      if (error?.code === "ER_DUP_ENTRY" || error?.errno === 1062) {
        console.info("[community-build] duplicate entry blocked", {
          email: input.email.replace(/(.{2}).*(@.*)/, "$1***$2"),
          cycle: CURRENT_CYCLE,
        });
        // Return success anyway — don't reveal whether the email is already entered
        return { success: true };
      }
      console.error("[community-build] entry failed", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong. Please try again or email support@beaconmomentum.com.",
      });
    }
  }),
});

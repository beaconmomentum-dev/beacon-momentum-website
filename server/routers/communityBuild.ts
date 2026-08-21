import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { communityBuildEntries } from "../../drizzle/schema";
import { ENV } from "../_core/env";
import sgMail from "@sendgrid/mail";

/** Initialize SendGrid if configured */
if (ENV.sendgridApiKey) {
  sgMail.setApiKey(ENV.sendgridApiKey);
}

/**
 * Send admin notification email for new Community Build Award entries.
 * Fire-and-forget — never blocks or fails the user-facing response.
 */
async function notifyAdmin(entry: { name: string; email: string; city: string; state: string; cycle: string }): Promise<void> {
  if (!ENV.sendgridApiKey) {
    console.warn("[community-build] SendGrid not configured — skipping admin notification");
    return;
  }
  try {
    await sgMail.send({
      to: ENV.adminNotificationEmail,
      from: "notifications@beaconmomentum.com",
      subject: `New Community Build Award Entry — ${entry.name}`,
      text: [
        `A new entry has been submitted for the $4,970 Community Build Award.`,
        ``,
        `Name: ${entry.name}`,
        `Email: ${entry.email}`,
        `Location: ${entry.city}, ${entry.state}`,
        `Cycle: ${entry.cycle}`,
        `Submitted: ${new Date().toISOString()}`,
        ``,
        `This is an automated notification from beaconmomentum.com.`,
      ].join("\n"),
      html: [
        `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8f6f0; border-radius: 8px;">`,
        `  <div style="border-bottom: 2px solid #c8a84e; padding-bottom: 16px; margin-bottom: 20px;">`,
        `    <h2 style="color: #1a2744; margin: 0; font-size: 20px;">New Community Build Award Entry</h2>`,
        `    <p style="color: #6b7280; margin: 4px 0 0; font-size: 14px;">$4,970 Annual Drawing — Cycle ${entry.cycle}</p>`,
        `  </div>`,
        `  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">`,
        `    <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;">Name</td><td style="padding: 8px 0; color: #1a2744; font-weight: 600;">${entry.name}</td></tr>`,
        `    <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; color: #1a2744;"><a href="mailto:${entry.email}" style="color: #c8a84e;">${entry.email}</a></td></tr>`,
        `    <tr><td style="padding: 8px 0; color: #6b7280;">Location</td><td style="padding: 8px 0; color: #1a2744;">${entry.city}, ${entry.state}</td></tr>`,
        `    <tr><td style="padding: 8px 0; color: #6b7280;">Submitted</td><td style="padding: 8px 0; color: #1a2744;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}</td></tr>`,
        `  </table>`,
        `  <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">`,
        `    Automated notification from beaconmomentum.com`,
        `  </div>`,
        `</div>`,
      ].join("\n"),
    });
    console.info("[community-build] admin notification sent for", entry.email.replace(/(.{2}).*(@.*)/, "$1***$2"));
  } catch (err) {
    console.error("[community-build] admin notification failed", err);
  }
}

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

      // Fire-and-forget admin notification
      notifyAdmin({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        city: input.city.trim(),
        state: input.state.trim().toUpperCase(),
        cycle: CURRENT_CYCLE,
      });

      return { success: true };
    } catch (error: any) {
      // Duplicate entry (unique constraint on email+cycle)
      if (error?.code === "ER_DUP_ENTRY" || error?.errno === 1062 || error?.sqlState === "23000") {
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

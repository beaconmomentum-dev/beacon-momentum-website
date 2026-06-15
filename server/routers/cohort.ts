/**
 * Cohort Lead Dashboard — tRPC Router
 *
 * Authentication: simple shared-password model.
 *   - `cohort.login`  — validates password, issues a session token stored in DB
 *   - `cohort.logout` — invalidates the session token
 *   - `cohort.me`     — returns session info if the token cookie is valid
 *
 * Data procedures (all require a valid cohort session cookie):
 *   - `cohort.members`        — list members (all, or filtered by lead email)
 *   - `cohort.memberDetail`   — single member with full intake answers
 *   - `cohort.saveNotes`      — update lead notes for a member
 *   - `cohort.assignMember`   — assign a member to a lead / group
 *   - `cohort.submitIntake`   — called by TheWatchIntakePage to persist answers
 */

import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { parse as parseCookieHeader } from "cookie";
import { z } from "zod/v4";
import {
  createCohortLeadSession,
  deleteCohortLeadSession,
  getAllWatchMembers,
  getCohortLeadSession,
  getWatchMembersByLead,
  insertWatchMember,
  updateWatchMemberAssignment,
  updateWatchMemberNotes,
} from "../db";
import { ENV } from "../_core/env";
import { publicProcedure, router } from "../_core/trpc";

// Cookie name for the cohort lead session token
const COHORT_SESSION_COOKIE = "cohort_lead_token";
// Session duration: 8 hours
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

/** Reads the cohort session token from the request cookie. */
function getTokenFromRequest(req: { cookies?: Record<string, string>; headers?: Record<string, string | string[]> }): string | null {
  // Parse cookies from the raw Cookie header (cookie-parser may not be registered)
  const cookieHeader = req.headers?.["cookie"];
  if (cookieHeader) {
    const rawHeader = Array.isArray(cookieHeader) ? cookieHeader.join("; ") : cookieHeader;
    const parsed = parseCookieHeader(rawHeader);
    if (parsed[COHORT_SESSION_COOKIE]) {
      return parsed[COHORT_SESSION_COOKIE];
    }
  }
  // Fallback: Authorization: Bearer <token> header (for API clients)
  const auth = req.headers?.["authorization"];
  const authStr = Array.isArray(auth) ? auth[0] : auth;
  if (authStr && authStr.startsWith("Bearer ")) {
    return authStr.slice(7);
  }
  return null;
}

/** Validates the cohort session token from the request. Throws UNAUTHORIZED if invalid. */
async function requireCohortSession(req: { cookies?: Record<string, string>; headers?: Record<string, string> }) {
  const token = getTokenFromRequest(req);
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED", message: "Cohort session required" });
  const session = await getCohortLeadSession(token);
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired session" });
  return session;
}

export const cohortRouter = router({
  /** Authenticate with the shared cohort lead password. Returns a session token. */
  login: publicProcedure
    .input(
      z.object({
        password: z.string().min(1),
        leadEmail: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const expectedPassword = ENV.cohortLeadPassword;
      if (!expectedPassword) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Cohort password not configured" });
      }
      if (input.password !== expectedPassword) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid password" });
      }

      const token = randomUUID();
      const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
      await createCohortLeadSession(input.leadEmail, token, expiresAt);

      // Set HttpOnly cookie
      ctx.res.cookie(COHORT_SESSION_COOKIE, token, {
        httpOnly: true,
        secure: ENV.isProduction,
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
      });

      return { success: true, leadEmail: input.leadEmail };
    }),

  /** Invalidate the current cohort session. */
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const token = getTokenFromRequest(ctx.req as { cookies?: Record<string, string>; headers?: Record<string, string> });
    if (token) {
      await deleteCohortLeadSession(token);
    }
    ctx.res.clearCookie(COHORT_SESSION_COOKIE, { path: "/" });
    return { success: true };
  }),

  /** Return current session info (or null if not authenticated). */
  me: publicProcedure.query(async ({ ctx }) => {
    const token = getTokenFromRequest(ctx.req as { cookies?: Record<string, string>; headers?: Record<string, string> });
    if (!token) return null;
    const session = await getCohortLeadSession(token);
    if (!session) return null;
    return { leadEmail: session.leadEmail, expiresAt: session.expiresAt };
  }),

  /** List all watch members. Admins see all; leads see only their assigned members. */
  members: publicProcedure
    .input(
      z.object({
        /** If true, return only members assigned to the authenticated lead's email */
        myMembersOnly: z.boolean().optional(),
        /** Filter by track */
        track: z.string().optional(),
        /** Filter by tier */
        tier: z.string().optional(),
      }).optional()
    )
    .query(async ({ input, ctx }) => {
      const session = await requireCohortSession(ctx.req as { cookies?: Record<string, string>; headers?: Record<string, string> });

      let members = input?.myMembersOnly
        ? await getWatchMembersByLead(session.leadEmail)
        : await getAllWatchMembers();

      // Apply optional filters
      if (input?.track) {
        members = members.filter((m) => m.track === input.track);
      }
      if (input?.tier) {
        members = members.filter((m) => m.tier === input.tier);
      }

      return members;
    }),

  /** Get a single member's full detail including intake answers. */
  memberDetail: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      await requireCohortSession(ctx.req as { cookies?: Record<string, string>; headers?: Record<string, string> });
      const all = await getAllWatchMembers();
      const member = all.find((m) => m.id === input.id);
      if (!member) throw new TRPCError({ code: "NOT_FOUND", message: "Member not found" });
      return member;
    }),

  /** Save cohort lead notes for a member. */
  saveNotes: publicProcedure
    .input(z.object({ memberId: z.number(), notes: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await requireCohortSession(ctx.req as { cookies?: Record<string, string>; headers?: Record<string, string> });
      await updateWatchMemberNotes(input.memberId, input.notes);
      return { success: true };
    }),

  /** Assign a member to a cohort lead and/or group. */
  assignMember: publicProcedure
    .input(
      z.object({
        memberId: z.number(),
        cohortLeadEmail: z.string().email().nullable(),
        cohortGroup: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await requireCohortSession(ctx.req as { cookies?: Record<string, string>; headers?: Record<string, string> });
      await updateWatchMemberAssignment(input.memberId, input.cohortLeadEmail, input.cohortGroup);
      return { success: true };
    }),

  /**
   * Submit intake answers from the intake form.
   * Called by TheWatchIntakePage after successful GHL submission.
   * This is a public procedure — no session required — so any completed intake is persisted.
   */
  submitIntake: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        tier: z.string(),
        track: z.string(),
        intakeAnswers: z.record(z.string(), z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const id = await insertWatchMember({
        email: input.email,
        firstName: input.firstName ?? null,
        tier: input.tier,
        track: input.track,
        intakeAnswers: input.intakeAnswers,
      });
      return { success: true, id };
    }),
});

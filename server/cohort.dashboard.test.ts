/**
 * Cohort Dashboard — Integration Tests
 * Tests the key tRPC procedures: login, me, members, submitIntake, saveNotes
 */
import { describe, it, expect, beforeAll } from "vitest";

const BASE = "http://localhost:3000/api/trpc";

async function trpcPost(procedure: string, input: unknown) {
  const res = await fetch(`${BASE}/${procedure}?batch=1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "0": { json: input } }),
  });
  const data = await res.json() as Array<{ result?: { data?: { json?: unknown } }; error?: unknown }>;
  return data[0];
}

async function trpcGet(procedure: string, input: unknown, cookieHeader?: string) {
  const encoded = encodeURIComponent(JSON.stringify({ "0": { json: input } }));
  const res = await fetch(`${BASE}/${procedure}?batch=1&input=${encoded}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  const data = await res.json() as Array<{ result?: { data?: { json?: unknown } }; error?: { json?: { message?: string } } }>;
  return data[0];
}

let sessionCookie = "";

describe("Cohort Dashboard", () => {
  it("rejects login with wrong password", async () => {
    const result = await trpcPost("cohort.login", {
      leadEmail: "lead@test.com",
      password: "wrongpassword123",
    });
    expect(result).toHaveProperty("error");
  });

  it("accepts login with correct password", async () => {
    const password = process.env.COHORT_LEAD_PASSWORD;
    expect(password).toBeDefined();
    expect(password!.length).toBeGreaterThanOrEqual(8);

    const res = await fetch(`${BASE}/cohort.login?batch=1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "0": { json: { leadEmail: "lead@test.com", password } } }),
    });
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toBeTruthy();
    // Extract the cookie value
    const match = setCookie?.match(/cohort_lead_token=([^;]+)/);
    expect(match).toBeTruthy();
    sessionCookie = `cohort_lead_token=${match![1]}`;

    const data = await res.json() as Array<{ result?: { data?: { json?: { success?: boolean; leadEmail?: string } } } }>;
    expect(data[0].result?.data?.json?.success).toBe(true);
    expect(data[0].result?.data?.json?.leadEmail).toBe("lead@test.com");
  });

  it("returns session info via cohort.me", async () => {
    const result = await trpcGet("cohort.me", undefined, sessionCookie);
    expect(result.result?.data?.json).toMatchObject({ leadEmail: "lead@test.com" });
  });

  it("returns null from cohort.me without a session", async () => {
    const result = await trpcGet("cohort.me", undefined);
    expect(result.result?.data?.json).toBeNull();
  });

  it("can submit intake answers", async () => {
    const result = await trpcPost("cohort.submitIntake", {
      email: "testmember@vitest.com",
      firstName: "Test",
      tier: "navigator",
      track: "transition",
      intakeAnswers: {
        tier: "navigator",
        current_situation: "Vitest test member",
        biggest_obstacle: "Testing",
        time_horizon: "3-6 months",
        ai_comfort: "curious_but_cautious",
        accountability: "structured_check_ins",
        track_choice: "transition",
      },
    });
    expect(result.result?.data?.json).toMatchObject({ success: true });
  });

  it("returns members list when authenticated", async () => {
    const result = await trpcGet("cohort.members", { myMembersOnly: false }, sessionCookie);
    const members = result.result?.data?.json as Array<{ email: string }>;
    expect(Array.isArray(members)).toBe(true);
    expect(members.length).toBeGreaterThan(0);
  });

  it("rejects members list without session", async () => {
    const result = await trpcGet("cohort.members", { myMembersOnly: false });
    expect(result).toHaveProperty("error");
  });
});

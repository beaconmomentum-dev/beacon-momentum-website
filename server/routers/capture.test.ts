import { describe, expect, it, vi } from "vitest";
import { buildGhlUpsertPayload, captureInputSchema, isAllowedOrigin, submitCaptureToGhl } from "./capture";

describe("public capture relay contract", () => {
  it("owns newsletter tags and source on the server", () => {
    const input = captureInputSchema.parse({
      event: "newsletter_signup",
      email: "  PERSON@EXAMPLE.COM ",
      firstName: "  Bob  ",
      consentVersion: "beacon-brief-v1",
      tags: ["attempted_browser_override"],
    });

    expect(buildGhlUpsertPayload(input)).toEqual({
      email: "person@example.com",
      firstName: "Bob",
      locationId: "vvhkYM6iySBVh5kOcFGM",
      source: "beaconmomentum.com/newsletter",
      tags: ["BM_Newsletter", "BM_Beacon_Brief"],
    });
  });

  it("allow-lists Pathfinder pillars and emits only the derived result field", () => {
    const input = captureInputSchema.parse({
      event: "pathfinder_result",
      email: "person@example.com",
      pillar: "venture",
    });

    expect(buildGhlUpsertPayload(input)).toMatchObject({
      tags: ["BM_Pathfinder", "BM_Path_Venture"],
      customFields: [{ id: "4KG5TRT5jHFIv4rO7bqg", field_value: "venture" }],
    });
    expect(() =>
      captureInputSchema.parse({ event: "pathfinder_result", email: "person@example.com", pillar: "unknown" }),
    ).toThrow();
  });

  it("owns contact inquiry routing and does not let the browser choose tags or CRM location", () => {
    const input = captureInputSchema.parse({
      event: "contact_inquiry",
      email: "person@example.com",
      firstName: "Person",
      lastName: "Example",
      phone: "+1 555 0100",
      subject: "Practical AI Skills",
      message: "Please let me know when enrollment is available.",
    });

    expect(buildGhlUpsertPayload(input)).toMatchObject({
      source: "beaconmomentum.com/contact",
      tags: ["BM_Contact_Form"],
      firstName: "Person",
      lastName: "Example",
      phone: "+1 555 0100",
      customFields: [{ id: "contact_message_field", field_value: "[Practical AI Skills] Please let me know when enrollment is available." }],
    });
  });

  it("records a consented Readiness Kit inquiry with server-owned source and tags", () => {
    const input = captureInputSchema.parse({
      event: "readiness_kit_beta_interest",
      email: "PERSON@EXAMPLE.COM",
      firstName: "Person",
      audience: "small_team_operator",
      workflow: "Turn approved research notes into a first client-update draft.",
      challenge: "We cannot reliably identify incomplete inputs or retain a review record.",
      stage: "weekly_use",
      paidIntent: "possibly",
      followUpConsent: true,
      consentVersion: "ai-workflow-readiness-kit-v1",
      utmSource: "youtube",
      utmCampaign: "readiness-kit-launch",
    });

    expect(buildGhlUpsertPayload(input, "2026-08-27T12:00:00.000Z")).toMatchObject({
      email: "person@example.com",
      source: "beaconmomentum.com/ai-workflow-release-readiness-kit",
      tags: ["BM_AI_Workflow_Readiness_Kit", "BM_Practical_AI_Skills", "BM_Consent_One_Followup"],
    });
    const payload = buildGhlUpsertPayload(input, "2026-08-27T12:00:00.000Z");
    expect(payload.customFields?.[0].field_value).toContain("recorded_at=2026-08-27T12:00:00.000Z");
    expect(payload.customFields?.[0].field_value).toContain("utm_source=youtube");
  });

  it("does not accept a Readiness Kit inquiry without the specific follow-up permission", () => {
    expect(() => captureInputSchema.parse({
      event: "readiness_kit_beta_interest",
      email: "person@example.com",
      audience: "small_team_operator",
      workflow: "Turn approved research notes into a first client-update draft.",
      challenge: "We cannot reliably identify incomplete inputs or retain a review record.",
      stage: "weekly_use",
      paidIntent: "possibly",
      followUpConsent: false,
    })).toThrow();
  });

  it("maps the Digital Grandpa library waitlist on the server without browser-selected tags", () => {
    const input = captureInputSchema.parse({ event: "digital_grandpa_library_interest", email: "person@example.com" });
    expect(buildGhlUpsertPayload(input)).toMatchObject({
      source: "beaconmomentum.com/digital-grandpa/library",
      tags: ["BM_Digital_Grandpa_Library_Waitlist"],
    });
  });

  it("maps Watch intake fields and track tags on the server", () => {
    const input = captureInputSchema.parse({
      event: "watch_intake_submission",
      email: "person@example.com",
      firstName: "Person",
      track: "systems",
      entryStage: "sentinel",
      answers: { current_situation: "building", biggest_obstacle: "Need a smaller operating plan" },
    });
    expect(buildGhlUpsertPayload(input)).toMatchObject({
      source: "beaconmomentum.com/the-watch/intake",
      tags: ["BM_Watch_Intake", "BM_Watch_Join", "BM_Watch_Enrollment_Request", "BM_Watch_Sentinel", "BM_Track_Systems"],
    });
    expect(buildGhlUpsertPayload(input).customFields).toEqual(expect.arrayContaining([
        { id: "watch_intake_track", field_value: "systems" },
        { id: "watch_intake_tier", field_value: "sentinel" },
    ]));
  });

  it("does not report success when HighLevel returns a non-success status", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "rejected" }), { status: 400 }));
    const input = captureInputSchema.parse({ event: "starter_pack_request", email: "person@example.com" });

    await expect(submitCaptureToGhl(input, { apiKey: "test-key", fetchImpl })).rejects.toThrow("upstream_rejected");
  });

  it("fails closed when no server-only credential has been configured", async () => {
    const input = captureInputSchema.parse({ event: "starter_pack_request", email: "person@example.com" });

    await expect(submitCaptureToGhl(input, { apiKey: "" })).rejects.toThrow("not_configured");
  });

  it("requires an approved browser origin in production", () => {
    expect(isAllowedOrigin(undefined, true)).toBe(false);
    expect(isAllowedOrigin("https://beaconmomentum.com", true)).toBe(true);
    expect(isAllowedOrigin("http://localhost:5173", true)).toBe(false);
    expect(isAllowedOrigin("http://localhost:5173", false)).toBe(true);
  });

  it("uses the server credential only in the outbound request", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ succeeded: true }), { status: 200 }));
    const input = captureInputSchema.parse({ event: "watch_join", email: "person@example.com" });

    await expect(submitCaptureToGhl(input, { apiKey: "test-key", fetchImpl })).resolves.toBeUndefined();
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://services.leadconnectorhq.com/contacts/upsert",
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer test-key" }),
        body: expect.stringContaining("BM_Watch_Join"),
      }),
    );
  });
});

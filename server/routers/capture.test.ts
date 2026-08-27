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

  it("requires explicit consent and owns Work That Fits card routing", () => {
    const input = captureInputSchema.parse({
      event: "work_that_fits_card_request",
      email: "  PERSON@EXAMPLE.COM ",
      firstName: "  Person  ",
      emailConsent: true,
      consentVersion: "work-that-fits-v1",
    });

    expect(buildGhlUpsertPayload(input)).toEqual({
      email: "person@example.com",
      firstName: "Person",
      locationId: "vvhkYM6iySBVh5kOcFGM",
      source: "beaconmomentum.com/work-that-fits",
      tags: ["BM_Work_That_Fits", "BM_One_Task_Experiment_Card", "BM_Work_That_Fits_Email_Consent"],
    });
    expect(() =>
      captureInputSchema.parse({ event: "work_that_fits_card_request", email: "person@example.com" }),
    ).toThrow();
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

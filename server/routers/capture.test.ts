import { describe, expect, it, vi } from "vitest";
import { buildGhlUpsertPayload, captureInputSchema, submitCaptureToGhl } from "./capture";

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

  it("does not report success when HighLevel returns a non-success status", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "rejected" }), { status: 400 }));
    const input = captureInputSchema.parse({ event: "starter_pack_request", email: "person@example.com" });

    await expect(submitCaptureToGhl(input, { apiKey: "test-key", fetchImpl })).rejects.toThrow("upstream_rejected");
  });

  it("fails closed when no server-only credential has been configured", async () => {
    const input = captureInputSchema.parse({ event: "starter_pack_request", email: "person@example.com" });

    await expect(submitCaptureToGhl(input, { apiKey: "" })).rejects.toThrow("not_configured");
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

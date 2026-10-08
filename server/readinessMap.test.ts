import { describe, expect, it } from "vitest";
import { readinessMapRequestSchema } from "./readinessMap";

describe("Readiness Map delivery boundary", () => {
  it("keeps optional marketing consent false by default", () => {
    const input = readinessMapRequestSchema.parse({
      email: "  PERSON@EXAMPLE.COM ",
      firstName: "  Bob  ",
    });

    expect(input).toMatchObject({
      email: "person@example.com",
      firstName: "Bob",
      marketingConsent: false,
      consentVersion: "readiness-map-v1",
    });
  });

  it("accepts a separate affirmative marketing choice without making it required", () => {
    const input = readinessMapRequestSchema.parse({
      email: "person@example.com",
      marketingConsent: true,
      consentVersion: "readiness-map-v1",
    });

    expect(input.marketingConsent).toBe(true);
  });

  it("does not accept a browser-selected delivery or CRM destination", () => {
    const input = readinessMapRequestSchema.parse({
      email: "person@example.com",
      deliveryTemplate: "attempted-override",
      tags: ["attempted-override"],
      locationId: "attempted-override",
    });

    expect(input).toEqual({
      email: "person@example.com",
      marketingConsent: false,
      consentVersion: "readiness-map-v1",
    });
  });
});

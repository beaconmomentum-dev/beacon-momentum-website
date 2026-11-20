import { describe, expect, it, vi } from "vitest";
import {
  isReadinessMapDeliveryDisabled,
  readinessMapRequestSchema,
  registerReadinessMapRoutes,
} from "./readinessMap";

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

  it("hard-disables delivery in a private staging environment", () => {
    expect(
      isReadinessMapDeliveryDisabled({
        READINESS_MAP_STAGING_NO_DELIVERY: "1",
      }),
    ).toBe(true);
    expect(isReadinessMapDeliveryDisabled({})).toBe(false);
  });

  it("rejects GET requests without reaching the SPA fallback", () => {
    const get = vi.fn();
    const post = vi.fn();
    registerReadinessMapRoutes({ get, post } as never);

    const getHandler = get.mock.calls.find(
      ([path]) => path === "/api/readiness-map/request",
    )?.[1] as (req: unknown, res: {
      setHeader: (name: string, value: string) => void;
      status: (code: number) => { json: (body: unknown) => void };
    }) => void;
    const res = {
      setHeader: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    expect(getHandler).toBeTypeOf("function");
    getHandler({}, res);
    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST");
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      message: "This endpoint accepts POST requests only.",
    });
  });
});

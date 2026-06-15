import { describe, it, expect } from "vitest";

describe("COHORT_LEAD_PASSWORD env var", () => {
  it("should be set and non-empty", () => {
    const password = process.env.COHORT_LEAD_PASSWORD;
    expect(password, "COHORT_LEAD_PASSWORD must be set").toBeTruthy();
    expect(password!.length, "COHORT_LEAD_PASSWORD must be at least 8 chars").toBeGreaterThanOrEqual(8);
  });
});

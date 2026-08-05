import { describe, expect, it } from "vitest";
import { FOUNDATION_SUPPORT_MAX_CENTS, FOUNDATION_SUPPORT_MIN_CENTS, isValidFoundationSupportAmount } from "./foundationSupportPolicy";

describe("Foundation Year voluntary-support amount policy", () => {
  it("accepts complete dollar amounts inside the declared range", () => {
    expect(isValidFoundationSupportAmount(FOUNDATION_SUPPORT_MIN_CENTS)).toBe(true);
    expect(isValidFoundationSupportAmount(25_000)).toBe(true);
    expect(isValidFoundationSupportAmount(FOUNDATION_SUPPORT_MAX_CENTS)).toBe(true);
  });

  it("rejects amounts outside the range and values Stripe cannot represent as whole cents", () => {
    expect(isValidFoundationSupportAmount(FOUNDATION_SUPPORT_MIN_CENTS - 1)).toBe(false);
    expect(isValidFoundationSupportAmount(FOUNDATION_SUPPORT_MAX_CENTS + 1)).toBe(false);
    expect(isValidFoundationSupportAmount(2_500.5)).toBe(false);
    expect(isValidFoundationSupportAmount(Number.NaN)).toBe(false);
  });
});

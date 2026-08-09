import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const watchPage = readFileSync(new URL("./TheWatchPage.tsx", import.meta.url), "utf8");
const foundationYearPage = readFileSync(new URL("./FoundationYearPage.tsx", import.meta.url), "utf8");

describe("founder-confirmed public figures", () => {
  it("keeps the Watch investment explanation aligned to the confirmed figure and membership arithmetic", () => {
    expect(watchPage).toContain("$300,000+");
    expect(watchPage).toContain("more than 4,100 hours");
    expect(watchPage).toContain("604 paid annual memberships equal $300,188");
    expect(watchPage).not.toContain("$250,000");
    expect(watchPage).not.toContain("$250,488");
  });

  it("keeps the Foundation Year facts aligned to the confirmed capital and time commitment", () => {
    expect(foundationYearPage).toContain("More than $300,000");
    expect(foundationYearPage).toContain("more than 4,100 hours of screen and keyboard time");
    expect(foundationYearPage).not.toContain("At least $300,000");
  });
});

import { describe, expect, it } from "vitest";
import { COMMUNITY_BUILD_RELEASE } from "@/data/communityBuildRelease";

describe("Community Build framework release content", () => {
  it("keeps entry closed until final Official Rules are published", () => {
    expect(COMMUNITY_BUILD_RELEASE.entryOpen).toBe(false);
    expect(COMMUNITY_BUILD_RELEASE.frameworkStatus).toContain("Entries are closed");
    expect(COMMUNITY_BUILD_RELEASE.frameworkStatus).toContain("Official Rules");
    expect(COMMUNITY_BUILD_RELEASE.socialPosts).toHaveLength(5);
    expect(COMMUNITY_BUILD_RELEASE.socialPosts.every((post) => post.copy.includes("does not open entries") || post.copy.includes("does not open entry") || post.copy.includes("entry opens") || post.copy.includes("entry details will follow"))).toBe(true);
  });

  it("protects the no-purchase, no-odds, and purpose-after-verification boundaries", () => {
    expect(COMMUNITY_BUILD_RELEASE.universalDisclosure).toContain("No purchase necessary");
    expect(COMMUNITY_BUILD_RELEASE.universalDisclosure).toContain("does not affect eligibility, entries, selection, or odds");
    expect(COMMUNITY_BUILD_RELEASE.purposeSequence).toContain("After random selection and eligibility verification");
    expect(COMMUNITY_BUILD_RELEASE.purposeSequence).toContain("not unrestricted cash");
  });
});

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath: string) => readFileSync(path.join(projectRoot, relativePath), "utf8");

describe("Phase 3 public-copy architecture contract", () => {
  it("keeps exactly five visitor choices in the public navigation and centers its featured action on The Watch", () => {
    const navigation = source("client/src/components/SharedNav.tsx");

    for (const label of ["The Watch", "Beacon Labs", "Readiness Map", "Signal", "Explore"]) {
      expect(navigation).toContain(label);
    }
    expect(navigation).toContain("Review The Watch");
    expect(navigation).not.toContain("Make one job visible");
    expect(navigation).not.toContain('{ label: "Pricing"');
    expect(navigation).not.toContain('{ label: "Assessment"');
  });

  it("uses The Watch as the primary homepage continuation while preserving free and organization routes", () => {
    const home = source("client/src/pages/Home.tsx");

    expect(home).toContain("Build work that");
    expect(home).toContain("still feels like yours.");
    expect(home).toContain("Review Founding Year enrollment");
    expect(home).toContain("The Readiness Map");
    expect(home).toContain("Beacon Labs");
    expect(home).toContain("Visiting one does not enroll you in another");
    expect(home).toContain("$497");
    expect(home).not.toContain("autonomous employee");
  });

  it("replaces internal language with novice-accessible public copy on core orientation pages", () => {
    const corePages = [
      source("client/src/pages/Home.tsx"),
      source("client/src/pages/AboutPage.tsx"),
      source("client/src/pages/HowBeaconWorksPage.tsx"),
      source("client/src/pages/ResourcesPage.tsx"),
    ].join("\n");

    expect(corePages).toContain("Start with the work");
    expect(corePages).toContain("useful next step");
    expect(corePages).not.toMatch(/governance/i);
    expect(corePages).not.toMatch(/opaque score/i);
    expect(corePages).not.toMatch(/autonomous employee/i);
    expect(corePages).not.toMatch(/ROI guarantee/i);
  });

  it("makes property boundaries and the homepage metadata legible", () => {
    const about = source("client/src/pages/AboutPage.tsx");
    const resources = source("client/src/pages/ResourcesPage.tsx");
    const metadata = source("shared/routeMetadata.ts");

    expect(about).toContain("A link is a referral—not an assumed shared account");
    expect(resources).toContain("A useful resource is not a hidden enrollment");
    expect(metadata).toContain("Start with The Watch");
    expect(metadata).toContain("Free Beacon Momentum resources");
  });
});

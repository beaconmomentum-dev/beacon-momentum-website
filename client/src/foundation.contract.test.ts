import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath: string) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

describe("Foundation phase public-presence contract", () => {
  it("uses one shipped font system and the approved foundational palette", () => {
    const html = source("client/index.html");
    const styles = source("client/src/index.css");

    expect(html).toContain("family=Fraunces");
    expect(html).toContain("family=IBM+Plex+Mono");
    expect(html).toContain("family=Manrope");
    expect(styles).toContain('--beacon-display: "Fraunces"');
    expect(styles).toContain('--beacon-ui: "Manrope"');
    expect(styles).toContain('--beacon-mono: "IBM Plex Mono"');
    expect(styles).toContain("#162433");
    expect(styles).toContain("#2E7A7D");
    expect(styles).toContain("#C49F53");
  });

  it("keeps primary navigation to five visitor choices", () => {
    const navigation = source("client/src/components/SharedNav.tsx");

    for (const label of ["The Watch", "Beacon Labs", "Readiness Map", "Signal", "Explore"]) {
      expect(navigation).toContain(label);
    }
    expect(navigation).not.toContain('{ label: "Assessment"');
    expect(navigation).not.toContain('{ label: "Pricing"');
    expect(navigation).not.toContain('{ label: "Manifesto"');
  });

  it("makes the practical lighthouse narrative and three visitor actions visible on the homepage", () => {
    const home = source("client/src/pages/Home.tsx");

    expect(home).toContain("Build work that");
    expect(home).toContain("still feels like yours.");
    expect(home).toContain("Review The Watch");
    expect(home).toContain("The Readiness Map");
    expect(home).toContain("Beacon Labs");
    expect(home).not.toContain("The Exit Ramp is Leverage");
  });

  it("removes the single-plan popularity signal and keeps cookie controls out of the hero center", () => {
    const pricing = source("client/src/pages/PricingPage.tsx");
    const cookieConsent = source("client/src/components/CookieConsent.tsx");

    expect(pricing).not.toContain("Most Popular");
    expect(cookieConsent).toContain('right: "1.5rem"');
    expect(cookieConsent).not.toContain('left: "50%"');
    expect(cookieConsent).not.toContain('translateX(-50%)');
  });

  it("ships the updated public metadata without a hype-led recommendation claim", () => {
    const html = source("client/index.html");
    const routeMetadata = source("shared/routeMetadata.ts");

    expect(html).toContain("We Keep the Light. You Steer.");
    expect(html).toContain("human judgment kept visible");
    expect(html).not.toContain("become the business AI recommends");
    expect(routeMetadata).toContain('title: "We Keep the Light. You Steer."');
    expect(routeMetadata).toContain("Start with The Watch");
  });
});

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath: string) =>
  readFileSync(path.join(projectRoot, relativePath), "utf8");

describe("Phase 2 one-design-system contract", () => {
  const pages = [
    "client/src/pages/TheWatchPage.tsx",
    "client/src/pages/PricingPage.tsx",
    "client/src/pages/DigitalGrandpaPage.tsx",
    "client/src/pages/DigitalGrandpaLibraryPage.tsx",
  ];

  it("uses the shared navigation, footer, and tokenized typography across every updated public surface", () => {
    for (const page of pages) {
      const content = source(page);
      expect(content, page).toContain("SharedNav");
      expect(content, page).toContain("SharedFooter");
      expect(content, page).toContain("var(--beacon-ui)");
      expect(content, page).toContain("var(--beacon-mono)");
    }
  });

  it("keeps the Watch and Pricing routes clear about price, path, and boundaries", () => {
    const watch = source("client/src/pages/TheWatchPage.tsx");
    const pricing = source("client/src/pages/PricingPage.tsx");

    expect(watch).toContain("$497 per year");
    expect(watch).toContain("not an investment");
    expect(pricing).toContain("Three routes, held apart on purpose");
    expect(pricing).toContain("Accounts, submitted details, payment information, and access do not transfer automatically");
    expect(pricing).toContain("Beacon Labs Signal Check");
  });

  it("keeps Digital Grandpa visually related but substantively separate and free of Beacon capture calls", () => {
    const digitalGrandpa = source("client/src/pages/DigitalGrandpaPage.tsx");
    const library = source("client/src/pages/DigitalGrandpaLibraryPage.tsx");
    const footer = source("client/src/components/SharedFooter.tsx");

    for (const content of [digitalGrandpa, library]) {
      expect(content).toContain("https://digitalgrandpa.org");
      expect(content).not.toContain("subscribeToBeaconBrief");
      expect(content).not.toContain("requestDigitalGrandpaLibraryInterest");
      expect(content).not.toContain("/assessment");
    }
    expect(digitalGrandpa).toContain("legacy and wisdom project");
    expect(library).toContain("not a storefront or a pre-order page");
    expect(footer).toContain("Digital Grandpa — Legacy, wisdom, and compassionate direction");
    expect(footer).toContain("https://digitalgrandpa.org");
  });

  it("publishes intentional title and description metadata for the Phase 2 destinations", () => {
    const metadata = source("shared/routeMetadata.ts");

    expect(metadata).toContain('"/pricing"');
    expect(metadata).toContain('title: "Choose Your Beacon Route"');
    expect(metadata).toContain('"/digital-grandpa"');
    expect(metadata).toContain('title: "Digital Grandpa"');
    expect(metadata).toContain('"/digital-grandpa/library"');
    expect(metadata).toContain('title: "The Porch Light Library"');
  });
});

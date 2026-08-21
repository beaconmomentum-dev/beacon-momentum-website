import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const sourceRoot = path.join(projectRoot, "client", "src");

function sourceFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(absolute);
    return /\.(tsx?|html)$/.test(entry.name) && !entry.name.endsWith(".test.ts")
      ? [absolute]
      : [];
  });
}

describe("Beacon parent identity contract", () => {
  const deployableSources = [
    ...sourceFiles(sourceRoot),
    path.join(projectRoot, "client", "index.html"),
  ];

  it("does not reference retired routeboard or legacy Beacon logo assets", () => {
    const combined = deployableSources
      .map((file) => fs.readFileSync(file, "utf8"))
      .join("\n");

    expect(combined).not.toContain("/images/home/beacon-routeboard-mark.webp");
    expect(combined).not.toContain("/icons/beacon-logo.webp");
    expect(combined).not.toContain("/icons/beacon-logo-hero.webp");
    expect(combined).not.toContain("Momentum · Field Systems");
  });

  it("uses the approved parent mark across canonical identity surfaces", () => {
    const parentMarkReferences = deployableSources.reduce((count, file) => {
      const source = fs.readFileSync(file, "utf8");
      return count + (source.match(/\/brand\/beacon-mark\.svg/g) ?? []).length;
    }, 0);

    expect(parentMarkReferences).toBeGreaterThanOrEqual(10);
    expect(fs.readFileSync(path.join(projectRoot, "client", "index.html"), "utf8"))
      .toContain("https://beaconmomentum.com/brand/beacon-mark-512.png");
  });

  it("uses the shared parent lockup on custom Watch and support headers", () => {
    const requiredRouteFiles = [
      "pages/TheWatchPage.tsx",
      "pages/TheWatchCheckoutPage.tsx",
      "pages/FoundationSupportPage.tsx",
      "pages/CohortDashboardPage.tsx",
    ];

    for (const relativePath of requiredRouteFiles) {
      const source = fs.readFileSync(path.join(sourceRoot, relativePath), "utf8");
      expect(source, relativePath).toContain("BeaconRouteLockup");
    }

    const lockup = fs.readFileSync(path.join(sourceRoot, "components", "BeaconRouteLockup.tsx"), "utf8");
    expect(lockup).toContain('/brand/beacon-mark.svg');
    expect(lockup).toContain('data-beacon-parent-lockup="true"');
  });
});

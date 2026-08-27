import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const clientRoot = path.resolve(import.meta.dirname, "..");
const sources = [
  "lib/ghl.ts",
  "pages/Assessment.tsx",
  "pages/BlogPage.tsx",
  "pages/DigitalGrandpaLibraryPage.tsx",
  "pages/DigitalGrandpaPage.tsx",
  "pages/StarterPackPage.tsx",
  "pages/TheWatchIntakePage.tsx",
  "pages/WatchBriefPremiumPage.tsx",
].map(file => fs.readFileSync(path.join(clientRoot, file), "utf8"));

describe("public capture credential boundary", () => {
  it("keeps HighLevel credentials and direct CRM endpoints out of browser source", () => {
    const clientSource = sources.join("\n");
    expect(clientSource).not.toContain("VITE_GHL_API_KEY");
    expect(clientSource).not.toContain("services.leadconnectorhq.com");
    expect(clientSource).toContain('/api/trpc/capture.submit?batch=1');
  });
});

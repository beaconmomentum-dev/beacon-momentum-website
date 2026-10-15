import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath: string) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

const EXPANSION_SIGNAL_IDS = [
  "can-it-do-it-or-may-it-do-it",
  "what-ai-demonstrations-prove-and-do-not",
  "the-work-behind-ai-you-can-see",
  "when-a-public-dashboard-is-not-intelligence",
  "a-business-model-is-not-a-business",
] as const;

describe("October 2026 Signal expansion release candidate", () => {
  it("registers each owner-review article in the Signal index and detail route", () => {
    const data = source("client/src/data/octoberSignalExpansion.ts");
    const index = source("client/src/pages/BlogPage.tsx");
    const article = source("client/src/pages/BlogArticlePage.tsx");

    expect(index).toContain("OCTOBER_SIGNAL_EXPANSION_SUMMARIES");
    expect(article).toContain("OCTOBER_SIGNAL_EXPANSION_CONTENT");

    for (const id of EXPANSION_SIGNAL_IDS) {
      expect(data).toContain(`\"id\": \"${id}\"`);
      expect(data).toContain(`/audio/signal/${id}.mp3`);
    }
  });

  it("provides page metadata, discovery, original visuals, narration, and evidence boundaries", () => {
    const data = source("client/src/data/octoberSignalExpansion.ts");
    const metadata = source("shared/routeMetadata.ts");
    const sitemap = source("client/public/sitemap.xml");

    expect(data).toContain("<h2>Sources and boundaries</h2>");
    expect(data).not.toContain("Private Article Release Candidate");
    expect(data).not.toContain("Source and claim ledger");

    for (const id of EXPANSION_SIGNAL_IDS) {
      expect(metadata).toContain(`\"/signal/${id}\"`);
      expect(sitemap).toContain(`https://beaconmomentum.com/signal/${id}`);
    }

    expect(data).toContain("/images/editorial/can-it-do-it-or-may-it-do-it.webp");
    expect(data).toContain("/images/editorial/a-business-model-is-not-a-business.webp");
  });
});

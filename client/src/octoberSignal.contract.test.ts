import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath: string) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

const OCTOBER_SIGNAL_IDS = [
  "a-claim-is-not-evidence",
  "before-you-connect-an-app",
  "a-disclosure-is-not-a-permission-slip",
  "what-an-ai-native-course-platform-has-to-prove",
] as const;

describe("October 2026 Signal release candidate", () => {
  it("registers every October article in the article data and Signal index", () => {
    const data = source("client/src/data/octoberEditorial.ts");
    const index = source("client/src/pages/BlogPage.tsx");
    const article = source("client/src/pages/BlogArticlePage.tsx");

    expect(index).toContain("OCTOBER_ARTICLE_SUMMARIES");
    expect(article).toContain("OCTOBER_ARTICLE_CONTENT");

    for (const id of OCTOBER_SIGNAL_IDS) {
      expect(data).toContain(`id: \"${id}\"`);
    }
  });

  it("provides server-rendered metadata and sitemap discovery for every October article", () => {
    const metadata = source("shared/routeMetadata.ts");
    const sitemap = source("client/public/sitemap.xml");

    for (const id of OCTOBER_SIGNAL_IDS) {
      expect(metadata).toContain(`\"/signal/${id}\"`);
      expect(sitemap).toContain(`https://beaconmomentum.com/signal/${id}`);
    }
  });

  it("keeps source and boundary sections in every October article", () => {
    const data = source("client/src/data/octoberEditorial.ts");
    const sectionCount = (data.match(/<h2>Sources and boundaries<\/h2>/g) || [])
      .length;
    const sourceListCount = (data.match(/class=\"beacon-source-list\"/g) || [])
      .length;

    expect(sectionCount).toBe(4);
    expect(sourceListCount).toBe(4);
  });
});

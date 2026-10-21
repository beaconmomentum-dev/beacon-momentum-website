import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(process.cwd());
const read = (relativePath: string) =>
  readFileSync(path.join(root, relativePath), "utf8");

const slug = "the-test-is-watching-you-back";
const route = `/signal/${slug}`;
const data = read("client/src/data/theTestIsWatchingYouBack.ts");
const index = read("client/src/pages/BlogPage.tsx");
const articlePage = read("client/src/pages/BlogArticlePage.tsx");
const app = read("client/src/App.tsx");
const metadata = read("shared/routeMetadata.ts");
const sitemap = read("client/public/sitemap.xml");

describe("The Test Is Watching You Back Signal article", () => {
  it("registers the approved article in the index and article reader", () => {
    expect(index).toContain("TEST_IS_WATCHING_SUMMARIES");
    expect(articlePage).toContain("TEST_IS_WATCHING_CONTENT");
    expect(data).toContain(slug);
    expect(data).toContain("Beacon Watch Brief: The Test Is Watching You Back");
    expect(app).toContain('path="/signal/:slug"');
  });

  it("provides route-specific metadata and sitemap discovery", () => {
    expect(metadata).toContain(`"${route}":`);
    expect(metadata).toContain("source-led look at reported AI agent activity");
    expect(sitemap).toContain(`https://beaconmomentum.com${route}`);
    expect(sitemap).toContain("<lastmod>2026-10-21</lastmod>");
  });

  it("retains the public education boundary and the complete 22-source bibliography", () => {
    expect(data).toContain("For educational purposes only.");
    expect(data).toContain(
      "This article is not an audit or certification of any Beacon system.",
    );
    expect(data).toContain("#main-content");
    const references = new Set(data.match(/ref-\d+/g) ?? []);
    expect(references.size).toBe(22);
    expect(data).toContain("Swarmchasers");
    expect(data).toContain("PHYSICS-Verified");
    expect(data).toContain("Anthropic Frontier Red Team");
  });
});

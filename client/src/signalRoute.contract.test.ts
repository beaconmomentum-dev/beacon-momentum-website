import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "../..");
const source = (relativePath: string) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

describe("The Signal canonical route contract", () => {
  it("serves Signal as the public editorial route and confines Blog to legacy redirects", () => {
    const app = source("client/src/App.tsx");
    const server = source("server/_core/index.ts");

    expect(app).toContain('<Route path="/signal/:slug" component={BlogArticlePage} />');
    expect(app).toContain('<Route path="/signal" component={BlogPage} />');
    expect(app).toContain('<Route path="/blog/:slug" component={LegacyBlogArticleRedirect} />');
    expect(app).toContain('<Route path="/blog" component={LegacyBlogIndexRedirect} />');
    expect(app).toContain('setLocation("/signal", { replace: true })');
    expect(app).toContain('setLocation(`/signal/${slug}`, { replace: true })');
    expect(server).toContain('app.get("/blog", (req, res) => {');
    expect(server).toContain('res.redirect(308, `/signal${legacySearch(req)}`)');
    expect(server).toContain('app.get("/blog/:slug", (req, res) => {');
    expect(server).toContain('res.redirect(308, `/signal/${req.params.slug}${legacySearch(req)}`)');
  });

  it("uses Signal for public navigation, editorial links, canonical metadata, and discovery surfaces", () => {
    const nav = source("client/src/components/SharedNav.tsx");
    const footer = source("client/src/components/SharedFooter.tsx");
    const index = source("client/src/pages/BlogPage.tsx");
    const article = source("client/src/pages/BlogArticlePage.tsx");
    const resources = source("client/src/pages/ResourcesPage.tsx");
    const premium = source("client/src/pages/WatchBriefPremiumPage.tsx");
    const sitemap = source("client/public/sitemap.xml");
    const html = source("client/index.html");

    expect(nav).toContain('{ label: "The Signal", href: "/signal" }');
    expect(footer).toContain('{ label: "The Signal", href: "/signal" }');
    expect(index).toContain('href={`/signal/${article.id}`}');
    expect(index).toContain('url: "/signal"');
    expect(article).toContain('url: article ? `/signal/${article.id}` : "/signal"');
    expect(article).toContain('href="/signal"');
    expect(resources).toContain('href: "/signal"');
    expect(premium).toContain('href="/signal"');
    expect(sitemap).toContain("https://beaconmomentum.com/signal");
    expect(sitemap).not.toContain("https://beaconmomentum.com/blog");
    expect(html).toContain("https://beaconmomentum.com/signal?q={search_term_string}");
  });
});

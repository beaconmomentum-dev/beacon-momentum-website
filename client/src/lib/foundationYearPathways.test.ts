import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const videoUrl = "https://www.youtube.com/watch?v=uJuvhPjcjO0";

describe("Foundation Year internal video pathways", () => {
  it("uses the canonical video URL and descriptive contextual copy on all approved pages", () => {
    const starterPack = readFileSync(resolve(root, "pages/StarterPackPage.tsx"), "utf8");
    const fieldNote = readFileSync(resolve(root, "pages/DigitalRampUpFieldNotePage.tsx"), "utf8");
    const article = readFileSync(resolve(root, "pages/BlogArticlePage.tsx"), "utf8");

    expect(starterPack).toContain(videoUrl);
    expect(starterPack).toContain("Prefer a short introduction first?");
    expect(fieldNote).toContain("note.slug === \"choose-the-right-door\"");
    expect(fieldNote).toContain(videoUrl);
    expect(article).toContain('article.id === "founders-framework-america-250"');
    expect(article).toContain(videoUrl);
  });
});

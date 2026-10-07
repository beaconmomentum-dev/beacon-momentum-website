import { describe, expect, it } from "vitest";
import {
  OCTOBER_ARTICLE_CONTENT,
  OCTOBER_ARTICLE_SUMMARIES,
} from "@/data/octoberEditorial";

describe("October editorial batch", () => {
  it("ships four unique, source-bounded Signal articles", () => {
    expect(OCTOBER_ARTICLE_CONTENT).toHaveLength(4);
    expect(
      new Set(OCTOBER_ARTICLE_CONTENT.map((article) => article.id)).size,
    ).toBe(4);
    expect(
      OCTOBER_ARTICLE_CONTENT.every((article) => article.body.length > 500),
    ).toBe(true);
  });

  it("attaches an article-owned MP3, transcript, and caption track to every post", () => {
    expect(
      OCTOBER_ARTICLE_CONTENT.every((article) =>
        article.audioSrc?.endsWith(`${article.id}.mp3`),
      ),
    ).toBe(true);
    expect(
      OCTOBER_ARTICLE_CONTENT.every((article) =>
        article.transcriptSrc?.endsWith(`${article.id}.txt`),
      ),
    ).toBe(true);
    expect(
      OCTOBER_ARTICLE_CONTENT.every((article) =>
        article.captionSrc?.endsWith(`${article.id}.vtt`),
      ),
    ).toBe(true);
  });

  it("uses responsive evidence cards for the three-column claim comparison", () => {
    const article = OCTOBER_ARTICLE_CONTENT.find(
      (candidate) => candidate.id === "a-claim-is-not-evidence",
    );
    expect(article?.body).toContain('class="beacon-evidence-grid"');
    expect(article?.body).not.toContain("<table>");
  });

  it("keeps article summaries aligned with full article records", () => {
    expect(OCTOBER_ARTICLE_SUMMARIES.map((article) => article.id)).toEqual(
      OCTOBER_ARTICLE_CONTENT.map((article) => article.id),
    );
  });
});

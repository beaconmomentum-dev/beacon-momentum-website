import { describe, expect, it } from "vitest";
import {
  AUGUST_ARTICLE_CONTENT,
  AUGUST_ARTICLE_SUMMARIES,
} from "@/data/augustEditorial";

describe("August editorial batch", () => {
  it("ships fourteen unique, source-bounded articles", () => {
    expect(AUGUST_ARTICLE_CONTENT).toHaveLength(14);
    expect(new Set(AUGUST_ARTICLE_CONTENT.map((article) => article.id)).size).toBe(14);
    expect(AUGUST_ARTICLE_CONTENT.every((article) => article.body.length > 500)).toBe(true);
  });

  it("assigns every article a compliant existing editorial asset", () => {
    const isApprovedAsset = (path?: string) => Boolean(path?.endsWith("-16x9.webp") || path?.endsWith("-poster.jpg"));
    expect(AUGUST_ARTICLE_CONTENT.every((article) => isApprovedAsset(article.heroImage))).toBe(true);
    expect(AUGUST_ARTICLE_SUMMARIES.every((article) => isApprovedAsset(article.thumbnail))).toBe(true);
  });

  it("attaches an article-owned MP3, transcript, and caption track to every August post", () => {
    expect(AUGUST_ARTICLE_CONTENT.every((article) => article.audioSrc?.endsWith(`${article.id}.mp3`))).toBe(true);
    expect(AUGUST_ARTICLE_CONTENT.every((article) => article.transcriptSrc?.endsWith(`${article.id}.txt`))).toBe(true);
    expect(AUGUST_ARTICLE_CONTENT.every((article) => article.captionSrc?.endsWith(`${article.id}.vtt`))).toBe(true);
  });

  it("keeps article summaries aligned with the full article records", () => {
    expect(AUGUST_ARTICLE_SUMMARIES.map((article) => article.id)).toEqual(
      AUGUST_ARTICLE_CONTENT.map((article) => article.id),
    );
  });
});

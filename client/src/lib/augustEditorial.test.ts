import { describe, expect, it } from "vitest";
import {
  AUGUST_ARTICLE_CONTENT,
  AUGUST_ARTICLE_SUMMARIES,
} from "@/data/augustEditorial";

describe("August editorial batch", () => {
  it("ships ten unique, source-bounded articles", () => {
    expect(AUGUST_ARTICLE_CONTENT).toHaveLength(10);
    expect(new Set(AUGUST_ARTICLE_CONTENT.map((article) => article.id)).size).toBe(10);
    expect(AUGUST_ARTICLE_CONTENT.every((article) => article.body.length > 500)).toBe(true);
  });

  it("assigns every article a compliant existing 16:9 editorial asset", () => {
    expect(AUGUST_ARTICLE_CONTENT.every((article) => article.heroImage.endsWith("-16x9.webp"))).toBe(true);
    expect(AUGUST_ARTICLE_SUMMARIES.every((article) => article.thumbnail?.endsWith("-16x9.webp"))).toBe(true);
  });

  it("keeps article summaries aligned with the full article records", () => {
    expect(AUGUST_ARTICLE_SUMMARIES.map((article) => article.id)).toEqual(
      AUGUST_ARTICLE_CONTENT.map((article) => article.id),
    );
  });
});

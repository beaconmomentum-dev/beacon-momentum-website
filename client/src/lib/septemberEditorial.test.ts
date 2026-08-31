import { describe, expect, it } from "vitest";
import {
  SEPTEMBER_ARTICLE_CONTENT,
  SEPTEMBER_ARTICLE_SUMMARIES,
} from "@/data/septemberEditorial";

describe("Founder-approved September Signal articles", () => {
  it("ships two unique, source-bounded full articles", () => {
    expect(SEPTEMBER_ARTICLE_CONTENT).toHaveLength(2);
    expect(new Set(SEPTEMBER_ARTICLE_CONTENT.map((article) => article.id)).size).toBe(2);
    expect(SEPTEMBER_ARTICLE_CONTENT.every((article) => article.body.length > 3_000)).toBe(true);
    expect(SEPTEMBER_ARTICLE_CONTENT.every((article) => article.body.includes("Sources and boundaries"))).toBe(true);
  });

  it("keeps public summaries aligned with their canonical detail records", () => {
    expect(SEPTEMBER_ARTICLE_SUMMARIES.map((article) => article.id)).toEqual(
      SEPTEMBER_ARTICLE_CONTENT.map((article) => article.id),
    );
  });

  it("keeps the approved interpretation and youth-evidence boundaries visible", () => {
    const [youngAdults, ancientText] = SEPTEMBER_ARTICLE_CONTENT;
    expect(youngAdults.body).toContain("not a survey of young adults");
    expect(ancientText.body).toContain("did not “decode” a hidden message");
    expect(ancientText.body).toContain("probabilistic");
  });
});

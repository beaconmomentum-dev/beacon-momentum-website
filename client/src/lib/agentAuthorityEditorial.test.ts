import { describe, expect, it } from "vitest";
import {
  AGENT_AUTHORITY_ARTICLE_CONTENT,
  AGENT_AUTHORITY_ARTICLE_SUMMARIES,
} from "@/data/agentAuthorityEditorial";

describe("agent-authority Signal candidate", () => {
  const article = AGENT_AUTHORITY_ARTICLE_CONTENT[0];

  it("has a unique public route record and bounded source treatment", () => {
    expect(article.id).toBe("can-this-agent-do-it-or-may-it-do-it");
    expect(article.body.length).toBeGreaterThan(500);
    expect(article.body).toContain("Vendor documentation is cited");
    expect(article.body).toContain('id="source-1"');
    expect(article.body).toContain("AI Risk Management Framework");
  });

  it("reserves article-owned listening and accessibility assets", () => {
    expect(article.audioSrc?.endsWith(`${article.id}.mp3`)).toBe(true);
    expect(article.transcriptSrc?.endsWith(`${article.id}.txt`)).toBe(true);
    expect(article.captionSrc?.endsWith(`${article.id}.vtt`)).toBe(true);
  });

  it("keeps its index summary aligned with the article record", () => {
    expect(AGENT_AUTHORITY_ARTICLE_SUMMARIES).toHaveLength(1);
    expect(AGENT_AUTHORITY_ARTICLE_SUMMARIES[0].id).toBe(article.id);
  });
});

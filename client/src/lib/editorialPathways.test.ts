import { describe, expect, it } from "vitest";
import { AUGUST_ARTICLE_CONTENT } from "@/data/augustEditorial";
import { getEditorialPathway } from "@/lib/editorialPathways";

describe("August editorial pathways", () => {
  it("gives every August article one contextual Beacon destination", () => {
    const pathways = AUGUST_ARTICLE_CONTENT.map((article) => getEditorialPathway(article.id));

    expect(pathways).toHaveLength(14);
    expect(pathways.every((pathway) => pathway.href.startsWith("/"))).toBe(true);
    expect(pathways.every((pathway) => pathway.cta.length > 0)).toBe(true);
  });

  it("routes control lessons to the workflow kit and systems lessons to How Beacon Works", () => {
    expect(getEditorialPathway("five-questions-keep-you-in-charge").href).toBe(
      "/the-watch/controlled-ai-workflow-kit",
    );
    expect(getEditorialPathway("ai-capability-needs-a-home").href).toBe(
      "/how-beacon-works",
    );
    expect(getEditorialPathway("membership-is-not-a-shortcut-to-community").href).toBe(
      "/the-watch",
    );
    expect(getEditorialPathway("the-ai-check-kite").href).toBe("/the-watch");
  });
});

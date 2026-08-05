import { describe, expect, it } from "vitest";
import { getArticleAudioSource, showIndexPlaybackControl } from "./blogMediaPolicy";

describe("blog media policy", () => {
  it("resolves either legacy article audio field for the owning article page", () => {
    expect(getArticleAudioSource({ audioFile: "/audio/brief.mp3" })).toBe("/audio/brief.mp3");
    expect(getArticleAudioSource({ audioSrc: "/audio/article.mp3", audioFile: "/audio/legacy.mp3" })).toBe("/audio/article.mp3");
  });

  it("keeps playback controls off linked Signal index cards", () => {
    expect(showIndexPlaybackControl()).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import {
  ARTICLE_AUDIO_RELEASE_HOLDS,
  BEACON_EDITORIAL_IMAGE_ASPECT_RATIO,
  getArticleAudioSource,
  showIndexPlaybackControl,
} from "./blogMediaPolicy";

const approvedReplacementIds = [
  "the-cloud-has-a-seabed",
  "what-anthropic-ai-safety-incidents-actually-show",
  "watch-brief-browser-privacy",
  "watch-brief-grok-china-ai-race",
  "watch-brief-2d-materials",
  "watch-brief-cream-5-pro",
  "watch-brief-windows-11-local-accounts",
  "watch-brief-gemini-5",
  "watch-brief-gemini-10m-tokens",
  "watch-brief-higgsfield-gemini-omni",
  "watch-brief-confabulation-problem-part-two",
  "watch-brief-chatgpt-ad-floor",
  "watch-brief-china-flying-car",
  "watch-brief-ocean-floor-data-center",
  "watch-wall-is-real",
  "watch-brief-open-weight-wildcard-minimax",
  "watch-brief-ai-reasoning-faithfulness",
  "watch-brief-throne-room-algorithm",
  "beacon-watch-throne-room-architecture",
  "watch-brief-grok-accountability-gap",
].sort();

describe("blog media policy", () => {
  it("resolves either legacy article audio field for the owning article page", () => {
    expect(getArticleAudioSource({ audioFile: "/audio/brief.mp3" })).toBe(
      "/audio/brief.mp3",
    );
    expect(
      getArticleAudioSource({
        audioSrc: "/audio/article.mp3",
        audioFile: "/audio/legacy.mp3",
      }),
    ).toBe("/audio/article.mp3");
  });

  it("keeps playback controls off linked Signal index cards", () => {
    expect(showIndexPlaybackControl()).toBe(false);
  });

  it("releases the 20 owner-approved replacement routes with no active holds", () => {
    expect(Object.keys(ARTICLE_AUDIO_RELEASE_HOLDS)).toEqual([]);

    for (const id of approvedReplacementIds) {
      const source =
        id === "the-cloud-has-a-seabed" ||
        id === "what-anthropic-ai-safety-incidents-actually-show"
          ? `/audio/signal/${id}.mp3`
          : `/audio/${id}.mp3`;
      expect(getArticleAudioSource({ id, audioSrc: source })).toBe(source);
    }
  });

  it("keeps the two independently verified full narrations and other non-held audio", () => {
    expect(
      getArticleAudioSource({
        id: "ai-work-you-should-not-automate",
        audioSrc: "/audio/ai-work-you-should-not-automate.mp3",
      }),
    ).toBe("/audio/ai-work-you-should-not-automate.mp3");
    expect(
      getArticleAudioSource({
        id: "provenance-is-the-new-professionalism",
        audioFile: "/audio/provenance-is-the-new-professionalism.mp3",
      }),
    ).toBe("/audio/provenance-is-the-new-professionalism.mp3");
    expect(
      getArticleAudioSource({
        id: "unreviewed-but-not-flagged",
        audioSrc: "/audio/other.mp3",
      }),
    ).toBe("/audio/other.mp3");

    const upstreamRepairedAudio = [
      {
        id: "young-adults-already-in-the-ai-conversation",
        audioSrc: "/audio/signal/young-adults-already-in-the-ai-conversation.mp3",
      },
      { id: "the-ai-check-kite", audioSrc: "/audio/august/the-ai-check-kite.mp3" },
      { id: "65-percent-of-founders", audioSrc: "/audio/august/65-percent-of-founders.mp3" },
      { id: "the-collective-illusion", audioSrc: "/audio/august/the-collective-illusion.mp3" },
      { id: "300000-empty-seats", audioSrc: "/audio/august/300000-empty-seats.mp3" },
    ];
    for (const article of upstreamRepairedAudio) {
      expect(getArticleAudioSource(article)).toBe(article.audioSrc);
    }
  });

  it("holds future editorial filings to the approved 16:9 card frame", () => {
    expect(BEACON_EDITORIAL_IMAGE_ASPECT_RATIO).toBe("16 / 9");
  });

  it("keeps approved audio disclosure and transcript/caption URLs with route media", () => {
    const media = {
      id: "approved-signal-audio",
      audioSrc: "/audio/approved-signal-audio.mp3",
      transcriptSrc: "/audio/signal/transcripts/approved-signal-audio.txt",
      captionSrc: "/audio/signal/captions/approved-signal-audio.vtt",
      audioDisclosure: "AI-generated narration using a synthetic, non-cloned voice.",
    };
    expect(getArticleAudioSource(media)).toBe(media.audioSrc);
    expect(media.transcriptSrc).toContain("/transcripts/");
    expect(media.captionSrc).toContain("/captions/");
    expect(media.audioDisclosure).toContain("AI-generated narration");
  });
});

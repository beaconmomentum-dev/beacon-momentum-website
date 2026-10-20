export type ArticleMedia = {
  audioSrc?: string;
  audioFile?: string;
  id?: string;
};

/** The shared index frame used by all future Beacon editorial filing masters. */
export const BEACON_EDITORIAL_IMAGE_ASPECT_RATIO = "16 / 9";

/**
 * Temporary public-release holds from the 2026-10-20 print/audio audit.
 * Restore a player only after a complete replacement narration has been checked
 * against the current article text and its final captions.
 */
export const ARTICLE_AUDIO_RELEASE_HOLDS = Object.freeze({
  "the-cloud-has-a-seabed": "confirmed-mismatch",
  "what-anthropic-ai-safety-incidents-actually-show": "confirmed-mismatch",
  "watch-brief-browser-privacy": "confirmed-mismatch",
  "watch-brief-grok-china-ai-race": "confirmed-mismatch",
  "watch-brief-2d-materials": "confirmed-mismatch",
  "watch-brief-cream-5-pro": "confirmed-mismatch",
  "watch-brief-windows-11-local-accounts": "confirmed-mismatch",
  "watch-brief-gemini-5": "confirmed-mismatch",
  "watch-brief-gemini-10m-tokens": "confirmed-mismatch",
  "watch-brief-higgsfield-gemini-omni": "confirmed-mismatch",
  "watch-brief-confabulation-problem-part-two": "confirmed-mismatch",
  "watch-brief-chatgpt-ad-floor": "confirmed-mismatch",
  "watch-brief-china-flying-car": "confirmed-mismatch",
  "watch-brief-ocean-floor-data-center": "confirmed-mismatch",
  "watch-wall-is-real": "confirmed-mismatch",
  "watch-brief-open-weight-wildcard-minimax": "confirmed-mismatch",
  "watch-brief-ai-reasoning-faithfulness": "confirmed-mismatch",
  "watch-brief-throne-room-algorithm": "confirmed-mismatch",
  "beacon-watch-throne-room-architecture": "confirmed-mismatch",
  "watch-brief-grok-accountability-gap": "confirmed-mismatch",
} as const);

/**
 * Audio is an article-level experience. Normalize the two legacy source fields
 * so a narrated article can present its control on its own route.
 */
export function getArticleAudioSource(article: ArticleMedia): string | null {
  if (
    article.id &&
    Object.prototype.hasOwnProperty.call(ARTICLE_AUDIO_RELEASE_HOLDS, article.id)
  ) {
    return null;
  }

  return article.audioSrc || article.audioFile || null;
}

/**
 * The Signal index is a reading route. Media controls belong to the article
 * that owns the corresponding narration, rather than a linked card.
 */
export function showIndexPlaybackControl(): false {
  return false;
}

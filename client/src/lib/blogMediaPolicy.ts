export type ArticleMedia = {
  audioSrc?: string;
  audioFile?: string;
};

/**
 * Audio is an article-level experience. Normalize the two legacy source fields
 * so a narrated article can present its control on its own route.
 */
export function getArticleAudioSource(article: ArticleMedia): string | null {
  return article.audioSrc || article.audioFile || null;
}

/**
 * The Signal index is a reading route. Media controls belong to the article
 * that owns the corresponding narration, rather than a linked card.
 */
export function showIndexPlaybackControl(): false {
  return false;
}

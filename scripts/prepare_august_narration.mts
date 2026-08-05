import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { AUGUST_ARTICLE_CONTENT } from "../client/src/data/augustEditorial";

const outputDir = join(process.cwd(), "client/public/audio/august");
const transcriptDir = join(outputDir, "transcripts");

mkdirSync(transcriptDir, { recursive: true });

function spokenText(html: string) {
  return html
    .replace(/<h2>(.*?)<\/h2>/g, "\n\n$1.\n")
    .replace(/<p[^>]*>(.*?)<\/p>/g, "\n\n$1")
    .replace(/<a[^>]*>(.*?)<\/a>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "and")
    .replace(/&mdash;/g, "—")
    .replace(/\s+/g, " ")
    .replace(/\s*\.\s*/g, ". ")
    .trim();
}

for (const article of AUGUST_ARTICLE_CONTENT) {
  const text = `${article.title}.\n\n${spokenText(article.body)}`;
  writeFileSync(join(transcriptDir, `${article.id}.txt`), `${text}\n`, "utf8");
}

writeFileSync(
  join(outputDir, "AUGUST_NARRATION_MANIFEST.json"),
  JSON.stringify(
    AUGUST_ARTICLE_CONTENT.map((article) => ({
      id: article.id,
      title: article.title,
      transcript: `/audio/august/transcripts/${article.id}.txt`,
      audio: `/audio/august/${article.id}.mp3`,
      caption: `/audio/august/captions/${article.id}.vtt`,
    })),
    null,
    2,
  ) + "\n",
  "utf8",
);

console.log(`Prepared ${AUGUST_ARTICLE_CONTENT.length} narration scripts in ${transcriptDir}`);

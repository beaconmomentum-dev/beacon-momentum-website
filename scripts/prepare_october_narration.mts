import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OCTOBER_ARTICLE_CONTENT } from "../client/src/data/octoberEditorial";

const outputDir = join(process.cwd(), "client/public/audio/october");
const transcriptDir = join(outputDir, "transcripts");

mkdirSync(transcriptDir, { recursive: true });

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "and")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function spokenText(html: string) {
  return decodeEntities(
    html
      .replace(/<sup[^>]*>[\s\S]*?<\/sup>/g, "")
      .replace(/<br\s*\/?\s*>/g, "\n")
      .replace(/<\/(?:p|h2|h3|li|dt|dd|div|blockquote|ol|ul)>/g, "\n\n")
      .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, "$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n[ \t]+/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim(),
  );
}

const manifest = OCTOBER_ARTICLE_CONTENT.map((article) => {
  const text = `${article.title}.\n\n${spokenText(article.body)}`;
  writeFileSync(join(transcriptDir, `${article.id}.txt`), `${text}\n`, "utf8");

  return {
    id: article.id,
    title: article.title,
    transcript: `/audio/october/transcripts/${article.id}.txt`,
    audio: `/audio/october/${article.id}.mp3`,
    caption: `/audio/october/captions/${article.id}.vtt`,
    voice: "am_puck",
    voiceClone: false,
    source: "October Signal article body, generated locally",
  };
});

writeFileSync(
  join(outputDir, "OCTOBER_NARRATION_MANIFEST.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(
  `Prepared ${manifest.length} October narration transcripts in ${transcriptDir}`,
);

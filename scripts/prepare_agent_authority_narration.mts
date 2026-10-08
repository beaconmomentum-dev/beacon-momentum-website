import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { AGENT_AUTHORITY_ARTICLE_CONTENT } from "../client/src/data/agentAuthorityEditorial";

const outputDir = join(process.cwd(), "client/public/audio/agent-authority");
const transcriptDir = join(outputDir, "transcripts");

function spokenText(html: string) {
  return html
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/g, "")
    .replace(/<br\s*\/?\s*>/g, "\n")
    .replace(/<\/(?:p|h2|h3|h4|li|dt|dd|div|blockquote|ol|ul)>/g, "\n\n")
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "and")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

mkdirSync(transcriptDir, { recursive: true });

const manifest = AGENT_AUTHORITY_ARTICLE_CONTENT.map((article) => {
  const text = `${article.title}.\n\n${spokenText(article.body)}`;
  writeFileSync(join(transcriptDir, `${article.id}.txt`), `${text}\n`, "utf8");
  return {
    id: article.id,
    title: article.title,
    transcript: article.transcriptSrc,
    audio: article.audioSrc,
    caption: article.captionSrc,
    voice: "am_puck",
    source:
      "Beacon Signal article body; local narration required before release",
  };
});

writeFileSync(
  join(outputDir, "AGENT_AUTHORITY_NARRATION_MANIFEST.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(
  `Prepared ${manifest.length} agent-authority narration transcript.`,
);

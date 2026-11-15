import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(process.cwd(), "client/src");
const source = (relativePath: string) =>
  readFileSync(path.join(root, relativePath), "utf8");

const app = source("App.tsx");
const page = source("pages/ModelRumorLiteracyPage.tsx");
const metadata = readFileSync(
  path.resolve(process.cwd(), "shared/routeMetadata.ts"),
  "utf8",
);
const sitemap = readFileSync(
  path.resolve(process.cwd(), "client/public/sitemap.xml"),
  "utf8",
);

const legacySignalIds = [
  "young-adults-already-in-the-ai-conversation",
  "when-the-past-gains-new-light",
  "five-questions-keep-you-in-charge",
  "ai-capability-needs-a-home",
  "dependency-ladder-what-lives-closest-to-home",
  "what-17600-actions-teach-us-about-ai-control",
  "rare-earth-lesson-for-a-small-team",
  "provenance-is-the-new-professionalism",
  "ai-work-you-should-not-automate",
  "membership-is-not-a-shortcut-to-community",
  "build-recovery-plan-before-you-need-it",
  "quiet-advantage-of-a-system-you-can-explain",
  "the-ai-check-kite",
  "65-percent-of-founders",
  "the-collective-illusion",
  "300000-empty-seats",
];

describe("The Model Rumor Is Not the Model public route", () => {
  it("registers the route, metadata, sitemap entry, and accessible page content", () => {
    const route = "/labs/the-model-rumor-is-not-the-model";
    expect(app).toContain(`path="${route}"`);
    expect(metadata).toContain(`"${route}":`);
    expect(sitemap).toContain(`https://beaconmomentum.com${route}`);
    expect(page).toContain("id=\"main-content\"");
    expect(page).toContain("The Model Rumor Is Not the Model.");
    expect(page).toContain("A model rumor can be worth watching. It is not yet a model evaluation.");
  });

  it("keeps every remaining legacy Signal article in the canonical metadata and sitemap registries", () => {
    for (const id of legacySignalIds) {
      expect(metadata, `missing metadata for ${id}`).toContain(`/signal/${id}`);
      expect(sitemap, `missing sitemap entry for ${id}`).toContain(
        `https://beaconmomentum.com/signal/${id}`,
      );
    }
  });
});

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  beaconUmamiBeforeSend,
  buildSignalCampaignUrl,
} from "./beaconAnalytics";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const source = (relativePath: string) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

describe("Beacon first-party analytics", () => {
  it("builds a bounded UTM link for an approved launch channel", () => {
    expect(
      buildSignalCampaignUrl(
        "/signal/can-it-do-it-or-may-it-do-it",
        "linkedin",
        "authority_article",
      ),
    ).toBe(
      "https://beaconmomentum.com/signal/can-it-do-it-or-may-it-do-it?utm_source=linkedin&utm_medium=organic_social&utm_campaign=signal_oct_2026&utm_content=authority_article",
    );
  });

  it("keeps campaign parameters but removes arbitrary URL and referrer queries", () => {
    expect(
      beaconUmamiBeforeSend("event", {
        url: "https://beaconmomentum.com/signal/example?email=private@example.com&utm_source=linkedin&utm_campaign=signal_oct_2026#listen",
        referrer: "https://example.org/article?reader=private",
      }),
    ).toEqual({
      url: "https://beaconmomentum.com/signal/example?utm_source=linkedin&utm_campaign=signal_oct_2026",
      referrer: "https://example.org/article",
    });
  });

  it("defers Umami until an affirmative preference and limits Signal event properties", () => {
    const analytics = source("client/src/lib/beaconAnalytics.ts");
    const consent = source("client/src/components/CookieConsent.tsx");
    const article = source("client/src/pages/BlogArticlePage.tsx");
    const html = source("client/index.html");

    expect(html).not.toContain('data-website-id="ac5cc381-7386-4841-aa9a-212f31a6ab38"');
    expect(consent).toContain('setBeaconAnalyticsConsent("granted")');
    expect(consent).toContain('setBeaconAnalyticsConsent("denied")');
    expect(analytics).toContain('getBeaconAnalyticsConsent() !== "granted"');
    expect(article).toContain('trackBeaconEvent("signal_audio_play"');
    expect(article).toContain('trackBeaconEvent(`signal_audio_${threshold}`');
    expect(article).toContain('trackBeaconEvent("signal_audio_complete"');
    expect(article).toContain('trackBeaconEvent(`signal_read_${threshold}`');
    expect(article).toContain('article_slug: article.id');
  });
});

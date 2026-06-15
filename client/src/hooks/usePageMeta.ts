/**
 * Beacon Momentum — usePageMeta hook
 * Design: Deep Water Editorial / Quiet Authority
 *
 * Dynamically sets <title>, meta description, and Open Graph / Twitter Card
 * tags for each page. Since this is a static SPA, OG tags in <head> are set
 * at runtime — they work for link unfurling on platforms that execute JS
 * (Slack, Discord, iMessage, WhatsApp). For Twitter/X and LinkedIn, which
 * crawl the raw HTML, the default tags in index.html serve as fallback.
 *
 * For full static OG support on all crawlers, a prerender/SSG step would be
 * needed — documented in the workflow guide for future consideration.
 */

import { useEffect } from "react";

export interface PageMetaOptions {
  title: string;
  description: string;
  /** Absolute URL of the OG image (1200×630 recommended) */
  image?: string;
  /** Canonical URL for this page */
  url?: string;
  /** og:type — defaults to "website" */
  type?: string;
}

const SITE_NAME = "Beacon Momentum";
const DEFAULT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/beacon-og-default.webp";
const SITE_URL = "https://beaconmomentum.com";

function setMeta(property: string, content: string, attr: "name" | "property" = "property") {
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, image, url, type = "website" }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE_NAME}`;
    const ogImage = image || DEFAULT_IMAGE;
    const ogUrl = url ? `${SITE_URL}${url}` : SITE_URL;

    // <title>
    document.title = fullTitle;

    // Standard meta
    setMeta("description", description, "name");

    // Open Graph
    setMeta("og:site_name", SITE_NAME);
    setMeta("og:type", type);
    setMeta("og:title", fullTitle);
    setMeta("og:description", description);
    setMeta("og:image", ogImage);
    setMeta("og:image:width", "1200");
    setMeta("og:image:height", "630");
    setMeta("og:url", ogUrl);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:site", "@BeaconMomentum", "name");
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", ogImage, "name");

    // Canonical link
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link") as HTMLLinkElement;
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = ogUrl;
  }, [title, description, image, url, type]);
}

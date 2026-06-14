/**
 * Beacon Momentum — Cloudflare Worker: Static OG Tag Injector
 * ============================================================
 * Intercepts requests to /path/:pillar and /assessment, fetches the
 * underlying HTML from the origin, and rewrites the <head> with
 * pillar-specific Open Graph and Twitter Card meta tags before
 * returning the response to the crawler.
 *
 * This makes Twitter/X and LinkedIn (which crawl raw HTML without
 * executing JavaScript) see the correct pillar-specific preview card.
 *
 * DEPLOYMENT INSTRUCTIONS
 * -----------------------
 * 1. In Cloudflare Dashboard → Workers & Pages → Create Worker
 * 2. Paste this entire file as the Worker script
 * 3. Deploy the Worker
 * 4. In the Worker's Settings → Triggers → Add Route:
 *    Route: beaconmomentum.com/path/*
 *    Route: beaconmomentum.com/assessment
 *    Zone: beaconmomentum.com
 * 5. That's it. The Worker will intercept those routes and inject
 *    static OG tags before returning the HTML to crawlers.
 *
 * TESTING
 * -------
 * Use https://cards-dev.twitter.com/validator and
 * https://www.linkedin.com/post-inspector/ to verify the previews.
 * Also test with: curl -A "Twitterbot/1.0" https://beaconmomentum.com/path/labs
 */

const SITE_NAME = "Beacon Momentum";
const SITE_URL = "https://beaconmomentum.com";
const TWITTER_HANDLE = "@BeaconMomentum";

// Per-pillar OG data
const PILLAR_META = {
  life: {
    title: "Beacon Life — Your Beacon Path",
    description: "Someone in your network found their path through the AI transition — Beacon Life. Find out which Beacon pillar fits where you are right now.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/og-life-FQ3ey9FaPNfc5rqouPSmNL.png",
  },
  work: {
    title: "Beacon Work — Your Beacon Path",
    description: "Someone in your network found their path through the AI transition — Beacon Work. Find out which Beacon pillar fits where you are right now.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/og-work-dD6Uvk4JAuvTq3c5vVyjBB.png",
  },
  venture: {
    title: "Beacon Venture — Your Beacon Path",
    description: "Someone in your network found their path through the AI transition — Beacon Venture. Find out which Beacon pillar fits where you are right now.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/og-venture-kWSMizJFcoHyUqpMxRmQtT.png",
  },
  systems: {
    title: "Beacon Systems — Your Beacon Path",
    description: "Someone in your network found their path through the AI transition — Beacon Systems. Find out which Beacon pillar fits where you are right now.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/og-systems-TQ2tMDehgW88pfL2k2RCDe.png",
  },
  labs: {
    title: "Beacon Labs — Your Beacon Path",
    description: "Someone in your network found their path through the AI transition — Beacon Labs. Find out which Beacon pillar fits where you are right now.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/og-labs-bLbmwGXypqawxuCgyHLx8H.png",
  },
};

const ASSESSMENT_META = {
  title: "Beacon Pathfinder Assessment",
  description: "Discover which Beacon Momentum pillar fits where you are right now. 7 questions, 3 minutes, no email required to see your result.",
  image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/og-life-FQ3ey9FaPNfc5rqouPSmNL.png",
};

/**
 * Build the <head> meta tag block to inject.
 */
function buildMetaTags(meta, canonicalUrl) {
  const fullTitle = `${meta.title} — ${SITE_NAME}`;
  return `
    <!-- Beacon OG Worker Injection -->
    <title>${fullTitle}</title>
    <meta name="description" content="${meta.description}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${fullTitle}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:image" content="${meta.image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="${canonicalUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${TWITTER_HANDLE}">
    <meta name="twitter:title" content="${fullTitle}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${meta.image}">
    <link rel="canonical" href="${canonicalUrl}">
    <!-- /Beacon OG Worker Injection -->
  `;
}

/**
 * HTMLRewriter handler that strips existing OG/title tags and injects new ones.
 */
class OGInjector {
  constructor(metaTags) {
    this.metaTags = metaTags;
    this.injected = false;
  }

  element(element) {
    // Remove existing title, description, og:*, twitter:* tags
    const name = element.getAttribute("name") || "";
    const property = element.getAttribute("property") || "";
    const tagName = element.tagName.toLowerCase();

    if (tagName === "title") {
      element.remove();
      return;
    }

    if (
      tagName === "meta" &&
      (
        name === "description" ||
        name.startsWith("twitter:") ||
        property.startsWith("og:") ||
        property === "fb:app_id"
      )
    ) {
      element.remove();
      return;
    }

    if (tagName === "link" && element.getAttribute("rel") === "canonical") {
      element.remove();
      return;
    }
  }
}

class HeadOpener {
  constructor(metaTags) {
    this.metaTags = metaTags;
  }

  element(element) {
    // Inject our tags right after <head>
    element.append(this.metaTags, { html: true });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();

    // Determine which meta to inject
    let meta = null;
    let canonicalUrl = null;

    if (pathname.startsWith("/path/")) {
      const pillar = pathname.replace("/path/", "").split("/")[0];
      if (PILLAR_META[pillar]) {
        meta = PILLAR_META[pillar];
        canonicalUrl = `${SITE_URL}/path/${pillar}`;
      }
    } else if (pathname === "/assessment" || pathname === "/assessment/") {
      meta = ASSESSMENT_META;
      canonicalUrl = `${SITE_URL}/assessment`;
    }

    // If no matching route, pass through unchanged
    if (!meta) {
      return fetch(request);
    }

    // Fetch the underlying HTML from origin
    const response = await fetch(request);

    // Only rewrite HTML responses
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const metaTags = buildMetaTags(meta, canonicalUrl);

    // Use HTMLRewriter to surgically inject tags
    return new HTMLRewriter()
      .on("title", new OGInjector(metaTags))
      .on("meta", new OGInjector(metaTags))
      .on("link[rel='canonical']", new OGInjector(metaTags))
      .on("head", new HeadOpener(metaTags))
      .transform(response);
  },
};

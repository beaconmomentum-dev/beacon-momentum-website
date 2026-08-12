export const BEACON_SITE_URL = "https://beaconmomentum.com";
export const BEACON_SITE_NAME = "Beacon Momentum";
export const DEFAULT_SOCIAL_IMAGE = `${BEACON_SITE_URL}/images/home/beacon-routeboard-hero.webp`;

export interface RouteMetadata {
  /** Title without the Beacon Momentum suffix. */
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
}

const DEFAULT_METADATA: RouteMetadata = {
  title: "Find a Steadier Next Move.",
  description:
    "Beacon Momentum is a public orientation point for people navigating transition, building durable work, and studying modern financial systems with care.",
  image: DEFAULT_SOCIAL_IMAGE,
};

const ROUTE_METADATA: Record<string, RouteMetadata> = {
  "/": DEFAULT_METADATA,
  "/about": {
    title: "About Beacon Momentum",
    description:
      "Learn how Beacon Momentum helps people build durable capability, navigate transition, and make practical decisions with care.",
  },
  "/community-build-grant": {
    title: "Community Build Grant",
    description:
      "Beacon Momentum's Community Build Grant separates free random selection from a practical purpose package for verified recipients.",
  },
  "/community-build-grant/social": {
    title: "Community Build Grant Social Kit",
    description:
      "Public sharing guidance and source materials for the Beacon Momentum Community Build Grant.",
    robots: "noindex, follow",
  },
  "/cookies": {
    title: "Cookie Policy",
    description: "Beacon Momentum's cookie notice explains how public-site preferences and essential site functions are handled.",
  },
  "/disclaimer": {
    title: "Public Disclaimer",
    description: "Important public-use, educational, and responsibility disclosures for Beacon Momentum materials.",
  },
  "/field-notes": {
    title: "Digital Ramp-Up Field Notes",
    description:
      "Practical public notes on durable capability, evidence, human review, clear relationships, and accountable AI assistance.",
  },
  "/field-notes/chance-first-purpose-after-selection": {
    title: "Chance First. Purpose After Selection.",
    description:
      "The Community Build Award framework keeps free random selection separate from the practical purpose package that follows verified selection.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/field-notes/field-note-06-chance-first.jpg`,
  },
  "/field-notes/choose-the-right-door": {
    title: "Choose the Right Door",
    description:
      "Clear public, membership, voluntary-support, and organization-service paths respect consent and keep promises specific.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/field-notes/field-note-05-choose-right-door.jpg`,
  },
  "/field-notes/five-questions-keep-you-in-charge": {
    title: "Five Questions That Keep You in Charge",
    description:
      "Before an AI-assisted workflow earns more responsibility, ask five questions about scope, evidence, authority, stop controls, and human ownership.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/editorial/hero-watch-brief-ai-safety-report-card-16x9.webp`,
  },
  "/field-notes/human-review-is-the-real-control-surface": {
    title: "Human Review Is the Real Control Surface",
    description:
      "A tool can prepare work, but a named person still owns the public claim, sensitive decision, and final release.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/field-notes/field-note-04-human-review.jpg`,
  },
  "/field-notes/proof-before-output": {
    title: "Proof Before Output",
    description:
      "Before a public claim gains authority, make the source, context, permission, and human review visible.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/field-notes/field-note-03-proof-before-output.jpg`,
  },
  "/field-notes/start-with-the-work-not-the-tool": {
    title: "Start With the Work, Not the Tool",
    description:
      "Capability begins by naming the repeated piece of work worth making clearer, more reliable, and easier to carry forward.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/field-notes/field-note-01-start-with-work.jpg`,
  },
  "/field-notes/your-work-needs-a-memory": {
    title: "Your Work Needs a Memory",
    description:
      "Useful effort becomes cumulative when the source set, working notes, decision record, and approved result remain close to the work.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/field-notes/field-note-02-work-needs-memory.jpg`,
  },
  "/foundation": {
    title: "Beacon Foundation",
    description:
      "A practical Beacon Momentum foundation for durable capability, long-horizon work, and careful public decision-making.",
  },
  "/foundation/founders-note": {
    title: "Foundation Founder's Note",
    description: "A note on the purpose, boundaries, and long-horizon work behind the Beacon Foundation.",
  },
  "/foundation/support": {
    title: "Support the Beacon Foundation",
    description: "Voluntary support for Beacon Momentum's public work, with clear boundaries and no investment or ownership claim.",
  },
  "/foundation/thank-you": {
    title: "Thank You for Supporting the Beacon Foundation",
    description: "Confirmation and next-step information for Beacon Foundation supporters.",
    robots: "noindex, follow",
  },
  "/how-beacon-works": {
    title: "How Beacon Works",
    description:
      "See how Beacon Momentum connects public orientation, member learning, practical systems, and responsible operating choices.",
  },
  "/pricing": {
    title: "Beacon Momentum Pricing",
    description:
      "Review the Beacon Momentum membership and program paths with clear scope, access, and public disclosures.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "Beacon Momentum's privacy policy explains what information is collected, how it is used, and how to contact us.",
  },
  "/refund": {
    title: "Refund and Cancellation Policy",
    description:
      "Beacon Momentum refund, cancellation, renewal, and payment-support policy for The Watch annual membership.",
  },
  "/resources": {
    title: "Beacon Momentum Resources",
    description:
      "Public Beacon Momentum resources for practical capability, durable work, and responsible AI-assisted systems.",
  },
  "/signal": {
    title: "The Signal",
    description:
      "Beacon Momentum's public editorial library of practical field intelligence on AI, human capability, work, and durable operating systems.",
  },
  "/terms": {
    title: "Terms of Use",
    description: "Beacon Momentum's public website, membership, payment, and use terms.",
  },
  "/the-watch": {
    title: "The Watch",
    description:
      "The Watch is Beacon Momentum's $497 annual membership for practical systems, public intelligence, and durable operating capability.",
  },
  "/the-watch/checkout": {
    title: "The Watch Secure Enrollment",
    description: "Complete secure annual enrollment for The Watch, Beacon Momentum's $497 annual membership.",
    robots: "noindex, follow",
  },
  "/the-watch/confirmation": {
    title: "The Watch Enrollment Confirmation",
    description: "Confirmation and next-step information for The Watch annual membership.",
    robots: "noindex, follow",
  },
  "/the-watch/intake": {
    title: "The Watch Member Intake",
    description: "Complete your Beacon Momentum member intake.",
    robots: "noindex, follow",
  },
  "/the-watch/cohort": {
    title: "The Watch Member Cohort",
    description: "The Watch member cohort workspace.",
    robots: "noindex, follow",
  },
  "/watch-brief-premium": {
    title: "Watch Brief Premium",
    description: "Beacon Momentum's premium operating dossier for members who want a concise, recurring intelligence brief.",
  },
};

function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0] || "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path.startsWith("/") ? path : `/${path}`;
}

function fallbackMetadata(path: string): RouteMetadata {
  if (path.startsWith("/signal/")) {
    return {
      title: "The Signal",
      description:
        "A Beacon Momentum field intelligence article on practical AI, human capability, work, and durable operating systems.",
      type: "article",
    };
  }
  if (path.startsWith("/field-notes/")) {
    return {
      title: "Digital Ramp-Up Field Note",
      description: "A practical Beacon Momentum field note on durable capability and accountable AI assistance.",
      type: "article",
    };
  }
  if (path.startsWith("/_ops/")) {
    return {
      title: "Beacon Operations",
      description: "Authorized Beacon Momentum operations route.",
      robots: "noindex, nofollow",
    };
  }
  return DEFAULT_METADATA;
}

export function getRouteMetadata(pathname: string): RouteMetadata {
  const path = normalizePath(pathname);
  return { ...DEFAULT_METADATA, ...(ROUTE_METADATA[path] ?? fallbackMetadata(path)) };
}

export function getCanonicalUrl(pathname: string): string {
  return `${BEACON_SITE_URL}${normalizePath(pathname)}`;
}

export function getAbsoluteAssetUrl(asset?: string): string {
  const value = asset || DEFAULT_SOCIAL_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${BEACON_SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function getDocumentTitle(title: string): string {
  return title.includes(BEACON_SITE_NAME) ? title : `${title} — ${BEACON_SITE_NAME}`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

function replaceTag(template: string, pattern: RegExp, replacement: string): string {
  return template.replace(pattern, replacement);
}

/**
 * Injects route metadata into the initial server response so non-JavaScript
 * crawlers receive self-referential SEO and social metadata before hydration.
 */
export function renderRouteMetadata(template: string, pathname: string): string {
  const path = normalizePath(pathname);
  const metadata = getRouteMetadata(path);
  const title = getDocumentTitle(metadata.title);
  const description = metadata.description;
  const canonical = getCanonicalUrl(path);
  const image = getAbsoluteAssetUrl(metadata.image);
  const robots = metadata.robots || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  const type = metadata.type || "website";

  let html = template;
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = replaceTag(html, /<meta name="robots" content="[^"]*"\s*\/>/i, `<meta name="robots" content="${escapeHtml(robots)}" />`);
  html = replaceTag(html, /<meta property="og:type" content="[^"]*"\s*\/>/i, `<meta property="og:type" content="${type}" />`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = replaceTag(html, /<meta property="og:image" content="[^"]*"\s*\/>/i, `<meta property="og:image" content="${image}" />`);
  html = replaceTag(html, /<meta property="og:image:alt" content="[^"]*"\s*\/>/i, `<meta property="og:image:alt" content="${escapeHtml(title)}" />`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  html = replaceTag(html, /<meta name="twitter:image" content="[^"]*"\s*\/>/i, `<meta name="twitter:image" content="${image}" />`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`);
  return html;
}

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
  title: "We Keep the Light. You Steer.",
  description:
    "Start with The Watch, Beacon Momentum's annual member practice for building clearer work, useful capacity, and human judgment kept visible in an AI-shaped world.",
  image: DEFAULT_SOCIAL_IMAGE,
};

const ROUTE_METADATA: Record<string, RouteMetadata> = {
  "/": DEFAULT_METADATA,
  "/about": {
    title: "About Beacon Momentum",
    description:
      "Learn how Beacon Momentum helps people and organizations make a clearer next move with AI—through useful practice, plain language, and human judgment.",
  },
  "/ai-workflow-release-readiness-kit": {
    title: "AI Workflow Release Readiness Kit",
    description:
      "A self-guided field-test kit for defining the boundaries, acceptance checks, evidence, and recovery path of one recurring AI workflow.",
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
    description:
      "Beacon Momentum's cookie notice explains how public-site preferences and essential site functions are handled.",
  },
  "/disclaimer": {
    title: "Public Disclaimer",
    description:
      "Important public-use, educational, and responsibility disclosures for Beacon Momentum materials.",
  },
  "/digital-grandpa": {
    title: "Digital Grandpa",
    description:
      "A separate legacy and wisdom property offering hope, direction, love, and compassionate companionship for the road ahead.",
  },
  "/digital-grandpa/library": {
    title: "The Porch Light Library",
    description:
      "A private-development preview of the Digital Grandpa library of books and companion works for reflection, purpose, and a meaningful next chapter.",
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
    description:
      "A note on the purpose, boundaries, and long-horizon work behind the Beacon Foundation.",
  },
  "/foundation/support": {
    title: "Support the Beacon Foundation",
    description:
      "Voluntary support for Beacon Momentum's public work, with clear boundaries and no investment or ownership claim.",
  },
  "/foundation/thank-you": {
    title: "Thank You for Supporting the Beacon Foundation",
    description:
      "Confirmation and next-step information for Beacon Foundation supporters.",
    robots: "noindex, follow",
  },
  "/how-beacon-works": {
    title: "How Beacon Works",
    description:
      "See Beacon Momentum's practical rhythm: name the work, try a small improvement, check the result, and keep what helps.",
  },
  "/pricing": {
    title: "Choose Your Beacon Route",
    description:
      "Compare distinct Beacon membership, public-intelligence, and organization-system routes with clear scope, boundaries, and no assumed cross-property transfer.",
  },
  "/ReadinessMap": {
    title: "The Readiness Map",
    description:
      "A free printable worksheet to map one real job, set a boundary, keep human judgment visible, and choose a practical next step.",
  },
  "/readiness-map": {
    title: "The Readiness Map",
    description:
      "A free printable worksheet to map one real job, set a boundary, keep human judgment visible, and choose a practical next step.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "Beacon Momentum's privacy policy explains what information is collected, how it is used, and how to contact us.",
  },
  "/refund": {
    title: "Refund and Cancellation Policy",
    description:
      "Beacon Momentum refund, cancellation, renewal, and payment-support policy for The Watch annual membership.",
  },
  "/resources": {
    title: "Beacon Momentum Resources",
    description:
      "Free Beacon Momentum resources, Signal articles, and clear next steps for people making sense of AI, work, and change.",
  },
  "/signal": {
    title: "The Signal",
    description:
      "Beacon Momentum's public editorial library of practical field intelligence on AI, human capability, work, and durable operating systems.",
  },
  "/signal/what-anthropic-ai-safety-incidents-actually-show": {
    title: "What Anthropic’s AI-Safety Incidents Actually Show",
    description:
      "A careful Beacon Signal account of evaluation failures, model behavior, governance, and the difference between capability and authority.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/editorial/what-anthropic-ai-safety-incidents-actually-show.svg`,
  },
  "/signal/the-cloud-has-a-seabed": {
    title: "The Cloud Has a Seabed",
    description:
      "A practical Beacon Signal brief on submarine cables, route diversity, repair capacity, and the physical dependencies beneath digital work.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/editorial/the-cloud-has-a-seabed.svg`,
  },
  "/signal/the-cheap-part-that-can-stop-the-factory": {
    title: "The Cheap Part That Can Stop the Factory",
    description:
      "A careful Beacon Signal brief on semiconductor chokepoints, replaceability, export controls, and what the verified Nexperia record does and does not establish.",
    type: "article",
    image: `${BEACON_SITE_URL}/images/editorial/the-cheap-part-that-can-stop-the-factory.svg`,
  },
  "/signal/the-test-is-watching-you-back": {
    title: "Beacon Watch Brief: The Test Is Watching You Back",
    description:
      "A source-led look at reported AI agent activity, evaluation-origin incidents, controlled tests, and benchmark corrections—and what the evidence does and does not establish.",
    type: "article",
  },
  "/signal/can-it-do-it-or-may-it-do-it": {
    title: "Can It Do It—or May It Do It?",
    description:
      "A practical Beacon Signal framework for bounded AI jobs, explicit authority, least privilege, meaningful review, and safe stop paths.",
    type: "article",
  },
  "/signal/what-ai-demonstrations-prove-and-do-not": {
    title: "What a Demonstration Proves—and What It Does Not",
    description:
      "A practical checklist for reading AI benchmarks, simulations, and demos without claiming more certainty than the evidence supports.",
    type: "article",
  },
  "/signal/the-work-behind-ai-you-can-see": {
    title: "The Work Behind the AI You Can See",
    description:
      "A grounded guide to the equipment, energy, cooling, networks, people, and stewardship behind visible AI services.",
    type: "article",
  },
  "/signal/when-a-public-dashboard-is-not-intelligence": {
    title: "When a Public Dashboard Is Not Intelligence",
    description:
      "A practical guide to public-data provenance, coverage, timing, verification, privacy, and proportionate confidence.",
    type: "article",
  },
  "/signal/a-business-model-is-not-a-business": {
    title: "A Business Model Is Not a Business",
    description:
      "A human-centered guide to distinguishing AI capability, workflow demos, platform rules, and an accountable operating business.",
    type: "article",
  },
  "/signal/a-claim-is-not-evidence": {
    title: "A Claim Is Not Evidence",
    description:
      "A practical Beacon Signal guide for separating AI features, demonstrations, reported results, and claims that still need proof.",
    type: "article",
  },
  "/signal/can-this-agent-do-it-or-may-it-do-it": {
    title: "Can This Agent Do It—or May It Do It?",
    description:
      "Before an AI agent reads, drafts, or acts across connected tools, separate technical capability from permission, review, and responsibility.",
    type: "article",
  },
  "/signal/before-you-connect-an-app": {
    title: "Before You Connect an App",
    description:
      "A 15-minute Beacon Signal permission inventory for reviewing app access, scope, ownership, and revocation paths.",
    type: "article",
  },
  "/signal/a-disclosure-is-not-a-permission-slip": {
    title: "A Disclosure Is Not a Permission Slip",
    description:
      "Beacon Signal guidance on synthetic-media consent, provenance, disclosure, and accountable human review.",
    type: "article",
  },
  "/signal/what-an-ai-native-course-platform-has-to-prove": {
    title: "What an AI-Native Course Platform Has to Prove",
    description:
      "A vendor-neutral Beacon Signal framework for evaluating learning design, data practices, access, and portability in AI-native course platforms.",
    type: "article",
  },
  "/signal/young-adults-already-in-the-ai-conversation": {
    title: "Young Adults Are Already in the AI Conversation. Are We?",
    description:
      "A Beacon Signal reflection on how young adults are already living with AI and what responsible adults should notice before speaking for them.",
    type: "article",
  },
  "/signal/when-the-past-gains-new-light": {
    title: "When the Past Gains New Light",
    description:
      "A Beacon Signal essay on historical memory, new evidence, and the care required when technology changes what we can see.",
    type: "article",
  },
  "/signal/five-questions-keep-you-in-charge": {
    title: "Five Questions That Keep You in Charge",
    description:
      "A practical Beacon Signal checklist for keeping scope, evidence, authority, stop controls, and human ownership visible in AI-assisted work.",
    type: "article",
  },
  "/signal/ai-capability-needs-a-home": {
    title: "AI Capability Needs a Home",
    description:
      "A Beacon Signal guide to choosing the right place for AI-assisted work so useful capability remains understandable, reviewable, and recoverable.",
    type: "article",
  },
  "/signal/dependency-ladder-what-lives-closest-to-home": {
    title: "The Dependency Ladder: What Should Live Closest to Home?",
    description:
      "A Beacon Signal framework for deciding which AI dependencies belong close to the work, which may be shared, and which need a recovery path.",
    type: "article",
  },
  "/signal/what-17600-actions-teach-us-about-ai-control": {
    title: "What 17,600 Actions Teach Us About AI Control",
    description:
      "A Beacon Signal examination of action volume, authority boundaries, and why an agent’s control surface matters more than a single successful demo.",
    type: "article",
  },
  "/signal/rare-earth-lesson-for-a-small-team": {
    title: "The Rare-Earth Lesson for a Small Team",
    description:
      "A Beacon Signal note on concentrated dependencies, replaceability, and building resilient AI workflows with limited resources.",
    type: "article",
  },
  "/signal/provenance-is-the-new-professionalism": {
    title: "Provenance Is the New Professionalism",
    description:
      "A Beacon Signal guide to keeping sources, permissions, revisions, and evidence close to AI-assisted work.",
    type: "article",
  },
  "/signal/ai-work-you-should-not-automate": {
    title: "The AI Work You Should Not Automate",
    description:
      "A Beacon Signal framework for deciding which work needs human judgment, context, consent, or accountability rather than automatic execution.",
    type: "article",
  },
  "/signal/membership-is-not-a-shortcut-to-community": {
    title: "A Membership Is Not a Shortcut to Community",
    description:
      "A Beacon Signal reflection on belonging, participation, and the difference between access to a platform and a community people can trust.",
    type: "article",
  },
  "/signal/build-recovery-plan-before-you-need-it": {
    title: "Build the Recovery Plan Before You Need It",
    description:
      "A Beacon Signal guide to stop conditions, recovery paths, and keeping AI-assisted work useful when a dependency or workflow fails.",
    type: "article",
  },
  "/signal/quiet-advantage-of-a-system-you-can-explain": {
    title: "The Quiet Advantage of a System You Can Explain",
    description:
      "A Beacon Signal case for understandable systems, visible decisions, and durable AI capability that does not depend on mystery.",
    type: "article",
  },
  "/signal/the-ai-check-kite": {
    title: "The AI Check Kite — When the Music Stops",
    description:
      "A Beacon Signal field lesson on noticing when an AI-assisted workflow has lost its bearings and pausing before the error travels farther.",
    type: "article",
  },
  "/signal/65-percent-of-founders": {
    title: "65% of Founders Will Fail — Shortcuts vs. Levers",
    description:
      "A Beacon Signal examination of founder claims, business shortcuts, and the difference between leverage that compounds and promises that merely sound easy.",
    type: "article",
  },
  "/signal/the-collective-illusion": {
    title: "The Collective Illusion — You Are Not the Outlier",
    description:
      "A Beacon Signal reflection on social proof, shared uncertainty, and how to make a clearer decision when everyone appears more certain than they are.",
    type: "article",
  },
  "/signal/300000-empty-seats": {
    title: "300,000 Empty Seats — The Architecture of Fragility",
    description:
      "A Beacon Signal brief on workforce gaps, brittle assumptions, and the systems required before automation can responsibly carry more work.",
    type: "article",
  },
  "/labs/the-model-rumor-is-not-the-model": {
    title: "The Model Rumor Is Not the Model",
    description:
      "A Beacon Labs media-literacy exercise for separating AI rumors, benchmarks, anecdotes, demonstrations, and evidence before making a tool decision.",
    type: "article",
  },
  "/storm-navigators-guide": {
    title: "The Storm Navigator’s Guide",
    description:
      "A Beacon Momentum field guide in preparation for people taking stock, finding a steadier bearing, and choosing one useful next step through change.",
    image: `${BEACON_SITE_URL}/images/owned/storm-navigators-guide-cover.webp`,
  },
  "/terms": {
    title: "Terms of Use",
    description:
      "Beacon Momentum's public website, membership, payment, and use terms.",
  },
  "/the-watch": {
    title: "The Watch",
    description:
      "The Watch is Beacon Momentum's $497 annual membership for practical systems, public intelligence, and durable operating capability.",
  },
  "/the-watch/checkout": {
    title: "The Watch Secure Enrollment",
    description:
      "Complete secure annual enrollment for The Watch, Beacon Momentum's $497 annual membership.",
    robots: "noindex, follow",
  },
  "/the-watch/confirmation": {
    title: "The Watch Enrollment Confirmation",
    description:
      "Confirmation and next-step information for The Watch annual membership.",
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
    description:
      "Beacon Momentum's premium operating dossier for members who want a concise, recurring intelligence brief.",
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
      description:
        "A practical Beacon Momentum field note on durable capability and accountable AI assistance.",
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
  return {
    ...DEFAULT_METADATA,
    ...(ROUTE_METADATA[path] ?? fallbackMetadata(path)),
  };
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
  return title.includes(BEACON_SITE_NAME)
    ? title
    : `${title} — ${BEACON_SITE_NAME}`;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] || character,
  );
}

function replaceTag(
  template: string,
  pattern: RegExp,
  replacement: string,
): string {
  return template.replace(pattern, replacement);
}

/**
 * Injects route metadata into the initial server response so non-JavaScript
 * crawlers receive self-referential SEO and social metadata before hydration.
 */
export function renderRouteMetadata(
  template: string,
  pathname: string,
): string {
  const path = normalizePath(pathname);
  const metadata = getRouteMetadata(path);
  const title = getDocumentTitle(metadata.title);
  const description = metadata.description;
  const canonical = getCanonicalUrl(path);
  const image = getAbsoluteAssetUrl(metadata.image);
  const robots =
    metadata.robots ||
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  const type = metadata.type || "website";

  let html = template;
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`,
  );
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="robots" content="[^"]*"\s*\/>/i,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:type" content="[^"]*"\s*\/>/i,
    `<meta property="og:type" content="${type}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:image" content="[^"]*"\s*\/>/i,
    `<meta property="og:image" content="${image}" />`,
  );
  html = replaceTag(
    html,
    /<meta property="og:image:alt" content="[^"]*"\s*\/>/i,
    `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta name="twitter:image" content="[^"]*"\s*\/>/i,
    `<meta name="twitter:image" content="${image}" />`,
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );
  return html;
}

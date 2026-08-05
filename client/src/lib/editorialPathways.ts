export interface EditorialPathway {
  href: string;
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
}

const CONTROLLED_WORKFLOW_PATHWAY: EditorialPathway = {
  href: "/the-watch/controlled-ai-workflow-kit",
  eyebrow: "Beacon Work",
  heading: "Put the control into practice.",
  description:
    "The Controlled AI Workflow Kit helps you name the owner, evidence, authority, stop condition, and recovery path before a workflow goes live.",
  cta: "Open the workflow kit",
};

const SYSTEMS_PATHWAY: EditorialPathway = {
  href: "/how-beacon-works",
  eyebrow: "Beacon Systems",
  heading: "See the operating model behind the idea.",
  description:
    "How Beacon Works explains the retained context, human review, and controlled infrastructure that turn a promising tool into dependable work.",
  cta: "See how Beacon works",
};

const WATCH_PATHWAY: EditorialPathway = {
  href: "/the-watch",
  eyebrow: "The Watch",
  heading: "Carry the next signal into your work.",
  description:
    "The Watch is Beacon’s annual member path for deeper operating dossiers, practical templates, and disciplined implementation guidance.",
  cta: "Explore The Watch",
};

const AUGUST_PATHWAYS: Record<string, EditorialPathway> = {
  "five-questions-keep-you-in-charge": CONTROLLED_WORKFLOW_PATHWAY,
  "what-17600-actions-teach-us-about-ai-control": CONTROLLED_WORKFLOW_PATHWAY,
  "provenance-is-the-new-professionalism": CONTROLLED_WORKFLOW_PATHWAY,
  "ai-work-you-should-not-automate": CONTROLLED_WORKFLOW_PATHWAY,
  "ai-capability-needs-a-home": SYSTEMS_PATHWAY,
  "dependency-ladder-what-lives-closest-to-home": SYSTEMS_PATHWAY,
  "rare-earth-lesson-for-a-small-team": SYSTEMS_PATHWAY,
  "build-recovery-plan-before-you-need-it": SYSTEMS_PATHWAY,
  "quiet-advantage-of-a-system-you-can-explain": SYSTEMS_PATHWAY,
  "membership-is-not-a-shortcut-to-community": WATCH_PATHWAY,
};

export function getEditorialPathway(articleId: string): EditorialPathway {
  return AUGUST_PATHWAYS[articleId] ?? WATCH_PATHWAY;
}

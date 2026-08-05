export type BriefCheckInput = {
  title: string;
  claims: string[];
  sources: string[];
  reviewer: string;
  scopeConfirmed: boolean;
};

export type ResearchIntakeInput = {
  sourceType: "primary" | "credible_reporting" | "vendor_marketing" | "commentary" | "unknown";
  evidenceStatus: "confirmed" | "partially_confirmed" | "unverified";
  claimKind: "operating" | "security" | "market" | "policy_legal" | "product_capability";
};

export function checkBrief(input: BriefCheckInput) {
  const blockers: string[] = [];
  if (!input.title.trim()) blockers.push("Name the brief so the review record can be found later.");
  if (input.claims.length === 0) blockers.push("List at least one material claim before drafting the brief.");
  if (input.sources.length === 0) blockers.push("Add at least one source record before treating the brief as reviewable.");
  if (input.claims.length > input.sources.length) blockers.push("The claim count exceeds the source count; pair or qualify the unsupported claims.");
  if (!input.scopeConfirmed) blockers.push("Confirm the brief’s scope and explicit non-goals.");
  if (!input.reviewer.trim()) blockers.push("Name the human reviewer who owns the final claim decision.");

  return {
    readyForHumanReview: blockers.length === 0,
    blockers,
    evidenceCoverage: input.claims.length === 0 ? 0 : Math.min(100, Math.round((input.sources.length / input.claims.length) * 100)),
  };
}

export function summarizeQa(requiredIds: string[], completed: Record<string, boolean>) {
  const missing = requiredIds.filter((id) => !completed[id]);
  return {
    total: requiredIds.length,
    complete: requiredIds.length - missing.length,
    missing,
    readyForHumanApproval: missing.length === 0,
  };
}

export function classifyResearchIntake(input: ResearchIntakeInput) {
  if (input.evidenceStatus === "unverified") {
    return {
      destination: "Exclude pending verification",
      label: "Hold",
      rationale: "Do not carry unverified claims into Beacon’s public, member, or operating materials.",
    };
  }

  if (input.claimKind === "market" || input.claimKind === "policy_legal") {
    return {
      destination: "Member education only",
      label: "Context",
      rationale: "Use as a sourced educational discussion after review; do not present it as financial, legal, or regulatory advice.",
    };
  }

  if (input.claimKind === "security" && input.sourceType !== "primary") {
    return {
      destination: "Internal workflow pending primary-source review",
      label: "Caution",
      rationale: "Security lessons may guide controls, but named incidents and attack details need a primary source before publication.",
    };
  }

  if (input.sourceType === "primary" && input.evidenceStatus === "confirmed" && input.claimKind === "operating") {
    return {
      destination: "Public field note candidate",
      label: "Public candidate",
      rationale: "The material can inform public education once an editor confirms relevance, wording, and a clear source citation.",
    };
  }

  return {
    destination: "Internal workflow or member education",
    label: "Review",
    rationale: "Retain the operating lesson, qualify the claim, and keep the final placement with a named human editor.",
  };
}

export function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function downloadText(filename: string, content: string, type = "text/plain") {
  const blob = new Blob([content], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

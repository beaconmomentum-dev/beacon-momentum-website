import { describe, expect, it } from "vitest";
import { checkBrief, classifyResearchIntake, summarizeQa } from "./controlledWorkflowPilotLogic";

describe("controlled workflow pilot logic", () => {
  it("holds a brief without evidence and a human reviewer", () => {
    const result = checkBrief({ title: "", claims: ["A claim"], sources: [], reviewer: "", scopeConfirmed: false });
    expect(result.readyForHumanReview).toBe(false);
    expect(result.blockers.length).toBeGreaterThan(2);
  });

  it("routes confirmed primary operating material to a public-field-note candidate", () => {
    const result = classifyResearchIntake({ sourceType: "primary", evidenceStatus: "confirmed", claimKind: "operating" });
    expect(result.destination).toBe("Public field note candidate");
  });

  it("keeps unverified material out of the production line", () => {
    const result = classifyResearchIntake({ sourceType: "commentary", evidenceStatus: "unverified", claimKind: "security" });
    expect(result.destination).toBe("Exclude pending verification");
  });

  it("does not mark a QA release ready with required checks missing", () => {
    const result = summarizeQa(["scope", "links"], { scope: true, links: false });
    expect(result.readyForHumanApproval).toBe(false);
    expect(result.missing).toEqual(["links"]);
  });
});

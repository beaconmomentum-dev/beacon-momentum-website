import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const clientRoot = resolve(import.meta.dirname, "..");
const projectRoot = resolve(clientRoot, "..", "..");
const finalLetterPath = "/documents/beacon-founder-letter-final.pdf";

describe("Foundation Year Founder’s Note pathways", () => {
  it("publishes the Founder’s Note route and links the approved final letter download", () => {
    const app = readFileSync(resolve(clientRoot, "App.tsx"), "utf8");
    const note = readFileSync(resolve(clientRoot, "pages/FounderNotePage.tsx"), "utf8");
    const foundation = readFileSync(resolve(clientRoot, "pages/FoundationYearPage.tsx"), "utf8");

    expect(app).toContain('path="/foundation/founders-note"');
    expect(note).toContain(finalLetterPath);
    expect(note).toContain("personal operating update—not an offer to sell securities");
    expect(note).toContain("Beacon Momentum’s B2B services and organizational-outreach arm");
    expect(foundation).toContain('href="/foundation/founders-note"');
    expect(foundation).toContain(finalLetterPath);
    expect(existsSync(resolve(projectRoot, "client/public/documents/beacon-founder-letter-final.pdf"))).toBe(true);
  });
});

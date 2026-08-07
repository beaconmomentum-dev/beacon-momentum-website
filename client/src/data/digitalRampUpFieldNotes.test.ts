import { describe, expect, it } from "vitest";
import { DIGITAL_RAMP_UP_FIELD_NOTES, findDigitalRampUpFieldNote } from "./digitalRampUpFieldNotes";

describe("Digital Ramp-Up Field Notes", () => {
  it("defines the complete first six-note public sequence with unique, routable entries", () => {
    expect(DIGITAL_RAMP_UP_FIELD_NOTES).toHaveLength(6);
    expect(new Set(DIGITAL_RAMP_UP_FIELD_NOTES.map((note) => note.slug)).size).toBe(6);
    expect(DIGITAL_RAMP_UP_FIELD_NOTES.every((note) => note.image.startsWith("/images/field-notes/"))).toBe(true);
    expect(DIGITAL_RAMP_UP_FIELD_NOTES.every((note) => note.alt.length > 30 && note.ctaHref.startsWith("/"))).toBe(true);
    expect(findDigitalRampUpFieldNote("proof-before-output")?.number).toBe("03");
  });

  it("keeps the Community Build note framework-only and excludes internal-only source paths", () => {
    const noteSix = findDigitalRampUpFieldNote("chance-first-purpose-after-selection");
    expect(noteSix?.isFrameworkNote).toBe(true);
    expect(noteSix?.ctaHref).toBe("/community-build-grant");
    expect(noteSix?.body).toContain("eligible free entries");
    expect(noteSix?.body).toContain("not unrestricted cash");
    expect(noteSix?.body).not.toMatch(/enter now|buy.*entry|\[\^|\.\/BEACON_/i);
    expect(DIGITAL_RAMP_UP_FIELD_NOTES.every((note) => !note.body.includes("./BEACON_"))).toBe(true);
  });
});

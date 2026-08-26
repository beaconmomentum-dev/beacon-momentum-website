import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(path.resolve(import.meta.dirname, "ContactPage.tsx"), "utf8");

describe("Contact page capture boundary", () => {
  it("submits through the server-side capture relay without exposing a browser credential", () => {
    expect(source).toContain('/api/trpc/capture.submit?batch=1');
    expect(source).toContain('event: "contact_inquiry"');
    expect(source).not.toContain("VITE_GHL_API_KEY");
    expect(source).not.toContain("services.leadconnectorhq.com");
  });
});

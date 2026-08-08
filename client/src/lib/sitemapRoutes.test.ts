import { readFileSync } from "node:fs";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const sitemap = readFileSync(
  path.resolve(process.cwd(), "client/public/sitemap.xml"),
  "utf8",
);

describe("public sitemap routes", () => {
  it("does not publish the retired pathways routes that render Not Found", () => {
    expect(sitemap).not.toContain("/pathways");
  });

  it("includes the active Field Notes and Community Build public destinations", () => {
    expect(sitemap).toContain("https://beaconmomentum.com/field-notes");
    expect(sitemap).toContain(
      "https://beaconmomentum.com/field-notes/chance-first-purpose-after-selection",
    );
    expect(sitemap).toContain(
      "https://beaconmomentum.com/community-build-grant",
    );
  });
});

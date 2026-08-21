import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import puppeteer from "puppeteer-core";

const baseUrl = process.env.BEACON_VISUAL_BASE_URL ?? "http://127.0.0.1:4174";
const executablePath = process.env.CHROMIUM_PATH
  ?? ["/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"]
    .find((candidate) => fs.existsSync(candidate));

if (!executablePath) throw new Error("Chromium executable not found");

const outputDir = path.resolve("docs/screenshots/brand-congruency-2026-08-21");
fs.mkdirSync(outputDir, { recursive: true });

const routes = [
  { name: "home", path: "/", expected: "Find a steadier", descriptor: "Public Front Door" },
  { name: "watch", path: "/the-watch", expected: "The lighthouse is lit", descriptor: "The Watch" },
  { name: "watch-checkout", path: "/the-watch/checkout", expected: "Take your post for the year ahead", descriptor: "Secure enrollment" },
  { name: "about", path: "/about", expected: "Built in the storm", descriptor: "Public Front Door" },
  { name: "pricing", path: "/pricing", expected: "Pricing", descriptor: "Public Front Door" },
  { name: "contact", path: "/contact", expected: "We read every message", descriptor: "Beacon Momentum" },
  { name: "privacy", path: "/privacy", expected: "Privacy", descriptor: "Beacon Momentum" },
  { name: "terms", path: "/terms", expected: "Terms", descriptor: "Beacon Momentum" },
  { name: "refund", path: "/refund", expected: "Refund", descriptor: "Beacon Momentum" },
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

const results = [];

try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const page = await browser.newPage();
      const criticalFailures = [];
      console.log(`checking viewport=${viewport.name} route=${route.path}`);

      page.on("response", (response) => {
        const type = response.request().resourceType();
        if (["document", "script", "stylesheet", "image", "font"].includes(type) && response.status() >= 400) {
          criticalFailures.push(`${response.status()} ${type} ${response.url()}`);
        }
      });

      await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle2", timeout: 30_000 });
      await page.addStyleTag({
        content: "*,*::before,*::after{animation:none!important;transition:none!important;} [style*='opacity: 0']{opacity:1!important;} [style*='transform']{transform:none!important;}",
      });
      try {
        await page.waitForFunction(
          (expected) => document.body.innerText.toLowerCase().includes(expected.toLowerCase()),
          { timeout: 20_000 },
          route.expected,
        );
      } catch (error) {
        const diagnostic = await page.evaluate(() => ({
          bodyCharacters: document.body.innerText.trim().length,
          publicTextPreview: document.body.innerText.replace(/\s+/g, " ").trim().slice(0, 240),
          title: document.title,
        }));
        throw new Error(`${route.path} missing expected text ${JSON.stringify(route.expected)}: ${JSON.stringify(diagnostic)}`, { cause: error });
      }

      const state = await page.evaluate((descriptor) => {
        const mark = [...document.images].find((image) => image.getAttribute("src")?.includes("/brand/beacon-mark.svg"));
        const bodyText = document.body.innerText;
        return {
          bodyCharacters: bodyText.trim().length,
          descriptorPresent: bodyText.toLowerCase().includes(descriptor.toLowerCase()),
          markLoaded: Boolean(mark && mark.complete && mark.naturalWidth > 0),
          markSource: mark?.getAttribute("src") ?? null,
          overflowPixels: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
          title: document.title,
        };
      }, route.descriptor);

      if (!state.markLoaded) throw new Error(`${route.path} did not load the approved Beacon parent mark`);
      if (!state.descriptorPresent) throw new Error(`${route.path} did not show descriptor ${route.descriptor}`);
      if (state.overflowPixels > 1) throw new Error(`${route.path} overflowed by ${state.overflowPixels}px at ${viewport.name}`);
      if (criticalFailures.length) throw new Error(`${route.path} critical asset failures: ${criticalFailures.join(" | ")}`);

      if (["home", "watch", "watch-checkout"].includes(route.name)) {
        await page.screenshot({ path: path.join(outputDir, `${route.name}-${viewport.name}.png`), fullPage: false });
      }

      results.push({ route: route.path, viewport: viewport.name, ...state, criticalFailures });
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const resultPath = path.join(outputDir, "brand-visual-acceptance.json");
fs.writeFileSync(resultPath, `${JSON.stringify({ baseUrl, checkedAt: new Date().toISOString(), results }, null, 2)}\n`);
console.log(`brand_visual_acceptance=pass routes=${results.length} evidence=${resultPath}`);

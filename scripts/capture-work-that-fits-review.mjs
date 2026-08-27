import puppeteer from "puppeteer-core";
import fs from "node:fs/promises";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const cases = [
  { name: "desktop", width: 1440, height: 1600 },
  { name: "mobile", width: 390, height: 1600 },
];

const results = [];
for (const testCase of cases) {
  const page = await browser.newPage();
  await page.setViewport({ width: testCase.width, height: testCase.height, deviceScaleFactor: 1 });
  await page.goto("http://127.0.0.1:5173/work-that-fits", { waitUntil: "networkidle0" });
  await page.screenshot({ path: `/home/ubuntu/release_beacon_momentum_website/review-work-that-fits-${testCase.name}.png`, fullPage: true });
  results.push({
    viewport: testCase.name,
    title: await page.title(),
    heading: await page.$eval("h1", element => element.textContent?.trim() || ""),
    formPresent: (await page.$("form")) !== null,
    privacyLink: await page.$$eval('a[href="/privacy"]', elements => elements.length),
    termsLink: await page.$$eval('a[href="/terms"]', elements => elements.length),
    refundLink: await page.$$eval('a[href="/refund"]', elements => elements.length),
    cardAssetAvailable: await page.evaluate(async () => {
      const response = await fetch("/downloads/one-task-experiment-card.pdf", { method: "HEAD" });
      return { ok: response.ok, contentType: response.headers.get("content-type") };
    }),
  });
  await page.close();
}
await browser.close();
await fs.writeFile(
  "/home/ubuntu/release_beacon_momentum_website/review-work-that-fits.json",
  JSON.stringify(results, null, 2) + "\n",
);
console.log(JSON.stringify(results));

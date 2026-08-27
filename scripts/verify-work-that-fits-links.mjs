import puppeteer from "puppeteer-core";
import fs from "node:fs/promises";

const base = "http://127.0.0.1:5173";
const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
const checks = [];

for (const target of ["/privacy", "/terms", "/refund"]) {
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${base}${target}`, { waitUntil: "networkidle0" });
  const heading = await page.$eval("h1", element => element.textContent?.replace(/\s+/g, " ").trim() || "");
  const bodyText = await page.$eval("body", element => element.textContent || "");
  const notFound = /page not found|not found/i.test(bodyText);
  checks.push({ target, title: await page.title(), heading, notFound });
}

await page.setViewport({ width: 390, height: 844 });
await page.goto(`${base}/work-that-fits`, { waitUntil: "networkidle0" });
const mobileMenuButtonCount = await page.$$eval('button[aria-label*="menu" i], button[aria-expanded]', elements => elements.length);
await page.click('a[href="#request-card"]');
await page.waitForFunction(() => window.location.hash === "#request-card");
checks.push({ target: "#request-card", hashReached: await page.evaluate(() => window.location.hash), mobileMenuButtonCount });

await browser.close();
const bad = checks.filter(check => check.notFound || (check.target === "#request-card" && check.hashReached !== "#request-card"));
await fs.writeFile("/home/ubuntu/release_beacon_momentum_website/work-that-fits-link-local-test.json", JSON.stringify({ checks, bad }, null, 2) + "\n");
if (bad.length) {
  console.error(JSON.stringify({ checks, bad }));
  process.exit(1);
}
console.log(JSON.stringify({ checks, bad }));

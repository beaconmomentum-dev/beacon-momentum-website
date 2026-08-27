import puppeteer from "puppeteer-core";
import fs from "node:fs/promises";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.setRequestInterception(true);
page.on("request", request => {
  if (request.url().includes("/api/trpc/capture.submit")) {
    request.respond({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ result: { data: { json: { success: true, requestId: "local-test" } } } }]),
    });
    return;
  }
  request.continue();
});

await page.goto("http://127.0.0.1:5173/work-that-fits", { waitUntil: "networkidle0" });
const disabledWithoutConsent = await page.$eval('button[type="submit"]', element => element.disabled);
await page.type("#wtf-email", "review@example.com");
const disabledWithEmailOnly = await page.$eval('button[type="submit"]', element => element.disabled);
await page.click("#wtf-consent");
const enabledWithConsent = await page.$eval('button[type="submit"]', element => !element.disabled);
await page.click('button[type="submit"]');
await page.waitForSelector(".wtf-success");
const downloadHref = await page.$eval(".wtf-download-link", element => element.getAttribute("href"));
const successText = await page.$eval(".wtf-success", element => element.textContent?.replace(/\s+/g, " ").trim() || "");
await browser.close();

const result = { disabledWithoutConsent, disabledWithEmailOnly, enabledWithConsent, downloadHref, successText };
await fs.writeFile("/home/ubuntu/release_beacon_momentum_website/work-that-fits-form-local-test.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));

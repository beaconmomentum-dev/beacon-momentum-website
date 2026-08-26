import fs from 'node:fs';
import process from 'node:process';
import puppeteer from 'puppeteer-core';

const chromiumPath = process.env.CHROMIUM_PATH || '/usr/bin/chromium';
const browser = await puppeteer.launch({ headless: true, executablePath: chromiumPath, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto('https://beaconmomentum.com/field-guides', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('#main-content', { timeout: 20000 });
  const result = await page.evaluate(() => ({
    title: document.title,
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    text: document.body.innerText,
  }));
  await page.screenshot({ path: '/home/ubuntu/release_beacon_momentum_website/mobile-field-guides-review.png', fullPage: true });
  const requiredTitles = [
    'The Machine-Layer Method',
    'The Thoughtful Automation Map',
    'The Evidence Layer',
    'The Ethical Architect',
    'The Clear Website Protocol',
    'AI Without Fear',
  ];
  const missing = requiredTitles.filter((title) => !result.text.includes(title));
  const report = {
    title: result.title,
    viewportWidth: result.viewportWidth,
    scrollWidth: result.scrollWidth,
    horizontalOverflow: result.scrollWidth > result.viewportWidth,
    missingTitles: missing,
  };
  fs.writeFileSync('/home/ubuntu/release_beacon_momentum_website/mobile-field-guides-review.json', JSON.stringify(report, null, 2));
  if (report.horizontalOverflow || report.missingTitles.length > 0) process.exitCode = 1;
} finally {
  await browser.close();
}

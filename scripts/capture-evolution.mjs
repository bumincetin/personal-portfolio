import fs from 'node:fs';
import { chromium } from 'playwright';
const base = process.argv[2] ?? 'http://localhost:3113';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
try {
  for (const [name, route, width, height] of [
    ['home', '/en', 1440, 1000], ['mobile-home', '/en', 390, 844],
    ['approach', '/en/front-matter', 1440, 1000], ['chapters', '/en/chapters', 1440, 1000],
    ['service', '/en/volumes/document-intelligence', 1440, 1000],
    ['research', '/en/volumes/greenwashing-risk-scoring', 1440, 1000],
  ]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: width < 500, hasTouch: width < 500 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `artifacts/evolution/after/${name}.png` });
    const state = await page.evaluate(() => {
      const js = performance.getEntriesByType('resource').filter(e => e.name.includes('.js'));
      return { h1: document.querySelectorAll('h1').length, canvas: document.querySelectorAll('canvas').length,
        jsEncodedBytes: js.reduce((s, e) => s + e.encodedBodySize, 0), jsDecodedBytes: js.reduce((s, e) => s + e.decodedBodySize, 0),
        overflow: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    results.push({ name, route, width, height, ...state, errors, securityHeaders: Object.fromEntries(Object.entries(response.headers()).filter(([key]) => /content-security|x-frame|x-content-type|referrer-policy|permissions-policy/.test(key))) });
    if (name === 'chapters') {
      await page.emulateMedia({ media: 'print' });
      await page.screenshot({ path: 'artifacts/evolution/after/cv-print.png', fullPage: true });
    }
    await context.close();
  }
  fs.writeFileSync('artifacts/evolution/after/measurements.json', JSON.stringify(results, null, 2));
  console.log(results.map(({ name, jsEncodedBytes, jsDecodedBytes, errors }) => ({ name, jsEncodedBytes, jsDecodedBytes, errors })));
} finally { await browser.close(); }

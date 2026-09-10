/** Verify spotlight navigation with real touch, mouse, keyboard and scroll input. */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axe = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2] ?? 'http://localhost:3114';
const browser = await chromium.launch({ channel: 'chrome' });
const current = page => page.locator('.career-reel a[aria-current]').getAttribute('href');
const settle = page => page.waitForTimeout(1300);
async function spotlight(page, numeral) {
  assert.equal(await current(page), `#chapter-${numeral}`);
  assert.equal(await page.locator('.career-chapter:visible').count(), 1);
  assert.equal(await page.locator('.career-card-select[aria-pressed="true"]').count(), 1);
  const featured = page.locator(`#chapter-${numeral} .career-media`);
  const bounds = await featured.boundingBox();
  assert.ok(Math.abs(bounds.x + bounds.width / 2 - page.viewportSize().width / 2) < 4, 'featured media is centered');
  assert.ok(await featured.locator('.career-card-shade').evaluate(e => +getComputedStyle(e).opacity < .02), 'featured media has full brightness');
  const neighbors = await page.locator('.career-card-slot[data-active="false"] .career-media').evaluateAll(elements => elements.map(e => ({
    width: e.getBoundingClientRect().width, shade: +getComputedStyle(e.querySelector('.career-card-shade')).opacity,
  })));
  assert.ok(neighbors.every(item => item.width < bounds.width * .97 && item.shade > .5), 'neighboring media recedes and dims');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'carousel never widens the page');
}
async function scan(page) {
  await page.addScriptTag({ content: axe });
  const violations = await page.evaluate(async () => (await window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.failureSummary) })));
  assert.deepEqual(violations, []);
}
try {
  for (const [locale, width] of [['en', 360], ['tr', 390], ['it', 390]]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${base}/${locale}/chapters#chapter-I`, { waitUntil: 'networkidle' });
    await page.locator('.career-story[data-ready="true"]').waitFor();
    await settle(page);
    await page.evaluate(() => window.scrollTo({ top: document.querySelector('#career-story').getBoundingClientRect().top + scrollY - 80, behavior: 'instant' }));
    const cdp = await context.newCDPSession(page);
    async function swipe(direction) {
      const box = await page.locator('.career-card-slot[data-active="true"] .career-media').boundingBox();
      const y = box.y + box.height / 2;
      const start = direction === 1 ? width * .8 : width * .2;
      const end = direction === 1 ? width * .2 : width * .8;
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: start, y }] });
      for (let i = 1; i <= 12; i++) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start + (end - start) * i / 12, y }] });
        await page.waitForTimeout(25);
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await settle(page);
    }
    await swipe(1);
    await spotlight(page, 'II');
    await swipe(-1);
    await spotlight(page, 'I');
    await page.locator('.career-reel a[href="#chapter-V"]').click();
    await settle(page);
    await spotlight(page, 'V');
    assert.ok(await page.locator('.career-arrows button').last().isDisabled());
    await page.locator('.career-track').focus();
    await page.keyboard.press('Home');
    await settle(page);
    await spotlight(page, 'I');
    await page.keyboard.press('ArrowRight');
    await settle(page);
    await spotlight(page, 'II');
    await scan(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.career-reel a[href="#chapter-III"]').click();
    await page.waitForTimeout(150);
    assert.equal(await current(page), '#chapter-III');
    assert.equal(await page.locator('#chapter-III .career-media').evaluate(e => getComputedStyle(e).transform), 'none');
    assert.deepEqual(errors, []);
    console.log(`PASS ${locale} ${width}px: native swipes, spotlight, keyboard, date navigation, reduced motion and accessibility`);
    await context.close();
  }
  const context = await browser.newContext({ viewport: { width: 1100, height: 850 } });
  const page = await context.newPage();
  for (const locale of ['en', 'tr', 'it']) {
    await page.goto(`${base}/${locale}/chapters#chapter-III`, { waitUntil: 'networkidle' });
    await settle(page);
    await spotlight(page, 'III');
    // Select an exposed part of the neighboring card.
    const box = await page.locator('#chapter-IV .career-media').boundingBox();
    await page.mouse.click(1080, box.y + box.height / 2);
    await settle(page);
    await spotlight(page, 'IV');
    const fit = await page.evaluate(() => ({ top: document.querySelector('.career-film-top').getBoundingClientRect().top, bottom: document.querySelector('.career-story-details').getBoundingClientRect().bottom, height: innerHeight }));
    assert.ok(fit.top >= 80 && fit.bottom <= fit.height, `long ${locale} story fits the pinned viewport: ${JSON.stringify(fit)}`);
    if (locale === 'en') await scan(page);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}/en/chapters#chapter-II`, { waitUntil: 'networkidle' });
  await settle(page);
  await page.mouse.wheel(0, 1000);
  await settle(page);
  await spotlight(page, 'III');
  await page.setViewportSize({ width: 900, height: 750 });
  await page.goto(`${base}/en/chapters#chapter-I`, { waitUntil: 'networkidle' });
  await settle(page);
  const card = await page.locator('#chapter-I .career-media').boundingBox();
  await page.mouse.move(700, card.y + card.height / 2);
  await page.mouse.down();
  await page.mouse.move(200, card.y + card.height / 2, { steps: 20 });
  await page.mouse.up();
  await settle(page);
  await spotlight(page, 'II');
  console.log('PASS desktop: side-card selection, pinned translation fit, scroll progression, tablet mouse dragging');
  await context.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await nojs.newPage();
  await fallback.goto(`${base}/en/chapters`);
  assert.equal(await fallback.locator('.career-chapter:visible').count(), 5);
  assert.ok(await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  await nojs.close();
  console.log('PASS no-JavaScript: all five stories remain readable');
} finally { await browser.close(); }

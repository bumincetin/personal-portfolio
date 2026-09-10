/** Real touch regressions: scrolling must not be mistaken for page turning. */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const BASE = process.argv[2] ?? 'http://localhost:3112';
const browser = await chromium.launch({ channel: 'chrome' });
const slugs = ['document-intelligence', 'forecasting', 'reporting', 'cross-border', 'greenwashing-risk-scoring', 'parliamentary-seat-forecast', 'portfolio-optimizer'];
const paperLeaf = '#sbBook .sb-full .sb-leaf';
let checked = 0;
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  const cdp = await context.newCDPSession(page);
  const open = async (route) => {
    await page.goto(`${BASE}${route}`, { waitUntil: 'load' });
    await page.locator('.sketchbook-root[data-ready="1"]').waitFor({ state: 'attached' });
  };
  const select = async (index) => {
    await page.locator('.plate').nth(index).evaluate(e => e.click());
    await page.waitForTimeout(80);
  };
  const folio = () => page.locator(paperLeaf).first().getAttribute('data-folio');
  const swipe = async (target, dx, dy) => {
    await target.scrollIntoViewIfNeeded();
    const r = await target.boundingBox();
    assert.ok(r && r.width > 20 && r.height > 20, 'gesture target must be visible');
    const x = r.x + r.width * (dx < 0 ? 0.8 : 0.2);
    const y = Math.max(90, Math.min(720, r.y + Math.min(r.height * 0.6, 170)));
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
    for (let i = 1; i <= 10; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * i / 10, y: y + dy * i / 10, id: 1 }] });
      await page.waitForTimeout(20);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(350);
  };

  // Stylesheets remain loaded after client navigation. This caught white titles on paper.
  await page.goto(`${BASE}/en/contact`, { waitUntil: 'load' });
  await page.locator('.site-nav a[href="/en/front-matter"]').evaluate(e => e.click());
  await page.locator('.sketchbook-root[data-ready="1"]').waitFor({ state: 'attached' });
  assert.equal(await page.locator('#sbBook .reader-title').evaluate(e => getComputedStyle(e).color), 'rgb(43, 39, 33)');
  assert.equal(await page.locator('#zoomWrap').isVisible(), false);
  console.log('PASS contact-to-reader contrast and hidden mobile magnifier');

  const beforeTurn = await folio();
  await swipe(page.locator(paperLeaf), -150, 0);
  assert.notEqual(await folio(), beforeTurn, 'a horizontal swipe on prose should turn the page');
  await select(11);
  const dense = page.locator(paperLeaf);
  await dense.evaluate(e => { e.scrollTop = 0; });
  const beforeScroll = await folio();
  await swipe(dense, 0, -110);
  assert.ok(await dense.evaluate(e => e.scrollTop > 0), 'dense prose should scroll vertically');
  assert.equal(await folio(), beforeScroll, 'vertical scrolling must not turn pages');
  console.log('PASS touch page turn and independent vertical reading');

  await open('/en/volumes/greenwashing-risk-scoring');
  await select(13);
  const figure = page.locator('#sbBook [data-scroll-region]');
  await swipe(figure, -140, 0);
  assert.ok(await figure.evaluate(e => e.scrollLeft > 25), 'chart must scroll horizontally with a finger');
  assert.equal(await folio(), '14');
  await figure.evaluate(e => { e.scrollLeft = 0; });
  await figure.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(200);
  assert.ok(await figure.evaluate(e => e.scrollLeft > 0), 'arrow keys should scroll a focused chart');
  assert.equal(await folio(), '14');
  console.log('PASS native chart scrolling and keyboard scrolling without page turns');

  await open('/en/volumes/portfolio-optimizer');
  await select(19);
  const comparison = page.locator('#sbBook [aria-label="Strategy comparison"]');
  await comparison.waitFor({ state: 'attached' });
  await swipe(comparison, -130, 0);
  assert.ok(await comparison.evaluate(e => e.scrollLeft > 25), 'comparison table must scroll horizontally');
  assert.equal(await folio(), '20');
  const slider = page.locator('#sbBook input[type="range"]').first();
  await slider.scrollIntoViewIfNeeded();
  const initialValue = await slider.inputValue();
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  assert.notEqual(await slider.inputValue(), initialValue, 'slider keys must change its value');
  assert.equal(await folio(), '20');
  const statsColor = await page.locator('#sbBook .reader-demo dd').first().evaluate(e => getComputedStyle(e).color);
  assert.notEqual(statsColor, 'rgba(43, 39, 33, 0.78)', 'paper ink must not leak into the dark optimizer');
  console.log('PASS optimizer table, slider, and dark-panel text');

  await open('/en/front-matter');
  const initialFont = await page.locator('#sbBook .sb-paper').evaluate(e => parseFloat(getComputedStyle(e).fontSize));
  await page.locator('#zIn').click();
  await page.waitForTimeout(650);
  assert.ok(await page.locator('#sbBook .sb-paper').evaluate(e => parseFloat(getComputedStyle(e).fontSize)) > initialFont);
  assert.ok(await page.locator('#sbBook').evaluate(e => { const r=e.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }));
  console.log('PASS mobile zoom enlarges text without pushing the book offscreen');

  const beforeButtonKey = await folio();
  await page.locator('#sbRight').focus();
  await page.keyboard.press('ArrowRight');
  assert.notEqual(await folio(), beforeButtonKey, 'page controls must retain keyboard navigation');
  console.log('PASS page navigation keys with a focused page control');

  await page.goto(`${BASE}/en`, { waitUntil: 'load' });
  await page.locator('.experience.webgl-ready').waitFor({ state: 'attached', timeout: 60000 });
  const counter = await page.locator('#counter').innerText();
  await swipe(page.locator('#scene'), -160, 0);
  assert.notEqual(await page.locator('#counter').innerText(), counter, 'shelf must support touch swiping');
  assert.equal(await page.locator('.experience').evaluate(e => e.classList.contains('mode-detail')), false, 'swiping must not open a book');
  console.log('PASS shelf touch swipe without accidental opening');

  // Inspect every leaf, including long evidence and the interactive instrument.
  for (const width of [360, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of ['en', 'tr', 'it']) {
      for (const route of ['front-matter', ...slugs.map(s => `volumes/${s}`)]) {
        await open(`/${locale}/${route}`);
        const result = await page.evaluate(() => {
          const rows = [...document.querySelectorAll('.plate')];
          const failures = [];
          rows.forEach((row, index) => {
            row.click();
            const leaf = document.querySelector('#sbBook .sb-full .sb-leaf');
            if (!leaf) { failures.push(`${index + 1}: missing leaf`); return; }
            const paper = leaf.closest('.sb-paper');
            if (parseFloat(getComputedStyle(paper).fontSize) < 16) failures.push(`${index + 1}: small type`);
            if (leaf.scrollWidth > leaf.clientWidth + 1) failures.push(`${index + 1}: clipped horizontally (${leaf.scrollWidth}/${leaf.clientWidth})`);
            const title = leaf.querySelector('.reader-title,.reader-heading');
            if (title && getComputedStyle(title).color !== 'rgb(43, 39, 33)') failures.push(`${index + 1}: title ink`);
          });
          if (document.documentElement.scrollWidth > innerWidth + 1) failures.push('document overflow');
          return { count: rows.length, failures };
        });
        checked += result.count;
        assert.deepEqual(result.failures, [], `${width}px /${locale}/${route}`);
      }
      console.log(`PASS every ${locale} reader leaf at ${width}px`);
    }
  }
  assert.deepEqual(pageErrors, [], 'browser interactions must not throw');
  console.log(`PASS ${checked} leaf layouts plus native touch, keyboard, navigation, and zoom regressions`);
} finally {
  await browser.close();
}

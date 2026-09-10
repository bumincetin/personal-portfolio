/** Real touch input verifies the leaf turns, rather than only the selected index. */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axe = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2] ?? 'http://localhost:3114';
const browser = await chromium.launch({ channel: 'chrome' });
const current = page => page.locator('.career-reel a[aria-current]').getAttribute('href');
const turnAngle = leaf => leaf.evaluate(element => {
  const matrix = new DOMMatrix(getComputedStyle(element).transform);
  return Math.abs(Math.atan2(matrix.m31, matrix.m11) * 180 / Math.PI);
});
async function scan(page) {
  await page.addScriptTag({ content: axe });
  const violations = await page.evaluate(async () => (await window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  })).violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.failureSummary) })));
  assert.deepEqual(violations, []);
}

try {
  for (const locale of ['en', 'tr', 'it']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/${locale}/chapters#career-story`, { waitUntil: 'networkidle' });
    await page.locator('.career-story[data-book="true"]').waitFor();
    await page.evaluate(() => window.scrollTo({ top: document.querySelector('#career-story').getBoundingClientRect().top + scrollY - 80, behavior: 'instant' }));
    const cdp = await context.newCDPSession(page);
    const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', {
      type, touchPoints: type === 'touchEnd' ? [] : [{ x, y, radiusX: 4, radiusY: 4, force: 1 }],
    });

    // Hold a leaf halfway through a real horizontal touch gesture.
    await touch('touchStart', 320, 430);
    await touch('touchMove', 285, 430);
    await touch('touchMove', 210, 430);
    await page.waitForTimeout(80);
    const first = page.locator('#chapter-I .chapter-leaf');
    assert.ok(await turnAngle(first) > 35, 'touch must visibly rotate the sheet around its binding');
    assert.ok(await first.locator('.chapter-fold-light').evaluate(element => +getComputedStyle(element).opacity > .1), 'fold lighting follows the finger');
    await touch('touchMove', 100, 430);
    await page.waitForTimeout(80);
    assert.ok(await turnAngle(first) > 90, 'the reverse side of the sheet is exposed during the turn');
    await touch('touchEnd');
    await page.waitForTimeout(1000);
    assert.equal(await current(page), '#chapter-II');
    assert.equal(await first.evaluate(element => getComputedStyle(element).visibility), 'hidden');
    assert.ok(await turnAngle(page.locator('#chapter-II .chapter-leaf')) < 1, 'the new page rests flat');

    await touch('touchStart', 90, 430);
    await touch('touchMove', 125, 430);
    await touch('touchMove', 310, 430);
    await touch('touchEnd');
    await page.waitForTimeout(1000);
    assert.equal(await current(page), '#chapter-I', 'a right swipe turns back');

    const scrollBefore = await page.evaluate(() => scrollY);
    await touch('touchStart', 220, 520);
    await touch('touchMove', 220, 480);
    await touch('touchMove', 220, 280);
    await touch('touchEnd');
    await page.waitForTimeout(500);
    assert.ok(await page.evaluate(() => scrollY) > scrollBefore + 100, 'vertical reading scroll remains native');
    assert.equal(await current(page), '#chapter-I', 'vertical scrolling does not turn a page');

    await page.locator('.career-reel a[href="#chapter-V"]').click();
    await page.waitForTimeout(2100);
    assert.equal(await current(page), '#chapter-V', 'date navigation can turn through multiple sheets');
    await page.locator('.career-track').focus();
    await page.keyboard.press('Home');
    await page.waitForTimeout(2100);
    assert.equal(await current(page), '#chapter-I');
    await scan(page);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.career-story[data-book="false"]').waitFor();
    await page.locator('.career-reel a[href="#chapter-III"]').click();
    assert.equal(await current(page), '#chapter-III');
    assert.ok(await turnAngle(page.locator('#chapter-III .chapter-leaf')) < 1, 'reduced motion keeps the paper static');
    assert.deepEqual(errors, []);
    console.log(`PASS ${locale}: touch turn, reverse face, fold light, backward swipe, native vertical scroll, keyboard, reduced motion, accessibility`);
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  for (const locale of ['en', 'tr', 'it']) {
    await page.goto(`${base}/${locale}/chapters#chapter-III`, { waitUntil: 'networkidle' });
    await page.locator('.career-story[data-enhanced="true"]').waitFor();
    await page.waitForTimeout(200);
    await page.evaluate(() => {
      const root = document.querySelector('#career-story');
      window.scrollTo({ top: root.getBoundingClientRect().top + scrollY + (root.offsetHeight - innerHeight) * .6, behavior: 'instant' });
    });
    await page.waitForTimeout(200);
    assert.ok(await turnAngle(page.locator('#chapter-III .chapter-leaf')) > 12, 'desktop scroll turns the leaf as well as translating it');
    for (let index = 0; index < 5; index++) {
      await page.locator('.career-reel a').nth(index).click();
      await page.waitForTimeout(1200);
      const card = await page.locator('.career-chapter').nth(index).boundingBox();
      const controls = await page.locator('.career-timeline-controls').boundingBox();
      assert.ok(card.y > 130 && card.y + card.height < controls.y - 8, `${locale} chapter ${index + 1} fits above the controls`);
      assert.ok(Math.abs(card.x + card.width / 2 - 720) < 3, 'selected page is centered');
    }
    await scan(page);
    console.log(`PASS ${locale}: desktop scroll rotates paper; all five pages fit and center; accessibility`);
  }
  await context.close();
} finally {
  await browser.close();
}

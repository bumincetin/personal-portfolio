/** Verify the actual Volumes reader's curved geometry with touch and mouse input. */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axe = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2] ?? 'http://localhost:3114';
const browser = await chromium.launch({ channel: 'chrome' });
const leaf = '#sbBook .sb-full .sb-leaf';
const folio = page => page.locator(leaf).first().getAttribute('data-folio');

async function scan(page) {
  await page.addScriptTag({ content: axe });
  const violations = await page.evaluate(async () => (await window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  })).violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.failureSummary) })));
  assert.deepEqual(violations, []);
}

try {
  for (const width of [390, 768]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const cdp = await context.newCDPSession(page);
    const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', {
      type, touchPoints: type === 'touchEnd' || type === 'touchCancel' ? [] : [{ x, y, id: 1 }],
    });
    for (const locale of ['en', 'tr', 'it']) {
      await page.goto(`${base}/${locale}/volumes/document-intelligence`, { waitUntil: 'networkidle' });
      await page.locator('.sketchbook-root[data-ready="1"]').waitFor();
      await page.locator('#sbBook').scrollIntoViewIfNeeded();
      const rect = await page.locator('#sbBook').boundingBox();
      const y = Math.max(150, Math.min(550, rect.y + 170));
      const startX = rect.x + rect.width * .82;
      await touch('touchStart', startX, y);
      await touch('touchMove', startX - 12, y);
      await touch('touchMove', startX - 12 - rect.width * .17, y);
      await page.waitForTimeout(100);
      const curl = page.locator('#sbBook .curl.single-turn');
      assert.equal(await curl.count(), 1, 'mobile uses a curved sheet, not a slide/fade');
      assert.equal(await curl.locator('.strip').count(), 18);
      assert.equal(await curl.locator('.sb-verso').count(), 18, 'each strip has a physical reverse face');
      const geometry = await curl.evaluate(element => ({
        span: +element.style.getPropertyValue('--span'),
        transform: getComputedStyle(element).transform,
        nested: getComputedStyle(element.querySelector('.strip .strip')).transform,
        opacity: getComputedStyle(element).opacity,
      }));
      assert.ok(geometry.span > .9, 'single-page curl spans the whole sheet');
      assert.ok(geometry.transform.startsWith('matrix3d(') && geometry.nested.startsWith('matrix3d('), 'the sheet bends along a chain of rotated strips');
      assert.equal(geometry.opacity, '1', 'the sheet stays opaque during a turn');
      assert.equal(await curl.getAttribute('aria-hidden'), 'true');
      await touch('touchMove', startX - 12 - rect.width * .43, y);
      await touch('touchEnd');
      await page.waitForTimeout(1400);
      assert.equal(await folio(page), '2', 'forward swipe lands on the next leaf');
      assert.equal(await page.locator('#sbBook .curl').count(), 0, 'temporary strip clones are removed');

      const reverseX = rect.x + rect.width * .15;
      await touch('touchStart', reverseX, y);
      await touch('touchMove', reverseX + 12, y);
      await touch('touchMove', reverseX + 12 + rect.width * .4, y);
      await touch('touchEnd');
      await page.waitForTimeout(1400);
      assert.equal(await folio(page), '1', 'backward swipe unfolds the previous leaf');

      // A small drag that is held still must return, not use stale fling speed.
      await touch('touchStart', startX, y);
      await touch('touchMove', startX - 12, y);
      await touch('touchMove', startX - 12 - rect.width * .08, y);
      await page.waitForTimeout(200);
      await touch('touchEnd');
      await page.waitForTimeout(1300);
      assert.equal(await folio(page), '1', 'a cancelled partial turn restores the original leaf');

      await page.locator('#sbRight').click();
      await page.waitForTimeout(1300);
      assert.equal(await folio(page), '2', 'button navigation turns a page');
      await scan(page);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      console.log(`PASS ${locale} ${width}px: curved touch turn, reverse face, backward swipe, cancelled turn, buttons, accessibility`);
    }
    assert.deepEqual(errors, []);
    if (width === 390) {
      await page.goto(`${base}/en/front-matter`, { waitUntil: 'networkidle' });
      await page.locator('.plate').nth(11).evaluate(element => element.click());
      await page.waitForTimeout(600);
      const dense = page.locator(leaf);
      await dense.evaluate(element => { element.scrollTop = 80; });
      const readingPosition = await dense.evaluate(element => element.scrollTop);
      assert.ok(readingPosition > 0);
      const box = await page.locator('#sbBook').boundingBox();
      const x = box.x + box.width * .8, y = Math.max(180, Math.min(500, box.y + 180));
      await touch('touchStart', x, y);
      await touch('touchMove', x - 12, y);
      await touch('touchMove', x - 40, y);
      await page.waitForTimeout(200);
      assert.equal(await page.locator('#sbBook .curl .face.front .sb-leaf').first().evaluate(element => element.scrollTop), readingPosition, 'the curved text retains the reading position');
      await touch('touchEnd');
      await page.waitForTimeout(1400);
      assert.equal(await folio(page), '12');
      assert.equal(await dense.evaluate(element => element.scrollTop), readingPosition, 'cancelling the turn restores the live page at the same position');
      console.log('PASS long page: reading position survives the curved preview and a cancelled turn');
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/en/volumes/document-intelligence`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000); // Let the opening riffle finish.
  await page.locator('#loupeBtn').click();
  const rect = await page.locator('#sbBook').boundingBox();
  const x = rect.x + rect.width * .85, y = rect.y + rect.height * .4;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 15, y);
  await page.mouse.move(x - rect.width * .24, y, { steps: 8 });
  assert.equal(await page.locator('#sbBook .curl:not(.single-turn)').count(), 1);
  assert.equal(await page.locator('#sbBook .curl .strip').count(), 18);
  await page.mouse.move(x - rect.width * .45, y, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(1500);
  assert.equal(await folio(page), '3', 'desktop turns a two-page spread');
  await scan(page);
  console.log('PASS desktop: curved spread, live content after landing, accessibility');
  await context.close();

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const staticPage = await reduced.newPage();
  await staticPage.goto(`${base}/en/volumes/document-intelligence`, { waitUntil: 'networkidle' });
  await staticPage.locator('#sbRight').click();
  assert.equal(await folio(staticPage), '2');
  assert.equal(await staticPage.locator('#sbBook .curl').count(), 0, 'reduced motion skips the curl');
  await reduced.close();
  console.log('PASS reduced motion: immediate navigation without curved animation');
} finally {
  await browser.close();
}

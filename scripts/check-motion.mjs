/** Browser regressions for Motion gestures and the public UI component integrations. */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:3112';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const reduced of [false, true]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const page = await context.newPage();
    page.setDefaultTimeout(60000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/en`);
    await page.locator('.experience.webgl-ready').waitFor({ timeout: 60000 });
    await page.locator('#loading').waitFor({ state: 'hidden', timeout: 60000 });
    const before = await page.locator('#counter').innerText();
    await page.mouse.move(950, 430);
    await page.mouse.down();
    await page.mouse.move(700, 430, { steps: 16 });
    await page.mouse.up();
    await page.waitForFunction(value => document.querySelector('#counter').textContent.trim() !== value, before);
    assert.equal(await page.locator('.experience.mode-detail').count(), 0, 'dragging must not open a volume');
    const button = page.locator('#next');
    await button.hover();
    await page.waitForTimeout(350);
    const transform = await button.evaluate(element => getComputedStyle(element).transform);
    assert.equal(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)', reduced, 'hover lift respects reduced motion');
    await page.mouse.move(10, 100);
    await button.click();
    await page.locator('#inspect').click();
    await page.locator('.experience.mode-detail').waitFor();
    await page.locator('#close-detail').click();
    await page.locator('.experience.mode-detail').waitFor({ state: 'detached' });
    console.log(`PASS ${reduced ? 'reduced' : 'full'} motion shelf controls`);

    await page.goto(`${base}/en/volumes/portfolio-optimizer`);
    await page.locator('.sketchbook-root[data-ready="1"]').waitFor();
    if (await page.locator('#loupeBtn').getAttribute('aria-pressed') === 'true') await page.locator('#loupeBtn').click();
    await page.locator('.plate').nth(19).evaluate(element => element.click());
    const optimizer = page.locator('#sbBook .sb-full .sb-leaf section[aria-label="Geopolitical portfolio optimizer"]');
    await optimizer.waitFor();
    console.log('Checking allocation chart and profile controls');
    const donut = optimizer.getByRole('img', { name: /allocation donut/ });
    await donut.scrollIntoViewIfNeeded();
    assert.ok(await donut.locator('svg path').count() > 0, 'Bklit renders allocation slices');
    const tolerance = optimizer.getByRole('radiogroup', { name: 'Risk tolerance' });
    const radios = tolerance.getByRole('radio');
    await tolerance.locator('label').nth(0).click();
    await radios.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await radios.nth(1).isChecked(), true, 'native radio arrow navigation changes the profile');
    const weights = await optimizer.locator('tbody').first().innerText();
    await tolerance.locator('label').nth(2).click();
    await page.waitForFunction(previous => {
      const table = document.querySelector('#sbBook .sb-full .sb-leaf section[aria-label="Geopolitical portfolio optimizer"] tbody');
      return table?.innerText !== previous;
    }, weights);
    const asset = optimizer.locator('tbody').first().getByRole('button').first();
    await asset.focus();
    assert.equal(await asset.getAttribute('aria-pressed'), 'true', 'keyboard focus highlights the allocation');
    assert.ok(await donut.innerText().then(text => !text.includes('Allocated')));
    assert.equal(await page.locator('#sbBook .sb-full .sb-leaf').first().getAttribute('data-folio'), '20', 'radio arrow keys must not turn the book page');
    await page.locator('.plate').nth(18).evaluate(element => element.click());
    await page.waitForFunction(() => document.querySelector('#sbBook .sb-full .sb-leaf')?.getAttribute('data-folio') === '19');
    await page.locator('.plate').nth(19).evaluate(element => element.click());
    await optimizer.waitFor();
    assert.equal(await radios.nth(2).isChecked(), true, 'page copies must not uncheck the selected profile');
    assert.deepEqual(errors, []);
    console.log(`PASS ${reduced ? 'reduced' : 'full'} motion: mouse drag, hover, detail controls, Bklit chart and Kokonut keyboard selection`);
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(`${base}/en`);
  await page.locator('.experience.webgl-ready').waitFor({ timeout: 60000 });
  await page.locator('#loading').waitFor({ state: 'hidden', timeout: 60000 });
  const cdp = await context.newCDPSession(page);
  const swipe = async (dx, dy, cancel = false) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 280, y: 350, id: 1 }] });
    for (let i = 1; i <= 10; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 280 + dx * i / 10, y: 350 + dy * i / 10, id: 1 }] });
      await page.waitForTimeout(20);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: cancel ? 'touchCancel' : 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(350);
  };
  const initial = await page.locator('#counter').innerText();
  await swipe(0, -120);
  assert.equal(await page.locator('#counter').innerText(), initial, 'vertical gestures must not select another volume');
  await swipe(-150, 0, true);
  assert.equal(await page.locator('#counter').innerText(), initial, 'cancelled drags must not select another volume');
  await swipe(-150, 0);
  assert.notEqual(await page.locator('#counter').innerText(), initial, 'horizontal touch drag selects another volume');
  assert.equal(await page.locator('.experience.mode-detail').count(), 0, 'touch swipes must not open a volume');
  console.log('PASS touch dragging, vertical gestures and cancellation');
  await context.close();
} finally {
  await browser.close();
}

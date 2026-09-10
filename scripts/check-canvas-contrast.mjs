/**
 * Contrast for the text that sits on top of the WebGL scene.
 *
 * `scripts/check-contrast.mjs` checks the token palette and `scripts/a11y.mjs`
 * runs axe over the rendered pages, but neither covers the shelf's own chrome:
 * axe treats a `<canvas>` as an image and declines to compute contrast against
 * it, which means the volume title, the deck, the counter, the button labels and
 * the reading cue — the most prominent type on the site — had no automated check
 * at all.
 *
 * Two things about this measurement are easy to get wrong, and both were got
 * wrong before they were got right:
 *
 *   1. **Do not read the canvas.** Copying from it into a 2D scratch canvas and
 *      calling `getImageData` looks correct and is not: the authored context is
 *      created without `preserveDrawingBuffer`, so outside the animation frame
 *      that drew it the buffer reads back cleared. Every sample comes out
 *      `rgb(0 0 0)`, every check passes, and the check is worthless. The frame
 *      is taken from the compositor instead, via CDP `Page.captureScreenshot`,
 *      which also means the grain overlay and the vignette are included — a
 *      check against the raw scene would miss the vignette darkening the
 *      corners.
 *
 *   2. **Hide the glyphs, not the element.** The brightest pixel inside a light
 *      headline's box is the headline, so sampling the box as-is compares the
 *      type against itself and reports 1.00:1. The frame is therefore captured
 *      with the overlay text made transparent — and *transparent*, not
 *      `visibility: hidden`, because hiding an element takes its own background
 *      with it. The reading cue sits on a translucent pill of its own; hiding it
 *      measured the bare scene behind the pill and understated the ratio by
 *      nearly two points.
 *
 *   3. **Sample the glyph run, not the element box.** The controls are pills
 *      with a radius of 999px. Their bounding boxes include the four corners
 *      that fall outside the pill, where the raw scene shows through and no
 *      letter is ever drawn — sampling those reported the Open button at 4.26:1
 *      when its actual ground is its own scrim. The rectangle comes from a
 *      `Range` over the element's contents instead, which is the box the text
 *      really occupies.
 *
 * Within that rectangle the worst pixel is taken, not the average: a headline is
 * only as legible as the worst patch of shelf behind it. The scene drifts, so
 * several frames are sampled and the worst across all of them is reported.
 *
 * Thresholds are WCAG 2.2 AA: 4.5:1 for body-sized text, 3:1 for large text
 * (>= 24 px, or >= 18.66 px bold), measured from the computed style rather than
 * assumed.
 *
 * Usage: node scripts/check-canvas-contrast.mjs [baseUrl]
 */

import { chromium } from 'playwright';

const BASE = (process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3000').replace(/\/$/, '');

/** Overlay elements that carry meaning, with what each one is. */
const TARGETS = [
  ['#selection-title', 'the selected volume title'],
  ['#selection-note', 'the selected volume deck'],
  ['#counter', 'the volume counter'],
  ['#inspect', 'the Open button'],
  ['.shelf-continue', 'the reading cue'],
  ['.editorial-identity h1', 'the collection name'],
  ['.editorial-identity > span', 'the collection note'],
  ['.collection-eyebrow', 'the practice discipline'],
  ['.selection__discipline', 'the selected service'],
  // The `.editorial-index` block — an edition line and a palette name
  // ("Ultramarine · bone · copper") — is no longer rendered. It described the
  // colours of a cover rather than the problem inside it.
  ['.browse-ui .microcopy', 'the browse hint'],
];

/** Frames sampled per run. The shelf drifts, so one frame is not the worst case. */
const FRAMES = 5;

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);

/*
 * Wait for the shelf, and wait for it properly.
 *
 * This used to sleep nine seconds and then ask a locator whether the engine had
 * rendered, which was two guesses stacked on each other. Replacing the sleep
 * with `waitForFunction` alone was worse: fired straight after
 * `domcontentloaded` it races Next's hydration, the execution context is
 * replaced under it, and the rejection reads exactly like "the shelf never
 * rendered" — a green-looking failure for a shelf that was plainly on screen.
 *
 * So: wait for `load` first, so hydration has a context to run in, then poll the
 * page directly for the class the engine sets.
 *
 * Polling with `evaluate` rather than asking Playwright to wait is deliberate,
 * and was arrived at the hard way. `waitForFunction` never resolved here at all.
 * Neither did `waitForSelector('#experience.webgl-ready')` — while, on the same
 * page and in the same breath, `waitForSelector('#experience')` and
 * `waitForSelector('.webgl-ready')` both resolved in under 150ms and an
 * `evaluate` reported the element's class as exactly `experience webgl-ready`.
 * Whatever that is, it is not something this check should be built on, and a
 * failing wait here reads as "the shelf is broken" — the most misleading failure
 * a check can produce.
 */
await page.goto(`${BASE}/en`, { waitUntil: 'load' });
await page.waitForTimeout(1200);

let ready = false;
for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
  ready = await page.evaluate(
    () => document.querySelector('#experience')?.classList.contains('webgl-ready') === true,
  );
  if (!ready) await page.waitForTimeout(500);
}

if (!ready) {
  console.error('The shelf never reached a rendered WebGL state; there is nothing to sample.');
  await browser.close();
  process.exit(1);
}

// One extra beat so the first frame sampled is a settled one rather than part
// of the opening sweep the engine plays as it appears.
await page.waitForTimeout(1500);

/** Reads each target's colour, box and type size while it is still visible. */
const describe = () =>
  page.evaluate(
    (list) =>
      list.map(([selector, what]) => {
        const el = document.querySelector(selector);
        if (!el) return { what, missing: true };

        // The glyph run, not the padded pill around it.
        const range = document.createRange();
        range.selectNodeContents(el);
        const text = range.getBoundingClientRect();
        range.detach?.();
        const box = text.width >= 1 && text.height >= 1 ? text : el.getBoundingClientRect();
        if (box.width < 1 || box.height < 1) return { what, missing: true };

        const style = getComputedStyle(el);
        const parts = (style.color.match(/[\d.]+/g) ?? []).map(Number);
        const size = parseFloat(style.fontSize);
        const weight = Number(style.fontWeight) || 400;

        return {
          what,
          fg: [parts[0], parts[1], parts[2]],
          box: { x: box.left, y: box.top, w: box.width, h: box.height },
          size,
          large: size >= 24 || (size >= 18.66 && weight >= 700),
        };
      }),
    TARGETS,
  );

/**
 * Makes the glyphs invisible while leaving every box, scrim and backdrop filter
 * painted, so what gets sampled is the ground the text is actually read against.
 */
const setGlyphsHidden = (hidden) =>
  page.evaluate(
    ({ list, hide }) => {
      for (const [selector] of list) {
        const el = document.querySelector(selector);
        if (!el) continue;
        el.style.color = hide ? 'transparent' : '';
        el.style.webkitTextFillColor = hide ? 'transparent' : '';
      }
    },
    { list: TARGETS, hide: hidden },
  );

/** Samples the ground rectangles out of one text-free frame. */
const sample = (dataUrl, described) =>
  page.evaluate(
    async ({ url, items }) => {
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('frame did not decode'));
        image.src = url;
      });

      const shot = document.createElement('canvas');
      shot.width = image.width;
      shot.height = image.height;
      const ctx = shot.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(image, 0, 0);

      // The screenshot is in device pixels; boxes are in CSS pixels.
      const scale = image.width / window.innerWidth;

      const channel = (v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      };
      const lum = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
      const ratio = (fg, bg) => {
        const a = lum(fg);
        const b = lum(bg);
        const [hi, lo] = a > b ? [a, b] : [b, a];
        return (hi + 0.05) / (lo + 0.05);
      };

      return items.map((item) => {
        if (item.missing) return item;

        const x0 = Math.max(0, Math.round(item.box.x * scale));
        const y0 = Math.max(0, Math.round(item.box.y * scale));
        const w = Math.min(shot.width - x0, Math.round(item.box.w * scale));
        const h = Math.min(shot.height - y0, Math.round(item.box.h * scale));
        if (w < 1 || h < 1) return { ...item, missing: true };

        const { data } = ctx.getImageData(x0, y0, w, h);

        let worstRatio = Infinity;
        let worstPixel = null;
        for (let y = 0; y < h; y += 2) {
          for (let x = 0; x < w; x += 2) {
            const i = (y * w + x) * 4;
            const pixel = [data[i], data[i + 1], data[i + 2]];
            const value = ratio(item.fg, pixel);
            if (value < worstRatio) {
              worstRatio = value;
              worstPixel = pixel;
            }
          }
        }

        return { ...item, ratio: worstRatio, pixel: worstPixel };
      });
    },
    { url: dataUrl, items: described },
  );

const worst = new Map();

for (let frame = 0; frame < FRAMES; frame += 1) {
  const described = await describe();

  await setGlyphsHidden(true);
  // One frame for the style change to composite before the capture.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  await setGlyphsHidden(false);

  for (const result of await sample(`data:image/png;base64,${data}`, described)) {
    const current = worst.get(result.what);
    if (result.missing) {
      if (!current) worst.set(result.what, result);
      continue;
    }
    if (!current || current.missing || result.ratio < current.ratio) worst.set(result.what, result);
  }

  await page.waitForTimeout(320);
}

await browser.close();

const rows = [];
let failures = 0;

for (const [, what] of TARGETS) {
  const result = worst.get(what);
  if (!result || result.missing) {
    rows.push({ what, ratio: 'not rendered', min: '-', ok: false, detail: '' });
    failures += 1;
    continue;
  }
  const min = result.large ? 3 : 4.5;
  const ok = result.ratio >= min;
  if (!ok) failures += 1;
  rows.push({
    what: `${what} (${Math.round(result.size)}px)`,
    ratio: result.ratio.toFixed(2),
    min,
    ok,
    detail: `worst ground rgb(${result.pixel.join(' ')})`,
  });
}

const width = Math.max(...rows.map((r) => r.what.length));
for (const row of rows) {
  console.log(
    `${row.ok ? 'PASS' : 'FAIL'}  ${row.what.padEnd(width)}  ${String(row.ratio).padStart(6)} : 1  (needs ${row.min})  ${row.detail}`,
  );
}

console.log('');
if (failures > 0) {
  console.error(`Canvas contrast check failed: ${failures} overlay element(s) below target.`);
  process.exit(1);
}
console.log(`Canvas contrast check passed: ${rows.length} overlay elements are legible against the scene.`);

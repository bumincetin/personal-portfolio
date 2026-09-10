/**
 * Browser smoke tests.
 *
 * Drives the real production build in the installed Chrome and checks the
 * things a server-side fetch cannot: the shelf actually renders, a volume can
 * be read and turned, layout holds at four widths, the keyboard works, and the
 * contact form tells the truth about what happened to a submission.
 *
 * Deliberately not a full end-to-end suite. It covers the scenarios that would
 * be embarrassing to get wrong and that only a browser can observe.
 *
 * Message handoff is covered by scripts/check-experience.mjs. No inquiry is sent.
 *
 * Usage: node scripts/smoke.mjs [baseUrl] [--shots <dir>]
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3112';
const shotsIndex = process.argv.indexOf('--shots');
const SHOTS = shotsIndex > -1 ? process.argv[shotsIndex + 1] : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

const WIDTHS = [360, 390, 768, 1440];

const results = [];
const record = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

const VOLUMES = [
  'document-intelligence',
  'forecasting',
  'reporting',
  'cross-border',
  'greenwashing-risk-scoring',
  'parliamentary-seat-forecast',
  'portfolio-optimizer',
];

const PAGES = [
  '/en',
  '/en/contact',
  '/en/chapters',
  ...VOLUMES.map((slug) => `/en/volumes/${slug}`),
  '/tr',
  '/tr/contact',
  '/it/volumes/cross-border',
];

/**
 * The shelf renders continuously, so Playwright's screenshot stability wait
 * never settles. CDP captures a frame as-is.
 */
async function capture(page, file) {
  const cdp = await page.context().newCDPSession(page);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(file, Buffer.from(data, 'base64'));
  await cdp.detach();
}

const browser = await chromium.launch({ channel: 'chrome' });

try {
  /* ----------------------------------------------------------------
   * Layout: no horizontal overflow at any width, on any page.
   * ---------------------------------------------------------------- */
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();

    const overflowing = [];
    for (const route of PAGES) {
      await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(route === '/en' || route === '/tr' ? 2500 : 700);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 1) overflowing.push(`${route} (+${overflow}px)`);
    }
    record(`no horizontal overflow at ${width}px`, overflowing.length === 0, overflowing.join(', '));

    if (SHOTS && (width === 390 || width === 1440)) {
      await page.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(6000);
      await capture(page, path.join(SHOTS, `home-${width}.png`));
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(String(error)));

  /* ----------------------------------------------------------------
   * The shelf.
   * ---------------------------------------------------------------- */
  await page.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(8000);

  record(
    'the shelf reaches a rendered WebGL state',
    await page.locator('#experience').evaluate((el) => el.classList.contains('webgl-ready')),
  );
  record('the loading veil is dismissed', await page.locator('#loading').isHidden());
  record('all seven volumes are on the shelf', (await page.locator('#markers button').count()) === 7);

  const selected = (await page.locator('#selection-title').innerText()).trim();
  record('the selected volume is named by its problem', selected.length > 3, selected);

  await page.locator('#inspect').click();
  await page.waitForTimeout(2600);
  const volumeHref = await page.locator('.volume-link').getAttribute('href');
  record('an opened volume links into its reader', Boolean(volumeHref?.includes('/volumes/')), volumeHref ?? '');
  record(
    'the detail panel states what the problem costs',
    (await page.locator('#detail-theme').innerText()).trim().length > 3,
  );
  if (SHOTS) await capture(page, path.join(SHOTS, 'shelf-detail.png'));

  await page.locator('#close-detail').click();
  await page.waitForTimeout(1400);

  /* ----------------------------------------------------------------
   * The home page is the shelf, and only the shelf.
   * ---------------------------------------------------------------- */
  record(
    'the home page does not scroll',
    await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1),
  );
  record(
    'nothing is rendered below the shelf',
    await page.evaluate(() => !document.querySelector('footer') && document.querySelectorAll('main').length === 1),
  );

  // The shelf must not be the only way on: its wheel gesture browses volumes.
  await page.locator('.shelf-continue').click();
  await page.waitForURL('**/front-matter');
  // The book riffles itself open before it settles.
  await page.waitForTimeout(6000);
  /*
   * Leaves live in two places once the book is open: the source container, and
   * the spread being read — which holds the originals rather than copies, so
   * that React stays attached to them. Counting one container would miss the
   * two on screen, so they are counted by identity.
   */
  const countLeaves = () =>
    page.evaluate(
      () =>
        new Set(
          [...document.querySelectorAll('#sbSource .sb-leaf, #sbBook .sb-full .sb-leaf')].map((l) => l.dataset.folio),
        ).size,
    );

  record(
    'the reading cue opens the front matter',
    (await page.getByText('The expensive part is never the work', { exact: false }).count()) > 0,
  );
  record('the front matter is a book, not a page', (await countLeaves()) > 8, `${await countLeaves()} leaves`);

  /* ----------------------------------------------------------------
   * A volume, read as a book.
   * ---------------------------------------------------------------- */
  await page.goto(`${BASE}/en/volumes/greenwashing-risk-scoring`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  const leafCount = await countLeaves();
  record('a volume has leaves', leafCount > 10, `${leafCount} leaves`);
  record('the volume names itself in a heading', (await page.locator('h1').first().innerText()).trim().length > 3);

  /*
   * The pages are text, not pictures.
   *
   * This is the check that matters most about the sketchbook port. The authored
   * ThreeUI component draws every spread as a PNG; if this port had done the
   * same, the assertion below would fail and so would selection, Ctrl+F,
   * translation and every screen reader.
   */
  record(
    'every leaf is in the DOM as real text',
    await page.evaluate(() =>
      [...document.querySelectorAll('#sbSource .sb-leaf, #sbBook .sb-full .sb-leaf')].every(
        (l) => (l.textContent ?? '').trim().length > 0,
      ),
    ),
  );
  record(
    'the open spread is real text, not an image',
    await page.evaluate(() => {
      const spread = document.querySelector('#sbBook .sb-full .sb-paper');
      return Boolean(spread) && spread.querySelectorAll('img').length === 0 && spread.innerText.trim().length > 40;
    }),
  );

  const caption = () => page.locator('.sb-caption').first().innerText();
  const openLeaves = () =>
    page.evaluate(() => [...document.querySelectorAll('#sbBook .sb-full .sb-leaf')].map((l) => l.dataset.folio).join(','));

  const start = await openLeaves();
  await page.locator('#sbRight').click();
  await page.waitForTimeout(2200);
  const after = await openLeaves();
  record('the page-turn control advances the book', start !== after, `${start} -> ${after}`);

  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(2200);
  const afterKey = await openLeaves();
  record('arrow keys turn pages', after !== afterKey, `${after} -> ${afterKey}`);

  record('the caption names the open spread', (await caption()).trim().length > 0, await caption());

  // The magnifier is the authored interaction, and it magnifies live DOM rather
  // than an upscaled bitmap — so what is under the glass is selectable text.
  record(
    'the magnifier shows the page rather than a picture of it',
    await page.evaluate(() => {
      const inner = document.querySelector('#zoomInner');
      return Boolean(inner) && inner.innerText.trim().length > 20 && inner.querySelectorAll('img').length === 0;
    }),
  );

  const zoomBefore = await page.locator('#zRead').innerText();
  await page.locator('#zIn').click();
  await page.waitForTimeout(700);
  record(
    'the zoom control changes the view',
    (await page.locator('#zRead').innerText()) !== zoomBefore,
    `${zoomBefore} -> ${await page.locator('#zRead').innerText()}`,
  );
  /*
   * The complaint this redesign answers: a book page that scrolls. Every leaf
   * has to fit, which is what the prose and list paginators in volume-pages.ts
   * are for.
   *
   * The optimizer is the one exception and is allowed by name. It is an
   * instrument set into the book rather than a page of it — inputs, a solver
   * and three charts — and splitting its controls from its results across a
   * page turn would make it unusable.
   */
  const tall = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#sbBook .sb-full .sb-leaf'))
      .filter((el) => el.scrollHeight > el.clientHeight + 1 && !el.querySelector('.reader-demo'))
      .map((el) => `${el.dataset.folio}+${el.scrollHeight - el.clientHeight}`),
  );
  record('no leaf on the open spread is taller than the page', tall.length === 0, tall.join(' '));

  record('the evidence figures survive into the book', (await page.getByText('0.906', { exact: false }).count()) > 0);

  // The contents is the volume's own, and every leaf is in it.
  record(
    'the contents lists every leaf',
    (await page.locator('.plate').count()) === leafCount,
    `${await page.locator('.plate').count()} of ${leafCount}`,
  );
  if (SHOTS) await capture(page, path.join(SHOTS, 'reader.png'));

  // The optimizer is bound into its own volume rather than a separate page.
  await page.goto(`${BASE}/en/volumes/portfolio-optimizer`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  await page.evaluate(() => {
    const leaves = [...document.querySelectorAll('#sbSource .sb-leaf, #sbBook .sb-full .sb-leaf')];
    const demo = leaves.find((l) => l.querySelector('.reader-demo'));
    // The contents is ordered by folio, so its row for a leaf is folio - 1.
    // Indexing by DOM order would not do: the open leaves sit in the book,
    // which comes after the source container in the document.
    [...document.querySelectorAll('.plate')][Number(demo?.dataset.folio ?? 1) - 1]?.click();
  });
  await page.waitForTimeout(5000);
  record(
    'the optimizer runs inside its volume',
    (await page.locator('#sbBook .sb-full .reader-demo').locator('table, svg, canvas').count()) > 0,
  );
  record(
    'the optimizer has a spread to itself',
    await page.evaluate(() => {
      const paper = document.querySelector('#sbBook .sb-full .sb-paper');
      return Boolean(paper?.classList.contains('single'));
    }),
  );

  /* ----------------------------------------------------------------
   * Contact: no fake success, and an email fallback.
   * ---------------------------------------------------------------- */
  await page.goto(`${BASE}/en/contact`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1400);

  record('contact has a guided conversation', await page.locator('#conversation-name').isVisible());
  record('contact keeps the CV on its own page', await page.locator('.career-chapter, .colophon-portrait').count() === 0);
  record('the inquiry fields work without a mail provider', await page.locator('#conversation-name').isEnabled());
  record('a direct email fallback is offered', await page.locator('.conversation-direct a[href^="mailto:"]').count() === 1);
  if (SHOTS) await capture(page, path.join(SHOTS, 'contact.png'));

  await page.goto(BASE + '/en/chapters', { waitUntil: 'domcontentloaded' });
  record('Chapters contains the career timeline', await page.locator('.career-chapter').count() === 5);
  record('Chapters carries education and experience', await page.locator('#education-title, #experience-title').count() === 2);

  /* ----------------------------------------------------------------
   * Keyboard, mobile navigation, no-JS, reduced motion.
   * ---------------------------------------------------------------- */
  await page.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.keyboard.press('Tab');
  const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '');
  record('the first tab stop is the skip link', /skip to content/i.test(firstFocus), firstFocus);

  record(
    'the focused element has a visible outline',
    await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const style = getComputedStyle(el);
      return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;
    }),
  );

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(2500);

  const menuButton = mobilePage.getByRole('button', { name: /open menu/i });
  await menuButton.click();
  await mobilePage.waitForTimeout(400);
  record('the mobile menu opens as a dialog', await mobilePage.getByRole('dialog').isVisible());
  record(
    'the mobile menu lists all seven volumes',
    (await mobilePage.getByRole('dialog').locator('a[href*="/volumes/"]').count()) === 7,
  );

  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(400);
  record('Escape closes the mobile menu', !(await mobilePage.getByRole('dialog').isVisible()));

  await menuButton.click();
  await mobilePage.waitForTimeout(400);
  await mobilePage.getByRole('link', { name: 'Türkçe' }).click();
  await mobilePage.waitForURL('**/tr');
  record('the language switcher reaches the equivalent page', mobilePage.url().endsWith('/tr'));
  await mobile.close();

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const noJsPage = await noJs.newPage();

  // Without JS the engine never runs, so the authored static catalogue is what
  // the home page is — and it has to carry all seven problems and their links.
  await noJsPage.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded' });
  record(
    'the shelf falls back to a readable catalogue without JS',
    await noJsPage.locator('#static-fallback').isVisible(),
  );
  record(
    'the catalogue lists every volume without JS',
    (await noJsPage.locator('.fallback-book').count()) === 7,
  );

  /*
   * The book needs scripting; the argument does not.
   *
   * With JavaScript off the sketchbook is never built and the `<noscript>`
   * stylesheet hands the page back to `#sbSource` — every leaf, in order, as
   * ordinary prose. This is the check that keeps the design honest: a reading
   * experience that only exists as a WebGL-adjacent widget is not a document.
   */
  await noJsPage.goto(`${BASE}/en/front-matter`, { waitUntil: 'domcontentloaded' });
  record(
    'the argument is readable with JavaScript disabled',
    await noJsPage.locator('#sbSource').getByText('The expensive part is never the work', { exact: false }).first().isVisible(),
  );
  record(
    'the book itself is not painted without JavaScript',
    !(await noJsPage.locator('.sb-wrap').isVisible()),
  );

  await noJsPage.goto(`${BASE}/en/volumes/reporting`, { waitUntil: 'domcontentloaded' });
  const noJsLeaves = await noJsPage.locator('#sbSource .sb-leaf').count();
  record('a volume is fully readable with JavaScript disabled', noJsLeaves > 10, `${noJsLeaves} leaves in the DOM`);
  await noJs.close();

  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${BASE}/en/front-matter`, { waitUntil: 'domcontentloaded' });
  await reducedPage.waitForTimeout(2500);
  record(
    'content is visible under prefers-reduced-motion',
    await reducedPage.locator('#sbBook .sb-full').getByText('The expensive part is never the work', { exact: false }).first().isVisible(),
  );
  // The riffle is a flourish, and a flourish is the first thing to go.
  record(
    'the book does not riffle itself open under reduced motion',
    !(await reducedPage.locator('.sb-wrap.intro').count()),
  );
  await reduced.close();

  record('no console errors during the run', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

  await context.close();
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log('');
console.log(`${results.length - failed.length}/${results.length} checks passed`);
if (failed.length > 0) {
  console.error(`\n${failed.length} failing check(s):`);
  for (const f of failed) console.error(`  - ${f.name}${f.detail ? ` (${f.detail})` : ''}`);
  process.exit(1);
}

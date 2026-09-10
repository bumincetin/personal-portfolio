/**
 * Finds everything on this site that does not exist.
 *
 * Two kinds of 404 are worth catching and they are found in different ways:
 *
 *   1. **A link that goes nowhere.** Collected by walking every internal
 *      `href` on every route and asking the server for it.
 *   2. **An asset the page asks for and does not get.** Collected by driving a
 *      real browser and recording every response with a 404 status — fonts,
 *      images, chunks, the favicon. These never show as a broken page; they
 *      show as a missing glyph, an empty box, or nothing at all, which is why
 *      they survive so long.
 *
 * External links are reported separately and are not failures: a 404 on someone
 * else's server is worth knowing about but is not this build's to fix, and a
 * rate-limited host answering 429 is not evidence of anything.
 *
 * Usage: node scripts/check-links.mjs [baseUrl]
 */

import { chromium } from 'playwright';

const BASE = (process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3000').replace(/\/$/, '');
const LOCALES = ['en', 'tr', 'it'];

const VOLUMES = [
  'document-intelligence',
  'forecasting',
  'reporting',
  'cross-border',
  'greenwashing-risk-scoring',
  'parliamentary-seat-forecast',
  'portfolio-optimizer',
];

/** Every route the site publishes, which is also what the sitemap should hold. */
const ROUTES = [
  '/',
  ...LOCALES.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/front-matter`,
    `/${locale}/chapters`,
    `/${locale}/contact`,
    ...VOLUMES.map((slug) => `/${locale}/volumes/${slug}`),
  ]),
  '/sitemap.xml',
  '/robots.txt',
];

/**
 * Routes rendered in a browser, where asset requests can be observed.
 *
 * Every one of them, not a sample. An asset that only one volume asks for — a
 * figure, a texture, a font a single leaf triggers — is exactly the kind of 404
 * a sample misses, and exactly the kind nobody notices until a visitor does.
 */
const RENDERED = ROUTES.filter((route) => !route.endsWith('.xml') && !route.endsWith('.txt') && route !== '/');

const missingAssets = new Map();
const badLinks = [];
const externalNotes = [];

/* ─────────────────────────────────────────── 1. assets, in a real browser ── */

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

/*
 * A remote origin is not localhost.
 *
 * Waiting for `load` means waiting for the WebGL bundle, the textures and three
 * self-hosted faces to arrive over a real network, which is comfortably past
 * Playwright's 30s default — and the timeout it throws looks nothing like a
 * slow page, it looks like the check failing. This is what lets the same script
 * run against a deployed site.
 */
page.setDefaultNavigationTimeout(90000);

/*
 * Any failing response, not only 404.
 *
 * This watched for 404 alone until a run against production came back green
 * while quietly scraping three links off a Cloudflare 5xx error page — the
 * check had rendered a route that errored, found no 404s on it, and passed. A
 * 502 is not a better outcome than a 404, and a checker that knows only one of
 * them will keep saying "nothing is broken" about a site that is.
 */
page.on('response', (response) => {
  const code = response.status();
  if (code < 400) return;
  const url = response.url();
  if (!url.startsWith(BASE)) return;
  const at = `${code}  ${url.slice(BASE.length)}`;
  if (!missingAssets.has(at)) missingAssets.set(at, new Set());
  missingAssets.get(at).add(page.url().slice(BASE.length) || '/');
});

/** Internal hrefs found in the rendered DOM, which is where the book's are. */
const found = new Set();

for (const route of RENDERED) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'load' });
  // The shelf and the books animate; give their on-demand chunks and textures
  // time to be requested, or a missing one is simply never observed.
  await page.waitForTimeout(route === '/en' || route === '/tr' ? 9000 : 6000);

  for (const href of await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
  )) {
    if (!href || href.startsWith('#')) continue;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;
    if (/^https?:\/\//i.test(href)) {
      if (!href.startsWith(BASE)) externalNotes.push(href);
      else found.add(href.slice(BASE.length));
      continue;
    }
    found.add(href.startsWith('/') ? href : `/${href}`);
  }
}

await browser.close();

/* ──────────────────────────────────────────────── 2. routes and links ────── */

/** Follows redirects: a 308 to something real is correct, not a failure. */
async function status(pathname) {
  try {
    const response = await fetch(`${BASE}${pathname}`, { redirect: 'follow' });
    return response.status;
  } catch (error) {
    return `error: ${error.message}`;
  }
}

const toCheck = [...new Set([...ROUTES, ...found])].sort();
for (const pathname of toCheck) {
  const code = await status(pathname);
  if (code !== 200) badLinks.push({ pathname, code });
}

/* ─────────────────────────────────────────────────── 3. the sitemap ──────── */

const sitemapEntries = [];
try {
  const xml = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = match[1].replace(/^https?:\/\/[^/]+/, '');
    sitemapEntries.push(loc);
  }
} catch {
  sitemapEntries.push('(sitemap could not be read)');
}

const sitemapBroken = [];
for (const loc of sitemapEntries) {
  if (loc.startsWith('(')) continue;
  const code = await status(loc || '/');
  if (code !== 200) sitemapBroken.push({ loc, code });
}

/* ─────────────────────────────────────────────────────── report ─────────── */

let failures = 0;

console.log(`Checked ${toCheck.length} internal paths and ${RENDERED.length} rendered routes.\n`);

if (missingAssets.size === 0) {
  console.log('PASS  every request the pages made succeeded');
} else {
  failures += missingAssets.size;
  console.log(`FAIL  ${missingAssets.size} request(s) failed:`);
  for (const [asset, pages] of missingAssets) {
    console.log(`        ${asset}\n          requested by: ${[...pages].join(', ')}`);
  }
}

if (badLinks.length === 0) {
  console.log('PASS  every internal link resolves');
} else {
  failures += badLinks.length;
  console.log(`FAIL  ${badLinks.length} internal path(s) do not resolve:`);
  for (const { pathname, code } of badLinks) console.log(`        ${code}  ${pathname}`);
}

if (sitemapBroken.length === 0) {
  console.log(`PASS  all ${sitemapEntries.length} sitemap entries resolve`);
} else {
  failures += sitemapBroken.length;
  console.log(`FAIL  ${sitemapBroken.length} sitemap entr(ies) do not resolve:`);
  for (const { loc, code } of sitemapBroken) console.log(`        ${code}  ${loc}`);
}

if (externalNotes.length) {
  console.log(`\n${new Set(externalNotes).size} external link(s) present, not checked here:`);
  for (const href of new Set(externalNotes)) console.log(`        ${href}`);
}

console.log('');
if (failures > 0) {
  console.error(`Link check failed: ${failures} problem(s).`);
  process.exit(1);
}
console.log('Link check passed: every link, asset and sitemap entry resolves.');

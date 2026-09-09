/**
 * Automated accessibility scan.
 *
 * Runs axe-core over every route at a mobile, a laptop and a desktop viewport,
 * and over the reader after a page has been turned as well as on its first
 * spread — a rule violation that only appears after a control is used is still
 * a violation.
 *
 * What this is NOT: an accessibility audit. Automated tooling reliably catches
 * a minority of WCAG failures. The manual checks that accompany it — keyboard,
 * focus order, zoom, reduced motion, touch targets, screen-reader labelling —
 * are recorded in docs/implementation-summary.md, and the smoke suite covers
 * the keyboard and motion parts. A clean run here is a floor, not a claim.
 *
 * Usage: node scripts/a11y.mjs [baseUrl]
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const AXE_SOURCE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE = process.argv[2] ?? 'http://localhost:3112';

const VOLUMES = [
  'document-intelligence',
  'forecasting',
  'reporting',
  'cross-border',
  'greenwashing-risk-scoring',
  'parliamentary-seat-forecast',
  'portfolio-optimizer',
];

const ROUTES = [
  '/en',
  '/en/front-matter',
  '/en/contact',
  ...VOLUMES.map((slug) => `/en/volumes/${slug}`),
  '/tr',
  '/tr/front-matter',
  '/tr/contact',
  '/tr/volumes/reporting',
  '/it/front-matter',
  '/it/volumes/cross-border',
];

/** WCAG 2.2 AA is the target, so the tag set is scoped to it. */
const RUN_OPTIONS = {
  runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
};

const browser = await chromium.launch({ channel: 'chrome' });
const findings = [];
let scans = 0;

async function scan(page, label) {
  await page.addScriptTag({ content: AXE_SOURCE });
  const result = await page.evaluate(
    async (options) => await window.axe.run(document, options),
    RUN_OPTIONS,
  );
  scans += 1;

  for (const violation of result.violations) {
    findings.push({
      label,
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.length,
      sample: violation.nodes[0]?.html?.slice(0, 120) ?? '',
    });
  }
}

try {
  /*
   * One palette, so one colour scheme. There were two themes and both were
   * scanned; the site has a single ground now — the shelf's — and a second pass
   * under `colorScheme: 'light'` would re-scan the identical rendering.
   *
   * The viewport sweep is what earns its place: reflow, target size and
   * scrollable-region findings only appear at one width or the other.
   */
  {
    for (const [sizeName, viewport] of [
      ['mobile', { width: 390, height: 844 }],
      ['desktop', { width: 1440, height: 900 }],
      ['laptop', { width: 1280, height: 720 }],
    ]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();

      for (const route of ROUTES) {
        await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' });
        // The shelf keeps rendering, so networkidle never fires on the home
        // pages; a fixed settle is both sufficient and deterministic here.
        // The shelf renders continuously and the volumes open with a riffle, so
        // neither settles on `networkidle`. Scanning mid-animation measures a
        // transient — a caption at 12% opacity is a frame of a crossfade, not a
        // contrast failure — so both are given a fixed, deterministic settle.
        const animated = route === '/en' || route === '/tr' || route.includes('/volumes/') || route.includes('front-matter');
        await page.waitForTimeout(animated ? 6000 : 1000);
        await scan(page, `${route} [${sizeName}]`);
      }

      // A volume turned past its opening spread. The wait covers the riffle the
      // book opens with; clicking before it settles would scan a leaf in flight.
      await page.goto(`${BASE}/en/volumes/greenwashing-risk-scoring`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(5000);
      await page.locator('#sbRight').click();
      // The turn is a spring, not a fixed tween; give it room to settle so the
      // scan measures the landed spread rather than a frame of the arc.
      await page.waitForTimeout(2500);
      await scan(page, `volume turned [${sizeName}]`);

      // The optimizer, on the spread it has to itself.
      await page.goto(`${BASE}/en/volumes/portfolio-optimizer`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(5000);
      await page.evaluate(() => {
        const rows = [...document.querySelectorAll('.plate')];
        rows[rows.length - 1]?.click();
      });
      await page.waitForTimeout(3500);
      await scan(page, `optimizer leaf [${sizeName}]`);

      // The mobile navigation dialog.
      if (sizeName === 'mobile') {
        await page.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2500);
        await page.getByRole('button', { name: /open menu/i }).click();
        await page.waitForTimeout(400);
        await scan(page, `/en (menu open) [${sizeName}]`);
      }

      await context.close();
    }
  }
} finally {
  await browser.close();
}

/* Group identical rule failures so the report is about defects, not instances. */
const byRule = new Map();
for (const finding of findings) {
  const entry = byRule.get(finding.id) ?? { ...finding, where: [], total: 0 };
  entry.where.push(finding.label);
  entry.total += finding.nodes;
  byRule.set(finding.id, entry);
}

console.log(`axe-core: ${scans} scans across ${ROUTES.length} routes at 3 viewports\n`);

if (byRule.size === 0) {
  console.log('No violations at wcag2a / wcag2aa / wcag21aa / wcag22aa / best-practice.');
  process.exit(0);
}

const serious = [];
for (const entry of byRule.values()) {
  const line = `${(entry.impact ?? 'unknown').toUpperCase().padEnd(8)} ${entry.id.padEnd(34)} ${entry.total} node(s)  ${entry.help}`;
  console.log(line);
  console.log(`         first seen: ${entry.where[0]}`);
  console.log(`         example:    ${entry.sample}`);
  console.log('');
  if (entry.impact === 'serious' || entry.impact === 'critical') serious.push(entry.id);
}

if (serious.length > 0) {
  console.error(`Serious or critical violations present: ${serious.join(', ')}`);
  process.exit(1);
}
console.log('No serious or critical violations.');

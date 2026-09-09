/**
 * WCAG contrast check over the real token values.
 *
 * The palette is not assumed to pass. This reads the channel triplets straight
 * out of globals.css — the same values the browser gets — and computes the
 * contrast ratio for every foreground/background pair the site actually uses.
 *
 * There is one palette to check. There used to be two, and the site would have
 * been the poorer for keeping them: the ThreeUI scene is lit for a single
 * ground, so a second theme could only ever have been a light page wrapped
 * around a dark canvas.
 *
 * Targets are WCAG 2.2 AA: 4.5:1 for normal text, 3:1 for large text and for
 * the non-text pairs (borders, focus rings, icons carrying meaning).
 *
 * Run: node scripts/check-contrast.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const CSS = fs.readFileSync(path.resolve(import.meta.dirname, '..', 'src/app/globals.css'), 'utf8');

/** Pulls the `--c-*` declarations out of one selector block. */
function readTokens(selector) {
  const start = CSS.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`selector not found: ${selector}`);
  const end = CSS.indexOf('\n}', start);
  const block = CSS.slice(start, end);

  const tokens = {};
  for (const match of block.matchAll(/--(c-[a-z0-9-]+):\s*([\d\s]+);/g)) {
    const channels = match[2].trim().split(/\s+/).map(Number);
    if (channels.length === 3 && channels.every(Number.isFinite)) tokens[match[1]] = channels;
  }
  return tokens;
}

const tokens = readTokens(':root');

const channelLuminance = (value) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = ([r, g, b]) =>
  0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);

const contrast = (fg, bg) => {
  const a = relativeLuminance(fg);
  const b = relativeLuminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};

/**
 * Pairs the site genuinely renders. `min` is the threshold that applies to that
 * pair: 4.5 where the foreground is body-sized text, 3 where it is large text,
 * an icon carrying meaning, or a structural edge.
 */
const PAIRS = [
  // Body and heading text on both grounds.
  { fg: 'c-text', bg: 'c-ground', min: 4.5, what: 'body text on the page' },
  { fg: 'c-text', bg: 'c-panel', min: 4.5, what: 'body text on a panel' },
  { fg: 'c-text', bg: 'c-panel-alt', min: 4.5, what: 'body text on an alt panel' },
  { fg: 'c-text-2', bg: 'c-ground', min: 4.5, what: 'secondary text on the page' },
  { fg: 'c-text-3', bg: 'c-ground', min: 4.5, what: 'tertiary text on the page' },

  // The muted ramp carries real prose (ledes, captions), so it is held to 4.5.
  { fg: 'c-muted', bg: 'c-ground', min: 4.5, what: 'muted prose on the page' },
  { fg: 'c-muted', bg: 'c-panel', min: 4.5, what: 'muted prose on a panel' },
  /*
   * muted-light renders at 13px, which WCAG counts as normal-size text, so it
   * takes the 4.5:1 threshold like any other prose colour. It was previously
   * held to 3:1 here on the theory that it only carried "de-emphasised meta";
   * axe-core disagreed across 575 nodes and was right.
   */
  { fg: 'c-muted-light', bg: 'c-ground', min: 4.5, what: 'de-emphasised meta on the page' },
  { fg: 'c-muted-light', bg: 'c-panel', min: 4.5, what: 'de-emphasised meta on a panel' },
  { fg: 'c-muted-light', bg: 'c-panel-alt', min: 4.5, what: 'de-emphasised meta on an alt panel' },

  // Accent as link text, button ground, and focus ring.
  { fg: 'c-brass', bg: 'c-ground', min: 4.5, what: 'accent link text on the page' },
  { fg: 'c-brass', bg: 'c-panel', min: 4.5, what: 'accent link text on a panel' },
  { fg: 'c-ground', bg: 'c-brass', min: 4.5, what: 'button label on the accent fill' },
  { fg: 'c-copper', bg: 'c-ground', min: 3, what: 'focus ring against the page' },

  // Status colours used as text.
  { fg: 'c-positive', bg: 'c-ground', min: 4.5, what: 'positive status text' },
  { fg: 'c-negative', bg: 'c-ground', min: 4.5, what: 'error text' },
  { fg: 'c-caution', bg: 'c-ground', min: 4.5, what: 'caution / synthetic label text' },
  { fg: 'c-caution', bg: 'c-panel', min: 4.5, what: 'caution label on a panel' },

  /*
   * Structure. WCAG 1.4.11 applies to the boundary of a control a person has to
   * locate and operate, not to a decorative rule between two blocks of prose.
   * So the control border is held to 3:1 and the plain hairlines are not — they
   * separate content that is already distinguishable by position and spacing,
   * and no information depends on seeing them.
   */
  { fg: 'c-hairline-control', bg: 'c-ground', min: 3, what: 'form control border on the page' },
  { fg: 'c-hairline-control', bg: 'c-panel', min: 3, what: 'form control border on a panel' },
];

let failures = 0;
const rows = [];

for (const pair of PAIRS) {
  const fg = tokens[pair.fg];
  const bg = tokens[pair.bg];
  if (!fg || !bg) {
    rows.push({ what: pair.what, ratio: 'missing', min: pair.min, ok: false });
    failures += 1;
    continue;
  }
  const ratio = contrast(fg, bg);
  const ok = ratio >= pair.min;
  if (!ok) failures += 1;
  rows.push({ what: pair.what, ratio: ratio.toFixed(2), min: pair.min, ok });
}

const width = Math.max(...rows.map((r) => r.what.length));
for (const row of rows) {
  const mark = row.ok ? 'PASS' : 'FAIL';
  console.log(`${mark}  ${row.what.padEnd(width)}  ${String(row.ratio).padStart(6)} : 1  (needs ${row.min})`);
}

console.log('');
if (failures > 0) {
  console.error(`Contrast check failed: ${failures} pair(s) below target.`);
  process.exit(1);
}
console.log(`Contrast check passed: ${rows.length} pairs meet WCAG 2.2 AA.`);

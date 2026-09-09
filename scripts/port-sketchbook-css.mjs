/**
 * Generates `src/app/components/sketchbook/sketchbook.css` from the verified
 * ThreeUI source.
 *
 * The source is a standalone document (`meng-to-sketchbook.html`, SHA-256
 * e0330548b1ac…, verified on download) whose stylesheet owns `:root`, `html` and
 * `body`. Dropping that into an application would repaint every route. So the
 * declarations are kept byte-for-byte and only the selectors are rewritten, by
 * this script rather than by hand, so the port is reproducible and the diff
 * against the source stays legible:
 *
 *   :root          ->  .sketchbook-root
 *   *              ->  .sketchbook-root *
 *   html, body     ->  dropped — the reader page already owns the document
 *   a, button      ->  .sketchbook-root a, .sketchbook-root button
 *   everything else->  prefixed with .sketchbook-root
 *
 * Asset URLs are rewritten from the source's relative `meng-to-sketchbook/`
 * to this site's `/sketchbook/`.
 *
 * THE `@font-face` RULES ARE DROPPED. Instrument Serif and Newsreader are the
 * site's display and text faces on every route, not just inside a book, so they
 * are declared once in `globals.css` and loaded from the same files. Emitting
 * them here as well would be a second declaration of the same three faces,
 * scoped to the one stylesheet that does not need it.
 *
 * FOUR BLOCKS ARE DROPPED, and it is worth saying which and why. `.wash`,
 * `.wash:after`, `.botany` and `.bloom` paint the source's Singapore botanical
 * atmosphere — a tropical watercolour of orchids, monstera and plumeria. That
 * artwork is Meng To's sketchbook identity, not this practice's, and shipping
 * it here would be decoration standing in for content on a site whose whole
 * argument is that its claims can be checked. The four image assets behind them
 * are not shipped either, so the rules would be dead references to files that
 * do not exist. The typefaces and the painted divider are kept: those are the
 * design's voice and its rule, and neither says anything about Singapore.
 *
 * Run: node scripts/port-sketchbook-css.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/*
 * The canonical source, kept in the repository.
 *
 * It lives under `vendor/` rather than `public/` on purpose: the generator
 * needs it to be reproducible, and nothing else does — serving a third party's
 * landing page from this site would publish 45 kB of someone else's work at a
 * URL of ours for no reason.
 */
const SOURCE = 'vendor/threeui/meng-to-sketchbook.html';
const EXPECTED = 'e0330548b1ac905cf1b81698163ffa29f8a3a8c39b8d39f9b71ba5b9255b6dd1';
const OUT = 'src/app/components/sketchbook/sketchbook.css';

const html = fs.readFileSync(SOURCE);
const digest = crypto.createHash('sha256').update(html).digest('hex');
if (digest !== EXPECTED) {
  console.error(`Source hash mismatch.\n  got      ${digest}\n  expected ${EXPECTED}`);
  process.exit(1);
}

const text = html.toString('utf8');
const style = text.slice(text.indexOf('<style>') + 7, text.indexOf('</style>'));

/** Selectors whose whole rule is dropped, with the reason recorded above. */
const DROP = [/^\.wash/, /^\.botany/, /^\.bloom/, /^html\b/, /^body$/, /^::selection$/];

/** Rewrites one selector into the component's scope. */
function scope(selector) {
  const s = selector.trim();
  if (!s) return null;
  if (s.startsWith('@') || s.startsWith('from') || s.startsWith('to') || /^\d+%$/.test(s)) return s;
  if (s === ':root') return '.sketchbook-root';
  if (s === '*') return '.sketchbook-root *';
  if (DROP.some((rule) => rule.test(s))) return null;
  // A descendant of the root, unless it already names the root.
  return s.startsWith('.sketchbook-root') ? s : `.sketchbook-root ${s}`;
}

/**
 * Walks the stylesheet rule by rule. A hand-rolled pass rather than a CSS
 * parser: the source is one authored file, its formatting is known, and a
 * dependency for a one-shot transform is not worth it. Anything it cannot
 * account for throws rather than being silently mangled.
 */
function transform(css) {
  const out = [];
  let i = 0;

  while (i < css.length) {
    const brace = css.indexOf('{', i);
    if (brace === -1) {
      const rest = css.slice(i).trim();
      if (rest) out.push(rest);
      break;
    }

    // A rule's head carries any comment that preceded it. Split those off, or
    // they end up glued into the selector — and a dropped rule whose head
    // starts with a comment would stop matching the drop list.
    const raw = css.slice(i, brace);
    const comments = raw.match(/\/\*[\s\S]*?\*\//g) ?? [];
    const head = raw.replace(/\/\*[\s\S]*?\*\//g, ' ').trim();
    for (const comment of comments) out.push(comment.trim());

    // At-rules that wrap other rules: recurse into the body.
    if (/^@(media|supports|layer|container)/.test(head)) {
      const end = matchBrace(css, brace);
      out.push(`${head} {\n${indent(transform(css.slice(brace + 1, end)))}\n}`);
      i = end + 1;
      continue;
    }

    // The faces are declared globally; see the note at the top of this file.
    if (/^@font-face/.test(head)) {
      i = matchBrace(css, brace) + 1;
      continue;
    }

    // At-rules with a flat body (@keyframes frames): keep as-is, except
    // @keyframes, whose frames must not be scoped.
    if (/^@keyframes/.test(head)) {
      const end = matchBrace(css, brace);
      out.push(`${head} {${css.slice(brace + 1, end)}}`);
      i = end + 1;
      continue;
    }
    if (head.startsWith('@')) {
      const end = matchBrace(css, brace);
      out.push(`${head} {${css.slice(brace + 1, end)}}`);
      i = end + 1;
      continue;
    }

    const end = matchBrace(css, brace);
    const body = css.slice(brace + 1, end).trim();
    const selectors = head
      .split(',')
      .map(scope)
      .filter(Boolean);

    if (selectors.length) out.push(`${selectors.join(',\n')} {\n  ${body}\n}`);
    i = end + 1;
  }

  return out.join('\n\n');
}

function matchBrace(css, open) {
  let depth = 0;
  for (let i = open; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error(`unbalanced brace from index ${open}`);
}

const indent = (block) =>
  block
    .split('\n')
    .map((line) => (line ? `  ${line}` : line))
    .join('\n');

const header = `/*
 * GENERATED — do not edit by hand.
 *
 * Ported from ThreeUI's \`MengToSketchbookLandingPage\`, canonical source
 * \`public/landing-pages/meng-to-sketchbook.html\`, SHA-256
 * e0330548b1ac905cf1b81698163ffa29f8a3a8c39b8d39f9b71ba5b9255b6dd1, verified on
 * download. Regenerate with \`node scripts/port-sketchbook-css.mjs\`.
 *
 * Declarations are the authored ones, unchanged. Only selectors were rewritten,
 * to scope the sheet to \`.sketchbook-root\` instead of \`:root\`/\`html\`/\`body\` —
 * the source is a standalone page and would otherwise repaint the whole site.
 *
 * Hosting adaptations live in \`sketchbook-overrides.css\`, kept separate so this
 * file stays a faithful copy. The Singapore botanical blocks (.wash, .botany,
 * .bloom) are not ported; the generator explains why.
 */

`;

const css = header + transform(style).replace(/meng-to-sketchbook\//g, '/sketchbook/') + '\n';

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, css);
console.log(`${OUT}: ${css.split('\n').length} lines from a verified source`);

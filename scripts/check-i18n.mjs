/**
 * Localisation completeness check.
 *
 * The fallback policy for this site is that there is no fallback: every key in
 * every localised content module exists in all three locales, and this script
 * fails the build if that stops being true. That is what makes it safe for the
 * language switcher to offer a route without checking whether the destination
 * is half-English.
 *
 * It walks the object shapes rather than a key list, so a new field added to
 * one locale is caught the first time it is added rather than the first time a
 * visitor lands on it.
 */

import { register } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

register('./test-resolver.mjs', import.meta.url);

const ROOT = path.resolve(import.meta.dirname, '..');
const load = (relative) => import(pathToFileURL(path.join(ROOT, relative)).href);

const LOCALES = ['en', 'tr', 'it'];

/** Collects every leaf path in an object, with array indices as `[]`. */
function collectPaths(value, prefix = '', out = new Set()) {
  if (value === null || value === undefined) {
    out.add(prefix);
    return out;
  }
  if (Array.isArray(value)) {
    // Compare arrays by shape and length, since a missing bullet is a real gap.
    out.add(`${prefix}[len=${value.length}]`);
    value.forEach((item, index) => collectPaths(item, `${prefix}[${index}]`, out));
    return out;
  }
  if (typeof value === 'object') {
    for (const key of Object.keys(value)) {
      collectPaths(value[key], prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }
  out.add(prefix);
  return out;
}

/** Leaf paths whose value is an empty string — a gap that would render blank. */
function collectEmpty(value, prefix = '', out = []) {
  if (typeof value === 'string') {
    if (value.trim() === '') out.push(prefix);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectEmpty(item, `${prefix}[${index}]`, out));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) {
      collectEmpty(value[key], prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

const problems = [];

function compare(label, byLocale, { allowEmpty = [] } = {}) {
  const reference = collectPaths(byLocale.en);

  for (const locale of LOCALES) {
    if (locale === 'en') continue;
    const actual = collectPaths(byLocale[locale]);

    for (const key of reference) {
      if (!actual.has(key)) problems.push(`${label}: "${key}" is missing from ${locale}`);
    }
    for (const key of actual) {
      if (!reference.has(key)) problems.push(`${label}: "${key}" exists in ${locale} but not in en`);
    }
  }

  for (const locale of LOCALES) {
    for (const key of collectEmpty(byLocale[locale])) {
      if (allowEmpty.some((allowed) => key.startsWith(allowed))) continue;
      problems.push(`${label}: "${key}" is an empty string in ${locale}`);
    }
  }
}

const { translations } = await load('src/lib/translations.ts');
const { UI } = await load('src/lib/content/ui.ts');
// The book's own furniture is localised too, and was not covered until the
// sketchbook was built — an English "Zoom in" on the Italian route is exactly
// the silent gap this script exists to catch.
const { SHELF_UI } = await load('src/app/components/shelf/shelf-ui.ts');
const { SKETCHBOOK_UI } = await load('src/app/components/sketchbook/sketchbook-ui.ts');
const { EXPERIENCE_COPY } = await load('src/lib/experience-copy.ts');
const services = await load('src/lib/content/services.ts');
const caseStudies = await load('src/lib/content/case-studies.ts');

compare('translations', translations);
compare('ui', UI);
compare('shelf-ui', SHELF_UI);
compare('sketchbook-ui', SKETCHBOOK_UI);
compare('experience-copy', EXPERIENCE_COPY);

compare(
  'services',
  Object.fromEntries(LOCALES.map((locale) => [locale, services.getAllServiceCopy(locale)])),
);

// `baseline` is intentionally empty where a project has no legitimate baseline
// to state; an empty string there is a decision, not a gap.
for (const slug of caseStudies.caseStudySlugs) {
  compare(
    `case-study:${slug}`,
    Object.fromEntries(LOCALES.map((locale) => [locale, caseStudies.getCaseStudyCopy(locale, slug)])),
    { allowEmpty: ['baseline'] },
  );
}

if (problems.length > 0) {
  console.error(`\nLocalisation check failed with ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error('');
  process.exit(1);
}

console.log(`Localisation check passed: ${LOCALES.join(', ')} are structurally identical and complete.`);

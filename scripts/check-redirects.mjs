/**
 * Redirect checks for every URL this redesign retired.
 *
 * The old site had a services index, four service pages, a work index, four
 * case studies, an SME page, a methodology page, an About page and a demo
 * portal. All of them were live and indexable; all of them are gone. Each one
 * has to answer 308 and point at the volume that now carries its content, in
 * the language the visitor arrived in — otherwise the redesign silently turns
 * every existing link and search result into a 404.
 *
 * The redirect table lives in `next.config.js` and is easy to edit without
 * noticing that a `:locale` param stopped matching or that a destination slug
 * was renamed. This asserts the resolved behaviour rather than the config, so a
 * rename is caught by the check rather than by a visitor.
 *
 * `redirect: 'manual'` matters: following the redirect would turn a wrong
 * destination into a passing 200.
 *
 * Usage: node scripts/check-redirects.mjs [baseUrl]
 */

const BASE = (process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://localhost:3000').replace(/\/$/, '');
const LOCALES = ['en', 'tr', 'it'];

/** Retired path (after the locale segment) -> where it must land. */
const RETIRED = {
  '/services': '',
  '/services/ai-nlp': '/volumes/document-intelligence',
  '/services/financial-analytics': '/volumes/forecasting',
  '/services/business-intelligence': '/volumes/reporting',
  '/services/financial-consultancy': '/volumes/cross-border',
  '/assets': '',
  '/assets/greenwashing-risk-scoring': '/volumes/greenwashing-risk-scoring',
  '/assets/parliamentary-seat-forecast': '/volumes/parliamentary-seat-forecast',
  '/assets/portfolio-optimizer': '/volumes/portfolio-optimizer',
  // The statement-review study was withdrawn: it described a demo whose figures
  // could not be sourced. Its URL goes to the service volume on the subject.
  '/assets/statement-review': '/volumes/document-intelligence',
  '/methodology': '',
  '/why-sme': '',
  '/portal': '',
  '/about': '/contact',
};

const results = [];
const record = (name, ok, detail = '') => {
  results.push(ok);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

/** Resolves a Location header against the request URL and strips the origin. */
const pathOf = (location, from) => {
  try {
    return new URL(location, `${BASE}${from}`).pathname;
  } catch {
    return location;
  }
};

async function expectRedirect(from, to) {
  let response;
  try {
    response = await fetch(`${BASE}${from}`, { redirect: 'manual' });
  } catch (error) {
    record(`${from} -> ${to}`, false, `request failed: ${error.message}`);
    return;
  }

  const location = response.headers.get('location');
  const landed = location ? pathOf(location, from) : null;

  if (response.status !== 308) {
    record(`${from} -> ${to}`, false, `status ${response.status}, expected 308`);
    return;
  }
  if (landed !== to) {
    record(`${from} -> ${to}`, false, `landed on ${landed ?? '(no Location header)'}`);
    return;
  }
  record(`${from} -> ${to}`, true);
}

async function main() {
  // The bare root has no page: the locale segment owns the document.
  await expectRedirect('/', '/en');

  // The icon paths iOS asks for by convention, before it has read the document.
  await expectRedirect('/apple-touch-icon.png', '/apple-icon.png');
  await expectRedirect('/apple-touch-icon-precomposed.png', '/apple-icon.png');

  for (const locale of LOCALES) {
    for (const [from, to] of Object.entries(RETIRED)) {
      await expectRedirect(`/${locale}${from}`, `/${locale}${to}`);
    }
  }

  // A locale that does not exist must not be swallowed by the `:locale` param.
  const stray = await fetch(`${BASE}/de/services/ai-nlp`, { redirect: 'manual' });
  record('an unknown locale is not redirected', stray.status === 404, `status ${stray.status}`);

  const failed = results.filter((ok) => !ok).length;
  console.log(
    failed === 0
      ? `\nRedirect check passed: ${results.length} retired URLs resolve to their replacement.`
      : `\n${failed} of ${results.length} redirect checks failed.`,
  );
  process.exit(failed === 0 ? 0 : 1);
}

main();

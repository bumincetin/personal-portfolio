# bumincetin.com

A shelf of seven volumes and a colophon. Each volume is titled by an expensive
problem — the thing that costs money while it goes unfixed — and opens into a
book you can read page by page.

Next.js 15 (App Router) · TypeScript · Tailwind · Three.js r165 ·
Cloudflare Workers via OpenNext · English, Turkish, Italian.

---

## Running it

```bash
npm install
npm run dev            # http://localhost:3000/en
```

The dev server writes to `.next-dev` rather than `.next`, so it can run
alongside a production build without the two corrupting each other's assets:

```bash
npm run build:next     # writes .next
npx next start -p 3112 # serve the production build while dev keeps running
```

## Checks

```bash
npm run verify         # lint → types → i18n → contrast → unit → build
```

Individually:

| Command | What it checks |
| --- | --- |
| `npm run lint` | ESLint 9, flat config |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | unit tests, via Node's built-in runner — no framework |
| `npm run test:i18n` | en/tr/it are structurally identical, with no empty strings |
| `npm run test:contrast` | every colour pair the site renders, against WCAG 2.2 AA |
| `npm run test:smoke -- <url>` | the real build in a real browser |
| `npm run test:a11y -- <url>` | axe-core over every route at three viewports |
| `npm run test:canvas -- <url>` | the shelf's overlay text against the rendered scene — the one thing axe cannot measure |

`scripts/port-sketchbook-css.mjs` regenerates the reader's stylesheet from the
verified ThreeUI source in `vendor/threeui/`, and refuses to run if that file's
SHA-256 no longer matches.
| `npm run test:redirects -- <url>` | every retired URL still resolves to its replacement |
| `npm run test:links -- <url>` | renders every route and fails on any 404 — a link, an asset, a sitemap entry |

The browser suites need a running server and use the installed Chrome:

```bash
npx next start -p 3112 &
npm run test:smoke     -- http://localhost:3112
npm run test:a11y      -- http://localhost:3112
npm run test:redirects -- http://localhost:3112
```

To exercise the contact form's full lifecycle, start a second instance with
dummy credentials and point the smoke suite at it. The request is intercepted in
the browser, so nothing is ever sent:

```bash
RESEND_API_KEY=dummy CONTACT_TO_EMAIL=nobody@example.invalid \
CONTACT_FROM_EMAIL=noreply@example.invalid npx next start -p 3113 &
npm run test:smoke -- http://localhost:3112 --configured http://localhost:3113
```

There is also `node scripts/find-orphans.mjs`, which reports source modules no
route can reach.

## Configuration

Copy `.env.example` to `.env.local`. Nothing is required to run the site: with
no mail provider configured the contact form renders **disabled** and offers the
published email address instead, rather than silently discarding what someone
writes. See `docs/launch-checklist.md`.

---

## How it fits together

```
src/app/[locale]/page.tsx              the shelf + the written argument
src/app/[locale]/volumes/[slug]/       one volume, read as a book
src/app/[locale]/contact/              portrait, the record, the inquiry form
src/app/api/contact/route.ts           the only endpoint

src/lib/profile.ts                     identity and contact channels
src/lib/content/evidence.ts            every published number, with provenance
src/lib/content/services.ts            service spine + localised prose
src/lib/content/case-studies.ts        evidence spine + localised prose
src/lib/content/volume-pages.ts        binds the above into book pages
src/lib/content/ui.ts                  UI vocabulary, three locales

src/app/components/shelf/              the ported ThreeUI shelf and the reader
```

Two rules the codebase enforces rather than documents:

- **Content modules hold no facts.** `ui.ts`, `services.ts` and
  `case-studies.ts` hold prose; `profile.ts` and `evidence.ts` hold the facts,
  and every published number carries its source, method, baseline, date and
  limitations. A figure with no entry in `evidence.ts` does not get rendered.
- **Every key exists in all three locales.** `npm run test:i18n` fails the build
  otherwise, which is why the language switcher can offer any route without
  risking a half-English page.

## The shelf

The presentation is ThreeUI's `CompleteShelfLandingPage`, ported from its
registered source and verified against the published SHA-256 before use. The
engine and stylesheet are **generated** — `src/app/components/shelf/engine.js`
and `shelf.css` — so change the generator or the volume data, not those files.

`docs/implementation-summary.md` lists every deviation from the authored source
and why each one was necessary.

## Documentation

| File | What it is |
| --- | --- |
| `docs/content-verification.md` | every disputed claim, the evidence, and what was removed |
| `docs/implementation-summary.md` | architecture, the port, and what was actually verified |
| `docs/launch-checklist.md` | what must happen before this goes live |
| `docs/usability-test-script.md` | a script for testing with real prospects |

## Deploying

Not done from here. `npm run deploy` runs the OpenNext build and deploys to
Cloudflare; read `docs/launch-checklist.md` first.

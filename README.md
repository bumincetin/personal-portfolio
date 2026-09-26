# bumincetin.com

A multilingual working portfolio: four services, two research projects and one synthetic demonstration. An interactive 3D working room opens the homepage, followed by a slow, semantic work gallery and complete reading pages with Quick Read summaries and sourced evidence. Next.js 15 App Router, React, TypeScript and Cloudflare Workers via OpenNext.

## Run

```sh
npm ci
npm run dev
```

Open `/en`, `/tr` or `/it`. Development uses `.next-dev`; production uses `.next`, so the servers can coexist.

```sh
npm run build:next
npm run start -- --port 3113
```

## Verify

```sh
npm run verify
npm run test:generated
npm run test:e2e -- http://localhost:3113
npm run test:experience -- http://localhost:3113
npm run test:chapter-pages -- http://localhost:3113
npm run test:enhancements -- http://localhost:3113
npm run test:world -- http://localhost:3113
npm run test:links -- http://localhost:3113
npm run test:redirects -- http://localhost:3113
npm audit
```

`verify` runs ESLint, TypeScript, locale completeness, contrast checks, Node unit tests and the production Next build. Browser suites use Playwright and installed Chrome. They inspect contact drafts without sending messages. The gallery suite covers routes, metadata, five viewport widths, axe accessibility, keyboard, pointer, touch, no JavaScript and reduced motion.

## Content and presentation

- `src/lib/content/volumes.ts`: seven work records and localized editorial metadata.
- `services.ts`, `case-studies.ts`, `evidence.ts`, `volume-pages.ts`: canonical long-form content, research values, citations and limitations. Unit tests compare every original block against `artifacts/evolution/before/content.json`.
- `portfolio-ui.ts`: localized labels and new orientation copy.
- `experience/world/`: the original seven procedural exhibits, with cream, coral, apricot and cobalt materials. Desktop loads Three.js after the first paint. Phones, touch screens, data-saving browsers and low-memory devices start with a local room image; selecting an exhibit or choosing “Explore in 3D” loads the interactive scene. The room renders only when a camera, hover or size changes. Native wheel/touch scrolling never drives the camera. HTML buttons expose every exhibit to keyboard users. Reduced motion changes views immediately. A still-view toggle, unavailable WebGL and no JavaScript retain the room image and complete work links.
- `WorkGallery.tsx`: one semantic list, no clones. Fine-pointer desktop moves at 18px/s through direct transforms. Hover, focus, pause, background tabs and offscreen state stop motion. Mobile, reduced-motion and constrained devices retain native horizontal scrolling. Vertical scroll remains native everywhere.
- `VolumeReader.tsx`: one complete article tree with existing anchors, section index and print support. Quick Read consumes canonical service/research fields.
- `EvidenceRecord.tsx`: source, method, date, baseline and limitations. Services without published client outcomes are explicitly labelled.
- The career timeline and optional optimizer retain Motion. The optimizer loads only when opened. Bklit and Kokonut components retain their MIT notices in `vendor/`.

## Design assets

`src/lib/palette.json` owns color tokens; run `node scripts/generate-palette.mjs` after editing it. Inter and Instrument Serif live in `public/fonts/`. Inter is a 56 kB variable-font subset covering current source characters; `scripts/subset-font.py` regenerates it from the upstream TTF when new characters are added. Upstream SIL Open Font License notices are included alongside the fonts. Original SVG diagrams are illustrative, never measured customer outputs.

Run `npm run generate:og` to create the 33 localized 1200×630 social images from the work metadata. Do not hand-edit generated palette CSS or OG files.

## Deployment and security

`npm run build` emits the Cloudflare worker and assets. `npm run preview` runs the worker locally; `npm run deploy` publishes it. Deployment bindings are in `wrangler.jsonc`.

The visible contact flow creates user-reviewed email/WhatsApp/Outlook drafts locally. It does not submit them. The retained API validates bounded input, escapes HTML, includes a honeypot and approximate isolate-local rate limiting, and returns an unconfigured response without mail credentials. Secrets belong in the deployment secret store, never public variables. No analytics provider or third-party tracking was added.

Security headers restrict framing, object content and sensitive browser permissions. Remote image proxy hosts are disabled. Next remains on major version 15; targeted PostCSS and brace-expansion overrides resolve transitive advisories. Recheck overrides when upgrading dependencies.

## Redesign evidence

- `docs/world-restoration.md`: current 3D landing restoration and its verification. This supersedes the earlier report's retirement of the 3D homepage.
- `docs/evolution-baseline.md`: original architecture and baseline.
- `docs/evolution-report.md`: completion report, checks, measurements and limitations.
- `docs/evolution-files.md`: file-level change inventory.
- `artifacts/evolution/before/` and `after/`: local screenshots and machine-readable results. Screenshots are ignored by Git.

Older redesign/library reports document historical implementations; they do not describe the current runtime.

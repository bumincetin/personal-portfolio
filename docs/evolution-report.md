# Portfolio evolution — completion report

> Historical snapshot of the initial 2D redesign. The user subsequently requested the 3D landing page back. See [World restoration](world-restoration.md) for the current homepage; the zero-canvas checks, asset inventory and Lighthouse figures below describe the earlier version.

26 September 2026. Implemented in the existing Next.js repository and verified against a local production build and the local Cloudflare worker. The public deployment has not been changed.

## A. Summary

The homepage now explains the practice before interaction, then presents a slow gallery of the seven existing work records. Original technical diagrams replace literal books and scenery. The page continues through the seven problems, selected evidence, delivery process, biography and contact.

Vertical scrolling is native. The gallery moves at 18 CSS pixels per second, pauses for reading and uses native horizontal swiping on touch screens. A measured 240-pixel wheel input produced 240 pixels of page movement.

Volume pages retain all original long-form content. Quick Read summaries expose the problem, audience, output, evidence status, limitation and contextual contact link. Reusable Evidence Records retain source, method, date, baseline and limitations. Four services, two research projects and one synthetic demonstration are clearly distinguished; no client outcomes were invented.

## B. Architecture

Retained: Next.js 15 App Router, React, TypeScript, existing locale/route structure, content sources, contact draft handoff, career timeline, printable CV, optimizer engine, sitemap, redirects and Cloudflare/OpenNext deployment.

The work taxonomy moved from `components/shelf/volumes.ts` to `lib/content/volumes.ts`. A single shared component architecture serves EN/TR/IT. The original service, case-study, evidence and career-story source files retain their original hashes. The profile has no meaningful Git diff. `volume-pages.ts` changes its imports; a regression fixture independently proves that every original rendered content block is unchanged in all three languages.

`WorkGallery` renders one server-supplied list with seven native links. Desktop enhancement positions those same items using `translate3d`; cards wrap individually without cloned links or duplicate content. A single RAF loop changes DOM transforms, never React state per frame. Motion stops on hover, focus, explicit pause, hidden-document state and offscreen state. ResizeObserver measures geometry. Touch, reduced motion, low-memory devices, data-saving browsers and no JavaScript keep native scrolling and the full links. Pointer dragging suppresses accidental activation; keyboard focus brings each card into view. Enter and Space activate links with enhancement enabled.

`VolumeReader` renders one article tree. Existing `leaf-*` anchors remain. Adjacent canonical blocks share a section, avoiding repeated visible headings. Quick Read derives its descriptive fields from canonical records. The optional optimizer loads after activation; its numerical engine is unchanged, and its controls and explanations now follow the page locale.

## C. Design system

| Role | Value / use |
| --- | --- |
| Main ground | Cream `#FFF4E8` |
| Reading surface | `#FFF9F3` |
| Secondary surface | `#F2E6DB` |
| Main ink | `#191715` |
| Secondary / muted ink | `#625B55` / `#68605A` |
| Accessible coral text and CTA | `#A63E2D` |
| Illustrative coral / orange | `#D95D45` / `#F47B55` |
| Apricot / saffron | `#F2A766` / `#E0A82E` |
| Technical cobalt | `#3659D9` |
| Secondary plum | `#8056A6`, with darker text tint |

`palette.json` generates shared CSS variables. Historical role names remain compatibility aliases; for example, the former `black` background role now resolves to cream. Diagram tints stay within this shared visual system.

Inter supplies headings, prose, controls and numerical evidence. Instrument Serif is reserved for editorial accents. The local 55,820-byte Inter variable subset covers the current source characters, including Turkish, Italian and mathematical symbols. Only two font families load. Both retain upstream SIL OFL notices: [Inter](https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt) and [Instrument Serif](https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/OFL.txt).

Spacing uses the existing 4/8/12/20/32/48/72/112-pixel rhythm, fluid page gutters and responsive type. Reading text is 16–17 pixels with generous line height; evidence uses tabular numerals. Navigation, language controls and primary controls have approximately 44-pixel targets.

Work labels use text plus styling: service/coral, research/cobalt and demo/plum. Published research records use an instrument-like ruled layout. The reusable record accepts research, demo and client labels, but only supported research measurements are instantiated. “No public evidence” is an explicit neutral status on service summaries, not a measured result. No fictional client record fills an empty state.

## D. Files changed

See the exhaustive [file-by-file inventory](evolution-files.md) and [machine-readable manifest](../artifacts/evolution/file-manifest.json). They distinguish additions, changes and removals.

Principal additions are `WorkGallery`, `WorkArt`, `QuickRead`, `EvidenceRecord`, the single `VolumeReader`, localized portfolio and optimizer copy, gallery/enhancement tests, OG generation, font subsetting and reproducible capture tools. README now documents the current architecture and executable commands.

## E. Removed legacy code

- Entire literal shelf presentation: launcher, catalogue, renderer, runtime, engine, UI and styles. Localized content was migrated first.
- Entire sketchbook/page-turn presentation, including the imperative engine and cloned reading surfaces. The article renderer and deferred optimizer were migrated.
- Three.js archive world: camera, exhibits, materials, geometry, interaction, renderer and scene tests.
- ShaderGradient atmosphere and the shared scroll director/Lenis integration.
- Optional contact book sculpture, unused grain overlay, old SubjectArt and unused Navbar.
- Shelf cover/wood textures, divider image, Newsreader, three unused portrait illustrations and unused starter SVGs. Instrument Serif files were relocated unchanged.
- Obsolete scene generators, capture tools and integration scripts replaced by current route/gallery checks. Historical documentation remains clearly historical.
- Unused ThreeUI HTML snapshot. Bklit and Kokonut MIT notices remain because their optimizer components still run.
- Direct dependencies `three`, `three-stdlib`, `@react-three/fiber`, `@shadergradient/react`, `camera-controls`, `lenis` and `@types/three`.

No canvas or WebGL renderer remains in the rendered routes or application source scan. The file inventory lists actual deleted paths.

## F. Accessibility

All 62 route/viewport scans pass with one H1, no duplicate IDs, no page overflow and no axe A/AA findings. All three opened optimizer variants also pass axe and mobile overflow checks. Automated coverage is supplemented by keyboard, focus, touch and fallback tests.

Verified: working skip link, visible focus, all gallery links by keyboard, Space/Enter activation, menu focus containment and Escape return, equivalent locale navigation, reduced motion, native touch gestures, vertical scrolling over the gallery, no-JavaScript reading and discovery, and 200% CSS zoom on home/contact/service pages.

Corrections include a low-contrast caption, 44-pixel mobile language controls, larger optimizer controls and labels, the TR link’s accessible-name mismatch, and dark-on-white CV print styling. Decorative SVGs stay outside the accessibility tree. “Illustrative” captions identify the diagrams.

Automated contrast checks wait for finite entrance animations to settle. Browser tests use actual pointer coordinates for moving cards rather than waiting for a continuously moving element to become stationary. Manual screen-reader testing was not performed; see the testing limits below.

## G. Performance

Mobile Lighthouse 13.5.0, Chrome 153, local production server, simulated mobile throttling with 4× CPU slowdown and 150 ms RTT:

| Measurement | Baseline | Final |
| --- | ---: | ---: |
| Performance | 46 | **97** |
| Accessibility | 100 | **100** |
| Best Practices | 100 | **100** |
| SEO | 100 | **100** |
| Largest Contentful Paint | 5.45 s | **2.43 s** |
| Total Blocking Time | 3,391 ms | **110 ms** |
| Cumulative Layout Shift | 0.000088 | **0.000134** |

The final run meets the requested LCP, CLS and Lighthouse targets. These are single-run laboratory measurements, not field percentiles. TBT is reported as TBT; it is not presented as INP.

The first redesign run scored 93 with 2.95 s LCP. Replacing multiple Inter language downloads (about 154 kB) with the 56 kB local subset brought LCP below 2.5 s. The final subset is reproducible with `scripts/subset-font.py` and must be regenerated when introducing new characters.

Next’s production build reports 113 kB first-load JavaScript for the homepage, including a 1.75 kB homepage route chunk; reading pages are 111 kB, contact 116 kB and Chapters 164 kB. Final browser resource measurements separately record encoded and decoded sizes. The old capture did not annotate its JS-byte encoding, so it is not used to claim a precise transfer-size percentage reduction.

The largest structural savings come from retiring global 3D rendering, book engines, scroll interception, unused fonts and duplicate presentation layers. The optimizer remains deferred. Images have responsive Next image delivery and explicit dimensions. The gallery runs no frame work while paused or outside view.

Reports: [baseline Lighthouse](../artifacts/evolution/before/lighthouse.json), [final Lighthouse](../artifacts/evolution/after/lighthouse.json), [resource measurements](../artifacts/evolution/after/measurements.json).

## H. SEO and security

All 33 localized content routes retain unique route metadata, canonical URLs, EN/TR/IT alternates and x-default. Work descriptions identify service, research or demo. All sitemap entries resolve; 46 legacy URL checks pass. No accidental noindex was introduced. About retains factually bounded Person structured data, now with explicit less-than escaping. No ratings, awards or testimonials were added.

Thirty-three localized 1200×630 OG images share the warm technical identity. Every tested route references its corresponding image. Core text and navigation are server rendered; the article and gallery do not depend on animation to be crawlable.

The dependency audit improved from 12 findings (including one critical and ten high) to **zero vulnerabilities**. Next moved from 15.5.23 to 15.5.26 within the existing major. Targeted PostCSS and brace-expansion overrides address transitive findings without a framework migration.

Response headers set nosniff, framing restrictions, referrer policy, a limited CSP and camera/microphone/geolocation restrictions. Local worker responses confirm the document headers. Remote image proxy hosts are disabled. Replaceable public images revalidate after one day; hashed Next assets keep immutable caching.

Source inspection found no credential-like secrets, external script tags or remaining 3D imports. The only raw HTML insertion is static Person JSON-LD with escaping. No analytics provider was added. Public business contact details remain intentional. The visible contact flow creates locally edited drafts and does not send messages automatically. The retained API’s isolate-local limiter remains approximate; it is not used by that draft flow.

## I. Multilingual verification

EN/TR/IT share components and content shapes. Locale completeness checks pass, all 33 routes render, and language switching preserves the volume path. Original long-form blocks—including every evidence value and limitation—match the frozen baseline for all three locales.

New navigation, Quick Read, gallery controls, work classification, evidence states, current-practice note and contact orientation are localized. The optional optimizer now translates its controls, model descriptions, scenarios, asset labels and methods without modifying its numerical engine. Translation coverage includes every canonical regime, view, asset and risk-profile description. Units, ticker symbols and mathematical notation are intentionally preserved.

## J. Test evidence

| Command / check | Result |
| --- | --- |
| Prettier on changed presentation, data and test files | Completed |
| `npm run verify` | Lint, types, i18n, 20 contrast pairs, 35 unit tests and Next production build pass |
| `npm run build` | Final Next build and OpenNext Cloudflare worker bundle pass; 40 generated pages |
| `npm run test:generated` | Palette output matches source |
| `npm run test:e2e -- http://localhost:3113` | 62 route/viewport audits plus pointer, touch, keyboard, menu, locale/history and fallback flows pass |
| `npm run test:enhancements -- http://localhost:3113` | Skip link, native wheel, pause lifecycle, 200% CSS zoom, low-memory/reduced-motion desktop and three localized optimizer audits pass |
| `npm run test:experience -- http://localhost:3113` | 27 accessibility scans, contact validation/drafts, career, print and no-JS checks pass |
| `npm run test:chapter-pages -- http://localhost:3113` | Touch, keyboard, date selection, scroll progression, tablet dragging and no-JS stories pass |
| `npm run test:links -- http://localhost:3113` | 54 internal paths, 33 rendered routes, all page requests and sitemap entries pass |
| `npm run test:redirects -- http://localhost:3113` | 46 retired URL checks pass |
| `npm audit` | Zero vulnerabilities |
| Final browser console sweep | All 33 localized routes; zero console errors or page exceptions |
| Local Wrangler worker smoke | Home, TR contact, IT research, OG image, robots and sitemap return 200; document security headers present |
| `git diff --check` | Clean |

JSON evidence is in `artifacts/evolution/`. Tests never sent an inquiry or external message. Historical scene tests were removed because their implementation was removed; replacement suites exercise the shipped interactions.

Windows tooling notes: OpenNext prints its Windows compatibility warning but successfully builds and runs the local worker. Lighthouse sometimes reports EPERM while removing its temporary Chrome profile **after** writing the complete report. The final JSON contains all scores and no runtime audit error. Node prints its existing module-type detection warning for the native TS test runner.

## K. Visual QA

Matching baseline/final captures use 1440×1000 desktop and 390×844 mobile:

| View | Before | After |
| --- | --- | --- |
| Desktop home | [before](../artifacts/evolution/before/home.png) | [after](../artifacts/evolution/after/home.png) |
| Mobile home | [before](../artifacts/evolution/before/mobile-home.png) | [after](../artifacts/evolution/after/mobile-home.png) |
| Approach | [before](../artifacts/evolution/before/approach.png) | [after](../artifacts/evolution/after/approach.png) |
| About/CV | [before](../artifacts/evolution/before/chapters.png) | [after](../artifacts/evolution/after/chapters.png) |
| Service Volume | [before](../artifacts/evolution/before/service.png) | [after](../artifacts/evolution/after/service.png) |
| Research Volume | [before](../artifacts/evolution/before/research.png) | [after](../artifacts/evolution/after/research.png) |

Additional captures include all localized routes at 390 pixels, all English routes at 1440 pixels, the opened optimizer in every locale, 200% CSS zoom and CV print mode. Screenshots are local artifacts ignored by Git. The service example is an offering page, not a fabricated client case study.

Reviewed composition, reading order, contrast, title wrapping, diagram captions, restrained conversion, absence of literal books, print legibility and a representative Turkish OG image. Cobalt diagrams and evidence rules preserve technical character alongside cream, coral and apricot.

## L. Remaining issues and measurement limits

No known blocking application defect remains from the requested changes.

- Field INP and deployed network performance require real visits after publication; local Lighthouse cannot establish them.
- Browser automation covered Chrome on Windows. Dedicated screen-reader and Safari/Firefox runs were not performed. The 200% check uses CSS zoom and responsive reflow, not browser chrome zoom controls.
- The existing unused sending API has approximate per-isolate rate limiting. The visible draft-based contact experience avoids that endpoint.
- Live deployment and live mail delivery were not exercised. The local production build and local Cloudflare worker were verified.

## M. Final status

READY

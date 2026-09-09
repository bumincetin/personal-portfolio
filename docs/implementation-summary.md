# Implementation summary

What the site is now, what changed, what was verified, and what is still open.

---

## 1. What the site is

A shelf of seven volumes, and a colophon.

```
/[locale]                       the Working Volumes shelf (WebGL). Nothing below it.
/[locale]/front-matter          the argument, read as a book (16 leaves)
/[locale]/volumes/[slug]        one volume, read as a book (7 slugs)
/[locale]/contact               portrait, the record, and the inquiry form
/api/contact                    POST — the only endpoint
/sitemap.xml, /robots.txt
```

Locales: `en`, `tr`, `it`. Every route exists in all three.

**Everything is a book except the colophon.** The shelf fills the viewport and
does not scroll; the front matter and the seven volumes are read by turning
leaves, with the wheel, the arrow keys or the buttons; only `/contact` scrolls,
because it is the one page that is a page. That is why it is also the only route
with a footer — a footer under a viewport-locked page would be present in the
DOM and unreachable, which is worse than absent. The site disclaimer travels
with the colophon leaf of every book instead.

### One ground, and it is the shelf's

There were two themes, a warm paper one and a dark one, with a toggle and a
pre-paint script to resolve them. Both are gone. The ThreeUI scene is lit for a
single ground and cannot be re-lit per theme, so a second theme could only ever
be a light page wrapped around a dark canvas — which is exactly what it was, and
every route had to negotiate the seam.

The ground is a warm espresso (`#1A1511`), and everything that paints a ground
is on it: the site tokens, the shelf's own `--paper`, and the 3D room itself —
the wall, board and lighting in `volumes.ts` were warmed to match, so the page
and the canvas are one temperature with no join. It was the shelf's authored
`#171A24` for a while, which is ultramarine dark: a cool ground chosen for a
cover palette this site does not use, and it made every surface it touched read
cold.

The accent went the same way. It was a saturated salmon filling every call to
action with a bright pill; it is an old brass now, used as ink and as a hairline.
Nothing on the site is a solid block of accent any more — the navigation CTA, the
footer CTA, the contact button and the volume links are all outlines. A page with
one loud filled pill on it looks generated rather than designed, and this had
four.

The brand mark is printed rather than plated: cropped to its monogram, inverted
and screen-blended so the artwork's opaque white ground drops away and the mark
lands as ink on the bar. What went with the themes:
`ThemeToggle`, `src/lib/theme.ts`, the stored preference, the inline script, and
~70 lines of `shelf-overrides.css` whose only job was re-pointing the
application's colour tokens whenever a whole page was dark.

The seven volumes, each titled by **the expensive problem it addresses** rather
than by the technique:

| # | Volume | Kind | Slug |
| --- | --- | --- | --- |
| I | The Unread Pile | Service · document intelligence | `document-intelligence` |
| II | The Naked Number | Service · forecasting | `forecasting` |
| III | The Week-Long Month | Service · reporting | `reporting` |
| IV | Two Rulebooks | Service · cross-border (regulated) | `cross-border` |
| V | The Overrun Claim | Evidence · research | `greenwashing-risk-scoring` |
| VI | The Threshold Cliff | Evidence · research | `parliamentary-seat-forecast` |
| VII | The Sealed Model | Evidence · synthetic demonstration | `portfolio-optimizer` |

### Routes that were retired

The services index, four service pages, the work index, four case-study pages,
the SME page, the About page and the demo portal are gone. Their content is
bound into the volumes; **every one of those URLs 308s** to the volume that now
carries it (`next.config.js`), so nothing that was indexable 404s.

| Was | Now |
| --- | --- |
| `/[locale]/services/ai-nlp` | `/[locale]/volumes/document-intelligence` |
| `/[locale]/services/financial-analytics` | `/[locale]/volumes/forecasting` |
| `/[locale]/services/business-intelligence` | `/[locale]/volumes/reporting` |
| `/[locale]/services/financial-consultancy` | `/[locale]/volumes/cross-border` |
| `/[locale]/assets/<case-study>` | `/[locale]/volumes/<same-slug>` |
| `/[locale]/methodology`, `/assets`, `/why-sme`, `/portal` | `/[locale]` |
| `/[locale]/about` | `/[locale]/contact` |
| `/` | `/en` |

---

## 2. The design: ThreeUI `CompleteShelfLandingPage`

### Provenance

Fetched and **verified before use**:

| File | SHA-256 | Verified |
| --- | --- | --- |
| `public/landing-pages/complete-shelf-v2.html` | `606f200fed86…f198e` | matches the registered hash exactly |
| `src/shaders/landing-pages/LandingPages.tsx` | `4d379461ad00…9d30a` | matches |
| `src/shaders/landing-pages/LandingPageFrame.tsx` | `61de2cc50888…baa78` | matches |
| `src/shaders/threeui.css` | `efe4447139f1…8eccf` | matches |

`LandingPageFrame` renders the canonical HTML inside a sandboxed iframe — that
is the catalog *preview*. The brief says to build in the destination project and
**not** to embed the documentation page, so the authored source was ported
instead of framed. An iframe could not have carried this site's content,
routing, localisation or forms anyway.

### What was ported, and where it lives

| Authored source | Here |
| --- | --- |
| the `<script type="module">` engine (~3,940 lines) | `src/app/components/shelf/engine.js` — **generated**, body byte-faithful |
| the `<style>` block (1,575 lines) | `src/app/components/shelf/shelf.css` — **generated**, selectors scoped |
| the `<body>` markup | `src/app/components/shelf/Shelf.tsx`, transcribed to JSX with ids intact |
| two inline WebP data URIs | `public/shelf/covers.webp` (3584×768, seven 512×768 crops) and `public/shelf/wood.webp` (512×1024) — byte-identical |

### Every deviation from the source, and why

1. **Addon imports** resolve through the installed `three@0.165.0` package
   rather than the source's CDN importmap. Same version, same files.
2. **`BOOKS` is a parameter**, so the shelf carries this site's seven volumes in
   three languages instead of the sample catalogue.
3. **Textures are files, not data URIs.** ~712 kB of base64 inside a JavaScript
   chunk was not worth byte-parity; the images themselves are unchanged.
4. **The engine is wrapped** in `createShelf()` and returns the authored
   `disposeExperience`, so React can unmount it. The source's `beforeunload`
   listener is dropped in favour of the component lifecycle.
5. **CSS selectors are scoped.** The source styles `:root`, `html`, `body` and
   `*` because it owns the document; here every rule sits under `.shelf-root`,
   and the document-level rules key on `html[data-shelf]`. Declarations are
   untouched.
6. **Takeover, as authored.** `.experience` stays `position: fixed; inset: 0`
   and the document stays `overflow: hidden`. An earlier revision made it a
   `100svh` block with the page continuing below; that was reverted, because the
   authored wheel gesture browses volumes and a page that also scrolled gave one
   gesture two meanings.
7. **Font fallbacks.** The source asks for Iowan Old Style / Baskerville, which
   exist only on macOS — everywhere else the authored serif silently became
   Times New Roman. The requested faces stay first; Cormorant Garamond, already
   self-hosted here, is inserted behind them.
8. **Two markup additions**, both content: a "Read the full page" link out of
   the detail panel, and a skip link plus a visible "Keep reading" cue. Both
   lead to `/front-matter`, because the wheel belongs to the shelf and the page
   itself does not scroll.

`scripts/find-orphans.mjs` reports the tree has no unreachable modules.

### The reader

`/volumes/[slug]` and `/front-matter` are a second ThreeUI component:
**`MengToSketchbookLandingPage`** (canonical source
`meng-to-sketchbook.html`, SHA-256 `e0330548b1ac…5b6dd1`, verified on download;
the five registered TS/CSS files were verified against their published hashes
too, and the four assets kept were verified byte-for-byte). The source is in the
repository at `vendor/threeui/meng-to-sketchbook.html`.

What was ported: the curved page turn — a chain of nested strips whose tangent
sweeps an arc, so paper bends instead of pivoting like a door — the spring and
the drag physics, the restrained tilt, the zoom, the draggable magnifier, the
cast shadows, the caption crossfade, the riffle the book opens with, the painted
divider, and the two typefaces the configured usage names.

### The one structural departure

**In the source, every spread is a PNG.** The resting page is an `<img>`, the
two halves are that image at 200% width, and each of the 36 strip faces is the
same image as a `background-image` with a computed `background-position-x`.
Slicing a picture across a curved surface is what `background-position` is for,
and for drawings it is the right answer.

These pages are not drawings. They are the argument — prose, figures, evidence
records with sources and limitations, in three languages. Rasterising them to
ship the component unchanged would have destroyed text selection, Ctrl+F,
browser translation, screen-reader access and every contrast guarantee in this
document. So the picture was replaced by live DOM and nothing else was: each
face is a clipping window holding a full-width copy of the spread, shifted by
the same offset the source passes to `background-position-x`. Same arithmetic,
different thing being sliced.

The magnifier needed no change at all — the source already magnifies a *DOM
clone* rather than a bitmap, which is what made the port possible.

Two consequences worth stating:

- **The spread you are reading holds the original leaves, not copies.** Cloning
  them looked fine and was wrong: a clone is a dead snapshot, so the optimizer —
  a React island — rendered as an empty box, and every `next/link` in a volume
  lost client-side routing. The 36 animation frames are clones, `aria-hidden`
  and `inert`; the resting spread is the real thing.
- **A phone gets one leaf, and it slides rather than folds.** A curl is a fold
  down the middle of a *spread*; with one page there is no middle. Grouping is
  done in the engine rather than in CSS, because hiding the right-hand page
  would have hidden half of every volume.

The reader is also a **server** component: the leaves are rendered to HTML on
the server and handed to the client book as children, so the client gets the
machinery and not one word of the prose as JavaScript. That took the volume
routes from 128 kB to **109 kB** of First Load JS.

**Only the book moves.** Wheel, swipe, arrow keys, the arrows and every row of
the contents all do the same thing: turn a leaf. That only works if the leaves
fit, so they are made to. `volume-pages.ts`
paginates: a passage longer than ~420 characters is set across as many leaves as
it needs, breaking between sentences; lists and term/detail pairs break between
items; each evidence figure gets its own leaf instead of four sharing one; and
what is in scope and what is not became two pages rather than one long one.
Below 780 px of height, or 480 px of width, the type steps down a notch rather
than the leaf growing a scrollbar. Measured in Chrome at 1440x900, 1280x720,
768x1024 and 390x844 across all three languages, this took the count of
overflowing leaves from 30 to 0.

Two deliberate exceptions:

- **A leaf that genuinely cannot fit still scrolls inside itself.** WCAG 2.2
  requires content to stay reachable at 200% zoom and at 320 CSS pixels;
  clipping the text to keep the gesture pure would fail 1.4.4 and 1.4.10. The
  wheel handler knows this and lets such a leaf consume the gesture until the
  reader reaches its edge.
- **Nothing overlays the sheet.** The authored source lays two full-height
  `.sb-zone` buttons over the book to catch the drag, which is right when the
  pages are pictures. Ours have links, and the overlay sat on top of every one
  of them — the CTA at the end of each volume, the repository links, the
  optimizer's controls — so none could be clicked. The drag is handled on the
  sheet now and yields to anything interactive: it only claims the gesture once
  the pointer has travelled 8px more horizontally than vertically, which also
  leaves double-click and triple-click selection working.
- **The optimizer.** It is an instrument set into the book — inputs, a solver
  and three charts — not a page of it, and splitting its controls from its
  results across a page turn would make it unusable. It takes a spread to
  itself (`data-solo`, as a bound book gives a full-page plate) and is tipped in
  on its own dark ground, because it is built on the site's dark palette and
  would otherwise be bone-white type on cream. The smoke suite exempts it by
  name and asserts every other leaf fits.

The optimizer is bound into Volume VII as a page and loaded on demand.

### What was not taken from the sketchbook

The source ships nine illustrated plates of Singapore — the Merlion, Marina Bay
Sands, Joo Chiat shophouses — plus a tropical watercolour wash of orchids,
monstera and plumeria. None of it is here. That artwork is Meng To's sketchbook
identity, and on a Milan analytics practice it would be ornament standing in for
content on a site whose whole argument is that its claims can be checked. Four
assets were kept: the two typefaces the configured usage names, and the painted
divider, which is a neutral dry-brush rule in the same earth register as this
site's accent.

The `.wash`, `.botany` and `.bloom` rules are not ported either, so there are no
dead references to files that were deliberately not shipped;
`scripts/port-sketchbook-css.mjs` records why in the generator rather than in a
commit message.

### The front matter

`/[locale]/front-matter` is the argument the shelf rests on: what these problems
cost while they go unfixed, how an engagement runs, and the four figures that
can be checked. Sixteen leaves, read in the same binding as everything else.

It used to be six sections of prose below the canvas on the home page, in the
old site's material — which put the most important argument on the site in the
one place that did not look like the site. It is not a volume and has no cover
on the shelf, which is what front matter is.

---

## 3. Content and truthfulness

Full record in `docs/content-verification.md`. In short, these were removed and
none was replaced with an invented substitute:

- "reducing manual review time by 80%" (6 occurrences, no measurement scope)
- "fine-tuning RoBERTa" — the linked repository implements ClimateBERT +
  Sentence Transformers, and its *best* detector is lexical, not a transformer
- "24/7 without errors" / "7/24 hatasız" / "24/7 senza errori"
- five euro-denominated SME outcomes with no client, source or permission
- "Fortune 500-level", "10-100x faster", "3–6 months in advance", "at
  SME-friendly prices"
- "Calculations strictly follow IFRS standards" — an LLM was producing them
- three conflicting Alvolo titles, and a current Bocconi affiliation
- a second published email address (`@studbocconi.it`)
- "Live instrument" on a browser-side calculation over invented assumptions

The only quantitative claims left on the site are the four in
`src/lib/content/evidence.ts`, each rendered with source, method, comparison,
as-of date and **what it does not tell you**.

---

## 4. Verification

All commands run from the project root against a production build.

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | **0 errors**, 1 warning (pre-existing, `open-next.config.ts`) |
| Types | `npm run typecheck` | pass |
| Localisation | `npm run test:i18n` | pass — en/tr/it structurally identical, no empty strings |
| Contrast (tokens) | `npm run test:contrast` | pass — 20 pairs meet WCAG 2.2 AA |
| Contrast (over the scene) | `npm run test:canvas -- <url>` | pass — 9 overlay elements, 6.2:1 to 14.9:1 |
| Unit | `npm test` | **26/26** |
| Build | `npm run build:next` | pass — 33 static pages |
| Browser smoke | `npm run test:smoke -- <url> --configured <url>` | **48/48** |
| Redirects | `npm run test:redirects -- <url>` | pass — 44 retired URLs |
| Accessibility | `npm run test:a11y -- <url>` | **0 violations**, 55 scans |

`npm run verify` chains lint → types → i18n → contrast → unit → build.

### Baseline, for comparison

The tree as found: `next build` passed; **`npm run lint` failed** (`next lint`
passes eslintrc-era options to the flat-config engine); there were no tests.
First Load JS was 214 kB on the home page and 146–189 kB elsewhere.

### Now

| Route | First Load JS |
| --- | --- |
| `/[locale]` | 118 kB (the Three.js engine is a lazy chunk, not in this figure) |
| `/[locale]/front-matter` | 109 kB |
| `/[locale]/volumes/[slug]` | 109 kB (the sketchbook engine is a lazy chunk) |
| `/[locale]/contact` | 149 kB |

The shelf engine and `three` load only on the home page; the optimizer only on
the page of Volume VII that contains it.

### What the browser suite actually covers

Layout at 360 / 390 / 768 / 1440 with no horizontal overflow on any route; the
shelf reaching a rendered WebGL state with seven volumes; the home page not
scrolling and rendering nothing below the shelf; the reading cue opening the
front matter; opening a volume and following it into the reader; turning pages
by button, by arrow key and by wheel; the document not scrolling in the reader
and no leaf being taller than the book; the optimizer running inside its volume;
the portrait, the record and the footer on the colophon; the disabled-form state
and its email fallback; skip link, focus ring, mobile dialog with Escape and
focus trap; the language switcher; the static catalogue standing in for the
shelf with JavaScript disabled; `prefers-reduced-motion`; and no console
errors.

The contact form's full lifecycle — validation, provider failure, provider
acceptance, input preservation, honeypot, topic pre-selection — is exercised
against a second instance started with **dummy** credentials, with the request
intercepted in the browser. **No message was ever sent to a real recipient and
no real provider was contacted.**

### Accessibility: what is and is not claimed

axe-core reports **0 violations** across 55 scans (16 routes at three viewports
— 390x844, 1280x720 and 1440x900 — plus a turned volume, the optimizer page and
the open mobile menu) at `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` and
`best-practice`. One palette means one colour scheme to scan; the viewport sweep
is what earns its place, because reflow, target-size and scrollable-region
findings only appear at one width or another.

That is a floor, not an audit. Automated tooling catches a minority of WCAG
failures. Manual checks performed: keyboard-only traversal of the shelf, a
volume and the form; visible focus; Escape and focus return on the mobile
dialog; reduced-motion; JavaScript disabled; touch-target sizes at 44 px; and
reading the reader with the track focused. **No screen-reader testing with a
real assistive technology has been done, and no third-party audit has been
commissioned.** Neither is claimed.

### The check axe cannot do

axe treats a `<canvas>` as an image and declines to compute contrast against it,
which meant the shelf's own chrome — the volume title, the deck, the counter,
the Open button, the reading cue — had **no contrast check at all**, and it is
the most prominent type on the site.

`scripts/check-canvas-contrast.mjs` closes that. It captures composited frames
through CDP (the canvas itself reads back cleared outside its animation frame,
so reading it directly reports `rgb(0 0 0)` and passes everything), makes the
glyphs transparent so the ground behind them is what gets sampled, measures the
glyph run rather than the padded pill, and takes the worst pixel over several
frames because the scene drifts.

It found two real failures on the first honest run: the **Open button at 3.68:1**
and the **reading cue at 4.02:1**, both under the 4.5:1 body text needs. The
authored controls are outline chips — hairline border, transparent fill,
near-white ink — which is a good look and an unreliable ground, because what is
behind them is not a colour but whichever book has rotated into place. Both now
carry a paper scrim so the ratio is a property of the control rather than of
where the shelf happens to be. They measure 14.3:1 and 14.9:1.

The same run raised the authored 8–9 px microcopy to 10–10.5 px. That is the one
place a value from the source was changed rather than adapted, it is marked as
such in `shelf-overrides.css`, and deleting that block restores the authored
sizes exactly.

Defects found and fixed during this work, all real: `muted-light` failing 4.5:1
across 575 nodes; unfocusable scroll regions; a heading level skipped; two
`<nav>` landmarks sharing a label; an empty column header; row text dimmed to
2.1:1 by `opacity-50`; the shelf stylesheet painting the document dark under
light-theme content (from the era when there were two themes); description-list
markup broken by a wrapper element; and the reader lacking a `main` landmark.

### Performance: what is and is not claimed

The figures above are **build-time bundle sizes**, measured by `next build` on
this machine. They are not Core Web Vitals. No LCP, INP or CLS measurement was
taken, no Lighthouse run was performed, and no field data exists — so **nothing
here should be read as evidence about the 2.5 s / 200 ms / 0.1 targets.** The
work done was structural: server components instead of client ones (which had
been shipping all three locales' prose to every visitor), removal of ~65 kB of
below-the-fold decoration from every route, and on-demand loading of the two
heavy interactive pieces.

---

## 5. Architecture

```
src/lib/profile.ts               identity, contact channels, responsibility boundaries
src/lib/content/evidence.ts      every published number, with provenance
src/lib/content/case-studies.ts  evidence spine + localised prose
src/lib/content/services.ts      service spine + localised prose
src/lib/content/volume-pages.ts  binds the above into book pages
src/lib/content/ui.ts            UI vocabulary, three locales
src/lib/seo.ts                   per-page title/description/canonical/hreflang
src/lib/analytics.ts             funnel definition; no-op until configured
src/lib/contact/                 validation + provider configuration
src/lib/optimizer/               Black–Litterman solver (unchanged logic)
src/lib/translations.ts          the biography the colophon prints
src/lib/story.ts                 the dated career record, same page

src/app/components/shelf/        the ported shelf, the reader, the volumes
```

Content is separated from presentation throughout: `ui.ts`, `services.ts` and
`case-studies.ts` hold no facts, and `profile.ts` / `evidence.ts` hold nothing
else.

### What was removed rather than left in place

The information architecture this site replaced had a services index, a work
index, an SME page, a methodology page and a demo portal. Deleting the routes
left their copy behind, and that copy was the larger risk of the two: it named
URLs that now 404, and it carried marketing claims on surfaces nobody would
re-audit because nothing rendered them. So it went too, and the three files it
lived in were regenerated from their own live values so the surviving prose
could not drift in the move:

| File | Before | After |
| --- | --- | --- |
| `src/lib/translations.ts` | 1,624 | 304 |
| `src/lib/story.ts` | 495 | 188 |
| `src/lib/content/ui.ts` | 933 | 788 |

Along with them: `AmbientLayer`, `ConstellationField` and `HudCursor` (which
targeted routes that no longer exist), the `serviceHref`, `getServiceCopy` and
`isUploadEnabled` exports, and the `demo` member of the case-study link union —
no study carries a demo link any more. `scripts/find-orphans.mjs` reports every
one of the remaining 51 modules as reachable from a route.

---

## 6. Capability status

| Capability | Status |
| --- | --- |
| The shelf, seven volumes, three locales | **Implemented and tested** |
| The reader, page turning, no-JS fallback | **Implemented and tested** |
| Portfolio optimizer inside Volume VII | **Implemented and tested** (18 regression tests) |
| Redirects from every retired URL | **Implemented and tested** |
| Contact form validation and states | **Implemented and tested** (against a mocked provider) |
| Contact form **delivery** | **Blocked pending configuration** — `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Until then the form renders disabled with the verified email address. **No real delivery has ever been verified.** |
| Analytics | **Implemented but disabled** — the funnel is defined and the call sites exist; the sink is a no-op until one is installed deliberately |
| Core Web Vitals | **Not measured.** See above. |
| Turkish / Italian copy | **Implemented, not natively reviewed.** Translated as part of this work. No native speaker has read it. |

---

## 7. Known limitations

- The cover artwork is the authored ThreeUI atlas. The seven covers were drawn
  for the original catalogue; they are used here as bindings for this site's
  volumes, and the binding colours were kept because each cover is tuned to its
  own. New artwork would be needed to make the covers depict these subjects.
- The engine is generated. Editing `engine.js` by hand would break the
  correspondence to a published SHA-256; change the generator or the volume data.
- `:has()` is used to give the optimizer and the figure plates the full spread.
  In a browser without it they are one column instead of two — narrower, still
  usable, and the leaf scrolls rather than clipping.
- **The optimizer's leaf scrolls.** It is the one page in the seven volumes that
  does, and the exemption is named in the smoke suite rather than implied. It is
  an instrument, not a page of prose.
- **Leaf pagination is measured, not proven.** `LEAF_CHARACTERS` and
  `LIST_LEAF_CHARACTERS` in `volume-pages.ts` are empirical: the largest values
  at which no leaf overflowed at four viewports in three languages, in Chrome.
  A much larger font size, a fourth language, or a browser with very different
  metrics could push a leaf over; the smoke suite asserts the property, so a
  regression fails rather than ships. Nothing is clipped when it happens — the
  leaf scrolls, which is what WCAG 1.4.4 and 1.4.10 require.
- The shelf's wheel gesture browses volumes, as authored. The way on is the
  "Keep reading" cue, the skip link, the navigation, or the keyboard — the page
  itself does not scroll.
- **The sketchbook is a second borrowed design.** The shelf is ThreeUI's
  `CompleteShelfLandingPage` and the reader is its `MengToSketchbookLandingPage`.
  Confirm the licence covers both on a commercial site before publishing. The
  static catalogue credits the first; the second is credited nowhere on the page
  and may need to be.
- **The riffle costs DOM.** Opening a volume turns every spread in it, and each
  turn builds a chain of strips holding copies of two leaves. The chain is cut
  from 18 strips to 6 during the riffle and the magnified mirror is not rebuilt
  mid-turn, which is what made it smooth here — but "here" is a desktop Chrome
  on a fast machine. It has not been measured on a mid-range phone.
- **Only Chrome.** Every browser measurement in this document — leaf fit,
  layout, the smoke and axe runs — was taken in the installed Chrome. Firefox
  and Safari have not been opened. `:has()`, `svh` units and `overscroll-behavior`
  are all supported in current versions of both, but "supported" is not
  "checked".
- `src/lib/story.ts` holds the dated career record and `src/lib/translations.ts`
  the education and language tables. Both render on the colophon. They are
  content, not routes.
- Turkish and Italian in `shelf-ui.ts`, `ui.ts` and the volume copy were written
  as part of this work and have not been read by a native speaker.

# Global visual refinement

The archive geometry, all published content, and the existing Three.js / ShaderGradient / Lenis architecture are retained. The information layer now uses compact annotations, dedicated dark publication pages, and a shared carbon / bone / citron palette.

## Design decisions

- **Inspect:** content-height annotation, no top-to-bottom pinning, no toolbar divider, no empty flex region, no fixed pagination footer. Desktop width is `clamp(320px,27vw,420px)`; mobile is an editorial sheet capped at 65svh. Descriptions are 17px and supporting copy 14px. Return, Escape, previous/next and direct reading links remain accessible.
- **Read:** the selected room recedes for 420ms, the shared director switches to its quieter editorial atmosphere, and the existing article route opens. Modified clicks and reduced motion retain native navigation. Reading width is 740px, body 18–19px, lead 24–34px, and large running titles remain outside the body column. Article/book switching and printing remain available.
- **World:** floor, architecture, equipment and bindings use neutral carbon, graphite and cool gray. Papers use bone; interactive markings use citron. The sealed analytical model and atmosphere supply restrained blue. No geometry, model, texture payload or rendering context was added to the main experience.
- **Other routes:** Work uses numbered editorial entries with neutral analytical plates; About retains its portrait, horizontal career story and CV; Contact retains its composer and optional guide/sculpture. Navigation is 60px high with restrained dark transparency. The optional optimizer uses a wider, unboxed analytical layout with container-based columns and distinguishable chart series.
- **Light surfaces:** the introductory catalogue note, physical book pages and print output deliberately use bone. The inspectors, research plates, reading routes, CV and contact surfaces are dark.

## Canonical source

`src/lib/palette.json` is the sole source of brand color values. `scripts/generate-palette.mjs` derives CSS variables and the existing Tailwind compatibility aliases; `--c-brass` and `--c-copper` are compatibility names, not separate historical palettes. Three materials, scene lights, canvas lettering, contact illustration, book metadata and ShaderGradient import the same JSON. SVG art and charts consume its CSS variables.

`refinement.css` defines the shared spacing scale and the inspector, publication, profile and work refinements. `ExperienceIcon.tsx` supplies geometric navigation icons; Lucide strokes use the same weight.

The optional shelf engine remains generated from its hash-verified historical input. `palette-adapter.mjs` remaps its emitted colors; existing cover/wood artwork is rendered in grayscale without modifying or adding image assets. The imported shelf stylesheet is the generated `shelf-palette.css`. Historical vendor inputs and the unimported original `shelf.css` retain their provenance. Literal black/white values in procedural alpha, bump and shadow masks are technical masks, not an alternative brand palette.

Regenerate with:

```sh
node scripts/generate-palette.mjs
node scripts/port-shelf-engine.mjs
node scripts/port-sketchbook-css.mjs
node scripts/refinement-legacy-css.mjs
```

## Verification

- Production build: 40 pages generated; TypeScript passes.
- Unit suite: 35 tests pass. Localization structure passes for English, Turkish and Italian.
- Static contrast: all 20 semantic pairs pass WCAG AA. Lint has no errors and one pre-existing warning in `open-next.config.ts`.
- Content regression: all 33 localized routes retain main copy, links, titles, metadata and structured data. Of the 51 original protected files, 50 retain their hashes; `volumes.ts` has authorized color-only changes, verified against the saved pre-refinement source after excluding color expressions and comments.
- Full visual matrix: all seven inspectors at 1440, 768 and 393px; all seven desktop reading routes; Approach, About/CV, Contact, Work, research and menu states. Twenty-one rendered accessibility audits report no violations.
- Every localized route at 393px: no accessibility violations, no horizontal overflow, one primary heading.
- Forty-nine additional inspector layouts cover 375px in all three languages and 430, 1024, 1366 and 1920px. Description size remains at least 17px and surfaces stay inside the viewport.
- Chromium, WebKit and Firefox: inspection, reading and menu flows pass. Optional book activation/page turning, optimizer, library, contact validation/copy/draft/guided flow, reduced motion, no JavaScript and unavailable WebGL pass. No message was sent.
- Print checks confirm carbon text for the Approach article and CV. The visible optional book spread passes its accessibility scan.
- Reading and close transitions can be interrupted with Escape without stale navigation or a hidden subsequent inspector. Printed running-title accents also switch to carbon.

The screenshot gallery is `artifacts/refinement/index.html`; full pages, contact sheets and JSON evidence live beside it. The review caught and corrected pale research plates, inherited dark ink on dark article evidence, low-contrast book labels, a full-route opacity fade, and cramped optimizer controls.

## Performance

The same hardware Chromium harness compares the saved integration baseline with the refined production build. Mobile means a 393×852 viewport, 4× CPU slowdown and 1.6Mbps/150ms network emulation on the laptop GPU; it is not a physical-phone measurement. RAF timing is not GPU utilization, sampled Event Timing is not field INP, and the load long-task sum is not Lighthouse TBT.

Numeric comparisons are in `artifacts/refinement/performance-summary.json`. The main archive still has 76 geometries, 10 textures and 76 desktop / 75 mobile draw calls. ShaderGradient still uses one geometry, no textures and one draw call. The archive renders zero frames while settled at idle. Main rendering uses the same two contexts and the same quality settings; no performance result was obtained by disabling the atmosphere.

Initial homepage JavaScript is approximately 114kB by Next's route accounting. Total encoded JavaScript through enhancement readiness is 408,966 bytes, versus 410,201 before. Camera settling is shorter, and fewer world frames are required for an inspection. Lab timing varies between runs; the saved repeat is reported alongside the first pass rather than replacing it.

Desktop camera/scroll p95 stays at 16.9ms; throttled mobile camera p95 is 33.3ms versus 33.5ms before. Main-thread time is lower in both measured passes. Mobile LCP was 1.432–1.560s versus the single saved baseline of 1.384s, and sampled event latency was 192–216ms versus 184ms. Those small-sample load/interaction measurements do not establish an improvement and are retained as a limitation. No field or physical-device performance claim is made.

<!-- measured-table -->

| Run | Device | LCP ms | Camera p95 ms | Scroll p95 ms | Main-thread s | Sampled event max ms |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| before | desktop | 444 | 16.9 | 16.9 | 2.16 | 40 |
| before | mobile-4g | 1384 | 33.5 | 33.4 | 6.283 | 184 |
| after | desktop | 380 | 16.9 | 16.9 | 1.883 | 32 |
| after | mobile-4g | 1560 | 33.3 | 33.5 | 6.228 | 216 |
| repeat | desktop | 392 | 16.9 | 16.9 | 2.005 | 24 |
| repeat | mobile-4g | 1432 | 33.3 | 33.5 | 6.049 | 192 |

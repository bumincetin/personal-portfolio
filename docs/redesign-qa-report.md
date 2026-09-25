# Implemented experience and QA

The homepage is an original real-time decision archive, with a full-viewport Three.js environment, seven physical exhibits, actual mesh raycasting, camera approaches, original-content inspection panels and a pinned scroll transition into the editorial site. Desktop, touch and reduced-motion modes all use the real scene. The original seven-volume content, readers, CV and contact workflow remain available independently of exploration.

## Review

- Running production preview: http://localhost:3100/en
- [Rendered screenshot gallery](../artifacts/redesign/world/index.html)
- [Content manifest](content-manifest.md)
- [Current Basement reference analysis](basement-reference-analysis.md)
- [Experience storyboard](experience-storyboard.md)
- [Content regression report](content-regression-report.md)

The gallery includes the loading plan, desktop room, hover response, all seven inspection views, overhead scroll view, editorial handoff, mobile room/selection/scroll, reduced motion, no JavaScript and context loss. A separate `camera-transition.png` captures a moving camera; `final-check.json` records the TRANSITIONING phase. Earlier homepage images in `artifacts/redesign/qa` are superseded.

## Scene architecture and assets

| Module | Responsibility |
|---|---|
| world/WorldExperience.tsx | Semantic DOM, localized controls, inspection panel, focus return, scroll input and progressive fallback |
| world/state.ts | Shared typed state: LOADING, INTRO, HOME, HOVERING, TRANSITIONING, SELECTED, EDITORIAL, FALLBACK |
| world/environment.ts | Floor, perimeter walls, archive shelving, clerestory, suspended lighting and circulation details |
| world/exhibits.ts | Seven original procedural groups: documents, number instrument, reporting bench, rulebooks, evidence board, threshold steps, sealed model |
| world/camera.ts | Authored home/editorial/seven-volume poses; interruptible position, target and FOV transitions; bounded intro and inspection timing |
| world/interaction.ts | Actual Three.js Raycaster mesh hit testing |
| world/materials.ts, geometry.ts | Shared surface palette, generated lettering and geometric primitives |
| world/optimize.ts | Static geometry batching by material within each semantic exhibit |
| world/runtime.ts | Rendering, lighting, adaptive resolution, projected hotspots, visibility suspension and complete resource disposal |
| world/copy.ts, world.css | English/Turkish/Italian interaction labels and responsive DOM presentation |

No new package dependency was required. The implementation uses the installed Three.js r165 with React/Next.js. All room geometry and nine small lettering textures are generated locally in code. No Basement models, imagery, shaders or proprietary assets were copied. The room has actual ground, architectural boundaries, foreground/middle/background exhibits, directional/hemisphere lighting and a cached shadow map. The SVG line plan is a loading/failure presentation only.

Desktop home renders 76 draw calls; mobile home renders 75, with further frustum culling in close views. Static batching reduced the initial prototype from 483 calls. DPR is capped at 1.65 desktop / 1.25 phone and decreases under sustained slow frames. Mobile has fewer archive spines and a 1024 shadow map versus desktop 2048. There is no postprocessing or ambient render loop. Layout reads are collected before projected-marker style writes. Hidden/offscreen scenes stop rendering; unmount disposes meshes, materials, textures, shadow resources and the context.

## Verification

| Check | Result and evidence |
|---|---|
| Production build | Pass; 40 generated pages, homepage build-reported initial JS 111 kB; scene code is a separate async chunk |
| TypeScript / lint | Pass; one pre-existing anonymous-default-export warning in open-next.config.ts |
| Automated unit tests | 32 pass, including four state-interruption/recovery cases and existing contact/optimizer coverage |
| Localization / contrast | Existing localization structural check passes; 20 token contrast pairs pass |
| Content and SEO | 33 routes pass; 51 authoritative files remain byte-identical; no missing original text, links, metadata or JSON-LD |
| Responsive world | 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 393×852, 375×812; no horizontal overflow |
| World accessibility | No axe WCAG 2.2 A/AA violations in the entry and inspection states at those eight sizes; keyboard Enter/Space, Escape and returned focus tested |
| Raycasting | All seven objects selected through actual canvas mesh hits, excluding HTML markers |
| Camera / scroll | Seven authored inspection views; pointer parallax measured; pinned scene bounds asserted during scroll; overhead view and editorial handoff captured |
| Failure / preferences | Real WebGL under reduced motion; no-JS readability; blocked world chunk opens a normal volume route; context loss removes dead hotspots and retains seven direct links |
| Navigation / retained functions | Menu focus containment and return; back/forward; book page turn/article restoration; optimizer activation; optional library open/Escape; contact validation/copy/draft/guided flow pass |
| Other browser engines | WebKit 26.6 and Firefox 155.0 pass seven representative routes and menu checks; Chromium passes 200% text checks on five routes |

Primary machine-readable evidence: [world verification](../artifacts/redesign/world/verification.json), [final focused checks](../artifacts/redesign/world/final-check.json), [route/content comparison](../artifacts/redesign/qa/content-regression.json), [retained interaction checks](../artifacts/redesign/qa/interactions.json), [cross-browser checks](../artifacts/redesign/qa/cross-browser.json). Earlier whole-page/interior axe evidence is retained in `artifacts/redesign/qa/responsive-accessibility.json` and `mobile-all-routes.json` where available; the current immersive entry has its own fresh audit.

## Measured performance

Production build, local server, Chromium's hardware graphics path on Intel Iris Xe / Direct3D11. Desktop is 1440×900 without throttling. Mobile is a 393×852 touch viewport with 1.6 Mbps download, 150 ms network latency and 4× CPU slowdown; its GPU remains the desktop GPU. These are lab measurements, not physical-phone or field-user metrics.

| Mode | LCP | CLS | Active frame interval median / p95 | Load long-task excess* | Highest sampled interaction** | Intro movement | Observed compressed JS including scene |
|---|---|---|---|---|---|---|---|
| desktop | 0.46 s | 0.00007 | 16.7 / 16.8 ms | 358 ms | 56 ms | 1.60 s | 256,562 B |
| mobile-4g | 1.57 s | 0.00000 | 16.7 / 33.4 ms | 2,437 ms | 352 ms | 1.69 s | 256,562 B |

*Long-task excess is the sum of duration above 50 ms through the settled home scene, not a Lighthouse TBT score. **Event Timing samples cover volume selection, Escape and menu opening; these are not field INP. Frame intervals use actual canvas frame increments and exclude the initial dispatch interval. Desktop motion is approximately 60 fps; the throttled mobile sample varies around 30–60 fps. Both measured zero rendered frames while idle.

Full network waterfall, resource sizes, heap, render counters and timings: [hardware performance JSON](../artifacts/redesign/world/performance.json). A separate [SwiftShader software-renderer run](../artifacts/redesign/world/performance-software.json) is retained and is substantially slower; it must not be presented as hardware frame-rate evidence.

The scene downloads no model or bitmap texture assets. The observed logo response is 663 compressed bytes; the favicon is 15,086 bytes. Font responses total about 196 kB desktop / 164 kB mobile. Three.js reports 76 live geometries and 10 textures including the shadow map. The nine generated RGBA lettering images account for approximately 2.125 MiB before mipmaps; framebuffer/shadow allocations are additional. Exact GPU memory bytes are not exposed by portable WebGL. Measured JS heap is recorded separately in the JSON.

## Known limits

Cold startup remains the principal cost: the throttled mobile run reaches its first real scene after roughly five seconds and settles after roughly seven, while the original headline and direct navigation are already usable. The heaviest sampled mobile menu interaction is slower than the desired sub-200 ms range. These costs are disclosed rather than hidden by the favorable text LCP. There is no blocking intro or navigation gate.

Physical iOS/Android GPU, thermal and battery behavior, actual Safari on Apple hardware, field INP and deployed CDN behavior have not been measured. WebKit on Windows is engine coverage, not an iPhone certification. Automated accessibility checks supplement the keyboard/touch review and do not constitute a screen-reader certification. Social destinations are preserved; no external message was sent and no deployment was performed.

## Material implementation files

New presentation files:

- `src/app/components/experience/ExperienceHome.tsx`
- `src/app/components/experience/ExperienceNavigation.tsx`
- `src/app/components/experience/SubjectArt.tsx`
- `src/app/components/experience/system.css`
- `src/app/components/experience/experience.css`
- `src/app/components/experience/editorial-reader.css`
- `src/app/components/experience/interior.css`
- `src/app/components/experience/world/WorldExperience.tsx`
- `src/app/components/experience/world/state.ts`, `state.test.ts`
- `src/app/components/experience/world/camera.ts`
- `src/app/components/experience/world/environment.ts`
- `src/app/components/experience/world/exhibits.ts`
- `src/app/components/experience/world/interaction.ts`
- `src/app/components/experience/world/materials.ts`
- `src/app/components/experience/world/geometry.ts`
- `src/app/components/experience/world/optimize.ts`
- `src/app/components/experience/world/runtime.ts`
- `src/app/components/experience/world/copy.ts`, `world.css`
- `src/app/[locale]/template.tsx`

Integration changes:

- `src/app/[locale]/page.tsx`: renders the new experience.
- `src/app/[locale]/layout.tsx`: shared navigation, tokens, theme color and no-JS navigation handling.
- `src/app/[locale]/chapters/page.tsx`: retained CV in the new editorial styling.
- `src/app/[locale]/contact/page.tsx`: retained composer in the new editorial styling.
- `src/app/components/sketchbook/VolumeReader.tsx`: editorial reader styling and section numbering.
- `src/app/sections/Footer.tsx`: new identity/footer presentation with original destinations.
- `scripts/check-contrast.mjs`: checks active design tokens.
- `scripts/check-library-failures.mjs`: distinguishes the permanent closed navigation dialog from the optional open library dialog and waits for hydration.

New audit/verification tooling is in `scripts/redesign-*.mjs`, `scripts/world-*.mjs`, `scripts/inspect-reference*.mjs`, `scripts/write-content-manifest.mjs`, `scripts/write-world-gallery.mjs` and `scripts/write-world-report.mjs`. The rejected Atlas component/scene and obsolete hero styling were removed. A route-level loading boundary was intentionally removed after no-JS verification found it obscured server content; world loading is local to its own component.

The repository already contained unrelated modified/untracked files when work began. Those changes were preserved. The content comparison uses the captured working-tree baseline rather than Git HEAD.

## Reproduce

```powershell
npm.cmd run build:next
npm.cmd run start -- --port 3100
# In a second shell:
npm.cmd test
npm.cmd run lint
npm.cmd run test:i18n
npm.cmd run test:contrast
node scripts/world-qa.mjs http://localhost:3100
node scripts/world-final-check.mjs http://localhost:3100
node scripts/world-performance.mjs http://localhost:3100
node --import ./scripts/register-test-resolver.mjs scripts/redesign-regression.mjs http://localhost:3100
node scripts/redesign-interactions.mjs http://localhost:3100
node scripts/redesign-cross-browser.mjs http://localhost:3100
node scripts/write-world-gallery.mjs
node scripts/write-world-report.mjs
```

Stop the production server before rebuilding its `.next` directory. The development server uses the separate `.next-dev` directory and can remain running.

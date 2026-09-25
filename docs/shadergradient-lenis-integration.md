# ShaderGradient / Lenis integration

## CURRENT ARCHITECTURE — audit before implementation, 25 September 2026

Next 15.5.23 App Router, React 18.2, Three 0.165.0, TypeScript, npm/package-lock. The archive is vanilla Three, not R3F. No GSAP or ScrollTrigger is installed. Motion handles existing DOM interactions. Server-rendered content, 33 localized routes, readers, optimizer and contact flow remain authoritative.

The archive owns an on-demand RAF; WorldExperience separately schedules scroll updates. Contact's neuron scene has an on-demand RAF. The optional library and DOM page-turn reader own isolated animation loops while activated; CareerTimeline uses a one-shot hash RAF. There is no global scroll controller. Navigation and optional library dialogs currently lock body overflow. Existing reduced-motion handling, IntersectionObserver/visibility suspension, local world loader and direct-link WebGL failure states must survive.

Palette: #181c18 dark, #eae8dd ivory, #d4de95 acid olive. World fog #18251e, warm stone/paper and restrained green lights. The opaque world renderer and placeholder currently cover anything behind them. The homepage contains archive, catalogue introduction, four service articles, three research articles, optional library and closing contact invitation. Approach, CV, contact and seven readers are real routes. Contact has its own Three canvas; optional library creates another context. Route template only fades opacity. Main room renders ~76 calls, 76 geometries, 10 textures, with cached shadows and no idle frames.

## DEPENDENCY COMPATIBILITY

Verified official sources: https://shadergradient.co/, https://github.com/ruucm/shadergradient, https://lenis.dev/, https://github.com/darkroomengineering/lenis. Registry and published tarball inspected before installation in artifacts/integration/package-audit.

Published @shadergradient/react is 2.4.20. Its manifest only declares React/ReactDOM peers, but its shipped ESM imports @react-three/fiber, three, three-stdlib and camera-controls. The official README explicitly requires these and specifies React 19 + R3F 9 for Next 15 App Router. React 18 + Fiber 8 is structurally incompatible with that router's vendored React. Use the documented combination, with a real React/ReactDOM update and matching types; no aliases, transpilation workarounds or framework upgrade. Three 0.165.0 satisfies all relevant peers and stays unchanged. Existing visx accepts React 19. Lenis current published release is 1.3.26.

ShaderGradientCanvas accepts children but does not forward arbitrary Canvas props in this release. A child can use official R3F useThree/setFrameloop/advance APIs. ShaderGradient has no imperative public ref and reconstructs material when props change: drive supported props at a bounded cadence only while interpolating, memoize the resting component, and manually advance the demand-controlled canvas. Do not mutate package internals or fork the renderer. Use lightType=3d (no remote HDR), grain=off and owned local props. Plane has 384 triangles; waterPlane has 73,728; sphere is denser. Compare the three visually, then prefer plane for architectural ambient strata.

## INTEGRATION STRATEGY

One persistent root ExperienceDirector owns Lenis, semantic route/section/volume state, normalized velocity, pointer, device tier and a shared RAF. Lenis autoRaf=false; it receives milliseconds. World runtime subscribes to this clock only while dirty/moving. Atmosphere rendering is advanced by the same clock; no second application controller loop. High-frequency values remain external mutable state; React subscribers receive semantic changes only.

Keep the authored room, exhibit geometry, camera poses, original inspection copy and original editorial content. Named volume stops inside the existing sticky archive supply seven semantic scroll destinations; authored inspection poses and current overlay follow them. Explicit object/index activation scrolls to its stop without locking input; wheel/touch/keyboard interruption cancels the destination. Return restores the home position and keyboard focus. Subsequent scroll retreats through the room into the original catalogue. Below it, measured DOM section ranges supply local progress and active volume. Navigation keeps real route/anchor URLs and focus/history behavior.

One persistent atmospheric context plus the principal world context: two normal maximum. Optional library temporarily releases the atmosphere before creating its own context. Contact replaces the archive as the principal scene. Foreground alpha and transparent world ground reveal atmosphere around the original geometry; the same damped accent influences fog/highlights. DOM masks retain reading contrast. The field remains through the world/editorial boundary, quieter behind reading and slightly concentrated at contact. Layer tokens define atmosphere, world, mask, content, navigation and modal order.

## PERFORMANCE STRATEGY

Preserved current hardware baseline in artifacts/integration/before (prior measured JSON and screenshot). Add matching before/after browser profiling before application edits. Use Playwright channel=chromium, which exposes Intel Iris Xe / ANGLE D3D11; default headless shell is SwiftShader and cannot substantiate hardware FPS. Measure idle, scrolling and camera transition frame intervals, main-thread metrics, resources, LCP, CLS, sampled Event Timing, context count and renderer memory counts. GPU utilization/precise allocated texture bytes and field INP cannot be claimed from these browser samples.

Atmosphere DPR 1 desktop/mobile, no HDR/postprocessing/grain, throttled 30Hz desktop and lower mobile, with interpolated prop updates only during changes. Device tiers A/B/C/D reduce atmosphere cadence/intensity first; sustained missed frame budgets yield static atmosphere before reducing core world detail. Hidden tabs pause the shared clock. Covered scenes pause rendering. Keep contexts stable through normal scrolling and route transitions. Defer atmosphere import until core room readiness (or an interior route), fade it in without introducing a loader or gating text.

## FALLBACK STRATEGY

Static CSS field is always present. Failed shader import, WebGL/context loss, reduced motion or constrained capability uses that designed field and preserves main room/content. Reduced motion disables smoothing and atmospheric animation, pointer parallax and scroll-driven large camera travel; explicit inspect remains immediate. Touch remains native (syncTouch=false). Nested readers, timeline, scroll regions, dialogs and horizontal index bypass Lenis. Full-screen menus stop/resume Lenis; ordinary inspection does not lock scrolling. No-JS server content and all direct volume URLs remain usable. Browser history, anchor focus, resize and orientation are part of acceptance QA.

Implementation results and measured comparison will be appended after verification.




## IMPLEMENTED RESULT — 26 September 2026

The archive geometry, seven metaphors, original camera poses and original content remain. The sticky archive now has seven named measured inspection positions, followed by its overhead retreat into the catalogue. Clicks, actual mesh raycasts, touch and keyboard activation use the same destination. At 1440×900, volume IV settles at approximately 782px; the stop comes from DOM geometry, not a hardcoded global pixel offset. Free scrolling resolves the same volumes. Explicit activation focuses the heading; passive scrolling does not steal focus. Escape returns to the room and restores index focus. Wheel/touch/keyboard interruption releases an in-flight destination.

ExperienceDirector is the semantic source for archive state, active volume, section-local progress, route phase, velocity, pointer, motion preference and capability. Only semantic changes notify React subscribers. ScrollProvider creates exactly one Lenis instance with autoRaf=false, syncTouch=false and native touch. One application clock advances Lenis in milliseconds, then controllers, dirty world/contact rendering, and the atmosphere through R3F's supported manual advance API. The optional legacy library and DOM page-turn engine retain their isolated, opt-in renderer loops; the archive and atmosphere pause behind the library.

The atmosphere uses one ShaderGradientCanvas, locally owned props, a plane, 3D ambient light and no HDR, editor URL, grain or postprocessing. Its DPR is 1. Props interpolate at bounded cadence because this package exposes no public imperative gradient ref; resting props are memoized. Home is deep and quiet; hover raises strength slightly, transition adds a small speed increase, inspection slows movement, editorial reading reduces strength and cadence, and contact concentrates the field. Velocity is clamped to 0–1 then exponentially damped before adding at most 0.07 strength / 0.015 speed. Pointer displacement is at most 0.035 / 0.025 world units. The same damped accent drives room fog and selected floor highlights. Text retains its original reading surfaces and contrast.

| Volume | Atmospheric interpretation |
| --- | --- |
| I — The Unread Pile | Density 2.5, layered, slow |
| II — The Naked Number | Density 0.85, lower strength and amplitude |
| III — The Week-Long Month | Directional rotation −40°, stretched placement |
| IV — Two Rulebooks | Controlled division, +24° rotation |
| V — The Overrun Claim | Amplitude 0.20, restrained instability |
| VI — The Threshold Cliff | Density 2.9 / frequency 5, compressed threshold |
| VII — The Sealed Model | Speed 0.018 before inspection/device reduction, concentrated |

Normal context count is two: archive + atmosphere, or contact sculpture + atmosphere. The atmosphere persists through ordinary route changes; the library releases it before creating its own context, keeping two live contexts even during the optional experience. Static CSS remains underneath. Renderer state and pointer handlers never intercept atmospheric clicks. Hidden tabs stop the shared clock; full-screen menus pause renderers and stop Lenis. Ordinary inspection stays scrollable. Nested panels, book mode, horizontal career track, tables and textareas use native scrolling. Same-page anchors are explicitly coordinated with Lenis, native URLs/history and completion focus, avoiding a simultaneous browser jump. Resize preserves inspection, and story travel uses the sticky stage's measured height rather than mobile toolbar-dependent innerHeight.

Tier A uses 30Hz atmosphere drawing / at most 10Hz prop interpolation. Tier B uses 15Hz / about 6Hz, with reduced strength/speed. Inspection runs at 15Hz desktop / 12Hz mobile and reading at 8Hz. Tier C adds lower core DPR, fewer archive details and a smaller shadow map, with 12Hz atmosphere / about 4Hz prop changes. Tier D releases the atmosphere and uses the static field with native wheel scrolling. Sustained slow active camera frames remove atmospheric cost before reducing core resolution; idle gaps do not count as slow frames. Reduced motion uses the static field, native/immediate scrolling, no parallax or automatic large scroll-camera travel, and immediate explicit inspection.

### Dependency decisions

Installed exact versions: @shadergradient/react 2.4.20, lenis 1.3.26, @react-three/fiber 9.8.1, React/ReactDOM 19.3.0, matching React types 19.3.0, three-stdlib 2.36.1 and camera-controls 2.10.1. Next remains 15.5.23 and Three remains 0.165.0, deduplicated across all consumers. The published ShaderGradient runtime also bundles camera-controls 2.9.0 internally; its diagnostics identify that bundled version. No package internals, aliases or framework configuration hacks were changed. The React type update required one nullable-ref type correction in FanChart, with no optimizer behavior change.

Official compatibility guidance: [ShaderGradient README](https://github.com/ruucm/shadergradient). Frame control uses [R3F's documented hooks](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/docs/API/hooks.mdx). Lenis options and lifecycle follow the [official Lenis documentation](https://github.com/darkroomengineering/lenis).

### Measured comparison

Raw runs: artifacts/integration/before/profile.json and artifacts/integration/after/profile.json. Same production server, hardware Chromium / Intel Iris Xe ANGLE D3D11. Desktop is 1440×900, unthrottled. Phone is 393×852, touch enabled, 1.6Mbps down / 150ms latency / 4× CPU slowdown, retaining the desktop GPU. These are individual local lab samples, not field data or physical-phone GPU measurements. Frame values below are browser RAF cadence during the named workload; actual renderer counters are additionally recorded in the after sample. A static world does not render just because RAF runs.

| Environment | Metric | Before | After |
| --- | --- | --- | --- |
| Desktop | LCP | 428 ms | 444 ms |
| Desktop | CLS | 0.000066 | 0.000000 |
| Desktop | Idle RAF median / p95 | 16.7 / 16.9 ms | 16.7 / 16.9 ms |
| Desktop | Camera RAF median / p95 | 16.7 / 16.9 ms | 16.7 / 16.9 ms |
| Desktop | Scroll RAF median / p95 | 16.7 / 16.8 ms | 16.7 / 16.9 ms |
| Desktop | Main-thread task time during interaction sequence | 0.98 s | 2.16 s |
| Desktop | Load long-task excess above 50ms | 323 ms | 588 ms |
| Desktop | Largest sampled Event Timing duration | 56 ms | 40 ms |
| Desktop | JS heap at end of sample | 8.7 MiB | 13.1 MiB |
| Phone emulation | LCP | 1416 ms | 1384 ms |
| Phone emulation | CLS | 0.000000 | 0.000000 |
| Phone emulation | Idle RAF median / p95 | 16.7 / 16.8 ms | 16.7 / 16.8 ms |
| Phone emulation | Camera RAF median / p95 | 16.7 / 16.8 ms | 16.7 / 33.5 ms |
| Phone emulation | Scroll RAF median / p95 | 33.2 / 49.9 ms | 16.7 / 33.4 ms |
| Phone emulation | Main-thread task time during interaction sequence | 5.09 s | 6.28 s |
| Phone emulation | Load long-task excess above 50ms | 830 ms | 1200 ms |
| Phone emulation | Largest sampled Event Timing duration | 232 ms | 184 ms |
| Phone emulation | JS heap at end of sample | 9.9 MiB | 13.0 MiB |

Total encoded JavaScript fetched through enhancement readiness: 256,562 → 410,201 bytes (+153,639 bytes). This includes lazy world and shader code. Next's initial homepage build budget is approximately 111 → 113 kB; most additional code is deferred until the room is ready. No remote textures or HDR files are fetched. The field adds one geometry / one draw call / zero textures. Core room remains 76 geometries and 10 renderer-counted textures, with about 76 desktop / 75 mobile home draw calls. Nine generated source texture buffers total approximately 2.125MiB RGBA before mipmaps, plus the existing shadow map; driver framebuffer/depth/MSAA allocation is not exposed as an exact portable byte count.

In the approximately two-second idle windows, the main world rendered 0 desktop / 0 phone frames; the atmosphere rendered 61 / 30. The world therefore retains on-demand idle behavior while the field runs at its deliberately lower cadence. Actual world frames during the two-second camera samples were 78 / 61; those windows include the settled tail after camera arrival, so dividing by two would not describe active animation FPS.

GPU utilization and exact allocated GPU memory were not available from these browser APIs. Sampled Event Timing is not field INP, and load long-task excess is not Lighthouse TBT. Heap measurements are GC-sensitive. No causal performance improvement is claimed from lower individual input or scroll samples. Added shader work increases main-thread work and transferred code; the selected plane and reduced mobile cadence contain that cost. The first mobile profile showed 50ms camera p95, prompting lower mobile cadence; that earlier run is retained as profile-first-pass.json.

### QA and artifacts

- Production build: 40 generated pages, successful type checking. Lint: no errors, one pre-existing anonymous-export warning in open-next.config.ts. Unit tests: 35 passing. Localization: all three languages. Contrast: 20 token pairs pass.
- All 33 public routes preserve original content, links, images, metadata and JSON-LD. All 51 authoritative source/assets hashes remain unchanged (artifacts/redesign/qa/content-regression.json).
- Required eight sizes: 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 393×852, 375×812. Matching camera/scroll/shader destinations, visible focus, inspection accessibility, no horizontal overflow, menus and anchors are asserted in after/qa.json.
- All seven direct mesh raycasts synchronize scroll (after/raycast.json). Native touch flick/reversal and orientation-preserved inspection, plus the two-live-context cap including the optional library, are in after/lifecycle.json.
- Rapid selection, wheel reversal, PageUp/PageDown, Home/End, Space/Shift+Space, Enter, Escape, menu focus restoration, persistent route canvas, history, hidden/visible-tab lifecycle, reduced motion, no JS and no WebGL are checked. Shader context loss leaves the core scene usable.
- Full animated integration also passes WebKit 26.6 and Firefox 155 at phone viewport, including selection, menu, anchor focus, live reduced-motion change and rotation (after/browsers.json). This is engine automation, not physical iOS Safari or Android Chrome certification.
- Blocked shader chunk, blocked world chunk, Save-Data static tier and low-memory tier are exercised in after/fallbacks.json. Unavailable WebGL uses a compact 100svh opening; reduced motion uses 175svh, avoiding an unnecessarily long static scroll span. Final home accessibility, animated anchor arrival/focus and those fallback heights are checked in after/final-check.json. The original readers, optimizer, optional library and contact draft workflow are rechecked without sending messages.
- Shape screenshots and measured geometry counts are in shapes/: plane 384 triangles (chosen), sphere 84,500, waterPlane 73,728. Review gallery: artifacts/integration/index.html.

### Changed application files

New: experience/director/{clock.ts,narrative.ts,narrative.test.ts,experience-director.ts,ScrollProvider.tsx}; experience/atmosphere/{ShaderAtmosphere.tsx,ShaderRenderer.tsx,shader-presets.ts,shader-state.ts,atmosphere.css}.

Updated: localized root layout (persistent provider); ExperienceHome (semantic section attributes); WorldExperience (director subscription, measured stops and keyboard/focus bridge); world/runtime.ts (alpha, shared clock, coupled accent, current-frame projection and quality budgeting); ExperienceNavigation and ShelfLauncher (Lenis locks / context priority); contact/neuron-scene.ts (shared clock); optimizer/FanChart.tsx (React 19 nullable ref type); package.json and package-lock.json. Verification scripts named integration-*.mjs, write-integration-*.mjs and this note are added; the retained interaction script now uses hardware Chromium. Existing unrelated user changes remain untouched.

### Remaining limits

Physical iOS/Android devices, actual trackpad hardware, field INP, deployment/CDN behavior and GPU power utilization were not available. Browser wheel/touch protocol tests approximate input. Low-powered GPUs may deliberately receive a static atmospheric field. The official package's prop-based API requires bounded React/material updates during transitions; the app does not patch private uniforms to avoid them. No deployment was performed.

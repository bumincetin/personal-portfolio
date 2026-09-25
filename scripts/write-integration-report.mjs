import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const before=read('artifacts/integration/before/profile.json'),after=read('artifacts/integration/after/profile.json');
const quantile=(a,p)=>[...a].sort((x,y)=>x-y)[Math.floor((a.length-1)*p)];
const frame=a=>`${quantile(a,.5).toFixed(1)} / ${quantile(a,.95).toFixed(1)} ms`;
const bytes=r=>r.load.resources.filter(x=>x.name.includes('.js')).reduce((s,x)=>s+x.bytes,0);
const tasks=r=>Math.round(r.load.metrics.tasks.reduce((s,x)=>s+Math.max(0,x-50),0));
const rows=[];
for(let i=0;i<2;i++){const b=before[i],a=after[i],device=i?'Phone emulation':'Desktop';for(const [label,x,y] of [['LCP',`${b.load.metrics.lcp} ms`,`${a.load.metrics.lcp} ms`],['CLS',b.load.metrics.cls.toFixed(6),a.load.metrics.cls.toFixed(6)],['Idle RAF median / p95',frame(b.idle),frame(a.idle)],['Camera RAF median / p95',frame(b.camera),frame(a.camera)],['Scroll RAF median / p95',frame(b.scroll),frame(a.scroll)],['Main-thread task time during interaction sequence',`${b.mainThreadSeconds.toFixed(2)} s`,`${a.mainThreadSeconds.toFixed(2)} s`],['Load long-task excess above 50ms',`${tasks(b)} ms`,`${tasks(a)} ms`],['Largest sampled Event Timing duration',`${Math.max(0,...b.metrics.events)} ms`,`${Math.max(0,...a.metrics.events)} ms`],['JS heap at end of sample',`${(b.heapBytes/1048576).toFixed(1)} MiB`,`${(a.heapBytes/1048576).toFixed(1)} MiB`]])rows.push(`| ${device} | ${label} | ${x} | ${y} |`);}
const report=`

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
${rows.join('\n')}

Total encoded JavaScript fetched through enhancement readiness: ${bytes(before[0]).toLocaleString('en-US')} → ${bytes(after[0]).toLocaleString('en-US')} bytes (+${(bytes(after[0])-bytes(before[0])).toLocaleString('en-US')} bytes). This includes lazy world and shader code. Next's initial homepage build budget is approximately 111 → 113 kB; most additional code is deferred until the room is ready. No remote textures or HDR files are fetched. The field adds one geometry / one draw call / zero textures. Core room remains 76 geometries and 10 renderer-counted textures, with about 76 desktop / 75 mobile home draw calls. Nine generated source texture buffers total approximately 2.125MiB RGBA before mipmaps, plus the existing shadow map; driver framebuffer/depth/MSAA allocation is not exposed as an exact portable byte count.

In the approximately two-second idle windows, the main world rendered ${after[0].renders.idle.frames.world} desktop / ${after[1].renders.idle.frames.world} phone frames; the atmosphere rendered ${after[0].renders.idle.frames.shader} / ${after[1].renders.idle.frames.shader}. The world therefore retains on-demand idle behavior while the field runs at its deliberately lower cadence. Actual world frames during the two-second camera samples were ${after[0].renders.camera.frames.world} / ${after[1].renders.camera.frames.world}; those windows include the settled tail after camera arrival, so dividing by two would not describe active animation FPS.

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
`;
const path='docs/shadergradient-lenis-integration.md';let initial=fs.readFileSync(path,'utf8').split('\n## IMPLEMENTED RESULT')[0];initial=initial.replace('Plane has 386 triangles','Plane has 384 triangles').replace('fog/highlights/HUD','fog/highlights');fs.writeFileSync(path,initial+report);
console.log('Integration report written.');

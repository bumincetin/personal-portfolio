# 3D landing restoration

26 September 2026. This supersedes the initial redesign's decision to retire the 3D homepage. The user's follow-up asked to retain that landing experience in harmony with the new design.

## Result

The original architectural room and all seven procedural exhibits return beside the new homepage typography. Cream surfaces, coral structure, apricot details and cobalt objects share the portfolio's palette. The work gallery, evidence sections, contact flow and complete reading pages remain in place.

Each object opens an inspection view and a link to its canonical work record. Seven labelled HTML buttons provide the same choices by keyboard. “Whole room” and Escape return to the overview. The camera eases between selected objects; reduced motion changes the view immediately.

Vertical scrolling uses the browser's native wheel and touch behavior. The scene occupies a normal section of the document. A 240-pixel wheel input over the canvas produced 240 pixels of page movement. Swiping through the canvas scrolls the page without selecting an object.

## Loading and rendering

- Desktop opens the interactive scene after the initial HTML paint.
- Phones, touch screens, low-memory devices and data-saving browsers start with the local 36.7 kB room image. Selecting an exhibit or choosing “Explore in 3D” loads Three.js and opens the room.
- The still-view toggle releases the renderer and GPU resources. WebGL failure or context loss returns to the same local image. The toggle can retry the interactive view.
- With JavaScript disabled, the room image and seven ordinary gallery links remain available.
- Rendering runs on demand for selection, hover and resizing. It stops when settled, offscreen or in a background tab. Static geometry is batched; the overview uses 76 draw calls.
- Three.js is dynamically imported by the homepage component. Article pages retain their existing lightweight readers.

## Files

- `src/app/components/experience/ExperienceHome.tsx`: combined editorial introduction and room.
- `src/app/components/experience/world/`: restored geometry and exhibits; updated materials, camera, runtime, controls, localized copy and responsive styles.
- `src/app/[locale]/layout.tsx`: scene stylesheet.
- `public/world-preview.webp`: local capture of the restored room for initial paint and fallback.
- `package.json`, `package-lock.json`: Three.js and its TypeScript definitions; world browser-check command.
- `scripts/check-world.mjs`: interaction, lifecycle, mobile, accessibility and fallback checks.
- `scripts/check-portfolio.mjs`: homepage canvas allowance and gallery viewport setup.
- `scripts/check-i18n.mjs`: EN/TR/IT scene-copy completeness.

Canonical content, research values, sources and limitations are unchanged. Existing metadata, alternate language routes and social images are preserved.

## Verification

- `npm run verify`: lint, TypeScript, localization, 20 contrast pairs, all 35 unit tests and production Next build passed.
- `npm run test:e2e`: all 62 route/viewport audits passed, followed by gallery motion, pause, keyboard, touch, reduced-motion and no-JavaScript checks.
- `npm run test:enhancements`: native wheel behavior, hidden/offscreen gallery pause, 200% zoom, constrained-device gallery behavior and localized optimizer checks passed.
- `npm run test:world`: 15 final checks passed with no uncaught page errors. Coverage includes object raycasting, all seven keyboard selections, native wheel/touch scrolling, phone activation by exhibit selection, reduced motion, idle/hidden/offscreen rendering, still-view switching, WebGL context recovery, no JavaScript and data-saving opt-in. EN/TR/IT layouts were checked at 320, 390 and 768 pixels, plus the 1440-pixel desktop view.
- `npm run test:generated` and `npm audit`: generated palette current; zero reported vulnerabilities.
- Every character introduced by the room's localized copy is covered by the existing self-hosted font subset.

- `npm run build`: final Next/OpenNext build passed and emitted the Cloudflare worker.
- Local Wrangler preview: EN/TR/IT homepages, interactive room, preview image and seven work links passed. Forced desktop WebGL startup failure returned to the still image without an uncaught page error.

## Performance

Mobile Lighthouse 13.5.0, against the local production server:

| Version | Performance | LCP | Total blocking time | Layout shift |
| --- | ---: | ---: | ---: | ---: |
| Previous 2D redesign | 97 | 2.43 s | 110 ms | 0.000134 |
| Initial restoration with immediate mobile 3D | 57 | 4.50 s | 1,550 ms | 0.000333 |
| Final room with mobile activation on tap | 97 | 2.54 s | 74 ms | 0.000333 |

The final audit scores 100 for accessibility, best practices and SEO. The mobile result measures the initial room image and HTML interface; Three.js loads when requested. The eager-loading result exposed the initialization cost and led to that adjustment. Desktop retains automatic 3D loading. The homepage's initial Next.js bundle is 116 kB; the scene adds its separate runtime chunk when activated.

## Evidence

`artifacts/world-restoration/` contains desktop and mobile screenshots, an inspected exhibit, static fallbacks, the world-check report, resource measurements and Lighthouse reports. `artifacts/evolution/after/qa.json` contains the 62 route/viewport results.

Browser checks use local Chrome. The dedicated world suite uses software WebGL to exercise the renderer reproducibly. Measurements are local laboratory results; physical mobile hardware and public-network conditions can differ.

The public deployment has not been changed.

## Final homepage and CV update

At the owner's request, the red-dot homepage tagline was removed. Alvolo
Consulting now appears first in the CV experience list with “March 2025 –
Present,” translated consistently in Turkish and Italian. The career story,
page headings and printable CV also show the ongoing role. This is an explicit
owner correction to the earlier closed dates; other employment dates remain
as recorded.

## Final status

READY

# Experience storyboard — decision archive

Revised before the immersive prototype, 2026-09-25, following the explicit design correction. The folded-plane hero is rejected. The first screen is a real-time full-viewport architectural environment; typography is a quiet interface over the world.

## Spatial plan

An original cutaway archive hall: tiled floor, ribbed concrete perimeter, illuminated clerestory, archive cabinets, central calculation table and seven physical exhibits. Foreground: sealed model and document desk. Middle: calculation instrument and reporting bench. Background: paired rulebooks, evidence board and threshold staircase. Warm paper, graphite green, oxidized metal and restrained pale acid light. No downloaded models or reference assets.

| Volume | Physical exhibit |
|---|---|
| I / Unread Pile | Uneven paper stacks, document trays and reading lamp |
| II / Naked Number | Circular calculation table with a number instrument and forecast bars |
| III / Week-Long Month | Reporting bench with repeated calendar plates |
| IV / Two Rulebooks | Two oversized bound rulebooks in a divided archive bay |
| V / Overrun Claim | Evidence board with connected claim cards |
| VI / Threshold Cliff | Physical staircase meeting a marked threshold |
| VII / Sealed Model | Framed enclosure around an analytical polyhedron |

## State and camera contract

One typed reducer owns LOADING, INTRO, HOME, HOVERING, TRANSITIONING, SELECTED, EDITORIAL and FALLBACK. Pointer raycasting and semantic HTML controls dispatch the same events. The runtime consumes this state. Authored HOME, INTRO, EDITORIAL and VOLUME_01–07 camera positions interpolate position, target and field of view. The intro takes at most two seconds and is immediately interruptible. Selection reveals original title, note, output and a normal route link in a DOM panel. Escape/return goes HOME and returns focus.

## Sequence

1. Immediate semantic navigation, original headline and seven ordinary links. Lightweight line-plan placeholder while Three.js loads. No site-wide loader.
2. Real room renders, camera settles into HOME. Projected DOM markers and raycast meshes identify seven exhibits. Hover changes material and reveals the title.
3. Tap, click or keyboard activation approaches an exhibit. Original content appears in a readable overlay. All seven exhibits remain available from a compact index.
4. Native scrolling moves toward an overhead editorial camera. The world stays sticky through 175vh, then yields naturally to the preserved introduction and services. No scroll interception.
5. Existing editorial chapters, volume readers, optional legacy shelf, CV and contact composer remain intact.

## Responsive and access contract

Mobile uses actual geometry with fewer cabinet details, capped DPR, smaller shadow map and portrait camera. Persistent seven-position index supplies guided tap navigation. Reduced motion retains WebGL with instant camera changes, no intro/parallax. Unsupported WebGL or chunk failure exposes direct volume links. No-JS retains the semantic page and links.

## Runtime and evidence

Single canvas, no postprocessing, no external model/texture downloads. Render only during changes; suspend outside viewport or while hidden. Dispose resources and listeners. Context loss exposes fallback. Capture loading, HOME, hover, selection, changed camera, scroll, mobile and reduced motion before acceptance.

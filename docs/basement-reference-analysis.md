# Current Basement reference deconstruction

Directly inspected https://basement.studio on 2026-09-25. Evidence: `artifacts/redesign/reference/`, including entry, settled hero, intermediate scroll, project and footer captures at 1920×1080, 1440×900, 1024×768, 430×932 and 393×852. These are current production captures, not archive imagery. Browser automation only inspected the rendered experience; no source code, shaders, models or proprietary assets were extracted for implementation.

| Observation | Classification | Translation to Bumin's site |
|---|---|---|
| Initial shell/navigation arrives before the room; the first capture shows a dark reserved scene area | ADAPT PRINCIPLE | Immediate readable headline and inexpensive SVG; never a blank viewport while a scene loads |
| The entry is a full-viewport, stylized digital interior with legible depth and environmental details | ADAPT PRINCIPLE | A full-viewport original decision archive with floor, architectural perimeter, seven physical exhibits and authored camera views |
| Pointer movement changes the spatial presentation; environmental objects invite exploration | ADAPT PRINCIPLE | Raycast hover/click on physical exhibits, material response, pointer parallax, camera approaches and synchronized HTML controls |
| Small persistent top navigation coexists with the immersive hero | COPY PRINCIPLE | Compact identity rail and discoverable route links, plus full index |
| Services navigation visibly passes through a wireframe rendering of the room | ADAPT PRINCIPLE | Concise shared route entrance and a persistent graphic vocabulary; avoid forcing a long transition |
| A fixed mode switch offers an alternative rendering of the environment | ADAPT PRINCIPLE | Reduced motion keeps the real scene with immediate camera changes; existing article/book controls remain available |
| Dense, bold grotesque typography, large headlines, thin horizontal rules and minimal edge margins | ADAPT PRINCIPLE | Existing Inter paired with Instrument Serif, responsive display scale, ruled editorial grid, wider reading margins |
| Large project media occupies substantially more area than the adjacent description | COPY PRINCIPLE | Each research volume gets its own large original conceptual plate and readable evidence note |
| Desktop project descriptions and titles align in separate columns; mobile puts media, title and description in sequence | COPY PRINCIPLE | Recompose for touch rather than reduce the desktop layout |
| A restrained black ground lets project imagery supply color | ADAPT PRINCIPLE | Graphite/ivory grounded in this site's book artwork; olive, blue and copper derived from existing bindings |
| Tight project transitions alternate with long spaces and large type | COPY PRINCIPLE | Entry → quiet context → service index → large evidence chapters → exploration → conversation |
| Mobile retains a tall immersive entry and replaces the link rail with a visible Menu control | ADAPT PRINCIPLE | Mobile renders the real room with reduced detail, capped DPR, smaller shadow map and a guided seven-volume touch index |
| Contact is reachable independently of spatial exploration | COPY PRINCIPLE | Direct links remain visible and the existing composer remains conventional HTML |
| Footer uses oversized identity above a sparse directory, social links and legal line | ADAPT PRINCIPLE | Oversized personal name and complete original contact/social/legal information |
| Photographs, branded room objects, characters, display face, media and sound belong to Basement | IGNORE | None are used or recreated |
| There are multiple optional environmental controls, chat/presence and sensory details | IGNORE | No fictional live status, extra networking, sound or multiplayer features |

## Loading, performance and accessibility observations

The live room visibly loads after its navigation; screenshots alone cannot establish real LCP, GPU budgets or memory behavior. Heavy scene rendering made automated capture noticeably slower than a normal document. Do not infer Basement's internal optimization architecture from this. Our strategy is independently chosen: procedural geometry, capped DPR, on-demand frames, batched static geometry and an actual mobile WebGL scene.

The reference exposes meaningful page content and links as DOM text even while WebGL is active. Mobile project content is readable in ordinary document flow. Captures showed a custom pointer and a fixed mode control. They do not prove full keyboard/screen-reader compliance. Our implementation will explicitly test native dialog focus, Escape, tab navigation, contrast, reduced motion and no-JS content.

The mobile menu was also opened directly: a full-screen typographic directory, visible Close control, and social/legal material anchored below. `mobile-menu.png` records this state. A reduced-motion browser preference was exercised (`reduced-motion-mobile.png`); a static screenshot cannot establish whether every animation respects that preference.

## Boundaries

Responsive tests use browser viewport/touch emulation, not physical iPhones or Android devices. Observed visual transitions are not measurements of their exact timing curve. No claims are made about reference FPS, network budgets, context-loss recovery or reduced-motion handling without measurement. The adaptation follows observed principles and supplies its own fallbacks.

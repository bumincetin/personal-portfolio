# Content and functionality regression report

The redesigned site retains the original authoritative content. The immersive homepage correction changes the presentation and interaction layer; it does not rewrite the seven volumes, biography, contact copy, research qualifications or limitations.

## Evidence

- [Content manifest](content-manifest.md): complete original route/content inventory, source excerpts, controls, assets and destinations.
- [Machine-readable comparison](../artifacts/redesign/qa/content-regression.json): all 33 public routes across English, Turkish and Italian return HTTP 200 and pass title, metadata, structured-data, copy, link and image checks.
- 51 authoritative content/configuration/assets files match their pre-redesign SHA-256 hashes. No changes were found.
- Homepage assertions check the original headline, introduction, collection note, seven titles, disciplines, notes, outputs, service/research/synthetic labels, boundary, shelf invitation, contact invitation and fallback copy.
- Interior pages compare normalized complete main-content text with the baseline. The only device-specific normalization is the original career timeline’s “Swipe” versus “Scroll” instruction; neither wording was rewritten.
- Original canonical URLs, hreflang, descriptions, social metadata and JSON-LD remain present. The intentional theme-color change is excluded from equality.
- All original link destinations remain discoverable. New world controls retain direct volume URLs before hydration and in fallback mode.

## Preserved functions

The seven full volume routes, article/book reader, print/save article, interactive optimizer, CV timeline, locale switching, conventional menu, browser history, optional legacy 3D library and contact draft composer remain available. Contact tests exercise validation, clipboard, email-draft URLs, guided mode and retained draft text; they do not send a message. Backend validation and optimizer tests remain intact.

The new world adds seven raycast objects, equivalent keyboard controls, original-content inspection panels, camera approaches, Escape/return focus, scroll-driven camera framing and mobile tap navigation. Reduced motion retains WebGL and makes camera changes immediate. WebGL/chunk failure and no JavaScript preserve the readable site and direct route links.

## Verification scope

The baseline was captured from the user’s working tree, including their pre-existing uncommitted edits. It was not reconstructed from Git HEAD. No reset, checkout, content replacement or asset regeneration was used. The 51-file hash check and 33-route rendered comparison confirm that no original material covered by the audit was unintentionally lost.

Full-screen screenshot evidence for the corrected immersive entry is in [the world gallery](../artifacts/redesign/world/index.html). Earlier `artifacts/redesign/qa/*-home.png` captures show the superseded hero and should not be used to assess this correction. Retained interior/menu evidence in that folder is still relevant.

See [implementation and QA report](redesign-qa-report.md) for test commands, performance measurements, changed files and remaining measurement limitations.

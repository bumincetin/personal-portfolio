# File-by-file change inventory

> Snapshot of the initial 2D redesign. The later [3D restoration](world-restoration.md) supersedes this inventory for the homepage, world modules and Three.js dependencies.

Meaningful working-tree changes and new implementation files. Machine-readable audit outputs and ignored screenshot artifacts are listed in the completion report.

| State | File | Explanation |
| --- | --- | --- |
| M | `README.md` | Document the current gallery architecture, commands, content and deployment. |
| A | `docs/evolution-baseline.md` | Record the audit, implementation evidence or historical status. |
| A | `docs/evolution-files.md` | Record the final audit and file inventory. |
| A | `docs/evolution-report.md` | Record the final audit and file inventory. |
| A | `docs/scroll-review.md` | Record the audit, implementation evidence or historical status. |
| M | `next.config.js` | Restrict image proxy hosts; add security headers; set revalidating public image caching. |
| M | `open-next.config.ts` | Name the exported configuration to clear the lint warning. |
| M | `package-lock.json` | Resolve the updated dependency graph, including the Next 15 security patch. |
| M | `package.json` | Remove obsolete dependencies and scripts; add gallery verification and safe dependency overrides. |
| M | `public/_headers` | Avoid year-long immutable caching for replaceable public media. |
| D | `public/bumin1.webp` | Remove an unused image, starter icon or retired font asset. |
| D | `public/bumin2.webp` | Remove an unused image, starter icon or retired font asset. |
| D | `public/bumin3.webp` | Remove an unused image, starter icon or retired font asset. |
| D | `public/file.svg` | Remove an unused image, starter icon or retired font asset. |
| A | `public/fonts/InstrumentSerif-OFL.txt` | Relocate the retained font unchanged, or include its upstream SIL OFL notice. |
| A | `public/fonts/Inter-OFL.txt` | Relocate the retained font unchanged, or include its upstream SIL OFL notice. |
| A | `public/fonts/instrument-serif-italic.woff2` | Relocate the retained font unchanged, or include its upstream SIL OFL notice. |
| A | `public/fonts/instrument-serif.woff2` | Relocate the retained font unchanged, or include its upstream SIL OFL notice. |
| A | `public/fonts/inter-portfolio.woff2` | Reproducible local font subsetting and licensed subset output. |
| D | `public/globe.svg` | Remove an unused image, starter icon or retired font asset. |
| D | `public/next.svg` | Remove an unused image, starter icon or retired font asset. |
| A | `public/og/en-chapters.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-contact.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-front-matter.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-volumes-cross-border.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-volumes-document-intelligence.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-volumes-forecasting.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-volumes-greenwashing-risk-scoring.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-volumes-parliamentary-seat-forecast.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-volumes-portfolio-optimizer.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en-volumes-reporting.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/en.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-chapters.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-contact.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-front-matter.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-volumes-cross-border.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-volumes-document-intelligence.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-volumes-forecasting.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-volumes-greenwashing-risk-scoring.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-volumes-parliamentary-seat-forecast.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-volumes-portfolio-optimizer.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it-volumes-reporting.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/it.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-chapters.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-contact.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-front-matter.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-volumes-cross-border.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-volumes-document-intelligence.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-volumes-forecasting.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-volumes-greenwashing-risk-scoring.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-volumes-parliamentary-seat-forecast.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-volumes-portfolio-optimizer.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr-volumes-reporting.png` | Generated 1200 x 630 localized social card for this route. |
| A | `public/og/tr.png` | Generated 1200 x 630 localized social card for this route. |
| D | `public/shelf/covers.webp` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `public/shelf/wood.webp` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `public/sketchbook/divider.png` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `public/sketchbook/instrument-serif-italic.woff2` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `public/sketchbook/instrument-serif.woff2` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `public/sketchbook/newsreader.woff2` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `public/vercel.svg` | Remove an unused image, starter icon or retired font asset. |
| D | `public/window.svg` | Remove an unused image, starter icon or retired font asset. |
| D | `scripts/a11y.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| A | `scripts/capture-evolution.mjs` | Capture matching final screenshots, resource sizes and response headers. |
| D | `scripts/capture-library.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/check-canvas-contrast.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| A | `scripts/check-enhancements.mjs` | Add reproducible browser assertions for the new gallery, responsive routes and progressive enhancement. |
| M | `scripts/check-experience.mjs` | Keep contact, career, print and fallback checks; remove assertions for the retired sculpture. |
| M | `scripts/check-i18n.mjs` | Validate new portfolio copy; remove imports for deleted presentation labels. |
| D | `scripts/check-library-failures.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/check-library.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| M | `scripts/check-links.mjs` | Check the current semantic routes and optional optimizer without shelf activation. |
| D | `scripts/check-mobile.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/check-motion.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| A | `scripts/check-portfolio.mjs` | Add reproducible browser assertions for the new gallery, responsive routes and progressive enhancement. |
| D | `scripts/check-volume-turns.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| A | `scripts/generate-og.mjs` | Generate the localized social-image system from canonical work metadata. |
| D | `scripts/inspect-reference-interactions.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/inspect-reference.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-browsers.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-fallbacks.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-final-check.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-lifecycle.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-preview.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-profile.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-qa.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-raycast.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-shape-probe.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/integration-summary.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/library-test-helpers.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/measure-library.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| M | `scripts/optimize-images.mjs` | Stop regenerating retired portrait illustrations. |
| D | `scripts/palette-adapter.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/port-shelf-engine.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/port-sketchbook-css.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-audit.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-baseline.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-cross-browser.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-interactions.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-mobile-routes.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-performance.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-qa.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/redesign-regression.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-final-check.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-finish-source.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-gallery.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-interactions.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-legacy-css.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-migrate.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-mobile-routes.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-probe.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-profile.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-qa.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-regression-setup.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-regression.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-report.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-responsive.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/refinement-review-states.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/reproduce-library-baseline.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/shelf-adapter.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/smoke.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/sources/shelf-engine.baseline.txt` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| A | `scripts/subset-font.py` | Reproducible local font subsetting and licensed subset output. |
| D | `scripts/world-final-check.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/world-gpu-probe.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/world-layout-debug.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/world-performance.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/world-preview.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/world-qa.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/write-content-manifest.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/write-integration-gallery.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/write-integration-report.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/write-world-gallery.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| D | `scripts/write-world-report.mjs` | Retire tooling tied to the deleted world, shelf, page-turn engine or historical migration. |
| M | `src/app/[locale]/chapters/chapters.css` | Keep the short-viewport timeline correction and repair print contrast for the light palette. |
| M | `src/app/[locale]/chapters/page.tsx` | Add About/CV orientation and a factual current-practice note without inventing employment. |
| M | `src/app/[locale]/contact/ContactConversation.tsx` | Retire the optional 3D sculpture; preserve message validation, editing and explicit draft handoff. |
| D | `src/app/[locale]/contact/NeuronBook.tsx` | Remove the unused visual component or legacy stylesheet. |
| D | `src/app/[locale]/contact/neuron-scene.ts` | Remove the unused visual component or legacy stylesheet. |
| M | `src/app/[locale]/front-matter/page.tsx` | Use the migrated canonical taxonomy and new reader while retaining route/metadata behavior. |
| M | `src/app/[locale]/layout.tsx` | Remove the scroll director; load two font families; share navigation, palette and skip target. |
| M | `src/app/[locale]/volumes/[slug]/page.tsx` | Use the migrated canonical taxonomy and new reader while retaining route/metadata behavior. |
| D | `src/app/components/Navbar.tsx` | Remove the unused visual component or legacy stylesheet. |
| M | `src/app/components/content/Badges.tsx` | Format retained content helper consistently. |
| M | `src/app/components/content/CaseStudyFigure.tsx` | Format retained content helper consistently. |
| A | `src/app/components/content/EvidenceRecord.tsx` | Reuse source/method/date/baseline/limitations presentation and explicit evidence states. |
| A | `src/app/components/content/OptimizerLeaf.tsx` | Defer the instrument until activation and supply its locale. |
| M | `src/app/components/content/PersonSchema.tsx` | Escape less-than characters in the static JSON-LD serializer. |
| A | `src/app/components/content/QuickRead.tsx` | Derive problem, audience, output, limits and CTA from canonical content. |
| M | `src/app/components/content/ScrollRegion.tsx` | Format retained content helper consistently. |
| M | `src/app/components/content/TrackView.tsx` | Format retained content helper consistently. |
| A | `src/app/components/content/VolumeReader.tsx` | Render one full semantic reading tree with retained anchors, grouped sections and print support. |
| M | `src/app/components/experience/ExperienceHome.tsx` | Compose hero, seven-item gallery, problem directory, evidence, method, profile and contact. |
| M | `src/app/components/experience/ExperienceNavigation.tsx` | Use functional navigation labels, equivalent locale routes, modal focus and active-page states. |
| D | `src/app/components/experience/SubjectArt.tsx` | Remove the unused visual component or legacy stylesheet. |
| A | `src/app/components/experience/WorkArt.tsx` | Draw seven original illustrative system diagrams with semantic content outside the SVG. |
| A | `src/app/components/experience/WorkGallery.tsx` | Implement slow transform motion over one accessible list, native fallbacks, pause and pointer/keyboard controls. |
| D | `src/app/components/experience/atmosphere/ShaderAtmosphere.tsx` | Remove the unused ShaderGradient/WebGL atmosphere. |
| D | `src/app/components/experience/atmosphere/ShaderRenderer.tsx` | Remove the unused ShaderGradient/WebGL atmosphere. |
| D | `src/app/components/experience/atmosphere/atmosphere.css` | Remove the unused ShaderGradient/WebGL atmosphere. |
| D | `src/app/components/experience/atmosphere/shader-presets.ts` | Remove the unused ShaderGradient/WebGL atmosphere. |
| D | `src/app/components/experience/atmosphere/shader-state.ts` | Remove the unused ShaderGradient/WebGL atmosphere. |
| D | `src/app/components/experience/director/ScrollProvider.tsx` | Remove shared scroll interception and its retired scene state/tests. |
| D | `src/app/components/experience/director/clock.ts` | Remove shared scroll interception and its retired scene state/tests. |
| D | `src/app/components/experience/director/experience-director.ts` | Remove shared scroll interception and its retired scene state/tests. |
| D | `src/app/components/experience/director/narrative.test.ts` | Remove shared scroll interception and its retired scene state/tests. |
| D | `src/app/components/experience/director/narrative.ts` | Remove shared scroll interception and its retired scene state/tests. |
| D | `src/app/components/experience/editorial-reader.css` | Remove the unused visual component or legacy stylesheet. |
| D | `src/app/components/experience/experience.css` | Remove the unused visual component or legacy stylesheet. |
| M | `src/app/components/experience/palette.css` | Regenerate shared variables from the palette JSON. |
| A | `src/app/components/experience/portfolio.css` | Style the new gallery, reading pages, evidence and responsive warm visual system. |
| M | `src/app/components/experience/refinement.css` | Remove dead scene and book selectors while preserving shared career/contact styles. |
| D | `src/app/components/experience/world/WorldExperience.tsx` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/camera.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/copy.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/environment.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/exhibits.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/geometry.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/interaction.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/materials.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/optimize.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/runtime.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/state.test.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/state.ts` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| D | `src/app/components/experience/world/world.css` | Remove the Three.js archive runtime, camera, geometry, interaction and related tests. |
| M | `src/app/components/optimizer/AllocationChart.tsx` | Apply localized instrument copy and readable controls within the single reader; numerical engine unchanged. |
| M | `src/app/components/optimizer/ComparisonTable.tsx` | Apply localized instrument copy and readable controls within the single reader; numerical engine unchanged. |
| M | `src/app/components/optimizer/ControlPanel.tsx` | Apply localized instrument copy and readable controls within the single reader; numerical engine unchanged. |
| M | `src/app/components/optimizer/FanChart.tsx` | Apply localized instrument copy and readable controls within the single reader; numerical engine unchanged. |
| M | `src/app/components/optimizer/PortfolioOptimizer.tsx` | Apply localized instrument copy and readable controls within the single reader; numerical engine unchanged. |
| M | `src/app/components/optimizer/RiskHud.tsx` | Apply localized instrument copy and readable controls within the single reader; numerical engine unchanged. |
| A | `src/app/components/optimizer/copy.ts` | Translate instrument controls, assumptions, labels and explanatory text into Turkish and Italian. |
| M | `src/app/components/optimizer/format.ts` | Format retained optimizer helpers consistently; calculations remain unchanged. |
| A | `src/app/components/optimizer/locale.ts` | Small locale context, independent of the deferred translation dictionary. |
| M | `src/app/components/optimizer/optimizer.css` | Apply localized instrument copy and readable controls within the single reader; numerical engine unchanged. |
| M | `src/app/components/optimizer/primitives.tsx` | Format retained optimizer helpers consistently; calculations remain unchanged. |
| D | `src/app/components/shelf/Catalogue.tsx` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/Shelf.tsx` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/ShelfLauncher.tsx` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/catalogue.css` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/engine.js` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/shelf-overrides.css` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/shelf-palette.css` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/shelf-runtime.ts` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/shelf-ui.ts` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/shelf.css` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/shelf/volumes.ts` | Remove the literal shelf renderer, associated presentation code or textures; content moved to lib/content. |
| D | `src/app/components/sketchbook/OptimizerLeaf.tsx` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/sketchbook/Sketchbook.tsx` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/sketchbook/VolumeReader.tsx` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/sketchbook/article.css` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/sketchbook/engine.js` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/sketchbook/sketchbook-overrides.css` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/sketchbook/sketchbook-ui.ts` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/sketchbook/sketchbook.css` | Remove page-turn presentation; prose and optimizer now render through the single content reader. Retained fonts moved to public/fonts. |
| D | `src/app/components/ui/GrainOverlay.tsx` | Remove the unused visual component or legacy stylesheet. |
| M | `src/app/globals.css` | Retire Newsreader and unused grain roles; retain shared accessible base styles. |
| M | `src/app/sections/Footer.tsx` | Keep shared localized footer within the new palette and taxonomy. |
| M | `src/lib/analytics.ts` | Remove the obsolete page-turn event; retain the disabled privacy-conscious adapter. |
| A | `src/lib/content/editorial-ui.ts` | Retain localized canonical editorial labels used by long-form content. |
| M | `src/lib/content/library-ui.ts` | Remove unused shelf, book-view and sculpture UI labels; retain canonical proposition and contact copy. |
| A | `src/lib/content/portfolio-ui.ts` | Add aligned EN/TR/IT labels, evidence states, gallery controls and orientation copy. |
| A | `src/lib/content/portfolio.test.ts` | Verify canonical-block preservation, accurate classification and optimizer translation coverage. |
| M | `src/lib/content/volume-pages.ts` | Redirect content imports to the presentation-independent taxonomy; preserve every original block. |
| A | `src/lib/content/volumes.ts` | Move localized work metadata out of the retired shelf renderer. |
| M | `src/lib/palette.json` | Define the warm surfaces, readable ink and restrained technical accent colors. |
| M | `src/lib/seo.ts` | Choose a localized, route-specific Open Graph image. |
| D | `vendor/threeui/meng-to-sketchbook.html` | Remove the unused ThreeUI source snapshot; historical provenance stays in docs. |

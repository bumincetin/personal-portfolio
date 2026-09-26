# Evolution baseline — 26 September 2026

## Architecture

- Next.js 15.5.23 App Router, React 19.3.0, TypeScript, npm/package-lock.json. Static generation for all 33 localized content routes; contact API is dynamic. Cloudflare deployment uses OpenNext.
- Routes: `/{en,tr,it}`, `/front-matter`, `/chapters`, `/contact`, and seven `/volumes/[slug]` routes. Existing redirects preserve former service/project URLs.
- Localized canonical content: `lib/content/{services,case-studies,evidence,volume-pages,ui,library-ui}.ts`, `lib/story.ts`, `lib/experience-copy.ts`. Shelf metadata currently mixes content with geometry in `components/shelf/volumes.ts`.
- Tailwind utilities plus component CSS. Palette JSON generates `experience/palette.css`; globals/system/refinement supply compatibility roles, spacing and typography. Main spacing is 8/16/24/40/64/100px with fluid page gutters. Layout breakpoints include 700, 1000 and 1100px; the enhanced career timeline additionally requires 850px height.
- Inter UI/body, Instrument Serif accents, residual Newsreader and JetBrains Mono. Font assets are local/self-hosted.
- Motion drives the career timeline and optimizer interactions. Lenis and a shared experience director coordinate scrolling and WebGL. Three.js powers the archive, optional shelf and optional contact sculpture. ShaderGradient adds a separate atmosphere renderer.
- Primary opening: `experience/world`; optional ThreeUI shelf: `components/shelf`; page-turn system: `components/sketchbook/engine.js`; HTML reading layer: `VolumeReader.tsx`. The full prose is server rendered and moved/cloned by optional book mode.
- Metadata/canonical/hreflang are centralized in `lib/seo.ts`; sitemap and robots live in `app/`. Canonical and EN/TR/IT/x-default alternates are already coherent. Existing OG artwork defaults to a portrait rather than a project system.

## Baseline evidence

Screenshots and browser data: `artifacts/evolution/before/`. Captured homepage desktop/mobile, Front Matter, Chapters, service Volume and research Volume from the local production build. `content.json` freezes every original typed content block in all three locales; `source-hashes.json` records core source hashes.

All six baseline states have one H1, no duplicate IDs, no horizontal overflow, no page errors and no detected WCAG A/AA axe violations. Initial observed JS resource bodies: about 307KB homepage, 408KB reading pages and 451KB Chapters. These are browser resource samples, not compressed build sizes or field performance. Baseline Lighthouse is recorded separately where executable.

The semantic issue is repeated discovery content across world markers/index, the static catalogue, bindings and optional shelf. Book mode adds presentation copies. No duplicate-ID defect was observed in the default article mode. The redesign will use one accessible gallery list and one reading tree rather than deleting fallback content.

Mobile retains readable content, but the opening depends on a camera/inspection system and a long pinned scroll span. Literal book controls, tiny scene metadata and hidden enhancement bundles add complexity without explaining the offer. The recent scroll fix remains the starting baseline; the replacement will use native page scrolling.

## Reference and licensing

Inspected the live [portfolio](https://bumincetin.com/en) and [Unicorn inspiration gallery](https://www.unicorn.studio/inspiration), including its rolling-image preview. Useful principles: continuous visual travel, a readable focal region and concise project surfaces. No reference code, art or assets were copied. The new composition uses original technical diagrams and the existing work taxonomy.

The checkout documents a licensed ThreeUI shelf port and contains its historical source attribution/hash; the original shelf generator is absent. Retiring the port also retires its textures and page-turn code. Preserve historical provenance in documentation. Bklit/Kokonut MIT notices remain because the optimizer still uses their components. Retain font licensing documentation for retained fonts.

## Commands and security baseline

`npm run dev` (isolated `.next-dev`), `build:next`, `build` (Cloudflare), `lint`, `typecheck`, `test`, `test:i18n`, `test:contrast`, and Playwright scripts. `npm run verify` passed before this redesign (35 tests, 40 generated pages); one existing OpenNext export lint warning and outdated Browserslist data warning. No configured formatter. Tests for removed book interactions must be retired and replaced with gallery/content regressions.

Contact builds user-reviewed external message drafts; it does not automatically send them. Public contact details are intentional business information. Existing source data, disclaimers and research values must remain intact. Dependency audit, headers, raw HTML uses and analytics are checked during final verification.

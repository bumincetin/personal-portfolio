# Library usability and performance audit

Local work dated 22 September 2026 (Europe/Istanbul). Baseline commit:
`225f0ed6fab9d9384209caac904043f1ab0208b1`. The checkout was clean before the
audit. No applicable AGENTS.md was present. No production deployment, DNS,
credentials, services, analytics provider, or messaging destination was changed.
The deployed commit has not been established; local measurements do not describe
the live deployment.

## Baseline and reproducibility

Node 24.19.0, Next 15.5.23, React 18.2, Three 0.165.0, existing Motion and
Cloudflare/OpenNext stack retained. `npm run verify` passed all 28 unit tests,
localization and 20 token contrast checks before interface edits. Baseline lint
reported three warnings: two in ignored local artifacts and the existing
OpenNext default export warning.

`scripts/capture-library.mjs` captured all 11 English route destinations (home,
approach, CV, contact and seven volumes) at 1440×900, 768×1024, and 390×844 before
interface changes. Installed Chrome 153.0.8010.48; unthrottled localhost and CPU.
The JSON records every route, viewport, heading font, resource request, error and
failure. No horizontal overflow or runtime/request failure occurred in these
33 baseline captures. These are viewport screenshots, not fabricated mockups.

Artifacts are deliberately git-ignored under `artifacts/design/library-audit`.
`before/audit.json` and `before/*.png` preserve the baseline. Final evidence and
test outcomes are recorded below after verification.

## Confirmed defects

`node scripts/reproduce-library-baseline.mjs http://localhost:3114` reproduced:

- The detail dialog cycled through close, open-book and reset, skipping its
  primary full-page link on all 12 Tab presses.
- Holding the font-loading promise, navigating to Chapters, then resolving it
  created a WebGL context on a detached canvas. This is a confirmed lifecycle
  defect, not merely a source-based suspicion.

The adapted shelf queries its own root, traps focus from visible enabled
descendants, excludes inert content, and scopes input to the entered experience.
Explicit cancellation is checked after font/image awaits. Cleanup is idempotent,
removes listeners, cancels animation and releases the renderer after failures,
context loss, exit and navigation. Runtime announcements and printed sample-page
labels are localized. Decorative rendering has an 1800 ms settling window,
with motion pause and hidden-tab suspension retained.

## Content, presentation and transfer

The HTML catalogue uses the same seven `getShelfBooks` records as the optional
shelf. It distinguishes four services, two research projects and the synthetic
optimizer; every entry exposes its problem, output, and direct link. All routes,
canonical metadata, verified profile facts, evidence records and qualifications
remain. The service scope heading now describes what is offered. Research
delivery headings retain their existing factual status.

Article sections group adjacent existing leaves. Book mode moves those original
leaves and restores them to their section on disposal. Decorative copies remove
IDs and exclude the optimizer subtree; the single instrument keeps its state.
Print switches to the complete article. Presentation preference stays in module
memory; contact drafts remain solely in page state.

The shelf import occurs only after entry. The optimizer and contact sculpture
have independent activation. Navigation receives only the active locale's
directory and labels from the server. Removing the full-volume introductory
riffle avoids repeated decorative DOM construction. No geometry, cover texture
resolution, pixel-ratio cap or shadow quality was indiscriminately reduced.

The original orphan scanner reports all source modules reachable. Installed
dependencies are not evidence of network payload. Visx is used by the optional
optimizer and remains; no savings are attributed to merely installed packages.

`@google/genai` and `xlsx` had no source imports and were removed, taking 32 lockfile
package entries with them. No retained package version changed. This is dependency
maintenance, not a claim that either library was previously sent to browsers.
The maintained shelf stylesheet consolidates repeated selectors instead of
layering another set of competing overrides. Canvas typography resolves the
actual self-hosted font families, including Next's hashed Inter name.

Blocked-texture testing also found a frame scheduled by the new pause control
before scene initialization completed. An explicit readiness guard fixes it;
failed cover/wood requests retain the authored procedural fallback without
uncaught errors. Released book turns retain their curved spring with a 1400 ms
settling deadline, so busy rendering cannot prolong a turn indefinitely.

## Vendor integrity

The canonical shelf HTML and its original extraction generator are absent from
this checkout. To make changes reproducible without inventing provenance,
`scripts/sources/shelf-engine.baseline.txt` freezes the committed **repository
port** at 225f0ed, SHA-256
`a5dc225054ebfb7516053bf43cf924f816249bfa0c2f91ba16cc46284e1f0168`.
`scripts/shelf-adapter.mjs` holds asserted transformations;
`node scripts/port-shelf-engine.mjs` generates the engine and `--check` verifies
it. That hash is not represented as the canonical vendor HTML hash.

The original canonical shelf attribution/hash remains:
`606f200fed8602c243f40a11c8c364f0e625c57f80e7c97dc76419da207f198e`.
Its textures and generated base CSS are untouched. Changes to its styles live
in the maintained override.

The sketchbook DOM engine is a maintained adapter, not the generated CSS.
`scripts/port-sketchbook-css.mjs` still checks the original vendor HTML against
`e0330548b1ac905cf1b81698163ffa29f8a3a8c39b8d39f9b71ba5b9255b6dd1`.
The Windows checkout had converted that file to CRLF, causing the pre-existing
integrity check to fail. Its exact committed LF bytes were restored and a
`.gitattributes` rule now prevents conversion. The expected hash was not changed
or weakened. Existing ThreeUI, Bklit, Kokonut and font notices remain intact.

## Performance protocol

Lighthouse 13.5.0 is a separately installed, pinned audit tool. It is not an app
dependency. Three successful baseline mobile runs used standalone headless
Playwright Chromium 153.0.8010.12, fresh browser profiles, production Next server,
412×823 CSS pixels, DPR 1.75, simulated 150 ms RTT / 1638.4 Kbps throughput and
4× CPU slowdown. `maxWaitForFcp` and `maxWaitForLoad` were 90000 ms. No URLs were
blocked and graphics were enabled. Exact settings are in each report.

Initial installed-Chrome/Playwright-managed-browser attempts failed with NO_FCP,
protocol timeout or a Windows temporary-profile cleanup permission error.
Standalone Chromium produced valid reports; one interrupted third run was
retried with identical settings, retaining completed runs. Failed attempts are
not counted as scores. `scripts/measure-library.mjs` supports resuming only valid
completed reports with `RESUME_AUDIT=1`.

The same protocol produced three final runs on the working-tree implementation.
The following values are independent medians, not a selected best run:

| Mobile navigation metric | Baseline | Final | Change |
| --- | ---: | ---: | --- |
| LCP | 11,683.7 ms | 3,699.0 ms | 68.3% lower |
| TBT | 18,643.4 ms | 152.0 ms | 99.2% lower |
| CLS | 0 | 0 | Unchanged |
| Transferred bytes (`total-byte-weight`) | 1,344,778 | 465,918 | 65.4% lower |
| Performance score | 30 | 83 | +53 points |

| Revision / run | LCP, ms | TBT, ms | CLS | Bytes | Score |
| --- | ---: | ---: | ---: | ---: | ---: |
| Baseline 1 | 11,683.7 | 17,653.5 | 0 | 1,344,778 | 30 |
| Baseline 2 | 11,186.3 | 18,643.4 | 0 | 1,323,706 | 31 |
| Baseline 3 | 12,271.5 | 19,688.5 | 0 | 1,344,778 | 30 |
| Final 1 | 3,699.0 | 161.0 | 0 | 465,919 | 83 |
| Final 2 | 3,686.6 | 152.0 | 0 | 465,918 | 83 |
| Final 3 | 3,838.8 | 60.5 | 0 | 465,918 | 83 |

The [comparison JSON](../artifacts/design/library-audit/performance-comparison.json)
contains the measurements and settings. Raw reports are in `lighthouse-before`
and `lighthouse-final`. An intermediate three-run implementation set remains in
`lighthouse-after`: its median LCP was 3840.2 ms, TBT 66.9 ms, CLS 0.0422 and bytes
497,353. The final font adjustment removed an unnecessary 31,640-byte font and
preloaded the main display face; final runs replaced that intermediate revision
for the comparison, including the higher final median TBT.

Resource-summary medians show 32 to 19 requests; script transfers 454,400 to
134,163 bytes (17 to 9 requests); images 535,807 to 1,382 bytes (3 to 1 request);
stylesheets 22,339 to 12,783 bytes. Final fonts total 281,759 bytes across four
requests, equal to the baseline. The HTML document grows from 8,001 to 14,630
bytes because the useful catalogue is delivered in HTML. Resource-summary
totals differ from Lighthouse's total-byte-weight audit and are kept separate.
No graphics engine, shelf textures or WebGL context appear before activation
in the dedicated network regressions, including the contact and optimizer pages.

CPU diagnostics also improve: median raw trace main-thread work is 238,198.9
to 1,283.1 ms, with script evaluation 232,379.4 to 397.5 ms. The baseline's active
WebGL loop and software/browser rendering made trace collection especially
expensive; these raw trace durations are not ordinary user wait times or a
general hardware speedup. Lighthouse's simulated long-task diagnostics contain
36/25/40 tasks before and 8/3/4 after (the visible audit table caps at 20 rows).
Use the headline TBT for the comparable navigation blocking result. Separate
interaction tests verify idle/hidden/exited scenes stop drawing and that reader,
optimizer and contact controls work; they do not measure real-user INP.

The final lab LCP remains above 2.5 seconds. Display/prose fonts account for much
of the remaining transfer, and the final LCP element is the principal service
heading. Production edge latency, physical-device graphics behavior and field
interaction latency still need measurement. The optional immersive experience
retains its graphics cost when deliberately entered.

Real-user 75th-percentile mobile/desktop LCP, INP and CLS are **unmeasured**. Targets
are LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. Navigation Lighthouse TBT is not INP. Local
machine, software/browser rendering and localhost hosting limit generalization.
No conversion or accessibility-certification claim is made.

## Verification and implementation map

The broad browser suites were run against the implemented production build.
The baseline verification was `verify`, the screenshot/network sweep and the
two focused defect reproductions; a full baseline run of every browser suite
was not established. Initial implementation failures (focus restoration,
pre-initialization rendering and cover contrast) were corrected and rerun.
Touch tests now space events across frames and bring the scrolling book into
view before targeting its geometry. The high-level CDP pinch command did not
zoom either the site or a blank control; two-point touch dispatch did, and the
regression now uses that actual gesture.

| Command | Verified outcome |
| --- | --- |
| `npm run verify` | Lint, types, three locales, 20 contrast pairs, 28 unit tests, production build |
| `npm run test:generated` | Frozen port hash and generated engine parity |
| `node scripts/port-sketchbook-css.mjs` | Original vendor hash verified; 730 CSS lines reproduced |
| `npm run build` | Cloudflare/OpenNext worker bundle generated locally; no deployment |
| `npm run test:smoke -- <url>` | 48/48 checks |
| `npm run test:mobile -- <url>` | 1,000 leaf layouts, touch scrolling, charts, controls and reading zoom |
| `npm run test:experience -- <url>` | Nine locale/viewport journeys, 27 axe scans, sculpture pause, print and no-JS |
| `npm run test:motion -- <url>` | Full/reduced motion, mouse/touch gestures, cancellation and optimizer state |
| `npm run test:a11y -- <url>` | 64 axe scans on 19 routes at three sizes; zero reported violations |
| `npm run test:canvas -- <url>` | Ten overlays, seven volumes, five frames each at 1440px and 390px; worst normal-text ratio 7.32:1 |
| `npm run test:links -- <url>` | 48 internal paths, assets on 33 routes and 33 sitemap entries resolve |
| `npm run test:redirects -- <url>` | 46 historical redirects |
| `npm run test:chapter-pages -- <url>` | Three locales, touch, desktop/tablet gallery, reduced motion and no-JS |
| `npm run test:volume-turns -- <url>` | Curved forward/backward/canceled turns, 18 strips, live content, desktop and reduced motion |
| `npm run test:library -- <url>` | 23 regression groups, including 320px reflow, 200% text, two-finger pinch and WebKit 26.6 |
| `npm run test:library-failures -- <url>` | Three-locale failed chunks, failed textures, draft retention, manual-copy fallback, long URLs and no POST/storage |
| `node scripts/find-orphans.mjs` | All 71 source modules reachable |

Installed Chrome for browser checks was 153.0.8010.48. These checks use browser
emulation, not physical phones or screen readers. No usability study, field
vitals or native-speaker review is claimed. Twelve external destinations were
listed by the link checker without opening messaging destinations or treating
third-party availability as a local build result.

One existing lint warning remains in `open-next.config.ts` (anonymous default
export). Node's module-type warning, old Browserslist data and OpenNext's Windows
support warning were recorded without upgrading the stack. An initial OpenNext
attempt with a custom `NEXT_DIST_DIR` failed because its bundler sought `.next`;
the normal `npm run build` path succeeded. Use custom directories for isolated
Next test servers, and the default `.next` for this OpenNext configuration.

Main implementation locations:

- `src/app/components/shelf/Catalogue.tsx`, `ShelfLauncher.tsx` and `catalogue.css`:
  readable catalogue, restrained cover motifs and explicit immersive entry.
- `scripts/shelf-adapter.mjs` and `port-shelf-engine.mjs`: reproducible lifecycle,
  keyboard, runtime-language and scheduling fixes; maintained shelf overrides.
- `src/app/components/sketchbook/{Sketchbook,VolumeReader,OptimizerLeaf}.tsx`,
  `engine.js` and `article.css`: shared reading modes, print and one live instrument.
- `src/app/[locale]/contact/`: simple composer, optional guide/sculpture and
  accurate local draft handoff.
- `src/lib/content/library-ui.ts`, shelf runtime copy, shared navbar/footer,
  layout and globals: three-locale labels, typography and loading priorities.
- `README.md`, implementation/launch/content-verification/usability/reader/contact
  docs: stale route, non-scrolling, guided-only, font and delivery descriptions corrected.

The complete file list is `artifacts/design/library-audit/changed-files.txt`.
Logs, measurements, screenshots and regression JSON remain alongside it.

The final font-only adjustment removes the footer's otherwise unnecessary
JetBrains Mono download by using the existing Inter interface face, and adds
one early preload for the existing Instrument Serif display font. The broad
browser suites above ran before this adjustment; the final production build,
18 additional font/footer axe and reflow checks across three locales and two
widths, all 33 screenshots, and the Cloudflare build passed afterward.

## Screenshots and reproduction

The final screenshots are from the uncommitted implementation based on the
baseline commit, Next build `Z_Tl8aqpz-EfPTzWi90Hb`. Both sets cover all seven
volumes plus home, approach, CV and contact, at the same three viewport sizes
and six-second settling interval. All 33 final captures have zero recorded
overflow, console errors or failed requests. The optional shelf/book captures
show that both crafted experiences remain available.

| View | Before | After |
| --- | --- | --- |
| Home, desktop | [Before](../artifacts/design/library-audit/before/en-1440.png) | [After](../artifacts/design/library-audit/after/en-1440.png) |
| Home, mobile | [Before](../artifacts/design/library-audit/before/en-390.png) | [After](../artifacts/design/library-audit/after/en-390.png) |
| Article, mobile | [Before](../artifacts/design/library-audit/before/en-volumes-document-intelligence-390.png) | [After](../artifacts/design/library-audit/after/en-volumes-document-intelligence-390.png) |
| Contact, mobile | [Before](../artifacts/design/library-audit/before/en-contact-390.png) | [After](../artifacts/design/library-audit/after/en-contact-390.png) |
| Optional experiences | | [Shelf](../artifacts/design/library-audit/after/optional-shelf-1440.png), [book](../artifacts/design/library-audit/after/optional-book-1440.png) |

All route/viewport filenames and computed heading typography are recorded in
the [before manifest](../artifacts/design/library-audit/before/audit.json) and
[after manifest](../artifacts/design/library-audit/after/audit.json). These local,
git-ignored artifacts must be copied separately when sharing the audit.

Reproduce from the repository root in PowerShell (use `npm` on other shells):

```powershell
npm.cmd run verify
npm.cmd run test:generated
node scripts/port-sketchbook-css.mjs
npm.cmd run start -- --port 3119
```

In another terminal, run each browser command in the verification table with
`http://localhost:3119` in place of `<url>`. For the captures and final adapter
build:

```powershell
node scripts/capture-library.mjs http://localhost:3119 artifacts/design/library-audit/recheck
npm.cmd run build
```

Install the audit tool separately with `npm.cmd exec --yes --package=lighthouse@13.5.0 -- lighthouse --version`.
Pass the resulting npm-cache package's absolute `lighthouse/core/index.js` path
as the third argument below. The exact path on this machine was
`C:/Users/bumin/AppData/Local/npm-cache/_npx/1722e863ebfd623b/node_modules/lighthouse/core/index.js`.
The script uses Playwright's installed Chromium executable and debugging port
9337; leave that port free. Do not run other browser tests or builds concurrently
with measurement.

```powershell
node scripts/measure-library.mjs http://localhost:3119 artifacts/design/library-audit/recheck-lighthouse '<absolute lighthouse/core/index.js path>'
```

For a fresh baseline, use a separate checkout of the recorded commit with
`npm.cmd ci`, `npm.cmd run verify`, and a production server on another port;
invoke the current capture and measurement scripts against that server. The
original baseline server used port 3114. No deployment is part of this protocol.

## Owner review

The existing factual questions in `content-verification.md` remain open: current
roles/affiliations and engagement dates, evidence/client publication permissions,
professional cross-border partners, contact details, ThreeUI commercial-use
license confirmation, and native Turkish/Italian review. No new domain email,
booking service, testimonial, affiliation or outcome was invented. Physical
phones, assistive technologies and native-speaker review must be distinguished
from browser emulation and automated axe checks.

# Volume reader

The shared reader in `src/app/components/sketchbook` renders Volumes and Front
Matter as live, selectable HTML. Desktop spreads use two pages; screens up to
900px show one page at a time.

Both modes turn a curved sheet built from 18 nested strips. On mobile the strip
chain spans the whole page and hinges at its left edge. Forward turns expose the
next page below a blank paper reverse; backward turns unfold the preceding page.
Dragging scrubs the curve and its lighting. Buttons and arrow keys use the same
animation. Reduced motion navigates immediately without building the curve.

Paper grain, gutter lighting, a cover and layered page edges also appear on the
resting book. Styling stays in `sketchbook-overrides.css`; the imported base
stylesheet remains unchanged. Decorative strip copies are inert and hidden from
assistive technology, and are removed when the page lands. Live leaves preserve
React controls and their reading scroll positions. Vertical scrolling, charts,
tables, links and optimizer controls keep their native input behavior.

Verification:

- `npm run test:volume-turns -- <url>` checks mobile and tablet touch curves,
  reverse faces, forward/backward turns, cancelled drags, buttons, desktop
  spreads, reduced motion and accessibility.
- `npm run test:mobile -- <url>` checks every reader leaf in all locales, native
  scrolling, chart/table gestures, optimizer inputs and mobile text zoom.
- `npm run verify` runs lint, type checking, localization, contrast, unit tests
  and the production build.

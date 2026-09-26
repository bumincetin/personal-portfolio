> Historical review of the original scroll director. The 3D room has since returned with native page scrolling and camera changes only after an exhibit selection. See [the current restoration report](world-restoration.md). The wheel multipliers and pinned scroll stops below no longer apply.

# Scroll and interaction review

## Changes

- The opening archive gives each project 96% of a viewport of scroll travel. At 1440 × 900, consecutive project stops are 864px apart (previously about 168px). Introduction and exit each use 64% of a viewport.
- Mouse wheel input travels 20% less, with a softer response. Touch scrolling remains native. Reduced motion retains its compact opening and immediate navigation.
- Project selection and same-page links share an eased, distance-aware scroll animation lasting 1.2–2.4 seconds.
- Wheel, touch and keyboard input cancel an active navigation destination. Wheel cancellation runs before the next wheel delta is processed, so reversing direction does not continue toward a distant project.
- Career cards scale with shorter desktop viewport heights so longer chapter descriptions fit within the pinned section.

## Verification

`npm run test:scroll -- http://localhost:3112` exercises real browser wheel and touch input, project spacing, independent panel scrolling, interruption, anchor placement/focus, reduced motion and horizontal overflow. It saves desktop and mobile captures in `artifacts/scroll-review/`.

The scroll regression passed at 1440 × 900 and 393 × 852. A 120px wheel input moved the page approximately 96px and kept the current project selected. Project spacing on mobile measured 818px.

`npm run verify` passed: lint (one existing configuration warning), TypeScript, all three locales, 20 contrast pairs, 35 unit tests and the production build (40 generated pages).

The interaction review passed menu focus containment, keyboard selection, history navigation, book/article switching, optimizer activation, contact draft validation and state preservation, optional library controls, WebGL failure, no-JavaScript content and orientation changes. No messages were sent.

Against the production build, the link check passed all 48 internal paths, 33 rendered routes and 33 sitemap entries, with no failed asset requests. External destinations were not checked.

The broader layout review passed all seven project panels, the article pages, approach, career, contact and menu at desktop, tablet and mobile widths (1440, 768 and 393px), with no automated accessibility violations, runtime errors or horizontal overflow in the checked states.

The career regression passed English, Turkish and Italian touch/keyboard navigation, the 1100 × 850 pinned layout, desktop wheel progression, tablet dragging and the no-JavaScript view. The production build passed again after the career layout adjustment.

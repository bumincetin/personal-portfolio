/**
 * The sketchbook.
 *
 * Ported from ThreeUI's `MengToSketchbookLandingPage`, canonical source
 * `public/landing-pages/meng-to-sketchbook.html`, SHA-256
 * e0330548b1ac905cf1b81698163ffa29f8a3a8c39b8d39f9b71ba5b9255b6dd1, verified on
 * download before any of this was written.
 *
 * The authored geometry, physics and constants are the source's, unchanged: the
 * chain of N nested strips whose tangent sweeps an arc so paper bends instead of
 * pivoting like a door; the spring and the tween; the drag threshold and the
 * fling velocity; the tilt limits; the loupe with its magnified copy, its
 * fade-off-the-sheet and its shove; the riffle intro. Where a number appears
 * below it is the number from the source.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE ONE STRUCTURAL DEPARTURE, AND WHY IT IS NOT OPTIONAL
 * ────────────────────────────────────────────────────────────────────────────
 *
 * In the source every spread is a transparent PNG of an open sketchbook. The
 * resting page is an `<img>`; the two halves are that same image at 200% width,
 * offset; and each of the 36 strip faces is the image again as a
 * `background-image` with a computed `background-position-x`. Slicing a picture
 * across a curved surface is exactly what `background-position` is for, and for
 * drawings it is the right answer.
 *
 * This book's pages are not drawings. They are a consulting practice's
 * argument — prose, figures, evidence records with sources and limitations — in
 * three languages. Rasterising them to ship this component unchanged would
 * destroy, in order: text selection, Ctrl+F, browser translation, screen-reader
 * access, and every WCAG contrast guarantee the rest of this site is measured
 * against. It would trade the content for the container.
 *
 * So the picture is replaced by live DOM, and nothing else is. Each face is a
 * clipping window (`overflow: hidden`) holding a full-width copy of the spread,
 * shifted by the same offset the source passes to `background-position-x`. The
 * arithmetic is the authored arithmetic; only the thing being sliced changed.
 * `.sb-half` works the same way. The loupe needed no change at all — the source
 * already magnifies a *DOM clone* of the book rather than a bitmap, which is
 * what made this port possible in the first place.
 *
 * What that costs: during a turn the spread exists 36 times over. They are
 * `aria-hidden` and `inert`, so assistive technology sees one book, and they are
 * discarded the moment the leaf lands. The pages are short by construction —
 * `volume-pages.ts` paginates so a leaf holds one idea — so this is cheap.
 *
 * The other departure is the paper inset. The source's PNG includes the desk
 * around the book, which is why its page edges sit at 5.1%/94.9% horizontally
 * and 21.8%/78.2% vertically. Ours is drawn, not photographed, so the paper is
 * inset by PAPER_X/PAPER_Y instead and every constant derived from those edges —
 * the curl's span, the gutter shading, the loupe's sheet bounds — is computed
 * from them rather than hard-coded. Same formulas, different two numbers.
 */

/* ---------------------------------------------------------------- geometry */

/** Strips in the chain. Enough for a smooth curve. Authored value. */
const N = 18;
/**
 * Strips during the riffle.
 *
 * A strip is cheap when its face is a background image and expensive when it
 * holds a copy of a live spread, so the opening flourish — which turns every
 * spread in the volume in under two seconds — uses a coarser chain. The source
 * blurs the pages during the riffle (`#sb-mblur-1`/`-2`), so the difference
 * between an 18-strip curve and a 6-strip one is not visible; the difference in
 * how many hundred DOM nodes get built is.
 */
const N_RIFFLE = 6;
/** Peak curl of the arc, in radians. Authored value. */
const BETA = 0.6;

/** Paper edges as a fraction of the book box. See the note above. */
const PAPER_X = 0.025;
const PAPER_Y = 0.05;

/** Gutter (0.5) to the outer edge of the sheet. The source's SPAN, derived. */
const SPAN = 1 - PAPER_X - 0.5;

/* Tilt and zoom limits — authored values, deliberately restrained. */
const TILT_X = 4.5;
const TILT_Y = 7;
const ZOOM_MIN = 0.9;
const ZOOM_MAX = 1.5;

/** Magnification through the glass. Authored value. */
const MAG = 2.3;

export function createSketchbook({ root, labels, onFirstTurn }) {
  const $ = (sel) => root.querySelector(sel);

  const wrap = $('#sbWrap');
  const stage = $('#sbStage');
  const sb3d = $('#sb3d');
  const book = $('#sbBook');
  const capBox = $('#sbCaptions');
  const hint = $('#sbHint');
  const source = $('#sbSource');
  const plateList = $('#plateList');
  const live = $('#sbLive');
  if (!wrap || !stage || !sb3d || !book || !source) return () => {};

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- the pages */

  /**
   * The leaves, as the server rendered them.
   *
   * They stay in the document — hidden once scripting is confirmed, but never
   * removed — so the page keeps working with JavaScript off and a crawler still
   * reads every word. The book is built from clones.
   */
  const leaves = Array.from(source.querySelectorAll('.sb-leaf'));
  if (!leaves.length) return () => {};

  /**
   * Leaves grouped into spreads.
   *
   * Two to a spread, as an open book has two pages — except on a phone, where
   * two pages side by side would be two unreadable columns. There the book
   * shows one leaf at a time. It has to be a grouping decision rather than a
   * CSS one: hiding the right-hand page would hide half the volume, which is
   * the kind of thing that looks fine in a screenshot and loses the reader
   * every second page.
   */
  const NARROW = '(max-width: 900px)';
  const perSpread = () => (matchMedia(NARROW).matches ? 1 : 2);

  let SPREADS = [];
  let M = 0;
  function group() {
    const per = perSpread();
    SPREADS = [];
    let i = 0;
    while (i < leaves.length) {
      // A leaf marked `data-solo` takes a spread to itself: the optimizer and
      // the plates are instruments and pictures, not columns of prose, and
      // pairing one with a half-page of text would cramp both. A bound book
      // does the same thing with a full-page plate.
      if (leaves[i].dataset.solo !== undefined) {
        SPREADS.push([leaves[i], null]);
        i += 1;
        continue;
      }
      if (per === 1) {
        SPREADS.push([leaves[i], null]);
        i += 1;
        continue;
      }
      const partner = leaves[i + 1];
      const pair = partner && partner.dataset.solo === undefined ? partner : null;
      SPREADS.push([leaves[i], pair]);
      i += pair ? 2 : 1;
    }
    M = SPREADS.length;
  }
  group();

  const spreadTitle = (i) => SPREADS[i][0]?.dataset.title ?? '';
  const spreadMeta = (i) => {
    const [a, b] = SPREADS[i];
    const first = Number(a?.dataset.folio ?? 0);
    const last = Number((b ?? a)?.dataset.folio ?? first);
    return first === last ? String(first).padStart(2, '0') : `${String(first).padStart(2, '0')}–${String(last).padStart(2, '0')}`;
  };

  let idx = 0;
  let turn = null;
  let strips = [];
  /* Declared up here rather than with the rest of the riffle: `buildCurl` reads
     it, and `buildCurl` can run before that section's `let`s have executed. */
  let introOn = false;

  const el = (t, c) => {
    const e = document.createElement(t);
    if (c) e.className = c;
    return e;
  };

  /**
   * Returns every leaf to the source container, in order.
   *
   * The spread you are actually reading holds the *live* leaves, not copies —
   * see `spreadEl` — so before the book is repainted they have to go home.
   * Re-appending all of them in array order is cheap at this size and makes the
   * restored order a property of the loop rather than of bookkeeping that could
   * drift.
   */
  function reclaim() {
    for (const leaf of leaves) {
      leaf.removeAttribute('tabindex');
      if (leaf.parentElement !== source) source.appendChild(leaf);
    }
  }

  /**
   * One spread, as DOM, at the book's full width.
   *
   * The distinction between a copy and the original is not cosmetic.
   *
   * `decorative` spreads — the 36 strip faces, the two halves, the magnified
   * mirror — exist to be sliced and animated. They are clones, hidden from
   * assistive technology and made inert, so nothing is read twice.
   *
   * The **resting** spread is not a clone. It is the server-rendered leaves
   * themselves, moved into the book. Cloning them looked fine and was wrong:
   * a clone is a dead snapshot, so the optimizer — a React island mounted into
   * its leaf — appeared as an empty box, and every `next/link` in a volume lost
   * its client-side routing and fell back to a full page load. Moving the real
   * nodes keeps React attached to what is on screen, and selection, focus and
   * links behave the way they do anywhere else on the page.
   */
  function spreadEl(i, decorative) {
    const s = el('div', 'sb-spread');
    const paper = el('div', 'sb-paper');
    const single = SPREADS[i][1] === null;
    paper.classList.toggle('single', single);
    const sides = single ? ['left'] : ['left', 'right'];
    for (const side of sides) {
      const page = el('div', `sb-page ${side}`);
      const leaf = SPREADS[i][side === 'left' ? 0 : 1];
      if (leaf) {
        if (decorative) {
          page.appendChild(leaf.cloneNode(true));
        } else {
          /*
           * A leaf that can scroll has to be reachable by keyboard.
           *
           * Pagination means it almost never has to — `volume-pages.ts` sizes
           * the leaves to fit — but "almost never" is not a guarantee at 200%
           * zoom or on the leaf that holds the optimizer, and a scroll container
           * a keyboard cannot enter is a WCAG 2.1.1 failure. The leaf is an
           * `<article>` carrying its own heading, so it names itself.
           */
          leaf.tabIndex = 0;
          page.appendChild(leaf);
        }
      }
      paper.appendChild(page);
    }
    s.appendChild(paper);
    if (decorative) {
      s.setAttribute('aria-hidden', 'true');
      s.inert = true;
    }
    return s;
  }

  /** A full-width sheet inside a clipping window, shifted by `offset` px. */
  function sheet(i, offset) {
    const holder = el('div', 'sb-sheet');
    holder.style.left = offset;
    holder.appendChild(spreadEl(i, true));
    return holder;
  }

  function halfEl(pos, i) {
    const d = el('div', `sb-half ${pos}`);
    d.appendChild(sheet(i, pos === 'left' ? '0px' : 'calc(-1 * var(--bw) / 2)'));
    d.appendChild(el('div', `gutter-shade ${pos}`));
    d.setAttribute('aria-hidden', 'true');
    return d;
  }

  /* ------------------------------------------------------ the turning leaf */

  /**
   * Builds the strip chain once per turn.
   *
   * The offsets are the source's, unchanged — `A` faces the page being turned
   * away from, `B` the one arriving. In the source they are
   * `background-position-x`; here they position a full-width copy of the spread
   * inside the strip's clipping window. Pure geometry either way, so they never
   * need touching again while the leaf is in the air.
   */
  function buildCurl(dir, from, to) {
    strips = [];
    const n = introOn ? N_RIFFLE : N;
    const c = el('div', `curl ${dir}`);
    c.setAttribute('aria-hidden', 'true');
    c.style.setProperty('--n', n);
    c.style.setProperty('--span', SPAN);
    let host = c;

    for (let i = 0; i < n; i += 1) {
      const s = el('div', 'strip');
      s.style.setProperty('--i', i);
      const gut = 'calc(var(--bw) * 0.5)';
      const sw = `calc(var(--bw) * ${SPAN} / ${n})`;
      const A = `calc(-1 * (${gut} + ${i} * ${sw}))`;
      const B = `calc(${i + 1} * ${sw} - ${gut})`;

      const f = el('div', 'face front');
      const b = el('div', 'face back');
      f.appendChild(sheet(from, dir === 'next' ? A : B));
      b.appendChild(sheet(to, dir === 'next' ? B : A));
      for (const face of [f, b]) {
        face.appendChild(el('div', 'sh'));
        face.appendChild(el('div', 'gl'));
      }

      s.appendChild(f);
      s.appendChild(b);
      if (i === n - 1) s.classList.add('edge');
      host.appendChild(s);
      host = s;
      strips.push(s);
    }
    return c;
  }

  /** The authored lighting pass, unchanged — and the slide, which is not. */
  function applyTurn(t) {
    if (singleUp()) {
      // One number drives both sheets: the old one leaves in the direction of
      // travel, the new one comes in behind it.
      const away = turn && turn.dir === 'next' ? -1 : 1;
      sb3d.style.setProperty('--slide', t.toFixed(3));
      sb3d.style.setProperty('--away', String(away));
      sb3d.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3));
      fadeCaption(t);
      return;
    }
    const th = Math.PI * t;
    const beta = BETA * Math.sin(Math.PI * t);
    const D = 180 / Math.PI;
    const tt = th + beta;
    const td = (2 * beta) / (strips.length || N);
    sb3d.style.setProperty('--tt', `${(tt * D).toFixed(2)}deg`);
    sb3d.style.setProperty('--td', `${(td * D).toFixed(3)}deg`);
    sb3d.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3));
    fadeCaption(t);
    for (let i = 0; i < strips.length; i += 1) {
      const l1 = Math.abs(Math.cos(tt - i * td));
      const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
      const st = strips[i].style;
      st.setProperty('--lit', l1.toFixed(3));
      st.setProperty('--a1', ((1 - l1) * 0.62).toFixed(3));
      st.setProperty('--a2', ((1 - l2) * 0.62).toFixed(3));
    }
  }

  /**
   * True while the book is showing one leaf rather than a spread.
   *
   * A phone gets one page, and a curl is a fold down the middle of a *spread* —
   * with one page there is no middle to fold. Rather than show half an empty
   * sheet so the authored geometry still applies, a single-page book turns the
   * way a single sheet does: the leaf leaves, the next one arrives.
   */
  const singleUp = () => perSpread() === 1;

  function paint() {
    // Hand the live leaves back before the book is torn down, or emptying it
    // would take the real content with it.
    reclaim();
    book.textContent = '';
    wrap.classList.toggle('slide', singleUp());
    // A single-page book has no magnifier to mention.
    if (hint) hint.textContent = singleUp() ? labels.hintTurn : labels.hint;
    if (!turn) {
      const f = el('div', 'sb-full');
      f.appendChild(spreadEl(idx, false));
      book.appendChild(f);
      sb3d.style.setProperty('--shade', '0');
    } else if (singleUp()) {
      /*
       * One sheet replacing another. The outgoing leaf is a copy, because the
       * incoming one is the leaf you are about to read and has to be live.
       */
      const out = el('div', 'sb-leaving');
      out.setAttribute('aria-hidden', 'true');
      out.appendChild(spreadEl(turn.from, true));
      const into = el('div', 'sb-arriving');
      into.appendChild(spreadEl(turn.to, false));
      book.append(out, into);
      applyTurn(turn.t);
    } else {
      const next = turn.dir === 'next';
      book.appendChild(halfEl('left', next ? turn.from : turn.to));
      book.appendChild(halfEl('right', next ? turn.to : turn.from));
      book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
      applyTurn(turn.t);
    }

    /*
     * There is no drag overlay here any more, and that is the fix for a real
     * bug rather than a tidy-up.
     *
     * The authored source lays two full-height `.sb-zone` buttons over the book
     * at `z-index: 60` to catch the drag. That is exactly right when the pages
     * are pictures with nothing on them to press. Ours have links — the CTA at
     * the end of every volume, the repository and report links, the optimizer's
     * controls — and the overlay sat on top of all of them, so none of them
     * could be clicked. The drag is handled on the sheet itself now, and it
     * knows what it is standing on.
     */
    layout();
    caption();
    marks();
    syncZoomLayer();
    placeLoupe();
  }

  /* --------------------------------------------------------- the captions */

  let capOut = null;
  let capIn = null;

  function caption() {
    if (!capBox) return;
    capBox.textContent = '';
    capOut = capIn = null;
    if (turn) {
      /*
       * The two captions that cross over while a leaf is in the air.
       *
       * They spend most of the turn part-faded, which is to say below any
       * contrast threshold you could name — correct as motion, indefensible as
       * text. They are hidden from assistive technology for the duration: the
       * settled caption underneath is the real one, and the live region has
       * already announced where the reader landed.
       */
      capOut = el('p', 'sb-caption live');
      capOut.textContent = spreadTitle(turn.from);
      capOut.setAttribute('aria-hidden', 'true');
      capIn = el('p', 'sb-caption live');
      capIn.textContent = spreadTitle(turn.to);
      capIn.setAttribute('aria-hidden', 'true');
      capBox.appendChild(capOut);
      capBox.appendChild(capIn);
      fadeCaption(turn.t);
    } else {
      const p = el('p', 'sb-caption');
      p.textContent = spreadTitle(idx);
      capBox.appendChild(p);
    }
  }

  /**
   * The floor the crossfade is not allowed to go below.
   *
   * A caption at 12% opacity is a frame of a transition to a designer and a
   * 1.1:1 contrast failure to a checker, and both are right. So the ramp is
   * clamped: a caption is either not painted at all, or painted at 72% or more,
   * where `--chrome-soft` still clears 4.5:1 on the ground. The motion reads the
   * same — one title gives way to the next — without ever putting text on screen
   * that cannot be read.
   */
  const CAPTION_FLOOR = 0.72;

  function fadeCaption(t) {
    if (!capOut || !capIn) return;
    const out = 1 - Math.max(0, Math.min(1, (t - 0.1) / 0.28));
    const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.3));
    const set = (node, v) => {
      if (v <= 0.001) {
        node.style.visibility = 'hidden';
        node.style.opacity = '0';
        return;
      }
      node.style.visibility = 'visible';
      node.style.opacity = (CAPTION_FLOOR + (1 - CAPTION_FLOOR) * v).toFixed(3);
    };
    set(capOut, out);
    set(capIn, inn);
  }

  function layout() {
    sb3d.style.setProperty('--bw', `${book.clientWidth}px`);
    sb3d.style.setProperty('--bh', `${book.clientHeight}px`);
  }

  /* ------------------------------------------------------- the spring loop */

  let spring = null;
  let raf = null;
  let last = 0;

  function animateTo(target, onDone, stiff, damp) {
    spring = { kind: 'spring', v: 0, target, done: onDone, k: stiff || 150, c: damp || 22 };
    kick();
  }
  function tweenTo(target, dur, onDone) {
    spring = { kind: 'tween', from: turn ? turn.t : 0, target, dur, e: 0, done: onDone };
    kick();
  }

  function tick(now) {
    raf = null;
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
    last = now;
    if (spring && turn) {
      const s = spring;
      if (s.kind === 'tween') {
        s.e += dt;
        const k = Math.min(1, s.e / s.dur);
        turn.t = s.from + (s.target - s.from) * k;
        applyTurn(turn.t);
        if (k >= 1) {
          spring = null;
          s.done?.();
        }
      } else {
        const x = turn.t - s.target;
        s.v += (-s.k * x - s.c * s.v) * dt;
        turn.t += s.v * dt;
        if (Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
          turn.t = s.target;
          spring = null;
          applyTurn(turn.t);
          s.done?.();
        } else applyTurn(turn.t);
      }
    }
    viewSpring();
    const lmoved = loupeEase();
    if ((spring || viewActive || lmoved) && raf === null) raf = requestAnimationFrame(tick);
  }
  function kick() {
    if (raf === null) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  /* ---------------------------------------------- tilt and zoom of the book */

  const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
  let viewActive = false;
  let lastZ = 1;

  function applyView() {
    sb3d.style.setProperty('--rx', `${view.rx.toFixed(2)}deg`);
    sb3d.style.setProperty('--ry', `${view.ry.toFixed(2)}deg`);
    // On a narrow screen, enlarge the text inside the sheet. Scaling the
    // entire book pushes its edges and controls outside the viewport.
    sb3d.style.setProperty('--zoom', singleUp() ? '1' : view.z.toFixed(3));
    sb3d.style.setProperty('--reading-scale', view.z.toFixed(3));
    if (view.z !== lastZ) {
      lastZ = view.z;
      placeLoupe();
    }
  }
  function viewSpring() {
    const e = 0.14;
    let moved = false;
    for (const [k, t] of [
      ['rx', 'trx'],
      ['ry', 'try_'],
      ['z', 'tz'],
    ]) {
      const d = view[t] - view[k];
      if (Math.abs(d) > 0.0006) {
        view[k] += d * e;
        moved = true;
      } else view[k] = view[t];
    }
    if (moved) applyView();
    viewActive = moved;
    return moved;
  }
  function setView(rx, ry, z) {
    view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
    view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
    view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    viewActive = true;
    kick();
    syncZoom();
  }
  function tiltTo(cx, cy) {
    if (drag) return;
    const r = book.getBoundingClientRect();
    if (!r.width) return;
    const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)));
    const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
    setView(-ny * TILT_X, nx * TILT_Y, view.tz);
  }

  const onPointerMove = (e) => {
    if (e.pointerType === 'touch') return;
    tiltTo(e.clientX, e.clientY);
  };
  const onPointerOut = (e) => {
    if (!e.relatedTarget) setView(0, 0, view.tz);
  };
  const onBlur = () => setView(0, 0, view.tz);
  const onDblClick = () => setView(view.trx, view.try_, 1);

  addEventListener('pointermove', onPointerMove, { passive: true });
  addEventListener('pointerout', onPointerOut);
  addEventListener('blur', onBlur);
  stage.addEventListener('dblclick', onDblClick);

  /* ----------------------------------------------------------- pointer work */

  let drag = null;
  const bookRect = () => book.getBoundingClientRect();
  const hideHint = () => hint?.classList.add('gone');

  /** Anything a visitor can press, type into, or focus. */
  const INTERACTIVE = 'a, button, input, select, textarea, label, summary, [contenteditable], [tabindex]:not([tabindex="-1"])';

  /**
   * A pointer going down on the sheet.
   *
   * Nothing is committed here, and nothing is `preventDefault`ed. That is what
   * lets a link be a link, a double-click select a word and a triple-click
   * select a paragraph — all of which the previous overlay ate. The gesture is
   * only claimed once the pointer has travelled far enough sideways to be a page
   * turn rather than a click or a selection.
   */
  const onDown = (e) => {
    if (e.button !== 0 || introOn) return;
    if (!e.target.closest('#sbBook')) return;
    if (e.target.closest('[data-scroll-region], .reader-demo, .reader-figure')) return;
    // A control on the page keeps the gesture. The leaf itself is focusable so
    // it can be scrolled, which is why `[tabindex="-1"]` is excluded above and
    // the leaf is checked separately rather than through the selector.
    const hit = e.target.closest(INTERACTIVE);
    if (hit && !hit.classList.contains('sb-leaf')) return;
    hideHint();
    const r = bookRect();
    drag = {
      x0: e.clientX,
      y0: e.clientY,
      w: r.width,
      dir: null,
      moved: 0,
      vel: 0,
      pointerId: e.pointerId,
      tPrev: performance.now(),
    };
  };

  const onMove = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x0;
    const dy = e.clientY - drag.y0;
    drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));

    // Not yet a turn: wait for a gesture that is clearly horizontal. A vertical
    // drag belongs to the page, and a small one belongs to the text.
    if (!drag.dir) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        drag = null;
        return;
      }
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      drag.dir = dx < 0 ? 'next' : 'prev';
      drag.x0 = e.clientX;
      // The turn is ours from here, so drop any selection the drag began.
      getSelection()?.removeAllRanges();
      try {
        stage.setPointerCapture(drag.pointerId);
      } catch {
        // The pointer may already be gone; the turn still works without capture.
      }
      startTurn(drag.dir, 0);
    }

    const travelled = e.clientX - drag.x0;
    const raw = (drag.dir === 'next' ? -travelled : travelled) / (drag.w * 0.62);
    const t = Math.max(0, Math.min(1, raw));
    const now = performance.now();
    drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
    drag.tPrev = now;
    if (turn) {
      turn.t = t;
      applyTurn(t);
    }
  };

  const endDrag = (e) => {
    if (!drag) return;
    const d = drag;
    drag = null;
    if (stage.hasPointerCapture(d.pointerId)) stage.releasePointerCapture(d.pointerId);
    if (e?.type === 'pointercancel') {
      if (turn) cancel();
      return;
    }

    // Never became a drag. On a touch screen a tap on the sheet turns the page,
    // the way tapping a page of an e-reader does; with a mouse it does not,
    // because a click there is far more likely to be aimed at the text.
    if (!d.dir) {
      if (d.moved < 6 && e?.pointerType === 'touch' && !getSelection()?.toString()) {
        const r = bookRect();
        step((e.clientX - r.left) / r.width > 0.5 ? 'next' : 'prev');
      }
      return;
    }

    if (!turn) return;
    if (turn.t > 0.42 || d.vel > 1.1) commit();
    else cancel();
  };

  const noDefault = (e) => e.preventDefault();
  stage.addEventListener('pointerdown', onDown);
  stage.addEventListener('pointermove', onMove);
  stage.addEventListener('dragstart', noDefault);
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  /* ---------------------------------------------------------- turn control */

  /** One event per volume, the first time a leaf is actually turned. */
  let reported = false;
  function announce() {
    if (live) live.textContent = `${spreadTitle(idx)} — ${labels.leaf} ${spreadMeta(idx)}`;
    if (!reported && !introOn) {
      reported = true;
      onFirstTurn?.();
    }
  }

  function startTurn(dir, t) {
    spring = null;
    if (turn) {
      idx = turn.to;
      turn = null;
    }
    shoveLoupe(dir);
    const from = idx;
    turn = { dir, from, to: dir === 'next' ? (from + 1) % M : (from - 1 + M) % M, t: t || 0 };
    paint();
  }
  function commit() {
    if (!turn) return;
    if (REDUCED) {
      idx = turn.to;
      turn = null;
      paint();
      announce();
      return;
    }
    animateTo(
      1,
      () => {
        idx = turn.to;
        turn = null;
        paint();
        announce();
      },
      170,
      26,
    );
    kick();
  }
  function cancel() {
    if (!turn) return;
    animateTo(
      0,
      () => {
        turn = null;
        paint();
      },
      150,
      24,
    );
    kick();
  }
  function step(dir) {
    if (introOn) endIntro();
    if (turn) {
      idx = turn.to;
      turn = null;
    }
    startTurn(dir, 0);
    commit();
  }
  function goTo(i) {
    if (introOn) endIntro();
    if (i === idx) return;
    if (turn) {
      idx = turn.to;
      turn = null;
    }
    const fwd = (i - idx + M) % M;
    const back = (idx - i + M) % M;
    if (Math.min(fwd, back) === 1) {
      step(fwd === 1 ? 'next' : 'prev');
      return;
    }
    idx = i;
    paint();
    announce();
  }

  const leftBtn = $('#sbLeft');
  const rightBtn = $('#sbRight');
  if (leftBtn) leftBtn.onclick = () => step('prev');
  if (rightBtn) rightBtn.onclick = () => step('next');

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t?.closest('input, textarea, select, .sb-leaf button, [contenteditable], [data-scroll-region], .reader-demo, .reader-figure')) return;
    const leaf = t?.closest('.sb-leaf');
    if (leaf && leaf.scrollWidth > leaf.clientWidth + 1) return;
    e.preventDefault();
    hideHint();
    step(e.key === 'ArrowRight' ? 'next' : 'prev');
  };
  addEventListener('keydown', onKeyDown);

  /* --------------------------------------------------- the loupe and tools */

  const loupe = $('#loupe');
  const zRead = $('#zRead');
  const loupeBtn = $('#loupeBtn');
  const zInBtn = $('#zIn');
  const zOutBtn = $('#zOut');
  const zoomWrap = $('#zoomWrap');
  const zoomInner = $('#zoomInner');

  let loupeOn = true;
  let lx = null;
  let ly = null;
  let lgrab = null;
  let lTarget = null;

  const loupeSize = () => Math.round(Math.max(165, Math.min(262, book.clientWidth * 0.235)));
  const bookBox = () => ({ x: 0, y: 0, w: book.clientWidth, h: book.clientHeight });

  function restLoupe() {
    const b = bookBox();
    lx = b.x + b.w * 0.88;
    ly = b.y + b.h * 0.855;
    placeLoupe();
  }

  /**
   * Mirrors whatever the book is showing into the magnified copy.
   *
   * This is the source's own mechanism, and it is the reason a text book could
   * be fitted to this design at all: the glass magnifies a DOM clone, so it
   * shows real type at 2.3x rather than an upscaled bitmap.
   */
  function syncZoomLayer() {
    if (!zoomInner) return;
    zoomInner.textContent = '';
    if (singleUp() || matchMedia('(pointer: coarse)').matches) {
      if (zoomWrap) zoomWrap.style.opacity = '0';
      return;
    }

    /*
     * Not while a leaf is in the air.
     *
     * The source could afford to mirror everything, because everything it
     * mirrored was a background image. Here the curl is 36 clipping windows
     * each holding a copy of a spread, so cloning it copies the spread another
     * 36 times — 72 leaves of live DOM built and thrown away per turn, on top
     * of the 72 the curl itself needs. That was enough to make the riffle
     * stutter and, on a slow machine, to strand it mid-turn.
     *
     * Nothing is lost by skipping it: the glass is shoved off the page by the
     * turning leaf anyway, and it fades out as it leaves the sheet.
     */
    if (turn) {
      if (zoomWrap) zoomWrap.style.opacity = '0';
      return;
    }

    for (const c of book.children) {
      if (c.classList.contains('sb-zone')) continue;
      const copy = c.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.inert = true;
      zoomInner.appendChild(copy);
    }
  }

  function placeLoupe() {
    if (lx === null || !loupe || !zoomWrap || !zoomInner) return;
    const B = bookBox();
    const bw = B.w;
    const bh = B.h;
    if (!bw) return;
    const R = loupeSize() / 2;
    const bez = R * 2 * 0.058;
    loupe.style.setProperty('--lr', `${R * 2}px`);
    loupe.style.transform = `translate3d(${(lx - R).toFixed(1)}px,${(ly - R).toFixed(1)}px,0)`;
    if (loupeOn) loupe.classList.add('on');

    // Where the paper's edges land once the book is scaled. The source's
    // formula; the fractions come from PAPER_X/PAPER_Y rather than its PNG.
    const z = view.z;
    const cx = bw / 2;
    const cy = bh / 2;
    const x0 = cx + (bw * PAPER_X - cx) * z;
    const x1 = cx + (bw * (1 - PAPER_X) - cx) * z;
    const y0 = cy + (bh * PAPER_Y - cy) * z;
    const y1 = cy + (bh * (1 - PAPER_Y) - cy) * z;

    const nx = Math.max(x0, Math.min(lx, x1));
    const ny = Math.max(y0, Math.min(ly, y1));
    const inside =
      lx > x0 && lx < x1 && ly > y0 && ly < y1
        ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
        : -Math.hypot(lx - nx, ly - ny);
    const k = Math.max(0, Math.min(1, (inside + R * 0.3) / (R * 0.55)));

    zoomWrap.style.opacity = (loupeOn ? k : 0).toFixed(3);
    if (k <= 0.002) return;
    const r = (R - bez).toFixed(1);
    const mask = `radial-gradient(circle ${r}px at ${lx.toFixed(1)}px ${ly.toFixed(1)}px,#000 calc(100% - 1px),transparent 100%)`;
    zoomWrap.style.webkitMaskImage = mask;
    zoomWrap.style.maskImage = mask;

    const px = cx + (lx - cx) / z;
    const py = cy + (ly - cy) / z;
    const s = MAG * z;
    zoomInner.style.transform = `translate(${(lx - px * s).toFixed(1)}px,${(ly - py * s).toFixed(1)}px) scale(${s.toFixed(4)})`;
  }

  function shoveLoupe(dir) {
    if (!loupeOn || lx === null || lgrab) return;
    const b = bookBox();
    const nx = (b.w / 2 + (lx - b.x - b.w / 2) / view.z) / b.w;
    const ny = (b.h / 2 + (ly - b.y - b.h / 2) / view.z) / b.h;
    if (nx < PAPER_X || nx > 1 - PAPER_X || ny < PAPER_Y || ny > 1 - PAPER_Y) return;
    lTarget = { x: b.x + b.w * (dir === 'next' ? 0.12 : 0.88), y: b.y + b.h * 0.855 };
    kick();
  }
  function loupeEase() {
    if (!lTarget) return false;
    if (lgrab) {
      lTarget = null;
      return false;
    }
    const dx = lTarget.x - lx;
    const dy = lTarget.y - ly;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      lx = lTarget.x;
      ly = lTarget.y;
      lTarget = null;
      placeLoupe();
      return false;
    }
    lx += dx * 0.17;
    ly += dy * 0.17;
    placeLoupe();
    return true;
  }

  const onLoupeDown = (e) => {
    if (!loupeOn || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    lTarget = null;
    lgrab = { cx: e.clientX, cy: e.clientY, lx0: lx, ly0: ly };
    loupe.classList.add('held');
    loupe.setPointerCapture(e.pointerId);
    hideHint();
  };
  const onLoupeMove = (e) => {
    if (!lgrab) return;
    const b = bookBox();
    const R = loupeSize() / 2;
    lx = Math.max(b.x - R * 0.7, Math.min(b.x + b.w + R * 0.7, lgrab.lx0 + (e.clientX - lgrab.cx)));
    ly = Math.max(b.y - R * 0.7, Math.min(b.y + b.h + R * 1.0, lgrab.ly0 + (e.clientY - lgrab.cy)));
    placeLoupe();
  };
  const dropLoupe = () => {
    lgrab = null;
    loupe?.classList.remove('held');
  };

  if (loupe) {
    loupe.addEventListener('pointerdown', onLoupeDown);
    loupe.addEventListener('pointermove', onLoupeMove);
    loupe.addEventListener('pointerup', dropLoupe);
    loupe.addEventListener('pointercancel', dropLoupe);
  }
  if (loupeBtn) {
    loupeBtn.onclick = () => {
      loupeOn = !loupeOn;
      loupeBtn.setAttribute('aria-pressed', String(loupeOn));
      loupe?.classList.toggle('on', loupeOn);
      if (loupeOn && lx === null) restLoupe();
      if (!loupeOn && zoomWrap) zoomWrap.style.opacity = '0';
    };
  }

  function syncZoom() {
    if (!zRead) return;
    zRead.textContent = `${Math.round(view.tz * 100)}%`;
    if (zOutBtn) zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
    if (zInBtn) zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
  }
  if (zInBtn) zInBtn.onclick = () => { setView(view.trx, view.try_, view.tz * 1.16); hideHint(); };
  if (zOutBtn) zOutBtn.onclick = () => { setView(view.trx, view.try_, view.tz / 1.16); hideHint(); };

  /**
   * Re-group when the viewport crosses the one-page/two-page threshold.
   *
   * The leaf currently open has to survive that, or rotating a phone would
   * silently move the reader somewhere else in the volume. The leaf is resolved
   * back to its spread under the new grouping.
   */
  let wasNarrow = matchMedia(NARROW).matches;
  const onResize = () => {
    const narrow = matchMedia(NARROW).matches;
    if (narrow !== wasNarrow) {
      const openLeaf = SPREADS[idx]?.[0];
      wasNarrow = narrow;
      group();
      const at = SPREADS.findIndex((pair) => pair.includes(openLeaf));
      idx = at === -1 ? Math.min(idx, M - 1) : at;
      spring = null;
      turn = null;
      buildIndex();
      paint();
    }
    layout();
    applyView();
    lx = null;
    restLoupe();
  };
  addEventListener('resize', onResize);

  /* --------------------------------------------------------------- the index */

  /**
   * The contents.
   *
   * Every leaf gets a row, not every spread. Titling a spread by its left-hand
   * leaf reads fine on the book itself, where you can see both pages, and badly
   * in a list: a volume whose pages run "Process · 01" and "Process · 02" side
   * by side produced a contents that jumped 01, 03, 05, as though entries were
   * missing. A table of contents that hides half its entries is not one.
   *
   * Clicking a row opens the spread that leaf is on, which on a wide screen may
   * be shared with its neighbour and on a phone is the leaf alone.
   */
  function buildIndex() {
    if (!plateList) return;
    plateList.textContent = '';
    leaves.forEach((leaf, i) => {
      const li = el('li');
      const b = el('button', 'plate');
      b.type = 'button';
      const n = el('span', 'n');
      n.textContent = String(i + 1).padStart(2, '0');
      const t = el('span', 't');
      t.textContent = leaf.dataset.title ?? '';
      const meta = el('span', 'p');
      meta.textContent = `${labels.leaf} ${String(leaf.dataset.folio ?? i + 1).padStart(2, '0')}`;
      b.append(n, t, meta);
      b.onclick = () => {
        const at = SPREADS.findIndex((pair) => pair.includes(leaf));
        if (at !== -1) goTo(at);
        wrap.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
      };
      li.appendChild(b);
      plateList.appendChild(li);
    });
  }
  buildIndex();

  /** Marks every leaf on the open spread, since a spread holds one or two. */
  function marks() {
    if (!plateList) return;
    const open = SPREADS[turn ? turn.to : idx] ?? [];
    plateList.querySelectorAll('.plate').forEach((b, i) => {
      b.setAttribute('aria-current', open.includes(leaves[i]) ? 'true' : 'false');
    });
  }

  /* --------------------------------------------------------------- the riffle */

  let riffle = null;
  let riffleAt = 0;

  function endIntro() {
    introOn = false;
    wrap.classList.remove('intro', 'b2');
  }
  function riffleStep() {
    const s = riffle[riffleAt];
    wrap.classList.toggle('b2', s.bell > 0.55);
    startTurn('next', 0);
    tweenTo(1, s.dur, () => {
      idx = turn.to;
      turn = null;
      riffleAt += 1;
      if (introOn && riffleAt < riffle.length) {
        paint();
        riffleStep();
      } else {
        endIntro();
        paint();
        announce();
      }
    });
  }
  function startIntro() {
    const coarse = singleUp() || matchMedia('(pointer: coarse)').matches;
    if (coarse || REDUCED || M < 3) {
      paint();
      return;
    }
    // A full riffle, returning to the first spread: the book flips itself open
    // and settles where it started.
    const steps = M;
    riffle = [];
    for (let r = 0; r < steps; r += 1) {
      const bell = Math.sin(Math.PI * (r / (steps - 1)));
      riffle.push({ bell, dur: 0.26 - 0.19 * bell });
    }
    riffleAt = 0;
    introOn = true;
    wrap.classList.add('intro');
    riffleStep();
  }

  /* ----------------------------------------------------------------- boot */

  paint();
  applyView();
  syncZoom();
  restLoupe();
  root.dataset.ready = '1';

  const introTimer = setTimeout(startIntro, 220);

  /* --------------------------------------------------------------- teardown */

  return function dispose() {
    clearTimeout(introTimer);
    if (raf !== null) cancelAnimationFrame(raf);
    removeEventListener('pointermove', onPointerMove);
    removeEventListener('pointerout', onPointerOut);
    removeEventListener('blur', onBlur);
    removeEventListener('keydown', onKeyDown);
    removeEventListener('resize', onResize);
    stage.removeEventListener('dblclick', onDblClick);
    stage.removeEventListener('pointerdown', onDown);
    stage.removeEventListener('pointermove', onMove);
    stage.removeEventListener('dragstart', noDefault);
    stage.removeEventListener('pointerup', endDrag);
    stage.removeEventListener('pointercancel', endDrag);
    if (loupe) {
      loupe.removeEventListener('pointerdown', onLoupeDown);
      loupe.removeEventListener('pointermove', onLoupeMove);
      loupe.removeEventListener('pointerup', dropLoupe);
      loupe.removeEventListener('pointercancel', dropLoupe);
    }
    book.textContent = '';
    if (zoomInner) zoomInner.textContent = '';
    // Leave the document as it was found: every leaf back in the source, so
    // React still owns exactly the tree it rendered.
    reclaim();
  };
}

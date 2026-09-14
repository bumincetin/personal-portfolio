'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useDragControls, useReducedMotion } from 'motion/react';
import type { Locale } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { getShelfBooks, VOLUMES } from './volumes';
import { getShelfUI } from './shelf-ui';
import './shelf.css';
import './shelf-overrides.css';

/**
 * Working Volumes shelf.
 *
 * The markup below is the authored structure from the registered ThreeUI source
 * for `CompleteShelfLandingPage` (public/landing-pages/complete-shelf-v2.html,
 * SHA-256 606f200fed86…, verified on download), transcribed to JSX with its ids
 * and classes intact — the engine finds every element by id, so the structure is
 * load-bearing rather than decorative.
 *
 * Content is this site's. Seven volumes, each titled by the expensive problem it
 * addresses, in three languages, and each linking through to the real page
 * behind it.
 *
 * Two additions to the authored markup, both content rather than design:
 *
 *   - a "Read the full page" link inside the detail panel, so a volume is a way
 *     into the site rather than a dead end;
 *   - a skip link out of the canvas, because a WebGL scene should never be the
 *     only way past the top of a page. It leads to the front matter, which is
 *     the argument in readable pages.
 *
 * The shelf is the whole home page. Nothing sits below it and the document does
 * not scroll: the authored wheel gesture browses volumes, and a page that also
 * scrolled would give the same gesture two meanings. Everything that used to be
 * prose underneath is now the front matter, read as pages.
 *
 * The engine is loaded on demand. It is roughly 135 kB plus three@0.165.0, and
 * no other route needs any of it.
 */

interface ShelfProps {
  locale: Locale;
  /** Where the skip link and the reading cue lead: the front matter. */
  readHref: string;
}

export default function Shelf({ locale, readHref }: ShelfProps) {
  const ui = getShelfUI(locale);
  const siteUI = getUI(locale);
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const dragControls = useDragControls();
  const suppressClickUntil = useRef(0);
  const reduced = useReducedMotion();
  const buttonMotion = {
    whileHover: reduced ? undefined : { y: -2, scale: 1.04 },
    whileTap: reduced ? undefined : { scale: 0.95 },
  };

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;

    // The document-level rules (fixed positioning, overflow lock) apply only
    // while the shelf is mounted.
    document.documentElement.setAttribute('data-shelf', '');

    (async () => {
      try {
        const { createShelf } = await import('./engine');
        if (cancelled) return;
        dispose = createShelf({
          books: getShelfBooks(locale),
          coverAtlasUrl: '/shelf/covers.webp',
          woodTextureUrl: '/shelf/wood.webp',
        });
      } catch {
        // Dismiss the loading veil so a failed engine download still leaves
        // the static catalogue and its links usable.
        const loading = rootRef.current?.querySelector<HTMLElement>('#loading');
        if (!cancelled && loading) loading.hidden = true;
      }
    })();

    return () => {
      cancelled = true;
      document.documentElement.removeAttribute('data-shelf');
      try {
        dispose?.();
      } catch {
        // Teardown after a failed init is not worth surfacing.
      }
    };
  }, [locale]);

  /**
   * Tracks which volume is selected by watching the counter the engine writes
   * ("03 / 07"). Reading the engine's own output keeps this component out of
   * its internals, so the ported file stays faithful to the source.
   */
  useEffect(() => {
    const counter = rootRef.current?.querySelector('#counter');
    if (!counter) return;

    const read = () => {
      const match = /(\d+)\s*\/\s*(\d+)/.exec(counter.textContent ?? '');
      if (!match) return;
      const index = Number(match[1]) - 1;
      if (index >= 0 && index < VOLUMES.length) setActiveIndex(index);
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(counter, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const books = getShelfBooks(locale);
  const active = books[activeIndex] ?? books[0];

  return (
    <main className="shelf-root" ref={rootRef}>
      <noscript><style>{'.shelf-root .loading { display: none; }'}</style></noscript>
      <div className="experience" id="experience">
        <div className="scene-shell">
          <motion.canvas id="scene" aria-hidden="true"
            drag="x" dragControls={dragControls} dragListener={false}
            dragConstraints={{ left: 0, right: 0 }} dragElastic={0} dragMomentum={false}
            onPointerDown={event => {
              if (!event.isPrimary || event.button !== 0 || rootRef.current?.querySelector('#experience')?.classList.contains('mode-detail')) return;
              dragControls.start(event);
            }}
            onDrag={() => { suppressClickUntil.current = performance.now() + 500; }}
            onDragEnd={(event, info) => {
              if (event.type === 'pointercancel' || Math.abs(info.offset.x) < 36 || Math.abs(info.offset.x) < Math.abs(info.offset.y) * 1.2) return;
              if (rootRef.current?.querySelector('#experience')?.classList.contains('mode-detail')) return;
              suppressClickUntil.current = performance.now() + 500;
              rootRef.current?.querySelector<HTMLButtonElement>(info.offset.x < 0 ? '#next' : '#previous')?.click();
            }}
            onClickCapture={event => {
              if (performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); }
            }} />
        </div>

        <header className="editorial-header" aria-label={ui.collection}>
          <div className="editorial-identity">
            <p className="collection-eyebrow">{siteUI.home.heroEyebrow}</p>
            <h1>{ui.identity}<span className="collection-period" aria-hidden="true">.</span></h1>
            <span>{ui.identityNote}</span>
          </div>
        </header>

        <div className="pointer-label" id="pointer-label" aria-hidden="true">
          <span id="pointer-label-index">{ui.volume} 01</span>
          <strong id="pointer-label-title">{books[0].title}</strong>
        </div>

        <section className="browse-ui" id="browse-ui" aria-label={ui.shelfNavigation}>
          <div className="selection">
            <span className="counter" id="counter">
              01 / 0{books.length}
            </span>
            <div className="selection__copy">
              <p className="selection__discipline">{active.discipline}</p>
              <h2 className="selection__title" id="selection-title">
                {books[0].title}
              </h2>
              <p className="selection__note" id="selection-note">
                {books[0].note}
              </p>
            </div>
          </div>

          <div className="browse-actions">
            <motion.button {...buttonMotion} className="round-button" id="previous" type="button" aria-label={ui.previousVolume}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m10.5 3.5-4.5 4.5 4.5 4.5"></path>
              </svg>
            </motion.button>
            <motion.button {...buttonMotion} className="text-button" id="inspect" type="button">
              {ui.open}
              <span aria-hidden="true">↗</span>
            </motion.button>
            <motion.button {...buttonMotion} className="round-button" id="next" type="button" aria-label={ui.nextVolume}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m5.5 3.5 4.5 4.5-4.5 4.5"></path>
              </svg>
            </motion.button>
          </div>

          <nav className="index-nav" aria-label={ui.volumeIndex}>
            <div className="markers" id="markers" role="tablist" aria-label={ui.chooseVolume}></div>
            <p className="microcopy">{ui.wheelHint}</p>
          </nav>
        </section>

        <aside
          className="detail-panel"
          id="detail-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-title"
          aria-hidden="true"
          inert={true}
        >
          <motion.button {...buttonMotion} className="close-button" id="close-detail" type="button" aria-label={ui.returnVolume}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m4 4 8 8M12 4l-8 8"></path>
            </svg>
          </motion.button>
          <p className="eyebrow" id="detail-eyebrow">
            {ui.volume} I · {books[0].discipline}
          </p>
          <h2 className="detail-title" id="detail-title">
            {books[0].title}
          </h2>
          <p className="detail-deck" id="detail-deck">
            {books[0].deck}
          </p>
          <dl className="meta-list">
            <div>
              <dt>{ui.metaBinding}</dt>
              <dd id="detail-binding">{books[0].binding}</dd>
            </div>
            <div>
              <dt>{ui.metaFormat}</dt>
              <dd id="detail-format">{books[0].format}</dd>
            </div>
            <div>
              <dt>{ui.metaTheme}</dt>
              <dd id="detail-theme">{books[0].theme}</dd>
            </div>
            <div>
              <dt>{ui.metaMotif}</dt>
              <dd id="detail-motif">{books[0].motif}</dd>
            </div>
          </dl>

          {/* Added: a volume has to lead somewhere. */}
          <Link className="text-button volume-link" href={`/${locale}${active.href}`} prefetch={false}>
            {ui.readFullPage}
            <span aria-hidden="true"> →</span>
          </Link>

          <div className="page-navigation" role="group" aria-label={ui.browsePages}>
            <motion.button {...buttonMotion} className="page-button" id="previous-page" type="button" aria-label={ui.previousPage} disabled>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m10.5 3.5-4.5 4.5 4.5 4.5"></path>
              </svg>
            </motion.button>
            <p className="page-status" aria-live="off">
              <strong id="page-label">{ui.closed}</strong>
              <span id="page-counter">{ui.clickToOpen}</span>
            </p>
            <motion.button {...buttonMotion} className="page-button" id="next-page" type="button" aria-label={ui.nextPage} disabled>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m5.5 3.5 4.5 4.5-4.5 4.5"></path>
              </svg>
            </motion.button>
          </div>
          <div className="detail-controls">
            <p className="microcopy">{ui.dragHint}</p>
            <div className="detail-buttons">
              <motion.button {...buttonMotion} className="text-button reset-button" id="toggle-book" type="button" aria-pressed="false">
                {ui.openBook}
              </motion.button>
              <motion.button {...buttonMotion} className="text-button reset-button" id="reset-view" type="button">
                {ui.resetView}
              </motion.button>
            </div>
          </div>
        </aside>

        <div className="sr-only" id="live-region" aria-live="polite"></div>

        {/*
          The authored static catalogue. It is on screen until the engine adds
          `webgl-ready`, so it is what a crawler indexes, what a reader without
          JavaScript gets, and what remains if WebGL is unavailable — carrying
          the same seven problems and linking to the same seven pages. The
          authored stylesheet owns that switch; do not add a `hidden` attribute
          here, which would take it away from exactly the readers it is for.
        */}
        <section className="static-fallback" id="static-fallback" aria-labelledby="fallback-title">
          <div className="fallback__header">
            <div>
              <p className="fallback__kicker">{ui.staticCatalog}</p>
              <h2 id="fallback-title">{ui.staticTitle}</h2>
            </div>
            <p className="fallback__status" id="fallback-status">
              {ui.staticStatus}
            </p>
          </div>
          <div className="fallback__grid" aria-label={ui.staticGridLabel}>
            {books.map((book) => (
              <article
                key={book.id}
                className="fallback-book"
                style={
                  {
                    '--book-color': book.color,
                    '--book-foil': book.foil,
                    '--book-height': `${Math.round(book.height * 240)}px`,
                  } as React.CSSProperties
                }
              >
                <span>
                  {ui.volume} {book.roman}
                </span>
                <strong>
                  <Link href={`/${locale}${book.href}`}>{book.title}</Link>
                </strong>
              </article>
            ))}
          </div>
          <div className="fallback__footer">
            <span>{ui.fallbackNote}</span>
          </div>
        </section>

        <div className="loading" id="loading" aria-live="polite">
          <div className="loading__inner">
            <div className="loading__mark" aria-hidden="true"></div>
            <p>{ui.loading}</p>
          </div>
        </div>

        {/* Added: a WebGL canvas must never be the only way past the top. Both
            lead to the front matter — the skip link for keyboard users, the cue
            for everyone else — because the authored wheel gesture browses
            volumes and the page itself does not scroll. */}
        <Link className="shelf-skip" href={readHref}>
          {ui.skipToReading}
        </Link>
        <Link className="shelf-continue" href={readHref}>
          {ui.continueBelow}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}

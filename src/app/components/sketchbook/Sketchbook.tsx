'use client';

import React, { useEffect, useRef } from 'react';
import type { Locale } from '@/lib/translations';
import { track } from '@/lib/analytics';
import { getSketchbookUI } from './sketchbook-ui';

/**
 * The interactive book.
 *
 * The markup below is the authored structure from ThreeUI's
 * `MengToSketchbookLandingPage` (canonical source
 * `public/landing-pages/meng-to-sketchbook.html`, SHA-256 e0330548b1ac…,
 * verified on download), transcribed to JSX with its ids and classes intact —
 * the engine finds every element by id, so the structure is load-bearing rather
 * than decorative.
 *
 * What is *not* here is the pages. They are rendered on the server by the route
 * (see `VolumeReader`), sit in `#sbSource` as ordinary prose, and stay there.
 * This component only mounts the machinery that builds a book out of them, and
 * the engine is loaded on demand so a route that never opens a volume never
 * pays for it.
 *
 * Three additions to the authored markup, all of them hosting rather than
 * design:
 *
 *   - a running head with the way back to the shelf, because a volume is a
 *     page of a site rather than the whole site;
 *   - a live region, so turning a leaf is announced to a screen reader — the
 *     source has none, and does not need one when its pages are pictures;
 *   - the index is headed and labelled, because it is a table of contents here
 *     rather than a list of plates.
 */
/** Swaps the book for the prose when scripting is unavailable. */
const NOSCRIPT_CSS = `.sb-source{display:block}.sketchbook-root .sb-wrap,.sketchbook-root .sb-index{display:none}`;

export default function Sketchbook({
  locale,
  slug,
  kind,
  head,
  foot,
  children,
}: {
  locale: Locale;
  /** Volume slug, for the one funnel event this component reports. */
  slug: string;
  kind: string;
  /** The running head. A slot rather than markup here, because what it says is
      the route's business, but where it sits and what colour it is are the
      book's — and the book's tokens live on this element. */
  head: React.ReactNode;
  /** Small print under the book, on the same terms. */
  foot: React.ReactNode;
  children: React.ReactNode;
}) {
  const ui = getSketchbookUI(locale);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const { createSketchbook } = await import('./engine');
        if (cancelled) return;
        dispose = createSketchbook({
          root,
          labels: ui,
          onFirstTurn: () => track('volume_page_turned', { slug, kind }),
        });
      } catch {
        // The engine never arrived. Hand the page back to the prose it was
        // rendered from, rather than leaving an empty book on screen.
        root.dataset.fallback = '';
      }
    })();

    return () => {
      cancelled = true;
      try {
        dispose?.();
      } catch {
        // Teardown after a failed init is not worth surfacing.
      }
    };
  }, [ui, slug, kind]);

  return (
    <div className="sketchbook-root" ref={rootRef}>
      {/*
        With scripting off there is no book, so the prose is the page. The
        stylesheet hides `#sbSource` by default — which is right for the reader
        who gets the book, and wrong for this one — so it is swapped back here.
      */}
      <noscript>
        <style>{NOSCRIPT_CSS}</style>
      </noscript>

      {head}

      {/* The pages, as prose. The engine builds the book from these. */}
      <div className="sb-source" id="sbSource">
        {children}
      </div>

      <div className="sb-wrap" id="sbWrap">
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
          <filter id="sb-mblur-1">
            <feGaussianBlur stdDeviation="5 0" />
          </filter>
          <filter id="sb-mblur-2">
            <feGaussianBlur stdDeviation="14 0" />
          </filter>
        </svg>

        <div className="sb-stage" id="sbStage">
          <button className="sb-arrow left" id="sbLeft" type="button" aria-label={ui.previousPage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" width="22" height="22">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>

          <div className="sb-3d" id="sb3d">
            <div className="sb-tilt" id="sbTilt">
              <div className="sb-binding" aria-hidden="true"><span className="sb-page-block left" /><span className="sb-page-block right" /></div>
              <div className="sb-cast ambient" aria-hidden="true"></div>
              <div className="sb-cast contact" aria-hidden="true"></div>
              <div className="sb-cast hair" aria-hidden="true"></div>
              <div className="sb-book" id="sbBook" aria-label={ui.book} role="group"></div>
            </div>
            <div className="zoomwrap" id="zoomWrap" aria-hidden="true">
              <div className="zoominner" id="zoomInner"></div>
            </div>
            <div className="loupe" id="loupe" aria-hidden="true">
              <span className="grip"></span>
              <span className="ring">
                <span className="lens" id="loupeLens">
                  <span className="mag" id="loupeMag"></span>
                </span>
              </span>
            </div>
          </div>

          <button className="sb-arrow right" id="sbRight" type="button" aria-label={ui.nextPage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" width="22" height="22">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="sb-captions" id="sbCaptions"></div>

        <div className="sb-tools" role="group" aria-label={ui.viewControls}>
          <button className="tool" id="zOut" type="button" aria-label={ui.zoomOut}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8" />
            </svg>
          </button>
          <span className="zoom-read" id="zRead">
            100%
          </span>
          <button className="tool" id="zIn" type="button" aria-label={ui.zoomIn}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8" />
            </svg>
          </button>
          <span className="tool-sep" aria-hidden="true"></span>
          <button className="tool" id="loupeBtn" type="button" aria-label={ui.magnifier} aria-pressed="true">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <circle cx="8.8" cy="8.8" r="5.8" />
              <path d="M13 13l4.4 4.4" />
              <path d="M6.4 7.2a3.2 3.2 0 0 1 2.4-1.4" opacity=".55" />
            </svg>
          </button>
        </div>

        <p className="sb-hint" id="sbHint">
          {ui.hint}
        </p>
      </div>

      {/* Added: turning a leaf has to be audible as well as visible. */}
      <p className="sr-only" id="sbLive" aria-live="polite" role="status"></p>

      <div className="rule" aria-hidden="true"></div>

      {/* Added heading and landmark: this is a table of contents, not a plate list. */}
      <nav className="sb-index" aria-labelledby="sb-index-heading">
        <h2 className="section-label" id="sb-index-heading">
          {ui.index}
        </h2>
        <ol className="plate-list" id="plateList"></ol>
      </nav>

      {foot}
    </div>
  );
}

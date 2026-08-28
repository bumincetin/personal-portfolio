'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Table of contents for the story: a fixed rail of chapter numerals on the
 * right edge that tracks where the reader is.
 *
 * The scroll rig is ported from ThreeUI's Kage page: each chapter anchor is
 * the scroll position at which that section is centred; the reader's
 * position becomes a float chapter index; and a frame-rate-independent damp
 * smooths it before it drives the rail, so a wheel notch reads as glide
 * rather than a jump. No React state changes per frame -- only the active
 * index, which changes a handful of times per page.
 */

const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

export default function StoryIndex({
  label,
  entries,
}: {
  label: string;
  /** Anchor id + the numeral to show for it, in reading order. */
  entries: { id: string; numeral: string; title: string }[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let anchors: number[] = [];
    let storyTop = 0;
    let storyBottom = 0;
    let progress = 0;
    let smooth = 0;
    let previous = performance.now();
    let frame = 0;
    let currentActive = -1;
    let currentVisible = false;

    const sections = () => entries.map((entry) => document.getElementById(entry.id)).filter(Boolean) as HTMLElement[];

    const measure = () => {
      const vh = window.innerHeight;
      const els = sections();
      anchors = els.map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return top + el.offsetHeight * 0.5 - vh * 0.5;
      });
      if (els.length) {
        const first = els[0];
        const last = els[els.length - 1];
        storyTop = first.getBoundingClientRect().top + window.scrollY - vh * 0.6;
        storyBottom = last.getBoundingClientRect().top + window.scrollY + last.offsetHeight - vh * 0.55;
      }
    };

    const progressFor = (y: number) => {
      if (!anchors.length || y <= anchors[0]) return 0;
      for (let i = 0; i < anchors.length - 1; i++) {
        if (y <= anchors[i + 1]) return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
      }
      return anchors.length - 1;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const y = window.scrollY;
      progress = progressFor(y);
      smooth = reduceMotion ? progress : damp(smooth, progress, 5.2, dt);

      rail.style.setProperty('--index-progress', (smooth / Math.max(1, anchors.length - 1)).toFixed(4));

      const next = Math.round(smooth);
      if (next !== currentActive) {
        currentActive = next;
        setActive(next);
      }
      const show = y > storyTop && y < storyBottom;
      if (show !== currentVisible) {
        currentVisible = show;
        setVisible(show);
      }
      frame = requestAnimationFrame(tick);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [entries]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={railRef}
      className={`fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-700 ease-luxe lg:block xl:right-8 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label={label}
    >
      <span
        className="mb-5 block text-right font-mono text-[0.5rem] uppercase tracking-[0.24em] text-muted-light [writing-mode:vertical-rl]"
        aria-hidden="true"
      >
        {label}
      </span>
      <div className="relative flex flex-col items-center gap-2.5 pl-3">
        {/* Progress spine to the left of the numerals. */}
        <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-border" aria-hidden="true">
          <span
            className="absolute inset-x-0 top-0 origin-top bg-accent"
            style={{ height: '100%', transform: 'scaleY(var(--index-progress, 0))' }}
          />
        </span>
        {entries.map((entry, index) => {
          const isActive = index === active;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => jump(entry.id)}
              className="group relative flex h-7 w-7 items-center justify-center"
              aria-current={isActive ? 'true' : undefined}
              aria-label={entry.title}
            >
              {/* Title floats out to the left on hover only, so the rail
                  itself never widens into the content column. */}
              <span
                className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-editorial border border-border bg-surface/90 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-charcoal opacity-0 shadow-card backdrop-blur-md transition-all duration-500 ease-luxe group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                {entry.title}
              </span>
              <span
                className={`font-display text-lg leading-none transition-colors duration-500 ${
                  isActive ? 'text-accent' : 'text-muted-light group-hover:text-charcoal'
                }`}
              >
                {entry.numeral}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

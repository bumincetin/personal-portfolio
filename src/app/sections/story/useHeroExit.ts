'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Hero exit, ported from ThreeUI's Kage page (`wireHeroExit`).
 *
 * As the reader scrolls off the hero, its elements dissolve one after another
 * on a scroll-mapped timeline rather than all at once: each `[data-hero-exit]`
 * element declares the point on the first ~0.7 viewport of scroll where it
 * starts to go (`data-exit-at`), how long it takes (`data-exit-span`) and an
 * optional blur for the largest pieces. Styles are written directly from a
 * passive scroll handler; nothing re-renders. Under reduced motion the hero
 * simply scrolls away.
 */

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export default function useHeroExit(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Below the desktop breakpoint the hero stacks taller than a viewport, so a
    // scroll-mapped dissolve would fade the portrait before it is reached.
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-exit]')).map((el) => ({
      el,
      at: Number(el.dataset.exitAt ?? 0),
      span: Number(el.dataset.exitSpan ?? 0.3),
      blur: Number(el.dataset.exitBlur ?? 0),
      shift: el.dataset.exitShift !== 'false',
    }));
    if (!items.length) return;

    let queued = false;
    let wasActive = false;

    const apply = () => {
      queued = false;
      const t = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * 0.7)));
      if (t <= 0) {
        if (wasActive) {
          for (const item of items) {
            item.el.style.opacity = '';
            item.el.style.transform = '';
            item.el.style.filter = '';
            item.el.style.pointerEvents = '';
          }
          wasActive = false;
        }
        return;
      }
      wasActive = true;
      for (const item of items) {
        const a = 1 - smooth(item.at, item.at + item.span, t);
        item.el.style.opacity = a.toFixed(3);
        if (item.shift) item.el.style.transform = `translate3d(0, ${((1 - a) * 18).toFixed(1)}px, 0)`;
        if (item.blur) item.el.style.filter = a > 0.999 ? '' : `blur(${((1 - a) * item.blur).toFixed(1)}px)`;
        item.el.style.pointerEvents = a < 0.05 ? 'none' : '';
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener('scroll', onScroll);
      for (const item of items) {
        item.el.style.opacity = '';
        item.el.style.transform = '';
        item.el.style.filter = '';
        item.el.style.pointerEvents = '';
      }
    };
  }, [rootRef]);
}

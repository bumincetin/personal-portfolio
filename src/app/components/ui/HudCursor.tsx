'use client';

import { useEffect, useRef } from 'react';

/**
 * HUD cursor: a trailing brass reticle with live viewport coordinates, in the
 * instrument-panel idiom of quant tooling.
 *
 * It does not replace the native cursor -- hiding the arrow costs real
 * usability for a cosmetic win -- it trails it. Position is lerped toward the
 * pointer inside a rAF loop and written straight to `transform`, so tracking
 * costs no React renders. Over an interactive target (links, buttons,
 * [data-magnetic]) the reticle snaps to the target's centre and expands to
 * frame it, which is the "magnetic" read without moving the target itself.
 *
 * Renders nothing for touch input and under prefers-reduced-motion.
 */
export default function HudCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let pointerX = -100;
    let pointerY = -100;
    let x = -100;
    let y = -100;
    let sizeW = 14;
    let sizeH = 14;
    let targetW = 14;
    let targetH = 14;
    /** Centre + span of the currently hovered interactive element, if any. */
    let snap: { x: number; y: number; w: number; h: number } | null = null;
    let frame = 0;
    let running = false;
    let seen = false;

    const tick = () => {
      const tx = snap ? snap.x : pointerX;
      const ty = snap ? snap.y : pointerY;
      targetW = snap ? snap.w : 14;
      targetH = snap ? snap.h : 14;

      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      sizeW += (targetW - sizeW) * 0.18;
      sizeH += (targetH - sizeH) * 0.18;

      ring.style.transform = `translate(${(x - sizeW / 2).toFixed(1)}px, ${(y - sizeH / 2).toFixed(1)}px)`;
      ring.style.width = `${sizeW.toFixed(1)}px`;
      ring.style.height = `${sizeH.toFixed(1)}px`;
      ring.style.borderRadius = snap ? '6px' : '999px';
      label.style.transform = `translate(${(x + 18).toFixed(1)}px, ${(y + 14).toFixed(1)}px)`;
      label.textContent = `X:${String(Math.round(pointerX)).padStart(4, '0')} Y:${String(Math.round(pointerY)).padStart(4, '0')}`;

      const settled =
        !snap &&
        Math.abs(x - tx) < 0.3 &&
        Math.abs(y - ty) < 0.3 &&
        Math.abs(sizeW - targetW) < 0.3 &&
        Math.abs(sizeH - targetH) < 0.3;
      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!seen) {
        // First contact: appear at the pointer rather than flying in from off
        // screen.
        seen = true;
        x = pointerX;
        y = pointerY;
        ring.style.opacity = '1';
        label.style.opacity = '1';
      }
      start();
    };

    const interactive = (target: EventTarget | null): HTMLElement | null =>
      target instanceof Element
        ? (target.closest('a, button, [data-magnetic], input, select, textarea, [role="button"]') as HTMLElement | null)
        : null;

    const handleOver = (event: PointerEvent) => {
      const hit = interactive(event.target);
      if (!hit) return;
      const rect = hit.getBoundingClientRect();
      // Framing a full-width card reads as a screen flash, not a snap; only
      // frame compact controls and trail everything else.
      if (rect.width > 380 || rect.height > 160) {
        snap = null;
        return;
      }
      snap = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        w: rect.width + 16,
        h: rect.height + 12,
      };
      start();
    };

    const handleOut = (event: PointerEvent) => {
      if (interactive(event.target)) {
        snap = null;
        start();
      }
    };

    const handleLeave = () => {
      ring.style.opacity = '0';
      label.style.opacity = '0';
      seen = false;
      snap = null;
    };

    // Scrolling moves targets under a stationary pointer; a stale snap frame
    // hovering over empty space reads as a glitch, so release it.
    const handleScroll = () => {
      if (snap) {
        snap = null;
        start();
      }
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('pointerout', handleOut, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleOut);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 border border-accent/60 opacity-0 transition-opacity duration-300"
        style={{ width: 14, height: 14, borderRadius: 999 }}
      />
      <div
        ref={labelRef}
        className="absolute left-0 top-0 font-mono text-[9px] tracking-[0.08em] text-accent/50 opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}

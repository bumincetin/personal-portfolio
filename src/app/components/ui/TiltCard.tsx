'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Pointer-tracking 3D tilt, in the vein of ThreeUI's interactive cards, plus a
 * hairline border gradient that traces the pointer.
 *
 * The transform is written straight to the element's style from a rAF loop
 * that eases toward the pointer -- no React state, so hover costs nothing in
 * re-renders and stays on the compositor. The same loop feeds the pointer
 * position into CSS variables that a masked overlay uses to paint a brass
 * highlight onto the card's 1px border ring, so the edge appears lit where
 * the cursor is. The loop only runs while the pointer is inside (or the card
 * is still settling back), and the effect is skipped entirely for touch input
 * and prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 5,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card's edge. */
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Touch has no hover; a tilt that jumps on tap only reads as glitch.
    if (window.matchMedia('(hover: none)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let glow = 0;
    let targetGlow = 0;
    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      glow += (targetGlow - glow) * 0.12;

      element.style.setProperty('--trace-x', `${pointerX.toFixed(1)}px`);
      element.style.setProperty('--trace-y', `${pointerY.toFixed(1)}px`);
      element.style.setProperty('--trace-a', glow.toFixed(3));

      const settled =
        Math.abs(currentX - targetX) < 0.01 &&
        Math.abs(currentY - targetY) < 0.01 &&
        Math.abs(glow - targetGlow) < 0.01;
      if (settled && targetX === 0 && targetY === 0 && targetGlow === 0) {
        element.style.transform = '';
        running = false;
        return;
      }

      element.style.transform = `perspective(900px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      const px = pointerX / rect.width - 0.5;
      const py = pointerY / rect.height - 0.5;
      targetX = -py * maxTilt;
      targetY = px * maxTilt;
      targetGlow = 1;
      start();
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      targetGlow = 0;
      start();
    };

    element.addEventListener('pointermove', handleMove);
    element.addEventListener('pointerleave', handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', handleMove);
      element.removeEventListener('pointerleave', handleLeave);
      element.style.transform = '';
    };
  }, [maxTilt]);

  return (
    <div
      ref={ref}
      className={`relative will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {/* Border ring only: the radial highlight is masked down to a 1px frame,
          so it reads as the card's edge catching light, not a spotlight. */}
      <div className="trace-ring" aria-hidden="true" />
    </div>
  );
}

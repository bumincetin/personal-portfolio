'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Pointer-tracking 3D tilt, in the vein of ThreeUI's interactive cards.
 *
 * The transform is written straight to the element's style from a rAF loop
 * that eases toward the pointer -- no React state, so hover costs nothing in
 * re-renders and stays on the compositor. The loop only runs while the
 * pointer is inside (or the card is still settling back), and the effect is
 * skipped entirely for touch input and prefers-reduced-motion.
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
    let frame = 0;
    let running = false;

    const tick = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      const settled = Math.abs(currentX - targetX) < 0.01 && Math.abs(currentY - targetY) < 0.01;
      if (settled && targetX === 0 && targetY === 0) {
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
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = -py * maxTilt;
      targetY = px * maxTilt;
      start();
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
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
    <div ref={ref} className={`will-change-transform ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * SVG arc gauge for the Business Intelligence card.
 *
 * A 240-degree instrument dial that sweeps from zero to its value when the
 * card scrolls into view, with the readout counting alongside the needle.
 * The arc is a single stroked path animated through stroke-dasharray from a
 * rAF loop; React state carries only the displayed number. Reduced motion
 * renders the settled dial immediately.
 */

const START_ANGLE = -210; // degrees; 240-degree usable sweep to +30
const SWEEP = 240;
const RADIUS = 54;
const CENTER = 70;

const polar = (angleDeg: number, radius: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
};

const arcPath = (fromDeg: number, toDeg: number, radius: number) => {
  const from = polar(fromDeg, radius);
  const to = polar(toDeg, radius);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
};

export default function TelemetryGauge({
  value = 94,
  label = 'PIPELINE_UPTIME',
  unit = '%',
  className = '',
}: {
  value?: number;
  label?: string;
  unit?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }

    let frame = 0;
    let startTime = 0;
    const DURATION = 1800;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased * 10) / 10);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        startTime = 0;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value]);

  const sweepTo = START_ANGLE + (shown / 100) * SWEEP;
  const needle = polar(sweepTo, RADIUS - 10);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <svg viewBox="0 0 140 130" className="h-full w-full" aria-hidden="true">
        {/* Track */}
        <path
          d={arcPath(START_ANGLE, START_ANGLE + SWEEP, RADIUS)}
          fill="none"
          style={{ stroke: 'rgb(var(--c-hairline))' }}
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Tick marks every 10% */}
        {Array.from({ length: 11 }, (_, i) => {
          const angle = START_ANGLE + (i / 10) * SWEEP;
          const outer = polar(angle, RADIUS + 8);
          const inner = polar(angle, RADIUS + 4);
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              style={{ stroke: 'rgb(var(--c-muted) / 0.4)' }}
              strokeWidth="1"
            />
          );
        })}
        {/* Value arc */}
        {shown > 0.5 && (
          <path
            d={arcPath(START_ANGLE, sweepTo, RADIUS)}
            fill="none"
            style={{ stroke: 'rgb(var(--c-brass))' }}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
        {/* Needle */}
        <line
          x1={CENTER}
          y1={CENTER}
          x2={needle.x}
          y2={needle.y}
          style={{ stroke: 'rgb(var(--c-brass-hi))' }}
          strokeWidth="1.5"
        />
        <circle cx={CENTER} cy={CENTER} r="3" style={{ fill: 'rgb(var(--c-brass))' }} />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center">
        <div className="font-mono text-2xl font-light tracking-tight text-charcoal">
          {shown.toFixed(1)}
          <span className="text-sm text-accent">{unit}</span>
        </div>
        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-light">{label}</div>
      </div>
    </div>
  );
}

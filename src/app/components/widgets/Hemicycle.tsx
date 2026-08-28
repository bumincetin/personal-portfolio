'use client';

import { useEffect, useRef } from 'react';
import { onThemeChange, readCanvasAlpha, readChannels } from '@/lib/theme';

/**
 * Parliamentary hemicycle for Chapter I -- the bachelor thesis on seat
 * prediction, drawn as the object it predicted.
 *
 * Six hundred seats are laid out on concentric arcs and lit bloc by bloc as
 * the widget scrolls into view, sweeping left to right the way results are
 * called. The distribution is the published 2023 outcome (600 seats), grouped
 * into the blocs the thesis modelled. Pure 2D canvas; the loop runs only for
 * the reveal and once more per theme change.
 */

const SEATS = 600;
const ROWS = 9;

/* 2023 general election, seats by bloc. Sums to 600. */
const BLOCS = [
  { label: 'AKP', seats: 268, tone: 'brass' },
  { label: 'CHP', seats: 169, tone: 'text' },
  { label: 'YSP', seats: 61, tone: 'copper' },
  { label: 'MHP', seats: 50, tone: 'brassHi' },
  { label: 'İYİ', seats: 43, tone: 'stone' },
  { label: 'Other', seats: 9, tone: 'dim' },
] as const;

type Tone = (typeof BLOCS)[number]['tone'];

/* The legend is DOM, so it can follow the theme through CSS directly. */
const TONE_VAR: Record<Tone, string> = {
  brass: '--c-brass',
  brassHi: '--c-brass-hi',
  copper: '--c-copper',
  text: '--c-text',
  stone: '--c-muted',
  dim: '--c-muted-light',
};

let PALETTE: Record<Tone, [number, number, number]> = {
  brass: [192, 138, 62],
  brassHi: [227, 192, 137],
  copper: [161, 124, 88],
  text: [240, 233, 223],
  stone: [168, 153, 138],
  dim: [110, 96, 85],
};
let HAIRLINE: [number, number, number] = [61, 49, 41];
let alphaScale = 1;

const readTheme = () => {
  PALETTE = {
    brass: readChannels('--c-brass', [192, 138, 62]),
    brassHi: readChannels('--c-brass-hi', [227, 192, 137]),
    copper: readChannels('--c-copper', [161, 124, 88]),
    text: readChannels('--c-text', [240, 233, 223]),
    stone: readChannels('--c-muted', [168, 153, 138]),
    dim: readChannels('--c-muted-light', [110, 96, 85]),
  };
  HAIRLINE = readChannels('--c-hairline-strong', [61, 49, 41]);
  alphaScale = readCanvasAlpha();
};

const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a.toFixed(3)})`;

/**
 * Seat positions: rows of increasing radius, each holding seats in proportion
 * to its arc length, ordered by angle so that "seat n" sweeps left to right
 * across the chamber rather than row by row.
 */
function layoutSeats() {
  const perRow: number[] = [];
  let total = 0;
  for (let r = 0; r < ROWS; r++) {
    const radius = 0.42 + (r / (ROWS - 1)) * 0.58;
    perRow.push(radius);
    total += radius;
  }
  const counts = perRow.map((radius) => Math.round((radius / total) * SEATS));
  const drift = SEATS - counts.reduce((a, b) => a + b, 0);
  counts[ROWS - 1] += drift;

  const seats: { x: number; y: number; angle: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    const radius = perRow[r];
    const n = counts[r];
    for (let i = 0; i < n; i++) {
      const angle = Math.PI - (Math.PI * (i + 0.5)) / n;
      seats.push({ x: Math.cos(angle) * radius, y: -Math.sin(angle) * radius, angle });
    }
  }
  // Left to right across the whole chamber.
  seats.sort((a, b) => b.angle - a.angle);
  return seats;
}

const SEAT_LAYOUT = layoutSeats();

const BLOC_OF_SEAT: Tone[] = (() => {
  const out: Tone[] = [];
  for (const bloc of BLOCS) for (let i = 0; i < bloc.seats; i++) out.push(bloc.tone);
  return out;
})();

export default function Hemicycle({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    readTheme();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let startedAt = 0;
    let revealed = reduceMotion;
    let progress = reduceMotion ? 1 : 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height * 0.88;
      const scale = Math.min(width / 2.15, height / 1.05);
      const dot = Math.max(1.6, scale * 0.0155);

      // Chamber outline.
      ctx.strokeStyle = rgba(HAIRLINE, 0.9 * alphaScale);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 1.06, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.36, Math.PI, Math.PI * 2);
      ctx.stroke();

      const lit = Math.floor(progress * SEATS);
      for (let i = 0; i < SEATS; i++) {
        const seat = SEAT_LAYOUT[i];
        const x = cx + seat.x * scale;
        const y = cy + seat.y * scale;
        const tone = BLOC_OF_SEAT[i];
        const isLit = i < lit;
        // The seat on the wavefront flares before settling.
        const flare = i === lit ? 1.9 : 1;
        ctx.fillStyle = isLit
          ? rgba(PALETTE[tone], tone === 'dim' ? 0.75 : 0.95)
          : rgba(HAIRLINE, 0.9 * alphaScale);
        ctx.beginPath();
        ctx.arc(x, y, dot * flare, 0, Math.PI * 2);
        ctx.fill();
      }

      // Majority line: 301 seats.
      const majority = Math.PI - (Math.PI * 301) / SEATS;
      ctx.strokeStyle = rgba(PALETTE.brass, 0.55);
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(majority) * scale * 0.34, cy - Math.sin(majority) * scale * 0.34);
      ctx.lineTo(cx + Math.cos(majority) * scale * 1.1, cy - Math.sin(majority) * scale * 1.1);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const tick = (time: number) => {
      if (!startedAt) startedAt = time;
      const t = Math.min(1, (time - startedAt) / 2600);
      // Ease-out quart: results come in fast, the last seats settle slowly.
      progress = 1 - Math.pow(1 - t, 4);
      draw();
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || revealed) return;
        revealed = true;
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    visibility.observe(canvas);

    const unsubscribe = onThemeChange(() => {
      readTheme();
      draw();
    });

    layout();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      unsubscribe();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted-light">
        <span>TBMM · 600</span>
        <span className="flex flex-wrap justify-end gap-x-3 gap-y-1">
          {BLOCS.slice(0, 5).map((bloc) => (
            <span key={bloc.label} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: `rgb(var(${TONE_VAR[bloc.tone]}))` }}
              />
              {bloc.label} {bloc.seats}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

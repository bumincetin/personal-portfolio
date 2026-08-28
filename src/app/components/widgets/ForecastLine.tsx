'use client';

import { useEffect, useRef } from 'react';
import { onThemeChange, readCanvasAlpha, readChannels } from '@/lib/theme';

/**
 * Demand forecast for Chapter III -- the Fedrigoni time-series work, drawn as
 * the chart the plant actually looked at.
 *
 * A seasonal history inks itself in from the left; where it ends, a forecast
 * continues in brass with a p10–p90 band that widens with the horizon. The
 * band is the point: the model ships with the edge of its own confidence.
 * Deterministic series, single reveal animation, repaint on theme change.
 */

const HISTORY = 44;
const HORIZON = 16;

let BRASS: [number, number, number] = [192, 138, 62];
let INK: [number, number, number] = [240, 233, 223];
let STONE: [number, number, number] = [168, 153, 138];
let GRID: [number, number, number] = [44, 35, 29];
let alphaScale = 1;

const readTheme = () => {
  BRASS = readChannels('--c-brass', [192, 138, 62]);
  INK = readChannels('--c-text', [240, 233, 223]);
  STONE = readChannels('--c-muted', [168, 153, 138]);
  GRID = readChannels('--c-hairline', [44, 35, 29]);
  alphaScale = readCanvasAlpha();
};

const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a.toFixed(3)})`;

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/** Trend + annual seasonality + noise, then a forecast that keeps the shape. */
function buildSeries() {
  const rnd = seeded(2024);
  const series: number[] = [];
  let level = 0.48;
  for (let i = 0; i < HISTORY + HORIZON; i++) {
    const season = Math.sin((i / 12) * Math.PI * 2 - 1.1) * 0.13;
    level += 0.0035;
    const noise = i < HISTORY ? (rnd() - 0.5) * 0.07 : 0;
    series.push(level + season + noise);
  }
  return series;
}

const SERIES = buildSeries();

export default function ForecastLine({ className = '' }: { className?: string }) {
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

    /** Linear interpolation for fractional indices, so the head glides. */
    const valueAt = (i: number) => {
      const lo = Math.floor(i);
      const hi = Math.min(SERIES.length - 1, lo + 1);
      const t = i - lo;
      return SERIES[lo] + (SERIES[hi] - SERIES[lo]) * t;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const padX = 8;
      const padTop = 14;
      const padBottom = 22;
      const plotW = width - padX * 2;
      const plotH = height - padTop - padBottom;
      const total = HISTORY + HORIZON - 1;
      const xAt = (i: number) => padX + (i / total) * plotW;
      const yAt = (v: number) => padTop + (1 - (v - 0.2) / 0.75) * plotH;

      // Grid.
      ctx.strokeStyle = rgba(GRID, 1 * alphaScale);
      ctx.lineWidth = 1;
      for (let g = 0; g <= 3; g++) {
        const y = padTop + (g / 3) * plotH;
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(width - padX, y);
        ctx.stroke();
      }

      // Total drawable points for this frame; history first, then forecast.
      const shown = progress * total;
      const historyShown = Math.min(HISTORY - 1, shown);
      const forecastShown = Math.max(0, shown - (HISTORY - 1));

      // Forecast band.
      if (forecastShown > 0) {
        const end = HISTORY - 1 + forecastShown;
        ctx.beginPath();
        for (let i = HISTORY - 1; i <= end; i++) {
          const k = (i - (HISTORY - 1)) / HORIZON;
          const spread = 0.02 + k * 0.16;
          const v = valueAt(i);
          const y = yAt(v + spread);
          if (i === HISTORY - 1) ctx.moveTo(xAt(i), y);
          else ctx.lineTo(xAt(i), y);
        }
        for (let i = Math.floor(end); i >= HISTORY - 1; i--) {
          const k = (i - (HISTORY - 1)) / HORIZON;
          const spread = 0.02 + k * 0.16;
          ctx.lineTo(xAt(i), yAt(SERIES[i] - spread));
        }
        ctx.closePath();
        const grad = ctx.createLinearGradient(xAt(HISTORY - 1), 0, xAt(total), 0);
        grad.addColorStop(0, rgba(BRASS, 0.22));
        grad.addColorStop(1, rgba(BRASS, 0.04));
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // History line.
      ctx.strokeStyle = rgba(INK, 0.82);
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      for (let i = 0; i <= historyShown; i++) {
        const v = valueAt(i);
        if (i === 0) ctx.moveTo(xAt(i), yAt(v));
        else ctx.lineTo(xAt(i), yAt(v));
      }
      ctx.stroke();

      // Forecast line.
      if (forecastShown > 0) {
        ctx.strokeStyle = rgba(BRASS, 0.95);
        ctx.lineWidth = 1.4;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        const end = HISTORY - 1 + forecastShown;
        for (let i = HISTORY - 1; i <= end; i++) {
          const v = valueAt(i);
          if (i === HISTORY - 1) ctx.moveTo(xAt(i), yAt(v));
          else ctx.lineTo(xAt(i), yAt(v));
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // "Today" hairline.
      const todayX = xAt(HISTORY - 1);
      ctx.strokeStyle = rgba(STONE, 0.7);
      ctx.setLineDash([1, 3]);
      ctx.beginPath();
      ctx.moveTo(todayX, padTop - 6);
      ctx.lineTo(todayX, height - padBottom + 6);
      ctx.stroke();
      ctx.setLineDash([]);

      // Leading point.
      const head = Math.min(total, shown);
      const hv = valueAt(head);
      ctx.fillStyle = rgba(head > HISTORY - 1 ? BRASS : INK, 1);
      ctx.beginPath();
      ctx.arc(xAt(head), yAt(hv), 2.4, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (time: number) => {
      if (!startedAt) startedAt = time;
      const t = Math.min(1, (time - startedAt) / 3200);
      progress = 1 - Math.pow(1 - t, 3);
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
        <span>LSTM · demand index</span>
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-px w-3 bg-charcoal/70" /> history
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-px w-3 border-t border-dashed border-accent" /> p10–p90
          </span>
        </span>
      </div>
    </div>
  );
}

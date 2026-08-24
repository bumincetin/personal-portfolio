'use client';

import { useEffect, useRef } from 'react';
import { onThemeChange, readChannels } from '@/lib/theme';

/**
 * Mini Monte Carlo simulation for the Financial Analytics card.
 *
 * Forty geometric-Brownian price paths fan out from a common origin and draw
 * themselves in as the card scrolls into view; the median path is inked in
 * brass on top of the muted ensemble, and a terminal histogram builds up
 * along the right edge as paths land. Deterministic seed, so every visitor
 * sees the same fan. Pure 2D canvas, rAF-local state, stops when off screen.
 * Reduced motion paints the completed fan once.
 */

const PATHS = 40;
const STEPS = 64;
const DRIFT = 0.0016;
const VOL = 0.026;

/* Canvas cannot inherit CSS; seeded dark, re-read on mount and theme change. */
let BRASS = '192, 138, 62';
let STONE = '168, 153, 138';
let GRID = '44, 35, 29';

const readTheme = () => {
  BRASS = readChannels('--c-brass', [192, 138, 62]).join(', ');
  STONE = readChannels('--c-muted', [168, 153, 138]).join(', ');
  GRID = readChannels('--c-hairline', [44, 35, 29]).join(', ');
};

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export default function MonteCarlo({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const ctx = context;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------ paths */

    const rnd = seededRandom(90210);
    // Box-Muller from two uniforms: GBM needs gaussian increments.
    const gaussian = () => {
      const u = Math.max(rnd(), 1e-9);
      const v = rnd();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const paths: number[][] = [];
    for (let i = 0; i < PATHS; i++) {
      const path = [1];
      for (let step = 1; step <= STEPS; step++) {
        path.push(path[step - 1] * Math.exp(DRIFT + VOL * gaussian()));
      }
      paths.push(path);
    }
    // Median path by terminal value: the ensemble's "expected story".
    const byTerminal = [...paths].sort((a, b) => a[STEPS] - b[STEPS]);
    const median = byTerminal[Math.floor(PATHS / 2)];

    let low = Infinity;
    let high = -Infinity;
    for (const path of paths) for (const value of path) {
      if (value < low) low = value;
      if (value > high) high = value;
    }
    const pad = (high - low) * 0.1;
    low -= pad;
    high += pad;

    /* ----------------------------------------------------------- layout */

    let width = 0;
    let height = 0;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      readTheme();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(1);
    };

    const px = (step: number) => (step / STEPS) * (width - 34);
    const py = (value: number) => height - ((value - low) / (high - low)) * height;

    /* ------------------------------------------------------------ render */

    const draw = (t: number) => {
      // Faint strokes need more weight on paper than on black.
      const ensembleAlpha = readChannels('--c-ground', [16, 12, 10])[0] > 128 ? 0.3 : 0.13;
      ctx.clearRect(0, 0, width, height);
      const visibleSteps = Math.max(2, Math.floor(t * STEPS));

      // Faint value gridlines, the quant graph's paper.
      ctx.strokeStyle = `rgba(${GRID}, 0.9)`;
      ctx.lineWidth = 1;
      for (let line = 1; line < 4; line++) {
        const y = (height / 4) * line;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const drawPath = (path: number[], style: string, lineWidth: number) => {
        ctx.strokeStyle = style;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(px(0), py(path[0]));
        for (let step = 1; step <= visibleSteps; step++) ctx.lineTo(px(step), py(path[step]));
        ctx.stroke();
      };

      for (const path of paths) {
        if (path === median) continue;
        drawPath(path, `rgba(${STONE}, ${ensembleAlpha})`, 1);
      }
      drawPath(median, `rgba(${BRASS}, 0.9)`, 1.5);

      // Terminal distribution: builds along the right edge as paths land.
      if (visibleSteps === STEPS) {
        const bins = 12;
        const counts = new Array(bins).fill(0);
        for (const path of paths) {
          const bin = Math.min(bins - 1, Math.floor(((path[STEPS] - low) / (high - low)) * bins));
          counts[bin]++;
        }
        const peak = Math.max(...counts);
        for (let bin = 0; bin < bins; bin++) {
          if (counts[bin] === 0) continue;
          const y = height - ((bin + 0.5) / bins) * height;
          const barWidth = (counts[bin] / peak) * 26;
          ctx.fillStyle = `rgba(${BRASS}, 0.4)`;
          ctx.fillRect(width - 30, y - height / bins / 2 + 1, barWidth, height / bins - 2);
        }
      }

      // Live cursor on the median's leading edge.
      if (visibleSteps < STEPS) {
        ctx.fillStyle = `rgba(${BRASS}, 1)`;
        ctx.beginPath();
        ctx.arc(px(visibleSteps), py(median[visibleSteps]), 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* ------------------------------------------------------- loop control */

    let frame = 0;
    let startTime = 0;
    const DURATION = 2600;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / DURATION);
      // Ease-out: the fan sprints from the origin and settles into the tail.
      draw(1 - (1 - t) * (1 - t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || reduceMotion) return;
        startTime = 0;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(canvas);

    // The fan is a one-shot animation, so a theme change has to repaint the
    // finished frame itself.
    const unsubscribeTheme = onThemeChange(() => {
      readTheme();
      draw(1);
    });

    layout();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      unsubscribeTheme();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <span className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-light">
        MC_SIM · n=40 · GBM
      </span>
    </div>
  );
}

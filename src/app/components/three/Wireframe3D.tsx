'use client';

import { useEffect, useRef } from 'react';
import {
  type Shape,
  type Rgb,
  PALETTE,
  icosahedron,
  octahedron,
  orbits,
  gem,
  rotatePoint,
  project,
  rgba,
} from './engine';

/**
 * Small rotating wireframe ornament on a 2D canvas.
 *
 * Used as a decorative 3D accent (hero orbit rings, footer polyhedron). The
 * same discipline as ConstellationField applies: the loop only runs while the
 * canvas is on screen and the tab is visible, DPR is capped, and
 * prefers-reduced-motion gets a single static frame.
 */

type ShapeName = 'icosahedron' | 'octahedron' | 'orbits' | 'gem';

const SHAPES: Record<ShapeName, () => Shape> = {
  icosahedron: () => icosahedron(),
  octahedron: () => octahedron(),
  orbits: () => orbits(),
  gem: () => gem(),
};

export default function Wireframe3D({
  shape = 'icosahedron',
  color = PALETTE.brass,
  speed = 1,
  lineAlpha = 0.5,
  className = '',
}: {
  shape?: ShapeName;
  color?: Rgb;
  /** Rotation speed multiplier; 1 is a slow, ambient turn. */
  speed?: number;
  lineAlpha?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const ctx = context;

    const model = SHAPES[shape]();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let onScreen = true;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const ax = -0.4 + Math.sin(time * 0.00021 * speed) * 0.16;
      const ay = time * 0.00035 * speed + 0.6;
      const scale = Math.min(width, height) * 0.36;
      const cx = width / 2;
      const cy = height / 2;

      const projected = model.points.map((p) => project(rotatePoint(p, ax, ay), cx, cy, scale));

      ctx.lineWidth = 1;
      for (const edge of model.edges) {
        const a = projected[edge.a];
        const b = projected[edge.b];
        // Depth-shade each edge by the average perspective factor.
        const depth = (a.s + b.s) / 2;
        ctx.strokeStyle = rgba(color, lineAlpha * (0.35 + (depth - 0.8) * 1.1));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Vertex points, skipped for dense ring shapes where they read as noise.
      if (model.points.length <= 16) {
        for (const p of projected) {
          ctx.fillStyle = rgba(color, lineAlpha * (0.5 + (p.s - 0.8) * 1.2));
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6 * p.s, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };
    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas);
    document.addEventListener('visibilitychange', sync);

    layout();
    if (!reduceMotion) sync();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [shape, color, speed, lineAlpha]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />;
}

'use client';

import { useEffect, useRef } from 'react';
import { PALETTE, refreshPalette, canvasAlpha, rotatePoint, project, rgba, type Vec3 } from '@/app/components/three/engine';
import { onThemeChange } from '@/lib/theme';

/**
 * Wireframe globe with the Istanbul–Milan corridor for Chapter V.
 *
 * Latitude and longitude rings are projected through the house engine (no
 * three.js), depth-shaded so the far hemisphere recedes. The two cities are
 * pinned at their coordinates and joined by a great-circle arc lifted off the
 * surface, with a few motes travelling it in both directions -- trade going
 * both ways. The globe does not spin through; it breathes around the corridor
 * so the route is always in view. Loop runs only on screen.
 */

const RADIUS = 1;
const LAT_RINGS = [-60, -30, 0, 30, 60];
const LON_RINGS = 12;
const RING_SEGMENTS = 72;

const ISTANBUL = { lat: 41.01, lon: 28.98, label: 'IST' };
const MILAN = { lat: 45.46, lon: 9.19, label: 'MIL' };
/** The corridor's midpoint; the globe is turned so this point faces the camera. */
const FACING_LON = (ISTANBUL.lon + MILAN.lon) / 2;
const FACING_LAT = (ISTANBUL.lat + MILAN.lat) / 2;

const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Lat/lon to model space: +y north, then the whole sphere tipped so the
 * corridor's midpoint sits dead centre facing the camera rather than up near
 * the pole where 43°N would otherwise land.
 */
function surface(lat: number, lon: number, radius = RADIUS): Vec3 {
  const phi = toRad(lat);
  const lambda = toRad(lon - FACING_LON);
  const x = Math.cos(phi) * Math.sin(lambda) * radius;
  const y = Math.sin(phi) * radius;
  const z = -Math.cos(phi) * Math.cos(lambda) * radius;
  const tilt = -toRad(FACING_LAT);
  return {
    x,
    y: y * Math.cos(tilt) - z * Math.sin(tilt),
    z: y * Math.sin(tilt) + z * Math.cos(tilt),
  };
}

/** Spherical interpolation between two surface points, lifted by `lift` at the apex. */
function greatCircle(a: Vec3, b: Vec3, t: number, lift: number): Vec3 {
  const dot = a.x * b.x + a.y * b.y + a.z * b.z;
  const omega = Math.acos(Math.max(-1, Math.min(1, dot)));
  const sinO = Math.sin(omega) || 1;
  const wa = Math.sin((1 - t) * omega) / sinO;
  const wb = Math.sin(t * omega) / sinO;
  const r = RADIUS + Math.sin(t * Math.PI) * lift;
  return { x: (a.x * wa + b.x * wb) * r, y: (a.y * wa + b.y * wb) * r, z: (a.z * wa + b.z * wb) * r };
}

function buildRings() {
  const rings: Vec3[][] = [];
  for (const lat of LAT_RINGS) {
    const ring: Vec3[] = [];
    for (let i = 0; i < RING_SEGMENTS; i++) ring.push(surface(lat, (i / RING_SEGMENTS) * 360));
    rings.push(ring);
  }
  for (let m = 0; m < LON_RINGS; m++) {
    const lon = (m / LON_RINGS) * 180;
    const ring: Vec3[] = [];
    for (let i = 0; i < RING_SEGMENTS; i++) {
      const lat = -90 + (i / RING_SEGMENTS) * 360;
      // Past the pole the meridian continues on the far side.
      ring.push(lat <= 90 ? surface(lat, lon) : surface(180 - lat, lon + 180));
    }
    rings.push(ring);
  }
  return rings;
}

const RINGS = buildRings();
const ARC_STEPS = 48;
const A = surface(ISTANBUL.lat, ISTANBUL.lon);
const B = surface(MILAN.lat, MILAN.lon);
const ARC: Vec3[] = Array.from({ length: ARC_STEPS + 1 }, (_, i) => greatCircle(A, B, i / ARC_STEPS, 0.3));

export default function CorridorGlobe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    refreshPalette();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Canvas cannot resolve var(); next/font publishes the family under this
    // custom property, so it is read once and spliced into the font string.
    const monoFamily =
      (getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'ui-monospace') +
      ', ui-monospace, monospace';

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let onScreen = false;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.4;
      const ax = 0.1 + Math.sin(time * 0.00017) * 0.06;
      const ay = Math.sin(time * 0.00012) * 0.3;
      const alpha = canvasAlpha.value;

      // Sphere silhouette.
      ctx.strokeStyle = rgba(PALETTE.stone, 0.22 * alpha);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      // Graticule.
      for (const ring of RINGS) {
        ctx.beginPath();
        let prev: { x: number; y: number; s: number } | null = null;
        for (let i = 0; i <= ring.length; i++) {
          const p = project(rotatePoint(ring[i % ring.length], ax, ay), cx, cy, scale);
          if (prev) {
            // Front hemisphere reads solid; the back fades to a ghost.
            const depth = (prev.s + p.s) / 2;
            const a = depth > 1 ? 0.28 + (depth - 1) * 1.6 : 0.05 + (depth - 0.72) * 0.6;
            ctx.strokeStyle = rgba(PALETTE.stone, Math.max(0.03, Math.min(0.55, a)) * alpha);
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
          prev = p;
        }
      }

      // Corridor arc.
      const projectedArc = ARC.map((p) => project(rotatePoint(p, ax, ay), cx, cy, scale));
      ctx.lineWidth = 1.2;
      for (let i = 1; i < projectedArc.length; i++) {
        const a = projectedArc[i - 1];
        const b = projectedArc[i];
        ctx.strokeStyle = rgba(PALETTE.brass, 0.85 * Math.min(1, (a.s + b.s) / 2));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Motes travelling the arc, both directions.
      const motes = [0, 0.33, 0.66];
      for (const offset of motes) {
        for (const dir of [1, -1]) {
          const t = ((((time * 0.00009 * dir + offset) % 1) + 1) % 1);
          const idx = t * ARC_STEPS;
          const lo = Math.floor(idx);
          const hi = Math.min(ARC_STEPS, lo + 1);
          const k = idx - lo;
          const x = projectedArc[lo].x + (projectedArc[hi].x - projectedArc[lo].x) * k;
          const y = projectedArc[lo].y + (projectedArc[hi].y - projectedArc[lo].y) * k;
          ctx.fillStyle = rgba(PALETTE.brass, 0.95);
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = rgba(PALETTE.brass, 0.25);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // City pins.
      for (const [city, point] of [
        [ISTANBUL, A],
        [MILAN, B],
      ] as const) {
        const p = project(rotatePoint(point, ax, ay), cx, cy, scale);
        const pulse = 0.5 + Math.sin(time * 0.0025 + (city === MILAN ? 1.7 : 0)) * 0.5;
        ctx.strokeStyle = rgba(PALETTE.brass, 0.35 * (1 - pulse));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 + pulse * 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(PALETTE.scan, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = `500 9px ${monoFamily}`;
        ctx.fillStyle = rgba(PALETTE.scan, 0.85);
        ctx.textBaseline = 'middle';
        ctx.textAlign = city === MILAN ? 'right' : 'left';
        ctx.fillText(city.label, p.x + (city === MILAN ? -9 : 9), p.y - 8);
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

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    const unsubscribe = onThemeChange(() => {
      refreshPalette();
      draw(performance.now());
    });

    layout();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', sync);
      unsubscribe();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted-light">
        <span>41.01°N 28.98°E → 45.46°N 9.19°E</span>
        <span>Alvolo · TR ⇄ IT</span>
      </div>
    </div>
  );
}

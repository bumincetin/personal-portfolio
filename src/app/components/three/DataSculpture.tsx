'use client';

import { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import {
  type Vec3,
  PALETTE,
  chaosCloud,
  cubeLattice,
  gem,
  createRandom,
  pointOnRandomEdge,
  rotatePoint,
  project,
  lerpVec,
  lerp,
  smoothstep,
  smootherstep,
  mixRgb,
  rgba,
} from './engine';

/**
 * The Data Sculptor's centerpiece: one particle cloud that is sculpted through
 * three states as the section scrolls.
 *
 *   chaos cloud  ->  lattice grid   ->  brilliant-cut gem
 *   (raw data)       (refinement)       (the asset)
 *
 * Every particle owns a position in each of the three shapes; the scroll
 * progress blends between them, so the same points that jitter as noise end
 * up beading along the gem's facet edges. Structural edges (lattice bars, gem
 * facets) fade in only while their shape is dominant.
 *
 * This replaced a CSS 3D cube built from six framer-motion faces, each face
 * carrying several interpolated style channels -- dozens of springs running
 * through the React tree on every scroll tick. Here the scroll progress is
 * read inside a single rAF loop with `.get()` and drawn straight to canvas:
 * zero React re-renders, and the loop stops whenever the canvas is off screen
 * or the tab is hidden.
 */

/**
 * Scroll bands on the 0..1 progress axis.
 *
 * They deliberately OVERLAP. Discrete bands with holds between them made the
 * section read as move-stop-move-stop; here the second morph begins while the
 * scan is still sweeping, and the scan begins before the lattice has finished
 * locking, so at no point in the scroll is nothing happening.
 */
const MORPH_1 = [0.10, 0.44] as const; // chaos -> lattice
const MORPH_2 = [0.52, 0.88] as const; // lattice -> gem
const SCAN = [0.34, 0.62] as const; // scan sweep, bridging the two morphs

export default function DataSculpture({
  progress,
  className = '',
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const ctx = context;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ------------------------------------------------------------ geometry */

    const lattice = cubeLattice(4, 0.92);
    const stone = gem();

    // Particle budget scales with canvas size (set in layout()).
    let particleCount = 0;
    let chaos: Vec3[] = [];
    let latticeTargets: Vec3[] = [];
    let gemTargets: Vec3[] = [];
    /** Random per-particle phase for jitter and sparkle. */
    let phases: number[] = [];
    /** Random chaos-cloud link pairs, drawn only while chaos dominates. */
    let chaosLinks: Array<[number, number]> = [];

    const seedParticles = (count: number) => {
      if (count === particleCount) return;
      particleCount = count;
      const rnd = createRandom(7331);

      chaos = chaosCloud(count, 42);
      phases = Array.from({ length: count }, () => rnd() * Math.PI * 2);

      // Vertices first (so structural edges can index particles directly),
      // the remainder beaded along the shape's own edges.
      latticeTargets = chaos.map((_, i) =>
        i < lattice.points.length ? lattice.points[i] : pointOnRandomEdge(lattice, rnd),
      );
      gemTargets = chaos.map((_, i) =>
        i < stone.points.length ? stone.points[i] : pointOnRandomEdge(stone, rnd),
      );

      chaosLinks = [];
      for (let i = 0; i < Math.floor(count * 0.4); i++) {
        chaosLinks.push([Math.floor(rnd() * count), Math.floor(rnd() * count)]);
      }
    };

    /* -------------------------------------------------------------- layout */

    let width = 0;
    let height = 0;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles(width < 420 ? 150 : 230);
      if (reduceMotion) draw(0);
    };

    /* -------------------------------------------------------------- render */

    // Scratch buffers reused every frame -- no per-frame allocation.
    let projX: Float32Array = new Float32Array(0);
    let projY: Float32Array = new Float32Array(0);
    let projS: Float32Array = new Float32Array(0);
    let modelY: Float32Array = new Float32Array(0);

    const draw = (time: number) => {
      if (projX.length !== particleCount) {
        projX = new Float32Array(particleCount);
        projY = new Float32Array(particleCount);
        projS = new Float32Array(particleCount);
        modelY = new Float32Array(particleCount);
      }

      const p = Math.min(1, Math.max(0, progress.get()));
      // Quintic easing: the morphs have no perceptible start or stop.
      const morph1 = smootherstep(p, MORPH_1[0], MORPH_1[1]);
      const morph2 = smootherstep(p, MORPH_2[0], MORPH_2[1]);

      const color = mixRgb(mixRgb(PALETTE.stone, PALETTE.copper, morph1), PALETTE.brass, morph2);

      ctx.clearRect(0, 0, width, height);

      // Ambient glow behind the finished gem.
      if (morph2 > 0.01) {
        const pulse = reduceMotion ? 1 : 0.85 + Math.sin(time * 0.0016) * 0.15;
        const radius = Math.min(width, height) * 0.42;
        const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius);
        glow.addColorStop(0, rgba(PALETTE.brass, 0.22 * morph2 * pulse));
        glow.addColorStop(1, rgba(PALETTE.brass, 0));
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // The sculpture turns with the scroll and keeps a slow idle spin.
      const idle = reduceMotion ? 0 : time;
      const ay = idle * 0.00016 + p * Math.PI * 1.6 + 0.5;
      const ax = -0.42 + p * 0.55 + (reduceMotion ? 0 : Math.sin(time * 0.00011) * 0.05);
      // Continuous slow push-in across the whole section plus a little extra as
      // the gem forms: the frame is always creeping, never parked.
      const scale = Math.min(width, height) * (0.285 + p * 0.022 + morph2 * 0.038);
      const cx = width / 2;
      const cy = height / 2;

      const jitterAmp = (1 - morph1) * 0.05;
      const scanActive = morph1 * (1 - morph2);
      const scanY = lerp(1.15, -1.15, smoothstep(p, SCAN[0], SCAN[1]));

      for (let i = 0; i < particleCount; i++) {
        let pos = lerpVec(chaos[i], latticeTargets[i], morph1);
        pos = lerpVec(pos, gemTargets[i], morph2);

        if (jitterAmp > 0.002 && !reduceMotion) {
          const ph = phases[i];
          pos = {
            x: pos.x + Math.sin(time * 0.0012 + ph) * jitterAmp,
            y: pos.y + Math.cos(time * 0.001 + ph * 1.7) * jitterAmp,
            z: pos.z + Math.sin(time * 0.0009 + ph * 2.3) * jitterAmp,
          };
        }

        modelY[i] = pos.y;
        const proj = project(rotatePoint(pos, ax, ay), cx, cy, scale);
        projX[i] = proj.x;
        projY[i] = proj.y;
        projS[i] = proj.s;
      }

      /* Chaos links: frayed connections that dissolve as order emerges. */
      const chaosAlpha = (1 - morph1) * 0.16;
      if (chaosAlpha > 0.01) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(color, chaosAlpha);
        ctx.beginPath();
        for (const [a, b] of chaosLinks) {
          ctx.moveTo(projX[a], projY[a]);
          ctx.lineTo(projX[b], projY[b]);
        }
        ctx.stroke();
      }

      /* Lattice bars: assemble during refinement, dissolve in the first half
         of the gem morph -- while the particles are in flight, no structure
         claims them. */
      const latticeAlpha = morph1 * (1 - smoothstep(morph2, 0, 0.5)) * 0.34;
      if (latticeAlpha > 0.01) {
        ctx.lineWidth = 1;
        for (const edge of lattice.edges) {
          const depth = (projS[edge.a] + projS[edge.b]) / 2;
          ctx.strokeStyle = rgba(color, latticeAlpha * (0.4 + (depth - 0.8) * 1.1));
          ctx.beginPath();
          ctx.moveTo(projX[edge.a], projY[edge.a]);
          ctx.lineTo(projX[edge.b], projY[edge.b]);
          ctx.stroke();
        }
      }

      /* Gem facets: crystallise only once the particles are nearly seated,
         otherwise the edges join vertices that are still mid-flight and the
         cut reads as a tangle. */
      const facetAlpha = smoothstep(morph2, 0.55, 1);
      if (facetAlpha > 0.01) {
        ctx.lineWidth = 1.2;
        for (const edge of stone.edges) {
          const depth = (projS[edge.a] + projS[edge.b]) / 2;
          ctx.strokeStyle = rgba(PALETTE.brass, facetAlpha * (0.32 + (depth - 0.8) * 1.35));
          ctx.beginPath();
          ctx.moveTo(projX[edge.a], projY[edge.a]);
          ctx.lineTo(projX[edge.b], projY[edge.b]);
          ctx.stroke();
        }
      }

      /* Scan plane: a highlight sweeping down the lattice in model space. */
      if (scanActive > 0.01 && scanY > -1.14 && scanY < 1.14) {
        const left = project(rotatePoint({ x: -1.35, y: scanY, z: 0 }, ax, ay), cx, cy, scale);
        const right = project(rotatePoint({ x: 1.35, y: scanY, z: 0 }, ax, ay), cx, cy, scale);
        const beam = ctx.createLinearGradient(left.x, left.y, right.x, right.y);
        beam.addColorStop(0, rgba(PALETTE.bone, 0));
        beam.addColorStop(0.5, rgba(PALETTE.bone, 0.5 * scanActive));
        beam.addColorStop(1, rgba(PALETTE.bone, 0));
        ctx.strokeStyle = beam;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(left.x, left.y);
        ctx.lineTo(right.x, right.y);
        ctx.stroke();
      }

      /* Particles, depth-shaded; scan-lit while the plane passes; sparkling
         once the gem is cut. */
      for (let i = 0; i < particleCount; i++) {
        const s = projS[i];
        let alpha = 0.36 + (s - 0.78) * 1.15;
        let radius = 1.3 * s;

        if (scanActive > 0.01 && Math.abs(modelY[i] - scanY) < 0.14) {
          alpha = Math.min(1, alpha + 0.65 * scanActive);
          radius += 0.7 * scanActive;
        }
        if (morph2 > 0.3 && !reduceMotion) {
          const sparkle = Math.max(0, Math.sin(time * 0.003 + phases[i] * 5));
          alpha = Math.min(1, alpha + sparkle * sparkle * 0.4 * morph2);
        }

        ctx.fillStyle = rgba(color, Math.max(0.05, alpha));
        ctx.beginPath();
        ctx.arc(projX[i], projY[i], radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* -------------------------------------------------------- loop control */

    let frame = 0;
    let running = false;
    let onScreen = true;

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
    // Reduced motion: no loop -- redraw only when the scroll position changes.
    const unsubscribe = reduceMotion ? progress.on('change', () => draw(0)) : undefined;
    if (!reduceMotion) sync();

    return () => {
      stop();
      unsubscribe?.();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [progress]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />;
}

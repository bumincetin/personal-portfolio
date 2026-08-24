'use client';

import { useEffect, useRef } from 'react';

/**
 * Drifting-node constellation field.
 *
 * Ported from the ThreeUI "constellation-field" scene
 * (github.com/MengTo/threeui, MIT) and adapted for this site. The upstream
 * version ships as a standalone HTML document rendered inside an iframe; this
 * is a direct React port of its 2D-canvas renderer, which keeps the look while
 * removing the iframe, the CDN script tags and the second copy of the runtime.
 *
 * It replaces the previous three.js + @react-three/fiber + @react-three/drei +
 * gsap background, which pulled ~750KB of JS onto every route to render a
 * torus knot that was almost entirely hidden behind opaque sections.
 *
 * Local changes, all in service of not re-introducing the lag:
 *  - the loop is suspended when the field scrolls out of view or the tab is
 *    hidden, so it burns nothing in the background;
 *  - device pixel ratio is capped and node count scales with viewport area;
 *  - link candidates come from a uniform spatial grid rather than an all-pairs
 *    sweep, so density is bounded by the link radius rather than by node count;
 *  - `prefers-reduced-motion` paints a single static frame and stops.
 */

const BRASS = '192, 138, 62';
const COPPER = '161, 124, 88';

/** Nodes closer than this (in CSS px) get a connecting line. */
const LINK_RADIUS = 158;
const LINK_RADIUS_SQ = LINK_RADIUS * LINK_RADIUS;
/** Radius of the pointer's attraction well, in CSS px. */
const POINTER_RADIUS = 220;
const POINTER_RADIUS_SQ = POINTER_RADIUS * POINTER_RADIUS;
const POINTER_PULL = 0.005;
/** One node per this many square px, so density reads the same on any screen. */
const AREA_PER_NODE = 26000;
const MAX_NODES = 90;
const MIN_NODES = 26;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  /** Per-node phase offset, so the halo pulses are not in lockstep. */
  phase: number;
};

export default function ConstellationField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    // Non-null within the closures below; `context` is narrowed here.
    const ctx = context;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = false;
    let onScreen = true;

    const pointer = { x: -9999, y: -9999, active: false };

    /* ---------------------------------------------------------------- setup */

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      // A hidden container can report 0; keep the last good size in that case.
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed();

      // With motion suppressed nothing else will ever repaint, so the single
      // static frame has to be drawn here -- including on the first layout
      // pass, when the element may not have had a size yet at mount.
      if (reduceMotion) draw(0);
    };

    const seed = () => {
      const target = Math.round((width * height) / AREA_PER_NODE);
      const count = Math.max(MIN_NODES, Math.min(MAX_NODES, target));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1.1,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    /* --------------------------------------------------------------- render */

    // Uniform grid over the canvas, rebuilt each frame. Cells are one link
    // radius wide, so every possible neighbour sits in the 3x3 block around a
    // node and we never test the far side of the screen.
    const linkNodes = () => {
      const cols = Math.max(1, Math.ceil(width / LINK_RADIUS));
      const rows = Math.max(1, Math.ceil(height / LINK_RADIUS));
      const buckets: number[][] = Array.from({ length: cols * rows }, () => []);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const col = Math.min(cols - 1, Math.max(0, Math.floor(node.x / LINK_RADIUS)));
        const row = Math.min(rows - 1, Math.max(0, Math.floor(node.y / LINK_RADIUS)));
        buckets[row * cols + col].push(i);
      }

      ctx.lineWidth = 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = buckets[row * cols + col];
          if (cell.length === 0) continue;

          for (let dRow = 0; dRow <= 1; dRow++) {
            for (let dCol = -1; dCol <= 1; dCol++) {
              // Visit each neighbour pair once: this cell, then the half-ring
              // below/right of it.
              if (dRow === 0 && dCol < 0) continue;
              const nRow = row + dRow;
              const nCol = col + dCol;
              if (nRow >= rows || nCol < 0 || nCol >= cols) continue;

              const other = buckets[nRow * cols + nCol];
              const sameCell = dRow === 0 && dCol === 0;

              for (let a = 0; a < cell.length; a++) {
                const nodeA = nodes[cell[a]];
                for (let b = sameCell ? a + 1 : 0; b < other.length; b++) {
                  const nodeB = nodes[other[b]];
                  const dx = nodeA.x - nodeB.x;
                  const dy = nodeA.y - nodeB.y;
                  const distanceSq = dx * dx + dy * dy;
                  if (distanceSq >= LINK_RADIUS_SQ) continue;

                  const closeness = 1 - Math.sqrt(distanceSq) / LINK_RADIUS;
                  ctx.strokeStyle = `rgba(${BRASS}, ${(0.05 + closeness * 0.22).toFixed(3)})`;
                  ctx.beginPath();
                  ctx.moveTo(nodeA.x, nodeA.y);
                  ctx.lineTo(nodeB.x, nodeB.y);
                  ctx.stroke();
                }
              }
            }
          }
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      linkNodes();

      for (const node of nodes) {
        // Halo, then core -- the two-pass fill is what makes the nodes read
        // as points of light rather than flat dots at retina scale.
        const pulse = 0.6 + Math.sin(time * 0.001 + node.phase) * 0.22;
        const near = pointer.active && sqDistanceToPointer(node) < POINTER_RADIUS_SQ;
        const tint = near ? COPPER : BRASS;

        ctx.fillStyle = `rgba(${tint}, ${(pulse * 0.16).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${tint}, ${(pulse * 0.85).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const sqDistanceToPointer = (node: Node) => {
      const dx = node.x - pointer.x;
      const dy = node.y - pointer.y;
      return dx * dx + dy * dy;
    };

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        if (pointer.active && sqDistanceToPointer(node) < POINTER_RADIUS_SQ) {
          node.x -= (node.x - pointer.x) * POINTER_PULL;
          node.y -= (node.y - pointer.y) * POINTER_PULL;
        }
      }
    };

    /* ----------------------------------------------------------- loop control */

    const tick = (time: number) => {
      step();
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

    /* -------------------------------------------------------------- listeners */

    const handlePointerMove = (event: PointerEvent) => {
      // The canvas is fixed to the viewport, so client coords map directly.
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = event.pointerType === 'mouse';
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const resizeObserver = new ResizeObserver(() => layout());
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', sync);

    // `layout` paints the static frame itself when motion is suppressed; the
    // field is part of the composition either way, it just does not move.
    layout();
    if (!reduceMotion) sync();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  // z-0 rather than a negative index: the field must sit above the page
  // background but below the content, which carries z-10.
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 ${className}`} aria-hidden="true">
      {/* Radial ground: lifts the centre of the viewport out of pure black. */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, #1A1411 0%, #100C0A 70%)' }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Depth vignette, so content lower on the page sits on solid ground. */}
      <div className="field-vignette absolute inset-0" />
    </div>
  );
}

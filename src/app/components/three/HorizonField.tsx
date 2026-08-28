'use client';

import { useEffect, useRef } from 'react';
import { PALETTE, refreshPalette, canvasAlpha, rgba } from './engine';
import { onThemeChange } from '@/lib/theme';

/**
 * Perspective floor for the hero, after ThreeUI's "Emerald Horizon" scene
 * (github.com/MengTo/threeui, MIT) -- re-drawn on Canvas 2D in brass.
 *
 * Upstream is a fullscreen GLSL quad: a horizon line at the top, two sine
 * terms rippling it, and an intensity that falls off with height. Here the
 * same ripple displaces the latitude lines of a receding grid, so the floor
 * reads as a surface with a slow swell moving across it. Alpha rises toward
 * the viewer and dies at the vanishing point, and the whole thing sits under
 * a ground-coloured gradient so only the far half shows through.
 *
 * Runs only while on screen; reduced motion paints one frame.
 */

const LONGITUDES = 26;
const LATITUDES = 18;

export default function HorizonField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const ctx = context;

    refreshPalette();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let onScreen = true;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;
      const alpha = canvasAlpha.value;
      const vpX = width / 2;
      const horizon = height * 0.04;
      const floor = height;

      // Latitude rows: perspective spacing, denser toward the horizon.
      const rowY = (k: number) => horizon + (floor - horizon) * Math.pow(k, 2.4);
      // Ripple displacement in normalised units, scaled by nearness.
      const swell = (nx: number, k: number) =>
        (Math.sin(nx * 3 + t * 0.5) * 0.1 + Math.sin(nx * 5 - t * 0.3) * 0.05) * k * height * 0.22;

      ctx.lineWidth = 1;

      for (let r = 1; r <= LATITUDES; r++) {
        const k = r / LATITUDES;
        const y = rowY(k);
        const spread = 0.5 + k * 1.6;
        const a = (0.04 + k * 0.22) * alpha;
        ctx.strokeStyle = rgba(PALETTE.brass, a);
        ctx.beginPath();
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const nx = (i / steps) * 2 - 1;
          const x = vpX + nx * width * spread;
          const yy = y + swell(nx * 2, k);
          if (i === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }

      // Longitudes converge on the vanishing point.
      for (let c = 0; c <= LONGITUDES; c++) {
        const nx = (c / LONGITUDES) * 2 - 1;
        const grad = ctx.createLinearGradient(0, horizon, 0, floor);
        grad.addColorStop(0, rgba(PALETTE.brass, 0));
        grad.addColorStop(1, rgba(PALETTE.brass, 0.2 * alpha));
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(vpX + nx * width * 0.08, horizon);
        ctx.lineTo(vpX + nx * width * 2.1, floor);
        ctx.stroke();
      }

      // Horizon glow: the light source the whole floor is lit by.
      const glow = ctx.createRadialGradient(vpX, horizon, 0, vpX, horizon, width * 0.45);
      glow.addColorStop(0, rgba(PALETTE.brass, 0.16));
      glow.addColorStop(1, rgba(PALETTE.brass, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
    sync();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', sync);
      unsubscribe();
    };
  }, []);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />;
}

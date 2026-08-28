'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Decode reveal for mono labels, ported from ThreeUI's article-heading
 * scramble (github.com/MengTo/threeui, MIT).
 *
 * Characters resolve left to right on an eased budget; the ten ahead of the
 * cursor churn through a glyph pool, and a few in the tail flicker early.
 * The plain string is always in the DOM for assistive tech and reduced motion;
 * the churn is painted into a visually identical span on top.
 */

const POOL = '#%&@$/\\<>*+=~ABCDEFGHKMNPRSTUVWXYZ0123456789';
const SCRAMBLE = 10;
const PRESERVE = 0.3;
const TAIL = 0.18;

export default function DecodeText({
  text,
  duration = 720,
  delay = 0,
  className = '',
  as,
}: {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const Component = (as ?? 'span') as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const budget = Math.floor((1 - Math.pow(1 - progress, 2)) * text.length);
        if (budget >= text.length) {
          setShown(null);
          return;
        }
        let out = text.slice(0, budget);
        const n = Math.min(text.length - budget, SCRAMBLE);
        for (let i = 0; i < n; i++) {
          const c = text[budget + i];
          out += c === ' ' || Math.random() < PRESERVE ? c : POOL[(Math.random() * POOL.length) | 0];
        }
        out += text.slice(budget + n).replace(/\S/g, (c) => (Math.random() < TAIL ? POOL[(Math.random() * POOL.length) | 0] : c));
        setShown(out);
        frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(run, delay);
      },
      { threshold: 0.2 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [text, duration, delay]);

  return (
    <Component ref={ref} className={`relative inline-block ${className}`}>
      <span className={shown === null ? '' : 'invisible'}>{text}</span>
      {shown !== null && (
        <span className="absolute inset-0 whitespace-nowrap" aria-hidden="true">
          {shown}
        </span>
      )}
    </Component>
  );
}

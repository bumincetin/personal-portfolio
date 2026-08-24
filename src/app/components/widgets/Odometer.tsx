'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Mechanical odometer roll-up for stat tiles.
 *
 * Each digit is a vertical strip of 0-9 translated to the target numeral, so
 * the count-up reads as drums rolling into place rather than text mutating.
 * The roll starts when the element scrolls into view and runs once. Reduced
 * motion renders the final value immediately. Non-numeric values ("∞", "+")
 * pass through as static glyphs.
 */

const DIGIT_HEIGHT = 1; // em

function DigitDrum({ digit, delay, animate }: { digit: number; delay: number; animate: boolean }) {
  const [offset, setOffset] = useState(animate ? 0 : digit);

  useEffect(() => {
    if (!animate) return;
    const timer = setTimeout(() => setOffset(digit), delay);
    return () => clearTimeout(timer);
  }, [animate, digit, delay]);

  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ height: `${DIGIT_HEIGHT}em` }}
      aria-hidden="true"
    >
      <span
        className="block transition-transform duration-[900ms] ease-luxe"
        style={{ transform: `translateY(${-offset * DIGIT_HEIGHT}em)` }}
      >
        {Array.from({ length: 10 }, (_, numeral) => (
          <span key={numeral} className="block" style={{ height: `${DIGIT_HEIGHT}em`, lineHeight: `${DIGIT_HEIGHT}em` }}>
            {numeral}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Odometer({ value, className = '' }: { value: string; className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={rootRef} className={className}>
      {/* Screen readers get the plain value; the drums are decoration. */}
      <span className="sr-only">{value}</span>
      {value.split('').map((char, index) =>
        /\d/.test(char) && !reduced ? (
          <DigitDrum key={index} digit={Number(char)} delay={140 + index * 160} animate={armed} />
        ) : (
          <span key={index} aria-hidden="true">
            {char}
          </span>
        ),
      )}
    </span>
  );
}

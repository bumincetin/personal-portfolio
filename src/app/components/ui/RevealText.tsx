'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Masked, staggered word reveal -- ThreeUI's headline treatment.
 *
 * Upstream this is done with GSAP: the text node is split at runtime, each word
 * is wrapped in an overflow-hidden span, and a ScrollTrigger timeline slides
 * them up. This port keeps the effect and drops the 70KB dependency: the words
 * are split at render time and the stagger is a CSS `transition-delay` ramp.
 */

type RevealTextProps<T extends React.ElementType> = {
  as?: T;
  text: string;
  /** Milliseconds between consecutive words. */
  stagger?: number;
  /** Milliseconds before the first word moves. */
  delay?: number;
  className?: string;
};

export default function RevealText<T extends React.ElementType = 'span'>({
  as,
  text,
  stagger = 45,
  delay = 0,
  className = '',
  ...rest
}: RevealTextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof RevealTextProps<T>>) {
  const Component = (as ?? 'span') as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Newlines are honoured as hard breaks so callers can shape the ragged edge.
  const lines = useMemo(
    () => text.split('\n').map((line) => line.split(/\s+/).filter(Boolean)),
    [text],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let wordIndex = -1;

  return (
    <Component ref={ref} data-revealed={revealed} className={className} {...rest}>
      {lines.map((words, lineNumber) => (
        <React.Fragment key={lineNumber}>
          {lineNumber > 0 && <br />}
          {words.map((word, position) => {
            wordIndex += 1;
            return (
              <React.Fragment key={`${lineNumber}-${position}`}>
                <span className="reveal-mask">
                  <span
                    className="reveal-word"
                    style={{ '--word-delay': `${delay + wordIndex * stagger}ms` } as React.CSSProperties}
                  >
                    {word}
                  </span>
                </span>
                {position < words.length - 1 && ' '}
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ))}
    </Component>
  );
}

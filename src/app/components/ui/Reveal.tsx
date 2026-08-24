'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered entrance, ported from the IntersectionObserver pattern the
 * ThreeUI scenes use for their `.fade-in-up` elements.
 *
 * This exists so the common "fade up when it scrolls into view" case does not
 * need framer-motion. `whileInView` subscribes every element to a scroll
 * listener and animates through React; here the observer fires once, flips a
 * data attribute, and CSS does the rest on the compositor.
 */

type RevealProps<T extends React.ElementType> = {
  as?: T;
  /** Milliseconds to hold before this element starts moving. */
  delay?: number;
  /** Fraction of the element that must be visible before it triggers. */
  threshold?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function Reveal<T extends React.ElementType = 'div'>({
  as,
  delay = 0,
  threshold = 0.15,
  className = '',
  children,
  ...rest
}: RevealProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof RevealProps<T>>) {
  const Component = (as ?? 'div') as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Anything already on screen at mount should not wait for a scroll event.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Component
      ref={ref}
      data-revealed={revealed}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  );
}

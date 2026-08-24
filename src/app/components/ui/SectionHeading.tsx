'use client';

import React from 'react';
import Reveal from './Reveal';
import RevealText from './RevealText';

/**
 * The eyebrow used throughout the site: a short gold rule followed by a
 * wide-tracked mono label. ThreeUI leans on this pairing to give a section a
 * technical register without adding another type size.
 */
export function MicroLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">{children}</span>
    </span>
  );
}

/** Eyebrow + ultralight display heading + optional supporting line. */
export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className = '',
}: {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'flex flex-col items-center text-center' : ''} ${className}`}>
      {label && (
        <Reveal className="mb-5">
          <MicroLabel>{label}</MicroLabel>
        </Reveal>
      )}

      <RevealText
        as="h2"
        text={title}
        className="text-heading text-charcoal"
        stagger={40}
      />

      {description && (
        <Reveal delay={140} className={`mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-muted ${centered ? 'mx-auto' : ''}`}>
          {description}
        </Reveal>
      )}
    </div>
  );
}

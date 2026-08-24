'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Gradient-border shell control, ported from ThreeUI.
 *
 * The upstream pattern is a 1px-padded wrapper carrying a diagonal gradient
 * with an opaque pill nested inside it, which gives the edge a lit corner that
 * fades out rather than a flat stroke. `primary` fills the pill with gold;
 * `secondary` leaves it glassy so the constellation field reads through.
 */

type Variant = 'primary' | 'secondary';

const SHELL: Record<Variant, string> = {
  primary: 'bg-[linear-gradient(135deg,rgba(230,200,121,0.55),rgba(230,200,121,0.05)_60%,transparent)]',
  secondary: 'bg-[linear-gradient(135deg,rgba(230,200,121,0.22),rgba(230,200,121,0.02)_60%,transparent)]',
};

const FACE: Record<Variant, string> = {
  primary: 'bg-accent text-cream hover:bg-[#F0D68F]',
  secondary: 'bg-surface/70 text-charcoal backdrop-blur-md hover:bg-surface-raised/85 hover:text-accent',
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

const shellClasses = (variant: Variant, className: string) =>
  `inline-block rounded-full p-px shadow-card transition-shadow duration-300 hover:shadow-card-hover ${SHELL[variant]} ${className}`;

const faceClasses = (variant: Variant) =>
  `flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300 ${FACE[variant]}`;

export function ShellLink({
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}: BaseProps & { href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>) {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#');

  const face = <span className={faceClasses(variant)}>{children}</span>;

  if (external) {
    return (
      <a href={href} className={shellClasses(variant, className)} {...(rest as React.ComponentPropsWithoutRef<'a'>)}>
        {face}
      </a>
    );
  }

  return (
    <Link href={href} className={shellClasses(variant, className)} {...rest}>
      {face}
    </Link>
  );
}

export function ShellButton({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: BaseProps & Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'children'>) {
  return (
    <button type="button" className={shellClasses(variant, className)} {...rest}>
      <span className={faceClasses(variant)}>{children}</span>
    </button>
  );
}

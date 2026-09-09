import React from 'react';
import { FlaskConical, Wrench, Building2, Handshake, Package, Beaker, Info, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/lib/translations';
import type { Maturity } from '@/lib/content/case-studies';
import { getUI } from '@/lib/content/ui';

/**
 * Maturity and provenance labels.
 *
 * These are the site's most load-bearing pieces of copy: they are what stops a
 * research prototype reading as a deployed product and a synthetic
 * demonstration reading as a client result. Two design consequences follow.
 *
 * First, they are never colour-only. Each carries an icon and a word, so the
 * distinction survives greyscale, colour blindness and a printout.
 *
 * Second, the description is always available, not just on hover: it renders as
 * a `title` for pointer users and, where the surface has room, as visible text
 * beneath. A label a reader cannot expand is a label that can be misread.
 */

const MATURITY_ICON: Record<Maturity, LucideIcon> = {
  research: FlaskConical,
  prototype: Wrench,
  'internal-deployment': Building2,
  'client-engagement': Handshake,
  'maintained-product': Package,
  'synthetic-demo': Beaker,
};

/**
 * Synthetic work is visually distinct from everything else on purpose — it is
 * the one label whose misreading would be a false claim about client work.
 */
const MATURITY_TONE: Record<Maturity, string> = {
  research: 'border-border-dark bg-surface text-charcoal',
  prototype: 'border-border-dark bg-surface text-charcoal',
  'internal-deployment': 'border-accent/40 bg-accent/10 text-accent',
  'client-engagement': 'border-accent/40 bg-accent/10 text-accent',
  'maintained-product': 'border-positive/40 bg-positive/10 text-positive',
  'synthetic-demo': 'border-caution/50 bg-caution/10 text-caution',
};

export function MaturityBadge({
  maturity,
  locale,
  showDescription = false,
  className = '',
}: {
  maturity: Maturity;
  locale: Locale;
  showDescription?: boolean;
  className?: string;
}) {
  const ui = getUI(locale);
  const entry = ui.maturity[maturity];
  const Icon = MATURITY_ICON[maturity];

  return (
    <span className={className}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.75rem] font-medium ${MATURITY_TONE[maturity]}`}
        title={entry.description}
      >
        <Icon size={13} aria-hidden="true" />
        {entry.label}
      </span>
      {showDescription && <span className="mt-2 block text-[0.8125rem] leading-relaxed text-muted">{entry.description}</span>}
    </span>
  );
}

export type ProvenanceKind = 'synthetic' | 'interactive' | 'recorded' | 'live';

/**
 * How a number on screen came to exist. Applied to every demo, chart and
 * figure, because "live" was previously used for a browser-side calculation
 * over invented assumptions — which is three categories away from live data.
 */
export function ProvenanceBadge({
  kind,
  locale,
  detail,
  className = '',
}: {
  kind: ProvenanceKind;
  locale: Locale;
  /** Overrides the generic hint where a surface can be more specific. */
  detail?: string;
  className?: string;
}) {
  const ui = getUI(locale);

  const label =
    kind === 'synthetic'
      ? ui.labels.synthetic
      : kind === 'interactive'
        ? ui.labels.interactiveCalculation
        : kind === 'recorded'
          ? ui.labels.recordedExample
          : ui.labels.liveData;

  const hint =
    detail ?? (kind === 'synthetic' ? ui.labels.syntheticHint : kind === 'interactive' ? ui.labels.interactiveHint : '');

  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-md border border-border bg-surface-alt px-3 py-2 ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-charcoal">
        <Info size={12} aria-hidden="true" className="text-accent" />
        {label}
      </span>
      {hint && <span className="text-[0.8125rem] leading-snug text-muted">{hint}</span>}
    </span>
  );
}

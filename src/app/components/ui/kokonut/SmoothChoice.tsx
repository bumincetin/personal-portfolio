'use client';

/**
 * Adapted from Kokonut UI Smooth Tab by Dorian Baffier (MIT).
 * Source and license: vendor/kokonutui/. Uses native radio inputs for choices,
 * a shared layout indicator for wrapped grids, and the portfolio's palette.
 */
import { useId } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

export default function SmoothChoice<T extends string>({ label, value, options, onChange, columns = 2 }: {
  label: string;
  value: T;
  options: { id: T; label: string; icon?: LucideIcon; hint?: string }[];
  onChange: (id: T) => void;
  columns?: 1 | 2;
}) {
  const id = useId();
  const reduced = useReducedMotion();
  return <LayoutGroup id={id}>
    {/* Each decorative book-page copy needs its own radio form owner. */}
    <form onSubmit={event => event.preventDefault()}>
    <div role="radiogroup" aria-label={label} className={`grid gap-1.5 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {options.map(option => {
        const selected = value === option.id;
        const Icon = option.icon;
        return <motion.label key={option.id} title={option.hint}
          whileHover={reduced ? undefined : { y: -1 }} whileTap={reduced ? undefined : { scale: 0.98 }}
          className={`relative isolate flex min-h-11 cursor-pointer items-center gap-2 rounded-editorial border px-2.5 py-2 text-left ${selected ? 'border-accent/60 text-charcoal' : 'border-border bg-surface-alt/60 text-muted hover:text-charcoal'}`}>
          <input type="radio" name={id} value={option.id} checked={selected} onChange={() => onChange(option.id)}
            className="peer sr-only" />
          <span className="pointer-events-none absolute -inset-1 rounded-editorial peer-focus-visible:ring-2 peer-focus-visible:ring-accent" aria-hidden="true" />
          {selected && <motion.span layoutId="selection" className="pointer-events-none absolute inset-0 -z-10 rounded-editorial bg-accent/10"
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }} aria-hidden="true" />}
          {Icon && <Icon size={13} className={`shrink-0 ${selected ? 'text-accent' : 'text-muted-light'}`} aria-hidden="true" />}
          <span className="font-sans text-xs leading-tight">{option.label}</span>
        </motion.label>;
      })}
    </div>
    </form>
  </LayoutGroup>;
}

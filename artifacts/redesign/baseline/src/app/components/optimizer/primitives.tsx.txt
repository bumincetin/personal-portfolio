'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

/** Panel chrome: a terminal-style label row with a hairline underneath. */
export function PanelTitle({ icon: Icon, title, hint }: { icon: LucideIcon; title: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
      <div className="flex items-center gap-2 min-w-0">
        <Icon size={14} className="text-accent shrink-0" aria-hidden="true" />
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal leading-snug">{title}</h3>
      </div>
      {hint ? <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-muted-light truncate">{hint}</span> : null}
    </div>
  );
}

export function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface border border-border rounded-editorial shadow-hairline flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  value,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-1.5">
      <label htmlFor={htmlFor} className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {children}
      </label>
      {value !== undefined ? <span className="font-mono text-xs text-charcoal tabular-nums">{value}</span> : null}
    </div>
  );
}

export function Swatch({ color, className = '' }: { color: string; className?: string }) {
  return <span aria-hidden="true" className={`inline-block w-2.5 h-2.5 rounded-[2px] shrink-0 ${className}`} style={{ background: color }} />;
}

/** Native range input, styled through accent-color so it follows the theme. */
export function Slider(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="range"
      {...props}
      className={`w-full h-1.5 cursor-pointer accent-accent bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded ${props.className ?? ''}`}
    />
  );
}

/** Kokonut UI selector, adapted to native radio inputs. */
export { default as SegmentedChoice } from '../ui/kokonut/SmoothChoice';

import React from 'react';

/**
 * A horizontally scrollable region a keyboard can actually reach.
 *
 * Dense content — a wide figure, a table, a block of source rows — is allowed
 * to scroll inside its own bounds so the page body never does. But a scroll
 * container that is not focusable strands its overflow for anyone not using a
 * pointer, which axe reports as `scrollable-region-focusable` and which is a
 * real barrier rather than a technicality.
 *
 * `tabIndex={0}` makes it focusable so arrow keys scroll it; `role="group"`
 * plus a label means a screen reader announces what the region contains rather
 * than dropping the reader into an unnamed box.
 */
export default function ScrollRegion({
  label,
  className = '',
  children,
}: {
  /** What the region contains. It is announced, so it must be meaningful. */
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`scroll-x ${className}`} tabIndex={0} role="group" aria-label={label}>
      {children}
    </div>
  );
}

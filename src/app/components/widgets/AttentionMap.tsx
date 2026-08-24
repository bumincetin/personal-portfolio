'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Interactive multi-head attention visualizer over a corporate-disclosure
 * excerpt -- the working demo of the greenwashing-detection research.
 *
 * Hovering or focusing a word highlights the tokens it attends to and draws
 * bezier connection arcs between them in an SVG overlay. Arc endpoints are
 * measured from the live DOM (so the text can wrap freely at any width) and
 * only remeasured when the active word or the layout changes. A confidence
 * panel alongside reads out the model's risk terms.
 *
 * The attention table is hand-distilled from the kind of pattern the research
 * flags: commitment verbs attending to distant dates and vague quantifiers
 * rather than to concrete mechanisms.
 */

const WORDS = [
  'We', 'are', 'committed', 'to', 'achieving', 'net-zero', 'emissions',
  'across', 'our', 'entire', 'value', 'chain', 'by', '2050.',
];

/** attention[i]: [target index, weight 0..1] pairs for word i. */
const ATTENTION: Record<number, Array<[number, number]>> = {
  2: [[13, 0.92], [4, 0.71], [5, 0.55]],       // committed -> 2050, achieving
  4: [[5, 0.88], [13, 0.79], [2, 0.5]],        // achieving -> net-zero, 2050
  5: [[6, 0.9], [13, 0.62], [4, 0.55]],        // net-zero -> emissions, 2050
  6: [[5, 0.9], [11, 0.44]],                   // emissions -> net-zero, chain
  9: [[10, 0.7], [11, 0.82], [2, 0.35]],       // entire -> value chain
  11: [[10, 0.9], [9, 0.6], [6, 0.4]],         // chain -> value, entire
  13: [[2, 0.93], [4, 0.66]],                  // 2050 -> committed
};

/** Words the model scores as risk drivers, and why. */
const RISK_TERMS: Record<number, string> = {
  2: 'commitment verb, no mechanism',
  9: 'unbounded quantifier',
  13: 'horizon > 25y, no interim target',
};

type Arc = { d: string; weight: number };

export default function AttentionMap({
  labels,
  className = '',
}: {
  labels: { title: string; verdict: string; hint: string };
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [arcs, setArcs] = useState<Arc[]>([]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || active === null || !ATTENTION[active]) {
      setArcs([]);
      return;
    }
    const origin = container.getBoundingClientRect();
    const centerOf = (index: number) => {
      const el = wordRefs.current[index];
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - origin.left,
        top: rect.top - origin.top,
        bottom: rect.bottom - origin.top,
      };
    };

    const from = centerOf(active);
    if (!from) return;

    const next: Arc[] = [];
    for (const [target, weight] of ATTENTION[active]) {
      const to = centerOf(target);
      if (!to) continue;
      // Arc over the text when the words share a line, dip through the gap
      // when they don't; lift scales with span so long arcs clear short ones.
      const sameLine = Math.abs(from.top - to.top) < 4;
      const lift = Math.min(34, 12 + Math.abs(to.x - from.x) * 0.08);
      const y1 = sameLine ? from.top : (from.top + from.bottom) / 2;
      const y2 = sameLine ? to.top : (to.top + to.bottom) / 2;
      const controlY = Math.min(y1, y2) - lift;
      next.push({
        d: `M ${from.x.toFixed(1)} ${y1.toFixed(1)} Q ${((from.x + to.x) / 2).toFixed(1)} ${controlY.toFixed(1)} ${to.x.toFixed(1)} ${y2.toFixed(1)}`,
        weight,
      });
    }
    setArcs(next);
  }, [active]);

  useEffect(() => {
    measure();
    if (active === null) return;
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, measure]);

  const weightFor = (index: number): number => {
    if (active === null) return 0;
    if (active === index) return 1;
    const hit = ATTENTION[active]?.find(([target]) => target === index);
    return hit ? hit[1] : 0;
  };

  // Risk readout tracks the hovered driver; idle state shows the headline.
  const activeRisk = active !== null ? RISK_TERMS[active] : undefined;

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative"
        onPointerLeave={() => setActive(null)}
      >
        {/* Connection arcs live under the words so text stays crisp. */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {arcs.map((arc, index) => (
            <path
              key={index}
              d={arc.d}
              fill="none"
              style={{ stroke: 'rgb(var(--c-brass))' }}
              strokeWidth={0.8 + arc.weight * 1.4}
              opacity={0.25 + arc.weight * 0.55}
            />
          ))}
        </svg>

        <blockquote className="relative flex flex-wrap gap-x-1.5 gap-y-2 text-lg font-light leading-relaxed text-navy md:text-xl">
          {WORDS.map((word, index) => {
            const weight = weightFor(index);
            const risky = index in RISK_TERMS;
            return (
              <button
                key={index}
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                type="button"
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`rounded-[3px] px-0.5 transition-colors duration-200 ${
                  risky ? 'underline decoration-accent/40 decoration-dotted underline-offset-4' : ''
                }`}
                style={{
                  backgroundColor: `rgb(var(--c-brass) / ${(weight * 0.22).toFixed(3)})`,
                  color: weight > 0.05 ? 'rgb(var(--c-brass-hi))' : undefined,
                }}
              >
                {word}
              </button>
            );
          })}
        </blockquote>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-light">{labels.hint}</p>
      </div>

      {/* Confidence panel */}
      <div className="mt-8 border-t border-border pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-light">
              {labels.title}
            </span>
            <span className="mt-1 block font-mono text-sm tracking-[0.04em] text-negative">
              {labels.verdict}
            </span>
            <span className="mt-1 block h-4 font-mono text-[10px] tracking-[0.04em] text-muted">
              {activeRisk ? `⚑ ${activeRisk}` : 'SCI 0.87 · commitment/mechanism divergence'}
            </span>
          </div>

          {/* Risk bar */}
          <div className="min-w-[180px] flex-1 sm:max-w-[260px]">
            <div className="flex items-baseline justify-between font-mono text-[10px] text-muted-light">
              <span>RISK</span>
              <span className="text-base text-accent">87%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full"
                style={{
                  width: '87%',
                  background: 'linear-gradient(90deg, #A17C58, #C08A3E, #C07A6A)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

/**
 * Live tokenizer widget for the AI & NLP card.
 *
 * A sample sentence rendered as sub-word tokens; hovering (or focusing) one
 * lights up the tokens it attends to, with intensity scaled by a small
 * hand-written attention table. Pure DOM and React state -- the state changes
 * only on hover of a token, so this is cheap -- and it degrades to a static
 * token strip with no interaction lost content on touch.
 */

const TOKENS = ['our', 'supply', 'chain', 'is', 'fully', 'carbon', '##-', '##neutral', '.'];

/**
 * attention[i] lists [target, weight] pairs for token i. Weights are the
 * fraction of the highlight; the hovered token itself always reads 1.
 */
const ATTENTION: Array<Array<[number, number]>> = [
  [[1, 0.4], [2, 0.5]],                 // our -> supply chain
  [[2, 0.9], [0, 0.35]],                // supply <-> chain
  [[1, 0.9], [5, 0.4]],                 // chain -> supply, carbon
  [[7, 0.5], [4, 0.4]],                 // is -> neutral, fully
  [[7, 0.85], [5, 0.5]],                // fully -> neutral, carbon
  [[6, 0.8], [7, 0.95], [2, 0.45]],     // carbon -> -neutral, chain
  [[5, 0.9], [7, 0.9]],                 // ##- -> carbon, neutral
  [[5, 0.95], [6, 0.9], [4, 0.6]],      // ##neutral -> carbon, fully
  [[7, 0.3]],                           // . -> neutral
];

export default function Tokenizer({ className = '' }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);

  const weightFor = (index: number): number => {
    if (active === null) return 0;
    if (active === index) return 1;
    const hit = ATTENTION[active].find(([target]) => target === index);
    return hit ? hit[1] : 0;
  };

  return (
    <div className={className}>
      <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-light">
        TOKENIZER · bert-base · L11/H8
      </span>

      <div className="flex flex-wrap gap-1.5" onPointerLeave={() => setActive(null)}>
        {TOKENS.map((token, index) => {
          const weight = weightFor(index);
          return (
            <button
              key={index}
              type="button"
              tabIndex={-1}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="rounded-[3px] border px-1.5 py-0.5 font-mono text-[0.6875rem] transition-colors duration-200"
              style={{
                borderColor: `rgba(192, 138, 62, ${(0.16 + weight * 0.7).toFixed(3)})`,
                backgroundColor: `rgba(192, 138, 62, ${(weight * 0.16).toFixed(3)})`,
                color: weight > 0.05 ? '#E3C089' : '#A8998A',
              }}
            >
              {token}
            </button>
          );
        })}
      </div>

      <div className="mt-3 h-4 font-mono text-[9px] tracking-[0.08em] text-muted-light" aria-live="polite">
        {active !== null ? (
          <>
            attn(<span className="text-accent">{TOKENS[active].replace('##', '')}</span>) → {ATTENTION[active]
              .map(([target, weight]) => `${TOKENS[target].replace('##', '')}:${weight.toFixed(2)}`)
              .join(' ')}
          </>
        ) : (
          'hover a token to inspect attention'
        )}
      </div>
    </div>
  );
}

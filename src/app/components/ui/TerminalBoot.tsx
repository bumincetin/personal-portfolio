'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Micro-terminal boot sequence above the hero headline.
 *
 * Fast-types a short initialization script, then collapses into a live status
 * line with a pulsing carrier dot. Runs once per mount; under reduced motion
 * (or after the sequence) only the settled status line is shown, so the
 * animation is pure garnish on top of static content.
 */

const BOOT_LINES = [
  '[INITIALIZING_LATENT_SPACE...]',
  '[LOADING_MODELS: nlp.finance.v4 ................ OK]',
  '[CALIBRATING_VECTOR_FIELD ..................... OK]',
];

const STATUS = 'BOCCONI AI LAB • MILAN, IT';

export default function TerminalBoot({ className = '' }: { className?: string }) {
  const [text, setText] = useState('');
  const [booted, setBooted] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      skipRef.current = true;
      setBooted(true);
      return;
    }

    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (line >= BOOT_LINES.length) {
        // Hold the finished transcript for a beat, then settle.
        timer = setTimeout(() => !cancelled && setBooted(true), 420);
        return;
      }
      const current = BOOT_LINES[line];
      char++;
      setText(BOOT_LINES.slice(0, line).join('\n') + (line > 0 ? '\n' : '') + current.slice(0, char));
      if (char >= current.length) {
        line++;
        char = 0;
        timer = setTimeout(type, 130);
      } else {
        // Uneven cadence types like a machine dumping a log, not a human.
        timer = setTimeout(type, 4 + Math.random() * 14);
      }
    };

    timer = setTimeout(type, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`font-mono text-[0.625rem] leading-relaxed tracking-[0.08em] ${className}`}
      aria-hidden="true"
    >
      {booted ? (
        <span className="inline-flex items-center gap-2 text-muted-light">
          <span className="relative flex h-1.5 w-1.5">
            {!skipRef.current && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {STATUS}
        </span>
      ) : (
        <pre className="whitespace-pre-wrap text-accent/70">
          {text}
          <span className="animate-pulse">_</span>
        </pre>
      )}
    </div>
  );
}

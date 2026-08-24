'use client';

import { useRef, useState } from 'react';

/**
 * Interactive command prompt for the footer.
 *
 * `bumincetin:~$ ` accepts a handful of commands (`help`, `contact`, `book`,
 * `resume`, `whoami`, `clear`); anything else gets a polite command-not-found.
 * Actions either open the booking modal (via the callback the footer already
 * owns) or follow the same external links the footer lists -- the prompt is an
 * alternate door, not a separate address book.
 */

type HistoryLine = { kind: 'input' | 'output'; text: string };

const RESUME_URL = 'https://linkedin.com/in/buminkcetin';

export default function TerminalPrompt({
  onBook,
  className = '',
}: {
  onBook: () => void;
  className?: string;
}) {
  const [history, setHistory] = useState<HistoryLine[]>([
    { kind: 'output', text: "type 'help' for available commands" },
  ]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase();
    const echo: HistoryLine = { kind: 'input', text: raw };

    let output: string[] = [];
    switch (command) {
      case '':
        setHistory((h) => [...h, echo]);
        return;
      case 'help':
        output = [
          'contact   → open the contact form',
          'book      → book an intro call',
          'resume    → open LinkedIn profile',
          'whoami    → who is this site about',
          'clear     → clear the terminal',
        ];
        break;
      case 'contact':
      case 'book':
        output = ['opening booking form...'];
        onBook();
        break;
      case 'resume':
      case 'cv':
        output = [`opening ${RESUME_URL}`];
        window.open(RESUME_URL, '_blank', 'noopener');
        break;
      case 'whoami':
        output = [
          'Bumin Kağan Çetin — data scientist & AI specialist',
          'Bocconi University · CEO, Alvolo Consulting · Milan, IT',
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
      case 'sudo rm -rf /':
        output = ['nice try.'];
        break;
      default:
        output = [`command not found: ${command} — try 'help'`];
    }

    setHistory((h) => [...h.slice(-8), echo, ...output.map((text) => ({ kind: 'output' as const, text }))]);
  };

  return (
    <div
      className={`cursor-text rounded-editorial border border-border bg-surface-alt/80 p-4 font-mono text-[0.75rem] leading-relaxed ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-2 flex items-center gap-1.5 border-b border-border pb-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-negative/60" />
        <span className="h-2 w-2 rounded-full bg-caution/60" />
        <span className="h-2 w-2 rounded-full bg-positive/60" />
        <span className="ml-2 text-[0.625rem] tracking-[0.14em] text-muted-light">/usr/bin/contact</span>
      </div>

      <div aria-live="polite">
        {history.map((line, index) => (
          <div key={index} className={line.kind === 'input' ? 'text-charcoal' : 'text-muted'}>
            {line.kind === 'input' && <span className="text-accent">bumincetin:~$ </span>}
            {line.text}
          </div>
        ))}
      </div>

      <form
        className="flex items-center gap-0"
        onSubmit={(event) => {
          event.preventDefault();
          run(value);
          setValue('');
        }}
      >
        <label htmlFor="footer-terminal" className="whitespace-pre text-accent">
          {'bumincetin:~$ '}
        </label>
        <input
          id="footer-terminal"
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command input"
          placeholder="help"
          className="w-full flex-1 border-0 bg-transparent p-0 text-charcoal caret-accent outline-none placeholder:text-muted-light/50 focus:ring-0"
        />
      </form>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getActiveTheme, onThemeChange, setTheme, type Theme } from '@/lib/theme';

/**
 * Light/dark switch for the navbar.
 *
 * The active theme is stamped on <html> before first paint by an inline
 * script, so this component only mirrors it. It renders a neutral placeholder
 * until mounted: the server cannot know which theme the visitor stored, and
 * rendering a guess would either mismatch hydration or flash the wrong icon.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    setThemeState(getActiveTheme());
    return onThemeChange(setThemeState);
  }, []);

  const next: Theme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      // The label is only meaningful once we know the current theme.
      aria-label={theme ? `Switch to ${next} theme` : 'Switch colour theme'}
      title={theme ? `Switch to ${next} theme` : undefined}
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors duration-500 ease-luxe hover:border-accent/50 hover:text-accent ${className}`}
    >
      {/* Both icons are rendered and cross-faded so the swap has no reflow and
          no missing-glyph frame; opacity is driven off the resolved theme. */}
      <span className="relative block h-[15px] w-[15px]">
        <Sun
          size={15}
          strokeWidth={1.5}
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: theme === 'dark' ? 1 : 0 }}
          aria-hidden="true"
        />
        <Moon
          size={15}
          strokeWidth={1.5}
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: theme === 'light' ? 1 : 0 }}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

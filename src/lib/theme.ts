/**
 * Theme runtime.
 *
 * The stylesheet owns the values (see the :root / [data-theme='light'] blocks
 * in globals.css); this module owns *which* set is active and lets the canvas
 * layers -- which paint colours themselves and cannot inherit CSS -- read the
 * live values and repaint when the theme changes.
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'bkc-theme';
export const THEME_EVENT = 'bkc:themechange';

/**
 * The script that runs before first paint, inlined into <head>. Kept here as a
 * string so the logic sits next to the rest of the theme code rather than
 * buried in the layout, and so the key can never drift from the one used
 * below. It must stay small, synchronous and dependency-free: anything that
 * defers past first paint reintroduces the flash it exists to prevent.
 */
export const THEME_INIT_SCRIPT = `(function(){try{
var t=localStorage.getItem('${THEME_STORAGE_KEY}');
if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','dark');}
/* Transitions are attached one frame later so the first paint is not animated. */
requestAnimationFrame(function(){document.documentElement.classList.add('theme-ready');});
})();`;

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** The theme currently painted, read from the attribute the script stamped. */
export function getActiveTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or storage disabled: the choice just will not persist.
  }
  // Keep the browser chrome (address bar) in step. The document ships two
  // media-scoped theme-color metas so the chrome is right before JS runs;
  // once there is an explicit choice they would contradict it, so they are
  // collapsed into one unscoped tag.
  document.querySelectorAll('meta[name="theme-color"]').forEach((node, index) => {
    if (index > 0) {
      node.remove();
      return;
    }
    node.removeAttribute('media');
    node.setAttribute('content', theme === 'light' ? '#F7F3EC' : '#100C0A');
  });

  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

/**
 * Subscribe to theme changes -- both explicit toggles and, while the visitor
 * has expressed no preference, the OS flipping under them.
 */
export function onThemeChange(callback: (theme: Theme) => void): () => void {
  const handleEvent = () => callback(getActiveTheme());
  window.addEventListener(THEME_EVENT, handleEvent);

  const media = window.matchMedia('(prefers-color-scheme: light)');
  const handleSystem = () => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Ignore: treated as "no stored preference".
    }
    if (stored === 'light' || stored === 'dark') return;
    setTheme(getSystemTheme());
  };
  media.addEventListener('change', handleSystem);

  return () => {
    window.removeEventListener(THEME_EVENT, handleEvent);
    media.removeEventListener('change', handleSystem);
  };
}

/**
 * Read one of the `--c-*` channel triplets as numbers, for the canvas layers.
 * Falls back to the supplied dark-theme value if the property is missing (SSR,
 * or a browser that failed to parse the sheet).
 */
export function readChannels(name: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof document === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length < 3 || parts.some((n) => !Number.isFinite(n))) return fallback;
  return [parts[0], parts[1], parts[2]];
}

/** Multiplier for canvas stroke alphas: thin lines need more weight on paper. */
export function readCanvasAlpha(): number {
  if (typeof document === 'undefined') return 1;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--canvas-alpha').trim();
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

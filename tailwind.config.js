/** @type {import('tailwindcss').Config} */

/**
 * Surface treatment derived from the ThreeUI "constellation field" scene
 * (github.com/MengTo/threeui, MIT); palette is a noir-and-brass register --
 * espresso ground, bone type, brushed brass as the single warm accent and
 * oxidised copper as the interactive one. Warm all the way through: no cool
 * hue appears anywhere in the scheme, in either theme.
 *
 * The values live in src/app/globals.css as channel triplets, one set per
 * theme; every token below is bound to them through <alpha-value>, so the
 * whole site re-skins from the :root block and `bg-surface/70` keeps working
 * unchanged. Do not put a literal colour here -- it would be theme-blind.
 *
 * The legacy token names (cream / charcoal / surface / accent ...) are kept so
 * the whole site re-skins from this one file. Their *roles* are unchanged --
 * `cream` is still "the page", `charcoal` is still "the thing that contrasts
 * with the page" -- only the values invert.
 */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Page ground + inverted foreground
        cream: 'rgb(var(--c-ground) / <alpha-value>)',
        charcoal: 'rgb(var(--c-text) / <alpha-value>)',
        navy: 'rgb(var(--c-text-2) / <alpha-value>)',
        'navy-light': 'rgb(var(--c-text-3) / <alpha-value>)',

        // Accents
        accent: 'rgb(var(--c-brass) / <alpha-value>)',
        'accent-hi': 'rgb(var(--c-brass-hi) / <alpha-value>)',
        'accent-hover': 'rgb(var(--c-brass-hover) / <alpha-value>)',
        'accent-blue': 'rgb(var(--c-copper) / <alpha-value>)',

        // Text ramp
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        'muted-light': 'rgb(var(--c-muted-light) / <alpha-value>)',

        // Structure
        border: 'rgb(var(--c-hairline) / <alpha-value>)',
        'border-dark': 'rgb(var(--c-hairline-strong) / <alpha-value>)',
        surface: 'rgb(var(--c-panel) / <alpha-value>)',
        'surface-alt': 'rgb(var(--c-panel-alt) / <alpha-value>)',
        'surface-raised': 'rgb(var(--c-panel-raised) / <alpha-value>)',

        // Semantic status colours
        positive: 'rgb(var(--c-positive) / <alpha-value>)',
        caution: 'rgb(var(--c-brass) / <alpha-value>)',
        negative: 'rgb(var(--c-negative) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Editorial serif for display type; `serif` is an alias so the older
        // page templates that ask for font-serif pick it up unchanged.
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Display type is ultralight and tightly tracked, per the ThreeUI scenes.
        display: ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '200' }],
        heading: ['clamp(1.875rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '200' }],
        subheading: ['clamp(1.25rem, 2vw, 1.625rem)', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '300' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        // Serif display sizes: the face is small on the body, so it runs larger.
        'display-serif': ['clamp(3.25rem, 8.5vw, 7rem)', { lineHeight: '0.98', letterSpacing: '-0.015em', fontWeight: '300' }],
        'chapter': ['clamp(2.125rem, 4.6vw, 3.875rem)', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '300' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 10vw, 9rem)',
      },
      maxWidth: {
        prose: '68ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        marquee: 'marquee 42s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        // Elevation is theme-dependent -- a cast shadow on paper, a depth
        // shadow plus a lit top edge on black -- so it resolves through vars.
        hairline: 'var(--shadow-hairline)',
        editorial: 'var(--shadow-card)',
        'editorial-hover': 'var(--shadow-card-hover)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        glow: 'var(--shadow-glow)',
        'glow-blue': 'var(--shadow-glow-blue)',
      },
      borderRadius: {
        editorial: '4px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // The house easing: fast out of the gate, long soft landing.
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

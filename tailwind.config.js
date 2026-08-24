/** @type {import('tailwindcss').Config} */

/**
 * Surface treatment derived from the ThreeUI "constellation field" scene
 * (github.com/MengTo/threeui, MIT); palette evolved to an obsidian-and-
 * champagne register -- violet-black ground, ivory type, champagne gold as
 * the single warm accent and moonlight platinum as the interactive one.
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
        cream: '#08070C',
        charcoal: '#F4F1E9',
        navy: '#DDD8CC',
        'navy-light': '#C9C3B4',

        // Accents
        accent: '#D9BE82',
        'accent-blue': '#A8B8D8',

        // Text ramp
        muted: '#A39C9B',
        'muted-light': '#665F66',

        // Structure
        border: '#242030',
        'border-dark': '#332C42',
        surface: '#100E17',
        'surface-alt': '#0C0A12',
        'surface-raised': '#171420',

        // Semantic status colours, tuned for a dark ground
        positive: '#7FBFA2',
        caution: '#D9BE82',
        negative: '#C98A8A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Display type is ultralight and tightly tracked, per the ThreeUI scenes.
        display: ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '200' }],
        heading: ['clamp(1.875rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '200' }],
        subheading: ['clamp(1.25rem, 2vw, 1.625rem)', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '300' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
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
        // On a dark ground, elevation reads through depth-shadow + a top hairline.
        hairline: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
        editorial: '0 2px 8px rgba(0, 0, 0, 0.30)',
        'editorial-hover': '0 16px 40px rgba(0, 0, 0, 0.36)',
        card: '0 2px 8px rgba(0, 0, 0, 0.30)',
        'card-hover': '0 16px 40px rgba(0, 0, 0, 0.36)',
        glow: '0 0 12px rgba(217, 190, 130, 0.55)',
        'glow-blue': '0 0 16px rgba(168, 184, 216, 0.35)',
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

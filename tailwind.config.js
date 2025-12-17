/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        void: '#050505',
        deep: '#0a0a12',
        'glass-surface': 'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        'glass-highlight': 'rgba(255, 255, 255, 0.15)',
        'accent-cyan': '#00f0ff',
        'accent-purple': '#7000ff',
        'text-primary': '#f0f0f0',
        'text-muted': '#888899',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        float: 'float 20s infinite alternate cubic-bezier(0.215, 0.61, 0.355, 1)',
        'float-delayed': 'float 20s infinite alternate-reverse cubic-bezier(0.215, 0.61, 0.355, 1)',
        ticker: 'ticker 30s linear infinite',
        breathe: 'breathe 8s infinite ease-in-out',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin 30s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(100px, 50px) rotate(20deg)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 50px rgba(0,240,255,0.15)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 80px rgba(0,240,255,0.25)' },
        }
      }
    },
  },
  plugins: [],
}

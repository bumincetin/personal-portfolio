/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F9F9F7',
        charcoal: '#1A1A1A',
        navy: '#0D1B2A',
        'navy-light': '#1E3A5F',
        accent: '#E85D04',
        'accent-blue': '#1E3A5F',
        muted: '#6B7280',
        'muted-light': '#9CA3AF',
        border: '#E5E5E3',
        'border-dark': '#D1D1CF',
        surface: '#FFFFFF',
        'surface-alt': '#F3F3F1',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'subheading': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
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
      },
      boxShadow: {
        'editorial': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'editorial-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'editorial': '2px',
      },
    },
  },
  plugins: [],
}

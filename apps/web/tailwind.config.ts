import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          primary: {
            light: '#d9a0bc',
            dark: '#8a466b',
            DEFAULT: '#BB6192',
          },
          secondary: {
            light: '#28d1ae',
            dark: '#084034',
            DEFAULT: '#0d6e5a',
          },
          neutral: {
            light: '#E0E0E0',
            dark: '#606060',
            DEFAULT: '#A0A0A0',
          },
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
  // plugins: [require('tailwindcss-animate')],
} satisfies Config

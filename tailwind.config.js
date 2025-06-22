/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        gray: {
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#d1d5db',
        },
        blue: {
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
          300: '#93c5fd',
        },
        purple: {
          600: '#9333ea',
          500: '#a855f7',
          400: '#c084fc',
        },
        green: {
          600: '#16a34a',
          500: '#22c55e',
          400: '#4ade80',
        },
        teal: {
          600: '#0d9488',
          500: '#14b8a6',
        },
        red: {
          400: '#f87171',
          300: '#fca5a5',
        }
      }
    },
  },
  plugins: [],
}
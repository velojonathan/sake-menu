import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Surface hierarchy (warm parchment) ────────────── */
        surface: {
          DEFAULT: '#fcf9f3',
          'container-lowest': '#ffffff',
          'container-low': '#f6f3ed',
          'container': '#f0ede7',
          'container-high': '#eae7e1',
          'container-highest': '#e4e1db',
          bright: '#fefcf6',
        },
        /* ── On-surface (text) ─────────────────────────────── */
        'on-surface': '#1c1c18',
        'on-surface-variant': '#4a4740',
        /* ── Primary (charcoal spectrum) ───────────────────── */
        primary: {
          DEFAULT: '#5c5c5c',
          container: '#757474',
        },
        /* ── Secondary (moss green) ────────────────────────── */
        secondary: {
          DEFAULT: '#5a6240',
          container: '#dee7bb',
          'on-container': '#606845',
        },
        /* ── Tertiary (gold) ───────────────────────────────── */
        tertiary: {
          DEFAULT: '#785600',
          'fixed-dim': '#c49a2a',
        },
        'on-secondary': '#ffffff',
        /* ── Outline ───────────────────────────────────────── */
        'outline-variant': '#d1c4b8',
        /* ── Legacy aliases ────────────────────────────────── */
        charcoal: '#2D2D2D',
        cream: '#fcf9f3',
        /* ── Sake accent (kept for admin pages) ────────────── */
        sake: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e6ddd0',
          300: '#d4c4aa',
          400: '#c0a683',
          500: '#b08e65',
          600: '#a37b55',
          700: '#886548',
          800: '#6f533f',
          900: '#5b4535',
          950: '#30231b',
        },
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        ambient: '0 8px 24px rgba(28,28,24,0.04)',
      },
      letterSpacing: {
        display: '-0.02em',
        label: '0.1rem',
      },
    },
  },
  plugins: [],
};

export default config;

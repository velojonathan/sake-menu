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
        /* ── Surface hierarchy ────────────────────────────────── */
        surface: {
          DEFAULT: '#fcf9f3',
          'container-lowest': '#ffffff',
          'container-low': '#f6f3ed',
          'container': '#f0eee8',
          'container-high': '#ebe8e2',
          'container-highest': '#e5e2dc',
          bright: '#fcf9f3',
          dim: '#dcdad4',
          variant: '#e5e2dc',
          tint: '#5f5e5e',
        },
        /* ── On-surface ───────────────────────────────────────── */
        'on-surface': '#1c1c18',
        'on-surface-variant': '#4e453c',
        'on-background': '#1c1c18',
        background: '#fcf9f3',
        /* ── Primary (charcoal) ───────────────────────────────── */
        primary: {
          DEFAULT: '#5c5c5c',
          container: '#757474',
          fixed: '#e4e2e1',
          'fixed-dim': '#c8c6c6',
        },
        'on-primary': '#ffffff',
        'on-primary-container': '#fffcfb',
        'on-primary-fixed': '#1b1c1c',
        'on-primary-fixed-variant': '#474747',
        /* ── Secondary (moss green) ───────────────────────────── */
        secondary: {
          DEFAULT: '#5a6240',
          container: '#dee7bb',
          fixed: '#dee7bb',
          'fixed-dim': '#c2cba1',
        },
        'on-secondary': '#ffffff',
        'on-secondary-container': '#606845',
        'on-secondary-fixed': '#171e04',
        'on-secondary-fixed-variant': '#424a2a',
        /* ── Tertiary (gold) ──────────────────────────────────── */
        tertiary: {
          DEFAULT: '#785600',
          container: '#986d00',
          fixed: '#ffdea6',
          'fixed-dim': '#f7bd48',
        },
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#fffbff',
        'on-tertiary-fixed': '#271900',
        'on-tertiary-fixed-variant': '#5d4200',
        /* ── Error ────────────────────────────────────────────── */
        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        /* ── Outline ──────────────────────────────────────────── */
        outline: '#80756b',
        'outline-variant': '#d1c4b8',
        /* ── Inverse ──────────────────────────────────────────── */
        'inverse-surface': '#31312d',
        'inverse-on-surface': '#f3f0ea',
        'inverse-primary': '#c8c6c6',
        /* ── Legacy aliases (admin pages) ─────────────────────── */
        charcoal: '#2D2D2D',
        cream: '#fcf9f3',
        sake: {
          50: '#faf8f5', 100: '#f3efe8', 200: '#e6ddd0', 300: '#d4c4aa',
          400: '#c0a683', 500: '#b08e65', 600: '#a37b55', 700: '#886548',
          800: '#6f533f', 900: '#5b4535', 950: '#30231b',
        },
      },
      fontFamily: {
        headline: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        label: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '9999px',
      },
      boxShadow: {
        ambient: '0 8px 24px rgba(28,28,24,0.04)',
      },
      letterSpacing: {
        display: '-0.02em',
        tight: '-0.03em',
        label: '0.1rem',
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};

export default config;

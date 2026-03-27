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
        cream: '#fdfbf7',
        charcoal: '#1a1a1a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // All 9 design tokens — map to CSS custom properties so they can be
        // overridden at the :root level without touching Tailwind config.
        'bg-base':        'var(--bg-base)',
        'bg-alt':         'var(--bg-alt)',
        'bg-panel':       'var(--bg-panel)',
        'blue-primary':   'var(--blue-primary)',
        'blue-deep':      'var(--blue-deep)',
        'blue-mid':       'var(--blue-mid)',
        'blue-tint':      'var(--blue-tint)',
        'gold-accent':    'var(--gold-accent)',
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-hairline':'var(--border-hairline)',
      },
      fontFamily: {
        // --font-display injected by next/font into <html>
        display: ['var(--font-display)', 'Georgia', ...defaultTheme.fontFamily.serif],
        // --font-body injected by next/font into <html>
        body:    ['var(--font-body)',    'system-ui', ...defaultTheme.fontFamily.sans],
        // Mono for team codes and stat strip numerals
        mono:    ['ui-monospace', 'Menlo', 'Consolas', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        sharp: '4px',
        firm:  '6px',
      },
      backdropBlur: {
        nav: '10px',
      },
      letterSpacing: {
        caps: '0.12em',
        wide: '0.06em',
      },
      animation: {
        'hero-drift': 'hero-drift 90s linear infinite',
      },
      keyframes: {
        'hero-drift': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

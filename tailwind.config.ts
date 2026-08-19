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
        // ── Phase 4 brown palette ────────────────────────────────────────
        'brown-900':    'var(--brown-900)',    // espresso headlines
        'brown-800':    'var(--brown-800)',    // dark brown active
        'brown-600':    'var(--brown-600)',    // mid brown secondary
        'brown-300':    'var(--brown-300)',    // light brown hairlines
        'gold-muted':   'var(--gold-muted)',   // muted gold accent
        'surface':      'var(--surface)',       // card fill

        // ── Background tokens ────────────────────────────────────────────
        'bg-base':      'var(--bg-base)',
        'bg-alt':       'var(--bg-alt)',
        'bg-panel':     'var(--bg-panel)',

        // ── Legacy blue aliases (kept so old Tailwind utilities still work)
        // These all resolve to brown equivalents via CSS custom properties.
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
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"Inter"', '"Segoe UI"', 'system-ui',
          ...defaultTheme.fontFamily.sans,
        ],
        // Legacy aliases — both resolve to system sans
        display: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"Inter"', '"Segoe UI"', 'system-ui',
          ...defaultTheme.fontFamily.sans,
        ],
        body: [
          '-apple-system', 'BlinkMacSystemFont', '"Inter"',
          '"Segoe UI"', 'system-ui',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        sharp:  'var(--radius-btn)',   // 8px — buttons
        firm:   'var(--radius-card)',  // 10px — cards
        frame:  'var(--radius-frame)', // 6px — frames
      },
      backdropBlur: {
        nav: '12px',
      },
      letterSpacing: {
        caps:     '0.08em',
        wide:     '0.06em',
        tight:    '-0.02em',
        tighter:  '-0.03em',
        tightest: '-0.04em',
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

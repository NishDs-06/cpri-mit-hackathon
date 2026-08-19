import { Inter } from 'next/font/google';

/**
 * Phase 3 typography — single sans family across the entire hierarchy.
 *
 * Inter is the closest Google Fonts equivalent to San Francisco (SF Pro),
 * which is what this stack resolves to on Apple devices via -apple-system.
 * On macOS/iOS: renders as SF Pro Display (system native, no download needed).
 * On Windows: Segoe UI.
 * On Android: Roboto (via system-ui).
 * Everywhere else: Inter (this font, downloaded from Google Fonts).
 *
 * We only need Inter as a fallback — most users on modern devices will get
 * their OS system font instead. Loading Inter with display:swap ensures
 * no FOUT even on the fallback path.
 *
 * Variables:
 *  --font-sans  → used by body and headings via CSS font-family stack
 *
 * Note: The previous --font-display (Source Serif 4) and --font-body
 * (IBM Plex Sans) variables are REMOVED. Any JSX still referencing
 * var(--font-display) or var(--font-body) will fall back to system-ui.
 * Search and replace those references with the system-font stack or
 * font-family: inherit.
 */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  // Include the weights we actually use:
  //  400 — body copy
  //  500 — medium labels, nav links
  //  600 — section headers, subheadings
  //  700 — hero headline, card names, bold CTAs
  weight: ['400', '500', '600', '700'],
});

// Re-export as the variables layout.tsx injects onto <html>
// layout.tsx references { sourceSerif4, ibmPlexSans } — we alias here
// so we only need to change fonts.ts, not layout.tsx.
export const sourceSerif4 = inter; // alias — no longer used as serif
export const ibmPlexSans  = inter; // alias — replaced by system sans

import { Source_Serif_4, IBM_Plex_Sans } from 'next/font/google';

/**
 * Display / headline serif — Source Serif 4 is a variable font;
 * no explicit weight array needed, but we hint optical sizing subsets.
 * Weights used: 600 (section headers), 700 (hero), 400 (body paragraphs in serif contexts).
 */
export const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  // Subset to the weights actually used — reduces FOUT window
  axes: ['opsz'],
});

/**
 * Body / UI grotesk — IBM Plex Sans is NOT a variable font;
 * weights must be listed explicitly. Subset to only what we use.
 */
export const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

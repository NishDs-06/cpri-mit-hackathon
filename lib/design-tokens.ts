// ─── Design Tokens — Phase 4 (Brown/Beige Duotone) ──────────────────────────
// Full color system swap: navy/blue removed entirely.
// Brown/espresso palette replaces all blue references.

// ─── Tilt ─────────────────────────────────────────────────────────────────────
export const TILT_MAX_DEG = 2;
export const SPRING_CONFIG = { stiffness: 300, damping: 30 };
export const HOVER_LIFT = { y: -2, scale: 1.01 };
export const GRAIN_OPACITY = 0.025;

// ─── Engineering Glyph Matrix ────────────────────────────────────────────────
/**
 * Phase 4: Recolored to brown/muted-gold duotone.
 * Primary glyphs: --brown-600 (#7A5A3E)
 * Accent glyphs (1/8): --gold-muted (#A9855A)
 * Opacity raised to 9% in hero — visible on careful look, not distracting.
 */
export const GLYPH_MATRIX_CONFIG = {
  mutationRate: 0.015,
  cellSize: 20,
  opacity: 0.09,
  /** Primary glyph color — mid brown */
  color: '#7A5A3E',
  /** 1/8 cells render in muted gold */
  goldColor: '#A9855A',
  goldFraction: 0.125,
  glyphs: [
    'Ω', 'V', 'I', 'R', 'P', 'W',
    'kV', 'kW', 'Hz', 'kΩ', 'μF', 'mH',
    '∿', '±', '∑', '√',
    '⊕', '⊗', '△', '▽',
    '∂', '∇', '∫',
    'ΔV', '50', 'AC', 'DC',
  ],
} as const;

// ─── Gold usage rules ─────────────────────────────────────────────────────────
/**
 * --gold-muted (#A9855A) is reserved for "special" moments only:
 *  1. Countdown timer digits
 *  2. Active timeline step marker (gold fill)
 *  3. Ambient glyph field (1/8 cells)
 *
 * If gold appears more than 3-4 times per screen, pull it back.
 * The brown/beige palette does the heavy lifting — gold only accents.
 */
export const GOLD_USAGE = {
  eyebrowUnderlineHeight: '2px',
  activeTimelineBorderWidth: '3px',
  gradientDividerCenter: true,
  glyphFieldFraction: 0.125,
} as const;

// ─── Elevation shadows (brown-tinted) ────────────────────────────────────────
/**
 * Shadows tinted toward --brown-900 hue (#3C2A1E).
 * Stronger opacity than Phase 3 — warm beige background absorbs contrast.
 */
export const ELEVATION = {
  L1: '0 1px 3px rgba(60,42,30,0.07), 0 20px 40px rgba(60,42,30,0.12)',
  L2: '0 2px 6px rgba(60,42,30,0.09), 0 30px 60px rgba(60,42,30,0.16), inset 0 1px 0 rgba(255,255,255,0.55)',
  L3: '0 2px 8px rgba(60,42,30,0.11), 0 40px 80px rgba(60,42,30,0.20)',
} as const;

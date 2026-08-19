// ─── Design Tokens — Phase 2 ─────────────────────────────────────────────────
// All tunable values for Phase 2 visual effects are defined here.
// Keep these isolated from component logic so they can be tweaked without
// touching any JSX. Inline comments explain the rationale for each value.

// ─── Tilt ─────────────────────────────────────────────────────────────────────
/**
 * Maximum tilt rotation in degrees on X or Y axis.
 * Capped at 2° — above this the element reads "wobbly" rather than "alive".
 * Studies of Apple/Stripe-style tilt effects confirm 1–2° is the sweet spot.
 */
export const TILT_MAX_DEG = 2;

/** Framer Motion spring config for tilt and hover-lift. */
export const SPRING_CONFIG = { stiffness: 300, damping: 30 };

// ─── Hover-lift ───────────────────────────────────────────────────────────────
/**
 * Button hover-lift: 2px up, scale to 1.01.
 * NOT scale-105 — that's too large and reads as "toy". 1.01 is almost
 * imperceptible on its own but noticeable as part of the combined lift+shadow.
 */
export const HOVER_LIFT = { y: -2, scale: 1.01 };

// ─── Glass nav grain ─────────────────────────────────────────────────────────
/**
 * Opacity of the noise/grain tile layered over the nav glass blur.
 * 2–3% is the range where it reads as "material" (like frosted glass IRL)
 * without being visible as texture when looking directly at it.
 */
export const GRAIN_OPACITY = 0.025; // 2.5%

// ─── Glyph Matrix (hero background) ─────────────────────────────────────────
export const GLYPH_MATRIX_CONFIG = {
  /**
   * How often a cell's character mutates per animation frame.
   * 0.015 = 1.5% chance per frame ≈ very slow drift.
   * Too high (>0.05) and it reads as noise; too low (<0.005) and it's static.
   */
  mutationRate: 0.015,

  /**
   * Cell size in px. 18–20px gives a fine-grained texture without being
   * so dense that it competes with the hero headline.
   */
  cellSize: 18,

  /**
   * Canvas opacity. 4–6% — visible enough to create depth, invisible enough
   * that it doesn't distract from the headline.
   */
  opacity: 0.05,

  /** Color matches --blue-tint for brand consistency. */
  color: '#0B3D91',
} as const;

// ─── Elevation shadows ────────────────────────────────────────────────────────
// These are also defined as CSS custom properties in globals.css.
// They're here for reference and potential use in inline styles.
export const ELEVATION = {
  L1: '0 1px 2px rgba(16,24,40,0.04), 0 20px 40px rgba(16,24,40,0.06)',
  L2: '0 1px 2px rgba(16,24,40,0.06), 0 30px 60px rgba(16,24,40,0.10), inset 0 1px 0 rgba(255,255,255,0.5)',
  L3: '0 2px 4px rgba(16,24,40,0.08), 0 40px 80px rgba(16,24,40,0.14)',
} as const;

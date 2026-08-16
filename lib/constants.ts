// ─── PLACEHOLDER CONSTANTS ───────────────────────────────────────────────────
// Update these values before going live. All three are used in layout/UI only;
// no security or backend logic depends on them.

/**
 * Registration deadline for the countdown timer.
 * Change this to the real date before deployment.
 */
export const REGISTRATION_DEADLINE = new Date('2026-10-31T23:59:59+05:30');

/** Display name of the hackathon event. */
export const HACKATHON_NAME = 'PowerGrid Hackathon 2026';

/** Short tagline used in the hero section. */
export const HACKATHON_TAGLINE =
  'Engineer the future of India\u2019s energy infrastructure.';

/** Prize pool displayed in the hero stat strip. */
export const STAT_PRIZE = '₹5 Lakhs';

/** Maximum participating teams. */
export const STAT_TEAMS = '100 Teams';

/** Event dates displayed in the hero stat strip. */
export const STAT_EVENT_DATE = '14\u201315 Nov 2026';

/** Location of the event. */
export const STAT_LOCATION = 'Bengaluru, India';

// ─── API base URL ─────────────────────────────────────────────────────────────
/**
 * All API calls are made to this base URL. In development this should point
 * to a local Next.js API route or a dev backend. In production, set via
 * NEXT_PUBLIC_API_URL environment variable.
 *
 * SECURITY NOTE: This is public (NEXT_PUBLIC_) because it is just an origin,
 * not a secret. Never put secrets in NEXT_PUBLIC_ variables.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

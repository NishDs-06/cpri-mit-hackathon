// ─── PLACEHOLDER CONSTANTS ───────────────────────────────────────────────────
// Update these values before going live. All are used in layout/UI only;
// no security or backend logic depends on them.

/**
 * Registration deadline for the countdown timer.
 * Change this to the real deadline before deployment.
 * TODO: Confirm registration deadline date with organizers.
 */
export const REGISTRATION_DEADLINE = new Date('2026-09-20T23:59:59+05:30');

/** Display name of the hackathon event. */
export const HACKATHON_NAME = 'CPRI × MIT Bengaluru Hackathon';

/** Short mission line for the hero section — one concise sentence, no generic copy. */
export const HACKATHON_TAGLINE =
  'Engineer solutions for India\u2019s power grid alongside CPRI and MIT Bengaluru.';

/** Prize pool displayed in the hero stat strip. */
export const STAT_PRIZE = '₹5 Lakhs';

/** Maximum participating teams. */
export const STAT_TEAMS = '100 Teams';

/** Event dates — confirmed: 10–11 Oct 2026 in Bengaluru. */
export const STAT_EVENT_DATE = '10\u201311 Oct 2026';

/** Event location. */
export const STAT_LOCATION = 'Bengaluru, India';

// ─── TIMELINE EVENTS ─────────────────────────────────────────────────────────
// TODO: Confirm exact dates with organizers before going live.
export const TIMELINE_EVENTS = [
  {
    step: '01',
    label: 'Registration Opens',
    date: 'TODO: Registration open date',
    description: 'Teams submit their profiles and register on the portal.',
  },
  {
    step: '02',
    label: 'Shortlist Announced',
    date: 'TODO: Shortlist announcement date',
    description: 'Selected teams are notified and gain access to resources.',
  },
  {
    step: '03',
    label: 'Day 1 — 10 Oct 2026',
    date: '10 Oct 2026',
    description: 'Problem statement reveal, team check-in, and hacking begins.',
  },
  {
    step: '04',
    label: 'Day 2 — 11 Oct 2026',
    date: '11 Oct 2026',
    description: 'Final presentations, evaluation, and prize ceremony.',
  },
] as const;

// ─── CHALLENGE TRACKS ─────────────────────────────────────────────────────────
// TODO: Replace all {{TRACK_*}} placeholders with real track content from organizers.
export const TRACKS = [
  {
    number: '01',
    name: '{{TRACK_1_NAME}}',
    description:
      '{{TRACK_1_DESCRIPTION}} — Replace this with the official track description from CPRI/MIT Bengaluru.',
    bullets: [
      '{{TRACK_1_FOCUS_1}}',
      '{{TRACK_1_FOCUS_2}}',
      '{{TRACK_1_FOCUS_3}}',
    ],
  },
  {
    number: '02',
    name: '{{TRACK_2_NAME}}',
    description:
      '{{TRACK_2_DESCRIPTION}} — Replace this with the official track description from CPRI/MIT Bengaluru.',
    bullets: [
      '{{TRACK_2_FOCUS_1}}',
      '{{TRACK_2_FOCUS_2}}',
      '{{TRACK_2_FOCUS_3}}',
    ],
  },
  {
    number: '03',
    name: '{{TRACK_3_NAME}}',
    description:
      '{{TRACK_3_DESCRIPTION}} — Replace this with the official track description from CPRI/MIT Bengaluru.',
    bullets: [
      '{{TRACK_3_FOCUS_1}}',
      '{{TRACK_3_FOCUS_2}}',
      '{{TRACK_3_FOCUS_3}}',
    ],
  },
] as const;

// ─── TEAM INFORMATION ─────────────────────────────────────────────────────────
// TODO: Replace all {{TEAM_*}} placeholders with real eligibility rules.
export const TEAM_INFO = {
  minSize: 2,            // TODO: Confirm minimum team size
  maxSize: 4,            // TODO: Confirm maximum team size
  eligibilityRules: [
    '{{ELIGIBILITY_RULE_1}} — e.g., Must be currently enrolled in an undergraduate or postgraduate program',
    '{{ELIGIBILITY_RULE_2}} — e.g., At least one member must be from an engineering discipline',
    '{{ELIGIBILITY_RULE_3}} — e.g., Teams must be from Indian institutions',
  ],
  institutionRequirements:
    '{{INSTITUTION_REQUIREMENTS}} — e.g., Open to all accredited Indian universities and colleges.',
  whatYouNeed: [
    'Institutional email address for each member',
    'College ID number',
    'GitHub profile (for technical verification)',
    '{{ADDITIONAL_REQUIREMENT}} — Add any other required documents',
  ],
} as const;

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

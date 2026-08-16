import HeroBackground from './HeroBackground';
import {
  HACKATHON_NAME,
  HACKATHON_TAGLINE,
  STAT_PRIZE,
  STAT_TEAMS,
  STAT_EVENT_DATE,
  STAT_LOCATION,
} from '@/lib/constants';

const STATS = [
  { label: 'Prize Pool',  value: STAT_PRIZE      },
  { label: 'Teams',       value: STAT_TEAMS       },
  { label: 'Event Dates', value: STAT_EVENT_DATE  },
  { label: 'Venue',       value: STAT_LOCATION    },
];

/**
 * Hero section.
 *
 * Layout spec:
 *  - Asymmetric: headline runs at ~60% width, left-aligned — not centered.
 *    This gives the page institutional weight instead of generic landing-page feel.
 *  - Stat strip along the bottom edge of the hero — mono-style numerals,
 *    1px hairline top border, separated visually from the main content.
 *  - HeroBackground is the ONLY animated element on the page — it sits in
 *    a z-0 absolute layer behind all hero content.
 *  - No hero image — per performance constraints.
 *
 * Typography:
 *  - Headline: display serif (Source Serif 4), heavy weight
 *  - Subline/tagline: body grotesk
 *  - Stat values: tabular-nums, mono-weight
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-bg-base flex flex-col"
    >
      {/* Animated background — z-0, hero section only */}
      <HeroBackground />

      {/* Content — z-10, above the background */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Spacer for fixed navbar (72px) */}
        <div className="h-[72px]" aria-hidden="true" />

        {/* Main hero content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-20 lg:py-28">
            {/* Organizer badge — official institutional announcement feel */}
            <p className="font-body text-caps text-blue-mid mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
              Central Power Research Institute × VED
            </p>

            {/* Headline — max ~60% width on desktop */}
            <h1
              className="
                font-display font-bold text-blue-deep
                max-w-[22ch] lg:max-w-[18ch]
                leading-[1.08]
                mb-6
              "
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)' }}
            >
              {HACKATHON_NAME}
            </h1>

            {/* Tagline */}
            <p
              className="font-body text-text-secondary max-w-[52ch] mb-12"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)', lineHeight: '1.65' }}
            >
              {HACKATHON_TAGLINE}
            </p>

            {/* CTA button */}
            <a
              href="#register"
              className="
                inline-flex items-center gap-2
                bg-blue-primary text-white
                px-8 py-4
                rounded-sharp
                font-body font-medium
                text-[0.9375rem] tracking-wide
                hover:bg-blue-deep
                transition-colors duration-150
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary
              "
            >
              Register Now
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M9 4L13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Stat strip — anchored to bottom of hero */}
        <div className="relative z-10 border-t border-border-hairline bg-white/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <dl
              className="
                grid grid-cols-2 lg:grid-cols-4
                divide-x divide-border-hairline
              "
            >
              {STATS.map(({ label, value }) => (
                <div
                  key={label}
                  className="px-6 py-5 first:pl-0 last:pr-0"
                >
                  <dt className="font-body text-[0.6875rem] font-medium tracking-caps uppercase text-text-secondary mb-1">
                    {label}
                  </dt>
                  <dd className="font-display font-semibold text-blue-deep tabular-nums text-[1.0625rem]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

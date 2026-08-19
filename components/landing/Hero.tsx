'use client';

import Link from 'next/link';
import { GlyphMatrix } from '@/components/ui/GlyphMatrix';
import { HoverLiftButton } from '@/components/ui/TiltCard';
import { CountUpCounter } from '@/components/ui/RollingCounter';
import {
  HACKATHON_NAME,
  HACKATHON_TAGLINE,
  STAT_EVENT_DATE,
  STAT_LOCATION,
} from '@/lib/constants';

// ─── Hero stat strip data ─────────────────────────────────────────────────────
// The prize pool and team count use CountUpCounter (rolling digits, one-time on mount).
// Event date and location are static strings.

const digitStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  color: 'var(--gold-accent)',
  fontFamily: 'var(--font-display), Georgia, serif',
  fontWeight: 700,
  lineHeight: 1,
};

/**
 * Hero section.
 *
 * Layout spec:
 *  - Asymmetric: headline runs at ~60% width, left-aligned — not centered.
 *    This gives the page institutional weight instead of generic landing-page feel.
 *  - Stat strip along the bottom edge of the hero — mono-style numerals,
 *    1px hairline top border, separated visually from the main content.
 *  - GlyphMatrix replaces the previous drift-grid background.
 *    Canvas-only, no WebGL. Barely perceptible at 5% opacity.
 *
 * Phase 2 additions:
 *  - GlyphMatrix canvas backdrop (hero-only)
 *  - HoverLiftButton on primary CTA (Framer Motion, 2px lift + scale 1.01)
 *  - Stat strip values use CountUpCounter (rolls once on mount, no loop)
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
      className="relative min-h-screen bg-bg-base flex flex-col overflow-hidden"
    >
      {/* Glyph Matrix — z-0, hero section only, canvas-based, no WebGL */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <GlyphMatrix />
      </div>

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
              Central Power Research Institute × MIT Bengaluru × VED
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

            {/* CTA row — primary + secondary */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA — tilt + lift on hover (Phase 2)
                  Budget note: this is 1 of max 2-3 tilt elements on the screen */}
              <HoverLiftButton>
                <Link
                  href="/portal"
                  className="
                    inline-flex items-center gap-2
                    bg-blue-primary text-white
                    px-8 py-4
                    rounded-sharp
                    font-body font-semibold
                    text-[0.9375rem] tracking-wide
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary
                  "
                >
                  Register Your Team
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
                </Link>
              </HoverLiftButton>

              {/* Secondary CTA — plain anchor, no effect */}
              <a
                href="#about"
                className="
                  inline-flex items-center gap-2
                  font-body font-medium text-text-secondary
                  text-[0.9375rem] tracking-wide
                  hover:text-blue-primary
                  transition-colors duration-150
                  group
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    flex-shrink-0 w-8 h-8 rounded-full
                    border border-border-hairline
                    flex items-center justify-center
                    group-hover:border-blue-primary
                    transition-colors duration-150
                  "
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Scroll to Explore
              </a>
            </div>
          </div>
        </div>

        {/* Stat strip — anchored to bottom of hero */}
        <div className="relative z-10 border-t border-border-hairline bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <dl
              className="
                grid grid-cols-2 lg:grid-cols-4
                divide-x divide-border-hairline
              "
            >
              {/* Prize Pool */}
              <div className="px-6 py-5 first:pl-0 last:pr-0 flex flex-col justify-center">
                <dt className="font-body text-[0.6875rem] font-medium tracking-caps uppercase text-text-secondary mb-2">
                  Prize Pool
                </dt>
                <dd>
                  <div className="stat-frame">
                    <span className="stat-value" style={{ fontSize: '1.25rem' }}>₹</span>
                    <CountUpCounter target={5} minDigits={1} style={digitStyle} />
                    <span className="stat-value" style={{ fontSize: '1.25rem' }}> Lakhs</span>
                  </div>
                </dd>
              </div>

              {/* Teams */}
              <div className="px-6 py-5 first:pl-0 last:pr-0 flex flex-col justify-center">
                <dt className="font-body text-[0.6875rem] font-medium tracking-caps uppercase text-text-secondary mb-2">
                  Teams
                </dt>
                <dd>
                  <div className="stat-frame">
                    <CountUpCounter target={100} minDigits={1} style={digitStyle} />
                    <span className="stat-value" style={{ fontSize: '1.25rem' }}> Teams</span>
                  </div>
                </dd>
              </div>

              {/* Event Dates */}
              <div className="px-6 py-5 first:pl-0 last:pr-0 flex flex-col justify-center">
                <dt className="font-body text-[0.6875rem] font-medium tracking-caps uppercase text-text-secondary mb-2">
                  Event Dates
                </dt>
                <dd>
                  <div className="stat-frame">
                    <span className="stat-value" style={{ fontSize: '1.25rem' }}>{STAT_EVENT_DATE}</span>
                  </div>
                </dd>
              </div>

              {/* Venue */}
              <div className="px-6 py-5 first:pl-0 last:pr-0 flex flex-col justify-center">
                <dt className="font-body text-[0.6875rem] font-medium tracking-caps uppercase text-text-secondary mb-2">
                  Venue
                </dt>
                <dd>
                  <div className="stat-frame">
                    <span className="stat-value" style={{ fontSize: '1.25rem' }}>{STAT_LOCATION}</span>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

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

const compactDigitStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'var(--gold-muted)',
  fontWeight: 700,
  lineHeight: 1,
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
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
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">
              
              {/* Left Column: Typography & CTAs */}
              <div className="flex flex-col">
                {/* Organizer badge */}
                <div className="mb-8">
                  <p className="text-caps flex items-center gap-3 mb-2" style={{ color: 'var(--brown-600)' }}>
                    <span className="block w-6 h-px" style={{ backgroundColor: 'var(--brown-600)' }} aria-hidden="true" />
                    Central Power Research Institute × MIT Bengaluru × VED
                  </p>
                  <span className="block h-0.5" style={{ width: '2rem', background: 'var(--gold-muted)' }} />
                </div>

                {/* Headline */}
                <h1
                  className="font-bold leading-[1.06] mb-8 max-w-[28ch] lg:max-w-[22ch]"
                  style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)', letterSpacing: '-0.04em', color: 'var(--brown-900)' }}
                >
                  {HACKATHON_NAME}
                </h1>

                {/* Tagline */}
                <p
                  className="text-brown-600 max-w-[58ch] mb-10 leading-relaxed font-medium"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)' }}
                >
                  {HACKATHON_TAGLINE}
                </p>

                {/* CTA row */}
                <div className="flex flex-wrap items-center gap-4 mb-0">
                  <HoverLiftButton>
                    <Link
                      href="/portal"
                      className="
                        btn-primary
                        inline-flex items-center gap-2
                        text-white
                        px-8 py-4
                        rounded-sharp
                        font-semibold
                        text-[0.9375rem] tracking-wide
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-900
                      "
                      style={{ backgroundColor: 'var(--brown-900)' }}
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

                  <a
                    href="#about"
                    className="
                      inline-flex items-center gap-2
                      font-medium text-brown-600
                      text-[0.9375rem] tracking-wide
                      hover:text-brown-900
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
                        group-hover:border-brown-900
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

              {/* Right Column: Timer & Stats */}
              <div className="flex flex-col justify-center">
                <div className="lg:pt-8">
                  <dl className="grid grid-cols-2 gap-4 pt-4">
                    {/* Prize Pool */}
                    <div>
                      <dt className="text-caps mb-1" style={{ color: 'var(--brown-600)' }}>Prize Pool</dt>
                      <dd>
                        <div className="stat-frame">
                          <span className="stat-value" style={{ fontSize: '1rem' }}>₹</span>
                          <CountUpCounter target={5} minDigits={1} style={compactDigitStyle} />
                          <span className="stat-value" style={{ fontSize: '1rem' }}>&nbsp;Lakhs</span>
                        </div>
                      </dd>
                    </div>
                    {/* Teams */}
                    <div>
                      <dt className="text-caps mb-1" style={{ color: 'var(--brown-600)' }}>Teams</dt>
                      <dd>
                        <div className="stat-frame">
                          <CountUpCounter target={100} minDigits={1} style={compactDigitStyle} />
                          <span className="stat-value" style={{ fontSize: '1rem' }}>&nbsp;+</span>
                        </div>
                      </dd>
                    </div>
                    {/* Dates */}
                    <div>
                      <dt className="text-caps mb-1" style={{ color: 'var(--brown-600)' }}>Event Dates</dt>
                      <dd>
                        <div className="stat-frame">
                          <span className="stat-value" style={{ fontSize: '0.875rem' }}>{STAT_EVENT_DATE}</span>
                        </div>
                      </dd>
                    </div>
                    {/* Venue */}
                    <div>
                      <dt className="text-caps mb-1" style={{ color: 'var(--brown-600)' }}>Venue</dt>
                      <dd>
                        <div className="stat-frame">
                          <span className="stat-value" style={{ fontSize: '0.875rem' }}>{STAT_LOCATION}</span>
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

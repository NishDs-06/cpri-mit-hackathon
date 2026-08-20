'use client';

import Link from 'next/link';
import { GlyphMatrix } from '@/components/ui/GlyphMatrix';
import { HoverLiftButton } from '@/components/ui/TiltCard';
import {
  HACKATHON_TAGLINE,
  STAT_EVENT_DATE,
  STAT_LOCATION,
} from '@/lib/constants';

const STATS = [
  { label: 'Prize Pool',  value: '₹5 Lakhs' },
  { label: 'Teams',       value: '100+' },
  { label: 'Event Dates', value: STAT_EVENT_DATE },
  { label: 'Venue',       value: STAT_LOCATION },
];

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
        {/* Spacer for fixed navbar (84px) */}
        <div className="h-[84px]" aria-hidden="true" />

        {/* Hero viewport container — vertically centered */}
        <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-10 w-full py-12 lg:py-20">
          <div className="max-w-4xl w-full">
            
            {/* Headline Lockup */}
            <h1 className="font-display font-bold leading-[1.02] mb-8 tracking-tight">
              <span className="block text-brown-900 whitespace-nowrap" style={{ fontSize: 'clamp(2.5rem, 11.5vw, 6.75rem)' }}>
                CPRI × VED
              </span>
            </h1>

            {/* Tagline */}
            <p
              className="text-brown-600 max-w-[58ch] mb-10 leading-relaxed font-medium animate-fadeIn"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)' }}
            >
              {HACKATHON_TAGLINE}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-6 mb-16">
              <HoverLiftButton>
                <Link
                  href="/portal"
                  className="
                    btn-primary
                    inline-flex items-center gap-2
                    text-white
                    px-5 py-3 sm:px-8 sm:py-4
                    rounded-sharp
                    font-semibold
                    text-[0.875rem] sm:text-[0.9375rem] tracking-wide
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

            {/* Event Metadata Container — Below CTA in one line on desktop */}
            <div
              className="border rounded-[10px] p-6 sm:p-8 max-w-3xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.35)',
                borderColor: 'rgba(60, 42, 30, 0.12)',
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {STATS.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-caps text-[0.75rem] text-brown-600 mb-1.5">{label}</dt>
                    <dd className="font-display font-semibold text-brown-900 text-[1.125rem] sm:text-[1.25rem] leading-tight">{value}</dd>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
// HMR recompile trigger 5

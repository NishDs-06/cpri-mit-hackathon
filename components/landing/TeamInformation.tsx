'use client';

import { HoverLiftButton } from '@/components/ui/TiltCard';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { TEAM_INFO } from '@/lib/constants';

/**
 * TeamInformation section.
 *
 * Covers: team size, eligibility, institution requirements, what to prepare.
 *
 * ALL values are placeholders from lib/constants.ts — marked with {{TODO}}.
 * Do not invent eligibility rules. Search for "{{" in constants.ts to find
 * all values that need to be filled in by the organizers before go-live.
 *
 * Layout:
 *  - Two-column on desktop: left = rules/eligibility, right = what you need
 *  - bg-bg-alt to differentiate from the surrounding white sections
 */
export default function TeamInformation() {
  return (
    <section
      id="team-info"
      className="bg-bg-alt border-t border-border-hairline py-24 lg:py-32"
      aria-labelledby="team-info-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-caps mb-3 flex items-center gap-3" style={{ color: 'var(--brown-600)' }}>
            <span className="block w-8 h-px" style={{ background: 'var(--brown-300)' }} aria-hidden="true" />
            Team Information
          </p>
          <h2
            id="team-info-heading"
            className="font-bold"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--brown-900)' }}
          >
            Who can participate
          </h2>
        </div>

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left: Team composition + eligibility */}
          <div>
            {/* Team size */}
            <div className="mb-10">
              <h3 className="font-semibold mb-4"
                style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)', color: 'var(--brown-900)' }}
              >
                Team Size
              </h3>
              <div className="flex gap-8">
                <div>
                  <p className="text-caps text-brown-600 mb-1">Minimum</p>
                  <p
                    className="font-bold tabular-nums"
                    style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--brown-900)' }}
                  >
                    {/* TODO: Confirm minimum team size with organizers */}
                    {TEAM_INFO.minSize}
                  </p>
                  <p className="text-brown-600 text-sm">members</p>
                </div>
                <div
                  aria-hidden="true"
                  className="w-px bg-border-hairline self-stretch"
                />
                <div>
                  <p className="text-caps text-brown-600 mb-1">Maximum</p>
                  <p
                    className="font-bold tabular-nums"
                    style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--brown-900)' }}
                  >
                    {/* TODO: Confirm maximum team size with organizers */}
                    {TEAM_INFO.maxSize}
                  </p>
                  <p className="text-brown-600 text-sm">members</p>
                </div>
              </div>
            </div>

            {/* Eligibility rules */}
            <div className="mb-10">
              <h3 className="font-semibold mb-4"
                style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)', color: 'var(--brown-900)' }}
              >
                Eligibility
              </h3>
              <ul className="space-y-3">
                {TEAM_INFO.eligibilityRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: 'var(--brown-300)' }}
                    />
                    <span className="text-brown-600 text-[0.9375rem] leading-relaxed">
                      {/* TODO: Replace with real eligibility rule from organizers */}
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institution requirements */}
            <div>
              <h3 className="font-semibold mb-3"
                style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)', color: 'var(--brown-900)' }}
              >
                Institution Requirements
              </h3>
              <p className="text-brown-600 text-[0.9375rem] leading-relaxed">
                {/* TODO: Replace with real institution requirements from organizers */}
                {TEAM_INFO.institutionRequirements}
              </p>
            </div>
          </div>

          {/* Right: What you need to register */}
          <div>
            <h3 className="font-semibold mb-6"
              style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)', color: 'var(--brown-900)' }}
            >
              What you'll need to register
            </h3>

            <ul className="space-y-4">
              {TEAM_INFO.whatYouNeed.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 border-b border-border-hairline pb-4 last:border-0 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex-shrink-0
                      w-7 h-7 rounded-sharp
                      flex items-center justify-center
                      text-[0.6875rem] font-semibold
                      tabular-nums
                      mt-0.5
                    "
                    style={{ background: 'var(--brown-300)', color: 'var(--brown-900)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-brown-600 text-[0.9375rem] leading-relaxed">
                    {/* TODO: Replace with real requirement from organizers */}
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA to register */}
            <div className="mt-10 pt-8 border-t border-border-hairline">
              <p className="text-brown-600 text-sm mb-4">
                Ready to register? Create your team on the portal.
              </p>
              <HoverLiftButton>
                <a
                  href="/portal"
                  className="
                    inline-flex items-center gap-2
                    text-white
                    px-6 py-3.5
                    rounded-sharp
                    font-medium
                    text-[0.9375rem]
                    hover:bg-brown-800
                    transition-colors duration-150
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-900
                  "
                  style={{ backgroundColor: 'var(--brown-900)' }}
                >
                  Register Your Team
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </HoverLiftButton>
            </div>
          </div>
        </div>

        {/* Countdown — placed here so it's visible in the registration context */}
        <div className="mt-16 pt-12 border-t flex flex-col items-center justify-center animate-fadeIn" style={{ borderColor: 'var(--brown-300)' }}>
          <p className="text-caps mb-4 uppercase font-semibold text-[0.6875rem] tracking-[0.12em]" style={{ color: 'var(--brown-600)' }}>
            Event Countdown
          </p>
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}

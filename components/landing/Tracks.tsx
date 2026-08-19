import { TRACKS } from '@/lib/constants';

/**
 * Tracks section — three challenge tracks as large numbered horizontal sections.
 *
 * Layout spec:
 *  - NOT cards. Each track is a full-width horizontal section with a large
 *    number (01/02/03) in display type acting as the anchor, followed by
 *    the track name, description, and focus bullets.
 *  - Alternating bg-base / bg-alt to create visual rhythm without borders.
 *  - Track content is ALL placeholder — do not invent track names.
 *    Every value comes from TRACKS constant in lib/constants.ts.
 *    Search for {{TRACK_*}} to find all TODOs.
 *
 * TODO: Fill in TRACKS array in lib/constants.ts with real track content
 * from organizers before going live. Do not hardcode content here.
 */
export default function Tracks() {
  return (
    <section
      id="tracks"
      aria-labelledby="tracks-heading"
    >
      {/* Section header — sits above the alternating track rows */}
      <div className="bg-bg-base border-t border-border-hairline py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-4">
            <p className="text-caps flex items-center gap-3 mb-2" style={{ color: 'var(--brown-600)' }}>
              <span className="block w-6 h-px" style={{ background: 'var(--brown-600)' }} aria-hidden="true" />
              Challenge Tracks
            </p>
            <span className="eyebrow-rule" aria-hidden="true" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="tracks-heading"
              className="font-bold"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: 'var(--brown-900)',
                letterSpacing: '-0.03em',
              }}
            >
              Three tracks.<br />One grid.
            </h2>
            <p className="text-sm max-w-[40ch] sm:text-right" style={{ color: 'var(--brown-600)' }}>
              Each track addresses a distinct challenge domain within India's power
              infrastructure. Teams apply to one track.
            </p>
          </div>
        </div>
      </div>

      {/* Track rows — alternating backgrounds */}
      {TRACKS.map((track, i) => (
        <TrackRow key={track.number} track={track} index={i} />
      ))}
    </section>
  );
}

/* ─── TrackRow ───────────────────────────────────────────────────────────── */

interface TrackData {
  number: string;
  name: string;
  description: string;
  bullets: readonly string[];
}

function TrackRow({ track, index }: { track: TrackData; index: number }) {
  const isAlt = index % 2 === 1;

  return (
    <div
      className={`
        ${isAlt ? 'bg-bg-alt' : 'bg-bg-base'}
        border-t border-border-hairline
        py-16 lg:py-20
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-8 lg:gap-16 items-start">
          {/* Large track number — editorial anchor */}
          <div className="hidden lg:block">
            <span
              className="font-bold select-none tabular-nums"
              style={{
                color: 'rgba(60,42,30,0.15)',
                fontSize: 'clamp(4rem, 7vw, 6rem)',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {track.number}
            </span>
          </div>

          {/* Track identity + description */}
          <div>
            {index === 0 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mb-3" style={{ color: 'var(--brown-600)' }} stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" strokeLinecap="round" />
                <path d="M2 18h20" strokeLinecap="round" />
                <path d="M5 18v-3M12 18v-3M19 18v-3" strokeLinecap="round" />
              </svg>
            )}
            {index === 1 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mb-3" style={{ color: 'var(--brown-600)' }} stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12h3l2-4 2 8 2-8 2 8 2-4h3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {index === 2 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mb-3" style={{ color: 'var(--brown-600)' }} stroke="currentColor" strokeWidth="1.5">
                <rect x="7" y="7" width="10" height="10" rx="1" />
                <path d="M10 7V4M14 7V4" strokeLinecap="round" />
                <path d="M10 20v-3M14 20v-3" strokeLinecap="round" />
                <path d="M7 10H4M7 14H4" strokeLinecap="round" />
                <path d="M20 10h-3M20 14h-3" strokeLinecap="round" />
              </svg>
            )}

            {/* Mobile: show number inline */}
            <span className="lg:hidden text-caps mb-2 block" style={{ color: 'var(--brown-600)' }}>
              Track {track.number}
            </span>
            <h3
              className="font-bold mb-5"
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                color: 'var(--brown-900)',
                letterSpacing: '-0.02em',
              }}
            >
              {/* TODO: Replace with real track name from organizers */}
              {track.name}
            </h3>
            <p
              className="leading-relaxed"
              style={{
                fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)',
                color: 'var(--brown-600)',
              }}
            >
              {/* TODO: Replace with real track description from organizers */}
              {track.description}
            </p>
          </div>

          {/* Focus bullets */}
          <div>
            <p className="text-caps mb-4" style={{ color: 'var(--brown-600)' }}>
              Focus Areas
            </p>
            <ul className="space-y-3">
              {track.bullets.map((bullet, bi) => (
                <li key={bi} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--gold-muted)' }}
                  />
                  <span className="text-[0.9375rem] leading-relaxed" style={{ color: 'var(--brown-600)' }}>
                    {/* TODO: Replace with real focus bullet from organizers */}
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

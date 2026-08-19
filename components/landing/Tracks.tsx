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
          <p className="font-body text-caps text-blue-mid mb-3 flex items-center gap-3">
            <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
            Challenge Tracks
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="tracks-heading"
              className="font-display font-bold text-blue-deep"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              Three tracks.<br />One grid.
            </h2>
            <p className="font-body text-text-secondary text-sm max-w-[40ch] sm:text-right">
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
              className="font-display font-bold text-blue-primary/20 select-none tabular-nums"
              style={{ fontSize: 'clamp(4rem, 7vw, 6rem)', lineHeight: 1 }}
              aria-hidden="true"
            >
              {track.number}
            </span>
          </div>

          {/* Track identity + description */}
          <div>
            {/* Mobile: show number inline */}
            <span className="lg:hidden font-body text-caps text-blue-mid mb-2 block">
              Track {track.number}
            </span>
            <h3
              className="font-display font-bold text-blue-deep mb-5"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)' }}
            >
              {/* TODO: Replace with real track name from organizers */}
              {track.name}
            </h3>
            <p
              className="font-body text-text-secondary leading-relaxed"
              style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)' }}
            >
              {/* TODO: Replace with real track description from organizers */}
              {track.description}
            </p>
          </div>

          {/* Focus bullets */}
          <div>
            <p className="font-body text-caps text-text-secondary mb-4">
              Focus Areas
            </p>
            <ul className="space-y-3">
              {track.bullets.map((bullet, bi) => (
                <li key={bi} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-mid"
                  />
                  <span className="font-body text-text-secondary text-[0.9375rem] leading-relaxed">
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

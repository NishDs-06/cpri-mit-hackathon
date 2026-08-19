/**
 * Resources — gated content panel.
 *
 * Gate logic:
 *  - `isUnlocked` = false → show locked state (before shortlist)
 *  - `isUnlocked` = true  → show file list (real content comes later)
 *
 * Gate determined by team.status === 'shortlisted' | 'submission_open'
 * in the parent (/portal/resources/page.tsx).
 *
 * Real resource content (files, links) is not stored in this component.
 * When shortlisted, this component renders a placeholder list.
 * TODO: Wire to real file list API endpoint when available.
 */
interface ResourcesProps {
  isUnlocked: boolean;
}

export default function Resources({ isUnlocked }: ResourcesProps) {
  if (!isUnlocked) {
    return <LockedState />;
  }

  return <UnlockedState />;
}

function LockedState() {
  return (
    <div className="max-w-lg mx-auto text-center py-16">
      {/* Lock icon */}
      <div className="w-14 h-14 rounded-full bg-bg-alt border border-border-hairline flex items-center justify-center mx-auto mb-6">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="9" width="14" height="10" rx="2" stroke="var(--text-secondary)" strokeWidth="1.5"/>
          <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <h2 className="font-display font-semibold text-blue-deep text-xl mb-3">
        Resources locked
      </h2>
      <p className="font-body text-text-secondary text-[0.9375rem] leading-relaxed max-w-[40ch] mx-auto">
        Resources will be available to shortlisted teams after the selection
        announcement. Check back after the shortlist is published.
      </p>

      <p className="font-body text-caps text-text-secondary mt-8 text-xs">
        {/* TODO: Replace with real shortlist announcement date */}
        Shortlist date: TODO — confirm with organizers
      </p>
    </div>
  );
}

function UnlockedState() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display font-semibold text-blue-deep text-xl mb-2">
          Resources
        </h2>
        <p className="font-body text-text-secondary text-sm">
          Your team has been shortlisted. The following resources are now available.
        </p>
      </div>

      {/* Placeholder resource list — TODO: wire to real API */}
      <div className="border border-border-hairline rounded-firm divide-y divide-border-hairline">
        {[
          { name: 'Problem Statement — Track 01', type: 'PDF', size: 'TODO' },
          { name: 'Problem Statement — Track 02', type: 'PDF', size: 'TODO' },
          { name: 'Problem Statement — Track 03', type: 'PDF', size: 'TODO' },
          { name: 'Dataset Package',              type: 'ZIP', size: 'TODO' },
          { name: 'Evaluation Rubric',            type: 'PDF', size: 'TODO' },
        ].map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <span className="font-body text-[0.6875rem] font-semibold tracking-wide uppercase px-1.5 py-0.5 bg-blue-tint text-blue-primary rounded-sharp border border-blue-mid/20">
                {file.type}
              </span>
              <span className="font-body text-text-primary text-sm">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              className="
                font-body text-[0.8125rem] text-blue-mid
                hover:text-blue-primary transition-colors
                flex items-center gap-1.5
              "
              aria-label={`Download ${file.name}`}
            >
              Download
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 2v6M3 6l3 3 3-3M2 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <p className="font-body text-text-secondary text-xs mt-4">
        {/* TODO: Wire download links to real file storage (S3, GCS, etc.) */}
        Download links are placeholders — real files will be added before shortlist announcement.
      </p>
    </div>
  );
}

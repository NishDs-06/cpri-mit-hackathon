/**
 * Submission — gated submission panel.
 *
 * Gate logic:
 *  - `isOpen` = false → locked (before submission window)
 *  - `isOpen` = true  → submission form (real form comes later)
 *
 * Gate determined by the `submission_open` portal nav state in the parent.
 * TODO: Wire submission form to real backend endpoint when available.
 */
interface SubmissionProps {
  isOpen: boolean;
}

export default function Submission({ isOpen }: SubmissionProps) {
  if (!isOpen) {
    return <LockedState />;
  }

  return <OpenState />;
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
        Submission not yet open
      </h2>
      <p className="font-body text-text-secondary text-[0.9375rem] leading-relaxed max-w-[40ch] mx-auto">
        The submission portal will open during the hackathon. You'll be notified
        by email when it's live.
      </p>

      <p className="font-body text-caps text-text-secondary mt-8 text-xs">
        {/* TODO: Replace with real submission open date/time */}
        Submission window: TODO — 10 Oct 2026 (Day 1), time TBD
      </p>
    </div>
  );
}

function OpenState() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display font-semibold text-blue-deep text-xl mb-2">
          Submit Your Solution
        </h2>
        <p className="font-body text-text-secondary text-sm">
          Upload your final deliverables before the submission deadline.
        </p>
      </div>

      {/* Placeholder submission form — TODO: wire to real API */}
      <div className="border border-border-hairline rounded-firm p-8 bg-bg-panel">
        <p className="font-body text-text-secondary text-sm text-center py-8">
          {/* TODO: Add submission form (file upload, GitHub link, demo video link) */}
          Submission form will be available here when the window opens.
        </p>
      </div>

      <p className="font-body text-text-secondary text-xs mt-4">
        {/* TODO: Add real submission deadline from organizers */}
        Submission deadline: TODO — confirm with organizers
      </p>
    </div>
  );
}

'use client';

import { useAuth } from '@/context/AuthContext';
import Submission from '@/components/portal/Submission';

/**
 * /portal/submission — gated submission page.
 *
 * Gate:
 *  - Submission portal is locked until explicitly announced.
 *  - Currently hardcoded to `isOpen = false`.
 *
 * TODO: Replace `isOpen` with a real signal from the backend.
 *       Options:
 *        a) A dedicated `GET /api/submission/status` endpoint
 *        b) A flag in the team response (e.g. team.submissionOpen)
 *        c) A global config endpoint (e.g. GET /api/config)
 *       Once the backend contract is decided, update this component.
 *
 * The Submission component handles the locked/open UI.
 */
export default function PortalSubmissionPage() {
  const { authState } = useAuth();

  if (authState !== 'authenticated') return null;

  // TODO: Replace with real backend signal
  const isOpen = false;

  return (
    <div>
      <div className="mb-8">
        <p className="font-body text-caps text-blue-mid mb-2">Team Portal</p>
        <h1
          className="font-display font-bold text-blue-deep"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Submission
        </h1>
      </div>

      <Submission isOpen={isOpen} />
    </div>
  );
}

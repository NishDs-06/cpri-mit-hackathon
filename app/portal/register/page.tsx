'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RegistrationFlow from '@/components/portal/RegistrationFlow';
import type { Team } from '@/types';

/**
 * /portal/register — first-visit registration flow.
 *
 * 4 steps: 01 TEAM → 02 COLLEGE → 03 MEMBERS → 04 REVIEW
 *
 * On completion → redirect to /portal/team.
 *
 * Layout is inside the portal layout shell (layout.tsx provides
 * the PortalNav and authenticated wrapper).
 */
export default function PortalRegisterPage() {
  const router = useRouter();
  const { authState } = useAuth();

  const handleComplete = (_team: Team) => {
    router.push('/portal/team');
  };

  if (authState !== 'authenticated') {
    return null; // Layout handles the sign-in screen
  }

  return (
    <div>
      <div className="mb-10">
        <p className="font-body text-caps text-blue-mid mb-2">New Registration</p>
        <h1
          className="font-display font-bold text-blue-deep"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Register Your Team
        </h1>
        <p className="font-body text-text-secondary text-sm mt-2">
          Complete all steps to register for the CPRI × MIT Bengaluru Hackathon 2026.
        </p>
      </div>

      <RegistrationFlow onComplete={handleComplete} />
    </div>
  );
}

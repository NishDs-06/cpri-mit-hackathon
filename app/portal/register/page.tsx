'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RegistrationFlow from '@/components/portal/RegistrationFlow';
import CountdownTimer from '@/components/ui/CountdownTimer';
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
        <p className="text-caps mb-2" style={{ color: 'var(--brown-600)' }}>New Registration</p>
        <h1
          className="font-bold"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--brown-900)' }}
        >
          Register Your Team
        </h1>
        <p className="text-text-secondary text-sm mt-2">
          Complete all steps to register for the CPRI × MIT Bengaluru Hackathon 2026.
        </p>
      </div>

      {/* Countdown timer — visible in the registration flow context */}
      <div className="mt-8 mb-8 p-6 rounded-[10px] border" style={{ background: 'var(--surface)', borderColor: 'var(--brown-300)', boxShadow: 'var(--shadow-l1)' }}>
        <p className="text-caps mb-2" style={{ color: 'var(--brown-600)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Event Countdown</p>
        <CountdownTimer />
      </div>

      <RegistrationFlow onComplete={handleComplete} />
    </div>
  );
}

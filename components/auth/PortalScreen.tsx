'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getMyTeam } from '@/lib/api/teams';
import { ApiError } from '@/lib/errors';
import ProfileForm from './ProfileForm';
import TeamPanel from './TeamPanel';
import TeamRoster from './TeamRoster';
import ErrorScreen from './ErrorScreen';
import type { Team } from '@/types';

type PortalStep = 'profile' | 'team_setup' | 'team_roster';

/**
 * Authenticated portal — shown when authState === 'authenticated'.
 *
 * Step progression:
 *  1. Profile incomplete → ProfileForm
 *  2. Profile complete, no team → TeamPanel (create or join)
 *  3. Team exists → TeamRoster
 *
 * The portal fetches the user's current team from the backend on mount.
 * It never infers team state from local variables — the backend response is authoritative.
 */
export default function PortalScreen() {
  const { profile, logout, session } = useAuth();
  const [step, setStep] = useState<PortalStep>('profile');
  const [team, setTeam] = useState<Team | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isForbidden, setIsForbidden] = useState(false);

  // Determine initial step based on profile completeness and team membership
  useEffect(() => {
    void (async () => {
      try {
        // Profile complete check: require name + college at minimum
        const profileComplete = !!(profile?.name && profile?.college);

        if (!profileComplete) {
          setStep('profile');
          setLoading(false);
          return;
        }

        // Check for existing team membership
        const myTeam = await getMyTeam();
        if (myTeam) {
          setTeam(myTeam);
          setStep('team_roster');
        } else {
          setStep('team_setup');
        }
      } catch (err) {
        if (err instanceof ApiError && err.isForbidden) {
          setIsForbidden(true);
        } else {
          setLoadError('Failed to load your team. Please refresh.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [profile]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="font-body text-sm text-text-secondary">Loading your portal…</span>
      </div>
    );
  }

  if (isForbidden) {
    return <ErrorScreen type="forbidden" />;
  }

  if (loadError) {
    return <ErrorScreen type="server_error" onBack={() => setLoadError(null)} />;
  }

  return (
    <div>
      {/* Portal header */}
      <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
        <div>
          <h3 className="font-display font-semibold text-blue-deep text-xl mb-0.5">
            Your Registration Portal
          </h3>
          <p className="font-body text-text-secondary text-sm">
            {session?.email}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="
            font-body text-[0.8125rem] text-text-secondary
            border border-border-hairline rounded-sharp px-4 py-2
            hover:border-blue-primary hover:text-blue-primary
            transition-colors duration-150
          "
        >
          Sign out
        </button>
      </div>

      {/* Step indicator */}
      <StepIndicator current={step} />

      {/* Active step content */}
      <div className="mt-10">
        {step === 'profile' && (
          <ProfileForm
            onComplete={() => setStep('team_setup')}
          />
        )}
        {step === 'team_setup' && (
          <TeamPanel
            onTeamJoined={(joinedTeam) => {
              setTeam(joinedTeam);
              setStep('team_roster');
            }}
          />
        )}
        {step === 'team_roster' && team && (
          <TeamRoster team={team} />
        )}
      </div>
    </div>
  );
}

/* ─── Step indicator ─────────────────────────────────────────────────────── */

const STEPS: { key: PortalStep; label: string }[] = [
  { key: 'profile',    label: 'Profile'  },
  { key: 'team_setup', label: 'Team'     },
  { key: 'team_roster', label: 'Roster' },
];

function StepIndicator({ current }: { current: PortalStep }) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);

  return (
    <nav aria-label="Registration steps">
      <ol className="flex items-center gap-0">
        {STEPS.map((step, i) => {
          const done    = i < currentIdx;
          const active  = i === currentIdx;

          return (
            <li key={step.key} className="flex items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    font-body text-[0.6875rem] font-semibold
                    border transition-colors duration-200
                    ${done   ? 'bg-blue-primary border-blue-primary text-white'         : ''}
                    ${active ? 'bg-white border-blue-primary text-blue-primary'         : ''}
                    ${!done && !active ? 'bg-white border-border-hairline text-text-secondary' : ''}
                  `}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span
                  className={`font-body text-[0.8125rem] font-medium ${
                    active ? 'text-blue-primary' : 'text-text-secondary'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`
                    mx-3 flex-1 h-px w-8
                    ${done ? 'bg-blue-primary' : 'bg-border-hairline'}
                  `}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

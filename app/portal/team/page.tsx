'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getMyTeam } from '@/lib/api/teams';
import TeamOverview from '@/components/portal/TeamOverview';
import type { Team } from '@/types';

/**
 * /portal/team — team overview page.
 *
 * Shows: team name, team ID, status badge, college, member list (name + role).
 * EDIT TEAM is permission-gated: only team_lead role sees the button.
 *
 * Data fetched from backend via GET /api/teams/me.
 * If no team found, redirects to /portal/register.
 */
export default function PortalTeamPage() {
  const { authState, profile } = useAuth();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authState !== 'authenticated') return;

    void getMyTeam()
      .then((t) => {
        if (!t) {
          router.push('/portal/register');
          return;
        }
        setTeam(t);
      })
      .catch(() => setError('Failed to load team. Please refresh.'))
      .finally(() => setLoading(false));
  }, [authState, router]);

  if (authState !== 'authenticated') return null;

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="font-body text-sm text-text-secondary">Loading team…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="font-body text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 font-body text-sm text-blue-mid hover:text-blue-primary transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!team) return null;

  return (
    <div>
      <div className="mb-8">
        <p className="font-body text-caps text-blue-mid mb-2">Team Portal</p>
        <h1
          className="font-display font-bold text-blue-deep"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Your Team
        </h1>
      </div>

      <TeamOverview
        team={team}
        userRole={profile?.role ?? 'member'}
        onEdit={() => {
          // TODO: Implement team edit modal / page
          alert('Team editing coming soon.');
        }}
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getMyTeam } from '@/lib/api/teams';
import Resources from '@/components/portal/Resources';
import type { Team } from '@/types';

/**
 * /portal/resources — gated resources page.
 *
 * Gate logic:
 *  - team.status === 'shortlisted' → unlocked
 *  - any other status → locked (shows locked state UI)
 *
 * Real resource content (file links, datasets) comes later.
 * The gate is built now; content is wired when available.
 */
export default function PortalResourcesPage() {
  const { authState } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState !== 'authenticated') return;
    void getMyTeam()
      .then((t) => setTeam(t ?? null))
      .catch(() => setTeam(null))
      .finally(() => setLoading(false));
  }, [authState]);

  if (authState !== 'authenticated') return null;

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="font-body text-sm text-text-secondary">Loading…</p>
      </div>
    );
  }

  const isUnlocked = team?.status === 'shortlisted';

  return (
    <div>
      <div className="mb-8">
        <p className="font-body text-caps text-blue-mid mb-2">Team Portal</p>
        <h1
          className="font-display font-bold text-blue-deep"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Resources
        </h1>
      </div>

      <Resources isUnlocked={isUnlocked} />
    </div>
  );
}

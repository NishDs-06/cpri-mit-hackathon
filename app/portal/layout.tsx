'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTeamState } from '@/hooks/useTeamState';
import { getMyTeam } from '@/lib/api/teams';
import PortalNav from '@/components/portal/PortalNav';
import type { Team } from '@/types';

/**
 * Portal layout — authenticated shell for /portal/* routes.
 *
 * Auth gate:
 *  - loading → show skeleton
 *  - unauthenticated → show sign-in screen (magic-link flow, workspace feel)
 *  - session_expired → redirect to sign-in with expired state
 *  - authenticated → render portal with PortalNav
 *
 * Team state is fetched here and passed down to PortalNav to determine
 * which nav items to show. Child pages receive team state via props or
 * re-fetch from the API directly (no prop-drilling through deep trees).
 */
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState, loading: authLoading, session, logout } = useAuth();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [teamLoading, setTeamLoading] = useState(true);

  const navState = useTeamState(team);

  // Fetch team on mount (only when authenticated)
  useEffect(() => {
    if (authState !== 'authenticated') {
      setTeamLoading(false);
      return;
    }
    void getMyTeam()
      .then((t) => setTeam(t ?? null))
      .catch(() => setTeam(null))
      .finally(() => setTeamLoading(false));
  }, [authState]);

  // Redirect expired sessions to the sign-in screen
  useEffect(() => {
    if (!authLoading && authState === 'session_expired') {
      router.push('/portal'); // portal page handles sign-in display
    }
  }, [authState, authLoading, router]);

  const isLoading = authLoading || (authState === 'authenticated' && teamLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <p className="font-body text-sm text-text-secondary">Loading portal…</p>
      </div>
    );
  }

  // Unauthenticated: show sign-in inline (not a full redirect to homepage)
  if (authState === 'unauthenticated' || authState === 'session_expired') {
    return (
      <div className="min-h-screen bg-bg-alt">
        {children}
      </div>
    );
  }

  // Authenticated — show full portal shell
  return (
    <div className="min-h-screen bg-bg-base">
      <PortalNav
        navState={navState}
        userEmail={session?.email}
        onLogout={() => void logout()}
      />
      <main className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}

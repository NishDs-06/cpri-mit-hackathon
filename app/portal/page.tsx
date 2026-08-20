'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getMyTeam } from '@/lib/api/teams';
import AuthFlow from '@/components/auth/AuthFlow';

/**
 * /portal — default portal entry.
 *
 * Auth routing logic:
 *  - Unauthenticated / session_expired → show AuthFlow sign-in
 *  - Authenticated + no team → redirect to /portal/register
 *  - Authenticated + has team → redirect to /portal/team
 *
 * The sign-in screen uses the same AuthFlow component as before,
 * but styled as a workspace (not embedded in the marketing page).
 */
export default function PortalPage() {
  const { authState, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (authState !== 'authenticated') return;

    // Authenticated: check for existing team and redirect appropriately
    void (async () => {
      try {
        const team = await getMyTeam();
        if (team) {
          router.push('/portal/team');
        } else {
          router.push('/portal/register');
        }
      } catch {
        router.push('/portal/register');
      }
    })();
  }, [authState, loading, router]);

  // Show sign-in for unauthenticated users
  if (!loading && authState !== 'authenticated') {
    return (
      <div className="min-h-screen bg-bg-alt flex flex-col">
        {/* Workspace header — minimal, no marketing */}
        <div className="border-b border-border-hairline bg-bg-base px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <span className="font-display font-bold text-blue-primary text-[0.9375rem] tracking-wide">
              CPRI × MIT Bengaluru
            </span>
            <span aria-hidden="true" className="w-px h-4 bg-border-hairline" />
            <span className="font-body text-caps text-text-secondary">Team Portal</span>
          </div>
        </div>

        {/* Auth flow panel — workspace feel */}
        <div className="flex-1 flex items-start justify-center px-6 py-14">
          <div className="w-full max-w-xl">
            <div className="mb-10">
              <p className="font-body text-caps text-blue-mid mb-2">Registration Portal</p>
              <h1
                className="font-display font-bold text-blue-deep mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Sign in to your account
              </h1>
              <p className="font-body text-text-secondary text-[0.9375rem]">
                Sign in with Google to access your team dashboard and registration details.
              </p>
            </div>

            {/* Elevated card — L2 per spec: sign-in card → L2 + top highlight */}
            <div
              className="bg-bg-panel rounded-firm p-8"
              style={{ boxShadow: 'var(--shadow-l2)' }}
            >
              <AuthFlow />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading or redirecting
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <p className="font-body text-sm text-text-secondary">Loading…</p>
    </div>
  );
}

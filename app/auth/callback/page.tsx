'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ErrorScreen from '@/components/auth/ErrorScreen';

type CallbackState = 'verifying' | 'success' | 'error';

/**
 * Google OAuth callback handler.
 *
 * Checks if a session has been established by the backend, loads user state,
 * and redirects to /portal.
 */
export default function GoogleAuthCallbackPage() {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [state, setState] = useState<CallbackState>('verifying');

  useEffect(() => {
    void (async () => {
      try {
        // Refresh session + profile into AuthContext.
        // This validates that the session cookie was successfully set.
        const session = await refreshSession();

        if (session) {
          setState('success');
          // Redirect to /portal
          router.push('/portal');
        } else {
          setState('error');
        }
      } catch (err) {
        setState('error');
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="w-full max-w-[440px]">
        {state === 'verifying' && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-2 border-border-hairline border-t-blue-primary rounded-full animate-spin mb-6" />
            <p className="font-body text-text-secondary text-sm">
              Verifying Google sign in…
            </p>
          </div>
        )}

        {state === 'success' && (
          <div className="text-center py-8">
            <p className="font-body text-text-secondary text-sm">
              Successfully signed in — redirecting to portal…
            </p>
          </div>
        )}

        {state === 'error' && (
          <ErrorScreen
            type="server_error"
            onBack={() => router.push('/portal')}
          />
        )}
      </div>
    </div>
  );
}

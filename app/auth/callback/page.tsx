'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyMagicLinkToken } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/lib/errors';
import ErrorScreen from '@/components/auth/ErrorScreen';

type CallbackState = 'verifying' | 'success' | 'expired' | 'invalid' | 'error';

/**
 * Magic link callback handler.
 *
 * Outer wrapper provides the Suspense boundary required by Next.js 15 App Router
 * for pages that use useSearchParams() during static generation.
 *
 * Flow:
 *  1. Extract token from URL search params
 *  2. POST token to backend for verification (token is in POST body, NOT URL)
 *  3. On success: call refreshSession() to populate AuthContext with the new session
 *     BEFORE redirecting — so the portal renders in authenticated state immediately,
 *     preventing a stale unauthenticated flash.
 *  4. Redirect to /#register after session is refreshed
 *
 * Error states:
 *  - 401 → expired token
 *  - 400 → invalid/already-used token
 *  - Other → generic server error
 *
 * SECURITY: The token is read from the URL only to extract it; it is then sent
 * in the POST body. It is NOT forwarded in any URL or Referer header to the backend.
 */
export default function MagicLinkCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
          <div className="w-full max-w-[440px] text-center py-8">
            <div className="inline-block w-8 h-8 border-2 border-border-hairline border-t-blue-primary rounded-full animate-spin mb-6" />
            <p className="font-body text-text-secondary text-sm">
              Verifying your magic link…
            </p>
          </div>
        </div>
      }
    >
      <MagicLinkCallbackHandler />
    </Suspense>
  );
}

function MagicLinkCallbackHandler() {
  const searchParams   = useSearchParams();
  const router         = useRouter();
  const { refreshSession } = useAuth();
  const [state, setState] = useState<CallbackState>('verifying');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setState('invalid');
      return;
    }

    void (async () => {
      try {
        // 1. Verify token with backend — sends token in POST body
        await verifyMagicLinkToken(token);

        // 2. Refresh session + profile into AuthContext BEFORE redirecting
        //    This prevents the portal from rendering in a stale unauthenticated state
        await refreshSession();

        setState('success');

        // 3. Remove token from URL history (replaceState) then navigate
        //    Prevents the token from being in the back-button history
        window.history.replaceState({}, '', '/auth/callback');
        router.push('/#register');
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 401) {
            setState('expired');
          } else if (err.status === 400) {
            setState('invalid');
          } else {
            setState('error');
          }
        } else {
          setState('error');
        }
      }
    })();
  // refreshSession is stable (useCallback with no deps); router and searchParams are stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="w-full max-w-[440px]">
        {state === 'verifying' && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-2 border-border-hairline border-t-blue-primary rounded-full animate-spin mb-6" />
            <p className="font-body text-text-secondary text-sm">
              Verifying your magic link…
            </p>
          </div>
        )}

        {state === 'success' && (
          <div className="text-center py-8">
            <p className="font-body text-text-secondary text-sm">
              Verified — redirecting to your portal…
            </p>
          </div>
        )}

        {state === 'expired' && (
          <ErrorScreen
            type="expired_link"
            onBack={() => router.push('/#register')}
          />
        )}

        {state === 'invalid' && (
          <ErrorScreen
            type="invalid_link"
            onBack={() => router.push('/#register')}
          />
        )}

        {state === 'error' && (
          <ErrorScreen
            type="server_error"
            onBack={() => router.push('/#register')}
          />
        )}
      </div>
    </div>
  );
}

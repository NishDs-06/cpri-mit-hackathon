'use client';

import { useAuth } from '@/context/AuthContext';
import SignInRegisterScreen  from './SignInRegisterScreen';
import CheckEmailScreen      from './CheckEmailScreen';
import PortalScreen          from './PortalScreen';
import SessionExpiredScreen  from './SessionExpiredScreen';

/**
 * Auth flow state machine.
 *
 * Maps AuthState → UI screen:
 *
 *   unauthenticated  → SignInRegisterScreen (default tab: Sign In)
 *   magic_link_sent  → CheckEmailScreen
 *   authenticated    → PortalScreen (profile → team → roster)
 *   session_expired  → SessionExpiredScreen
 *
 * Expired/invalid link errors are handled by app/auth/callback/page.tsx
 * (the MagicLinkCallbackHandler), which redirects here after setting the
 * appropriate error state if needed.
 *
 * The loading skeleton prevents a flash of the unauthenticated screen
 * before the initial getSession() call resolves.
 */
export default function AuthFlow() {
  const { authState, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center py-16" aria-label="Loading authentication status">
        <div className="space-y-3 w-full max-w-[440px]">
          <div className="h-10 rounded-sharp bg-border-hairline animate-pulse" />
          <div className="h-14 rounded-sharp bg-border-hairline animate-pulse opacity-70" />
          <div className="h-12 rounded-sharp bg-border-hairline animate-pulse opacity-50" />
        </div>
      </div>
    );
  }

  switch (authState) {
    case 'authenticated':
      return <PortalScreen />;
    case 'magic_link_sent':
      return <CheckEmailScreen />;
    case 'session_expired':
      return <SessionExpiredScreen />;
    case 'unauthenticated':
    default:
      return <SignInRegisterScreen />;
  }
}

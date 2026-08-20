'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

/**
 * Session expired screen.
 * Rendered when the backend returns 401 on getSession() / getMe()
 * and the user previously had a session (i.e., authState === 'session_expired').
 */
export default function SessionExpiredScreen() {
  const { logout } = useAuth();

  return (
    <div className="max-w-[440px] w-full mx-auto text-center py-8">
      <div
        className="w-14 h-14 rounded-firm border border-border-hairline flex items-center justify-center mx-auto mb-6"
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="9" stroke="var(--blue-mid)" strokeWidth="1.5"/>
          <path d="M11 6.5V11.5L14 14" stroke="var(--blue-mid)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 className="font-display font-semibold text-blue-deep text-xl mb-2">
        Session Expired
      </h3>
      <p className="font-body text-text-secondary text-sm leading-relaxed mb-8">
        Your session has expired for security reasons. Please sign in again with Google.
      </p>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={() => void logout()}
      >
        Sign In Again
      </Button>
    </div>
  );
}

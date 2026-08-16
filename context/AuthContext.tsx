'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getSession, logout as apiLogout } from '@/lib/api/auth';
import { getMe } from '@/lib/api/profile';
import { ApiError } from '@/lib/errors';
import type { AuthSession, AuthState, Profile } from '@/types';

interface AuthContextValue {
  /** Current auth state — drives which screen the auth flow renders */
  authState: AuthState;
  /** Backend-provided session — null when unauthenticated */
  session: AuthSession | null;
  /** Authenticated user's profile — null until fetched after session established */
  profile: Profile | null;
  /** Whether the initial auth check is still in flight */
  loading: boolean;
  /**
   * Marks state as 'magic_link_sent' — called after requestMagicLink() succeeds.
   * Does NOT establish a real session; that happens only after the magic link is clicked.
   */
  onMagicLinkSent: (email: string) => void;
  /**
   * Refreshes the session and profile from the backend.
   * Called by MagicLinkCallbackHandler after token verification before redirecting,
   * so the portal renders in the correct authenticated state immediately.
   */
  refreshSession: () => Promise<void>;
  /** Logs out — calls the backend, then clears local auth state */
  logout: () => Promise<void>;
  /** The email the magic link was sent to (for the "check your inbox" screen) */
  magicLinkEmail: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>('unauthenticated');
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [magicLinkEmail, setMagicLinkEmail] = useState<string | null>(null);

  /**
   * On mount, check for an existing session from the backend.
   * This is the ONLY source of auth truth — never localStorage.
   */
  useEffect(() => {
    void (async () => {
      try {
        const currentSession = await getSession();
        if (currentSession) {
          setSession(currentSession);
          const userProfile = await getMe();
          setProfile(userProfile);
          setAuthState('authenticated');
        } else {
          setAuthState('unauthenticated');
        }
      } catch (err) {
        if (err instanceof ApiError && err.isUnauthorized) {
          setAuthState('session_expired');
        } else {
          setAuthState('unauthenticated');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onMagicLinkSent = useCallback((email: string) => {
    setMagicLinkEmail(email);
    setAuthState('magic_link_sent');
  }, []);

  /**
   * Refresh session + profile from the backend.
   * MagicLinkCallbackHandler calls this BEFORE redirecting to the portal,
   * ensuring the context is populated and the portal doesn't flash as unauthenticated.
   */
  const refreshSession = useCallback(async () => {
    try {
      const currentSession = await getSession();
      if (currentSession) {
        setSession(currentSession);
        const userProfile = await getMe();
        setProfile(userProfile);
        setAuthState('authenticated');
      } else {
        setAuthState('session_expired');
      }
    } catch (err) {
      if (err instanceof ApiError && err.isUnauthorized) {
        setAuthState('session_expired');
      }
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      // Always clear local state, even if the backend call fails
      setSession(null);
      setProfile(null);
      setMagicLinkEmail(null);
      setAuthState('unauthenticated');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        session,
        profile,
        loading,
        onMagicLinkSent,
        refreshSession,
        logout,
        magicLinkEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

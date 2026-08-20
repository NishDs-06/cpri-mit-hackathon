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
   * Refreshes the session and profile from the backend.
   * Called by OAuth Callback handler after session is established on backend,
   * so the portal renders in the correct authenticated state immediately.
   */
  refreshSession: () => Promise<AuthSession | null>;
  /** Logs out — calls the backend, then clears local auth state */
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>('unauthenticated');
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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



  /**
   * Refresh session + profile from the backend.
   * Callback page calls this after backend flow establishes session,
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
        return currentSession;
      } else {
        setAuthState('session_expired');
        return null;
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
        refreshSession,
        logout,
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

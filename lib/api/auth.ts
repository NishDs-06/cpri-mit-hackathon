import { apiFetch } from '@/lib/errors';
import { API_BASE_URL } from '@/lib/constants';
import type { AuthSession } from '@/types';

/**
 * Initiates browser navigation to the backend Google OAuth flow.
 * Does not use fetch.
 */
export function startGoogleAuth(): void {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
}

/**
 * GET /api/auth/session
 *
 * Returns the current authenticated session from the backend, or null if
 * the user is not authenticated. The session cookie is sent automatically
 * via credentials: 'include' in apiFetch.
 *
 * Returns null on 401 (no session / expired session).
 * Throws ApiError for other error codes.
 */
export async function getSession(): Promise<AuthSession | null> {
  try {
    return await apiFetch<AuthSession>('/api/auth/session');
  } catch (err: unknown) {
    const { ApiError } = await import('@/lib/errors');
    if (err instanceof ApiError && err.isUnauthorized) {
      return null;
    }
    throw err;
  }
}

/**
 * POST /api/auth/logout
 *
 * Instructs the backend to invalidate the current session cookie.
 * The frontend clears its local session state after this call resolves.
 */
export async function logout(): Promise<void> {
  await apiFetch<void>('/api/auth/logout', { method: 'POST' });
}

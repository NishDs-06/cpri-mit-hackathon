import { apiFetch } from '@/lib/errors';
import type { AuthSession, MagicLinkRequest } from '@/types';

/**
 * POST /api/auth/magic-link
 *
 * Triggers the backend to send a magic link to the given email address.
 * The frontend does NOT generate or validate the link — that is the backend's job.
 *
 * This function is intentionally thin: it sends the email to the backend
 * and returns void. The UI transitions to the "check your email" state on success.
 */
export async function requestMagicLink(email: string): Promise<void> {
  const payload: MagicLinkRequest = { email };
  await apiFetch<void>('/api/auth/magic-link', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
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

/**
 * GET /api/auth/callback?token=...
 *
 * Called by MagicLinkCallbackHandler. Sends the token from the magic link
 * URL to the backend for validation. The backend sets the session cookie
 * on success.
 *
 * Returns the established session so AuthContext can be updated immediately
 * before the redirect — preventing a stale unauthenticated render flash.
 *
 * Token is sent in the Authorization header, NOT in the URL, to avoid
 * it appearing in server logs or Referer headers.
 *
 * Throws ApiError with status 401 for expired tokens, 400 for invalid ones.
 */
export async function verifyMagicLinkToken(token: string): Promise<AuthSession> {
  return apiFetch<AuthSession>('/api/auth/callback', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

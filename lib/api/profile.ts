import { apiFetch } from '@/lib/errors';
import type { Profile, ProfileUpdateRequest } from '@/types';

/**
 * GET /api/me
 *
 * Returns the authenticated user's profile.
 * This is the canonical call the frontend uses to determine both:
 *   1. Whether the user is authenticated (401 → they are not)
 *   2. The user's profile data (name, college, team role, etc.)
 *
 * The AuthContext calls this on mount and after magic link verification.
 * Never use localStorage or client-side state as the auth source of truth.
 */
export async function getMe(): Promise<Profile> {
  return apiFetch<Profile>('/api/me');
}

/**
 * PATCH /api/me
 *
 * Updates the authenticated user's profile with the provided fields.
 * Only sends fields that have changed; the backend merges the partial update.
 *
 * Client-side format validation (URL shape, phone length) is acceptable for UX,
 * but the backend performs real validation and must be the source of truth.
 */
export async function updateProfile(data: ProfileUpdateRequest): Promise<Profile> {
  return apiFetch<Profile>('/api/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

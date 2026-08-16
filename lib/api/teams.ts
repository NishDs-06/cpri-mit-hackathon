import { apiFetch } from '@/lib/errors';
import type {
  Team,
  CreateTeamRequest,
  CreateTeamResponse,
  JoinTeamRequest,
  TeamJoinResolution,
} from '@/types';

/**
 * GET /api/teams/me
 *
 * Returns the authenticated user's current team, or null if they have not
 * yet joined or created one.
 */
export async function getMyTeam(): Promise<Team | null> {
  try {
    return await apiFetch<Team>('/api/teams/me');
  } catch (err: unknown) {
    const { ApiError } = await import('@/lib/errors');
    if (err instanceof ApiError && err.isNotFound) {
      return null;
    }
    throw err;
  }
}

/**
 * POST /api/teams
 *
 * Creates a new team. The backend:
 *   - Generates the team code (e.g. "RBX-042")
 *   - Associates the authenticated user as team lead
 *   - Returns the team and code
 *
 * The frontend displays the returned code — it never generates codes locally.
 */
export async function createTeam(
  data: CreateTeamRequest,
): Promise<CreateTeamResponse> {
  return apiFetch<CreateTeamResponse>('/api/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * POST /api/teams/join
 *
 * Attempts to join a team by code. The backend validates:
 *   - Whether the code exists
 *   - Whether the team is full
 *   - Whether the team is locked (registration closed)
 *   - Whether the user is already a member
 *
 * The frontend must NOT locally validate these conditions — it only does
 * a basic format check (length/charset) as a UX pre-filter.
 *
 * The returned TeamJoinResolution.state drives the UI:
 *   valid         → show team name + member count, prompt confirmation
 *   not_found     → "No team found with that code"
 *   full          → "This team is full"
 *   locked        → "Registration for this team is closed"
 *   already_member → "You are already a member of this team"
 */
export async function joinTeam(code: string): Promise<TeamJoinResolution> {
  const payload: JoinTeamRequest = { code: code.toUpperCase() };
  return apiFetch<TeamJoinResolution>('/api/teams/join', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

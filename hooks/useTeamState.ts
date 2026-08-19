'use client';

import { useAuth } from '@/context/AuthContext';
import type { Team } from '@/types';

/**
 * Portal navigation state.
 * Controls which portal nav items are shown based on team status.
 *
 * | State             | Nav shown                           |
 * |-------------------|-------------------------------------|
 * | Unregistered      | redirect to /portal/register        |
 * | Registered        | TEAM                                |
 * | Shortlisted       | TEAM · RESOURCES                    |
 * | Submission open   | TEAM · RESOURCES · SUBMISSION       |
 */
export type PortalNavState =
  | 'unregistered'
  | 'registered'
  | 'shortlisted'
  | 'submission_open';

/**
 * useTeamState — STUB.
 *
 * ⚠️  STUB: This hook is not wired to real backend data yet.
 *
 * It reads TeamStatus from the team object provided to it (obtained by the
 * caller via GET /api/me or GET /api/teams/me). The mapping from TeamStatus
 * to PortalNavState is defined here.
 *
 * When the backend contract for `GET /api/me` is finalized:
 *  1. Remove this stub comment.
 *  2. If the team response includes a `submissionOpen: boolean` flag,
 *     wire it to the `submission_open` state below.
 *  3. The `submission_open` state is currently unreachable because TeamStatus
 *     doesn't include it — it must come from a separate backend signal.
 *
 * @param team — the team object from the backend (null if not registered)
 * @param submissionOpen — explicit flag from backend when submission window opens
 *                         (TODO: add to backend API contract)
 */
export function useTeamState(
  team: Team | null,
  submissionOpen = false // TODO: wire to real backend signal
): PortalNavState {
  const { authState } = useAuth();

  // Not authenticated or loading — treat as unregistered
  if (authState !== 'authenticated') return 'unregistered';

  // Authenticated but no team
  if (!team) return 'unregistered';

  // Submission window explicitly open (TODO: real signal)
  if (submissionOpen) return 'submission_open';

  // Map TeamStatus → PortalNavState
  switch (team.status) {
    case 'shortlisted':
      return 'shortlisted';
    case 'registered':
    case 'under_review':
    case 'rejected':
      return 'registered';
    default:
      return 'registered';
  }
}

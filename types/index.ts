// ─── Domain types ─────────────────────────────────────────────────────────────

export type UserRole = 'team_lead' | 'member';

export type TeamStatus =
  | 'registered'
  | 'under_review'
  | 'shortlisted'
  | 'rejected';

export type AuthState =
  | 'unauthenticated'
  | 'authenticated'
  | 'session_expired';

// ─── API response shapes ──────────────────────────────────────────────────────
// These interfaces define the contract between this frontend and the backend.
// The backend must return JSON conforming to these types.

export interface AuthSession {
  userId: string;
  email: string;
  expiresAt: string; // ISO 8601
}

export interface Profile {
  id: string;
  name: string;
  phone: string;
  college: string;
  collegeId: string;
  github: string;
  linkedin: string;
  role: UserRole;
}

export interface TeamMember {
  name: string;
  github: string;
  role: UserRole;
}

export interface Team {
  code: string;
  name: string;
  description: string;
  status: TeamStatus;
  memberLimit: number;
  members: TeamMember[];
}

// ─── Team join resolution states ─────────────────────────────────────────────
// The frontend must render whatever state the backend returns; it must NOT
// locally validate whether a code is "real" beyond basic format checks.
export type TeamJoinState =
  | 'valid'
  | 'not_found'
  | 'full'
  | 'locked'
  | 'already_member';

export interface TeamJoinResolution {
  state: TeamJoinState;
  team?: Pick<Team, 'name' | 'members' | 'memberLimit'>;
}

// ─── Request payloads ─────────────────────────────────────────────────────────



export interface ProfileUpdateRequest {
  name?: string;
  phone?: string;
  college?: string;
  collegeId?: string;
  github?: string;
  linkedin?: string;
}

export interface CreateTeamRequest {
  name: string;
  description: string;
}

export interface CreateTeamResponse {
  team: Team;
  code: string;
}

export interface JoinTeamRequest {
  code: string;
}

// ─── Admin (if built) ─────────────────────────────────────────────────────────

export interface AdminTeamRow {
  id: string;
  code: string;
  name: string;
  status: TeamStatus;
  memberCount: number;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  actorId: string;
  targetId?: string;
  timestamp: string;
}

// ─── Sample / demo data — LAYOUT USE ONLY ────────────────────────────────────
// These are synthetic placeholders used to populate UI states during
// development. They are NOT real participant data. Replace with API responses
// before going to production. The backend must be the source of truth.

export const SAMPLE_PROFILE: Profile = {
  id: 'usr_demo',
  name: 'Rahul Sharma',
  phone: '+91 98XXXXXXX0',
  college: 'MIT Bengaluru',
  collegeId: '1MB21CS042',
  github: 'https://github.com/rahulsh',
  linkedin: 'https://linkedin.com/in/rahulsh',
  role: 'team_lead',
};

export const SAMPLE_TEAM: Team = {
  code: 'RBX-042',
  name: 'RoboX',
  description: 'Real-time grid fault detection using edge inference.',
  status: 'shortlisted',
  memberLimit: 4,
  members: [
    { name: 'Rahul Sharma', github: 'github.com/rahulsh', role: 'team_lead' },
    { name: 'Arjun Rao',    github: 'github.com/arjunr',  role: 'member'    },
    { name: 'Vivek Nair',   github: 'github.com/vnair',   role: 'member'    },
  ],
};

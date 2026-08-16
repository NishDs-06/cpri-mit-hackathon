'use client';

import { displayUrl } from '@/lib/utils';
import type { Team, TeamStatus } from '@/types';

interface TeamRosterProps {
  team: Team;
}

const STATUS_STYLES: Record<
  TeamStatus,
  { label: string; textColor: string; borderColor: string; bgColor: string }
> = {
  registered:   { label: 'Registered',   textColor: 'text-blue-mid',   borderColor: 'border-blue-mid/30',   bgColor: 'bg-blue-tint'    },
  under_review: { label: 'Under Review', textColor: 'text-text-secondary', borderColor: 'border-border-hairline', bgColor: 'bg-bg-alt'  },
  shortlisted:  { label: 'Shortlisted',  textColor: 'text-blue-primary', borderColor: 'border-blue-primary/30', bgColor: 'bg-blue-tint' },
  rejected:     { label: 'Not Selected', textColor: 'text-red-600',     borderColor: 'border-red-200',         bgColor: 'bg-red-50'     },
};

const MEMBER_LIMIT_STATES = {
  waiting: (count: number, max: number) => count < max,
  full:    (count: number, max: number) => count >= max,
};

/**
 * Team roster — shown once the user is a member of a team.
 *
 * Displays:
 *  - Team name + code (display serif)
 *  - Status badge (registered / under_review / shortlisted / rejected)
 *  - Member list with role badge and GitHub link
 *  - "Waiting for members" notice when not yet full
 *  - "Team full" indicator when at capacity
 */
export default function TeamRoster({ team }: TeamRosterProps) {
  const status = STATUS_STYLES[team.status];
  const memberCount = team.members.length;
  const isFull = memberCount >= team.memberLimit;

  return (
    <div className="max-w-[600px] w-full mx-auto">
      {/* Team header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h3
            className="font-display font-bold text-blue-deep"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            {team.name}
          </h3>
          <p className="font-mono text-sm text-text-secondary tracking-widest mt-0.5">
            {team.code}
          </p>
        </div>

        {/* Status badge */}
        <span
          className={`
            inline-flex items-center gap-1.5
            px-3 py-1.5 rounded-sharp
            border ${status.borderColor}
            ${status.bgColor} ${status.textColor}
            font-body text-[0.75rem] font-medium tracking-wide uppercase
            self-start
          `}
        >
          {/* Pulsing dot — only on shortlisted (one meaningful use of animation) */}
          {team.status === 'shortlisted' && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-primary" />
            </span>
          )}
          {status.label}
        </span>
      </div>

      {/* Description */}
      {team.description && (
        <p className="font-body text-text-secondary text-sm leading-relaxed mb-6 border-l-2 border-border-hairline pl-4">
          {team.description}
        </p>
      )}

      {/* Member list */}
      <div className="border border-border-hairline rounded-firm overflow-hidden mb-5">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-bg-alt border-b border-border-hairline">
          <span className="font-body text-caps text-text-secondary">Member</span>
          <span className="font-body text-caps text-text-secondary">Role</span>
          <span className="font-body text-caps text-text-secondary">GitHub</span>
        </div>

        {team.members.map((member) => (
          <div
            key={member.name}
            className="
              grid grid-cols-[1fr_auto_auto] items-center gap-4
              px-5 py-4
              border-b border-border-hairline last:border-b-0
            "
          >
            <span className="font-body text-text-primary text-sm font-medium">
              {member.name}
            </span>
            <span
              className={`
                font-body text-[0.6875rem] font-medium tracking-wide uppercase px-2 py-1
                rounded-sharp border
                ${
                  member.role === 'team_lead'
                    ? 'text-blue-primary border-blue-primary/30 bg-blue-tint'
                    : 'text-text-secondary border-border-hairline bg-bg-alt'
                }
              `}
            >
              {member.role === 'team_lead' ? 'Lead' : 'Member'}
            </span>
            <a
              href={`https://${member.github.replace(/^https?:\/\//, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-blue-mid hover:text-blue-primary transition-colors truncate max-w-[10rem]"
            >
              {displayUrl(member.github)}
            </a>
          </div>
        ))}
      </div>

      {/* Member count state */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-border-hairline rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-blue-primary rounded-full transition-all duration-500"
            style={{ width: `${(memberCount / team.memberLimit) * 100}%` }}
            role="progressbar"
            aria-valuenow={memberCount}
            aria-valuemin={0}
            aria-valuemax={team.memberLimit}
            aria-label={`${memberCount} of ${team.memberLimit} members`}
          />
        </div>
        <span className="font-body text-xs text-text-secondary tabular-nums">
          {memberCount} / {team.memberLimit}
        </span>
      </div>

      {isFull ? (
        <p className="font-body text-xs text-text-secondary mt-2">
          Team is full — all slots filled.
        </p>
      ) : (
        <p className="font-body text-xs text-text-secondary mt-2">
          Waiting for {team.memberLimit - memberCount} more member
          {team.memberLimit - memberCount !== 1 ? 's' : ''} — share code{' '}
          <span className="font-mono font-medium text-text-primary">{team.code}</span>
        </p>
      )}
    </div>
  );
}

'use client';

import type { Team } from '@/types';
import type { TeamMember } from '@/types';

interface TeamOverviewProps {
  team: Team;
  userRole: 'team_lead' | 'member';
  onEdit?: () => void;
}

/**
 * TeamOverview — displays team name, ID, status badge, college, and members.
 * Used in /portal/team.
 *
 * EDIT TEAM is permission-gated: only team_lead sees the button.
 */
export default function TeamOverview({ team, userRole, onEdit }: TeamOverviewProps) {
  return (
    <div>
      {/* Team header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h2 className="font-display font-bold text-blue-deep text-2xl">
              {team.name}
            </h2>
            <StatusBadge status={team.status} />
          </div>
          <p className="font-body text-text-secondary text-sm">
            Team ID: <span className="font-mono tracking-widest text-blue-primary">{team.code}</span>
          </p>
          {team.description && (
            <p className="font-body text-text-secondary text-sm mt-2 max-w-[60ch]">
              {team.description}
            </p>
          )}
        </div>

        {/* Edit button — team lead only */}
        {userRole === 'team_lead' && onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="
              font-body text-[0.8125rem] text-text-secondary
              border border-border-hairline rounded-sharp px-4 py-2
              hover:border-blue-primary hover:text-blue-primary
              transition-colors duration-150
            "
          >
            Edit Team
          </button>
        )}
      </div>

      {/* Members table */}
      <div>
        <p className="font-body text-caps text-text-secondary mb-4">
          Members ({team.members.length} / {team.memberLimit})
        </p>
        <div className="border border-border-hairline rounded-firm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-hairline bg-bg-alt">
                <th className="font-body text-caps text-text-secondary px-5 py-3 text-[0.6875rem]">Name</th>
                <th className="font-body text-caps text-text-secondary px-5 py-3 text-[0.6875rem]">GitHub</th>
                <th className="font-body text-caps text-text-secondary px-5 py-3 text-[0.6875rem]">Role</th>
              </tr>
            </thead>
            <tbody>
              {team.members.map((member, i) => (
                <MemberRow key={i} member={member} />
              ))}
              {/* Empty slots */}
              {Array.from({ length: team.memberLimit - team.members.length }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-t border-border-hairline">
                  <td colSpan={3} className="px-5 py-3 font-body text-text-secondary text-sm italic opacity-50">
                    — Open slot
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MemberRow({ member }: { member: TeamMember }) {
  return (
    <tr className="border-t border-border-hairline">
      <td className="px-5 py-3 font-body text-text-primary text-sm">{member.name}</td>
      <td className="px-5 py-3">
        {member.github ? (
          <a
            href={member.github.startsWith('http') ? member.github : `https://${member.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-blue-mid text-sm hover:text-blue-primary transition-colors"
          >
            {member.github.replace(/^https?:\/\/github\.com\//, '')}
          </a>
        ) : (
          <span className="font-body text-text-secondary text-sm">—</span>
        )}
      </td>
      <td className="px-5 py-3">
        <span
          className={`
            font-body text-[0.6875rem] font-medium tracking-wide uppercase
            px-2 py-0.5 rounded-sharp
            ${member.role === 'team_lead'
              ? 'bg-blue-tint text-blue-primary border border-blue-mid/20'
              : 'bg-bg-alt text-text-secondary border border-border-hairline'
            }
          `}
        >
          {member.role === 'team_lead' ? 'Lead' : 'Member'}
        </span>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: Team['status'] }) {
  const config: Record<Team['status'], { label: string; classes: string }> = {
    registered:    { label: 'Registered',    classes: 'bg-blue-tint text-blue-primary border-blue-mid/20' },
    under_review:  { label: 'Under Review',  classes: 'bg-amber-50 text-amber-700 border-amber-200' },
    shortlisted:   { label: 'Shortlisted',   classes: 'bg-green-50 text-green-700 border-green-200' },
    rejected:      { label: 'Not Selected',  classes: 'bg-red-50 text-red-600 border-red-200' },
  };

  const { label, classes } = config[status] ?? config.registered;

  return (
    <span
      className={`
        font-body text-[0.6875rem] font-medium tracking-wide uppercase
        px-2 py-0.5 rounded-sharp border
        ${classes}
      `}
    >
      {label}
    </span>
  );
}

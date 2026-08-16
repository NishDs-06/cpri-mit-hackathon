'use client';

import { useState, useEffect, useRef } from 'react';
import { createTeam, joinTeam } from '@/lib/api/teams';
import { ApiError } from '@/lib/errors';
import { isValidTeamCodeFormat, displayUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';
import type { Team, TeamJoinResolution } from '@/types';

interface TeamPanelProps {
  /** Called when a team is successfully created or joined */
  onTeamJoined: (team: Team) => void;
}

/**
 * Team create / join panel — Step 3.
 *
 * Two equal-weight bordered panels side by side (stacked on mobile).
 *
 * CREATE TEAM:
 *  - Team name + short description
 *  - POST /api/teams → backend generates code
 *  - Code shown large in display serif + copy-to-clipboard action
 *
 * JOIN TEAM:
 *  - Code input (format: AAA-999)
 *  - Basic format check client-side (UX only — no real validation)
 *  - Live resolve via POST /api/teams/join after format passes
 *  - Renders backend's response state: valid | not_found | full | locked | already_member
 *  - Shows confirmation card before committing
 *
 * SECURITY: The frontend NEVER validates whether a code is real, available,
 * or belongs to the user. All of that is backend responsibility.
 * The backend may return any TeamJoinState and the UI renders it faithfully.
 */
export default function TeamPanel({ onTeamJoined }: TeamPanelProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-[860px] w-full mx-auto">
      <CreateTeamPanel onTeamJoined={onTeamJoined} />
      <JoinTeamPanel  onTeamJoined={onTeamJoined} />
    </div>
  );
}

/* ─── Create Team panel ────────────────────────────────────────────────────── */

function CreateTeamPanel({ onTeamJoined }: TeamPanelProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [createdTeam, setCreatedTeam] = useState<Team | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Team name is required.'); return; }
    setError(null);
    setSubmitting(true);
    try {
      const res = await createTeam({ name: name.trim(), description: description.trim() });
      setCreatedCode(res.code);
      setCreatedTeam(res.team);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create team.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!createdCode) return;
    try {
      await navigator.clipboard.writeText(createdCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API not available in all contexts
    }
  };

  return (
    <div className="border border-border-hairline rounded-firm p-7 flex flex-col bg-bg-panel">
      <p className="font-body text-caps text-blue-mid mb-5">Create Team</p>

      {createdCode && createdTeam ? (
        /* Success state — show code large, with copy action */
        <div className="flex flex-col items-center text-center flex-1 justify-center py-4">
          <p className="font-body text-sm text-text-secondary mb-3">
            Your team code — share this with teammates
          </p>
          <p className="team-code mb-4" aria-live="polite">
            {createdCode}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="
              inline-flex items-center gap-2 px-4 py-2
              border border-border-hairline rounded-sharp
              font-body text-sm text-text-secondary
              hover:border-blue-primary hover:text-blue-primary
              transition-colors duration-150
            "
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M5 4V3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.2"/></svg>
                Copy code
              </>
            )}
          </button>
          <p className="font-body text-xs text-text-secondary mt-6">
            Team "{createdTeam.name}" created. You are the Team Lead.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onTeamJoined(createdTeam)}
            className="mt-4"
          >
            Go to Team Dashboard
          </Button>
        </div>
      ) : (
        /* Input state */
        <form onSubmit={handleCreate} noValidate className="space-y-4 flex-1 flex flex-col">
          <FloatingLabelInput
            id="team-name"
            label="Team name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(null); }}
            error={error ?? undefined}
            required
          />
          <div className="floating-label-wrap floating-label-wrap--textarea flex-1">
            <textarea
              id="team-desc"
              placeholder=" "
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none w-full"
            />
            <label htmlFor="team-desc">Short description (optional)</label>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            block
            disabled={submitting}
          >
            {submitting ? 'Creating…' : 'Create & Get Code'}
          </Button>
        </form>
      )}
    </div>
  );
}

/* ─── Join Team panel ──────────────────────────────────────────────────────── */

function JoinTeamPanel({ onTeamJoined }: TeamPanelProps) {
  const [code, setCode] = useState('');
  const [resolution, setResolution] = useState<TeamJoinResolution | null>(null);
  const [checking, setChecking] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live resolve when format is valid — debounced 600ms
  useEffect(() => {
    const upper = code.toUpperCase();
    setResolution(null);
    setError(null);

    if (!isValidTeamCodeFormat(upper)) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setChecking(true);
      try {
        const res = await joinTeam(upper);
        setResolution(res);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Could not check code.');
      } finally {
        setChecking(false);
      }
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code]);

  const handleConfirm = async () => {
    if (!resolution?.team || resolution.state !== 'valid') return;
    setJoining(true);
    try {
      const res = await joinTeam(code.toUpperCase());
      if (res.state === 'valid' && res.team) {
        onTeamJoined(res.team as Team);
      } else {
        setResolution(res);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to join team.');
    } finally {
      setJoining(false);
    }
  };

  const STATE_MESSAGES: Record<string, { text: string; color: string }> = {
    not_found:     { text: 'No team found with that code.',          color: 'text-red-600'  },
    full:          { text: 'This team is full.',                      color: 'text-red-600'  },
    locked:        { text: 'Registration for this team is closed.',  color: 'text-red-600'  },
    already_member:{ text: 'You are already a member of this team.', color: 'text-blue-mid' },
  };

  return (
    <div className="border border-border-hairline rounded-firm p-7 flex flex-col bg-bg-panel">
      <p className="font-body text-caps text-blue-mid mb-5">Join Team</p>

      <div className="flex-1 flex flex-col space-y-4">
        <FloatingLabelInput
          id="join-code"
          label="Team code (e.g. RBX-042)"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 7))}
          maxLength={7}
          autoComplete="off"
          spellCheck={false}
          className="font-mono tracking-widest"
        />

        {/* Live state indicator */}
        {checking && (
          <p className="font-body text-xs text-text-secondary">Checking code…</p>
        )}

        {error && (
          <p role="alert" className="font-body text-xs text-red-600">{error}</p>
        )}

        {resolution && resolution.state !== 'valid' && STATE_MESSAGES[resolution.state] && (
          <p
            role="alert"
            className={`font-body text-sm font-medium ${STATE_MESSAGES[resolution.state]!.color}`}
          >
            {STATE_MESSAGES[resolution.state]!.text}
          </p>
        )}

        {/* Confirmation card when code is valid */}
        {resolution?.state === 'valid' && resolution.team && (
          <div className="border border-border-hairline rounded-sharp p-4 bg-blue-tint/50">
            <p className="font-body font-medium text-text-primary text-sm mb-0.5">
              {resolution.team.name}
            </p>
            <p className="font-body text-xs text-text-secondary">
              {resolution.team.members.length} / {resolution.team.memberLimit} members
            </p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleConfirm}
              disabled={joining}
              className="mt-4 w-full"
            >
              {joining ? 'Joining…' : `Join "${resolution.team.name}"`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

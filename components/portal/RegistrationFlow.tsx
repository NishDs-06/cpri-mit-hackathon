'use client';

import { useState } from 'react';
import ProfileForm from '@/components/auth/ProfileForm';
import TeamPanel from '@/components/auth/TeamPanel';
import type { Team } from '@/types';

type RegistrationStep = 1 | 2 | 3 | 4;

const STEPS = [
  { num: 1, label: 'Team',    desc: 'Create or join a team' },
  { num: 2, label: 'College', desc: 'Your institution details' },
  { num: 3, label: 'Members', desc: 'Invite your teammates' },
  { num: 4, label: 'Review',  desc: 'Confirm and submit' },
] as const;

interface RegistrationFlowProps {
  onComplete: (team: Team) => void;
}

/**
 * RegistrationFlow — 4-step portal wizard.
 *
 * Steps:
 *  01 TEAM     — Create or join a team (TeamPanel)
 *  02 COLLEGE  — Institution details (ProfileForm)
 *  03 MEMBERS  — Member invitations (placeholder — invite flow TBD)
 *  04 REVIEW   — Confirmation before submission
 *
 * One CONTINUE button per step. Back navigation allowed.
 *
 * TODO: Step 03 (Members) is a placeholder — real member invitation
 * flow requires backend invite API that doesn't exist yet.
 */
export default function RegistrationFlow({ onComplete }: RegistrationFlowProps) {
  const [step, setStep] = useState<RegistrationStep>(1);
  const [team, setTeam] = useState<Team | null>(null);

  const advance = () => setStep((s) => Math.min(s + 1, 4) as RegistrationStep);
  const back = () => setStep((s) => Math.max(s - 1, 1) as RegistrationStep);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <StepIndicator current={step} />

      {/* Step content */}
      <div className="mt-10">
        {step === 1 && (
          <div>
            <StepHeader step={1} />
            <TeamPanel
              onTeamJoined={(joinedTeam) => {
                setTeam(joinedTeam);
                advance();
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <StepHeader step={2} />
            <ProfileForm onComplete={advance} />
          </div>
        )}

        {step === 3 && (
          <div>
            <StepHeader step={3} />
            {/* TODO: Implement member invitation step when backend invite API is ready */}
            <div className="border border-border-hairline rounded-firm p-8 bg-bg-panel text-center">
              <p className="font-body text-text-secondary text-sm leading-relaxed mb-6">
                Share your team code with teammates so they can join on the portal.
                They'll use "Join Team" on the registration page.
              </p>
              {team && (
                <p className="team-code mb-4" aria-live="polite">
                  {team.code}
                </p>
              )}
              <p className="font-body text-text-secondary text-xs">
                {/* TODO: Add direct member invite by email when backend supports it */}
                Direct email invitations are coming — for now, share the code above.
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={back}
                className="font-body text-sm text-text-secondary hover:text-blue-primary transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={advance}
                className="
                  inline-flex items-center gap-2
                  bg-blue-primary text-white
                  px-6 py-3 rounded-sharp
                  font-body font-medium text-sm
                  hover:bg-blue-deep transition-colors
                "
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 4 && team && (
          <div>
            <StepHeader step={4} />
            <ReviewStep team={team} onConfirm={() => onComplete(team)} onBack={back} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── StepIndicator ─────────────────────────────────────────────────────── */

function StepIndicator({ current }: { current: RegistrationStep }) {
  return (
    <nav aria-label="Registration steps">
      <ol className="flex items-center gap-0">
        {STEPS.map((step, i) => {
          const done   = step.num < current;
          const active = step.num === current;

          return (
            <li key={step.num} className="flex items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center
                    font-body text-[0.6875rem] font-semibold
                    border transition-colors duration-200
                    ${done   ? 'bg-blue-primary border-blue-primary text-white'         : ''}
                    ${active ? 'bg-white border-blue-primary text-blue-primary'         : ''}
                    ${!done && !active ? 'bg-white border-border-hairline text-text-secondary' : ''}
                  `}
                >
                  {done ? '✓' : `0${step.num}`}
                </span>
                <span
                  className={`
                    hidden sm:block font-body text-[0.8125rem] font-medium
                    ${active ? 'text-blue-primary' : 'text-text-secondary'}
                  `}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-3 h-px w-8 ${done ? 'bg-blue-primary' : 'bg-border-hairline'}`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ─── StepHeader ────────────────────────────────────────────────────────── */

function StepHeader({ step }: { step: RegistrationStep }) {
  const s = STEPS.find((x) => x.num === step)!;
  return (
    <div className="mb-8">
      <p className="font-body text-caps text-blue-mid mb-2">Step {`0${s.num}`}</p>
      <h2 className="font-display font-bold text-blue-deep text-xl">{s.label}</h2>
      <p className="font-body text-text-secondary text-sm mt-1">{s.desc}</p>
    </div>
  );
}

/* ─── ReviewStep ────────────────────────────────────────────────────────── */

function ReviewStep({
  team,
  onConfirm,
  onBack,
}: {
  team: Team;
  onConfirm: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="border border-border-hairline rounded-firm p-6 bg-bg-panel mb-6">
        <dl className="space-y-4">
          <div>
            <dt className="font-body text-caps text-text-secondary mb-1">Team Name</dt>
            <dd className="font-body text-text-primary font-medium">{team.name}</dd>
          </div>
          <div>
            <dt className="font-body text-caps text-text-secondary mb-1">Team Code</dt>
            <dd className="font-mono tracking-widest text-blue-primary font-semibold">{team.code}</dd>
          </div>
          <div>
            <dt className="font-body text-caps text-text-secondary mb-1">Members</dt>
            <dd className="font-body text-text-primary">{team.members.length} / {team.memberLimit}</dd>
          </div>
          <div>
            <dt className="font-body text-caps text-text-secondary mb-1">Status</dt>
            <dd className="font-body text-text-primary capitalize">{team.status.replace('_', ' ')}</dd>
          </div>
        </dl>
      </div>

      <p className="font-body text-text-secondary text-sm mb-6 leading-relaxed">
        Your registration is complete. CPRI and MIT Bengaluru will review submissions
        after the registration deadline and notify you of the shortlist decision.
      </p>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-body text-sm text-text-secondary hover:text-blue-primary transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="
            inline-flex items-center gap-2
            bg-blue-primary text-white
            px-6 py-3 rounded-sharp
            font-body font-medium text-sm
            hover:bg-blue-deep transition-colors
          "
        >
          Go to Team Portal →
        </button>
      </div>
    </div>
  );
}

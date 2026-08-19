'use client';

import { useEffect, useState } from 'react';
import { REGISTRATION_DEADLINE } from '@/lib/constants';
import { RollingCounter } from '@/components/ui/RollingCounter';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(deadline: Date): TimeLeft | null {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * CountdownTimer — Phase 2 version with rolling digits.
 *
 * Each digit slot uses RollingCounter which slides vertically on value change.
 * The digits are displayed inside a bordered "display frame" (instrument-grade
 * mechanical readout aesthetic), gold-colored per the original spec.
 *
 * HYDRATION NOTE: Server does not know "current time" in the same instant as
 * the client, so we render a static placeholder on the first paint.
 * After mount, useEffect starts the interval. Avoids React hydration mismatch.
 *
 * Gold accent (--gold-accent) is used EXCLUSIVELY here — per design spec.
 *
 * prefers-reduced-motion: RollingCounter strips its transition internally,
 * so digits snap to new values. The numbers are always in the DOM.
 */
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | 'closed'>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const t = computeTimeLeft(REGISTRATION_DEADLINE);
      setTimeLeft(t ?? 'closed');
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return <TimerPlaceholder />;
  }

  if (timeLeft === 'closed') {
    return (
      <div className="text-center">
        <p style={{ color: 'var(--gold-muted)' }} className="font-bold text-2xl tracking-wide">
          Registration Closed
        </p>
        <p className="text-text-secondary text-sm mt-1 font-body">
          The registration deadline has passed.
        </p>
      </div>
    );
  }

  if (timeLeft === null) {
    return <TimerPlaceholder />;
  }

  return (
    <div role="timer" aria-live="off" aria-label="Time remaining until registration closes">
      {/* Display module — bordered instrument frame */}
      <div
        className="inline-flex items-end gap-1 sm:gap-2 border rounded-[10px] px-6 sm:px-10 py-5"
        style={{ background: 'var(--surface)', borderColor: 'var(--brown-300)', boxShadow: 'var(--shadow-l1)' }}
      >
        <DisplayUnit value={timeLeft.days}    label="Days"    />
        <DisplaySeparator />
        <DisplayUnit value={timeLeft.hours}   label="Hours"   />
        <DisplaySeparator />
        <DisplayUnit value={timeLeft.minutes} label="Minutes" />
        <DisplaySeparator />
        <DisplayUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <p className="text-center text-sm mt-5" style={{ color: 'var(--brown-600)' }}>
        Registration closes on{' '}
        <span className="font-medium" style={{ color: 'var(--brown-900)' }}>
          {REGISTRATION_DEADLINE.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </p>
    </div>
  );
}

/* ─── DisplayUnit — single time unit with rolling counter ─────────────────── */

function DisplayUnit({ value, label }: { value: number; label: string }) {
  const digitStyle: React.CSSProperties = {
    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
    color: 'var(--gold-muted)',
    fontWeight: 700,
    lineHeight: 1,
  };

  return (
    <div className="flex flex-col items-center min-w-[4rem] sm:min-w-[5rem]">
      <RollingCounter
        value={value}
        minDigits={2}
        style={digitStyle}
        className="tabular-nums"
      />
      <span className="text-[0.6875rem] font-medium tracking-[0.08em] uppercase mt-2"
        style={{ color: 'var(--brown-600)' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Separator ──────────────────────────────────────────────────────────── */

function DisplaySeparator() {
  return (
    <span
      aria-hidden="true"
      className="font-display font-bold pb-7 select-none"
      style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: 'var(--gold-muted)',
        opacity: 0.5,
        lineHeight: 1,
      }}
    >
      :
    </span>
  );
}

/* ─── Placeholder (pre-mount) ─────────────────────────────────────────────── */

function TimerPlaceholder() {
  return (
    <div
      className="inline-flex items-end gap-1 sm:gap-2 border rounded-[10px] px-6 sm:px-10 py-5"
      aria-hidden="true"
      style={{ background: 'var(--surface)', borderColor: 'var(--brown-300)' }}
    >
      {['--', ':', '--', ':', '--', ':', '--'].map((v, i) => (
        <span
          key={i}
          className="font-display font-bold tabular-nums opacity-30"
          style={{
            fontSize: v === ':' ? 'clamp(2rem, 4vw, 3rem)' : 'clamp(2.25rem, 5vw, 3.5rem)',
            color: 'var(--gold-muted)',
            lineHeight: 1,
            paddingBottom: v === ':' ? '1.75rem' : undefined,
            minWidth: v === ':' ? undefined : '4rem',
          }}
        >
          {v}
        </span>
      ))}
    </div>
  );
}

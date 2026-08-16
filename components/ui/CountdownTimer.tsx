'use client';

import { useEffect, useState } from 'react';
import { REGISTRATION_DEADLINE } from '@/lib/constants';

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

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Hydration-safe countdown timer.
 *
 * HYDRATION NOTE: The server does not know "current time" in the same instant
 * as the client, so we render a static placeholder (--:--:--) on the first paint.
 * After mount, useEffect starts the interval. This avoids the React hydration
 * mismatch that would occur if we computed time on the server.
 *
 * Gold accent (--gold-accent) is used EXCLUSIVELY here — per design spec,
 * gold appears only for the countdown timer as an urgency signal.
 */
export default function CountdownTimer() {
  // null = not yet mounted (SSR / first paint shows placeholder)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | 'closed'>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const t = computeTimeLeft(REGISTRATION_DEADLINE);
      setTimeLeft(t ?? 'closed');
    };

    tick(); // Immediate first tick on mount
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Pre-mount: static placeholder to prevent hydration mismatch
  if (!mounted) {
    return <TimerDisplay label="Loading…" placeholder />;
  }

  if (timeLeft === 'closed') {
    return (
      <div className="text-center">
        <p
          className="font-display font-bold text-2xl tracking-wide"
          style={{ color: 'var(--gold-accent)' }}
        >
          Registration Closed
        </p>
        <p className="text-text-secondary text-sm mt-1 font-body">
          The registration deadline has passed.
        </p>
      </div>
    );
  }

  if (timeLeft === null) {
    return <TimerDisplay label="Calculating…" placeholder />;
  }

  return (
    <div role="timer" aria-live="off" aria-label="Time remaining until registration closes">
      <div className="flex items-end justify-center gap-2 sm:gap-4">
        <TimeUnit value={timeLeft.days}    label="Days"    />
        <Separator />
        <TimeUnit value={timeLeft.hours}   label="Hours"   />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
      <p className="text-center text-text-secondary font-body text-sm mt-4">
        Registration closes on{' '}
        <span className="font-medium text-text-primary">
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

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[4rem] sm:min-w-[5rem]">
      <span
        className="font-display font-bold tabular-nums leading-none"
        style={{
          fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
          color: 'var(--gold-accent)',
        }}
      >
        {pad(value)}
      </span>
      <span className="font-body text-[0.6875rem] font-medium tracking-caps text-text-secondary uppercase mt-1.5">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="font-display font-bold pb-7 select-none"
      style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: 'var(--gold-accent)',
        opacity: 0.5,
      }}
    >
      :
    </span>
  );
}

function TimerDisplay({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: boolean;
}) {
  return (
    <div className="flex items-end justify-center gap-2 sm:gap-4" aria-hidden={placeholder}>
      {['--', '--', '--', '--'].map((v, i) => (
        <div key={i} className="flex flex-col items-center min-w-[4rem] sm:min-w-[5rem]">
          <span
            className="font-display font-bold tabular-nums leading-none opacity-30"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', color: 'var(--gold-accent)' }}
          >
            {v}
          </span>
          <span className="font-body text-[0.6875rem] font-medium tracking-caps text-text-secondary uppercase mt-1.5 opacity-30">
            {['Days','Hours','Min','Sec'][i]}
          </span>
        </div>
      ))}
    </div>
  );
}

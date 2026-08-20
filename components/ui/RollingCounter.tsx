'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * RollingCounter — ReactBits pattern.
 *
 * Each digit is a vertical strip of 10 characters (0–9) that slides
 * to show the target digit. On value change, the strip animates up or down.
 *
 * prefers-reduced-motion: transition is removed — digit snaps to new value
 * with no animation. Fully accessible, number is always in the DOM.
 *
 * @param value   The numeric value to display
 * @param minDigits  Minimum number of digit slots to show (zero-pads left)
 * @param style   Additional CSS styles for the digit characters
 * @param className Additional className for the container
 */
interface RollingCounterProps {
  value: number;
  minDigits?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function RollingCounter({
  value,
  minDigits = 2,
  style,
  className = '',
}: RollingCounterProps) {
  const digits = String(Math.max(0, Math.floor(value)))
    .padStart(minDigits, '0')
    .split('');

  return (
    <span
      className={`inline-flex items-end tabular-nums leading-none ${className}`}
      aria-label={String(value)}
    >
      {digits.map((digit, i) => (
        <DigitSlot key={i} digit={parseInt(digit, 10)} style={style} />
      ))}
    </span>
  );
}

function DigitSlot({
  digit,
  style,
}: {
  digit: number;
  style?: React.CSSProperties;
}) {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevRef = useRef(digit);

  useEffect(() => {
    if (digit !== prevRef.current) {
      setPreviousDigit(prevRef.current);
      setIsAnimating(true);
      // Allow one frame for the strip to position at previous digit,
      // then start the slide to the new digit
      const raf = requestAnimationFrame(() => {
        setCurrentDigit(digit);
      });
      prevRef.current = digit;

      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [digit]);

  void isAnimating;

  // Each slot renders a column of 10 digits (0-9).
  // We translate Y so the correct digit is in the viewport window.
  const translateY = `translateY(${-currentDigit * 10}%)`;

  return (
    <span
      className="rolling-digit-clip"
      style={{ height: '1em', ...style }}
    >
      <span
        className="rolling-digit-strip"
        style={{ transform: translateY }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span
            key={d}
            style={{ display: 'block', height: '1em', lineHeight: 1, ...style }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * CountUpCounter — runs once on mount, counts from 0 to `target`.
 * Used in the hero stat strip. Does NOT loop.
 */
type CountUpCounterProps = Omit<RollingCounterProps, 'value'> & {
  target: number;
  duration?: number;
};

export function CountUpCounter({
  target,
  duration = 1200,
  ...rest
}: CountUpCounterProps) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // prefers-reduced-motion: snap to target immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <RollingCounter value={value} {...rest} />;
}

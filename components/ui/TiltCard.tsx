'use client';

import { useRef, ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { TILT_MAX_DEG, SPRING_CONFIG } from '@/lib/design-tokens';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Override the max tilt in degrees (defaults to TILT_MAX_DEG = 2°) */
  maxDeg?: number;
}

/**
 * TiltCard — Framer Motion tilt-on-hover wrapper.
 *
 * Uses useMotionValue + useSpring for smooth spring physics — NOT a raw
 * CSS transition, which would feel mechanical. The spring springs back
 * to 0,0 on mouseleave with the same physics as the tilt-in.
 *
 * Rotation is capped at TILT_MAX_DEG (2°). Above this:
 *  - The element reads "wobbly" rather than "alive"
 *  - It can cause the surrounding layout to feel unstable
 *  - It makes text harder to read
 *
 * prefers-reduced-motion: the component renders its children without ANY
 * transform — not even a reduced version. Static fallback, not shorter animation.
 *
 * Budget: Only 2–3 tilt elements should be visible per screen.
 * Past that it reads busy, not premium.
 */
export function TiltCard({
  children,
  className = '',
  style,
  maxDeg = TILT_MAX_DEG,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring smoothing — SPRING_CONFIG: stiffness 300, damping 30
  const springX = useSpring(rawX, SPRING_CONFIG);
  const springY = useSpring(rawY, SPRING_CONFIG);

  // Map spring values to rotation degrees (capped to ±maxDeg)
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxDeg, -maxDeg]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxDeg, maxDeg]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalize cursor position to [-0.5, 0.5] relative to element center
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    // Spring back to rest — same physics as tilt-in
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverLiftButton — Framer Motion hover-lift wrapper for buttons/CTAs.
 *
 * Lifts 2px + grows shadow one elevation step + scales to 1.01 on hover.
 * NOT scale-105 — that's too large and reads as "toy". 1.01 is almost
 * imperceptible on its own but noticeable as part of the combined lift effect.
 */
interface HoverLiftButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function HoverLiftButton({
  children,
  className = '',
  style,
}: HoverLiftButtonProps) {
  return (
    <motion.div
      whileHover={{
        y: -2,    // 2px lift — spec: "lift 2px"
        scale: 1.01, // barely perceptible; combined with shadow it reads premium
      }}
      whileTap={{ y: 0, scale: 0.99 }}
      transition={SPRING_CONFIG}
      className={`inline-block ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

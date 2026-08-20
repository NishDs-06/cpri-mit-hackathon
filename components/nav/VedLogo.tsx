'use client';

/**
 * VED logo placeholder slot.
 * A clearly-marked bordered box rendering "VED" in monospaced caps.
 *
 * TODO: Replace with:
 *   import Image from 'next/image';
 *   <Image src="/ved-logo.svg" alt="VED" width={56} height={28} />
 *
 * The width/height and border should be removed once the real asset is provided.
 */
export function VedLogo() {
  return (
    <span
      aria-label="VED"
      className="inline-flex items-center justify-center select-none text-[1.35rem] tracking-[0.05em] font-black"
      style={{
        fontFamily: '"Rubik 80s Fade", system-ui, sans-serif',
        color: 'var(--brown-900)',
      }}
    >
      VED
    </span>
  );
}

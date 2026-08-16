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
      title="VED logo — placeholder, replace with real asset"
      className="
        inline-flex items-center justify-center
        w-14 h-7
        border border-blue-primary/40
        rounded-sharp
        font-mono text-[0.625rem] font-medium
        text-blue-primary/70
        tracking-[0.2em]
        select-none
      "
    >
      VED
    </span>
  );
}

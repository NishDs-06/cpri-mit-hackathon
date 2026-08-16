'use client';

/**
 * CPRI wordmark — placeholder large serif letterform.
 * Structured as its own component so a real <Image> logo can drop in
 * without restructuring the Navbar.
 *
 * To swap in a real logo:
 *   1. Replace the <span> below with <Image src="/cpri-logo.svg" ... />
 *   2. Remove the CSS classes
 */
export function CpriWordmark() {
  return (
    <span
      aria-label="CPRI — Central Power Research Institute"
      className="font-display font-bold text-blue-deep tracking-[0.08em] text-[1.35rem] leading-none select-none"
    >
      CPRI
    </span>
  );
}

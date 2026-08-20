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
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5 select-none">
      <span
        aria-label="CPRI — Central Power Research Institute"
        className="font-display font-bold text-blue-deep tracking-[0.08em] text-[1.55rem] leading-none select-none"
      >
        CPRI
      </span>
      <span className="hidden sm:inline font-body text-[0.625rem] tracking-widest text-text-secondary uppercase select-none font-semibold">
        Central Power Research Institute
      </span>
    </div>
  );
}

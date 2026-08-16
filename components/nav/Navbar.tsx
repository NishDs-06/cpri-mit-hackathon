'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CpriWordmark } from './CpriWordmark';
import { VedLogo } from './VedLogo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Register', href: '#register' },
  { label: 'Contact',  href: '#contact'  },
];

/**
 * Fixed glass navbar.
 *
 * Design spec:
 *  - backdrop-filter: blur(10px) over rgba(255,255,255,0.55) — the ONE glass
 *    effect on the entire site. No shadow, no border, no other blurs anywhere.
 *  - CPRI wordmark (display serif) + thin divider + VED placeholder
 *  - Nav links: uppercase small caps, body grotesk, spaced tracking
 *  - "Register" CTA: solid blue-primary, sharp corners, no pill shape
 *
 * On scroll past 16px the background becomes slightly more opaque for
 * readability over darker hero content — still GPU-cheap, no JS animation.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-colors duration-300',
        // The single backdrop-filter on the site
        'backdrop-blur-nav',
        scrolled
          ? 'bg-white/75'
          : 'bg-white/55',
      )}
      // No border, no shadow — just frosted glass floating over page
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Left: CPRI wordmark + divider + VED logo */}
        <div className="flex items-center gap-3">
          <a href="#hero" aria-label="CPRI × VED Hackathon — back to top">
            <CpriWordmark />
          </a>

          {/* Thin vertical divider */}
          <span
            aria-hidden="true"
            className="w-px h-5 bg-border-hairline"
          />

          <VedLogo />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.label === 'Register' ? null : (
              <a
                key={link.href}
                href={link.href}
                className="
                  text-caps text-text-secondary
                  hover:text-blue-primary
                  transition-colors duration-150
                "
              >
                {link.label}
              </a>
            ),
          )}

          {/* Register CTA — solid primary button */}
          <a
            href="#register"
            className="
              inline-flex items-center justify-center
              px-5 py-2.5
              bg-blue-primary text-white
              rounded-sharp
              text-caps
              hover:bg-blue-deep
              transition-colors duration-150
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary
            "
          >
            Register
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={cn(
              'block w-6 h-[1.5px] bg-blue-deep transition-transform duration-200',
              mobileOpen && 'translate-y-[6.5px] rotate-45',
            )}
          />
          <span
            className={cn(
              'block w-6 h-[1.5px] bg-blue-deep transition-opacity duration-200',
              mobileOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-6 h-[1.5px] bg-blue-deep transition-transform duration-200',
              mobileOpen && '-translate-y-[6.5px] -rotate-45',
            )}
          />
        </button>
      </nav>

      {/* Mobile menu — slides down below the nav bar */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-nav border-t border-border-hairline">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'text-caps',
                  link.label === 'Register'
                    ? 'inline-block px-5 py-3 bg-blue-primary text-white rounded-sharp text-center'
                    : 'text-text-secondary hover:text-blue-primary transition-colors',
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

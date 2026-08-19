'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CpriWordmark } from '@/components/nav/CpriWordmark';
import { VedLogo } from '@/components/nav/VedLogo';
import { cn } from '@/lib/utils';

// ─── Nav links ────────────────────────────────────────────────────────────────
// Tracks/Timeline/Team Information are in-page anchors on the homepage only.
// On other pages they link back to the homepage section.
const NAV_LINKS = [
  { label: 'Tracks',           href: '/#tracks',    anchor: true },
  { label: 'Timeline',         href: '/#timeline',  anchor: true },
  { label: 'Team Information', href: '/#team-info', anchor: true },
] as const;

/**
 * Public site Navbar — fixed glass bar floating over the page.
 *
 * Design spec:
 *  - backdrop-filter: blur(10px) over rgba(255,255,255,0.55) — the ONE glass
 *    effect on the entire public site.
 *  - CPRI wordmark + thin divider + VED placeholder
 *  - Nav links: uppercase small caps, body grotesk, spaced tracking
 *  - "REGISTER" CTA: solid blue-primary → /portal
 *
 * Phase 2 additions (applied in this file — presentational only):
 *  - .nav-glass class: adds 1px inner top highlight + SVG grain tile overlay
 *    (defined in globals.css)
 *  - Logo gets brightness-lift on hover (CSS only, no JS)
 *  - box-shadow: var(--shadow-l3) — the strongest shadow in the system
 *
 * On scroll past 16px the background becomes slightly more opaque for
 * readability over darker hero content.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Build the correct href for anchor links — on homepage use hash only,
  // on other pages use full path so the browser navigates then scrolls
  const buildHref = (href: string, isAnchor: boolean) => {
    if (!isAnchor) return href;
    if (isHomepage) return href.replace('/', ''); // strip leading / → #tracks etc.
    return href; // keep full path for non-homepage
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-colors duration-300',
        'backdrop-blur-nav',
        // nav-glass adds inner highlight + grain tile (Phase 2 — globals.css)
        'nav-glass relative',
      )}
      style={{
        backgroundColor: scrolled
          ? 'rgba(247, 243, 234, 0.82)'
          : 'rgba(247, 243, 234, 0.62)',
        boxShadow: scrolled ? 'var(--shadow-l3)' : 'none',
        transition: 'background-color 300ms, box-shadow 300ms',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Left: CPRI wordmark + divider + VED logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="CPRI × MIT Bengaluru Hackathon — back to top"
            className="hover:brightness-110 transition-[filter] duration-150"
          >
            <CpriWordmark />
          </Link>

          {/* Thin vertical divider */}
          <span
            aria-hidden="true"
            className="w-px h-5 bg-brown-300"
          />

          <VedLogo />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={buildHref(link.href, link.anchor)}
              className="
                text-caps text-brown-600
                hover:text-brown-900
                transition-colors duration-150
              "
            >
              {link.label}
            </Link>
          ))}

          {/* Register CTA — solid primary button → /portal */}
          <Link
            href="/portal"
            className="
              inline-flex items-center justify-center
              px-5 py-2.5
              bg-brown-900 text-white
              rounded-sharp
              text-caps
              hover:bg-brown-800
              transition-colors duration-150
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-900
            "
          >
            Register
          </Link>
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
              'block w-6 h-[1.5px] bg-brown-900 transition-transform duration-200',
              mobileOpen && 'translate-y-[6.5px] rotate-45',
            )}
          />
          <span
            className={cn(
              'block w-6 h-[1.5px] bg-brown-900 transition-opacity duration-200',
              mobileOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-6 h-[1.5px] bg-brown-900 transition-transform duration-200',
              mobileOpen && '-translate-y-[6.5px] -rotate-45',
            )}
          />
        </button>
      </nav>

      {/* Mobile menu — slides down below the nav bar */}
      {mobileOpen && (
        <div 
          className="md:hidden backdrop-blur-nav border-t border-border-hairline"
          style={{ backgroundColor: 'rgba(247,243,234,0.96)' }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={buildHref(link.href, link.anchor)}
                onClick={() => setMobileOpen(false)}
                className="text-caps text-brown-600 hover:text-brown-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/portal"
              onClick={() => setMobileOpen(false)}
              className="inline-block px-5 py-3 bg-brown-900 text-white rounded-sharp text-caps text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

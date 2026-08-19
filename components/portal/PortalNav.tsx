'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { PortalNavState } from '@/hooks/useTeamState';

interface PortalNavProps {
  navState: PortalNavState;
  userEmail?: string;
  onLogout: () => void;
}

/**
 * PortalNav — workspace navigation bar for /portal.
 *
 * State-driven: only shows nav items the user has access to.
 *
 * | navState          | Items shown                         |
 * |-------------------|-------------------------------------|
 * | unregistered      | (nothing — caller redirects)        |
 * | registered        | TEAM                                |
 * | shortlisted       | TEAM · RESOURCES                    |
 * | submission_open   | TEAM · RESOURCES · SUBMISSION       |
 *
 * Reads as a workspace, not a marketing page.
 * Simpler than the public navbar — functional, not atmospheric.
 */
export default function PortalNav({ navState, userEmail, onLogout }: PortalNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const navItems = getNavItems(navState);

  return (
    <header className="sticky top-0 z-40 bg-bg-base border-b border-border-hairline">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: brand + nav items */}
        <div className="flex items-center gap-6">
          {/* Back to public site */}
          <Link
            href="/"
            className="font-display font-bold text-blue-primary text-[0.9375rem] tracking-wide hover:text-blue-deep transition-colors"
            aria-label="Back to public site"
          >
            CPRI × MIT
          </Link>

          <span aria-hidden="true" className="w-px h-4 bg-border-hairline" />

          {/* Portal label */}
          <span className="font-body text-caps text-text-secondary hidden sm:block">
            Team Portal
          </span>

          {/* Nav items — only shown for registered+ */}
          {navItems.length > 0 && (
            <>
              <span aria-hidden="true" className="w-px h-4 bg-border-hairline hidden sm:block" />
              <nav aria-label="Portal navigation" className="hidden sm:flex items-center gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'font-body text-caps transition-colors duration-150',
                      isActive(item.href)
                        ? 'text-blue-primary'
                        : 'text-text-secondary hover:text-blue-primary'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </>
          )}
        </div>

        {/* Right: user email + sign out */}
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="hidden sm:block font-body text-[0.8125rem] text-text-secondary truncate max-w-[180px]">
              {userEmail}
            </span>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="
              font-body text-[0.8125rem] text-text-secondary
              border border-border-hairline rounded-sharp px-3 py-1.5
              hover:border-blue-primary hover:text-blue-primary
              transition-colors duration-150
            "
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

function getNavItems(navState: PortalNavState) {
  const all = [
    { label: 'Team',       href: '/portal/team',       minState: 'registered'      },
    { label: 'Resources',  href: '/portal/resources',  minState: 'shortlisted'     },
    { label: 'Submission', href: '/portal/submission', minState: 'submission_open' },
  ] as const;

  const order: Record<PortalNavState, number> = {
    unregistered:    0,
    registered:      1,
    shortlisted:     2,
    submission_open: 3,
  };

  const minOrder: Record<string, number> = {
    registered:      1,
    shortlisted:     2,
    submission_open: 3,
  };

  return all.filter((item) => order[navState] >= minOrder[item.minState]);
}

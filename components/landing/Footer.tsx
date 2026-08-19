/**
 * Footer — institutional footer for the CPRI × MIT Bengaluru Hackathon.
 *
 * Design spec:
 *  - bg-blue-deep / white text
 *  - CPRI × MIT Bengaluru × VED wordmarks
 *  - Quick links (updated for new sections)
 *  - External institution links
 *  - Copyright
 *
 * Phase 2 note: No effects on footer — intentionally the calmest part
 * of the page. Contrast is fine, current treatment stands.
 */
export default function Footer() {
  return (
    <footer
      className="bg-blue-deep text-white py-14"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display font-bold tracking-[0.08em] text-[1.25rem] mb-2">
              CPRI × MIT Bengaluru
            </p>
            <p className="font-body text-[0.8125rem] text-white/60 leading-relaxed max-w-[28ch]">
              Hackathon 2026 — an initiative of the Central Power Research
              Institute, MIT Bengaluru, and VED.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-body text-caps text-white/50 mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {[
                { label: 'About',            href: '#about'     },
                { label: 'Tracks',           href: '#tracks'    },
                { label: 'Timeline',         href: '#timeline'  },
                { label: 'Team Information', href: '#team-info' },
                { label: 'Contact',          href: '#contact'   },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div>
            <p className="font-body text-caps text-white/50 mb-4">Institutions</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.cpri.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/70 hover:text-white transition-colors duration-150"
                >
                  cpri.in ↗
                </a>
              </li>
              <li>
                <span className="font-body text-sm text-white/40 italic">
                  MIT Bengaluru — link pending {/* TODO: Add MIT Bengaluru URL */}
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-white/40 italic">
                  VED — link pending {/* TODO: Add VED URL */}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-[0.8125rem] text-white/50">
            © {new Date().getFullYear()} CPRI, MIT Bengaluru &amp; VED. All rights reserved.
          </p>
          <p className="font-body text-[0.8125rem] text-white/40">
            CPRI × MIT Bengaluru Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Footer — institutional footer for the CPRI × MIT Bengaluru Hackathon.
 *
 * Design spec:
 *  - bg-brown-900 / white text
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
      style={{ backgroundColor: 'var(--brown-900)' }}
      className="text-white py-14 relative"
      aria-label="Site footer"
    >
      <div 
        className="absolute top-0 left-0 right-0"
        style={{ height: '2px', background: 'var(--gold-muted)', opacity: 0.6 }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-bold tracking-[0.06em] text-[1.25rem] mb-2" style={{ letterSpacing: '-0.01em' }}>
              CPRI × MIT Bengaluru
            </p>
            <p className="text-[0.8125rem] text-white/60 leading-relaxed max-w-[28ch]">
              Hackathon 2026 — an initiative of the Central Power Research
              Institute, MIT Bengaluru, and VED.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-caps text-white/50 mb-4">Navigation</p>
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
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div>
            <p className="text-caps text-white/50 mb-4">Institutions</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.cpri.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                >
                  cpri.in ↗
                </a>
              </li>
              <li>
                <span className="text-sm text-white/40 italic">
                  MIT Bengaluru — link pending {/* TODO: Add MIT Bengaluru URL */}
                </span>
              </li>
              <li>
                <span className="text-sm text-white/40 italic">
                  VED — link pending {/* TODO: Add VED URL */}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div 
          className="border-t pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: 'rgba(199,174,140,0.2)' }}
        >
          <p className="text-[0.8125rem] text-white/50">
            © {new Date().getFullYear()} CPRI, MIT Bengaluru &amp; VED. All rights reserved.
          </p>
          <p className="text-[0.8125rem] text-white/40">
            CPRI × MIT Bengaluru Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

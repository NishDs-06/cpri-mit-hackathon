'use client';

import { TiltCard } from '@/components/ui/TiltCard';

/**
 * AboutHackathon section.
 *
 * Layout spec (Phase 1):
 *  - Editorial layout — NOT a two-column bio block.
 *  - Three parts: Organizers Grid | gradient divider | "Together" below
 *  - Each org block: name in large display type, institutional paragraph, external link
 *
 * Phase 2 additions:
 *  - Cards elevated to L1 (--shadow-l1: dual near+far shadow)
 *  - TiltCard on hover for each organizer block
 *  - Thin gradient divider between grid and Together section
 *
 * Editorial intent: reads like a government "About the Organizers" page,
 * not a startup landing page. Dense, formal, authoritative.
 */
export default function AboutHackathon() {
  return (
    <section
      id="about"
      className="bg-bg-alt py-24 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16">
          <div className="mb-4">
            <p className="text-caps flex items-center gap-3 mb-2" style={{ color: 'var(--brown-600)' }}>
              <span className="block w-6 h-px" style={{ background: 'var(--brown-600)' }} aria-hidden="true" />
              Organizing Bodies
            </p>
            <span className="eyebrow-rule" aria-hidden="true" />
          </div>
          <h2
            id="about-heading"
            className="font-bold text-brown-900"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            About the Organizers
          </h2>
        </div>

        {/* Organizer blocks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-16">
          {/* CPRI block */}
          <TiltCard className="h-full">
            <div 
              style={{ background: 'var(--surface)' }}
              className="rounded-[10px] p-8 lg:p-10 h-full elevation-l1"
            >
              <OrganizerBlock
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <rect x="4" y="8" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="16" y="8" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M14 4v4M14 20v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16 11l-3 3.5h2.5L13 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                name="CPRI"
                fullName="Central Power Research Institute"
                description="The Central Power Research Institute (CPRI) is an autonomous body under the Ministry of Power, Government of India. Established in 1960, CPRI functions as the national laboratory for the power sector, engaged in applied research, testing, and standardization of electrical equipment and systems. CPRI plays a pivotal role in ensuring the reliability and quality of India's power infrastructure."
                linkHref="https://www.cpri.in"
                linkLabel="cpri.in"
              />
            </div>
          </TiltCard>

          {/* MIT Bengaluru block */}
          <TiltCard className="h-full">
            <div 
              style={{ background: 'var(--surface)' }}
              className="rounded-[10px] p-8 lg:p-10 h-full elevation-l1"
            >
              <OrganizerBlock
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M14 8L4 13l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M8 15.5v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M24 13v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="24" cy="20" r="1" fill="currentColor"/>
                  </svg>
                }
                name="MIT Bengaluru"
                fullName="Manipal Institute of Technology, Bengaluru"
                description="MIT Bengaluru is a premier engineering institution under the Manipal Academy of Higher Education (MAHE), a deemed university of eminence. The institution fosters a culture of applied research and innovation, preparing engineers to solve real-world problems across domains including energy, infrastructure, and embedded systems."
              />
            </div>
          </TiltCard>

          {/* VED block */}
          <TiltCard className="h-full">
            <div 
              style={{ background: 'var(--surface)' }}
              className="rounded-[10px] p-8 lg:p-10 h-full elevation-l1"
            >
              <OrganizerBlock
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <rect x="9" y="9" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 9V6M16 9V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 19v3M16 19v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 12H6M9 16H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M19 12h3M19 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                }
                name="VED"
                fullName="VLSI & Embedded Design Club"
                description="VED is MIT Bengaluru's student community for VLSI and embedded systems design. It runs hands-on labs, PCB and chip-design workshops, and project sprints that take students from schematic to working hardware — the same systems-level rigor this hackathon's power-grid tracks call for."
              />
            </div>
          </TiltCard>

          {/* IEEE block */}
          <TiltCard className="h-full">
            <div 
              style={{ background: 'var(--surface)' }}
              className="rounded-[10px] p-8 lg:p-10 h-full elevation-l1"
            >
              <OrganizerBlock
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5"/>
                    <ellipse cx="14" cy="14" rx="4" ry="8" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 14h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                }
                name="IEEE"
                fullName="IEEE MIT Bengaluru Student Branch"
                description="The IEEE MIT Bengaluru Student Branch connects students to the global IEEE community through technical talks, standards-aligned workshops, and competitions spanning power systems, electronics, and computing."
              />
            </div>
          </TiltCard>
        </div>

        {/* Gradient divider between org blocks and Together section */}
        <div className="gradient-divider mb-14" aria-hidden="true" />

        {/* Together section */}
        <div className="max-w-3xl">
          <div className="mb-4">
            <p className="text-caps flex items-center gap-3 mb-2" style={{ color: 'var(--brown-600)' }}>
              <span className="block w-6 h-px" style={{ background: 'var(--brown-600)' }} aria-hidden="true" />
              Together
            </p>
            <span className="eyebrow-rule" aria-hidden="true" />
          </div>
          <p
            className="font-semibold mb-6"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--brown-900)' }}
          >
            CPRI brings six decades of power-sector expertise. MIT Bengaluru brings
            engineering talent. VED brings operational depth in VLSI and embedded
            systems. IEEE brings a global engineering network.
          </p>
          <p className="text-text-secondary leading-relaxed"
            style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)' }}
          >
            Together, this hackathon is designed to identify and develop engineers
            capable of solving the real, hard problems in India's evolving power grid —
            from grid stability and fault detection to renewable integration and smart
            infrastructure. This is not a case study competition. The problems are real.
            The stakes are real.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── OrganizerBlock ──────────────────────────────────────────────────────── */

interface OrganizerBlockProps {
  icon?: React.ReactNode;
  name: string;
  fullName: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
}

function OrganizerBlock({
  icon,
  name,
  fullName,
  description,
  linkHref,
  linkLabel,
}: OrganizerBlockProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Icon */}
      {icon && (
        <div className="mb-4" style={{ color: 'var(--brown-600)' }}>
          {icon}
        </div>
      )}

      {/* Name in large display type */}
      <div className="mb-5">
        <span
          className="font-bold text-brown-900 tracking-[0.06em]"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
        >
          {name}
        </span>
      </div>

      {/* Full institutional name */}
      <p className="font-medium text-brown-900 mb-4 text-[0.875rem] tracking-wide uppercase">
        {fullName}
      </p>

      {/* Description */}
      <p
        className="text-text-secondary leading-relaxed mb-8 flex-grow"
        style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)' }}
      >
        {description}
      </p>

      {/* External link */}
      {linkHref && linkLabel && (
        <a
          href={linkHref}
          target={linkHref.startsWith('http') ? '_blank' : undefined}
          rel={linkHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="
            inline-flex items-center gap-2
            font-medium text-brown-600 text-[0.9375rem]
            hover:text-brown-900
            transition-colors duration-150
            group
            mt-auto
          "
        >
          {linkLabel}
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="group-hover:translate-x-0.5 transition-transform duration-150"
          >
            <path
              d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

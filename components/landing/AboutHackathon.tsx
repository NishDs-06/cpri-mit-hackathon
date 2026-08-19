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
          <p className="font-body text-caps text-blue-mid mb-3 flex items-center gap-3">
            <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
            Organizing Bodies
          </p>
          <h2
            id="about-heading"
            className="font-display font-bold text-blue-deep"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            About the Organizers
          </h2>
        </div>

        {/* Organizer blocks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-16">
          {/* CPRI block */}
          <TiltCard className="h-full">
            <div className="bg-bg-panel rounded-firm p-8 lg:p-10 h-full elevation-l1">
              <OrganizerBlock
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
            <div className="bg-bg-panel rounded-firm p-8 lg:p-10 h-full elevation-l1">
              <OrganizerBlock
                name="MIT Bengaluru"
                fullName="Manipal Institute of Technology, Bengaluru"
                description="MIT Bengaluru is a premier engineering institution under the Manipal Academy of Higher Education (MAHE), a deemed university of eminence. The institution fosters a culture of applied research and innovation, preparing engineers to solve real-world problems across domains including energy, infrastructure, and embedded systems."
              />
            </div>
          </TiltCard>

          {/* VED block */}
          <TiltCard className="h-full">
            <div className="bg-bg-panel rounded-firm p-8 lg:p-10 h-full elevation-l1">
              <OrganizerBlock
                name="VED"
                fullName="VLSI & Embedded Design Club"
                description="{{VED_DESCRIPTION}}"
              />
            </div>
          </TiltCard>

          {/* IEEE block */}
          <TiltCard className="h-full">
            <div className="bg-bg-panel rounded-firm p-8 lg:p-10 h-full elevation-l1">
              <OrganizerBlock
                name="IEEE"
                fullName="IEEE MIT Bengaluru Student Branch"
                description="{{IEEE_DESCRIPTION}}"
              />
            </div>
          </TiltCard>
        </div>

        {/* Gradient divider between org blocks and Together section */}
        <div className="gradient-divider mb-14" aria-hidden="true" />

        {/* Together section */}
        <div className="max-w-3xl">
          <p className="font-body text-caps text-blue-mid mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
            Together
          </p>
          <p
            className="font-display font-semibold text-blue-deep mb-6"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.25 }}
          >
            CPRI brings six decades of power-sector expertise. MIT Bengaluru brings
            engineering talent. VED brings operational depth in VLSI and embedded
            systems. IEEE brings a global engineering network.
          </p>
          <p className="font-body text-text-secondary leading-relaxed"
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
  name: string;
  fullName: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
}

function OrganizerBlock({
  name,
  fullName,
  description,
  linkHref,
  linkLabel,
}: OrganizerBlockProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Name in large display type */}
      <div className="mb-5">
        <span
          className="font-display font-bold text-blue-primary tracking-[0.06em]"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
        >
          {name}
        </span>
      </div>

      {/* Full institutional name */}
      <p className="font-body font-medium text-blue-deep mb-4 text-[0.875rem] tracking-wide uppercase">
        {fullName}
      </p>

      {/* Description */}
      <p
        className="font-body text-text-secondary leading-relaxed mb-8 flex-grow"
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
            font-body font-medium text-blue-mid text-[0.9375rem]
            hover:text-blue-primary
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

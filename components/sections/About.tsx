/**
 * About section — CPRI and VED descriptions.
 *
 * Layout spec:
 *  - bg-alt (#F5F7FA) to separate from hero without a hard border
 *  - Two-column grid on desktop, stacked on mobile
 *  - Each block: wordmark/logo placeholder, formal institutional paragraph, "Learn more" link
 *  - Thin hairline border separating the two columns on desktop
 *  - No marketing flourishes — reads like a government site's "About the Organizers" block
 */
export default function About() {
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

        {/* Two-column organizer blocks */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-hairline">
          {/* CPRI block */}
          <div className="pb-12 lg:pb-0 lg:pr-16">
            <OrganizerBlock
              name="CPRI"
              fullName="Central Power Research Institute"
              description="The Central Power Research Institute (CPRI) is an autonomous body under the Ministry of Power, Government of India. Established in 1960, CPRI functions as the national laboratory for the power sector, engaged in applied research, testing, and standardization of electrical equipment and systems. CPRI plays a pivotal role in ensuring the reliability and quality of India's power infrastructure."
              linkHref="https://www.cpri.in"
              linkLabel="cpri.in"
            />
          </div>

          {/* VED block */}
          <div className="pt-12 lg:pt-0 lg:pl-16">
            <OrganizerBlock
              name="VED"
              fullName="VED — Co-organizer"
              description="VED is a co-organizer of this hackathon, contributing domain expertise and operational support to the event. Together with CPRI, VED aims to identify and nurture engineering talent capable of solving real challenges in India's evolving power grid and energy sector."
              linkHref="#contact"
              linkLabel="Contact VED"
              isPlaceholder
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface OrganizerBlockProps {
  name: string;
  fullName: string;
  description: string;
  linkHref: string;
  linkLabel: string;
  isPlaceholder?: boolean;
}

function OrganizerBlock({
  name,
  fullName,
  description,
  linkHref,
  linkLabel,
  isPlaceholder,
}: OrganizerBlockProps) {
  return (
    <div>
      {/* Logo area */}
      <div className="mb-6">
        <span
          className="font-display font-bold text-blue-primary tracking-[0.06em]"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
        >
          {name}
        </span>
        {isPlaceholder && (
          <span className="ml-3 font-body text-[0.6875rem] text-text-secondary border border-border-hairline rounded-sharp px-2 py-0.5 tracking-wide uppercase">
            Logo pending
          </span>
        )}
      </div>

      {/* Full name */}
      <p className="font-body font-medium text-blue-deep mb-3 text-[0.875rem] tracking-wide uppercase">
        {fullName}
      </p>

      {/* Description */}
      <p
        className="font-body text-text-secondary leading-relaxed mb-8"
        style={{ fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)' }}
      >
        {description}
      </p>

      {/* Learn more link */}
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
    </div>
  );
}

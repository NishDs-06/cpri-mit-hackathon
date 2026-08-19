import Navbar        from '@/components/navigation/Navbar';
import Hero           from '@/components/landing/Hero';
import AboutHackathon from '@/components/landing/AboutHackathon';
import Tracks         from '@/components/landing/Tracks';
import EventTimeline  from '@/components/landing/EventTimeline';
import TeamInformation from '@/components/landing/TeamInformation';
import Contact        from '@/components/landing/Contact';
import Footer         from '@/components/landing/Footer';

/**
 * Public landing page — single scrolling page.
 *
 * Section order (per spec):
 *  1. Hero            — event name, dates, location, mission line, CTAs
 *  2. About           — CPRI + MIT Bengaluru + VED editorial
 *  3. Tracks          — 01/02/03 numbered sections (placeholder content)
 *  4. Timeline        — scroll-driven vertical timeline
 *  5. Team Information — eligibility, team size, what's needed
 *  6. Contact + Footer
 *
 * Nav anchors:
 *  #about     — About section
 *  #tracks    — Challenge tracks
 *  #timeline  — Event timeline
 *  #team-info — Team information
 *  #contact   — Contact section
 *
 * Registration → /portal (not inline on this page)
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutHackathon />
        <Tracks />
        <EventTimeline />
        <TeamInformation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Navbar   from '@/components/nav/Navbar';
import Hero      from '@/components/sections/Hero';
import About     from '@/components/sections/About';
import Register  from '@/components/sections/Register';
import Contact   from '@/components/sections/Contact';

/**
 * Single-page assembly.
 *
 * Section order: Hero → About → Register → Contact/Footer
 *
 * Nav anchors link to:
 *  #hero     — top of page / hero section
 *  #about    — About CPRI & VED
 *  #register — Countdown + registration/portal flow
 *  #contact  — Contact form
 *
 * The Navbar is fixed/sticky and floats above all sections via z-50.
 * Each section accounts for the 72px navbar height via scroll-margin-top
 * defined in globals.css (:target { scroll-margin-top: 80px }).
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero     />
        <About    />
        <Register />
        <Contact  />
      </main>
    </>
  );
}

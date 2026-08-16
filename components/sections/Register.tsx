import CountdownTimer from '@/components/ui/CountdownTimer';
import AuthFlow       from '@/components/auth/AuthFlow';

/**
 * Register section — contains the countdown timer and the full auth/registration flow.
 *
 * This section is the destination of:
 *  - The "Register Now" hero CTA
 *  - The "Register" nav link
 *  - The magic link callback redirect (auth/callback/page.tsx)
 *
 * The countdown timer is the ONE place gold accent appears on the entire site.
 * The auth flow panel is a bordered white panel inline in the section — not a modal.
 */
export default function Register() {
  return (
    <section
      id="register"
      className="bg-bg-base py-24 lg:py-32 border-t border-border-hairline"
      aria-labelledby="register-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-body text-caps text-blue-mid mb-3 flex items-center justify-center gap-3">
            <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
            Registration
            <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
          </p>
          <h2
            id="register-heading"
            className="font-display font-bold text-blue-deep mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            Register Your Team
          </h2>
          <p className="font-body text-text-secondary max-w-[52ch] mx-auto text-[1rem] leading-relaxed">
            Register as an individual first, then create or join a team of up to 4 members.
            Teams will be reviewed by CPRI and VED after the deadline.
          </p>
        </div>

        {/* Countdown timer — gold accent appears here only */}
        <div className="mb-16">
          <p className="text-center font-body text-caps text-text-secondary mb-6">
            Time remaining to register
          </p>
          <CountdownTimer />
        </div>

        {/* Hairline separator */}
        <div className="border-t border-border-hairline mb-14" aria-hidden="true" />

        {/* Auth / Registration flow — inline panel */}
        <AuthFlow />
      </div>
    </section>
  );
}

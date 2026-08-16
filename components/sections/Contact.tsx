'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FloatingLabelInput, FloatingLabelTextarea } from '@/components/ui/FloatingLabelInput';

/**
 * Contact section + institutional footer.
 *
 * Contact block:
 *  - Email address (placeholder — replace before go-live)
 *  - Short contact form: name / email / message
 *  - Note pointing to CPRI/VED institutional pages
 *
 * Footer:
 *  - bg-blue-deep / white text
 *  - CPRI × VED wordmarks
 *  - Quick links
 *  - Copyright
 *
 * The contact form POSTs to /api/contact (backend endpoint).
 * No form action URL is hardcoded in the frontend.
 */
export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('Server error');
      setSubmitted(true);
    } catch {
      setError('Failed to send message. Please email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact section */}
      <section
        id="contact"
        className="bg-bg-alt py-24 lg:py-32 border-t border-border-hairline"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left: contact info */}
            <div>
              <p className="font-body text-caps text-blue-mid mb-3 flex items-center gap-3">
                <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
                Get in Touch
              </p>
              <h2
                id="contact-heading"
                className="font-display font-bold text-blue-deep mb-6"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Contact
              </h2>
              <p className="font-body text-text-secondary leading-relaxed mb-8 text-[1rem]">
                For queries related to the PowerGrid Hackathon 2026, reach out to the organizing team.
                Please include your team code if your query is about an existing registration.
              </p>

              <div className="space-y-4">
                <ContactItem
                  label="General Enquiries"
                  value="hackathon@cpri.in"
                  href="mailto:hackathon@cpri.in"
                />
                <ContactItem
                  label="CPRI Official Website"
                  value="www.cpri.in"
                  href="https://www.cpri.in"
                  external
                />
                <ContactItem
                  label="Address"
                  value="CPRI, Sir C.V. Raman Road, Sadashivanagar, Bengaluru – 560 080"
                />
              </div>
            </div>

            {/* Right: contact form */}
            <div>
              {submitted ? (
                <div className="border border-border-hairline rounded-firm p-8 bg-bg-panel text-center">
                  <svg
                    className="mx-auto mb-4"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="18" r="17" stroke="var(--blue-mid)" strokeWidth="1.5"/>
                    <path d="M11 18L16 23L25 13" stroke="var(--blue-mid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="font-display font-semibold text-blue-deep text-lg mb-2">
                    Message Sent
                  </h3>
                  <p className="font-body text-text-secondary text-sm">
                    Thank you for reaching out. We'll respond within 2 working days.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="border border-border-hairline rounded-firm p-8 bg-bg-panel space-y-5"
                >
                  <FloatingLabelInput
                    id="contact-name"
                    label="Your name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={set('name')}
                    required
                  />
                  <FloatingLabelInput
                    id="contact-email"
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={set('email')}
                    required
                  />
                  <FloatingLabelTextarea
                    id="contact-message"
                    label="Your message"
                    value={fields.message}
                    onChange={set('message')}
                    rows={4}
                    required
                  />
                  {error && (
                    <p role="alert" className="text-sm text-red-600 font-body">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    block
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-blue-deep text-white py-14"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <p className="font-display font-bold tracking-[0.08em] text-[1.25rem] mb-2">
                CPRI × VED
              </p>
              <p className="font-body text-[0.8125rem] text-white/60 leading-relaxed max-w-[28ch]">
                PowerGrid Hackathon 2026 — an initiative of the Central Power Research Institute and VED.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="font-body text-caps text-white/50 mb-4">Navigation</p>
              <ul className="space-y-2.5">
                {[
                  { label: 'About',    href: '#about'    },
                  { label: 'Register', href: '#register' },
                  { label: 'Contact',  href: '#contact'  },
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
                    VED — link pending
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-body text-[0.8125rem] text-white/50">
              © {new Date().getFullYear()} CPRI & VED. All rights reserved.
            </p>
            <p className="font-body text-[0.8125rem] text-white/40">
              PowerGrid Hackathon 2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function ContactItem({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div>
      <dt className="font-body text-caps text-text-secondary mb-1">{label}</dt>
      <dd>
        {href ? (
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="font-body text-blue-mid hover:text-blue-primary transition-colors text-[0.9375rem]"
          >
            {value}
          </a>
        ) : (
          <span className="font-body text-text-primary text-[0.9375rem]">{value}</span>
        )}
      </dd>
    </div>
  );
}

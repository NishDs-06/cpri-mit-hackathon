'use client';

import { useEffect, useRef } from 'react';
import { TIMELINE_EVENTS } from '@/lib/constants';

/**
 * EventTimeline — scroll-driven vertical timeline.
 *
 * Steps: Registration Open → Shortlist Announced → Day 1 (10 Oct) → Day 2 (11 Oct)
 *
 * Scroll animation:
 *  - Uses IntersectionObserver (no Framer Motion — Phase 1).
 *  - Each timeline item fades up when it enters the viewport.
 *  - CSS classes defined in globals.css: .timeline-item, .is-visible.
 *
 * Reduced motion:
 *  - .timeline-item has opacity:1 + transform:none under prefers-reduced-motion
 *    in globals.css — meaning all items are visible from the start with no
 *    animation. Fully usable without animation.
 *
 * TODO: Update TIMELINE_EVENTS in lib/constants.ts with real dates from organizers.
 */
export default function EventTimeline() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.timeline-item');
    if (!items || !items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Once revealed, unobserve — no re-hiding on scroll-up
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="timeline"
      className="bg-bg-base border-t border-border-hairline py-24 lg:py-32"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-body text-caps text-blue-mid mb-3 flex items-center gap-3">
            <span className="block w-8 h-px bg-blue-mid" aria-hidden="true" />
            Event Timeline
          </p>
          <h2
            id="timeline-heading"
            className="font-display font-bold text-blue-deep"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            Key dates
          </h2>
        </div>

        {/* Timeline — vertical, left-rail connector */}
        <ol ref={listRef} className="relative max-w-2xl" aria-label="Event timeline">
          {/* Vertical connector line — left edge of the timeline */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] top-2 bottom-2 w-px bg-border-hairline"
          />

          {TIMELINE_EVENTS.map((event, i) => (
            <li
              key={event.step}
              className={`
                timeline-item
                relative pl-10 pb-12 last:pb-0
              `}
              // Stagger the reveal delay per item
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Step dot — filled for past, outlined for future */}
              <div
                aria-hidden="true"
                className="
                  absolute left-0 top-1
                  w-6 h-6 rounded-full
                  flex items-center justify-center
                  bg-bg-base border-2 border-blue-primary
                  z-10
                "
              >
                <span className="w-2 h-2 rounded-full bg-blue-primary" />
              </div>

              {/* Step number */}
              <p className="font-body text-caps text-blue-mid mb-2">
                Step {event.step}
              </p>

              {/* Step name */}
              <h3
                className="font-display font-semibold text-blue-deep mb-1"
                style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)' }}
              >
                {event.label}
              </h3>

              {/* Date — TODO: will show TODO string until confirmed */}
              <p className="font-body text-[0.8125rem] font-medium text-blue-mid mb-3 tabular-nums">
                {event.date}
              </p>

              {/* Description */}
              <p className="font-body text-text-secondary text-[0.9375rem] leading-relaxed">
                {event.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { TIMELINE_EVENTS } from '@/lib/constants';

/**
 * EventTimeline — scroll-driven vertical timeline.
 *
 * Visuals:
 *  - Elevation-2 cards with large gold step numerals.
 *  - Interactive scroll-driven connector line that fills as you scroll.
 *  - IntersectionObserver for revealing cards and activating markers.
 */
export default function EventTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // Handle positioning the connector track dynamically to perfectly align with markers
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateLayout = () => {
      const markers = list.querySelectorAll('.timeline-marker');
      if (markers.length < 2) return;
      const first = markers[0] as HTMLElement;
      const last = markers[markers.length - 1] as HTMLElement;

      const track = list.querySelector('.timeline-connector-track') as HTMLElement;
      const fill = list.querySelector('.timeline-connector-fill') as HTMLElement;

      const listRect = list.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      // Calculate perfect center offsets relative to the ol container
      const top = firstRect.top - listRect.top + firstRect.height / 2;
      const bottom = listRect.bottom - lastRect.bottom + lastRect.height / 2;

      if (track) {
        track.style.top = `${top}px`;
        track.style.bottom = `${bottom}px`;
      }
      if (fill) {
        fill.style.top = `${top}px`;
        fill.style.bottom = `${bottom}px`;
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    // Add a slight delay to ensure fonts/layout are fully painted
    const timeoutId = setTimeout(updateLayout, 100);

    return () => {
      window.removeEventListener('resize', updateLayout);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle scroll progress and intersection revealing
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = listRef.current?.querySelectorAll('.timeline-card');

    // Progressive enhancement: mark cards for animation before observing
    // Cards start visible by default (CSS); we opt them into slide-in here
    if (!prefersReducedMotion) {
      items?.forEach((item) => item.classList.add('will-animate'));
    }

    if (prefersReducedMotion) {
      items?.forEach((item) => {
        item.classList.add('is-visible');
        const marker = item.querySelector('.timeline-marker');
        if (marker) {
          marker.classList.remove('timeline-marker--default');
          marker.classList.add('timeline-marker--active');
        }
      });
      if (fillRef.current) {
        fillRef.current.style.setProperty('--progress', '1');
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const marker = entry.target.querySelector('.timeline-marker');
            if (marker) {
              marker.classList.remove('timeline-marker--default');
              marker.classList.add('timeline-marker--active');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    items?.forEach((item) => observer.observe(item));

    const handleScroll = () => {
      if (!listRef.current || !fillRef.current) return;
      const rect = listRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling when the top of the timeline is ~75% down the screen
      const startOffset = windowHeight * 0.75;

      // Progress fills completely over 80% of the timeline height
      const distance = rect.height * 0.8;

      let progress = (startOffset - rect.top) / distance;
      progress = Math.max(0, Math.min(1, progress));

      fillRef.current.style.setProperty('--progress', progress.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init immediately

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="timeline"
      className="bg-bg-base border-t border-border-hairline py-28 lg:py-36"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <div className="mb-4">
            <p className="text-caps flex items-center gap-3 mb-2" style={{ color: 'var(--brown-600)' }}>
              <span className="block w-6 h-px" style={{ background: 'var(--brown-600)' }} aria-hidden="true" />
              Event Timeline
            </p>
            <span className="eyebrow-rule" aria-hidden="true" />
          </div>
          <h2
            id="timeline-heading"
            className="font-bold"
            style={{ color: 'var(--brown-900)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Key dates
          </h2>
        </div>

        {/* Timeline List */}
        <ol ref={listRef} className="relative max-w-4xl" aria-label="Event timeline">
          {/* Track (background line) */}
          <div
            className="timeline-connector-track"
            aria-hidden="true"
            style={{ left: 'calc(1.25rem - 1px)' }}
          />
          {/* Fill (active gold line) */}
          <div
            ref={fillRef}
            className="timeline-connector-fill"
            aria-hidden="true"
            style={{ left: 'calc(1.25rem - 1px)' }}
          />

          {TIMELINE_EVENTS.map((event, i) => (
            <li
              key={event.step}
              className="timeline-card relative z-10 pb-12 lg:pb-16 last:pb-0"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-6 lg:gap-10">
                {/* Marker */}
                <div
                  aria-hidden="true"
                  className="timeline-marker timeline-marker--default shrink-0 mt-6 lg:mt-8"
                />

                {/* Card Content */}
                <div 
                  style={{ background: 'var(--surface)' }}
                  className="timeline-card-inner elevation-l2 rounded-[10px] p-6 lg:p-8 flex-1"
                >
                  <p
                    className="font-bold mb-2"
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      lineHeight: 1,
                      color: 'var(--gold-muted)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {event.step}
                  </p>
                  <h3
                    className="font-semibold mb-2 text-xl lg:text-2xl"
                    style={{ letterSpacing: '-0.02em', color: 'var(--brown-900)' }}
                  >
                    {event.label}
                  </h3>
                  <p className="text-sm font-medium mb-4 tabular-nums" style={{ color: 'var(--brown-600)' }}>
                    {event.date}
                  </p>
                  <p className="text-text-secondary text-[0.9375rem] lg:text-base leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

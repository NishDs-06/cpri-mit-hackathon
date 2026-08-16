/**
 * Hero background — faint circuit/grid line pattern drifting left continuously.
 *
 * SEAMLESS LOOP DESIGN:
 *  The SVG pattern tile is 120×120px. The background-image is set to repeat-x
 *  at 200% width (= two full tile repetitions side by side). The keyframe
 *  animates translateX from 0 → -50%, which is exactly one tile width.
 *  At the loop point the visible content is identical to the start frame,
 *  so the repeat is invisible — no jump or stutter.
 *
 * PERFORMANCE:
 *  - Pure CSS animation using transform: translateX() only
 *  - will-change: transform promotes to its own GPU compositing layer
 *  - No JS, no canvas, no requestAnimationFrame
 *  - No other element on the page uses backdrop-filter or animation
 *  - prefers-reduced-motion: animation-duration collapses to 0.01ms via globals.css
 *
 * The .hero-bg-drift class is defined in globals.css so it participates
 * in the prefers-reduced-motion media query there.
 */
export default function HeroBackground() {
  // Inline SVG as a data URI — a subtle grid of light grey lines
  // nodding to CPRI's power-engineering context (circuit schematic feel)
  const svgPattern = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
      <defs>
        <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
          <!-- Major grid lines -->
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#0B3D91" stroke-width="0.4" opacity="0.18"/>
          <!-- Minor grid lines -->
          <line x1="60" y1="0" x2="60" y2="120" stroke="#0B3D91" stroke-width="0.2" opacity="0.10"/>
          <line x1="0" y1="60" x2="120" y2="60" stroke="#0B3D91" stroke-width="0.2" opacity="0.10"/>
          <!-- Small junction dots -->
          <circle cx="0"   cy="0"   r="1.2" fill="#0B3D91" opacity="0.20"/>
          <circle cx="120" cy="0"   r="1.2" fill="#0B3D91" opacity="0.20"/>
          <circle cx="0"   cy="120" r="1.2" fill="#0B3D91" opacity="0.20"/>
          <circle cx="60"  cy="60"  r="0.8" fill="#0B3D91" opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#grid)"/>
    </svg>
  `);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/*
        The inner div is 200% wide so that when translated -50%,
        it still fully covers the parent — giving the seamless loop.
        The pattern repeats horizontally across 200% width.
      */}
      <div
        className="hero-bg-drift h-full"
        style={{
          width: '200%',
          backgroundImage: `url("data:image/svg+xml,${svgPattern}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
          opacity: 0.45,
        }}
      />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { GLYPH_MATRIX_CONFIG } from '@/lib/design-tokens';

/**
 * GlyphMatrix — MagicUI pattern, canvas-only, no WebGL, no Three.js.
 *
 * Renders a grid of mutating ASCII-range characters at very low opacity
 * to create a living, breathing background texture behind the hero section.
 *
 * Config values are defined in lib/design-tokens.ts (mutationRate, cellSize,
 * opacity, color) so they can be tuned without touching this file.
 *
 * prefers-reduced-motion: The canvas is never started — a static
 * bg-blue-tint div is rendered instead.
 */
export function GlyphMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion — static background, no canvas animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { cellSize, mutationRate, color } = GLYPH_MATRIX_CONFIG;

    // Characters to draw — power/electrical engineering ASCII range + common
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~∿⊕⊗±∑√∫∂∇⌀◈◉●○□△▽';

    let cols: number;
    let rows: number;
    let grid: string[][];
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.ceil(canvas.width / cellSize);
      rows = Math.ceil(canvas.height / cellSize);
      // (Re)initialize grid with random characters
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        )
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cellSize * 0.65}px ui-monospace, Menlo, Consolas, monospace`;
      ctx.fillStyle = color;
      ctx.textBaseline = 'top';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Probabilistically mutate a cell each frame
          if (Math.random() < mutationRate) {
            grid[r][c] = chars[Math.floor(Math.random() * chars.length)];
          }
          ctx.fillText(grid[r][c], c * cellSize, r * cellSize);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: GLYPH_MATRIX_CONFIG.opacity }}
    />
  );
}

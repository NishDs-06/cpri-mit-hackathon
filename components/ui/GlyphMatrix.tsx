'use client';

import { useEffect, useRef } from 'react';
import { GLYPH_MATRIX_CONFIG } from '@/lib/design-tokens';

/**
 * GlyphMatrix — engineering-symbol field, canvas-only, no WebGL.
 *
 * Phase 4: Recolored to brown/gold-muted duotone.
 * Primary glyphs (#7A5A3E brown-600), 1/8 cells in gold-muted (#A9855A).
 * Opacity: 9% in hero — visible on a careful second look.
 *
 * prefers-reduced-motion: canvas not started, static bg renders instead.
 */
export function GlyphMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const {
      cellSize, mutationRate, color, goldColor, goldFraction,
      glyphs,
    } = GLYPH_MATRIX_CONFIG;

    let cols: number, rows: number;
    let grid: string[][];
    let goldGrid: boolean[][];
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.ceil(canvas.width / cellSize);
      rows = Math.ceil(canvas.height / cellSize);
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () =>
          glyphs[Math.floor(Math.random() * glyphs.length)]
        )
      );
      goldGrid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() < goldFraction)
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cellSize * 0.7}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;
      ctx.textBaseline = 'top';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const isGold = goldGrid[r][c];
          if (Math.random() < (isGold ? mutationRate * 0.3 : mutationRate)) {
            grid[r][c] = glyphs[Math.floor(Math.random() * glyphs.length)];
          }
          ctx.fillStyle = isGold ? goldColor : color;
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

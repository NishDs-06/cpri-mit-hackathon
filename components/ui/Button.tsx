import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Render as a full-width block button */
  block?: boolean;
}

/**
 * Reusable institutional button.
 *
 * Design spec:
 *  - Sharp corners (border-radius: 4px) — precise, not bubbly
 *  - No glow effects, no gradients
 *  - primary: solid blue-primary fill
 *  - outline: 1px border blue-primary, transparent bg
 *  - ghost: no border, text only
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        // Base
        'inline-flex items-center justify-center',
        'font-body font-medium rounded-sharp',
        'transition-colors duration-150',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Block
        block && 'w-full',
        // Size
        size === 'sm' && 'px-4 py-2 text-[0.8125rem] tracking-wide',
        size === 'md' && 'px-6 py-2.5 text-[0.9375rem]',
        size === 'lg' && 'px-8 py-3.5 text-[1rem] tracking-wide',
        // Variant
        variant === 'primary' && [
          'bg-blue-primary text-white',
          'hover:bg-blue-deep',
        ],
        variant === 'outline' && [
          'border border-blue-primary text-blue-primary bg-transparent',
          'hover:bg-blue-tint',
        ],
        variant === 'ghost' && [
          'text-blue-mid bg-transparent',
          'hover:bg-blue-tint',
        ],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

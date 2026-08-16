import { cn } from '@/lib/utils';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

/**
 * Input with a CSS-only floating label.
 *
 * The label starts centered inside the input (like placeholder text),
 * then floats to the top-left when the input is focused or has a value.
 * Implemented with :placeholder-shown and :focus CSS selectors — no JS state.
 *
 * The actual <input> uses placeholder=" " (a single space) to make
 * :placeholder-shown work correctly even when the field is visually empty.
 */
export function FloatingLabelInput({
  label,
  id,
  error,
  className,
  ...props
}: FloatingLabelInputProps) {
  return (
    <div className="space-y-1">
      <div className="floating-label-wrap">
        <input
          id={id}
          placeholder=" "
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={cn(
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[0.8125rem] text-red-600 pl-1">
          {error}
        </p>
      )}
    </div>
  );
}

interface FloatingLabelTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
}

/** Textarea variant with the same floating label behavior. */
export function FloatingLabelTextarea({
  label,
  id,
  error,
  className,
  rows = 4,
  ...props
}: FloatingLabelTextareaProps) {
  return (
    <div className="space-y-1">
      <div className="floating-label-wrap floating-label-wrap--textarea">
        <textarea
          id={id}
          rows={rows}
          placeholder=" "
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={cn(
            'resize-y',
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[0.8125rem] text-red-600 pl-1">
          {error}
        </p>
      )}
    </div>
  );
}

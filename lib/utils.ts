import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names safely, resolving conflicts.
 * Use this everywhere instead of bare template literals.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Validate a team code format client-side (length/charset only).
 * Real validation — existence, fullness, lock state — is handled by the backend.
 * Format: 3 uppercase letters, hyphen, 3 digits. e.g. "RBX-042"
 */
export function isValidTeamCodeFormat(code: string): boolean {
  return /^[A-Z]{3}-\d{3}$/.test(code.toUpperCase());
}

/**
 * Format a URL for safe display (strip protocol prefix for readability).
 */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '');
}

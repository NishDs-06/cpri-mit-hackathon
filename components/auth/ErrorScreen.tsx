'use client';

import { Button } from '@/components/ui/Button';

type ErrorType = 'expired_link' | 'invalid_link' | 'forbidden' | 'server_error' | 'generic';

interface ErrorScreenProps {
  type?: ErrorType;
  onBack?: () => void;
}

const ERROR_CONTENT: Record<
  ErrorType,
  { title: string; description: string; action: string }
> = {
  expired_link: {
    title:       'Link Expired',
    description: 'This magic link has expired. Links are valid for 15 minutes. Please request a new one.',
    action:      'Request New Link',
  },
  invalid_link: {
    title:       'Invalid Link',
    description: 'This magic link is not valid. It may have already been used, or the URL may be malformed. Please request a fresh link.',
    action:      'Request New Link',
  },
  forbidden: {
    title:       'Access Denied',
    description: 'You do not have permission to access this resource (403 Forbidden). If you believe this is an error, please contact the organizers.',
    action:      'Back',
  },
  server_error: {
    title:       'Server Error',
    description: 'Something went wrong on our end. Please try again in a few moments. If the issue persists, contact the organizers.',
    action:      'Try Again',
  },
  generic: {
    title:       'Something Went Wrong',
    description: 'An unexpected error occurred. Please try again.',
    action:      'Back',
  },
};

/**
 * Unified error screen for: expired link, invalid link, 403 forbidden, server error.
 * The `type` prop selects the appropriate copy; the UI never bypasses a 403.
 */
export default function ErrorScreen({ type = 'generic', onBack }: ErrorScreenProps) {
  const content = ERROR_CONTENT[type];

  return (
    <div className="max-w-[440px] w-full mx-auto text-center py-8">
      <div
        className="w-14 h-14 rounded-firm border border-border-hairline flex items-center justify-center mx-auto mb-6"
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="9" stroke="#B8862E" strokeWidth="1.5"/>
          <path d="M11 7V12" stroke="#B8862E" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="11" cy="15" r="0.75" fill="#B8862E"/>
        </svg>
      </div>
      <h3 className="font-display font-semibold text-blue-deep text-xl mb-2">
        {content.title}
      </h3>
      <p className="font-body text-text-secondary text-sm leading-relaxed mb-8">
        {content.description}
      </p>
      {onBack && (
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onBack}
        >
          {content.action}
        </Button>
      )}
    </div>
  );
}

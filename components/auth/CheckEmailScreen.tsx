'use client';

import { useAuth } from '@/context/AuthContext';
import { requestMagicLink } from '@/lib/api/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * "Check your email" state screen.
 * Shown after the magic link has been sent.
 * The user has not yet authenticated — no session exists yet.
 */
export default function CheckEmailScreen() {
  const { magicLinkEmail } = useAuth();
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    if (!magicLinkEmail || resending) return;
    setResending(true);
    try {
      await requestMagicLink(magicLinkEmail);
      setResent(true);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="max-w-[440px] w-full mx-auto text-center py-8">
      {/* Mail icon — inline SVG, not a Lucide default */}
      <div
        className="w-14 h-14 rounded-firm border border-border-hairline flex items-center justify-center mx-auto mb-6"
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--blue-mid)" strokeWidth="1.5"/>
          <path d="M3 8L12 13.5L21 8" stroke="var(--blue-mid)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <h3 className="font-display font-semibold text-blue-deep text-xl mb-2">
        Check your inbox
      </h3>
      <p className="font-body text-text-secondary text-sm leading-relaxed mb-1">
        We sent a magic link to
      </p>
      <p className="font-body font-medium text-text-primary text-sm mb-6 break-all">
        {magicLinkEmail ?? 'your email'}
      </p>
      <p className="font-body text-text-secondary text-xs leading-relaxed mb-8">
        Click the link in the email to sign in. The link expires in 15 minutes.
        If you don't see it, check your spam folder.
      </p>

      {resent ? (
        <p className="text-sm font-body text-blue-mid">
          ✓ Link resent — check your inbox again.
        </p>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? 'Resending…' : 'Resend link'}
        </Button>
      )}
    </div>
  );
}

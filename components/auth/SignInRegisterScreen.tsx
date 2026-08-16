'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { requestMagicLink } from '@/lib/api/auth';
import { ApiError } from '@/lib/errors';
import { Button } from '@/components/ui/Button';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';

type Tab = 'signin' | 'register';

/**
 * Sign In / Register screen.
 *
 * Both tabs send a magic link — the backend determines whether the email
 * is new (register flow) or existing (sign-in flow). The frontend does NOT
 * implement authentication logic; it only collects the email and fires the API call.
 *
 * Default tab: "Sign In" (per review feedback — returning participants are more likely
 * to hit this screen from the #register nav link after already having registered).
 * New participants see a clearly visible "New here? Register" option.
 *
 * No fake login. No localStorage session writes.
 */
export default function SignInRegisterScreen() {
  const { onMagicLinkSent } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await requestMagicLink(email.trim());
      onMagicLinkSent(email.trim());
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-bg-panel border border-border-hairline rounded-firm
        max-w-[440px] w-full mx-auto
        p-8 sm:p-10
      "
    >
      {/* Tab toggle */}
      <div
        role="tablist"
        aria-label="Sign in or register"
        className="flex border-b border-border-hairline mb-8"
      >
        {(
          [
            { id: 'signin',   label: 'Sign In'  },
            { id: 'register', label: 'Register' },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            id={`tab-${id}`}
            aria-selected={activeTab === id}
            aria-controls={`tabpanel-${id}`}
            type="button"
            onClick={() => { setActiveTab(id); setError(null); }}
            className={`
              flex-1 pb-3 font-body font-medium text-[0.9375rem]
              border-b-2 transition-colors duration-150
              ${
                activeTab === id
                  ? 'border-blue-primary text-blue-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels share the same form — tab choice affects heading copy only */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        <h3 className="font-display font-semibold text-blue-deep text-xl mb-1">
          {activeTab === 'signin' ? 'Welcome back' : 'Create your account'}
        </h3>
        <p className="font-body text-text-secondary text-sm mb-6">
          {activeTab === 'signin'
            ? "Enter your registered email. We'll send you a magic link."
            : 'Enter your email to get started. No password needed.'}
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FloatingLabelInput
            id="auth-email"
            label="Email address"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ?? undefined}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            block
            disabled={loading}
          >
            {loading
              ? 'Sending…'
              : activeTab === 'signin'
              ? 'Send Magic Link'
              : 'Register & Send Link'}
          </Button>
        </form>

        {/* Cross-tab prompt */}
        <p className="text-center text-sm font-body text-text-secondary mt-6">
          {activeTab === 'signin' ? (
            <>
              New here?{' '}
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(null); }}
                className="text-blue-mid font-medium hover:text-blue-primary transition-colors"
              >
                Register →
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setError(null); }}
                className="text-blue-mid font-medium hover:text-blue-primary transition-colors"
              >
                Sign In →
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

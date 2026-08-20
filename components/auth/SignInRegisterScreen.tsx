'use client';

import { useState } from 'react';
import { startGoogleAuth } from '@/lib/api/auth';
import { Button } from '@/components/ui/Button';

type Tab = 'signin' | 'register';

/**
 * Sign In / Register screen.
 *
 * Both tabs trigger the unified Google OAuth flow. The backend determines
 * whether the Google account is an existing user or a new user.
 */
export default function SignInRegisterScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('signin');

  const handleGoogleSignIn = () => {
    startGoogleAuth();
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
            onClick={() => setActiveTab(id)}
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

      {/* Tab panels */}
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
            ? 'Sign in to continue to the portal.'
            : 'Register to get started with your team.'}
        </p>

        <div className="space-y-5">
          <Button
            type="button"
            variant="primary"
            size="md"
            block
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 py-3"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-3.3-4.53-6.16-4.53z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </Button>
        </div>

        {/* Cross-tab prompt */}
        <p className="text-center text-sm font-body text-text-secondary mt-6">
          {activeTab === 'signin' ? (
            <>
              New here?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('register')}
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
                onClick={() => setActiveTab('signin')}
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

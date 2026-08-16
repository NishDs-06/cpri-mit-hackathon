'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from '@/lib/api/profile';
import { ApiError } from '@/lib/errors';
import { Button } from '@/components/ui/Button';
import { FloatingLabelInput } from '@/components/ui/FloatingLabelInput';

/**
 * Individual profile form — Step 2 of the registration flow.
 *
 * Collected fields: name, phone, college, college ID, GitHub URL, LinkedIn URL.
 * Floating label inputs with client-side format validation for UX;
 * the backend performs real validation and is the source of truth.
 *
 * SECURITY: No PII is persisted to localStorage or any client-side store.
 * The form submits to the backend via PATCH /api/me.
 */
export default function ProfileForm({ onComplete }: { onComplete: () => void }) {
  const { profile } = useAuth();

  const [fields, setFields] = useState({
    name:      profile?.name      ?? '',
    phone:     profile?.phone     ?? '',
    college:   profile?.college   ?? '',
    collegeId: profile?.collegeId ?? '',
    github:    profile?.github    ?? '',
    linkedin:  profile?.linkedin  ?? '',
  });

  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<typeof fields> = {};
    if (!fields.name.trim())      errs.name      = 'Full name is required.';
    if (!fields.phone.trim())     errs.phone     = 'Phone number is required.';
    if (!fields.college.trim())   errs.college   = 'College name is required.';
    if (!fields.collegeId.trim()) errs.collegeId = 'College ID is required.';
    if (fields.github && !/^https?:\/\/github\.com\/.+/.test(fields.github)) {
      errs.github = 'Enter a valid GitHub URL (e.g. https://github.com/username)';
    }
    if (fields.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(fields.linkedin)) {
      errs.linkedin = 'Enter a valid LinkedIn URL';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError(null);
    try {
      await updateProfile(fields);
      onComplete();
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message);
      } else {
        setServerError('Failed to save profile. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[520px] w-full mx-auto">
      <h3 className="font-display font-semibold text-blue-deep text-xl mb-1">
        Your Profile
      </h3>
      <p className="font-body text-text-secondary text-sm mb-8">
        Complete your details to continue to team registration.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FloatingLabelInput
          id="profile-name"
          label="Full name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={set('name')}
          error={errors.name}
          required
        />
        <FloatingLabelInput
          id="profile-phone"
          label="Phone number"
          type="tel"
          autoComplete="tel"
          value={fields.phone}
          onChange={set('phone')}
          error={errors.phone}
          required
        />
        <FloatingLabelInput
          id="profile-college"
          label="College / Institution name"
          type="text"
          value={fields.college}
          onChange={set('college')}
          error={errors.college}
          required
        />
        <FloatingLabelInput
          id="profile-college-id"
          label="College ID / Roll number"
          type="text"
          value={fields.collegeId}
          onChange={set('collegeId')}
          error={errors.collegeId}
          required
        />
        <FloatingLabelInput
          id="profile-github"
          label="GitHub profile URL"
          type="url"
          autoComplete="url"
          placeholder=" "
          value={fields.github}
          onChange={set('github')}
          error={errors.github}
        />
        <FloatingLabelInput
          id="profile-linkedin"
          label="LinkedIn profile URL"
          type="url"
          autoComplete="url"
          placeholder=" "
          value={fields.linkedin}
          onChange={set('linkedin')}
          error={errors.linkedin}
        />

        {serverError && (
          <p role="alert" className="text-sm text-red-600 font-body">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          block
          disabled={submitting}
          className="mt-2"
        >
          {submitting ? 'Saving…' : 'Save & Continue'}
        </Button>
      </form>
    </div>
  );
}

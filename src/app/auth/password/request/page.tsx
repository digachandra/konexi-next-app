'use client';

import { useState } from 'react';
import { requestPasswordReset } from '@/actions/password';
import { PasswordRequestInputSchema, PasswordRequestInput } from '@/schemas/password';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Panel } from '@/components/inputs/panel';
import { TextInput } from '@/components/inputs/text';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { PasswordSuccessFeedback, PasswordErrorFeedback } from '../_components/password-feedback';

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(PasswordRequestInputSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: PasswordRequestInput) {
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('email', values.email);

    const result = await requestPasswordReset(formData);
    if (result?.error) {
      setError(result.error.message);
    } else {
      setSuccess('If that email address is registered, a password reset link has been sent.');
      form.reset();
    }
  }

  const feedback = success ? (
    <PasswordSuccessFeedback message={success} />
  ) : error ? (
    <PasswordErrorFeedback message={error} />
  ) : null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Panel>
          <TextInput
            control={form.control}
            type="email"
            name="email"
            label="Email"
            disabled={form.formState.isSubmitting}
          />
          {feedback}
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            <Mail />
            {form.formState.isSubmitting ? 'Sending...' : 'Send Confirmation Email'}
          </Button>
        </Panel>
      </form>
    </Form>
  );
}

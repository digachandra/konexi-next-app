'use client';

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { changePasswordReset } from '@/actions/password';
import { routes } from '@/routes';
import { PasswordUpdateInputSchema, PasswordUpdateInput } from '@/schemas/password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Panel } from '@/components/inputs/panel';
import { TextInput } from '@/components/inputs/text';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { PasswordErrorFeedback } from '../_components/password-feedback';

export default function Page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PasswordUpdateInput>({
    resolver: zodResolver(PasswordUpdateInputSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: PasswordUpdateInput) {
    const formData = new FormData();
    formData.append('password', values.password);

    setError(null);
    startTransition(async () => {
      try {
        await changePasswordReset(formData);
        sessionStorage.setItem('pw-update:from', 'update');
        router.replace(routes.auth.password.updated());
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Failed to reset password';
        setError(message);
      }
    });
  }

  const disabled = isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Panel>
          <TextInput
            control={form.control}
            name="password"
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            disabled={disabled}
          />
          <TextInput
            control={form.control}
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            disabled={disabled}
          />
          {error && <PasswordErrorFeedback message={error} />}
          <Button type="submit" className="w-full" disabled={disabled}>
            {isPending ? 'Resetting…' : 'Reset Password'}
          </Button>
        </Panel>
      </form>
    </Form>
  );
}

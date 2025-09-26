'use client';

import { useState, useMemo, useEffect } from 'react';
import { signUp } from '@/actions/auth';
import { SignUpInputSchema, type SignUpInput } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Error } from '@/components/error';
import { TextInput } from '@/components/inputs/text';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { getFormData } from '@/lib/form';

export default function Page() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpInputSchema),
    defaultValues: useMemo(
      () => ({
        email: '',
        password: '',
        password_confirmation: '',
      }),
      []
    ),
    mode: 'onTouched',
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    reset({
      email: '',
      password: '',
      password_confirmation: '',
    });
  }, [reset]);

  async function handleSignUp(values: SignUpInput) {
    setError(null);

    const res = await signUp(getFormData(values));

    if (!res.success) {
      setError(res.error ?? 'Failed to create an account');
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <TextInput control={control} type="email" name="email" label="Email" />
        <TextInput control={control} type="password" name="password" label="Password" />
        <TextInput
          control={control}
          type="password"
          name="password_confirmation"
          label="Password Confirmation"
        />
        {error && <Error message={error} />}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
}

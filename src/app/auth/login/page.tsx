'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signInWithEmail } from '@/actions/auth';
import { routes } from '@/routes';
import { AuthInputSchema, AuthInput } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Error } from '@/components/error';
import { TextInput } from '@/components/inputs/text';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export default function Page() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AuthInput>({
    resolver: zodResolver(AuthInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: AuthInput) {
    setError(null);

    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    const result = await signInWithEmail(formData);
    if (result?.error) {
      setError(result.error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput control={form.control} type="email" name="email" label="Email" />
        <TextInput
          control={form.control}
          type="password"
          name="password"
          label="Password"
          labelAction={
            <Link href={routes.auth.password.request()} className="text-sm">
              Forgot your password?
            </Link>
          }
        />
        {error && <Error message={error} />}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}

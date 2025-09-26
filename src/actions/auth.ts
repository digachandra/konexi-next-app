'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { routes } from '@/routes';
import { SignUpInputSchema } from '@/schemas/auth';
import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from './types';

const INVALID_REQUEST_PAYLOAD_ERROR: ActionResponse<never> = {
  success: false,
  error: 'Invalid request payload format',
};
const INVALID_RESPONSE_PAYLOAD_ERROR: ActionResponse<never> = {
  success: false,
  error: 'Invalid response payload format',
};

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error };
  }

  revalidatePath('/', 'layout');
  redirect(routes.portal.root());
}

export async function signUp(formData: FormData): Promise<ActionResponse<unknown>> {
  const rawPayload = Object.fromEntries(formData) as Record<string, unknown>;
  const requestPayload = SignUpInputSchema.safeParse(rawPayload);

  if (requestPayload.error) {
    return INVALID_REQUEST_PAYLOAD_ERROR;
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: requestPayload.data.email || '',
    password: requestPayload.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return INVALID_RESPONSE_PAYLOAD_ERROR;
  }

  revalidatePath('/', 'layout');
  redirect(routes.portal.root());
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(routes.portal.root());
}

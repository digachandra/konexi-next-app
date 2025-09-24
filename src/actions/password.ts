'use server';

import { routes } from '@/routes';
import { createClient } from '@/lib/supabase/server';

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: [process.env.NEXT_PUBLIC_SITE_URL, routes.auth.password.reset].join(),
  });

  if (error) {
    return { error };
  }
}

export async function changePasswordReset(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get('password') as string;

  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) throw updateError;

  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) throw signOutError;
}

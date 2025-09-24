'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { routes } from '@/routes';
import { createClient } from '@/lib/supabase/server';

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

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(routes.auth.login());
}

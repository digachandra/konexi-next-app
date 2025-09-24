import { redirect } from 'next/navigation';
import { routes } from '@/routes';
import { createClient } from '@/lib/supabase/server';

export async function requireNonAuth() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    return redirect(routes.admin.root());
  }

  return null;
}

export async function requireAuth() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    return redirect(routes.auth.login());
  }

  return { data };
}

import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

export async function getSignedUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }
  return data.user ?? null;
}

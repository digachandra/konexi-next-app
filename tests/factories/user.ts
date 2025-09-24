import { supabase } from '@tests/lib/supabase/client';

async function findUserIdByEmail(email: string): Promise<string | null> {
  let page = 1;
  const perPage = 200;

  for (;;) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (match) return match.id;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

export async function deleteUser(props: { email: string }) {
  const { email } = props;

  const existingId = await findUserIdByEmail(email);
  if (existingId) {
    const { error: delErr } = await supabase.auth.admin.deleteUser(existingId);
    if (delErr) throw delErr;
  }
}

export async function createUser(props: { email: string; password: string }) {
  const { email, password } = props;

  await deleteUser({ email: email });

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) throw error;
  return data.user;
}

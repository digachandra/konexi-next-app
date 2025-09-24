import { redirect } from 'next/navigation';
import { signOut } from '@/actions/auth';
import { routes } from '@/routes';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(routes.auth.login());

  const { email } = user;

  return (
    <div className="flex flex-col gap-2 p-2">
      <span>Welcome, {email}</span>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

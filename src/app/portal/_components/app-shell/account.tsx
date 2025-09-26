import { signOut } from '@/actions/auth';
import { routes } from '@/routes';
import { IdCard, LogOut, LogIn } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SidebarSection } from './sidebar';
import { SidebarAction } from './sidebar-action';

function SignedAccount({ email }: { email: string }) {
  return (
    <SidebarSection as="actions" label={email}>
      <SidebarAction label="Profile" icon={IdCard} locked />
      <SidebarAction
        type="button"
        label="Logout"
        icon={LogOut}
        onClick={signOut}
        className="text-destructive"
      />
    </SidebarSection>
  );
}

function PublicAccount() {
  return (
    <SidebarSection as="actions" label="Account">
      <SidebarAction href={routes.auth.login()} label="Sign In" icon={LogIn} />
    </SidebarSection>
  );
}

export async function Account() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <PublicAccount />;
  }

  return <SignedAccount email={user.email || ''} />;
}

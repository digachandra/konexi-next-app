import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { signOut } from '@/actions/auth';
import { routes } from '@/routes';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/server';
import { AppShell } from './_components/app-shell';

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(routes.auth.login());

  return (
    <SidebarProvider>
      <AppShell
        sidebar={{
          footer: {
            userEmail: user.email || '#',
            onSignOut: signOut,
          },
        }}
      >
        {children}
      </AppShell>
    </SidebarProvider>
  );
}

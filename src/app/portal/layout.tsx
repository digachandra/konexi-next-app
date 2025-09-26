import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppShell } from './_components/app-shell';

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppShell>{children}</AppShell>
    </SidebarProvider>
  );
}

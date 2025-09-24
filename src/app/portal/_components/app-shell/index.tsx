import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Footer } from './footer';
import { Header } from './header';
import { Sidebar, type SidebarProps } from './sidebar';

type AppShellProps = {
  sidebar: SidebarProps;
  children: ReactNode;
};

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <Sidebar {...sidebar} />
      <div className="flex min-h-full flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-4">
          <Header className="md:hidden" />
          <main
            className="flex-1 space-y-4 rounded-t-xl border-t bg-white p-4 md:m-4 md:rounded-xl md:border"
            data-slot="app-shell-main"
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}

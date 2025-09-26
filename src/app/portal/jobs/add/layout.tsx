import { ReactNode } from 'react';
import { Header } from '@portal/header';
import { HeaderTitle } from '@portal/header/title';
import { requireAuth } from '@/lib/auth';

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  await requireAuth();

  return (
    <>
      <Header>
        <HeaderTitle text="Add New Job" withBack />
      </Header>
      {children}
    </>
  );
}

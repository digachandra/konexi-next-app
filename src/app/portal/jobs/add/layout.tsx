import { ReactNode } from 'react';
import { Header } from '@portal/header';
import { HeaderTitle } from '@portal/header/title';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <HeaderTitle text="Add New Job" withBack />
      </Header>
      {children}
    </>
  );
}

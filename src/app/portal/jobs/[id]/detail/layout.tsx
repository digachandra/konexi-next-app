import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <div className="mx-auto w-full max-w-2xl space-y-4">{children}</div>;
}

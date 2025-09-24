import { ReactNode } from 'react';
import { copyrightText } from '@/lib/copyright';

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full min-h-svh flex-col">
      <div className="flex flex-1 flex-col gap-8">{children}</div>
      <div className="p-8 text-center">
        <span className="text-xs">{copyrightText}</span>
      </div>
    </div>
  );
}

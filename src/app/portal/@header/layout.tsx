import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">{children}</div>
      <Separator />
    </div>
  );
}

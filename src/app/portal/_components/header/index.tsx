import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">{children}</div>
      <Separator />
    </div>
  );
}

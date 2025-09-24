import { ReactNode } from 'react';

type CenterProps = {
  children: ReactNode;
};

export function Center({ children }: CenterProps) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      {children}
    </div>
  );
}

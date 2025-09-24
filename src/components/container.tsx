import { ReactNode } from 'react';
import clsx from 'clsx';

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return <div className={clsx('mx-auto flex w-full flex-col px-4', className)}>{children}</div>;
}

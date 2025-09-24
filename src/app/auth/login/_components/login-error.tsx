'use client';

import { CircleX } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';

type LoginErrorProps = {
  message: string;
};

export function LoginError({ message }: LoginErrorProps) {
  return (
    <Alert variant="destructive">
      <CircleX />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

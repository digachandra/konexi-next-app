'use client';

import { CircleX } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';

type ErrorProps = {
  message: string;
};

export function Error({ message }: ErrorProps) {
  return (
    <Alert variant="destructive">
      <CircleX />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

'use client';

import { CircleX, CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type PasswordFeedbackProps = {
  message: string;
};

export function PasswordSuccessFeedback({ message }: PasswordFeedbackProps) {
  return (
    <Alert>
      <CircleAlert />
      <AlertTitle>Check your inbox</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export function PasswordErrorFeedback({ message }: PasswordFeedbackProps) {
  return (
    <Alert variant="destructive">
      <CircleX />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

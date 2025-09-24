'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const loginRoute = routes.auth.login();

export default function AuthCodeErrorPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (seconds === 0) router.replace(loginRoute);
  }, [seconds, router]);

  return (
    <>
      <div className="flex flex-col items-center space-y-2 text-center">
        <AlertTriangle className="text-destructive h-8 w-8" />
        <h2 className="text-lg font-semibold">Invalid or expired link</h2>
        <p className="text-sm">
          The link you used is invalid or has expired. Please request a new one or go back to login.
          Redirecting to the login page in {seconds}s…
        </p>
      </div>
      <Button className="w-full" onClick={() => router.replace(loginRoute)}>
        Back to login
      </Button>
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes';
import { UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isReferrerPath } from '@/lib/utils';

const UPDATE_PATH = routes.auth.password.update();
const LOGIN_PATH = routes.auth.login();
const FLAG_KEY = 'pw-update:from';
const FLAG_VAL = 'update';

export default function PasswordUpdatedPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const [canRender, setCanRender] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const fromStorage = sessionStorage.getItem(FLAG_KEY);
    if (fromStorage === FLAG_VAL) {
      sessionStorage.removeItem(FLAG_KEY);
      setCanRender(true);
      return;
    }

    if (isReferrerPath(UPDATE_PATH)) {
      setCanRender(true);
      return;
    }

    router.replace(LOGIN_PATH);
  }, [router]);

  useEffect(() => {
    if (!canRender) return;

    if (seconds <= 0) {
      router.replace(LOGIN_PATH);
      return;
    }
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [canRender, seconds, router]);

  if (!canRender) return null;

  return (
    <>
      <div className="flex flex-col items-center space-y-2 text-center">
        <UserCheck className="h-8 w-8 text-green-600" />
        <h2 className="text-lg font-semibold">Password updated</h2>
        <p className="text-sm" aria-live="polite">
          Your password has been updated and you’re now signed out. Redirecting to the login page in{' '}
          {seconds}s…
        </p>
      </div>
      <Button className="w-full" onClick={() => router.replace(LOGIN_PATH)}>
        Go to login now
      </Button>
    </>
  );
}

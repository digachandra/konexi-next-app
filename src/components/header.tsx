'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Container from './container';
import { Button } from './ui/button';

type HeaderProps = {
  title: string;
  withBack?: boolean;
};

export function Header({ title, withBack = false }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="sticky top-0 z-10">
      <Container className="bg-card space-y-4 border-b">
        <div className="flex h-12 items-center space-x-2">
          {withBack && (
            <Button
              onClick={handleBack}
              variant="ghost"
              aria-label="Go back"
              className="w-4 cursor-pointer"
            >
              <ChevronLeft className="w-5" />
            </Button>
          )}
          <h1 className="mx-auto font-bold">{title}</h1>
          {withBack && <div className="h-4 w-4" />}
        </div>
      </Container>
    </header>
  );
}

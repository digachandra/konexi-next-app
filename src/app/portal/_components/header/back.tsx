'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeaderBack() {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-7 border"
      onClick={() => router.back()}
      aria-label="Go back"
    >
      <ChevronLeft />
    </Button>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isReferrerPath(expectedPath: string): boolean {
  try {
    const referrer = document.referrer;
    if (!referrer) return false;
    const url = new URL(referrer);
    const refPath = url.pathname.replace(/\/+$/, '');
    const expPath = expectedPath.replace(/\/+$/, '');
    return refPath === expPath;
  } catch {
    return false;
  }
}

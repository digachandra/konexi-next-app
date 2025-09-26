'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export type DeletableTarget = { id: string; name?: string } | null;

export type DeleteConfirmOptions = {
  target: DeletableTarget;
  onConfirm: (target: DeletableTarget) => Promise<void> | void;
  title?: string;
  description?: string;
};

type DeleteDialogContextValue = {
  open: (opts: DeleteConfirmOptions) => void;
  isOpen: boolean;
};

const DeleteDialogContext = React.createContext<DeleteDialogContextValue | null>(null);

export function useDeleteDialog() {
  const ctx = React.useContext(DeleteDialogContext);
  if (!ctx) throw new Error('useDeleteDialog must be used within <DeleteDialogProvider>');
  return ctx;
}

type ProviderProps = { children: React.ReactNode };

const DEFAULT_TITLE = 'Delete item?';
const DEFAULT_DESCRIPTION = 'This action cannot be undone. This will permanently delete the item.';

export function DeleteDialogProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [title, setTitle] = React.useState<string>(DEFAULT_TITLE);
  const [description, setDescription] = React.useState<string>(DEFAULT_DESCRIPTION);
  const [target, setTarget] = React.useState<DeletableTarget>(null);

  const onConfirmRef = React.useRef<((t: DeletableTarget) => Promise<void> | void) | null>(null);

  const open = React.useCallback((opts: DeleteConfirmOptions) => {
    setTarget(opts.target);
    onConfirmRef.current = opts.onConfirm;
    setTitle(opts.title ?? DEFAULT_TITLE);
    setDescription(opts.description ?? DEFAULT_DESCRIPTION);
    setIsOpen(true);
  }, []);

  const handleConfirm = React.useCallback(async () => {
    const fn = onConfirmRef.current;
    if (!fn) return;
    try {
      setIsSubmitting(true);
      await fn(target);
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [target]);

  const ctxValue = React.useMemo<DeleteDialogContextValue>(
    () => ({ open, isOpen }),
    [open, isOpen]
  );

  return (
    <DeleteDialogContext.Provider value={ctxValue}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex *:flex-1">
            <AlertDialogCancel asChild>
              <Button variant="ghost" disabled={isSubmitting}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" disabled={isSubmitting} onClick={handleConfirm}>
                {isSubmitting ? 'Deleting…' : 'Yes, delete'}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DeleteDialogContext.Provider>
  );
}

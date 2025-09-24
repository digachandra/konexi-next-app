import { z } from 'zod';

export const PasswordRequestInputSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
});

export type PasswordRequestInput = z.infer<typeof PasswordRequestInputSchema>;

export const PasswordUpdateInputSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type PasswordUpdateInput = z.infer<typeof PasswordUpdateInputSchema>;

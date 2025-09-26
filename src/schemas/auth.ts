import { z } from 'zod';

export const AuthInputSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type AuthInput = z.infer<typeof AuthInputSchema>;

export const SignUpInputSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    password_confirmation: z.string().min(1, { message: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match',
  });

export type SignUpInput = z.infer<typeof SignUpInputSchema>;

/**
 * Accounts: sign-up, sign-in, sign-out, the current user, and passwords. Every call goes to the backend's
 * /auth routes and every answer is checked with Zod. Server only.
 * The form schemas here are the storefront's own check of what a visitor typed, with messages a visitor can
 * read; the backend checks again.
 */
import { cache } from 'react';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { backendFetch } from './backend';
import { apiErrorSchema } from './schemas';
import { ACCESS_COOKIE } from './session';

export const userSchema = z.looseObject({
  id: z.number().int(),
  email: z.string(),
  role: z.enum(['customer', 'admin']),
  /** The customer profile of this account; null for the admin */
  customerId: z.number().int().nullable(),
});
export type User = z.infer<typeof userSchema>;

export const sessionSchema = z.looseObject({
  accessToken: z.string().min(1),
  expiresIn: z.number().int().positive(),
  refreshToken: z.string().nullable(),
  refreshExpiresAt: z.string(),
  user: userSchema,
});
export type Session = z.infer<typeof sessionSchema>;

const okSchema = z.looseObject({ ok: z.literal(true) });

/** A refusal from the backend, with the text to show the visitor */
export class AuthError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

const GENERIC = 'Something went wrong. Please try again.';

async function post<S extends z.ZodType>(pathname: string, body: unknown, schema: S): Promise<z.infer<S>> {
  const res = await backendFetch(pathname, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = apiErrorSchema.safeParse(data);
    const m = error.success ? (error.data.message ?? error.data.error) : undefined;
    // A 4xx text is written for the visitor; anything else is not theirs to see.
    throw new AuthError(res.status < 500 && m ? (Array.isArray(m) ? m[0] : m) : GENERIC, res.status);
  }
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[backend] POST ${pathname}: the answer does not match the contract`, result.error.issues.slice(0, 5));
    throw new AuthError(GENERIC, 502);
  }
  return result.data;
}

export const auth = {
  signUp: (input: { email: string; password: string; firstName: string; lastName: string }) => post('/auth/sign-up', input, sessionSchema),
  signIn: (input: { email: string; password: string }) => post('/auth/sign-in', input, sessionSchema),
  /** Ends the session of the access token that backendFetch sends. Never throws. */
  async signOut(refreshToken?: string): Promise<void> {
    await backendFetch('/auth/sign-out', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(refreshToken ? { refreshToken } : {}),
    }).catch(() => null);
  },
  changePassword: (input: { currentPassword: string; newPassword: string }) => post('/auth/change-password', input, okSchema),
  forgotPassword: (email: string) => post('/auth/forgot-password', { email }, okSchema),
  resetPassword: (input: { token: string; password: string }) => post('/auth/reset-password', input, okSchema),
};

/**
 * The signed-in account, or null (no session, or the backend no longer accepts it). Asked once per page
 * render. Reading the cookie makes the page render per request.
 */
export const currentUser = cache(async (): Promise<User | null> => {
  if (!(await cookies()).has(ACCESS_COOKIE)) return null;
  const res = await backendFetch('/auth/me');
  if (!res.ok) return null;
  const result = userSchema.safeParse(await res.json().catch(() => null));
  return result.success ? result.data : null;
});

// ---------------------------------------------------------------- forms

const email = z
  .string()
  .trim()
  .min(1, 'Enter your email address')
  .max(254, 'That email address is too long')
  .pipe(z.email('Enter a valid email address'));
/** Same rule as the backend: 8 to 128 characters */
const newPassword = z.string().min(8, 'Use at least 8 characters for the password').max(128, 'Use at most 128 characters for the password');
const name = (label: string) => z.string().trim().min(1, `Enter your ${label}`).max(100, `That ${label} is too long`);

export const signInForm = z.object({ email, password: z.string().min(1, 'Enter your password').max(4096) });

export const signUpForm = z
  .object({ firstName: name('first name'), lastName: name('last name'), email, password: newPassword, confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: 'The two passwords are not the same', path: ['confirm'] });

export const forgotForm = z.object({ email });

export const resetForm = z
  .object({ token: z.string().min(1, 'This reset link is not complete. Ask for a new one.').max(200), password: newPassword, confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: 'The two passwords are not the same', path: ['confirm'] });

export const changePasswordForm = z
  .object({ currentPassword: z.string().min(1, 'Enter your current password').max(4096), newPassword, confirm: z.string() })
  .refine((v) => v.newPassword === v.confirm, { message: 'The two new passwords are not the same', path: ['confirm'] })
  .refine((v) => v.newPassword !== v.currentPassword, { message: 'Choose a new password that is different from the current one', path: ['newPassword'] });

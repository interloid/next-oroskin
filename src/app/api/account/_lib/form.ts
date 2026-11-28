/**
 * Shared by the account form routes (sign in, sign up, passwords). Each one is a plain HTML form post that
 * answers with a redirect, so the pages work without JavaScript:
 * - success → the next page
 * - a problem → back to the form with `?error=<text for the visitor>` (and the fields that are safe to
 *   show again, never a password)
 */
import { NextResponse } from 'next/server';
import type { z } from 'zod';
import { AuthError } from '@/lib/auth';

/** A form post must come from this site: another site cannot post these forms for a visitor. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  return !origin || origin === new URL(req.url).origin;
}

export async function formFields(req: Request): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  try {
    for (const [name, value] of (await req.formData()).entries()) if (typeof value === 'string') out[name] = value;
  } catch {
    // not a form: every field is missing
  }
  return out;
}

/** 303 to a path on this site, with query values */
export function to(req: Request, pathname: string, query: Record<string, string | undefined> = {}) {
  const url = new URL(pathname, req.url);
  for (const [k, v] of Object.entries(query)) if (v) url.searchParams.set(k, v);
  return NextResponse.redirect(url, 303);
}

/** The first message of a failed Zod check, or the backend's text for the visitor */
export function messageOf(error: unknown): string {
  if (error instanceof AuthError) return error.message;
  return 'Something went wrong. Please try again.';
}

export const firstIssue = (error: z.ZodError) => error.issues[0]?.message ?? 'Check the form and try again.';

export const forbidden = () => new NextResponse('Forbidden', { status: 403 });

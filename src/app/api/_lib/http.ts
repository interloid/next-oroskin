/** Shared helpers for the mock REST API (same error format as the NestJS backend: `{ error, message }`). */
import { NextResponse } from 'next/server';

export const json = <T>(data: T, status = 200) => NextResponse.json(data, { status });
/** Error body: the same text in `error` and `message` (the cart shims show `message`). */
export const fail = (status: number, error: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ error, message: error, ...extra }, { status });
export const notFound = (error = 'Not found') => fail(404, error);
export const badRequest = (error: string) => fail(400, error);

/** Reads a JSON body; returns null when the body is missing or not a JSON object. */
export async function readBody(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** "a,b" → ["a","b"]; empty or missing → undefined. */
export function list(v: string | null): string[] | undefined {
  const items = v
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return items?.length ? items : undefined;
}

/** Whole number >= 0 from a query param: undefined when missing, NaN when invalid. */
export function int(v: string | null): number | undefined {
  if (v == null || v === '') return undefined;
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 ? n : NaN;
}

export const isEmail = (v: unknown): v is string => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const isText = (v: unknown, max = 5000): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= max;

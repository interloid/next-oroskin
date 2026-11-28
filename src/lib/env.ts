/**
 * Environment variables, checked once with Zod. Server only (none of them is sent to the browser).
 * The storefront has no data of its own: API_URL is required. See .env.example.
 */
import { z } from 'zod';

const optional = z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? undefined : v), z.string().optional());
const seconds = (fallback: number) =>
  z.preprocess((v) => (v === '' || v == null ? fallback : Number(v)), z.number().int().min(0, 'must be 0 or more'));

const schema = z.object({
  /** Base URL of the backend, e.g. http://localhost:4000/api. A trailing slash is removed. */
  API_URL: z
    .string({ error: 'is required: the base URL of the backend, e.g. http://localhost:4000/api' })
    .trim()
    .pipe(z.url({ protocol: /^https?$/, error: 'must be an http(s) URL, e.g. http://localhost:4000/api' }))
    .transform((url) => url.replace(/\/+$/, '')),
  /** Shared key sent as x-api-key. Empty = the header is not sent. */
  API_KEY: optional,
  /** How long to wait for one backend call, in milliseconds */
  API_TIMEOUT_MS: z.preprocess((v) => (v === '' || v == null ? 8000 : Number(v)), z.number().int().positive('must be a positive number')),
  /** How long catalogue and content answers are reused before the backend is asked again. 0 = always ask. */
  CACHE_SECONDS: seconds(300),
  /** Public address of this storefront, e.g. https://shop.example.com (absolute links in share buttons) */
  SITE_URL: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    z
      .url({ protocol: /^https?$/, error: 'must be an http(s) URL, e.g. https://shop.example.com' })
      .transform((url) => url.replace(/\/+$/, ''))
      .optional(),
  ),
  /** Secret for POST /api/revalidate (the backend calls it after content changes). Empty = that route is off. */
  REVALIDATE_SECRET: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    z.string().min(16, 'must be at least 16 characters').optional(),
  ),
});

export type Env = z.infer<typeof schema>;

let parsed: Env | undefined;

/** The checked variables. Throws one readable error that names every bad variable. */
export function env(): Env {
  if (parsed) return parsed;
  const result = schema.safeParse(process.env);
  if (!result.success) {
    const lines = result.error.issues.map((i) => `  ${i.path.join('.') || '(env)'} ${i.message}`);
    throw new Error(`Invalid environment variables (see .env.example):\n${lines.join('\n')}`);
  }
  return (parsed = result.data);
}

/**
 * POST /api/revalidate: drops cached backend answers before their time is up, so a content change shows
 * at once instead of after CACHE_SECONDS. Meant to be called by the backend (or by hand) after an edit.
 *
 *   curl -X POST http://localhost:3100/api/revalidate \
 *     -H "x-revalidate-secret: $REVALIDATE_SECRET" -H "content-type: application/json" \
 *     -d '{ "tags": ["products", "page:home"] }'
 *
 * Tags: site, pages, products, collections, articles, or one item: page:<slug>, product:<handle>,
 * collection:<handle>, article:<handle> (src/lib/cache-tags.ts). Pages built from those answers are
 * rebuilt on their next visit; that visitor still gets the old page, the one after gets the new one.
 * Off (404) while REVALIDATE_SECRET is not set.
 */
import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { isKnownTag } from '@/lib/cache-tags';
import { env } from '@/lib/env';

const bodySchema = z.object({
  tags: z.array(z.string().refine(isKnownTag, { error: 'is not a known cache tag' })).min(1).max(50),
});

function sameSecret(given: string, expected: string) {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const fail = (status: number, error: string) => Response.json({ error, message: error }, { status });

export async function POST(req: Request) {
  const secret = env().REVALIDATE_SECRET;
  if (!secret) return fail(404, 'Not found');
  if (!sameSecret(req.headers.get('x-revalidate-secret') ?? '', secret)) return fail(401, 'Wrong or missing x-revalidate-secret');

  const body = bodySchema.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    const issue = body.error.issues[0];
    return fail(400, `${issue.path.join('.') || 'body'}: ${issue.message}`);
  }
  for (const tag of body.data.tags) revalidateTag(tag, 'max');
  return Response.json({ revalidated: body.data.tags });
}

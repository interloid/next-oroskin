import { db } from '@/lib/db';
import { badRequest, json, notFound } from '../../_lib/http';

export const dynamic = 'force-dynamic';

/** GET /api/pages/:slug → PageContent (an ordered list of sections). */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // The mock reads src/data/pages/<slug>.json: never let a slug leave that folder.
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(slug)) return badRequest('Invalid slug');
  const page = db.page(slug);
  return page ? json(page) : notFound(`Page "${slug}" not found`);
}

import { db } from '@/lib/db';
import { json, notFound } from '../../_lib/http';

export const dynamic = 'force-dynamic';

/** GET /api/articles/:handle → Article. */
export async function GET(_req: Request, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const article = db.article(handle);
  return article ? json(article) : notFound(`Article "${handle}" not found`);
}

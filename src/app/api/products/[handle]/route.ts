import { db } from '@/lib/db';
import { json, notFound } from '../../_lib/http';

export const dynamic = 'force-dynamic';

/** GET /api/products/:handle → Product. */
export async function GET(_req: Request, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = db.product(handle);
  return product ? json(product) : notFound(`Product "${handle}" not found`);
}

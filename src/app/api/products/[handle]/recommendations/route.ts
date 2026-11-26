import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { badRequest, int, json } from '../../../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products/:handle/recommendations?limit=4 → Product[] (same type first, never the product itself).
 * A list endpoint: an unknown handle gives [] (200), never a 404.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const limit = int(req.nextUrl.searchParams.get('limit'));
  if (Number.isNaN(limit)) return badRequest('limit must be a whole number');
  return json(db.recommendations(handle, limit || 4));
}

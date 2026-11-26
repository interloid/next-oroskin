import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { badRequest, int, json, list } from '../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products?handles=a,b&q=&limit= → Product[]
 * handles: keep the given order, unknown handles are skipped. q: text search. Both can be combined.
 */
export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = int(sp.get('limit'));
  if (Number.isNaN(limit)) return badRequest('limit must be a whole number');
  return json(db.products({ handles: list(sp.get('handles')), q: sp.get('q')?.trim() || undefined, limit: limit || undefined }));
}

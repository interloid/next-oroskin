import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { badRequest, int, json } from '../_lib/http';

export const dynamic = 'force-dynamic';

/** GET /api/articles?tag=&limit= → Article[] (tag match ignores case). */
export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = int(sp.get('limit'));
  if (Number.isNaN(limit)) return badRequest('limit must be a whole number');
  return json(db.articles({ tag: sp.get('tag')?.trim() || undefined, limit: limit || undefined }));
}

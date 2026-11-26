import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { int, json, list, notFound } from '../../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * GET /api/collections/:handle?sort=&page=&pageSize=&type=a,b&available=&minPrice=&maxPrice= → CollectionPage
 * Prices in minor units. available=true|1 keeps only products in stock (false|0|missing = all).
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const sp = req.nextUrl.searchParams;
  // Lenient on purpose: these values come straight from the visitor's URL (?page=abc, ?filter.v.price.gte=x),
  // and the mock never fails on them. Invalid page / pageSize → defaults, invalid price → no price filter.
  const whole = (v: string | null) => {
    const n = int(v);
    return n && !Number.isNaN(n) ? n : undefined;
  };
  // Prices: minor units; a decimal (e.g. 9999.000001 from 99.99 × 100) is rounded.
  const price = (v: string | null) => (v != null && v !== '' && Number(v) >= 0 ? Math.round(Number(v)) : undefined);
  const pageSize = whole(sp.get('pageSize'));
  // Sort keys use Shopify's names (the URL's sort_by is passed through). An unknown key keeps the collection order.
  const sort = sp.get('sort') || undefined;
  const available = sp.get('available');
  const result = db.collection(handle, {
    sort,
    page: whole(sp.get('page')),
    pageSize: pageSize ? Math.min(pageSize, 250) : undefined,
    type: list(sp.get('type')),
    available: available === 'true' || available === '1',
    minPrice: price(sp.get('minPrice')),
    maxPrice: price(sp.get('maxPrice')),
  });
  return result ? json(result) : notFound(`Collection "${handle}" not found`);
}

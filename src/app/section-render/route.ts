/**
 * Target of the proxy's rewrite for GET <any page>?sections=a,b (JSON map of section HTML) and
 * GET <any page>?section_id=a (that section's HTML). `__path` = the page the request was for.
 */
import type { NextRequest } from 'next/server';
import { cutSection, fetchPage } from '@/cart/sections';
import { sectionIds } from '@/cart/request';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const params = new URLSearchParams(req.nextUrl.searchParams);
  // In a rewrite, nextUrl can still be the original URL: the proxy also sends the page path as a header
  const path = req.headers.get('x-section-path') || params.get('__path') || '/';
  const sections = params.get('sections');
  const sectionId = params.get('section_id');
  for (const k of ['__path', 'sections', 'section_id']) params.delete(k);
  const query = params.toString();
  const html = await fetchPage(req, query ? `${path}?${query}` : path);

  if (sections) {
    const ids = sectionIds(sections);
    return Response.json(Object.fromEntries(ids.map((id) => [id, cutSection(html, id)])));
  }
  const one = sectionId ? cutSection(html, sectionId) : null;
  if (!one) return new Response('', { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
  return new Response(one, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

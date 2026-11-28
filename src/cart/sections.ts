/**
 * Section Rendering API shim (Shopify: `?sections=a,b` → { a: html, b: html }, `?section_id=a` → html).
 * Fetches our own page (same cookies, so the same cart) and cuts out each
 * <div id="shopify-section-<id>" class="shopify-section">…</div>. Sections must use that wrapper id
 * (the theme JS reads `.shopify-section` ids the same way). Server only.
 * The visitor's address and request id are passed on, so backend calls made while rendering that page
 * still count against the visitor and share the request id (src/lib/backend.ts).
 */
import type { NextRequest } from 'next/server';

export async function fetchPage(req: NextRequest, pathAndQuery: string) {
  const url = new URL(pathAndQuery, req.nextUrl.origin);
  const headers: Record<string, string> = { cookie: req.headers.get('cookie') ?? '', accept: 'text/html', 'x-section-render': '1' };
  for (const name of ['x-forwarded-for', 'x-real-ip', 'x-request-id']) {
    const value = req.headers.get(name);
    if (value) headers[name] = value;
  }
  const res = await fetch(url, { cache: 'no-store', headers });
  return res.text();
}

/** Outer HTML of the element whose id is `shopify-section-<id>` (or `section-<id>`), else null */
export function cutSection(html: string, id: string): string | null {
  for (const elementId of [`shopify-section-${id}`, `section-${id}`]) {
    const at = html.indexOf(`id="${elementId}"`);
    if (at < 0) continue;
    const start = html.lastIndexOf('<', at);
    const tag = /^<([a-zA-Z][\w-]*)/.exec(html.slice(start))?.[1];
    if (!tag) continue;
    // Balanced scan of the same tag name from the opening tag
    const re = new RegExp(`<(/?)${tag}(?=[\\s>/])[^>]*>`, 'g');
    re.lastIndex = start;
    let depth = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html))) {
      if (m[1]) depth--;
      else if (!m[0].endsWith('/>')) depth++;
      if (depth === 0) return html.slice(start, re.lastIndex);
    }
  }
  return null;
}

export async function renderSections(req: NextRequest, pathAndQuery: string, ids: string[]) {
  const html = await fetchPage(req, pathAndQuery);
  return Object.fromEntries(ids.map((id) => [id, cutSection(html, id)]));
}

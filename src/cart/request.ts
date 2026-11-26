/**
 * Reads a cart request the way Shopify does: JSON, multipart FormData or a urlencoded form, with
 * Rails-style names (items[][id], items[0][quantity], updates[], updates[<key>], attributes[Gift message]).
 * Also renders `sections` for the answer (Section Rendering API, see ./sections.ts). Server only.
 */
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { CART_COOKIE } from './shopify';
import { renderSections } from './sections';

export async function cartIdFrom() {
  return (await cookies()).get(CART_COOKIE)?.value ?? 'anonymous';
}

type Bag = Record<string, unknown>;

/** Parses the body into a plain object (FormData names → nested objects / arrays) */
export async function readBody(req: NextRequest): Promise<Bag> {
  const type = req.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    try {
      return ((await req.json()) ?? {}) as Bag;
    } catch {
      return {};
    }
  }
  const out: Bag = {};
  try {
    const form = await req.formData();
    for (const [name, value] of form.entries()) if (typeof value === 'string') put(out, name, value);
  } catch {
    // empty body
  }
  return out;
}

/** put(o, 'items[][id]', '5') etc. A new array entry starts when the key it sets already exists. */
function put(o: Bag, name: string, value: string) {
  const parts = name.replace(/\]/g, '').split('[');
  let target: Bag | unknown[] = o;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const last = i === parts.length - 1;
    const nextIsArray = parts[i + 1] === '';
    if (Array.isArray(target)) {
      if (part !== '') {
        // items[0][id]: arrays indexed by number
        const index = Number(part);
        if (last) target[index] = value;
        else target = (target[index] ??= nextIsArray ? [] : {}) as Bag | unknown[];
        continue;
      }
      if (last) {
        target.push(value);
        continue;
      }
      // items[][id]: reuse the last object unless it already has this key
      const key = parts[i + 1];
      let entry = target[target.length - 1] as Bag | undefined;
      if (!entry || typeof entry !== 'object' || key in entry) target.push((entry = {}));
      target = entry;
      continue;
    }
    if (last) {
      target[part] = value;
    } else {
      const isIndex = /^\d+$/.test(parts[i + 1]);
      target = (target[part] ??= nextIsArray || isIndex ? [] : {}) as Bag | unknown[];
    }
  }
}

/** sections: "a,b" or ["a","b"] → ids */
export function sectionIds(value: unknown): string[] {
  if (!value) return [];
  const list = Array.isArray(value) ? value : String(value).split(',');
  return list.map((s) => String(s).trim()).filter(Boolean).slice(0, 5);
}

/** Adds `sections` to a cart answer when the request asked for them */
export async function withSections<T extends object>(req: NextRequest, body: Bag, json: T) {
  const ids = sectionIds(body.sections);
  if (!ids.length) return json;
  const pathname = typeof body.sections_url === 'string' && body.sections_url.startsWith('/') ? body.sections_url : '/cart';
  return { ...json, sections: await renderSections(req, pathname, ids) };
}

/** Shopify's /cart/update(.js) fields applied to the cart: updates, note, attributes, discount */
import { cartStore } from '@/lib/cart-store';
import { setAttributes, setDiscounts, setNote, setQuantity } from './shopify';

export async function applyUpdate(id: string, body: Record<string, unknown>) {
  const updates = body.updates;
  if (Array.isArray(updates)) {
    // [qty, qty, ...] in the order of the cart's lines (the no-JS form's updates[])
    const keys = (await cartStore.get(id)).lines.map((l) => l.key);
    for (const [i, q] of updates.entries()) {
      if (keys[i] && q !== '' && q != null) await setQuantity(id, keys[i], Number(q));
    }
  } else if (updates && typeof updates === 'object') {
    for (const [key, q] of Object.entries(updates as Record<string, unknown>)) await setQuantity(id, key, Number(q));
  }
  if (typeof body.note === 'string') await setNote(id, body.note);
  if (body.attributes && typeof body.attributes === 'object') await setAttributes(id, body.attributes as Record<string, unknown>);
  if (typeof body.discount === 'string') await setDiscounts(id, body.discount);
}

/** `items: [{id, quantity}]` / `items[][id]`, or a single `id` + `quantity` */
export function itemsFrom(body: Record<string, unknown>) {
  if (Array.isArray(body.items)) {
    return (body.items as { id?: unknown; quantity?: unknown }[])
      .filter(Boolean)
      .map((i) => ({ id: Number(i.id), quantity: Number(i.quantity ?? 1) }));
  }
  return [{ id: Number(body.id), quantity: Number(body.quantity ?? 1) }];
}

/**
 * POST /cart/add.js (Shopify AJAX API). Body: JSON or FormData with `id` + `quantity`, or
 * `items: [{ id, quantity }]` / `items[][id]`. Answer: the added line (with `id`) or `{ items: [...] }`
 * (with `items`); each line's quantity = its total in the bag. Errors: 4xx { status, message, description }.
 */
import type { NextRequest } from 'next/server';
import { addItems, errorResponse, toShopifyLine } from '@/cart/shopify';
import { cartIdFrom, readBody, withSections } from '@/cart/request';
import { itemsFrom } from '@/cart/update';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  const items = itemsFrom(body);
  try {
    const cart = await addItems(id, items);
    const out = items.map((i) => toShopifyLine(cart.lines.find((l) => l.variantId === i.id)!));
    const json = Array.isArray(body.items) ? { items: out } : out[0];
    return Response.json(await withSections(req, body, json));
  } catch (error) {
    return errorResponse(error);
  }
}

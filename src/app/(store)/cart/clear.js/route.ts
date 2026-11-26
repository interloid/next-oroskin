/** POST /cart/clear.js: empties the cart (lines, attributes, codes) */
import type { NextRequest } from 'next/server';
import { cartJson, clearCart, errorResponse } from '@/cart/shopify';
import { cartIdFrom, readBody, withSections } from '@/cart/request';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  try {
    await clearCart(id);
    return Response.json(await withSections(req, body, await cartJson(id)));
  } catch (error) {
    return errorResponse(error);
  }
}

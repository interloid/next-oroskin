/**
 * POST /cart/update.js: `updates` ({ key or variant id: qty } or [qty, ...] in line order), `note`,
 * `attributes`, `discount` (comma list, replaces every code). Answer: the cart (+ `sections`).
 */
import type { NextRequest } from 'next/server';
import { cartIdFrom, readBody, withSections } from '@/cart/request';
import { applyUpdate } from '@/cart/update';
import { cartJson, errorResponse } from '@/cart/shopify';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  try {
    await applyUpdate(id, body);
    return Response.json(await withSections(req, body, await cartJson(id)));
  } catch (error) {
    return errorResponse(error);
  }
}

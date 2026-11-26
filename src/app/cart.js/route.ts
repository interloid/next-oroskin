/** GET /cart.js: the cart in Shopify's AJAX API format */
import { cartJson } from '@/cart/shopify';
import { cartIdFrom } from '@/cart/request';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await cartJson(await cartIdFrom()));
}

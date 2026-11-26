import { db } from '@/lib/db';
import { checkCartId } from '../../_lib/cart';
import { json } from '../../_lib/http';

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ id: string }> };

/** GET /api/cart/:id → Cart (an unknown id gives an empty cart, never a 404). */
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  return checkCartId(id) ?? json(db.cart(id));
}

/** DELETE /api/cart/:id → the empty Cart. */
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  return checkCartId(id) ?? json(db.clearCart(id));
}


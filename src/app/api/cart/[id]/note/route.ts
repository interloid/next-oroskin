import { db } from '@/lib/db';
import { checkCartId } from '../../../_lib/cart';
import { badRequest, json, readBody } from '../../../_lib/http';

export const dynamic = 'force-dynamic';

/** PUT /api/cart/:id/note  { note: string } → Cart ("" clears the note; at most 5000 characters). */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bad = checkCartId(id);
  if (bad) return bad;
  const body = await readBody(req);
  if (!body || typeof body.note !== 'string') return badRequest('Body must be JSON: { "note": string }');
  if (body.note.length > 5000) return badRequest('note is longer than 5000 characters');
  return json(db.setNote(id, body.note));
}

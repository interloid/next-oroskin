import { db } from '@/lib/db';
import { json } from '../_lib/http';

export const dynamic = 'force-dynamic';

/** GET /api/collections → Collection[]. */
export function GET() {
  return json(db.collections());
}

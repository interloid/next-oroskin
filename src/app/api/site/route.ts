import { db } from '@/lib/db';
import { json } from '../_lib/http';

export const dynamic = 'force-dynamic';

/** GET /api/site → Site (brand, menus, announcement bar, footer). */
export function GET() {
  return json(db.site());
}

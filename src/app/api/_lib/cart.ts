/** Cart id rules shared by the /api/cart routes. */
import { badRequest } from './http';

/**
 * The cart id comes from the `oro_cart` cookie (or "anonymous"). Any opaque token of 1–128 characters
 * without "/", whitespace or control characters (UUIDs, signed tokens with = or . are fine).
 */
export function checkCartId(id: string) {
  return /^[^\s/\x00-\x1f]{1,128}$/.test(id) ? null : badRequest('Invalid cart id');
}

/** Whole number in [min, max], or null. */
export function quantity(v: unknown, min: number, max = 9999): number | null {
  return typeof v === 'number' && Number.isInteger(v) && v >= min && v <= max ? v : null;
}

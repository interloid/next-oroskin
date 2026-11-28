/**
 * Request id rules shared by src/proxy.ts and src/lib/backend.ts (no imports, so it is safe in both).
 * Same pattern as the backend: anything else is replaced there, and the logs would no longer match.
 */
export const REQUEST_ID_HEADER = 'x-request-id';

const VALID = /^[\w.-]{1,128}$/;

/** The incoming id when it is well formed, else a new one */
export function requestIdFrom(incoming: string | null | undefined): string {
  return incoming && VALID.test(incoming) ? incoming : crypto.randomUUID();
}

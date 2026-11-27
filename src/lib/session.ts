/**
 * Demo sign-in (no real auth): GET /api/account/login sets this cookie and opens /account;
 * GET /api/account/logout clears it. The header reads it to show the LOGIN pill or the account icon.
 */
export const SESSION_COOKIE = 'oro_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

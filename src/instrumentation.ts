/**
 * Runs once when the server starts (Next's instrumentation hook): checks the environment variables, so a
 * missing or wrong API_URL stops the start with a readable message instead of failing on the first page.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  const { env } = await import('@/lib/env');
  env();
}

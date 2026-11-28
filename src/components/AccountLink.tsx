import { cookies } from 'next/headers';
import Icon from '@/components/Icon';
import { SIGNED_IN_COOKIE } from '@/lib/session';

function SignedIn({ when }: { when?: boolean }) {
  return (
    <a className="header__icon-button header__account-link" href="/account" aria-label="My account" data-when={when ? 'signed-in' : undefined}>
      <Icon name="account" />
    </a>
  );
}

function SignedOut({ when }: { when?: boolean }) {
  return (
    <shopify-account className="header__account" menu="customer-account-main-menu" data-when={when ? 'signed-out' : undefined}>
      <a href="/account/login" slot="signed-out-avatar" className="button header__login">
        <Icon name="account" />
        <span className="header__login-text">Login</span>
      </a>
    </shopify-account>
  );
}

/**
 * Header account control (server component).
 * - Signed out: the LOGIN pill (in Shopify's account component slot), a link to the sign-in page.
 * - Signed in: a round account icon like the search / cart buttons (Figma account screens), linking to /account.
 *
 * `visitor` true (pages rendered per request): the session cookie is read here and one of the two is rendered.
 * `visitor` false (pages generated ahead of time, shared by everybody): both are rendered, each marked with
 * `data-when`, and CSS shows the right one from the `signed-in` class that the start-up script in
 * src/app/layout.tsx puts on <html> (it reads the `oro_signed_in` cookie), so there is no flash and no request.
 */
export default async function AccountLink({ visitor = false }: { visitor?: boolean }) {
  if (!visitor) {
    return (
      <>
        <SignedIn when />
        <SignedOut when />
      </>
    );
  }
  // The flag cookie lives as long as the session (the access token itself is short-lived and refreshed).
  return (await cookies()).has(SIGNED_IN_COOKIE) ? <SignedIn /> : <SignedOut />;
}

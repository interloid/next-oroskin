import { cookies } from 'next/headers';
import Icon from '@/components/Icon';
import { SESSION_COOKIE } from '@/lib/session';

/**
 * Header account control (server component).
 * - Signed out: the LOGIN pill (in Shopify's account component slot, as before); it signs in (demo) and opens /account.
 * - Signed in: a round account icon like the search / cart buttons (Figma account screens), linking to /account.
 * Reading the cookie renders the page per request (no Cache Components in this app).
 */
export default async function AccountLink() {
  const signedIn = (await cookies()).has(SESSION_COOKIE);
  if (signedIn) {
    return (
      <a className="header__icon-button header__account-link" href="/account" aria-label="My account">
        <Icon name="account" />
      </a>
    );
  }
  return (
    <shopify-account className="header__account" menu="customer-account-main-menu">
      <a href="/api/account/login" slot="signed-out-avatar" className="button header__login">
        <Icon name="account" />
        <span className="header__login-text">Login</span>
      </a>
    </shopify-account>
  );
}

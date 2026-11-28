import PageRenderer from '@/components/PageRenderer';

/** The visitor's cart: rendered on every request, never cached. */
export default function CartPage() {
  return <PageRenderer slug="cart" path="/cart" visitor />;
}

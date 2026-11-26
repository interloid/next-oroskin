'use client';
import { useEffect, useRef } from 'react';

/**
 * Stand-in for Shopify's dynamic checkout button ("Buy it now"): Shopify's <shopify-accelerated-checkout>
 * can't run outside Shopify. Same classes as Shopify's plain button, so the theme CSS (red pill + buy icon)
 * and the sticky bar's Buy now (it clicks `.shopify-payment-button__button--unbranded`) keep working.
 * The link goes to /checkout?variant=<id>&quantity=<n>; it follows the variant chosen in the form
 * (the theme's <buy-buttons> sends "variant:change") and reads the quantity at click time.
 * Without JavaScript the link still opens checkout with the first variant.
 */
export default function BuyNowLink({ variantId, label }: { variantId: number | string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = ref.current;
    const scope = link?.closest('.shopify-section');
    if (!link || !scope) return;
    const update = () => {
      const form = link.closest('form');
      const id = (form?.querySelector('[name="id"]') as HTMLInputElement | HTMLSelectElement | null)?.value;
      const quantity = (form?.querySelector('input[name="quantity"]') as HTMLInputElement | null)?.value || '1';
      if (id) link.href = `/checkout?variant=${encodeURIComponent(id)}&quantity=${encodeURIComponent(quantity)}`;
    };
    scope.addEventListener('variant:change', update);
    scope.addEventListener('change', update);
    link.addEventListener('click', update);
    return () => {
      scope.removeEventListener('variant:change', update);
      scope.removeEventListener('change', update);
      link.removeEventListener('click', update);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={`/checkout?variant=${variantId}&quantity=1`}
      className="shopify-payment-button__button shopify-payment-button__button--unbranded"
      style={{ inlineSize: '100%', border: 0, cursor: 'pointer', textDecoration: 'none' }}
    >
      {label}
    </a>
  );
}

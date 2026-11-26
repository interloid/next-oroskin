/**
 * Price (theme: snippets/price.liquid). `priceHtml()` gives the exact theme markup as a string, used for
 * the per-variant <template data-price-for> that the theme JS (card-options) swaps in; <Price> renders the
 * same string, so the visible price and the templates can never drift apart.
 */
import { money } from "@/lib/format";
import type { Product, Variant } from "@/lib/types";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** With a variant: that variant's price. Without: the product's lowest price ("From" when prices vary). */
export function priceHtml(product: Product, variant?: Variant | null): string {
  const price = variant ? variant.price : product.price;
  const compare = variant ? variant.compareAtPrice : product.compareAtPrice;
  const available = variant ? variant.available : product.available;
  const showFrom =
    !variant && new Set(product.variants.map((v) => v.price)).size > 1;
  const onSale = compare != null && compare > price;
  const cls = `price${onSale ? " price--on-sale" : ""}${available ? "" : " price--sold-out"}`;
  const current = showFrom
    ? `From <span data-price-amount>${esc(money(price))}</span>`
    : `<span data-price-amount>${esc(money(price))}</span>`;
  return (
    `<div class="${cls}"><span class="price__current"><span class="visually-hidden">${onSale ? "Sale price" : "Regular price"} </span>${current}</span>` +
    (onSale
      ? `<span class="price__compare"><span class="visually-hidden">Regular price</span> <s>${esc(money(compare!))}</s></span>`
      : "") +
    `</div>`
  );
}

/** "Save 24%" style percentage of the old price, 0 when not on sale. */
export function savePercent(price: number, compare: number | null) {
  return compare != null && compare > price
    ? Math.round(((compare - price) * 100) / compare)
    : 0;
}

/** Renders the same markup as JSX (no wrapper element). */
export default function Price({
  product,
  variant,
}: {
  product: Product;
  variant?: Variant | null;
}) {
  const price = variant ? variant.price : product.price;
  const compare = variant ? variant.compareAtPrice : product.compareAtPrice;
  const available = variant ? variant.available : product.available;
  const showFrom =
    !variant && new Set(product.variants.map((v) => v.price)).size > 1;
  const onSale = compare != null && compare > price;
  return (
    <div
      className={`price${onSale ? " price--on-sale" : ""}${available ? "" : " price--sold-out"}`}
    >
      <span className="price__current">
        <span className="visually-hidden">
          {onSale ? "Sale price" : "Regular price"}
        </span>
        {showFrom ? "From " : null}
        <span data-price-amount="">{money(price)}</span>
      </span>
      {onSale ? (
        <span className="price__compare">
          <span className="visually-hidden">Regular price</span>
          <s>{money(compare!)}</s>
        </span>
      ) : null}
    </div>
  );
}
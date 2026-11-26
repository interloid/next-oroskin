/** The theme's price markup (snippets/price.liquid) for a whole product (no variant chosen). */
import { money } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductPrice({ product }: { product: Product }) {
  const prices = product.variants.map((v) => v.price);
  const varies =
    prices.length > 1 && Math.min(...prices) !== Math.max(...prices);
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const cls = `price${onSale ? " price--on-sale" : ""}${product.available ? "" : " price--sold-out"}`;
  return (
    <div className={cls}>
      <span className="price__current">
        <span className="visually-hidden">
          {onSale ? "Sale price " : "Regular price "}
        </span>
        {varies ? (
          <>From {money(product.price)}</>
        ) : (
          <span data-price-amount="">{money(product.price)}</span>
        )}
      </span>
      {onSale ? (
        <span className="price__compare">
          <span className="visually-hidden">Regular price</span>{" "}
          <s>{money(product.compareAtPrice!)}</s>
        </span>
      ) : null}
    </div>
  );
}

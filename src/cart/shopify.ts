/**
 * Shopify AJAX cart API shim: turns the backend's Cart (src/lib/types.ts) into the JSON Shopify's /cart.js
 * answers, which is what the theme JS expects. Used by the /cart/*.js route handlers, the cart section and
 * the demo checkout. Server only.
 * Nothing about the cart is kept in the storefront: lines, note, attributes, discount codes and their
 * amounts all live in the backend (src/lib/cart-store.ts).
 */
import { api } from '@/lib/api';
import { cartStore, CartStoreError } from '@/lib/cart-store';
import type { Cart, CartLine, Product } from '@/lib/types';

export const CART_COOKIE = 'oro_cart';

export { CartStoreError as CartError } from '@/lib/cart-store';

/** 4xx JSON in Shopify's error shape */
export function errorResponse(error: unknown) {
  const status = error instanceof CartStoreError ? error.status : 422;
  const description = error instanceof Error ? error.message : 'Cart error';
  return Response.json({ status, message: 'Cart Error', description }, { status });
}

// ---------------------------------------------------------------- mutations (through src/lib/cart-store.ts)

/** Adds each item; returns the cart after the last add */
export async function addItems(id: string, items: { id: number; quantity: number }[]) {
  let cart: Cart | null = null;
  for (const item of items) {
    if (!item.id) throw new CartStoreError('Cannot find variant', 404);
    cart = (await cartStore.add(id, item.id, Math.max(1, Math.floor(item.quantity || 1)))).cart;
  }
  return cart ?? (await cartStore.get(id));
}

/** key = a line key or a variant id (as a string). 0 removes the line. */
export async function setQuantity(id: string, key: string, quantity: number) {
  if (!key) throw new CartStoreError('Cannot find the line item', 404);
  if (!Number.isFinite(quantity)) throw new CartStoreError('Quantity must be a number', 400);
  return cartStore.setQuantity(id, key, Math.max(0, Math.floor(quantity)));
}

export const setNote = (id: string, note: string) => cartStore.setNote(id, note);

/**
 * Shopify's "discount" field: a comma list that REPLACES every code. Codes that are new are added in the
 * backend and codes that are no longer in the list are removed there.
 */
export async function setDiscounts(id: string, list: string) {
  const wanted = new Map(
    list
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => [c.toUpperCase(), c]),
  );
  const known = (await cartStore.get(id)).discountCodes.map((d) => d.code);
  for (const code of known) if (!wanted.has(code.toUpperCase())) await cartStore.removeDiscount(id, code);
  const kept = new Set(known.map((c) => c.toUpperCase()));
  for (const [upper, code] of wanted) if (!kept.has(upper)) await cartStore.addDiscount(id, code);
}

/** Shopify's "attributes" field: the given names are set, an empty value removes the name, others stay. */
export async function setAttributes(id: string, attributes: Record<string, unknown>) {
  const next = { ...(await cartStore.get(id)).attributes };
  for (const [k, v] of Object.entries(attributes ?? {})) {
    if (v === '' || v == null) delete next[k];
    else next[k] = String(v);
  }
  return cartStore.setAttributes(id, next);
}

/** Empties the cart: lines, note, attributes and discount codes */
export const clearCart = (id: string) => cartStore.clear(id);

// ---------------------------------------------------------------- Shopify JSON

export type ShopifyLine = ReturnType<typeof toShopifyLine>;
export type ShopifyCart = Awaited<ReturnType<typeof toShopifyCart>>;

/** The products of the cart's lines, by handle (a cached catalogue read) */
async function productsOf(lines: CartLine[]): Promise<Map<string, Product>> {
  const handles = [...new Set(lines.map((l) => l.productHandle))];
  const products = handles.length ? await api.products(handles) : [];
  return new Map(products.map((p) => [p.handle, p]));
}

export function toShopifyLine(line: CartLine, product?: Product) {
  const variant = product?.variants.find((v) => v.id === line.variantId);
  const onlyDefault = !product?.options.length;
  const image = line.image ?? variant?.image ?? product?.images[0]?.src ?? null;
  const optionsWithValues = (product?.options ?? []).map((o, i) => ({ name: o.name, value: variant?.options[i] ?? '' }));
  return {
    id: line.variantId,
    properties: {} as Record<string, string>,
    quantity: line.quantity,
    variant_id: line.variantId,
    key: line.key,
    title: line.variantTitle && !onlyDefault ? `${line.title} - ${line.variantTitle}` : line.title,
    price: line.price,
    original_price: line.price,
    presentment_price: line.price / 100,
    discounted_price: line.price,
    line_price: line.lineTotal,
    original_line_price: line.lineTotal,
    total_discount: 0,
    discounts: [] as unknown[],
    sku: variant?.sku ?? '',
    grams: 0,
    vendor: product?.vendor ?? '',
    taxable: true,
    product_id: product?.id ?? 0,
    product_has_only_default_variant: onlyDefault,
    gift_card: false,
    final_price: line.price,
    final_line_price: line.lineTotal,
    url: `/products/${line.productHandle}?variant=${line.variantId}`,
    featured_image: image ? { url: image, alt: product?.title ?? '', aspect_ratio: 1 } : null,
    image,
    handle: line.productHandle,
    requires_shipping: true,
    product_type: product?.type ?? '',
    product_title: line.title,
    product_description: product?.subtitle ?? '',
    variant_title: onlyDefault ? null : line.variantTitle,
    variant_options: variant?.options ?? ['Default Title'],
    options_with_values: optionsWithValues,
    line_level_discount_allocations: [] as unknown[],
    line_level_total_discount: 0,
    has_components: false,
  };
}

/** One added line in Shopify's format (the answer of /cart/add.js) */
export async function shopifyLines(lines: CartLine[]) {
  const products = await productsOf(lines);
  return lines.map((l) => toShopifyLine(l, products.get(l.productHandle)));
}

export async function toShopifyCart(cart: Cart) {
  const items = await shopifyLines(cart.lines);
  const subtotal = cart.subtotal;
  const discountCodes = cart.discountCodes.map((d) => ({ code: d.code, applicable: d.applicable && items.length > 0 }));
  const applications = cart.discountCodes
    .filter((d) => d.applicable && d.amount > 0)
    .map((d) => ({
      type: 'discount_code',
      key: d.code,
      title: d.code,
      description: '',
      value: d.percent != null ? d.percent.toFixed(1) : (d.amount / 100).toFixed(2),
      created_by_user: false,
      value_type: d.percent != null ? 'percentage' : 'fixed_amount',
      allocation_method: 'across',
      target_selection: 'all',
      target_type: 'line_item',
      total_allocated_amount: d.amount,
    }));
  const discount = Math.min(subtotal, cart.discountTotal);
  return {
    token: cart.id,
    note: cart.note ?? '',
    attributes: { ...cart.attributes },
    original_total_price: subtotal,
    total_price: cart.total ?? subtotal - discount,
    total_discount: discount,
    total_weight: 0,
    item_count: cart.itemCount,
    items,
    requires_shipping: items.length > 0,
    currency: cart.currency,
    items_subtotal_price: subtotal,
    cart_level_discount_applications: applications,
    discount_codes: discountCodes,
  };
}

export const cartJson = async (id: string) => toShopifyCart(await cartStore.get(id));

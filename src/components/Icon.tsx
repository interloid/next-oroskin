import fs from 'node:fs';
import path from 'node:path';
import parse from 'html-react-parser';

const cache = new Map<string, string>();

/**
 * Inline SVG icon from public/assets/icon-<name>.svg (the theme's icon set), with no wrapper element,
 * exactly like Shopify's `inline_asset_content`. Server component.
 *   <Icon name="truck" />   <Icon file="deco-heart.svg" />   <Icon src="icons/account-orders.svg" />
 * `src` is a path under public/ (the Figma icons in public/icons use currentColor).
 */
export default function Icon({ name, file, src }: { name?: string; file?: string; src?: string }) {
  const f = src ?? `assets/${file ?? `icon-${name}.svg`}`;
  let svg = cache.get(f);
  if (svg === undefined) {
    const p = path.join(process.cwd(), 'public', f);
    svg = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
    cache.set(f, svg);
  }
  return svg ? <>{parse(svg)}</> : null;
}

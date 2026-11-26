// Copies the real store data (prices, compare-at prices, availability, option values, images) from the
// theme preview (shopify theme dev on :9393) into src/data/products.json. Keeps our product/variant ids.
import fs from 'node:fs';
import path from 'node:path';
const file = 'src/data/products.json';
const products = JSON.parse(fs.readFileSync(file, 'utf8'));
const localImg = async (url) => {
  if (!url) return null;
  const clean = url.split('?')[0].replace(/^(https?:)?\/\/[^/]+/, '');
  const base = path.basename(clean).replace(/\.(png|jpe?g)$/i, '.webp');
  if (fs.existsSync('public/images/' + base)) return '/images/' + base;
  const out = path.join('public', clean);
  if (!fs.existsSync(out)) {
    const r = await fetch('https://oroskin-dev.myshopify.com' + clean + '?width=1400');
    if (!r.ok) return null;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
  }
  return clean;
};
let n = 0;
for (const p of products) {
  const r = await fetch(`http://127.0.0.1:9393/products/${p.handle}.js`);
  if (!r.ok) { console.log('skip', p.handle, r.status); continue; }
  const s = await r.json();
  p.title = s.title; p.type = s.type || p.type; p.vendor = s.vendor; p.tags = s.tags;
  if (s.description) p.descriptionHtml = s.description;
  p.options = s.options.filter((o) => o.name !== 'Title').map((o) => ({ name: o.name, values: o.values }));
  const imgs = [];
  for (const m of s.media ?? []) {
    if (m.media_type !== 'image') continue;
    const src = await localImg(m.src);
    if (src) imgs.push({ src, alt: m.alt || s.title, width: m.width, height: m.height });
  }
  if (imgs.length) p.images = imgs;
  p.variants = await Promise.all(s.variants.map(async (v, i) => ({
    id: p.variants[i]?.id ?? p.id * 100 + i + 1,
    sku: v.sku ?? '', title: p.options.length ? v.title : 'Default',
    options: p.options.length ? v.options : [],
    price: v.price, compareAtPrice: v.compare_at_price && v.compare_at_price > v.price ? v.compare_at_price : null,
    available: v.available, inventory: v.available ? 25 : 0,
    image: v.featured_image ? await localImg(v.featured_image.src) : null,
  })));
  p.price = Math.min(...p.variants.map((v) => v.price));
  p.compareAtPrice = p.variants.find((v) => v.compareAtPrice)?.compareAtPrice ?? null;
  p.available = p.variants.some((v) => v.available);
  n++;
}
fs.writeFileSync(file, JSON.stringify(products, null, 2));
console.log('synced', n, 'of', products.length);

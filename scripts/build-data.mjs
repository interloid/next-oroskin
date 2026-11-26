// Builds src/data/*.json (the mock backend) from the theme's demo catalogue.
import fs from 'node:fs';
const CAT = '../custom-built-new-theme-oroskin/oroskin-theme/design/catalogue/';
function parseCSV(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
const [head, ...lines] = parseCSV(fs.readFileSync(CAT + 'products.csv', 'utf8'));
const col = n => head.indexOf(n);
const img = url => url ? '/images/' + url.split('/').pop().replace(/\.(png|jpe?g)$/i, '.webp') : null;
const products = []; const byHandle = {};
for (const r of lines) {
  if (r.length < 5) continue;
  const h = r[col('Handle')]; if (!h) continue;
  let p = byHandle[h];
  if (!p) {
    const tags = r[col('Tags')].split(',').map(s => s.trim()).filter(Boolean);
    const badges = (r[col('Badges (product.metafields.custom.badges)')] || '').split(/[,;]/).map(s => s.trim()).filter(Boolean);
    p = byHandle[h] = {
      id: 1000 + products.length + 1, handle: h, title: r[col('Title')], vendor: r[col('Vendor')] || 'Oroskin',
      type: r[col('Type')], tags, subtitle: r[col('Subtitle (product.metafields.custom.subtitle)')] || '',
      descriptionHtml: r[col('Body (HTML)')], badges: badges.length ? badges : tags.includes('new') ? ['New'] : [],
      rating: { value: +(4.3 + (products.length % 7) / 10).toFixed(1), count: 12 + products.length * 7 },
      options: [], variants: [], images: [], _opt: [r[col('Option1 Name')], r[col('Option2 Name')], r[col('Option3 Name')]]
    };
    products.push(p);
  }
  const src = img(r[col('Image Src')]);
  if (src && fs.existsSync('public' + src) && !p.images.some(i => i.src === src)) p.images.push({ src, alt: r[col('Image Alt Text')] || p.title });
  const price = r[col('Variant Price')];
  if (price) {
    const vals = [1, 2, 3].map(i => r[col(`Option${i} Value`)]).filter(Boolean);
    let vimg = img(r[col('Variant Image')]); if (vimg && !fs.existsSync('public' + vimg)) vimg = null;
    p.variants.push({
      id: (p.id * 100) + p.variants.length + 1, sku: r[col('Variant SKU')], title: vals.join(' / ') || 'Default',
      options: vals, price: Math.round(+price * 100), compareAtPrice: r[col('Variant Compare At Price')] ? Math.round(+r[col('Variant Compare At Price')] * 100) : null,
      available: true, inventory: 25, image: vimg
    });
  }
}
for (const p of products) {
  p.options = p._opt.filter(n => n && n !== 'Title').map((name, i) => ({ name, values: [...new Set(p.variants.map(v => v.options[i]).filter(Boolean))] }));
  if (!p.options.length) p.variants.forEach(v => { v.options = []; v.title = 'Default'; });
  delete p._opt;
  p.price = Math.min(...p.variants.map(v => v.price));
  p.compareAtPrice = p.variants.find(v => v.compareAtPrice)?.compareAtPrice ?? null;
  p.available = p.variants.some(v => v.available);
}
// a few sale prices + one sold-out variant so the cards show every state
products[1] && (products[1].variants.forEach(v => v.compareAtPrice = Math.round(v.price * 1.25)), products[1].compareAtPrice = Math.round(products[1].price * 1.25));
products[4] && (products[4].variants.forEach(v => v.compareAtPrice = Math.round(v.price * 1.2)), products[4].compareAtPrice = Math.round(products[4].price * 1.2));
products[6] && (products[6].variants[0].available = false, products[6].variants[0].inventory = 0);
const byType = t => products.filter(p => p.type?.toLowerCase() === t).map(p => p.handle);
const collections = [
  { id: 1, handle: 'all', title: 'All products', description: 'Every Oroskin formula, in one place.', image: '/images/collection-skincare.webp', productHandles: products.map(p => p.handle) },
  { id: 2, handle: 'skincare', title: 'Skincare', description: 'Serums, creams and rituals for luminous skin.', image: '/images/collection-skincare.webp', productHandles: byType('skincare') },
  { id: 3, handle: 'fragrance', title: 'Fragrance', description: 'Scents that linger like a memory.', image: '/images/collection-fragrance.webp', productHandles: byType('fragrance') },
  { id: 4, handle: 'makeup', title: 'Makeup', description: 'Colour that lets your skin show through.', image: '/images/collection-makeup.webp', productHandles: byType('makeup') },
  { id: 5, handle: 'new-arrivals', title: 'New arrivals', description: 'Just landed.', image: '/images/collection-makeup.webp', productHandles: products.filter(p => p.tags.includes('new')).map(p => p.handle) },
];
const blog = JSON.parse(fs.readFileSync(CAT + 'blog/articles.json', 'utf8'));
const articles = blog.articles.map((a, i) => ({
  id: i + 1, handle: a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  title: a.title, author: a.author, tags: a.tags, publishedAt: a.publishDate, image: img(a.image), imageAlt: a.imageAlt,
  excerpt: a.summary, contentHtml: a.body, readingMinutes: Math.max(3, Math.round((a.body || '').split(/\s+/).length / 220)),
}));
fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync('src/data/collections.json', JSON.stringify(collections, null, 2));
fs.writeFileSync('src/data/articles.json', JSON.stringify(articles, null, 2));
console.log(products.length, 'products', collections.map(c => c.handle + ':' + c.productHandles.length).join(' '), articles.length, 'articles');
console.log(JSON.stringify(products[0], null, 1).slice(0, 1500));

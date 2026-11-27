// Collects every internal href on the main pages and lists the ones that don't answer 200/30x.
const base = process.argv[2] ?? 'http://localhost:3100';
const pages = ['/', '/products/signature-body-mist', '/collections/all', '/collections', '/cart', '/search?q=serum', '/blogs/featured',
  '/blogs/featured/the-art-of-the-golden-hour-morning-ritual', '/pages/about-us', '/pages/contact', '/pages/faq'];
const links = new Map();
for (const p of pages) {
  const html = await (await fetch(base + p)).text();
  for (const m of html.matchAll(/href="(\/[^"#]*)/g)) {
    const u = m[1].replace(/&amp;/g, '&');
    if (/^\/(_next|cdn|assets|images|fonts|theme)/.test(u)) continue;
    if (!links.has(u)) links.set(u, p);
  }
}
const bad = [];
await Promise.all([...links].map(async ([u, from]) => {
  const r = await fetch(base + u, { redirect: 'manual' });
  if (r.status >= 400) bad.push(`${r.status} ${u}   (on ${from})`);
}));
console.log(links.size, 'links,', bad.length, 'broken');
console.log(bad.sort().join('\n'));

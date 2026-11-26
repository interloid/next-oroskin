// Splits each rendered page into one HTML file per Shopify section, plus the <head> styles.
import fs from 'node:fs';
const dir = 'reference/html/';
fs.mkdirSync('reference/sections', { recursive: true });
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html'))) {
  const page = f.replace('.html', '');
  const html = fs.readFileSync(dir + f, 'utf8');
  const re = /<(div|section|header|footer|aside)[^>]*id="shopify-section-([^"]+)"/g;
  const starts = [...html.matchAll(re)].map(m => ({ i: m.index, id: m[2] }));
  starts.forEach((s, k) => {
    // a section ends where the next one starts (or at </main>/<script after the footer)
    let end = k + 1 < starts.length ? starts[k + 1].i : html.indexOf('</body>');
    const chunk = html.slice(s.i, end);
    const name = s.id.replace(/^.*__/, '').replace(/_[A-Za-z0-9]{6}$/, '');
    fs.writeFileSync(`reference/sections/${page}--${String(k).padStart(2, '0')}-${name}.html`, chunk);
  });
}
// head <style> blocks (colour schemes, css variables, font faces)
const home = fs.readFileSync(dir + 'home.html', 'utf8');
const head = home.slice(0, home.indexOf('</head>'));
fs.writeFileSync('reference/head-styles.css', [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n'));
const bodyTag = home.match(/<html[^>]*>[\s\S]*?<body[^>]*>/);
console.log(bodyTag[0].replace(/<head>[\s\S]*<\/head>/, '<head>…</head>'));

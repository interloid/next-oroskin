// Downloads every /cdn/shop/... image and /cdn/fonts/... file the reference pages use into public/, same paths.
import fs from 'node:fs';
import path from 'node:path';
const all = fs.readdirSync('reference/html').map(f => fs.readFileSync('reference/html/' + f, 'utf8')).join('\n') + fs.readFileSync('reference/head-styles.css', 'utf8');
const urls = new Set();
for (const m of all.matchAll(/(?:https?:)?(?:\/\/[a-z0-9.-]+)?(\/cdn\/(?:shop\/(?:files|products|articles|collections|t\/\d+\/assets)|fonts)\/[^"'?)\s,]+)/g)) urls.add(m[1]);
let ok = 0, fail = 0;
const list = [...urls];
await Promise.all(Array.from({ length: 8 }, async (_, w) => {
  for (let i = w; i < list.length; i += 8) {
    const u = list[i]; const out = path.join('public', decodeURIComponent(u));
    if (fs.existsSync(out)) { ok++; continue; }
    const isImg = /\/cdn\/shop\/(files|products|articles|collections)\//.test(u) && /\.(png|jpe?g|webp|gif)$/i.test(u);
    try {
      const r = await fetch('https://oroskin-dev.myshopify.com' + u + (isImg ? '?width=1800' : ''));
      if (!r.ok) throw new Error(r.status);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, Buffer.from(await r.arrayBuffer())); ok++;
    } catch (e) { fail++; console.log('fail', u, e.message); }
  }
}));
console.log(urls.size, 'urls', ok, 'ok', fail, 'fail');

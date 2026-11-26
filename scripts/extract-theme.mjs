// Copies every {% stylesheet %} and {% javascript %} out of the Shopify theme, as Shopify bundles them.
import fs from 'node:fs';
const T = '../custom-built-new-theme-oroskin/oroskin-theme/';
const tag = (name) => new RegExp(`^\\{%-?\\s*${name}\\s*-?%\\}([\\s\\S]*?)^\\{%-?\\s*end${name}\\s*-?%\\}`, 'm');
let css = '', js = '';
for (const dir of ['snippets', 'blocks', 'sections']) {
  for (const f of fs.readdirSync(T + dir).sort()) {
    const src = fs.readFileSync(T + dir + '/' + f, 'utf8');
    const s = src.match(tag('stylesheet'));
    const j = src.match(tag('javascript'));
    if (s) css += `\n/* ${dir}/${f} */\n${s[1]}`;
    if (j) js += `\n/* ${dir}/${f} */\n(() => {\n${j[1]}\n})();\n`;
  }
}
fs.writeFileSync('public/theme/sections.css', css);
fs.writeFileSync('public/theme.js', js);
fs.copyFileSync(T + 'assets/critical.css', 'public/theme/critical.css');
fs.mkdirSync('public/assets', { recursive: true });
for (const f of fs.readdirSync(T + 'assets')) if (!/\.(css|liquid)$/.test(f)) fs.copyFileSync(T + 'assets/' + f, 'public/assets/' + f);
console.log('css', css.length, 'js', js.length);

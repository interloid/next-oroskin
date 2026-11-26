import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const src = process.argv[2], dst = process.argv[3];
const files = fs.readdirSync(src).filter(f => /\.(png|jpe?g|webp)$/i.test(f));
for (const f of files) {
  const out = path.join(dst, f.replace(/\.(png|jpe?g|webp)$/i, '.webp'));
  if (fs.existsSync(out)) continue;
  await sharp(path.join(src, f)).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
}
console.log(files.length, 'done');

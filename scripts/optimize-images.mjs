// Builds responsive WebP variants for every image under public/assets/images
// and public/uploads (where the CMS saves new media), plus a manifest the
// components read to emit width/height and srcset.
//
//   public/uploads/gallery/x.jpg  ->  public/_img/uploads/gallery/x-400.webp
//                                     public/_img/uploads/gallery/x-800.webp
//                                     public/_img/uploads/gallery/x-1400.webp
//
// Outputs are cached: a variant is only regenerated when its source is newer.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, '_img');
const MANIFEST = path.join(ROOT, 'src', 'generated', 'images.json');
const SOURCES = ['assets/images', 'uploads'];
const WIDTHS = [400, 800, 1400];
const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : EXT.test(d.name) ? [p] : [];
  });
}

const previous = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const manifest = {};
let built = 0;
let failed = 0;

const files = SOURCES.flatMap((s) => walk(path.join(PUBLIC, s)));
for (const file of files) {
  const rel = path.relative(PUBLIC, file).split(path.sep).join('/');
  const key = '/' + rel;
  const base = rel.replace(EXT, '');
  const mtime = fs.statSync(file).mtimeMs;
  try {
    const cached = previous[key];
    const fresh =
      cached &&
      cached.mtime === mtime &&
      cached.variants.every((v) => fs.existsSync(path.join(PUBLIC, v.src)));
    if (fresh) {
      manifest[key] = cached;
      continue;
    }

    const meta = await sharp(file).metadata();
    const rotated = (meta.orientation ?? 1) >= 5;
    const width = rotated ? meta.height : meta.width;
    const height = rotated ? meta.width : meta.height;
    const targets = WIDTHS.filter((w) => w < width);
    if (targets.length === 0 || width < WIDTHS[WIDTHS.length - 1]) targets.push(Math.min(width, WIDTHS[WIDTHS.length - 1]));
    const unique = [...new Set(targets)].sort((a, b) => a - b);

    const variants = [];
    for (const w of unique) {
      const src = `/_img/${base}-${w}.webp`;
      const dest = path.join(PUBLIC, src);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
      variants.push({ src, w });
    }
    manifest[key] = { width, height, mtime, variants };
    built++;
  } catch (err) {
    failed++;
    console.warn(`[images] skipped ${rel}: ${err.message}`);
  }
}

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, JSON.stringify(manifest));
console.log(`[images] ${files.length} sources, ${built} rebuilt, ${failed} skipped`);

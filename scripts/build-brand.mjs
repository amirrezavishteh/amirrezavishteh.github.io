// Generates every logo/icon asset from scripts/brand/logo-source.png.
// Run after replacing the source:  node scripts/build-brand.mjs
//
// The source has an opaque white background. It is removed by flood-filling
// near-white pixels from the image border, so white highlights *inside* the
// letters survive; edge pixels get partial alpha for smooth anti-aliasing.
import fs from 'node:fs';
import sharp from 'sharp';

const SRC = 'scripts/brand/logo-source.png';
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

const minC = (p) => Math.min(data[p * 3], data[p * 3 + 1], data[p * 3 + 2]);
const isBg = (p) => minC(p) >= 232;

// 1. Flood fill the background from the border.
const bg = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const p = stack.pop();
  if (bg[p] || !isBg(p)) continue;
  bg[p] = 1;
  const x = p % W;
  if (x > 0) stack.push(p - 1);
  if (x < W - 1) stack.push(p + 1);
  if (p >= W) stack.push(p - W);
  if (p < W * (H - 1)) stack.push(p + W);
}

// 2. RGBA: background transparent; pixels touching it get alpha from how far
//    they are from white, with the white matte un-blended from their colour.
const rgba = Buffer.alloc(W * H * 4);
const nearBg = (p) => {
  const x = p % W;
  for (let dy = -2; dy <= 2; dy++)
    for (let dx = -2; dx <= 2; dx++) {
      const q = p + dy * W + dx;
      const qx = x + dx;
      if (qx >= 0 && qx < W && q >= 0 && q < W * H && bg[q]) return true;
    }
  return false;
};
for (let p = 0; p < W * H; p++) {
  let a = 1;
  if (bg[p]) a = 0;
  else if (nearBg(p)) a = Math.min(1, (255 - minC(p)) / 70);
  for (let c = 0; c < 3; c++) {
    const v = data[p * 3 + c];
    rgba[p * 4 + c] = a > 0 ? Math.max(0, Math.min(255, Math.round((v - 255 * (1 - a)) / a))) : 0;
  }
  rgba[p * 4 + 3] = Math.round(a * 255);
}
const full = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });

// Monogram = everything above the gap before the wordmark.
let gap = H;
for (let y = Math.round(H * 0.6); y < H; y++) {
  let ink = 0;
  for (let x = 0; x < W; x++) if (!bg[y * W + x]) ink++;
  if (ink === 0) { gap = y; break; }
}

const png = (img) => img.png({ compressionLevel: 9 });
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

// (two pipelines: within one, sharp would trim before extracting)
const monoRaw = await png(full.clone().extract({ left: 0, top: 0, width: W, height: gap })).toBuffer();
const monoBuf = await png(sharp(monoRaw).trim({ threshold: 1 })).toBuffer();
const fullBuf = await png(full.clone().trim({ threshold: 1 })).toBuffer();

// Square mark with a little breathing room.
const square = async (size, pad, background) => {
  const inner = await sharp(monoBuf)
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: clear })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: clear })
    .png()
    .toBuffer();
  const img = sharp(inner);
  return (background === clear ? img : img.flatten({ background })).png({ compressionLevel: 9 }).toBuffer();
};

fs.mkdirSync('public/brand', { recursive: true });
const out = {
  'public/brand/logo-mark.png': await square(256, 8, clear),
  'public/brand/logo-full.png': await sharp(fullBuf).resize({ width: 520 }).png({ compressionLevel: 9 }).toBuffer(),
  'public/favicon-16.png': await square(16, 0, clear),
  'public/favicon-32.png': await square(32, 1, clear),
  'public/apple-touch-icon.png': await square(180, 22, white),
  'public/icon-192.png': await square(192, 20, white),
  'public/icon-512.png': await square(512, 56, white),
};
for (const [file, buf] of Object.entries(out)) fs.writeFileSync(file, buf);

// favicon.ico holding PNG-encoded 16, 32 and 48px images.
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => square(s, s >= 32 ? 1 : 0, clear)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(imgs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += imgs[i].length;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...imgs]));

console.log(`[brand] source ${W}×${H}, monogram ends at y=${gap}; wrote ${Object.keys(out).length + 1} files`);

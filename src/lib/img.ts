import fs from 'node:fs';
import path from 'node:path';

interface Entry {
  width: number;
  height: number;
  variants: { src: string; w: number }[];
}

let manifest: Record<string, Entry> | null = null;

function load(): Record<string, Entry> {
  if (manifest) return manifest;
  const file = path.join(process.cwd(), 'src', 'generated', 'images.json');
  manifest = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  return manifest!;
}

export interface ResolvedImage {
  src: string;
  srcset?: string;
  width?: number;
  height?: number;
}

/** Normalises a CMS/markdown path ("assets/x.jpg", "/uploads/x.jpg") to a site-absolute one. */
export function normalize(src: string): string {
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  return '/' + decodeURI(src).replace(/^(\.\.\/|\.\/|\/)+/, '');
}

/**
 * Looks an image up in the generated manifest. `max` caps the default `src`
 * width (the browser still picks from the full srcset).
 */
export function resolveImage(src: string | undefined | null, max = 1400): ResolvedImage | null {
  if (!src) return null;
  const key = normalize(src);
  const entry = load()[key];
  if (!entry) return { src: encodeURI(key) };
  const fallback = [...entry.variants].reverse().find((v) => v.w <= max) ?? entry.variants[0];
  return {
    src: fallback.src,
    srcset: entry.variants.map((v) => `${v.src} ${v.w}w`).join(', '),
    width: entry.width,
    height: entry.height,
  };
}

export function aspect(src: string | undefined | null): number {
  const r = resolveImage(src);
  return r?.width && r?.height ? r.width / r.height : 4 / 3;
}

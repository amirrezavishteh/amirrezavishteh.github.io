import { getCollection, type CollectionEntry } from 'astro:content';
import profile from '../data/profile.json';

export const isExternal = (url = '') => /^(https?:)?\/\//.test(url) || url.startsWith('mailto:');

/** Attributes for a link: new tab for external URLs, `download` for local files. */
export function linkAttrs(url = '', opts: { download?: boolean } = {}) {
  if (isExternal(url)) return { href: url, target: '_blank', rel: 'noopener' };
  return opts.download ? { href: url, download: '' } : { href: url };
}

export const fmtDate = (d: Date, month: 'short' | 'long' = 'short') =>
  d.toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric', timeZone: 'UTC' });

export const fmtMonth = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });

export function readingTime(body = '') {
  const words = body.replace(/<[^>]+>|[#*_`>\[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');

/** Wraps the site owner's name (and common spelling variants) in a highlight. */
export function highlightAuthors(authors: string) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const variants = [profile.name, ...(profile.nameVariants ?? [])].filter(Boolean);
  return authors
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean)
    .map((a) => (variants.some((v) => v.toLowerCase() === a.toLowerCase()) ? `<strong class="me">${esc(a)}</strong>` : esc(a)))
    .join(', ');
}

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPublications() {
  const pubs = await getCollection('publications', ({ data }) => !data.draft);
  return pubs.sort((a, b) => b.data.year - a.data.year || a.data.order - b.data.order);
}

export async function getProjects() {
  const items = await getCollection('projects', ({ data }) => !data.hidden);
  return items.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getAlbums() {
  const items = await getCollection('albums', ({ data }) => !data.draft && data.images.length > 0);
  return items.sort((a, b) => a.data.order - b.data.order);
}

export const albumCover = (a: CollectionEntry<'albums'>) => a.data.cover || a.data.images[0]?.src;

/** Publication type -> filter buckets and badge. */
export function pubMeta(p: CollectionEntry<'publications'>['data']) {
  const pending = p.status !== 'Published' || p.type === 'Preprint';
  const cats: string[] = [];
  if (p.type === 'Journal article') cats.push('Journal');
  if (['Conference paper', 'Workshop paper'].includes(p.type)) cats.push('Conference');
  if (pending) cats.push('Under review / preprint');
  if (!cats.length) cats.push('Other');
  const badge = pending
    ? { cls: 'badge-review', label: p.status === 'Published' ? 'Preprint' : p.status }
    : p.type === 'Journal article'
      ? { cls: 'badge-journal', label: 'Journal' }
      : p.type === 'Workshop paper'
        ? { cls: 'badge-conf', label: 'Workshop' }
        : p.type === 'Conference paper'
          ? { cls: 'badge-conf', label: 'Conference' }
          : { cls: '', label: p.type };
  return { cats, badge };
}

/** GitHub's language colours for the handful of languages used here. */
export const LANG_COLORS: Record<string, string> = {
  Python: '#3572a5',
  'Jupyter Notebook': '#da5b0b',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Kotlin: '#a97bff',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  VHDL: '#adb2cb',
};

// Live star counts, fetched once per build. Any failure (offline, rate limit)
// silently falls back to the `stars` value stored with each project.
const cache = new Map<string, Promise<number | null>>();

export function repoSlug(url?: string) {
  const m = url?.match(/github\.com\/([^/]+\/[^/#?]+)/i);
  return m ? m[1].replace(/\.git$/, '') : null;
}

export function getStars(repoUrl?: string): Promise<number | null> {
  const slug = repoSlug(repoUrl);
  if (!slug) return Promise.resolve(null);
  if (!cache.has(slug)) {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'site-build' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    cache.set(
      slug,
      fetch(`https://api.github.com/repos/${slug}`, { headers, signal: AbortSignal.timeout(6000) })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => (typeof j?.stargazers_count === 'number' ? j.stargazers_count : null))
        .catch(() => null),
    );
  }
  return cache.get(slug)!;
}

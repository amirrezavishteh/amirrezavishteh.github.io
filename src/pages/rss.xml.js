import rss from '@astrojs/rss';
import profile from '../data/profile.json';
import { getPosts } from '../lib/utils';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: `${profile.name} — Blog`,
    description: `Research write-ups by ${profile.name} on AI safety, LLM security, and NLP.`,
    site: context.site,
    stylesheet: '/rss.xsl',
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      categories: p.data.tags,
      link: `/blog/${p.id}/`,
    })),
  });
}

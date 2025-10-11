import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import getSortedPosts from '@utils/getSortedPosts';
import { SITE, LOCALE } from '@config';

const extractDescription = (body?: string) => {
  if (!body) return '';

  const plainLines = body
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length && !line.startsWith('<!--'));

  const summary = plainLines.slice(0, 2).join(' ');

  return summary
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // strip images
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1') // strip links, keep text
    .replace(/[`*_>#~]/g, '') // strip basic markdown symbols
    .replace(/\s+/g, ' ')
    .trim();
};

export async function GET() {
  const posts = await getCollection('blog');
  const sortedPosts = getSortedPosts(posts);
  const items = await Promise.all(
    sortedPosts.map(async post => {
      const { data, slug } = post;
      const rendered = await render(post);
      const html =
        typeof rendered === 'string'
          ? rendered
          : ((rendered as any).html ?? '');
      const updated =
        data.modDatetime && data.modDatetime !== data.pubDatetime
          ? new Date(data.modDatetime)
          : null;

      const description =
        data.description || extractDescription(post.body) || SITE.desc;

      return {
        link: `blog/${slug}/`,
        title: data.title,
        description,
        pubDate: new Date(data.pubDatetime),
        categories: data.tags ?? [],
        content: html,
        customData: updated
          ? `<atom:updated>${updated.toISOString()}</atom:updated>`
          : undefined
      };
    })
  );

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/'
    },
    customData: [
      LOCALE.lang ? `<language>${LOCALE.lang}</language>` : '',
      `<atom:link href="${new URL('/rss.xml', SITE.website).href}" rel="self" type="application/rss+xml" />`
    ]
      .filter(Boolean)
      .join('')
  });
}

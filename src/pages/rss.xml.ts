import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import getSortedPosts from '@utils/getSortedPosts';
import { postDescription } from '@utils/postDescription';
import { SITE, LOCALE } from '@config';

export async function GET() {
  const posts = await getCollection('blog');
  const sortedPosts = getSortedPosts(posts);
  const items = await Promise.all(
    sortedPosts.map(async post => {
      const { data, id } = post;
      const rendered = await render(post);
      const html =
        typeof rendered === 'string'
          ? rendered
          : ((rendered as any).html ?? '');
      const updated =
        data.modDatetime && data.modDatetime !== data.pubDatetime
          ? new Date(data.modDatetime)
          : null;

      return {
        link: `blog/${id}/`,
        title: data.title,
        description: postDescription(post) || SITE.desc,
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

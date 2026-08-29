import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, SOCIALS } from '@config';
import getSortedPosts from '@utils/getSortedPosts';

const absolute = (path: string) => new URL(path, SITE.website).href;

const postLine = (post: CollectionEntry<'blog'>) => {
  const link = `- [${post.data.title}](${absolute(`/blog/${post.id}.md`)})`;
  const description = post.data.description.trim();
  return description ? `${link}: ${description}` : link;
};

const pages = [
  ['About', '/about/'],
  ['Now', '/now/'],
  ['AI', '/ai/'],
  ['Projects', '/projects/']
];

const socials = SOCIALS.filter(
  social => social.active && !social.href.startsWith('mailto:')
);

export const GET: APIRoute = async () => {
  const posts = getSortedPosts(await getCollection('blog'));
  const body = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.desc}`,
    '',
    '## Posts',
    '',
    ...posts.map(postLine),
    '',
    '## Pages',
    '',
    ...pages.map(([name, path]) => `- [${name}](${absolute(path)})`),
    '',
    '## Links',
    '',
    ...socials.map(social => `- [${social.name}](${social.href})`),
    ''
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};

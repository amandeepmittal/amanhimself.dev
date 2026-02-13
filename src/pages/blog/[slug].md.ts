import type { APIRoute } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';
import postFilter from '@utils/postFilter';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.filter(postFilter).map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> };
  const { title, description, pubDatetime, tags } = post.data;

  const lines = [
    `# ${title}`,
    '',
    description ? `> ${description}` : null,
    description ? '' : null,
    `Published: ${pubDatetime.toISOString().split('T')[0]}`,
    tags.length ? `Tags: ${tags.join(', ')}` : null,
    '',
    '---',
    '',
    post.body,
  ].filter((line): line is string => line !== null);

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

import { slugifyStr } from './slugify';
import type { CollectionEntry } from 'astro:content';
import postFilter from './postFilter';

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueTags = (
  posts: CollectionEntry<'blog'>[],
  filter: (post: CollectionEntry<'blog'>) => boolean = postFilter
) => {
  const tagsMap = new Map<string, Tag>();

  posts
    .filter(filter)
    .forEach(post => {
      post.data.tags.forEach(tagName => {
        const tag = slugifyStr(tagName);
        const current = tagsMap.get(tag);
        if (current) {
          current.count += 1;
        } else {
          tagsMap.set(tag, { tag, tagName, count: 1 });
        }
      });
    });

  return Array.from(tagsMap.values()).sort((a, b) =>
    a.tag.localeCompare(b.tag)
  );
};

export default getUniqueTags;

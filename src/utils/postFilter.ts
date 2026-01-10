import { SITE } from '@config';
import type { CollectionEntry } from 'astro:content';

const publishedPostFilter = ({ data }: CollectionEntry<'blog'>) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  return !data.draft && isPublishTimePassed;
};

const postFilter = (post: CollectionEntry<'blog'>) => {
  if (import.meta.env.DEV) return true;
  return publishedPostFilter(post);
};

export { publishedPostFilter };
export default postFilter;

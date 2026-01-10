import { SITE } from '@config';
import type { CollectionEntry } from 'astro:content';

const postFilter = ({ data }: CollectionEntry<'blog'>) => {
  if (import.meta.env.DEV) return true;

  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  return !data.draft && isPublishTimePassed;
};

export default postFilter;

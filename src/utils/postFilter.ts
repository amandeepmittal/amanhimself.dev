import { SITE } from '@config';
import type { PostListItem } from '../types';

const publishedPostFilter = ({ data }: PostListItem) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  return !data.draft && isPublishTimePassed;
};

const postFilter = (post: PostListItem) => {
  if (import.meta.env.DEV) return true;
  return publishedPostFilter(post);
};

export { publishedPostFilter };
export default postFilter;

import type { CollectionEntry } from 'astro:content';
import type { PostListItem } from '../types';
import postFilter from './postFilter';

const recency = ({ data }: PostListItem) =>
  new Date(data.modDatetime ?? data.pubDatetime).getTime();

export const sortByRecency = <T extends PostListItem>(items: T[]) =>
  [...items].sort((a, b) => recency(b) - recency(a));

const getSortedPosts = (posts: CollectionEntry<'blog'>[]) =>
  sortByRecency(posts.filter(postFilter));

export default getSortedPosts;

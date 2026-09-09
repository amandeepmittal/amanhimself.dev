import type { CollectionEntry } from 'astro:content';
import externalPosts from '@data/externalPosts';
import type { PostListItem } from '../types';
import { sortByRecency } from './getSortedPosts';
import postFilter from './postFilter';

const getBlogListPosts = (posts: CollectionEntry<'blog'>[]): PostListItem[] =>
  sortByRecency([...posts, ...externalPosts].filter(postFilter));

export default getBlogListPosts;

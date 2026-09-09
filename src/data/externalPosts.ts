import { SITE } from '@config';
import type { PostListItem } from '../types';

type ExternalPostInput = {
  title: string;
  url: string;
  source: string;
  pubDatetime: string;
  description?: string;
};

const lastPathSegment = (url: string) =>
  new URL(url).pathname.split('/').filter(Boolean).pop() ?? '';

const entries: ExternalPostInput[] = [
  {
    title: '12 AEO practices to make your documentation AI-ready',
    url: 'https://expo.dev/blog/aeo-practices-to-make-your-documentation-ai-ready',
    source: 'expo.dev',
    pubDatetime: '2026-09-03T15:45:01.171Z'
  }
];

const externalPosts: PostListItem[] = entries.map(entry => ({
  id: lastPathSegment(entry.url),
  data: {
    title: entry.title,
    author: SITE.author,
    pubDatetime: new Date(entry.pubDatetime),
    description: entry.description ?? '',
    tags: [],
    externalUrl: entry.url,
    externalSource: entry.source
  }
}));

export default externalPosts;

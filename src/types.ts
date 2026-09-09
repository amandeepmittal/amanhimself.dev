import type { CollectionEntry } from 'astro:content';
import type socialIcons from '@assets/socialIcons';

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type PostFrontmatter = CollectionEntry<'blog'>['data'] & {
  externalUrl?: string;
  externalSource?: string;
};

export type PostListItem = {
  id: string;
  data: PostFrontmatter;
};

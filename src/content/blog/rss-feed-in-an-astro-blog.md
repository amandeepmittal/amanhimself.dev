---
title: 'RSS feed in an Astro blog'
author: Aman Mittal
pubDatetime: 2025-10-12T00:00:01Z
slug: rss-feed-in-an-astro-blog
featured: false
draft: false
tags:
  - blogging
  - astro
description: ''
---

One of the easiest ways to follow a site without being tracked or throttled by an Algorithm, with no login walls, is having content delivered to a reader app of your choice. This is why so many personal blogs opt to include an RSS feed.

This post is just a quick guide about the implementation of RSS feed for my blog &mdash; [amanhimself.dev](https://amanhimself.dev).

## The core RSS setup

This blog you are reading right now is built using [Astro](https://astro.build). Astro is a static site builder that allows you to build your blog with ease. At least, now I have to pay [less attention](/blog/old-blog-new-tech/) to maintaining it than writing.

Astro provides a plugin called `@astro/rss` to build RSS feeds. It exports an `rss()` method that takes your site's metadata (such as title, description, post URL, and so on), an array of entries, handles boilerplate logic, and returns the XML string that you can use to serve on a path like `/rss.xml`.

The recommended approach from `@astro/rss` is to create a separate file called `rss.xml.ts` in the `src/pages` directory. This file will export a `GET` function that will be used by Astro to build the RSS feed.

Here's how the `rss.xml.ts` file looks in my blog:

```ts
import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import getSortedPosts from '@utils/getSortedPosts';
import { SITE, LOCALE } from '@config';

const extractDescription = (body?: string) => {
  if (!body) return '';

  const plainLines = body
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length && !line.startsWith('<!--'));

  const summary = plainLines.slice(0, 2).join(' ');

  return summary
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // strip images
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1') // strip links, keep text
    .replace(/[`*_>#~]/g, '') // strip basic markdown symbols
    .replace(/\s+/g, ' ')
    .trim();
};

export async function GET() {
  const posts = await getCollection('blog');
  const sortedPosts = getSortedPosts(posts);
  const items = await Promise.all(
    sortedPosts.map(async post => {
      const { data, slug } = post;
      const rendered = await render(post);
      const html =
        typeof rendered === 'string'
          ? rendered
          : ((rendered as any).html ?? '');
      const updated =
        data.modDatetime && data.modDatetime !== data.pubDatetime
          ? new Date(data.modDatetime)
          : null;

      const description =
        data.description || extractDescription(post.body) || SITE.desc;

      return {
        link: `blog/${slug}/`,
        title: data.title,
        description,
        pubDate: new Date(data.pubDatetime),
        categories: data.tags ?? [],
        content: html,
        customData: updated
          ? `<atom:updated>${updated.toISOString()}</atom:updated>`
          : undefined
      };
    })
  );

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/'
    },
    customData: [
      LOCALE.lang ? `<language>${LOCALE.lang}</language>` : '',
      `<atom:link href="${new URL('/rss.xml', SITE.website).href}" rel="self" type="application/rss+xml" />`
    ]
      .filter(Boolean)
      .join('')
  });
}
```

Let's break down the code in this file to understand the important elements. First, `getCollection('blog')` loads every Markdown file entry from `src/content/blog` directory (latter is the directory where all the blog's content is stored in `.md` files).

```ts
const posts = await getCollection('blog');
```

Then, `getSortedPosts` sorts the posts by their publication date and hides any draft posts.

```ts
const sortedPosts = getSortedPosts(posts);
const items = await Promise.all(
  sortedPosts.map(async post => {
    const { data, slug } = post;
    // ...
  })
);
```

The `getSortedPosts` is a utility function that is used in other places in my blog. It filters the posts by their publication date:

```ts
import type { CollectionEntry } from 'astro:content';
import postFilter from './postFilter';

const getSortedPosts = (posts: CollectionEntry<'blog'>[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedPosts;
```

The `render(post)` function renders the post's content into HTML so I can embed full articles in the feed.

```ts
const rendered = await render(post);
const html =
  typeof rendered === 'string' ? rendered : ((rendered as any).html ?? '');
```

The `extractDescription` is a unique case in my blog because not all posts have a description in the frontmatter. So, I decided to extract the first two lines from the Markdown files into the `extractDescription` function so that these two lines can act as a fair description of the post within the `rss.xml` content. If the `description` is present for a post, it will be used instead of the `extractedDescription`.

```ts
const extractDescription = (body?: string) => {
  if (!body) return '';

  const plainLines = body
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length && !line.startsWith('<!--'));

  const summary = plainLines.slice(0, 2).join(' ');

  return summary
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Strip images
    .replace(/\[(.*?)\]\([^)]*\)/g, '$1') // Strip links, keep text
    .replace(/[`*_>#~]/g, '') // Strip basic markdown symbols
    .replace(/\s+/g, ' ')
    .trim();
};

export async function GET() {
  // ...
  const description =
    data.description || extractDescription(post.body) || SITE.desc;
  // ...
}
```

The feed also declares both Atom and content module namespaces using `<atom:link>` and `<content:encoded>` tags.

## Wrap-up

Astro's `@astro/rss` plugin is really helpful for building RSS feeds for my blog, without over-complicating the setup. The result of this setup is a rich feed at [`https://amanhimself.dev/rss.xml`](https://amanhimself.dev/rss.xml).

You can find the full code for this setup in my blog's [RSS feed file](https://github.com/amandeepmittal/amanhimself.dev/blob/master/src/pages/rss.xml.ts).

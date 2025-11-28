---
title: How to add a recent posts section to your Astro blog
author: Aman Mittal
pubDatetime: 2025-11-28T00:00:01Z
slug: add-recents-posts-astro-section
featured: false
draft: false
tags:
  - blogging
description: ''
---

Recent posts are a light-weight way to keep readers engaged through your blog's content. Recently, I decided to add this section at the end of each post without using any external service like an analytics service.

Instead, I decided to use tags, which are already present in each blog post's frontmatter and use them to show the most recent posts. I've used tags since the beginning of my blog and I've also written a [post about how I manage tags without getting overwhelmed](/blog/tag-gardening/) by their amount.

Let's dive into the implementation.

## Establish the criteria for recent posts

The beauty of Astro as a template engine is that you can create a reusable component that can be used in multiple pages. Astro components are defined using `.astro` files and work in a similar way to React, Vue, and more modern JavaScript frameworks.

Drop a component file where you keep your Astro components. In my blog's case, I keep them in `src/components/` directory. This component will be used to calculate recent posts based on the following factors:

- Filters out any draft posts. Posts with `draft: true` in the frontmatter
- Filters out current post. The post that the reader is currently viewing
- Filters out any post that is older than 12 months. You can skip it but I want to avoid showing outdated posts
- Each recent post must match at least one shared tag (case-insensitive)
- Show up to three most recent posts

## Start implementing the reusable component

Let's start by creating a component file called `RecentPosts.astro`. This component requires three props:

- `currentSlug`: The slug of the current post
- `currentTags`: The tags listed in the frontmatter of the current post
- `posts`: An array of all blog posts from the content collection

These props can be extracted from `Astro.props` object:

```js
---
import type { CollectionEntry } from 'astro:content';
import { LOCALE } from '@config';

export interface Props {
  currentSlug: string;
  currentTags: string[];
  posts: CollectionEntry<'blog'>[];
}

const { currentSlug, currentTags = [], posts = [] } = Astro.props;
```

Now, you need to set a variable that holds the value of the cutoff date to one year ago. It creates a new Date object for the current date and then subtracts one year from it. This will help you filter out any posts that are older than one year.

```js
const cutoff = new Date();
cutoff.setFullYear(cutoff.getFullYear() - 1);
```

Next, create a normalized set of tags which are lowercased and whitespace-trimmed for consistent matching. For example, "react native" matches "react-native".

```js
const tagSet = new Set(
  currentTags.map(tag => String(tag).toLowerCase().trim()).filter(Boolean)
);
```

Then, create a locale-aware date frontmatter so you can show the date of each post listed in the recent posts section:

```js
const formatter = new Intl.DateTimeFormat(LOCALE.langTag, {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});
```

## Create a function to filter eligible posts

You need to now create a function that satisfies the criteria defined in the previous section. This function will be used to filter out any posts that do not meet the criteria.

Add a `recentPool` function that excludes posts with missing data, current post, drafts, excludes posts with invalid dates, excludes posts older than the cutoff date, normalizes the post's tags, and include only posts that share at least one tag with the current post:

```js
const recentPool = posts.filter(({ slug, data }) => {
  if (!data || slug === currentSlug) return false;
  if (data.draft) return false;

  const published = new Date(data.pubDatetime);
  if (Number.isNaN(published.getTime())) return false;
  if (published < cutoff) return false;

  const postTags = (data.tags ?? [])
    .map(tag => String(tag).toLowerCase().trim())
    .filter(Boolean);

  return postTags.some(tag => tagSet.has(tag));
});
```

Sort the filtered list by publish date (newest first) and keep the first three results:

```js
const recentPosts = recentPool
  .sort(
    (a, b) =>
      new Date(b.data.pubDatetime).getTime() -
      new Date(a.data.pubDatetime).getTime()
  )
  .slice(0, 3);
```

## Render the recent posts section

Now, you can define the `recentPosts` component to display the recent posts:

```js
{recentPosts.length > 0 && (
  <section class="recent-posts" aria-labelledby="recent-posts-title">
    <h2 id="recent-posts-title" class="recent-title" data-no-anchor="true">
      Recent posts
    </h2>
    <ul>
      {recentPosts.map(({ slug, data }) => {
        const published = new Date(data.pubDatetime);
        return (
          <li>
            <a href={`/blog/${slug}/`}>{data.title}</a>
            <span class="recent-date">{formatter.format(published)}</span>
          </li>
        );
      })}
    </ul>
  </section>
)}

<style>
  .recent-posts {
    @apply mt-10 border-t border-skin-line pt-6;
  }

  .recent-title {
    @apply mb-4 text-xl font-semibold italic text-skin-base;
  }

  .recent-posts ul {
    @apply flex flex-col gap-3;
  }

  .recent-posts li {
    @apply flex items-baseline justify-between gap-3;
  }

  .recent-posts a {
    @apply font-medium text-skin-accent hover:underline;
  }

  .recent-date {
    @apply whitespace-nowrap text-xs text-skin-base/70;
  }
</style>
```

Include the `RecentPosts` component in the current post's layout file. For example, I define a blog post layout file called `src/layouts/PostDetails.astro`:

```js
---
import RecentPosts from '@components/RecentPosts.astro';
// other imports
const { post, posts } = Astro.props;
const { tags } = post.data;
---

<article>
  <Content />
</article>

<RecentPosts currentSlug={post.slug} currentTags={tags} posts={posts} />
```

## Wrap up

That's it! You now have a tag-based recent posts section that works entirely at build-time—no external services, no client-side JavaScript, and no analytics required. Just by leveraging Astro's content collections and the tags you're already using in your blog.

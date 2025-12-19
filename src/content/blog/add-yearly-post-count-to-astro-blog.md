---
title: Add a yearly post-count visual to your Astro blog
author: Aman Mittal
pubDatetime: 2025-12-19T00:00:01Z
slug: add-yearly-post-count-to-astro-blog
featured: false
draft: false
tags:
  - blogging
description: A quick walkthrough to build a yearly post-count bar chart in Astro using your existing blog content collection.
---

I recently came across the [grepjason.sh](https://grepjason.sh/) blog through [App defaults](https://defaults.rknight.me/). One page on their blog that caught my eye was a year-by-year post count breakdown chart: [https://grepjason.sh/postcount](https://grepjason.sh/postcount).

Inspired by this, I thought it would be cool to add a similar visualization to my blog and actually see how many posts I've written each year.

## Prerequisites

- An Astro blog with a content collection in `src/content/blog/`
- Posts with a `pubDatetime` field in frontmatter
- A `postFilter` utility that handles draft and scheduling logic

## Defining goals for the visualization

Let's start by defining the goals for implementing this visualization:

- Create a page that runs entirely on the server during static site generation and, once built, serves plain HTML/CSS
- Read the content collection and filter posts
- Emit HTML and corresponding styles with no JavaScript required

## Fetch posts and filter them

Start by creating a new page in `src/pages/post-count.astro` and add the following import statements that import required dependencies:

```js
---
import { getCollection } from 'astro:content';
import Footer from '@components/Footer.astro';
import Header from '@components/Header.astro';
import { SITE } from '@config';
import Layout from '@layouts/Layout.astro';
import Main from '@layouts/Main.astro';
import postFilter from '@utils/postFilter';
```

The `getCollection` function allows you to fetch all posts from the content collection. The `postFilter` is a utility that handles excluding draft and scheduled posts. Once filtered, store the total post count in a variable so that you can display it at the top of the page.

```js
const posts = (await getCollection('blog')).filter(postFilter);
const totalPosts = posts.length;
```

## Count posts by year

To count the number of posts by year, you can use the `reduce` method to iterate over the posts and count the number of posts for each year.

```js
const counts = posts.reduce<Record<number, number>>((acc, post) => {
  const year = new Date(post.data.pubDatetime).getFullYear();
  acc[year] = (acc[year] ?? 0) + 1;
  return acc;
}, {});
```

The `reduce` method transforms the posts array into an object that maps years to post counts. For each post:

- Extract the year from `pubDatetime` using `getFullYear()`
- Increment that year's count (or initialize it to 1 if it doesn't exist)

The result is an object like:

```js
{
  2023: 15,
  2024: 42,
  2025: 8
}
```

## Sort by year and prepare data

The next step is to sort the years in descending order and prepare the data for the visualization. The `counts` object is converted into an array of objects with `year` and `count` properties, and then sorted by year in descending order. The `maxCount` is the maximum count of posts in any year, and the `palette` is a list of colors to use for the visualization.

```js
const yearly = Object.entries(counts)
  .map(([year, count]) => ({ year: Number(year), count }))
  .sort((a, b) => b.year - a.year);

const maxCount = yearly.length
  ? Math.max(...yearly.map(item => item.count))
  : 0;

// You can define your own color palette here.
const palette = [
  '#78DCE8',
  '#A9DC76',
  '#FFC801',
  '#FC9867',
  '#AB9DF2',
  '#FF6188',
  '#A1C9F1',
  '#F585CE'
];
```

## Calculate bar widths and assign colors

The `bars` array is created by mapping over the `yearly` array and calculating the proportional width of each bar based on the maximum count of posts in a year. The `width` is calculated by multiplying the proportional width by 100, and then taking the maximum of 18 and the result. The `color` is assigned from the `palette` array using the index modulo the length of the palette array.

```js
const bars = yearly.map((entry, idx) => {
  const proportionalWidth = maxCount ? (entry.count / maxCount) * 100 : 0;
  return {
    ...entry,
    width: Math.max(18, proportionalWidth),
    color: palette[idx % palette.length]
  };
});
---
```

Here is an example calculation to help you understand how the widths are calculated:

```text
**Example calculation:**
If your data is:
- 2025: 8 posts
- 2024: 42 posts (maxCount)
- 2023: 15 posts

The widths would be:
- 2025: `(8/42) * 100 = 19%`
- 2024: `(42/42) * 100 = 100%`
- 2023: `(15/42) * 100 = 35.7%`
```

### Why `Math.max(18, proportionalWidth)`?

This ensures even years with few posts have a visible bar. Without this minimum, a year with just 1 post might render at only 2% width (nearly invisible).

## Create the page structure

The page structure is straightforward. The page layout is a simple container with a header, a main content area, and a footer. The main content area contains the visualization and the total post count.

```html
<Layout title="{`Post" counts | ${SITE.title}`}>
  <header />
  <main
    pageTitle="Post counts"
    pageDesc="{`Currently"
    ${totalPosts}
    published
    posts
    grouped
    by
    year.`}
  >
    <section class="chart">
      <p class="total">Total posts: {totalPosts}</p>
      <ul class="bar-list">
        {bars.map(bar => (
        <li class="bar-row">
          <span class="year">{bar.year}</span>
          <div class="bar-track">
            <div class="bar" style="{`width:${bar.width}%`}">
              <span class="bar-fill" style="{`background:${bar.color}`}"></span>
              <span class="count">{bar.count}</span>
            </div>
          </div>
        </li>
        ))}
      </ul>
    </section>
  </main>
  <footer />
</Layout>

<style>
  .chart {
    padding: 24px;
  }
  .total {
    font-size: 1.5rem;
    font-weight: 700;
    color: #c084fc;
    margin-bottom: 12px;
  }
  .bar-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .year {
    width: 52px;
    text-align: right;
    font-weight: 700;
  }
  .bar-track {
    flex: 1;
  }
  .bar {
    position: relative;
    height: 36px;
    overflow: hidden;
    max-width: 100%;
    background: rgba(var(--color-fill), 0.8);
    border: 1px solid rgba(var(--color-text-base), 0.15);
  }
  .bar-fill {
    position: absolute;
    inset: 0;
  }
  .count {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 700;
    color: #0f172a;
  }

  @media (max-width: 640px) {
    .chart {
      padding: 18px;
    }
    .bar {
      height: 32px;
    }
    .year {
      width: 42px;
      font-size: 0.95rem;
    }
  }
</style>
```

## Wrap up

Now you will have a living snapshot of your publishing cadence. It provides an at-a-glance insight into your yearly writing habits. You can use this as a starting point to create more complex visualizations or add more features to the page.

You can check the live version of this implementation at [posts-count](/posts-count/).

The complete code for the page is available on [GitHub](https://github.com/amandeepmittal/amanhimself.dev/blob/master/src/pages/posts-count.astro).

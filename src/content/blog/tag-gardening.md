---
title: Tag gardening
author: Aman Mittal
pubDatetime: 2024-09-01T03:42:51Z
slug: tag-gardening
featured: false
draft: false
tags:
  - notes
description: ''
---

<!-- vale off -->

I recently came across Karl Voit's blog post about the concept of [tag gardening](https://karl-voit.at/2021/01/02/tag-gardening-publicvoit/). He uses this process to trim down the various tags he uses and provides explanation on the decision he took during the cleanup.

His blog post served as a timely reminder of why I should clean up some of the [tags](/tags/) from my blog. I wrote this post to appreciate Karl's efforts and share my thoughts on the topic.

<!-- vale on -->

## What is tag gardening?

According to Karl, tag gardening is a practice of cleaning up the chaos that can result from having too many tags on a blog, over a period of time.

## Best practice: limitation

Karl describes one best practice, which is:

> Limit the number of tags on a blog.

Recently, I refactored my blog to migrate from Next.js to Astro and I noticed that I had a lot of tags. I've never done a tag refactor before and I could see having excessive tags creates a clutter.

I consider tags an integral part of any blog. They easily allow us to navigate and explore a topic of interest deeply by finding related posts written on the same blog.

Limiting the number of tags on a blog is something I've started advocating for on my blog as well.

### Technique to trim down tags

Before writing this post, my blog had 21 tags. To manage this tag cloud, I've done the following:

- Delete the tags that are no longer in use or used only once
- Merge tags that overlap or are similar in nature

### Delete singular tags

<img src="/images/tag-gardening/ss2.png" alt="Cloud of tags before writing this post" class="sm:w-3/3 mx-auto"/>

The above image illustrates the tag cloud before performing the act of trimming them down. Tags such as `#conference`, `#devrel`, and `#writing`, each have one post and the situation hasn't changed since I created them. Currently, I'm not planning to write anything that may fall under those tags so I decided to group them under an existing tag called `#notes`.

I use `#notes` as a general purpose tag where I can share thoughts without focusing on technical details, unlike other tags on my blog.

<img src="/images/tag-gardening/ss1.png" alt="Notes tag highlighted in the tag cloud" class="sm:w-3/3 mx-auto"/>

Another example is about the posts I've written on specific tools I use. I started creating individual tags for each tool so it would be easier to find more posts about them on my blog. Having each tool as a separate tag made sense since I was writing multiple posts about each tool. Some of these tags are `#vscode`, `#xcode`, and `#obsidian`.

After a while, I created a `#tools` tag that included posts about other topics such as writing about my [macbook setup](/blog/macbook-setup-2024/) or the [default apps](/blog/default-apps-2023/) I use. Since this tag was used in a generic way, I found myself repeating topics. To categorize them clearly, now I've created a `#macos` individual tag and rest of the unrelated topics, I've moved them under `#notes`.

This time I had to divert from the practice a bit to create a new tag.

## Tags cloud now

At the time of writing this post, my blog has 18 tags. Four tags deleted, and one new tag added.

<img src="/images/tag-gardening/ss3.png" alt="Notes tag highlighted in the tag cloud" class="sm:w-3/3 mx-auto"/>

## Best practice: use plural forms

Karl suggests using plural forms when creating tags:

> ...singular form contradicts the common convention of using the plural form of tags.

This practice doesn't apply to specific tags like "vscode" or "xcode". It only applies to the general terms such as:

- notes
- year-reviews
- tools (the previous generic tag I had on my blog)

I previously used `#year-review` as a tag for my yearly review posts. Following Karl's advice, I changed it to [`#year-reviews`](/tags/year-reviews/) since I have multiple posts under this category.

## Summary

Over the years while maintaining this blog, I've thought a lot about using tags effectively. I never encountered a concrete example and practice as a **tag gardening**. Karl's post inspired me to and helped me manage the emerging chaos of tags on my blog. I'll continue to nurture this garden.

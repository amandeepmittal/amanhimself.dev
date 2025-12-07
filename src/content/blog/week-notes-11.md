---
title: Week notes 11
author: Aman Mittal
pubDatetime: 2025-12-07T00:00:10Z
slug: week-notes-11
featured: false
draft: false
tags:
  - notes
description: ''
---

I am back to writing weekly notes and I am going to keep things casual this time.

This week was a bit fast and slow at the same time.

- 📝 Published a post about creating a ["copy Markdown" button for documentation sites that use MDX for content and Next.js](/blog/create-a-copy-as-markdown-for-mdx-documentation/). This is a custom approach that I'm using at work. I wanted to share an overview of this approach since the main reason a docs site uses MDX is that it has different dynamic content sources that are stitched together at runtime to present the final content on a page. Dynamic content sources are not included in the raw Markdown output of an MDX file, and it can be tricky to handle them for a "copy Markdown" button.
  - This is one of the longer posts I have written this year.

- 📝 Another post I published last weekend was about [adding a recent posts section to a blog that uses Astro as an SSG engine](/blog/add-recents-posts-astro-section/). I used the same approach to add a "related posts" section to each post.

- 💻 I've made some improvements to my blog, which include displaying tag counts with each tag link on the [blog](/blog/) index page. I've also added a "related posts" section at the end of each post. The last change I made was to add a new page to view a year-by-year bar chart of all posts published on this blog at [posts-count](/posts-count/).

- 📚 This month I have read two books:
  - I finally completed [Prompt Engineering for LLMs](https://www.goodreads.com/book/show/221244015-prompt-engineering-for-llms) by John Berryman and Albert Zielger. I started this book in September and it took me a while to finish it. It is an interesting read as it covers the basics and some advanced techniques on how to deal with prompts. The important takeaway for me was to get a view of the _magic_ that happens behind the scenes when we use LLMs.
  - The second book I read was [Writing better with Vale](https://www.goodreads.com/book/show/241849517-write-better-with-vale) by Brian P. Hogan. It's a short book and nails the introduction to Vale, which is a tool to lint your documentation content. There are some in-depth examples discussed in the book for use in a monorepo setup or when you have multiple content sources hosted from a large repository. It also goes into the basics of how Vale works behind the scenes and how to use it with a CI/CD pipeline.

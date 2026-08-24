---
title: 'Adding Content-Signal to a docs site'
author: Aman Mittal
pubDatetime: 2026-08-24T00:00:01Z
slug: adding-content-signal-to-docs-site
featured: false
draft: false
tags:
  - ai
  - tech-writing
description: ''
---

A few weeks ago I ran [isagentready.com](https://isagentready.com) on [docs.expo.dev](https://docs.expo.dev/), a site that I manage and work on, for my day job. One of the failed references during the check was the lack of `Content-Signal` policy in `robots.txt` file of the site.

Just for context, isagentsready.com is a tool that checks if a site is ready for AI agents to crawl and index, and is developed by Cloudflare.

## What is `Content-Signal`?

Cloudflare announced the [Content Signals Policy](https://blog.cloudflare.com/content-signals-policy/) in September 2025 as an extension to `robots.txt`. It is one policy with three flags, each set to yes or no. In a nutshell, if you add it, this is what it looks like in your `robots.txt` file:

```txt
User-Agent: *
Content-Signal: search=yes, ai-train=no, ai-input=yes
Allow: /
```

The flags to pay attention in the above snippet are the following signals:

- `search` which covers building a search index and returning results with links and short excerpts
- `ai-train` which covers including training or fine-tuning LLMs
- `ai-input` which covers feeding your content into a model at answer time. This is for retrieval augmented generation and AI search answers.

One thing to note here is that Cloudflare do mention that omitting a signal neither grants nor restricts permission. So, it is more of a nice to have, cover the grounds so your documentation site isn't left behind.

> **Note:** The reference site, [contentsignals.org](https://contentsignals.org/), describes the vocabulary as coming from a proposed IETF standard drafted by the AI Preferences (aipref) working group.

## Why is this an auto-yes for a docs site

The content policy's obvious audience is on of those publisher who wants to refuse. Documentation run on different economics and for many of us, docs is the product.

Adding this policy to your `robots.txt` file doesn't replace the work you need to do to get answers picked from your docs site for AI Answer search engine optimization. You still need to apply other methods or audit your docs site using [afdocs.dev](https://afdocs.dev/) to ensure your docs site is ready for AI agents. There are also other methods like exposing JSON-LD structured data and adding `llms.txt`, which I have written before in [docs discoverability layers](/blog/docs-discoverability-layers/), and about [adding llms.txt to this blog](/blog/add-llms-txt-to-an-astro-blog/).

---
title: Docs discoverability layers
author: Aman Mittal
pubDatetime: 2026-03-28T00:00:01Z
slug: docs-discoverability-layers
featured: false
draft: false
tags:
  - tech-writing
description: ''
---

When someone says a doc site is "discoverable", they often mean that a human can find it through a search engine or use the in-site text-based search. Most documentation sites are built for human readers. If a page loads correctly and reads well, it is considered discoverable. This assumption covers only one dimension.

[Search engines need signals](https://developers.google.com/search/docs/fundamentals/how-search-works) to crawl and index pages. They need to know which URL is authoritative, what a page is about, and how to display it in results. Schema parsers (systems like Google's Rich Results engine that read [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)) need typed metadata to understand what a page represents, not just what it says. AI agents need clean text they can consume without wasting tokens on parsing HTML, JavaScript, and navigation.

Search crawlers, schema parsers, and AI agents each need different things from the same documentation page. The infrastructure serving one of them does almost nothing for the other two.

At my day job, I work primarily on a [documentation site](https://docs.expo.dev) which has more than 1,000 pages. I have observed that treating "discoverability" as a single concern can lead to blind spots that only became visible when I started looking at what each machine reader actually needs.

This post highlights some key points I found after attempting to satisfy all three. It is based on what we've shipped so far, including what we already had in place and was working for us (mostly for search engines).

## The assumption worth questioning

Most documentation sites invest, or I should say, used to invest in one surface: HTML rendered for human readers. If they do any machine-facing work at all, it's usually [meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags) in the `<head>` element for search engines. All of us who work on documentation used to stop there because the implicit assumption is that search engine visibility equals discoverability. If a search engine like Google can find the page, the job is done.

> This still holds true in 2026. Yes, I am making this claim because AI agents can do web search and humans are still reading documentation and still use search engines. We just don't know for how long.

So, if search visibility isn't the whole picture, what else is there? There are three types of machine reader, each piece needing its own layer:

**Search crawlers**: They need control signals. They need to know which URL is [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) when versioned docs produce near-identical pages. They need [`robots` directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) to know what to skip and a few more `meta` tags. This is the most established layer since most documentation sites have them.

**Schema parsers**: This includes [Schema.org](https://schema.org) and [Google's Rich Results](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) engine. AI agents can also benefit from this data when available. I think of this as an identity layer which is usually constructed from breadcrumb chains, FAQ structures, video detection, and so on. This is achieved by using [JSON-LD structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) and while [JSON-LD is used on over half of all websites](https://w3techs.com/technologies/overview/structured_data), most of that is on large platforms. In my experience working across documentation sites, I haven't seen many using docs-specific types like `TechArticle` or `BreadcrumbList`.

**AI agents**: This can include coding assistants, chat interfaces, and other LLM based tools that fetch documentation when a user asks a question. This is the newest layer and needs a clean, compact mechanism to consume the content. This is usually done in the form of Markdown files, and an [`llms.txt`](https://llmstxt.org/) file is a small but efficient starting point.

These three layers overlap in some ways.

## Testing these layers

At my day job, all three layers are implemented and I have also implemented two out of three layers on my personal blog (this blog!).

The blog uses metadata and has an LLM access layer using `.md` URLs. I think using structured data might be overkill for it. The [documentation site](https://docs.expo.dev) I work on is more of a complete case study. The following table describes each layer and its implementation status from the documentation site:

| Layer               | Consumer                                        | What is implemented                                                                                         |
| ------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Head metadata       | Search crawlers, social platforms               | Title, description, canonical URL, robots directives, Open Graph (OG) tags, Twitter Cards, dynamic OG images |
| JSON-LD             | Schema parsers, Google rich results              | Schema types such as: Organization, WebSite, BreadcrumbList, TechArticle, FAQPage, VideoObject              |
| llms.txt + markdown | AI agents (coding assistants, chat interfaces)   | llms.txt endpoints, per-page `/index.md`, Cloudflare worker that serves markdown when requested via HTTP headers |

The layers are independent. You do not have to implement them all at once. You can add them incrementally and test the value each one provides.

## My framing was wrong

Before all of this together, I had a narrow framing that I used to call "crawlability". This was wrong because I used to think that the `<head>` metadata is only about whether a crawler can reach a page or not. It is not just about that. It is also about control, selection, and presentation. A `canonical` tag tells search engines which URL represents the content, `robots` controls the indexing behavior, [`meta description`](https://developers.google.com/search/docs/appearance/snippet) provides a candidate summary for search results, OG and Twitter/X tags control social preview cards, and so on.

How you frame each layer matters. Getting specific about what each one does helped me see where the gaps were.

## Three layers together and where to start

All three layers overlap in some ways and are dependent on each other.

The `<head>` metadata comes first. If a page is not indexed, then it doesn't matter what JSON-LD or `llms.txt` coverage it has. The page will not appear in search results and will often be skipped by AI agents that rely on search indexes to find content. If there is one place you are looking to get started, start with `<head>` metadata.

JSON-LD adds semantic understanding to each indexed page. It doesn't help a page get indexed. It helps machine readers understand what the page represents after they find it. For documentation, [`BreadcrumbList`](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) is the most immediately valuable because it can visibly change how the page appears in Google search results, showing a navigation path instead of a raw URL.

`llms.txt` provides the site-level overview that neither page-level layer can offer. It gives AI agents a curated map of the entire documentation. To actually consume individual pages, per-page `.md` URLs are efficient. Some sites also support serving Markdown when an AI agent requests it via the `Accept: text/markdown` HTTP header, so the same URL can return HTML for browsers and Markdown for agents.

```md
                     One docs page
                          |
        ---------------------------------------------
        |                     |                     |
        v                     v                     v
   HTML <head>         JSON-LD scripts      Markdown access
   control layer       identity layer       LLM layer
        |                     |                     |
  canonical URL         WebSite             llms.txt index
  robots rules          Organization        llms-full.txt
  meta description      TechArticle         per-page index.md
  OG/Twitter            BreadcrumbList      Accept: text/markdown
```


## Wrap up

If you maintain a documentation site, or if you are thinking about how machines consume your content, I would be curious to hear how you think about these layers. I'm not presenting this three-layer model as the definitive way to think about docs discoverability. This is how I ended up thinking about these layers.
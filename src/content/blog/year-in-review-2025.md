---
title: 2025 - A year in review
author: Aman Mittal
pubDatetime: 2026-01-30T00:00:01Z
slug: year-in-review-2025
featured: false
draft: false
tags:
  - year-reviews
description: ''
---

Another year, another reflection. This is my sixth consecutive year-in-review post. Writing these has become a tradition I genuinely look forward to at the end of a year. It forces me to slow down, instead of just rushing.

This year, I mostly focused on work, and I had fun doing that, so I am going to keep this post short.

## Work

This year, time spent at work was heavily focused on AI and documentation infrastructure. The docs, the area I spend most of my time working on, might look static to most people but they are well alive. It takes a lot to keep them breathing, including daily maintenance, constantly pushing updates, and major new additions.

The first two AI-related projects that were completed at Expo are described below:

### LLMs.txt

My year at work started with a project to generate [LLMs.txt](https://docs.expo.dev/llms/) for Expo docs. The challenge was that our data sources are not just MDX files, but multiple and dynamic.

I ended up creating four different versions of the LLMs.txt output files, plus separate files for deprecated SDK versions after some community suggestions. All of this was done through JavaScript scripts that pull from various sources, process the content into plain markdown, and generate a clean output optimized for LLM consumption. The nature of updates was also taken into consideration and I ended up hooking LLMs generation into the CI/CD pipeline for docs deployment.

This was one of those projects where scope kept expanding as I understood and kept working on the problem. What started as "let's make a text file" became a proper system for keeping LLM-friendly docs in sync with our ever-changing documentation.

### Kapa AI integration

The next AI project was integrating [Kapa](https://kapa.ai) into the Expo docs. This had two parts: adding Kapa to the search UI and implementing the "Ask AI" widget specifically for Expo SDK pages.

This wasn't a quick integration. It took weeks of investigation. Figuring out the right UX, how to scope the AI's knowledge appropriately, back-and-forth reviews, and making sure it actually helped developers rather than just being a gimmick.

### Copy markdown button for LLMs on a docs site

I also wrote about the [copy markdown button for LLMs](/blog/create-a-copy-as-markdown-for-mdx-documentation/) feature implementation which came mostly out of the LLMs.txt work and is quite similar in nature to processing content into plain markdown.

### Documentation updates and improvements

Beyond the AI stuff, I worked on improving the [Expo Modules API](https://docs.expo.dev/modules/) documentation and the [Config Plugins](https://docs.expo.dev/config-plugins/introduction/) docs. These are areas that developers often struggle with, so making them clearer has a real impact.

Other than that, there were so many different docs changes released over the span of 12 months that I worry this post might become a lengthy changelog.

## Blog

Last year, I migrated this blog to Astro to keep the maintenance overhead low and it has been working out for me. This year I focused more on writing and publishing content and I managed to publish 40 posts. It turns out people still find my blog through Google and other search engines and visit this blog.

I wrote about this in detail in the [2025 blog stats](/blog/2025-blog-stats) post.

There were other quality of life improvements done on this blog that you are currently experiencing. I also added new slash pages like `/stats`, `/posts-count`, and `/been`. You will find them at [/slash](/slash/).

## Highlights from my GitHub

A couple of years back, I started to maintain a [single repository](https://github.com/amandeepmittal/react-native-examples) for all the demos and example apps I write using React Native and Expo. These example apps are mostly part of the tutorials you see on this blog. This year, it reached 1000+ stars. It’s still being actively maintained.

### I made a lot of commits

My role at Expo continues to be a major driver of my GitHub activity. The dense contribution graph reflects me working on Expo’s documentation among other things:

<img src="/images/year-2025/01.png" width="640" />

_A big shout and a huge thanks to folks who [sponsored me on GitHub](https://github.com/sponsors/amandeepmittal) this year!_

## Traveling

I didn’t travel to my liking and only managed to escape on one occasion. I took a short weekend trip to Warsaw, Poland in April and the city was sunny.

<div style="display: flex; gap: 10px;">
<img src="/images/year-2025/02.jpg" width="320" /> <img src="/images/year-2025/03.jpg" width="320" />
</div>

## Reading

I successfully completed my yearly Goodreads reading challenge, diving into books across different domains. Here is the post I wrote separately about: [2025 year in books](/blog/2025-year-in-books/).

## Personal

### Using AI

Here's the thing about 2025: it wasn't just a year of working on AI integrations at work. It was also the year I started seriously using AI in my own workflows.

I wrote about my [first few days with Codex CLI](/blog/first-few-days-with-codex-cli/) earlier this month and it changed how I think about these tools. What started as curiosity turned into daily use. I replaced my Grammarly workflow with Codex reviewing blog drafts. I used it to index my Obsidian notes, a task that would have been tedious manually and took 34 seconds. I even set up a Linear-to-Obsidian sync using Playwright MCP servers.

The shift I noticed: AI agents went from building toy apps in 2024 to automating daily workflows in 2025. The terminal might seem like an odd place to find the future, but the best tools usually are.

### AI year wrapped

In September 2025, I started using Codex and Cursor as part of my development workflow. What began as an experiment quickly became an integral part of how I build and ship projects.

<div style="display: flex; gap: 10px;">
<img src="/images/year-2025/04.png" width="320" />
<img src="/images/year-2025/05.png" width="320" />
</div>

ChatGPT's end of the year review generated the following image:

<img src="/images/year-2025/still-life.png" width="480" />

Looking back, adopting AI tools was one of the more impactful decisions I made this year. It lowered the friction to start new projects and helped me move faster on existing ones. I'm curious to see how this evolves in 2026.

## Wrapping up

That’s a wrap! I think the last half of 2025 has been much better in terms of me achieving the state of inner tranquility.

If you made it so far, I appreciate you!

If you are curious about the previous year-in-review posts or how long I have been writing these posts, check out the links below:

- [2024 - A year in review](/blog/year-in-review-2024/)
- [2023 - A year in review](/blog/year-in-review-2023/)
- [2022 - A year in review](/blog/year-in-review-2022/)
- [2021 - A year in review](/blog/year-in-review-2021/)
- [Year rewind: 2020](/blog/year-rewind-2020/)

Onwards to 2026.

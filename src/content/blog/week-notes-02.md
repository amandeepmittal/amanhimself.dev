---
title: Week notes 02
author: Aman Mittal
pubDatetime: 2025-01-05T00:00:01Z
slug: week-notes-02
featured: false
draft: false
tags:
  - notes
description: ''
---

Happy New Year! First-week notes of 2025.

- Maintained my workout routine for the latter half of the week.
- Completed EAS tutorial updates, a mini project I started over the winter holidays.
- I went through the Google Search Console 404 report for the docs site I help maintain at work. Found something interesting. Even though the dashboard shows that the affected pages are over 1.4k, the genuinely affected pages were less in number, and the source of these pages comes from the redirects that haven't been updated in a while after some clean-ups and removing the archived pages during the last 6 weeks of 2024.
- Went down the path of generating an `llms.txt` file for the Expo docs site. The online available tools like [llmstxt.firecrawl.dev](https://llmstxt.firecrawl.dev/) and [llms.txt generator by Sitespeak.ai](https://sitespeak.ai/tools/llms-txt-generator) did not work as expected. I expected them to generate an output of all the pages with their meta description. However, it seems there are too many pages for these kinds of tools.
  - Then, after a little bit of searching I found a tool called [llmstxt](https://github.com/dotenvx/llmstxt) by dotenvx team that converts the `sitemap.xml` of a site to `llms.txt`.
  - I think this tool is pretty easy to use because it is available as an npm package.
  - I also think it could fit with maintenance when new pages are added to the docs site.
  - One thing left here is I need to go through the output again to find any false positives or missing context before committing this to the Expo docs.
- The air quality in New Delhi was terrible for most of the week:

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:plmvu6gny24jklc5lqgcnblt/app.bsky.feed.post/3levepkk2qk2d" data-bluesky-cid="bafyreiad3a5skf7rctwvs6iloiyf3jhg7lqbhyyspdh3smneezdb26qt34"><p lang="en">404 air not found<br><br><a href="https://bsky.app/profile/did:plc:plmvu6gny24jklc5lqgcnblt/post/3levepkk2qk2d?ref_src=embed">[image or embed]</a></p>&mdash; Aman Mittal (<a href="https://bsky.app/profile/did:plc:plmvu6gny24jklc5lqgcnblt?ref_src=embed">@aman.bsky.social</a>) <a href="https://bsky.app/profile/did:plc:plmvu6gny24jklc5lqgcnblt/post/3levepkk2qk2d?ref_src=embed">January 4, 2025 at 10:58 AM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

## Writing

- Published my [yearly review for 2024](/blog/year-in-review-2024/). It was a last-minute draft, so I followed the same pattern for the post as last year.

- Wrote four complete drafts that I will publish soon. I need to plan out their publishing dates to consistently publish these new posts.

## Reading

- Started Reading Every page is page one by Mark Baker, a book on how people on the web use content and strategies on topic-based documentation.

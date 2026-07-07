---
title: Week notes 17
author: Aman Mittal
pubDatetime: 2026-05-03T00:00:01Z
slug: week-notes-17
featured: false
draft: false
tags:
  - notes
description: ''
---

A heavy week on the docs side. Two things shipped that I had been chewing on for a while, and a couple of small skills came together. Some reading and writing on the side too.

- 🧪 Built a `docs-ja-translator` skill and landed the Japanese tutorial pilot at work. The skill takes an existing MDX document from Expo tutorial, mirrors it under `pages/ja/<same-path>`, preserves frontmatter, JSX tags, code blocks, and link URLs, and translates the prose, headings, link text, and string-valued props into Japanese.
- 💼 Shipped per-page Markdown serving on docs.expo.dev (`/page.md` sibling paths), implemented as a Cloudflare Worker rewrite so it works in previews too. I documented the worker behavior in the docs README for AI agents.
- 💻 Switched the light-mode code theme on this blog to GitHub Light so it matches the rest of the page.
- 📚 Read Kepano's [stephango.com/vault](https://stephango.com/vault) post and compared his ideas to my vault's structure. Most of what I keep in the vault are personal notes, blog post drafts, projects and blog post ideas that are work in progress, some attachments, and work meeting notes. Recently, I have been using the vault as context management system for Claude, especially when I am exploring some idea or skill generation.
- 🔗 Podcasts
  - Listened to
    [Agent-Harness.ipynb* with Vincent Warmerdam](https://www.youtube.com/watch?v=d4wGcjvXJh0) and found the discussion around keeping a physical notebook for jotting down thoughts and creating plans on how to steer an agentic task interesting.
  - Listened [How valuable are agent skills? Conversation with Larah Vasquez and Fabrizio Ferri-Benedetti](https://www.youtube.com/watch?v=L18_7I2A8h4) is an interesting discussion on the value of agent skills. I was also curious to hear on how other technical writers/docs engineers are creating/using skills with agentic tools.

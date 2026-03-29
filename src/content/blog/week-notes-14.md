---
title: Week notes 14
author: Aman Mittal
pubDatetime: 2026-03-29T00:00:01Z
slug: week-notes-14
featured: false
draft: false
tags:
  - notes
description: ''
---

Busy week with mix of publishing, drafting, and big changes. The kind where you look back and wonder how it all fit into five days.

- 📝 Wrote a blog post based on the recent works on Expo docs. It talks about [different layers of discoverability](/blog/docs-discoverability-layers/) that have become essential for human readers and AI agents.
- 📝 Redesigned the blog footer with social icon buttons.
- 🧪 Explored switching the Astro blog from npm to bun. Netlify supports it, but the practical gain for this repo's dependency size is small. Still thinking about it.
- 💼 The big one this week was migrating the Expo docs linting setup from ESLint and Prettier to [Oxlint](https://oxc.rs/docs/guide/usage/linter) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter). The speed is real.
	- Both are Rust-based tools from the [Oxc project](https://oxc.rs/) that replace ESLint and Prettier with significantly faster alternatives.
	- Big because the migration includes 188 rules from ESLint to Oxlint. I have successfully removed Prettier entirely. One thing I think Oxlint could do better is to allow us to create our own custom plugins so I can port over MDX rules even though Oxlint does not supports MDX. In the end, Tailwind CSS and MDX are both using ESLint.
- 📚 Started reading "Chop Wood, Carry Water". I need to finish more books.
---
title: Week notes 15
author: Aman Mittal
pubDatetime: 2026-04-05T00:00:01Z
slug: week-notes-15
featured: false
draft: false
tags:
  - notes
description: ''
---

This week leaned heavy into to upgrading lint tools at work and a bit of writing. I also managed to create a skill to perform a tedious activity with Claude Code and `/chrome` tool it has, which I am going to write about in a future post.

- 📝 Wrote three short blog drafts that will go live on this blog soon.
- 🧪 Built a broken link checker skill for the Expo docs using Claude Code Agent Teams. Instead of one agent crawling more than 1000 files and reporting gaps in its findings, I split the work across six agents, each running in its own `tmux` pane with a different color label. It was joy to watch multiple agents running in parallel for a few minutes.
- 🧪 Built a Claude Code skill that automates Algolia crawler's recrawls using the `/chrome` browser integration. The Algolia runs autonomously every day at a specific time. It occasionally fails and the only way to resolve the network errors is to go to the monitoring dashboard manually and recrawl each failed link. Now Claude Code can do this automatically for me while I can sip my morning coffee.
- 💼 Lot of chores and work around admin stuff.
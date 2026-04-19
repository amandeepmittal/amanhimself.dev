---
title: 'Playwright to Chrome'
author: Aman Mittal
pubDatetime: 2026-04-19T00:00:01Z
slug: playwright-to-chrome
featured: false
draft: false
tags:
  - claude-code
description: ''
---

Back in January, I had just started using Codex CLI and Claude Code. I was spending more time with Codex CLI and ended up creating a small Expo and React Native app as well. As I was learning how to use these tools, I wrote about using Codex CLI with Playwright for browser automation tasks in [First Few Days with Codex CLI](/blog/first-few-days-with-codex-cli/) post.

The approach I discussed initially, worked for me for some tasks by setting up Playwright MCP and managing its browser extension. However, the approach isn't flawless. Any time, Playwright MCP gets an update or its browser extension does, each requires to make a new connection to exchange token between them. The _token_ mechanism is what Playwright MCP and its Chrome extension use to connect Codex CLI or Claude Code.

At the time of writing this post, Claude Code has already announced a beta feature called `/chrome` and have released their Chrome extension. This changed a few of my workflows. Instead of orchestrating a headless browser extension and MCP through Playwright, Claude Code now uses its own tools which I had to authorize only once when I enabled `/chome`.

Another cool thing about Claude Code's approach I have found so far is that I don't to maintain or manually update Claude Code or Claude's browser extension and go through the process of setting them up again.

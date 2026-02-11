---
title: 'TIL about tracking your Claude Code tokens usage'
author: Aman Mittal
pubDatetime: 2026-02-11T00:00:01Z
slug: claude-code-tokens-usage
featured: false
draft: false
tags:
  - cli
  - ai
description: ''
---

I wrote about [tracking Codex tokens usage](/blog/codex-tokens-usage/) recently, and the same tool works for Claude Code. Different command though:

```shell
npx ccusage
```

The tool is part of the [`ccusage`](https://www.npmjs.com/package/ccusage) project. Works with Claude Code's local logs, no API keys needed. It reads your local Claude Code logs and gives you a daily breakdown of exactly what you're spending.

Here's an example usage:

| Date       | Models                          | Input | Output | Cache Create | Cache Read | Total Tokens | Cost (USD) |
| ---------- | ------------------------------- | ----: | -----: | -----------: | ---------: | -----------: | ---------: |
| 2026-02-05 | haiku-4-5, opus-4-5             | 54.3K |   9.7K |         3.2M |      87.1M |        90.4M |     $59.20 |
| 2026-02-06 | haiku-4-5, opus-4-5, opus-4-6   | 11.0K |   5.4K |         1.2M |      25.7M |        26.9M |     $18.59 |
| 2026-02-07 | haiku-4-5, opus-4-6, sonnet-4-5 | 27.3K |   4.9K |       718.7K |      10.6M |        11.3M |      $7.39 |
| 2026-02-08 | haiku-4-5, opus-4-6, sonnet-4-5 | 15.4K |   4.9K |       287.9K |       7.7M |         8.0M |      $5.17 |
| ...        | _(other sessions)_              |   ... |    ... |          ... |        ... |          ... |        ... |

Compared to the Codex output, the Claude Code breakdown adds a _Cache Create_ column. This tells you when it's building up context vs reusing it through _Cache Read_.

The ratio between the two shows cache efficiency. For example, 454.4M cache reads vs 28.8M cache creates means the context is being reused about 16x. Cache behavior explains why some sessions feel faster.

If you're on Claude Code and haven't checked your usage, run `npx ccusage`. You might be pleasantly surprised after checking your usage.

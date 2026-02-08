---
title: 'TIL about tracking your Codex tokens usage'
author: Aman Mittal
pubDatetime: 2026-02-08T00:00:01Z
slug: codex-tokens-usage
featured: false
draft: false
tags:
  - cli
  - ai
description: ''
---

I use Codex for both code-related and non-code tasks in Cursor and in the terminal. I wanted a better way to track Codex token usage day by day.

Recently, I learned about [`@ccusage/codex`](https://www.npmjs.com/package/@ccusage/codex), which reads your local Codex logs and spits out a table of exactly how many tokens you used each day. This breakdown isn't provided by the [Codex usage page](https://platform.openai.com/usage).

```shell
npx @ccusage/codex@latest
```

If you're using Codex CLI and haven't run this yet, do it. You might be very surprised. I certainly was when I looked at my usage.

Here is a snapshot from Feb 06 to Feb 08, 2026. The **Total** row is my cumulative usage since September 2025, not only these three days:

| Date         | Model         |      Input |    Output | Reasoning | Cache Read | Total Tokens |  Cost (USD) |
| ------------ | ------------- | ---------: | --------: | --------: | ---------: | -----------: | ----------: |
| Feb 06, 2026 | gpt-5.2-codex |     396.8K |     26.4K |     20.8K |       1.0M |         1.4M |       $0.89 |
| Feb 07, 2026 | gpt-5.2-codex |       1.1M |    208.5K |     91.1K |      18.2M |        19.5M |       $5.79 |
| Feb 08, 2026 | gpt-5.3-codex |      83.0K |     16.3K |     10.5K |     498.6K |       597.9K |       $0.33 |
| **Total**    |               | **146.9M** | **22.6M** | **15.3M** |   **2.3B** |     **2.5B** | **$794.76** |

It reads your local logs and gives you a breakdown of your Codex token usage, including input, output, reasoning, cache reads, total tokens, and even the cost in USD based on current pricing. The tool pulls live pricing from [LiteLLM](https://www.litellm.ai/), so the cost calculations should stay accurate even when OpenAI changes rates again.

---
title: Wait, there are smart quotes in my docs
author: Aman Mittal
pubDatetime: 2025-12-15T00:00:01Z
slug: smart-quotes-in-documentation
featured: false
draft: false
tags:
  - tech-writing
description: How to catch smart quotes in documentation when copy-pasting from apps like Notion, and why maintaining consistency matters over time.
---

When you have a mix of internal and external contributors to the documentation you maintain, you'll inevitably encounter inconsistencies. One common issue I've encountered is when copy-pasting a draft from applications like Notion to `.md` or `.mdx` files. These apps automatically convert straight quotes to smart quotes (curly quotes). While maintaining a large documentation site, something that has over 800 documents, this issue is not easy to spot manually.

Smart quotes look like `“` or `‘`. They are typographic characters that look polished in a traditional sense of writing. They might render fine on your documentation site but they can be spotted in a code editor like VS Code or Cursor. They can cause lint and formatting issues, especially when they make their way into code or configuration examples. This can also lead to breaking code examples or configuration snippets when your documentation readers copy and paste them into their apps.

By the time you catch them, they might be scattered across dozens of files. However, you can use prose lint tools like [Vale](https://vale.sh/) to catch them automatically.

## Catching smart quotes with Vale

[Vale](https://vale.sh/) is a prose linter that can help catch these issues automatically. You can create a custom rule to flag smart quotes in your documentation.

Here's a Vale rule that catches all four types of smart quotes:

```yaml
extends: existence
message: Use straight quotes instead of smart quotes.
level: error
nonword: true
tokens:
  - “
  - ”
  - ‘
  - ’
```

This rule uses Vale's `existence` extension, which checks for the presence of specific tokens. The `nonword: true` setting ensures that Vale treats these as non-word characters, which is important for accurate detection. The rule will flag any instance of these tokens as errors. The level of severity is set by the `level` key.

## Running Vale locally

You can run Vale locally to check your documentation:

```shell
vale path/to/your/docs
```

Or integrate it into your CI/CD pipeline to catch these issues before they're merged. I've written about [setting up Vale with GitHub Actions](/blog/vale-and-github-actions/) if you want to automate this process.

## Wrapping up

As a documentation engineer, you have to keep long-term maintenance in mind. Smart quotes might seem like a minor issue, but it's a perfect example of why proactive maintenance matters over time. Using a tool like Vale to catch these issues automatically, you are reducing cognitive load for yourself when reviewing pull requests. Consistent formatting also helps readers focus on the information, not the formatting quirks.

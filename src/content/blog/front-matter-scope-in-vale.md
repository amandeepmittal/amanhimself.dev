---
title: Fine-tuning front matter scope in Vale CLI
author: Aman Mittal
pubDatetime: 2025-04-22T00:00:01Z
slug: front-matter-scope-in-vale
featured: false
draft: false
tags:
  - docs-as-code
  - tech-writing
description: ''
---

For a documentation site I am currently maintaining, we use a consistency substitution rule. This rule ensures that standardized terminology and proper capitalization are used for certain words across the whole documentation.

These rules substitute pre-defined patterns by automatically flagging instances where terms like "github" should be "GitHub" or "javascript" should be "JavaScript". Many other internal and third-party products and technologies are included in this substitution rule. Here's an example of the rule file:

```yaml
extends: substitution
message: "Consider using '%s' instead of '%s'"
level: error
ignorecase: true
swap:
  '\b & \b': and
  amazon appstore: Amazon Appstore
  android emulator: Android Emulator
  apple developer: Apple Developer
  cocoapods: CocoaPods
  github: GitHub
  Github: GitHub
```

## The problem

After Vale CLI `3.11.0` introduced Front Matter checks, it started flagging every instance in the front matter of the docs files (`.mdx`) as incorrect. Internally, I consider this a false positive because we have front matter fields like `"github"` to add a link to a GitHub repository for an API documentation page.

```shell
 pages/versions/unversioned/sdk/sqlite.mdx
 4:25  error  Consider using 'GitHub'         expo-docs.Consistency
              instead of 'github'

```

While there are advantages to linting front matter fields and their values, this rule might not be applicable to every context.

## The solution

The fix was surprisingly simple. You can ignore the generated scope of text in the frontmatter fields.

```yaml
scope: ~text.frontmatter
```

This line tells the Vale CLI to apply the rule to everything except the front matter. The tilde (`~`) acts as a negation operator. This helped us reduce the false positives, and the remaining errors were content issues that required fixing.

## Wrapping up

Documentation tooling often requires careful configuration to match your specific workflow. What seems like a minor setting can have major implications or, sometimes, false positives. By understanding the context (prose versus metadata in this case) and configuring tools accordingly, you can create an effective quality control system.

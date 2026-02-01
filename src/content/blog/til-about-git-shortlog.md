---
title: TIL about git shortlog
author: Aman Mittal
pubDatetime: 2026-02-01T03:42:51Z
slug: til-about-git-shortlog
featured: false
draft: false
tags:
  - git
description: ''
---

I have been using Git for all my career in the tech. I am habitual of the basic commands such as `git add`, `commit`, `status`, `log` and a few more that I use consistently. Yes, until last week, I had never once used or heard about `git shortlog`.

Sometimes you want to know who actually did the stuff inside a repository. Or like me, at the end of each year at work, I have to compile a list of external contributors along with their contributions count.

To make this happen, you don't need a fine-grained commit-by-commit archaeology, but look at the big picture. You can pipe log through `grep`and create a slightly complex pipeline. Or you could just use the tool that already exists on your system for exactly the purpose described previously:

```shell
git shortlog
```

The above command groups commits by author and lists of their commit messages. Readable? yes. Was I done? No.

The command also have some useful flags that you can use. One of them is `-s`, which gives you a summary mode. It counts the amount of commits without any commit message.

Then there's `-n`, which sorts the number of commits in a descending order. When both of these flags are used along with `git shortlog`, the output displayed to you looks like below:

```text
123 ABC
23  EFG
3   IJK
```

Instantly you can see the view that your stakeholder might have demanded. This goes beyond compiling a list and giving a shoutout to the contributors. When used in a new codebase, you can leverage this to understand it by talking to the top contributors who might know more about the project repository. Probably the person with over a thousand commits.

You can scope it to a time range or between tags:

```shell
git shortlog -sn --since="2025-01-01"
```

The above command is particularly nice for generating contributor lists for release notes or end-of-year lists. No more manual scrolling through a git log that is long and will take plenty of your time.

I think the reason I never discovered this command before is that I always reach out for `git log` first and then on a suggestion from a a colleague, started using `grep` when I needed to fulfill the release notes. However, Git has many commands like these under its umbrella, which might come handy in some situations.

Anyway. `git shortlog -sn`. Burn it into your brain.

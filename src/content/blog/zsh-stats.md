---
title: View most used commands with zsh_stats
author: Aman Mittal
pubDatetime: 2024-01-01T03:42:51Z
slug: zsh-stats
featured: false
draft: false
tags:
  - cli
description: ''
---

[ZSH](https://github.com/zsh-users/zsh) is the default shell in macOS. If you use [Oh my Zsh](https://ohmyz.sh/) to manage the ZSH configuration plugins and a theme to prettify the terminal, you can also use several built-in utilities.

One such utility is the `zsh_stats` command, which provides a list of your top twenty most frequently used commands and how many times each command has run. To use it, run the following command from a terminal window:

```shell
zsh_stats
```

This command will display an output like this:

![zsh_stats running inside a terminal window.](/images/zsh-stats.png)

It is useful for analyzing your command usage patterns.

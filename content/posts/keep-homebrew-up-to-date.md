---
title: 'Keep homebrew up to date'
date: '2023-04-01'
slug: 'keep-homebrew-up-to-date'
thumbnail: '/thumbnails/terminal.png'
tag: 'tools'
canonicalUrl: 'https://amanhimself.dev/blog/keep-homebrew-up-to-date'
---

I've been using [homebrew](https://brew.sh/) for as long as I can remember using macOS. I recently learned about cleaning up old and outdated files using the `brew cleanup` command.

Sometimes, I periodically upgrade packages that are installed using brew. Thus, I thought, why not add an alias such as below in my `.zshrc` file:

```shell
alias hbc="brew update && brew upgrade && brew cleanup"
```

This helps me to update and upgrade outdated packages, and clean up old files. Now, whenever I have to run all three tasks, I simply run `hbc` in the terminal.

Upgrading outdated packages periodically saves me from a situation when installing a new package, homebrew will upgrade all outdated packages first.

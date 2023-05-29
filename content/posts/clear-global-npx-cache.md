---
title: 'How to clear global npx cache'
date: '2023-05-30'
slug: 'clear-global-npx-cache'
thumbnail: '/thumbnails/terminal.png'
tag: 'tools'
canonicalUrl: 'https://amanhimself.dev/blog/clear-global-npx-cache'
---

Recently, I've seen myself running into the following message whenever I'm using a certain CLI tool with `npx`.

```bash
A new version of "x-package" is available
You can update by running: npm install -g x-package
```

I don't want to install the CLI tool globally and go into the rabbit hole of maintaining it as a dependency.

One way I've found that works on macOS to clear the global `npx` cache:

```bash
rm -rf ~/.npm/_npx
```

This will clear the global `npx` cache and you'll be able to use the latest version of the CLI tool.

Also, you can add an alias to your `.zshrc` or `.bashrc` file to make it easier to run:

```bash
alias clearnpx="rm -rf ~/.npm/_npx"
```

If you've trouble finding where npm stores `npx` cache on your system, run the following command to find out the exact path to the `_npx` directory:

```bash
npm config get cache
```

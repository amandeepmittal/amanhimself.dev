---
title: Detecting typos with typos-cli
author: Aman Mittal
pubDatetime: 2025-01-23T00:00:01Z
slug: typos-cli
featured: false
draft: false
tags:
  - tech-writing
  - notes
description: ''
---

Spell checking for typos in code, documentation, and blog sites can impair searchability, cause confusion, and introduce bugs. I have been using [`typos-cli`](https://github.com/crate-ci/typos/tree/master) for a while now to check for typos in my blog periodically and for work in the documentation site.

It's a [Rust](https://www.rust-lang.org/) based spell checker that can be used with any command line interface and includes many different options. In this post, I'll explore some of the common use cases I have found using this CLI tool.

# Getting started

Installing `typos-cli` as a command-line utility is straightforward. On macOS, it can be done with a package manager like [Homebrew](https://formulae.brew.sh/formula/typos-cli):

```bash
brew install typos-cli
```

If you are familiar with Rust, you can also install it using `cargo`. For other platforms, refer to [`typos-cli` documentation]().

## Detecting typos in the CLI

Run the following command to check for typos in a particular file or a directory:

```bash
typos
```

The output of this command provides all the typos detected from different files:

```bash
typos
error: `recieved` should be `received`
  --> ./src/api/handlers.js:15:10
    |
15  | // Data recieved from the server
    |         ^^^^^^^^

error: `succesfully` should be `successfully`
  --> ./docs/guide.md:42:8
    |
42  | Data succesfully processed
    |      ^^^^^^^^^^^
```

One thing to note here is that `typos-cli` is file extension agnostic. It works for JavaScript, TypeScript, Markdown (both `.md` and `.mdx`), and other common file extensions.

The above output shows:

- The typo found in the file
- The line number where the typo is located
- Suggested correction
- The file path and line number
- Context snippet to indicate where the typo is located

## Fixing typos automatically

`typos-cli` can also fix typos automatically. It has a `--write` option (_shorthand: `-w`_) to automatically correct detected typos:

```bash
typos -w
replacing `recieved` with `received`
replacing `succesfully` with `successfully`
```

In a typical documentation source code, I use this option with a caution. It's always a good idea to review the detection to ensure there aren't any false positives.

## Reviewing changes before applying

`typos-cli` provides `--diff` option to view what changes will be made before applying them:

```bash
typos --diff
-The _RCTBridge required dispatch_sync to load RCTDevLoadingView_ has become a common occurence when developing React Native apps with version `0.64` and `0.65`.
+The _RCTBridge required dispatch_sync to load RCTDevLoadingView_ has become a common occurrence when developing React Native apps with version `0.64` and `0.65`.
--- ./src/content/blog/setup-macbook-m1.md	original
+++ ./src/content/blog/setup-macbook-m1.md	fixed
```

## Formatting output

There are output format arguments available such as `brief` or `long`, which can be used to customize the format of the output by passing them as an argument to the `--format` option:

```bash
typos --format brief

./src/content/blog/atom-an-editor-of-21st-century.md:17:335: `Coffe` -> `Coffee`
./src/content/blog/build-a-progressive-web-app-using-react.md:388:60: `frome` -> `from`
```

## Checking specific files and directories

To target a specific file or a directory, pass the name of the file or the path of the directory:

```bash
# File
typos README.md

# Directory
typos pages/

## Possible to check multiple files or directories
typos README.md GUIDE.md
typos src/pages src/content
```

## Wrapping up

`typos-cli` can integrate well with GitHub Actions and VS Code. It also offers a different approach than other spell checkers out there, resulting in fewer false positives and is well suited for my use case right now.

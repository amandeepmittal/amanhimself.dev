---
title: 'Open any folder from the Terminal app in a Finder on macOS'
date: '2022-07-21'
thumbnail: '/thumbnails/terminal.png'
slug: 'how-to-open-any-folder-from-terminal-in-finder-on-mac'
tag: 'tools'
canonicalUrl: 'https://amanhimself.dev/blog/how-to-open-any-folder-from-terminal-in-finder-on-mac/'
---

Often, I struggle or want to open the current directory I am working from the Terminal app to the Finder window on macOS.

I have been a macOS user for almost eight years now, and it never occurred to me that I couldn't open the current location from the Terminal app. Until recently, a frustration point led me to find the solution. Again, though, I am surprised by its simplicity.

To open the current working directory in the Finder window, use the following command:

```shell
open .
```

The `open` command opens a file or a folder. It exists on the macOS.

You can do more with this command. The `/` argument opens the root directory.

```shell
open /
```

A specific directory is also allowed:

```shell
open ~/Desktop
```

Using the option `R`, you can locate a specific file or folder in the Finder:

```shell
open -R /blog
```

## Opening files

There are more things that the `open` command can do. It can open files. For example, to open a markdown file in the default editor or IDE:

```shell
open ./blog/mm-yy/your-file-name.md
```

The above command opens the markdown file in the Xcode. You can pass the `-t` option to open in the file in a text editor.

```shell
open -t ./blog/mm-yy/your-file-name.md
```

## Opening URLs

It can do more than open files and folders. It can also open a URL in the default web browser set up on your machine:

Use option `a` to override the default web browser and specify a different one.

```shell
open -a Safari https://www.google.com
```

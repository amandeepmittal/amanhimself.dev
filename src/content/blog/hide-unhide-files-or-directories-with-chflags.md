---
title: Hide and unhide files or directories visibility with chflags on macOS
author: Aman Mittal
pubDatetime: 2023-12-25T03:42:51Z
slug: hide-unhide-files-or-directories-with-chflags
featured: false
draft: false
tags:
  - tools
description: ""
---

The `chflags` command in macOS is a command for quickly hiding or unhiding files and directories. It is particularly useful for managing the visibility of files by altering their flags.

## Unhiding files or Directories

You might need to access files located in the `Library` directory. On a new Mac setup, this directory is hidden by default, making it less accessible for everyday users.

To make a hidden file or directory visible, use the `nohidden` flag with the `chflags` command. For example, to unhide the `Library` directory:

```shell
chflags nohidden ~/Library
```

This command removes the `hidden` attribute and makes the `Library` directory visible in the Finder.

## Hiding files or directories

If you want to hide a file or directory, use the `hidden` flag. This is useful for decluttering your view or protecting sensitive files from accidental access. For example, to hide the `Library` directory again:

```shell
chflags hidden ~/Library
```

By using the `hidden` flag, the `Library` directory will no longer be visible in the Finder.

## Conclusion

The `chflags` command is powerful for managing file visibility on macOS.

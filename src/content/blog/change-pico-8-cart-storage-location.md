---
title: Change PICO-8 cart storage location on macOS
author: Aman Mittal
pubDatetime: 2025-02-19T00:00:01Z
slug: change-cursor-color-in-vscode
featured: false
draft: false
tags:
  - macos
  - pico-8
description: ''
---

PICO-8 stores its configuration and cartridges on macOS by default in the user Library directory:

```bash
/Users/Username/Library/Application Support/pico-8/carts/
```

While this location might work for some enthusiasts and game developers, I prefer to keep all of my hobby project's source code and saved files in a single directory. This approach makes it easier to manage backups without searching in multiple locations on my macOS.

**This default directory path is also defined in the PICO-8 configuration file** (`pico-8/config.txt`) under the `-root-path` parameter:

```plain
// Location of pico-8's root folder
root_path /Users/Username/Library/Application Support/pico-8/carts/
```

To change this location, you can edit the PICO-8 configuration file to point to your desired directory for storing cartridges. For example, I change it to:

```plain
root_path /Users/Username/Documents/Code/pico-8-carts/
```

Before making this change, close the PICO-8 app before editing the configuration file. Additionally, you must have opened the PICO-8 app at least once. Otherwise, there will be no `config.txt` file created if you have only copied the `PICO-8.app` to your `Applications` directory without launching it.

Finally, backing up your cartridges before changing the storage locations is important.

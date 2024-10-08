---
title: 'Bypass CORS to fetch files when working with localhost'
author: Aman Mittal
pubDatetime: 2023-05-24T03:42:51Z
slug: bypass-cors-when-working-with-localhost
featured: false
draft: false
tags:
  - cli
description: ''
---

Sometime back I learned about [opening files or directories using the `open` command from the CLI on a Mac](/blog/how-to-open-any-folder-from-terminal-in-finder-on-mac/). It's simple yet effective.

Another use case that I've been using it for is to open the current project when in `localhost` in the browser and bypass the CORS policy to fetch files that are also available locally.

```shell
open -a "Google Chrome Canary"  --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

The argument passed in the above command overrides the browser's default behavior.

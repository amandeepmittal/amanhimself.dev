---
title: Uninstall a Node.js version using Volta on macOS
author: Aman Mittal
pubDatetime: 2024-12-10T03:42:51Z
slug: uninstall-nodejs-version-using-volta
featured: false
draft: false
tags:
  - nodejs
description: ''
---

If you're using Volta to manage Node.js versions on your computer, you might have noticed that running `volta uninstall node@version` command doesn't work as expected. This expectation comes from using other [Node.js version managers like NVM](/blog/install-nodejs-using-nvm-on-macos-m1/#uninstall-a-nodejs-version), unlike Volta, which requires removing each version manually.

## Check all installed Node.js versions

Before removing any versions, to see a list of installed Node.js versions on your macOS, run:

```shell
volta ls node
```

This command will display all runtimes installed:

```shell
⚡️ Node runtimes in your toolchain:

    v18.17.1
    v20.12.2
    v20.17.0 (default)
    v22.4.0
    v22.11.0
```

The `default` is the version I am actively using.

## Remove a installed version manually

1. To remove a specific version, navigate to the Volta's installation directory:

```shell
cd ~/.volta/images/node
```

2. All Node.js runtimes are installed inside their own version directory. Delete a directory for the version you want to remove.

```shell
cd rm -rf v22.11.0
```

3. Verify the removal by running `volta ls node` again:

```shell
⚡️ Node runtimes in your toolchain:

    v18.17.1
    v20.12.2
    v20.17.0 (default)
    v22.4.0
```

## Complete Volta uninstallation

If you need to remove Volta entirely from your macOS, you can delete the `.volta` directory:

```shell
rm -rf ~/.volta
```

## Summary

Compared to tools like nvm, Volta's approach to Node.js version management is a lot more different considering this manual process.

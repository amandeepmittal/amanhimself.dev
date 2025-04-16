---
title: Resolve merge conflicts with git rebase
author: Aman Mittal
pubDatetime: 2023-06-23T03:42:51Z
slug: resolve-merge-conflicts-with-git-rebase
featured: false
draft: false
tags:
  - git
description: ''
---

Resolving merge conflicts can sometimes be difficult, and using the GitHub UI may not always be the most effective solution. As the complexity of the conflicts increases, it may be necessary to rely on tools on your local machine rather than the web interface provided by GitHub.

I have discovered that using the `git rebase` command is a useful method for resolving merge conflicts in my feature branch before merging it into the `main` branch. Although it took some time to fully understand the process and the necessary steps.

## Problem

I have been working on a `feature-branch` in an open-source repository for work for quite some time. However, recent commits merged into the main branch have caused conflicts in my branch, preventing me from merging my own commit. I have two options to proceed:

- Resolve the conflicts to merge the branches.
- Create a new pull request if the conflicts are too complex and my changes are of low priority.

## Solution: Resolve conflicts with git rebase

Using `git rebase` in the `feature-branch` allows to bring changes from the `main`, and resolve the merge conflicts. Then, I can use VS Code (which has a Resolve merge conflict editor and is pretty handy) and push the changes back to my feature branch. Once the conflicts are resolved, I can merge my branch into the `main` without any issues which will make GitHub happy.

### 1: Fetch the latest changes from the main

Open a fresh terminal tab, and navigate into the repository. On the `main` branch, run:

```shell
git pull
```

This makes sure that the local copy of the `main` branch on my machine has all the latest changes.

### 2: Run git log to verify

Running `git log` helps verifying that `main` branch has all the latest commits:

```shell
git log --oneline --graph --decorate --color

# I use an alias: glog
```

### 3: Checkout to the feature-branch

Time to switch to the `feature-branch`:

```shell
git checkout feature-branch

# I use an alias: gck feature-branch
```

### 4: Run git rebase to bring changes from the main

To bring changes from the `main` to the `feature-branch`, run:

```shell
git rebase main
```

Then run `git status` to know the status of the branch:

```shell
git status

# I use an alias: gs
```

### 5: Resolve merge conflicts

If there are merge conflicts, running `git status` will let you know. Open VS Code, click on open Resolve Merge Conflict editor and you can now accept changes in the left tab which shows the latest changes from `main` branch.

On the right side, changes from the current `feature-branch` (probably the ones that are causing conflicts) are shown.

After resolving conflicts, save the file and from the terminal run the following command to stage the modified files:

```shell
git add file-name

# I use an alias: ga file-name

# In case, multiple files modified and need to be staged, run:
git add .
```

Then, run `git status` once again to see if the modified files are staged.

Then run the following command to commit those changes:

```shell
git commit -m "commit message..."

# I use an alias: gc "commit message..."
```

### 6: Continue the rebase

Run `git rebase` command with `--continue` flag to continue the rebase process:

```shell
git rebase --continue
```

> **Tip:** If required, save changes by pressing `:wq!` in the terminal.

### 7: Verify new commits

Run the following command to verify that the new commits from `feature-branch` are at the top of the commit history and changes from the `main`:

```shell
git log --oneline --graph --decorate --color

# I use an alias: glog
```

### 8: Commit changes from local to remote

Finally, push the changes from the local `feature-branch` to the remote `feature-branch`:

```shell
git push --force
```

## Summary

A few added rules I think are worth mentioning in this process:

- Only use rebase for local branches and if you are the owner of that branch.
- If you anticipate that the conflicts can become messy, use the strategy described above at regular intervals to avoid a lot of conflicts.

> A big thank you to my colleague [Sundeep Peswani](https://www.sundeeppeswani.com/) for teaching this via live coding and jumping on a call to help me understand the process and making my life easier.

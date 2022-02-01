---
title: 'How to rename default branch in Git and GitHub'
date: '2022-01-10'
thumbnail: '/thumbnails/git.png'
slug: 'how-to-rename-default-branch-name-in-git-and-github'
tag: 'git'
canonicalUrl: 'https://amanhimself.dev/blog/how-to-rename-default-branch-name-in-git-and-github/'
---

I'm currently [maintaining a GitHub repo](https://github.com/amandeepmittal/react-native-examples) that has grown over the last year. It primarily contains all the example code that I create when working on React Native and Expo articles and tutorials.

Recently, I switched the default branch to `main`. Here are the steps I took. All of these commands execute inside a terminal window.

Start by moving the default branch locally using the `-m` flag.

```shell
git branch -m master main
```

Above, `master` is the old branch name and `main` is the new branch name.

Set the new branch as the local default on the remote. By default, Git doesn't allow renaming a remote branch.

```shell
git push -u origin main

# output
* [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Set the current local HEAD branch to point to the new branch on GitHub.

```shell
git remote set-head origin main
```

Now, go to the GitHub repo. Open Settings > Branches. Under Default Branch, click the edit button to switch to the `main` branch.

![ss1](https://i.imgur.com/T9Mm8g5.png)

Now, go back to the terminal window and run the following command to delete the previous default branch name.

```shell
git push origin --delete master

# output
To https://github.com/account/repo.git
- [deleted]         master
```

That's it!

---
title: 'How to push local git tag to remote repository on GitHub'
date: '2022-06-26'
slug: 'push-local-git-tag-to-remote-repository-on-github'
thumbnail: '/thumbnails/git.png'
tag: 'git'
canonicalUrl: 'https://amanhimself.dev/blog/push-local-git-tag-to-remote-repository-on-github/'
---

After creating a git tag locally on a local project, I needed to push it on GitHub. The reason is that I'm hosting the project repository on GitHub.

## Pushing a tag to GitHub

Pushing a tag in git is similar to pushing a branch. The only difference is that it needs the specific git tag name.

```shell
git push -u origin <tag_name>
```

Here is an example. I had already created a new tag, `v0.1` on my local project. To push it to GitHub, I had to run:

```shell
gpush v0.1
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/amandeepmittal/[project-name].git
 * [new tag]         v0.1 -> v0.1
```

Note: I use the `gpush` alias for `git push -u origin`. Complete list of all the aliases I use for git, check this [dotfile](https://github.com/amandeepmittal/dotfiles/blob/master/.zshrc).

## Checking for if a tag is already pushed

To check if a tag is only available on local, run:

```shell
git push --tags --dry-run
```

The `--dry-run` option in the above command summarizes what will be included in the next commit.

If the output of the above command states `Everything up-to-date`, it means there are no tags available to push.

In case when the above command comes back with an output like the below, it means that the tag is available to push.

```shell
To https://github.com/amandeepmittal/[project-name].git
 * [new tag]         v0.1 -> v0.1
```

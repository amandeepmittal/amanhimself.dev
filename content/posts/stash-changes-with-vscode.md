---
title: 'Stash changes in a git repository with VS Code'
date: '2023-10-26'
slug: 'stash-changes-with-vscode'
thumbnail: '/thumbnails/vscode.png'
tag: 'vscode'
canonicalUrl: 'https://amanhimself.dev/blog/stash-changes-with-vscode/'
---

`git stash` is a useful command that allows one to shelve current changes in a Git repository temporarily. This can be done without committing the changes anywhere, making it possible to return to them later.

## Stash using VS Code

Visual Studio Code (VS Code) is a highly capable code editor that offers many well-thought-out functionalities. Even after using it for years, I still find new things about it.

Using in-built **Source Control**, you can quickly view the modified files and temporarily save them by stashing them:

- In VS Code, go to the Source Control tab.
- Click the three-dotted menu (`...`) next to Source Control to open a dropdown menu.
- In the menu, select **Stash** > **Stash (Include Untracked)**.
- That's it. The file changes are now stashed locally.

![Stashing changes locally using VS Code](/images/stash-option-vscode.png)

## Bring the latest stashed changes to a branch

Let's assume you've now created a new branch where you want to bring those changes that are saved temporarily.

- In VSCode's Source Control, open the dropdown menu.
- Select **Stash** > **Apply Latest Stash**.

![Stashing changes locally using VS Code](/images/apply-stash-in-branch.png)

You can now bring those changes to the current branch and commit them.

## Conclusion

Stashing is particularly useful when you want to fix something and keep those changes around so that you can return to them later. Collecting the stashed changes can result in a new branch, where local changes can be brought later on.

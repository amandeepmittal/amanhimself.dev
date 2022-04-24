---
title: 'How to use iOS simulator in full-screen'
date: '2021-09-15'
slug: 'how-to-use-ios-simulator-in-full-screen'
thumbnail: '/thumbnails/xcode.png'
tag: 'xcode'
canonicalUrl: 'https://amanhimself.dev/blog/how-to-use-ios-simulator-in-full-screen/'
---

When working on React Native or Expo applications, it is important to create focus to get in a flow. Sometimes, there are a lot of tasks to cover and very little time. To help focus on the task ahead, one way to speed up development is to use full-screen mode for iOS simulators. For example, a focused environment on my laptop screen includes zero visibility for Dock and the menu bar.

Before Xcode version 12, the full-screen support was hidden behind a user flag. The below command can be run to solve the issue for older Xcode versions.

```shell
defaults write com.apple.iphonesimulator AllowFullscreenMode -bool YES
```

With the latest version of Xcode and each new macOS version trying to outperform its previous one, it has never been easy to enable full-screen mode for an iOS simulator.

![ss1](https://i.imgur.com/mvSX1u2.png)

In the above image, observe that [VSCode editor](setup-macbook-m1) is on the left and the iOS simulator is on the right.

To enter the full-screen mode, click on the resize window icon (green icon) on the application (iOS simulator and the editor/IDE of your choice).

![ss2](https://i.imgur.com/nhkQdNs.png)

Then, you can position one application on the left and another on the right.

![ss3](https://i.imgur.com/ZjU2UUi.gif)

It's already challenging to keep distractions at bay. But, sometimes, a little bit of focus can go a long way.

---
title: 'How to show Touch indicator on iOS simulator'
date: '2022-04-03'
slug: 'show-touch-indicator-on-ios-simulator'
thumbnail: '/thumbnails/xcode.png'
tag: 'xcode'
canonicalUrl: 'https://amanhimself.dev/blog/show-touch-indicator-on-ios-simulator/'
---

Sometimes it is necessary to highlight a single touch event on the iOS simulator's screen and show the tap that registers it. For example, this is useful when recording a video or a [gif](https://en.wikipedia.org/wiki/GIF) using the simulator.

The iOS simulator comes with a pre-configured list of settings, including to display the touch indicator. However, sometimes, it is hard to find them.

## Enable Touch Indicator on iOS simulator

To enable the touch indicator, open the terminal window and run the following command:

```shell
defaults write com.apple.iphonesimulator ShowSingleTouches 1
```

It accepts a boolean value of `1`.

After running the command, if the iOS simulator is already running, close and restart it.

To test it out, open the simulator and tap on the screen.

![ss1](https://i.imgur.com/h31kDO1.gif)

## Disable Touch Indicator on iOS simulator

To disable the touch indicator from the terminal window, run the following command to change the boolean value to `0`:

```shell
defaults write com.apple.iphonesimulator ShowSingleTouches 0
```

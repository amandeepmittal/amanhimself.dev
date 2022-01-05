---
title: 'How to solve RCTBridge required dispatch_sync to load warning on iOS for React Native'
slug: 'rctbridge-required-dispatch-sync-to-load-warning'
date: '2021-09-04'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/rctbridge-required-dispatch-sync-to-load-warning/'
---

The _RCTBridge required dispatch_sync to load RCTDevLoadingView_ has become a common occurence when developing React Native apps with version `0.64` and `0.65`.

![ss1](https://i.imgur.com/IqzhnvQ.png)

I came across this warning when installing packages like:

- react-native-bootsplash
- react-navigation v6

Recently, I came across an open issue on [github.com/facebook/react-native](https://github.com/facebook/react-native/issues/16376) that contains the following resolution for this.

Open the file `./ios/AppName/AppDelegate.m`. First, add the following just after the import statement `#import "AppDelegate.h"`:

```c
#import "AppDelegate.h"

// Add this
#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif
// ---------------
```

Then, in the `@implementation AppDelegate`, before `RCTRootView`, add the following:

```c
  #if RCT_DEV
    [bridge moduleForClass:[RCTDevLoadingView class]];
  #endif

  RCTRootView *rootView ...
```

Build the iOS app again by running:

```shell
yarn run ios

# or

npx react-native run-ios
```

The warning will be gone now.

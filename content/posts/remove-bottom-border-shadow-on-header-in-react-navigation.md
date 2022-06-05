---
title: 'Remove bottom border or shadow on header in React Navigation'
slug: 'remove-bottom-border-shadow-on-header-in-react-navigation'
date: '2022-06-05'
thumbnail: '/thumbnails/react-navigation.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/remove-bottom-border-shadow-on-header-in-react-navigation/'
---

<!-- ![cover_image](https://i.imgur.com/eR9PDvq.png) -->

React Navigation is an amazing navigation library in React Native ecosystem. I have been a big fan because it allows a lot of customization when using different navigators (such as Stack, Tab, or Drawer).

One of the customizations that can be done is to remove the border at the bottom of the header. By default, the Stack and Tab Navigators in this library add a header on a screen. This header has a default bottom border or shadow.

Here is an example of a border on the header on iOS:

![ss1](https://i.imgur.com/PnxIHxT.png)

The orange arrows are used to highlight the shadow. Similarly, on Android, the width is thin and hard to notice.

![ss2](https://i.imgur.com/MoP6J0t.png)

To make it more visible, you can populate the `screenOptions` of the navigator as shown below:

```js
screenOptions={{
  headerStyle: {
    borderBottomWidth: 4,
  },
}}
```

Increasing the value of the property `borderBottomWidth` will make the border thicker.

![ss3](https://i.imgur.com/I7l8INR.png)

At times, the UI of the screen might not require a header border or shadow at all. In such cases, you can always customize the `screenOptions` by adding the property `headerShadowVisible` and setting it to `false`.

```js
screenOptions={{
  headerShadowVisible: false,
}}
```

You will get the desired output both on iOS and Android:

![ss4](https://i.imgur.com/bBQuIJJ.png)

![ss5](https://i.imgur.com/NId2zbQ.png)

## Conclusion

[React Navigation docs](https://reactnavigation.org/) are a great asset for learning more about the library and what customization options it provides.

Also, check out my other post on [how to remove the bottom tab bar border in React Navigation](https://amanhimself.dev/blog/react-navigation-remove-tab-bar-border/).

[Source code available at GitHub](https://github.com/amandeepmittal/react-native-examples/tree/main/remove-header-border-react-navigation)

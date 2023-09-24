---
title: 'Remove bottom border or shadow on header in React Navigation or Expo Router'
slug: 'remove-bottom-border-shadow-on-header-in-react-navigation'
date: '2023-09-24'
thumbnail: '/thumbnails/react-navigation.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/remove-bottom-border-shadow-on-header-in-react-navigation/'
---

> **Update:** This blog post was originally written on June 5, 2022. It is now up-to-date to include Expo Router relevant information.

Expo Router and React Navigation are both amazing navigation libraries in the React Native ecosystem. I have been a big fan of React Navigation as I have used it for a while but lately, I have started using Expo Router.

Both libraries share `screenOptions` since Expo Router is built on top of React Navigation. Using these options, the border at the bottom of the header can be removed. By default, the Stack and Tab Navigators in the React Navigation library add a header on the screen. Expo Router version 2 also follows the same pattern. The example described in this blog post applies to both libraries.

## Header with a shadow

The header has a default bottom border or shadow. Here is an example of a border on the header on iOS:

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

## Disable the shadow

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

To learn more about navigation in React Native apps, [React Navigation docs](https://reactnavigation.org/) are a great asset for learning more about the library and what customization options it provides. Also, see [Expo Router](https://docs.expo.dev/routing/introduction/) documentation if you want to implement file-based routing.

Also, check out my other post on [how to remove the bottom tab bar border in React Navigation](https://amanhimself.dev/blog/react-navigation-remove-tab-bar-border/).

> [Source code available at GitHub.](https://github.com/amandeepmittal/react-native-examples/tree/main/remove-header-border-react-navigation)

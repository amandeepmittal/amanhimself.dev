---
date: '2021-10-14'
title: 'How to avoid notches with Safe Area Context in React Native apps'
thumbnail: '/thumbnails/react.png'
slug: 'safe-area-context-in-react-native-apps'
tag: 'expo'
canonicalUrl: 'https://amanhimself.dev/blog/safe-area-context-in-react-native-apps/'
---

Most devices nowadays come with a notch or some kind of status bar. Therefore, when building a mobile application using React Native, it is vital to ensure that the content of an app screen is rendered correctly across different types of devices.

In this article, let's take a look at two different approaches to make app screens in React Native to avoid the content being positioned behind a notch or status bar.

The first approach will discuss `SafeAreaView` component from React Native components API. The second approach will discuss the advantage of using [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context#readme) open source library and how it provides a cross-platform solution.

## The Notch Problem

When you are starting to build a screen in React Native app, you might add use the following code snippet to display text:

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={[styles.container]}>
      <View style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 28, color: 'white' }}>Hello World</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
});
```

The above code snippet has a parent `View` component with a background color of `red`. It wraps another `View` component with a background color of `blue` that contains a `Text` component to display some text on the screen.

This will display the content of the app screen on an iOS device as shown below:

![ss1](https://i.imgur.com/Qfizjpr.png)

The contents of the nested `View` component hides behind the status bar and the notch on the iOS device.

On an Android device, the behavior is exactly the same:

![ss2](https://i.imgur.com/RY1tEfz.png)

## How to Use the SafeAreaView component from React Native

One approach is to use [SafeAreaView component](https://reactnative.dev/docs/safeareaview) available in React Native.

```js
import { SafeAreaView } from 'react-native';
```

It can be used in the place of the top-level `View` component. It renders content within the safe area boundaries around the nested content and automatically applies padding.

Modify the previous code snippet:

```js
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 28, color: 'white' }}>Hello World</Text>
      </View>
    </SafeAreaView>
  );
};
```

It works perfectly on iOS:

![ss3](https://i.imgur.com/Mve0Nhu.png)

In React Native, this component is only applicable to iOS devices with iOS version 11 or later. Unfortunately, that means it doesn't work for Android devices as the screen's content is still behind the status bar.

## How to Use React Native's Safe Area Context Library

To use a cross-platform solution to handle safe areas on notch devices, there is a library called [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context). It provides a flexible API to handle safe area insets in JS and works on iOS, Android, and Web.

Start by installing it in your React Native app:

```shell
# for plain React Native apps
yarn add react-native-safe-area-context

# install pod dependency for iOS only
npx pod-install

# for Expo apps
expo install react-native-safe-area-context
```

This library provides a `SafeAreaProvider` that needs to wrap either your Root Navigator or the screen where you want to handle safe area insets.

For example, in the code snippet below, the `SafeAreaProvider` wraps the `HomeScreen` component since there is only one screen in the example app.

```js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from './src/screens';

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
```

Now, you can import the `SafeAreaView` component from the `react-native-safe-area-context` library and replace it with the one from React Native.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 28, color: 'white' }}>Hello World</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
});
```

It works both for iOS and Android:

![ss4](https://i.imgur.com/lfOTL3J.png)

If you give the nested `View` component, a property of `flex: 1` as:

```js
<View style={{ backgroundColor: 'blue', flex: 1 }}>
```

You can observe the safe are edges for iOS:

![ss5](https://i.imgur.com/86uwW7N.png)

The `SafeAreaView` acts like a regular `View` component from React Native and includes additional padding to position the content after the notch or the status bar of a device.

It also comes with an `edges` prop that customizes safe area insets around different edges such as top, bottom, left, and right.

## How to Use the useSafeAreaInsets Hook

Another advantage of using this library is that it provides a hook called `useSafeAreaInsets`. It offers more flexibility. It also gives more control, and you can apply padding for each edge using a property from this hook. For example, a `View` component below uses only wants the padding to be applied at the top edge:

```js
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top
      }}
    >
      {children}
    </View>
  );
};
```

## Conclusion

Handling status bars and notches across different devices become seamless with the [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context#readme) library. Try it out in your next React Native app.

_[Source code at this GitHub repository](https://github.com/amandeepmittal/react-native-examples/tree/master/rnSplashAndIconExample)_

_This post was also published at [freeCodeCamp](https://www.freecodecamp.org/news/how-to-use-safe-area-context-to-avoid-notches-in-react-native-apps/)._

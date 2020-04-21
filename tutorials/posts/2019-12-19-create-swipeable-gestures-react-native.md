---
date: 2019-12-19
title: 'Create Swipeable Gestures for cross-platform React Native Apps'
template: post
thumbnail: '../thumbnails/react.png'
slug: create-swipeable-gestures-react-native
categories:
  - React Native
tags:
  - react-native
---

![cover_image](https://blog.jscrambler.com/content/images/2019/12/jscrambler-blog-creating-swipeable-gestures-react-native.jpg)

React Native's built-in touch system [Gesture Responder system](http://facebook.github.io/react-native/docs/gesture-responder-system.html) has performance limitations on both iOS and Android platforms. To overcome this and a few other problems with the built-in Gesture system, there is an open-source library that you can use to create awesome gestures in your React Native apps.

The library [`react-native-gesture-handler`](https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html) not only overcomes the performance issue on each native platform, but it also uses touchables that run in the native thread and follow default platform behavior. In other words, it uses native support to handle gestures. There are many gestures supported by this library at the moment, but let us take a look at one of the most useful ones: **Swipeable**.

Here is the link to the [Github repo](https://github.com/amandeepmittal/swipeGesturesDemo) with the complete code used in this tutorial.

## Getting Started

To get started, create a bare react native project using `react-native` CLI by running the below commands from a terminal window.

```shell
react-native init swipeableGestures

# after the project directory is created
# and dependencies are installed
cd swipeableGestures
```

Since you are at the initial stage of the demo, let us set up the main list to render. This list is going to have three items that will cover the different and common usage with `Swipeable` component you can add in your React Native app. Most of these use cases, you are already using in modern apps both on iOS and Android platform.

Open, `App.js`, and add the following content. The following is just a simple flatList component that renders data items from an array of mock data named `mockDataList` outside the `App` component.

```js
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';

const mockDataList = [
  { id: '1', text: 'Swipe me left!' },
  { id: '2', text: 'Swipe me right!' },
  { id: '3', text: 'Try swiping in both directions' }
];

const Separator = () => <View style={styles.itemSeparator} />;

const ListItem = ({ text }) => (
  <View style={{ paddingVertical: 20 }}>
    <Text style={{ fontSize: 24 }}>{text}</Text>
  </View>
);

const App = () => {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mockDataList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ListItem {...item} />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#444'
  }
});

export default App;
```

To run the demo app, depending on your OS, run one command from below:

```shell
# for macOS
react-native run-ios

# for windows/linux
react-native run-android
```

The above code will render the following output:

![ss1](https://i.imgur.com/qaIPm0f.png)

## Adding react-native-gesture-handler

The `react-native-gesture-handler` supports both react-native CLI projects and Expo projects. To install it, execute the below command:

```shell
yarn add react-native-gesture-handler
```

For the current demo, since you are using `react-native` CLI, only Android users have to add the following configuration `MainActivity.java` file.

```java
package com.swipegesturesdemo;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

 /**
 * Returns the name of the main component registered from JavaScript. This is used to schedule
 * rendering of the component.
 */
 @Override
 protected String getMainComponentName() {
 return "swipeGesturesDemo";
 }

 @Override
 protected ReactActivityDelegate createReactActivityDelegate() {
 return new ReactActivityDelegate(this, getMainComponentName()) {
 @Override
 protected ReactRootView createRootView() {
 return new RNGestureHandlerEnabledRootView(MainActivity.this);
 }
 };
 }
}
```

For iOS users, navigate inside `ios/` directory from the terminal and run `pod install`.

Everything is set up, all you have to do is run the build command again, such as for iOS: `react-native run-ios`.

You won't see anything new changes inside the app for now, but if it renders correctly as our previous step that means everything is working as expected.

## The Swipeable Component

To implement swipeable rows, start by importing `Swipeable` component in `App.js` file.

```js
import Swipeable from 'react-native-gesture-handler/Swipeable';
```

This component is going to wrap to the component that is going to handle actions based on swipe gestures. Looking back at the `App.js` file, it is the `View` rendered by the `ListItem` component.

```js
const ListItem = ({ text }) => (
  <Swipeable renderLeftActions={LeftActions}>
    <View style={{ paddingVertical: 20 }}>
      <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>{text}</Text>
    </View>
  </Swipeable>
);
```

The `Swipeable` has many properties including the one used in the above code snippet: `renderLeftActions`. It is a method that returns an action panel when the user swipes right on the list item. One the swipe, the action reveals.

To make it look more useful, let us define the custom component `LeftActions`.

```js
const LeftActions = () => {
  return (
    <View
      style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center' }}
    >
      <Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600'
        }}
      >
        Left Action
      </Text>
    </View>
  );
};
```

Below is the demo of what you have done so far:

![ss2](https://i.imgur.com/sOZAZ15.gif)

## Animating the Swipeable Component

Using React Native's `Animated` API, you can add animations. `LeftActions` has two arguments:

- `progress`: the amount that it has been swiped
- `dragX`: this determines how far the drag happens

Using [interpolation](https://facebook.github.io/react-native/docs/animations#interpolation) you can scale the values of the input and the output range. An interpolation maps input and output ranges using linear interpolation. Using `extrapolate` property together with input and output ranges, the curve would not go beyond the two ranges provided.

Here is the complete code snippet for `LeftActions` component so far.

```js
// do not forget to import Animated from 'react-native'

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  // add this
  Animated
} from 'react-native';

// LeftActions code snippet

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  return (
    <View
      style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center' }}
    >
      <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          transform: [{ scale }]
        }}
      >
        Left Action
      </Animated.Text>
    </View>
  );
};
```

The value provided to the input range is in pixels. Here is the demo:

![ss3](https://i.imgur.com/PPLkLm0.gif)

Without providing the `extrapolate` property, the result is not going to be as expected or as in the above demo. It will keep on enlarging the text. Here is a demo without using the property.

![ss4](https://i.imgur.com/ktho6XA.gif)

## Building the Swipeable component from right

Since you have gone through the basics of what `LeftActions` does and combining it with `Animated` provides a useable feature.

In emailing apps or messaging apps like WhatsApp, you might have that when you swipe right there are often two actions coupled together. Using the same knowledge, try to create it own the right swipe. First, provide the `renderRightActions` which is similar in the concept but works exactly opposite to `renderRightActions`.

```js
<Swipeable renderLeftActions={LeftActions} renderRightActions={RightActions}>
  {/*... Rest of the code remains same*/}
</Swipeable>
```

Next, create a `RightActions` component with the same set of arguments required for the `Animated` API. There are two actions to be defined with their own set of `View` components.

```js
const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0]
  });
  return (
    <>
      <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
        <Animated.Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '600',
            transform: [{ scale }]
          }}
        >
          Delete
        </Animated.Text>
      </View>
      <View style={{ backgroundColor: 'green', justifyContent: 'center' }}>
        <Animated.Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '600',
            transform: [{ scale }]
          }}
        >
          Archive
        </Animated.Text>
      </View>
    </>
  );
};
```

Here is the demo for the right actions.

![ss5](https://i.imgur.com/HAdMt75.gif)

Do you notice any difference in the way they scale? The `inputRange` and the `outputRange` values are now reversed since the user is swiping from right to left.

## Adding actions on the touch

To make the right actions touchable, let us import the `TouchableOpacity` from `react-native`.

```js
import {
  //...
  TouchableOpacity
} from 'react-native';
```

Next, wrap both the views in `RightActions` with its on `TouchableOpacity` component and for now, pass on an alert message to indicate which button is being pressed.

```js
const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0]
  });
  return (
    <>
      <TouchableOpacity onPress={() => alert('Delete button pressed')}>
        <View
          style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}
        >
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: '600',
              transform: [{ scale }]
            }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Archive button pressed')}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            justifyContent: 'center'
          }}
        >
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: '600',
              transform: [{ scale }]
            }}
          >
            Archive
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
```

Here is the demo:

![ss6](https://i.imgur.com/EyVg0Ut.gif)

## Conclusion

`Swipeable` is a useful component to start when it comes to using `react-native-gesture-handler` library. I often find this library so useful, that I recommend you to go through its [official documentation and methods](https://kmagiera.github.io/react-native-gesture-handler/docs/component-swipeable.html#renderleftactions) and try other gestures as well.

---

Originally published at [Jscrambler](https://blog.jscrambler.com/creating-swipeable-gestures-with-react-native-gesture-handler/)

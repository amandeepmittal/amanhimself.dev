---
date: 2019-12-16
title: 'How to use Pinch to Zoom Gesture in React Native apps'
template: post
thumbnail: '../thumbnails/react.png'
slug: pinch-to-zoom-gesture
categories:
  - React Native
tags:
  - react-native
---

The open-source library [`react-native-gesture-handler`](https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html) is a great way to add gestures to cross-platform React Native apps. Two of the main reasons I find this useful because it uses native support to handle gestures and the other reason being it is better at performing on each native platform than React Native's built-in touch system [Gesture Responder system](http://facebook.github.io/react-native/docs/gesture-responder-system.html).

In this tutorial, let us explore this library by creating a small demo that allows the user to use their two fingers to pinch in to zoom a media content. For the media content, I am going to use a placeholder image. This pinch gesture is achievable by using `PinchGestureHandler` from the library. This handler tracks the distance between two fingers and uses that information to scale or zoom on the content. It gets activated when the fingers are placed on the screen and when their position changes.

## Table of contents

- Requirements
- Setting up react-native-gesture-handler
- Set up App component to display an image
- Using dynamic Image component with Animated API
- Adding Animated event and state change handler
- Conclusion

## Requirements

- Node.js >= `10.x.x`version installed
- watchman
- react-native-cli

Do note that I’m going to use an iOS simulator for this tutorial.

## Setting up react-native-gesture-handler

To get started, create a bare react native project using `react-native` CLI by running the below commands from a terminal window.

```shell
react-native init pinchZoomGesture

# after the project directory is created
# and dependencies are installed
cd pinchZoomGesture
```

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

Everything is set up, all you have to do is run the build command again, such as for iOS: `react-native run-ios` and for Android: `react-native run-android`.

## Set up App component to display an image

In this section, let us quickly set up the `App` component to display a placeholder image. You can use any image as a placeholder. Here is the snippet for the `App.js` file to get started.

```js
import React from 'react';
import { Image, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{
          uri: 'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg'
        }}
        style={{
          width: width,
          height: 300
        }}
        resizeMode='contain'
      />
    </View>
  );
};

export default App;
```

It uses the `width` of the device's screen to calculate the width of the image using `Dimensions` from `react-native`. To run this demo for the first time build the app for the platform you are using:

- for iOS, run: `react-native run-ios`
- for Android, run: `react-native run-android`

Here is the output when the app runs for the first time.

![hb1](https://miro.medium.com/max/509/1*hsKP461mx3NDf28ZeJZH6w.png)

## Using dynamic Image component with Animated API

`Animated.Image` is going to serve the purpose of displaying an image as well as perform scale animations.

`Animated` API uses declarative relationships between input and output values. For single values, you can use `Animated.Value()`. It is required since it is going to be a style property initially.

Start by importing `Animated` from `react-native` and replace the `Image` with `Animated.Image`.

```js
import { View, Dimensions, Animated } from 'react-native';

// in return statement
return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Animated.Image
      source={{
        uri: 'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg'
      }}
      style={{
        width: width,
        height: 300,
        transform: [{ scale: 1 }]
      }}
      resizeMode='contain'
    />
  </View>
);
```

Also, by mentioning the value of the `scale` to one, it is going to display the image as usual.

Now, wrap the `Animated.Image` with `PinchGestureHandler`. Ths wrapper component is going to have two props.

```js
return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <PinchGestureHandler
      onGestureEvent={this.onZoomEvent}
      onHandlerStateChange={this.onZoomStateChange}
    >
      <Animated.Image
        source={{
          uri: 'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg'
        }}
        style={{
          width: width,
          height: 300,
          transform: [{ scale: this.scale }]
        }}
        resizeMode='contain'
      />
    </PinchGestureHandler>
  </View>
);
```

## Adding Animated event and state change handler

Let us define the `onZoomEvent` first, before the `return` statement. This event is going to be an Animated event. This way [gestures can directly map to animated values](https://facebook.github.io/react-native/docs/animated#handling-gestures-and-other-events). The animated value to be used here is `scale`.

Passing `useNativeDriver` as boolean true allows the animations to happen on the native thread instead of JavaScript thread. This helps with performance.

```js
scale = new Animated.Value(1);

onZoomEvent = Animated.event(
  [
    {
      nativeEvent: { scale: this.scale }
    }
  ],
  {
    useNativeDriver: true
  }
);
```

Now define the handler method `onZoomStateChange` that handles the state change when the gesture is over. Each gesture handler has is assigned a state that changes when a new touch event occurs.

There are different possible states for every handler but for the current gesture handler, `ACTIVE` is used to check whether the event is still active or not. To access these states, the object is required to import from the library itself.

The `Animated.spring` on `scale` property has `toValue` set to `1` which is the initial scale value when the animation is done.

```js
onZoomStateChange = event => {
  if (event.nativeEvent.oldState === State.ACTIVE) {
    Animated.spring(this.scale, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  }
};
```

This completes all the configuration and handler required. Look at the demo below to see it in action.

![hb2](https://miro.medium.com/max/380/1*AgRorpXREtq4fwyF9qMpJw.gif)

## Conclusion

This completes the tutorial on how to use one of the gestures from the `react-native-gesture-handler` library. I recommend you to go through its [official documentation and methods](https://software-mansion.github.io/react-native-gesture-handler/docs/about-handlers.html) and try other gestures as well.

You can find the complete code at **[this GitHub repo](https://github.com/amandeepmittal/pinchZoomGesture)**.

---

Originally published at [Heartbeat.fritz.ai](https://heartbeat.fritz.ai/how-to-use-the-pinch-to-zoom-gesture-in-react-native-apps-34346dbc653f)

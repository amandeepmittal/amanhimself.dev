---
title: 'How to Animate a Header View on Scroll With React Native Animated'
slug: 'animate-header-view-on-scroll-with-react-native-animated-api'
date: '2020-10-01'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://blog.jscrambler.com/how-to-animate-a-header-view-on-scroll-with-react-native-animated/'
---

![cover_image](https://i.imgur.com/qDKlX8L.jpg)

The [Animated](https://reactnative.dev/docs/animated.html) library from React Native provides a great way to add animations and give app users a smooth and friendlier experience.

In this tutorial, let's explore a way to create a header view component that animates on the scroll position of the `ScrollView` component from React Native. We will go through the basics of creating a new Animated value as well as explaining the significance of functions and properties like `interpolation`, `extrapolate`, `contentOffset`, and so on.

[The source code is available at GitHub](https://github.com/amandeepmittal/react-native-examples/tree/master/animate-header-on-scroll).

## Prerequisites

To follow this tutorial, please make sure you are familiarized with JavaScript/ES6 and meet the following requirements on your local dev environment.

- [Node.js](https://nodejs.org/) version >= 12.x.x installed
- Have access to one package manager such as npm or yarn
- [expo-cli](https://github.com/expo/expo-cli) version installed or use npx

The example in the following tutorial is based on Expo SDK 38.

## Installing dependencies

Start by creating a new React Native app generated with `expo-cli`. Do note that all the code mentioned in this tutorial works with plain React Native apps as well. Open up a terminal window and execute the following command:

```shell
npx expo-cli init animate-header-example

# after the project is created, navigate into the directory
cd animate-header-example
```

To handle devices with notch both on iOS and Android operating systems, let's install some libraries first. These libraries are going to add automatic padding on notch devices such that the main view of the app does not intersect with a safe area on notch-enabled devices. Run:

```shell
expo install react-native-safe-area-view react-native-safe-area-context
```

To use safe area views, wrap the root of the React Native app with `SafeAreaProvider` from the [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) library. Open `App.js` and modify the it as shown below:

```js
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </SafeAreaProvider>
  );
}
```

Next, wrap the contents of the `App` component with `SafeAreaView` from the [react-native-safe-area-view](https://github.com/react-navigation/react-native-safe-area-view) library. It is going to have a `style` prop with a `flex` of value `1` and another prop called `forceInset`. It’s important we add this, especially for some Android devices which might not behave as expected. This prop is going to force the application to add an inset padding on the content view. Setting the value of `top: always` will always imply that padding is forced at the top of the view.

```js
// ... other import statements
import SafeAreaView from 'react-native-safe-area-view';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

Here is what happens on an Android device when `forceInset` is not used on `SafeAreaView`:

![ss1](https://i.imgur.com/uBdAKZ4.jpg)

And with the `forceInset` prop applied:

![ss2](https://i.imgur.com/xNZx2rq.jpg)

On iOS, the behavior is as expected:

![ss3](https://i.imgur.com/HXHJRv9.png)

The last step in this section is to create a new component file called `AnimatedHeader.js` inside the `components/` directory. For now, it is going to return nothing.

```js
import React from 'react';
import { Animated, View } from 'react-native';

const AnimatedHeader = () => {
  return null;
};

export default AnimatedHeader;
```

Make sure to import it in the `App.js` file:

```js
// ... after other import statements
import AnimatedHeader from './components/AnimatedHeader';
```

## Creating an animated header component

The animation on the position of the scroll on a `ScrollView` component is going to have an `Animated.Value` of `0`. To create an animation, `Animated.Value` is required. In the `App.js` file, import `useRef` from the React library. Then, define a variable called `offset` with a new `Animated.Value`. To use the Animated library from React Native, import it as well.

```js
import React, { useRef } from 'react';
import { Text, View, Animated } from 'react-native';
// ...other import statements

export default function App() {
  const offset = useRef(new Animated.Value(0)).current;

  // ...
}
```

For this example, it is not required to use the `useRef` hook; however, if you are looking forward to modifying the animated value, it is recommended to use `useRef`. It provides a `current` property that is persisted throughout a component's lifecycle.

The value of the `offset` can now be passed as a prop to the `AnimatedHeader` component.

```js
export default function App() {
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        {/* Add the following AnimatedHeader */}
        <AnimatedHeader animatedValue={offset} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

To access the safe area inset value inside the `AnimatedHeader` component, the library `react-native-safe-area-context` provides a hook called `useSafeAreaInsets()`. This hook returns a safe area insets object with the following values:

```js
{
  top: number,
  right: number,
  bottom: number,
  left: number
}
```

The inset value of `top` is going to be manipulated when defining the animated header.

First, let's import this hook in the `AnimatedHeader.js` file and then define a fixed `HEADER_HEIGHT` constant that is going to be the initial height of the `Animated.View`.

```js
// ... other import statements
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 200;

const AnimatedHeader = ({ animatedValue }) => {
  const insets = useSafeAreaInsets();

  return null;
};
```

To animate the height of the header view on the scroll, we are going to use interpolation. The `interpolate()` function on `Animated.Value` allows an input range to map to a different output range.

In the current scenario, when the user scrolls, the interpolation on `Animated.Value` is going to change the scale of the header to slide to the top on scroll along the y-axis. This effect is going to minimize the initial value of the height of `Animated.View`.

The interpolation must specify an `extrapolate` value. This determines the scaling of the header’s height to be visible at the last value in `outputRange`. There are three different values for `extrapolate` available, but we are going to use `clamp`.

Begin by declaring a variable called `headerHeight` that is going to have the value of interpolation. The `Animated.Value` is the prop `animatedValue` coming from the parent component.

The `inputRange` is going to be `0` to the `HEADER_HEIGHT` plus the top inset. The `outputRange` is to be the `HEADER_HEIGHT` plus the top inset to the top inset plus `44`.

```js
const AnimatedHeader = ({ animatedValue }) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: 'clamp'
  });

  // ...
};
```

Now, let's add an `Animated.View` to render from this component. It is going to use `position: absolute` to help cover the background behind the status bar as well as the same color as the whole header.

```js
const AnimatedHeader = ({ animatedValue }) => {
  // ...
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: 'lightblue'
      }}
    />
  );
};
```

This section ends with the following output:

![ss4](https://i.imgur.com/kOdpwwL.png)

## Manipulating the ScrollView

In the `App.js` file, a `ScrollView` component is going to be displayed beneath the header component and, in return, it is going to display a list of mocked data.

For this example, I've prepared a bare minimum list of book titles in a separate file called `data.js`.

```js
const DATA = [
  {
    id: 1,
    title: 'The Hunger Games'
  },
  {
    id: 2,
    title: 'Harry Potter and the Order of the Phoenix'
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird'
  },
  {
    id: 4,
    title: 'Pride and Prejudice'
  },
  {
    id: 5,
    title: 'Twilight'
  },
  {
    id: 6,
    title: 'The Book Thief'
  },
  {
    id: 7,
    title: 'The Chronicles of Narnia'
  },
  {
    id: 8,
    title: 'Animal Farm'
  },
  {
    id: 9,
    title: 'Gone with the Wind'
  },
  {
    id: 10,
    title: 'The Shadow of the Wind'
  },
  {
    id: 11,
    title: 'The Fault in Our Stars'
  },
  {
    id: 12,
    title: "The Hitchhiker's Guide to the Galaxy"
  },
  {
    id: 13,
    title: 'The Giving Tree'
  },
  {
    id: 14,
    title: 'Wuthering Heights'
  },
  {
    id: 15,
    title: 'The Da Vinci Code'
  }
];

export default DATA;
```

The next step is to import this file in `App.js`. Also, import the `ScrollView` component from React Native.

```js
//...
import { ScrollView, Text, View, Animated } from 'react-native';

import DATA from './data';
```

Next, modify the contents of the `App` component. The important prop to note below in the `ScrollView` component is the `onScroll` prop. Mapping gestures like scrolling directly to an animated value can be done by using `Animated.Event`. This type of event function is passed as the value to the `onScroll` prop.

`Animated.Event` accepts an array of objects as the first argument which is going to be the `contentOffset`, which tells the current position of the scrolling view. It changes every time the user scrolls up or down. The value of `contentOffset` along the y-axis is going to be the same `Animated.Value` that is used to interpolate the height of the `AnimatedHeader` component.

It is recommended that you pass the second argument of `useNativeDriver` in `Animated.Event` .

```js
export default function App() {
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <AnimatedHeader animatedValue={offset} />
        <ScrollView
          style={{ flex: 1, backgroundColor: 'white' }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: 220,
            paddingHorizontal: 20
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
        >
          {DATA.map(item => (
            <View
              key={item.id}
              style={{
                marginBottom: 20
              }}
            >
              <Text style={{ color: '#101010', fontSize: 32 }}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

Here is the output after this step on an iOS device:

![ss5](https://i.imgur.com/QFWrJCN.gif)

On Android:

![ss6](https://i.imgur.com/4HlPFNQ.gif)

## Conclusion

I hope you had fun reading this tutorial. If you are trying the Animated library from React Native for the first time, wrapping your head around it might take a bit of time and that's the part of the process.

Some of the important topics covered in this post are listed as links for further reading below:

- [The onScroll prop](https://reactnative.dev/docs/scrollview#onscroll)
- [Interpolation](https://reactnative.dev/docs/animations#interpolation)
- [Tracking gestures with Animated.Event](https://reactnative.dev/docs/animations#tracking-gestures)

Originally published at [Jscrambler](https://blog.jscrambler.com/how-to-animate-a-header-view-on-scroll-with-react-native-animated/).

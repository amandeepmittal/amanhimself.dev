---
title: 'How to add opacity to a Pressable component in React Native'
date: '2022-08-04'
thumbnail: '/thumbnails/react.png'
slug: 'add-opacity-to-pressable-component-react-native'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/add-opacity-to-pressable-component-react-native/'
---

Pressable component was introduced in 2020 as a core component wrapper that can be used instead of existing touchable components in React Native. These touchable components are TouchableOpacity, TouchableHighlight, and TouchableWithoutFeedback. These components include styles and effects that sometimes do not meet the desired outcome on individual platforms (Android and iOS).

The way I see using the Pressable component is that it can be customized in terms of style, appearance, and extended functionality by creating a custom wrapper/component around it. It also offers a lot of props such as `onPressIn`, `onPressLong`, `hitSlop`, `delayLongPress` and so on, that can be used to implement these extended functionalities.

At times, one thing I like to do is to add opacity feedback when the touch is active. It doesn't provide in the form of a prop directly. Something similar to what [activeOpacity](https://reactnative.dev/docs/touchableopacity#activeopacity) prop on TouchableOpacity does.

In this post, let's build a wrapper component that uses Pressable to add opacity feedback to the component.

## Creating a wrapper component

Start by creating a custom Pressable component with no styles of its own so it can be a reusable component.

```jsx
// Pressable.js

import React, { useCallback } from 'react';
import { Pressable as RNPressable } from 'react-native';

function Pressable({ children, style, ...otherProps }) {
  const _style = useCallback(() => [style && style], [style]);

  return (
    <RNPressable style={_style} {...otherProps}>
      {children}
    </RNPressable>
  );
}

export default Pressable;
```

So far, it accepts only two props:

- `children` that is used to add a label on the button (using like a `Text` component from React Native)
- `...otherProps` is used to pass down all the props to the underlying Pressable component.

In this case, since the wrapper component, you are creating will only be responsible for handling opacity, other important props like `onPress` are left to be handled where this wrapper component is used. I have to use the [Touch indicator on an iOS simulator](https://amanhimself.dev/blog/show-touch-indicator-on-ios-simulator/) to show that the button is pressed.

## Using the wrapper component

To use the wrapper component in its current state, import it:

```jsx
import { StyleSheet, Text, View } from 'react-native';

import Pressable from './Pressable';

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ borderRadius: 4, backgroundColor: '#FF0063', padding: 8 }}
      >
        <Text style={styles.text}>Press me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    color: '#fff'
  }
});
```

Make sure to add some styles to the `Text` and the `Pressable` components.

## Running the example

Here is the output I get by running the code above. Notice that there is no visual feedback when I press the component on the app screen.

![ss1](https://i.imgur.com/XcLXQbn.gif)

## Adding opacity prop to the wrapper component

In some scenarios, you may want to add and use opacity as the feedback. For example, decrease the opacity to `0.5` when the button is being pressed.

You can extend the `styles` to accept a `pressed` argument. It is a boolean that tells whether the component is currently pressed or not. Using it, you can alter the value of the opacity property in styles.

In the wrapper component, add a new prop called `activeOpacity`. This prop accepts a number between `0` and `0.99`. It is used conditionally on the `opacity` property and will only be true when the component is pressed.

When the component is not in a pressed state, the opacity value is `1`.

```jsx
import React, { useCallback } from 'react';
import { Pressable as RNPressable } from 'react-native';

function Pressable({ children, style, activeOpacity, ...otherProps }) {
  const _style = useCallback(
    ({ pressed }) => [{ opacity: pressed ? activeOpacity : 1 }, style && style],
    [style]
  );

  return (
    <RNPressable style={_style} {...otherProps}>
      {children}
    </RNPressable>
  );
}

export default Pressable;
```

## Running the example with activeOpacity value

The below code snippet modifies the previous example to add an activeOpacity value of `0.5`:

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ borderRadius: 4, backgroundColor: '#FF0063', padding: 8 }}
        activeOpacity={0.5}
      >
        <Text style={styles.text}>Press me</Text>
      </Pressable>
    </View>
  );
}
```

The output after this step confirms that the opacity is changing as expected.

![ss2](https://i.imgur.com/LDyiXIu.gif)

## Conclusion

The [Pressable component](https://reactnative.dev/docs/pressable) has many props that can be used to write an extensive and customized wrapper that fulfills your app's requirements. It is preferred in the official React Native documentation and provides a future-proof way of handling touch-based events.

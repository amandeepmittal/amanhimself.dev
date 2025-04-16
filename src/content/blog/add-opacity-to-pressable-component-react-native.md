---
title: How to add opacity to a Pressable component in React Native
author: Aman Mittal
pubDatetime: 2022-08-04T03:42:51Z
modDatetime: 2025-04-16T00:00:01Z
slug: add-opacity-to-pressable-component-react-native
featured: false
draft: false
tags:
  - react-native
description: ''
---

`Pressable` component was introduced in React Native in 2020 as a core component wrapper. It can be used instead of existing touchable components including `TouchableOpacity`, `TouchableHighlight`, and `TouchableWithoutFeedback`. These components include styles and effects that sometimes do not meet the desired outcome on individual platforms (Android and iOS).

The way I see using the `Pressable` component is that it can be customized in terms of style, appearance, and extended functionality by creating a custom wrapper/component around it. It also offers a lot of props such as `onPressIn`, `onPressLong`, `hitSlop`, `delayLongPress` and so on, that can be used to implement these extended functionalities.

At times, one thing I like to do is to add opacity feedback when the touch is active. It doesn't provide in the form of a prop directly. Something similar to what [activeOpacity](https://reactnative.dev/docs/touchableopacity#activeopacity) prop on TouchableOpacity does.

In this post, let's build a wrapper component that uses `Pressable` to add opacity feedback to the component.

## Creating a wrapper component

Start by creating a custom `Pressable` component with no styles of its own so it can be a reusable component.

```tsx
// Pressable.tsx
import { useCallback } from 'react';
import {
  Pressable as RNPressable,
  PressableProps,
  PressableStateCallbackType
} from 'react-native';

type CustomPressableProps = PressableProps & {};

export default function Pressable({
  children,
  style,
  ...props
}: CustomPressableProps) {
  const customStyle = useCallback(
    (state: PressableStateCallbackType) => {
      if (typeof style === 'function') {
        return style(state);
      }
      return style;
    },
    [style]
  );

  return (
    <RNPressable style={customStyle} {...props}>
      {children}
    </RNPressable>
  );
}
```

So far, it accepts only three props:

- `children` that is used to add a label on the button (using like a `Text` component from React Native)
- `style` that is used to add styles to the button
- `...props` is used to pass down all the props to the underlying `Pressable` component.

The `useCallback` hook is used to memoize the `customStyle` function. This is to ensure that the `customStyle` function is not recreated on every render. Since React Native's `Pressable` component accepts style as either an object or a function, you need to pass the pressed state in case it is a function. Otherwise, it will throw a TypeScript error. If the `style` is an object, it can be returned as is.

In the above code, since the wrapper component you are creating will only be responsible for handling opacity, other important props like `onPress` are left to be handled where this wrapper component will be used.

## Using the wrapper component

To use the wrapper component in its current state, import it:

```tsx
// app/(tabs)/index.tsx
import { View, Text } from 'react-native';

import CustomPressable from '@/components/Pressable';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomPressable
        style={{ borderRadius: 4, backgroundColor: '#FF0063', padding: 8 }}
      >
        <Text style={{ color: 'white' }}>Press Me</Text>
      </CustomPressable>
    </View>
  );
}
```

Make sure to add some styles to the `Text` and the `Pressable` components.

## Running the example

Here is the output I get by running the code above. Notice that there is no visual feedback when I press the component on the app screen.

![ss1](https://i.imgur.com/XcLXQbn.gif)

I used the [Touch indicator on an iOS simulator](https://amanhimself.dev/blog/show-touch-indicator-on-ios-simulator/) to show that the button is pressed.

## Adding opacity prop to the wrapper component

In some scenarios, you may want to add and use opacity as the feedback. For example, decrease the opacity to `0.5` when the button is being pressed.

You can extend the `styles` to accept a `pressed` state. It is a boolean that tells whether the component is currently pressed or not. Using it, you can alter the value of the opacity property in styles.

In the wrapper component, add a new prop called `activeOpacity`. This prop accepts a number between `0` and `0.99`. It is used conditionally on the `opacity` property and will only be true when the component is pressed.

When the component is not in a pressed state, the opacity value is `1`.

```tsx
// Pressable.tsx
import { useCallback } from 'react';
import {
  Pressable as RNPressable,
  PressableProps,
  PressableStateCallbackType
} from 'react-native';

type CustomPressableProps = PressableProps & {
  activeOpacity?: number;
};

export default function Pressable({
  children,
  style,
  activeOpacity,
  ...props
}: CustomPressableProps) {
  const customStyle = useCallback(
    (state: PressableStateCallbackType) => {
      const { pressed } = state;
      const baseStyle = { opacity: pressed ? activeOpacity : 1 };

      if (typeof style === 'function') {
        const derivedStyle = style(state);
        return [baseStyle, derivedStyle];
      }
      return [baseStyle, style];
    },
    [activeOpacity, style]
  );

  return (
    <RNPressable style={customStyle} {...props}>
      {children}
    </RNPressable>
  );
}
```

## Running the example with activeOpacity value

The below code snippet modifies the previous example to add an activeOpacity value of `0.5`:

```tsx
export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomPressable
        style={{ borderRadius: 4, backgroundColor: '#FF0063', padding: 8 }}
        activeOpacity={0.5}
      >
        <Text style={{ color: 'white' }}>Press Me</Text>
      </CustomPressable>
    </View>
  );
}
```

The output after this step confirms that the opacity is changing as expected.

![ss2](https://i.imgur.com/LDyiXIu.gif)

## Conclusion

The [`Pressable` component](https://reactnative.dev/docs/pressable) has many props that can be used to write an extensive and customized wrapper that fulfills your app's requirements. It is preferred in the official React Native documentation and provides a future-proof way of handling touch-based events.

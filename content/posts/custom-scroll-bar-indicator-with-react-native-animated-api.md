---
title: 'How to create a custom scrollbar with React Native Animated API'
date: '2020-12-10'
slug: 'custom-scroll-bar-indicator-with-react-native-animated-api'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/custom-scroll-bar-indicator-with-react-native-animated-api/'
---

> Updated on: August 4, 2021

![cover](https://i.imgur.com/ateUlTf.png)

A `ScrollView` is a component that enables to view the content on a device's screen that is not able to be displayed in one screen. Using a scroll view component, the content can either be scrolled vertically or horizontally. This depends a lot on the design of the mobile application.

In React Native, to implement a scroll view, there are two types of components available: `ScrollView` and `FlatList`. The `ScrollView` component renders all children at once. This is useful if the data to display is static or there aren't too many data items in the list. The `FlatList` component is performant and optimal for displaying a huge scrollable list of data items.

For example, this how a `ScrollView` component is implemented in a React Native app:

```js
<ScrollView style={{ backgroundColor: 'white', marginHorizontal: 20 }}>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Text>
</ScrollView>
```

Both of these scrollable components have at least one thing in common: a scroll bar indicator. By default, the scroll bar indicator is visible whether the content is displayed horizontally or vertically. To disable this vertical scroll bar indicator you would add the prop `showsVerticalScrollIndicator` with a boolean value of false:

```js
<ScrollView style={{ backgroundColor: 'white', marginHorizontal:
20 }} showsVerticalScrollIndicator={false}>
```

However, the implementation of this scroll bar indicator is not directly customizable on cross-platforms in React Native. If you are building an app whose screen design depends on displaying a customized scroll bar indicator, then let's build one in this tutorial. To implement this, we are going to use React Native [Animated](https://reactnative.dev/docs/animated.html) API.

[The source code is available at GitHub.](https://github.com/amandeepmittal/react-native-examples/tree/master/custom-scroll-indicator)

## Prerequisites

To follow this tutorial, please make sure you are familiarized with JavaScript/ES6 and meet the following requirements in your local dev environment:

- [Node.js](https://nodejs.org/) version >= `12.x.x` installed.
- Have access to one package manager such as npm or yarn or npx.
- Have a basic understanding of Redux store, actions, and reducers.
- [expo-cli](https://github.com/expo/expo-cli) installed, or use npx.

Note: All of the code mentioned in this tutorial works with the React Native CLI project as well.

## Create a new React Native project with expo-cli

To create a new React Native project using `expo-cli`, execute the following command from a terminal window:

```shell
npx expo init custom-scroll-indicator

# navigate into that directory
cd custom-scroll-indicator
```

And that's it. We are not using any third party library but the approach discussed in this post is easily integrated with any other libraries that your React Native app depends on.

Before we move onto the next section, let's start creating a mock screen. Open `App.js` file and add the following code snippet:

```js
import React, { useState, useRef } from 'react';
import { ScrollView, Text, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: '#892cdc', paddingTop: 50 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>
            Custom Scroll Bar
          </Text>
        </View>
      </View>
    </>
  );
}
```

To see the output of this step, please go back to the terminal window execute one of the following commands depending on the OS (_whether iOS or Android_) of the simulator or the real device the Expo Client app is running:

```shell
# trigger expo development server
yarn start

# for iOS
yarn run ios

# for android
yarn run android
```

When the app is up and running, here is the output you are going to get:

![js1](https://i.imgur.com/PO7yY2C.png)

## Add mock data

Inside the scroll view component, we are going to display some mock data. Let's add it to the React Native project. Create a new directory called `constants/` and inside it a new file called `data.js`.

This file is going to contain an object called `booksData` that has two properties:

- `title` of the book item.
- `description` is the long form of the text where the custom scroll bar is going to be used to scroll the text inside the `ScrollView` component.

Add the following code snippet to this file:

```js
export const booksData = {
  title: 'The Hunger Games',
  description:
    'Winning will make you famous. Losing means certain death.
    The nation of Panem, formed from a post-apocalyptic North
    America, is a country that consists of a wealthy Capitol
    region surrounded by 12 poorer districts. Early in its
    history, a rebellion led by a 13th district against the
    Capitol resulted in its destruction and the creation of an
    annual televised event known as the Hunger Games. In
    punishment, and as a reminder of the power and grace of the
    Capitol, each district must yield one boy and one girl
    between the ages of 12 and 18 through a lottery system to
    participate in the games. The tributes are chosen during the
    annual Reaping and are forced to fight to the death, leaving
    only one survivor to claim victory. When 16-year-old Katniss
    young sister, Prim, is selected as District 12 female
    representative, Katniss volunteers to take her place.'
};
```

Make sure to import object inside the `App.js` file after other import statements.

```js
// ...
import { booksData } from './constants/data';
```

## Display mock data using a ScrollView

The mock data we created in the previous section is going to be displayed inside a `ScrollView` component. The content inside this scroll view is displayed with two `Text` components. One to display the title of the book item and another to display the description.

This `ScrollView` component is not going to take the whole screen to display the content. Thus, the default scroll bar indicator is shown when the description is scrolled. We are going to add an empty `View` after the `ScrollView` component with a value of `flex: 4` such that this empty view takes slightly more than half of the screen.

There is also a `View` component that wraps the `ScrollView`. For now, it adds horizontal padding but later will be crucial to display the custom scroll bar indicator next to the `ScrollView` component. Thus, let's add the `flexDirection: 'row'` property to this wrapper `View` component.

Modify the `App.js` file and add the following JSX:

```js
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: '#892cdc', paddingTop: 50 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
            Custom Scroll Bar
          </Text>
        </View>
        <View style={{ flex: 3, marginVertical: 20 }}>
          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}
          >
            <ScrollView>
              <Text
                style={{
                  fontSize: 22,
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: 12
                }}
              >
                {booksData.title}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'white'
                }}
              >
                {booksData.description}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={{ flex: 4 }} />
      </View>
    </>
  );
}
```

Output after this step:

![js2](https://i.imgur.com/5Cckr8y.gif)

Hide the default scroll indicator by adding the `showsVerticalScrollIndicator` prop to the `ScrollView` component. Also, add the `contentContainerStyle` prop with a to apply `paddingRight` to its children (_which are the content being displayed and custom scroll bar we have to create_).

```js
<ScrollView
  contentContainerStyle={{ paddingRight: 14 }}
  showsVerticalScrollIndicator={false}
>
```

![js3](https://i.imgur.com/odQD8D4.png)

## Create the custom scroll bar

Next, to the content displayed, let's add a scroll bar. Add a `View` component whose `height` is set to `100%`. This will display the scroll bar with as much height as the height of its parent container.

```js
<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
  {/* ScrollView component here */}
  <View
    style={{
      height: '100%',
      width: 6,
      backgroundColor: '#52057b',
      borderRadius: 8
    }}
  ></View>
</View>
```

The `width` in the above code snippet can be customized with the value you can provide.

The output of this step:

![js4](https://i.imgur.com/8zzq2Jw.png)

## Create the custom scroll bar indicator

To display a custom scroll bar indicator, we need to calculate the size of the scroll bar indicator first. This can be done by comparing the complete height of the scroll bar and the visible height of the scroll bar that is the indicator.

In the `App` component, define two state variables using the `useState` hook and a new variable where we store the size of the bar indicator.

```js
const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

const scrollIndicatorSize =
  completeScrollBarHeight > visibleScrollBarHeight
    ? (visibleScrollBarHeight * visibleScrollBarHeight) /
      completeScrollBarHeight
    : visibleScrollBarHeight;
```

Next, create the scroll bar indicator inside the scroll bar. The indicator is going to have its height equivalent to the `scrollIndicatorSize`.

```js
<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
  {/* ScrollView component here */}
  <View
    style={{
      height: '100%',
      width: 6,
      backgroundColor: '#52057b',
      borderRadius: 8
    }}
  >
    <View
      style={{
        width: 6,
        borderRadius: 8,
        backgroundColor: '#bc6ff1',
        height: scrollIndicatorSize
      }}
    />
  </View>
</View>
```

The scroll bar indicator is now displayed:

![js5](https://i.imgur.com/k5ak2Yi.gif)

To change the position of this indicator, we have to animate its value.

## Animate the scroll bar indicator

We are going to animate the position of the scroll bar indicator as the content inside the `ScrollView` is scrolled. To create an animation, `Animated.Value` is required. Define the `scrollIndicator` variable with an `Animated.Value` of `0`.

Add the following code snippet after state variables are declared in `App` component:

```js
const scrollIndicator = useRef(new Animated.Value(0)).current;
```

Then define a variable called `difference` that is used to calculate the height of the scroll bar indicator if it is greater than the size of the scroll indicator. This value is used to calculate the range of interpolation to change the position of the scroll bar indicator to move along the y-axis.

To change the position of the scroll bar indicator, we use the `Animated.multiply` method. This method creates a new Animated value that is composed from two values multiplied together. This new value is what the change in the position of the scroll bar indicator is going to be when the content is scrolled in the `ScrollView`. To change the position, we need to multiply the current value of the `scrollIndicator` and the visible height of the scroll bar indicator divided by the complete height of the scroll bar.

After getting the new Animate value, interpolation is applied. This is done by using the `interpolate()` function on the new Animated value and it allows an input range to map to an output range.

The interpolation must specify an `extrapolate` value. There are three different values for `extrapolate` available, but we are going to use `clamp`. It prevents the output value from exceeding the `outputRange`.

Add the following code snippet in the `App` component:

```js
const difference =
  visibleScrollBarHeight > scrollIndicatorSize
    ? visibleScrollBarHeight - scrollIndicatorSize
    : 1;

const scrollIndicatorPosition = Animated.multiply(
  scrollIndicator,
  visibleScrollBarHeight / completeScrollBarHeight
).interpolate({
  inputRange: [0, difference],
  outputRange: [0, difference],
  extrapolate: 'clamp'
});
```

Then, convert the `View` component that displays the scroll bar indicator into an `Animated.View`. We are going to add a prop called `transform`. It is going to change the position of the scroll bar indicator.

The value of this prop is going to be an array and inside it, a transformation object is defined. This object specifies the property that is transformed, as the key and its value is going to be the `scrollIndicatorPosition`.

```js
<Animated.View
  style={{
    width: 6,
    borderRadius: 8,
    backgroundColor: '#bc6ff1',
    height: scrollIndicatorSize,
    transform: [{ translateY: scrollIndicatorHeight }]
  }}
/>
```

Next, we need to set the height of the scroll bar and scroll bar indicator that is visible when the content inside the `ScrollView` changes. For this, there are two props used in combination:

- `onContentSizeChange` whose value is a handler function with the width and the height of the content. For our demo, we are going to use the height of the content to update the height of the complete scroll bar.
- `onLayout` is used to update the height of the visible scroll bar.

To animate the scroll bar indicator's position when the height of the content changes another prop called `onScroll` is used. It accepts an `Animated.event()` as the value which is used to handle gestures like panning and in our case, scrolling. The frequency of the scrolling event is controlled using a prop called `scrollEventThrottle`. It controls how often the scroll event will be fired while scrolling.

Modify the props of `ScrollView` component as shown below:

```js
<ScrollView
  contentContainerStyle={{ paddingRight: 14 }}
  showsVerticalScrollIndicator={false}
  onContentSizeChange={height => {
    setCompleteScrollBarHeight(height);
  }}
  onLayout={({
    nativeEvent: {
      layout: { height }
    }
  }) => {
    setVisibleScrollBarHeight(height);
  }}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
    { useNativeDriver: false }
  )}
  scrollEventThrottle={16}
>
  {/* Rest remains same */}
</ScrollView>
```

Here is the output after this step on an iOS simulator:

![js6](https://i.imgur.com/06Ozy44.gif)

Here is the output after this step on an Android device:

![js7](https://i.imgur.com/D9LnLRs.gif)

## Conclusion

I hope you had fun reading this tutorial. If you are trying the Animated library from React Native for the first time, wrapping your head around it might take a bit of time and practice and that's part of the process.

**Further Reading on React Native Animated**

- [Learn how to Animate a Header View on Scroll With React Native Animated](https://amanhimself.dev/blog/animate-header-view-on-scroll-with-react-native-animated-api/)

---
title: 'React Native Performance Do and Dont'
slug: 'react-native-performance-do-and-dont'
date: '2021-02-13'

thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://medium.com/crowdbotics/react-native-performance-do-and-dont-88424e873bbd'
---

Performance is one of the few topics that change the overall perspective of using a framework like React Native in real-world mobile applications. React Native is fast by default. While working on a React Native app you can experience performance issues and do not assume it can be fixed by testing components. In this post, there is a list of suggestions that can be applied while building a React Native app.

## DO: Use an Image Caching Solution

React Native offers an [Image](https://reactnative.dev/docs/image) component as the part of [a core set of components](https://reactnative.dev/docs/components-and-apis). This component is used to display an image but out of the box does not have the solution for issues like:

- rendering a lot of images on one screen
- low performance in general
- low-performance loading from cache
- flickering

The Image component in React Native handles caching images like web browsers and sometimes the above issues are a result of that. These issues are easily resolved by using a third-party library called [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image). It is available for both iOS and Android and is efficient in caching images.

## DO: Use appropriate image size

Optimizing an image is important for a React Native app's performance if the app relies on using a huge amount of images. Rendering a large number of images could lead to high memory usage on a device if the images are not appropriately optimized in terms of size. This may lead the app to crash.

Somethings that can be done to optimized images in a React Native app are:

- Use PNG format instead of JPG
- Use smaller sized images
- Use WEBP format for images. It can help [reduce the binary size](https://medium.com/@tgpski/react-native-webp-reducing-bundle-binary-sizes-increase-speed-with-webp-image-format-aa9b1aa11405) on iOS and Android by 29%.

## DO: Avoid unnecessary renders

React Native is based on the React library and similarly handles rendering components as React.js does. Here to the optimization techniques that are valid with React do apply to React Native applications. One of the few optimization techniques is to avoid unnecessary renders and in functional components, this can be done by using `React.memo()`.

`React.memo()` is used to handle memoization. The concept of memoization is described as that if a component receives the same set of props more than once, it will use previously cached props and render the JSX returned by the functional component only once.

For example, consider the following of a parent and a child component. The `Parent` component has a state variable called count that is updated when the button press.

Whenever the button is pressed, the `Child` component also gets re-rendered even though its prop `text` does not change on each render. It is not doing anything special to its parent component and is just displaying some text. This can be optimized by wrapping the contents of the `Child` component with `React.memo()`.

```js
// Parent.js

const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Press me" onPress={() => setCount(count + 1)} />
      <Child text="Placeholder text" />
    </View>
  );
};

// Child.js
const Child = React.Memo(({ text }) => {
  return <Text>{text}</Text>;
});
```

## DO: Use nativeDriver with Animated library

There are many ways to create Animations in a React Native app. One of the most popular ways to do this is to use [Animated](https://reactnative.dev/docs/animated.html) library.

Animated library uses `nativeDriver` to send animations over the native bridge before animation starts. This helps the animations to execute independently of a blocked JavaScript thread. Thus, resulting in a smoother experience and without dropping many frames.

To use `nativeDriver` with an Animated library, you can set its value to `true`. In the example below, the `useNativeDriver` is used on an `onScroll` Animated event in a `ScrollView` component.

```js
<ScrollView
  showsVerticalScrollIndicator={false}
  scrollEventThrottle={1}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
    { useNativeDriver: false }
  )}
>
  // Component's content
</ScrollView>
```

## DO: Use a tool to debug issues

React Native version `0.62.0` introduced a new tool called [Flipper](https://fbflipper.com/docs/features/react-native/). It is a debugging platform for iOS, Android, and React Native apps. It integrates directly with the native code and its integrations with a React Native app is enabled out of the box.

Using Flipper to debug apps, does not require remote debugging. It requires a locally connected instance of Metro to interact with the React Native app. It has React DevTools to inspect the component tree and check out the state and props of a React component.

It uses a native plugin ecosystem for debugging both iOS and Android applications. These plugins are used for device logs, crash reports, inspecting network requests, inspecting the local database of an app, inspecting cached images, etc.

## DO: Use Hermes

[Hermes](https://reactnative.dev/docs/hermes) is an open-source JavaScript engine optimized for mobile applications. Since React Native version `0.60.4` Hermes has been available for the Android platform. It helps with reducing the download size of an app (APK for Android), reduces memory consumption, and reduces the time it takes for an app to become usable (TTI - Time to interact).

To enable Hermes engine in an Android app, open `build.gradle` file and modify the following:

```java
def enableHermes = project.ext.react.get("enableHermes", true);
```

Since React Native version `0.64-rc.0` Hermes is also available to be used on iOS platform. To enable it for iOS app, open Podfile and modify the following code:

```c
+  use_react_native!(:path => config[:reactNativePath], :hermes_enabled => true)
```

## DON'T: Leave console statements in the source code

Using `console.log` statements is one of the favorites and common method to debug in JavaScript applications in general, as well as in React Native apps. However, leaving the console statements in the source code when building a React Native app for a platform could cause some big bottleneck in the JavaScript thread.

One way to keep track of console statements and remove them is to use a third-party package called `babel-plugin-transform-remove-console`. To use it, install the package by using the following command in a terminal window:

```shell
yarn add babel-plugin-transform-remove-console
```

Then, modify the `.babelrc` file to remove all console statements:

```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

## DON'T: Use ScrollView to render a huge list of data items

There are few ways to create scrollable lists in React Native. Two of the common ways available in React Native core are `ScrollView` and `FlatList` components.

A `ScrollView` component is simple to implement. It is often used to traverse over a list of finite number of items using a JavaScript's `map()` function. For example:

```js
<ScrollView>
  {items.map(item => {
    return <Item key={item.id.toString()} />;
  })}
</ScrollView>
```

The `ScrollView` component renders all children at once. This is good for use cases where the number of items in a list to render is quite low. Dealing with a large amount of data can directly affect the performance of the app.

To deal with large lists of items, React Native provides a component called `FlatList`. This component ensures that the items are lay loaded such that the app does not consume an inconsistent amount of memory.

For example:

```js
<FlatList
  data={elements}
  keyExtractor={item => `${items.id}`}
  renderItem={({ item }) => <Item key={item.id.toString()} />}
/>
```

## Conclusion

React Native is an open-source framework used to create cross-platform mobile applications. It uses JavaScript at its core and has a primitive API of components to build mobile interfaces and functionalities. It’s a high-performance framework as long as you build with performance in mind from the start.

_[Originally Published at Crowdbotics](https://medium.com/crowdbotics/react-native-performance-do-and-dont-88424e873bbd)_

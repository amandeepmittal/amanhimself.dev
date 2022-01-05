---
title: 'How to handle navigation in WebViews in a React Native app'
date: '2020-02-07'
slug: 'handle-navigation-in-webviews-react-native'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://heartbeat.fritz.ai/how-to-handle-navigation-with-webviews-in-a-react-native-app-1ed51ab3342f'
---

As a React Native developer, you are going to come across use cases that will require you to embed or redirect a web application or a web page inside a React Native app. [WebViews](https://facebook.github.io/react-native/docs/webview.html) are often used for such use cases.

A community-maintained module, WebViews in React Native are the only way to let the user visit external links within an iOS or Android application. The WebView component in React Native core first became available in React Native version `0.57.x`.

In this tutorial, you are going to learn how to create a simple WebView component using `react-native-webview` npm module, and stretch it further to add custom navigation to handle URL history (just like in a web browser) using props provided y this module.

You can find the complete code for this tutorial at this [Github repo](https://github.com/amandeepmittal/react-native-examples/tree/master/rnWebViewCustomNav).

## Table of Contents

- Requirements
- Installing WebView package
- Implement a simple WebView
- Add a loading spinner
- Handle navigation when using WebViews
- Conclusion

## Requirements

- Nodejs version `<= 10.x.x` installed
- watchman installed
- Have access to one package manager such as npm or yarn
- use react native version `0.60.x` or above

## Installing WebView package

To generate a new React Native project you can use the react-native cli tool. open a terminal window and enter the following command.

```shell
npx react-native init [Project Name]
```

You can name your project anything you want. Make sure to navigate inside the project directory after it has been created. Then, install the `react-native-webview` dependency using a package manager.

```shell
yarn add react-native-webview
```

After the dependency has installed, you are going to config it to work on iOS and Android devices. For iOS devices make sure you install pods by navigating inside the `ios/` directory and execute the command `pod install`.

For Android users, if you are using the latest `react-native-webview` version (_which you are_) open the file `android/gradle.properties` and make sure the following two lines exist. If not, add them.

```groovy
android.useAndroidX=true
android.enableJetifier=true
```

Once the dependency installation is done, let us run the application. We are going to use an iOS simulator for this tutorial. If you are on Windows or Linux based operating systems, you can use Android Studio.

Run the command as stated below to open the boilerplate application that comes with `react-native-cli`.

```shell
# for Mac users
react-native run-ios

# for Windows/Linux users
react-native run-android
```

If the app opens without any error, that means the configuration we have done so far is good to go.

<img src='https://miro.medium.com/max/350/1*eYqHih1QsrZsxfiHsYnfPQ.png' />

## Implementing a simple WebView

In this section, let us create a simple webview component and understand how it works. Start by importing the `WebView` component from `react-native-webview` to render web content in a native view. Open the `App.js` file.

```js
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import WebView from 'react-native-webview';
```

The `WebView` component requires a `source` prop. This prop loads the static HTML or a URI (which is the current case if you look closely at the above snippet). A URI is a remote location for a web page to exist.

Inside the `App` function component let us render this simple webview component.

```js
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flexContainer}>
        <WebView source={{ uri: 'https://heartbeat.fritz.ai/' }} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  }
});

export default App;
```

To view this in action, make sure you build the React Native app for the first time using either of the command specified below from a terminal window. For Android users, if you are using a real device or a simulator, make sure it is running first. You are going to see a similar output as below:

<img src='https://miro.medium.com/max/350/1*l6ZpJ0_d8j58uJRMC-XLSQ.png' />

## Add a loading spinner

Did you notice that when the screen or the component loads for the first time, it just shows a blank white screen for a few seconds? This indicates that the web page is loading from the remote source. However, in a real-time application, you have to provide some type of loading indicator to the user to imply that the web page is being currently loaded.

This can be done by adding an `ActivityIndicator` component from the `react-native` core. It is going to display a spinner on the device's screen when the web page is in the loading state.

In the `App.js` file, among other imported components from `react-native`, import `ActivityIndicator`.

```js
// ... rest of the import statements
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from 'react-native';
```

To add a loading indicator that starts when the web page starts loading. Also, the indicator should stop when the web page has done loading.

The first requirement is that the prop `startInLoadingState` from `react-native-webview` module must be set to a value of true. Another prop, `renderLoading` is responsible for triggering the activity indicator. It always accepts a function as its value. The value of the function is going to be the `ActivityIndicator` component.

Add both of these props to `WebView` in `App.js`:

```js
<WebView
  source={{ uri: 'https://heartbeat.fritz.ai/' }}
  startInLoadingState={true}
  renderLoading={() => (
    <ActivityIndicator
      color="black"
      size="large"
      style={styles.flexContainer}
    />
  )}
/>
```

Take a look at how it works on the below screen.

<img src='https://miro.medium.com/max/377/1*m3pKSlirL8gqEXUHmlZc-A.gif' />

## Handle navigation when using WebViews

The [`WebView`](https://facebook.github.io/react-native/docs/webview) has a vast API and out of the box provides the most common functionalities that you can add to support different features in the app.

The `WebView` API provides some methods like `goBack` and `goForward` to handle navigation state and transitions. Such as the `goBack` method allows the user to go back one page at a time in the web view's history. Similarly, using the method `goForward`, you can move forward.

This navigation between web pages is done when there is a way to store or listen to the URL change. Using the prop called `onNavigationStateChange` that represents the navigation state of the component, you just need to pass the current URL and keep track of the previous and forward buttons.

The current is passed by creating a `ref` object which is the approach you are going to use in this demo app. It holds a mutable `.current` property that can be used to uniquely identify the URL.

I am going to use the latest Hooks syntax. If you are using the counterpart of the functional components, please make sure to check how to use `ref` property on the `WebView` instance inside the class component.

For those who have been following along this tutorial so far, please make sure that you import hooks such as `useRef`, and `useState` from React.

Also, import some more components from the react-native core that is going to help us add a footer to the app screen. This footer is going to have two buttons: one to go to the previous URL and one to go to the forward URL (if exists).

```js
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import WebView from 'react-native-webview';
```

Inside the functional component `App`, let us create three state variables for the following purposes:

- `canGoBack`: to go the previous web page from the navigational state. Its initial value is going to be a boolean false.
- `canGoForward`: to go to the next web page in the navigational state. Its initial value is going to be a boolean false.
- `currentUrl` to keep a reference of the current URL. Its initial value is going to be an empty string.

Let us create these state variables inside the `App` component.

```js
const App = () => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  //...
};
```

Use the `useRef` hook to create a `webviewRef` and define it after the state variables.

```js
const webviewRef = useRef(null);
```

Now, create two handler methods that are going to handle the navigational state transition of the current URL in real-time using the mutable property `current` on a button press.

```js
backButtonHandler = () => {
  if (webviewRef.current) webviewRef.current.goBack();
};

frontButtonHandler = () => {
  if (webviewRef.current) webviewRef.current.goForward();
};
```

Add the props `ref` and `onNavigationStateChange` to the `WebView` component. The `navState` is going to track the state changes and update it as well as fetch and set the current URL as shown below in the code snippet.

```js
<WebView
  source={{ uri: 'https://heartbeat.fritz.ai/' }}
  startInLoadingState={true}
  renderLoading={() => (
    <ActivityIndicator
      color="black"
      size="large"
      style={styles.flexContainer}
    />
  )}
  ref={webviewRef}
  onNavigationStateChange={navState => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
  }}
/>
```

After the `WebView` component, create a `View` component that holds two buttons. Each of the buttons is defined from `TouchableOpacity` that has an `onPress` prop. This prop is going to make use of the handler methods you defined earlier.

```jsx
<View style={styles.tabBarContainer}>
  <TouchableOpacity onPress={backButtonHandler}>
    <Text style={styles.button}>Back</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={frontButtonHandler}>
    <Text style={styles.button}>Forward</Text>
  </TouchableOpacity>
</View>
```

Here are the corresponding styles used in the above code snippet:

```js
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b43757'
  },
  button: {
    color: 'white',
    fontSize: 24
  }
});
```

To see it in action, go back to the simulator/device of your choice and the first thing you are going to notice is the bottom tab bar on the screen.

<img src='https://miro.medium.com/max/350/1*5g5rXbyg4k1_J02DKL3QIA.png' />

Here is the complete demo in action with back and forward buttons working.

<img src='https://miro.medium.com/max/377/1*r2li3qWatN2JM_Pl9nhGBA.gif' />

## Conclusion

_Congratulations! You have completed this tutorial._

WebViews might not be the prominent way to create mobile apps but it does add an important feature to handle specific use cases where there is a requirement to connect web interfaces and native code.

The `WebView` component has a great API that you can refer [here](https://facebook.github.io/react-native/docs/webview).

You can find the complete code for this tutorial at this [Github repo](https://github.com/amandeepmittal/react-native-examples/tree/master/rnWebViewCustomNav).

Originally published at [Heartbeat.fritz.ai](https://heartbeat.fritz.ai/how-to-handle-navigation-with-webviews-in-a-react-native-app-1ed51ab3342f)

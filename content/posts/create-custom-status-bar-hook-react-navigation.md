---
title: 'How to create a custom hook to change status bar styles for every screen using React Navigation'
slug: 'create-custom-status-bar-hook-react-navigation'
date: '2020-03-13'
thumbnail: '/thumbnails/expo.png'
tag: 'react-native'
canonicalUrl: 'https://heartbeat.fritz.ai/creating-custom-wavy-headers-using-react-native-svg-639ce0861327'
---

React Native has a component called `StatusBar` that is used to control the app status bar. Using the `react-navigation` library you might have a scenario where you don't have a header bar and on different screens, you would like to ensure the color of the status bar is correctly rendered. Such as on the light background, a dark status bar is displayed and on a darker background of the screen, a light status bar is displayed.

In this tutorial, let us create a custom hook that is going to keep track of the status bar color change whenever a screen changes. For this, you are also going to create mock screens with different background colors and integrate a tab bar.

I am going to use Expo to create a new React Native app but you can use React Native cli to generate a new project too.

## Requirements

Ensure your dev environment includes the following required packages:

- Node.js above `10.x.x` installed on your local machine
- JavaScript/ES6 basics
- `expo-cli`

## Installing and configuring react-navigation

Start by creating a new project using `expo-cli`. Navigate inside the project directory when the CLI has finished generating the new project. Then install all the required dependencies to integrate `react-navigation` library and bottom tabs.

```shell
expo init customStatusBarHook

cd customStatusBarHook

yarn add @react-navigation/native @react-navigation/bottom-tabs

expo install react-native-gesture-handler
react-native-reanimated react-native-screens
react-native-safe-area-context
@react-native-community/masked-view
```

That's it to configure the `react-navigation` library.

## Create bottom Tabs

Create a new file called `AppTabs.js` inside `src/navigation/` directory. This file is going to be the sole routes file for this demo. Inside it, you are going to create two tab components called `HomeScreen` and `SettingsScreen.

Start by importing all the necessary components.

```js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
```

I am using `@expo/vector-icons` to display icons for each tab but if you are using react-native cli to generate this project, you will have to install `react-native-vector-icons` library.

Create the functional component `HomeScreen` with a `View` and a `Text` as shown in the snippet below. This is going to be the first tab screen in the tab navigator.

```js
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, color: '#333333' }}>Home Screen</Text>
    </View>
  );
}
```

Also, add the following code snippet for the tab screen, `SettingsScreen`.

```js
function SettingsScreen() {
  useStatusBar('light-content');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#be79df'
      }}
    >
      <Text style={{ fontSize: 20, color: 'white' }}>Settings Screen</Text>
    </View>
  );
}
```

Next, add the following snippet to create the tab navigator with the previous two screens. The following tab navigator is also going to use have tab icons that are going to have different tint colors based on whether being active or not. This can be done by using `screenOptions`.

```js
const Tabs = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray'
        }}
      >
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Settings" component={SettingsScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
```

Go to the terminal window and trigger the command `expo start`. You are going to get the following output in a simulator.

![ss3](https://i.imgur.com/h4ZpdMF.gif)

As you can notice from the above demo that on each the tab screen the color of the status bar is dark. On the second tab, since it has a darker background than the first tab, there should be a way to change the status bar for each screen component as it is mounted.

## Create a custom Status bar hook

The `react-navigation` library provides a hook called `useFocusEffect` that helps to run side-effects when a specific screen is focused.

It is similar to `useEffect` hook from React with the difference being between the two is that side-effects in `useFocusEffect` run only when a screen component is focused.

Also, it is important to wrap the side-effect in `React.useCallback` hook to avoid triggering the effect after every render when the screen is focused.

Create a new file called `Hooks.js` inside `src/utils/` directory. Import the following statements.

```js
import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
```

Then export a custom function called `useStatusBar` that is going to provide a simple way to change the color of the status bar when applied. Pass the `style` as the only parameter.

```js
export const useStatusBar = style => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style);
    }, [])
  );
};
```

## Apply custom hook to change the status bar color

Open `src/navigation/AppTabs.js` file and import `useStatusBar`. Also, inside both function components, add the following statements with appropriate bar style value.

```js
// after other import statements
import { useStatusBar } from '../utils/Hooks';

function HomeScreen() {
  useStatusBar('dark-content');
  // rest of the code remains same
}

function SettingsScreen() {
  useStatusBar('light-content');
  // rest of the code remains same
}
```

Go back to the simulator or Expo client and you are going to notice the changes now.

![ss4](https://i.imgur.com/EuVkbSG.gif)

For a better transition between two tabs, you can pass on another parameter called `animate` with a default value of boolean `true` in the `useStatusBar` custom hook.

Open `src/utils/Hooks.js` and add the following.

```js
export const useStatusBar = (style, animated = true) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated);
    }, [])
  );
};
```

Now, go back to the Expo client to see the changes.

![ss5](https://i.imgur.com/sS9ASUg.gif)

## Conclusion

To read more about the `useFocusEffect` hook provided by the `react-navigation` library take a look at this [link](https://reactnavigation.org/docs/use-focus-effect/).

You can also set a status bar configuration based on different routes when using `react-navigation`. Take a look at this [link](https://reactnavigation.org/docs/status-bar/) to read more.

I hope this short tutorial was useful to you. Thanks for reading it!

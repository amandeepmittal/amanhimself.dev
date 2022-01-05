---
title: 'Nesting Tab and Stack navigators in React Native and Expo apps'
date: '2020-02-26'
slug: 'nested-navigators-in-react-native'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/nesting-tab-and-stack-navigators-in-react-native-and-expo-apps-cc118a141e70'
---

Using [`react-navigation`](https://reactnavigation.org/docs/en/getting-started.html) you can definitely nest different types of navigators. The term nesting navigators mean that rendering one navigator inside a screen of another navigator.

The possible scenarios of nesting navigators are:

- Stack navigator nested inside drawer navigator
- Tab navigator nested inside stack navigator
- Stack navigator nested inside a tab navigator

In this tutorial, let us examine one of the above scenarios by nesting Tab inside a stack navigator. Whether you are following from the previous tutorial on building a stack navigator using a component-based configuration with the latest version of the react-navigation library, or not, here is the source code of the Expo demo app that is going to be leveraged. This demo app, already has a stack navigator running. You can download the source code from the Github rep [here](https://github.com/amandeepmittal/react-native-examples/tree/master/reactnav5-stack-navigator).

## Table of contents

- Install dependencies
- Create a mock screen
- Create a tab navigator
- Adding icon and changing active tint color
- Passing `screenOptions` in a Tab Navigator
- Updating the header title for the nested child navigator
- Conclusion

## Requirements

Requirements for this tutorial is simple. Have the following installed on your local dev environment.

- Node.js version >= `10.x.x` installed
- Have access to one package manager such as npm or yarn
- Latest `expo-cli` version installed or use npx

Do note that, without dwelling much into the configuration of native binaries with the `react-navigation` library, I am going to use a project that is already generated using `expo-cli`. If you wish to start afresh, choose the blank template.

## Install dependencies

Install the following dependency to setup a Tab Navigator. Run the following command from a terminal window.

```shell
yarn add @react-navigation/bottom-tabs
```

This package is going to allow the app to have a simple tab bar appear at the bottom of the screen and switch between different routes. The demo app we are going to build is going to consist of two tabs. We are going to nest the stack navigator inside the first tab and create a mock screen for the second tab.

## Create a mock screen

Even though the current app structure has three different screen components (_open `src/screens` to view them_), let us create another screen component called `Profile` that will act as the second tab. Create a new file called `src/screens/Profile.js` with the following code snippet:

```js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Profile(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default Profile;
```

## Create a tab navigator

In this section, let us set up a basic Tab navigator. Start by renaming the file `MainStackNavigator` to `AppNavigator.js` in the directory `src/navigation`.

After the renaming, the routes config file, after other import statements, import the `createBottomTabNavigator` from `@react-navigation/bottom-tabs` as well as the `Profile` screen component.

```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// add this after other import statements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Settings from '../screens/Settings';
// add this after other import statements
import Profile from '../screens/Profile';
```

Then create an instance of the `createBottomTabNavigator` called `Tab` as below:

```js
// after other instances
const Tab = createBottomTabNavigator();
```

Next, create a function called `MainTabNavigator()`. Using `Tab.Navigator` you can define the structure of the routes and use `Tab.Screen` you can define each of the routes.

Let us define tab routes for now: `Home` and `Profile`.

```js
function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
```

Now, in the `MainStackNavigator()` instead of passing the `Home` screen, let us pass the `MainTabNavigator`.

```js
<Stack.Screen name="Home" component={MainTabNavigator} />
```

Lastly, to make all of this work, open `App.js` file in the root of the project and modify the statement that imports the `MainStackNavigator` with the correct file name.

```js
import React from 'react';

// make sure this matches the file name of navigator config
import MainStackNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <MainStackNavigator />;
}
```

Go back to the terminal window, execute `expo start` and open up an Expo client inside a simulator or a real device. You are going to get the following result.

<img src='https://miro.medium.com/max/369/1*_noQNKBA1wUf8EkgNyCsQA.gif' />

## Adding icon and changing active tint color

From the last image, you notice that the active tab is highlighted by a tint color of blue and the non-active tab is of gray. Let us change this tint color.

Open `AppNavigator.js` file at `Tab.Navigator` add a prop called `tabBarOptions`. This prop allows you to customize the tab bar shared between different routes.

Add the following:

```js
<Tab.Navigator
  tabBarOptions={{
    activeTintColor: '#101010'
  }}
>
  {/* rest remains same */}
</Tab.Navigator>
```

Go to the simulator device, you are going to notice that the active tab bar label has a color of black from the previous blue.

<img src='https://miro.medium.com/max/350/1*y3hy861GwUm_mj1HCvr3Ew.png' />

Let us add some icons to the tab bar. Start by importing the `Ionicons` from `@expo/vector-icons`.

```js
import { Ionicons } from '@expo/vector-icons';
```

Then, in each `Tab.Screen`, add an options prop that is going to have a property of `tabBarIcon`. This function returns the component `Ionicons`. Pass the arguments `color` and `size` you can maintain the active tint color.

```js
<Tab.Navigator
  tabBarOptions={{
    activeTintColor: '#101010'
  }}
>
  <Tab.Screen
    name="Home"
    component={Home}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="ios-home" color={color} size={size} />
      )
    }}
  />
  <Tab.Screen
    name="Profile"
    component={Profile}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="ios-person" size={size} color={color} />
      )
    }}
  />
</Tab.Navigator>
```

Here is the output:

<img src='https://miro.medium.com/max/350/1*3G4fINzTR9vNIGQzujkegQ.png' />

You can even change the background of the tab bar by adding a `style` property to `tabBarOptions`.

```js
<Tab.Navigator
  tabBarOptions={{
    activeTintColor: '#101010',
    style: {
      backgroundColor: '#ffd700'
    }
  }}
>
  {/* rest remains same */}
</Tab.Navigator>
```

Here is the output for the above snippet:

<img src='https://miro.medium.com/max/350/1*Gxk9p_0XQ2z-y-sYHH7Epw.png' />

## Passing screenOptions in a Tab Navigator

The previous section is one way to add icons to each route or screen in the tab bar. There is another way you can do it by passing `screenOptions` in the wrapper `Tab.Navigator`. This prop is used to modify or add common styles to a navigator.

```js
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#101010',
        style: {
          backgroundColor: '#ffd700'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == 'Home') {
            iconName = 'ios-home';
          } else if (route.name == 'Profile') {
            iconName = 'ios-person';
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
```

There is no change in the functioning of the tab navigator from the previous section, as you can notice below:

<img src='https://miro.medium.com/max/369/1*X06mUqbYfHKYEDdPAVBJjA.gif' />

## Updating the header title for the nested child navigator

Right now the title for each tab screen is going to be the same. This is because the root navigator (which, here is the Stack Navigator) structure is going to look at its immediate children, which are Home, Detail and Settings screen. In the current scenario, if you are to set the title for the `Profile` screen passing the prop `options`, it is not going to work.

This is because the `Profile` screen is a child of the Tab Navigator and not Stack Navigator. The tab navigator is nested inside the Stack navigator and thus, Profile is not the immediate child to Stack Navigator.

For each tab to have its own title (since the tab navigator is nested inside the stack navigator), you have to determine the title for a specific tab screen based on the navigation state from the property `route.state`.

This can be done by defining a helper function called `getHeaderTitle` that has `route` as its parameter. Why pass `route`? Because it contains the `state` property which refers to the child's navigator state and the value of the currently active route name can be obtained from this state.

Add a function called `getHeaderTitle` in `AppNavigator.js` file.

```js
function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Profile':
      return 'Profile';
  }
}
```

Then, [as per the recommended way](https://reactnavigation.org/docs/en/screen-options-resolution.html#__docusaurus), add the options prop to the `Stack.Screen` route whose value is `Home`.

```js
<Stack.Screen
  name="Home"
  component={MainTabNavigator}
  options={({ route }) => ({
    headerTitle: getHeaderTitle(route)
  })}
/>
```

Now, when visiting the `Profile` tab, you are going to get the desired title in the header.

<img src='https://miro.medium.com/max/369/1*gCs24QDMEQ_D6DcDxjiALw.gif' />

## Conclusion

_Congratulations! You’ve completed this tutorial._

In this tutorial, we discuss only one scenario of nesting navigators. The main objective here is to get familiar with the component-based configuration of the Tab Navigator in the latest version of the `react-navigation` library.

Here is the link to the complete Tab Navigator API [here](https://reactnavigation.org/docs/en/bottom-tab-navigator.html) I'd recommend you to check.

You can find the complete code for this tutorial at this [GitHub repo](https://github.com/amandeepmittal/react-native-examples/tree/master/reactnav5-tab-navigator).

Originally published at [Heartbeat.fritz.ai](https://heartbeat.fritz.ai/nesting-tab-and-stack-navigators-in-react-native-and-expo-apps-cc118a141e70)

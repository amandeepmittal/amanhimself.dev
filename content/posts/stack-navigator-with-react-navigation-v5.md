---
title: 'Getting Started with Stack Navigator using react-navigation 5 in React Native and Expo apps'
date: '2020-02-21'
slug: 'stack-navigator-with-react-navigation-v5'
thumbnail: '/thumbnails/expo.png'
template: post
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/getting-started-with-stack-navigator-using-react-navigation-5-in-react-native-and-expo-apps-4c516becaee1'
---

[React Navigation](https://reactnavigation.org/) as the library released its 5th stable version recently, just being two years old. Without a doubt, it is one of the most popular navigation solutions in React Native apps that also has support for the Expo.

Recently, it underwent some core changes and how you used to define routes till `react-navigation` version `4.x.x` has some major changes as to how you are going to define routes using the latest version of the library.

Some of the major highlights the team of maintainers released in a [blog post](https://reactnavigation.org/blog/) are that the navigation patterns are now more component-based, common use cases can now be handled with pre-defined Hooks, new architecture allows you to configure and update a screen from the component itself and some other changes that you can dwell in the [blog post here](https://reactnavigation.org/blog/).

The major highlight from these new changes in the component based configuration. If you have experience developing with web development libraries such as Reactjs in combination with `react-router`, you won't experience much of a learning curve here. However, if you are diving into React Native recently, and chances are that you are going to use `react-navigation`, I'd recommend starting with this latest version. I hope this tutorial serves as a starting point or a refreshing one in your journey.

If you’d like to receive **more React Native tutorials** in your inbox, you can sign up for my newsletter **[here](https://amanhimself.substack.com/)**.

## Table of contents

- Install dependencies
- Create mock screens
- Create a basic stack navigator
- Specifying options for each screen in Stack Navigator
- Navigating between two screens
- Enabling gestures in react-navigation
- Passing data between routes
- How to use params in the screen's title
- Using common screenOptions to modify header styles
- Making the back button title invisible on iOS
- Understanding header modes and changing it in an Android app
- Directly navigating from the third screen to the top of the stack screen navigator
- Conclusion

## Requirements

Requirements for this tutorial is simple. Have the following installed on your local dev environment.

- Node.js version >= `10.x.x` installed
- Have access to one package manager such as npm or yarn
- Latest `expo-cli` version installed or use npx

Do note that, without dwelling much into the configuration of native binaries with the `react-navigation` library, I am going to `expo-cli` to generate the project and Expo client to view output from time to time. Make sure you have both installed.

## Install dependencies

To start, generate a new Expo project with a `blank` template by running the following command in a terminal window.

```shell
npx expo init [Project Name]

# after the project directory has been generated

cd [Project Name]
```

Next, install the following dependencies for the `react-navigation` library to work. The first command is going to install core utilities of `react-navigation` that are used by navigators to create the navigation structure in the app. The second command uses `expo install` instead of `npm install` or `yarn add`. The reason is that `expo` is going to install the version of the libraries mentioned that are compatible with the Expo SDK.

```shell
yarn add @react-navigation/native @react-navigation/stack

# use expo install for Expo projects only
expo install react-native-gesture-handler react-native-reanimated
react-native-screens react-native-safe-area-context
@react-native-community/masked-view
```

Do note that the package `@react-navigation/stack` is only required to install when you are going to use the Stack navigation pattern in the app. For example, if you are just going to use tab navigation, you are going to install a different package as shown [here](https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html).

## Create mock screens

Create a new directory `src/screens` and inside it, create two new files called `Home.js` and `Detail.js`. The code snippet for both of these files is listed below:

```js
// src/screens/Home.js

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
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

export default Home;

// src/screens/Detail.js

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Details() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details Screen</Text>
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

export default Details;
```

These screen components are for demonstration purposes. You have to feed the routes to the navigator to work with, these screen components are going to the routes.

## Create a basic stack navigator

In this section, let us set up a basic Stack navigator. Start by creating a new directory `src/navigation`. The best definition of what a Stack Navigator does can be read from its docs. I am going to quote it here:

> React Navigation's stack navigator provides a way for your app to transition between screens and manage navigation history. If your app uses only one stack navigator then it is conceptually similar to how a web browser handles navigation state - your app pushes and pops items from the navigation stack as users interact with it, and this results in the user seeing different screens.

Now that you have an idea of what exactly a stack navigation pattern is, let us start by creating one. Inside the `src/navigation` directory, create a new file called `MainStackNavigator.js` and import the following statements:

```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
```

From the above snippet, the `NavigationContainer` is a component that manages the navigation tree. It also contains the navigation state and it has to wrap all navigators structure.

The `createStackNavigator` is a function that is used to implement a stack navigation pattern. This function returns two React components: `Screen` and `Navigator` that help to configure each component screen. For now, let us add one screen to this navigation pattern.

```js
const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
```

In the above snippet, there are two required props with each `Stack.Screen`. The prop `name` refers to the name of the route and prop `component` specifies which screen to render at the particular route.

Do not forget to export the `MainStackNavigator` since it is going to be imported in the root of the app, that is, inside `App.js` file as shown below.

```js
import React from 'react';

import MainStackNavigator from './src/navigation/MainStackNavigator';

export default function App() {
  return <MainStackNavigator />;
}
```

Execute the command `expo start` and make sure the Expo client is running either in a simulator device or a real device. You are going to get the HomeScreen as the following result.

<img src='https://miro.medium.com/max/350/1*xO2cNaDxKiisiipKN6YhdA.png' />

## Specifying options for each screen in Stack Navigator

By default, it shows the title bar on the screen. However, you can set the title of the screen. Let us change the title of the screen shown, from `Home` to render `Home Screen`.

This is done by specifying the options on each screen as shown below. Open `MainStackNavigator.js` file and the prop `options` on `Stack.Screen` for `Home` component.

```js
<Stack.Screen name="Home" component={Home} options={{ title: 'Home Screen' }} />
```

The changes are instantly reflected in the Expo client.

<img src='https://miro.medium.com/max/350/1*YV2HwIMzcnU1-GbSaEAkAg.png' />

## Navigating between two screens

In the current stack navigator structure, let us add the second screen component called `Detail`. Import it from `screens/Detail.js` and another route as shown below.

```js
// rest import statements remain same
import Detail from '../screens/Detail';

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: 'Detail Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

To see that `Detail` screen is currently in our stack, try adding the prop `initialRouteName` on `Stack.Navigator`. The first screen that renders is going to be the `Detail` screen.

```js
<Stack.Navigator initialRouteName='Detail'>
```

Here is the output:

<img src='https://miro.medium.com/max/350/1*2FuxHYiJZtynAxlu7XoSog.png' />

But we need a way to navigate from the Home screen to the Detail screen not just display the later screen as the initial route. Change the value of `initialRouteName` to `Home`.

```js
<Stack.Navigator initialRouteName='Home'>
```

Then, open `screen/Home.js` and a button component that is going to navigate to the Detail screen when pressed.

Import `TouchableOpacity` from `react-native` core and make sure to utilize the `navigation` prop passed to the `Home` screen. This prop is passed to every screen that is a route wrapped by the Stack Navigator.

```js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Home(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Detail')}
      >
        <Text style={styles.buttonText}>Go to Detail Screen</Text>
      </TouchableOpacity>
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
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Home;
```

Here is the changed Home screen:

<img src='https://miro.medium.com/max/350/1*7Ap75E1ik7p3HCUYyDT2jA.png' />

## Enabling gestures in react-navigation

If you press the button, you are going to notice that it navigates you to the Detail screen. On the Detail screen, do note that the back button with the name of the previous screen is shown in the header.

<img src='https://miro.medium.com/max/374/1*c70jHetvl1YYf4dJu3u5Lw.gif' />

The above demo is how the navigation between two-screen works on an iOS device. The default native transition on iOS when using stack navigation is that the screen is pushed or pulled from the right side. On Android, as you will notice below, the behavior is different. The new screen is pushed from the bottom.

<img src='https://miro.medium.com/max/327/1*D8q7w0OjqFJQVUtQZw6U0g.gif' />

Also, in the below demo notice that on iOS swipe gesture works when going back from Detail to Home screen. On Android, it doesn't.

<img src='https://miro.medium.com/max/825/1*1w3g_Wymp31A4siy7PcSNw.gif' />

To enable gestures on Android as well, in `Stack.Navigator` you have to add a prop called `screenOptions`. This prop is used when you want to pass some value to all the children's routes of a stack navigator.

```js
<Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          gestureEnabled: true
        }}>
```

This is going to enable the gestures on Android as well.

<img src='https://miro.medium.com/max/825/1*0Z0iyNBAjToSldPXaChgHQ.gif' />

## Passing data between routes

You can pass parameters to a route by putting the params in an object as the second argument using `navigation.navigate`. Let's mimic a small example by passing data from Home to Detail screen.

Add the following mock object for some data in `Home.js`.

```js
const character = {
  name: 'Luke Skywalker',
  home: 'Tatooine',
  species: 'human'
};
```

Then, in the same screen component file, modify the `TouchableOpacity` and pass the previous object as the second argument.

```js
<TouchableOpacity
  style={styles.buttonContainer}
  onPress={() => navigation.navigate('Detail', { item: character })}
>
  <Text style={styles.buttonText}>Who is {character.name}?</Text>
</TouchableOpacity>
```

Here is the output:

<img src='https://miro.medium.com/max/350/1*cGivoNSclkmj6yUVdYQVnw.png' />

Open `Detail.js` and add the following code snippet. Using `route.params` this screen component can read the parameters passed from the Home screen. Inside the `Detail` component, let us destructure the `route.params` and then display those values.

```js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Detail(props) {
  const { route } = props;
  const { item } = route.params;
  const { name, home, species } = item;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Name: {name}</Text>
        <Text style={styles.cardText}>Home Planet: {home}</Text>
        <Text style={styles.cardText}>Species: {species}</Text>
      </View>
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
  },
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 5
  }
});

export default Detail;
```

Here is the output showing above works:

<img src='https://miro.medium.com/max/825/1*dq6r8ObVqOAjyVwg8dFj3A.gif' />

## How to use params in the screen's title

You can use params in the title of the screen component. For example, instead of saying `Detail Screen`, it could say the name of the character.

This can be done by passing `route` as an object in options for Detail screen in `MainStackNavigator.js` file and use the value of the title from `route.params.item.name`.

```js
<Stack.Screen
  name="Detail"
  component={Detail}
  options={({ route }) => ({
    title: route.params.item.name
  })}
/>
```

Here is the output:

<img src='https://miro.medium.com/max/825/1*Pu2ML5XbSihSxOqLloTfGg.gif' />

## Using common screenOptions to modify header styles

You can use the prop `screenOptions` to apply common styles to the header across the navigator. For example, in the code snippet, below, let us set two properties, `headerStyle`, `headerTintColor` and `headerTitleStyle` to change the background color of all screen headers as well as the color of the title on each screen.

```js
<Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    gestureEnabled: true,
    headerStyle: {
      backgroundColor: '#101010'
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerTintColor: '#ffd700'
  }}
>
  {/* ... */}
</Stack.Navigator>
```

The `headerStyle` is a style object that can be used to set the `backgroundColor` of the header for the screen component.

The `headerTitleStyle` is another style object that allows you to customize the title or the text of the header.

The `headerTintColor` is the color property for both the back button and the title of the header.

Here is the output in action after the above changes:

<img src='https://miro.medium.com/max/825/1*Xyt-C0u-SN151ybZTiD6Bw.gif' />

## Making the back button title invisible on iOS

So far, you must have noticed that on iOS the back button shows the name of the previous screen by default. On Android, this behavior is only shown by a back button icon.

To make an iOS app just to show the back button icon instead of the name of the previous screen in the stack, add the following property to `screenOptions` on `Stack.Navigator`.

```js
<Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    gestureEnabled: true,
    headerStyle: {
      backgroundColor: '#101010'
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerTintColor: '#ffd700',
    headerBackTitleVisible: false
  }}
>
  {/* ... */}
</Stack.Navigator>
```

Here is the output:

<img src='https://miro.medium.com/max/825/1*2v_4y5qgHX89sDGEyr326A.gif' />

## Understanding header modes and changing it in the Android app

Using the react-navigation library, there are three header modes available that render the header in different ways. By default on iOS, the `headerMode` is of the value of `float`.

On Android, the value `screen` is commonly used. These are the native patterns of how a header renders on each platform. The last header mode value is `none` which abolishes any header to render.

Take a look at the below demo of how it differs on both platforms.

<img src='https://miro.medium.com/max/825/1*4VtcuE-YrenIvI8NcaLQ6w.gif' />

In the section, let us make the header mode of the Android app behave in the same way as the iOS app. Just add the property `headerMode` with the value of `float` in `Stack.Navigator`.

```js
<Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    gestureEnabled: true,
    headerStyle: {
      backgroundColor: '#101010'
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerTintColor: '#ffd700',
    headerBackTitleVisible: false
  }}
  headerMode="float"
>
  {/* ... */}
</Stack.Navigator>
```

The header in the Android app, when navigating from one screen to another, is going to stay fixed, just link in the iOS app.

<img src='https://miro.medium.com/max/825/1*oKb19-8G5_fBf-SGz6_dGw.gif' />

## Directly navigating from the third screen to the top of the stack screen navigator

In this section, let us create a small demo on how you can leverage a helper method from `navigation` prop to navigate back to the top or first screen in the stack navigator from any other screen in navigator's structure, no matter how deep.

Start by creating a new file called `Settings.js` inside the `src/screens/` directory and the following component snippet.

```js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
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

export default Settings;
```

Next, modify the `MainStackNavigator.js` file and import a new screen.

```js
import Settings from '../screens/Settings';
```

Add this newly imported screen to the current `Stack.Navigator`.

```js
<Stack.Screen
  name="Settings"
  component={Settings}
  options={{ title: 'Settings' }}
/>
```

Open, `Detail.js` and modify it to add a button. When this button is pressed, the navigator leads to the Settings screen.

```js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Detail(props) {
  const { route, navigation } = props;
  const { item } = route.params;
  const { name, home, species } = item;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Name: {name}</Text>
        <Text style={styles.cardText}>Home Planet: {home}</Text>
        <Text style={styles.cardText}>Species: {species}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
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
  },
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 5
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Detail;
```

In the following demo, you are going to notice that to move back from Settings screen to Home screen, you have to pass through the Detail screen.

<img src='https://miro.medium.com/max/825/1*hNtPWfht4_b3uer51fGrTA.gif' />

However, using the helper method `navigation.popToTop()` without any arguments, you can navigate from Settings screen to the Home screen directly.

To accomplish this, modify the `Settings.js` file as below by adding a button. The `onPress` of this button is going to make use of the helper method.

```js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Settings(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
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
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Settings;
```

Here is the demo:

<img src='https://miro.medium.com/max/825/1*IUWdHNEwH4bLtRzBwQ8yng.gif' />

## Conclusion

_Congratulations! You’ve completed this tutorial._

In this tutorial, we have discussed many strategies and properties that you can apply and implement in your Stack navigator. The main objective is to get familiar with the component-based configuration of the Stack Navigator in the latest version of the `react-navigation` library.

Here is the link to the complete Stack Navigator API [here](https://reactnavigation.org/docs/en/stack-navigator.html) I'd recommend you to check.

[Source code](https://github.com/amandeepmittal/react-native-examples/tree/master/reactnav5-stack-navigator)

Originally published at [Heartbeat.fritz.ai](https://heartbeat.fritz.ai/getting-started-with-stack-navigator-using-react-navigation-5-in-react-native-and-expo-apps-4c516becaee1)

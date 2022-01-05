---
title: 'How to Create a Custom Tab Bar in React Native'
slug: 'create-custom-tab-bar-in-react-native'
date: '2021-05-07'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://blog.crowdbotics.com/how-to-create-a-custom-tab-bar-in-react-native/'
---

[React Native](https://reactnative.dev/) is an amazing tool for creating beautiful and high performing mobile applications that run on both iOS and Android. Developing these apps, you might need navigation to navigate from one screen to another. To implement navigation in a React Native app, [React Navigation](https://reactnavigation.org/docs/getting-started) library does an awesome job of providing various navigation patterns such as stack, tabs, and drawer that can be utilized and customize based on the UI design of the app.

In this post, let's create a custom tab bar using React Navigation library bottom tabs component. We are going to create a simple tab bar and then learn how to make it translucent using a [Blur view](https://github.com/Kureev/react-native-blur).

## Pre-requisites

To follow this tutorial, please make sure you are familiarized with JavaScript/ES6 and meet the following requirements in your local dev environment:

- [Node.js](https://nodejs.org/) version >= `12.x.x` installed.
- Have access to one package manager such as npm or yarn or npx.
- [react-native-cli](https://www.npmjs.com/package/react-native-cli) installed, or use npx.

## Installing react-navigation library

To create a new React Native app, please execute the following command from a terminal window on your local dev environment. Navigate inside the project directory created by `react-native-cli` and then install the dependencies:

```shell
npx react-native init customTabBar

cd customTabBar

# install dependencies
yarn add @react-navigation/native @react-navigation/bottom-tabs react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view react-native-vector-icons @react-native-community/blur
```

Do note that to demonstrate the example described in this article, we are using React Navigation v5 library. After installing these dependencies, please import the Gesture Handler library at the top of the `index.js` file of your React Native app:

```js
import 'react-native-gesture-handler';
```

Then, for iOS, install the Cocoapods for all these dependencies by navigating inside the `ios` directory in a terminal window and executing the following command. Do note that, if you do not have the Cocoapods installed on your local dev machine, please follow the alternate command as described below:

```shell
cd ios && pod install

# after pods are installed
cd ..

# alternate command
npx pod-install ios
```

## Installing react-native-vector-icons

The `react-native-vector-icons` module needs a bit more configuration steps for the iOS and Android platforms.

For iOS, you need to add the following inside `ios/customTabBar/Info.plist`:

```c
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
  <string>Fontisto.ttf</string>
</array>
```

Then, the following to the `ios/Podfile` and run `cd ios && pod update` from a terminal window:

```js
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
```

For Android, add the following snippet in the file: `android/app/build.gradle`:

```java
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

That's it to setup the react-native-vector-icons library.

Since we have installed and configured everything we need to build and run the React Native app, you can now edit the `App.js` file which is the entry point of the React native app.

To build the app for iOS, please execute the command `npx react-native run-ios` from a terminal window. Similarly, the build command for Android is `npx react-native run-android`.

Here is the default app running after the building for iOS:

<img src='https://crowdbotics.ghost.io/content/images/2021/02/ss1-3.png' />

## Add mock screens

The tab bar of this example app is going to display three different tabs. The first tab is used to display a list of items with images such that when the tab bar is added to the app, we can configure its translucency.

Let's create them inside a separate directory called `screens/` and create the first file called `data.js` that contains the mock data to display inside the list view in the first tab. Add the following code snippet:

```js
// Images in this example demo are being used from Unsplash
// Manarola - https://unsplash.com/photos/rknrvCrfS1k
// Venezia - https://unsplash.com/photos/hFXZ5cNfkOk
// Prague - https://unsplash.com/photos/pz0P5piDQXs

export const data = [
  {
    id: '1',
    title: 'Manarola, Italy',
    description: 'The Cliffs of Cinque Terre',
    image_url:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
    iconName: 'location-pin'
  },

  {
    id: '2',
    title: 'Venezia, Italy',
    description: 'Rialto Bridge, Venezia, Italy',
    image_url:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=630&q=80',
    iconName: 'location-pin'
  },
  {
    id: '3',
    title: 'Prague, Czechia',
    description: 'Tram in Prague',
    image_url:
      'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    iconName: 'location-pin'
  },
  {
    id: '4',
    title: 'Venezia, Italy',
    description: 'Rialto Bridge, Venezia, Italy',
    image_url:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=630&q=80',
    iconName: 'location-pin'
  }
];
```

In the above code snippet, you can see that `data` is an array that has different objects. Let's create the first tab screen called `Home.js` where this array of mock data will be used. Import the following statements inside it and then define a custom and width and height of the image card. This image card is displayed inside the list view as the item. Using React Native's `Dimensions` API, the width and height of the image are calculated based on the width of the device's screen.

```js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import { data } from './data';

const { width } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;
```

Using a `Text` component, the title of the tab is displayed. Using the `ScrollView` the list of items is implemented by using JavaScript's `map()` method that allows to iterate over each item. After importing the statements, add the following snippet:

```js
const Home = () => {
  const tabBarheight = useBottomTabBarHeight();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Home</Text>
      </View>

      {/* Scrollable Content */}
      <View style={styles.scrollContainer}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={[
            styles.scrollContentContainer,
            { paddingBottom: tabBarheight }
          ]}
        >
          {data.map(item => (
            <View key={item.id} style={styles.imageContainer}>
              <Image
                style={styles.imageCard}
                source={{ uri: item.image_url }}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
```

Lastly, the add the styles reference for each component in the above snippet:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f'
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  title: {
    fontSize: 20,
    color: '#fff'
  },
  scrollContainer: {
    flex: 1
  },
  scrollContentContainer: {
    alignItems: 'center'
  },
  imageContainer: {
    marginBottom: 14
  },
  imageCard: {
    borderRadius: 14,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT
  }
});
```

The other two tab screens are created inside `Browse.js` and `Library.js` and they do not render much information other than the name of the tab screen. Let's keep them bare minimum for the brevity of this example.

Inside the file `Browse.js`, add the following code snippet:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Browse = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Browse</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f'
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Browse;
```

Inside the `Library.js` file, add the following snippet:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Library = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Library</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f'
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Library;
```

That's it for the tab screens and mocking data inside one of the tab screen components.

## How to create a tab bar

Create a new directory called `navigation/` at the root of the React Native project. In this directory, we are going to keep all the navigation configuration files. Inside it create a new directory called `TabNavigator`. It is going to have two separate files:

- `index.js` to initiate the complete Tab Bar configuration
- `CustomTabBar.js` to render the custom tab bar

Inside the file `TabNavigator/index.js` import the `createBottomTabNavigator` from `@react-navigation/bottom-tabs` package. Using this, a `Tab` object is initialized. This object allows defining the structure of the routes using `Tab.Navigator` and the define each route using the `Tab.Screen` component.

```js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home';
import Browse from '../../screens/Browse';
import Library from '../../screens/Library';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Browse" component={Browse} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
```

The simple tab bar configuration is done. To see it in action, let's wrap it with the `NavigationContainer` component inside the new file called `navigation/RootNavigator.js`. This component manages the navigation tree. It contains the navigation state prop.

```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
```

The last step is to import and render the Root Navigator from inside the `App.js` file:

```js
import React from 'react';
import { StatusBar } from 'react-native';

import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return (
    <>
      <StatusBar hidden />
      <RootNavigator />
    </>
  );
};

export default App;
```

On an iOS simulator, the tab bar is shown as below. There are no custom styles currently applicable on the tab bar. The way it looks is because the tab bar component from React Navigation library has some default styles.

<img src='https://crowdbotics.ghost.io/content/images/2021/02/ss2-1.png' />

## Add icons to the tab bar

To add icons to each tab, first import the `Icon` component from react-native-vector-icons` library inside the`navigation/TabNavigator/index.js` file. For this example, let's use AntDesign based icons.

```js
// after other import statements
import Icon from 'react-native-vector-icons/AntDesign';
```

Using the `screenOptions` object on `Tab.Navigator`, the configuration to display icons for each tab is enabled. This object has different methods and properties to enable different configurations. One such method is called `tabBarIcon` that allows us to display a custom icon for each tab. This function returns an `Icon` component that has props like `color` and `size` to apply tint color on the icon for each tab and define a numeric value for the size of the icon. It also has a prop called `name`
that allows defining which icon to be used for which screen.

Add the following code snippet:

```js
const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Browse':
      iconName = 'appstore-o';
      break;
    case 'Library':
      iconName = 'folder1';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color)
      })}
    >
      {/* rest remains same */}
    </Tab.Navigator>
  );
};
```

Go back to the iOS simulator and you will notice that the icons for each tab route are now displayed.

<img src='https://crowdbotics.ghost.io/content/images/2021/02/ss3.png' />

## Customizing the tab bar

To customize a tab bar, more options using the `tabBarOptions` object can be applied. This options object has properties to set active and inactive tint color for each tab, the background color for the whole tab bar, and so on.

Add the following options object on `Tab.Navigator`:

```js
<Tab.Navigator
// ...
tabBarOptions={{
  activeTintColor: 'white',
  inactiveTintColor: '#d9d9d9',
  style: {
    borderTopColor: '#66666666',
    backgroundColor: 'transparent',
    elevation: 0,
  },
}}
>
```

The property `elevation` is set to zero in the above code snippet such that there are no shadows overlap on Android when we will make the custom tab bar translucent in the next section.

## Making the tab bar translucent

To make the tab bar translucent, we are going to use `BlurView` component from [@react-native-community/blur](https://github.com/Kureev/react-native-blur) component. It is used to add a blur view effect on iOS and Android. It is going to wrap a component called `BottomTabBar` from @react-navigation/bottom-tabs library. This component is a React element that is used to display the actual tab bar. It is provided by a prop called `tabBar` on `Tab.Navigator`. Using this React element, the tab bar can be defined explicitly inside the `CustomTabBar.js` component file.

Start by adding the following snippet inside `TabNavigator/CustomTabBar.js` file:

```js
import React from 'react';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';

const CustomTabBar = props => {
  return <BottomTabBar {...props} />;
};

export default CustomTabBar;
```

The `props` received by this custom React component are passed from `tabBar` option. Add it on the `Tab.Navigator` inside `TabNavigator/index.js` file:

```js
<Tab.Navigator
  // ... rest remains same
  tabBar={(props) => <CustomTabBar {...props} />}
>
```

Using the `props` you can further modify the configuration of a bottom tab bar. We are not going to get into that since it's out of the scope of this article.

Inside the `CustomTabBar.js` file, wrap the `BottomTabBar` with `<BlurView>` component. It has a different set of props for iOS and Android to add the blur view effect.

For iOS, to create a blur view effect, add `blurType` which accepts the type of blur effect as a string value. On an iOS device, different values such as `light`, `dark`,` xlight`, `regular` etc. are available.

Another property `blurAmount` is applied to adjust the intensity of the blur effect. Similarly, for Android, in addition to these props, props such as `overLayColor` to set a custom overlay and `blurRadius` to manually adjust the blur effect radius are used.

To make sure to apply styles on the `BlurView` component such that the tab bar is displayed over the content of each screen, set its `position` to `absolute`.

Here is the final snippet for `CustomTabBar` component:

```js
<BlurView
  style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }}
  blurType="dark"
  blurAmount={10}
  blurRadius={25}
  overlayColor="transparent"
>
  <BottomTabBar {...props} />
</BlurView>
```

The tab bar is now translucent. Here is the example app running on an iOS simulator.

<img src='https://crowdbotics.ghost.io/content/images/2021/02/ss4.gif' />

Do notice that, since the `BlurView` component has the position set to `absolute` we need to apply the `paddingBottom` property at the `ScrollView` component inside the `Home.js` tab screen. The value of this property is going to be the height of the whole tab bar. To get the height of the current tab bar, the @react-navigation/bottom-tabs module has a hook called `useBottomTabBarHeight` that gives this value.

Add the import statement in the `screens/Home.js` file and inside it, use the hook to get the height as shown below and apply it as the value of the `paddingBottom` style property at the `ScrollView` component:

```js
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// ...

const Home = () => {
  const tabBarheight = useBottomTabBarHeight();

  // ...

  return (
    // ...
    <ScrollView
      indicatorStyle="white"
      contentContainerStyle={[
        styles.scrollContentContainer,
        {paddingBottom: tabBarheight},
    ]}>
  )
}
```

Back in the iOS simulator, you will notice that it works fine now:

<img src='https://crowdbotics.ghost.io/content/images/2021/02/ss5.gif' />

Running the app build on an Android device, the results are similar:

<img src='https://crowdbotics.ghost.io/content/images/2021/02/ss6.gif' />

## Conclusion

We have discussed only one scenario of customizing the bottom tab bar. The main objective here is to get familiar with the component-based configuration of the Tab Navigator in the latest version of the react-navigation library and learn the steps to create a custom tab bar.

Originally Published at **[Crowdbotics's Blog](https://blog.crowdbotics.com/how-to-create-a-custom-tab-bar-in-react-native/)**.

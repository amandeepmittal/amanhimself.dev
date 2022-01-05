---
title: 'Getting Started with React Native and Expo using Hooks in 2020'
date: '2020-01-17'
image: 'getting-started-with-react-native-expo-hooks-2020'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/getting-started-with-react-native-and-expo-using-hooks-in-2020-fb466c25b04c'
---

We live in the world of a variety of mobile devices majorly dominated by two platforms, iOS, and Android. It is a two-horse race and I am sure we can all agree on that. Building a mobile application is not an easy task though.

For iOS, you write code using Objective-C or Swift and for Android, you will find yourself using Java or Kotlin. Apart from different programming languages used to create a mobile that can run on each of the two platforms, the toolchains are entirely different too for both of these mobile platforms.

Many modern-day developers use a specific set of technology that is used to build web applications: HTML, CSS, and JavaScript. Different frameworks fall under the category commonly known as Hybrid applications. You can use almost one set of source code for developing the application for both iOS and Android platforms.

In recent years, hybrid frameworks have evolved coming from web view to use native APIs. This cross-platform approach of developing a mobile application comes with its own pros and cons.

One great option that falls under the umbrella of cross-platform development is [React Native](https://facebook.github.io/react-native/). Developed and used by Facebook as well others such as Tesla, Walmart, Uber Eats, Instagram, Discord, Wix and so on. React Native is based on Facebook’s web library ReactJS.

## What this tutorial is about?

React Hooks are available since the release version `16.8.x`. In this tutorial, you are going to get a quick introduction on how to use them in a React Native app. These functions allow using React state and a component’s lifecycle methods in a functional component. If you are familiar with React, you know that the functional component has been called as a functional stateless component since the introduction of `classes`, but not anymore.

Previously, a class component allowed you to have a local state. Using React Hooks, there is no requirement to refactor a class component React Native into a functional component only because you want to introduce local state or lifecycle methods in that component. However, they do not work with classes. React provides a few built-in Hooks such as useState and useEffect. You can also create your Hooks to re-use to manage state between different components.

## Table of contents

- Getting Started
- The entry point of a React Native app
- Setting up a stack navigation
- Adding the second screen to the stack navigator
- Adding a Floating Button component
- Adding a custom header component
- Implementing Hooks
- Adding a FlatList component to render notes
- Using Navigation parameters to update the state
- Running the app
- Conclusion

## Getting started

To quickly create a React Native app, let us use a tool called [Expo](https://expo.io/). It is a managed development toolset that provides a client to preview and make changes to React Native apps using JavaScript. You do not need tools such as Xcode or Android Studio to get started.

To generate a new app, open a terminal window and enter the following command to install the command-line tool provided by Expo itself.

```shell
npm install -g expo-cli
```

Next, step is to run `expo init` command and choose the default template `blank`.

```shell
# generate a new app
expo init expo-rnHooks

# make sure to navigate inside the project directory
cd expo-rnHooks
```

Once the project directory is generated, navigate inside it. The demo you are going to build requires the use of a navigation pattern between two screens. The first screen is going to display a list of items and through the second screen, you can add an item to the list. This is a typical stack navigation pattern and using the `react-navigation` library, you can add this to your React Native app.

The `react-navigation` library is a third party library that needs to be installed in a React Native or Expo app separately as a dependency. You can either use `npm` or `yarn` but I am going to stick with `yarn`. Each navigational pattern comes as a dependency too since the demo requires only one pattern, let us install that too.

The third library you are going to install is called [`react-native-paper`](https://callstack.github.io/react-native-paper/) that will provide a collection of custom UI components based on Material Design that you can integrate directly. Go back to the terminal window and execute the following command.

```shell
yarn add react-navigation react-navigation-stack
react-native-paper @react-native-community/masked-view
```

React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app. After the above step, Expo requires you to configure these core utilities as dependencies.

```shell
expo install react-navigation
react-native-gesture-handler
react-native-reanimated react-native-screens
react-navigation-stack
```

That's all for the setup. Let us build something.

## The entry point of a React Native app

The `App.js` file in the generated app structure is what initializes the Expo app. In other words, it is the entry point of the development process. By default, it displays a text message and uses a functional component for that. Open the `App.js` file and you are going to get the following screen component file.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```

Components are the visual elements that you see on the screen in a React Native app. The three major components to look for in the above code snippet are:

- `View`
- `Text`
- `StyleSheet`

A `View` component is the basic building block in a React Native component file. It maps to fundamental native iOS (`UIView`) and Android (`View`) components, hence its name. It puts a container element that supports layout styling with flexbox and other styles using a JavaScript object called `StyleSheet`. Hence, it can be said that `View` components are primarily used for styling and the layout of children elements.

The StyleSheet component in React Native provides an API to create styles inside the component file. It takes a JavaScript object as it does above, and returns a new StyleSheet object from it. There are no classes or IDs in React Native like in web development. To create a new style object, you can use the StyleSheet.create() method.

The `Text` component is in many ways just like the `View` component, except that it is specifically available to display text. Also, like the `View` component, it supports styling.

To see the default app in action, start the development server from the terminal window `expo start`. Either using a simulator or a real device (make sure it has an Expo client installed from the app store) you can test the app.

<img src='https://miro.medium.com/max/509/1*9xg5D_74gvTYRyt89JL_KA.png' />

## Setting up a stack navigation

The `react-navigation-stack` library provides an inbuilt function that returns a React component. This function, `createStackNavigator` takes a route configuration object and an options object (_which is optional_).

The `react-navigation` library provides a function called `createAppContainer` that returns a React component. It takes React component created by the `createStackNavigator` as a parameter and is be directly exported to `App.js` to be used as our App's root component.

To create the first route, you need to create the first screen. Create a new file called `ViewNotes.js` inside `src/screens` directory. This screen is going to be served as the first or home screen of the app. Right now, let us add some mock components and later we will add UI component to reflect the demo app.

```js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

function ViewNotes() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You do not have any notes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  }
});

export default ViewNotes;
```

Next, create a new file called `index.js` inside `src/navigation/` with the following code snippet.

```js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ViewNotes from '../screens/ViewNotes';

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    }
  },
  {
    initialRouteName: 'ViewNotes',
    headerMode: 'none'
  }
);

export default createAppContainer(StackNavigator);
```

In the above code snippet, the parameters such as `initialRouteName` and `headerMode` are passed as the optional object properties. The first object contains the route configuration.

To see this in action, open the `App.js` file, import the navigator created above as well as `PaperProvider` component from `react-native-paper`. This provider is going to wrap the navigator and provides the theme to all the components in the framework. I

```js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
```

Make sure the development server is running. You are going to get the following output in an Expo client.

<img src='https://miro.medium.com/max/509/1*yVurLxAGaVp5CiEynWKl5w.png' />

## Adding the second screen to the stack navigator

To complete the navigation process, let us set up the other screen with some mock text to display. Inside `src/screens/` create another file called `AddNotes.js` and the following code snippet.

```js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

function AddNotes() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add Notes modal screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  }
});

export default AddNotes;
```

Open the `navigation/index.js` file and modify the stack navigator.

```js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ViewNotes from '../screens/ViewNotes';
import AddNotes from '../screens/AddNotes';

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    }
  },
  {
    initialRouteName: 'ViewNotes',
    headerMode: 'none',
    mode: 'modal'
  }
);

export default createAppContainer(StackNavigator);
```

Do note that in the _options_ object, adds a `mode` for stack navigator to `modal`. A modal is like a popup and displays the content but temporarily blocks the interaction from the primary screen, which in this case is `ViewNotes` screen. To access the second screen you still require to add a way to navigate.

## Adding a Floating Button component

Since `react-native-paper` provides cross-platform components to add to the app. In this section, let us add a floating button on the `ViewNotes` screen that can be used to navigate to the `AddNotes` screen. Import the component from the UI library.

```js
import { Text, FAB } from 'react-native-paper';
```

Next, modify the return function and a `FAB` component as well as corresponding styles to position it at the bottom of the screen.

```js
function ViewNotes({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You do not have any notes</Text>
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Add new note"
        onPress={() => navigation.navigate('AddNotes')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  }
});
```

In the Expo client you are going to get the following output:

<img src='https://miro.medium.com/max/509/1*o_Sco68X5QLpboYqHkg8kw.png' />

Also, when you click the FAB button, it will navigate you to the `AddNotes` screen.

<img src='https://miro.medium.com/max/378/1*G1YJr6IgxikVul-JVhNhsQ.gif' />

This is done by navigation props from `react-navigation`. Using `navigation.navigate` as the value of the button press prop `onPress`, the app will navigate to the screen with its name passed as the second parameter.

```js
onPress={() => navigation.navigate('AddNotes')}
```

## Adding a custom header component

In this section, let us build a custom header component that is reusable for both of the screens currently residing in the app. Inside the directory `src/components/` create a new file called `Header.js` file.

Import the following components from `react-native` and `react-native-paper`.

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title } from 'react-native-paper';
```

The `Appbar` is a component that displays items in a bar. Each of the items can have an action associated but for the demo app, you only require it to display a title. Add the following code snippet that consists of the component as well as the corresponding styles.

The `Header` component is going to accept one prop `titleText` that is the title of a specific screen.

```js
function Header({ titleText }) {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#60DBC5'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#2E7166'
  }
});

export default Header;
```

Import this component in `ViewNotes.js` and modify the contents of the component file in order to display the header.

```js
// add the following statement
import Header from '../components/Header';

// modify ViewNotes component
function ViewNotes({ navigation }) {
  return (
    <>
      <Header titleText="Simple Note Taker" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>You do not have any notes</Text>
        </View>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Add new note"
          onPress={() => navigation.navigate('AddNotes')}
        />
      </View>
    </>
  );
}
```

The following is going to be the output.

<img src='https://miro.medium.com/max/509/1*PbKVolX0GTycuojptMpSBQ.png' />

Similarly, modify the `AddNotes.js` file.

```js
// add the following statement
import Header from '../components/Header';

// modify AddNotes component
function AddNotes() {
  return (
    <>
      <Header titleText="Add a new note" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Notes modal screen</Text>
        </View>
      </View>
    </>
  );
}
```

Here is the output:

<img src='https://miro.medium.com/max/509/1*WBDEbWvNeRd-QMWRPvqxXQ.png' />

## Implementing Hooks

To clearly understand how functional components could be leveraged to manage a state’s component, let us try to go through one of the most basic examples by leveraging one of the few built-in Hooks like `useState`.

Open `ViewNotes.js` file and start by importing `useState` from the React library.

```js
import React, { useState } from 'react';
```

Let us an array to store and display all the notes. Using the array later as the value to the `FlatList` component, you can easily render each note. In a functional component, you can define a default state variable as shown below.

```js
function ViewNotes({ navigation }) {
  const [notes, setNotes] = useState([]);

  // ...
}
```

React preserves the state between all the re-rendering that happens. The hook `useState` returns a pair of values. In the above snippet, the first one being the `notes` which holds the current value of an empty array (_by default_) and the second, `setNotes` is a function that lets you update the current value or in the out case, add items to the array.

To add items to the array, let us create a helper method called `addNotes`.

```js
const addNote = note => {
  note.id = notes.length + 1;
  setNotes([...notes, note]);
};
```

## Adding a FlatList component to render notes

When the array `notes` is empty, let us display a text message that indicates that there is no item in the list otherwise render a `FlatList` component. To do this, you have to import the component itself first.

The component `FlatList` is an efficient way to create scrolling data lists in a React Native app. It has a simple API to work with and is more efficient and preferment with a large amount of information to display in comparison to its alternate.

```js
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
```

Next, modify the JSX of the `ViewNotes` component. Do take note that when navigating to `AddNotes` screen, you have to pass it as a prop. This can be done by passing it as the second parameter to `navigation.navigate` function.

```js
return (
  <>
    <Header titleText="Simple Note Taker" />
    <View style={styles.container}>
      {notes.length === 0 ? (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>You do not have any notes</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <List.Item
              title={item.noteTitle}
              description={item.noteValue}
              descriptionNumberOfLines={1}
              titleStyle={styles.listTitle}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Add new note"
        // add a second parameter object
        onPress={() =>
          navigation.navigate('AddNote', {
            addNote
          })
        }
      />
    </View>
  </>
);
```

From the above snippet, observe that there are three primary props that a FlatList component requires to display a list of data:

- `data`: an array of data that is used to create a list. Generally, this array is built of multiple objects.
- `renderItem`: is a function that takes an individual element from the data array and renders it on the UI.
- `keyExtractor`: it tells the list of data to use the unique identifiers or id for an individual element.

Also, add the `listTitle` inside the `StyleSheet` object.

```js
listTitle: {
  fontSize: 20;
}
```

## Using Navigation parameters to update the state

Since there are no notes, for now, let us modify the `AddNotes` screen to make it functional. This screen is responsible to add a note to the `ViewNotes` screen. Start by modifying the existing import statements.

```js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, TextInput, FAB } from 'react-native-paper';
```

Using the hook `useState` the component is going to hold the value of each note's title and its description as `noteTitle` and `noteValue`.

```js
function AddNote({ navigation }) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteValue, setNoteValue] = useState('');

  // ...
}
```

The `IconButton` component from `react-native-paper` is going to be used to close the modal. After that add two input fields using `TextInput` that are going to take the user value for the title of the note and its description.

Lastly, using a `FAB` component, the user can submit the form. This component is going to be temporarily disabled of there is no title provided for the note. It can be done by using the `disabled` prop.

On clicking this button the component using `navigation` props is going to perform to actions simultaneously. It is going to save the note's title and its description as well as perform an action to go back to the `ViewNotes` screen.

Here is the complete `AddNotes` code snippet along with corresponding styles.

```js
function AddNote({ navigation }) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteValue, setNoteValue] = useState('');

  function onSaveNote() {
    navigation.state.params.addNote({ noteTitle, noteValue });
    navigation.goBack();
  }
  return (
    <>
      <Header titleText="Add a new note" />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <TextInput
          label="Add Title Here"
          value={noteTitle}
          mode="outlined"
          onChangeText={setNoteTitle}
          style={styles.title}
        />
        <TextInput
          label="Add Note Here"
          value={noteValue}
          onChangeText={setNoteValue}
          mode="flat"
          multiline={true}
          style={styles.text}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <FAB
          style={styles.fab}
          small
          icon="check"
          disabled={noteTitle == '' ? true : false}
          onPress={() => onSaveNote()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  text: {
    height: 300,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0
  }
});

export default AddNote;
```

Here is the output you are going to get when navigating to the `AddNotes` screen.

<img src='https://miro.medium.com/max/509/1*bwq4b8Y-YilTgZkWO2YCEA.png' />

## Running the app

The demo app is complete and ready to be tested. In the Expo client image below, and you can find a demo for adding a note and rendering the note.

<img src='https://miro.medium.com/max/378/1*hcV-c1jFreqaSOkHORxoMA.gif' />

## Conclusion

If you are getting started in React Native development, Expo as a toolkit can serve you well in your journey. Instead of dwelling much into iOS and Android development setup which can be overwhelming at the start, I'd recommend the least possible amount of tooling and incline more towards learning the core APIs and fundamentals of React Native.

The way the Expo is being maintained and adding support for Web and universal apps, it going to be an important part of the journey.

Originally published at [Heartbeat.fritz.ai](https://heartbeat.fritz.ai/getting-started-with-react-native-and-expo-using-hooks-in-2020-fb466c25b04c)

---
title: 'Building offline React Native apps with AsyncStorage'
date: '2019-08-18'
slug: 'building-offline-react-native-apps-with-asyncstorage'
thumbnail: '/thumbnails/expo.png'
tag: 'react-native'
canonicalUrl: 'https://heartbeat.fritz.ai/building-offline-react-native-apps-with-asyncstorage-dcb4b0657f93'
---

![cover](https://i.imgur.com/5eoYxcI.png)

> [Originally published at Heartbeat](https://heartbeat.fritz.ai/building-offline-react-native-apps-with-asyncstorage-dcb4b0657f93)

As developers, we love exploring concepts and mechanisms while working with a new framework. React Native as a cross-platform development framework has come quite far in terms of a mature framework since I started playing around with it and then using it for its purpose. Understanding the fundamentals when learning it is something very helpful, and I consider, important.

Thus, applying basic fundamentals of React Native knowledge, in this tutorial, I am going to walk you through how to build a todo list application using an offline storage functionality. This storage functionality is provided by a native module in React Native, called `AsyncStorage`.

In the journey of building this application, you are going to use a UI component library known as [Native Base](https://docs.nativebase.io/docs/GetStarted.html), which is one of the most popular libraries to build user interfaces among React Native developers. Out of the box, this library speeds up the development process by providing pre-defined UI components that can either be used as they are available or customize them according to our needs.

## What are we building?

The outcome from following this tutorial is going to be a complete React Native application that works with realtime offline data from the storage of the device.

<img src='https://cdn-images-1.medium.com/max/800/1*FBBSWT3Xztc0G9wAGnz1yA.gif' />

## Table of Contents

- Prerequisites
- Create an Expo app
- Exploring AsyncStorage
- Utilizing AsyncStorage API
- Adding Navigation
- Creating a Floating Action Button (FAB)
- Navigating between Two Screens
- Customize the Header Component
- Rendering a list of items using FlatList
- Reading Data using AsyncStorage API
- Adding a Todolist Item
- Deleting a Todolist Item
- Mark an Item Check or Uncheck on completion
- Passing Data between different screens using the navigation
- Display each todo list item
- Bonus Section: Adding a Segment
- Conclusion

## Prerequisites

To follow this tutorial, please make sure you have the following installed on your local development environment and have access to the services mentioned below:

- [Node.js](https://nodejs.org/en/) (>=`8.x.x`) with npm/yarn installed.
- [expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli/?) (>=`3.0.4`), previously known as create-react-native-app.

It will be best if you use the same exact versions or higher of each utility tool described above. To run and test the React Native application, all you need is an Expo client installed either on your device or an iOS simulator or an Android emulator. Please note that, throughout this tutorial, I will be using an iOS simulator to demonstrate the application.

## Create an Expo app

To get started, all you require is to generate a new Expo project. This could be done by opening a terminal window, navigating to a suitable location where you develop projects and running the following commands in the order they are described.

```shell
expo init offline-todolist-app

# navigate inside the app folder
cd offline-todolist-app

# install the following dependencies
yarn add react-navigation native-base
expo-font@5.0.1 lodash.values uuid
```

The last command, as described in the above snippet installs five dependencies that the application is going to use. `yarn` is currently being used as the package manager. You can also use `npm` instead of `yarn`. The use of each dependency will be made clear as throughout this tutorial as they are used. If this is your first time building a React Native application, try not to get overwhelmed by them.

## Exploring AsyncStorage

`AsyncStorage` is a simple, asynchronous key-value pair used in React Native applications. It is used for a variety of scenarios but mainly to store data when your app is not using any cloud services, or you want to implement some features in your app that require data storage.

It operates globally in a React Native and comes with its own limitations. As a React Native developer, you have to know what these limitations. The first limitation of an `AsyncStorage` API is that the size of the database is set to `6MB` limit. Also, `AsyncStorage` storage is based on SQLite. Thus, it is important to keep [SQLite limitations](https://www.sqlite.org/limits.html) in mind too. Also, it is hard to store complex and nested data structures in form of key-value pairs. Knowing about these limitations, only help you to opt for the persistent solution when developing a mobile app.

According to the [React Native's official documentation](https://facebook.github.io/react-native/docs/asyncstorage):

> On iOS, AsyncStorage is backed by native code that stores small values in a serialized dictionary and larger values in separate files. On Android, AsyncStorage will use either RocksDB or SQLite based on what is available.

## Utilizing AsyncStorage API

Before you dive deep in building the Todolist app, in this section, let us build a small app that saves a value to the `AsyncStorage`, fetches the value from the storage in the client-side React Native app. This will help you how to write basic operations using the storage API. Lastly, you will learn about how to clear the storage completely.

Open `App.js` file and add the following snippet. Start by importing the necessary components from React Native API. The most important one here is `AsyncStorage`. After that, define a variable named `STORAGE_KEY`. This variable will be used to store and retrieve the stored data using the `AsyncStorage` API. Think of it as an identifier for the value being stored or name of the key in the key-value pair. Since you are going to store only one value at the moment, there is only the requirement for one key.

```js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

const STORAGE_KEY = '@save_name';
```

Next, let us define an initial state with two empty strings. They are going to be used to save the value of the user input and then retrieve the value to display it on the app screen. After defining the initial state, there is going to be a lifecycle method that is going to load the data when the application starts for the first time or the App component renders.

```js
class App extends React.Component {
  state = {
    text: '',
    name: ''
  };

  componentDidMount() {
    this.retrieveData();
  }

  // ...
}
```

In the above snippet, do note that the `App` component is actually a class component and not the default functional component that comes with boilerplate Expo app. Now, there are going to be three methods that will help to store the data, retrieve the data, and clear the app data that is stored. This is going to be done by creating three asynchronous methods. Each of the methods is going to utilize the appropriate API method from `AsyncStorage` API. Every method in the `AsyncStorage` API is a promise-based, hence, let us use `async/await` syntax to follow good practice.

```js
retrieveData = async () => {
  try {
    const name = await AsyncStorage.getItem(STORAGE_KEY);

    if (name !== null) {
      this.setState({ name });
    }
  } catch (e) {
    alert('Failed to load name.');
  }
};
```

In the above snippet, the name of the method implies what they are going to do in the app. The `retrieveData` method is what fetches the data from the storage if it exists. It uses the same identifier that you defined previously, outside the class function component. It utilises the parameter in the state object `name`. Later in the app, you are going to use this parameter to display its stored value. Note that, there is an `if` condition inside this method. This condition says that to fetch the data only when there is a value for the `name` variable exists. This method also uses `try/catch` as they are part and parcel of writing functions with modern `async/await` syntax. Lastly, this method is being invoked inside the lifecycle method.

The next function is going to save the data. In the below snippet, you will find that it uses a parameter `name` which on success, is the value that is stored. An alert message will be shown when the input data is saved.

```js
save = async name => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, name);
    alert('Data successfully saved!');
    this.setState({ name });
  } catch (e) {
    alert('Failed to save name.');
  }
};
```

The last method that you are going to utilize from the `AsyncStorage` API is called `clear()`. This deletes everything that is previously saved. It is not recommended to use this method directly if you want to delete only a specific item from the storage. For that, there are methods like `removeItem` or `multiRemove` available by the API. You can read more about them in the official documentation [here](https://facebook.github.io/react-native/docs/asyncstorage#clear) or later when building the Todolist application.

```js
removeEverything = async () => {
  try {
    await AsyncStorage.clear();
    alert('Storage successfully cleared!');
  } catch (e) {
    alert('Failed to clear the async storage.');
  }
};
```

This snippet will throw an `Alert` box on the device screen when everything is cleared from the storage.

The last two methods are going to be used to create a controlled input.

```js
onChangeText = text => this.setState({ text });

onSubmitEditing = () => {
  const onSave = this.save;
  const { text } = this.state;

  if (!text) return;

  onSave(text);
  this.setState({ text: '' });
};
```

After that, add the code snippet for the `render` method, followed by the styles for each UI component. Lastly, do not forget to export `App` component for it to run on the simulator or the real device.

```js
render() {
        const { text, name } = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={text}
                    placeholder='Type your name, hit enter, and refresh'
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                />
                <Text style={styles.text}>Hello {name}!</Text>
                <TouchableOpacity onPress={this.removeEverything} style={styles.button}>
                    <Text style={styles.buttonText}>Clear Storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
} // class component App ends here

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        padding: 10,
        backgroundColor: '#00ADCF'
    },
    input: {
        padding: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        margin: 10
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#FF851B'
    },
    buttonText: {
        fontSize: 14,
        color: '#fff'
    }
})

export default App
```

Now to run the application, go to the terminal window and execute the command `expo start`. After that, you will see the following screen on the simulator.

<img src='https://cdn-images-1.medium.com/max/800/1*92vU3B3f_FmUCXk8xKwtSg.png' />

Since there is no data stored right now, the text after the word `Hello` is empty. Use the input field to save a string or a name or anything and then press the enter key. You will get the following output. Whatever input you entered, it will be displayed next to the word `Hello`.

<img src='https://cdn-images-1.medium.com/max/800/1*twgilQew9SwvBq2YnEbIqg.png' />

Even if you refresh the Expo client, the value stored does not go away. Only when pressing the button below `Hello` statement that says `Clear Storage` is the way to delete the stored value.

<img src='https://cdn-images-1.medium.com/max/800/1*6yeaeFLns1JwU0wyeqMptQ.png' />

Refresh the Expo client after you clear the storage to get the following output.

<img src='https://cdn-images-1.medium.com/max/800/1*CRhOwbo1d-iTUOEb0v-MAQ.png' />

This complete the section where you learned about how to utilize `AsyncStorage` API to save and fetch the data. From the next section onwards, you will be building the Todolist application.

## Organizing the application

Since a React Native application was already generated in the previous step, you can continue to utilize that app by modifying everything inside the `App.js` file. Or create a new one if it serves you well.

You have already installed the necessary npm modules. This is the time to start utilizing them in order to build the offline todo list app. Before beginning with the development of the app, create the following folders and files inside them. This will give a structure to manage the app later or if you want to extend by adding new features to it.

<img src='https://cdn-images-1.medium.com/max/800/1*kg7x_WrXqP6U13af4OBJsA.png' />

From the structure, notice that there are three new folders being created. This structure is the separation of concerns between the different aspect of a mobile app. Such as files or configuration related to navigation should be separated from the screens. The above structure is also a common pattern that many React Native developers have started to follow in their work.

## Adding Navigation

Inside the `navigation` folder, there is an `index.js` file that is going to hold all the configuration there is to be defined. The reason `react-navigation` module is used is to create a stack navigator that allows the user to visit the two screens the following application has. The navigation mode is going to be `modal`. Yes, you can utilize `pre-defined` navigation modes or animation patterns.

Let us start by importing the necessary components inside the `index.js` file.

```js
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
```

From the above snippet, notice that the `createStackNavigator` is a function that returns a React component. It takes a route configuration object. The `createAppContainer` is responsible for linking the current React Native app while maintaining the navigation state from the top-level component. The top-level component in your app is `App`.

With the help of `createAppContainer`, you are going to create a provider and wrap the `App` component inside it. This will benefit the entire application as every screen or component defined is going to have a navigation state. You will learn some of the many benefits provided by the navigation state later.

Lastly, in the above snippet, there are going to be a screen component. These screen components are going to hold the business logic necessary to run the todo list app. You can think of them as containers.

Right now, the route configuration object is going to be as the following snippet.

```js
const StackNav = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    AddTask: {
      screen: AddTaskScreen
    }
  },
  {
    mode: 'modal'
  }
);
```

The `mode` is important to specify here. It defines the style for rendering the next screen component. In the above case, it is `AddTask` screen. In an iOS or Android app, the default transition is always a `card`. You are changing this default transition by specifying the `mode` property and setting its value to `modal`.

The `modal` pattern Make the screens slide in from the bottom, which is a common iOS pattern. Only works on iOS but has no effect on Android.

Lastly, you have to export the app container that utilizes the `StackNav`. Here is the code for that.

```js
const RootNavigator = createAppContainer(StackNav);

export default RootNavigator;
```

Now, open `App.js` file and add the following content.

```js
import React from 'react';
import RootNavigator from './navigation';

export default function App() {
  return <RootNavigator />;
}
```

Before running the app, make sure there is a mock component to render inside the files `HomeScreen.js` and `AddTaskScreen.js`. Otherwise, it will throw an error. You can add the dummy component for now.

```js
// HomeScreen.js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text> Offline Todolist App</Text>
      </View>
    );
  }
}

export default HomeScreen;

// AddTaskScreen.js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class AddTaskScreen extends Component {
  render() {
    return (
      <View>
        <Text>Add Task Screen</Text>
      </View>
    );
  }
}

export default AddTaskScreen;
```

Now run the app using `expo start` command, and you will get the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*Mz6vFfwIwz7rWNIa9o-F4Q.png' />

This completes the navigation section.

## Create a Floating button

Inside the `components/FloatingButton.js` file, you are going to create a floating action button or in mobile development, commonly known as FABs. These type of buttons are often distinguished by a circled icon floating above the UI in a fixed position. If you are an Android user or have seen a mobile app following any material design specification, you might have noticed them.

In the current app, this `FloatingButton` is going to be responsible for navigating from the `HomeScreen` to the `AddTaskScreen`. Since it is going to be a presentation component, you should define it as a functional component that accepts only one prop. This prop `actionOnPress` is going to be a method defined inside the `HomeScreen.js` file that will contain the logic of navigating between the two screens later.

One important thing to notice in the snippet below is that the component library `native-base` is being used to create the FAB button. It saves a good amount of time and lines of code to create and style a component like below.

```js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Fab } from 'native-base';

const FloatingButton = ({ actionOnPress }) => (
  <Fab
    direction="up"
    style={styles.button}
    position="bottomRight"
    onPress={actionOnPress}
  >
    <Icon name="ios-add" />
  </Fab>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5859f2'
  }
});

export default FloatingButton;
```

## Navigating Between Two Screens

Once you have defined it, go to the file `HomeScreen.js` and the following snippet of code.

```js
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import FloatingButton from '../components/FloatingButton';

export class HomeScreen extends Component {
  state = {
    isDataReady: false
  };
  componentDidMount = () => {
    this.loadFonts();
  };

  loadFonts = async () => {
    try {
      await Font.loadAsync({
        Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        Ionicons: require('../node_modules/native-base/Fonts/Ionicons.ttf')
      });
      this.setState({ isDataReady: true });
    } catch (err) {
      alert('Application Error. Cannot load fonts.');
    }
  };

  onPressFab = () => {
    this.props.navigation.navigate('AddTask');
  };

  render() {
    const { isDataReady } = this.state;

    if (!isDataReady) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <FloatingButton actionOnPress={this.onPressFab} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeScreen;
```

In the above snippet, the first and important thing to notice is the `loadFonts` method. This asynchronous method is a requirement to make Native Base UI library to work in any React Native, and Expo generated application. NativeBase use some custom fonts that are loaded using `Font.loadAsync` function. This function is provided by the expo module `expo-font` which allows you to use any fonts or icons in React Native components.

The `AppLoading` method is a React component that tells Expo to keep the app loading screen visible until `Font.loadAsync()` the method has run successfully. In general, this a useful method to utilize when your app is using custom fonts, logos, icons, and so on. In the current application, you are going to utilize this React component again when fetching data from `AsyncStorage` API (_that you will see in action later in this tutorial_). The `AppLoading` will only stop running when the boolean value for the state variable `isDataReady` is set to true. This boolean value is only set to true when `Font.loadAsync()` has finished running.

Once the application has loaded all necessary fonts and icons, you will get the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*AJUj06CEsej1vn7YUtj-Ow.png' />

From the above snippet, take a look at the method `onPressFab` which is being passed to the `FloatingButton` component as the prop `actionOnPress`. This function utilizes a navigation method provided called `navigation.navigate()` with the value of the screen being passed as the argument: `AddTask`. Do note that, the value of the argument being passed should be the exact name of the screen defined earlier when configuring `StackNavigator`. Click on the button, and you will be directed to the next screen.

<img src='https://cdn-images-1.medium.com/max/800/1*Zfx3sB6akHo9tEILTQbHQg.gif' />

Did you notice the `back` button on the `AddTaskScreen`? This is again where `react-navigation` comes in handy. While working on a real-time React Native application, you often want to use the `react-navigation` library if it suits your requirements. It provides simple solutions out of the box.

## Customize the Header Component

With Native Base components library, it is easy to customize a header component in few lines of code. Inside the file `Header.js` add the following snippet. Again, this is a functional component since it is going to enhance the UI and is not running business logic.

```js
import React from 'react';
import { Header as NBHeader, Body, Title } from 'native-base';

const Header = () => {
  return (
    <NBHeader style={{ backgroundColor: '#5859f2' }}>
      <Body>
        <Title style={{ color: '#ffffff' }}>Header</Title>
      </Body>
    </NBHeader>
  );
};

export default Header;
```

The `Header` component from the `native-base` library takes a `Body` as an input. The body can further contain the rendering logic to modify the existing default `Header` component from the native base library itself. You can use inline styles or even `StyleSheet` object from `react-native` to customize the `Header` component as above, or any other native base UI component in general. Take a look at the `backgroundColor` and the `color` to the `Title`. `Title` is where the text to be displayed on this component goes.

Import this component inside the `HomeScreen.js` file. Also, import the `StatusBar` component from the `react-native`. Since the background of the `Header` component is going to be a customize blue color, it is better to change the default dark `StatusBar` style into something pleasing and light.

```js
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Header from '../components/Header';
```

Inside the class component, the first thing you have to do is hide the header that is being provided by the stack navigator from `react-navigation` library. The object `navigationOptions` is how to customize the default navigators that `react-navigation` renders.

```js
    static navigationOptions = {
        header: null
  }
```

Next, inside the `render()` method add the following before the omnipresent `Text` component.

```js
<Header />
<StatusBar barStyle='light-content' />
<Text>Home Screen</Text>
```

The rest of the code inside the `HomeScreen.js` file remains unchanged. The `StatusBar` is modified by defining the a value using its pre-defined prop `barStyle`. When using a Header component from Native Base UI library, the `StatusBar` from React Native comes after you define the JSX code for the header. Notice this in the above snippet. This is how it works with Native Base library. The following screen is what you get as the result of the above snippets.

<img src='https://cdn-images-1.medium.com/max/800/1*5m9TTlsGA60IeijZz4OfzA.png' />

## Rendering a list of items using FlatList

In this section, you are going to set up a List component that accepts mock or dummy data from an array defined as a property to the initial state. Open `HomeScreen.js` file and modify the state for now.

```js
state = {
  isDataReady: false,
  mockItems: ['First Item', 'Second Item', 'Third Item']
};
```

_Why dummy data?_ Later when you are going to hook `AsyncStorage` API to save and fetch the data from the database, in other words, playing around with real-time data operations, there are going to be separate methods that are going to handle each of the data operations. For now, let us hook up the business logic to display a list of items as well as the ability to add a new item using the modal screen you have set up in the previous steps.

The `FlatList` component is the ideal way to display a list of items in a React Native application.
It is a cross-platform component, and by default a vertical way to display a list of data items. It requires two props: `data` and `renderItem`. The `data` is the source of information for the list in the form of an array. The `renderItem` takes one item from the source, iterates over them, and returns a formatted component to render those items.

Styles that can be applied to a FlatList component is done by the prop `contentContainerStyle` that accepts the value of Stylesheet object. The reason to use `FlatList` is that it is performance effective. Of course, you can use `ScrollView` but it renders items from memory, which is not a very performant effective way to display a lengthy list of items. `ScrollView` is a wrapper on the View component that provides the user interface for scrollable lists inside a React Native app.

In the file `HomeScreen.js` replace the `Text` component with following `FlatList` and do not forget to import it and custom presentational component `Item` that is going to display each item in the list.

```js
// import statements
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import Item from '../components/Item';

// in render method, replace <Text> with the following
<FlatList
  data={this.state.mockItems}
  contentContainerStyle={styles.content}
  renderItem={row => {
    return <Item text={row.item} />;
  }}
  keyExtractor={item => item.id}
/>;
```

Now open the file `components/Item.js` and add the following snippet.

```js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const Item = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#5859f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center'
  },
  text: {
    color: '#4F50DC',
    fontSize: 18,
    marginVertical: 20,
    paddingLeft: 10
  }
});

export default Item;
```

Another new React Native component to notice in the above snippet is `Dimensions`. It helps to set the initial `width` and `height` of a component before the application runs. We are using its `get()` method to acquire the current device's width and height.

In the simulator, you will get the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*33XlaFACBb_SE4IsyLzIfg.png' />

## Reading Data using AsyncStorage API

In this section, you are going to add all methods that will contain business logic to save and fetch the data from the `AsyncStorage`. This logic will be composed of three operations:

- add a todolist item
- fetch all items to display
- delete an item from the list
- also, check the state of each list item whether it is marked as completed or not

These operations are going to communicate with the realtime data on the device. You are going to use objects instead of an array to store these items. `AsyncStorage` operates on key-value pairs and not arrays. Each object is going to be identified through a unique ID. In order to generate unique IDs, you are going to use a module called `uuid` which was installed earlier.

The structure of each todo item is going to be like this:

```js
45745c60-7b1a-11e8-9c9c-2d42b21b1a3e: {
  id: 45745c60-7b1a-11e8-9c9c-2d42b21b1a3e,           // same id as the object
  textValue: 'New item',     // name of the ToDo item
  isCompleted: false,   // by default, mark the item unchecked
  createdAt: Date.now()
}
```

But if you are going to use Objects instead of an array, how are you going to iterate over each item in the object? `FlatList` component only takes an array to iterate. Well, do you remember installing a utility package called `lodash.values`? That package is going to be really helpful in converting the object into an array.

First, let us start by importing all components and custom components required in order to build the application inside `HomeScreen.js` file.

```js
import React, { Component } from 'react';
import {
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import uuidv1 from 'uuid/v1';
import _values from 'lodash.values';
import { Button, Text as NBText } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Header from '../components/Header';
import Item from '../components/Item';
import FloatingButton from '../components/FloatingButton';
```

After writing these import statements, let us modify the initial state.

```js
state = {
  todos: {},
  isDataReady: false
};
```

From the above snippet, do take a note that the dummy array of data is replaced by the object `todos`. Next, you are going to write an asynchronous method to load the todos items from the object that is stored using `AsyncStorage` API. Also, let us merge the previous asynchronous method to load all the fonts with this method, such as the value of the initial state `isDataReady` is set to the boolean `true` only once. You will also have to modify the contents of the lifecycle method.

```js
componentDidMount = () => {
  this.loadTodos();
};

loadTodos = async () => {
  try {
    await Font.loadAsync({
      Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf')
    });

    const getTodos = await AsyncStorage.getItem('todos');
    const parsedTodos = JSON.parse(getTodos);
    this.setState({ isDataReady: true, todos: parsedTodos || {} });
  } catch (err) {
    alert('Application Error. Cannot load data.');
  }
};
```

`AsyncStorage.getItem()` reads anything saved on the device database. It is essential to parse the data incoming from the storage into JSON. If you are not parsing the data, the application is going to crash. When setting the state in the above snippet, the `todos` object is getting the default value of an empty object is there is no data from the storage. This is also an essential step to perform and keep in mind for other use cases with similar scenarios.

## Adding a Todolist Item

Now, let us add the second method `addTodo` that is actually going to add the new item in the storage. The method defines before `addTodo` is actually storing the items in the storage. Again, you are using `JSON.stringify()` since AsyncStorage requires the data to be a string inside the single object. So when saving the item if you are not using `JSON.stringify()` your app is going to crash.

The `AsyncStorage.setItem()`is the function from the API that is similar to any key-value paired database. It takes the first argument, `todos` in the snippet below. This argument value is going to be the name of the store.

The parameter `newTask` passed to the `addTodo` function is going to be the object. Using `if` statement, there is a check whether the todo item being entered is not empty. `this.setState` uses a callback method that has access to `prevState` object. It gives any todo item that has been previously added to the list.

Inside the callback, you are first creating a new ID using `uuidv1` method. Then create an object called `newTodoObject` which uses the ID as a variable for the name. This object represents each item in the todo list.

Further, create a new object called `newState` which uses the `prevState` object, and finally adds `newTodoObject` object in todoliist of items. It might sound overwhelming since a lot is going on but try implementing the code, you will understand it better.

```js
saveTodos = newToDos => {
  const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos));
};

addTodo = newTask => {
  const newTodoItem = newTask;

  if (newTodoItem !== '') {
    this.setState(prevState => {
      const ID = uuidv1();
      const newToDoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          textValue: newTodoItem,
          createdAt: Date.now()
        }
      };
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          ...newToDoObject
        }
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  }
};
```

## Deleting a Todolist Item

Similar to the `addTodo` method, you are going to add another method called `deleteTodo`. This will take care of removing an individual item from the list on the basis of `id` of that item object. Since you are using the `id` of the object both to identify the object inside the bigger object `todos` and assign each individual object the same `id`, the following code saves a lot of time. At last, using the `saveTodos` method, the storage is being updated with a remaining number of items.

```js
deleteTodo = id => {
  this.setState(prevState => {
    const todos = prevState.todos;
    delete todos[id];
    const newState = {
      ...prevState,
      ...todos
    };
    this.saveTodos(newState.todos);
    return { ...newState };
  });
};
```

## Mark a Todo Item Check or Uncheck on completion

The last two methods that are going to take care of whether each individual item is checked or not are going to be represented by `inCompleteTodo` and `completeTodo` methods. Both of these methods are going track which items in the to-do list have been marked completed by the user or have been unmarked.

They are going to act as a toggle and only update the value of `isCompleted` instead rather updating the whole todo list item object. This is again, possible because of a unique `id` for each object. Again in the last, before each of the methods returns the new state, using the `saveTodos` method, the storage gets an update.

```js
inCompleteTodo = id => {
  this.setState(prevState => {
    const newState = {
      ...prevState,
      todos: {
        ...prevState.todos,
        [id]: {
          ...prevState.todos[id],
          isCompleted: false
        }
      }
    };
    this.saveTodos(newState.todos);
    return { ...newState };
  });
};

completeTodo = id => {
  this.setState(prevState => {
    const newState = {
      ...prevState,
      todos: {
        ...prevState.todos,
        [id]: {
          ...prevState.todos[id],
          isCompleted: true
        }
      }
    };
    this.saveTodos(newState.todos);
    return { ...newState };
  });
};
```

## Passing Data between different screens using the navigation

In this section, you are going to edit each render method that is responsible for displaying the interface for the operations you defined in the previous sections, to happen in realtime. Let us start by editing `onPressFab` method inside the `HomeScreen.js`.

This method right navigates to the `AddTaskScreen`. By passing an object with to add a new item to the list (_hence, pass the method addTodo_) you are going to utilize another advantage that a sleek library `react-navigation` provides. That is, to pass data between different screens.

First, edit the `onPressFab` method like the below snippet.

```js
onPressFab = () => {
  this.props.navigation.navigate('AddTask', {
    saveItem: this.addTodo
  });
};
```

Next, open `AddTaskScreen.js` and add the following snippet.

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import { Form, Item, Input, Button, Text as NBText } from 'native-base';

export class AddTaskScreen extends Component {
  state = {
    text: ''
  };

  onChangeText = event => {
    this.setState({ task: event.nativeEvent.text });
  };

  onAddTask = () => {
    this.props.navigation.state.params.saveItem(this.state.task);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View>
        <View style={{ marginRight: 10 }}>
          <Form>
            <Item>
              <Input
                value={this.state.task}
                placeholder="Enter a new task..."
                autoFocus
                clearButtonMode="always"
                autoCorrect={false}
                onChange={this.onChangeText}
                onSubmitEditing={this.onAddTask}
                returnKeyType={'done'}
              />
            </Item>
          </Form>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            style={{
              backgroundColor: '#5067FF',
              margin: 25,
              justifyContent: 'center'
            }}
            onPress={this.onAddTask}
          >
            <NBText style={{ fontWeight: 'bold' }}>Add Task</NBText>
          </Button>
        </View>
      </View>
    );
  }
}

export default AddTaskScreen;
```

The snippet above uses the native base library to create a controlled input form to let the user add a new item to the todo list. Next, it has a button to add the item. Since the `Input` component from Native Base is based on the React Native's `TextInput`, you can use all the props that are available to `TextInput`.

Also, take a note that, to create an input field when using Native base as the UI library, the `Input` component has to be wrapped by an `Item` which is further wrapped inside `Form` element.

Here is a brief overview of the props used in the above snippet.

- **value**: the value of the text input. By default, it will be an empty string since we are using the local state to set it. As the state updates, the value of the text input updates.
- **placeholder**: just like in HTML, a placeholder is to define a default message in the input field indicating as if what is expected.
- **onChange**: is a callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler `onChangeText`. This handler accepts the text value from `event.nativeEvent`.
- **clearButtonMode**: a clear button should appear on the right side of the text view. The default value is `never` that you are modifying to `always` in the above component.
- **returnKeyType**: determines how the return key on the device's keyboard should look. You can find more values or platform-specific values here. Some of the values are specific to each platform.
- **autoCorrect**: this prop let us decide whether to show the autocorrect bar along with keyboard or not. In the current case, you have set it to false.
- **onSubmitEditing**: contains the business the logic in the form of a callback as to what to do when the return key or input's submit button is pressed. We will be defining this callback in Main.js.

Lastly, take a look at the method `onAddTask` which uses navigation state to save the text value of the todo item. After use presses the button or the handler `onSubmitEditing` triggers, it is going to further run the method `addTodo` from `HomeScreen` and navigate back to the `HomeScreen` itself, using the navigation props method `goBack()`.

On Clicking the Fab button, you get the following screen.

<img src='https://cdn-images-1.medium.com/max/800/1*DZNwtEddDkxQz8ZCDwqB5w.png' />

## Display each todo list item

To display each todo list item, you will have first to pass the props as shown below using the `renderItem` in the `FlatList`.

```js
<Item
  isCompleted={row.item.isCompleted}
  textValue={row.item.textValue}
  id={row.item.id}
  deleteTodo={this.deleteTodo}
  completeTodo={this.completeTodo}
  inCompleteTodo={this.inCompleteTodo}
/>
```

Next, go to `Item.js` file and add the following snippet.

```js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Icon } from 'native-base';

const { width } = Dimensions.get('window');

const Item = ({
  inCompleteTodo,
  completeTodo,
  textValue,
  id,
  deleteTodo,
  isCompleted
}) => {
  toggleItem = () => {
    if (isCompleted) {
      inCompleteTodo(id);
    } else {
      completeTodo(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={this.toggleItem}>
          <Icon
            name={isCompleted ? 'checkmark-circle' : 'radio-button-off'}
            style={{ paddingLeft: 10, color: '#7A7AF6' }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.text,
            {
              opacity: isCompleted ? 0.5 : 1.0,
              textDecorationLine: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? '#7A7AF6' : '#4F50DC'
            }
          ]}
        >
          {textValue}
        </Text>
      </View>
      <TouchableOpacity onPressOut={() => deleteTodo(id)}>
        <Icon name="md-trash" style={{ color: '#ABADF9', paddingRight: 10 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#5859f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: '#4F50DC',
    fontSize: 18,
    marginVertical: 20,
    paddingLeft: 10
  },

  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center'
  }
});

export default Item;
```

In the above snippet, the key points to note are, using Native Base, you can use the `Icon` component (_since you are already loading the Ionicons library in the parent component asynchronously_). Next, the props `Item` components receive are to toggle an item's state of whether it is complete or not, display the text value of the item and lastly, a button to delete the item itself.

Save the component file, hop back on the simulator file, and try adding one or many items in this list.

<img src='https://cdn-images-1.medium.com/max/800/1*dceKxEqQMGXk0h_-J75gFg.gif' />

See everything works. Even on refreshing the app, and the items do not disappear.

## Bonus Section: Adding a Segment

In this section, you are going to separate the UI for managing the completed list of items and items that are pending to be done. To provide this feature, you are going to use Native Base library solely.

Keeping the data source same from the storage API, let modify the state by adding one more property. Open `HomeScreen.js` file and add the following.

```js
// add "filter" to existing the state
state = {
  todos: {},
  isDataReady: false,
  filter: 'Todo'
};
```

The value of the `filter` is going to be `Todo` by default. This means it is going to show the pending todo list items as the home screen to the user.

Next, you are going to add another handler function called `filteredItems`. This method will evaluate the value of the state and filter the values from the `todos` to match the state. Again, to use JavaScript filter method, you are going to convert `todos` object using lodash method `_values`.

```js
filteredItems = () => {
  if (this.state.filter === 'Todo') {
    return _values(this.state.todos).filter(i => {
      return !i.isCompleted;
    });
  }
  if (this.state.filter === 'Complete') {
    return _values(this.state.todos).filter(i => {
      return i.isCompleted;
    });
  }
  return this.state.todos;
};
```

Next, let us modify the render method to achieve the desired result. Inside the render method, you are going to add a new UI element from Native base called `Segment`. This is going to display two buttons, each of which can be activated when pressed. The activation of each this button depends on the value of the state property `filter`.

```js
// import Segment from Native Base
import { Button, Text as NBText, Segment } from 'native-base'

// inside the render method...

const { isDataReady, filter } = this.state

// just before flatlist add a new view

    <View style={styles.contentHeader}>
        <Segment style={{ backgroundColor: '#ffffff' }}>
            <Button active={filter === 'Todo'} onPress={() => this.setState({ filter: 'Todo' })}>
                <NBText>Todo</NBText>
            </Button>
            <Button
                last
                active={filter === 'Complete'}
                onPress={() => this.setState({ filter: 'Complete' })}
            >
                <NBText>Complete</NBText>
            </Button>
        </Segment>
    </View>

// styles corresponding to the new View element

contentHeader: {
    alignItems: 'center',
    justifyContent: 'center'
}
```

Lastly, change the value of the `data` prop on `FlatList` and set it to the item returned from the method `filteredItems()`.

```js
<FlatList
  data={_values(this.filteredItems())}
  // rest remains same
/>
```

You will get the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*FBBSWT3Xztc0G9wAGnz1yA.gif' />

## Conclusion

_Congratulations!_ You have just learned how to build an offline mobile application using latest tech stack and libraries like React Native, Expo, and Native Base component UI. You have learned many key points in this tutorial, and I hope you enjoyed following it, and reading it. Use the knowledge you have gained in this tutorial in a realtime application and show it to your peers. The possibilities to enhance this application or the use the knowledge is endless.

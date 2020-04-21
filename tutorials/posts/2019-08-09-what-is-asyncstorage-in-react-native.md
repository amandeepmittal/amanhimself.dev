---
date: 2019-08-09
title: 'What is AsyncStorage in React Native?'
template: post
thumbnail: '../thumbnails/expo.png'
slug: what-is-asyncstorage-in-react-native
categories:
  - Expo
  - React Native
tags:
  - expo
  - react-native
---

![Cover Image Credits to Unsplash and Tom Pumford](https://thepracticaldev.s3.amazonaws.com/i/kotjuaqy9356q06ndqfc.jpg)

`AsyncStorage` is a simple, asynchronous key-value pair used in React Native applications. It’s used for a variety of scenarios but mainly to store data when your app is not using any cloud services, or when you want to implement features in your app that require data storage.

It operates globally in a React Native app and comes with its own limitations. As a React Native developer, you have to know what these limitations are. The first limitation of an `AsyncStorage` API is that the size of the database is set to a 6MB limit. Also, `AsyncStorage` storage is based on SQLite.

Thus, it’s important to keep [SQLite limitations](https://www.sqlite.org/limits.html) in mind, too. Also, it’s hard to store complex and nested data structures in the form of key-value pairs. Knowing about these limitations will help you to opt for the best solution when developing a mobile app.

According to the [React Native’s official documentation](https://facebook.github.io/react-native/docs/asyncstorage):

> On iOS, AsyncStorage is backed by native code that stores small values in a serialized dictionary and larger values in separate files. On Android, AsyncStorage will use either RocksDB or SQLite based on what is available.

## Create an Expo app

To get started, you’ll need to generate a new Expo project. This could be done by opening a terminal window, navigating to a suitable location where you develop projects, and running the following commands in the order they’re described.

```shell
expo init offline-app

# navigate inside the app folder
cd offline-app
```

Note: yarn is currently being used as the package manager. You can also use npm instead of yarn.

## Utilizing the AsyncStorage API

In this section, let’s build an app that saves a value to `AsyncStorage` and fetches the value from the storage in the client-side React Native app. This will help you learn how to write basic operations using the storage API. Lastly, you’ll learn about how to clear the storage completely.

Open the `App.js` file and add the snippet below. Start by importing the necessary components from the React Native API. The most important one here is `AsyncStorage`. After that, define a variable named `STORAGE_KEY`. This variable will be used to store and retrieve the stored data using the `AsyncStorage` API.

Think of it as an identifier for the value being stored or the name of the key in the key-value pair. Since you’re going to store only one value at the moment, there’s only the requirement for one key.

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

Next, let’s define an initial state with two empty strings. They’re going to be used to save the value of the user input and then retrieve the value to display it on the app screen. After defining the initial state, there’s going to be a lifecycle method that will load the data when the application starts for the first time, or when the App component renders.

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

In the above snippet, note that the `App` component is actually a class component and not the default functional component that comes with boilerplate Expo app.

## Read the data

There are three asynchronous methods that will help to store the data, retrieve the data, and clear the app data that are stored. Each of these methods is going to utilize the appropriate API method from the `AsyncStorage` API. Every method in the AsyncStorage API is promise-based; hence, let’s use `async/await` syntax to follow best practices.

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

In the above snippet, the name of the method implies what it’s going to do in the app. The `retrieveData` method is what fetches the data from storage if it exists. It uses the same identifier that you defined previously, outside the class function component. It utilizes the parameter in the state object name.

Note that there’s an if condition inside this method. This condition makes sure that data is fetched only when a value for the name variable exists. This method also uses `try/catch`, as they are part and parcel of writing functions with modern `async/await` syntax. Lastly, this method is being invoked inside the lifecycle method.

## Save the Data

The next function is going to save the data. In the below snippet, you’ll find that it uses a parameter name, which, on success, is the value that’s stored. An alert message will be shown when the input data is saved.

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

## Remove Everything

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

This snippet will throw an alert box on the device screen when everything is cleared from storage.

## Completing the App

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

After that, add the code snippet for the `render` method, followed by the styles for each UI component. Lastly, don’t forget to export the `App` component so it can run on the simulator or the real device.

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

## Running the App

Now to run the application, go to the terminal window and execute the command `expo start`. After that, you’ll see the following screen on the simulator.

![ss1](https://miro.medium.com/max/350/1*92vU3B3f_FmUCXk8xKwtSg.png)

Since there’s no data stored right now, the text after the word `Hello` is empty. Use the input field to save a string or a name or anything you’d like, and then press the enter key. You’ll get the following output. Whatever input you entered, it will be displayed next to the word `Hello`.

![ss2](https://miro.medium.com/max/350/1*twgilQew9SwvBq2YnEbIqg.png)

Even if you refresh the Expo client, the value stored doesn’t go away. Only when pressing the button below the `Hello` statement that says `Clear Storage` will the stored value be removed.

![ss3](https://miro.medium.com/max/350/1*6yeaeFLns1JwU0wyeqMptQ.png)

Refresh the Expo client after you clear the storage to get the following output.

![ss4](https://miro.medium.com/max/350/1*CRhOwbo1d-iTUOEb0v-MAQ.png)

## Conclusion

This completes the section about using `AsyncStorage` API to save and fetch the data.

If you'd like to learn more about using `AsynStorage API` in a real-time React Native app, **learn how to build a complete Todolist app [here](https://heartbeat.fritz.ai/building-offline-react-native-apps-with-asyncstorage-dcb4b0657f93)**. In this post, you are going to use [Native Base](https://nativebase.io/) UI component library.

Here is short **TLDR** of the **Todolist post**:

- Adding navigation
- Creating a Floating Action Button (FAB)
- Navigating between two screens
- Customize the header component
- Rendering a list of items using FlatList
- Reading data using the AsyncStorage API
- Adding a to-do list item
- Deleting a to-do list item
- Mark an item check or uncheck upon completion
- Passing data between different screens using the navigation
- Display each to-do list item
- Bonus section: Adding a segment

Here is a little demo of what you are going to build in the Todolist post:

![ss5](https://miro.medium.com/max/313/1*FBBSWT3Xztc0G9wAGnz1yA.gif)

---

[Originally published at Dev.to](https://dev.to/amanhimself/what-is-asyncstorage-in-react-native-4af4)

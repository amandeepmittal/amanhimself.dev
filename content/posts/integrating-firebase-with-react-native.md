---
title: 'Integrating Firebase with React Native'
date: '2018-12-05'
slug: 'integrating-firebase-with-react-native'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://blog.jscrambler.com/integrating-firebase-with-react-native/'
---

**This post has been updated in 2021. Please visit [this URL](https://blog.jscrambler.com/integrating-firebase-with-react-native/) to view the new post.**

Firebase is a Backend as a Service (_BaaS_) that provides an advantage to mobile developers who use React Native for developing mobile applications. As a React Native developer, by using Firebase you can start building an MVP (minimum viable product), keeping the costs low and prototyping the application pretty fast. In this tutorial, we will be learning how to get started by integrating Firebase with a React Native application. We will also create a small application from scratch with the help of Firebase & React Native to see how they work together.

## Getting Started

[Firebase](https://console.firebase.google.com/?pli=1) is a platform that got acquired by Google and has a healthy and active community. Most users in this community are web and mobile developers as Firebase can help with mobile analytics, push notification, crash reporting and out of the box provides email as well as social authentication.

To get started, you will need a target mobile OS, whether you choose to go with iOS or Android or both. Please refer to [React Native official documentation](https://facebook.github.io/react-native/docs/getting-started) if you are setting up React Native development environment for the first time. You will need sdk tools and Android Studio especially to setup a developer environment for Android. For iOS, you only need Xcode installed on your macOS. You will also need to have installed:

- [Nodejs](http://nodejs.org) (`>= 8.x.x`) and npm/yarn installed
- [react-native-cli](https://www.npmjs.com/package/react-native-cli) (`>= 2.0.1`)

React Native is distributed as two npm packages, `react-native-cli`, and `react-native`. We are going to use the `react-native-cli` to generate an app. Begin by installing `react-native-cli`:

```shell
npm install -s react-native-cli
```

Now, let’s create a new React Native project called “rnFirebaseDemo”:

```shell
react-native init rnFirebaseDemo
```

When the above command is done running, traverse into the project directory using `cd rnFirebaseDemo`. Now, let’s check if everything is working correctly and our React Native application has been properly initialized by running one of the following commands:

```shell
# on macOS
react-native run-ios

# For Windows/Unix users
react-native run-android
```

This command will run the default screen as shown below in an iOS simulator or Android emulator but it will take a few moments since we are running it for the first time.

![ss1](https://i.imgur.com/mBobZpT.png)

## Adding Firebase

To add Firebase to our existing React Native application, we need to install the dependency.

```shell
yarn add firebase
```

When we open the project in a code editor, its structure looks like this:

![ss2](https://i.imgur.com/TdKzipp.png)

We need to make some modifications before we can really start building our app. Create an `src` directory inside the root folder. This is where our app components and screens will live. Further, within the `src` directory, we will create two folders: `screens` and `components`.

![ss3](https://i.imgur.com/N9m3Y83.png)

The `screen` directory will contain all the UI related components that we need to display to the end user, whereas the `components` folder will contain any other component that will be used or re-used to display the user interface.

Let us create our first screen, Home screen, inside `screens/` with a new file `Home.js`.

```js
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    );
  }
}
```

Our next screen is going to be `Add Item`. Create a new file called `AddItem.js`.

```js
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class AddItem extends Component {
  render() {
    return (
      <View>
        <Text>Add Item</Text>
      </View>
    );
  }
}
```

Our last screen is going to be a List of items that we need to display. In the same directory, create a new file called `List.js`.

```js
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class List extends Component {
  render() {
    return (
      <View>
        <Text>List</Text>
      </View>
    );
  }
}
```

## Adding react-navigation

To navigate between different screens, we need to add the `react-navigation` library. We are going to use the latest version that is `3.0.0`.

```shell
yarn add react-navigation
```

Next, we will install `react-native-gesture-handler`. If you’re using Expo, you don’t need to do anything here.

```shell
yarn add react-native-gesture-handler
```

The next step is clearly to run the command below and link the libraries we just installed:

```shell
react-native link
```

After adding this package, let us run the build process again:

```shell
# on macOS
react-native run-ios

# For Windows/Unix users
react-native run-android
```

Now, to see it in action, let us add the Home component as our first screen. Add the following code in `App.js`.

```js
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';

// we will use these two screens later in our AppNavigator
import AddItem from './src/screens/AddItem';
import List from './src/screens/List';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
```

At this stage, if we go to the simulator, we will see the following result:

![ss4](https://i.imgur.com/IMXVJ9n.png)

The Home Screen is showing up. We will add two other screens as routes to `AppNavigator` in order to navigate to them through the Home Screen.

```js
const AppNavigator = createStackNavigator(
  {
    Home,
    AddItem,
    List
  },
  {
    initialRouteName: 'Home'
  }
);
```

Now, our stack has three routes: a Home route, an AddItem route, and a ListItem route. The Home route corresponds to the `Home` screen component, the AddItem corresponds to the `AddItem` screen and the ListItem route corresponds to the `ListItem` component. The initial route for the stack is the `Home` route, this is defined if we have multiple screens and need to describe a starting point.

## Navigating between the screens

Previously, we defined a stack navigator with three routes but we didn't hook them up in order to navigate between them. Well, this is an easy task too. The `react-navigation` library provides us with a way to manage navigation from one screen to another and back. To make this work, we will modify the `Home.js`.

```js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Add an Item"
          onPress={() => this.props.navigation.navigate('AddItem')}
        />
        <Button
          title="List of Items"
          color="green"
          onPress={() => this.props.navigation.navigate('List')}
        />
      </View>
    );
  }
}
```

In the code above, we are adding a `Button` component from the `react-native` API. `react-navigation` passes a navigation prop in the form of `this.props.navigation` to every screen in the stack navigator. We have to use the same screen name on the `onPress` function to navigate as we defined in `App.js` under `AppNavigator`.

You can also customize the back button manually with your own styling on both screens `AddItem` and `List` but, for our demonstration, we are going to use the default.

![ss5](https://i.imgur.com/oB1OSRS.gif)

## Creating a Database with Firebase

Go to the [Firebase](https://firebase.google.com/) Console, log in from your Google Account and a create a new project.

![ss6](https://i.imgur.com/kB6UcyI.png)

We will then add the database configuration in a new file inside `src/config.js`.

```js
import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'rnfirebXXX-XXXX.firebaseapp.com',
  databaseURL: 'rnfirebXXX-XXXX.firebaseapp.com',
  projectId: 'rnfirebase-XXXX',
  storageBucket: 'rnfirebase-XXXX.appspot.com',
  messagingSenderId: 'XXXXXXX'
};
let app = Firebase.initializeApp(config);
export const db = app.database();
```

The config object is where you fill in the details you get after creating a new project in Firebase and going to the section **Add Firebase to your web app**. Also in the Firebase console, from left sidebar, click on **Database** and then choose the first option: ((Realtime Database)). Then, go to “rules” and paste the following:

```json
{ "rules": { ".read": true, ".write": true } }
```

![ss7](https://i.imgur.com/JyNyFqS.png)

## Adding Data from the App to Firebase

In this section, we will edit `AddItem.js` which represents an input field and a button. The user can add a item to the list and it will get saved to Firebase data.

```js
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  AlertIOS
} from 'react-native';

import { db } from '../config';

let addItem = item => {
  db.ref('/items').push({
    name: item
  });
};

export default class AddItem extends Component {
  state = {
    name: ''
  };

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    addItem(this.state.name);
    AlertIOS.alert('Item saved successfully');
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
```

In the code above, we are adding a Firebase database instance from `config.js` and `db` and then pushing any item that the user adds through `addItem` and `handleSubmit()`. You will get an alert message when you press the button **Add** to add the item from the input value as shown below.

![ss8](https://imgur.com/qi5UQec.gif)

To verify that the data is there in the database, go to your Firebase console.

[ss9](https://i.imgur.com/KZDYCIo.png)

## Fetching Items from the Database

To fetch data from the Firebase database, we are going to use the same reference to `db` in `List.js`.

```js
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../config';

let itemsRef = db.ref('/items');

export default class List extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No items</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});
```

For the `ItemComponent`, we create a new file inside `components/ItemComponent.js`. This is a non-screen component. Only the `List` will use it to `map` and display each item.

```js
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.itemtext}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
```

This step concludes the integration of a Firebase database with our React Native app. You can now add the new data items and fetch them from the database as shown below.

![ss9](https://i.imgur.com/0Nr4d4J.gif)

## Conclusion

In this tutorial, we’ve shown you how to integrate Firebase with a React Native application. You don’t a complete server that creates an API and further uses a database to prototype or build an MVP of your application.

You can find the complete code inside [this Github repo](https://github.com/amandeepmittal/rnFirebaseDemo).

[Originally published at Jscrambler](https://blog.jscrambler.com/integrating-firebase-with-react-native/)

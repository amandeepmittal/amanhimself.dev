---
title: Getting Started with Firestore and React Native
slug: getting-started-with-firestore-and-react-native
image: ./images/cover.png
date: 2019-06-11
category: react-native
---

Firebase is a complete package when it comes to building mobile applications and integrating them with a serverless service.

Managed by Google, Firebase includes services like mobile analytics, push notification, crash reporting, and out-of-the-box provides email as well as social authentication.

As a React Native developer, by using Firebase you can start building an MVP (minimum viable product) by keeping the costs low and utilizing your time and effort in building the application quite faster than adopting a traditional approach by building your own custom backend solution.

In this tutorial, you will learn how to integrate the Firestore cloud database in a React Native app. We will create a bare minimum demo application from scratch with the help of Firebase & React Native to see how they work together and understand the differences between a Firestore database and a Real-time Database in Firebase.

## Introduction to Cloud Firestore

In a real-time scenario, most of your use cases will require you to store the data in a database. If you are not having a custom backend API or the resources to manage one, Firebase provides you two types of mechanisms to store your app data. Both of these database types are cloud-based.

- Cloud Firestore
- Real-time Database

Now, do not get confused about the naming convention. Real-time Database stores data as one large JSON tree. Complex (_or nested_) and scalable data are hard to organize this way. Firestore follows proper NoSQL terminology when it comes to storing the data. It stores the data in document format. Each document then can have sub-collections, thus making it suitable for scalable and complex or nested data uses cases.

![ss1](https://i.imgur.com/BSaQKGe.png)

Another big difference between the two can be stated, as a Real-time database only offers offline support for mobile development using either iOS or Android. Firestore supports both mobile platforms as well as web clients too.

Lastly, queries are not indexed in a Real-time database. Since it is in the form of a tree, you can either run a sort query or a filter query on the property in the database in one query. Both sort and filter cannot be run together. Running queries in the real-time database are deep by default. This means that they always return the entire subtree. This can lead to performance issues if the application you are building needs to store a large amount of data.

Running queries in a Firestore is easy and efficient since all queries are indexed by default. You can also combine sorting and filtering from the data sets at the same in a single query.

Choosing between the two types completely depends on the use case or the way your application needs to store and persist data. If you require a simple way to store data, such as in the form of key-value pairs, then you can go for low latency Real-time database. If you need a complete database solution for your app that depends heavily on nested queries and complex data sets, go for Firestore.

## Setup a Firebase Project

To get started, you need a Firebase account. To sign-up or log-in for one, visit [the Firebase Console](https://console.firebase.google.com) and click on the button “Add Project”. In the next screen, fill the name of the project, check both the boxes for now and click on “Create Project”. Once the Firebase project is created, you will be welcomed by the home screen like below.

![ss4](https://i.imgur.com/vWTpz0F.png)

The side menu bar on the left is the main navigation in any Firebase project. That's it for now. It is that simple to create a new Firebase project via the official console.

## Create a New React Native Project

To set up a new React Native project, make sure you have `react-native CLI` installed. If not, you can run the command below.

```shell
npm i -g react-native-cli
```

Next, run the command to generate a new React Native app.

```shell
react-native init RNFirestoreDemo
```

Do note that the React Native CLI by default uses `yarn` instead of `npm` as the JavaScript package manager to install dependencies.

When the above command is done running, traverse into the project directory using `cd rnFirebaseDemo`. Now, let’s check if everything is working correctly and our React Native application has been properly initialized by running one of the following commands.

```shell
# on macOS
react-native run-ios

# For Windows/Unix users
react-native run-android
```

## Connecting Firebase with React Native App

To connect Firebase SDK with a React Native app, you need an API key and to store in the client side app somewhere (probably as environmental variables when deploying the app in production).

Click on the settings icon in the sidebar menu in the Firebase console and go to Project settings. Look out for "Your apps" section where all the platforms (iOS, Android, and web) are available. Click on the Web as shown below.

![ss5](https://i.imgur.com/mc4sqEL.png)

Next, copy only the `config` variable in a new file called `config/firebase.js` inside the React Native project. Initially, the file might look like the snippet below.

```js
// firebase.js

import firebase from "firebase/app"

const config = {
   apiKey: "AIzaXXXXXXXXXXXXXXXXXXXXXXX",
   authDomain: "rnfirebXXX-XXXX.firebaseapp.com",
   databaseURL: "rnfirebXXX-XXXX.firebaseapp.com",
   projectId: "rnfirebase-XXXX",
   storageBucket: "rnfirebase-XXXX.appspot.com",
   messagingSenderId: "XXXXXXX",
   appId: "XXXX
}
```

Where all the XXXXs are the key values. Now, you are required to add Firebase SDK in the React Native app.

You could have imported Firebase from just Firebase in the above snippet. The reason we are using `firebase/app` is that `/app` only adds the core of the Firebase services. Right now, to integrate Firebase with our React app, we only need the `initializeApp()` method to pass all the keys required to configure from Firebase.

To proceed, run the following command from your terminal.

```shell
yarn add firebase
```

Lastly, do not forget to export the Firebase object instance that you will be using in the React app later.

```js
// firebase.js

//...
firebase.initializeApp(config);

export default firebase;
```

## Adding Environment Variables

To make sure sensitive data like API keys are always safe, there is a mechanism of `.env` files. In JavaScript programming, what are you going to see is a very common practice, at least in the case of web applications.

In React Native, there is a way to save API Keys and other sensitive information without integrating any native code. This is provided by **[react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)**. This package allows you to import environment variables from a `.env` file. To get started, install this dependency by running the command below.

```shell
yarn add --dev react-native-dotenv
```

After it has successfully installed, open the `babel.config.js` file and the following.

```js
module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv'
  ]
};
```

Create a new file called `.env` in the root directory and add all the Firebase config values here (_hint: the config value we added earlier in the `firebase.js` file_).

```env
API_KEY=XXXX
AUTH_DOMAIN=XXXX
DATABASE_URL=XXXX
PROJECT_ID=XXXX
STORAGE_BUCKET=XXXX
MESSAGING_SENDER_ID=XXXX
APP_ID=XXXX
```

Again, the `Xs` represent the actual values from your configuration object. When done with this step, open `firebase.js` and modify it accordingly.

```js
// firebase.js
import firebase from 'firebase';

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from 'react-native-dotenv';

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

firebase.initializeApp(config);

export default firebase;
```

## Creating a Firestore Database

In the Database section, choose the cloud Firestore and go to the second tab called Rules. If you are enabling Firestore for the first time, chances are you need to set the database security rules to test mode. This is where the Firebase SDK will allow anyone (who has access to the config keys) to read and write to the database. That said, this section should look like below.

```js
service cloud.firestore {
 match /databases/{database}/documents {
   match /{document=**} {
     allow read, write;
   }
 }
}
```

Open `firebase.js` and import the `firestore` instance.

```js
// firebase.js

// after other imports
import 'firebase/firestore';

// just before export default statement
export const firestore = firebase.firestore();
```

Exporting the Firestore instance will let you use it to query the database. Now, go back to the Firebase console and go to the Data tab under Firestore.

![ss6](https://i.imgur.com/CTGnODs.png)

You will notice that there is currently no data inside the database. Under the “Add Collection” column, you’ll find each collection that you might have in the database. Click on “Add Collection” and enter the name of the collection as shown below.

![ss7](https://i.imgur.com/SR9lda2.png)

Click Next and enter two fields. One for the title of the book and the other one for the author's name. By default, the ID for each document will be auto-generated if the above option Auto-id is selected or remained untouched. Note that both of these fields represent one document as a whole.

![ss8](https://i.imgur.com/ZaPaUfK.png)

Notice that we have not defined value for both the fields. Also, both the fields are of data type string. Of course, there are [other data types](https://firebase.google.com/docs/firestore/manage-data/data-types) available and supported by Firestore. You can try to add the first document to this collection by pressing the **save** button.

## Adding Data to Firestore

In this section, let us build a React Native component that will in return allow us to communicate with the Firestore database. In other words, it will allow us to perform CRUD operations.

We are going to build a bare minimum app. The UI will have two input fields and a button to add the value of each input field to the Firestore database. Each input field will represent the title and the author of the book (_in the previous section, we did create a collection in the database called "books"_).

Open the `App.js` file which, at this moment, contains a lot of boilerplate code. Define an initial state to the `App` component. Then, inside the `render` function, this component has two input fields for the `title` and the `author` and a button to add the book.

```js
import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class App extends Component {
  state = {
    title: '',
    author: ''
  };

  render() {
    const { title, author } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            placeholder="Title of the book"
            style={styles.textInput}
            onChangeText={value => this.setState({ title: value })}
          />
          <TextInput
            value={author}
            placeholder="Name of the Author"
            style={styles.textInput}
            onChangeText={value => this.setState({ author: value })}
          />
          <Button
            onPress={() => alert('Add the book')}
            title="Add the book"
            color="#841584"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  inputContainer: {
    margin: 30
  },
  textInput: {
    height: 30,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    fontSize: 24,
    borderWidth: 1,
    borderBottomColor: '#111111'
  }
});
```

Once you are done modifying the `App` component, open two terminal windows simultaneously. Run the following commands in separate terminal windows.

```shell
# First terminal window
npm start

# Second terminal window (for iOS)
react-native run-ios

# Second terminal window (for Android)
react-native run-android
```

Once the compilation is done, you will get the following result.

![ss9](https://i.imgur.com/jizUWT0.png)

Let us try and add a book.

![ss10](https://i.imgur.com/Zvu8qVA.gif)

Since the application right now is not throwing an error, this means it did work. To verify, go to Firebase console and the Firestore database section. You will see the name of the collection as well as the document with an autogenerated ID containing the input values we just entered above.

![ss11](https://i.imgur.com/HGehLP2.png)

## Conclusion

Congratulations! You have completed the tutorial. The demonstration in this tutorial is the bare minimum but you can go ahead and write features like reading and deleting an item from the Firestore database in the React Native app. Think of it as a challenge.

The complete code for this tutorial is available in this [Github repository](https://github.com/amandeepmittal/RNFirestoreDemo).

---

[Originally published at Jscrambler](https://blog.jscrambler.com/getting-started-with-firestore-and-react-native/)

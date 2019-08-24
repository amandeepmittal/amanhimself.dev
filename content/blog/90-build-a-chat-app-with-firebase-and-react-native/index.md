---
slug: build-a-chat-app-with-firebase-and-react-native
date: 2019-04-24
title: 'Build a Chat App with Firebase and React Native'
categories: ['react native']
description:  '---'
published: true
author: 'Aman Mittal'
banner:
---

In this tutorial, you are going to build a chat application using React Native, Expo, and Firebase as the backend service. The application will contain a simple login system using an email address for each specific user. The user will be allowed to upload a profile picture. The chat application will be more of a global chat room but works in real time.

You can find the complete for this tutorial at this [GitHub Repository](https://github.com/amandeepmittal/RNfirebase-chat).

## Installing Dependencies

To get started, you must have Expo CLI installed on your local machine. Run the following commands from your terminal in order to install the CLI and generate a new project using it.

```shell
# To install expo-cli
npm install -g expo-cli

# To generate new project
expo init RNfirebase-chat

# Choose blank template when asked

# traverse inside the project directory
cd RNfirebase-chat
```

Once the project is generated, you can run it in an iOS simulator or an Android emulator to verify that everything works. Android developers should make sure that an Android Virtual Device is running before executing the command below.

```shell
# for iOS
npm run ios

# for Android
npm run android
```

Next, install a dependency called [`react-native-gifted-chat`](https://github.com/FaridSafi/react-native-gifted-chat) that provides customizable UI for a chat application. For navigating between different screens, we are going to use [`react-navigation`](https://reactnavigation.org/) and lastly, to connect with the Firebase project, we need Firebase SDK.

```shell
npm install --save react-native-gifted-chat react-navigation@2.18.x firebase uuid
```

In order to build the application, we are going to need:

- A user authentication service
- A service to store the user's email
- A service to store the user's avatar image
- A service to store messages

All of these services are going to be leveraged from Firebase.

## Setting up Firebase

Firebase is an application development tool by Google which provides an SDK with services like email and social media authentication, real-time database, machine learning kit, APIs, and so on. Firebase can be integrated with a cloud service, Google Cloud Platform.

In the application, we are going to use email authentication and cloud storage. To set up a Firebase free tier project, visit [the Firebase Console](https://console.firebase.google.com/) and create a new project, enter a name and then click the button **Create Project** button.

![ss1](https://i.imgur.com/0jj8te7.jpg)

Once the Firebase project is created, you will be welcomed by the home screen like below.

![ss2](https://i.imgur.com/cni9vrM.png)

Take a look at the side menu bar on the left. This is the main navigation in any Firebase project. First, we need to enable authentication. Click on the **Authentication** tab under **Develop** section, then click on the **Sign-in method**. Enable authentication using **Email/Password** and then hit **Save** button.

![ss3](https://i.imgur.com/1zmL90b.png)

## Setup Firebase Database

The next step is to enable the Database rules. Visit the second tab called **Database** from the sidebar menu and then select **Realtime Database**.

![ss4](https://i.imgur.com/s4Fkdwp.png)

Then select the second option **Rules** and modify them like below.

![ss5](https://i.imgur.com/EMYMoVd.png)

That's it for the setup part. In the next section, let us start building the application.

## Chat Screen

The `react-native-gifted-chat` component allows us to display chat messages that are going to be sent by different users. To get started, create a new directory called `components`. This is where we are going to store all of the components whether presentational or class. Inside this directory, create a new file, `Chat.js` with the following code snippet.

```js
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  render() {
    return <GiftedChat />
  }
}
```

Now open the `App.js` file and add logic to create a navigational component using the `react-navigation` module. This file will contain a stack navigator, and later we will add more screens into the navigator. For now, there is only a chat screen.

```js
import { createStackNavigator } from 'react-navigation'

import Chat from './components/Chat'

export default createStackNavigator({
  Chat: { screen: Chat }
})
```

Now if you run the simulator device, you will notice that there is a bare minimum chat screen that has a plain white header, background and, at the bottom of the screen, an input area where the user can enter the message. When typing something, a **Send** button automatically appears.

![ss6](https://i.imgur.com/8bAAz8t.png)

However, this **Send** button does not have any functionality right now.

## Connecting with Firebase SDK

Since we have already installed Firebase SDK dependency in our project, now let us add the other configuration required in order to connect the React Native app with Firebase.

Create a folder called `config` and inside it a new file, `firebaseSDK.js`. In this file, add the following keys.

```js
import firebase from 'firebase'

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: '<your-api-key>',
        authDomain: '<your-auth-domain>',
        databaseURL: 'https://<your-db-url>.firebaseio.com',
        projectId: '<your-project-id>',
        storageBucket: '<your-storage-bucket>.appspot.com',
        messagingSenderId: '<your-sender-id>'
      })
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback)
  }
}
const firebaseSDK = new FirebaseSDK()
export default firebaseSDK
```

First, to obtain and add the required keys in the above file you will have to visit the [Firebase console](https://www.console.firebase.com). Click the gear icon next to Project Overview in the left-hand side menu bar and lastly go to Project settings section.

The `login` function is the business logic to authenticate users who have registered with email and password. It will have two callback functions, one for the case where user credentials are valid, and then another in case of invalid or unregistered user credentials.

Also, in the **Authentication** screen at your Firebase console, add a test user since we are going to add a login component before the sign-up one.

![ss7](https://i.imgur.com/lHaWtON.png)

## Adding a Login Screen

Create a new component file `Login.js` inside the `components` directory with the code you can find [here](https://github.com/JscramblerBlog/RNfirebase-chat/blob/master/components/Login.js). Import the necessary components from React Native core and `firebaseSDK` object. Also, there is going to be an initial state for testing purposes which will contain the same email ID and password that we initialized in the Firebase console in the previous section.

In `Login.js`, also notice that the two methods `loginSuccess` and `loginFailed` are the callback arguments that we discussed in the previous section. One of them will be executed. In the above component, we are calling them along by passing user credentials on a `Login` button with the method `onPressLogin`. When running the simulator, you will get the following result.

![ss8](https://i.imgur.com/cwzR0V0.png)

Also note that, if the user is not yet registered in the app, they can directly navigate to the signup screen from the login screen by clicking the `Signup` button. If the user clicks on the `Login` button as of now, they will be directed to the chat screen.

![ss9](https://i.imgur.com/rh3HFsr.gif)

On entering the wrong password or email ID, it will throw an alert box stating the error message.

![ss10](https://i.imgur.com/NwjyFzt.gif)

## Creating the Signup Screen

In this section, you are going to add the functionality for any user to sign up to our chat application, as long as they provide credentials that we store in Firebase. Apart from email ID and password, we are also going to let users fill up their name and upload an image for an avatar.

To create a new account with email and password along with the user's name and profile image, we add the following to the `config/firebaseSDK.js` file.

```js
createAccount = async user => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(
      function() {
        console.log(
          'created user successfully. User email:' +
            user.email +
            ' name:' +
            user.name
        );
        var userf = firebase.auth().currentUser;
        userf.updateProfile({ displayName: user.name }).then(
          function() {
            console.log('Updated displayName successfully. name:' + user.name);
            alert(
              'User ' + user.name + ' was created successfully. Please login.'
            );
          },
          function(error) {
            console.warn('Error update displayName.');
          }
        );
      },
      function(error) {
        console.error('got error:' + typeof error + ' string:' + error.message);
        alert('Create account failed. Error: ' + error.message);
      }
    );
};

uploadImage = async uri => {
  console.log('got image to upload. uri:' + uri);
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref('avatar')
      .child(uuid.v4());
    const task = ref.put(blob);

    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {

        },
        reject
        () => resolve(task.snapshot.downloadURL)
      );
    });
  } catch (err) {
    console.log('uploadImage try/catch error: ' + err.message);
  }
};

updateAvatar = url => {

  var userf = firebase.auth().currentUser;
  if (userf != null) {
    userf.updateProfile({ avatar: url }).then(
      function() {
        console.log('Updated avatar successfully. url:' + url);
        alert('Avatar image is saved successfully.');
      },
      function(error) {
        console.warn('Error update avatar.');
        alert('Error update avatar. Error:' + error.message);
      }
    );
  } else {
    console.log("can't update avatar, user is not login.");
    alert('Unable to update avatar. You must login first.');
  }
};
```

From the above file, you can notice that `uploadImage` is the function that allows the user to upload the profile picture. The `createAccount` function communicates with the Firebase SDK to register the user. The next step is to create the Signup component. Create a new file `components/Signup.js` and add [this code](https://github.com/JscramblerBlog/RNfirebase-chat/blob/master/components/Signup.js).

In this component, we are going to ask the device for permissions to allow access to the device's file system and to upload an image. The Expo API has a simple way to add the logic for asking them through `Permissions`. The `ImagePicker` component helps the app to select an image only if the permission to access the file system was granted. It also has advanced methods such as `ImageEditor.cropImage` that you leverage to allow the user to crop their profile picture.

There is an initial component state that keeps track of all the user information. When the user enters all required input field, the state object in the component will also get an update.

To make this work, modify the stack navigator inside the `App.js` file.

```js
import { createStackNavigator } from 'react-navigation'
import Login from './components/Login'
import Signup from './components/Signup'
import Chat from './components/Chat'

export default createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Chat: { screen: Chat }
})
```

In the demo below, as a user you can upload the user avatar while signing up, or register a new user account and then login with that account.

![ss11](https://i.imgur.com/md6i8cu.gif)

## Adding Chat Functionality

As the authentication in our chat application is now working, we can move ahead and add the chat functionality itself. This component is going to need the user information from Firebase in order to create a chat message and send it. Using `react-navigation` in our project is going to be very useful. We will be using `props` coming from the login screen to retrieve the user information. There is a component state we have to declare that will contain a `messages` array. Modify the `components/Chat.js` file accordingly.

```js
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat' // 0.3.0

import firebaseSDK from '../config/firebaseSDK'

export default class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!'
  })

  state = {
    messages: []
  }

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      id: firebaseSDK.uid,
      _id: firebaseSDK.uid
    }
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSDK.send}
        user={this.user}
      />
    )
  }

  componentDidMount() {
    firebaseSDK.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    )
  }
  componentWillUnmount() {
    firebaseSDK.refOff()
  }
}
```

Now, let us run the application again, either with `npm run ios` or `npm run android`. We are running two interfaces of the application in order to demonstrate the chat functionality. The one you will see below is on iOS simulator with a user named Alice.

![ss12](https://i.imgur.com/TrUMBEr.gif)

## Conclusion

Firebase is a great service in terms of time-savings and faster app development. Integrating it with specific use cases (_such as demonstrated in this tutorial_) without building a complete backend from scratch is an advantage for any React Native developer.

> [Originally published at Jscrambler](https://blog.jscrambler.com/build-a-chat-app-with-firebase-and-react-native/)

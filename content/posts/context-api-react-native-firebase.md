---
title: 'Using Context API with React Native'
date: '2019-09-27'
slug: 'context-api-react-native-firebase'
thumbnail: '/thumbnails/expo.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/context-api-react-native-firebase'
---

![cover](https://i.imgur.com/tEzuwkP.png)

The React Context API lets you avoid passing props from parent to child at every level of the component tree. Neither you have to unnecessarily increase the complexity of the codebase using state management libraries like Redux. Consuming something like Firebase authentication and storage services with the Context API in a React Native or Expo apps is a great use case to try.

In this tutorial, I am going to show you how to setup Firebase email authentication in an Expo app using Context API. Before we get started, please note that I am going to use an Expo project that has:

- [navigation setup with `react-navigation` 4.x.x](https://amanhimself.dev/authentication-navigation-flow-in-react-native-apps)
- caching local images/assets
- [login and signup screen setup with formik and yup](https://amanhimself.dev/build-validate-forms-with-react-native-formik-yup)
- [handle different field types in React Native forms with formik and yup](https://amanhimself.dev/handle-different-field-types-in-react-native-forms)

You can download the **source code** in its current state from [**this Github repo**](https://github.com/amandeepmittal/expo-firebase/releases/tag/0.5.0) before you begin.

After installing the source code, please navigate inside the project directory and install dependencies by running the following command:

```shell
yarn install

# or

npm install
```

## Table of Contents

- Requirements
- Add Firebase Config & integrate Firebase SDK
- Enable Firestore
- Add Context API
- Signup with Firebase
- Handle Real-time/Server Errors
- Login a Firebase user
- Add a signout button
- Check user auth state for automatic login
- Conclusion

## Requirements

To follow this tutorial, please make sure you following installed on your local development environment and access to the services mentioned below.

- Nodejs (>= `10.x.x`) with npm/yarn installed
- expo-cli (>= `3.x.x`), (previously known as create-react-native-app)
- Firebase account, free tier will do

## Add Firebase Config & integrate Firebase SDK

> If you already know how to obtain Firebase API and storage keys, you can skip this section. Otherwise, you can follow along.

Create a new [Firebase project from Firebase Console](https://console.firebase.google.com).

![1](https://i.imgur.com/7TSnVLL.png)

Next, fill in the suitable details regarding the Firebase project and click on **Create project** button.

![2](https://i.imgur.com/oXFOQBd.png)

You will be re-directed towards the dashboard of the Firebase project. Go to **Project settings** from the sidebar menu and copy the `firebaseConfig` object. It has all the necessary API keys that we need in order to use a Firebase project as the backend for any React Native or Expo app.

![3](https://i.imgur.com/XbVjdkB.png)

Next, go inside the [Expo app](https://github.com/amandeepmittal/expo-firebase/releases/tag/0.5.0) and create a new directory called `config`. This folder will contain all the configuration files. Inside it, create `Firebase/firebaseConfig.js` file and paste the contents of the config object as below.

```js
// Replace all Xs with real Firebase API keys

export default {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX',
  appId: 'XXXX'
};
```

Next, from the terminal window, install Firebase SDK.

```shell
yarn add firebase
```

Back to the `config/Firebase/` directory. Create a new file `firebase.js`. This will hold all the configuration related to integrate the Firebase SDK and the function it provides for authentication, real time database and so on.

Also, define a `Firebase` object with some initial methods that you are going to use in the tutorial. These methods are going to conduct real-time events such as user authentication, sign out from the app, and store the user details based on the reference to `uid` (_unique user id Firebase creates for every registered user_) in real-time NoSQL database called **Cloud Firestore**.

```js
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return firebase.auth().signOut();
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user);
  },

  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData);
  }
};

export default Firebase;
```

This approach used with React's Context API will eliminate the use of Redux state management (which is the approach I worked with [previously](https://amanhimself.dev/how-to-build-an-email-authentication-app-with-firebase-firestore-and-react-native)) library and simply use React principles. Populating the `Firebase` object with Context, you will be able to access all the functions as well as the user throughout this React Native app as props.

## Enable Firestore

There are two types of cloud-based database services provided by Firebase. One is called Cloud Firestore, and the other one is known as Realtime Database. Realtime Database stores data as one large JSON tree. Complex and scalable data is hard to organize in it.

Cloud Firestore follows proper NoSQL terminology when it comes to storing data. It stores data in documents, and each document can have sub-collections—thus, making it suitable for scalable and complex data scenarios.

Go back to the Firebase console and in the Database section, choose the Cloud Firestore and click on the button **Create database**.

![4](https://i.imgur.com/k7Ecql7.png)

Then, choose the option Start in **test mode** and click the button **Next** as shown below.

![5](https://i.imgur.com/jLWPy9K.png)

## Add Context API

The common reason to use Context API in a React Native app is that you need to share some data in different places or components in the component tree. Manually passing props can be tedious as well as hard to keep track of.

The Context API consists of three building blocks:

- creating a context object
- declaring a provider that gives the value
- declaring a consumer that allows a value to be consumed (_provided by the provider_)

Create a new file inside the `Firebase` directory called `context.js`. Declare a `FirebaseContext` that is going to be an object.

```js
import React, { createContext } from 'react';

const FirebaseContext = createContext({});
```

After creating the context, the next step is to declare a provider and a consumer.

```js
export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;
```

Lastly, let us declare an HoC (_High Order Component_) to generalize this Firebase Context. An HoC in React is a function that takes a component and returns another component. What this HoC will do is instead of importing and using `Firebase.Consumer` in every component necessary, all there is to be done is just pass the component as the argument to the following HoC.

```js
export const withFirebaseHOC = Component => props =>
  (
    <FirebaseConsumer>
      {state => <Component {...props} firebase={state} />}
    </FirebaseConsumer>
  );
```

You will understand with more clarity in the next section when modifying the existing `Login` and `Signup` component with this HoC. Now, create a new file `index.js` to export both the `Firebase` object from the `firebase.js` file, the provider and the HoC.

```js
import Firebase from './firebase';
import { FirebaseProvider, withFirebaseHOC } from './context';

export default Firebase;

export { FirebaseProvider, withFirebaseHOC };
```

The provider has to grab the value from the context object for the consumer to use that value. This is going to be done in `App.js` file. The value for the `FirebaseProvider` is going to be the `Firebase` object with different strategies and functions to authenticate and store the user data in real-time database. Wrap the `AppContainer` with it.

```js
import React from 'react';
import AppContainer from './navigation';
import Firebase, { FirebaseProvider } from './config/Firebase';

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer />
    </FirebaseProvider>
  );
}
```

That's it for setting up the Firebase SDK.

## Signup with Firebase

In this section, you are going to modify the existing `Signup.js` component in order to register a new user with the firebase backend and store their data in Firestore. To start, import the `withFirebaseHOC`.

```js
import { withFirebaseHOC } from '../config/Firebase';
```

Replace the `handleSubmit()` method with `handleOnSignup()`. Since all the input values are coming from Formik, you have to edit `onSubmit` prop on the `Formik` element too. The `signupWithEmail` is coming from firebase props and since you are already wrapping the navigation container with `FirebaseProvider`, `this.props.firebase` will make sure any method inside the `Firebase` object in the file `config/Firebase/firebase.js` is available to be used in this component.

The `signupWithEmail` method takes two arguments, `email` and `password` and using them, it creates a new user and saves their credentials. It then fetches the user id (_`uid`_) from the response when creating the new user. The `createNewUser()` method stores the user object `userData` inside the collection `users`. This user object contains the `uid` from the authentication response, the name, and email of the user entered in the signup form.

```js
handleOnSignup = async values => {
    const { name, email, password } = values

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        const userData = { email, name, uid }
        await this.props.firebase.createNewUser(userData)
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      console.error(error)
    }
  }

// replace with handleOnSignup

onSubmit={values => {
  this.handleOnSignup(values)
}}
```

The logic behind saving the user object is the following:

```js
// config/Firebase/firebase.js
createNewUser: userData => {
  return firebase
    .firestore()
    .collection('users')
    .doc(`${userData.uid}`)
    .set(userData);
};
```

Lastly, do not forget to export the `Signup` component inside the `withFirebaseHOC`.

```js
export default withFirebaseHOC(Signup);
```

Let see how it works.

![f1](https://i.imgur.com/r40CEuW.gif)

Since it is going to the Home screen, means that use is getting registered. To verify this, visit the Database section from Firebase Console Dashboard. You will find a `users` collection have one document with the `uid`.

![6](https://i.imgur.com/Q1aoXx2.png)

To verify the `uid`, visit **Authentication** section.

![7](https://i.imgur.com/QXX3tXM.png)

## Handle Real-time/Server Errors

To handle real-time or server errors, Formik has a solution to this. Now, understand that something valid on the client-side can be invalid on the server. Such as, when registering a new user with an already existing email in the Firebase storage should notify the user on the client-side by throwing an error.

To handle this, edit the `onSubmit` prop at the `Formik` element bypassing the second argument called `actions`.

```js
onSubmit={(values, actions) => {
  this.handleOnSignup(values, actions)
}}
```

Next, instead of just console logging the error values, to display the error, you will have to use `setFieldError`. This will set an error message in the `catch` block. Also, add a `finally` block that will avoid the form to submit in case of an error.

```js
handleOnSignup = async (values, actions) => {
  const { name, email, password } = values;

  try {
    const response = await this.props.firebase.signupWithEmail(email, password);

    if (response.user.uid) {
      const { uid } = response.user;
      const userData = { email, name, uid };
      await this.props.firebase.createNewUser(userData);
      this.props.navigation.navigate('App');
    }
  } catch (error) {
    // console.error(error)
    actions.setFieldError('general', error.message);
  } finally {
    actions.setSubmitting(false);
  }
};
```

Lastly, do display the error on the app screen, add an `ErrorMessage` just after the `FormButton` component.

```js
<View style={styles.buttonContainer}>
  <FormButton
    buttonType='outline'
    onPress={handleSubmit}
    title='SIGNUP'
    buttonColor='#F57C00'
    disabled={!isValid || isSubmitting}
    loading={isSubmitting}
  />
</View>
<ErrorMessage errorValue={errors.general} />
```

Now go back to the Signup form in the app and try registering the user with the same email id used in the previous step.

![f2](https://i.imgur.com/XXK3D7N.gif)

_Voila!_ It works! The error message is shown and it does not submit the form.

## Login a Firebase user

As the previous section, similar number of steps have to be performed for the Login form to work. Instead of going through them individually, here is the complete `Login` component.

```js
import React, { Component, Fragment } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import AppLogo from '../components/AppLogo';
import { withFirebaseHOC } from '../config/Firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
});

class Login extends Component {
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  };

  goToSignup = () => this.props.navigation.navigate('Signup');

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleOnLogin = async (values, actions) => {
    const { email, password } = values;
    try {
      const response = await this.props.firebase.loginWithEmail(
        email,
        password
      );

      if (response.user) {
        this.props.navigation.navigate('App');
      }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    const { passwordVisibility, rightIcon } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo />
        </HideWithKeyboard>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
            <Fragment>
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter password"
                secureTextEntry={passwordVisibility}
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur('password')}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="LOGIN"
                  buttonColor="#039BE5"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type="clear"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  }
});

export default withFirebaseHOC(Login);
```

Let us see how it works. For a successful login, use registered credentials.

![f3](https://i.imgur.com/DrqOjct.gif)

## Add a signout button

Sign out button at this point is essential but since there is no app interface right now, I am going to put a simple button on the home screen. Open, `Home.js` file and import `Button` from `react-native-elements`.

Also, import `withFirebaseHOC` and add the `Button` component below the text.

```js
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { withFirebaseHOC } from '../config/Firebase';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
          title="Signout"
          onPress={this.handleSignout}
          titleStyle={{
            color: '#F57C00'
          }}
          type="clear"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withFirebaseHOC(Home);
```

Here is out the output.

![8](https://i.imgur.com/YLzeMt6.png)

Right now, this button doesn't do anything. You will have to add the `handleSignout` method as below.

```js
handleSignOut = async () => {
  try {
    await this.props.firebase.signOut();
    this.props.navigation.navigate('Auth');
  } catch (error) {
    console.log(error);
  }
};
```

Go back to the home screen and login into the app. Once the home screen is displayed, click the button `Signout`.

![f4](https://i.imgur.com/qo3v0BF.gif)

## Check user auth state for automatic login

Right now, whenever the user successfully logs in or registers it does lead to the Home screen of the app but on refreshing the simulator, the navigation pattern takes back to the login screen.

In this section, you are going to add a small authentication check using Firebase method `onAuthStateChanged()` that takes the current user as the argument if they are logged in.

The auth check is going to do at the same point when the application is loading assets, that is, the `Initial` screen component. It has been already hooked in the navigation pattern to be the first screen or the initial route.

```js
// navigation.js

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Initial from '../screens/Initial';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    App: AppNavigation
  },
  {
    initialRouteName: 'Initial'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
```

Using the lifecycle method inside the `Initial.js`, the authentication status of whether is user is logged in the app or not can be checked.

Start by importing the Firebase HoC in the file `screens/Initial.js`.

```js
import { withFirebaseHOC } from '../config/Firebase';
```

Next, inside the `componendDidMount` method add the following. If the user has previously logged in, the navigation flow will directly take the user to the Home screen. If the is not logged in, it will show the Login screen.

```js
componentDidMount = async () => {
  try {
    // previously
    this.loadLocalAsync();

    await this.props.firebase.checkUserAuth(user => {
      if (user) {
        // if the user has previously logged in
        this.props.navigation.navigate('App');
      } else {
        // if the user has previously signed out from the app
        this.props.navigation.navigate('Auth');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Don't forget to export
export default withFirebaseHOC(Initial);
```

Let us see it in action. Even after refreshing the app, the authenticated user stays logged in.

![f5](https://i.imgur.com/toxtKit.gif)

## Conclusion

_Congratulations! 🎉_ If you have come this far, I am hope enjoyed reading this post. These are some of the strategies I try to follow with any Firebase + React Native + Expo project. I hope any of the codebase used in this tutorial helps you.

To find the complete code, you will have to visit [this Github repo release](https://github.com/amandeepmittal/expo-firebase/releases/tag/0.6.0).

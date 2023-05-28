---
title: 'How to remove AsyncStorage warning when using Firebase JS SDK with React Native'
slug: 'remove-asyncstorage-has-been-extracted-warning-using-firebase'
date: '2022-05-28'
thumbnail: '/thumbnails/firebase.png'
tag: 'firebase'
canonicalUrl: 'https://amanhimself.dev/blog/remove-asyncstorage-has-been-extracted-warning-using-firebase/'
---

The [Firebase JS SDK](https://github.com/firebase/firebase-js-sdk) is a library that provides a set of JavaScript APIs for interacting with Firebase services. I use it with some of the production React Native apps built with Expo, mainly for authentication, database, and storage. I also use it for an open-source template that I am currently maintaining called [expo-firebase-stater], which provides a head start when building a React Native app with Firebase.

For React Native apps, the Firebase SDK uses AsyncStorage under the hood to store an authentication session when an app restarts. It is one of the out-of-the-box features that Firebase provides that I like and use when implementing authentication in React Native apps using the Firebase Auth service.

## Why does the AsyncStorage warning occur

Typically, the Firebase Auth module is configured as shown below in a React Native app:

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
```

Using this code snippet to initialize Firebase auth service in the app will cause the warning:

```shell
AsyncStorage has been extracted from the react-native core and will be removed in a future release ...
```

![ss1](https://i.imgur.com/pBiiXzY.png)

Firebase SDK uses the AsyncStorage module from the `react-native` core. From React Native versions `0.59` and up, the AsyncStorage module has been moved to its own package: `@react-native-async-storage/async-storage`.

[Here](https://github.com/firebase/firebase-js-sdk/blob/96ab56bac05ccaf506ed3a02ccad5ff7e01a07d0/packages/app/index.rn.ts#L27) is the line of code in Firebase JS SDK repo that imports AsyncStorage from `react-native` core:

![ss2](https://i.imgur.com/uWt9gRQ.jpg)

## Remove the AsyncStorage warning

To remove the AsyncStorage warning, start by installing the `@react-native-async-storage/async-storage` package:

```shell
# for Expo projects
npx expo install @react-native-async-storage/async-storage
```

Firebase SDK provides another method in its Auth module called `initializeAuth`. This method allows more control over the Auth instance from the `getAuth` method. In addition, it provides a way to define what persistence layer to use to store the authentication session using the method `getReactNativePersistence` and using which Dependency. Since we are using the Firebase auth service in a React Native app, we can use the React Native Dependency.

> Note: [Dependencies interface](https://firebase.google.com/docs/reference/js/auth.dependencies.md#dependencies_interface) in Firebase enables tree shaking. This means that a web app does not have to include all the dependencies that Firebase supports, such as Cordova or React Native.

Start by importing `initializeAuth` and `getReactNativePersistence` from `firebase/auth/react-native`. To initialize `auth`, pass an object as the second argument to the `initializeAuth` method. This object has a `persistence` key that takes the value of which persistence layer to use.

```js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

// add firebase config here

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
```

Using the same strategy as the above code snippet should resolve the warning about AsyncStorage.

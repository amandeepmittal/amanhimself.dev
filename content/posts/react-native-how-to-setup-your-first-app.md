---
title: 'React Native - How to Setup Your First App'
date: '2018-07-13'
slug: 'react-native-how-to-setup-your-first-app'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://levelup.gitconnected.com/react-native-how-to-setup-your-first-app-a36c450a8a2f'
---

**PLEASE NOTE**

_At the start of the year 2019, I updated this post and re-wrote it here 👇_

Getting Started with React Native in 2019: Build Your First App Learn how to build your first React Native app with important basic concepts and where to go from [here](https://amanhimself.dev/blog/getting-started-with-react-native-in-2019-build-your-first-app).

_It is more in-depth, and covers almost every basic aspect about React Native ecosystem. By reading the new post, you will also built a more advance version of a typical “hello world” app._

React Native is a framework for building mobile applications with JavaScript and leveraging ReactJS. It uses native UI components. If you are familiar with React or come from front end development background, React uses a virtual DOM which acts as a shadow to real DOM available. When an element changes, that change is reflected on the real DOM by Virtual DOM using a node that corresponds to each element. However, in React Native, there is no DOM rather than Native Components which are provided by platforms such as iOS and Android. There are no web views here.

React Native has an instance of [JavaScriptCore](https://facebook.github.io/react-native/docs/javascript-environment.html) to execute JS code when an application starts. React Native uses RCTBridgeModule to make a connection between native code and JavaScript code. It is assumed that as you dwell more in development with React Native, you might come across using a third-party SDK for a specific mobile platform. This bridging will be very helpful.

### Difference between React Native and Reactjs

React Native has its own wrappers around the native components and do not make use of every HTML element. For example, `<View>` which is considered similar to `div` of HTML. This is a major difference between React Native and Reactjs. This also means that you cannot reuse every library that renders HTML and is available for Reactjs. It has its own navigation modules.

### Platform Specific Designing

Designing a mobile application for multiple platforms available with the same set of code can be a bit overwhelming. In this case, a developer or a development team is left with two choices. Either they come up with a user interface that universal to their application. This means the UI of the app looks the same on every platform. However, this is not going to be the case with every application you develop. React Native can detect the platform you are running and conditions can be used to apply the styling.

Diving deeply in the bridging part or platform specific designing part of this article is out of the scope. This is written to familiarize you with the basic ecosystem of React Native but I wanted to discuss these topics briefly such that to give an idea of what you are getting into.

### Developer Environment for React Native

These are required dependencies to set up a local environment and further, to develop any type of application using it, on your machine.

Dependencies required:

Note: Note that you have a Node.js version `>=4.0` to continue.

To setup Native SDKs for specific platforms:

- **iOS** (install/have Xcode, it is free and most probably pre-installed)
- **Android** (I’d recommend that you follow instructions [here](https://facebook.github.io/react-native/docs/getting-started.html))

The last step is to install React Native CLI using this command:

```shell
npm install -g react-native-cli
```

The above instructions work best if you need to build native code in your application or want to integrate React Native in an existing application. If you want to quickly prototype an application and you can use [_Create React Native App_](https://facebook.github.io/react-native/docs/getting-started.html) module that is very similar to Create React App. For _Create React Native App_ you are not required to install above dependencies (of course you need Node.js for _npm_ modules) and platform-specific SDKs. Facebook itself recommends using [Expo](https://expo.io/) client on your phone to see the app in action. I will be using `react-native-cli` for the brevity of the subject of this article.

### Hello World with React Native

To scaffold an app, use the React Native command line interface we just installed in the previous step.

If you sneak peak inside the directory to see the structure, you will see a similar one:

```shell
react-native init HelloWorld

cd HelloWorld
```

<img src='https://cdn-images-1.medium.com/max/800/0*30ZgnW1lf7SY3UVM.png' />

Let us try running the app before making any changes. Since I am on a mac, I will be using command:

```shell
react-native run-ios
```

To run the same application in an Android Emulator or device (if connected), you can use the command:

```shell
react-native run-android
```

Since you are running any of the above command for the first time, it takes some minutes for the app show up in an emulator. Do not worry, if everything runs successfully, it will show up.

<img src='https://cdn-images-1.medium.com/max/800/0*YczCUc-cdJpnJd_b.png' />

The code you see above running is available in `App.js`:

<img src='https://cdn-images-1.medium.com/max/800/0*qtqjP_V2kuuGEuku.png' />

If you are familiar with Reactjs, you can easily understand this code. `<View>` stands for wrapper element such as `div` in HTML and `<Text>` stands for `<p>` in HTML.

You will be prompted with a success message and in a new terminal window, _Metro Bundler (developed by Facebook)_ will be running until the application closes.

<img src='https://cdn-images-1.medium.com/max/800/0*5EZJZ55baUagTXGM.png' />

<img src='https://cdn-images-1.medium.com/max/800/0*CMeu3NOHz3Gcgpx3.png' />

The file that renders this `App` component is `index.js` in the root directory. You will see this code:

<img src='https://cdn-images-1.medium.com/max/800/0*NsVZtz_ZooVZxt1F.png' />

Do you notice something? There is no `react-dom` because there is no DOM in React Native. `AppRegistery` is the entry point to run a React Native application. `App` component or any other root component in the app should register by using `AppRegistry.registerComponent` such that a native system can load the bundle of the app and run the app by starting `AppRegistry.runApplication`.

You can read more about `AppRegistery` [here](https://facebook.github.io/react-native/docs/appregistry.html).

You have successfully setup your first React Native application. You can read my other articles on React Native:

[**Building a Minimalist Weather App with React Native and Expo** React Native is a great framework to develop cross-platform mobile applications for the platforms iOS and Android](https://blog.expo.io/building-a-minimalist-weather-app-with-react-native-and-expo-fe7066e02c09)

Link to the [**Github Repo**](https://github.com/amandeepmittal/rn-HelloWorld) for this project if you are still curious too see the how the project structure looks rather than trying it out yourself.

### React Native in 2019

_At the starting of the year 2019, I updated this post and re-wrote it here 👇_

[**Getting Started with React Native in 2019: Build Your First App** Learn how to build your first React Native app with important basic concepts and where to go from here!](https://levelup.gitconnected.com/getting-started-with-react-native-in-2019-build-your-first-app-a41ebc0617e2)

It is more in-depth, and covers almost every basic aspect about React Native ecosystem.

[Originally published at Gitconnected.com](https://levelup.gitconnected.com/react-native-how-to-setup-your-first-app-a36c450a8a2f)

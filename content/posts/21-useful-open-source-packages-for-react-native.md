---
title: '21 Useful Open Source Packages for React Native'
date: '2019-01-28'
slug: '21-useful-open-source-packages-for-react-native'
tag: 'react-native'
thumbnail: '/thumbnails/react.png'
canonicalUrl: 'https://medium.com/crowdbotics/21-useful-open-source-packages-for-react-native-807f65a818a1'
---

![cover_image](https://i.imgur.com/nbq2XcZ.png)

We live in the world of a variety, yet mobile devices are dominated by two major platforms, iOS and Android. It is a two-horse race, but that doesn’t make mobile app development _easy_. For iOS you write code using Objective-C or Swift. For Android, you use Java. In addition to different programming languages, the tool chains are entirely different too for both of these mobile platforms.

To create app that work across devices, many modern day developers build Hybrid apps using HTML, CSS and JavaScript — as you would a web page— wrapped in native container. This way, you use (almost) one set of source code for developing applications for both iOS and Android .

In recent years, hybrid frameworks have evolved from web view to use native APIs. This cross-platform approach of developing a mobile application comes with its own pros and cons. Pros such as being less-time consuming and cost-effective, and cons include performance issues.

One of the great options that fall under the umbrella of cross-platform development is React Native. React Native was developed by Facebook and used by others such as [Tesla Motors](https://medium.com/u/24413768aadb), [Walmart Labs](https://medium.com/u/c884135151a4), [Uber](https://medium.com/u/b97b1b381b5a), [Instagram Engineering](https://medium.com/u/a4c6efa67fe0), [Discord](https://medium.com/u/fddf6af2df19), [Wix](https://medium.com/u/2741d9d88322) and so on.

In a nutshell, React Native allows you to build mobile applications that look, feel and perform much more like native applications. The good thing for developers is that they can use almost the same concepts that are being used for building web applications.

The list below contains an overview of the top open source libraries that you can use in your React Native application.

> [**Also, try out the Crowdbotics application builder to instantly scaffold and deploy a React Native app.**](https://app.crowdbotics.com/dashboard/?utm_campaign=cb-medium&utm_source=blog-post&utm_medium=Medium&utm_content=react-native)

### USEFUL OPEN SOURCE REACT NATIVE PACKAGES

### lottie-react-native

Lottie is a mobile library for Android and iOS that parses Adobe After Effects animations exported as JSON with `bodymovin` and renders them natively on mobile. With over 10k+ stars, this npm module helps you use community/custom build animations in your React Native application.

[**react-native-community/lottie-react-native**](https://github.com/react-native-community/lottie-react-native)

### react-native-vector-icons

`react-native-vector-icons` is the go to library if you are considering to use customizable icons with support for NavBar/TabBar, image source and full styling. This npm module bundles famous icon libraries like:

- FontAwesome
- IonIcons
- EvilIcons
- AntDesign
- MaterialIcons
- Octicons

and many more. It is like have best of all the libraries in one place, and you do not have to go through the process of hooking up multiple libraries and then linking them with the React Native app. It also supports animation with React Native’s animation library, `Animated`.

[**oblador/react-native-vector-icons**](https://github.com/oblador/react-native-vector-icons)

### react-native-gifted-chat

Chat applications are a huge part of mobile app development. There are scenarios in which either you build complete chat applications or add it as a feature to your existing app. In both cases, this module is out there to help you get started with the UI. This npm module comes with fully customizable components, dates, multiple TextInput options, Redux support and so on.

[**FaridSafi/react-native-gifted-chat**](https://github.com/FaridSafi/react-native-gifted-chat)

### react-native-image-picker

An essential library for any app with Image upload or Image processing. It supports features like selecting from the gallery, and taking a photo from the camera. Another useful feature in this library that I like is the option to select the quality of an image you want to choose. This feature solves memory issues due to high-resolution images.

[\*_react-native-community/react-native-image-picker_](https://github.com/react-native-community/react-native-image-picker)

### react-native-progress

Showing progress of loading or any other action is important in an app. This library makes it easy to show progress by supporting 5 different components like Linear progress bar, circular, pie and so on using ReactART.

```js

import * as Progress from 'react-native-progress';

<Progress.Bar progress={0.3} width={200} />
<Progress.Pie progress={0.4} size={50} />
<Progress.Circle size={30} indeterminate={true} />
<Progress.CircleSnail color={['red', 'green', 'blue']} />
```

[**oblador/react-native-progress**](https://github.com/oblador/react-native-progress)

### Nativebase

NativeBase is a sleek, ingenious, and dynamic front-end framework to build cross-platform Android and iOS mobile apps using ready-to-use generic components of React Native. What is really great about NativeBase is that you can use shared UI cross-platform components, which will drastically increase your productivity.

Its documentation provides an in-depth specification on each components and customize them. You need a component library like Nativebase while working solo, or quickly prototyping an MVP or if you want to focus on the functionality of your application.

[**GeekyAnts/NativeBase**](https://github.com/GeekyAnts/NativeBase)

### react-navigation

Navigation has been a controversial topic in React Naive community, until `react-navigation` package has started to mature. With version `3` recently launched, this npm module is right now a complete solution provider for managing screens in a React Native application. It offers

- stack navigation
- tab navigation
- drawer navigation
- custom navigation support
- Redux support for complex applications

If you want to try it out, here is cool [example app](https://expo.io/@react-navigation/NavigationPlayground) built using it.

[**react-navigation/react-navigation**](https://github.com/react-navigation/react-navigation)

### react-native-navigation

React Native Navigation provides 100% native platform navigation on both iOS and Android for React Native apps. Developed and maintained by the team at Wix, is the second most commonly used package to support navigation of screens in a React Native app after `react-navigation`.

The reason this package is often a second preference in the community is because of its set up process. You will have to manually hook this library with iOS build and Android `gradle` every time you want to use it by following a number of steps.

### react-native-languages

A community package, react-native-languages is a library that helps you integrate the i18n-js library in a React Native application to internationalize and localize the application. With that, it has many utility functions that you can leverage.

For example, to get the current device’s language, you would write the following code.

```js
import RNLanguages from 'react-native-languages';

// Get Current device language
console.log('language', RNLanguages.language);
```

[**react-native-community/react-native-languages**](https://github.com/react-native-community/react-native-languages)

### react-native-billing

This library is exclusively to be used with React Native and Android. Use this library when you need to add in-app billing to your app for Android devices. The tool has a simple interface and works as a bridge by wrapping anjlab’s `InApp Billing` library. This library is up to date and supports ES6 features like `async/await`.

```js
import InAppBilling from "react-native-billing";

async purchase() {
  try {
    await InAppBilling.open();
    const details = await InAppBilling.purchase("android.test.purchased");
    console.log("You purchased: ", details);
  } catch (err) {
    console.log(err);
  } finally {
    await InAppBilling.close();
  }
}
```

[**idehub/react-native-billing**](https://github.com/idehub/react-native-billing)

### react-native-iap

This is a react-native link library project for in-app purchase for both Android and iOS platforms. The goal of this project is to have similar experience between the two platforms for in-app-purchase. It has a vast variety of helper functions that you can use. Android as a platform has more functions for in-app-purchase.

[**dooboolab/react-native-iap**](https://github.com/dooboolab/react-native-iap)

### tcomb-form-native

Forms can be a lot more complicated than icons or components as they have a lot of different parts and there’s logic involved when it comes to field validation and form submission. With this library, you simplify form processing immensely .

It has a variety of configuration that is platform specific. Using this library you will be writing a lot less code, get usability and accessibility, and no need to update forms when the domain model changes.

[**gcanti/tcomb-form-native**](https://github.com/gcanti/tcomb-form-native)

### Formik

Handling forms is one of the most important aspect of being a good web developer. Same applies if you are using React Native for developing a mobile application. It is a small library that helps you to create forms in React and facilitates form building. It allows you to get values in and out of a form state, validate and get error messages, and effectively submit forms.

[**jaredpalmer/formik**](https://github.com/jaredpalmer/formik)

### Redux

Redux plays a huge part in React and React Native’s ecosystem when it comes to manage state in an application. Redux helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

Using Redux, you can query, select, insert, and update a record in the database. Redux also has a really useful feature to edit live code. Redux works with any UI layer, and has a large ecosystem of add ons to fit your needs.

[**reduxjs/redux**](https://github.com/reduxjs/redux)

### redux-form

Another well maintained library for building forms in a React Native application. Along with managing state with Redux, this library allows you to track common form states as focused field, fields in the form, fields that the user has interacted with, field values, and many others.

[**erikras/redux-form**](https://github.com/erikras/redux-form)

### redux-persist

Redux Persist takes your Redux state object and saves it to persisted storage. Then on app launch it retrieves this persisted state and saves it back to redux. Managing user data when locally storing in a mobile device can be hard when data sets become complex. Using React Native API `AsyncStorage` natively can be difficult for large applications.

[**rt2zz/redux-persist**](https://github.com/rt2zz/redux-persist)

### React Native Debugger

React Native Debugger is standalone application that can be installed on your local machine for debugging a React Native application. As a developer, having a quality debugging environment can lead to be more productive, while helping you track down bugs and creating new features.

Another advantage of using this standalone application, is that it already includes Redux DevTools by default. So if your application is depending on Redux state management library, with minimum configuration, you can hook up your React Native app.

[**jhen0409/react-native-debugger**](https://github.com/jhen0409/react-native-debugger)

### React Native Firebase

React Native Firebase is lightweight JavaScript library that helps you connect your React Native app to the native Firebase SDK for both iOS and Android platform. This process aims to mirror the official Firebase SDK as closely as possible.

Even though the official SDK works with React Native, this package allows you to consume device SDKs which don’t exist on the Firebase JS SDK. To consume the official SDK in React Native, you will to opt for the web one. Things like AdMob, Analytics, Cloud Messaging (FCM), Remote Config, Performance Monitoring, Dynamic Links are not available in the official Firebase SDK.

[**invertase/react-native-firebase**](https://github.com/invertase/react-native-firebase)

### Jest

Jest is a unit testing framework created by Facebook and released on GitHub. It tests JavaScript code. Jest is a versatile testing tool with the ability to adapt to any JavaScript library or framework. Its advantages include snapshot testing support.

[**Jest · _🃏 Delightful JavaScript Testing_**](https://jestjs.io/)

### Enzyme

Enzyme is a testing tool from [AirbnbEng](https://medium.com/u/ebe93072cafd). It supports shallow, full DOM, and static rendering. Enzyme also offers developers API wrappers that are supposed to make asserting, manipulating, and traversing the React DOM easier. Another great benefit of the tool is that it is compatible with other testing libraries and frameworks including Jest and Mocha.

[**airbnb/enzyme**](https://github.com/airbnb/enzyme)

### Detox

The most difficult part of automated testing on mobile is the tip of the testing pyramid is E2E.Detox is End to End (_E2E_) testing library for applications written in React Native. It means testing application like a real user, but automatically with code. You will write code and this testing library provides tools to _click through_ the application like a real human user.

For example, a test for a login screen in Detox as it runs on a device/simulator like an actual user looks like below:

```js
describe('Login flow', () => {
  it('should login successfully', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('email'))).toBeVisible();

    await element(by.id('email')).typeText('john@example.com');
    await element(by.id('password')).typeText('123456');
    await element(by.text('Login')).tap();

    await expect(element(by.text('Welcome'))).toBeVisible();
    await expect(element(by.id('email'))).toNotExist();
  });
});
```

[**wix/Detox**](https://github.com/wix/Detox)

### react-native-mock

This third-party solution is relatively new. React-native-mock helps developers work with the latest versions of React Native. The library was specifically designed to facilitate testing of React Native apps.

[**RealOrangeOne/react-native-mock**](https://github.com/RealOrangeOne/react-native-mock)

### ESLint

Lastly, I leave you with the go to linting library used by almost every JavaScript developer. It is called ESLint. It is a pluggable linting utility for JavaScript and to let programmers discover issues with their JavaScript code before executing it. One great benefit of ESLint is that it gives developers the opportunity to create their own linting rules. I personally prefer to use rules provided by the team at AirBnb with some tweaks of my own.

[**ESLint - Pluggable JavaScript linter**](https://eslint.org/)

### Conclusion

There are other libraries that modules available for React Native for different purposes. Expect more in future since mobile development is hard when it comes to accessing to different APIs. Libraries such as _axios_ for network calls and _Apollo Client_ to query [GraphQL APIs](https://medium.com/crowdbotics/creating-a-graphql-server-with-nodejs-ef9814a7e0e6) can also be used with React Native, as they are used with React JS. I didn’t think that they are worth mentioning here in detail. I hope the above list provides you ready made solutions to help you build better React Native applications.

[Originally published at Crowdbotics](https://medium.com/crowdbotics/21-useful-open-source-packages-for-react-native-807f65a818a1)

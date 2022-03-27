---
title: 'User Authentication with Amplify in a React Native and Expo app'
slug: 'user-authentication-with-amplify-in-a-react-native-and-expo-app'
date: '2019-05-22'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/user-authentication-with-amplify-in-a-react-native-and-expo-app-d00cdaf1ac28'
---

AWS Amplify is a fantastic framework that helps you develop your web or mobile applications quickly. Not only it enhances your current tech stack but actually has many features in-built that you don't have to worry about especially when your app is in the development process.

Features such as:

- authentication
- GraphQL and REST API support
- storage
- S3 uploads
- a way to manage user pool
- hosting
- notifications
- interactions
- analytics
- compatibility to work with AWS Lambda functions

Not only that. Amplify can be integrated with most popular frontend frameworks like React, Vue, Angular, Ionic, React Native or just go vanilla JavaScript if you want to.

In this tutorial, we are going to take a look at one of the most important feature of an application and that is **authentication**. You know the scenarios where you need store some amount of user information (credentials) for them to get back and re-use the application rather creating a new account.

Amplify helps us integrate its authentication component _out of the box_. Do not hate me for saying this. Now, if you have developed an application with a proper authentication flow, you know what pain it gives when it comes to writing that amount of code. With Amplify you will see how easy it is to integrate things like new user's email verification.

Enough with the introduction, let us start. However, if this is your first time reading about Amplify framework and want to learn more about what it is or how to integrate it with a React Native or Expo application, [read my previous post](https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e).

It will walk you through from basics such as [What is Amplify?](https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e#a083), [How to create a new AWS IAM user](https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e#b8c6), and [creating a GraphQL API](https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e#cfaa) and so on.

### Table of Contents

- Requirements
- Creating a new React Native App
- Create a new AWS IAM user
- Initializing & Integrating Amplify SDK
- Enable Amplify Auth Resource
- `withAuthenticator`: Adding a High Order Component
- Testing the default Amplify auth flow

## Requirements

Here is a complete list of plugins, packages, and services you’re going to need in order to gain something from this tutorial:

- Nodejs `v8.x.x` or higher installed along with npm/yarn
- `watchman`: The file change watcher for React Native projects
- AWS account
- [Amplify CLI](https://aws-amplify.github.io/docs/cli/)
- [Expo CLI](https://www.npmjs.com/package/expo-cli) (_previously known as create-react-native-app_)

_Note:_ To use any Amplify service and to follow the rest of this tutorial, you need an AWS account (which is free). If you don’t have one, please consider signing up for one here for the free tier.

## Creating a new React Native App

To get started, make sure you have already installed [`expo-cli`](https://www.npmjs.com/package/expo-cli). Now, open up a terminal window at a desired directory or location where you keep your demo projects and type the following and then press enter to execute.

```shell
expo init customize-amplify-auth-ui
```

This command will create a new directory called `customize-amplify-auth-ui`. You can name it whatever you want. Inside this directory you will find a complete react native + expo SDK generated.

On running the above command, you will be asked by the CLI to make some choices by prompting some questions. I will be leaving the them default.

Expo CLI is a command line utility to create React Native apps with no build configuration. The reason we are relying on it, is that, first it is awesome tool for such use cases. Next, it will help us build this React Native app/project much faster for any of the mobile platform (_iOS_ or _android_) than a traditional React Native project generated with `react-native-cli`. This will save us time for now but you can go ahead with `react-native-cli` if you want to but remember to run `react native link` when integrating Amplify with React Native app.

## Create a new AWS IAM user

Once you are signed-in to AWS console (_remember_, I told you to create a free AWS account and sign-in. If you haven't done so already, go ahead do it. Otherwise, you might not enjoy and at the same time, be able to follow the rest of the tutorial).

Now, from your terminal window, execute the following command.

```shell
amplify configure
```

This will open up the AWS console dashboard. Go back to terminal and press enter to continue. This will lead you through a bunch of questions in order to configure a user account to use Amplify with the React Native application. Lastly, it will provide you with a **secret** key and an **access** key. Go back to terminal and enter those keys.

Here is a summary of questions prompted by AWS Amplify CLI.

<img src='https://cdn-images-1.medium.com/max/800/1*amSKLCe6467xU_wJ5Kgr0g.png' />

This process is easy, but if you are going through it for the first time, I'd recommend you to give the below link a visit and only in few minutes you will realise how easy it is to setup a new IAM user for AWS services.

https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e#b8c6

## Initializing & Integrating Amplify SDK

To integrate AWS Amplify with the React Native app run the following command that in return prompts you for some more questions. Later, in this section, we will install dependencies in the React Native app to complete this process.

_Note:_ For a complete step by step process, please refer to [**this link here**](https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e#d79c). Do not worry, most of these configuration settings are going to be default at the moment. I am only going to walk you through essentials here.

To start, execute the following command. Make sure you are inside your React Native project directory and that too at the root of your project. This is required as this command will add some configuration files.

```shell
amplify init
```

Once you run this command, you will be prompted for the following questions.

<img src='https://cdn-images-1.medium.com/max/800/1*d1aVKZuIFzZN1Mgo86cAfQ.png' />

After the Amplify SDK initialization process is complete, notice there are some new file changes inside the project directory. A new directory `amplify/` which stores any local or cloud changes are made to configuration files. Also, a new file called `aws-exports.js` appears at the root that doesn't require to be committed over your Github account (_always remember_).

Make sure that `.gitignore` file is up to date. Amplify CLI is so good that it will update this file for you and take care of what to commit or not from the configuration part.

This is just the initialization part. We need to integrate amplify SDK now to tell our React Native app that we are going to use Amplify configuration and components in the app. To make this happen, install the following dependencies.

```shell
yarn add aws-amplify aws-amplify-react-native
```

Both of these packages are required. The package `aws-amplify` allows you to make requests to the auth and API services provided by AWS. The other one is framework specific which contains ready-to-use UI components. After these dependencies are installed, open `App.js` file and add the following.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// --- This is the part to add

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

// ---

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>React Native + Amplify = 💛</Text>
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
```

To verify that everything is on order and the app works fine, you can go ahead and run `npm start` command. Then select which mobile platform you want to run. If there no errors, you will get to see the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*3CQuczlaCMHVnFBojLqhVQ.png' />

## Enable Amplify Auth Resource

To include authentication experiences in your React Native app, amplify uses Amazon Cognito that is a fully featured user directory to handle user registration, login, and account recovery. Amplify interfaces with Cognito User Pools to store the user information, including social providers like Facebook, Google and so on.

Amplify gives you the superpower to generate an authentication flow by executing a command from the terminal window.

```shell
amplify add auth
```

On running the above command, you will be prompted with the first question like below.

<img src='https://cdn-images-1.medium.com/max/800/1*br7DyESd83gE1fz2gWV5Lg.png' />

This option is to choose the default authentication and security configuration. The second option to include a social provider like Facebook. Another option to look out for is Manual configuration about which you can read more at the [official amplify docs](https://aws-amplify.github.io/docs/js/react).

<img src='https://cdn-images-1.medium.com/max/800/1*w9im1GzV1CjKGdPpVR-DLg.png' />

Next, it will prompt you to choose the default sign in method. Choose `Username`.

Amplify’s command line interface is so interactive and in detail that it prompts you to provide input fields and select them from your terminal. Look at below.

<img src='https://cdn-images-1.medium.com/max/800/1*IIw8O4dwLrkyGoi9x5Y4iA.png' />

Choose `Email`. Now run the following command to publish all the local changes to the AWS in order to create a user pool.

```shell
amplify push
```

You will get the following screen after you execute the above command.

<img src='https://cdn-images-1.medium.com/max/800/1*14ONUYoXLzlwlVcSKLzWtQ.png' />

This shows the details of the current working environment (_which we manually entered at the time of configuring AWS IAM user_) and displays the status of the resource we are currently using ,that is `Auth`.

Executing this command will take some time to update the resources in order to enable and create a user pool for your React Native app. So go ahead, pause here, drink a cup of coffee. The user authentication setup is complete for now.

## withAuthenticator: Adding a High Order Component

Enough with the configuration part. Let us work with some app code. For React Native apps, the simplest way to add authentication flow into the app is to use `withAuthenticator` [High Order Component](https://reactjs.org/docs/higher-order-components.html).

Open up the file `App.js` and the following.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import config from './aws-exports';

// New ----
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(config);

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>React Native + Amplify = 💛</Text>
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

// New ----
export default withAuthenticator(App, true);
```

This HOC wraps the `App` component. It automatically detects the authentication state and updates to the UI.
`withAuthenticator` component renders the `App` component after a successful user signed in, and it prevents non-sign-in users to interact with your app. The second argument passed in this HOC is a boolean value that tells whether to enable the Sign Out button (once the user is successfully logged-in) or not. You will see this in action later once we have created the user.

By default, on running `npm` start, you will get the Sign In screen like below.

<img src='https://cdn-images-1.medium.com/max/800/1*cNDW73k-43-FiHndSZ8YKw.png)' />

Do notice that right now in the above screen, the Sign In button is disabled since there the input fields are empty. This a too good to for the default flow. If you enter a username followed by a password, it even throws an error like below.

<img src='https://cdn-images-1.medium.com/max/800/1*33BkYtrQA_9NfumRr6ebWA.png' />

By clicking on Sign up button, you will go to the registration screen.

<img src='https://cdn-images-1.medium.com/max/800/1*jw2fK8IJ0xjL1MR4iBK2QA.png' />

On clicking Forgot Password, will take you to another screen where it will ask you for the registered username.

<img src='https://cdn-images-1.medium.com/max/800/1*mccJmsNibLlxIKtJ11USjw.png' />

If the user is signed in, the underlying component (_in current scenario, the `App` component_) is displayed otherwise signin/signup controls are displayed. Also, did you notice that just by adding two lines of code you have authentication flow that looks pretty decent? In the next section, let us see if it works or not.

_Bonus:_ If you love design, UI, UX, or want your apps to look good, at this link you can view the color palettes Amplify uses.

https://aws-amplify.github.io/media/ui_library

## Testing the default Amplify auth flow

Currently, there no user’s registered to our app. So let us register one. Create the button `Sign Up` and enter the details asked. Do note that, enter a valid email address for the AWS cloud service will send you an email to verify your account.

Once you are done, click the `SIGN UP` button at the end of the registration form. You will get the following screen asking for the confirmation/verification code.

<img src='https://cdn-images-1.medium.com/max/800/1*fY2whWIX4Unwhrekjqleiw.png' />

Enter the verification code and click the confirm button. If it is confirmed, you will be directed back to the Sign in screen. Enter the credentials to login inside the app. You will be successfully logged in if you enter the correct credentials.

<img src='https://cdn-images-1.medium.com/max/800/1*8Xa9uKiLOikHO-A786fpJw.png' />

Notice how the sign-out button is appearing at top right corner next to the username. Yes, amplify greets the user and has the code for it integrated already at `withAuthenticator` HOC. Do take note in the above screen that the `App` component is getting rendered now.

## Conclusion

You have now successfully to add an authentication flow with Amplify and use it in a React Native app. Try using the federation or social login flow and gather the similarities or differences between the two.

You can find the complete code for this post in this [Github repository](https://github.com/amandeepmittal/expo-amplify-demo).

[Originally published at Heartbeat](https://heartbeat.fritz.ai/user-authentication-with-amplify-in-a-react-native-and-expo-app-d00cdaf1ac28)

---
title: 'How to implement Forgot Password feature in React Native with Firebase'
date: '2019-10-25'
slug: 'implement-forgot-password-firebase-react-native'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://amanhimself.dev/blog/implement-forgot-password-firebase-react-native/'
---

> Originally published at [Heartbeat.Fritz.ai](https://heartbeat.fritz.ai/how-to-implement-forgot-password-feature-in-react-native-and-firebase-app-890b572d9759)

In some of the previous posts, you built a React Native app using Firebase as the backend service provider for Email authentication and storing user's data upon successful sign-up.

Let's add another common yet useful and necessary feature in the current app structure: **Forgot Password**. This feature will require another screen in the current React Native app. To follow this tutorial, you can either go through the previous posts if you are a beginner to React Native world:

- [How authenitcation works using react-navigation 4.x.x](https://heartbeat.fritz.ai/how-authentication-flow-works-in-react-native-apps-using-react-navigation-4-x-a30bb4d9e5d6)
- [How to build and validate forms in React Native apps using Formik and Yup](https://heartbeat.fritz.ai/build-and-validate-forms-in-react-native-using-formik-and-yup-6489e2dff6a2)
- [Handle different field types in React Native forms](https://heartbeat.fritz.ai/handling-different-field-types-in-react-native-forms-with-formik-and-yup-fa9ea89d867e)
- [Use React Context API to build React Native, Expo and Firebase apps](https://amanhimself.dev/context-api-react-native-firebase)

**Or** you if you are comfortable in understanding React Native code, dive deep in source code or download it from the Github repo release [here](https://github.com/amandeepmittal/expo-firebase/releases/tag/0.6.0).

After downloading the source code, please navigate inside the project directory and install dependencies by running the command `npm install` or `yarn install`.

## Table of Contents

- Requirements
- Add Forgot Password Screen
- Add a method to send a password reset email
- Create a Form
- Handle Password Reset

## Requirements

To follow this tutorial, please make sure you the following libraries are installed on your local development environment and access to the services mentioned below.

- Nodejs (`>= 12.x.x`) with npm/yarn installed
- Expo SDK (`>= 40.x.x`)
- Firebase account, free tier will do

## Add Forgot Password Screen

Let’s start with a basic screen and hook it up with current navigation flow such that an app user will be able to navigate to this new screen from the `Login` screen.

Create a new file `screens/ForgotPassword.js` with some dummy text.

```js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ForgotPassword extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Forgot Password Screen</Text>
      </View>
    );
  }
}

export default ForgotPassword;
```

Open the `AuthNavigation.js` file and this new class component as below.

```js
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    ForgotPassword: { screen: ForgotPassword }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

export default AuthNavigation;
```

Lastly, open `Login.js` file. Logically, this where a button to navigate to this new `ForgotPassword` component should exist. First, add the handler method `goToForgotPassword` inside the `Login` class component with other handler methods.

```js
goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword');
```

Passing the name of the route as the first parameter to `navigation.navigate()` is how you navigate from one screen to the other screen using `react-navigation` library. In this case, the name of the route is going to be `ForgotPassword`.

Next, add the a `Button` component after the `Signup` button. The value of the `onPress` prop of this button is going to be the handler method.

```js
<Button
  title="Forgot Password?"
  onPress={this.goToForgotPassword}
  titleStyle={{
    color: '#039BE5'
  }}
  type="clear"
/>
```

Now, open a simulator or a real device with an Expo client installed and run the command `expo start` from a terminal window. You will be welcomed by the following screen.

![ss1](https://i.imgur.com/U7hRwYl.png)

Clicking on the button `Forgot Password ?` will lead you to the new screen.

![ss2](https://i.imgur.com/UrH4dJY.png)

## Add a method to send a password reset email

The Firebase authentication module provides a method that you can use in React Native apps to send a link to the user's registered email id with the app. Users can click the link to reset the password. Firebase does this on its own. You do not have to write the server code to add this functionality to your app.

To start, open `config/Firebase/firebase.js` file and add the following method. You will use this method inside the `ForgotPassword` component by providing the user's email as input.

```js
passwordReset: email => {
  return firebase.auth().sendPasswordResetEmail(email)
},
```

That's all you need to configure the Firebase app to make sure it sends the email on the registered email id.

To extend this further, you can try and customize the Email template that Firebase uses to send the reset password link [here](https://support.google.com/firebase/answer/7000714).

## Create a Form

Using the previously obtained knowledge of Formik ad yup let us add an input field and a button. The input field will take in the email and the button will be responsible to perform the action of submitting the form. In other words, it will trigger the network to reset the user's email in a handler method.

Open `ForgotPassword.js` file and add the following import statements.

```js
import React, { Component, Fragment } from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import { withFirebaseHOC } from '../config/Firebase';
```

After the import statements, add `validationSchema` object. This object is similar to that used in `Login` component and will help to determine whether the input provided already exists as the registered email or not.

```js
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});
```

Go the `render` function, and replace its existing content to the form below.

```js
render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions)
          }}
          validationSchema={validationSchema}>
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
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='Send Email'
                  buttonColor='#039BE5'
                  disabled={!isValid || isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </SafeAreaView>
    )
  }
```

In the above code snippet, the elements such as `FormInput`, `FormButton` and `ErrorMessage` are some re-usable custom presentational components that you can find inside `components/` directory. `this.handlePasswordReset(values, actions)` is the handler method that accepts two parameters. You will write the logic behind this method in the next section.

The corresponding styles to the component are:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 150
  },
  text: {
    color: '#333',
    fontSize: 24,
    marginLeft: 25
  },
  buttonContainer: {
    margin: 25
  }
});
```

Lastly, do not forget to wrap the `ForgotPassword` with the Firebase High Order Component `withFirebaseHOC` to use `passwordReset` method as props.

```js
export default withFirebaseHOC(ForgotPassword);
```

Now go back to the simulator and you will get the following screen.

![ss3](https://i.imgur.com/2ry1EAn.png)

## Handle Password Reset

Inside the `ForgotPassword` component create a new handler method called `handlePasswordReset`. This is going to be an asynchronous function that will accept the user's email as the parameter from the Formik's values.

Also, pass the `actions` from Formik as the second parameter. Instead of just console logging the error values, to display the error on the screen, Formik provides `setFieldError`.

```js
handlePasswordReset = async (values, actions) => {
  const { email } = values;

  try {
    await this.props.firebase.passwordReset(email);
    console.log('Password reset email sent successfully');
    this.props.navigation.navigate('Login');
  } catch (error) {
    actions.setFieldError('general', error.message);
  }
};
```

The above snippet signifies that if the email provided as the input is valid, it will send the request to reset the password. On success, a message on Expo's console will be displayed as shown below.

![ss4](https://i.imgur.com/zDL0Pfg.png)

Also, on success, it will navigate the user back to the login screen. On errors, the code inside the `catch` block will be triggered.

To try it out, register a user with a valid email address such that you can receive an email. On registering a new user, right now, the app will log you in. Sign out from the app which will take you back to the login screen. Next, go the `Forgot Password` screen and enter the valid email.

![ss8](https://i.imgur.com/YwJ191G.png)

You will receive an email like the below. It uses the default Firebase template. To demonstrate, I am using my personal Gmail address.

![ss5](https://i.imgur.com/kmgey8U.png)

Click on the link and it will redirect you to a webpage like below.

![ss6](https://i.imgur.com/vhuApsk.png)

Upon successful password change, it will prompt with the following message to the user.

![ss7](https://i.imgur.com/rLPkUeE.png)

## Conclusion

That's it! It is that simple. With a new password, you can try to login to the app now and it will work. If you have come this far, I am hope enjoyed reading this post. These are some of the strategies I try to follow with any Firebase + React Native projects.

I hope any of the codebase used in this tutorial helps you. To find the complete code, you will have to visit this [Github repo release](https://github.com/amandeepmittal/expo-firebase/releases/tag/0.7.0).

## Further reading

- [Hiring a React Native Developer: What Should You Look For? by Jess Marranco](https://www.g2i.co/blog/hiring-a-react-native-developer)

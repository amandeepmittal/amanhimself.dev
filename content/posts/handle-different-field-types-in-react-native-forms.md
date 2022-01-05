---
title: 'Handle different field types in React Native forms with formik and yup'
date: '2019-10-26'
slug: 'handle-different-field-types-in-react-native-forms'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/handling-different-field-types-in-react-native-forms-with-formik-and-yup-fa9ea89d867e'
---

In the [previous post](https://amanhimself.dev/build-validate-forms-with-react-native-formik-yup), you did a lot of things. From creating Login and Signup forms from scratch and using powerful libraries like Formik and yup to validate those forms.

In this tutorial, let us extend our knowledge of building and validating forms by handling different input field types other than strings. You are also going to take a look at my share of the solution on how to gracefully create a Confirm Password field and validate it using the reference of already setup `password` field.

Lastly, there is a small bonus section that will allow you to complete the UI of the form. You are going to add a toggle icon to show or hide the password for the user to re-check.

This tutorial is going to use an already setup source code from [**this Github repo**](https://github.com/amandeepmittal/expo-firebase/releases/tag/0.2.0) release.

After installing the source code, please navigate inside the project directory and install dependencies by running the following command:

```shell
npm install

# or

yarn install
```

## Table of Contents

- Requirements
- Adding Confirm Password Field to Signup Screen
- Handling a CheckBox with Formik and Yup
- Bonus: Hide/Show Password fields
- Conclusion

## Requirements

To follow this tutorial, please make sure you following installed on your local development environment and access to the services mentioned below.

- Nodejs (>= `10.x.x`) with npm/yarn installed
- expo-cli (>= `3.x.x`), (previously known as create-react-native-app)

## Adding Confirm Password Field to Signup Screen

In the [**last post**](LINK HERE), I left you with a challenge to figure out how to add validation for confirm password field in the signup screen using `yup`. If you succeeded, please skip this section and move on the next one. If you are still curious about it, open `Signup.js` file and a new input field for the confirm password as well as a new property with the same name in the `initialValues` object of `Formik` element.

```js
<Formik
  initialValues={{
    name: '',
    email: '',
    password: '',
    // add this
    confirmPassword: ''
  }}
  onSubmit={values => {
    this.handleSubmit(values);
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
      {/* Rest of the code remains same */}
      <FormInput
        name="password"
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        placeholder="Confirm password"
        secureTextEntry
        iconName="ios-lock"
        iconColor="#2C384A"
        onBlur={handleBlur('confirmPassword')}
      />
      <ErrorMessage
        errorValue={touched.confirmPassword && errors.confirmPassword}
      />
      <View style={styles.buttonContainer}>
        <FormButton
          buttonType="outline"
          onPress={handleSubmit}
          title="SIGNUP"
          buttonColor="#F57C00"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        />
      </View>
    </Fragment>
  )}
</Formik>
```

In the `validationSchema` object add a new property called `confirmPassword` that is going to be a string. Next, using `oneOf` the method from Yup's API. Inside its array parameter, it accepts a `Yup.ref()` which creates a reference to another sibling from the `intialValues` object.

```js
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have more than 4 characters '),

  // add this
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required')
});
```

The `Yup.ref('password')` here refers to the actual `password` field. Let us try to add a different password to both of these fields and see what happens.

I am going to add `pass` to the `password` field (_since it accepts four minimum characters_) and `passo` to the `confirmPassword` field.

![1](https://i.imgur.com/p9CEa5H.gif)

See the error message being displayed when both input fields do not match.

## Handling a CheckBox with Formik and Yup

You can create and validate other field types using Formik and Yup. In this section, you are going to achieve that by creating a checkbox field that is quite common when signing up into new applications where they make you agree to all of their terms and app policies.

Open `Signup.js` file and the following [checkbox element](https://react-native-training.github.io/react-native-elements/docs/checkbox.html#docsNav) from `react-native-elements` library. It is going to contain a boolean value. In the `initialValues` object, please add that.

```js
// import checkbox element
import { Button, CheckBox } from 'react-native-elements'

initialValues={{
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  // add "check" to initial values
  check: false
}}
```

At the checkbox, there is a prop called `checked` that is required. It holds the current value of the element whether it checked or not. After you have defined the `confirmPassword` input field, please state the following.

```js
<CheckBox
  containerStyle={styles.checkBoxContainer}
  checkedIcon="check-box"
  iconType="material"
  uncheckedIcon="check-box-outline-blank"
  title="Agree to terms and conditions"
  checkedTitle="You agreed to our terms and conditions"
  checked={values.check}
  onPress={() => setFieldValue('check', !values.check)}
/>
```

The required prop `checked` that changes the icon to check or uncheck. By default, it will be marked uncheck. The `uncheckedIcon` prop takes the value of an icon. The `title` prop's value of the checkbox when marked check, changes to the value of `checkedTitle`. These are fair advantages of using a component library like `react-native-elements`.

Using `setFieldValue` from Formik props, you can set the value of the `check` to true or false. It accepts the reference of the key `check` itself as the first parameter. `!values.check` states the opposite of the current value of the key `check`.

Lastly, edit the `validationSchema` by adding the key `check`. It is going to use boolean schema type.

```js
check: Yup.boolean().oneOf([true], 'Please check the agreement');
```

See the below demonstration on how it works.

![2](https://i.imgur.com/pj1wjhS.gif)

## Bonus: Hide/Show Password fields

In this section, you are going to add the ability to hide or show the password on the corresponding field. By the end of this section, the password input field is going to look like this.

<img src='https://cdn-images-1.medium.com/max/800/1*1-32GyAIseC81jkInsRxSg.png' />

To start, open `Login.js` file and import `TouchableOpacity` from `react-native` and `Ionicons` from expo's vector icons library which comes with Expo SDK.

```js
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
```

Next step is to define an initial state inside the `Login` component. This will help track of the current icon being shown and the visibility of the password.

```js
state = {
  passwordVisibility: true,
  rightIcon: 'ios-eye'
};
```

The define a handler method that will trigger on the `onPress` prop of `TouchableOpacity`. It checks the previous state of the icon and the password's visibility field.

```js
handlePasswordVisibility = () => {
  this.setState(prevState => ({
    rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    passwordVisibility: !prevState.passwordVisibility
  }));
};
```

Then go to the password input field and add the prop `rightIcon` from `react-native-elements`, you are going to pass the `TouchableOpacty` for the icon to be touchable and trigger some function (_in this case, handlePasswordVisibility_).

Also, tame the prop `secureEntryText`. It accepts a boolean as its value, and that is what `passwordVisibility` is. If its value is true, which is the initial state, it will secure the password field entry. When clicked on the icon, the visibility is going to change to false, and then the password will be shown.

```js
secureTextEntry={passwordVisibility}
rightIcon={
  <TouchableOpacity onPress={this.handlePasswordVisibility}>
    <Ionicons name={rightIcon} size={28} color='grey' />
  </TouchableOpacity>
}
```

This is the output you are going to get.

<img src='https://cdn-images-1.medium.com/max/800/1*m5e8YiiykjcR2h9-PuqwqA.gif' />

## Conclusion

That's it. This post and the [previous one](https://amanhimself.dev/build-validate-forms-with-react-native-formik-yup) covers enough to get you started and create forms in advance forms in React Native apps using formik and yup.

You can go ahead and add the toggle password visibility to the `Signup` form screen as well. You will find the source code from [**this Github repo**](https://github.com/amandeepmittal/expo-firebase/releases/tag/0.5.0) release.

[Originally published at Heartbeat](https://heartbeat.fritz.ai/handling-different-field-types-in-react-native-forms-with-formik-and-yup-fa9ea89d867e)

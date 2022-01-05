---
title: 'Creating and Validating React Native Forms with Formik'
date: '2020-10-16'
slug: 'creating-and-validating-react-native-form-with-formik'
thumbnail: '/thumbnails/expo.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/creating-and-validating-react-native-form-with-formik'
---

![cover](https://i.imgur.com/Qg4x9He.jpg)

Forms are an essential part of a mobile app — specifically, to handle user interactions that are available behind an authorization.

To ensure a seamless user experience, a form component consists of more than the input fields that allow users to enter their credentials. This can vary from handling form state, input field validation, handling errors, form submission, and so on.

[Formik](https://formik.org/) is an open-source React and React Native library that allows us to handle forms by:

- keeping track of a form’s state;
- handling form submission via reusable methods and handlers (such as `handleChange`, `handleBlur`, and `handleSubmit`);
- handling validation and error messages out of the box.

In this post, let's take a look at how to integrate it along with [Yup](https://github.com/jquense/yup) in a React Native app to create forms and validate them. We are also going to cover how to change the focus of one input field to another using a device's keyboard by forwarding the `ref` created using a [useRef hook](https://reactjs.org/docs/hooks-reference.html#useref).

The source code is available at [this GitHub repository](https://github.com/amandeepmittal/react-native-examples/tree/master/forms-with-formik).

## Prerequisites

To follow this tutorial, please make sure you are familiarized with JavaScript/ES6 and meet the following requirements on your local dev environment:

- [Node.js](https://nodejs.org/) version >= 12.x.x installed
- Have access to one package manager such as npm or yarn or npx
- [expo-cli](https://github.com/expo/expo-cli) version installed, or use npx

To learn more about how to set up and run the simulator or the emulator on your local development environment, visit React Native’s official documentation [here](https://reactnative.dev/docs/getting-started).

## Getting Started

Let's start by creating a simple React Native app with a new screen: `Login.js`.

Create a new React Native project using `expo-cli` and then install the dependencies required to build this demo app. Open a terminal window and execute the following commands:

```shell
npx expo-cli init formik-example

cd formik-example

yarn add formik yup
```

## Create reusable components

Create a new directory called `components/`. In this directory, we are going to keep two form components that are reusable for various types of forms such as `Login` or `SignUp`.

Let's start by creating a simple form button component which is a touchable element that allows the user to interact with the device’s screen and perform the next action. It is going to accept two props:

- `label`: the text label on the button component;
- `onPress` that is going to be handled by the parent component.

Create a new file called `Button.js` and add the following snippet:

```js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        height: 50,
        width: 245,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e94832'
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: 'white', textTransform: 'uppercase' }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
```

Now, let's create the second reusable component to let users enter their credentials. Create a new file called `TextInput.js`. This component is going to be reused for every input field in a form. It is going to have an icon on the left of the input field to indicate the nature of the input field itself. It is also going to have a placeholder text that tells the user what type of form value is expected.

It is going to accept one prop and that is the name of the `icon`. Each input field may have a different icon and other props that are generally used with a `TextInput` component in a React Native app. You will see what different props are used on a `TextInput` in the next section. For now, use a [rest parameter syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) to pass down the `...otherProps`.

```js
import React from 'react';
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native';
import { Entypo as Icon } from '@expo/vector-icons';

export default function TextInput({ icon, ...otherProps }) {
  const validationColor = '#223e4b';
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8
      }}
    >
      <View style={{ padding: 8 }}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          {...otherProps}
        />
      </View>
    </View>
  );
}
```

## Create a login screen

After setting up the reusable components, let's use them in a login screen. Start by creating a new directory called `screens/` and then, inside it, create a new file called `Login.js`. This component file is going to consist of all the necessary elements and business logic behind a login form.

The first input field is going to be for an email. It is going to have properties such as:

- the name of the icon as `icon`.
- `autoCapitalize` is going to be unique to this field since we do not want any characters to auto-capitalize by default.
- `autoCompleteType` provides autocomplete hints from the device, so it can provide an autofill for the particular field. It has [different types](https://reactnative.dev/docs/textinput#autocompletetype), but the one we are going to use here is for `email`.
- `keyboardType` is set to `email-address`. It too has [different types](https://reactnative.dev/docs/textinput#keyboardtype).
- `keyboardAppearance` allows you to set the keyboard color either to the system's default or light or dark in the background
- `returnKeyType` and `returnKeyLabel` determines how the return key should look like and the label on it. There are [different values](https://reactnative.dev/docs/textinput#returnkeytype) that you can set for it. Some of them are cross-platform and some are OS-specific. For the email input field, let's set it to “next” since we want the user to enter their email credential and then move on to the next input field by pressing the `next` button. To programmatically move on to the next input field, we are going to handle that later in a different section.

The second input field is going to be for `password`. It is going to use similar properties to the ones we used in the input field for `email` but with different values. It has a unique property such as `secureTextEntry` set to `true` which is often used to enter text values that are sensitive, like a password.

Here is the code snippet for the `Login` component after creating these two input fields:

```js
import React from 'react';
import { Text, View } from 'react-native';

import TextInput from '../components/TextInput';
import Button from '../components/Button';

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16 }}>
        Login
      </Text>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <TextInput
          icon="mail"
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
        <TextInput
          icon="key"
          placeholder="Enter your password"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
        />
      </View>
      <Button label="Login" onPress={() => true} />
    </View>
  );
}
```

To see the login form in action, run `expo start` or `yarn start`.

![js1](https://i.imgur.com/isPvj2w.png)

## Add Formik to a login form using the useFormik hook

`useFormik` is a custom React hook that returns the Formik state and the handler methods to be used in a form component.

To use it, we have to import it from the `formik` library in the `Login.js` file.

```js
import { useFormik } from 'formik';
```

You might have noticed by now that we are not using `useState` to handle the value of each input field in the Login form. The reason behind that is that `formik` comes with a property called `initialValues` whose value is the object containing form fields.

In the case of the current form, these values are going to be `email` and `password`. The `onSubmit` method accepts a function that has these values as the first argument to handle the form submission. We are going to use these values to verify if the user credentials provided in the demo app are correct. You can also add other handler methods such as navigating to another screen on successful form submission.

In the `Login` component, you can add the following.

```js
const { handleChange, handleSubmit, values } = useFormik({
  initialValues: { email: '', password: '' },
  onSubmit: values =>
    alert(`Email: ${values.email}, Password: ${values.password}`)
});
```

Now, add `onChangeText` on both input fields as well as `handleSubmit` as the value of `onPress` on the `Button` component.

```js
// on email input field
onChangeText={handleChange('email')}

// on password input field
onChangeText={handleChange('password')}

// change the value of onPress prop on <Button />
<Button label='Login' onPress={handleSubmit} />
```

Fill the input fields and press the login button to see an alert box returning these values.

![js2](https://i.imgur.com/4XARSpP.gif)

This means the Login form with a custom component is working and Formik has been integrated successfully.

## Add validation schema with Yup

The `yup` library is useful for managing complex validations when using Formik in either React or React Native apps. Formik supports both synchronous and asynchronous form validation. It has support for schema-based, form-level validation from Yup.

Start by importing it.

```js
import * as Yup from 'yup';
```

Since `initialValues` is an object, you have to specify `yup.object()` and define the shape of the object. Make sure that, when you’re defining input fields inside the shape, their names correspond to those described in `initialValues`.

Each field in this object is supported by a chain of validation methods provided by the Yup API. The type of both `email` and `password` is going to be “string” since the `onChangeText` method returns the values as strings.

Add the following code snippet before the `Login` functional component.

```js
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
});
```

Using a library like Yup for validation saves a lot of time, especially when you don’t have to define custom validation methods to check for an input field. For example, in the above snippet, using `.email()` automatically matches against a regex instead of defining one, to check the validity of an email input field.

To validate input fields based on the schema just defined, let's add another property to `useFormik` called `validationSchema`.

```js
const { handleChange, handleSubmit, values } = useFormik({
  validationSchema: LoginSchema,
  initialValues: { email: '', password: '' },
  onSubmit: values =>
    alert(`Email: ${values.email}, Password: ${values.password}`)
});
```

If you press the login button with blank input fields, the app won’t display an error but it won't submit the form.

## Validating input fields

If the user provides wrong credential values (_since we are not covering the backend API in this post, it is a good practice to check the validity of credentials on the server-side as well_), it's a good UX practice to indicate the error. In this section, let's turn the input field border and the left icon color to red if the defined validation schema object doesn't match.

We will be using `errors`, `touched`, and `handleBlur` to know whether the input field has been touched by the user and, if yes, will pass the prop `errors` to the custom `TextInput` to display UI changes based on that.

In the `Login` component, modify the following:

```js
const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
  useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: '', password: '' },
    onSubmit: values =>
      alert(`Email: ${values.email}, Password: ${values.password}`)
  });
```

Then, for the email input field, add the following properties:

```js
<TextInput
  // ... rest remains same
  onBlur={handleBlur('email')}
  error={errors.email}
  touched={touched.email}
/>
```

Similarly, modify the password field:

```js
<TextInput
  // ... rest remains same
  onBlur={handleBlur('password')}
  error={errors.password}
  touched={touched.password}
/>
```

Now, go the `TextInput` component, and pass new props: `error` and `touched`.

```js
export default function TextInput({ icon, error, ...otherProps }) {...}
```

Next, let's change the value of `validationColor` which we have defined in a previous section, based on whether the input field is touched or not and if there is an error or not by using a nested ternary operator.

```js
const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';
```

Now, go back to the simulator and, without entering the value for any input field, press the Login button. You will find that the border color and the icon color for both input fields turns red.

![js3](https://i.imgur.com/MtoCKJq.png)

Try entering new values that satisfy the `loginSchema`. Also, see what happens if you touch one input field and move on to the next without entering any value — it will be considered as touched and an error will be shown.

![js4](https://i.imgur.com/Xb1RZub.gif)

Try to enter a password with more than 10 characters and verify that and error is also shown.

![js5](https://i.imgur.com/S7kvcxd.png)

## Select the next text input after pressing the "next" button

The last thing we need to do is to add another property on each input field to select the next `TextInput` field when pressing the `next` button.

Since there are only two input fields, the `next` button is shown only in the email input field. This can be done by adding a property `onSubmitEditing` on the input field which accepts a callback as value. By creating a new `ref` for the password field, we can determine whether the input field in focus at any given time is the password or not. If not, that means it is the email field and we can press the next button to change the focus from the email to the password field.

In the `Login.js` file, start by importing the `useRef` hook from the React library and, inside the Login component, define the `ref` with the initial value of `null`.

```js
import React, { useRef } from 'react';

//...

export default function Login() {
  const password = useRef(null);
  // ...
}
```

Next, add the `ref` property to the password input field.

```js
<TextInput
  ref={password}
  // ...
/>
```

Then, add `onSubmitEditing` to the email input field.

```js
onSubmitEditing={() => password.current?.focus()}
```

Back to the simulator, you will encounter the following warning.

![js6](https://i.imgur.com/gElVVOR.png)

This can be solved by using a `forwardRef` on the custom `TextInput` component. Ref forwarding is a technique for automatically passing a `ref` through a component to one of its children. In our case, we need to pass the `ref` from `Login` to the `TextInput` component.

Open `TextInput.js` and import `forwardRef` from the React library.

```js
import React, { forwardRef } from 'react';
```

Then, wrap all contents of the `TextInput` functional component with `forwardRef` as shown below:

```js
const TextInput = forwardRef(({ icon, error, touched, ...otherProps }, ref) => {
  const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 8
      }}
    >
      <View style={{ padding: 8 }}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          ref={ref}
          {...otherProps}
        />
      </View>
    </View>
  );
});

export default TextInput;
```

Now, by pressing the “next” button on the email input field, you can change the focus of the current field to “password”.

![js7](https://i.imgur.com/U505VsB.gif)

The password input field shows a `go` button which indicates that, when users have finished entering their credentials, they are ready to submit the form. By adding `onSubmitEditing` with the value of `handleSubmit`, you submit the form.

Add the following to the password input field in `Login.js`:

```js
onSubmitEditing={() => handleSubmit()}
```

And that’s it! Here is the output you are going to get after completing this step:

![js8](https://i.imgur.com/01WXCni.gif)

## Conclusion

Using a form library like Formik gives us many advantages when building and handling forms to provide a pragmatic user experience.

There are many different methods available in the [Yup API](https://github.com/jquense/yup#yup) to add validation schema to a form component. This post covers the basics of Formik and Yup as well as one way of handling errors and touched fields.

The last section where we used `ref` to change the focus from one input field to the next using a device's keyboard is not a must-have but it may be worth considering if you want to provide seamless user experience.

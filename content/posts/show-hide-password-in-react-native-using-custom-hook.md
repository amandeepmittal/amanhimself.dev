---
title: 'Create a custom hook to Show/Hide Password Visibility in React Native'
date: '2021-12-11'
thumbnail: '/thumbnails/expo.png'
slug: 'show-hide-password-in-react-native-using-custom-hook'
tag: 'expo'
canonicalUrl: 'https://amanhimself.dev/blog/show-hide-password-in-react-native-using-custom-hook/'
---

> Updated on May 24, 2023

Building log-in and sign-up forms in a React Native app are fundamentally composed of input fields and buttons. One field that you will often find yourself adding to these forms is the password field. This password field is created using React Native's `TextInput` component. The common behavior of this field is to hide a user's password behind obscure characters.

Take a look at an example of the `TextInput` component that is used to create a password field.

```js
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function App() {
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          name="password"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry
          value={password}
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7'
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '90%'
  }
});
```

It uses the `secureTextEntry` prop such that when a text value is entered in the input field, it is not visible as to what is being entered in that field. Here is the output of the above snippet on a device:

![ss1](https://i.imgur.com/kn0yv9z.gif)

However, giving an option to a user to let them see the current value they enter leads to a good experience and might be necessary in most cases.

> [Source code in this GitHub repo](https://github.com/amandeepmittal/react-native-examples/tree/main/password-visibility-custom-hook-example).

## Show or Hide Password Visibility hook

To add the ability to show or hide the password field's visibility, let's create a custom hook in a new file called `useTogglePasswordVisibility.js`.

Start by importing the `useState` hook from React library. You will need to create two different state variables to toggle between the field's visibility and change the icon.

Then define a function called `useTogglePasswordVisibility`. Inside this function, create two new state variables:

- `passwordVisibility`: set its initial value to `true`. The reason is that this variable will be the value of the prop `secureTextEntry` on the `TextInput` component. You would want to hide the password field initially when the user enters the password in the input field.
- `rightIcon`: set its default valye to `eye`. This value depends on the icon library you're using in your React Native app. For this example, I'm using **MaterialCommunityIcons** from [Expo Vector Icons](https://docs.expo.dev//guides/icons/#expovector-icons).

```js
export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  // ...
};
```

Next, add a method called `handlePasswordVisibility` that will allow the app user to toggle the password field's visibility between shown and hidden state. Do not forget to return all the variables and the handler method.

```js
export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};
```

## Use the Password Visibility hook

Start by updating import statements in the `App.js` file:

```js
import { useState } from 'react';
import { StyleSheet, Pressable, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTogglePasswordVisibility } from './hook/useTogglePasswordVisibility';
```

Next, access the required variables and method from the `useTogglePasswordVisibility` hook. Add the following line at the top of the `App` component:

```js
export default function App() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  // ...
}
```

Modify the `TextInput` component's prop. Make sure to add the `passwordVisibility` as the value to the `secureTextEntry` prop.

```js
<TextInput
  secureTextEntry={passwordVisibility}
  // ... rest of the props remain unchanged
/>
```

Inside the `View` component that wraps the `TextInput`, add a button using the `Pressable` component. This button will allow the user to toggle between the hidden and shown state of the password field. It also wraps the icon component.

```js
<View style={styles.inputContainer}>
  {/* After TextInput component */}
  <Pressable onPress={handlePasswordVisibility}>
    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
  </Pressable>
</View>
```

That's all! Here is the output after this step:

![ss2](https://i.imgur.com/rTNH2Ud.gif)

Here is the complete code for the `App.js` file:

```js
import React, { useState } from 'react';
import { StyleSheet, Pressable, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTogglePasswordVisibility } from './hook/useTogglePasswordVisibility';

export default function App() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          name="password"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password}
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7'
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '90%'
  }
});
```

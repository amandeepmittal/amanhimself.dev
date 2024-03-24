---
title: 'An in-depth guide on how to use React Native Image Picker'
date: '2020-04-27'
slug: 'how-to-use-react-native-image-picker'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://blog.crowdbotics.com/how-to-use-react-native-image-picker/'
---

React Native as a framework to develop cross-platform mobile apps has few options to select an image from a user's mobile phone gallery or camera and perform further actions on it. One module that does that is called [`react-native-image-picker`](https://github.com/react-native-community/react-native-image-picker).

This module is maintained by React Native community and is also one of the reasons I highly recommend this module for you to use. It uses native UI to select a photo or a video from the mobile phone's library or the camera of that device.

In this tutorial, let us start from basics on how to integrate this module for both iOS and Android platforms in a React Native app. Then proceed further to use this module by having a look at some of the common ways to solve different problems when developing an app.

## What you need to follow this tutorial?

To follow this tutorial, ensure your dev environment includes the following required packages:

- [Node.js above `10.x.x`](https://nodejs.org/en/) installed on your local machine
- [watchman](https://facebook.github.io/watchman/) the file watcher, installed
- `react-native-cli` installed through npm or access via npm/yarn or [npx](https://github.com/react-native-community/cli#using-npx-recommended)
- [cocoapods](https://cocoapods.org/) for iOS only
- Do note that the following tutorial is going to use the [react-native version `0.62.x`](http://reactnative.dev/). Please make sure you’re using a version of React Native above `0.60.x`.

For a complete walk-through on setting up a development environment for React Native, you can go through the [official documentation here](https://reactnative.dev/docs/getting-started).

## Create a new react native app

Start by creating a new React Native app. Open a terminal window and execute the following command. I am going to use npx to access the latest React Native CLI version. After the project directory is created, please make sure that you navigate inside the directory.

```shell
npx react-native init rnImagePickerExample

# navigate to project directory
cd rnImagePickerExample

# after navigating inside the directory
# install pods for iOS development

npx pod-install
```

> Thanks to awesome open-source developers at [Expo](http://expo.io/) [pod-install](https://github.com/expo/expo-cli/tree/master/packages/pod-install) is an awesome package that lets you install Cocapods essential to build and run react-native apps for iOS. You don't have to dwell inside the `ios/` directory and navigate back to the root project. It takes care of that extra step.

Build the app for the specific mobile OS you are building the app for by running either of the two commands as below:

```shell
# for iOS
npx react-native run-ios

# for android
npx react-native run-android
```

Go to the simulator or the device you have connected to run this app and you are going to get default React Native app.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb1-1.png' />

Cheers! You have created a new React Native app. Let us now get started with this tutorial.

## Install and configure react-native-image-picker

Start by running the below command from a terminal window to install the image picker module.

```shell
yarn add react-native-image-picker
```

Once you have done this step, you are going to get a success message in your terminal window as shown below. After installing pods, you have to make sure to **add permissions**. If you do not add this step, the app might crash or won't work when using `react-native-image-picker`.

### iOS permissions

For iOS, open `/ios/rnImagePickerExample/Info.plist` file and the following:

```c
<plist version="1.0">
  <dict>
    // ...
    // add the following
    <key>NSPhotoLibraryUsageDescription</key>
    <string>$(PRODUCT_NAME) would like access to your photo gallery</string>
    <key>NSCameraUsageDescription</key>
    <string>$(PRODUCT_NAME) would like to use your camera</string>
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>$(PRODUCT_NAME) would like to save photos to your photo gallery</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>$(PRODUCT_NAME) would like to use your microphone (for videos)</string>
  </dict>
</plist>
```

There is an essential step to make sure you ask for the right permission with the right message, especially if you are looking forward to publishing your app on the store.

### CocoaPods installation

Another necessary step to make this app run on iOS is to install Cocoapods for the image picker library we have just installed. After the release of React Native 0.60, the team behind the framework introduced auto-linking so we do not require to link the library. This is "auto-linking" is done by installing pods.

```shell
npx pod-install
```

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb2-1.png' />

Make sure to run the build command mentioned in the previous section to run the app again after this step.

### Android permissions

Similarly, for Android, you have to add the required permissions in the file `/android/app/src/main/AndroidManifest.xml`. The first permission is to access the device's camera and the second permission is to read or write to storage. This second option for the current demo app means to allow us to choose the image from the device's image gallery.

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

That's it to install and configure an image picker library in a react native app. For more information check out official doc [here](https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Install.md).

## Create a simple image picker screen component

The advantage of the React Native Image Picker library is the number of options it provides in the options it provides for you set and use in your app. The simplest options like changing the title of the picker button, or the cancel button, setting the max height and width of the image picked, there are some advance options such as skipBack and so on that are useful when uploading or communicating with a backend service.

Start by creating a simple image picker screen component. Make sure you are at the root location of your project to follow these steps.

- Create a new directory called `src`.
- Inside `src` create a new sub-directory to store all screen components called `screens`. This is a common convention to keep all screen components inside a React Native app.
- Inside the sub-directory create the screen component file called `SimpleImagePicker.js` as well as a global a style file called `Styles.js`.

Inside the `Styles.js` let us define some basic styles using `StyleSheet` object from React Native core API. In the snippet below, you are also going to find some hex color codes that are going to be used throughout this tutorial. Feel free to change these values as per your preference.

```js
// Global shared styles for screens

import { StyleSheet } from 'react-native';

export const STYLES = StyleSheet.create({
  flex: {
    flex: 1
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22
  }
});

export const COLORS = {
  primaryDark: '#22212c',
  primaryLight: '#f8f8f2',
  primaryRed: '#ff5555',
  primaryPink: '#ff80bf',
  primaryYellow: '#ffff80',
  primaryOrange: '#ff9580'
};
```

Typically you define these types of styles, as mentioned in the above code snippet, for a particular screen. But if you are planning to have more than one screen component, you can share styles by creating a global file.

Next, inside `SimpleImagePicker.js` file, start by importing necessary statements as well as styles that you have just created.

Then create a basic component that displays a `<Text>` inside the functional component `SimpleImagePicker()`.

```js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { STYLES, COLORS } from './Styles';

export default function SimpleImagePicker() {
  const [imageSource, setImageSource] = useState(null);
  return (
    <View
      style={[
        STYLES.flex,
        STYLES.centerContainer,
        { backgroundColor: COLORS.primaryDark }
      ]}
    >
      <Text style={[STYLES.title, { color: COLORS.primaryLight }]}>
        Simple Image Picker
      </Text>
    </View>
  );
}
```

The state variable `imageSource` in the above snippet is going to store the value of the URI or the source of the image on the device when a user chooses an image.

To see this screen component in action, one last step left is to modify the `App.js` file as shown below.

```js
import React from 'react';
import { StatusBar } from 'react-native';
import SimpleImagePicker from './src/screens/SimpleImagePicker';

export default function () {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SimpleImagePicker />
    </>
  );
}
```

Go back to a simulator or the physical device you are using to run this app and you are going to be welcomed by the following screen.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb3-1.png' />

## How to pick an image?

In this section let us get create a handler method that is going to allow the user to pick an image. To start make sure you update the import statements by importing core components from React Native such as `TouchableOpacity` and `Alert`. Also, import `ImagePicker` from `react-native-image-picker` library.

Then inside, the screen component creates a new handler method called `selectImage()`. This method is going to trigger a button on the screen when the user wants to select an image from the device's library from `<TouchableOpacity>`.

Inside this method, you are going to an `options` object with some primary options like the title of the image picker, the maximum width, and height of an image, and setting storage options to not backup an image selected. This `options` object is used for customization and its not mandatory. This object is also passed as the first argument to the method that actually selects an image.

`ImagePicker` library has a method called `showImagePicker` which accepts an object called `response` as the second argument. This method's only job is to display the image picker. It shows an alert box when the button is pressed to select an image.

The `response` object is the most important. It has properties to determine like when the user cancels the process of picking an image from the library or there is an error in the process of picking an image, the URI of the local file asset select by the user, and so on.

We are going to use some of the basic options like `did cancel`, `error`, `customButton`, and `uri`.

Modify the screen component file as shown below.

```js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { STYLES, COLORS } from './Styles';
import ImagePicker from 'react-native-image-picker';

export default function SimpleImagePicker() {
  const [imageSource, setImageSource] = useState(null);

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log({ response });

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        console.log({ source });
      }
    });
  }

  return (
    <View
      style={[
        STYLES.flex,
        STYLES.centerContainer,
        { backgroundColor: COLORS.primaryDark }
      ]}
    >
      <Text style={[STYLES.title, { color: COLORS.primaryLight }]}>
        Simple Image Picker
      </Text>
      <TouchableOpacity
        onPress={selectImage}
        style={[
          STYLES.selectButtonContainer,
          { backgroundColor: COLORS.primaryLight }
        ]}
      >
        <Text style={STYLES.selectButtonTitle}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  );
}
```

Also, modify the `Styles.js` file and add the styles for the new button you have just created.

```js
export const STYLES = StyleSheet.create({
  flex: {
    flex: 1
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22
  },
  // add below
  selectButtonContainer: {
    margin: 20,
    borderRadius: 5
  },
  selectButtonTitle: {
    padding: 10,
    fontSize: 18
  }
});
```

Now go back to the simulator and you are going to see the new button we have just added is being displayed.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb4-1.png' />

Click the button and there is going to be an alert box pop up.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb5-1.png' />

It gives you the option to select an image from the library or take a photo from the device's camera (Since I am using a simulator, taking a photo is not possible).

At this moment, if you press `Cancel`, you are going to see another alert box (that we intentionally added to the screen component).

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb6-1.png' />

The console statements are also being logged correctly by the metro bundler terminal window. You can verify that as shown in the image below.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb7.png' />

To make the alert box disappear, click the button `Ok`. Click the UI button to select an image again, and this time, choose an image from the library.

The first thing it is going to do is to ask for permission. This only happens for the first time when the user is using the app.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb8.png' />

Next, select an image if you have in the library as shown below.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb9.png' />

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb10.png' />

After you have selected the image, nothing happens. This is because we still have to write the code to display the image. For now, go to the terminal window and you are going to the `response` object as well `source` object with data and information about the image.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb11-1.png' />

If it is not visible or understandable, take a look at the JSON snippet below.

```json
{
  "response": {
    "data": "/9j/4AAQSkZJRgABAQAAAQABAAD/
    4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdC
    IFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAAB
    eAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAAB
    oAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB
    3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMA
    UgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFla
    IAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA
    +EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAA
    pbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAA
    AAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIA
    BJAG4AYwAuACAAMgAwADEANv/
    bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE
    BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/
    bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE
    BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/
    AABEIAQABAAMBIgACEQEDEQH/
    xAAVAAEBAAAAAAAAAAAAAAAAAAAAC//
    EABQQAQAAAAAAAAAAAAAAAAAAAAD/
    xAAUAQEAAAAAAAAAAAAAAAAAAAAA/
    8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/
    aAAwDAQACEQMRAD8An/
    gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==",
    "fileName": "image-4be54ecf-83c7-4819-bf37-b549cd3efa71.jpg",
    "fileSize": 1222,
    "height": 256,
    "isVertical": true,
    "originalRotation": 0,
    "path": "/storage/emulated/0/Pictures/image-4be54ecf-83c7-4819-bf37-b549cd3efa71.jpg",
    "type": "image/jpeg",
    "uri": "file:///storage/emulated/0/Pictures/
    image-4be54ecf-83c7-4819-bf37-b549cd3efa71.jpg",
    "width": 256
  }
}
```

The `response` object returns details related to the image such as:

- `data`: base64 encoded image data generated
- `fileSize`: the size of the file
- `fileName`: the name of the file name
- `type`: media type such as `image/jpeg`
- `uri`: which is also the value of the `source` object
- the `width` and `height` but with dimensions that we passed as the properties of `options` object and not the actual image size (which is `500px x 500px`).

You can stop the base64 data generation of the image by adding another property called `noData: true` in `options` object and it will stop generating the base64 if there is no requirement.

```js
let options = {
  // rest of the properties remain same
  noData: true
};
```

After adding this property, the new `response` object won't have a `data` field.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb12-1.png' />

The type of the source is essential for the image picker to know such as if you only want the user to select an image instead of a video file, then you can set another property called `mediaType` at `options` object.

```js
let options = {
  // rest of the properties remain same
  mediaType: 'photo' // other values 'video', 'mixed'
};
```

By setting the value to `mixed` for this property type will allow the user to select either an image or a video. There are other options on how you can control the user's input when selecting an image or a video that you can find in the official documentation [here](https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md#options) of the image picker library.

## Difference between launchImageLibrary() and showImagePicker()?

There are separate functions provided by `ImagePicker` to use for selected methods:

- `launchCamera(options?, (response) => {})`
- `launchImageLibrary(options?, (response) => {})`

Using these methods eliminates the need of showing the alert box to select an option when choosing an image.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb5-2.png' />

These methods are for a direct use case such as when you only want the user to select the image either from the device's library or take a photo from the device's camera. You want to give the user only one option from these two, then you should use one of these methods.

The working of either of these methods is similar to `showImagePicker`. Let us try one of them. Replace the method `showImagePicker()` with `launchImageLibrary()` in the screen component file.

```js
ImagePicker.launchImageLibrary(options, response => {
  console.log({ response });

  if (response.didCancel) {
    console.log('User cancelled photo picker');
    Alert.alert('You did not select any image');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    let source = { uri: response.uri };
    console.log({ source });
  }
});
```

Now go back to the device and you are going to notice only one difference. The image library opens as soon as the button from the app is clicked.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb13.gif' />

The rest of the process is going to be the same.

## Display the image

In this section, let us complete the demo app by displaying the image when the user picks an image from the library. We are also going to display a placeholder image when no image is being selected by the user.

To start you are going to import the `Image` from react native core API. Then update the handler function by setting the source uri of the image to the state variable `image source` we defined in the earlier section.

Lastly, you update the JSX of the component.

Here is the complete code snippet for the `SimpleImagePicker` screen component. We are going to conditionally render when to show the placeholder image from a local asset file and when to display the image that the user has picked.

```js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { STYLES, COLORS } from './Styles';
import ImagePicker from 'react-native-image-picker';

export default function SimpleImagePicker() {
  const [imageSource, setImageSource] = useState(null);

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // ADD THIS
        setImageSource(source.uri);
      }
    });
  }

  return (
    <View
      style={[
        STYLES.flex,
        STYLES.centerContainer,
        { backgroundColor: COLORS.primaryDark }
      ]}
    >
      <Text style={[STYLES.title, { color: COLORS.primaryLight }]}>
        Simple Image Picker
      </Text>
      {/* ADD THIS */}
      <View style={STYLES.imageContainer}>
        {imageSource === null ? (
          <Image
            source={require('../assets/placeholderimage.jpg')}
            style={STYLES.imageBox}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={{ uri: imageSource }}
            style={STYLES.imageBox}
            resizeMode="contain"
          />
        )}
      </View>
      <TouchableOpacity
        onPress={selectImage}
        style={[
          STYLES.selectButtonContainer,
          { backgroundColor: COLORS.primaryLight }
        ]}
      >
        <Text style={STYLES.selectButtonTitle}>Pick an image</Text>
      </TouchableOpacity>
    </View>
  );
}
```

Also, update the `Styles.js` file:

```js
export const STYLES = StyleSheet.create({
  // rest of the styles remain same
  // ADD BELOW
  imageContainer: {
    marginVertical: 20,
    borderWidth: 5,
    borderColor: '#ff5555'
  },
  imageBox: {
    width: 256,
    height: 256
  }
});
```

Go back to the app and when an image is not picked, you are going to see the following result.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb14.png' />

When an image is selected, it is going to be displayed instead of the placeholder image.

<img src='https://crowdbotics.ghost.io/content/images/2020/04/cb15-1.png' />

## Conclusion

In this post, you have learned how to configure and implement `react-native-image-picker` library to allow a user to pick an image from their device library. When on a physical device, try testing the above code snippet using the device's Camera. The core functionalities discussed in this post are important to customize and advance further to add more functionalities.

Here is the link to the complete [API](https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md#the-response-object) for `react-native-image-picker` library.

The complete code for this tutorial is available at this GitHub repo [here](https://github.com/amandeepmittal/react-native-examples/tree/master/rnImagePickerExample).

[Originally Published at Crowdbotics](https://crowdbotics.ghost.io//how-to-use-react-native-image-picker/).

---
title: 'How to upload an image using Expo Camera to Cloudinary'
date: '2021-03-31'
slug: 'upload-image-to-cloudinary-using-expo-camera'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://jscrambler.com/blog/how-to-upload-an-image-using-expo-camera-to-cloudinary/'
---

> Originally Published at **[Jscrambler's Blog](https://jscrambler.com/blog/how-to-upload-an-image-using-expo-camera-to-cloudinary/)**.

The camera feature in a mobile device allows it to capture pictures and record videos, making it very helpful in many circumstances. By using the expo-camera library the process of adding that camera feature to an application becomes seamless, which is why in this tutorial, we’ll take a look at how to use [Expo Camera](https://docs.expo.io/versions/latest/sdk/camera/) to take a picture and then upload that same picture to a real-time cloud service [Cloudinary](https://cloudinary.com/).

## Prerequisites

To follow this tutorial, please make sure you are familiarized with JavaScript/ES6 and meet the following requirements in your local dev environment:

- Have [Node.js](https://nodejs.org/) version >= 14.x.x installed.
- Have access to one package manager such as npm or yarn or npx.
- Have [expo-cli](https://github.com/expo/expo-cli) installed, or use npx

**The source code is available at this [Github repository](https://github.com/amandeepmittal/react-native-examples/tree/master/camera-upload-to-cloudinary).**

## Create an Expo app

Start by creating a new Expo app and then install the dependency `expo-camera`. Execute the following commands in a terminal window:

```shell
npx create-expo-app project-name

# select the blank template

cd project-name

npx expo install expo-camera
```

## Create a custom camera component

The `expo-camera` library provides a React component that allows snapping pictures using a device's front or back camera. It exposes properties like zoom, autofocus, preview image after snapping, white balance, face detection, barcode scanning, and flash mode.

For this demo, let's create a component that when rendered renders the `<Camera>` component initially.

Start by adding the following import statements in the `App.js` file.

```js
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
```

The `@expo/vector-icons` is another package bundled with Expo SDK and allows the use of various icons from different icon sets. You can find the references to these icons at [icons.expo.fyi](https://icons.expo.fyi/).

The `Dimensions` from React Native is used to get the application’s windows width and height.

- To display the camera in full-screen mode, let's get the height of the window on which the application is running.
- Then, define a custom variable called CAPTURE_SIZE representing 80% of the window height. This variable is used in styles later.
- Add the following code snippet before the `App` component.

```js
const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);
```

The `expo-camera` library exposes an API of methods. To invoke any of these methods, define a reference to the useRef React hook.

Add the following code snippet just after defining the `App`. Make sure to add a `ref` prop to the `Camera` component whose value is `cameraRef`.

```js
return (
  <View style={styles.container}>
    <Camera ref={cameraRef} style={styles.container} />
  </View>
);
```

## Why use absoluteFillObject to position View component

The `absoluteFillObject` automatically sets a `View` component to be full screen and absolutely positioned. It also allows overriding the values such as `top`. For example, you may want to absolute position the `View` component with an offset like `top: 30` to display it below the status bar.

Add the corresponding styles to the `App` component.

```js
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  }
});
```

## How to check for camera permissions

To use a device's camera, the application needs to ask a user to utilize the hardware functionality. This is done by asking the user to grant permission for camera access, and naturally, if the request gets denied, the application won't be able to use it.

- First, define a state variable using the `useState` React hook called `hasPermission`.
- Then, create a method called `onHandlePermission`. It is asynchronous and returns a Promise that resolves when the permissions are granted. To ask for permission, `Camera.requestPermissionsAsync` is used.
- Update the state variable using the update function from the array if the promise is resolved and the permission has been granted.
- Then, using a `useEffect` hook, invoke the method `onHandlePermission`.

Add the following code snippet in `App` component:

```js
export default function App() {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  // ...
}
```

In the above code snippet, the two `if` statements are used either when:

- The permission hasn’t been requested.
- A user denies the permission, in which case, a text message stating that there is no access to the camera will be displayed.

Here is how asking for permissions are prompted on an Android device:

![ss1](https://i.imgur.com/5iOMbr1.png)

After the permission is granted, the Camera is now accessible on the device:

![ss2](https://i.imgur.com/90zdXLT.png)

## Switching between Camera types

To switch between different types of cameras on a device, let's add a custom method. The Camera component has a prop called `type` and by using it, the type of camera currently in use on the device can be determined.

Start by defining a state variable called `cameraType` to track the camera's current type. Give it a default value of type `back`. It determines that the default camera mode type is going to be back. The camera type is accessible from `Camera.Constants.Type.back`.

Define another state variable called `isPreview`. It will determine whether the app is in camera mode or image preview mode. It is going to have a default value of boolean `false`.

Add a method called `switchCamera` in the `App` component. Then, check if it is in the preview mode. If yes, return nothing.

If it is in the camera mode, write the logic to handle the switch between the back and front camera mode by updating the state value of `cameraType`.

Then, on the `Camera` component add a prop `type={cameraType}`.

Define the state variable to determine whether the camera is ready to capture photos or not. Call it `isCameraReady` with a default value of boolean `false`. Then, add a method called `onCameraReady` to update its value. Also, add the prop `onCameraReady={onCameraReady}` on the `Camera` component.

```js
export default function App() {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
    </View>
  );
}
```

To allow the Camera to switch, add a custom icon button to switch between two different camera types. The icon is used from the `MaterialIcons` set from the `@expo/vector-icons library`.

After the `Camera` component in JSX code, add a `View` component that wraps the buttons such as switch camera types and capture a picture.

Inside the `View` component, create an icon button using `TouchableOpacity`. The `onPress` prop on this component is used to trigger an action. In this case, it is used to invoke the `switchCamera` method.

Add a `disabled` prop on `TouchableOpacity` that disables the button depending on the value of `isCameraReady`. If its value is false, then this button will not function.

```js
<View style={styles.container}>
  <Camera
    ref={cameraRef}
    style={styles.container}
    type={cameraType}
    onCameraReady={onCameraReady}
  />
  <View style={styles.container}>
    {!isPreview && (
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
          <MaterialIcons name="flip-camera-ios" size={28} color="white" />
        </TouchableOpacity>
      </View>
    )}
  </View>
</View>
```

Add the styles for the above code snippet:

```js
const styles = StyleSheet.create({
  // ...
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```

Here is how the switch button is displayed:

![ss3](https://i.imgur.com/aPslkxl.png)

## Take a picture from the Camera and preview it

Camera API from the `expo-camera` library uses a method called `takePictureAsync()` to take a picture. It saves the photographed image in the app's cache directory by default.

The method accepts a configuration object with different options such as quality, base64, skipProcessing, exif, etc. We will use two options:

- `quality` to specify the compression rate of the image snapped
- `base64` to include the image data in Base64 format.

These options are passed as properties in a JavaScript object. This object is then further passed as an argument to the `takePictureAsync` method.

Start by adding a new asynchronous method called `onSnap`. Start by checking the value of the `cameraRef.current`. If available, then the following logic defined in the code snippet below to take a picture will execute from this method.

Then, define an object called `options` with the following properties:

- quality and set its value to `0.7`. This option selects a value between 0 to 1.
- base64 and set its value to `true`. It accepts a boolean value of true or false

The `takePictureAsync` method, when invoked, returns a promise that resolves into an object. Store the value resolved in a variable called `data`. It contains the image data in form of the following properties:

- uri of the image stored in the app's cache.
- width and height of the image.
- if the base64 option is enabled, it will return the base64 data of the image.

Store the base64 data of the image in another variable called `source`.

Next, add an if condition to check if the source exists. If it exists, pause the camera mode and set the image preview mode to true to show the current picture after it is taken.

```js
const onSnap = async () => {
  if (cameraRef.current) {
    const options = { quality: 0.7, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    const source = data.base64;

    if (source) {
      await cameraRef.current.pausePreview();
      setIsPreview(true);
    }
  }
};
```

To go back from the image preview mode to camera mode, add a method called `cancelPreview`. When this method invokes, it resumes the camera mode.

```js
const cancelPreview = async () => {
  await cameraRef.current.resumePreview();
  setIsPreview(false);
};
```

Add the `onSnap` method as an action on `TouchableOpacity` component as the value of `onPress` prop. This button is responsible for capturing an image and is wrapped by the View component when the image preview mode is false.

```js
<View style={styles.container}>
  {!isPreview && (
    <View style={styles.bottomButtonsContainer}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <MaterialIcons name="flip-camera-ios" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={onSnap}
        style={styles.capture}
      />
    </View>
  )}
</View>
```

Add the styles for the above code snippet:

```js
const styles = StyleSheet.create({
  // ...
  capture: {
    backgroundColor: '#5A45FF',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  }
});
```

Here is how the capture button is shown. It can now take pictures.

![ss4](https://i.imgur.com/RYAKlLf.png)

Add JSX code to trigger the `cancelPreview` method as an action on a `TouchableOpacity` component. It wraps an icon component from `AntDesign`. This is shown when the application is in image preview mode.

```js
<View style={styles.container}>
  {isPreview && (
    <TouchableOpacity
      onPress={cancelPreview}
      style={styles.closeButton}
      activeOpacity={0.7}
    >
      <AntDesign name='close' size={32} color='#fff' />
    </TouchableOpacity>
  )}
  {!isPreview && (
    // ...
  )}
</View>
```

Add the styles for the above code snippet:

```js
const styles = StyleSheet.create({
  // ...
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  }
});
```

After taking a picture, here is how the image preview mode is displayed:

![ss5](https://i.imgur.com/dIyq9ce.png)

## Setup the Cloudinary service

Before starting with this section, make sure you have a Cloudinary account set up. If you already have an account, [log in here](https://cloudinary.com/users/login).

After logging in, you will be welcomed by a dashboard screen similar to below:

![ss6](https://i.imgur.com/jIX6Yio.png)

To upload an image to their service, two things are required.

First, an apiUrl which is constructed of the following base URL:

```shell
'https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload'
```

The value for the placeholder `<your-cloud-name>` is the cloud name you entered when creating a new account or as shown in the dashboard screen.

The second parameter required is called `upload_preset`. It is created by following the steps below:

- From the Dashboard, click Settings in the menu bar and select the Upload tab.
- Look for the section "Upload presets" and click "Add upload preset".
- Enter the name of the upload preset. In the "Signing mode," select the value "Unsigned" from the drop-down menu.
- Then click Save.

![ss7](https://i.imgur.com/sfEYaDR.gif)

## Upload an image to Cloudinary

To upload an image to the service, we need a few required presets. We will use JavaScript's `fetch` API to send a POST request to the Cloudinary API URL. A service that allows uploading base64 images requires the image data to be appended by the `data:image/jpg;base64,` prefix.

The request also requires a `data` object which has the image data as the `file` and the value of the `upload_preset`.

Modify the `onSnap` method inside as shown below.

```js
const onSnap = async () => {
  if (cameraRef.current) {
    const options = { quality: 0.7, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    const source = data.base64;

    if (source) {
      await cameraRef.current.pausePreview();
      setIsPreview(true);

      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl =
        'https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload';
      let data = {
        file: base64Img,
        upload_preset: '<your-upload-preset>'
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async response => {
          let data = await response.json();
          if (data.secure_url) {
            alert('Upload successful');
          }
        })
        .catch(err => {
          alert('Cannot upload');
        });
    }
  }
};
```

Take a picture and when it is successfully uploaded to the Cloudinary service, an alert message like below is displayed:

![ss8](https://i.imgur.com/gEQe5wP.png)

## Using Camera2 api for Android

Android devices have a new package called [android.hardware.camera2](https://developer.android.com/reference/android/hardware/camera2/package-summary) that provides an interface to an individual camera. It replaces the deprecated [Camera](https://developer.android.com/reference/android/hardware/Camera) class.

To use the latest package using `expo-camera`, add the following prop with a value of boolean `true` on the `Camera` component.

```js
<Camera
  // ...
  useCamera2Api={true}
/>
```

## Conclusion

In this post, we have successfully used Expo Camera to take a picture and then upload it to a real-time service like Cloudinary. To add image saving functionality check out the [expo-media-library](https://docs.expo.io/versions/latest/sdk/media-library/).

The source code is available at this [Github repository](https://github.com/amandeepmittal/react-native-examples/tree/master/camera-upload-to-cloudinary).

---
slug: geolocation-react-native
date: 2018-09-30
title: 'Using Geolocation in React Native'
categories: ['react native']
description:  'Understand how to access Permissions and use Geolocation in your React Native project.'
published: true
author: 'Aman Mittal'
banner:
---

> React Native takes advantage of Geolocation API that is by default accessible in the web. This API returns different methods such as `getCurrentPosition`, and `watchPosition` which are available in React Native as polyfill. To demonstrate how to use it in a React Native app we will integrate it using `react-native-cli`.

## Getting Started

Using `react-native-cli` means there are no templates and only little boilerplate code to get started. We will generate a project using the following command. If you do not have it installed in your local machine, please use the first command mentioned below.

```shell
# to install the cli
npm install -g react-native-cli

# to scafold an RN project
react-native init geo-example
```

So once the project directory is generated, traverse into it and run `npm start` to see if everything is installed correctly. If you are on Mac, you can use the `ios` simulator to verify. For Windows plus other linux distro users, android emulator is your friend.

## Accessing Geolocation API

The Geolocation API exists as a global object called navigator object in React Native, just like the web. It is accessible via navigator.geolocation in our source code and there is no need to import it.

For our demonstration purposes, we will be using getCurrentPosition method from the geolocation API. This method allows a mobile app to request a user's location and accepts three parameters: success callback, error callback and a configuration object in the last.

```js
navigator.geolocation.getCurrentPosition(
  position => {
    const location = JSON.stringify(position)

    this.setState({ location })
  },
  error => Alert.alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
)
```

The callback above has a `position` argument that is an object with the following properties if executeed without any errors.

```json
{
  "timestamp": 1533729980953.91
  "coords": {
    "accuracy": 5,
    "altitude": 0,
    "altitudeAccuracy": -1,
    "heading": -1,
    "latitude": 37.785834,
    "longitude": -122.406417,
    "speed": -1
  }
}
```

We will modify `App.js` in our react-native project to get started. We start by defining a basic class component that displays the text `Find My Coords?`.

```js
import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Find My Coords?</Text>
      </View>
    )
  }
}
```

## Implmenting Geolocation API

Now, let us implement the Geolocation API function `getCurretPosition` in our app. `Open App.js` and write the following code.

```js
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native'

export default class App extends Component {
  state = {
    location: null
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position)

        this.setState({ location })
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
```

We start be importing TouchableOpcaity. It is a wrapper that responds accurately to user touches. In a react-native mobile app, you will be making use of them quite often. Think of it as a button in a web application. This newly imported wrapper accepts an onPress prop that is going to trigger the function defined as in the value, in our case `findCoordinates`.

`findCoordinates` holds the logic of fetching a user's location. We are also using the local state to display coordinates from the data provided to us by position object. The text `Find My Coords?`now becomes clickable.

You define the following styles too.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
```

However, this will not work as expected. We need to set permissions to access a user's location. Also, in real time you will have to ask for permissions. Getting hands dirty now on this will benefit you. This is our next step.

## Asking for Permissions

In `iOS`, geolocation is enabled by default when a project is created using `react-native-cli`. To use it, you just need to include a key called `<key>NSLocationWhenInUseUsageDescription</key>` in info.plist which is inside the `ios/findCoordsApp directory`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>en</string>
	<key>CFBundleDisplayName</key>
	<string>findCoordsApp</string>
	[..]
	<key>NSLocationWhenInUseUsageDescription</key>
	<string></string>
	<key>NSAppTransportSecurity</key>
	<!--See http://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/ -->
  [...]
</dict>
</plist>
```

For `android`, we need to add the following line in `android/app/src/AndroidManifest.xml file`.

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## Wrapping Up

Now if you run your application you will see the following screen.

![ss1](https://d33wubrfki0l68.cloudfront.net/322265a987e63bce9d3a6b5e9e77677d2d955738/2b3f2/images/react/geolocation-react-native/rn-geolocation-1-defualt-screen.png)

Click on the text and you will be prompted to ask whether to allow the application to request for user’s location or not.

![ss2](https://d33wubrfki0l68.cloudfront.net/ae2a364e23ac372ad95143ca72d6eff7df583b41/8ce35/images/react/geolocation-react-native/rn-geolocation-2-ask-permissions.png)

If you press allow, you will see the following result.

![ss3](https://d33wubrfki0l68.cloudfront.net/a949d3877e24bd5b71fb5c332dcc444ecb937e67/2febb/images/react/geolocation-react-native/rn-geolocation-3-result.png)

If you want to learn more about working with Geolocation API in a React Native application, please go through the [official](https://facebook.github.io/react-native/docs/geolocation) documentation.

> [Originally published at Alligator.io](https://alligator.io/react/geolocation-react-native/)

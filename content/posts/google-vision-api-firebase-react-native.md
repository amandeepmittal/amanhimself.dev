---
title: 'Create a React Native Image Recognition App with Google Vision API'
date: '2019-02-13'
slug: 'google-vision-api-firebase-react-native'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://blog.jscrambler.com/create-a-react-native-image-recognition-app-with-google-vision-api/'
---

![cover](https://i.imgur.com/UIZsVjh.jpg)

> [Originally published at Jscrambler](https://blog.jscrambler.com/create-a-react-native-image-recognition-app-with-google-vision-api/)

Google Cloud Vision API is a machine learning tool that can classify details from an image provided as an input into thousands of different categories with pre-trained API models. It offers these pre-trained models through an API and the categories are detected as individual objects within the image. In this tutorial, you are going to learn how to integrate Google Cloud Vision API in a React Native application and make use of real time APIs.

## Installing Expo

If you are not familiar with Expo, this tutorial can be a good start. Basically, Expo provides a set of tools to create and publish React Native applications with minimal effort. Earlier, React Native had something called `create-react-native-app` which is now merged with Expo-Cli and is an official way to build a React Native app. To create your React Native app, you need to install Expo as a global npm module.

```shell
npm install -g expo-cli
```

Once the command line interface for Expo is installed in your local development environment, you must run the following command in order to generate a project.

```shell
expo-cli init google-vision-rn-demo
```

It will ask you for which template to use; choose the option **blank template** rather than tabs template. We only need a single screen in our application for the demonstration purposes. In the last step, you will be prompted to write the name of the project - simply type it and hit enter. Then, it will start installing dependencies. Once the project is created, traverse into the project directory. If you need any help with this setup, refer to the [Expo documentation](https://docs.expo.io/versions/v32.0.0/workflow/configuration/).

## Setting Up Firebase

In this section, we are going to set up a new Firebase project. It will provide us the database and backend service and we do not have to write our own backend for this tutorial, hence saving time and focusing on what we need to learn. For simplicity, I am going to make the Firebase project data public for demonstration purposes.

Visit [Firebase](https://console.firebase.google.com/) and sign-in with your Google ID. Once signed-in, click on a new project and enter a name. Lastly, hit the **Create Project** button.

![ss1](https://i.imgur.com/aQYciDd.png)

The next step is to make sure we set up Firebase database rules to allow us to upload image files through the app. From the left-hand side menu in the Firebase console, open `Database` tab and then choose `Rules` and modify them as follows.

```js
service cloud.firestore {
 match /databases/{database}/documents {
   match /{document=**} {
     allow read, write;
   }
 }
}
```

We need to install the Firebase SDK in our React Native app. Run the following command from your terminal.

```shell
npm install -S firebase
```

Now, create a folder called `config` and inside it, create a new file called `environment.js`. This file will contain all keys needed to bootstrap and hook Firebase with our application.

```js
//environment.js
var environments = {
  staging: {
    FIREBASE_API_KEY: 'XXXX',
    FIREBASE_AUTH_DOMAIN: 'XXXX',
    FIREBASE_DATABASE_URL: 'XXXX',
    FIREBASE_PROJECT_ID: 'XXXX',
    FIREBASE_STORAGE_BUCKET: 'XXXX',
    FIREBASE_MESSAGING_SENDER_ID: 'XXXX',
    GOOGLE_CLOUD_VISION_API_KEY: 'XXXX'
  },
  production: {
    // Warning: This file still gets included in
    // your native binary and is not a secure way to
    // store secrets if you build for the app stores.
    // Details: https://github.com/expo/expo/issues/83
  }
};

function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return 'staging';
  } else if (releaseChannel === 'staging') {
    return 'staging';
  } else {
    return 'staging';
  }
}
function getEnvironment(env) {
  console.log('Release Channel: ', getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
```

The `X`s are values of each key you have to fill in. Ignore the value for Key `GOOGLE_CLOUD_VISION_API_KEY` right now as we will get back to it in the next section. Other values for their corresponding keys can be attained at the Firebase console. You can get these values by visiting Firebase console and then click the gear icon next to `Project Overview` in the left-hand side menu bar and lastly go to `Project settings` section. There are ways in Expo where you do not have to publish your secret keys when deploying the app or uploading the codebase on a site like Github. The initial step I would recommend is to add this file inside `.gitignore`.

Then create another file called `firebase.js` inside the `config` directory. We will be using this file in the main application to send requests to upload an image to the Firebase storage. Also note that we are importing `environment.js` in it to access Firebase keys.

```js
// firebase.js
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: Environment['FIREBASE_API_KEY'],
  authDomain: Environment['FIREBASE_AUTH_DOMAIN'],
  databaseURL: Environment['FIREBASE_DATABASE_URL'],
  projectId: Environment['FIREBASE_PROJECT_ID'],
  storageBucket: Environment['FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: Environment['FIREBASE_MESSAGING_SENDER_ID']
});

export default firebase;
```

## Getting Google Cloud Vision API Key

To use a Google Cloud Platform service, you need a Gmail account. Once you are signed-in from your Gmail ID, you can visit the [Google Cloud Console](https://console.cloud.google.com/). The next step is to create a new project.

![ss6](https://i.imgur.com/29hfyJ7.png)

Click `select a project` from the drop-down menu and then `click new project`. Enter the name of your project and then click `Create`. Once you’ve created the project, we are placed back into the main console page again and then need to select our newly created project.

The next step in this process is to get your API key. This you can get by clicking on the console and moving over to `Dashboard` section and under that choose `Enable APIs and Services`.

![ss7](https://i.imgur.com/hlCljun.png)

Then type **vision** in the search on the page as shown below.

![ss8](https://i.imgur.com/LuLN3o0g.png)

And then click `Vision API`.

![ss9](https://i.imgur.com/8folZ3J.png)

Lastly, click `Enable` like below

![ss10](https://i.imgur.com/087P0go.png)

In order to complete this process of enabling Vision API services, you are required to add billing information (if you haven't done already) to your Google Cloud Platform account.

Your URL in the dashboard will look like this: `https://console.cloud.google.com/apis/dashboard?project=FIREBASE-PROJECT-ID&folder&organizationId`. Once you are at the below screen, click on the `Credentials` section from the left-hand side menu and create a new API key if there isn't any by clicking on the button `Create Credentials` and then `API Key`.

![ss2](https://i.imgur.com/y36eTeJ.png)

Once you have created your API key, it is time to add it in the file `environment.js` for the key `GOOGLE_CLOUD_VISION_API_KEY`.

That's it. Setting up the APIs is complete. We can now move on to work on the app itself.

## Building The App

To get started, we need to install an npm package called `uuid` to create a unique blob for the image that is going to upload on the Firebase storage service. Run the command `npm install --save uuid`. Next, open `App.js` and paste the following code.

```js
import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import Environment from './config/environment';
import firebase from './config/firebase';

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            {image ? null : (
              <Text style={styles.getStartedText}>Google Cloud Vision</Text>
            )}
          </View>

          <View style={styles.helpContainer}>
            <Button
              onPress={this._pickImage}
              title="Pick an image from camera roll"
            />

            <Button onPress={this._takePhoto} title="Take a photo" />
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )}
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
          </View>
        </ScrollView>
      </View>
    );
  }

  organize = array => {
    return array.map(function (item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, googleResponse } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => this.submitToGoogle()}
          title="Analyze!"
        />

        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden'
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />

        <Text>Raw JSON:</Text>

        {googleResponse && (
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
            JSON.stringify(googleResponse.responses)}
          </Text>
        )}
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = item => {
    <Text>response: {JSON.stringify(item)}</Text>;
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: 'Check it out',
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'LANDMARK_DETECTION', maxResults: 5 },
              { type: 'FACE_DETECTION', maxResults: 5 },
              { type: 'LOGO_DETECTION', maxResults: 5 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
              { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              { type: 'CROP_HINTS', maxResults: 5 },
              { type: 'WEB_DETECTION', maxResults: 5 }
            ],
            image: {
              source: {
                imageUri: image
              }
            }
          }
        ]
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: body
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },

  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  }
});
```

Note that, most of the source code for accessing and uploading to Firebase is taken from an example of using Expo with Firebase [here](https://github.com/expo/firebase-storage-upload-example). I am going to explain below the bits that are essential to connect and run Firebase. First, let us start by understanding what `uploadImageAsync` is doing.

```js
async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}
```

As shown in the above snippet, the `uploadImageAsync` function uploads the image by creating a unique image ID or blob with the help of `uuid`. It also uses `xhr` to send a request to the Firebase storage to upload the image. We are also defining a default state in the `App` component and asking for User Permissions for both using the camera roll or gallery or take a photo from the device's camera as shown in the code snippet below.

```js
state = {
    image: null,
    uploading: false,
    googleResponse: null
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
 }
```

The `Button` in our `App component` publishes the image to Google's Cloud Vision API.

```js
<Button
  style={{ marginBottom: 10 }}
  onPress={() => this.submitToGoogle()}
  title="Analyze!"
/>
```

The `submitToGoogle` method is what sends requests and communicates with the API to fetch the result when the button `Analyze` is pressed by the user.

```js
submitToGoogle = async () => {
   try {
     this.setState({ uploading: true });
     let { image } = this.state;
     let body = JSON.stringify({
       requests: [
         {
           features: [
             { type: "LABEL_DETECTION", maxResults: 10 },
             { type: "LANDMARK_DETECTION", maxResults: 5 },
             { type: "FACE_DETECTION", maxResults: 5 },
             { type: "LOGO_DETECTION", maxResults: 5 },
             { type: "TEXT_DETECTION", maxResults: 5 },
             { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
             { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
             { type: "IMAGE_PROPERTIES", maxResults: 5 },
             { type: "CROP_HINTS", maxResults: 5 },
             { type: "WEB_DETECTION", maxResults: 5 }
           ],
           image: {
             source: {
               imageUri: image
             }
           }
         }
       ]
     });
     let response = await fetch(
       "https://vision.googleapis.com/v1/images:annotate?key=" +
         Environment["GOOGLE_CLOUD_VISION_API_KEY"],
       {
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         method: "POST",
         body: body
       }
     );
     let responseJson = await response.json();
     console.log(responseJson);
     this.setState({
       googleResponse: responseJson,
       uploading: false
     });
   } catch (error) {
     console.log(error);
   }
 };
}
```

The Vision API uses HTTP Post request as a REST API endpoint to perform data analysis on images you send in the request. This is done via the URL `https://vision.googleapis.com/v1/images:annotate`. To authenticate each request, we need the API key. The body of this POST request is in JSON format. For example:

```json
{
  "requests": [
    {
      "image": {
        "content": "/9j/7QBEUGhvdG9...image contents...eYxxxzj/Coa6Bax//Z"
      },
      "features": [
        {
          "type": "LABEL_DETECTION",
          "maxResults": 1
        }
      ]
    }
  ]
}
```

You can change the value of `maxResults` for every category. The response from the Vision API is also in JSON format.

```json
"labelAnnotations": Array [
 Object {
   "description": "water",
   "mid": "/m/0838f",
   "score": 0.97380537,
   "topicality": 0.97380537,
 },
 Object {
   "description": "waterfall",
   "mid": "/m/0j2kx",
   "score": 0.97099465,
   "topicality": 0.97099465,
 },
 Object {
   "description": "nature",
   "mid": "/m/05h0n",
   "score": 0.9594912,
   "topicality": 0.9594912,
 }
]
```

The above result can be viewed in the terminal from Expo logs. You can see how the application works with a short demo done on iOS simulator below.

![demo](https://i.imgur.com/z0i8Tpi.gif)

If you visit the storage section in Firebase, you can notice that each image is stored with a name of base64 binary string.

![ss5](https://i.imgur.com/lPrHrQUg.png)

If you have a real device, just download the Expo client, scan the QR code and then you can try the `Take a photo` feature inside the application.

## Conclusion

In this tutorial, we’ve shown you how to integrate Firebase storage services and use a machine learning API such as Google's Vision API with a React Native and Expo application.

You can find the complete code inside [this Github repo](https://github.com/amandeepmittal/google-vision-rn-demo).

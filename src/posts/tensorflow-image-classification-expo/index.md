---
title: Image Classification on React Native with TensorFlow.js and MobileNet
slug: tensorflow-image-classification-expo
image: ./images/cover.png
date: 2019-10-17
category: expo
---

Recently, the alpha version [Tensorflow.js](https://www.tensorflow.org/js/) for React Native and Expo applications was released. It currently provides the capabilities of loading pre-trained models and training. Here is the announcement tweet:

[Tweet](https://twitter.com/tensorflow/status/1169309153715732480?lang=en)

TensorFlow.js provides many [pre-trained models](https://github.com/tensorflow/tfjs-models) that simplify the time-consuming task of training a machine learning model from scratch. In this tutorial, we are going to explore [Tensorflow.js](https://www.tensorflow.org/js/) and the MobileNet pre-trained model to classify image based on the input image provided in a React Native mobile application.

By the end of this tutorial, the app will look like the following:

![ss7](https://miro.medium.com/max/300/1*WAqYzWkHEiXMbFKrelpR7A.png)

Here is the link to the complete code in a [Github repo](https://github.com/amandeepmittal/mobilenet-tfjs-expo) for your reference.

## Requirements

- Nodejs >= 10.x.x install on your local dev environment
- `expo-cli`
- Expo Client app for Android or iOS, used for testing the app

## Integrating TFJS in an Expo app

To start and use the Tensorflow library in a React Native application, the initial step is to integrate the platform adapter. The module `tfjs-react-native` is the platform adapter that supports loading all major tfjs models from the web. It also provides GPU support using `expo-gl`.

Open the terminal window, and create a new Expo app by executing the command below.

```shell
expo init mobilenet-tfjs-expo
```

Next, make sure to generate Expo managed app. Then navigate inside the app directory and install the following dependencies.

```shell
yarn add @react-native-community/async-storage
@tensorflow/tfjs @tensorflow/tfjs-react-native
expo-gl @tensorflow-models/mobilenet jpeg-js
```

> _Note:_ If you are looking forward to using `react-native-cli` to generate an app, you can follow the clear instructions to modify `metro.config.js` file and other necessary steps, mentioned [here](https://github.com/tensorflow/tfjs/tree/master/tfjs-react-native).

Even though you are using Expo, it is necessary to install [async-storage](https://github.com/react-native-community/async-storage) as tfjs module depends on that.

## Testing TFJS that it is working

Before we move on, let us test out that the tfjs is getting loaded into the app before the app is rendered. There is an asynchronous function to do so, called `tf.ready()`. Open `App.js` file, import the necessary dependencies, and define an initial state `isTfReady` with a boolean false.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';

class App extends React.Component {
  state = {
    isTfReady: false
  };

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true
    });

    //Output in Expo console
    console.log(this.state.isTfReady);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TFJS ready? {this.state.isTfReady ? <Text>Yes</Text> : ''}</Text>
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

export default App;
```

Since the lifecycle method is asynchronous, it will only update the value of `isTfReady` to true when tfjs is actually loaded.

You can see the output in the simulator device as shown below.

![ss1](https://miro.medium.com/max/300/1*Qc2DyJWJztezFuQ8JltDlw.png)

Or in the console, if using the `console` statement as the above snippet.

![ss2](https://miro.medium.com/max/319/1*0rmnFTDv6wAHCBdggIk8TA.png)

## Loading Tensorflow model

Similar to the previous section, you can load the model being used in this app (_mobilenet_) is integrating or not. Loading a tfjs pre-trained model from the web is an expensive network call and will take a good amount of time. Modify the `App.js` file to load the MobileNet model. Start by importing the model.

```js
import * as mobilenet from '@tensorflow-models/mobilenet';
```

Next, add another property to the initial state.

```js
state = {
  isTfReady: false,
  isModelReady: false
};
```

Then, modify the lifecycle method.

```js
async componentDidMount() {
    await tf.ready()
    this.setState({
      isTfReady: true
    })
    this.model = await mobilenet.load()
    this.setState({ isModelReady: true })
}
```

Lastly, the display on the screen when the loading of the model is complete.

```js
<Text>
  Model ready?{' '}
  {this.state.isModelReady ? <Text>Yes</Text> : <Text>Loading Model...</Text>}
</Text>
```

When the model is being loaded, it will display the following message.

![ss3](https://miro.medium.com/max/300/1*DIZZk1CMDLwnmq7XUq9TOA.png)

When the loading of the MobileNet model is complete, you will get the following output.

![ss4](https://miro.medium.com/max/300/1*hS5fFnGr4R_5Zuj9nHvtCg.png)

## Asking user permissions

Now that both the platform adapter and the model are currently integrated with the React Native app, add an asynchronous function to ask for the user's permission to allow access to the camera roll. This is a mandatory step when building iOS applications using the image picker component from Expo.

Before, you proceed, run the following command to install all the packages provided by Expo SDK.

```shell
expo install expo-permissions expo-constants expo-image-picker
```

Next, add the following import statements in the `App.js` file.

```js
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
```

In the `App` class component, add the following method.

```js
getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};
```

Lastly, call this asynchronous method inside `componentDidMount()`.

```js
async componentDidMount() {
    await tf.ready()
    this.setState({
      isTfReady: true
    })
    this.model = await mobilenet.load()
    this.setState({ isModelReady: true })

    // add this
    this.getPermissionAsync()
  }
```

## Convert a raw image into a Tensor

The application will require the user to upload an image from their phone's camera roll or gallery. You have to add a handler method that is going to load the image and allow the Tensorflow to decode the data from the image. Tensorflow supports JPEG and PNG formats.

In the `App.js` file, start by importing [`jpeg-js` package](https://www.npmjs.com/package/jpeg-js) that will be used to decode the data from the image.

```js
import * as jpeg from 'jpeg-js';
```

It decodes the width, height and the binary data from the image inside the handler method `imageToTensor` that accepts a parameter of the raw image data.

```js
imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0 // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset]
      buffer[i + 1] = data[offset + 1]
      buffer[i + 2] = data[offset + 2]

      offset += 4
    }

    return tf.tensor3d(buffer, [height, width, 3])
  }
```

The `TO_UINT8ARRAY` array represents an array of 8-bit unsigned integers. the constructor method `Uint8Array()` is the [new ES2017 syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). There are different types of typed arrays, each having its own byte range in the memory.

## Load and Classify the image

Next, we add another handler method `classifyImage` that will read the raw data from an image and yield results upon classification in the form of `predictions`.

The image is going to be read from a source and the path to that image source has to be saved in the `state` of the app component. Similarly, the results yield by this asynchronous method have to be saved too. Modify the existing state in the `App.js` file for the final time.

```js
state = {
  isTfReady: false,
  isModelReady: false,
  predictions: null,
  image: null
};
```

Next, add the asynchronous method.

```js
classifyImage = async () => {
  try {
    const imageAssetPath = Image.resolveAssetSource(this.state.image);
    const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    const rawImageData = await response.arrayBuffer();
    const imageTensor = this.imageToTensor(rawImageData);
    const predictions = await this.model.classify(imageTensor);
    this.setState({ predictions });
    console.log(predictions);
  } catch (error) {
    console.log(error);
  }
};
```

The results from the pre-trained model are yield in an array. An example is shown below.

![ss5](https://miro.medium.com/max/376/1*MIDSYfqejEkwyLO6SKkY9Q.png)

## Allow user to pick the image

To select an image from the device's camera roll using the system's UI, you are going to use the asynchronous method `ImagePicker.launchImageLibraryAsync` provided the package `expo-image-picker`. Import the package itself.

```js
import * as Permissions from 'expo-permissions';
```

Next, add a handler method `selectImage` that will be responsible for

- let the image to be selected by the user
- if the image selection process is not canceled, populate the source URI object in the `state.image`
- lastly, invoke `classifyImage()` method to make predictions from the given input

```js
selectImage = async () => {
  try {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!response.cancelled) {
      const source = { uri: response.uri };
      this.setState({ image: source });
      this.classifyImage();
    }
  } catch (error) {
    console.log(error);
  }
};
```

The package `expo-image-picker` returns an object. In case the user cancels the process of picking an image, the image picker module will return a single property: `canceled: true`. f successful, the image picker module returns properties such as the `uri` of the image itself. That’s why the `if` statement in the above snippet holds so much significance.

## Run the app

To complete this demonstration app, you need to add a touchable opacity where the user will click to add the image.

Here is the complete snippet of the `render` method in the `App.js` file.

```js
render() {
    const { isTfReady, isModelReady, predictions, image } = this.state

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.loadingContainer}>
          <Text style={styles.commonTextStyles}>
            TFJS ready? {isTfReady ? <Text>✅</Text> : ''}
          </Text>

          <View style={styles.loadingModelContainer}>
            <Text style={styles.text}>Model ready? </Text>
            {isModelReady ? (
              <Text style={styles.text}>✅</Text>
            ) : (
              <ActivityIndicator size='small' />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={isModelReady ? this.selectImage : undefined}>
          {image && <Image source={image} style={styles.imageContainer} />}

          {isModelReady && !image && (
            <Text style={styles.transparentText}>Tap to choose image</Text>
          )}
        </TouchableOpacity>
        <View style={styles.predictionWrapper}>
          {isModelReady && image && (
            <Text style={styles.text}>
              Predictions: {predictions ? '' : 'Predicting...'}
            </Text>
          )}
          {isModelReady &&
            predictions &&
            predictions.map(p => this.renderPrediction(p))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.poweredBy}>Powered by:</Text>
          <Image source={require('./assets/tfjs.jpg')} style={styles.tfLogo} />
        </View>
      </View>
    )
  }
}
```

Here is the list of the complete `styles` object.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171f24',
    alignItems: 'center'
  },
  loadingContainer: {
    marginTop: 80,
    justifyContent: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  },
  loadingModelContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    borderColor: '#cf667f',
    borderWidth: 5,
    borderStyle: 'dashed',
    marginTop: 40,
    marginBottom: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  transparentText: {
    color: '#ffffff',
    opacity: 0.7
  },
  footer: {
    marginTop: 40
  },
  poweredBy: {
    fontSize: 20,
    color: '#e69e34',
    marginBottom: 6
  },
  tfLogo: {
    width: 125,
    height: 70
  }
});
```

Run the application by executing the `expo start` command from a terminal window. The first thing you’ll notice is that upon bootstrapping the app in the Expo client, it will ask for permissions.

![ss6](https://miro.medium.com/max/300/1*yI8SE6c25GMpfSoqgethYg.png)

Then, once the model is ready, it will display the text **"Tap to choose image"** inside the box. Select an image to see the results.

![ss8](https://miro.medium.com/max/358/1*qxXtE5tU7yuuFKVKjQbIFg.gif)

Predicting results can take some time. Here are the results of the previously selected image.

![ss9](https://miro.medium.com/max/300/1*7yGIbTerLleJeSDUN5LW2A.png)

## Conclusion

I hope this post serves the purpose of giving you a head start in understanding how to implement a TesnorFlow.js model in a React Native app, as well as a better understanding of image classification, a core use case in computer vision-based machine learning.

Since the TF.js for React Native is in alpha at the time of writing this post, we can hope to see many more advanced examples in the future to build real-time applications.
Here are some resources that I find extremely useful.

Here are some resources that I find extremely useful.

- [tfjs-react-native](https://github.com/tensorflow/tfjs/tree/master/tfjs-react-native) Github repo contain more examples using different pre-trained models
- Infinite Red's [NSFW JS and React Native example](https://shift.infinite.red/nsfw-js-for-react-native-a37c9ba45fe9)
- [Introduction to Tensorflow.js](https://medium.com/tensorflow/introducing-tensorflow-js-machine-learning-in-javascript-bf3eab376db)

You can find the complete code at this [Github repo](https://github.com/amandeepmittal/mobilenet-tfjs-expo).

---

Originally published at [Heartbeat.Fritz.ai](https://heartbeat.fritz.ai/image-classification-on-react-native-with-tensorflow-js-and-mobilenet-48a39185717c)

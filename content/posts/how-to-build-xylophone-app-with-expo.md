---
title: 'How to build a xylophone app with Audio API, React Native, and Expo'
date: '2019-07-22'
slug: 'how-to-use-emotion-js-with-react-native'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/how-to-build-a-xylophone-app-with-audio-api-react-native-and-expo-7d6754a0603c'
---

React Native when used with Expo as a toolchain eases out the common pain to manage ios and android applications. After saying that, I realized that there is a delight to use this ever-growing open source mobile application framework. Expo has gained a lot of credibility as a framework to provide collective solutions to build React Native applications by lowering the time and effort of the developer using it. They are continuing to enhance it from time to time and keeping up with the latest changes in React Native community. That said, Expo SDK33 is a blast.

That being said, let us dive into one of the Expo's API. In this tutorial, you are going to build an application using Expo's Audio API. You are going to develop the following app (_a toy xylophone app_) step-by-step.

<img src='https://miro.medium.com/max/350/1*YE5sb3gX_ValSM48QGT1eQ.png' />

**Table of Contents**

## Requirements

To follow this tutorial, please make sure you have the following installed on your local development environment and have access to the services mentioned below:

- [Nodejs](https://nodejs.org/en/) (>=`8.x.x`) with npm/yarn installed.
- [`expo-cli`](https://docs.expo.io/versions/latest/workflow/expo-cli/) (>= `2.19.4)`, previously known as create-react-native-app.
- [`watchman`](https://facebook.github.io/watchman/) is the file change watcher for React Native projects.

## Getting Started

To create a new Expo project, the only requirement is to have `expo-cli` installed. Then, execute the following command to create a new project directory.

```shell
expo init rn-xylophone-app

# navigate inside the app folder
cd rn-xylophone-app

# install the following dependency
yarn add expo-av
```

Once the project directory is generated, navigate inside it as shown in the above command. Then install the required dependency to add the functionality of playing an Audio file inside the React Native app. The dependency `expo-av` will help you use Audio API and its promise based asynchronous methods to play the audio files. You are going to implement this functionality later.

The last step needed is to have some sound files saved in your `assets` folder. You can, of course, use your audio files but if you want to use the same audio files used in this tutorial, you can download them at the link given below.

[add assets folder download link]

You might have got the idea of what the user interface is going to look while having a glimpse at the demo in the previous section. For each button, you are going to need a different color. Hence, create a new file called `contants/Colors.js` and add the following code.

```js
export const NoteOne = 'red';
export const NoteTwo = 'orange';
export const NoteThree = 'yellow';
export const NoteFour = 'green';
export const NoteFive = '#00FFFF    ';
export const NoteSix = '#000080';
export const NoteSeven = '#B266FF';
```

Require this file and all the Color codes inside `App.js` file after other imports.

```js
// ...after other imports

import {
  NoteOne,
  NoteTwo,
  NoteThree,
  NoteFour,
  NoteFive,
  NoteSix,
  NoteSeven
} from './constants/Colors';
```

The color names are specified to mark each audio file which is named and numbered similarly. To import all the sounds file needed to build the application from the `assets` folder. Add the below object before the `App` component as shown.

```js
const xyloSounds = {
  one: require('./assets/note1.wav'),
  two: require('./assets/note2.wav'),
  three: require('./assets/note3.wav'),
  four: require('./assets/note4.wav'),
  five: require('./assets/note5.wav'),
  six: require('./assets/note6.wav'),
  seven: require('./assets/note7.wav')
};
```

The above object `xyloSounds` consist of the path to each sound file. This will be helpful when you are writing business logic to play these audio files and have to detect which audio file to play for the specific note.

## Building the first UI button

In this section, you are going to create a button using `TouchableOpacity` that is going to play the sound for the note when pressed. To start, make sure in the file `App.js` you have imported the following APIs from the react-native core.

```js
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
```

Then, you have to modify the contents of the `render` function from the default, boilerplate text that any Expo application comes with. This is going to be done by creating a `View` container for each button, which will have a fixed height and margin of value `5` to add some spacing between the buttons.

```js
<View style={styles.container}>
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: NoteOne }]}
      onPress={() => this.handlePlaySound('one')}
    >
      <Text style={styles.buttonText}>Note 1</Text>
    </TouchableOpacity>
  </View>
</View>
```

Notice that each button will have its background color specified in the file `constants/Colors.js`. This is done by inline styling method. To combine multiple styles in React Native, you can use an array notation like above. The button has one `onPress` method that is going to be responsible for playing the correct sound associated with the note. You will be creating the method `handlePlaySound` in the next section. However, do note that the value `one` being passed to this method is coming from the path you specified earlier for each audio file. Lastly, the button is going to have a text to display the correct audio file number.

The above snippet is followed by the styles that are created using `StyleSheet.create()` method.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  buttonContainer: {
    height: 40,
    margin: 5
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
```

To see the current state of the application in action, go back to the terminal window and run the command `yarn start` or `expo start` if you do not have yarn installed. In the simulator screen, you are going to be welcomed, as shown in the below image.

<img src='https://miro.medium.com/max/350/1*jzwOoqsEJkTUSMMEKCwOPg.png' />

## Adding the Audio functionality

To play a sound in an Expo application, you are required to first the API for the `Audio` from `expo-av`. So at the top of the `App.js` file and after other imports, you can add the following line.

```js
import { Audio } from 'expo-av';
```

Next, you have to add the method `handlePlaySound` inside the `App` function and before the `render()` method. Inside this function, create a new sound object. Whenever you are required to play sound using `expo-av` library, you have to create a new object. This object is going to represent the instance of the class `Audio.sound`.

```js
handlePlaySound = async note => {
  const soundObject = new Audio.Sound();

  try {
    let source = require('./assets/note1.wav');
    await soundObject.loadAsync(source);
    await soundObject
      .playAsync()
      .then(async playbackStatus => {
        setTimeout(() => {
          soundObject.unloadAsync();
        }, playbackStatus.playableDurationMillis);
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
```

In the above snippet, you can notice that the method `handlePlaySound` is going to accept one parameter. This parameter is going to be the note's number, hence the name of the parameter being passed in the above snippet is called `note`. Inside that, the first line creates the instance of the class `Audio.Sound()`.

Since JavaScript syntax of `async/await` is being used, it is better to create a `try/catch` block such that this Expo app does not give us any error when running the application. Inside this block, the first method `loadAsync` is used to create and load the sound from the source. Hence, the variable `source` defined explicitly is passed and contains the path of the first audio file from the `assets` folder.

To play the sound, `playAsync()` method is used. This method is, however, further extends using a promise that takes one object called `playbackStatus` object. This object uses `playableDurationMillis` to identify the position until the audio file should run from the memory. Once the audio file is played, the `soundObject` calls the method `unloadAsync()` which unloads the media file from memory. This allows the media file to be played again and again. The `setTimeout` function's value depends on the duration of the media file being played from memory.

Go back to the simulator or the device the current app is running and try to press the first button. You will hear the sound of the first note.

## Finishing the App

To complete building the application, you have to read the path of each file from the object `xyloSounds.` Edit the the value of `source` inside the method `handlePlaySound()`.
Also, add the button for each note and do not forget to pass the correct source value inside the `onPress()` method. For your reference, here is the complete code of the file `App.js`.

```js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import {
  NoteOne,
  NoteTwo,
  NoteThree,
  NoteFour,
  NoteFive,
  NoteSix,
  NoteSeven
} from './constants/Colors';

const xyloSounds = {
  one: require('./assets/note1.wav'),
  two: require('./assets/note2.wav'),
  three: require('./assets/note3.wav'),
  four: require('./assets/note4.wav'),
  five: require('./assets/note5.wav'),
  six: require('./assets/note6.wav'),
  seven: require('./assets/note7.wav')
};

export default function App() {
  handlePlaySound = async note => {
    const soundObject = new Audio.Sound();

    try {
      let source = xyloSounds[note];
      // let source = require('./assets/note1.wav')
      await soundObject.loadAsync(source);
      await soundObject
        .playAsync()
        .then(async playbackStatus => {
          setTimeout(() => {
            soundObject.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteOne }]}
          onPress={() => this.handlePlaySound('one')}
        >
          <Text style={styles.buttonText}>Note 1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteTwo }]}
          onPress={() => this.handlePlaySound('two')}
        >
          <Text style={styles.buttonText}>Note 2</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteThree }]}
          onPress={() => this.handlePlaySound('three')}
        >
          <Text style={styles.buttonText}>Note 3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteFour }]}
          onPress={() => this.handlePlaySound('four')}
        >
          <Text style={styles.buttonText}>Note 4</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteFive }]}
          onPress={() => this.handlePlaySound('five')}
        >
          <Text style={styles.buttonText}>Note 5</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteSix }]}
          onPress={() => this.handlePlaySound('six')}
        >
          <Text style={styles.buttonText}>Note 6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteSeven }]}
          onPress={() => this.handlePlaySound('seven')}
        >
          <Text style={styles.buttonText}>Note 7</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  buttonContainer: {
    height: 40,
    margin: 5
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
```

Now run the application in the simulator, and you will get the following screen.

<img src='https://miro.medium.com/max/350/1*YE5sb3gX_ValSM48QGT1eQ.png' />

## Conlusion

You have reached the end of this tutorial. I hope you have learned how to integrate the `expo-av` library to use `Audio` class to create functionality in your cross-platform applications and play audio media files. Important things to notice in this demo application is how to use available methods like `loadAsync()`, `unloadAsync()` and leverage the duration of the playing media using the object `playplaybackStatus`.

[Originally published at Heartbeat](https://heartbeat.fritz.ai/how-to-build-a-xylophone-app-with-audio-api-react-native-and-expo-7d6754a0603c)

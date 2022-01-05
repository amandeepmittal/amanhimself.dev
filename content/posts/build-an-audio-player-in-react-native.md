---
title: 'How to Build an Audio Player in React Native'
date: '2019-08-28'
slug: 'build-an-audio-player-in-react-native'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://blog.jscrambler.com/how-to-build-an-audio-player-in-react-native/'
---

![cover_image](https://i.imgur.com/XFvTGys.jpg)

Learning React Native development revolves around some common interface patterns that you should practice. One common UI built-in mobile application is an audio player.

In this tutorial, you are going to build a functioning interface for an audio player with common functionalities like

- Load the audio file;
- Play/pause the audio file;
- Navigate to next track;
- Navigate to the previous track.

Apart from building the user interface, you are also going to learn a lot about using the `expo-av` module. This module provides an API for any Expo application to consume for media playback. Also, this module contains APIs both for audio and video media, but here we are only going to look at the audio portion.

You will find the complete code for this tutorial at [this GitHub repository](https://github.com/amandeepmittal/music-player-expo).

## What Are We Building?

The end result of this React Native tutorial is to have an audio player that can play tracks from remote audio files. For the demonstration, the app is going to use audio files related to a play written by William Shakespeare from **[Librivox](https://librivox.org/hamlet-by-william-shakespeare/)**. All these audio files are available under the public domain, so you do not have to worry about copyright issues.

![](https://i.imgur.com/euXYG6Z.png)

## Requirements

To follow this tutorial, please make sure you have the following installed on your local development environment and have access to the services mentioned below:

- [Nodejs](https://nodejs.org) (>=`10.x.x`) with npm/yarn installed.
- [expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli/) (>= `3.x.x`), previously known as `create-react-native-app`.
- Mac users must be running an iOS simulator.
- Windows/Linux users must be running an Android emulator.

To know more about how to setup and run the simulator or the emulator on your local development environment visit React Native’s [official documentation here](https://facebook.github.io/react-native/docs/getting-started).

## Getting Started

To start, you first have to initialize a new React Native project using the `expo-cli` tool. The only requirement right now is to have `expo-cli` installed. Then, create a new project directory, navigate to it, and install the required dependency to add the functionality of playing an audio file inside the React Native app.

```shell
expo init music-player-expo

# navigate inside the app folder
cd music-player-expo

# install the following dependency
npm install expo-av
```

The dependency `expo-av` will help you use the Audio API and its promise-based asynchronous methods to play the audio files within the React Native app. The source of these audio files can be local or remote.

Once you have generated the app and installed the dependency, execute the command below to open the boilerplate application that comes with `expo-cli`.

```shell
expo start
```

The following screen will welcome you:

![ss1](https://i.imgur.com/dxJdAeg.png)

Since the app will be consuming a bunch of audio files from a remote resource, it is better if you create an array that will contain details related to each of the audio files and their resource in the form of a URI. Open `App.js` and add the following array before the `App` component.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const audioBookPlaylist = [
  {
    title: 'Hamlet - Act I',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia800204.us.archive.org/11/items/
      hamlet_0911_librivox/hamlet_act1_shakespeare.
      mp3',
    imageSource:
      'http://www.archive.org/download/
      LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act II',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia600204.us.archive.org/11/items/
      hamlet_0911_librivox/hamlet_act2_shakespeare.
      mp3',
    imageSource:
      'http://www.archive.org/download/
      LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act III',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'http://www.archive.org/download/
      hamlet_0911_librivox/hamlet_act3_shakespeare.
      mp3',
    imageSource:
      'http://www.archive.org/download/
      LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act IV',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act V',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  }
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```

In the above snippet, `imageSource` is going to provide an album or an audiobook cover.

## Define an initial state in the App Component

In this section, you are going to convert the functional `App` component that comes with the default Expo app into a class component. This conversion will be useful to define an initial state that will hold an object with properties like:

- `isPlaying` to check whether the audio player is playing the audio file or not. This is going to be a boolean value.
- `playbackInstance` to hold the instance of the current track being played.
- `volume` the current volume of the audio for this media.
- `currentIndex` to gather the index of which track is currently being played. This helps in navigating and playing the next and the previous track from the `audioBookPlaylist` array.
- `isBuffering` holds a boolean value to check whether the current media is being buffered.

The initial state of the `App` component is going to look like the below snippet. Open `App.js` to add the state.

```js
export default class App extends React.Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
```

## Building the UI: Audio Player Controls

In this section, let us build the UI components of how the basic audio player is going to look like. To start, please make sure that you are importing React Native elements like `TouchableOpacity` and `Image` from the core. Also, to add icons, let us import `Ionicons` from the library [`@expo/vector-icons`](https://github.com/expo/vector-icons).

This package comes with the Expo app, so you do not have to undergo the process of installing it as a separate module. This demo is going to use `Ionicons` from this package but feel free to use [another icon library](https://expo.github.io/vector-icons/).

```js
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-ico
```

The next step is to modify the render function inside `App.js`. Inside the container view, you are going to add an image that will display the cover of the audio book from the resource. Beneath this cover image, there will be three buttons that will let you control the audio files within the app.

```js
<View style={styles.container}>
  <Image
    style={styles.albumCover}
    source={{
      uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
    }}
  />
  <View style={styles.controls}>
    <TouchableOpacity style={styles.control} onPress={() => alert('')}>
      <Ionicons name="ios-skip-backward" size={48} color="#444" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.control} onPress={() => alert('')}>
      {this.state.isPlaying ? (
        <Ionicons name="ios-pause" size={48} color="#444" />
      ) : (
        <Ionicons name="ios-play-circle" size={48} color="#444" />
      )}
    </TouchableOpacity>
    <TouchableOpacity style={styles.control} onPress={() => alert('')}>
      <Ionicons name="ios-skip-forward" size={48} color="#444" />
    </TouchableOpacity>
  </View>
</View>
```

The conditional rendering implied on the second button states that whenever the boolean value of `isPlaying` is changed to true, the UI will display a pause button instead of a play button. Each button is accumulating an icon.

All of these buttons are going to be inside another view with a specific styling. You will notice the same thing in the above snippet. Outside the class component, using a `StyleSheet` object, let us add the styling.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  albumCover: {
    width: 250,
    height: 250
  },
  controls: {
    flexDirection: 'row'
  },
  control: {
    margin: 20
  }
});
```

To provide styles to your React Native components, there are no classes or IDs in React Native like in web development. To create a new style object, you use the `StyleSheet.create()` method. When creating a new style object every time the component renders, `StyleSheet` creates style objects with IDs that are further used to reference instead of rendering the whole component again and again.

Execute the command `expo start` from a terminal window, if you haven't already, and you will get the following result.

![](https://i.imgur.com/V15bamY.png)

## Exploring the Audio API

To play a sound in an Expo application, you’re required to use and import the API for the Audio class from `expo-av`. So at the top of the `App.js` file and after other imports, you can add the following line.

```js
import { Audio } from 'expo-av';
```

To customize the audio experience inside an iOS or an Android app, Expo provides an asynchronous method called `setAudioModeAsync()`. This method takes an options object as its only parameter. This object contains a list of key-value pairs that are required to enable and use the audio component.

Inside the `App` component, you are going to add a lifecycle method `componentDidMount()`. This method should be defined after the initial state. It will help you configure the `Audio` component from the `expo-av` module.

```js
async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      this.loadAudio()
    } catch (e) {
      console.log(e)
    }
  }
```

Let us take all the options that are being passed in the `setAudioModeAsync` method. These options will define how the audio player is going to behave.

The `allowsRecordingIOS` is a boolean which, when enabled, will allow recording in iOS devices. The `playsInSilentModeIOS` indicates whether the audiobook app should play while the device is in silent mode.

The `interruptionModeIOS` & `interruptionModeAndroid` is how the audio of the app will behave with the audio of other apps. For example, what if you receive a call while listening to the audio player? How will the audio from the audiobook app behave? The value of these two options sets that. Currently, the option for the iOS device is set to be interrupted by the audio of other apps, hence `INTERRUPTION_MODE_IOS_DO_NOT_MIX`.

However, in the case of Android, the value `INTERRUPTION_MODE_ANDROID_DUCK_OTHERS` indicates that the volume of the audio from other apps will be lowered while the audiobook app is running. This term, `Duck` is known as lowering the volume. To set this option for Android, you have to set the value of `shouldDuckAndroid` to true.

Lastly, the lifecycle method is going to trigger the `loadAudio` function, which you are going to see in action in the next section.

## Loading the Audio File

After the lifecycle method `componentDidMount()` inside the `App.js` file, you are going to enter another asynchronous function called `loadAudio()`. This function will handle the loading of the audio file for the app's player.

```js
async loadAudio() {
  const {currentIndex, isPlaying, volume} = this.state

  try {
    const playbackInstance = new Audio.Sound()
    const source = {
      uri: audioBookPlaylist[currentIndex].uri
    }

    const status = {
      shouldPlay: isPlaying,
      volume
    }

    playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
    await playbackInstance.loadAsync(source, status, false)
    this.setState({playbackInstance})
    } catch (e) {
      console.log(e)
    }
}

onPlaybackStatusUpdate = status => {
  this.setState({
    isBuffering: status.isBuffering
  })
}
```

The `new Audio.Sound()` allows you to create an instance that will take the source of the audio file (_which can be either from a local asset file or a remote API URI like in the current scenario_). From the state property `currentIndex` the Audio instance created will find the index value in the array of `audioBookPlaylist` to read the source URI and play the audio file.

On the instance of Audio, a method called `setOnPlaybackStatusUpdate` is used. This method has a handler function being passed, which is known as `onPlaybackStatusUpdate`. This handler function is responsible for updating the UI whether the media is being currently buffered or being played. To track the state of buffering, `isBuffering` is used from the initial state property. Whenever the state of the Audio instance changes, this gets an update.

Lastly, the `loadAsync` function is called on the Audio instance, which takes in three parameters. This first parameter is the source of the audio file. The second parameter indicates the status of the object. This `status` object further uses the properties of `shouldPlay` and `volume`. The value of the property `shouldPlay` is indicated by `isPlaying` from the initial state object. The last boolean value passed in `loadAsync` indicates whether the audio player app should download the audio file before playing. In the current scenario, there is no requirement for that. Thus, it has been set to `false`.

## Control Handlers

After the previous section, let us add three new methods which are going to control the state of the audio instance being played or paused. Also, changing to the next track or the previous track is going to be represented by different handler functions. Further, these handler functions are going to be used on `onPress` props of each button created in the UI section.

```js
handlePlayPause = async () => {
  const { isPlaying, playbackInstance } = this.state;
  isPlaying
    ? await playbackInstance.pauseAsync()
    : await playbackInstance.playAsync();

  this.setState({
    isPlaying: !isPlaying
  });
};

handlePreviousTrack = async () => {
  let { playbackInstance, currentIndex } = this.state;
  if (playbackInstance) {
    await playbackInstance.unloadAsync();
    currentIndex < audioBookPlaylist.length - 1
      ? (currentIndex -= 1)
      : (currentIndex = 0);
    this.setState({
      currentIndex
    });
    this.loadAudio();
  }
};

handleNextTrack = async () => {
  let { playbackInstance, currentIndex } = this.state;
  if (playbackInstance) {
    await playbackInstance.unloadAsync();
    currentIndex < audioBookPlaylist.length - 1
      ? (currentIndex += 1)
      : (currentIndex = 0);
    this.setState({
      currentIndex
    });
    this.loadAudio();
  }
};
```

The `handlePlayPause` checks the value of `isPlaying` to decide whether to play an audio file from the resource it is currently loaded or not. This decision is made using a conditional operator, and then the state is updated accordingly. The `playBackInstance` is holding the same value from the previous section when an audio file is loaded.

The next handler function `handlePreviousTrack` is used to skip back to the previous audio track in the playlist. It first clears the current track being played using `unloadAsync` from the Audio API, using the property value of `currentIndex` from the state. Similarly, the handler function `handleNextTrack` clears the current track and then using the `currentIndex` navigates to the next track.

## Completing the Player UI

The last piece of the puzzle in this audio player app is to display the information of the audio file which is being played. This information is already provided in the mock API array `audioBookPlaylist`. Create a new function called `renderFileInfo` before the `render` function with the following JSX to display. Also, update the `StyleSheet` object.

```js
renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {audioBookPlaylist[currentIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].author}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].source}
        </Text>
      </View>
    ) : null
  }

// update the Stylesheet object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  albumCover: {
    width: 250,
    height: 250
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#fff'
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  }
})

```

Next, use this function inside the `render` method of the `App` component below the view that holds all the control buttons. Also, update the control buttons to use appropriate handler functions from the previous section. Here is the complete code of the `render` function.

```js
render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.albumCover}
          source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
        />
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
            <Ionicons name='ios-skip-backward' size={48} color='#444' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
            {this.state.isPlaying ? (
              <Ionicons name='ios-pause' size={48} color='#444' />
            ) : (
              <Ionicons name='ios-play-circle' size={48} color='#444' />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
            <Ionicons name='ios-skip-forward' size={48} color='#444' />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>
    )
  }
```

Now, run the application, and you will get the following result.

![](https://i.imgur.com/sF49I90.gif)

## Conclusion

You have reached the end of this tutorial. We hope you enjoyed it and learned how to integrate the `expo-av` library to use an Audio class to create functionality in your cross-platform applications and build an audio player. An important thing to retain from this demo application is how to use available methods like `loadAsync()`, and `unloadAsync()`.

The resources used in order to create this tutorial can be found below:

- [Expo Audio API](https://docs.expo.io/versions/latest/sdk/audio/) documentation
- [expo-av](https://docs.expo.io/versions/latest/sdk/av/) documentation
- [Librivox audio files in public domain](https://librivox.org/hamlet-by-william-shakespeare/), a big thank you!

[Originally published at Jscrambler](https://blog.jscrambler.com/how-to-build-an-audio-player-in-react-native/)

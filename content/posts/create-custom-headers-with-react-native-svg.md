---
title: 'How to create custom wavy headers with react-native-svg'
slug: 'create-custom-headers-with-react-native-svg'
date: '2020-05-26'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/creating-custom-wavy-headers-using-react-native-svg-639ce0861327'
---

> [Originally Published at Heartbeat.Fritz.ai](https://heartbeat.fritz.ai/creating-custom-wavy-headers-using-react-native-svg-639ce0861327)

In React Native apps, the support for SVG graphics is provided by an open-source module called [`react-native-svg`](https://github.com/react-native-community/react-native-svg) that is maintained by React Native community.

Using SVG can enhance an app’s design when it comes to displaying different patterns. It can make a difference in how the look and feel of the app might appear to the end-user, as well how it is easy to edit the pattern built using SVG. SVG is mainly found on the web, and while they have similar uses to JPEG, PNG, and WebP image types, SVG is not resolution-dependent. Hence, the definition according to [Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics):

<blockquote>
  Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based
  vector image format for two-dimensional graphics with support for
  interactivity and animation.
</blockquote>

This format consists of shapes rather than pixels which can further be concluded that an SVG graphic can be scaled indefinitely in terms of resolution.

In this post, let us learn how to use `react-native-svg` in React Native and Expo apps and create some custom examples such as wavy header shown below.

<img src='https://miro.medium.com/max/598/1*aivsFUf_OF6mYBSfOCGrTQ.gif' />

## Requirements

Ensure your dev environment includes the following required packages:

- [Node.js](https://nodejs.org/) above `12.x.x` installed on your local machine
- JavaScript/ES6 basics
- [`expo-cli`](https://expo.io/tools)

## Installing react-native-svg library

Start by creating a new project using expo-cli. Navigate inside the project directory when the CLI has finished generating the new project. Then install all the required dependencies to integrate the `react-native-svg` library.

```shell
expo init [PROJECT NAME]

cd [PROJECT NAME]

expo install react-native-svg
```

The reason to use `expo install` command when building a React Native app using Expo SDK instead of package managers like `npm` or `yarn` is that it is going to install the most compatible version of the package available to be used with Expo SDK. This avoids unnecessary errors.

That's it for installing this library. The `react-native-svg` library contains common shapes and elements such as `Svg`, `Rect`, `Circle`, `Line`, `Polygon`, `Path`, and so on as components to be used. You are going to see `Svg` and `Path` in action, in this post.

## Create a header component

In the next few sections, let us try to create a custom header background that has a bottom border with the form of a wave as shown below.

<img src='https://miro.medium.com/max/700/1*mf6AmpW-7j4nS1nixMDiVQ.png' />

Start by creating a new screen component inside `src/screens/ScreenOne.js` file that displays a heading on the screen. (_Create the directory if it doesn't exist._)

Add the following code snippet to this file.

```js
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

export default function ScreenOne() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Custom Header</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 35
  }
});
```

Next, go to `App.js` file and modify it to render the `ScreenOne` functional component as below.

```js
import React from 'react';
import ScreenOne from './src/screens/ScreenOne';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <ScreenOne />
    </>
  );
}
```

Lastly, to see this simple header text on a device's screen, from the terminal window, execute the command `expo start`. You should results similar to the screenshot below:

<img src='https://miro.medium.com/max/700/1*kwennRzVGQSDL0fASGCC5g.png' />

## Create a custom header component with waves

The motive of this section is to add a custom header using the svg component in the background in the `ScreenOne.js` file.

The SVG component that we intend to create is going to wrap the path drawing primitive. This primitive is the outline of a shape that can be filled or stroked. It primitive is represented by the `Path` component from `react-native-svg` library and makes use of different commands such as `elliptical Arc`, `moveto`, `lineto`and so on. You can read more about [Paths here](https://www.w3.org/TR/SVG/paths.html).

To generate the SVG background as you have seen in the previous section, I am going to make use of [getwaves.io](https://getwaves.io/). This web tool allows you to generate custom wave patterns in SVG format. Check out their website, it is simple and fulfils the purpose. You can create different patterns using this tool.

<img src='https://miro.medium.com/max/984/1*NzoVM40QM6VUNSGyCQLZ7g.gif' />

Make sure to copy the values of properties such as `viewbox` and `d` as shown above.

Next, create a file called `WavyHeader.js` inside `src/components/` directory. Import the following statements.

```js
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
```

Create a functional component called `WavyHeader` that is going to have a prop passed from the parent (_the screen component_) it is going to be used. Let us call this prop `customStyles`. The main reason to pass this prop here is to define the dimensions of the screen component in its own file and keep the style value dynamic for different screens.

Here is the complete code snippet for this custom component. Notice the properties of the `Path` component are the same as copied from getwaves.io.

```jsx
export default function WavyHeader({ customStyles }) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: '#5000ca', height: 160 }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 130 }}
        >
          <Path
            fill="#5000ca"
            d="M0,96L48,112C96,128,192,160,288,186.7C384
            ,213,480,235,576,213.3C672,192,768,128,864,
            128C960,128,1056,192,1152,208C1248,224,1344,192,
            1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,
            1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,
            384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}
```

Now, go back to the `ScreenOne.js` file and import this custom component after the rest of the import statements.

```js
// rest of the import statements
import WavyHeader from '../components/WavyHeader';
```

Add this component before the `<View>` that represents `headerContainer`.

```js
export default function ScreenOne() {
  return (
    <View style={styles.container}>
      <WavyHeader customStyles={styles.svgCurve} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Custom Header</Text>
      </View>
    </View>
  );
}
```

Lastly, define the style reference `svgCurve` in the `StyleSheet` object as shown in the snippet below.

```js
const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    // change the color property for better output
    color: '#fff',
    textAlign: 'center',
    marginTop: 35
  }
});
```

From the snippet, you can notice that using the `Dimensions` API from `react-native` we are going to get the width of the current window. The `position` property is set to `absolute` such that the header component that contains the heading is displayed and does not hide behind this wavy background.

The final result is going to be as the following.

<img src='https://miro.medium.com/max/700/1*mf6AmpW-7j4nS1nixMDiVQ.png' />

## Make WavyHeader component reusable

So far, you have completed the task of displaying the wavy header background on a screen component. But what if the scenario changes and you have two screens both require wavy header backgrounds but with some customization such as each having a different height as well as different wave pattern?

In this section, let us customize the `WavyHeader` component to accept more props in order to make it a reusable component.

First, let us customize the `WavyHeader.js` file to accept more props.

```js
export default function WavyHeader({
  customStyles,
  customHeight,
  customTop,
  customBgColor,
  customWavePattern
}) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: customBgColor, height: customHeight }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: customTop }}
        >
          <Path fill={customBgColor} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
}
```

Now the `<Path />` component is going to accept values (such as `backgroundColor`, `height`) in the form of props passed to the `WavyHeader` component.

Next, go to the `ScreenOne.js` file and pass in the values for the props for the `WavyHeader` component.

```jsx
export default function ScreenOne() {
  return (
    <View style={styles.container}>
      <WavyHeader
        customStyles={styles.svgCurve}
        customHeight={160}
        customTop={130}
        customBgColor="#5000ca"
        customWavePattern="M0,96L48,112C96,128,192,160,288,
        186.7C384,213,480,235,576,213.3C672,192,768,128,864,
        128C960,128,1056,192,1152,208C1248,224,1344,192,1392,
        176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,
        0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,
        0,96,0,48,0L0,0Z"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Custom Header</Text>
      </View>
    </View>
  );
}
```

You won’t see a difference in the result on the device’s screen unless you change the values of these props.

<img src='https://miro.medium.com/max/700/1*mf6AmpW-7j4nS1nixMDiVQ.png' />

## Conclusion

You can try adding more custom screens to have different wave patterns and try to use the `WavyHeader` component as reusable for different screens. Here is an example below that displays two different screens with different wave patterns as well as background color and height.

<img src='https://miro.medium.com/max/700/1*ZmqxTfYO5jfv24ktveRzxg.png' />

<img src='https://miro.medium.com/max/598/1*aivsFUf_OF6mYBSfOCGrTQ.gif' />

- [Source code](https://github.com/amandeepmittal/wavySVGExample).
- Or try using an Expo client [here](https://expo.io/@amanhimself/rnwavysvg).
- Or check out [Leandro Favre’s](https://twitter.com/FavreLeandro) [Whicecream](https://github.com/AtilaDev/whicecream) example based on this tutorial!

Here is the list of resources used in order to create this post:

- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [getwaves.io](https://getwaves.io/)
- [What are Paths?](https://www.w3.org/TR/SVG/paths.html)

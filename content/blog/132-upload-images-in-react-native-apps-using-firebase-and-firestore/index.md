---
slug: upload-images-in-react-native-apps-using-firebase-and-firestore
date: 2019-11-21
title: 'Upload images in React Native apps using Firebase and Firestore'
categories: ['react native, firebase']
description: ---
published: true
author: 'Aman Mittal'
banner: './banner.jpg'
---

With React Native, you can build cross-platform mobile applications using JavaScript as the primary programming language. Each of your mobile apps may contain single or multiple user interfaces to serve a wide range of purposes.

One such user interface is to upload images. In this tutorial, we’ll build a small demo app that allows the user to upload an image with associated details to Firebase’s real-time database Firestore and create a collection called posts. This collection of posts for the demo app will consist of an image and its title.

At the same time, by querying the database, the application will be able to fetch multiple posts in one request. Apart from that, we’ll familiarize myself with the react-native-ui-kitten library. It has a great set of ready-to-use components that help decrease needed amounts of development time.

## Table of Contents

- Requirements
- Setting up UI Kitten
- Creating a Tab Navigator
- Adding icons to tab bar
- Mocking data in a Feed Screen
- Using high order functions to add styles
- Add Firebase Queries
- Use Context API
- Upload images to Firestore
- Fetching posts from Firestore
- Conclusion

## Stack/Requirements

- Node.js >= `10.x.x` version installed
- watchman
- react-native-cli
- [react-navigation](https://reactnavigation.org/docs/en/getting-started.html): a convenient way to push screens to React Native apps
- [react-native-ui-kitten](https://akveo.github.io/react-native-ui-kitten/docs/): a great UI library based on Eva design system that contains UI components to speed up our development process and make our app look good
- Active Firebase project
- [react-native-firebase](https://rnfirebase.io/)
- [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Install.md)

## Setting up UI Kitten

Before you'd want to dwell on the rest of the tutorial, please make sure you have the following dependencies installed in your React Native project. Follow the commands in the sequence they are presented below.

```shell
react-native init rnFirestoreUploadExample

# after the project directory is created
cd rnFirestoreUploadExample

# install the following

yarn add react-navigation react-native-svg react-native-screens@1.0.0-alpha.23 react-native-gesture-handler react-native-reanimated react-navigation-tabs react-native-ui-kitten @eva-design/eva @ui-kitten/eva-icons uuid react-native-image-picker react-native-firebase

# for ios
```

I am using the latest version of react-native-cli at the time of writing this post with react-native version `0.61.4`.

`react-native-ui-kitten` does provide interactive documentation. Make sure to configure the application root from the docs [here](https://akveo.github.io/react-native-ui-kitten/docs/guides/install-into-existing-app#add-into-existing-project) just to verify that its related dependencies have been installed correctly.

UI kitten library provides a default light and dark theme that could be switched between. Modify the `App.js` file as per the above code snippet to configure the application root.

```js
import React from 'react'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten'

const ApplicationContent = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Welcome to UI Kitten</Text>
  </Layout>
)

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <ApplicationContent />
  </ApplicationProvider>
)

export default App
```

You will have to open two tabs in your terminal window to run the app at this stage.

```shell
# in the first window, run:
yarn start

# in the second window, depending on your development OS
react-native run-ios

# or

react-native run-android
```

You will get the following output at this stage in an emulator.

![ss1](https://miro.medium.com/max/300/1*O85LT7QhR-HzgbVMObJCLg.png)

I am not going to dwell on setting up `react-navigation` library. To integrate it, please follow the appropriate set of instructions depending on your react-native version from [here](https://reactnavigation.org/docs/en/getting-started.html).

## Creating a Tab Navigator

The demo app will contain two screens. The first is to show them all the posts uploaded to the Firestore and the second screen is to allow us to upload the post. Each post will contain the image and its title.

Let us implement these two screens in this step with some mock data to display for now. Create a `src/screens` directory and inside it create two screen component files: `Feed.js` and `AddPost.js`.

Open `Feed.js` file and the following:

```js
import React from 'react'
import { Text, Layout } from 'react-native-ui-kitten'

const Feed = () => (
  <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Feed Screen</Text>
  </Layout>
)

export default Feed
```

Open `AddPost.js` file to add the following code snippet:

```js
import React from 'react'..
import { Text, Layout } from 'react-native-ui-kitten'

const AddPost = () => (
 <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
 <Text>AddPost Screen</Text>
 </Layout>
)

export default AddPost
```

Next, create a new file `TabNavigator.js` inside `src/navigation` directory. Since the `4.x` version of the `react-navigation` library, all navigation patterns are separated in their npm packages. Import the required libraries and both the screen components.

```js
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Feed from '../screens/Feed'
import AddPost from '../screens/AddPost'
```

Add the following route config to create a simple tab bar.

```js
const TabNavigator = createBottomTabNavigator({
  Feed: {
    screen: Feed
  },
  AddPost: {
    screen: AddPost
  }
})

export default createAppContainer(TabNavigator)
```

Using `react-navigation`, routes are lazily initialized by default. This means any screen component is not mounted until it becomes active first.

To integrate this tab navigator, open `App.js` file and modify it:

```js
import React from 'react'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider } from 'react-native-ui-kitten'

import TabNavigator from './src/navigation/TabNavigator'

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <TabNavigator />
  </ApplicationProvider>
)

export default App
```

The tab bar displays the name of the screen component active in blue color by default. Here is the output:

![ss2](https://miro.medium.com/max/300/1*8eV4ZabtcsjuJxmVR9aLyg.png)

## Adding icons to tab bar

Instead of displaying names for each screen, display the appropriate icons. You have already installed the icon library. Modify `App.js` file to integrate icons from `@ui-kitten/eva-icons` that can be configured using `IconRegistery`.

_Do note_ that this library depends on `react-native-svg` so you have to follow the instructions [here](https://github.com/react-native-community/react-native-svg#installation) on how to install that.

```js
import React, { Fragment } from 'react'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import TabNavigator from './src/navigation/TabNavigator'

const App = () => (
  <Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <TabNavigator />
    </ApplicationProvider>
  </Fragment>
)

export default App
```

If you want to use third party icons library such as `react-native-vector-icons` you can learn more here on how to integrate that [here](https://akveo.github.io/react-native-ui-kitten/docs/guides/3rd-party-icons#installation) with UI kitten.

Open `TabNavigator.js` file and import the `Icon` component from UI kitten.

```js
import { Icon } from 'react-native-ui-kitten'
```

Each route in the `BottomTabNavigator` has access to different properties via `navigationOptions` object. To hide the label or the name of each screen and display an icon in place of it is achieved by returning an `Icon` component on `tabBarIcon` property inside `navigationOptions`.

When a specific route or the screen is focused, its icon colour should appear darker than the other icons in the tab bar just to indicate that it is the active tab. This can be achieved using the prop `focused` on `tabBarIcon`.

Modify the tab navigator as the following:

```js
const TabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="home-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    },
    AddPost: {
      screen: AddPost,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name="plus-square-outline"
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
)
```

To display an `Icon` from the UI Kitten, it is required to provide `width` and `height` attributes.

The `createBottomTabNavigator` accepts the second parameter as config object to modify the whole tab bar rather than each route. `tabBarOptions` is an object with different properties such hiding the label of each route by setting the boolean value of `showLabel` to false.

Here is the output:

![ss3](https://miro.medium.com/max/300/1*UgVc9HhvmgGcWJSvxmJMcQ.png)

## Mocking data in a Feed Screen

In this section, create a simple UI for the Feed screen that contains the image and its title. Open `Feed.js` file and import the following libraries:

```js
import React, { Component } from 'react'
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Layout, withStyles, List } from 'react-native-ui-kitten'
```

Let's mock a `DATA` array with some static resources to display on the screen. Later, you are going to fetch the data from the Firestore when the

```js
const DATA = [
  {
    id: 1,
    postTitle: 'Planet of Nature',
    imageURI:
      'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    id: 2,
    postTitle: 'Lamp post',
    imageURI:
      'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  }
]
```

The `List` from React Native UI Kitten extends the basic `FlatList` from react-native to render a list of items. It accepts the same amount of props as a normal flat list component. In a real application having a `FlatList` is useful instead of `ScrollView` when there is a large number of data items in the list to render to the user.

```js
const Feed = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 60,
          borderBottomWidth: StyleSheet.hairlineWidth,
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 20 }}>All Posts 🔥</Text>
      </View>
      <List
        style={this.props.themedStyle.container}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={DATA.id}
      />
    </Layout>
  )
}
```

We will come back to the `style` attribute in the next section. The data attribute accepts the value of a plain array, hence the mock `DATA` array. Using `keyExtractor` gives the List to extract a unique key for each item in the list that is rendered. The `renderItem` attribute accepts what to display in the list, or how to render the data.

UI kitten has a default `ListItem` component that can be used to display individual items but to customize, let us create our own. Add the following inside the render method of the component but before the return statement.

```js
const renderItem = ({ item }) => (
  <View style={this.props.themedStyle.card}>
    <Image
      source={{ uri: item.imageURI }}
      style={this.props.themedStyle.cardImage}
    />
    <View style={this.props.themedStyle.cardHeader}>
      <Text category="s1" style={this.props.themedStyle.cardTitle}>
        {item.postTitle}
      </Text>
    </View>
  </View>
)
```

## Using high order functions to add styles

UI Kitten provides a themed base design system that you can customize to your needs in the form of a JSON object. These theme variables help to create custom themes based on some initial values and support React Native style properties at the same time.

We have already imported `withStyles` HOC from UI Kitten. It accepts a component that can use the theme variables. In our case the `Feed` component.

First, just to identify the class component it accepts and the one it returns, edit the following line.

```js
class _Feed extends Component {
  // ...
}
```

Add the following style when exporting the `Feed` component. These styles are in the prop `style`.

```js
export default Feed = withStyles(_Feed, theme => ({
  container: {
    flex: 1
  },
  card: {
    backgroundColor: theme['color-basic-100'],
    marginBottom: 25
  },
  cardImage: {
    width: '100%',
    height: 300
  },
  cardHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitle: {
    color: theme['color-basic-1000']
  }
}))
```

Here is the output:

![ss4](https://miro.medium.com/max/300/1*0GLg1ixCdxRdU7rxRovsuQ.png)

## Add Firebase queries

Before proceeding with this section, please make sure you have successfully followed [instructions](https://rnfirebase.io/docs/v5.x.x/getting-started) to install and integrate react-native-firebase library in your React Native app. Also, you have set up a Firebase app and have the right to access Firestore.

Create a `utils/` directory in `src` and add a new file `Firebase.js`. This file will contain two methods that will handle to upload an image with relevant post data to the Firestore in a collection called `posts`.

The `uuid` package helps to create a unique identifier for each post to be upload.

```js
import firebase from 'react-native-firebase'
import uuid from 'uuid'

const Firebase = {
  //...
}

export default Firebase
```

The first method is to upload the image and its title.

```js
 uploadPost: post => {
 const id = uuid.v4()
 const uploadData = {
 id: id,
 postPhoto: post.photo,
 postTitle: post.title
 }
 return firebase
 .firestore()
 .collection('posts')
 .doc(id)
 .set(uploadData)
 },
```

The second method is used to fetch all the posts from the collection `posts`. The Feed component requires the Firebase query to fetch all posts with one request. Using `querySnapshot.docs.map` you can fetch multiple documents at once from the Firestore database. Add the below snippet:

```js
getPosts: () => {
  return firebase
    .firestore()
    .collection('posts')
    .get()
    .then(function(querySnapshot) {
      let posts = querySnapshot.docs.map(doc => doc.data())
      // console.log(posts)
      return posts
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error)
    })
}
```

## Use Context API

Using Context API you can easily manage to consume Firebase methods in the app without adding a state management library like Redux.

The common reason to use Context API in a React Native app is that you need to share some data in different places or components in the component tree. Manually passing props can be tedious as well as hard to keep track of.

Create a new file called `utils/FirebaseContext.js`. It will hold the snippet for creating the context and a High Order Function. The HoC will eliminate the need for importing and using Firebase. The consumer in every component necessary. By wrapping each component as a parameter to the HoC will provide access to Firebase queries (or the custom methods created in file `Firebase.js`) as props.

```js
import React, { createContext } from 'react'

const FirebaseContext = createContext({})

export const FirebaseProvider = FirebaseContext.Provider

export const FirebaseConsumer = FirebaseContext.Consumer

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
)
```

Create a new file `utils/index.js` to export both the Firebase object from the `Firebase.js` file, the provider and the HoC.

```js
import Firebase from './Firebase'
import { FirebaseProvider, withFirebaseHOC } from './FirebaseContext'

export default Firebase

export { FirebaseProvider, withFirebaseHOC }
```

The provider has to grab the value from the context object for the consumer to use that value. This is going to be done in the `App.js` file. The value for the `FirebaseProvider` is going to be the Firebase object.

```js
import React, { Fragment } from 'react'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import Firebase, { FirebaseProvider } from './src/utils'
import TabNavigator from './src/navigation/TabNavigator'

const App = () => (
  <Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <FirebaseProvider value={Firebase}>
        <TabNavigator />
      </FirebaseProvider>
    </ApplicationProvider>
  </Fragment>
)

export default App
```

## Upload images to Firestore

The `AddPost` component will allow a user to choose an image from their phone's gallery and upload it on the Firestore database. Open the `AddPost.js` file and add the following import statements.

```js
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text, Button, Input } from 'react-native-ui-kitten'
import ImagePicker from 'react-native-image-picker'
import { withFirebaseHOC } from '../utils'
```

Add a state object to keep track when an image file is picked from the gallery as well as when there is a title provided for that image file. This is to be done inside the class component.

```js
class AddPost extends Component {
  state = {
    image: null,
    title: ''
  }
  onChangeTitle = title => {
    this.setState({ title })
  }

  // ...
}
```

Using `ImagePicker.launchImageLibrary()` from `react-native-image-picker` an image can be picked. Do note that this method expects an options object as the parameter. If an image is picked successfully, it will provide the URI of the image.

```js
selectImage = () => {
  const options = {
    noData: true
  }
  ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      const source = { uri: response.uri }
      console.log(source)
      this.setState({
        image: source
      })
    }
  })
}
```

The `onSubmit` asynchronous method is responsible to upload the post to the Firestore and clear the state object when the post is successfully uploaded.

```js
onSubmit = async () => {
  try {
    const post = {
      photo: this.state.image,
      title: this.state.title
    }
    this.props.firebase.uploadPost(post)

    this.setState({
      image: null,
      title: '',
      description: ''
    })
  } catch (e) {
    console.error(e)
  }
}
```

Here is the snippet of the render function.

```js
 render() {
 return (
 <View style={{ flex: 1, marginTop: 60 }}>
 <View>
 {this.state.image ? (
 <Image
 source={this.state.image}
 style={{ width: '100%', height: 300 }}
 />
 ) : (
 <Button
 onPress={this.selectImage}
 style={{
 alignItems: 'center',
 padding: 10,
 margin: 30
 }}>
 Add an image
 </Button>
 )}
 </View>
 <View style={{ marginTop: 80, alignItems: 'center' }}>
 <Text category='h4'>Post Details</Text>
 <Input
 placeholder='Enter title of the post'
 style={{ margin: 20 }}
 value={this.state.title}
 onChangeText={title => this.onChangeTitle(title)}
 />
 <Button status='success' onPress={this.onSubmit}>
 Add post
 </Button>
 </View>
 </View>
 )
 }
}

export default withFirebaseHOC(AddPost)
```

This is the output you get for `AddPost` screen.

![ss5](https://miro.medium.com/max/300/1*aM5xmmZicauhIBOfKghK3A.png)

Click on the button `Add an image` and choose the image from the device's gallery or stored images.

![ss6](https://miro.medium.com/max/300/1*uVQLcmWNPpC9iQZDw-TJRg.png)

By clicking the button `Add post` the post will be submitted to Firestore which you can verify by opening the Firebase console. You will find a `posts` collection in your Firebase project.

![ss7](https://miro.medium.com/max/1144/1*K-YL2AxZeM2WkopHG6S7gg.png)

## Fetching posts from Firestore

Open `Feed.js` and import the following statements.

```js
import { withFirebaseHOC } from '../utils'
```

Create a state object with two properties in the class component. You won't need to mock `DATA` array anymore.

```js
state = { DATA: null, isRefreshing: false }
```

Create a handler method called `fetchPosts` to fetch the data. You have to explicitly call this method in the lifecycle method `componentDidMount` to load all posts available since Feed is the entry screen.

```js
componentDidMount() {
 this.fetchPosts()
 }

 fetchPosts = async () => {
 try {
 const posts = await this.props.firebase.getPosts()
 console.log(posts)
 this.setState({ DATA: posts, isRefreshing: false })
 } catch (e) {
 console.error(e)
 }
 }
```

Next, add another method called `onRefresh` that is responsible to fetch posts when the screen is pulled downwards.

```js
onRefresh = () => {
  this.setState({ isRefreshing: true })
  this.fetchPosts()
}
```

Here is how the rest of the component will look like. While the data is being currently fetched, it will show a loading indicator on the screen.

```js
render() {
 const renderItem = ({ item }) => (
 <View style={this.props.themedStyle.card}>
 <Image
 source={{ uri: item.postPhoto.uri }}
 style={this.props.themedStyle.cardImage}
 />
 <View style={this.props.themedStyle.cardHeader}>
 <Text category='s1' style={this.props.themedStyle.cardTitle}>
 {item.postTitle}
 </Text>
 </View>
 </View>
 )
 if (this.state.DATA != null) {
 return (
 <Layout style={{ flex: 1 }}>
 <View
 style={{
 marginTop: 60,
 borderBottomWidth: StyleSheet.hairlineWidth,
 alignItems: 'center'
 }}>
 <Text style={{ fontSize: 20 }}>All Posts 🔥</Text>
 </View>
 <List
 style={this.props.themedStyle.container}
 data={this.state.DATA}
 renderItem={renderItem}
 keyExtractor={this.state.DATA.id}
 refreshing={this.state.isRefreshing}
 onRefresh={() => this.onRefresh()}
 />
 </Layout>
 )
 } else {
 return (
 <View
 style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
 <ActivityIndicator size='large' />
 </View>
 )
 }
 }
```

Also, do not forget to add `withFirebaseHOC`.

```js
export default Feed = withFirebaseHOC(
 withStyles(_Feed, theme => ({
 //.. remains same
)
```

On the initial load, since there is only one post in the `posts` collection, the output will be the following:

![ss8](https://miro.medium.com/max/300/1*h6s0j39LE5ZgM7WMCKyrEw.png)

## Conclusion

There are many useful strategies for using Firebase and React Native together that you can take from this post. Also, using a UI library like `react-native-ui-kitten` saves a lot of time to figure out how to style each component.

You can find the complete source code at **[this Github repo](https://github.com/amandeepmittal/rnFirestoreUploadExample)**.

> Originally published at [Heartbeat.Fritz.AI](https://blog.jscrambler.com/implementing-react-native-push-notifications-in-android-apps/)

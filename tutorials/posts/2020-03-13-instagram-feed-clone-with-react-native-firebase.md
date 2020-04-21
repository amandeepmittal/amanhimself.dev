---
date: 2020-03-13
title: 'Instagram Feed clone with React Native, UI Kitten and Firebase'
template: post
thumbnail: '../thumbnails/react.png'
slug: instagram-feed-clone-with-react-native-firebase
categories:
  - React Native
  - Firebase
tags:
  - react-native
  - react-navigation
  - firebase
---

![cover_image](https://blog.crowdbotics.com/content/images/2020/03/React-Firebase-Featured-Image.png)

With React Native you can build cross-platform applications using JavaScript as the programming language. Each of your mobile apps may contain single or multiple user interfaces to serve a purpose.

Take, for example, Instagram. It is one of the most used mobile apps on both platforms that consists a different to serve main features such as sharing a photo and displaying it on the home screen, user's profile screen contains details about the user, activity screen contains a history all notifications that include likes or comments on each post.

## What are we building

In this tutorial, we are going to build one of the user interfaces from the example of Instagram in React Native with Firebase backend service. The Firebase will allow us to upload and query a real time server to fetch images and display them in the app.

![ss11](https://blog.crowdbotics.com/content/images/2019/10/ss11-1.gif)

The complete source code for the demo app is available at [this Github repo](https://github.com/amandeepmittal/rnSocialApp).

## Stack/Requirements

- Nodejs >= `10.x.x` version installed
- watchman
- react-native-cli
- [react Navigation](https://reactnavigation.org/docs/en/getting-started.html) — an easy way to push screens to React Native apps
- [react-native-ui-kitten](https://akveo.github.io/react-native-ui-kitten/docs/) - a great UI library based on Eva design system that contains UI components to speed up our development process and make our app look good
- Active Firebase project
- [react-native-firebase](https://rnfirebase.io/)
- [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Install.md)

I will not be covering how to install modules such as `react-native-firebase` or `react-native-image-picker` and connect its native bindings. Please refer to their official documentation for that.

## Setting up Navigation and UI Kitten

Before you'd want to dwell on the rest of the tutorial, please make sure you have the following dependencies installed in your React Native project. Follow the commands in the sequence they are presented below.

```shell
react-native init instacloneApp

# after the project directory is created
cd instacloneApp

# install the following
yarn add react-navigation react-native-svg react-native-screens@1.0.0-alpha.23 react-native-gesture-handler react-native-reanimated react-navigation-tabs react-navigation-stack react-native-ui-kitten @eva-design/eva @ui-kitten/eva-icons uuid react-native-image-picker react-native-firebase
```

We are using the latest version of react-native-cli at the time of writing this post with react-native version `0.61.2`.

To integrate `react-navigation` library, please follow the appropriate set of instructions depending on your react-native version **[here](https://reactnavigation.org/docs/en/getting-started.html)**.

`react-native-ui-kitten` does provide interactive documentation. Make sure to configure the application root from the **[docs here](https://akveo.github.io/react-native-ui-kitten/docs/guides/install-into-existing-app#add-into-existing-project)** just to verify that its related dependencies have been installed correctly.

```js
import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from 'react-native-ui-kitten';

const ApplicationContent = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Welcome to UI Kitten</Text>
  </Layout>
);

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <ApplicationContent />
  </ApplicationProvider>
);

export default App;
```

You see, UI kitten library comes with a default light and dark theme that your app can switch between. Once you modify the `App.js` file to the following above code snippet, you will get the following result. You will have to open two tabs in your terminal window.

```shell
# in the first window, run:
yarn start

# in the second window, depending on your development OS
react-native run-ios

# or

react-native run-android
```

![ss1](https://blog.crowdbotics.com/content/images/2019/10/ss1-3.png)

## Creating a Tab Navigator

The Instagram app contains five different screens that are accessible from tab navigation. Let us try to implement that interface in the React Native app with five different screens that contain some dummy presentation to display.

Create the `src/` directory and inside it create a new folder called `screens/`. This folder will contain the following five screens.

- Feed.js
- Search.js
- AddPost.js
- Activity.js
- Profile.js

For now, you can add a dummy presentation component that just lists the screen name at the center when it is being currently viewed in the app. For example, the file `Feed.js` will look like below:

```js
import React from 'react';
import { Text, Layout } from 'react-native-ui-kitten';

const Feed = () => (
  <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Feed Screen</Text>
  </Layout>
);

export default Feed;
```

The `screens/` directory will look like as below with five different files.

![ss2](https://blog.crowdbotics.com/content/images/2019/10/ss2-1.png)

Next, create a new file `TabNavigator.js` inside `src/navigation` directory. Import the required libraries and all the five screens.

```js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Feed from '../screens/Feed';
import Search from '../screens/Search';
import AddPost from '../screens/AddPost';
import Activity from '../screens/Activity';
import Profile from '../screens/Profile';
```

Eva design system comes with [open source icon library](https://akveo.github.io/eva-icons/) that we are going to use in this tutorial. You are free to use any other icon library as well.

Since the `4.x` version of `react-navigation` library, all navigation patterns are separated in their npm packages.

Let us create a simple tab bar on the bottom of the screen with the following route configs.

```js
const TabNavigator = createBottomTabNavigator({
  Feed: {
    screen: Feed
  },
  Search: {
    screen: Search
  },
  AddPost: {
    screen: AddPost
  },
  Activity: {
    screen: Activity
  },
  Profile: {
    screen: Profile
  }
});

export default createAppContainer(TabNavigator);
```

Using `react-navigation`, routes are lazily initialized by default. This means any screen component is not mounted until it becomes active first.

To integrate this tab navigator, open `App.js` file and modify it:

```js
import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';

import TabNavigator from './src/navigation/TabNavigator';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <TabNavigator />
  </ApplicationProvider>
);

export default App;
```

Here is the output:

![ss3](https://blog.crowdbotics.com/content/images/2019/10/ss3-2.png)

The tab bar displays the name of the screen component.

## Adding icons to tab bar

Instead of displaying names for each screen, let us display the appropriate icons. We have already installed the icon library. Modify `App.js` file to integrate icons from `@ui-kitten/eva-icons` which can be configured using `IconRegistery`.

```js
import React, { Fragment } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import TabNavigator from './src/navigation/TabNavigator';

const App = () => (
  <Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <TabNavigator />
    </ApplicationProvider>
  </Fragment>
);

export default App;
```

Note that, if you are planning to use third party icons library such as `react-native-vector-icons` you can learn more **[here](https://akveo.github.io/react-native-ui-kitten/docs/guides/3rd-party-icons#installation)** on how to integrate that. Next, go to `TabNavigator.js` file. First, import the `Icon` component from `react-native-ui-kitten`.

```js
import { Icon } from 'react-native-ui-kitten';
```

Each route in the `BottomTabNavigator` has access to different properties via `navigationOptions` object. To hide the label or the name of each screen and display an icon in place of it is achieved by returning an `Icon` component on `tabBarIcon` property inside `navigationOptions`.

Also, when a specific route or the screen is focused, its icon colour should appear darker than the other icons in the tab bar just to indicate that it is the active tab. This can be achieved using the prop `focused` on `tabBarIcon`.

Modify the tab navigator as the following:

```js
const TabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name='home-outline'
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name='search-outline'
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
            name='plus-square-outline'
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    },
    Activity: {
      screen: Activity,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name='heart-outline'
            width={32}
            height={32}
            fill={focused ? '#111' : '#939393'}
          />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name='person-outline'
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
);
```

To display an `Icon` from the UI Kitten, it is required to provide attributes such as `width` and `height`.

The `createBottomTabNavigator` accepts the second parameter as config object to modify the whole tab bar rather than each route. `tabBarOptions` is an object with different properties such hiding the label of each route by setting the boolean value of `showLabel` to false.

## Adding a Header to Feed screen

Since the `Feed` route is going to be the first screen that a user will see when they open the app, let us display the name of the application in a header at the top. Also, this header will serve the purpose of navigating to a different route later (_such as Camera_). This route that we are going to create later is only going to be accessible from the Feed screen and has nothing to do with the Tab bar. Thus, let us create a new stack navigator for the Feed screen separate and then add that in the `TabNavigator`.

Create a new file `StackNavigator` inside `navigation/` directory.

```js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Feed from '../screens/Feed';

export const FeedNavigator = createAppContainer(
  createStackNavigator({
    Feed: {
      screen: Feed,
      navigationOptions: {
        headerTitle: 'Social App'
      }
    }
  })
);
```

Modify `TabNavigator.js` file and replace the `Feed` screen with `FeedNavigator`. Import it first.

```js
// after other import statements
import { FeedNavigator } from './StackNavigator';
```

Then, replace the value of `screen` with `FeedNavigator`.

```js
Feed: {
      screen: FeedNavigator,
      //... rest remains same
}
```

![ss5](https://blog.crowdbotics.com/content/images/2019/10/ss5-1.png)

## Create Feed UI

Let us begin by creating a simple UI for the Feed screen that will contain the image, title of the image, user avatar, and description of the image post. To begin, open `Feed.js` file and import the following elements from `react-native` and `react-native-ui-kitten`.

```js
import React, { Component } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Text, Avatar, withStyles, List } from 'react-native-ui-kitten';
```

Right, we are going to fetch some posts by mocking a `DATA` array. Add this before the Feed component.

```js
const DATA = [
  {
    id: 1,
    postTitle: 'Planet of Nature',
    avatarURI:
      'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    imageURI:
      'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    randomText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  },
  {
    id: 2,
    postTitle: 'Lampost',
    avatarURI:
      'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    imageURI:
      'https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    randomText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  }
];
```

The `List` from React Native UI Kitten extends the basic `FlatList` from react-native to render a list of items. In a real application having a Flat list is useful instead of `ScrollView` when there is a large number of data items in the list to render to the user.

It accepts the same amount of props as a normal flat list component. Return the following:

```js
return (
  <List
    style={this.props.themedStyle.container}
    data={DATA}
    renderItem={renderItem}
    keyExtractor={DATA.id}
  />
);
```

We will come back to the `style` attribute in the next section. The `data` attribute accepts the value of a plain array, hence the mock `DATA`. Using `keyExtractor` gives the List to extract a unique key for each item in the list that is rendered. The `renderItem` attribute accepts what to display in the list, or how to render the data.

React Native UI kitten has a default `ListItem` component that you can use to display items but since we need customization, let us create our own. Add the following inside the render method of the component but before the return statement.

```js
const renderItem = ({ item }) => (
  <View style={this.props.themedStyle.card}>
    <Image
      source={{ uri: item.imageURI }}
      style={this.props.themedStyle.cardImage}
    />
    <View style={this.props.themedStyle.cardHeader}>
      <Text category='s1' style={this.props.themedStyle.cardTitle}>
        {item.postTitle}
      </Text>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Profile')}
      >
        <Avatar
          source={{ uri: item.avatarURI }}
          size='small'
          style={this.props.themedStyle.cardAvatar}
        />
      </TouchableOpacity>
    </View>
    <View style={this.props.themedStyle.cardContent}>
      <Text category='p2'>{item.randomText}</Text>
    </View>
  </View>
);
```

The `Avatar` and `Text` are both Ui components provided by the UI Kitten library. `Avatar` is styled `Image` component as well as is `Text`. In the above snippet, notice how the `category='p2'` attribute is being used on the `Text`. UI Kitten provides these specific styles. You can explore more about it **[here](https://akveo.github.io/react-native-ui-kitten/docs/components/text/api#text)**.

## Adding styles with High Order Function

UI Kitten library provides a themed base design system that you can customize to your needs in form of a JSON object. It provides theme variables that can help you create custom themes based on some initial values and support React Native style properties at the same time.

This section will showcase, how you can integrate its theme using a High Order Function in a React Native screen and with dwelling much into customization. You can read more it [here](https://akveo.github.io/react-native-ui-kitten/docs/design-system/design-system-theme#a-theme).

We have already imported `withStyles` HOC from UI Kitten. It accepts a component that can use the theme variables. In our case the Feed component.

First, just to identify the class component it accepts and the one it returns, edit the following line.

```js
class _Feed extends Component {
  // ...
}
```

Add the following style while exporting the `Feed` component. These styles can be used in the `style` as props (_which you have seen in the previous section_).

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
  },
  cardAvatar: {
    marginRight: 16
  },
  cardContent: {
    padding: 10,
    borderWidth: 0.25,
    borderColor: theme['color-basic-600']
  }
}));
```

Here is the output you get.

![ss6](https://blog.crowdbotics.com/content/images/2019/10/ss6.gif)

## Create a Firebase Context

Before proceeding with this section, please make sure you have successfully followed [instructions](https://rnfirebase.io/docs/v5.x.x/getting-started) to install and integrate `react-native-firebase` library in your React Native app. Also, you have set up a Firebase app and have the right to access Firestore.

Using Context API you can easily manage to consume Firebase methods in the app without adding a state management library like Redux.

The common reason to use Context API in a React Native app is that you need to share some data in different places or components in the component tree. Manually passing props can be tedious as well as hard to keep track of.

The Context API consists of three building blocks:

- creating a context object
- declaring a provider that gives the value
- declaring a consumer that allows a value to be consumed (provided by the provider)

Create `utils` directory in `src` and add a new file `Firebase.js`. This file will contain two methods that will handle to upload an image with relevant post data to the Firestore in a collection called `post`. The second method is used to fetch all the posts from the collection.

Using `uuid` package you can create a unique identifier for each post uploaded.

```js
import firebase from 'react-native-firebase';
import uuid from 'uuid';

const Firebase = {
  uploadPost: post => {
    const id = uuid.v4();
    const uploadData = {
      id: id,
      postPhoto: post.photo,
      postTitle: post.title,
      postDescription: post.description,
      likes: []
    };
    return firebase.firestore().collection('posts').doc(id).set(uploadData);
  },
  getPosts: () => {
    return firebase
      .firestore()
      .collection('posts')
      .get()
      .then(function (querySnapshot) {
        let posts = querySnapshot.docs.map(doc => doc.data());
        // console.log(posts)
        return posts;
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }
};

export default Firebase;
```

Next, create a new file called `FirebaseContext.js`. It will hold the snippet for creating the context and a High Order Function. The HoC will eliminate the need for importing and using Firebase.The consumer in every component necessary. By wrapping each component as a parameter to the HoC will provide access to Firebase queries (or the custom methods created in file `Firebase.js`) as props.

```js
import React, { createContext } from 'react';

const FirebaseContext = createContext({});

export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
);
```

Create a new file `index.js` to export both the Firebase object from the `Firebase.js` file, the provider and the HoC.

```js
import Firebase from './Firebase';
import { FirebaseProvider, withFirebaseHOC } from './FirebaseContext';

export default Firebase;

export { FirebaseProvider, withFirebaseHOC };
```

The provider has to grab the value from the context object for the consumer to use that value. This is going to be done in the `App.js` file. The value for the `FirebaseProvider` is going to be the `Firebase` object.

```js
import React, { Fragment } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Firebase, { FirebaseProvider } from './src/utils';
import TabNavigator from './src/navigation/TabNavigator';

const App = () => (
  <Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <FirebaseProvider value={Firebase}>
        <TabNavigator />
      </FirebaseProvider>
    </ApplicationProvider>
  </Fragment>
);

export default App;
```

## Uploading images to Firestore

Let us add modify the `AddPost` component to let the user choose an image from the phone's gallery and store it on the Firestore database. Open the `AddPost.js` file and add the following import statements.

```js
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Text, Button, Input } from 'react-native-ui-kitten';
import ImagePicker from 'react-native-image-picker';
import { withFirebaseHOC } from '../utils';
```

Next, in the class component, add a state object that will track when the image file is picked from the gallery as well as when there are a title and a description provided for the image file. All of these three combined will create one post. You have seen the same in mock `DATA` array in `Feed.js` previously.

Using `ImagePicker.launchImageLibrary()` from `react-native-image-picker` an image is picked. Do note that, this method expects an `options` object as the parameter. If an image is picked successfully, it will provide the URI of the image.

The `onSubmit` asynchronous method is responsible to upload the post to the Firestore and clear the state object when the post is successfully uploaded.

```js
class AddPost extends Component {
  state = { image: null, title: '', description: '' };

  onChangeTitle = title => {
    this.setState({ title });
  };
  onChangeDescription = description => {
    this.setState({ description });
  };

  onSubmit = async () => {
    try {
      const post = {
        photo: this.state.image,
        title: this.state.title,
        description: this.state.description
      };
      this.props.firebase.uploadPost(post);

      this.setState({
        image: null,
        title: '',
        description: ''
      });
    } catch (e) {
      console.error(e);
    }
  };

  selectImage = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        this.setState({
          image: source
        });
      }
    });
  };

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
              }}
            >
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
          <Input
            placeholder='Enter description'
            style={{ margin: 20 }}
            value={this.state.description}
            onChangeText={description => this.onChangeDescription(description)}
          />
          <Button status='success' onPress={this.onSubmit}>
            Add post
          </Button>
        </View>
      </View>
    );
  }
}

export default withFirebaseHOC(AddPost);
```

Do not forget to wrap the component inside `withFirebaseHOC`. You will get the following screen.

![ss7](https://blog.crowdbotics.com/content/images/2019/10/ss7-1.png)

Click on the button `Add an image` and choose the image from the device's gallery or stored images.

![ss8](https://blog.crowdbotics.com/content/images/2019/10/ss8-1.png)

By clicking the button `Add post` the post will be submitted to Firestore which you can verify by opening the Firebase console. You will find a `posts` collection. As an example is shown below:

![ss9](https://blog.crowdbotics.com/content/images/2019/10/ss9.png)

## Fetching posts from Firestore

From second to the previous section, you have observed that we are saving each post under a unique id as the name of the document under a collection called `posts`. To fetch all these documents, you will have to query the Firestore.

In the file `utils/Firebase.js` the function `getPosts()` does that for you. Using `querySnapshot.docs.map` you can fetch multiple documents at once from the Firestore database. All of these posts are going to be shown at the Feed screen which is the entry point of the application. Right now, it only shows some mock data.

Open `Feed.js` and import the following statements.

```js
import React, { Component } from 'react';
import { Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Avatar, withStyles, List } from 'react-native-ui-kitten';
import { withFirebaseHOC } from '../utils';
```

Next, in the class component, create a state object with two properties. The first property `DATA` is going to hold the array of all documents. The second property `isRefreshing` is going to be used in `List` to implement the functionality of fetching new results at pull to refresh.

```js
class _Feed extends Component {
  state = { DATA: null, isRefreshing: false };
  // ...
}
```

Next, create a handler method called `fetchPosts` to fetch the data. Also, you have to explicitly call this method in the lifecycle method `componentDidMount` to load all posts available since Feed is the entry screen.

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
  this.setState({ isRefreshing: true });
  this.fetchPosts();
};
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Avatar
              source={{
                uri:
                  'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
              }}
              size='small'
              style={this.props.themedStyle.cardAvatar}
            />
          </TouchableOpacity>
        </View>
        <View style={this.props.themedStyle.cardContent}>
          <Text category='p2'>{item.postDescription}</Text>
        </View>
      </View>
    )

    if (this.state.DATA != null) {
      return (
        <List
          style={this.props.themedStyle.container}
          data={this.state.DATA}
          renderItem={renderItem}
          keyExtractor={this.state.DATA.id}
          refreshing={this.state.isRefreshing}
          onRefresh={() => this.onRefresh()}
        />
      )
    } else
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      )
  }
```

Lastly, wrap it up with the Firebase HOC.

```js
export default Feed = withFirebaseHOC(
  withStyles(_Feed, theme => ({
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
    },
    cardAvatar: {
      marginRight: 16
    },
    cardContent: {
      padding: 10,
      borderWidth: 0.25,
      borderColor: theme['color-basic-600']
    }
  }))
);
```

On the initial load, since there is only one post in the `posts` collection, the output will be the following:

![ss10](https://blog.crowdbotics.com/content/images/2019/10/ss10.png)

Try adding one more post now and use pull to refresh to fetch the latest document from the `posts` collection.

![ss11](https://blog.crowdbotics.com/content/images/2019/10/ss11-2.gif)

## Conclusion

This brings an end to this current tutorial. There are many useful strategies for using Firebase and React Native together that you can take from this post. Also, using a UI library like `react-native-ui-kitten` saves a lot of time to figure out how to style each component.

The Feed screen was implemented is from one of the templates from Crowdbotics' react-native collection. We use UI Kitten for our latest template libraries. You can modify the screen further, add another component that takes care of counting likes or comments. Find more about how to create custom screens like this from our open source project **[here](https://github.com/crowdbotics/blueprint-react-native-articles-screen)**.

---

_Originally published at [Crowdbotics' Blog](https://blog.crowdbotics.com/instagram-clone-with-react-native-creating-the-feed-screen/)_.

---
title: 'How to add a Search bar in a FlatList in React Native apps'
date: '2020-04-16'
slug: 'add-search-bar-to-a-flatlist-in-react-native'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://blog.crowdbotics.com/add-search-bar-flatlist-react-native-apps/'
---

![cover_image](https://i.imgur.com/zeVnUHd.png)

> Originally published at [Crowdbotics.com](https://blog.crowdbotics.com/add-search-bar-flatlist-react-native-apps)

There are few ways to create scrollable lists in React Native. Two of the common ways available in React Native core are `ScrollView` and `FlatList` components. Each has its strength and in this tutorial, let us dive deep to create a search bar with `FlatList` component.

The final result you are going to achieve at the end of this tutorial is shown below.

![ss8](https://i.imgur.com/a5FpiUm.gif)

## Table of contents

- Getting started
- What is FlatList?
- Basic usage of a FlatList component
- Fetching data from Remote API in a FlatList
- Adding a custom Separator to FlatList component
- Adding a Search bar
- Run the app
- Add clear button to input text field
- Conclusion

## Getting started

For the demo we are going to create in this tutorial, I am going to use [Expo](https://expo.io/). You are free to choose and use anything between an Expo CLI or a `react-native-cli`.

To start, let us generate a React Native app using Expo CLI and then install the required dependency to have a charming UI for the app. Open up a terminal window and run the following commands in the order they are mentioned.

```shell
expo init searchbarFlatList

cd searchbarFlatList

yarn install @ui-kitten/components @eva-design/eva lodash.filter

expo install react-native-svg
```

_Note_: The dependency `react-native-svg` is required as a peer dependency for the UI kitten library.

UI Kitten is ready to use now. To check, everything has installed correctly, let us modify `App.js` file as the following snippet:

```js
import React from 'react';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">HOME</Text>
  </Layout>
);

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <HomeScreen />
  </ApplicationProvider>
);

export default App;
```

The `ApplicationProvider` accepts two props, `mapping` and `theme`.

To run this demo, open up the terminal window and execute the following command.

```shell
expo start
```

I am using an iOS simulator for the demo. Here is the output of the above code snippet.

![ss1](https://i.imgur.com/TZ173Uv.png)

## What is FlatList?

The component `FlatList` is an efficient way to create scrolling data lists in a React Native app. It has a simple API to work with and is more efficient and preferment with a large amount of information to display in comparison to its alternate.

By default, you can just pass in an array of data and this component will do its work. You do not have to take care of formatting the data too often.

## Basic usage of a FlatList component

There are three primary props that a FlatList component requires to display a list of data:

- `data`: an array of data that is used to create a list. Generally, this array is built of multiple objects.
- `renderItem`: is a function that takes an individual element from the `data` array and renders it on the UI.
- `keyExtractor`: it tells the list of data to use the unique identifiers or `id` for an individual element.

To get understand this pragmatically, let us build a mock an array of data and using `FlatList`, let us display it on our demo app. To start, import the following statements in `App.js` file.

```js
import React from 'react';
import { FlatList, View, Text } from 'react-native';
```

Then, create an array of mock data.

```js
const mockData = [
  { id: '1', text: 'Expo 💙' },
  { id: '2', text: 'is' },
  { id: '3', text: 'Awesome!' }
];
```

Now, modify the `HomeScreen` component with the following snippet:

```js
const HomeScreen = () => (
  <View
    style={{
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 40
    }}
  >
    <FlatList
      data={mockData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Text style={{ fontSize: 22 }}>
          {item.id} - {item.text}
        </Text>
      )}
    />
  </View>
);
```

If the Expo cli command to run the development server is still running, you are going to get the following result.

![ss2](https://i.imgur.com/penUpT7.png)

## Fetching data from Remote API in a FlatList

You can even play around with it. Try to fetch data from a real-time remote API and display them in the list instead of mock data. For a start, you can use a public API URL such as [Randomuser.me API](https://randomuser.me/api/). The result to obtain at the end of this section is displayed below.

![ss3](https://i.imgur.com/cAwKEaD.png)

Open, `App.js` file and a state object with some properties to keep track of data from the Random User API. Also, do not forget to modify the import statements.

```js
// modify the import statements as below
import React from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { ApplicationProvider, Text, Avatar } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

// add a state object to the HomeScreen component
class HomeScreen extends React.Component {
  state = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null
  };

  // ... rest of the code
}
```

With the HTTP request to the API URL, let us fetch the first 20 results for now. Create a handler method called `makeRemoteRequest` that uses JavaScript's `fetch(url)` where `url` is the API request. It will fetch the results in JSON format. In case of a successful response from the API, the loading indicator (_which is going to add later_) will be false.

Also, using the lifecycle method `componentDidMount`, you can render the list of random users at the initial render of the `HomeScreen` component.

```js
 componentDidMount() {
 this.makeRemoteRequest()
 }

 makeRemoteRequest = () => {
 const { page, seed } = this.state
 const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`
 this.setState({ loading: true })

 fetch(url)
 .then(res => res.json())
 .then(res => {
 this.setState({
 data: page === 1 ? res.results : [...this.state.data, ...res.results],
 error: res.error || null,
 loading: false
 })
 })
 .catch(error => {
 this.setState({ error, loading: false })
 })
 }
```

Next, add a `renderFooter` handler method that is going to display a loading indicator based on the value from the state object. This indicator is shown when the list of data in still being fetched. When the value of `this.state.loading` is true, using the `ActivityIndicator` from react-native components, a loading indicator on the UI screen is shown.

```js
renderFooter = () => {
  if (!this.state.loading) return null;

  return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#CED0CE'
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );
};
```

Here is the output you are going to get when the loading indicator is shown.

![ss5](https://i.imgur.com/FYDMKsp.png)

## Adding a custom Separator to FlatList component

Previously, you learned about the three most important props in the FlatList component. It is so flexible that it comes with extra props to render different components to make UI as pleasing to the user. One such prop is called `ItemSeparatorComponent`. You can add your own styling with custom JSX.

To do so, add another handler method called `renderSeparator`. It consists of rendering a `View` with some styling.

```js
renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '5%'
      }}
    />
  );
};
```

This completes all of the handler method currently required. Now, let us replace the previous `FlatList` component in `App.js` file with the following snippet.

A list of user names is going to be rendered with an individual item as the user. When pressed it shows an alert message for now but in real-time app, it will go on to display the complete user profile or user's contact.

The individual items in the list are going to be separated by the `renderSeparator` method as well as each item is going to display a user image which is composed of `Avatar` component from `react-native-ui-kitten`. The data is coming from the state object.

```js
<FlatList
  data={this.state.data}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => alert('Item pressed!')}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center'
        }}
      >
        <Avatar
          source={{ uri: item.picture.thumbnail }}
          size="giant"
          style={{ marginRight: 16 }}
        />
        <Text
          category="s1"
          style={{
            color: '#000'
          }}
        >{`${item.name.first} ${item.name.last}`}</Text>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={item => item.email}
  ItemSeparatorComponent={this.renderSeparator}
  ListFooterComponent={this.renderFooter}
/>
```

From the above snippet, you can also notice that the loading indicator handler method `renderFooter()` is also used as the value of a prop called `ListFooterComponent`.

You can also use this prop to render other information at the bottom of all the items in the list. One example is to fetch more items in the list and show the loading indicator when the request is made.

Here is the output so far.

![ss4](https://i.imgur.com/eszTsxG.gif)

## Adding a Search bar

To create a search bar on top of the FlatList, you need a component that scrolls away when the list is scrolled. One possible solution is to create a custom Search bar component and render it as the value of `ListHeaderComponent` prop in a FlatList.

Open `App.js` file and add the following prop to the list.

```js
<FlatList
  // rest of the props remain same
  ListHeaderComponent={this.renderHeader}
/>
```

The search bar component is going to be an input field that can take the user's name from the end-user. To build one, let us start by modifying the import statements as below.

```js
import filter from 'lodash.filter';
import {
  ApplicationProvider,
  Text,
  Avatar,
  Input
} from '@ui-kitten/components';
```

Next, modify the `state` object and the following variables to it. The `query` is going to hold the search term when the input is provided. The `fullData` is a temporary array that a handler method is going to filter the user's name on the basis of a query.

```js
state = {
  // add the following
  query: '',
  fullData: []
};
```

Since you are already storing the `results` fetched from the remote API, state variable `data`, let us do the same for `fullData` as well. Add the following inside the handler method `makeRemoteRequest()`.

```js
makeRemoteRequest = () => {
  const { page, seed } = this.state;
  const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
  this.setState({ loading: true });

  fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: page === 1 ? res.results : [...this.state.data, ...res.results],
        error: res.error || null,
        loading: false,

        // ---- ADD THIS ----
        fullData: res.results
      });
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
};
```

Next, add the handler method that is going to handle the search bar. By default, it is going to format the search term provided as a query to lowercase. The user's name is filtered from the state variable `fullData` while the state variable `data` stores the final results after the search to render the correct user.

```js
handleSearch = text => {
  const formattedQuery = text.toLowerCase();
  const data = filter(this.state.fullData, user => {
    return this.contains(user, formattedQuery);
  });
  this.setState({ data, query: text });
};
```

The `contains` handler method is going to look for the query. It accepts two parameters, the first and last name of the user and the formatted query to lowercase from `handleSearch()`.

```js
contains = ({ name, email }, query) => {
  const { first, last } = name;
  if (first.includes(query) || last.includes(query) || email.includes(query)) {
    return true;
  }
  return false;
};
```

Lastly, add `renderHeader` to render the search bar on the UI.

```js
renderHeader = () => (
  <View
    style={{
      backgroundColor: '#fff',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Input
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={this.handleSearch}
      status="info"
      placeholder="Search"
      style={{
        borderRadius: 25,
        borderColor: '#333',
        backgroundColor: '#fff'
      }}
      textStyle={{ color: '#000' }}
    />
  </View>
);
```

That's it to add a search bar to the FlatList component.

## Run the app

To run the app, make sure the `expo start` command is running. Next, go to Expo client and you are going to be prompted by the following screen:

![ss6](https://i.imgur.com/nUcoa0G.png)

Next, try to add a user name from the list being rendered.

![ss7](https://i.imgur.com/KCL5zYz.gif)

## Add clear button to input text field

The last thing I want to emphasize is that using a custom UI component from a UI library such as UI Kitten, you can use general `TextInputProps` from React Native core as well. A few examples are props such as `autoCapitalize`, and `autoCorrect`.

Let us add another prop called `clearButtonMode` that allows the input field to have a clear button appear on the right side. Add the prop to the `Input` inside `renderHeader()`.

```js
<Input
  // rest of the props remain same
  clearButtonMode="always"
/>
```

Now go back to the Expo client and see it in action

![ss8](https://i.imgur.com/fQvxr4j.gif)

## Conclusion

This brings an end to this current tutorial. The screen implemented in this demo is from one of the templates from **Crowdbotics' react-native collection**.

We use UI Kitten for our latest template libraries. Find more about how to create custom screens like this from our open source project [here](https://github.com/crowdbotics/blueprint-react-native-contacts-screen).

You can also find the source code from this tutorial at this [Github repo](https://github.com/amandeepmittal/searchableFlatListDemo).

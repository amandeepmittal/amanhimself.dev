---
title: 'How to use redux-persist in React Native with Asyncstorage'
slug: 'redux-persist-in-react-native-with-async-storage'
date: '2021-01-08'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://jscrambler.com/blog/how-to-use-redux-persist-in-react-native-with-asyncstorage'
---

[Redux persist](https://github.com/rt2zz/redux-persist) is a library that allows saving a Redux store in the local storage of an application. In React Native terms, [Asyncstorage](https://blog.jscrambler.com/how-to-use-react-native-asyncstorage/) is a key value-based, unencrypted, asynchronous storage system that is global and can be used as the local storage for the app.

Using a state management library like [Redux](https://blog.jscrambler.com/asynchronous-operations-in-react-redux/) in a React Native app is beneficial to manage the state of an application from one place. As your application advances in terms of features, you may want to persist some of the information for each user that is local to them.

For example, you are building a shopping cart application and it requires persisting the data related to products a user is adding into the cart before making a purchase order. What if the user closes the application for an arbitrary reason before making that purchase but comes back later and finds that number of items to vanish completely from their cart. This is not a good user experience.

To improve this user experience, you could save the items in their device's local storage. This where redux-persist along with Asyncstorage comes in handy for a React Native app. In this tutorial, we are going to set up the `redux-persist` library in a React Native app that uses Redux as its state management library and preserve the data in Asyncstorage for scenarios where the app is closed.

[The source code is available at this GitHub repo](https://github.com/amandeepmittal/react-native-examples/tree/master/redux-persist-asyncstorage).

## Prerequisites

To follow this tutorial, please make sure you are familiarized with JavaScript/ES6 and meet the following requirements in your local dev environment:

- [Node.js](https://nodejs.org/) version >= `12.x.x` installed.
- Have access to one package manager such as npm or yarn or npx.
- Have a basic understanding of Redux store, actions, and reducers.
- [expo-cli](https://github.com/expo/expo-cli) installed, or use npx

## Create a React Native app with expo-cli

Create a new React Native project using `expo-cli` and then install the dependencies required to build this demo app. Open a terminal window and execute the following commands:

```shell
npx expo init redux-persist-asyncstorage-example

# navigate into that directory
cd redux-persist-asyncstorage-example

yarn add @react-navigation/native @react-navigation/bottom-tabs axios@0.21.0
redux@4.0.5 redux-persist@6.0.0 redux-thunk@2.3.0 react-redux@7.2.2

# install dependencies with Expo specific package version
expo install react-native-gesture-handler react-native-reanimated
react-native-screens react-native-safe-area-context @react-native-community/
masked-view @react-native-async-storage/async-storage
```

After installing these dependencies, let's create two mock screens that are going to be the core screens for the demo app. Create a new `screens/` directory and inside it, create the first screen file `BooksList.js` with the following code snippet:

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BooksListApp() {
  return (
    <View style={styles.container}>
      <Text>BooksList</Text>
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

Then create the second screen file `BookmarksList.js` with the following code snippet:

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BookmarksList() {
  return (
    <View style={styles.container}>
      <Text>BookmarksList</Text>
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

The `BooksList` screen is going to show a list of books. I am going to fetch the data to display the books and will be using [Draftbit's Example API](https://example-data.draftbit.com/) route as the base URL.

Each book item shown on this screen is going to have a functionality for the end-user to bookmark or save it in real-time to view later. All the book items saved by the user are going to be shown in the `BookmarksList` tab.

Since a Base URL is required to fetch the data, let's add it. Create a new directory called `config/` and inside it create a file called `index.js` and export the following Base URL:

```js
export const BASE_URL = 'https://example-data.draftbit.com/books?_limit=10';
```

Now, this Base URL is ready to use to send HTTP requests.

## Add tab navigation to switch between the screens

In this section, let's create a custom tab navigator at the bottom for the app to display the two mock screens created in the previous section. Start by creating a `navigation/` directory and inside a new file called `RootNavigator.js`. Add the following import statements in this file:

```js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import mock screens
import BooksList from '../screens/BooksList';
import BookmarksList from '../screens/BookmarksList';

const Tab = createBottomTabNavigator();
```

To customize the tab bar appearance, let's add some styling and custom icons from the `@expo/vector-icons` library which comes pre-installed with the `expo` package.

```js
const tabBarOptions = {
  showLabel: false,
  inactiveTintColor: '#2D3038',
  activeTintColor: '#FFFFFF',
  style: {
    height: '10%',
    backgroundColor: '#1E1B26'
  }
};

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'BooksList':
      iconName = 'view-dashboard';
      break;
    case 'BookmarksList':
      iconName = 'bookmark-multiple-outline';
      break;
    default:
      break;
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
};
```

The `tabBarOptions` config object is going to customize the appearance of the bottom tab shared between different app screens. The `screenOptions` are used to add a custom icon for each tab.

Lastly, let's define and export the `RootNavigator` component that is going to render these two tab screens.

```js
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="BooksList"
        tabBarOptions={tabBarOptions}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color)
        })}
      >
        <Tab.Screen name="BooksList" component={BooksList} />
        <Tab.Screen name="BookmarksList" component={BookmarksList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
```

To see the `RootNavigator` in action, import it inside the `App.js` file and return it. Add the following code snippet to the `App.js` file:

```js
import React from 'react';

import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return <RootNavigator />;
}
```

To run the application, execute the command `yarn start` from the terminal window.

Here is the output after this step:

![ss1](https://i.imgur.com/BPjPOgp.png)

## Add action types and creators

Using Redux to manage the state of the whole application, the state itself is represented by one JavaScript object. This object is read-only which means that manipulation of the state is not done directly. Changes are done by triggering actions.

Let us begin by defining action types. Create a new directory called `redux/` and inside it create a new file called `actions.js`. Add the following action types to it:

```js
// Define action types
export const GET_BOOKS = 'GET_BOOKS';
export const ADD_TO_BOOKMARK_LIST = 'ADD_TO_BOOKMARK_LIST';
export const REMOVE_FROM_BOOKMARK_LIST = 'REMOVE_FROM_BOOKMARK_LIST';
```

Action types defined in the above file are self-explanatory. The first one, `GET_BOOKS`, is going to be used to make the HTTP request to fetch the data from the Base URL. The second, `ADD_TO_BOOKMARK_LIST`, is going to add each book item to the list of bookmarks. Similarly, the third action type `REMOVE_FROM_BOOKMARK_LIST` is going to remove the book from the list of bookmarks.

An action type is used to trigger the event to update the state stored using Redux. Each action type has action creators for this purpose. The first action creator required in the demo app is to fetch the data from the [Draftbit's Example API](https://example-data.draftbit.com/).

To fetch data, we will use a library called `axios`. It has an API of methods such as `.get`, `.put`, etc. to make the appropriate HTTP requests.

To make the HTTP request to retrieve the data, a `BASE URL` of the API is required. Inside the `actions.js` file, import the `axios` library and the Base URL:

```js
import axios from 'axios';

import { BASE_URL } from '../config';
```

After defining the action types, define a new action creator called `getBooks` that has the action type of `GET_BOOKS` with the following code snippet:

```js
export const getBooks = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
        dispatch({
          type: GET_BOOKS,
          payload: response.data
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};
```

## Add a reducer

Whenever an action has triggered, the state of the application changes. The handling of the application’s state is done by a reducer.

A reducer is a pure function that calculates the next state based on the initial or previous state. It always produces the same output if the state is unchanged. It takes two inputs—the state and action—and must return the default state.

Create a new file in the `redux/` directory called `reducers.js`. Import the action type `GET_BOOKS` and then define the initial state with two empty arrays. Then define a `booksReducer` function that takes `initialState` as the default value for the first argument, and `action` as the second argument.

```js
import { GET_BOOKS } from './actions';

const initialState = {
  books: [],
  bookmarks: []
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, books: action.payload };
    default:
      return state;
  }
}

export default booksReducer;
```

## Configure a store

A store is an object that brings actions and reducers together. It provides and holds state at the application level instead of individual components.

Create a new file called `store.js` inside the `redux/` directory. A store in redux is created using a function called `createStore` that takes the `rootReducer` as the first argument and middleware or a collection of middleware functions as the second argument.

The `rootReducer` is a combination of different reducers across the app. In the demo app, there is only one reducer called `booksReducer`.

The middleware function `thunk` allows a redux store to make asynchronous AJAX requests such as fetching data from an API URL like in this demo app.

Add the following code snippet to it:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import booksReducer from './reducers';

const rootReducer = combineReducers({ booksReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
```

To bind this Redux store in the React Native app, open the entry point file `App.js`. Inside it, import the `store` and the High Order Component `Provider` from the `react-redux` package. This HOC helps to pass the `store` down to the rest of the app such as all components, which are now able to access the state. It is also going to wrap the `RootNavigator` since all screens are children of this custom navigator.

Modify the `App.js` file as shown below:

```js
import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
```

## Fetching data from the API

The `BooksList.js` file is the tab where the data is going to fetch from the Base URL. Import the following statements.

```js
import React, { useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getBooks } from '../redux/actions';
```

To access state from a Redux store, the `useSelector` hook is used. Inside the `BooksList` component, access the `books` from the state.

```js
export default function BooksList() {
  const { books } = useSelector(state => state.booksReducer);

  //...
}
```

To dispatch an action from the Redux store, the `useDispatch` hook is used. To fetch the books from the API, you need to dispatch the action `getBooks`. Add the following code snippet after accessing the state.

```js
const dispatch = useDispatch();

const fetchBooks = () => dispatch(getBooks());

useEffect(() => {
  fetchBooks();
}, []);
```

Next, add return JSX with a `FlatList` component to render the list of books.

The `books` fetched from the API is an array and is passed as the value for the `data`.

```js
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Text style={{ color: 'white', fontSize: 22 }}>Bestsellers</Text>
      <View style={{ flex: 1, marginTop: 8 }}>
        <FlatList
          data={books}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  </SafeAreaView>
);
```

The JSX returned from the `renderItem` contains all the information to display for each book item in the list.

Each book item is going to have:

- a book cover displayed using the `Image` component.
- a book title displayed using the `Text` component.
- some meta information such as the number of pages and the average rating of the book item.
- the touchable button to add the book to the `BookmarksList` screen.

Add the following `renderItem` just before the main `return` function.

```js
const renderItem = ({ item }) => {
  return (
    <View style={{ marginVertical: 12 }}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {/* Book Cover */}
        <Image
          source={{ uri: item.image_url }}
          resizeMode="cover"
          style={{ width: 100, height: 150, borderRadius: 10 }}
        />
        {/* Book Metadata */}
        <View style={{ flex: 1, marginLeft: 12 }}>
          {/* Book Title */}
          <View>
            <Text style={{ fontSize: 22, paddingRight: 16, color: 'white' }}>
              {item.title}
            </Text>
          </View>
          {/* Meta info */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center'
            }}
          >
            <MaterialCommunityIcons
              color="#64676D"
              name="book-open-page-variant"
              size={20}
            />
            <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
              {item.num_pages}
            </Text>
            <MaterialCommunityIcons
              color="#64676D"
              name="star"
              size={20}
              style={{ paddingLeft: 16 }}
            />
            <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
              {item.rating}
            </Text>
          </View>
          {/* Buttons */}
          <View style={{ marginTop: 14 }}>
            <TouchableOpacity
              onPress={() => console.log('Bookmarked!')}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                padding: 2,
                backgroundColor: '#2D3038',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: 40
              }}
            >
              <MaterialCommunityIcons
                color="#64676D"
                size={24}
                name="bookmark-outline"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
```

Here is the output you are going to get after this step:

![ss2](https://i.imgur.com/x0meApG.png)

## Add action creators and update the reducer

In the `redux/action.js` file, let's add two more action creators that are going to update the state when the bookmarks are added or removed by the user. Each action creator is going to be based on the action type we defined earlier. Also, each action creator is going to accept the book item that is added to the bookmark list.

```js
export const addBookmark = book => dispatch => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: book
  });
};

export const removeBookmark = book => dispatch => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: book
  });
};
```

The next step is to update the state of the redux store. Open `redux/reducers.js` and modify the following code snippet to perform the actions we just added.

```js
import {
  GET_BOOKS,
  ADD_TO_BOOKMARK_LIST,
  REMOVE_FROM_BOOKMARK_LIST
} from './actions';

const initialState = {
  books: [],
  bookmarks: []
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, books: action.payload };
    case ADD_TO_BOOKMARK_LIST:
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_FROM_BOOKMARK_LIST:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default booksReducer;
```

## Configure and integrate redux persist

Import the following statements inside `redux/store.js` file to create a persisted reducer.

```js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
```

Then, add a `persistConfig` object with the following properties:

```js
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks']
};
```

In the above snippet, the `key` and `storage` are required to create the config for a persisted reducer. The `storage` has the value of the storage engine which is used to save and persist the data. In React Native, it is essential to pass the value of the `storage` explicitly. In the current demo app, let's use `AsyncStorage`.

The `whitelist` takes an array of strings. It is used to define which object key to use from the initial state to save the data. If no `whitelist` is provided, then redux persists both `books` and `bookmarks`. Providing `bookmarks` as the value of the `whitelist` is going to only save the data that is in the `bookmarks` array (_which is empty at the moment but will be populated later when a bookmark is added or removed_).

Then, update `rootReducer` with the persisted reducer with two arguments: `persistConfig` and `booksReducer`.

Also, export the `persistor`. It is an object that is returned by `persistStore` which wraps the original `store`.

```js
const rootReducer = combineReducers({
  booksReducer: persistReducer(persistConfig, booksReducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
```

In React Native apps, you have to wrap the root component with `PersistGate`. This component delays the rendering of the app's UI until the persisted state is retrieved and saved to redux.

Import the `PersistGate` from the `redux-persist` library and import `persistor` from the `redux/store` file in the `App.js` file:

```js
// Add
import { PersistGate } from 'redux-persist/integration/react';

// Modify to add persistor
import { store, persistor } from './redux/store';

// Then, modify the JSX returned from App component
// Wrap the root component with PersistGate
return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootNavigator />
    </PersistGate>
  </Provider>
);
```

That's it to configure and integrate the `redux-persist` library to the React Native and Redux application.

## Create functionality to add or remove a bookmark

All book items are shown in the `BooksList.js` file that is fetched from the API. It is from the tab screen that a user can add or remove a bookmark to a book item.

Let's start by importing other action creators as well:

```js
// Modify
import { getBooks, addBookmark, removeBookmark } from '../redux/actions';
```

The `booksReducer` is used to access the state. Modify it to access the `bookmarks` array:

```js
const { books, bookmarks } = useSelector(state => state.booksReducer);
```

Now, dispatch two actions using the `useDispatch` hook and create their handler functions. These handler functions are going to be triggered when the touchable component is pressed by the user. Each handler function is going to accept one argument and that is the current book item from `FlatList`.

```js
const addToBookmarkList = book => dispatch(addBookmark(book));
const removeFromBookmarkList = book => dispatch(removeBookmark(book));

const handleAddBookmark = book => {
  addToBookmarkList(book);
};

const handleRemoveBookmark = book => {
  removeFromBookmarkList(book);
};
```

Let's add another handler function called `ifExists` that is going to dynamically change the UI of the app based on the action triggered. This function is going to use `filter` on the `bookmarks` array to make the changes on the UI based on whether a book item already exists in the array (that is stored on the AsyncStorage) or not.

```js
const ifExists = book => {
  if (bookmarks.filter(item => item.id === book.id).length > 0) {
    return true;
  }

  return false;
};
```

Modify the `TouchableOpacity` component to dynamically change the UI of the app when an action is triggered to add or remove an item from the bookmarks list.

```js
<TouchableOpacity
  onPress={() =>
    ifExists(item) ? handleRemoveBookmark(item) : handleAddBookmark(item)
  }
  activeOpacity={0.7}
  style={{
    // rest remains same
    backgroundColor: ifExists(item) ? '#F96D41' : '#2D3038'
    //
  }}
>
  <MaterialCommunityIcons
    color={ifExists(item) ? 'white' : '#64676D'}
    size={24}
    name={ifExists(item) ? 'bookmark-outline' : 'bookmark'}
  />
</TouchableOpacity>
```

## Display bookmarks

Any book item that is bookmarked is going to be shown in the `BookmarksList.js` tab. Apart from displaying the list of bookmarked items, it is also going to have the functionality of removing book item from the list.

Start by importing the following statements. This time, only import `removeBookmark` action creator.

```js
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { removeBookmark } from '../redux/actions';
```

Using the `useSelector` hook allows us to access the `bookmarks` state. Then, using the `useDispatch` hook defines the action creator and handler function to remove a book from the bookmarks list.

```js
export default function BookmarksList() {
  const { bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  const removeFromBookmarkList = book => dispatch(removeBookmark(book));

  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };

  //...
}
```

Lastly, the UI of this tab screen is going to be similar to that of the `BooksList.js` tab. Using the `FlatList` component, let's show the list of all the items that are bookmarked.

If there are no items that are bookmarked, let's display a simple message to convey that. This is done by checking the length of the `bookmarks` array from the state.

Here is the complete JSX snippet returned by the `BookmarksList` tab component:

```js
export default function BookmarksList() {
  // ...
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 12 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {/* Book Cover */}
          <Image
            source={{ uri: item.image_url }}
            resizeMode="cover"
            style={{ width: 100, height: 150, borderRadius: 10 }}
          />
          {/* Book Metadata */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            {/* Book Title */}
            <View>
              <Text style={{ fontSize: 22, paddingRight: 16, color: 'white' }}>
                {item.title}
              </Text>
            </View>
            {/* Meta info */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center'
              }}
            >
              <MaterialCommunityIcons
                color="#64676D"
                name="book-open-page-variant"
                size={20}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.num_pages}
              </Text>
              <MaterialCommunityIcons
                color="#64676D"
                name="star"
                size={20}
                style={{ paddingLeft: 16 }}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.rating}
              </Text>
            </View>
            {/* Buttons */}
            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => handleRemoveBookmark(item)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: '#2D3038',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40
                }}
              >
                <MaterialCommunityIcons
                  color="#64676D"
                  size={24}
                  name="bookmark-remove"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>Bookmarks</Text>
        <View style={{ flex: 1, marginTop: 8 }}>
          {bookmarks.length === 0 ? (
            <Text style={{ color: '#64676D', fontSize: 18 }}>
              Add a book to bookmark list.
            </Text>
          ) : (
            <FlatList
              data={bookmarks}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Running the app

Go to the simulator or the real device where you are running the Expo client, and you can test the functionality by adding or removing the bookmark to an item. Also, notice the dynamic UI changes of the bookmark button in the first tab.

![ss3](https://i.imgur.com/ckD9Pcc.gif)

Make sure to close the Expo client and then start it to see if the state from the Redux store persists or not.

![ss4](https://i.imgur.com/tP4SSP5.gif)

And that's it! I hope you have found this tutorial helpful.

## Further Reading

- [Deep Dive Into React - Separation of Concerns by Andrei Calazans](https://www.g2i.co/blog/react-separation-of-concerns)

_Originally published at [Jscrambler.com](https://jscrambler.com/blog/how-to-use-redux-persist-in-react-native-with-asyncstorage)_

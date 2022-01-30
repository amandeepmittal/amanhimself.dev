---
title: 'Implementing Infinite Scroll with React Query and FlatList in React Native'
date: '2022-01-30'
slug: 'infinite-scroll-with-react-query-and-flatlist-in-react-native'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://blog.jscrambler.com/implementing-infinite-scroll-with-react-query-and-flatlist-in-react-native/'
---

> Originally published at [Jscrambler.com](https://blog.jscrambler.com/implementing-infinite-scroll-with-react-query-and-flatlist-in-react-native/)

Infinite Scrolling is a way to implement pagination in mobile devices. It is common among mobile interfaces due to the limited amount of space. If you use social media applications like Instagram or Twitter, this implementation is commonly used across those apps.

In this tutorial, let's learn how to implement an infinite scroll using the FlatList component in React Native. To fetch data, we will use a real REST API service provided by [RAWG](https://rawg.io/apidocs). It is one of the largest video game databases, and they have a free tier when it comes to using their API for personal or hobby projects. React Query library will help us make the process of fetching data a lot smoother.

## Prerequisites

To follow this tutorial, please make sure you have the following tools and utilities installed on your local development environment and have access to the services mentioned below:

- [Node.js](https://nodejs.org/en/) version `12.x.x` or above installed
- Have access to one package manager such as npm or yarn or npx
- [RAWG API key](https://rawg.io/apidocs)

You can also check the [complete source code for this example is at this GitHub repo](https://github.com/amandeepmittal/react-native-examples/tree/main/infinite-scroll-with-react-query).

## Creating a new React Native app

To create a new React Native app, let's generate a project using [create-react-native-app](https://github.com/expo/create-react-native-app) command-line tool. This tool helps create universal React Native apps, supports React Native Web, and you can use native modules. It is currently being maintained by the awesome Expo team.

Open up a terminal window and execute the following command:

```shell
npx create-react-native-app

# when prompted following questions
What is your app named? infinite-scroll-with-react-query
How would you like to start › Default new app

# navigate inside the project directory after it has been created
cd infinite-scroll-with-react-query
```

Then, let's install all the dependencies that will be used to create the demo app. In the same terminal window:

```shell
yarn add native-base react-query && expo install react-native-safe-area-context react-native-svg
```

This command should download all the required dependencies. To run the app in its vanilla state, you can execute either of the following commands (depending on the mobile OS you're using). These commands will build the app.

```shell
# for iOS
yarn ios

# for android
yarn android
```

## Creating a Home Screen

Let's create a new directory called `/src`. This directory will contain all the code related to the demo app. Inside it, create a sub-directory called `/screens` that will contain the component file, `HomeScreen.js`.

In this file, let's add some JSX code to display the title of the app screen.

```js
import React from 'react';
import { Box, Text, Divider } from 'native-base';

export const HomeScreen = () => {
  return (
    <Box flex={1} safeAreaTop backgroundColor="white">
      <Box height={16} justifyContent={'center'} px={2}>
        <Text fontSize={28} fontWeight={'600'} color={'emerald.500'}>
          Explore Games
        </Text>
      </Box>
      <Divider />
    </Box>
  );
};
```

The `Box` component from NativeBase is a generic component. It comes with many props, a few of them are to apply SafeAreaView of the device. The prop `safeAreaTop` applies padding from the top of the device's screen. One advantage of using the NativeBase library is its built-in components provide props like handling safe area views.

Most NativeBase components also use utility props for most commonly used styled properties such as `justifyContent`, `backgroundColor`, etc., and shorthands for these utility props such as `px` for padding horizontal.

## Setting up providers

Both NativeBase and React Query libraries require their corresponding providers to set up at the root of the app. Open the `App.js` file and add the following:

```js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';

import { HomeScreen } from './src/screens/HomeScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NativeBaseProvider>
        <QueryClientProvider client={queryClient}>
          <HomeScreen />
        </QueryClientProvider>
      </NativeBaseProvider>
    </>
  );
}
```

All the providers must wrap the entry point or the first screen of the application. In the above snippet, there is only one screen, so all the providers are wrapping `HomeScreen`.

The `QueryClientProvider` component provides an instance in the form of `QueryClient` that can be further used to interact with the cache.

After modifying `App.js`, you will get the following output on a device:

![ss1](https://i.imgur.com/aFep48m.png)

## Add a Base URL to use RAWG REST API

If you want to continue reading this post and build along with the demo app, make sure you have access to the API key for your RAWG account. Once you've done that, create a new file called `index.js` inside the `/src/config` directory. This file will export the base url of the API and API key.

```js
const BASE_URL = 'https://api.rawg.io/api';
// Replace the Xs below with your own API key
const API_KEY = 'XXXXXX';

export { BASE_URL, API_KEY };
```

Replace the Xs in the above snippet with your own API key.

## Fetching data from the API

To fetch the data, we will use JavaScript `fetch` API method. Create a new file called `index.js` inside `/src/api`. It will import the base url and the API key from the `/config` directory and expose a function that fetches the data.

```js
import { BASE_URL, API_KEY } from '../config';

export const gamesApi = {
  // later convert this url to infinite scrolling
  fetchAllGames: () =>
    fetch(`${BASE_URL}/games?key=${API_KEY}`).then(res => {
      return res.json();
    })
};
```

Next, in the `HomeScreen.js` file, import React Query hook called `useQuery`. This hook accepts two arguments. The first argument is a unique key. This key is a unique identifier in the form of a string. It tracks the result of the query and caches it.

The second argument is a function that returns a promise. This promise is resolved when there is data or throws an error when there is something wrong when fetching the data. We've already created the promise function that fetches data asynchronously from the API's base Url in the form of `gamesApi.fetchAllGames()`. Let's import the `gamesApi` as well.

Inside the `HomeScreen`, let's call this hook to get the data.

```js
import React from 'react';
import { Box, Text, FlatList, Divider, Spinner } from 'native-base';
import { useQuery } from 'react-query';

import { gamesApi } from '../api';

export const HomeScreen = () => {
  const { isLoading, data } = useQuery('games', gamesApi.fetchAllGames);

  const gameItemExtractorKey = (item, index) => {
    return index.toString();
  };

  const renderData = item => {
    return (
      <Text fontSize="20" py="2">
        {item.item.name}
      </Text>
    );
  };

  return isLoading ? (
    <Box
      flex={1}
      backgroundColor="white"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="emerald.500" size="lg" />
    </Box>
  ) : (
    <Box flex={1} safeAreaTop backgroundColor="white">
      <Box height={16} justifyContent={'center'} px={2}>
        <Text fontSize={28} fontWeight={'600'} color={'emerald.500'}>
          Explore Games
        </Text>
      </Box>
      <Divider />
      <Box px={2}>
        <FlatList
          data={data.results}
          keyExtractor={gameItemExtractorKey}
          renderItem={renderData}
        />
      </Box>
    </Box>
  );
};
```

In the above snippet, take a note that React Query comes with the implementation of request states such as `isLoading`. The `isLoading` state implies that there is no data and is currently in the "fetching" state. To improve the user experience, while the `isLoading` state is true, a loading indicator or a spinner component can be displayed (as did in the above snippet using the `Spinner` component from NativeBase).

Here is the output after this step:

![ss2](https://i.imgur.com/jSX1Aqu.gif)

## Adding pagination to the API request

The `useInfiniteQuery` hook provided by the React Query library is a modified version of the `useQuery` hook. In addition to the request states such as `isLoading` and `data`, it utilizes a function to get the next page number using `getNextPageParam`.

In the case of RAWG REST API, the data fetch on each request contains the following keys:

- `count`: the total count of games.
- `next`: the url to the next page.
- `previous`: the url of the previous page. Is `null` if the current page is first.
- `results`: the array of items on an individual page.

The key names `next`, and `previous` will depend on the response structure of the API request. Make sure to check your data response what are the key names and what are their values.

Currently, the API request made in the `/api/index.js` file does not consider the number of the current page. Modify as shown below to fetch the data based on the page number.

```js
export const gamesApi = {
  // later convert this url to infinite scrolling
  fetchAllGames: ({ pageParam = 1 }) =>
    fetch(`${BASE_URL}/games?key=${API_KEY}&page=${pageParam}`).then(res => {
      return res.json();
    })
};
```

The addition `&page=${pageParam}` in the above snippet is how the `getNextPageParam` function will traverse to the next page if the current page number is passed in the request endpoint. Initially, the value of `pageParam` is `1`.

## Using useInfiniteQuery hook

Let's import the `useInfiniteQuery` hook in the `HomeScreen.js` file.

```js
// rest of the import statements remain same
import { useInfiniteQuery } from 'react-query';
```

Next, inside the `HomeScreen` component, replace the `useQuery` hook with the `useInfiniteQuery` hook as shown below. Along with the two arguments, the new hook will also contain an object as the third argument. This object contains the logic to fetch the data from the next page using the `getNextPageParam` function.

The function retrieves the page number of the next page. It accepts a parameter called `lastPage` that contains the response of the last query. As per the response structure we discussed earlier in the previous section, check the value of `lastPage.next`. If it is not `null`, return the next page's number. If it is `null`, return the response from the last query.

```js
const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
  'games',
  gamesApi.fetchAllGames,
  {
    getNextPageParam: lastPage => {
      if (lastPage.next !== null) {
        return lastPage.next;
      }

      return lastPage;
    }
  }
);
```

## Implementing infinite scroll on FlatList

In the previous snippet, the `hasNextPage` and `fetchNextPage` are essential. The `hasNextPage` contains a boolean. If it is `true`, it indicates that more data can be fetched. The `fetchNextPage` is the function provided by the `useInfiniteQuery` to fetch the data of the next page.

Add a handle method inside the `HomeScreen` component called `loadMore`. This function will be used on the FlatList prop called `onEndReached`. This prop is called when the scroll position reaches a threshold value.

```js
const loadMore = () => {
  if (hasNextPage) {
    fetchNextPage();
  }
};
```

Another difference between `useInfiniteQuery` and `useQuery` is that the former's response structure includes an array of fetched pages in the form of `data.pages`. Using JavaScript `map` function, get the `results` array of each page.

Modify the `FlatList` component as shown below:

```js
<FlatList
  data={data.pages.map(page => page.results).flat()}
  keyExtractor={gameItemExtractorKey}
  renderItem={renderData}
  onEndReached={loadMore}
/>
```

Here is the output after this step. Notice the scroll indicator on the right-hand side of the screen. As soon as it reaches a little below half of the list, it repositions itself. This repositioning indicates that the data from the next page is fetched by the `useInfiniteQuery` hook.

![ss3](https://i.imgur.com/IiJMVA7.gif)

The default value of the threshold is `0.5`. This means that the `loadMore` will get triggered at the half-visible length of the list. To modify this value, you can add another prop, `onEndReachedThreshold`. It accepts a value between 0 and 1, where 0 is the end of the list.

```js
<FlatList
  data={data.pages.map(page => page.results).flat()}
  keyExtractor={gameItemExtractorKey}
  renderItem={renderData}
  onEndReached={loadMore}
  onEndReachedThreshold={0.3}
/>
```

## Display a spinner when fetching next page data

Another way to enhance the user experience is when the end of the list is reached, and the data of the next page is still being fetched (let's say, the network is weak). While the app user waits for the data, it is good to display a loading indicator.

The `useInfiniteQuery` hook provides a state called `isFetchingNextPage`. Its value will be true when the data from the next page is fetched using `fetchNextPage`.

Modify the `HomeScreen` component as shown below. The loading spinner renders when the value of `isFetchingNextPage` is true. The `ListFooterComponent` on the FlatList component is used to display the loading indicator at the end of the list items.

```js
export const HomeScreen = () => {
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery('games', gamesApi.fetchAllGames, {
      getNextPageParam: lastPage => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }

        return lastPage;
      }
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderSpinner = () => {
    return <Spinner color="emerald.500" size="lg" />;
  };

  const gameItemExtractorKey = (item, index) => {
    return index.toString();
  };

  const renderData = item => {
    return (
      <Box px={2} mb={8}>
        <Text fontSize="20">{item.item.name}</Text>
      </Box>
    );
  };

  return isLoading ? (
    <Box
      flex={1}
      backgroundColor="white"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="emerald.500" size="lg" />
    </Box>
  ) : (
    <Box flex={1} safeAreaTop backgroundColor="white">
      <Box height={16} justifyContent={'center'} px={2}>
        <Text fontSize={28} fontWeight={'600'} color={'emerald.500'}>
          Explore Games
        </Text>
      </Box>
      <Divider />
      <Box px={2}>
        <FlatList
          data={data.pages.map(page => page.results).flat()}
          keyExtractor={gameItemExtractorKey}
          renderItem={renderData}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        />
      </Box>
    </Box>
  );
};
```

Here is the output:

![ss4](https://i.imgur.com/uLmbrjC.gif)

## Wrapping up

In this tutorial, you've successfully implemented infinite scroll using `useInfiniteQuery` from React Query. Using this library for fetching and managing data inside a React Native app takes away a lot of pain points. Make sure to check out the [Infinite Queries](https://react-query.tanstack.com/guides/infinite-queries) documentation here.

You can also check the [complete source code for this example is at this GitHub repo](https://github.com/amandeepmittal/react-native-examples/tree/main/infinite-scroll-with-react-query).

---
title: 'How to integrate GraphQL and Apollo Client in React Native app'
slug: 'integrate-apollo-client-in-react-native'
date: '2020-05-11'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://blog.crowdbotics.com/integrate-graphql-and-apollo-client-in-react-native-app/'
---

Apollo has an entire ecosystem of tools to build GraphQL applications regardless of the frontend framework or library you intend to use. You can use it to develop client-side and server-side apps separately. Apollo has more features and support than its open-source competitors in GraphQL for JavaScript world.

In this tutorial, let us build a small demo app. In this app, you are going to use a third party API endpoint to fetch a list of crypto currencies. This API endpoint is going to be based on REST so a thing you are going to learn is how to make use of Apollo Client to fetch results from a REST endpoint using GraphQL query language.

I am going to use Expo CLI to quickly get started with a React Native project and focus on the purpose of learning, that is, integrating Apollo Client in a React Native app. If you are familiar with React Native CLI, you can go ahead and use it instead of Expo CLI.

## Requirements

- Nodejs version <= `10.x.x` installed
- watchman installed
- have access to one package manager such as npm or yarn
- use react native version 0.60.x or above
- `expo-cli` at least `3.11.9`

## Installing dependencies

To get started with a new Expo project, run the below command from a terminal window to generate a React Native project based on Expo SDK `36.x.x` or above.

```shell
npx expo init rnApolloCryptoListDemo

# after the project directory is generated
cd rnApolloCryptoListDemo
```

I chose Expo over plain React-Native because it includes most of the dependencies that we need so there is less work to do for us.

Let's install all the required dependencies to integrate Apollo Client and request the REST endpoint using GraphQL queries.

```shell
yarn add apollo-client apollo-cache-inmemory
graphql-tag apollo-link-rest apollo-link
graphql graphql-anywhere qs @apollo/react-hooks
```

Lastly, let us install the react-navigation dependencies that will allow us to add a stack navigator to our app. For this, make sure to use `expo install`.

```shell
expo install react-native-gesture-handler react-native-reanimated
react-native-screens react-native-safe-area-context
@react-native-community/masked-view react-navigation-stack
```

After you run these two commands you should be ready to go. Let's start implementing the app!

## Set up a Stack Navigator

In this section, let us set up a basic navigation flow of our app. The idea you have to implement is that whenever the user touches a coin from the list screen (that is going to be the initial route or screen of the app), the stack navigator pushes another screen to display the details of that particular coin.

To start, create a `src/` directory at the root of the project and then inside it, create another directory called `screens`. In this directory, create two new screen files: `CoinsList.js` and `CoinDetail.js`. Each of these screen component files is going to display a title of the screen and a button to navigate from `CoinsList` to `CoinDetail`.

Here is the code snippet for `screens/CoinsList.js`:

```js
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

function CoinsList(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Coins List</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
        <Text style={styles.boldText}>Go to Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boldText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default CoinsList;
```

In the above snippet, observe that props are coming from `react-navigation` which is yet to set up. Each screen component that becomes the part of the react-navigation flow, has access to these props.

Here is the code snippet for `screens/CoinDetail.js`:

```js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function CoinDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Coin Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boldText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default CoinDetail;
```

Now, create another directory `src/navigation`. Inside it, create a file called `MainStackNavigator.js`

```js
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CoinsList from '../screens/CoinsList';
import CoinDetail from '../screens/CoinDetail';

const MainStack = createStackNavigator(
  {
    Coins: {
      screen: CoinsList
    },
    Detail: {
      screen: CoinDetail
    }
  },
  {
    initialRouteName: 'Coins'
  }
);

export default MainStack;
```

Next, create another file `AppNavigator.js` with the following code snippet:

```js
import React from 'react';
import { createAppContainer } from 'react-navigation';

import MainStack from './MainStackNavigator';

export default createAppContainer(MainStack);
```

Lastly, to see this navigational flow in action, open `App.js` file and make sure you import `AppNavigator` from `AppNavigator.js` file.

```js
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
```

That's it. Our basic navigational flow is ready to be tested. Open the terminal window and execute `expo start`. Open your choice of simulator or device and make sure it has an Expo client as an app installed.

Here is the demo of the navigational flow we have set up so far.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss1.gif' />

# How to configure Apollo Client in a React Native app

In this section, let us integrate Apollo Client such that we are able to fetch the data from the REST endpoint. Start by creating a new directory `src/graphql` inside which also create a new file `Client.js`.

The `apollo-client` package along with `apollo-cache-inmemory` and `apollo-link` is a fully-featured GraphQL client that can be integrated into React or React Native apps. Let us import all three of them inside this file.

```js
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
```

The apollo-link-rest package allows you to use third-party APIs that do not have GraphQL endpoints or have REST endpoints but what you want to transmit them into GraphQL.

The API endpoint we are going to use is a REST endpoint from [CryptoCompare.com](https://www.cryptocompare.com/). Make sure, at this point, you have access to the API Key (_that is free at the time of writing this tutorial_). Their API offers many endpoints for different use case but we are going to use fetch a number of top coins by their total volume across all markets in the last 24 hours.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss2.png' />

Add a RestLink for the Rest API endpoint and pass headers which is an object representing values to be sent as headers on the request. The value you need to sent while requesting data from the API endpoint is the API key.

```js
const restLink = new RestLink({
  uri: 'https://min-api.cryptocompare.com',
  headers: {
    Authorization:
      'd251970548f7321b548d3fb61d58c1a456974ea02ba41437fc9bf711f4e89782'
  }
});
```

Add the following configuration with the default cache and RestLink to complete the configuration of Apollo Client.

```js
export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});
```

Now, open the `App.js` file to wrap the current root of the app (_`<AppNavigator/>`_) with `ApolloProvider`. This provider is similar to React's Context.Provider and places the Apollo Client on the context. This makes them accessible to Apollo Client easily and from anywhere inside the component tree.

Start by importing `client` from `src/graphql/Client.js` and `ApolloProvider` from `@apollo/react-hooks` and use it to wrap `AppNavigator`.

```js
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './src/graphql/Client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
}
```

## Writing your first GraphQL query

In this section, let us write a query to hook the Apollo Client to fetch results from the REST API endpoint. However, the query is going to be made in GraphQL query language with the help of `graphql-tag`.

In the `src/graphql` directory, create a new file called `Queries.js` and import `graphql-tag`.

```js
import gql from 'graphql-tag';
```

Export `FETCH_COIN_LIST` using a template from the `gql` tag. Add a query that is going to fetch the top cryptocurrency list from the API endpoint. Using the `@rest` directive Apollo manages how to parse this query.

```graphql
export const FETCH_COIN_LIST = gql`
  query FetchCoinsList {
    coinsList
      @rest(type: "ListPayload", path: "/data/top/totalvolfull?tsym=USD") {
      Data @type(name: "DataPayload") {
        CoinInfo @type(name: "CoinInfoPayload") {
          Id
          Name
          FullName
        }
        DISPLAY @type(name: "DisplayPayload") {
          USD @type(name: "USDPayLoad") {
            PRICE
            OPENDAY
            HIGHDAY
            LOWDAY
            OPEN24HOUR
          }
        }
      }
    }
  }
`;
```

The data structure fetched from this API endpoint in JSON format looks like below:

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss3.png' />

## Make a request to REST endpoint with Apollo Client

Open the file `screens/CoinsList.js` and import the `FETCH_COIN_LIST` query as well as the `useQuery` hook from `@apollo/react-hooks`.

```js
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_COIN_LIST } from '../graphql/Queries';
```

In the above code snippet, let us import React hook `useEffect` just to test that the endpoint is fetching data as per our needs. The data fetched is going to be displayed in a console statement that you can view using Remote JS Debugger and Console tab in the Developer Tools of a web browser.

The hook `useQuery` can be used to make the request to the API endpoint by referencing the query `FETCH_COIN_LIST`.After being called, it returns a result object with a set of properties. We only need two properties for now: `loading` and `data`. Destructure this query hook inside the `CoinsList` functional component as shown below.

```js
function CoinsList(props) {
  // ...
  const { loading, data } = useQuery(FETCH_COIN_LIST);
  // ...
}
```

Then, using `useEffect` to, you can fetch the result from the Query.

```js
function CoinsList(props) {
  // ...
  useEffect(() => {
    console.log(data);
  }, []);
  // ...
}
```

Make sure the `expo start` command is running from the terminal window. Then, go the Expo client either on a real device or a simulator, open the developer menu on a Mac using:

- if on iOS simulator, press `Ctrl-Cmd-Z`
- if on Android emulator, press `Cmd+M`
- if using a real device, just shake your device a bit

This is what the developer menu in an Expo client looks like:

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss4.png' />

Choose the option `Debug Remote JS`. A debugger like below should appear in your default web browser.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss5.png' />

Open the `Console` tab from the `Developer Tools` of the web browser. You are going to get the following result.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss6.png' />

That's it! The Apollo integration is working and you can start displaying the data in the app.

## Add an ActivityIndicator while fetching results

The `useQuery` hook gives one property called `loading` that can be used to indicate on the device's screen when the query is in the process of fetching the result. Using the `ActivityIndicator`, a loading indicator can be displayed.

Import the `ActivityIndicator` component from react-native in the file `CoinsList.js`.

```js
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
```

Next, modify the return statements as follows.

```js
if (loading && !data) {
  return (
    <View style={styles.loadingIndicatorContainer}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
return (
  <View style={styles.container}>
    <Text style={styles.boldText}>Coins List</Text>
  </View>
);
```

Lastly, do not forget to add the corresponding styles for the `View` that wraps the loading indicator.

```js
const styles = StyleSheet.create({
  // ... rest of the styles
  loadingIndicatorContainer: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
```

Now go back to the Expo client and see the result yourself.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss7.gif' />

## Display data in a list using FlatList

To display a list of items, let us create a separate component that can be reused for a different purpose if the scope of this app gets larger.

Create a new directory called `src/components` within a new file `ListItem.js`.

This component is going to display the name, full name and the price of the component, all inside a touchable button that is going to navigate to the `Detail` screen you created earlier.

Begin by importing the core components from `react-native`.

```js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
```

With some destructuring from the incoming props `coin` (that is going to be passed from `CoinsList.js` soon), add a functional component called `ListItem`.

```js
function ListItem(props) {
  const { coin, onPress } = props;
  const { CoinInfo, DISPLAY } = coin;
  const { FullName, Name } = CoinInfo;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(coin)}
    >
      <View style={styles.row}>
        <Text style={styles.text} numberOfLines={1}>
          {Name}
        </Text>
        <View style={styles.right}>
          <Text style={styles.text} numberOfLines={1}>
            {DISPLAY.USD.PRICE}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[styles.text, styles.name]} numberOfLines={1}>
          {FullName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
```

Add the corresponding styles to the above component and do not forget to export it.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  active: {
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500'
  },
  name: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
    fontWeight: '300'
  }
});

export default ListItem;
```

Now, import this component inside `CoinsList.js`.

```js
import ListItem from '../components/ListItem';
```

Also, import the `FlatList` component that is going to render the list of coins, from the `react-native` core.

```js
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
```

Now, add this `FlatList` component wrapped inside the root `View` component like below.

```js
return (
  <View style={styles.container}>
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      data={data.coinsList.Data}
      keyExtractor={item => item.CoinInfo.Id.toString()}
      renderItem={({ item }) => {
        return (
          <ListItem
            coin={item}
            onPress={() => navigation.navigate('Detail', { coin: item })}
          />
        );
      }}
    />
  </View>
);
```

Modify the `container` styles.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  }
  // ... rest of the styles remain same
});
```

Now, go back to the simulator device and you are going to get the following result.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss8.png' />

On touching one of the coins from the list, it is going to take the user to the `Detail` screen which for now, does not contain any details. This is navigation is done by using `navigation` props from the `react-navigation` library. Do note that, the params `coin` is also getting passed. This will be useful when displaying the data on the `Detail` screen from the same GraphQL query.

For now, you can see that the navigation works.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss9.gif' />

## Completing the Detail Screen

Since all the props are being passed from the CoinsList to the Detail screen as well as the navigation pattern working, let us set up the `Detail` screen now.

Open `screen/CoinDetail.js` file and start by importing the following core components.

```js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
```

Then, using some destructuring from the props, add them to the functional component `CoinDetail`.

```js
function CoinDetail(props) {
  const { navigation } = props;
  const { state } = navigation;
  const { params } = state;
  const { coin } = params;
  const { CoinInfo, DISPLAY } = coin;
  const { FullName, Name } = CoinInfo;
  const { USD } = DISPLAY;
  const { PRICE, OPENDAY, HIGHDAY, LOWDAY, OPEN24HOUR } = USD;

  // ...
}
```

After the destruction, add the JSX to be returned.

```js
return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text numberOfLines={1} style={styles.text}>
        {Name} - {FullName}
      </Text>
      <Text style={styles.priceText} numberOfLines={1}>
        Price: {PRICE}
      </Text>
    </View>
    <View style={styles.statsContainer}>
      <View>
        <View style={styles.statRow}>
          <Text style={styles.stat} numberOfLines={1}>
            Open Day
          </Text>
          <Text style={styles.stat} numberOfLines={1}>
            {OPENDAY}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.stat} numberOfLines={1}>
            Highest in a day
          </Text>
          <Text style={styles.stat} numberOfLines={1}>
            {HIGHDAY}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.stat} numberOfLines={1}>
            Lowest in a day
          </Text>
          <Text style={styles.stat} numberOfLines={1}>
            {LOWDAY}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.stat} numberOfLines={1}>
            Open in 24 hours
          </Text>
          <Text style={styles.stat} numberOfLines={1}>
            {OPEN24HOUR}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
```

Lastly, do not forget to add the corresponding styles to the above JSX using the `StyleSheet` object.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 32,
    color: '#161616'
  },
  priceText: {
    fontSize: 24,
    color: '#161616'
  },
  statsContainer: {
    flex: 62,
    backgroundColor: '#161616'
  },
  statRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stat: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  }
});
```

On visiting the detail of any Coin in the list, the following is going to be displayed.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss10.png' />

## Display coin name in the header in the Detail screen

The last piece of functionality that you could add to make the current app look better is to display the name of the coin instead of `Detail`.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss11.png' />

To do this, all you have to do is add the following snippet:

```js
CoinDetail.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('coin').CoinInfo.Name
});
```

Each screen component in your app is provided with the `navigation` prop automatically. This prop contains various convenience functions that dispatch navigation actions on the route's router. Using `screenProps`, this library allows you to access the props of the current screen.

Now, go back to the app and open the details of any coin from the list rendered. You are going to notice that the short name of the coin is displayed in the header as shown below.

<img src='https://crowdbotics.ghost.io/content/images/2020/02/ss12.png' />

## Conclusion

That's it for this tutorial. I hope you learned how to use rest endpoint and integrate Apollo Client to any API endpoint to query desired results in a React Native and Expo app. Moreover, I hope you have seen a good use case of creating stack navigators too from the `react-navigation` library.

Originally published at [Crowdbotics' blog](https://crowdbotics.ghost.io/integrate-graphql-and-apollo-client-in-react-native-app/).

---
title: 'Introduction to Apollo Client with GraphQL and React'
date: 2019-07-10
slug: 'blog/introduction-to-apollo-client-with-graphql-react'
thumbnail: '../thumbnails/graphql.png'
tags:
  - react
  - graphql
canonicalUrl: 'https://blog.crowdbotics.com/introduction-to-apollo-client-with-graphql-react-and-crowdbotics/'
---

In the last few years, GraphQL has gone popular choice to build an API. It also serves a great equivalent and alternative to REST approach. GraphQL is an open source query language to develop an API. In contrast to REST, which is an architecture or _'a way of doing things'_, graphQL was developed with a concept in mind that a client requests only the desired set of items from the server in a single request.

**In this tutorial, you will be learning how to integrate and work with Apollo Client with a Reactjs application.** I will be walking you through from the basics of what Apollo Client is, how to connect it to the server and for demonstration build a small React app using the Apollo tools.

To learn more about the basics of GraphQL, how it differs from REST, its building blocks like schema, resolvers, queries, and mutations, please refer to the previous post [**Creating a GraphQL Server with Nodejs**](https://medium.com/crowdbotics/creating-a-graphql-server-with-nodejs-ef9814a7e0e6).

**TLDR;**

- Requirements
- What is Apollo Client?
- Getting Started: Create a React App
- Creating your first Apollo Client
- Connect Apollo Client and React App
- Request Data from Remote GraphQL API in React app
- Connecting Crowdbotics support to Your Github Repo
- Conclusion
- Bonus: _Challenge_

### Requirements

In order to follow this tutorial, you are required to have installed the following on your local machine:

- NodeJS `v8.x.x` or higher installed along with npm/yarn
- `create-react-app` global module to scaffold a React project

_Bonus:_ You can now use `npx` to generate a new React project without installing `create-react-app`.

### What is Apollo Client?

Apollo is a team that builds and maintain a toolchain of GraphQL tools for various use cases like frontend (client), server and engine. The **Apollo Client** helps you use a GraphQL API on the frontend side of an application. It can integrate very well with popular frontend frameworks like React, Angular, Vue and so on.

The Apollo Server is the server part of GraphQL where you manage and define your GraphQL API and handle responses that are sent back the client to answer a network request. The Apollo Engine is a hosted infrastructure that serves as a platform to host both the client and the server.

Both the client and the server are open source tools by Apollo. The only thing that is paid is the Apollo Engine. It is worth to note that these three tools are not dependent on each other and can be used separately just like the current scenario where we are going to use only the Apollo Client. Also, it is worth to note that Apollo Client is the leading JavaScript client for GraphQL. It is easy to integrate and to consume a GraphQL API in your web application using React or any other frontend scenario.

### Getting Started: Create a React App

To create a new React project, run the following command from your terminal.

```shell
create-react-app apollo-client-react-demo
```

The above command will create a new directory with the name _"apollo-client-react-demo"_. You can name your React project anything at the moment. After it is created, traverse inside it and to test or verify if everything is running correctly, start the development server with the following command.

```shell
npm start
```

This will open a new browser window at the URL `http://localhost:3000` with the default app. Also, for this tutorial, I am currently using `create-react-app` version `3`. Make sure you have at least this version or greater in order to follow.

Now you know that everything works, let us install dependencies that will be required in order to hook Apollo in the React app. Install the following dependencies either using npm or yarn.

```shell
yarn add apollo-boost graphql react-apollo
```

_What do these dependencies do?_ In brief:

- `apollo-boost` is the package that contains everything that you need to set up an Apollo Client
- `graphql` is required to parse the GraphQL queries
- `react-apollo` is the Apollo integration for React

Once these dependencies are installed, let us proceed to the next section.

### Creating your first Apollo Client

In this section, we will start building a small application that will consume a GraphQL endpoint from this open source [Github repository](https://github.com/trevorblades/countries). This endpoint will allow us to fetch a list of countries or a specific country which will have nested data in the form of that country's information.

In order to test that the API works, you can visit this API's GraphQL playground [here](https://countries.trevorblades.com/) and run the below query to test it out.

```graphql
# Write your query or mutation here
{
  country(code: "CZ") {
    name
    native
    emoji
    currency
    languages {
      code
      name
    }
  }
}
```

Hit the play button in the middle and you will get an object called `data` which contains nested fields.

![](https://blog.crowdbotics.com/content/images/2019/05/ss1.png)

Now that we know, the API works perfectly, let us proceed to the steps in order to consume it. The first step is to require `ApolloClient` from the `apollo-boost` package. Open `index.js` file and add the below snippet of code after other import statements.

```js
import ApolloClient from 'apollo-boost';
```

To fetch the data, you have to specify the endpoint URI like below.

```js
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/'
});
```

With this done, let us complete the procedure to connect this apollo client with the React App.

### Connect Apollo Client and React App

If you are familiar with creating web applications that consume data from a remote API endpoint you might be wondering, _Why_ are we creating a client when we can fetch data using JavaScript `.fetch()` API from any GraphQL endpoint like below.

```js
const query = `
  query { country(code: "CZ") {
        name
        native
        emoji
        currency
        languages {
            code
            name
        }
    }
}
`;
const url = 'https://countries.trevorblades.com/';
const opts = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
};
fetch(url, opts)
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
```

The answer to this question is that integrating an Apollo client with React app (which is just a UI layer in this scenario) in this way, makes it easier to bind GraphQL queries and according to update the UI components with data. The above snippet is fine but you will have to write a lot more code which at some point, as the application scales, might become harder to maintain. Also, Apollo client gives you a lot more advantages like in-memory caching and so on.

Now back to connecting the React app with Apollo Client. Open `index.js`and edit it like below. Start by importing `Apollo Provider`.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

`ApolloProvider` comes with `react-apollo` package. After importing it, we use this provider at the highest most level of our React app. This means the `App` component and all its children components (the whole component tree) will now be able to access GraphQL data. Think of it as a wrapper. This `ApolloProvider` works similarly to React's Context API or the Redux store when using Redux to manage state in a React app. Also, ignore anything related `serviceWorker` in the above file.

## Request Data from Remote GraphQL API in React app

In this section, let us create a simple list component to all the countries, their code and flag from the GraphQL endpoint. To proceed, create a new directory and inside it a new file: `src/components/List.js`. Inside this file, import the following.

```js
// List.js
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
```

The advantage of integrating an Apollo client gives or normal data fetching from a Remote API is that you tend can start by requesting data using `Query` components that comes with `react-apollo`. Next, we need a way to parse any GraphQL query string and compile into standard GraphQL (_AST_) when sending a request. This is provided by `gql`.

In the below snippet we are going to create a simple functional component since it does not require a state of its own. Before that, we define our first query to fetch the list of all countries with fields `name`, `code` (_which we will use later to uniquely identify each country object_) and `emoji` which are flags.

```js
// List.js
const GET_ALL_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
    }
  }
`;
```

I am going to name this query `GET_ALL_COUNTRIES`. You can name it anything. All caps is just convention. Notice, we are using `gql` template literal. Next, define the UI component called `List`.

```js
// List.js
const List = () => (
  <Query query={GET_ALL_COUNTRIES}>
    {({ loading, error, data }) => {
      if (loading) return <h1>Loading...</h1>;
      if (error) return <h2>404. Looks like API is down!</h2>;

      return data.countries.map(({ name, code, emoji }) => (
        <div key={code}>
          <p>Name: {name}</p>
          <p>Flag: {emoji}</p>
          <hr />
        </div>
      ));
    }}
  </Query>
);

export default List;
```

The `Query` component takes up the graphQL `query` as its first prop. It automatically contains three parameters, `loading`, `error` and `data`. Another Apollo Client advantage here. It automatically tracks the loading and the error state such that you can focus on building your app. Both of these states are represented by specific fields. `data` returns you when the response to the query is sent back by the server.

Look how simple it is. In the above snippet, we are mapping the list of countries to get the desired result. Now modify the `App.js` file add this `List` component to render.

```js
// App.js
import React from 'react';
import './App.css';

import List from './components/List';

function App() {
  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
```

To see it action, make sure you are running the development server using `npm run` inside the terminal window.

![](https://blog.crowdbotics.com/content/images/2019/05/ss2.gif)

### Conclusion

_Congratulations!_ You have successfully built your first GraphQL + React app that uses the power of Apollo Client. You have implemented an easy way to get started with React and GraphQL and start running queries. Not only you did you learn how to query data from a remote GraphQL API, render the data in a React component, but I hope, you understand the underlying concept of how to integrate Apollo Client in a React web application and its advantages.

### Bonus: Challenge

Here is a small challenge for you. Create a new component called `CountrySelect` which in return renders the UI for the user to select a country and then display the country code below the select box when selected. Here is a visual perspective for you.

![](https://blog.crowdbotics.com/content/images/2019/05/ss4.gif)

_Hint:_ You will need to use the local component state in order to display the code of the country. But that's only the one way to do it.

The answer to this challenge and the complete tutorial is available at this [Github Repository](https://github.com/amandeepmittal/apollo-client-react-demo).

For more **resources** please check the Apollo Client's official documentation [here](https://www.apollographql.com/docs/react/).

[Originally published at Crowdbotics](https://blog.crowdbotics.com/introduction-to-apollo-client-with-graphql-react-and-crowdbotics/)

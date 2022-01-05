---
title: 'Build a Twitter Clone Server with Apollo, GraphQL, Nodejs, and Crowdbotics'
date: '2019-06-13'
slug: 'build-a-twitter-clone-server-with-apollo-graphql-nodejs'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://crowdbotics.ghost.io/build-a-twitter-clone-server-with-apollo-graphql-nodejs-and-crowdbotics/'
---

![cover_image](https://i.imgur.com/Cg4Xsqq.jpg)

> [Originally published at Crowdbotics](https://crowdbotics.ghost.io/build-a-twitter-clone-server-with-apollo-graphql-nodejs-and-crowdbotics/)

In the last few years, GraphQL becomes a popular choice to build an API. It serves a great alternative to the REST APIs approach. Not only it is an open source application-layer query language, in comparison to REST, GraphQL fulfills the approach that a client request's only the desired set of information from the server in a single request.

In this tutorial, you will be building a server using Node.js, Express and Apollo server library. You will learn how to efficiently build a server from scratch that implements GraphQL as the query language to create the API. We will be using MongoDB to create a local instance of the database and store the application data.

To learn more about the basics of GraphQL, how it differs from REST, its building blocks like schema, resolvers, queries, and mutations, please refer to the previous post **[Creating a GraphQL Server with Nodejs](https://medium.com/crowdbotics/creating-a-graphql-server-with-nodejs-ef9814a7e0e6)**. If you have an idea of what they are, you can continue to read this tutorial.

TLDR;

- Requirements
- Getting Started
- Running your first GraphQL server
- Adding a Mongoose Schema
- How to define GraphQL Types, Queries and Mutations
- Real-time Database Updates with GraphQL API
- Conclusion

## Requirements

In order to follow this tutorial, you are required to have installed the following on your local machine:

- Nodejs `v8.x.x` or higher installed along with `npm/yarn` as the package manager

## Getting Started

Create a new empty directory and initialize it with a `package.json` file by running the following commands from a terminal window.

```shell
# create new directory
mkdir twitter-clone-apollo-server

# traverse inside the directory
cd twitter-clone-apollo-server

# initialize the package.json file
npm init  --yes
```

The last command will create a `package.json` file. We are going to build an integrated server using [Expressjs](https://expressjs.com/) and Apollo server.

> **Wait, what is an Apollo Server?**

The Apollo Server is the server part of GraphQL where you manage and define a GraphQL API and handle responses that are sent back to the client in response to a network request.

When it comes to building a GraphQL API using Apollo on the server, there are two ways you can do that. One is called _standalone_ which is irrespective of the server-side web framework (_such as Express, Koa, Hapi and so on_) using the `apollo-server` library. This package is kept library-agnostic, so it is possible to connect it with a lot of third-party libraries in client and server applications.

Another way is to use the community maintained packages such as `apollo-server-express`. Most popular HTTP Node.js frameworks are having their own community packages that you can check [here](https://github.com/apollographql/apollo-server/tree/master/packages). We are going to leverage this approach.

Run the following command to install the dependencies.

```shell
npm install --save express apollo-server-express graphql
```

To verify if these dependencies are installed, open `package.json` file in your favorite code editor and you will get a similar result like below.

```json
{
  "name": "twitter-clone-apollo-server",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Aman Mittal <amandeepmittal@live.com> (www.amanhimself.dev)",
  "license": "MIT",
  "dependencies": {
    "apollo-server-express": "^2.5.0",
    "express": "^4.17.0",
    "graphql": "^14.3.0"
  }
}
```

## Running your first GraphQL server

To understand how Apollo Server works, let us create a small bare minimum GraphQL server with the Express framework. Please note that, if you already know how to integrate Apollo server with express and create a hello world example, you are free to skip this section and move on to the next one.

At the root of your project, create a new file: `index.js` with the following code. We start by requiring the required dependencies in order to create this server and make it work.

```js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
```

Then define some constants such as for an instance of the Express application, `app` and a port number where the local instance of the server is going to run. Note that, the `port` is currently using an environment value plus the default value of `5000` as the local port number if there is not environment value provided via `process.env.PORT`.

```js
const app = express();
const port = process.env.PORT || 5000;
```

The `process.env`global variable is injected by the Node at runtime for your application to use and it represents the state of the system environment your application is in when it starts.

Next, we define a basic schema. A **schema** in GraphQL is defined at the server in the form of objects. Each object corresponds to data types such that they can be queried upon. This object type has a name and fields. Like the below snippet, there is `Query` called `hello` which is of type string.

```js
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
```

There are pre-defined scalar types in GraphQL like the string in the above snippet. Visit this **[link](https://graphql.org/learn/schema/)** to read more about them. **Queries** are what you use to make a request to a GraphQL API.

In order to execute this query, you need a resolver. Resolvers are the link between the schema and the data. They are the functions that contain the logic behind a query or mutation. They are used to retrieve data and return it on the relevant client request.

```js
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};
```

In the above snippet, we are defining a resolver that will return the string `Hello World` on querying the server. If you have built servers before using Express, you can think of a resolver as a controller where each controller is built for a specific route.

Lastly, we need to use a middleware function from the Apollo Server Express library to instantiate the GraphQL API.

```js
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });
```

Here is the complete code for `index.js` file.

```js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 5000;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
```

Now, go back to the terminal window and run `node index.js` command to trigger the server up and running. Visit `http://localhost:5000/graphql` in a browser window to see that API endpoint in action. Apollo comes with a default playground in order to test the API.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss1-4.png' />

## Adding a Mongoose Schema

Let us mongoose to create a MongoDB based database model inside the Express server app. To proceed, you will have to install the dependency first. Go to your terminal window, terminate the `node index.js` command first and then run the following.

```shell
npm install -S mongoose
```

Once this dependency is installed, create a new folder called `models`. Inside it, create a new file called `TweetModel.js`. This will be responsible for holding the mongoose schema. For those of who do not know what mongoose, well, it is an ORM (object relation mapper) that helps the server app written in Node.js/Expressjs to communicate with the MongoDB database.

Mongoose allows you to define objects with a strongly typed schema that is mapped as a MongoDB collection. This schema architecture allows us to provide an organized shape to the document inside the MongoDB collection where the data is stored.

Start by importing the dependency at the top of the file and then connect the ORM to a local instance of the MongoDB database in the form of a URI: `mongodb://localhost:27017/twitter`. The port `27017` is the default port number where MongoDB runs on your local dev machine irrespective of the operating system you are using. The `/twitter` in the end is just the name of the database instance. You can name it anything. `mongoose.connect()` the function takes this URI as the first argument.

_To learn more about how to create and use MongoDB in the cloud using MongoDB atlas, read our earlier post [here](https://medium.com/crowdbotics/how-to-build-a-serverless-backend-with-aws-lambda-and-nodejs-e0d1257086b4)._

Open `TweetModel.js` file and add the following.

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/twitter', {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  tweet: String,
  author: String
});

const TweetModel = mongoose.model('Tweet', tweetSchema);
```

Notice the `tweetSchema` object. It only contains three fields at the moment. The whole `tweet` as a string, and the name of the author who tweets. It is important to take notice of this schema, later, when you are going to create GraphQL queries, this is the same schema pattern you will have to follow.

Now, let us define the CRUD operations that this current Tweet model is going to perform on the MongoDB instance. Add the below snippet of code to `TweetModel.js` after you have defined the `TweetModel` itself.

```js
export default {
  getTweets: () => TweetModel.find().sort({ _id: -1 }),
  getTweet: _id => TweetModel.findOne({ _id }),
  createTweet: args => TweetModel(args).save(),
  deleteTweet: args => {
    const { _id } = args;

    TweetModel.remove({ _id }, error => {
      if (error) {
        console.log('Error Removing: ', error);
      }
    });

    return args;
  },
  updateTweet: args => {
    const { _id, tweet } = args;

    TweetModel.update(
      { _id },
      {
        $set: { tweet }
      },
      { upsert: true },
      error => {
        if (error) {
          console.log('Error Updating: ', error);
        }
      }
    );

    args.author = 'User123'; // temporary user

    return args;
  }
};
```

Using these functions that are defined in the above code snippet, it will be possible to perform CRUD operations with the MongoDB database. These functions perform all sort of functions like getting a tweet by its `id`, getting all tweets, creating a new tweet, and updating and deleting a specific tweet. The `id` to each tweet document is going to be generated automatically by the MongoDB database. Each of these function is taking an argument by default and that is the name of the author of the tweet. To keep this demo approachable and bare minimum, the author name right now is hard coded.

## How to define GraphQL Types, Queries and Mutations

To define queries, mutations, and resolvers, create a new folder called `api`. Inside this folder create two new files: `Types.js` and `Resolvers.js`.

Open `Types.js` file and add the following snippet to add the type of the individual tweet based on the mongoose schema and our first mutation to create a new tweet.

```js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Type(s)

  type Tweet {
    _id: String
    tweet: String
    author: String
  }

  # Query(ies)
  type Query {
    getTweet(_id: String): Tweet
    getTweets: [Tweet]
  }

  # Mutation(s)

  type Mutation {
    createTweet(tweet: String, author: String): Tweet

    deleteTweet(_id: String): Tweet

    updateTweet(_id: String!, tweet: String!): Tweet
  }
`;

module.exports = typeDefs;
```

In the above snippet, we define the type of the `Tweet` that will be used in every query and mutation. We are using `gql` for the graphql template literal. You can comment inside the GraphQL template literal using a hash `#`. Now open up the `Resolvers.js` file and add the following.

```js
const TweetModel = require('../models/TweetModel');

const resolvers = {
  Query: {
    getTweet: _id => TweetModel.getTweet(_id),

    getTweets: () => TweetModel.getTweets()
  },

  Mutation: {
    createTweet: (_, args) => TweetModel.createTweet(args),

    deleteTweet: (_, args) => TweetModel.deleteTweet(args),

    updateTweet: (_, args) => TweetModel.updateTweet(args)
  }
};

module.exports = resolvers;
```

In the above file, start by importing the `TweetModel` since it will be used to extend GraphQL queries and mutations (_defined above_) to communicate with the MongoDB database in real time.

Currently, the `index.js` file contains the `typeDefs` and resolver from the previous hello world example. Let us import these two files from the `api/` directory to replace them.

```js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./api/Types');
const resolvers = require('./api/Resolvers');

const app = express();
const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
```

Now, go to the terminal window and run `node index.js` command. If you get zero errors, that means your server is running successfully. Also, make sure if you are using the local instance of MongoDB database, make sure to run the command `mongod` to kickstart the MongoDB service.

## Real-time Database Updates with GraphQL API

Once the server is running, visit the Apollo playground URL `http://localhost:5000/graphql` and run the following mutation.

```graphql
mutation {
  createTweet(tweet: "👋 Hello", author: "User12") {
    _id
    tweet
    author
  }
}
```

On running this mutation you will get the following result.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss2-3.png' />

Add a bunch of more tweets by running the above mutation again. Now, let us run a query to fetch all the tweets from the database.

```graphql
query {
  getTweets {
    _id
    tweet
    author
  }
}
```

Writing the keyword `query` is an option only in the case of running a query. This is not possible in the case of running a mutation operation. You have to specify the keyword `mutation`. The above query fetches the unique identifier of each tweet in the database as well as the tweet and the name of the author itself. See the result below.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss3-4.png' />

To delete a tweet from the database, all you have to provide is the `_id` of the tweet and provide sub-fields. Providing at least sub-field is necessary for the delete mutation to run, otherwise, it will throw an error.

```graphql
mutation {
  deleteTweet(_id: "5ce1a2f4f1ef7153d0fc7776") {
    tweet
    author
  }
}
```

You will get the following result.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss4-3.png' />

Run the query to fetch all the tweets to see how many tweets are left.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss5-4.png' />

The last operation is to update a tweet. Again, it is a mutation. All you to provide is the updated tweet in the form of a string and `_id` of the tweet you want to update.

```graphql
mutation {
  updateTweet(
    _id: "5cd7cb5f19c9b4673f860600"
    tweet: "This could be my last tweet..."
  ) {
    _id
    tweet
    author
  }
}
```

The output you get:

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss6-1.png' />

By fetching all the tweets you can verify that the updating mutation worked!

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss7-2.png' />

## Conclusion

If you completed this tutorial, **Congratulations!🎉**

Not only did you learn how to configure and integrate an Express web server with the Apollo server library and MongoDB database. You ended up building complete CRUD functionality.

Apollo Server is an open source project and is one the most stable solution to create GraphQL APIs for full-stack applications. It also supports client-side out of the box for React, Vue, Angular, Meteor, and Ember as well as Native mobile development with Swift and Java.

You can find the complete code for the tutorial in this **[Github repository](https://github.com/amandeepmittal/twitter-clone-apollo-server)**.

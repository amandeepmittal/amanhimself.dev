---
title: 'Building a React Native Mobile App with AWS Amplify and Expo'
date: '2019-05-09'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e'
---

![cover](https://i.imgur.com/G1PqZSM.png)

There is a joke going in dev community about serverless tech stacks using servers?! Some of the trolls even take that this an offensive way. What are they missing out is the advantages Serverless computing has to offer. Advantages like reduced development time and operation costs are some of the factors that could not be overlooked. Spending time and energy writing and wiring your application is worth rather than continuously managing resources and then worry about them at the time of scaling. This might sound too hot to some but serverless is a pragmatic solution in some use cases.

In this tutorial, you will be learning how to integrate a serverless computing service called AWS Amplify in a mobile app using React Native. AWS Amplify has a complete set of toolchain with authentication, a choice between wiring and managing GraphQL or REST API, data storage, push notification and analytics.

### TLDR

- What is AWS Amplify?
- Requirements
- Getting Started
- Configure Amplify User
- Initialize AWS Amplify
- Add a GraphQL API
- Publish API to AWS Cloud
- Integrating Expo app with Amplify SDK
- Adding a Todo Input Field
- Adding a Mutation using Graphql API
- Run Query to fetch data
- Conclusion

## What is AWS Amplify?

Amazon Web Service is a well-known technology that provides cloud services. Since its launch in 2017, Amplify has come a long way in terms of providing a definitive toolchain. The first attraction for me personally is that it is open source. Next, are the CLI plugins and services that you can enable with one click when integrating it in a framework like React Native (_or any other_). Services such as support for GraphQL and REST APIs, basic UI components to get you started, authentication HOCs, storage, hosting and many more are available in its toolchain.

## Requirements

Here is a complete list of plugins, packages, services you are going to need in order to gain something from this tutorial.

- [NodeJS](https://nodejs.org) `v8.x.x` or higher installed along with `npm/yarn`
- [`watchman`](https://facebook.github.io/watchman/docs/install.html) the file change watcher for React Native project
- AWS account
- Amplify CLI plugin
- Expo CLI (\_earlier known as `create-react-native-app`)

_Note_: To use any Amplify service and to follow the rest of this tutorial, you need an AWS account (_which is free_). If you do not have one, please consider signing up for one [here](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation) for the free tier.

## Getting Started

After you have the first three requirements from the previous section let us install the last two. Both of them are command line plugins to scaffold and configure our React Native + AWS Amplify project. Open a terminal window and execute the following command.

```shell
npm install -g @aws-amplify/cli expo-cli
```

Once both of the CLIs are installed, make sure you are on the same version (_at least the major one_) as we are.

```shell
amplify --version
# Output
1.6.6

expo-cli --version
# Output
2.15.4
```

Next, let us create a new React Native project using Expo CLI.

```shell
expo-cli init expo-amplify-demo
```

It will then prompt for a few questions. The first and most important one is choosing a workflow. Choose the default option, that is `blank`. Then it will prompt you to enter the name of your app, you can leave it to default or enter a name. You can use `yarn` to install dependencies by pressing `Y`. After a few moments, a new project directory will appear on the desired location. Traverse inside it before we proceed to the next step.

## Configure Amplify User

Once you are signed-in to AWS console, open up a terminal window and run the following command.

```shell
amplify configure
```

This will open up the AWS console dashboard. Go back to terminal and press enter to continue.

<img src='https://cdn-images-1.medium.com/max/800/1*MdFM6jQ1y-AAONd9OFJ4dA.png' />

Next, are going to be a bunch of questions in order to configure a user account to use Amplify with your React Native application. These questions are as following:

- **Choose a region:** us-east-2
- **Specify the username of the new IAM user:** expo-amplify-demo

On entering the username, press enter and it will open AWS console again in a browser window for you to add a user.

<img src='https://cdn-images-1.medium.com/max/800/1*61bLl2uI4m4r6liLVWUFPQ.png' />

In the above screen, make sure that **Programmatic access** is checked. It allows adding the newly created user to have access to create resources in the form of different APIs and tools by providing you with an access key and secret key. Then click on button **Next: Permissions**.

<img src='https://cdn-images-1.medium.com/max/800/1*25jaknfbqMWRnqiR_EvQ8A.png' />

In the above screen, you will notice that a policy has been selected by default. Let it be. This provides you the full access to AWS services by enabling the aws user (_the current user you are creating_) to be an administrator. Then, click on **Next: Tags**.

<img src='https://cdn-images-1.medium.com/max/800/1*Ust7wTI9lbNMvrXzPnsiHA.png' />

Leave this one blank, and click on **Next: Review**.

<img src='https://cdn-images-1.medium.com/max/800/1*uJEWxsCGDpGOYomhqrlrzw.png' />

Click on **Create user** on the next page and you will be directed to a new page where you will find **Access Key** and **Secret Key**. Do not close this window yet.

<img src='https://cdn-images-1.medium.com/max/800/1*74JJCqo-N-uYRTRC24d-pg.png' />

Go to your terminal window, press the Enter key and it will ask you for the Access Key and the Secret Key. Enter both of them sequentially. Lastly, it will ask you about the profile name. You can enter the project name or user name here. Pressing enter for the last time will create a new AWS user. This section is complete.

## Initialize AWS Amplify

To integrate AWS Amplify with the React Native app run the following command and be ready to answer a few more questions 😄. _I know, I know_. But imagine, not having these questions. The amount of setup being performed right now just by answering a few questions and pressing enters' a few times adds a lot of value by saving developer time.

Open a terminal window, and make sure you are inside the React Native/Expo directory.

```shell
amplify init
```

This command will help you setup amplify SDK inside the React Native app. First, a few sets of questions that are prompted can be seen below.

<img src='https://cdn-images-1.medium.com/max/800/1*9azNVPxkeEVPZ_Nsg7YP5w.png' />

Next, you will be prompted with a question on whether to use an AWS profile or not. You have to choose `Yes` and then on to the next question, choose the user name that you created in the previous steps when configuring amplify. If you are setting up for the time, you are probably going to have only one username in the list, unlike below.

<img src='https://cdn-images-1.medium.com/max/800/1*KEorokAmLOGIaeOFfdu2SQ.png' />

After the amplify SDK initialization process is complete, notice there are some new file changes inside the project directory. A new directory `amplify/` and a new file `aws-exports.js`

<img src='https://cdn-images-1.medium.com/max/800/1*LA_uIoKTDhVgT-tqogeOhA.png' />

The `amplify` directory takes care of configuration files that required in order to setup and makes amplify SDK work with the current React Native app. These configuration files are further divided into two parts. One set of files are just for your local machine and another is for aws cloud. Please remember, whenever you make changes related to amplify SDK in your app, they are, by default, modifications made to the local part or development part. When you are done making modifications and are ready to deploy your changes to the cloud, you use special amplify commands such as `push`. After running this `push` command, only the changes are written in aws cloud.

The file `aws-exports.js` contains details related to amplify cloud service and credentials for the SDK to be imported inside the React Native app. You will be using this file later on.

```js
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: 'us-east-2'
};

export default awsmobile;
```

## Add a GraphQL API

The idea of this section is that in your React Native app, you will be having an API that performs CRUD operations. CRUD stands for _Create, Read, Update and Delete_. Amplify toolchain makes this process easier using its own backend and data storing capabilities. Amplify supports HTTP requests to REST and GraphQL endpoints. Using AWS AppSync, you can easily build data-driven applications in real-time with offline capabilities.

To set up an entire API for the app all you have to do is execute the below command.

```shell
amplify add api
```

This CLI execution automatically creates a fully functional GraphQL API including data sources, resolvers with basic schema structure for queries, mutations, and subscriptions, downloads client-side code and configuration files that are required in order to run these operations by sending requests. The above command will prompt you to choose between what type of API you want to write in. Choose **GraphQL**, and enter a **profile API name**.

<img src='https://cdn-images-1.medium.com/max/800/1*0A5e8OUG9xZr7JkOgAG32g.png' />

Next, it will again, give you two options to choose as to how you want to authenticate your AWS AppSync API. In a real-time application, you will have different users accessing the database and making requests to it. For that, you will always go with **Amazon Cognito User Pool**. This is more of a pragmatic approach. That step needs authentication process and we will be covering that in a future post. For the current demo, choose the option **API Key**.

Do note that this option is only for brief prototype sessions or development process. Any AppSync API key expires after seven days lifecycle. For the next question **Do you have an annotated GraphQL schema?** the answer is `N` or no. Amplify comes with pre-defined schemas that can be changed later. Press `Y` for the next question: **Do you want a guided schema creation?**

<img src='https://cdn-images-1.medium.com/max/800/1*szS_04apcvVgkUjeMPLrVg.png' />

Select `single object with fields`. Next, it will ask if you want to edit the GraphQL Schema. Say yes to that for now. This will open up a new file called `schema.graphql` which contains a schema of type `Todo` with a different set of fields. This step does create a new folder inside `amplify/backend/api/` that further contains the metadata information related to GraphQL API.

<img src='https://cdn-images-1.medium.com/max/800/1*3E2yW1nN6T4E_d_c_vU3XA.png' />

Here is the model inside `schema.graphql` file.

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

If you are not familiar to GraphQL models and its types here is brief information about them. A `type` in a GraphQL schema is that piece of data that is stored in the database. Each `type` can have a different set of fields. You can think of a `type` as an object coming from the JavaScript background. For example, in the above schema for `Todo` model is the `type` that has three fields: `id`, `name` and `description`. Also, `@model` is used for storing types in Amazon DynamoDB. This is the database is used by Amazon when storing our app data.

Every `type` in a database generates a unique identity to each piece of information stored to further identify and persist in CRUD operations through HTTP requests. The `id` in this case is generated by Amplify and has a value of a built-in type of `ID` which, in GraphQL terminology, is known as a scalar type. You can read more about the different types identified in a GraphQL schema [here](https://graphql.org/graphql-js/basic-types/).

The exclamation mark `!` signifies that the field is required when storing the data and it must have value. In the above schema, there are two required fields: `id` and `name` for the `Todo` type.

Save this file, go back to the terminal window and press enter. You will be prompted with a success message (_probably, in green_). All the changes you have just made are now saved locally.

## Publish API to AWS Cloud

To publish all the changes you have made (or left it default) in the local environment to AWS Cloud, run the command `amplify push`.

<img src='https://cdn-images-1.medium.com/max/800/1*6gTwOhKVRGSzjZzP48WUTA.png' />

On running the command, as a prompt, you get a table in return with information about resources that you have used and modified or enabled. The name of these resources is described in the Category section. The **Resource name** in the above table is the API name you choose in the previous section. Next column is the type of operation for the API to be sent, that is currently, **Create**. The provider plugin column signifies that these resources are now being published to the cloud. Press `Y` to continue.

Amplify CLI interface will now check for the schema and then compile it for any errors before publishing final changes to the cloud.

<img src='https://cdn-images-1.medium.com/max/800/1*pA5KjvyCwGgTDKeR8W3IyA.png' />

In the next step, it prompts whether you want to generate code for your newly created GraphQL API? Press `Y`. Then choose javascript as the code generation language. If you are using `TypeScript` or `flow`, now is the time to pick one. In the above image, for the last question, press `Y`. This will create a new folder inside the src directory which contains GraphQL schema, query, mutations, subscriptions as JavaScript files. On operating the API, these files can be accessible for different operations later.

Press `Y` to the next question that asks you to update all GraphQL related operations. Also, let maximum statement depth be the default value of `2`. It will take a few moments to update the resources on the aws cloud and will prompt with a success message when done.

<img src='https://cdn-images-1.medium.com/max/800/1*QIYXuBoTZFvbSPiTyDG8tA.png' />

At the end of the success message you will get a GraphQL API endpoint and a GraphQL API Key (_which we learned previously that it expires on the 7th day_). You do not have to save it somewhere on your desktop and panic. This information is added to `aws-exports.js` file automatically for you now.

## Integrating Expo app with Amplify SDK

To make use of amplify SDK in the React Native app, install the following dependencies.

```shell
yarn add aws-amplify aws-amplify-react-native
```

The package `aws-amplify` allows making requests to auth and API services provided AWS. The other package `aws-amplify-react-native` is specific to React Native as a library that contains useful components to be used in a project. You can verify that both of these packages were installed by peeking into `package.json` file > `dependencies`.

```json
"dependencies": {
    "aws-amplify": "^1.1.26",
    "aws-amplify-react-native": "^2.1.10",
    "expo": "^32.0.0",
    "react": "16.5.0",
    "react-native": "https://github.com/expo/react-native/archive/sdk-32.0.0.tar.gz"
  },
```

Open `App.js` and add the configuration keys from `aws-exports-.js` and make amplify SDK aware of them.

```js
// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// ---------This is the part to add
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

// -----------------------------
```

That's it for the integration part. Now let us write some GraphQL interactions and make sure it works with our React Native app in real-time.

## Adding a Todo Input Field

To capture the user input, we are going to use a component state as follows. Add the below before the render method inside the `App` component.

```js
//App.js
state = {
  name: '',
  todos: []
};
```

In the above state, there is a `name` field of the todo item and an array called `todos` that will be used to fetch all the todo items from the GraphQL API and display on the UI. Note that, there is another field called `description` in the GraphQL schema but since it isn't required, we are not going to use it here.

Next, import `TextInput` and `TouchableOpacity` to create an input field and native button. Here is the complete code for `App.js`.

```js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

export default class App extends React.Component {
  state = {
    name: '',
    todos: []
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  addTodo = () => {};

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={val => this.onChangeText('name', val)}
          placeholder="Add a Todo"
        />
        <TouchableOpacity onPress={this.addTodo} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add +</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    marginVertical: 10
  },
  buttonContainer: {
    backgroundColor: '#34495e',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  }
});
```

Go to the terminal window and run the command `npm start` to view this either in an iOS simulator or an android emulator. You will get the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*gj26-fBY1i3hRAmTm8Jj8A.png' />

## Adding a Mutation using Graphql API

A _mutation_ in GraphQL is all about handling operations like adding, deleting or modifying data. Currently, the React Native application is basic but it serves the purpose of making you familiar with amplify as a toolchain and its integration with the cross-platform framework. To add a todo item and to retrieve the same you need some business logic to communicate with GraphQL backend. Let us start with a mutation.

In the file `App.js`, import `API` and `graphqlOperation` from `aws-amplify`. Here, `API` is the category for AWS resource and the later is the method to run either a mutation or the query. Inside the `src/graphql/mutation.js` file you will find some mutation functions that we can make use of to create, delete, or update a note in the database. Also import `createTodo` from this file.

```js
//App.js

// ...
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from './aws-exports';
import { createTodo } from './src/graphql/mutations';
// ...
```

Add a function `addTodo` before the `render` method which uses `API.graphqlOperation()` the method from amplify SDK. This method will intake the mutation as the first argument and whatever input user enters inside the app UI, as the second argument.

```js
// App.js

addNote = async event => {
  const { name, todos } = this.state;

  event.preventDefault();

  const input = {
    name
  };

  const result = await API.graphql(graphqlOperation(createTodo, { input }));

  const newTodo = result.data.createTodo;
  const updatedTodo = [newTodo, ...todos];
  this.setState({ todos: updatedTodo, name: '' });
};
```

The above function takes `name` as the input where `name` is the text of a todo item. Also, notice the use of `async/await`. This helps to fetch the result from the mutation and update the `todos` array in the state with the latest todo item and previous or existing data in that array. After updating the state, clear the value of the input field `name`, and display in the UI by setting it back to an empty string.

I urge you to add at least one list of item. You would not get any confirmation right now from the API whether the data field has been added to the GraphQL backend or not.

## Run Query to fetch data

If you want to read data (_and render it in the UI of the app_), the process is known as a _query_. To fetch all the data from GraphQL API and display it on the device's screen, let us use the query from amplify GraphQL pre-generated file inside `src/graphql/queries.js` (_just like we did with mutation_).

```js
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
```

Import `listTodos` inside `App.js` from the above file.

```js
//App.js
import { listTodos } from './src/graphql/queries';
```

We need to fetch the data at the time where the component gets rendered. For this, let us a lifecycle method called `componentDidMount`. Since this is going to be an asynchronous operation `async/await` is being used here too. Just after the state is defined in the `App` component, add the following snippet of code.

```js
// App.js
async componentDidMount() {
        try {
            const todos = await API.graphql(graphqlOperation(listTodos))
            console.log("todos: ", todos)
            this.setState({ todos: todos.data.listTodos.items })
        } catch (err) {
            console.log("error: ", err)
        }
    }
```

Refresh the app by saving the file you will notice that on UI screen nothing happens. That's because we haven't added the rendering logic to display this list of items. However, you can verify that data is being fetched using `console` statement and by looking quickly at the Expo CLI.

<img src='https://cdn-images-1.medium.com/max/800/1*jY4FwniW2IJtfpGxoXxNgQ.png' />

During the previous step, I did add an item to the list. That's the proof of that. Now let us display this item on the device's screen. Inside the render method, add this after the `TouchableOpacity` component. We are going to use JavaScript's `map` function to traverse the `todos` array.

```js
// App.js

    {this.state.todos.map((todo, index) => (
                    <View key={index} style={styles.todo}>
                        <Text style={styles.name}>{todo.name}</Text>
                    </View>
                ))}

// Corresponding styles for above jsx

todo: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 10
    },
    name: { fontSize: 16 }
```

On running `npm start` (_or if it is already running, just the save the App.js file_) you will get the following output.

<img src='https://cdn-images-1.medium.com/max/800/1*uOotu-Fbfy7FnfDRwQXNOw.png' />

## Conclusion

This tutorial is complete. I am sure by now you have gained enough knowledge to build your own React Native app with AWS Amplify and AppAsync. Also, did you notice the amount of code written inside `App.js`? It is far less than a traditional app that uses self-backend techniques. This bare minimum demo can serve you a lot better.

You can find the complete code for this post in this [Github repository](https://github.com/amandeepmittal/expo-amplify-demo).

[Originally published at Heartbeat](https://heartbeat.fritz.ai/building-a-react-native-mobile-app-with-aws-amplify-and-expo-fcab6ee0555e)

---
slug: how-to-quickly-build-and-integrate-a-serverless-react-application-with-crowdbotics-and-aws-amplify
date: 2019-04-25
title: 'How to quickly build and integrate a serverless React application with Crowdbotics and AWS Amplify'
categories: ['reactjs, amplify']
description:  '---'
published: true
author: 'Aman Mittal'
banner:
---

![](https://cdn-images-1.medium.com/max/2560/1*XQL0u5BzIQznVPayIe1Jyw.jpeg)

As a developer building a serverless application, you get to focus more on the product. Instead of worrying about managing and operating servers, you get to reclaim your valuable time and energy.

Serverless providers such as Amazon (along with few others) are leading the race right now by consistently developing tools, enhancing developer experience and providing services at a low cost.

In this tutorial, we are going to build and integrate a React application with a serverless tool provided in the form AWS Amplify Framework. Amplify is an open source library for serverless development. It makes it easier to build a serverless backend and integrate it with front-end (_not only React, but supports JavaScript frameworks too_).

**Tldr;**

- Requirements
- Setting up a Crowdbotics Project
- What is AWS Amplify?
- Configure AWS Amplify Account
- Create a React Project
- Initializing AWS Amplify
- Setting Amplify User Authentication
- Enable GraphQL API
- Publishing the API to AWS
- Configure React App with Amplify
- Building the UI: Form
- UI: A list of notes
- How to Run Queries and Mutations in AppSync
- Running the First GraphQL Mutation using GraphiQL interface
- Running the Second Mutation from React App
- Query all the notes
- Deleting a note
- Conclusion

### **Requirements**

In order to follow this tutorial, you are required to have:

- NodeJS `v8.x.x` or higher installed along with `npm/yarn`
- `create-react-app` global module to scaffold a React project
- AWS account (_it's free!_)

### Setting up a Crowdbotics Project

To setup, a new Crowdbotics project, visit [app.crowdbotics.com](https://app.crowdbotics.com/create/) and login to the dashboard screen.

![](https://cdn-images-1.medium.com/max/800/1*9gollubzgEx8AyxPs_TjFw.png)

Once you see the dashboard screen, click on `Create a new application`. On `Create an Application` page, choose `Others > Other` template. Lastly, choose the name of your template at the bottom of this page and then click the button `Create by app!` After a few moments, your Crowdbotics project will be created. Upon creation, it will redirect you to the app dashboard, where you can see a link to GitHub, Heroku, and Slack.

Once your project is created, you will get an invitation from Crowdbotics to download your project or clone the repository from Github either on them email you logged in or as a notification if you chose Github authentication.

### What is AWS Amplify?

Amazon Web Service is a well-known technology that provides cloud services. Since its launch in 2017, Amplify has come a long way in terms of providing a definitive toolchain. Currently, it stands on the pillars of CLI plugins, supports GraphQL Transform, UI components with authentication, storage, interactions in the form of chatbots, a VS Code Extension, and of course, hosting. To install amplify CLI tool, run the following command.

``shell
npm install -g @aws-amplify/cli

````

To check that we are on the same version, ( _I’d recommend the higher version, if released at the time of your reading, too_), you can run the below command and will be prompted with an output.

```shell
amplify --version

# Output

1.6.3
````

### Configure AWS Amplify Account

It is important to have an AWS account before you proceed with this step. Once you are signed-in to AWS console, open up a terminal window and run the following command.

```shell
amplify configure
```

This will open up the AWS console dashboard. Go back to terminal and press enter to continue. The CLI tool will now prompt you with a different set of questions in order to set up a cloud service and create a user in the cloud. Follow closely.

- **Choose a region**: us-east-2
- **Specify the username of the new IAM user**: noteapp-react-amplify

On entering the username, press **enter** and it will open AWS console again in a browser window for you to add a user.

![](https://cdn-images-1.medium.com/max/1200/1*grl6iPya44gP3u60gCgAAA.png)

Make sure in the above screen that **Programmatic access** is checked. It allows adding the newly created user to have access to create resources in the form of different APIs and tools by providing you with an access key and secret key.

Click on the button **Next: Permissions**.

![](https://cdn-images-1.medium.com/max/800/1*SpLuT3eGaKCZA_CpL8Fxww.png)

On the web page as above, you will see that policy has already been selected by default. This provides you the full access to AWS services by enabling the aws user to be as an administrator.

Click **Next: Tags**. On the next page, leave it blank. Now, click **Next: Review**.

![](https://cdn-images-1.medium.com/max/1200/1*9N8-ph8DvojntkY_M_1btg.png)

Click **Create user**.

![](https://cdn-images-1.medium.com/max/800/1*RYLNmCC6N14Quy5WU01YKw.png)

You will get an **Access key** and a **secret key**. Copy them and keep them safe. Open the same terminal window as earlier. It will now prompt you to enter these keys each, once you press enter.

For **Profile Name**, enter the project name ( _or the user name we entered earlier_) to keep things simple for now. You will get a success message once the new user is created. The configuration part of the AWS amplify user is complete.

### Create a React Project

Traverse inside the Crowdbotics project directory that you cloned. Now, let us build a new React app from scratch using its CLI tool `create-react-app`.

```shell
create-react-app noteapp

# after project is generated, traverse inside it

cd noteapp
```

### Initializing AWS Amplify

Let us now initialize the current state of React app to make it work with AWS Amplify toolchain. The first is to run the below command.

```shell
amplify init
```

This command will you ask another set of questions in order to setup `amplify` SDK in your project. In the below screen you will find these questions and the answers you need to select. Most of them are default as prompted by the CLI tool.

![](https://cdn-images-1.medium.com/max/800/1*QiRkHB2KDXJwu5vsGY_zWA.png)

After that, you will be prompted with a question on whether to use an AWS profile or not. You have to choose `Yes` and then for the next question, choose the user name that you created in the previous steps when configuring amplify.

After a few moments, a special directory appears inside the `noteapp/` called `amplify`. This contains configuration files required in order to work both on the local machine and aws cloud.

Yes, any changes you make to an amplify project are first done locally inside your project and then, with a `push` command, can be permanently implemented on the aws cloud.

Also, a new file is created by the amplify CLI tool inside the `src` directory called `aws-exports.js`. You will be using this file later when building the app.

![](https://cdn-images-1.medium.com/max/800/1*Wq-bGF-ddimrocOSRcDxOw.png)

### Setting Amplify User Authentication

The general idea of the React application that we are going to build in this tutorial is that it is going to be a Note taking web app. This app will have an API that performs CRUD ( _Create, Read, Update, Delete_) operations and persists these operations to the database.

Amplify makes this process easier than the traditional procedure of building a web app with a custom backend. It gives you the superpower to generate an entire API and set up an authentication system with just a few commands. To get started with the current section, run the below command.

```shell
amplify add api
```

The above command, `amplify add` is the way to add any resource ( _or AWS category_) at any time during the process of building your app. The last term in the above command `api` is the name of the resource or the service that you are going to use. The command line interface will now ask you a set of questions to follow along.

![](https://cdn-images-1.medium.com/max/800/1*G9U_HnuWEHsDpJlOa7H1TQ.png)

The first prompt by amplify command is to choose how you want to write your API. Amplify supports APIs written in both GraphQL and RESTful. In our case, choose GraphQL. The GraphQL API service provided by Amplify is also known as [AWS AppSync](https://aws.amazon.com/appsync/). AppSync features both real-time data interactions with the NoSQL database and offline support.

![](https://cdn-images-1.medium.com/max/800/1*Trt5AxoTMspjAgQRc3gNEg.png)

Next step is to provide an API name. Right now, it is recommended to go by the default name. Just press the enter key. _Why is this step necessary to provide an API name?_ Imagine, if you an app that utilizes more than one API. Then, it is a good scenario to provide your own naming for different APIs.

![](https://cdn-images-1.medium.com/max/800/1*57ght1It-O3r_kam25GiGQ.png)

The above step allows you to set up user authentication and authorization in your React app using Amplify toolchain. Amplify has its own user auth modules, and as they are described above. The first one, `API Key` is not so much of a pragmatic approach if your app contains sensitive data and needs to manage different users. This option is valid only if you are looking for prototyping a quick app or your web app does not support the concept of having authorized app users.

The second option which we are going to choose in this case is `Cognito User Pool`. This is a more pragmatic option. If you are building a web app, you are probably going to use it in order to manage app users. This option not only supports user authentication but has support for role-based user authentication, is secured and works with GraphQL APIs ( _AppSync_).

![](https://cdn-images-1.medium.com/max/800/1*X668oaLxseRLZ-dnzdoJAw.png)

This option, choose default authentication and security configuration. Another option to look out for is `Manual configuration` about which you can read more at [the official amplify docs](https://aws-amplify.github.io/docs/js/react).

![](https://cdn-images-1.medium.com/max/800/1*z407vg92qln6EPgWucxEBg.png)

In the above field, choose `Username`.

![](https://cdn-images-1.medium.com/max/800/1*KC2KxnppSWN2RpwhM9oZFQ.png)

Amplify’s command line interface is so interactive and in detail these days that it prompts you to provide input fields and select them from your terminal. Right now, we only need to choose `Email` but feel free to play around with other options. The user authentication setup is complete for now. The CLI will continue to ask you questions but they are going to be related to the GraphQL API.

### Enable GraphQL API

![](https://cdn-images-1.medium.com/max/800/1*ZTaGhluP05haPMMMtGPDLA.png)

Amplify comes with pre-defined schemas that can be changed later. Choose `no` for the first question and `yes` for creating a GraphQL schema.

![](https://cdn-images-1.medium.com/max/800/1*q-y7sKFRhKeUnqIEeoul_g.png)

The app is going to be simple in terms of database and its properties. Select `single object with fields`. Next, it will ask to edit the GraphQL Schema. Say yes to that! This will open up a new file called `schema.graphql` which already contains a schema of type `Todo` with fields. This step also creates a new folder inside `amplify/backend/api/` that further contains the metadata information related to GraphQL API and user auth.

![](https://cdn-images-1.medium.com/max/800/1*DzwwnvBf-0NtbzET7vbVrg.png)

_Note_ that, these files are only available in the local environment and the changes made inside them are not yet published in the aws cloud. More on this later.

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

A `type` in GraphQL is a piece of information or data stored in the database. Each type can have different fields. For example, in the above schema for `Todo` model, it has three fields: `id`, `name` and `description`. You can think of this model as a JavaScript object and fields as properties to that JavaScript object. Let us modify this existing model created by amplify to our own needs.

```graphql
type Note @model {
  id: ID!
  note: String!
}
```

Every `type` in the database generates a unique identity to each piece of information to identify and persist in CRUD operations. The `id` in our case is generated by Amplify and have a value of a built-in type of `ID` which is also known as scalar type. Similarly, the next field `note` is of type string. There are basic types identified by the GraphQL schema and you can read more about them [**here**](https://graphql.org/graphql-js/basic-types/).

_Did you notice that both the fields have an exclamation _`_!_` _at their scalar types?_ This marks that any field having it is required in the database to exist and have value.

Save this file, go back to CLI and press enter. If there are no errors ( _probably going to be in red_), you will get a success message and the changes made are saved locally.

### Publishing the API to AWS

To publish all the local changes to the aws cloud, all you have to do is run the command `amplify push`.

![](https://cdn-images-1.medium.com/max/800/1*E8jPNMXaqVceTkgFkCKY4g.png)

On running this command, you get a table in return with information about resources that you have used and modified or enabled. The name of these resources are described in the `Category` section and the custom or default name you choose is under `Resource name`. Next column is the type of operation, currently, it is `Create`. Lastly, the provider plugin column signifies that these resources are now being published to the cloud. Press `Y` to continue.

CLI interface now checks the schema and compiles it for any errors before publishing final changes to the cloud. In the next step, it asks you whether you want to generate code for your newly created GraphQL API? Press `Y`. Then choose `javascript` as the code generation language.

![](https://cdn-images-1.medium.com/max/800/1*QUCajnQ88nuvmZKw_vJdmA.png)

For the last prompt, just press enter. Make sure the path is default as suggested by the CLI. This last step in the above image creates a new folder inside the `src` directory which contains GraphQL schema, query, mutations, subscriptions as JavaScript files. React components can access these files later and use them.

![](https://cdn-images-1.medium.com/max/800/1*faZ_nYVGlDGSKVrBickN3g.png)

Press `Y` to the next question as above and let maximum statement depth be the default value of `2`. It will take a few moments to update the resources on the cloud and will prompt with a success message when done.

### Configure React App with Amplify

To use amplify SDK in the React app install the following dependencies via npm or yarn.

```shell
npm i -S aws-amplify aws-amplify-react
```

The `aws-amplify` allow making requests to auth and API services provided AWS. The other package `aws-amplify-react` is specific to React as a library and contains useful components to be used in a project.

Open up `src/App.js` and import the following three statements to configure `Amplify` library and a High Order Component called `withAuthenticator` that wraps around `App` component and adds user authentication flow in the react app.

```js
//App.js

// ...
import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'

Amplify.configure(awsmobile)

//...

export default withAuthenticator(App, true)
```

The React HOC `withAutenticator` detects a user's authorization state for example, whether the user is signed in or not and updates the UI accordingly. Now go back to the terminal and let us test the amount of work we have done so far. To run start the React app in development server, run `npm start` and visit `http://localhost:3000/` in a browser window. You will be welcomed by the following screen below, asking you to sign in as a user to React app.

![](https://cdn-images-1.medium.com/max/1200/1*QU1V8V2v1eZVIXgUoFLraQ.png)

Currently, there no user’s registered to our app. So let us register one. Click the button `create account` and enter the details. Do note that, please enter a valid email address since the AWS servers are going to send you a verification code when you log in for the first time.

![](https://cdn-images-1.medium.com/max/800/1*_dlnFwTyQBIm78goATDi0g.png)

Also note that the email that contains verification code may go to your spam or may take a bit time, so don’t worry. After receiving the code, enter it, and click the `confirm` button like below.

![](https://cdn-images-1.medium.com/max/800/1*Xt4Y1zpIcbJR3CCnBUKK8g.png)

It will then redirect you on the first screen, and now you can log in with the username and password you provided during the process. Once you are logged in, you will be welcomed by a similar screen below with your own username.

![](https://cdn-images-1.medium.com/max/1200/1*cVCHLcqO37cky6UEdvOU4A.png)

Notice that there is a navigation bar that is automatically added. This navbar includes a greeting with a username and a signout button. If you click the sign out button, your current user will be logged out and will have to provide login credentials again.

_Bonus:_ There is a lot of customization you can do with AWS Cognito in terms of managing the user pool, different verification strategies such as sending a verification code via SMS or adding your own custom strategy using AWS Lambda function. We are not going to go in-depth for this particular tutorial, but consider this a shoutout for trying new things if you are working with Amplify for the first time. Visit AWS Cognito through AWS console in a browser window and there you will find all the different information.

### Building the UI: Form

To keep things simple in the UI part, the React app will have a form of input and a button to add a new note to the app. To begin, open `App.js` file and add the following code for the form.

```js
// App.js

import React, { Component } from 'react'

import './App.css'

import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'

Amplify.configure(awsmobile)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>
            <span role="img" aria-label="write">
              📝
            </span>
            React + Amplify NoteApp
          </h1>
          <form className="form-note">
            <input
              type="text"
              className="form-input"
              placeholder="Add your note"
            />
            <button type="submit" className="form-button">
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withAuthenticator(App, true)
```

The corresponding CSS file with some custom classes that we are using in the above form is:

```js
.App {
	text-align: center;
}

.App-logo {
	animation: App-logo-spin infinite 20s linear;
	height: 40vmin;
	pointer-events: none;
}

.App-header {
	background-color: #282c34;
	min-height: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
}

.App-link {
	color: #61dafb;
}

@keyframes App-logo-spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.form-note {
	padding: 10px;
}

.form-input {
	font-size: 40px;
}

.form-button {
	margin-left: 5px;
	font-size: 40px;
}

.notes-list {
	padding: 10px;
	display: flex;
}

.notes-list-button {
	margin-left: 10px;
}
```

Run the command `npm start`, log in as the app user and you will see similar results in the browser window.

![](https://cdn-images-1.medium.com/max/1200/1*p_pWKjsi9-_VTJS_xek5GQ.png)

### UI: A list of notes

Underneath the form, there is going to be a list of notes being displayed. These are those notes that will be added by the user in the future. Start by initializing a `notes` array in the component's state.

```js
state = {
  notes: []
}
```

The current state does not contain any data to display. To iterate over notes, let us add a placeholder notes object inside which each item is represented with fields `id` and `note` text to display.

```js
// App.js

state = {
  notes: [
    {
      id: 1,
      note: 'First note'
    }
  ]
}
```

To iterate over `notes` array, let use ES6 `map` function. Here is the complete snippet for render function in `App.js`.

```js
// App.js

render() {
		return (
			<div className='App'>
				<div className='App-header'>
					<h1>
						<span role='img' aria-label='write'>
							📝
						</span>
						React + Amplify NoteApp
					</h1>
					<form className='form-note'>
						<input type='text' className='form-input' placeholder='Add your note' />
						<button type='submit' className='form-button'>
							Add
						</button>
					</form>
					<div>
						{this.state.notes.map(item => (
							<div key={item.id} className='notes-list'>
								<li>{item.note}</li>
								<button className='notes-list-button'>
									<span role='img' aria-label='delete-button'>
										❌
									</span>
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		)
  }
```

![](https://cdn-images-1.medium.com/max/1200/1*hJPKmbKYRbLOJM7TwQgm4Q.png)

In order to add and access dynamic data, you are going to make use of GraphQL API that we added earlier from the next section.

### How to Run Queries and Mutations in AppSync

In GraphQL terms, operations like adding, deleting or modifying data are known as a mutation. If you want to read data, the process is known as a query. In a browser window, open up [aws management console](https://signin.aws.amazon.com).

![](https://cdn-images-1.medium.com/max/800/1*L1rflwDH-1pEn2LwmP-L7g.png)

On the home page like above, click `AWS AppSync` and then select the noteapp api ( _if you used amplify before, you might a number of APIs, if this is your first time, you will have only one API that was created in the earlier sections._). From the sidebar, go to section `Queries`. This will open a Graphiql interface to run a query or mutation to access data in the current API.

![](https://cdn-images-1.medium.com/max/800/1*8u56-4G_NNXvBMptoMP6pg.png)

Since our app has authenticated enabled, you are required to click on the button `Login with User Pools` to run any query or mutation further. This will ask you three input fields, `clientID` which can be found in `aws-exports.js` under `aws_user_pools_web_client_id`, the username and password of the app user.

![](https://cdn-images-1.medium.com/max/800/1*sgiD2KiHat_OXX9HaOhgCA.png)

Once you log in, it will display the same user name as you must have seen in the navigation of the React app.

![](https://cdn-images-1.medium.com/max/800/1*BXCKRdx8ug-R0-fA5xBI7Q.png)

### Running the First GraphQL Mutation using GraphiQL interface

On the right side of this GraphiQL interface do you notice that there is `Docs` section? This is one of the most useful parts of this interface.

![](https://cdn-images-1.medium.com/max/800/1*-zi9HAeC2F5hrg6tR0eyvA.png)

To run a mutation for the first time, click on the `Mutation` and it will give you all of the mutations available right now.

![](https://cdn-images-1.medium.com/max/800/1*bYYitVIXfzISx1NgNL0AAg.png)

Now to run the mutation, type the following first in the editable interface on the left-hand side.

![](https://cdn-images-1.medium.com/max/800/1*fNcplJOULuTL5_ERhL8O-g.png)

Take a closer look at the above image. The line number one specifies whether is it going to be a query or a mutation. In our case, right now it is a mutation. The mutation takes a field that you just looked in docs. The function we are supposed to run to add data to the database is `createNote`. This function takes an input object with the field `note`. You do not have to specify the field `id` since it is going to be automatically added by the GraphQL API on running this mutation.

The object from line 4 to 7, returns the data when a mutation is run. Now hit the big play button and you will get the data in return like below.

![](https://cdn-images-1.medium.com/max/800/1*LFTx9NzxQSNVXVyvEAB0pw.png)

### Running the Second Mutation from React App

Running the mutation from GraphQl interface is cool but not a pragmatic solution for an app. In the React app, the user then submits the form button, should get a dynamic behavior. That is, the data from the input field should be added to the database through GraphQL API.

```js
// App.js
state = {
  notes: [],
  note: ''
}

handleInputChange = event => this.setState({ note: event.target.value })
```

Modify the state in `App` component by deleting the hard-coded data and adding a new `note` field with an empty string as its value. This new state field is going to be updated whenever the user types in the input field in the form.

Next, update the input type accordingly by adding `onChange` event listener. To run the mutation whenever the user submits the form, create a custom function called `addNote` on the `<form>`. Also, inside this function, we are going to execute the query `createNote`. It is the same query that you ran inside the Graphiql interface.

Start by import `API` and graphqlOperation from `aws-amplify`. Here, `API` is the category and the later is the method to run either a mutation or the query. In the Graphiql interface, we had access to mutation functions through documentation. In React app, we have real-time access to each mutation function, generated by the amplify toolchain. Inside `src/graphql/mutation.js` file you will find some mutation functions that we can make use of to create, delete, or update a note in the database. Let us require `createNote` from this file.

```js
// App.js

import React, { Component } from 'react'

import './App.css'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsmobile from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'
import { createNote } from './graphql/mutations'

Amplify.configure(awsmobile)

class App extends Component {
  state = {
    notes: [],
    note: ''
  }

  handleInputChange = event => this.setState({ note: event.target.value })

  addNote = async event => {
    const { note, notes } = this.state

    event.preventDefault()

    const input = {
      note
    }

    const result = await API.graphql(graphqlOperation(createNote, { input }))

    const newNote = result.data.createNote
    const updatedNotes = [newNote, ...notes]
    this.setState({ notes: updatedNotes, note: '' })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>
            <span role="img" aria-label="write">
              📝
            </span>
            React + Amplify NoteApp
          </h1>
          <form onSubmit={this.addNote} className="form-note">
            <input
              type="text"
              className="form-input"
              placeholder="Add your note"
              onChange={this.handleInputChange}
              value={this.state.note}
            />
            <button type="submit" className="form-button">
              Add
            </button>
          </form>
          <div>
            {this.state.notes.map(item => (
              <div key={item.id} className="notes-list">
                <li>{item.note}</li>
                <button className="notes-list-button">
                  <span role="img" aria-label="delete-button">
                    ❌
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withAuthenticator(App, true)
```

The function `addNote` is the key to the above code snippet. The `API.graphql(graphqlOperation(createNote, { input }))` method takes up the mutation as the first argument and the input as the second. For brevity, we are just adding a `note` field (like we did with the Graphiql interface).

After creating a new note, we need to fetch from the GraphQL API. Using `async/await` helps us with that. Define a variable `result` that fetches the result from the mutation and then update the `notes` array in the state with spread operator: `[newNote, ...notes]`. Lastly, after updating the state, clear the value of the input field `note`, displayed in the UI by setting it back to an empty string.

### Query all the notes

If you trying adding a note item through the input field, it will get displayed on the UI but once you reload the app or the web page, it disappears. The reason is that the App component is currently not been mounted and a query to fetch data from the database is not getting executed right now.

You can open `src/graphql/queries.js` file to get a sneak peek of the query we are looking to execute in this section.

```js
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getNote = `query GetNote($id: ID!) {
  getNote(id: $id) {
    id
    note
  }
}
`
export const listNotes = `query ListNotes(
  $filter: ModelNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      note
    }
    nextToken
  }
}
`
```

To list all the notes on the React UI, we need to execute the query `listNotes`. Open `App.js` file and import it.

```js
// App.js

// ... after other imports
import { listNotes } from "./graphql/queries"

// ... inside App component

async componentDidMount() {
        const result = await API.graphql(graphqlOperation(listNotes))

        this.setState({ notes: result.data.listNotes.items })
    }
```

If you took a closer look at the `listNote` query in `queries.js` file, you will notice two things. First, it doesn't require any second argument since we are fetching all the notes and secondly, all the notes are inside the `items` array. Now, save the file and open up the browser window. You will see all the notes being displayed. Try adding a new one and this time it won't disappear.

![](https://cdn-images-1.medium.com/max/1200/1*VKvIQfxIVEhWH22rAAS7iQ.png)

### Deleting a note

Since you are now familiar with how mutations work, it will be an easy task to try out deleting a note from the notes list. You can stop reading this tutorial right now and go DIY.

```js
// App.js

// ...

import { createNote, deleteNote } from './graphql/mutations'

// inside App component, add this

deleteNote = async noteID => {
  const { notes } = this.state
  const input = { id: noteID }
  const result = await API.graphql(graphqlOperation(deleteNote, { input }))

  const deleteNoteId = result.data.deleteNote.id

  const updatedNotesList = notes.filter(note => note.id !== deleteNoteId)

  this.setState({ notes: updatedNotesList })
}
```

The `deleteNote()` method takes the `ID` of the note item that has been triggered to be deleted. `filter()` is used traverse the `notes` array and to update the list with remaining items in it.

Also, do not forget to add `onClick` method where you have defined the `button` component to delete a note item inside the `render()` method.

```js
<div>
  {this.state.notes.map(item => (
    <div key={item.id} className="notes-list">
      <li>{item.note}</li>
      <button
        className="notes-list-button"
        onClick={() => this.deleteNote(item.id)}
      >
        <span role="img" aria-label="delete-button">
          ❌
        </span>
      </button>
    </div>
  ))}
</div>
```

![](https://cdn-images-1.medium.com/max/1200/1*EOaVK7ImkrvGss_6U9QM1A.gif)

### Conclusion

_Challenge:_ You have a task to add the code for updating a note item by yourself. Try it. The mutation is already provided to you in the usual place.

Did you notice the number of lines of code in your `App.js` file? So much less amount of code than a traditional web app. This gives you an advantage by saving time when building an app and maintaining it afterward.

You can find the complete code for this post in the following Github repository.

[**crowdbotics-apps/react-amplify-app1-2352**](https://github.com/crowdbotics-apps/react-amplify-app1-2352/tree/master/noteapp)

**Resources that are worth a look:**

- [AWS Amplify API Docs](https://aws-amplify.github.io/docs/js/api)
- [Fullstack Serverless](https://dev.to/kkemple/fullstack-serverless-440e) by [kurtiskemple](https://medium.com/u/8be181d9f877)

> [Originally published at Crowdbotics](https://medium.com/crowdbotics/how-to-quickly-build-and-integrate-a-serverless-react-application-with-crowdbotics-and-aws-amplify-8ffd0dd00a67)

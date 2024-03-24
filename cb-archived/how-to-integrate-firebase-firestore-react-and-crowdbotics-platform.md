---
title: 'How to integrate Firebase and Firestore cloud database with a React application'
date: '2019-06-20'
slug: 'how-to-integrate-firebase-firestore-react-and-crowdbotics-platform'
thumbnail: '/thumbnails/firebase.png'
tag: 'firebase'
canonicalUrl: 'https://blog.crowdbotics.com//how-to-integrate-firebase-firestore-react-and-crowdbotics-platform/'
---

Firebase is a Backend as a Service (BaaS) that gives an advantage to web developers who use ReactJS for developing web applications. It is a platform that got acquired by Google and has a healthy and active community. Most users in this community are web and mobile developers. It includes services like mobile analytics, push notification, crash reporting and out of the box provides email as well as social authentication. As a web developer, by using Firebase you can start building an MVP (minimum viable product) by keeping the costs low and utilizing your time and effort in building the application quite faster than adopting a traditional approach by building your own custom backend solution.

**In this tutorial, we will be learning how to get started by integrating the Firebase and Firestore cloud database with a React application.** We will also create a bare minimum demo application from scratch with the help of Firebase & React Native to see how they work together.

**TLDR;**

- Requirements
- Getting started: New Firebase Project
- Connecting Firebase with React App
- Creating a Firestore Database

## Requirements

In order to gain everything by reading this tutorial, make sure you have:

- a Firebase account (_free tier_)
- NodeJS `v8.x.x` or higher installed along with `npm/yarn`
- `create-react-app` global module to scaffold a React project

## Getting Started: New Firebase Project

To get started you need a Firebase account. To sign-up or log-in for one, visit [console.firebase.com](https://console.firebase.google.com). Once you are logged in, you will be welcomed by a screen below.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss1-2.png' />

Click on the button **Add Project**. This leads to another screen which contains a form to be fulfilled in order to create a new Firebase project.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss2-1.png' />

Fill the name of the project, check both the boxes for now and click on the button `Create project`. This will take some moments. Once the Firebase project is created, you will be welcomed by the home screen like below.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss3-2.png' />

Take a look at the side menu bar on the left. This is the main navigation in any Firebase project. That's it for now. It is that simple to create a new Firebase project via the official console.

## Create React App

To create a new react app, first, we need to install `create-react-app` by running the below command in a terminal window.

```shell
npm install -g create-react-app

# Check for the current version

create-react-app --version

# Output: 3.0.0
```

The second execution is to check the semantic version of `create-react-app` module. Make sure you are on the same version (_which is latest at the time of writing this post_) or higher than this.

To generate a new project run `create-react-app react-firebase-demo`. This will take some time to generate a new project and install dependencies that required to kick-start the default React app. Do note that, React by default uses `yarn` instead of `npm` as the JavaScript package manager to install dependencies.

## Connecting Firebase with React App

To connect Firebase with a React app, you need API key and store in the client side app somewhere (_probably as environmental variables when deploying the app_). Click on the settings ⚙️ in the sidebar menu and go to **Project settings**. There you will see under **Your apps** section all the platforms available such as iOS, and web. Click on the **Web** as shown below.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss4-1.png' />

Next, copy only the `config` variable in a new file called `firebase.js` inside the `src` directory of the React project. Initially, the file might look like below snippet.

```js
//firebase.js
const config = {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX'
};

firebase.initializeApp(config);
```

Where all the `XXXX`s are the key values. In order to continue, React app needs FirebaseSDK installed as an npm dependency. Open terminal window, make sure you are traversed inside the project directory and execute the following command.

```shell
yarn add firebase
```

Once the dependency is installed go back to `firebase.js` file and import firebase like below and it to the top of the file.

```js
//firebase.js
import firebase from 'firebase/app';

// ...

export default firebase;
```

You could have imported firebase from just `firebase`. The reason in the above file we are using `firebase/app` is that `/app` only adds the core of the firebase services. Right now, to integrate Firebase with our React app, we only need `initializeApp()` method to pass all the keys required to configure from the firebase.

While importing, if you use just `firebase`, it will include the whole bunch of services like auth, database, storage, functions, messaging, firestore, and so on. Most of them, we might not even need this demo application. This also increases the size of your bundle when deploying the application. Lastly, do not forget to export the instance configured firebase object that you will be using in the React app later.

## Creating a Firestore Database

There are two types of cloud-based database services provided by Firebase. One is called Cloud Firestore and the other one is a Real-time Database. This does not mean that Cloud Firestore cannot be used for real-time applications. Also, note that both of them are NoSQL databases.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss5-2.png' />

Real-time database stores data as one large JSON tree. Complex and scalable data is hard to organize in it. Firestore follows proper NoSQL terminology when it comes to storing data. It stores data in documents and each document can have sub-collections thus making it suitable for scalable and complex data scenarios.

Also, Realtime database only offers offline support for the mobile development using iOS and Android whereas Firestore supports both mobile platforms as well as web clients too. To read more about their differences you can visit the official documentation [here](https://firebase.google.com/docs/database/rtdb-vs-firestore).

In the Database section, choose the cloud Firestore and go to the second tab called **Rules**. If you are enabling Firestore for the first time, chances are you need to set the database security rules to test mode. This is where the firebase SDK will allow anyone (_one who has access to the config keys_) to read and write to the database. That said, this section should look like below.

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

Open `firebase.js` and import firestore instance.

```js
// firebase.js
// ... after other imports
import 'firebase/firestore';

// ... before export default statement
export const firestore = firebase.firestore();
```

Also, exporting the firestore instance will let you use it to query the database.

Now, go back to the Firebase console and go to the **Data** tab under Firestore.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss6.png' />

You will notice that there is currently no data inside the database. The **Add Collection** button represents the column that will contain the name of each collection that you might have in the database. Let us add some data using Firebase console interface such that we can query and display it in the next section. Click on the button **Add Collection** and enter the name of the collection as shown below.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss7-1.png' />

Click **Next** and enter two fields. One for the title of the book and the other one for the author's name. By default, the ID for each document will be auto-generated if the above option `Auto-id` is selected or remained untouched. Note that both of these fields represent one document as a whole.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss8.png' />

Notice that, we have not defined value for both the fields. Also, both the fields are of data type `string`. Of course, there are [other data types available and supported by Firestore](https://firebase.google.com/docs/firestore/manage-data/data-types). At last, click on the **Save** button to save the first, though the empty, entry in the Firestore database.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss9.png' />

_Did you notice how the ID for the document is generated on its own in the above image?_

## Creating the UI form

In this section, let us wire the React app to have a simple form that can be further used to send data and store it in the cloud. Currently, the React app is bare-minimum or default that is generated by the scaffolding tool `create-react-app`. To run it in its current state, from the terminal window execute `npm start`. This will start the development server, and open a new browser window in your default browser at the URL: `http://localhost:3000/`. If you do not have any errors (_which you won't_) you will see the following screen.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss10-1.png' />

The code that is being rendered in the above screen comes from the only component we have so far in our React app, inside `App.js` file. Open this file and then define the following state. Right now, the `App` component is a functional component.

```js
// App.js
class App extends React.Component {
  state = {
    title: '',
    author: ''
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
```

Notice that, for the `App` component to have stated, we converted it to a class component. Next, inside the render function, add the following form that contains two input fields.

```js
// App.js
render() {
        const { title, author } = this.state

        return (
            <div className='App'>
                <form onSubmit={this.addBook}>
                    <input
                        type='text'
                        placeholder='Title of the Book?'
                        name='title'
                        onChange={this.updateInput}
                        value={title}
          />
          <br />
                    <input
                        type='text'
                        placeholder='Author of the Book?'
                        name='author'
                        onChange={this.updateInput}
                        value={author}
          />
          <br />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
  }
```

This creates a not so awesome looking form but does serve the purpose of learning about Firestore.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss11-1.png' />

Both the input fields have a `value` attribute to specify which field is a target from the state object. Also, both the fields call a custom method `updateInput` to update the component's the state corresponding to the book's data from the input field. Let us right the business logic behind it before the render function in the above snippet.

```js
// App.js
updateInput = event => {
  this.setState({ [event.target.name]: event.target.value });
};
```

## Add data to the Firestore

In this section, you are going to write the logic behind how to add data from the React form to the Firestore. In the previous section, did you notice that the form has submitted button and an `onSubmit` event that leads to the function `addBook`. Define this function just before the `render()` method as below.

```js
// import this at the top of your file
import { firestore } from './firebase';

// App.js
addBook = event => {
  event.preventDefault();

  firestore.collection('books').add({
    title: this.state.title,
    author: this.state.author
  });

  this.setState({ title: '', author: '' });
};
```

In the above snippet, let us start by import an instance of the firestore from `firebase.js` that we previously defined. The `addBook` function takes an event as an argument. The first line inside the function stops the web page from refreshing after submitting the form. Refreshing a web page after clicking the submit button is the default behavior and we need to avoid.

Next, using the `firestore.collection("books")` points to the correct database collection where the data will be added on submitting the form. The collection name here is `books`. The `.add()` method submits the data from the updated to the firestore. Try adding one. Make sure `npm start` is running.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss12.png' />

After adding filling up the form as above, click on the submit button. After you add a book's title and its author, both the input field is set to the empty string, which is the default state and is a necessary step to add more data. Now, go back to the firebase console, to the books' collection and you will notice, as shown below, a new object with a random but unique ID and corresponding data in it.

<img src='https://crowdbotics.ghost.io/content/images/2019/05/ss13.png' />

## Conclusion

You have now successfully integrated and added data to the Firebase store. The method discussed in this tutorial to access Firestore is not the only way, but yet a simple one. For more information or to dive deep, take a look at the Firestore documentation **[here](https://cloud.google.com/firestore/docs/)**.

[Originally published at Crowdbotics](https://crowdbotics.ghost.io/how-to-integrate-firebase-firestore-react-and-crowdbotics-platform/)

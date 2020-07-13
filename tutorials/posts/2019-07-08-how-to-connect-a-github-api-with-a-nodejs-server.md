---
date: 2019-07-22
title: 'How to Connect Github API with a Nodejs Server'
template: post
thumbnail: '../thumbnails/node.png'
slug: how-to-connect-a-github-api-with-a-nodejs-server
categories:
  - Nodejs
tags:
  - node
---

![cover_image](https://blog.crowdbotics.com/content/images/2019/07/github.jpg)

Playing around with Github API is the easiest way to get started when learning any new technology stack or a framework. If you are trying to get familiarize with Crowdbotics app building platform and build a server from scratch on it, this is the tutorial you should read.

In this tutorial, you are going to build a demo app that fetches data from the Github API and render using a template. The server is going to set up from scratch using Nodejs as a platform and Express as the framework. This demo application is also going to OAuth strategy to access client's Github credentials. There is a lot to get out of this tutorial.

**Table of Contents**

- Requirements
- Setting Github OAuth application
- Bootstrap a Node Server
- Setup Handlebars Template
- Adding Github Passport for OAuth
- Fetching Data from Github API
- Interacting with Github API
- Conclusion

## Requirements

To follow this tutorial, you are required to have installed the following on your local machine:

- Nodejs `v8.x.x` or higher installed along with npm/yarn as the package manager
- Github Account
- Crowdbotics App builder Platform account (preferably log in with your valid Github ID)

**What are we building?** Here is a short demo.

![ss0](https://blog.crowdbotics.com/content/images/2019/07/ss9.png)

## Setting Github OAuth application

To fetch a user's data from his Github account, you have to define a strategy in the Node app for the user login using their Github credentials. To write this strategy, your app needs a Github API access key and a secret key. For this, you have to register a new OAuth application at this [link](https://github.com/settings/applications/new).

![ss3](https://blog.crowdbotics.com/content/images/2019/07/ss3.png)

You have to fill the required fields that are marked with a red asterisk symbol in the above image. The most import thing is that make sure in the above form, where it is specified **Authorization callback URL**, you enter the value: `http://localhost:3000/login/github/return`. Since the demo application is being built on a local development environment, hence the local host URL and the port number. If you are interested in hosting this application, make sure in the callback URL, instead of using localhost and the port number, you have are specifying the domain of your hosted application.

Once the form is filled, enter the button that says **Register application.** On the next screen, you will get two values. **Client ID** and **Client Secret**.

![ss4](https://blog.crowdbotics.com/content/images/2019/07/ss4.png)

In the Node server, you are going to use both of these values. So, if you have cloned the Github repo from the previous step, or create a new project, traverse inside it, create a new file called `.env`. This file is going to hold all the environment variables and secret data such as those two values just obtained.

Add the following content to the file and replace all Xs with actual values for **Client ID** and **Client Secret**.

```env
GITHUB_CLIENT_ID=XXXX
GITHUB_CLIENT_SECRET=XXXX
PORT=3000
```

The last variable, `PORT` in the above snippet defined is going to be used to bootstrap the server later. With this step complete, you have done all configuration part that was required, outside building the server app.

## Bootstrap a Node Server

Once you are inside the server folder, make sure you run the following commands sequentially using a terminal window. The first command will initialize the server directory as a node server and generate a `package.json` file. The second command will let you install all the required dependencies.

```shell
# to initialize
npm init --yes

# to install dependencies
npm install -save express cookie-parser connect-ensure-login dotenv express-handlebars express-session flatted github-api passport passport-github underscore
```

Once all the dependencies are installed, let us bootstrap a small server and see if everything is working or not. Create a new file `server.js` and add the following snippet to it.

```js
const express = require('express');

// import env variables
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Server is working.');
});

app.listen(port, () => {
  console.log(`🌏 Server is running at http://localhost:${port}`);
});
```

The above server is simple as it can be with only one `/` home route. The module`dotenv` enable the file to read environment variables and their values from the file `.env`. Go to the terminal window and execute the command `node server.js`. This will prompt with the message you have defined in the above snippet. Visit the URL `http://localhost:3000` from the browser window, and you will get the following result.

![ss5](https://blog.crowdbotics.com/content/images/2019/07/ss5.png)

## Setup Handlebars Template

Handlebars is a popular template engine among Express applications. It is powerful, open-source, and has a large community to help you out if you ever get stuck. Since to keep things simple in the demo server app you are building, let us Handlebars. Write code to setup handlebars. Open `server.js` file and modify it accordingly.

```js
const express = require('express');
const exphbs = require('express-handlebars');

// import env variables
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const COOKIE = process.env.PROJECT_DOMAIN;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({
  layoutsDir: __dirname + '/views'
});
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('main');
});

app.listen(port, () => {
  console.log(`🌏 Server is running at http://localhost:${port}`);
});
```

It is necessary to specify the path to a `layoutsDir` otherwise known as the layout directory. In the above snippet, the `views` directory is going to serve the purpose. Create a new directory at the root of the Node server app and inside this folder, create a new file called `main.handlebars`. Add the following code to this file. Inside the route `app.get('/')`, the returned file is going to be the name of the handlebars template file.

```handlebars
<!DOCTYPE html>
<html>

  <head>
    <title>GitHub API Example</title>
    <meta name="description" content="Github API app with Nodejs Server.">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
    <header>
      <h1>Github API Data</h1>
      <p>This page uses Handlebars as the template engine.</p>
    </header>

  </body>

</html>
```

The advantage Handlebar templates have is that they give you the power to use computable expressions using curly braces `{{}}` inside an HTML file. The above file does not use any expressions at the moment, but you will notice this in the future.

Execute the command `node server.js` again and visit the localhost URL as you did in the previous section. You will notice the following result. This means the template engine has been hooked with our Express server successfully.

![ss6](https://blog.crowdbotics.com/content/images/2019/07/ss6.png)

## Adding Github Passport for OAuth

Before you proceed in this section to define and add a strategy in order to consume Github credentials for them to login in your app using their Github account details, open `server.js` file, and import all required dependencies that are needed in this process.

```js
// ... after other imports
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const crypto = require('crypto');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const { stringify } = require('flatted');
const _ = require('underscore');
```

Next, let us define the passport strategy for Github. Passport is authentication middleware for any Nodejs server application. This means you can use it with other Node frameworks that are not Express. Using this module, helps Node server apps to be clean and maintainable code.

OAuth is a standard protocol that allows users to authorize API access to the web, desktop, or mobile applications. Once the access is granted, the authorized application utilizes the API on behalf of the user. This is what you are trying to implement. Once the demo application is authorized with a user's Github account, the application will fetch the required data from their Github account details.

Add the following snippet after you have defined the variable `port` in `server.js` file.

```js
let scopes = ['notifications', 'user:email', 'read:org', 'repo'];
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/github/return',
      scope: scopes.join(' ')
    },
    function (token, tokenSecret, profile, cb) {
      return cb(null, { profile: profile, token: token });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());
```

The `clientID` and `clientSecret` values are required in order to create OAuth Github client. These values are being obtained from environment variables. `The callbackURL` is the same as you defined when setting up a new Github application.

The `scopes` array holds values that are acceptable while creating a token to authorize the Node app with OAuth. The authorization of application can only happen for a user when scopes are defined and provided as above.

Once you have defined the Passport strategy, you have to create a cookie which will hold the saved authenticated user. Add the following middleware after previously defined other middleware functions.

```js
app.use(cookieParser())
app.use(
    expressSession({
        secret: crypto.randomBytes(64).toString('hex'),
            .randomBytes(64)
            .toString('hex'),
        resave: true,
        saveUninitialized: true
    })
)
```

Using the Node's core module `crypto`, it is easy to create a random string of secret value for the user's session in the browser. Let us also define other routes in this section to accept the main `/` that you are going to complete in the next section after writing the code to fetch data from the Github API.

Other routes include

- `/logoff` which will clear the cookie from the browser session as well as redirect the user to the home or initial route.
- `/auth/github` to authenticate the user using passport strategy
- `/login/github/return` is the callback URL. On success, it will create the cookie with user authorization data, and on failure, it will redirect to the initial route.
- `/setcookie` on successful auth, this route will store the user profile detail and token.

Here is the code for the above-mentioned routes.

```js
app.get('/logoff', function (req, res) {
  res.clearCookie(COOKIE);
  res.redirect('/');
});

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/login/github/return',
  passport.authenticate('github', {
    successRedirect: '/setcookie',
    failureRedirect: '/'
  })
);

app.get('/setcookie', function (req, res) {
  let data = {
    user: req.session.passport.user.profile._json,
    token: req.session.passport.user.token
  };
  res.cookie(COOKIE, JSON.stringify(data));
  res.redirect('/');
});
```

## Fetching Data from Github API

For this demo, you are going to fetch all the repositories of an authorized user. Create a new file called `api.js` and import the following dependencies.

```js
const GitHub = require('github-api');
```

The `github-api` is the dedicated package to traverse the Github API. Next, define an asynchronous function called `getGithubData` that will be responsible for executing a business logic to fetch the data from the API. It accepts a parameter called `token`. Also, create an empty object called `data` that will hold the actual data from the API. Add the following snippet of code to the file.

```js
async function getGitHubData(token) {
  let gh = new GitHub({
    token: token
  });

  let data = {};
  let me = gh.getUser();
  let repos = await me.listRepos();
  data.repos = repos.data;
  return data;
}

module.exports = getGitHubData;
```

The `getUser()` allows fetching the user details from the API such as notifications, repositories, and so on. In the above snippet, `listRepos` is the function that fetches the name of the repository that this Node application is going to display. Now, go back to `server.js` file and import the function `getGitHubData`.

```js
// ... after other imports
const getGitHubData = require('./api');
```

## Interacting with Github API

In this section, you are going to modify the index route and the handlebar template associated with it. Index route is where the complete interaction between the application and API is going to happen.

First, there is going to be a check whether the `session` and the `token` exists or not. This confirms that the user is logged in or not. Using `async/await` approach is the best way to make asynchronous calls. Next, using the `_` underscore utility library, create a shallow copy of the returned object from the Github API.

Then, use `stringify` method from the `flatten` library that helps to un-nest the JSON object. Lastly, send the data object to the template. Open the file `server.js` and modify the index route.

```js
app.get('/', async (req, res) => {
  let data = {
    session: req.cookies[COOKIE] && JSON.parse(req.cookies[COOKIE])
  };

  if (data.session && data.session.token) {
    let githubData;
    try {
      githubData = await getGitHubData(data.session.token);
    } catch (error) {
      githubData = { error: error };
    }
    _.extend(data, githubData);
  }

  if (data.session) {
    data.session.token = 'mildly obfuscated.';
  }
  data.json = stringify(data, null, 2);

  res.render('main', data);
});
```

Now you have to edit the `main.handlebars` template to show the data from the API.

```handlebars
<!DOCTYPE html>
<html>

  <head>
    <title>GitHub API Example</title>
    <meta name="description" content="Github API app with Nodejs Server.">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
    <header>
      <h1>Github API Data</h1>
      <p>This page uses Handlebars as the template engine.</p>
    </header>

    <main>

      {{#if session}}
      <p>
        You are now logged in.
      </p>
      <p>
        <a href="/logoff">Sign out</a>
      </p>
      {{else}}
      <a class="container" href="/auth/github">Log-in with GitHub</a>
      {{/if}}


      {{#if repos}}
      <h2>{{session.user.name}}'s Repositories</h2>
      <ul class="collapsible">
        {{#each repos}}
        <li>{{full_name}} -- owned by {{owner.login}}</li>
        {{/each}}
      </ul>
      {{/if}}
    </main>

  </body>

</html>
```

In the above template, start by adding a button for logging into the application using Github credentials. Start the server by executing the command `npm start` and then visit the browser window.

![ss7](https://blog.crowdbotics.com/content/images/2019/07/ss7.png)

If the user is logging in for the first time, they will be asked to authorize the app, as shown below.

![ss8](https://blog.crowdbotics.com/content/images/2019/07/ss8.png)

Once the app is authorized, the user will be welcomed by the following screen.

![ss10](https://blog.crowdbotics.com/content/images/2019/07/ss9-1.png)

This screen will only exist if the user is available in the `session`. In the template above, you are using an `if/else` statement to check for incoming data to the template from the index route and whether it consists of the session or not.

The `session` contains the user and its details, hence when displaying user's name along with repository data, `session.user.name` is being used.

## Conclusion

This completes this demo of integrating Github API with a Nodejs server application, fetching data from the API, implementing OAuth in the simplest way manner and using Crowdbotics platform to host the app.

---

[Originally published at Crowdbotics](https://blog.crowdbotics.com/how-to-connect-a-github-api-with-a-nodejs-server/)

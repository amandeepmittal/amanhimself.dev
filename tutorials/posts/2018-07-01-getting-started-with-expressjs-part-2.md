---
date: 2018-07-01
title: 'Getting Started With Expressjs Part 2'
template: post
thumbnail: '../thumbnails/node.png'
slug: getting-started-with-expressjs-part-2
categories:
  - Nodejs
tags:
  - nodejs
  - expressjs
---

In Part 1, Getting Started With Expressjs, we did learn a lot about how Expressjs works as a Node.js framework. We built a simple and generic web server in the previous article that had two routes to function. We then discussed other paradigms such as devDependencies, REST services and the general anatomy of an Express application. In this article, we are going to continue to build upon the previous article and we will start by generating a boilerplate project that can be used in any scenario, whether building an application using Express completely or just building a REST API using it.

## Introducing Express Generator

Building a web server from scratch time after time can be a tedious process. As a human being, it will be time consuming and in 2 out of 10 cases, there will be chances that you might forget about one configuration or the other and the whole server is not working. To overcome these problems, Express comes with a module that can be installed globally on a local machine, called express-generator. It is a generator tool through which as a developer you can create and populate different routes using database calls and views or template (if using a template engine).

We will build rest of the series using this tool so it will be better if you install it. From your terminal, run this command:

```shell
npm install express-generator -g
```

To create our project, we will continue to build in the same directory. We will also be using a default template engine which will be explained later in this article.

```shell
express --view=pug
```

If you want to build the app from scratch, the only option you are missing from the above command is the **name** of the project:

```shell
express express-server --view=pug
```

Installing express-generator gives access to `express` command which can be used to scaffold a project structure and a basic web server. There are various options you can choose when starting out with a new project. Such as:

```shell
$ express --help

  Usage: express [options] [dir]

  Options:

    -h, --help           output usage information
        --version        output the version number
    -e, --ejs            add ejs engine support
        --pug            add pug engine support
        --hbs            add handlebars engine support
    -H, --hogan          add hogan.js engine support
    -v, --view <engine>  add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>   add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git            add .gitignore
    -f, --force          force on non-empty directory
```

You can always choose a view/template engine using `--view` along with a CSS engine using `--css` since there is huge support for various commonly used css generators such as SASS and LESS.

## Running the Express-Generator Project

Notice the directory structure of the newly created application. It is close MVC (model-view-controller) design pattern. We will be building our controllers part later but for now, we can use `routes/` for it. The Model part will be our database that is not defined in this structure and we will have to add it manually. The views are available to us in `views/` directory.

The package.json defines the application dependencies and other information. Let us take a look at it:

```json
{
  "name": "node-js",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",
    "pug": "2.0.0-beta11"
  }
}
```

By default, there is no devDependencies installed in this project, we will be adding one sooner than later. On comparing to the previous project, we defined bootstrapping configuration in a file called `index.js`. This time, using this tool, our the configuration to run the Express server is available to us in `/bin/www`. This file further loads another file called `app.js` which we will be using to define our own custom configuration and other essential parts such as defining a template engine, defining routes and other middleware functions.

The dependencies that come with this project are bare minimum but enough trigger a basic web server up and running. First of all the most important dependency of all `express`. Then there is `debug` module which you will see it in action below and is a node debugging utility, `pug` our template engine, `http-errors` to catch HTTP methods errors gracefully, and `cookie-parser` which is used to parse the information such as cookie header and populate `req.cookies` between a client and server. Lastly, `morgan` which is an HTTP request logger middleware for Node.js.

For now, we are going to install another dependnency called `body-parser` which is another essential dependency we need and is used to parse body of an incoming HTTP request. It makes our job as a developer to be easier as it helps in extracting different part of an incoming HTTP request as information useful to our application. Mostly, we need this when we are working with forms or any other POST HTTP requests from our client.

```shell
npm install --save body-parser
```

To run this project, we will have to install dependencies available to us by default.

```shell
npm install
```

Then we can run this project by running:

```shell
DEBUG=node-js:* npm start
```

To verify if our project is running, open the browser window and visit http://localhost:3000. You know have a basic working web server plus Expressjs application. At this step, we will also enable auto server restart on file changes as this functionality is not handled by Express framework by default. We will be using nodemon for this. To know how to install and use `nodemon` refer to article one in this series. Also, the `DEBUG` is provided to us by `debug` dependency.

To close this section, we will be changing our `scripts` object in `package.json` file to make use of nodemon.

```json
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  }
```

We can start our development server now by calling `npm run devstart` and nodemon will watch for file changes.

## What is `app.js`?

`app.js` file is where define our most configuration and other necessary essentials such as routes to build the web server. This file is created by express-generator and name of the file is a convention with the community. Along with setting up the application, this file also defines various middleware functions and lastly exports `app` as a module to be used in other parts of the application. On practical example of using this `app` module is in `/bin/www`:

```javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
```

This is how our `app.js` file looks like now:

```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

We can see that the file starts by importing various dependencies. We use `require()` function. After that, we set `views` to specify the folder where our templates will be stored and then we set `view engine` value to `pug` to determine which template engine we will be using such that Express framework can identify by the file extension of any views file `.pug`.

## Middleware Functions

`app.use()` is how we can use any middleware function. Middleware functions are those functions that have access to the request object (`req`), the response object (`res`), and the `next` function in an application’s request-response cycle. The motive of these functions is to modify incoming requests and outgoing response objects by performing tasks like parsing request bodies, adding response headers, or by making any other change to request-response cycle. Using a middleware function, you can even end the request-response cycle such as done using a custom error handling middleware function.

The `next` function is the most important of a middleware function and this is what separates it from other regular functions. If a middleware function does include `next()` that means the request-response cycle is ended there. The name of the function `next()` here is arbitrary and you can name it whatever you like, however, the name is now stuck within the community and is more of a convention just like `app.js`.

In our `app.js` you can see the use of both a third party middleware and a custom one. For third-party middleware, we are requiring `morgan`, `express.json()`, `express.urlencoded` etc. For a custom middleware function, see the one that is labeled as to catch _404_ errors.

```javascript
app.use(function (req, res, next) {
  next(createError(404));
});
```

### Error Handling Middleware Function

Another custom middleware function you can notice in our `app.js` fule is the Error middleware function. What separates an error handling middleware function and a normal and how an express application differentiates between the two is the number of arguments passed. Notice in the below error handling middleware function:

```javascript
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

There are four arguments passed if compared to a normal middleware function as we learned in the previous section. The extra argument, `err` is what separates the two lets the express application differentiate between the two. Also, any error middleware must be defined last in the order. The order of every middleware function is important and you can just replace one with another. The application or the web server might not work. So it is important to keep them in order. This is important because of the request-response cycle.

### Serving Static Files

By default, we do not have to install any dependency use Express as a static server. `express.static()` will serve any file defined using a path. We use global variable `__dirname` together with `path` module to define such paths.

```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

As a convention, this middleware helps us to serve all static files in the `/public` direcotry of project's root.

### Parsing The HTTP Body

Remember, earlier we installed a module from npm called `body-parser`? Well, I am going to tell you now that you will have remove it from your project. The reason is that the latest Express version now includes a second built in middleware function called `express.json` and `express.urlencoded` that behave exactly in the same manner as `body-parser`.

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// can be written if using `body-parser`

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

`body-parser` have both of these functions. The reason I made you installed this package is that, as Node.js developer you are going to come across older Express versioned projects and you should know the difference or in this case the similarity between the two/
You can uninstall this package by using below command:

```javascript
npm uninstall --save body-parser
```

## Template Engine

Express support various template engines such as handlebars, pug, its previous version jade, ejs, twigs, etc. A Template engine is library that allows us to use any template language. A template language is a special set of instructions that instruct this library to process data and display to on the client. Using a template engine is easy with Express. However, Express comes with a default template engine, Jade, which is the first released version of Pug. To demonstrate how to use a Template Engine, we will be using Pug.

Notice the file `index.pug` in the directory `views/`:

```pug
extends layout

block content
  h1= title
  p Welcome to #{title}
```

Do you remember at the start when we ran our server we were displayed with a title called `Express`. The corresponding route for this template is rendering that title for us. You can find the corresponding route in `routes/index.js` file.

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

We will now add one more route to this file called `/about`.

```javascript
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});
```

Notice the `res.render()` which takes the first argument as the name of the template file and then we can send some options that will be used in our views. All this happens quickly behind the scenes. We will add the corresponding template for this route `views/about.pug`.

```pug
extends layout

block content
  h1= title
  p Welcome to #{title}
```

If you visit http://localhost:3000/about URL in your browser you will notice those changes.

## Logging

One more thing to notice here is that, the use logger or morgan module we installed as middleware function early in our `app.js`. If you visit the terminal window, you will notice the following output:

```shell
GET / 304 331.932 ms - -
GET /stylesheets/style.css 304 10.878 ms - -
GET /about 304 23.367 ms - -
GET /stylesheets/style.css 304 0.888 ms - -
GET /stylesheets/style.css 304 0.596 ms - -
```

The output is descriptive in itself. The `GET /` is the route part followed by an HTTP status like `304`. Logging is one of the most useful components when building an application. In production mode, it can be a huge asset if used because it will be working as monitoring utility. Managing a logging component in a Node.js application can help the developer discover and omit problems, errors, etc. quickly and save time. With the help of a proper logging system only, you as a developer will be able to debug your Node.js application if encountered any error. The aim of this article is to help you setup and use logging in a Node.js application. First, there are some requirements for logging a typical Node.js application. Let us see what they are.

There are three requirements for a module logging work. You can think of them as a convention but all these requirements will be helpful to you in development. They are:

- Timestamps: to convey the time of an event that happened in an application.
- Format: there are various logging formats used in the industry. To quickly understand, choose a format that maintains a good balance between being brief and descriptive enough
- Logging Levels: Sometimes having different levels to describe different events can be helpful. These levels could be warning, error, success, etc.

Using `console` methods are a huge part of JavaScript community but they should not be used or relied upon to log an Expressjs application. To get the logging right in your Node.js application, the first thing that comes to mind and practice is using the `console` module. The `console` module is provided by Node.js core API. It is the basic kind of logging and is built in. It can be used for small and spontaneous purposes.

The problem with any `console` method is that once a problem is encountered, the logs cannot be switched off. It will always print. This is a huge disadvantage at the application level of this module. Another thing that lacks from `console` API is that you as a developer cannot assign levels of logging.

This where a logging module like `morgan` comes into the picture. We are using the `dev` format option and passing it as an argument to our module. `dev` is the logging format we are using. There are various formats available such as `tiny`. Most formats will have a predefined structure just like the `dev` format:

```shell
:method :url :status :response-time ms - :res[content-length]
```

## Using Environment Variables with Express Generator

Almost every web server needs some custom configuration. You can define them in a separate file using a convention called `config.js` but managing these configurations in applications can be tricky and as the project scales, hard to maintain. Node.js provides us a way to manage these configurations by defining separate environment variables in one application source code which makes the app itself easy to manage. To implement this process, you can use thrid party npm modules like `dotenv()` but with Express generator tool we are going to use a different approach.

Create a directory in the root of our project `config` inside we will define a file called `config.json` where we will store our environmental variables.

```json
{
  "server": {
    "port": 3001
  }
}
```

We will edit our `bin/www` script to use this config.

```javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('node-js:server');
var http = require('http');
// add this line
const config = require('../config/config.json');

/**
 * Get port from environment and store in Express.
 */

// change this line
var port = normalizePort(process.env.PORT || config.server.port);
app.set('port', port);
```

Now if you visit `http://localhost:3001/` you will get the desired result.

---

[Originally published at javabeginnerstutorial.com](https://javabeginnerstutorial.com/node-js/getting-started-with-expressjs-part-2/)

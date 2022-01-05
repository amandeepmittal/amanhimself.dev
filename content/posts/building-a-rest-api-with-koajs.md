---
title: 'Building a REST API with Koajs'
date: '2018-10-16'
slug: 'building-a-rest-api-with-koajs/'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/crowdbotics/building-a-rest-api-with-koajs-417c276929e2'
---

![cover](https://i.imgur.com/ohg3d3s.png)

> [Originally published at Crowdbotics](https://medium.com/crowdbotics/building-a-rest-api-with-koajs-417c276929e2)

There are quite a few [Node.js](http://crowdbotics.com/build/node-js?utm_source=medium&utm_campaign=nodeh&utm_medium=node&utm_content=koa-rest-api) frameworks available for web development to build a back-end server for a web or a mobile application. The most popular framework is ExpressJS, which has been used widely in the industry for a long time.

In this article, however, **we are going to discuss** [**Koa**](http://koajs.com)**, to write server-side code that uses Node.js as the runtime engine. In this tutorial, I will show how to build a** [**small REST API**](https://blog.crowdbotics.com/how-to-write-an-api-in-3-lines-of-code-with-django-rest-framework/) **then test it using a REST Client.**

### What is Koa?

Koa is designed and built by the team behind ExpressJS with additions such as promises and `async/await` support in its core. These ES2015 features are used to tackle API's asynchronous calls. Distributed as a lightweight Node.js framework, Koa provides a minimal interface for developing web applications and APIs.

Koa has features that help JavaScript developers who want to use and leverage Node.js to accelerate the development of APIs and web applications. I have been using Koa for some of my latest back-end applications and I would love to share my knowledge to get you started.

### Features of Koa

Some of the features of the Koa framework include:

- Designed as a lightweight and flexible framework for Node.js
- Support for ECMAScript 6 (/ES2015) by default
- Developers can use generators as functions to stop and resume the code execution
- Simplifies the use of Error handling by using middleware more effectively
- Identifies and understands all HTTP methods
- Even before Express, Koa had support for `async/await`

To use this framework, the only two requirements for runing the code examples below is to have Node.js installed in your local machine along with `npm` to access and install it as a dependency. The second requirement is to have a general understanding of JavaScript as a programming language.

### Getting Started

To start using Koa as a server-side framework you will have to first install it. Create a directory where you will want to place all the project related files. We will first initialize it as a Node.js project.

```shell
# First initialize an empty directory
npm init -y
```

This will help us generate a `package.json` file that holds all the records of dependencies we add to our project using `npm`. I am using `-y` flag to skip the questionnaire prompted by npm. You will get a similar result once it is done.

```json
{
  "name": "koa-rest-api-tut",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Aman Mittal",
  "license": "MIT"
}
```

Next step is to add Koa as a local dependency. I am sure you know what a local dependency here means. If not, please refer to `[npm](https://docs.npmjs.com/)` [documentation](https://docs.npmjs.com/).

```shell
npm install -S koa
```

So far so good. Now we can get started and build our application. However, please note that to use Koa either on your local machine or deploy any server-side project that uses it, _you need to have Node.js version equal to or greater than_ `_v7.6.0_`_._

### Our First Koa App

To understand Koa better, and point out the differences with a commonly used framework such as ExpressJS, we are going to first write an obligatory _Hello World_ program.

Below, we create a route in a file called `app.js`.

```js
// app.js
const Koa = require('koa');
const app = new Koa();

// Our First Route
app.use(async ctx => {
  ctx.body = 'Hello World';
});

// Bootstrap the server
app.listen(3000);
```

Now, open the terminal and run the following command:

```js
node app.js
```

If you are not prompted with an error, that means the server ran successfully.

Right now, we are not getting anything exciting from the terminal. If you go to `http://localhost:3000` in your browser window, you should see a `Hello World` message greeting you!

<img src='https://cdn-images-1.medium.com/max/800/1*vmF-dRrg83Uq4Zt6BbkAEg.png' />

To understand more about what is happening, let’s import the Koa library into our `app.js` file.

Next, we define an instance called `app` that will access all the methods that are included in Koa's API such as `use()` and `listen()`. `app.use()` is how th middleware function is defined. We are using this middleware function as a route. The `app.listen()` is how the server knows to run on a port number specified such as `3000`.

### Wait, what is ctx?

Another important feature that we use in our bare minimum example is `ctx`. I do hope you noticed it there.

We are using `ctx` as an argument to the asynchronous middleware function. It is called **Context** in Koa and it encapsulates **request** and **response** objects into a single object. Unlike ExpressJS, that requires request and response as separate objects passed as arguments. For example:

```js
// request and response objects in ExpressJS

app.use((request, response) => {
  // ... rest of the route
});
```

In Koa, a context is created for every request that comes to the server and is always referenced as a middleware.

```js
// request and response as context in Koa
app.use(async ctx => {
  ctx.request;
  ctx.response;
});
```

### Side Tip: Installing nodemon

Before I start on REST APIs, the core of the article, I want to introduce a great tip that is helpful in building a Node.js application. During the development mode, irrespective of the framework I am using, I use `nodemon` as a dependency to watch for file changes and automatically restart the application. This eliminates the need of running `node [filename].js` command again and again. You can totally, skip this step and move on the next one where I show the steps for writing the REST API.

This small utility has such an impact on my workflow that it saves hours of development chores. So let me show you how to set it up in our demo application. I am using the same project as previous **Hello World** example to demonstrate this. Write the following command to install it.

```shell
npm install -D nodemon
```

`-D` flag is used to tell npm to install the current dependency as a `devDependency`. The difference between it and a normal dependency is that `devDependencies` tend to work only in development environment. They are not installed in a production environment since there is no use of them there. Other types of `devDependencies` you might come across when writing Node applications are linting tools such as ESLint.

Once, `nodemon` is installed, append the `package.json` file and an npm script.

```json
"scripts":{
  "dev": "nodemon app.js"
}
```

Point this script to the initial file of the Koa application, in our case, it is `app.js`. To run the application now, all you have to type is `npm run dev` command in your terminal. This time, you will see a few messages suddenly prompted in the terminal. These messages are provided by `nodemon`.

### Building the REST API

Finally, you have arrived at the point where you can start building the REST API. You have to install dependencies for the API to work. Let’s install them.

```shell
npm i -S koa-body koa-router
```

> What are these dependencies for?

**koa-body** is a body-parser middleware. It supports `urlencoded`, multi-part and `json` request bodies. Basically, it helps to create and respond to HTTP `POST` requests which are available as a form field, or a file upload, etc. It tells the server that the incoming request from the client has a body of data. ExpressJS uses the same approach in handling body requests.

**koa-router** is the routing middleware that provides ExpressJS style routing using HTTP verbs. It has methods that you can directly use in the application Such as `app.get()`, `app.post()`, etc.

**Note:** I will be mocking data in this application for the sake of brevity and clear understanding of framework’s concepts. If you want to, you can use the database of your choice. The structure of data is not complex.

Write the following code in the `app.js` file.

```js
// app.js

const Koa = require('koa');
const koaBody = require('koa-body');

// create app instance
const app = new Koa();

// middleware functions
app.use(koaBody());

// Require the router here

// use the router here

app.listen(3000);
```

After body-parser middleware, you are going to have the routes. I am using another file to describe the routes to separate the code for clear understanding. Create a new file called `books.js`. Define the following inside that file with the data to mock.

```js
// books.js

const Router = require('koa-router');

// Prefix all routes with: /books
const router = new Router({
  prefix: '/books'
});

let books = [
  { id: 101, name: 'Fight Club', author: 'Chuck Palahniuk' },
  { id: 102, name: 'Sharp Objects', author: 'Gillian Flynn' },
  { id: 103, name: 'Frankenstein', author: 'Mary Shelley' },
  { id: 101, name: 'Into The Wild', author: 'John Krakauer' }
];

// Routes will go here

module.exports = router;
```

First, I am importing the necessary dependency to create routes: `koa-router`. The next step is to create an instance of this newly imported dependency. Notice the prefix part: `/books`. Using a prefix for the routes is how you can define and categorized different routes. You can also use this technique to classify the different API versions such as `v1`, `v2`, etc.

The `books` array is the mock data. It contains information about books and each book is represented by a separate object inside the array. Each object further has three data fields: `id`, `name`, and `author`.

Let’s build the first route of our API.

### Creating a route to handle GET request

Below is the code for handling a `GET` request in Koa. Add the following code to `books.js`.

```js
// books.js
router.get('/', (ctx, next) => {
  ctx.body = books;
  next();
});
```

The callback function attached to the `router.get()` contains two arguments. I have already explained to you what `ctx` or context is. The last argument is `next()`. This is often used in middleware functions. Any middleware function invokes this function to indicate the current middleware function has suspended running and the next middleware function available must be invoked.

This callback function traverses through the `books` array when to send the response. To run this, you have to first include the routes file in `app.js` and invoke them.

```js
// app.js
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

// Set up body parsing middleware
app.use(koaBody());

// Require the Router we defined in books.js
let books = require('./books.js');

// Use the Router on the sub route /books
app.use(books.routes());

app.listen(3000);
```

Next step is to run the command: `npm run dev` and visit the url `http://localhost:3000/books` to see the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*d-GFucqnhOEIeORSytPH4w.png' />

> _Congratulations! 🎉 You just build your first route using Koa._

Next step is to create a route to fetch a book by its `id`. It is going to use the similar approach as the previous route, plus we see how to extract information from `request.params` object of an incoming request.

```js
// books.js
router.get('/:id', (ctx, next) => {
  let getCurrentBook = books.filter(function (book) {
    if (book.id == ctx.params.id) {
      return true;
    }
  });

  if (getCurrentBook.length) {
    ctx.body = getCurrentBook[0];
  } else {
    ctx.response.status = 404;
    ctx.body = 'Book Not Found';
  }
  next();
});
```

Routing parameters are named segments that are used capture the values specified in the URL. In our case, such as`:id`. Above, we define a routing middleware function that can handle incoming requests from URLs such as `http:localhost:3000/books/103`. Enter this URL in your browser window and you will get the following result.

<img src='https://cdn-images-1.medium.com/max/800/1*-F6g2j_QsvwBjXUdrVsZhw.png' />

In case of when `id` does not exist or is invalid, you have to send an error message with an HTTP status of `404`.

<img src='https://cdn-images-1.medium.com/max/800/1*BKDmJ80xYVoOsVQTNaMiKw.png' />

### Handling a POST request

The last route you are going to build for this demonstration is going to handle `POST` requests.

```js
// books.js

router.post('/new', (ctx, next) => {
  // Check if any of the data field not empty
  if (
    !ctx.request.body.id ||
    !ctx.request.body.name ||
    !ctx.request.body.author
  ) {
    ctx.response.status = 400;
    ctx.body = 'Please enter the data';
  } else {
    let newBook = books.push({
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      author: ctx.request.body.author
    });
    ctx.response.status = 201;
    ctx.body = `New book added with id: ${ctx.request.body.id} & name: ${ctx.request.body.name}`;
  }
  next();
});
```

The `/new` route is used for creating a new book add it into our `books` array. I am using this to mock data and not real database so restarting the application will delete the newly added books. In the above routing middleware, the Koa Context object first checks if any of the data field required in `request.body` is present or not. If one of them is missing, this routing middleware will be terminated and sends back an error to the user.

If everything is fine, this routing middleware accepts the data and returns success message with correct HTTP status of code for creating a new record. To run this URL, I am using `curl` command from my terminal but you can use any REST client such as Postman or Insomnia.

<img src='https://cdn-images-1.medium.com/max/800/1*qbXL75_xqOrtgE0UTXEPPw.png' />

For our all routes to be more descriptive and follow REST API pattern, I have re-written every `ctx.body` object from each routing middleware function. Here is how the complete routing file looks so far.

```js
// books.js
const Router = require('koa-router');

// Prefix all routes with /books
const router = new Router({
	prefix: '/books'
});

let books = [
	{ id: 101, name: 'Fight Club', author: 'Chuck Palahniuk' },
	{ id: 102, name: 'Sharp Objects', author: 'Gillian Flynn' },
	{ id: 103, name: 'Frankenstein', author: 'Mary Shelley' },
	{ id: 104, name: 'Into The Willd', author: 'Jon Krakauer' }
];

// Routes will go here
router.get('/', (ctx, next) => {
	ctx.body = {
		status: 'success',
		message: books
	};
	next();
});

router.get('/:id', (ctx, next) => {
	let getCurrentBook = books.filter(function(book) {
		if (book.id == ctx.params.id) {
			return true;
		}
	});

	if (getCurrentBook.length) {
		ctx.body = getCurrentBook[0];
	} else {
		ctx.response.status = 404;
		ctx.body = {
			status: 'error!',
			message: 'Book Not Found with that id!'
		};
	}
	next();
});

router.post('/new', (ctx, next) => {
	// Check if any of the data field not empty
	if (
		!ctx.request.body.id ||
		!ctx.request.body.name ||
		!ctx.request.body.author
	) {
		ctx.response.status = 400;
		ctx.body = {
			status: 'error',
			message: 'Please enter the data';
    }
	} else {
		let newBook = books.push({
			id: ctx.request.body.id,
			name: ctx.request.body.name,
			author: ctx.request.body.author
		});
		ctx.response.status = 201;
		ctx.body = {
			status: 'success',
			message: `New book added with id: ${ctx.request.body.id} & name: ${
				ctx.request.body.name
			}`
		};
	}
	next();
});

module.exports = router;
```

<img src='https://cdn-images-1.medium.com/max/800/1*R2_CY-WOiEM2pqE-bLQbRg.png' />

This completes the basics of building a REST API using Koa as a Node.js framework. It’s a pretty minimal framework with all the necessary ways to tackle incoming requests and send the response back from the server. Koa also supports ready-made middleware functions to make use for logging, handling errors, testing, compression, and security.

> You can find the complete code used in this tutorial at [this Github repository](https://github.com/amandeepmittal/koa-rest-api-tut)

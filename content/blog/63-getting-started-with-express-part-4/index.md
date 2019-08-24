---
slug: getting-started-with-express-part-4
date: 2018-06-28
title: 'Getting Started With Express Part 4'
categories: ['nodejs']
description: '---'
published: true
author: 'Aman Mittal'
banner:
---

In the previous article, we learned how we can leverage ODM like Mongoose to connect the database to our Express server web application and define schema and model inside our web application to interact with the MongoDB database. In this tutorial, we are going to work on the controller part of our web server. We will be defining some routes using BookSchema. Let us get started.

## Introduction

Routes are the backbone of a web application built using a server. Without it, you won't be really building a web app. When I say routes here, I mean server side routing. There is a huge difference between a server side route and the client side routing. Routing is the concept in which HTTP requests or client requests are handled by some snippets of code. It is used for navigating in a web application by clicking on a link which further, changes the URL to provide access to a different endpoint in the application.

In server side routing, whenever the endpoint changes, some form of data is requested by the application. This is the main purpose of server side routing. The server will query the database to fulfill the request and sends it as a response. In most Expressjs applications we define our routes in a separate file called `routes.js` which handles the business logic such as database queries. For example, take a look at the GET request that will handle the by fetching the list of items from the database.

Server side routes cause the web application to refresh the page. This means, whenever a GET request is sent to the server, the response always comes back to the client as a new document. This is a resource consuming task. For every request, if there is a full page refresh, some of the same data will be transferred back and forth such as the header of the application. Refreshing a page takes time and consumes network resources. This is why need client side routing to navigate for different resources avoiding the web pages to refresh again and again.

### HTTP Verbs

Routing refers to how a server side application responds to a client request to a particular endpoint. This endpoint consists of a URI (a path such as `/` or `/books`) and an HTTP method associated with it such as GET, POST, PUT, DELETE, etc. Routes can either be simple web pages or REST/GraphQL API endpoints. In both cases, the syntax is similar for a route can be defined in an Expressjs app as:

```javascript
app.METHOD(PATH, HANDLER)
```

Routes help us developers to maintain and scale an application by keeping different endpoints and the business logic behind them as separate concerns. In an Expressjs app, all routes defined must be invoked before the function call of `app.listen()`.

HTTP is a standard protocol for a client and a server to communicate over. It provides different verbs or methods such as GET, POST, PUT, DELETE, PATCH to communicate with the client. Each route in an Express application has a handler that is responsible for sending the response from the server whenever the route is invoked as a URL by the client.

For example, a route of `app.get()` is used to handle GET requests and in return responds with a message:

```javascript
// GET method route
app.get('/', (req, res) => res.send('Hello World!'))
```

The example above uses the `.get()` method to respond to HTTP GET requests with a certain path (in this case `/`). Other HTTP verbs provided to us are post(), put(), delete(), options(), trace(), copy(), lock(), mkcol(), move(), purge(), propfind(), proppatch(), unlock(), report(), ​​​​​​ mkactivity(), checkout(), merge(), m-search(), notify(), subscribe(), unsubscribe(), patch(), search(), and connect().

### Routing Functions

A routing function is a combination of a route path and a callback handler that that is responsible for sending the response from the server. This callback function takes three arguments that will contain an HTTP Request object, an HTTP response, and the next function in the middleware chain.

```javascript
app.get('/home', (req, res) => {
  res.send('Home Page')
})
```

### Routing Paths

The route paths are defined as endpoints at which requests from a client can be made. Below when we implement the controller of our application, you will see that we will be defining a route path for the existing database model called `/books`. Routing paths can be strings, string patterns, or regular expressions.

Take a look at the example below. We are defining a route path called `/about` in first and using wild characters in the second which certainly signifies that it is a combination of string patterns and regular expressions and in the third one we only use a wild character to signify that it is a 404 route.

```javascript
app.get('/about', (req, res) => {
  // ...
})

app.get(/.*new$/, function(req, res) {
  // ...
})
```

### Routing Parameters

They are named part in a URL that signifies a dynamic value associated with the endpoint. These named parts are prefixed with a colon sign (:) followed by the actual name. The name of route parameters must be made up of characters ([A-Za-z0-9_]). Take a look at the example below:

```javascript
app.get('/books/:bookId', function(req, res) {
  res.send(req.params)
})
```

In the above route example, we can access the `bookId` from `req.params.bookId`. This will be equal to the actual URL: `http://localhost:3000/books/43`.

## Routes in our Web Server

In this section, we will be creating routes for our web server application. Instead of creating routes in `app.js` we will be defining them in the routes directory. Also, we will be using an instance of `express.Router()` instead of `app.HTTPmethod`. It works similarly and has access to every HTTP method provided.

To start, create a new file called books.js inside routes directory. In this file, we are only going to define the endpoints related to our model. These endpoints are URLs through which any client can send request to our Express based web server.

```javascript
const express = require('express')
const router = express.Router()

const bookController = require('../controllers/booksController.js')

// GET ALL BOOKS titles
router.get('/', bookController.booksList)

// GET a BOOK by id
router.get('/:id', bookController.getBookById)

module.exports = router
```

The routes are all set up on the Router instance which is then exported to be invoked inside app.js file later.

The business logic behind each of there endpoint, that is the callback function or the routing function that will process the incoming request will be handled in a separate file called booksController.js under a separate directory called controllers. You will have to create that at the root of our project.

Open booksController.js and start by import the database model for books.

```javascript
const Book = require('../models/book.model.js')

exports.booksList = (req, res) => {
  res.send('NOT IMPLEMENTED: Books list')
}

exports.getBookById = (req, res) => {
  res.send('NOT IMPLEMENTED: Get a single book')
}
```

Now we will require our routes file in app.js after all middleware functions.

```javascript
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var booksRouter = require('./routes/books')

// ...

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/books', booksRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})
```

Start the server by running

```shell
npm run devstart
```

Now open a REST client like POSTMAN and visit the URL: `http://localhost:3001/books`. You will see the below message printed because that is what we are currently sending from business logic or controller assoicated with the particular route.

```shell
NOT IMPLEMENTED: Books list
```

![ss1](https://javabeginnerstutorial.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-28-at-1.18.09-PM-768x360.png)

Next we will create a POST route that will add data to the database.

Open routes/books.js add a new route `/add`:

```javascript
router.post('/add', bookController.addBook)
```

In booksController.js, add:

```javascript
exports.addBook = (req, res) => {
  let newBook = new Book(req.body)

  newBook
    .save()
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send('unable to save data')
    })
}
```

![ss2](https://javabeginnerstutorial.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-28-at-1.25.35-PM-768x441.png)

Notice that we are using promise based `.then()` and .catch() methods. These methods are provided by Mongoose to us and we are not using any third party library to do so. Now to see if the data is saved in the database, we will fetch by using the `/` route. Open booksController.js and complete business logic for rest of the two routes:

```javascript
exports.booksList = (req, res) => {
  Book.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send('unable to fetch books')
    })
}

exports.getBookById = (req, res) => {
  Book.findById({ _id: req.params.id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send('unable to fetch books')
    })
}
```

See the screenshots below and if you get the output and no error that means your routes are working great!

![ss3](https://javabeginnerstutorial.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-28-at-1.40.23-PM-768x426.png)

![ss4](https://javabeginnerstutorial.com/wp-content/uploads/2018/06/Screen-Shot-2018-06-28-at-1.40.29-PM-768x416.png)

This completes our fourth part in the series. Stay tuned for more. You can find the source code for at this github repo under tag `chapter4`.

> [Originally published at javabeginnerstutorial.com](https://javabeginnerstutorial.com/node-js/getting-started-with-express-part-4/)

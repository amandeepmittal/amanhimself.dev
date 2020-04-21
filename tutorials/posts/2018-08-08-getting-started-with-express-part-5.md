---
date: 2018-08-08
title: 'Getting Started With Express Part 5'
template: post
thumbnail: '../thumbnails/node.png'
slug: getting-started-with-express-part-5
categories:
  - Nodejs
tags:
  - nodejs
  - expressjs
  - mongodb
---

In the last part of this tutorial series, we created two routes to fetch and add books to our bare minimum application. We had already connected MongoDB database in Part 4 by defining a schema and creating a model to connect with the routes. In this part, we are going to work with HTML forms.

To see if everything is working, open an instance of your server side app using `npm run devstart` script and `mongod` instance. After that, visit URL `http://localost:3001/books` in your browser and you will get the following result.

![ss1](https://i.imgur.com/zVeDNHL.png)

## What are HTML forms?

An HTML form is a group of fields or elements described as HTML tags on a web page that a user can interact with to add or update to our application. This mechanism allows us to collect user input data in various forms such as checkboxes, radio buttons, text input fields, user id/email, password, etc. Forms are considered a secure way of sharing data with the server. To submit a form from the client to server we make use of `POST` HTTP request.

A form in HTML is made of as a collection of HTML elements inside <form>...</form> tag. It contains at least one element of type="submit".

```HTML
<form action="/url" method="post">
    <label for="name">Enter name: </label>
    <input id="name" type="text" name="name" placeholder="Enter your name here">
    <input type="submit" value="OK">
</form>
```

Above example is a basic HTML form that accepts a user to enter their name and submit it by pressing the input button. The submit input will be displayed as a button. The form attributes define the HTTP method used to send the data which is `POST` and the destination of the data on the server, that is the URL.

## Building an Add Book Form

Since we are using a template engine, Pug, in our application to display data from the server to client, we will be creating the form using it. There is no difference except the indentation of tags and elements when it comes to writing a form using Pug. In `index.pug` add the below code:

```pug
extends layout

block content
  h1= title
  p Welcome to #{title}

  hr
  h2 Add a book

  form(method='POST' action='/books/add')
          div.form-group
            label(for='title') Title
            br
            input.form-control(type='text' id='title' placeholder='title' name='title')
          br
          div.form-group
            label(for='author') Author Name
            br
            input.form-control(type='author' id='author' placeholder='author' name='author')
          br
          div.form-group
            label(for='summary') Book Sumary
            br
            textarea.formControl(name="summary", cols="30", rows="2")
          br
          div.form-group
            label(for='isbn') ISBN
            br
            input.form-control(type='isbn' id='isbn' placeholder='isbn' name='isbn')
          button.btn.btn-primary(type='submit') Add
```

Here we are using four fields which we will be submitting in our route. Now add the values to each field like the below screenshot:

![ss2](https://i.imgur.com/R7VjKwk.png)

Since we already have setup our `/books/add` route in the books route controller, we will be prompted with a success message like in the below screenshot.

![ss3](https://i.imgur.com/tMjqLvt.png)

Our form is using the same techniques as for displaying information through our models by using our routes in a controller file. The route sends the input data to the controller which performs any action required to add data to the database. It might sound a bit complicated if you are a beginner but remember all this is happening in split seconds and this is a universal mechanism to handle forms. To verify that the data has been submitted in the databases, we can visit URL `http://localhost:3001/books` to do so.

## Adding Protection using helmet

To make an Express server app secure, the most needed package we need is to install and use `helmet`. Helmet is a third party library that helps to protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Helmet is actually just a collection of nine smaller middleware functions that set security-related HTTP headers. These middleware function include:

- csp sets the Content-Security-Policy header to help prevent cross-site scripting attacks and other cross-site injections.
- hidePoweredBy removes the X-Powered-By header.
  hpkp Adds Public Key Pinning headers to prevent man-in-the-middle attacks with forged certificates.
- hsts sets Strict-Transport-Security header that enforces secure (HTTP over SSL/TLS) connections to the server.
- ieNoOpen sets X-Download-Options for IE8+.
- noCache sets Cache-Control and Pragma headers to disable client-side caching.
- noSniff sets X-Content-Type-Options to prevent browsers from MIME-sniffing a response away from the declared content-type.
- frameguard sets the X-Frame-Options header to provide clickjacking protection.
- xssFilter sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers.

To install helmet, run

```shell
npm isntall -S helmet
```

To use it in our app, modify `app.js` like this:

```js
// ...

var helmet = require('helmet');
app.use(helmet());

// ...
```

It's best to use Helmet early in your middleware stack so that its headers are sure to be set.

## Input Validation

Our last piece of form handling comes to handling input fields. We need to validate that the correct or valid fields are being entered by the user and not some random data in our form. Validation checks that entered values are appropriate for each field (are in the right range, format, etc.) and that values have been supplied for all required fields.

We are going to use `express-validator` to validate our form's input fields. Install the dependency:

```shell
npm install -S express-validator
```

To use the validator in our controllers we have to require the functions we want to use from the 'express-validator/check'. We will first use `validationResult` from `express-validator`. Edit the `bookController.js` file like this.

```js
const Book = require('../models/book.model.js');

const { validationResult } = require('express-validator/check');

exports.booksList = (req, res) => {
  Book.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('unable to fetch books');
    });
};

exports.getBookById = (req, res) => {
  Book.findById({ _id: req.params.id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('unable to fetch books');
    });
};

exports.addBook = (req, res) => {
  let newBook = new Book(req.body);
  console.log(newBook);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  newBook
    .save()
    .then(data => {
      res.send('Success: Data submitted');
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Error: unable to save data');
    });
};
```

validationResult is an object that takes the incoming request from the client. It then, check for errors coming from `check` method of `express-validator` which we are going to implement in a minute. If there are no errors, the `if` condition is bypassed and the incoming data object is saved to the database as before. If there is an error caught by the `if` condition, the data is not saved and it results in an error.

Now, let us implement the second piece of this process. Edit `books.js` in the route folder.

```js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const bookController = require('../controllers/booksController.js');

// GET ALL BOOKS titles
router.get('/', bookController.booksList);

// GET a BOOK by id
router.get('/:id', bookController.getBookById);

router.post(
  '/add',
  [check('title').isLength({ min: 1 })],
  bookController.addBook
);

module.exports = router;
```

In the above example, notice how we are implementing a check for the `title` field in our form. The check basically says that the title field must have a length of at least one character. Otherwise, the incoming request will no pass.

In the below screenshot, we have left the title field empty. The validationResult runs, it throws an error.

![ss4](https://i.imgur.com/1hKTlGx.png)

> [Originally published at javabeginnerstutorial.com](https://javabeginnerstutorial.com/node-js/getting-started-with-express-part-5/)

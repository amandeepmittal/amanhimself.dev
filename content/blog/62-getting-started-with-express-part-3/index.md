---
slug: getting-started-with-express-part-3
date: 2018-06-24
title: 'Getting started with Express application Part 3: Connecting with Database'
categories: ['nodejs']
description: '---'
published: true
author: 'Aman Mittal'
banner:
---

## Introduction

With an Expressjs application, you can make use of all popular databases available to perform several operations such Create, Read, Update and Delete (CRUD operations). This tutorial will provide an overview of a database we are going to use with our Expressjs application, called Mongodb. Further, we will be looking into pragmatic concepts like what is an ODM/ORM, Schemas, Models and connecting the MongoDB database with our Express application.

Other popular options that we could use with Expressjs are PostgreSQL, MySQL, SQLite, Redis, etc.

## How to interact with a Database using Server side framework like Expressjs

Since there are many options with Express to use a database choosing the right database in the tech stack is important. But more important is to learn how to approach to interact with a database. There are two ways to do that. First, for database like SQL you can use native query language. Secondly, you can use an ORM or ODM in case of MongoDB.

An ORM (Object Relational Mapper) or an ODM (Object Data Model) are helpful with connecting a database using JavaScript from inside the Express application. You can define a minimal configuration setting to set it up. Next, bigger advatange of an ODM is that they also help you to query Database from controllers directly in an Express application using a similar syntax to JavaScript. Here, there is no need to learn much native query language and ORM such as Sequelize can interact with different form of SQL databases.

The benefit of using an ODM/ORM is that we developers can continue to think in terms of JavaScript objects rather than database native query language. This is helpful if you need to work with different databases and in real world, you will. Some examples of ORM/ODM are:

- Mongoose for MongoDB
- Sequelize for PostgreSQL, MySQL, MariaDB, SQLite and MSSQL
- WaterLine for Redis, mySQL, LDAP, MongoDB, and Postgres
- Bookshelf for PostgreSQL, MySQL, and SQLite3.

For our example we will be using Mongoose an ODM from the above list. It is open source and free to use and popular in Node.js community.

## MongoDB and Mongoose

To use MongoDB, make sure you have it installed in your local machine. You can refer the official documentation for that or if on mac, you can use a tool like Homebrew. MongoDB is a NoSQL database that stores information in the form of documents. Each documents can contain various fields and nested fields to represent the stored information. There can be different documents stored in a collection. A MongoDB database as whole will contain multiple collections. These collection of documents will be similar to a table of rows if you are familiar with SQL databases.

## Connecting the Database

To start using mongoose, we will begin by installing it in our project.

```shell
npm install -S mongoose
```

We will now make a database connection. Create a file called `dbconfig.js` inside `config/`.

```javascript
const mongoose = require('mongoose')

// define connection URI string
const DBURI = 'mongodb://localhost/nodejsexample'

// open mongoose connection
mongoose.connect(DBURI)

// Listen to CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose Default Connection with : ' + DBURI)
})

// When connection throws an error
mongoose.connection.on('error', err => {
  console.log('Mongoose Default Connection Error : ' + err)
})

// When connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose Default Disconnected')
})
```

Then we will require this file in our app.js such that when the server runs, the database connection is made. Mongoose provides different cases for each common scenarios by emitting events such as `connected` when the database is connected, `error` when there is an when connecting to a database (currently, we are using a local database instance, but in practical use case you data will be stored in cloud service such mlab, etc.) and `disconnected` when an interuption occurs while the server is running.

```javascript
// require it after you require other dependencies but before other configuration

require('./config/db.config.js')

var app = express()
```

Now, if you run the devserver from the terminal:

```shell
npm run devstart
```

You will notice a new message prompt that says `Mongoose Default Connection with : mongodb://localhost/nodejsexample`.

## Defining a Local Schema

We will now define a schema inside a directory called `models`, naming it `book.model.js`. You can use any any name, it is just a convention we are using in this example to name our file.

```javascript
var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: String }]
})

//Export model
module.exports = mongoose.model('Book', BookSchema)
```

To define a schema, every time, we need to require Mongoose in each schema file. Mongoose Provides a constructor method to define the Schema, like above in our example, `BookSchema`. Next, Mongoose also provides data types that are necessary to define since NoSQL database like MongoDB is actually schemaless. So these neccessaties are needed to be defined with our Server application. Note the data type we are using type `String`.

We can also provide attributes such as `required` in our example that enforces the database to accept data only if the field is provided through our API. For example, consider a form when adding a book's detials and we forget to provide author of the book. On our frontend we have to make a custom error fields to display the message to the user but in our backend, the database will not store the data. Such is another commonly used attribute called `unique`.

Each document in our database will be having a unique id that is going to be auto generated by MongoDB. But in any other scenario, you want to generate an id from the server side using a different convention you do like this:

```javascript
_id: mongoose.Schema.Types.ObjectId,
    name: {
            firstName: String,
        lastName: String
    }
```

Notice `_id` field name. Mongodb stores the unique identifier as `_id` which has a datatype of `ObjectId`. By default, this datatype is a 12 byte Binary BSON type and is used as a primary key. In your database, you might find it as a string like this:

```javascript
"_id": ObjectId("54759eb3c090d83494e2d804")
```

Mongoose also allows flexibility to create schemas with arrays. In our `genre` field, we can have different String names such as `Fiction` along with sub genres such as `Mystery` which relates to the overall schema.

```javascript
module.exports = mongoose.model('Book', BookSchema)
```

Lastly, we export our schema by defining a model. The first argument is the singular name of the schema. This is schema name will also be the collection name we are going to use in our API to query the database. Mongoose searches for the plural version of the model name automatically. Thus, for the example above, the model `Book` is for the books collection in the database. The `.model()` method makes a copy of schema. We have to make sure that every field is added to schema before calling `mongoose.model()` method.

This completes our Book Model. In the next tutorial, we will be using this schema to perform CRUD operations with our database.

> [Originally published at javabeginnerstutorial.com](https://javabeginnerstutorial.com/node-js/getting-started-with-express-part-3/)

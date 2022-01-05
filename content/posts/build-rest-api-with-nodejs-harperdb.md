---
title: 'Build a REST API with Node.js and HarperDB'
slug: 'build-rest-api-with-nodejs-harperdb'
date: '2020-07-23'
thumbnail: '/thumbnails/harperdb.png'
tag: 'harperdb'
canonicalUrl: 'https://amanhimself.dev/blog/build-rest-api-with-nodejs-harperdb/'
---

![cover_image](https://i.imgur.com/9hGD05n.png)

If you are building an application using Node.js, it can get a little overwhelming since there are a variety of databases to choose from and different ways to build APIs. One way to reduce development time and focus on the problem you are trying to solve is to use Database as a service to store the data. The advantage of this approach is to use a cloud database system without purchasing hardware which can be cost and time effective.

One such database service is [HarperDB Cloud](https://harperdb.io/developers/get-started/?utm_source=amanmittal). To build REST APIs rapidly this service allows us to perform all database operations using a single endpoint. It supports a variety of programming languages such as JavaScript, Java, Python, and so on. Some of the features of HarperDB are the following:

- single endpoint API
- allow JSON, CSVs file insertions
- support SQL queries for full CRUD operations
- Supports Math.js and GeoJSON
- limited database configuration required

In this post, let's build a simple REST API using Node.js and HarperDB Cloud to store some data. We are also going to use [Express](https://expressjs.com/) as the framework to build the Node.js server. It is a minimal and quite unopinionated framework.

## Prerequisites

Before you begin this tutorial, you’re going to need the following:

- [Node.js](https://nodejs.org/) version above `12.x.x` installed on your local machine
- Access to a package manager such as npm or yarn
- Basic JavaScript and ES6 knowledge
- Access to a REST API client such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)
- Access to a [HarperDB Cloud](https://harperdb.io/developers/get-started/?utm_source=amanmittal) instance (_free tier_)

To continue with the rest of the tutorial, please make sure you have an account with HarperDB Cloud and are logged in.

## Getting started

Start by creating the project directory on a local development environment. Give this directory a name and navigate into it. Then, initialize this project to manage npm dependencies by creating a `package.json` file.

```bash
mkdir harperdb-cloud-demo

# navigate inside the project directory
cd harperdb-cloud-demo

# create a package.json file
npm init --yes
```

The `--yes` flag uses the default settings when initializing a `package.json` from npm config you might have set up.

After the initializing step, let us add an express package. From the terminal window, run the command:

```bash
yarn add express@4.17.1 body-parser@1.19.0
```

Next, create a new file called `index.js` at the root of the project with the following code to trigger a minimal server:

```js
const express = require('express');

const app = express();
const PORT = 8000;

app.get('/', (req, res) => res.json('Express Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
```

In the above code snippet, the `app` is an object provided by Express API for the developer to communicate with the application and bootstrap a server.

Go back to the terminal and trigger the common `node index.js` to start the server. This `node` command is the simplest way to trigger a development server when building APIs with Node.js. Now, open up your favorite REST client to test APIs. For the demonstration purpose, I am going to use [Insomnia](https://insomnia.rest/).

You can test API endpoint by invoking a call to `http://localhost:8000` and it is going to return the result as shown below.

![hdb1](https://i.imgur.com/WKqKyDW.png)

## Watching file changes with nodemon

An essential development-related utility library that saves time when working on Node.js projects is [nodemon](https://www.npmjs.com/package/nodemon). It's a tool that helps the development of Node.js based applications by automatically restarting the Node application when file changes in the directory are detected.

To start using it in the current Express server, install it by using `yarn add -D nodemon` where `-D` flag is used to indicate that the dependency to install is a `devDependency`. After installing this dev dependency, open `package.json` file and add a start script as shown below.

```json
"scripts": {
    "start": "nodemon index.js",
},
```

Now, you can use either `npm run start` or `yarn run start` command to trigger the server. That's it to set up a basic Node.js server using the Express framework.

## Setting up an instance of HarperDB Cloud

In the introductory section of this post, you get the idea of what HarperDB Cloud is and features it supports. In this section, let us create the first database instance to store the data for the REST API using this cloud database service.

Assuming by now you have access main dashboard screen as shown below. To create a new instance, click on the plus button.

![hdb2](https://i.imgur.com/2RXthtd.png)

Then select the HarperDB Cloud instance option.

![hdb3](https://i.imgur.com/TouMF9P.png)

Fill in the details regarding the instance. Make sure to create a strong password and give a better username under Instance Credentials (I am keeping them simple for brevity).

![hdb4](https://i.imgur.com/598zmb4.png)

If you are on the free tier, leave everything in the screen below to default selections and click the button `Confirm Instance Details`.

![hdb5](https://i.imgur.com/xqXQNSL.png)

After entering the details, it is going to ask you to re-confirm all the instance details you have entered and if everything is okay, press the button `Add Instance`.

![hdb6](https://i.imgur.com/UvhsKoq.png)

Make sure to remember the username and the password you have entered here. They will be required to authenticate the Node.js server with the HarperDB Client. Once the instance of the cloud database is created, it is going to appear as shown below.

![hdb7](https://i.imgur.com/Yzyj4Ct.png)

You can click on the instance card from the UI and will be welcomed by the first screen to add a schema.

![hdb8](https://i.imgur.com/UCfOUQT.png)

A schema in HarperDB is necessary. It is equivalent to a collection of tables. Without an existing schema, you cannot create a new table and without a table, you cannot add or update data from HarperDB instance. To proceed, the schema and the table has to be created. Let's do it with the UI interface.

On the left-hand side, under the header where it says `schemas`, write in the name of your first schema.

![hdb9](https://i.imgur.com/ANIPBcC.png)

Once a schema is created, the option to add one or more tables appears. Let's create the first table called `books` as shown below. Besides the name of the table, HarperDB also asks to enter or assign the field for a `hash_attribute`. This attribute is equivalent to the unique identifier for each record that exists in the table `books`. Traditionally, most data tables have `id` as the unique identifier so it is passed as the value.

![hdb10](https://i.imgur.com/ohBkB9H.png)

The schema as well as the table are now successfully created.

![hdb11](https://i.imgur.com/5S1al13.png)

Let's save all the credentials required for the Node.js server to connect to the database. Create a `.env` file at the root of the project with for keys as shown below.

```bash
INSTANCE_URL=https://cloud-1-buildapps.harperdbcloud.com
INSTANCE_USERNAME=admin
INSTANCE_PASSWORD=password
INSTANCE_SCHEMA=dev
```

You are going to add your own HarperDB instance values here. Do not use the same values for each key as shown above, since it won't work. This just to demonstrate that these values are not wrapped inside quotes.

## Connecting HarperDB Cloud with a Nodejs server

To connect the HarperDB Cloud instance created in the previous section, let's install a dependency called [Harperive](https://github.com/chandan-24/Harperive#readme) that is going to let us interact with the database by performing CRUD (_Create, Read, Update, Delete_) operations. Go back to the terminal window and run the command:

```bash
yarn add harperive@1.0.1 dotenv@8.2.0
```

Once the dependency is installed, create a new directory called config and inside it, create a new file called `dbconfig.js`.

To connect to the database instance, you require three things:

- Database instance URL
- Database instance username
- Database instance password

At the end of the previous section, all these values are saved inside a `.env` file as environment variables. Using the `dotenv` package, these environment variables are now accessible throughout the Node.js server app. Inside the `dbconfig.js` file, import `dotenv` package as the first line and then import `harperive`. Create a `DB_CONFIG` object that is going to be passed as the argument to `harperive.client`. The `schema` field in the `DB_CONFIG` object is optional. Since this demo app has only one schema, thus, to avoid mentioning the schema field again and again when sending a query to the database, its name can be passed here.

Add the following code snippet to the `dbconfig.js` file.

```js
require('dotenv').config();
const harperive = require('harperive');

const DB_CONFIG = {
  harperHost: process.env.INSTANCE_URL,
  username: process.env.INSTANCE_USERNAME,
  password: process.env.INSTANCE_PASSWORD,
  schema: process.env.INSTANCE_SCHEMA // optional
};

const Client = harperive.Client;
const db = new Client(DB_CONFIG);

module.exports = db;
```

Exporting the `db` instance of the actual HarperDB client is going to allow us to query the database.

## Setting up body-parser

To set up routes or endpoints of the server application, you need to include `body-parser` in the `index.js`.

BodyParser parses incoming HTTP requests as middleware under `req.body` before routes or API have access to them and perform any further actions on them. A very useful and essential step when using forms in a web application.

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes to be defined here

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
```

The `urlencoded` method in the above snippet allows the body-parser middleware to extract data from form fields. In the REST client such as Postman or Insomnia, it is possible to send the data as form fields. The `json` method allows the JSON data to be extracted.

## Query to add a new record

Since the database doesn't have any records, let's start by writing the first query to insert new data in the database. Create a new directory called `api/` and inside it create a new file called `index.js`. Open index.js file and import the `db` from `config/dbconfig.js` file.

```js
const db = require('../config/dbconfig');
```

One of the main advantages of HarperDB is in querying the data from a database instance. It allows us to query the data either in the form of SQL queries or NoSQL queries. The advantage here is that the power of complex SQL queries can easily be used here to perform an operation. I am going to define all the queries in NoSQL form, however, do not forget to check official docs for more information on performing SQL queries [here](https://docs.harperdb.io/?version=latest#0b5f3698-60fc-4783-b736-b510d6063996).

The first query is going to be called `addBook`. This query is going to insert the data incoming from an HTTP request.

```js
exports.addBook = (request, response) => {
  db.insert(
    {
      table: 'books',
      records: [
        {
          title: request.body.title,
          author: request.body.author
        }
      ]
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      response.status(res.statusCode).json(res.data);
    }
  );
};
```

Each of the query functions as in the above code snippet is going to have at least two parameters: `request` and `response`.

- `request`: useful when creating or updating a new task and read data from the body (this where BodyParser works like a charm).
- `response`: useful to fulfill that incoming request with a response from the server. Generally, it contains the correct status code of the HTTP status code. This HTTP status code determines whether the incoming request was fulfilled or if there is an error. This the part of the REST paradigm and is considered a best practice.

When inserting data using a NoSQL query, it is mandatory to specify the name of the table in the database. In the current case its `books`. Since you have already specified the Schema when creating a connection using the HarperDB client, there is no need to explicitly define it here. `records` in HarperDB are similar to rows of data with having each field as a column.

You may have noticed in the above query that I am not explicitly adding an `id` attribute to uniquely identify each data record. HarperDB automatically creates a unique `id` for each data record.

The data being inserted here has two fields. The `title` and the `author` for each book. They represent the name of the columns or attributes in each data record. The value of each of these fields is going to be the incoming value from an HTTP request, parsed by the `body-parser` middleware function.

## Running the first query to insert data

To insert the first data record in the database lets create a route. Open `index.js` file in the root directory and import the `api` as `routesController`. A controller is a naming convention in an Express framework app. It is the business logic that binds the endpoints/routes that are going to define below to what action or operation they will perform on an incoming request on that particular route.

```js
// after other import statements
const routesController = require('./api/index');

//after defining middleware functions

app.route('/books').post(routesController.addBook);
```

Go back to the REST client and make sure the Node.js server is running from the terminal window.

Add the endpoint which is `http://localhost:8000/books`, select the type of the request which is `POST`. Select option `Form URL encoded` and the two key-value pairs as shown below:

![hdb12](https://i.imgur.com/BceIJrT.png)

Press the `Send` button it an HTTP request to insert the data to the HarperDB is made. If it's successful, a success message shown below is returned.

![hdb13](https://i.imgur.com/BbTRyru.png)

Go back to the HarperDB studio and you are going to see the same data record being shown.

![hdb14](https://i.imgur.com/Rz6ZRPS.png)

Do notice the two timestamp fields. They are auto inserted by the HarperDB and are auto-maintained.

- `__createdtime__`: to record the timestamp when data is inserted.
- `__updatedtime__`: to record the timestamp when any data field is updated for the last time.

Try to add more values to the database.

## Query to search by value

HarperDB allows to search database records in a table by using a column field name which is also known as an `attribute`. Let's add another query to get a data record when an HTTP request is sent just by searching the name of the author. Open `api/index.js` file and the following:

```js
exports.getByAuthor = (request, response) => {
  db.searchByValue(
    {
      table: 'books',
      searchAttribute: 'author',
      searchValue: request.body.author,
      attributes: ['*']
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      console.log(res);

      response.status(res.statusCode).json(res.data);
    }
  );
};
```

The data returned from the database is going to be in JSON format. Go back to the main `index.js` file and add another route.

```js
app.route('/author').post(routesController.getByAuthor);
```

Open the REST Client and make a request as shown below. The response of this HTTP request is going to be every data record that contains the value of the attribute `author`.

![hdb15](https://i.imgur.com/vd1PtH7.png)

## Query to search by hash

Another important way to search for data in a table is by the unique identifier. HarperDB has a special method to do the same. This method is called `searchByHash` and only allows us to search the database table using the identifier specified as has an attribute. In the `api/index.js` file, add another query called `getById`.

```js
exports.getById = (request, response) => {
  db.searchByHash(
    {
      table: 'books',
      hashValues: [request.body.id],
      attributes: ['title']
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      response.status(res.statusCode).json(res.data);
    }
  );
};
```

When this query successfully runs, the result from the database is only going to show the `title` attribute of the data record. This is done by passing the name of an attribute as the value of the `attributes` property in the above snippet.

Add the endpoint in the main `index.js` file.

```js
app.route('/search').post(routesController.getById);
```

Go to the REST client and run the query.

![hdb16](https://i.imgur.com/jOT7zuw.png)

## Query to delete the data record

To delete a record from the table in HarperDB is simple. All you have to do is pass the `id` or the unique identifier for the record stored in the table. The unique identifier, as you know, is stored as a hash value.

Add the following query to the `api/index.js` file.

```js
exports.deleteBook = (request, response) => {
  db.delete(
    {
      table: 'books',
      hashValues: [request.body.id]
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      response.status(res.statusCode).json(res);
    }
  );
};
```

Next, go to the main `index.js` file and add the endpoint.

```js
app.route('/delete').post(routesController.deleteBook);
```

Lastly, go back to the REST client, pass on the id of the data record to delete. On successful deletion, it gives a response back in the form of a `message` that is directly sent from the HarperDB instance. This is very helpful since this message response can be directly used with any REST client or sent to a frontend framework.

![hdb17](https://i.imgur.com/qYEmPkv.png)

## Conclusion

_Congratulations!_ You have reached the end of the tutorial.

I hope this post does convey you to try the capabilities of HarperDB. I personally like how it support both SQL and NoSQL queries as well as some advanced features like adding timestamps automatically and hashing unique ids in a consistent way across all data tables and schemas.

**Resources & Further Reading:**

- [Are hash attributes case sensitive in HarperDB?](https://harperdbhelp.zendesk.com/hc/en-us/articles/115003081994-Are-Hash-Attributes-Case-Sensitive-)
- [HarperDB SQL Guide](https://harperdbhelp.zendesk.com/hc/en-us/articles/115002146754-HarperDB-SQL-Guide)
- [Harperive](https://github.com/chandan-24/Harperive)
- If you are looking to learn more about creating [REST APIs with Node.js and MySQL, checkout post the here](https://geshan.com.np/blog/2020/11/nodejs-mysql-tutorial/).
- [HarperDB documentation](https://harperdb.io/developers/documentation/overview/?utm_source=amanmittal)
- [HarperDB Developer examples](https://harperdb.io/developers/developer-examples/?utm_source=amanmittal) includes tutorials on React, Websocket, Python, etc.

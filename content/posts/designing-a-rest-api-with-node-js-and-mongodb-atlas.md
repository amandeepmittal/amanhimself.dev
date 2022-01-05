---
title: 'Designing a REST API with Node.js and MongoDB Atlas'
date: '2018-01-22'
slug: 'designing-a-rest-api-with-node-js-and-mongodb-atlas'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://www.zeolearn.com/magazine/designing-a-rest-api-with-nodejs-and-mongodb-atlas'
---

![cover](https://i.imgur.com/5rvcM6q.png)

> [Originally Published at Zeolearn.com](https://www.zeolearn.com/magazine/designing-a-rest-api-with-nodejs-and-mongodb-atlas)

Nodejs is a remarkable technology for the fulfilling and developing web applications. Being open source and in the past few years, we have seen it rising. It might be a bit different from other traditional web technologies in terms of learning curve but I urge you to stick with it if you are getting in to web development and have opted [Node.js](https://www.zeolearn.com/node-js-training) ecosystem. In this tutorial, I will walk you through the basics of REST API design with using Node.js ecosystem.

I’d love if you follow along with me with snippets of code that are in continuation below. Before we begin, I want you to understand what is REST and how its beneficial to use it with server side JavaScript.

**What is REST?**

REST is an acronym for Representation State Transfer and is an industry standard (till Graphql conquers the world) for defining how an API and its endpoint (routes) should communicate with the server code of your web application. A REST API consumes HTTP methods such GET, POST, etc. with endpoints that are nothing but URLs that you can use to fetch some data or update/create new data in the database. In his [whitepaper](https://www.ics.uci.edu/%7Efielding/pubs/dissertation/rest_arch_style.htm), Roy Fielding described the paradigms and practical use of REST. I am going to summarise points what he exactly says in that paper. The basis of a RESTful API depends on below:

- Client-Server
- Stateless
- Uniform Interface
- Cacheable
- Layered System
- Code-On-Demand style

To read about them in detail, please see Roy Fielding’s paper on the same [here](https://www.ics.uci.edu/%7Efielding/pubs/dissertation/rest_arch_style.htm).

Applications that make use of REST APIs perform four basic operations that are known as CRUD.

- C: Creating data
- R: Reading data
- U: Updating data
- D: Deleting/removing data​

**Prequisites**

There are some things we need to go through this tutorial successfully.

- [Node.js](https://nodejs.org/) installed
- Access to [MongoDB](https://www.mongodb.com/), a NoSQL database on your local machine or cloud
- IDE/Editor
- [Postman](https://www.getpostman.com/), a REST client to test our API’s endpoints

If you do not have [MongoDB](https://www.zeolearn.com/mongodb-training) installed on your local mahcine, do not worry. In the next step I am going walk you through setting up a free tier of MongoDB in cloud.

**Consuming MongoDB in Cloud**

For the sake of brevity, I am going to use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) a service that you can use to store data for your sample application. You can also use other popular database-as-a-service [Mlab](https://mlab.com/) without any hassle.

I already have an account setup, so I’d suggest you to sign up on mongodb atlas’ site with your email. Once you have logged in, you will get the below screen:

<img src='https://cdn-images-1.medium.com/max/1200/0*K-3GHE1axS48h85u.png' />

At this point, you can either take time to explore what MongoDB Atlas is or you can skip and together we will setup a Sandbox for our sample application. Click on the “New Project” button on the right side of the web page.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/b7a62c69-71a3-4678-89d3-276832706d9a.png' />

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/e910bddb-5e50-4d0a-aaa4-d7d36939e491.png' />

Then you will be prompted to fill in the details. See screenshots below, enter a name for your project and click “next” and then click “Create Project”. Per one account in MongoDB Atlas, you will get one free tier/cluster. Follow the steps below to setup one.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/71db2429-c41d-48bb-a9e1-21281f5cfbcb.png' />

Click on the Build new Cluster button.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/145b86aa-63c1-45e4-ae53-f92bdf852562.png' />

Scroll down a bit, and then select the free tier M0. Per free cluster, we get 512mb of space. More than enough for what we need for this tutorial.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/9c0385c7-e282-4fd7-a266-487425841b0e.png' />

Then enter username and password for an Admin connection that we will use to connect to our database through our application. Make sure you remember both username and password and password must a bit strong. Lastly, click on confirm and deploy and the service will take at least 10 minutes to setup a database cluster.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/17807485-9b69-43c4-9d83-e9c7aa5abb1f.png' />

That’s it. The database is now ready to be used. Now let us setup our application.

## Configuring Server Side

From your terminal:

```shell
# to initalise our node project, we need a package.json file
npm init --yes

# install express framework
npm install -S express mongoose body-parser
```

Mongoose is client that helps us connect and communicate with our database. BodyParser is needed as a middleware to parse the data to be sent through HTTP requests. Express is de facto standard and is one of the reason we will be using it.

## Running the Server

Let’s first the nitty gritties of our server. Create a file app.js in the root directory with the following code:

```js
// app.js

const express = require('express');

const app = express();

const port = process.env.PORT || 3301;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

The app is an object provided by Express API for the developer to communicate with the application and bootstrap a server. In Express application, it is that easy to write bare minimum server. There are different ways you can setup your server but the basics will remain same. For brevity, I am using app.js but you can take a look at Express generator that scaffolds a structure in a quick manner.

Now, add an npm script to package.json file to test and start our server.

```json
"scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

From terminal, npm run start or npm start and you should see the success message without any error.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/180b1cc9-7178-44ff-8319-8747548ad6cd.png' />

## Setting up Mongoose

Mongoose is an ORM (Object Relational Mapper) that is used to interact with MongoDB database instance. We have already setup our instance using MongoDB atlas and installed mongoose as the project dependency. So let us start by defining a schema. Though, NoSQL database are schema less it is consider a best practice to define a schema to give some structure to the data that will be stored in our database.

A typical Express application follows MVC (model-view-controller) model to define a directory structure and that is what we are going to do. Create a directory models and inside it a file Task.js with following code:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
```

This schema does look like a JSON data and that is exactly what MongoDB stores or it appears to be for the developer to. Original format of data stored in MongoDB is called BSON (stands for \_Binary JSON) and it converts JSON to BSON is handled by the dtabase itself. You can read more about it here in the official docs.

Mongoose allows us to create define a schema for our the document to be stored in our application via inside the application just by defining a model. You can think it of as a blueprint. All your tasks in the database collection, will have taskName and createdOn value. Lastly, we bind our schema with the name of our collection Tasks. The collection in MongoDB our by default plural since they tend to contain a number of documents. taskName and createOn are called fields in terms of MongodB terminology. Together they constitute a document inside the collection Tasks and each document will have a unique ID to identify them as a record in the database. This unique ID is stored in MongoDB database by default and is a 12 byte value made up of different things related to our database. You can read more about how this unique ID created by the database [here](https://docs.mongodb.com/manual/reference/method/ObjectId/).

## Connecting Database To our Application

Before we further go with the controller part, let us first connect the database to our server and see if everything is working A-OK.

I like to store all my application’s configuration in a config directory. Create a db.js file inside that directory.

```js
const mongoose = require('mongoose');

const dbURI =
  'mongodb://newuser:myNewPassword@cluster0-shard-00-00-gibou.mongodb.net:27017,cluster0-shard-00-01-gibou.
  mongodb.net:27017,cluster0-shard-00-02-gibou.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&
  authSource=admin';

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log('Database connection established!');
  },
  err => {
    console.log('Error connecting Database instance due to: ', err);
  }
);

// require any models

require('../models/Task');
```

To get the connection string you have to follow the following steps:

First click on the connect button on your MongoDB Atlas page the following screen will prompt.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/1ed9e590-2aad-47e2-989b-95bcad69e339.png' />

Then, click “Allow Access from Anywhere” to white list our server URL.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/1434b0f6-7bde-4e3c-8a13-68fe382894e2.png' />

Then, copy the URI string for version 3.4:

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/d7458a10-1220-4c67-ac1f-eafcce4190b4.png' />

And enter the username and password you entered during the setup of our instance in place of `username:<password>` and remove the placeholders `<>`. I am using options variable to spike your curiosity such that you will explore about it and the power of mongoose. You can read more about connection options that provided by mongoose here.

Lastly, we use `mongoose.connect()` to establish a connection between server and the database instance and handle it gracefully using a promise. But wait, the connection won't be establish until we connect this config file with our application and for that we need to require this file in our main app.js file.

```js
const express = require('express');

// db instance connection
require('./config/db');

const app = express();

const port = process.env.PORT || 3301;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

Now restart our server from command line and you will see the success prompt:

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/2f7929df-6a92-4823-b48d-a7e3cffe86ee.png' />

Do you notice one thing here? For every change we make in our application, we have to restart our server from command line and to ignore this tedious process we can make use of a powerful utility called nodemon developed by Remy Sharp.

## Enter Nodemon

After we setup nodemon I promise we will be focusing on code of our API but making use of this utility will save tons of amount of time when working on an API yourself. Let's install nodemon as a dev dependency first.

```shell
npm install -D nodemon
```

After installing it, change the start script in package.json file to:

```json
npm install -D nodemon
```

Now if we start our server, nodemon will monitor for any changes made and restart the server when necessary on its own. We don’t have to worry about that anymore.

Back to our API code.

## Setting up Business Logic

To setup routes or endpoints of our application, we need to include `body-parser` in our `app.js`.

```js
const express = require('express');
const bodyParser = require('body-parser');

// db instance connection
require('./config/db');

const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

BodyParser parses incoming HTTP requests as middleware under req.bodybefore routes or API have access to them and perform any further actions on them. Very useful and essential step when using forms in a web application.

To define the business logic of our APIs endpoints, we are going to create a separate file TaskController.js under directory controllers.

For our API routes (I am going to call them route for brevity but they are same as endpoints) we are going to five different actions or operations or way to handle incoming requests. These tasks will cover our CRUD operations. Each route will have at least two parameters: req and res.

- `req`: request, useful when creating or or updating a new task and read data from the body (this where BodyParser works like a charm).
- `res`: response to fulfill that incoming request with response.

```js
const Task = require('../models/Task');

exports.listAllTasks = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

exports.createNewTask = (req, res) => {
  let newTask = new Task(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(task);
  });
};

exports.readTask = (req, body) => {
  Task.findById(req.params.taskid, (err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(task);
  });
};

exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskid },
    req.body,
    { new: true },
    (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task);
    }
  );
};

exports.deleteTask = (req, res) => {
  Task.remove({ _id: req.params.taskid }, (err, task) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: 'Task successfully deleted' });
  });
};
```

This completes our controller. The controller is the business logic that binds our endpoints/routes that we are going to define soon to what action or operation they will perform on an incoming request.

Each of the above operation when sending a response does send HTTP status code which clearly determines whether the incoming request was fulfilled or was there an error. This the part of REST paradigm and is best practice. You can read more about this [here](http://www.restapitutorial.com/lessons/httpmethods.html).

## Setting up Routes

```js
const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controllers/TaskController');

// db instance connection
require('./config/db');

const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API ENDPOINTS

app
  .route('/tasks')
  .get(taskController.listAllTasks)
  .post(taskController.createNewTask);

app
  .route('/tasks/:taskid')
  .get(taskController.readTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

We setup our API’s endpoints by first requiring the controller and then passing on a specific endpoint it using the correct HTTP method. The endpoints can be elaborated as:

- POST /tasks to create a new task

- GET /tasks to get a list of all tasks

- GET /tasks/:taskid to get a specific task by its unique id(the one mongodb creates for us)

- PUT /tasks/:taskid to modify existing task

- DELETE /tasks/:taskid to delete an existing task from our database instance

As a best practice, APIs routes should always use nouns for identifying resource.

Now let us test our API routes using Postman.

## Testing our API

Open postman and type http://localhost:3301/tasks and selct the POSTmethod. We will first use the POST request to create a new task since our database is currently empty and does not have any data. Use body to fill in the data which follows same schema we defined in our model.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/36858c3c-1a16-4a84-9821-804b2b5435dc.png' />

Hitting the send button should respond with 200 status and the data we created structured exactly like our schema in JSON format.

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/eb03c175-41f7-4bc0-859a-0a007086af91.png' />

Similarly, we can test other endpoints of our API. Such as getting all tasks (so far we have so it will give only one task that we just created):

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/b1300d7d-6493-43b0-8e10-e4642e57e421.png' />

Getting the task by its \_id:

<img src='https://d6vdma9166ldh.cloudfront.net/media/images/86018023-045d-4cc5-8db4-cead1261a6a4.png' />

Try updating the task or removing it by using the endpoints we defined earlier and changing the HTTP method from Postman yourself.

Hope you learned something valuable by reading this article.

You can find the complete code at this [Github repository](https://github.com/amandeepmittal/nodejs-restapi).

---
title: 'Getting Started with Sequelize for Nodejs Applications'
date: '2017-05-30'
thumbnail: '/thumbnails/node.png'
slug: 'getting-started-with-sequelize-for-nodejs'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/hackernoon/getting-started-with-sequelize-for-nodejs-applications-2854c58ffb8c'
---

> [Originally Published at Hackernoon.com](https://medium.com/hackernoon/getting-started-with-sequelize-for-nodejs-applications-2854c58ffb8c)

### Introduction to ORM

ORM or Object Relation Mapping is a process of mapping between objects and relation database systems. An ORM acts like an interface between two system. ORM provide advantages for developers from basic ones like saving time and effort and rather focusing on business logic. The code is robust instead of redundant. ORM helps in managing queries for multiple tables in an effective manner. Lastly, an ORM (like [sequelize](http://docs.sequelizejs.com/en/v3/)) is capable to connect with different databases (which comes in handy when switching from one database to another).

### Getting Started with Sequelize

[Sequelize](https://github.com/sequelize/sequelize) is a promise-based ORM for Node.js. Sequelize is easy to learn and has dozens of cool features like synchronization, association, validation, etc. It also has support for PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL. I am assuming you have some form of SQL database service started on your machine. I am currently using MySQL.

### Installation

Sequelize is available via npm.

```shell
$ npm install --save sequelize

# And one of the following:
$ npm install --save pg pg-hstore
$ npm install --save mysql // For both mysql and mariadb dialects
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL
```

### Setting up a Connection

Sequelize does setup a connection between the rest api/application and your SQL database. To setup basic connection between the two:

```js
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  //choose anyone between them
  dialect: 'mysql' | 'mariadb' | 'sqlite' | 'postgres' | 'mssql',

  // To create a pool of connections
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // For SQLite only
  storage: 'path/to/database.sqlite'
});
```

### How do I setup my Sequelize Connection?

For the sake brevity, I like to divide code into modules. After all, the Unix philosophy of [_one program/module should do one thing_](https://amandeepmittal.github.io/blog/2017/04/05/The-Node-Way-Philosophy-of-a-Platform/) is major part of the philosophy behind writing code in JavaScript (and using Node.js as a server side platform) these days.

I start with `config.json`/`config.js` file in the root of my application/api folder in which I define the general constraints needed to setup the connection with database:

```json
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "articles",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "articles",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "articles",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

You can do this in your `.env` file if you like to follow that pattern. For more info on this see `[dotenv](https://www.npmjs.com/package/dotenv)`.

After defining the configuration variables, in my `models/` folder or where I define schema of tables in the database at application level, I create the connection in an `index.js` file:

```js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.json')[env];
const db = {};

if (config.use_env_variable) {
  const sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
db.user = require('./user')(sequelize, Sequelize);
db.admin = require('./admin')(sequelize, Sequelize);
db.articles = require('./articles')(sequelize, Sequelize);

module.exports = db;
```

It’s important to notice that I am exposing `db` object which contains every model/table schema definition. From now, I just have to import the `db` object to apply operations on specific database tables using it.

This setup can be auto-generated with the help of [Sequelize CLI](https://github.com/sequelize/cli) tool that helps in bootstrapping a new project in an effective manner (like the above) and handle database migrations directly from the terminal.

### Conclusion

Sequelize is feature rich ORM for Node.js. It has a documentation that at times may not provide direct solutions to your problems but there always Github issues for that. What I like about is its Promise based control flow. Coming from NoSQL background (and using MongoDB), understanding Sequelize really took less time. Most of the query based models are quite similar to that in MongoDB (especially the CRUD operations). I am looking for a brighter, more improved documentation and ease of support from Sequelize.

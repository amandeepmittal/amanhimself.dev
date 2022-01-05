---
date: '2017-06-20'
title: 'How to paginate records in MySQL using Sequelize and Nodejs'
thumbnail: '/thumbnails/node.png'
slug: 'paginate-records-in-mysql-using-sequelize-and-nodejs'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/hackernoon/how-to-paginate-records-in-mysql-using-sequelize-and-nodejs-a3465d12aad5'
---

Often at times, I find my self struggling with Sequelize to find a direct answer for my query. Recently, I have been working on a fullstack application in which there was a basic requirement of paginating results from backend (REST API) to the frontend. I struggled for two reasons. Firstly, coming from NoSQL background it’s hard to grasp SQL DBs. Second reason being is Sequelize documentation does not provide a clear and direct solution to this very basic abstraction. Lot of people assume things in the world of SQL databases.

Thus, in this post we will be talking about a basic paginating module using Sequelize, MySQL and Node.js. I am using you have some tables and records inside your MySQL database. To setup a new app and making database connection, read my post on [**Getting started with Sequelize**](https://hackernoon.com/getting-started-with-sequelize-for-nodejs-applications-2854c58ffb8c)**.**

### Defining a Model

I am directly jumping on `user` model definition:

```js
'use strict';
module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.STRING,
      created: DataTypes.INTEGER,
      updated: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscore: true
    }
  );
  return user;
};
```

I am using that we a table that contains hundred of user records that we want to display on an web application, say in the admin panel, and we want to show just 50 records at once.

In the `api/user.js` I am defining an endpoint `/:page` that will fetch number of results we need from the database.

```js
router.get('/:page', (req, res) => {
  let limit = 50; // number of records per page
  let offset = 0;
  db.user
    .findAndCountAll()
    .then(data => {
      let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      db.user
        .findAll({
          attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
          limit: limit,
          offset: offset,
          $sort: { id: 1 }
        })
        .then(users => {
          res
            .status(200)
            .json({ result: users, count: data.count, pages: pages });
        });
    })
    .catch(function (error) {
      res.status(500).send('Internal Server Error');
    });
});
```

`findAndCountAll` is the model for searching multiple records in the database and it returns both the data required and the count of elements in that table. The above query will get 50 user records at once until the next page is called to fetch the next 50 records. `limit` and `offset` are required in queries related to pagination in which `limit` fetches the number of rows based on the query whereas `offset` is used to skip the number of rows in the database table.

> [Originally Published at Hackernoon.com](https://medium.com/hackernoon/how-to-paginate-records-in-mysql-using-sequelize-and-nodejs-a3465d12aad5)

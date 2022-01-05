---
title: 'Tips for Creating Nodejs REST APIs'
date: '2017-11-22'
thumbnail: '/thumbnails/node.png'
slug: 'tips-for-creating-node-js-rest-apis'
tag: 'nodejs'
canonicalUrl: 'https://codeburst.io/tips-for-creating-node-js-rest-apis-dfa0b2adb39c'
---

> [Originally Published at Codeburst.io](https://codeburst.io/tips-for-creating-node-js-rest-apis-dfa0b2adb39c)

In this article, I am going to offer you some tips for writing REST APIs in Nodejs for a production level application. Writing RESTful APIs with Nodejs is one of the most popular use case using the JavaScript server side platform.

## Use HTTP Methods

CRUD operations are basis of any API. In most applications you will be either:

- Creating new records
- Display them on a front end client aka reading a record from the database
- Updating an existing record
- Or deleting an existing record

Record here stands for anything that goes into the database. Afterall, an API is just way a to communicate from the user interface to database.

To develop an API that consist of CRUD operations, you must consider using correct HTTP method with the suitable endpoint:

- `POST /record` for creating a new record
- `PUT` or `PATCH /record/:id` for updating an existing record
- `GET /record/:id` getting a single record
- `GET /record` getting a list of all records
- `DELETE /record/:id` deleting a single existing record

## Use HTTP response status codes

You must consider using an HTTP status code if anything fails when serving a request.

- `2xx` if everything works fine
- `3xx` if record was moved
- `4xx` request fails due to client error
- `5xx` request fails due to server error (or API)

You can refer to either of these links for a detailed error code and message along with it.

- [HTTP Status Codes](http://www.restapitutorial.com/httpstatuscodes.html)
- [Mozilla HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

If using Express, most commonly framework used with Nodejs to create APIs, consider writing your code in this format:

```js
// in case 5xx
res.status(500).send({ error: 'Internal Server Error.' });

// in case 4xx, unauthorized
res.status(401).send({ error: 'Unauthorized. Please check.' });
```

## Consider Creating an API Documentation

Working as a team or even if individual and having a documented API, in the end will benefit all. Following open-source API documentation projects can help in this case:

## Avail options for building APIs in Nodejs

There are quite a number of frameworks that you can choose from to build your next RESTful API with Nodejs.

Express, Koa, Hapi all can be used for creating browser based applications but Restify allows you to focus on building a RESTful service.

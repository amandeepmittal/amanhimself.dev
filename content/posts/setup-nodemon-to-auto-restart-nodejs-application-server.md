---
date: '2017-09-10'
title: 'Setup Nodemon to auto restart Nodejs application server'
thumbnail: '/thumbnails/node.png'
slug: 'setup-nodemon-to-auto-restart-nodejs-application-server'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/hackernoon/setup-nodemon-to-auto-restart-nodejs-application-server-8d8993b7dfd9'
---

Manually restarting Node.js application is a tiring and tedious job. [Nodemon](https://www.npmjs.com/package/nodemon) is the best solution available to autorestart a nodejs app server in development mode.

### Step 1

Organize the source directory `src` and initiate it with an `app.js` or `index.js` or `server.js` or any other convention you use to bootstrap a Node.js server.

Update the `package.json` file accordingly by adding a `start` script.

```json
{
  "name": "nodemon-auto-restart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "Aman Mittal <amandeepmittal@live.com> (http://amandeepmittal.github.io/)",
  "license": "MIT"
}
```

### Step 2

Add `express` or any other framework as dependency to bootstrap a minimal server.

Code for a minimal server:

```js
'use strict';

const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(3000);
```

In first terminal window start the server:

```shell
$ npm run start
> node src/index.js
```

In second terminal window, request the url to test if the api is working and to see the response message:

```shell
$ curl -X GET http://localhost:3000/
Hello World!
```

Now if I change the response message, I have to restart the server to get the desired result:

```js
app.use('/', (req, res) => {
  res.status(200).send('Lorem Ipsum');
});
```

Use `Ctrl + C` to stop the currently running server and restart it by using the same command before: `npm run start`.

Using the curl command again from terminal window we get the desired result:

```shell
curl -X GET http://localhost:3000/
Lorem Ipsum
```

This whole process is repetitive will slow your development of any package or application. Better solution is to use `nodemon`.

### Step 3

Add nodemon as `devDependency`:

```shell
$ npm i -D nodemon
```

```json
{
  "name": "nodemon-auto-restart",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "Aman Mittal <amandeepmittal@live.com> (http://amandeepmittal.github.io/)",
  "license": "MIT",
  "dependencies": {
    "express": "4.15.3"
  },
  "devDependencies": {
    "nodemon": "1.11.0"
  }
}
```

### Step 4

Make another script `dev` under npm scripts in `package.json` file:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon --watch src src/index.js"
  }
}
```

Now run `$ npm run dev` and request using curl command, we will see the last familiar result:

```shell
curl -X GET http://localhost:3000/
Lorem Ipsum
```

If I change the response message in `index.js` file back to `Hello World`, this time I don't I have to restart the server since `nodemon` is watching for the changes using inside the src directory, through its `--watch`parameter. If I use the curl command again, the result is familiar with the update:

```shell
curl -X GET http://localhost:3000/
Hello World
```

One can verify by observing the log messages in the terminal window where nodemon is running:

```shell
$ npm run dev

> nodemon-auto-restart@1.0.0 dev /Users/amandeepmittal/github/nodemon-auto-restart
> nodemon --watch src src/index.js

[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: /Users/amandeepmittal/github/nodemon-auto-restart/src/**/*
[nodemon] starting `node src/index.js`
[nodemon] restarting due to changes...
[nodemon] starting `node src/index.js`
```

To stop the nodemon process, use `Ctrl + C`.

Full Source at [this Github Repository](https://github.com/amandeepmittal/nodemon-auto-restart).

[Originally Published at Hackernoon.com](https://medium.com/hackernoon/setup-nodemon-to-auto-restart-nodejs-application-server-8d8993b7dfd9)

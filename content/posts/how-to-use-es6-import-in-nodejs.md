---
title: 'How to use ES6 import syntax in Node.js'
date: '2021-04-07'
thumbnail: '/thumbnails/node.png'
slug: 'how-to-use-es6-import-syntax-in-node'
tag: 'nodejs'
canonicalUrl: 'https://amanhimself.dev/blog/how-to-use-es6-import-syntax-in-node/'
---

![cover_image](https://i.imgur.com/mztPVQI.png)

<blockquote>
Photo by <a href="https://unsplash.com/@weirick?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jake Weirick</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</blockquote>

<br />

A module is a JavaScript file that exports one or more values. The exported value can be a variable, an object, or a function.

An ES6 import syntax allows importing modules exported from a different JavaScript file. It is a common pattern to use modules across React and React Native applications. The syntax is composed of the following ES module standard:

```js
import XXX from 'xxx';
```

An ES module is the ECMAScript standard of working with modules. Node.js uses the CommonJS standard to import modules. The syntax for this type of standard can be described as:

```js
const XXX = require('xxx');
```

Node js doesn’t support ES6 import directly. Try writing the `import` syntax in a JS file:

```js
// index.js

import { ApolloServer, gql } from 'apollo-server';
```

Run the Node.js server either by using `npm start` or `npm run dev` and you will encounter the following error:

![ss1](https://i.imgur.com/lbHW7pl.png)

The solution to this error is in the first line of the above error snippet and is now [a recommend way by Node.js](https://nodejs.org/api/esm.html#esm_enabling). Set the `"type": "module"` in `package.json` file.

```json
{
  "type": "module"
}
```

This solution works for the latest Node.js versions (which is `15.4.x` at the time of writing) and versions above `14.x.x`.

![ss2](https://i.imgur.com/Mm92hul.png)

## What about environments using Node version lower than 14

Another solution to this problem is to use [Babel](https://babeljs.io/). It's a JavaScript compiler and allows you to write JS using the latest syntax. Babel is not framework or platform opinionated. This means that it can be used in any project that is written in JavaScript and thus, in a Node.js project as well.

Start by installing the following dev dependencies from a terminal window:

```bash
npm i -D @babel/core @babel/preset-env @babel/node
```

Then create a file at the root of the Node.js project called `babel.config.json` and add the following:

```json
{
  "presets": ["@babel/preset-env"]
}
```

The package `@babel/node` is a CLI utility that compiles JS code in a Node.js project with Babel presets and plugins before running it. It means it will read and apply any configuration mention in `babel.config.json` before executing the Node project.

Replace the `node` with `babel-node` to execute the server in the `start` or `dev` scripts.

An example of running Node server using `npm run dev` script:

```json
{
  "scripts": {
    "dev": "nodemon --exec babel-node server.js"
  }
}
```

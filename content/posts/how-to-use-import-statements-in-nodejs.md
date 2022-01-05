---
title: 'How to use Import statements in Nodejs'
date: '2018-11-01'
slug: 'how-to-use-import-statements-in-nodejs'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/better-programming/how-to-use-import-statements-in-nodejs-94c85e23aeb7'
---

> **UPDATE:** Up to date version of this post is at [How to use ES6 import syntax in Node.js](https://amanhimself.dev/blog/how-to-use-es6-import-syntax-in-node/).

I don’t always like to try different versions of setting up a Nodejs application. Don’t get me wrong — I believe in experimenting with one’s set up, which can lead to learning new things. But there is a limit. Recently, I find myself more often going to set up a Nodejs server to develop a RESTful API. Furthermore, the server has to work with the client in a way that the client can consume the API easily. For the client-side development, I am using ReactJS.

With the context switching between the client and the server I often find myself making errors during the process. One of the most common is using `import` statements in Nodejs files. This leads to a syntax error called `Unexpected identifier`. Even after switching to Nodejs `v10` LTS on my local machine, I find the lack of using ES6 modules rather disappointing.

To overcome this problem, and reduce the number of errors I cause during development, I read a few tutorials but decided to mesh a setup of my own. These tutorials, though well written, use methods that are almost completely opposite to one another. I want consistency when working on full-stack applications for my day job.

As a result, I m going to show you a streamlined, less time-consuming version of using `import` statements in a Nodejs server-side application. To continue to read this article, please make sure you have following applications installed on your local machine:

- Nodejs
- npm

### Getting Started With a Mock Project

I call it a mock project because I am going to start from scratch to build this setup. At the end of this tutorial, I will leave a link to a Github repository that can serve as a starter kit to many of your Nodejs plus Express projects. You can skip to the link part and DIY — there’s no complexity here. If you’re still curious, continue to read this short piece.

To start, create a new directory, traverse inside it and initialize it with `npm`.

```shell
mkdir node-babel-setup
npm init -y
```

You can check out the `package.json` file after initializing your project as an npm project. It will be filled with details that you have used to configure npm.

```json
{
  "name": "node-babel-setup",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Aman Mittal <amandeepmittal@live.com> (www.amanhimself.me)",
  "license": "MIT"
}
```

Next, create a new file with the following command from your terminal:

```shell
touch index.js
```

<img src='https://cdn-images-1.medium.com/max/800/1*cToGazhSQLTx3oIwsJULPQ.png' />

That’s all we need to set up a bare minimum project directory. In the next section, we take a look at what dependencies we have to install and why we need those dependencies.

### Creating the Node Server

To create a server I am going to use Express. To include Express in our project as a dependency, run the following command from your terminal:

```shell
npm install -S express
```

Next, append the `index.js` file with the following code:

```js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Nodejs!');
});

app.listen(PORT, () => {
  console.log(`🚀 at port ${PORT}`);
});
```

You can run the server by running the command `node index.js`. Visit URL `http://localhost:3000/` and you’ll see a message displayed in the browser window: `Hello from Nodejs!`.

This indicates that the code for the server is fine. Now modify the first line of `index.js` to:

```js
import express from 'express';
```

Run the same command `node index.js` and stay at the terminal window. This time the server does not start as there is an error in the process. It’s the same error I told you about at the start of this article. Nodejs cannot execute `import` statements by default.

<img src='https://cdn-images-1.medium.com/max/800/1*itCGCm0lnbBG94KS6D0bOg.png' />

### Using Babel

All we need is a transpiler, which allows us to write JavaScript using ES6 features such as `import` statements in our Nodejs project. _What’s a transpiler?_

> Transpilers are also known as source-to-source compilers that read code from source written in one programming language and produce an equivalent code in another language.

In our case we’re not switching programming languages, rather we need to use new language features that are not yet supported by the LTS version of Node. I’m going to set up Babel compiler and enable it in our project by going through the following configuration process:

First, you will have to install few dependencies. Do mind -D flag as we only need these dependencies for our development environment:

```shell
npm install -D babel-cli babel-preset-env babel-watch
```

Once you have installed them, add a `.babelrc` file to the root of the project and add the following config:

```json
{
  "presets": ["env"]
}
```

The last step in the configuration process is to add a `dev` script in `package.json`. You can name this script whatever you like. This will take care of running the babel compiler on its own (automate) once there is a change. This done by `babel-watch` that also takes care of re-starting Nodejs web server.

```json
"scripts": {
  "dev": "babel-watch index.js",
}
```

To see it action make sure the following code to your `index.js` uses `import` statement like below.

```js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(PORT, () => {
  console.log(`🚀 at port ${PORT}`);
});
```

From terminal write `nr dev`. If there are no errors, you’ll get the following:

<img src='https://cdn-images-1.medium.com/max/800/1*Rz9TPPfk6B4p4NPTntXKvg.png' />

Where `nr` is shorthand for `npm run`. You can also visit `http://localhost3000/` in your browser to verify the result and see if the server is working or not.

### Conclusion

This article has shown you how to create a bare minimum Node server from scratch, and how you can introduce upcoming JavaScript features in your Node.js environment using Babel. I’m sure now you are not going to make the same silly errors like me in _Nodejs_ + _insert a frontend framework/library of your choice_ as I did.

_You can find the complete source code for the above article at_ [**_Github Repo_**](https://github.com/amandeepmittal/node-babel-setup)

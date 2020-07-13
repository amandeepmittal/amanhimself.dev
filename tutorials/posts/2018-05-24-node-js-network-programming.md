---
date: 2018-05-24
title: 'Introduction to Node.js'
template: post
thumbnail: '../thumbnails/node.png'
slug: node-js-network-programming
categories:
  - Nodejs
tags:
  - node
---

Web applications are often written in a server/client model where server is responsible to respond with resources for the client to handle. Node.js is an open source platform that allows you to build fast and scalable server applications using JavaScript. Node.js is a runtime that uses the same V8 Javascript engine you can find in the Google Chrome browser. In this article we will talk about Node js network programming, which utilises another library under the hood called libuv which is a multi-platform support library with a focus on asynchronous I/O.

Node.js is a single-threaded runtime environment as compared to other server side technologies. This is only to avoid blocking I/O and provide support for asynchronous I/O. Under the hood libuv handles threading, file system events, implements the event loop, timer functions, features thread pooling etc. This is important to understand and digest since it is the working of Node.js as a runtime.

With Node.js, you can build many kinds of networked applications. You can use it a web server, an HTTP Proixy, a DNS server, an SMTP server or you can use it with any frontend library or framework such as Reactjs or Angular etc.

## Getting Started with Node.js

To download the latest Node.js installation file, you can visit the official Node.js website: https://nodejs.org/en/download/. Therefore, I recommend you to download the LTS version instead of current. The LTS version is the stable version of Node.js that most web application host services such as AWS, Heroku use. It is better to familiarize yourself with the start. The current version of Node.js which you can is above 10 right now, will be frequently updated by a team of developers who are behind the core of this open source technology with new features.

Once you install it, you can use a very a command line application or terminal to interact with:

```shell
node --version
v8.11.1
```

This verifies that you have Node.js installed and is now up and running. To get started with Node.js let us try its terminal version. Start by typing:

```shell
node
```

In the command line, this is a perfect way to access JavaScript. Now you will be notified that the prompt is different `>`, so type

```shell
> console.log('Hello, World!');
```

And as soon as you press enter, it will return the following result:

```shell
Hello, World!
undefined
```

## Create a Hello World HTTP Server

Let us take create a mini Node.js server application. Create an empty directory, and inside it create a new file with name _server.js_. Inside server.js you will create your first Node.js server.

To create a web server using the HTTP module, we need to require the module itself from Node.js API. The Node core API is divided into several modules and here we are using the module named `HTTP`. By specifying its name inside the require function call, require returns the `HTTP` module value which is assigned to a variable conveniently named HTTP.

`HTTP` module provides a method that prompts any Node.js application as a web server. This method is `createServer()`. It accepts a callback which further accepts two arguments: `request` and `response`, both of which are objects.

Open it and type the following:

```js
const http = require('http');

const server = http
  .createServer((request, response) => {
    // http header + MIME type
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    // send a response to the client
    response.write('Hello World!');
    // end the response
    response.end();
  })
  .listen(8080, () => {
    console.log('Server Listening on port 8080');
  }); //the server object listens on port 8080
});
```

The `request` object knows the information about the incoming request from the client. It can be used to represent URL or any HTTP header coming from the client. The `response` object is what we are using to send information back to the client. In the above example, notice the first line in the callback function. We are using a `response.writeHead()` method to send an HTTP status code along with a header that indicates a MIME type.

Different HTTP status code exists for a reason and all have their own meaning and usage. For example, in our case, we are using `200` which indicates that the response from the server to the client is a success. Another example would be status code `404` means that the resource a client is requesting from the server does not exist.

Along with the correct MIME type and an HTTP status code, a server often responds to a client's request with a response. In Node.js, this is done by `response.write()` method. Next, in the callback function, we need a way to end the current request of a client (or multiple clients) from the server. This done by calling `response.end()` method. This method is always called in the end and thus, indicates that the response is sent from the server to the client.

Lastly, `createServer()` method provides us a way to define a port number on which the server listens to incoming requests. The callback provided inside it is optional.

To see this in action, traverse to the same directory in your terminal and type:

```shell
node server.js
Server Listening on port 8080
```

---

[Originally published at javabeginnerstutorial.com](https://javabeginnerstutorial.com/node-js/node-js-network-programming/)

---
title: 'The Node.js system'
date: '2016-04-22'
thumbnail: '/thumbnails/node.png'
slug: 'nodejs-system'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/hackernoon/the-node-js-system-51090c35dddc'
---

When I started learning Node.js, I always wondered, how does it work? How is it inside Node.js? Event loop and Event Queue jargons are digested. But what exactly is going on? Where do those jargons Event Loop and Event Queue come from.To satisfy my curiosity as well to know the answer to my previous question, I went in depth as much as I can and came across some things which I’d like to share with you. In brief, this article is about **Node.js System** — a glimpse of internal workings of Node.

If you are familiar with Node.js, it is a known fact that Node.js is single threaded. If you are from programming/computer science background you know what a thread means. Consider this scenario: traditionally — an I/O request comes to a web server and is assigned to an available thread, and for each concurrent connection there is one thread available. That request is handled on the specific thread until it is fulfilled and the response is sent.

This scenario is a perfect example of **Blocking I/O** because while handling a particular request by a specific thread, there will be some idle time when the operations are being done (such as retrieving a file, opening it, reading it, etc.). A single thread consumes memory. A longer running thread for each connection and then sitting idly for some amount of time is not considered an efficient way in the [world of Node.js](https://medium.com/@amanhimself/the-node-way-philosophy-of-a-platform-f9738ed5f9d2).

## Enter Reactor Pattern- Heart of Node.js

Reactor Pattern is an idea of non-blocking I/O operations in Node.js. This pattern provides a handler(in case of Node.js, a callback function) that is associated with each I/O operation. When an I/O request is generated, it is submitted to a demultiplexer.

This demultiplexer is a notification interface that is used to handle concurrency in non-blocking I/O mode and collects every request in form of an event and queues each event in a queue. Thus, the demultiplexer provides the Event Queue, which we often hear. When a request is collected by the demultiplexer, it returns the control back to the system and does not blocks the I/O. At the same time, there is an Event Loop which iterates over the items in the Event Queue. Every event has a callback function associated with it, and that callback function is invoked when the Event Loop iterates.

The callback function further mostly have other callbacks associated within representing some asynchronous operations. These operations are inserted in the Event Queue by the demultiplexer and are ready to be processed once the Event Loop iterates over them. That is why calls to other operations must be asynchronous.

When all the items in the Event Queue are processed and there are no pending operations left, Node.js terminates the application automatically.

## Building Blocks of Node.js

- Reactor Pattern
- [libuv](http://docs.libuv.org/en/v1.x/)
- A set of Bindings
- Chrome’s V8
- Core JS Library

## libuv

Pronounced as “lib u v”, is library written in C language to make Node.js compatible with every OS and provide the non-blocking I/O behaviour. libuv is the low-level engine that implements reactor pattern thus providing an API for creating the Event Loop, managing an Event Queue and running asynchronous I/O operations. It is built specifically to provide a unified experience over different Operating Systems.

## Need for libuv?

Each operating system has its own interface for the demultiplexer. Such as Kqueue for Mac OS X, IOCP for Windows and Epoll for Linux. Different multiplexers will behave differently when handling an I/O request. And then, each I/O operation can differ in its behaviour within the same operating system. This creates an inconsistency and to overcome this inconsistency libuv is the solution.

I am not going to talk about internal workings of libuv here, not an expert on that, myself. For more info on libuv [check their docs](http://docs.libuv.org/) or this [slide](http://www.slideshare.net/saghul/libuv-nodejs-and-everything-in-between) by Saúl Ibarra Corretgé [(@saghul)](https://twitter.com/saghul) is a good start.

[Also, libuv is independently maintained by awesome developers.](https://github.com/libuv/libuv)

## Set of Bindings

These set of bindings are responsible for wrapping and exposing libuv and other low-level functionality to JavaScript.

## V8

It’s a runtime engine[ developed by Google for Chrome browser for JavaScript](https://developers.google.com/v8/). It is the reason Node.js is fast and efficient.

## Core Library

This is a JavaScript library that implements high-level Node.js API (a.k.a. node-core).

<img src='https://miro.medium.com/max/451/1*dTYKv5fII4doUAqJSA51Qg.png' />

The image borrowed above clarifies and represents a complete Node.js System. I hope this article has made things more clear as it did to me.

> [Orignally Published at Hackernoon.com](https://medium.com/hackernoon/the-node-js-system-51090c35dddc)

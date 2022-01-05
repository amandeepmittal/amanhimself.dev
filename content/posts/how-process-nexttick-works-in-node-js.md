---
title: 'How process.nextTick() works in Node.js?'
date: '2016-06-25'
thumbnail: '/thumbnails/node.png'
slug: 'how-process-nexttick-works-in-node-js'
tag: 'nodejs'
canonicalUrl: 'https://amanhimself.dev/blog/how-process-nexttick-works-in-node-js/'
---

The [process](https://nodejs.org/api/process.html) object is a one of the few global objects provided by the Node.js core API. It can be access from anywhere, thus its methods can also be accessed. Such is a method called `process.nextTick()` which is used by developers in realtime applications everyday to defer the execution of a function until the next [Event Loop Iteration](https://medium.com/@amanhimself/the-node-js-system-51090c35dddc).

Browser JavaScript introduced us functions like `setTimeout()` to defer tasks in the near future. The `setTimeout()` function takes a callback function and a number value representing the time after which the callback function will be executed, in milliseconds.

```js
setTimeout(callback, 0);
```

In Node.js, each iteration of an Event Loop is called a tick. To schedule a callback function to be invoked in the next iteration of the Event Loop, we use process.nextTick(). It just takes a callback with no time bound, since it will be executing in the next iteration of the Event Loop.

```js
process.nextTick(callback);
```

The difference between setTimeout() and process.nextTick() is that the process.nextTick() function is specific to the Node.js Event Loop. setTimeout() uses JavaScript runtime to schedule its own queue of events. When using process.nextTick(), callback function associated with [it runs immediately after events in the Event Queue are processed by the Event Loop in a single iteration. In comparison to setTimeout(), it is faster since queue associated with setTimeout() or the JavaScript runtime](https://gist.github.com/mmalecki/1257394).

```js
function cb() {
  console.log('Processed in next iteration');
}
process.nextTick(cb);
console.log('Processed in the first iteration');
```

The above snippet is an example of how `process.nextTick()` works. You can save the snippet in a file.js and run using \$node file.js from your terminal. You will definitely notice that the second console.log printed before the console.log associated with function `cb()`.

```js
Processed in the first iteration
Processed in next iteration
```

### Further Reading:

- [process.nextTick vs setTimeout(fn, 0)](https://gist.github.com/mmalecki/1257394)
- [Nodejs Official Docs](https://nodejs.org/docs/latest/api/process.html#process_process_nexttick_callback_args)
- [Understanding process.nextTick()](https://howtonode.org/understanding-process-next-tick)

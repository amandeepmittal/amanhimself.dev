---
title: 'Patterns and Anti-patterns in Node.js'
date: '2022-04-03'
slug: 'patterns-and-anti-patterns-in-nodejs'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://blog.appsignal.com/2022/02/23/patterns-and-anti-patterns-in-nodejs.html/'
---

![cover_image](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-02%2Fpatterns.png&w=2048&q=50)

> Originally posted at [AppSignal Blog](https://blog.appsignal.com/2022/02/23/patterns-and-anti-patterns-in-nodejs.html)

Node.js is a back-end JavaScript runtime built on Chrome's V8 engine that's asynchronous and event-driven by nature. It's relatively simple to create a REST API with Node.js and use frameworks like [Express.js](https://expressjs.com/). With this simplicity comes a lot of flexibility. However, you can get side-tracked on what patterns to follow when building scalable network-driven applications.

This article focuses on some of the patterns and practices to follow when building Node.js applications. You will learn about coding style, error handling, loggers, and testing.

Let's dive in!

## Node.js Coding Style and Best Practices

### const and let Keywords to Declare Variables

There are different ways to declare variables in JavaScript: the old school `var` and the more recent `let` and `const`.

`var` declares a function-scoped (when declared within a function) or globally-scoped variable (when declared outside a function).

`let` and `const` declare block-scoped variables.

`let` allows you to create variables whose value can change. When pointing to an object, it can be assigned to another object.

```js
let myInt = 3;
myInt = 6;
console.log(myInt); // 6
let myArray = [0, 1, 2, 3];
console.log(myArray); // [ 0, 1, 2, 3 ]
let myOtherArray = ['one', 'two', 'three'];
myArray = myOtherArray;
console.log(myArray); // [ 'one', 'two', 'three' ]
```

The `const` keyword can be a little confusing. It doesn't necessarily define a constant value, it defines a constant reference to a value. It creates a read-only reference to a value, but this doesn't mean the value it holds is immutable, just that it cannot be reassigned.

```js
const myInt = 3;
myInt = 6; // TypeError: Assignment to constant variable.
const myArray = [0, 1, 2, 3];
console.log(myArray); // [ 0, 1, 2, 3 ]
myArray[0] = 'eleven';
console.log(myArray); // [ 'eleven', 1, 2, 3 ]

let myOtherArray = ['one', 'two', 'three'];
myArray = myOtherArray; // TypeError: Assignment to constant variable
```

As shown above, if it holds a primitive, you cannot assign it another value. When it holds an object/array, you can alter the value of that object (its properties/elements), but you cannot assign it another object.

With the definitions down, let's look at why you should consider using `let` and `const` over `var`.

1. Duplicate variable declarations using `var` will not trigger an error.

With `var` you can declare a variable in the same scope as a similarly named variable. Because of this, you can unknowingly overwrite another variable's value.

```js
function thisFunction() {
  var x = 1;

  // In another part of the code, declare another variable x
  var x = 2;

  console.log(x); // 2
}

thisFunction();
```

Both `const` and `let` cannot be re-declared, so you cannot accidentally create a duplicate variable in the same scope.

```js
function thisFunction() {
  let x = 1;

  // In another part of the code, declare another variable x
  let x = 2;

  console.log(x);
}

thisFunction();
```

If you try to run the above code, you will get the following error:

```shell
SyntaxError: Identifier 'x' has already been declared
```

2. `var` allows you to read a variable that has not been declared.

When you try to access a `var` before it is declared, it will return `undefined`. This might cause bugs when you try to use a variable in your code that has not been declared. Tracking down the bug might be difficult since the code might cause no errors that will cause it to crash, but it might cause unexpected results when you use the `undefined`.

The following code will run just fine.

```js
console.log(bar); // undefined
var bar = 1;
```

With `let` and `const`, you won't be able to use a variable that has not been declared.

```js
console.log(foo); // ReferenceError
let foo = 2;
```

Trying to run the above will give the below error:

```shell
ReferenceError: Cannot access 'foo' before initialization
```

3. Because they are block-scoped, `let` and `const` make for more readable and straightforward code, that is less error-prone.
   With block-scoped variables, it is easier to read through code and track down the scope in which a variable operates. You just have to look at the inner-most block in which it has been declared to know its scope.

Look at the following code.

```js
let x = 5;

function thisFunction() {
  let x = 1;

  if (true) {
    let x = 2;
  }

  console.log(x); // 1
}

thisFunction();

console.log(x); // 5
```

Since `let x = 2;` is declared inside the block of the `if` statement, you know it only operates inside that block. As you can see, it doesn't affect similarly named variables outside the block. You can declare variables inside blocks without worrying that you might be re-declaring them.

When using `var`, it's not so straightforward.

```js
var x = 5;

function thisFunction() {
  var x = 1;

  if (true) {
    var x = 2;
  }

  console.log(x); // 2
}

thisFunction();

console.log(x); // 5
```

With `var`, you have to be more careful with variables.

In the above, we declare a variable `var x = 2;` inside the `if` statement. The scope of `x` is the entire function `thisFunction()`. Since there is a similarly named variable in the function, we re-declared `x`, and when we later use the function's `x`, it has the value `2`. So you need to be aware of the variables in scope, so as not to accidentally overwrite them.

### Proper Naming Conventions

It's important to follow a naming convention when naming constants, variables, classes, and functions in an app. This helps you visually differentiate between local variables, global variables, functions, classes, etc., and maintain a consistent style throughout your codebase.

For naming local variables and functions, use lowerCamelCase.

```js
const myFunction() {
  let someVariable;
}
```

Even if you define variables using the `const` keyword within the scope of a function, lowerCamelCase is preferred.

```js
const myFunction() {
  const someVariable = "That holds a string value";
}
```

Variables can also be defined by a `const` keyword in a specific use case. If you intend to declare a variable whose value (or nested values, in the case of declaring an object) is not going to change throughout the lifecycle of a codebase, use UPPER_SNAKE_CASE with the `const` keyword.

```js
const ANOTHER_VAR = 3;
```

Define classes in Node.js applications with UpperCamelCase:

```js
class MyClass() {
  // ...
}
```

Following these naming conventions will help you write more readable code. Naming your functions is vital, especially when you are about to profile a Node.js project. Profiling makes it simpler to understand what function to look for when checking a memory snapshot. However, if you use anonymous functions, profiling can make it challenging to debug production issues.

### ESLint and Style Guides

Instead of overthinking a project's coding style, use a linting tool like [ESLint](https://eslint.org/). Over the years, it has become the JavaScript ecosystem's standard for fixing code styles automatically. ESLint checks for possible code errors, fixes code styles such as spacing issues, avoids anti-patterns and small errors, and keeps project code uniform. Using ESLint with a tool like [Prettier](https://prettier.io/) can help you fix formatting issues as well.

By default, ESLint contains standard rules for vanilla JavaScript. It has a plugin system specific to the framework. For Node.js, you can use plugins like eslint-plugin-node and eslint-plugin-node-security.

It is much easier to understand a large project when its code is written in a consistent style. This is where style guides come in handy. Using a style guide enhances a team's productivity and avoids arguments about the best style guide for Node.js projects. In addition, you can opt-in to already existing style guides created at companies like [Google](https://github.com/google/eslint-config-google) and [Airbnb](https://github.com/airbnb/javascript) that have been tested with time.

## Error Handling in Node.js

You can handle errors using `async/await` syntax and the built-in error object in Node.js. Let's take a look at both.

### async/await Syntax to Catch Errors

When Node.js first came out, handling asynchronous code meant using callbacks. From my experience, it doesn't take too long for nested callbacks to get out of hand. This is known as 'callback hell', and here is a typical example:

```js
function getData(err, function(err, res) {
  if(err !== null) {
    function(valueA, function(err, res) {
      if(err !== null) {
        function(valueB, function(err, res) {
          // it continues
        }
      }
    })
  }
})
```

The example above is quite ergonomic. In a real scenario, there will be many more lines of code in each function's scope. This is considered an anti-pattern: handling the callback style of errors gets more awkward and only gets more un-maintainable with more nested functions.

You can avoid nested callbacks or callback hell by using ES6 `async/await` syntax (completely supported by Node.js version 8 and onwards). `async/await` is a way to deal with asynchronous code. It provides a much more compact way of writing code and familiar code syntax. To handle errors, you can use `try/catch` blocks along with `async/await` syntax.

If we use `async/await`, we can rewrite the previous example like this:

```js
async function getData(err, res) {
  try {
    let resA = await functionA(res);
    let resB = await functionB(resA);

    return resB;
  } catch (err) {
    logger.error(err);
  }
}
```

### Built-in Node.js Error Object

Errors are impossible to avoid. However, in many cases you'll want to handle errors such as rejected promises and thrown exceptions.

To avoid complications in error-handling, use the built-in error object in Node.js. It helps you maintain uniformity and prevent loss of information. You can also reap the advantages of finding information with StackTrace.

As an example, throw a string as shown below:

```js
if (!data) {
  throw 'There is no data';
}
```

This lacks any stack trace information and is an anti-pattern.

Instead, use the built-in Error object:

```js
if (!data) {
  throw new Error('There is no data');
}
```

## Loggers for Your Node.js Project

There's no denying it - we've all used `console` statements at times. They can be good for quickly debugging something or printing a standard output. But the console lacks proper configuration options for production-grade applications.

It is also crucial for a logger to be high-performant in identifying errors and possible issues. A slow logging library might harm your application's runtime performance.

A typical logger lets you use correct log levels such as fatal, warn, info, error, debug, and trace. These levels help to identify and distinguish between different critical events. A logger will also help provide contextual information in a JSON object, with timestamped log lines for you to determine when the log entry occurred. The logging format should be readable by human beings.

A good logging library provides features that make it easier to centralize and format logs. In the Node.js ecosystem, the following are some of the options available:

- [Winston](https://github.com/winstonjs/winston): A popular logging library that is easily configurable.
- [Bunyan](https://github.com/trentm/node-bunyan): Another popular logging library that outputs in JSON by default.
- [Log4js](https://github.com/log4js-node/log4js-node): A logger for the Express framework that supports colored console logging out of the box.
- [Pino](https://github.com/pinojs/pino): A logger that is focused on performance. It is considered to be faster than its alternatives.

An example of configuring Pino:

```js
const app = require('express')();
const pino = require('pino-http')();

app.use(pino);

app.get('/', function (req, res) {
  req.log.info('something');
  res.send('hello world');
});

app.listen(3000);
```

Pino also supports [various Web frameworks in the Node.js ecosystem](https://github.com/pinojs/pino/blob/HEAD/docs/web.md#express), such as Fastify, Express, Hapi, Koa, and Nest.

## Writing Tests in Node.js

If you work on a big application, you'll make continuous changes to the app's source code. By writing tests, you can avoid breaking existing features when pushing a new change. Failing tests will also help you determine where to make changes in specific sections of your code.

### Write API Tests

In a Node.js application, writing API tests is a good start. They provide more coverage than unit testing. You can use frameworks like [Supertest](https://github.com/visionmedia/supertest), [Jest](https://jestjs.io/), or any other library that provides a high-level abstraction for testing APIs.

Consider the example below. It is a simple Express app that serves one route:

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Other middlewares...

app.get('/', (req, res, next) => {
  res.json({ hello: 'Hello World' });
});

module.exports = app;
```

Here's appropriate way to write this using Supertest:

```js
const request = require('supertest');
const app = require('./index');

describe('hello test', () => {
  it('/ should return a response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ hello: 'Hello World' });
  });
});
```

### Write Clear Test Names

A test name should be descriptive and self-explanatory for other people working on your team and include what is being tested, the scenario, and expected result.

### Inspect Outdated Packages

You can check for outdated packages with commands like `npm outdated` or use a package like `npm-check`. This will prevent build fails related to outdated packages.

### Inspect for Vulnerable Dependencies

A package can have vulnerabilities. Use community-based tools such as [npm audit](https://docs.npmjs.com/cli/audit) or commercial tools like [snyk](https://snyk.io/) to discover vulnerabilities. If you don't use these tools, your only alternative is to keep up with tech communities online.

## Wrap Up: Write Better Code for Your Node.js Apps

In this article, we covered practices and patterns to help you avoid anti-patterns and write better code for your Node.js applications.

We looked at some key principles around coding style, error handling, loggers, and testing. Some of the practices we discussed are more general - like checking for outdated packages or vulnerable dependencies. Others - such as using a performant logging library using ESLint and style guides - will help you maintain a consistent way of writing code, especially when working on large projects.

Happy coding!

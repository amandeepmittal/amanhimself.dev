---
title: 'Top open source libraries for Node.js'
slug: '29-useful-open-source-libraries-for-nodejs'
date: '2019-01-31'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/crowdbotics/29-useful-open-source-libraries-for-nodejs-4cefe08f7205'
---

![cover_image](https://i.imgur.com/Yv3yfrm.png)

> [Originally published at Crowdbotics](https://medium.com/crowdbotics/29-useful-open-source-libraries-for-nodejs-4cefe08f7205)

[**Node.js**](https://nodejs.org) has become more and more popular as a framework because provides quick and efficient solutions for back-end development and integrates well with front-end platforms.

Created by Ryan Dahl in 2009, Node.js is actively maintained by a large community as an open source project. It enables software and app developers to build fast and scalable web applications using just a few lines of code. [Node.js Foundation](https://medium.com/u/96cd9a1fb56)

The world of custom software development constantly evolves with new trends, techniques, and languages. But, with Node.js, app development is significantly simplified.

In this article, I collated a list of the useful open source libraries that you can use in your upcoming Node.js project.

> [**Also, try out the Crowdbotics App Builder to instantly scaffold and deploy a NodeJS app.**](https://app.crowdbotics.com/create/?utm_campaign=cb-medium&utm_content=node-js)

### ExpressJS

Express.js is a go-to, minimalist framework for Node.js web applications. In recent years, it has been a go to framework to write server side code for the applications that want to use and leverage Node.js.

It is actively maintained by a great community, now supports almost all ES6 features and is used by both big companies and startups. There is no shortage of web frameworks when it comes to Nodejs and Express has survived the popularity phase so far.

[**expressjs**](https://github.com/expressjs)

### AdonisJS

It is a complete MVC Nodejs framework (_other than Sails_) that runs on all major operating systems without a problem. . It offers a stable ecosystem to write server-side web applications so you can focus on business needs over finalizing which package to choose or not.

It differs from other Nodejs web frameworks such as Express and Koa in manner that those frameworks are mostly routing libraries with thin layer of middleware on top

AdonisJS is combination of multiple packages that work together gracefully integrate with the application. For example, it provides a built-in ORM that is works well with SQL databases such as Postgres and MySQL. It helps to create efficient SQL- queries and is based on active record idea. Its query builder is easy to learn and allows us to build simple queries quickly.

[**adonisjs/adonis-framework**](https://github.com/adonisjs/adonis-framework)

### MomentJS

The standard JavaScript API already comes with the Date object for working with dates and times. However, this object is not very user-friendly when it comes to printing and formatting dates.

In recent years, MomentJS has become a go to module to use with NodeJS applications to parse, validate, manipulate and format date when building APIs and storing them as data in a preferred database. It is lightweight library and now supports ECMAScript 6.

[**moment/moment**](https://github.com/moment/moment)

### gm

GraphicsMagick and ImageMagick are two popular tools for creating, editing, composing and converting images. With module `gm` you can use both tools directly from within your JavaScript code in a NodeJS application. The module supports all the typical required to operate on an image:

- resizing
- clipping
- encoding

```js
var fs = require('fs'),
  gm = require('gm').subClass({ imageMagick: true });

// resize and remove EXIF profile data
gm('/path/to/my/img.jpg').resize(240, 240);
```

[**aheckmann/gm**](https://github.com/aheckmann/gm)

### sharp

With over 11k+ stars on its Github repository, `sharp` is a high performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images.

The typical use case for this high speed Node.js module is to convert large images in common formats to smaller, web-friendly images with different dimensions. Resizing an image is typically 4x-5x faster than using the quickest ImageMagick and GraphicsMagick settings.

```js
sharp('input.jpg')
  .rotate()
  .resize(200)
  .toBuffer()
  .then( data => ... )
  .catch( err => ... );
```

[**lovell/sharp**](https://github.com/lovell/sharp)

### node-csv

The CSV (comma-separated values) format is often used when interchanging table-based data. For example, Microsoft Excel allows you to export or import your data in that format. `node-csv` simplifies the process of working with CSV data in a server side application.

node-sv provides functionalities for generating, parsing, transforming and stringifying CSV and uses streams API for that. It also comes with a callback API, a stream API and a synchronous API to fullfil your needs.

[**adaltas/node-csv**](https://github.com/adaltas/node-csv)

### Passport

Passport is an ExpressJS compatible authentication middleware for Node.js. Its sole purpose is to authenticate requests which is done through an extensible set of plugins known as strategies. Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer.

The API is simple and requires you to provide a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

```js
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
```

[**jaredhanson/passport**](https://github.com/jaredhanson/passport)

### Nodemailer

An open source package, nodemailer lets you send emails just by using it inside a NodeJS app. It is a single module with zero dependencies so you can use it freely without worrying much about sensitive data leaking.

It also secures email delivery using TLS/STARTTLS and you can attach deliverables with your message. The standard Node.js API does not offer such a feature, but fortunately the module Nodemailer fills this gap.

[**nodemailer/nodemailer**](https://github.com/nodemailer/nodemailer)

### ndb

`ndb` is an improved debugging experience for Node.js, developed and enabled by the team behind Google's Chrome web browser. Currently, it is recommended to use Node `v10.x.x` but if you are considering using this package to debug your Node apps, you are required a minimum version of `8.x.x`. ndb has some powerful features exclusively for Node.js:

- Child processes are detected and attached
- You can place breakpoints before the modules are required
- You can edit your files within the UI
- By default, `ndb` blackboxes all scripts outside current working directory to improve focus. This includes node internal libraries (like `_stream_wrap.js`, `async_hooks.js`, `fs.js`)
- supports memory profiler, JS sampling profiler, breakpoint debugging, async stacks and so on

[**GoogleChromeLabs/ndb**](https://github.com/GoogleChromeLabs/ndb)

### lodash

This is a utility library that provides extra functionalities such as iteration, manipulation of values, testing values, and creating composite functions that work with arrays, objects, numbers, strings and so on. It is one of the most popular open source library in Nodejs ecosystem.

```js
// Load the full build.
const _ = require('lodash');

// Load the core build.
const _ = require('lodash/core');

// Load the FP build for immutable auto-curried iteratee-first data-last methods.
const fp = require('lodash/fp');
```

[**lodash/lodash**](https://github.com/lodash/lodash)

### axios

A promise based HTTP client that provide extra features over `fetch` from native JavaScript API, axios is a popular utility tool among both front-end JavaScript developers and NodeJS. It has following features:

- Make XMLHttpRequests from the browser
- Make http requests from node.js
- Supports the Promise API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against XSRF

Most of the above enlisted features have ae absent from native `fetch` JavaScript API and adds to the advantage of using `axios`. Check out the example below in which `axios` is being used with `async/await` syntax.

```js
async function getUser() {
  try {
    const response = await axios.get('/user?ID=54321');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

### Socket.io

This is a library that enables a bi-directional communication in real-time by using WebSockets. It provides reliability for handling proxies and load balancers, personal firewalls and antivirus softwares, and supports binary streaming.

Other features include auto-connection support where unless instructed otherwise a disconnected client will try to reconnect forever, until the server is available again. Used by organizations such as Microsoft, Zendesk, Trello it also includes real-time analytics with counters, logs and charts and has a variety of use cases in IOT.

```js
io.on('connection', socket => {
  socket.emit('request' /* … */); // emit an event to the socket
  io.emit('broadcast' /* … */); // emit an event to all connected sockets
  socket.on('reply', () => {
    /* … */
  }); // listen to the event
});
```

[**socketio/socket.io**](https://github.com/socketio/socket.io)

### PM2

It is a Production Runtime and Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common devops tasks. Starting an application is easy as well as managing one too.

PM2 has container support as well with the drop-in replacement command for node, called pm2-runtime, run your Node.js application in a hardened production environment. It supports all major Node.js frameworks such as Express, Sails, Hapi and so on.

[**Unitech/pm2**](https://github.com/Unitech/pm2)

### Joi

Introduced with HapiJS, Joi has become a popular library to validate incoming data requests. If you have ever used an ORM when building your Node application such as Sequelize or Mongoose, you know that it is possible to set validation constraints for your model schemas.

This makes it very easy to handle and validate data at the application level before persisting it to the database. When building APIs, the data usually come from HTTP requests to certain endpoints, and the need may soon arise to be able to validate data at the request level.

Joi is used to validate schema objects with additional rules provided by its own API. Moreover, it works with any Nodejs framework rather than just HapiJS.

```js
const Joi = require('joi');

const schema = Joi.object()
  .keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainAtoms: 2 })
  })
  .with('username', 'birthyear')
  .without('password', 'access_token');
```

[**hapijs/joi**](https://github.com/hapijs/joi)

### TypeORM

Whether you want to work with TypeScript enabled Nodejs server or make use of latest ES6, ES7 JavaScript features to create an API for your application, TypeORM is a popular library that work with multiple databases. It supports both Active Record and Data Mapper patterns, unlike all other JavaScript ORMs currently in existence, which means you can write high quality, loosely coupled, scalable, maintainable applications the most productive way.

For example, a typical connection to a database using TypeORM looks like:

```js
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Photo } from './entity/Photo';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [Photo],
  synchronize: true,
  logging: false
})
  .then(connection => {
    // here you can start to work with your entities
  })
  .catch(error => console.log(error));
```

It also supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.

[**typeorm/typeorm**](https://github.com/typeorm/typeorm)

### Sequelize

It is a promise based Nodejs ORM that supports multiple SQL based databases such as Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, read replication and more. It comes with its own CLI tool that enables data migrations and model/schema creation easy. It has a simple installation process, all you have to do is install `sequelize` in your Nodejs application along with the driver of that database you are using.

```shell
$ npm install --save sequelize

# And one of the following:
$ npm install --save pg pg-hstore
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # MSSQL
```

[**sequelize/sequelize**](https://github.com/sequelize/sequelize)

### Mongoose

MongoDB is a commonly used NoSQL database in Nodejs applications. It stores the data in JSON documents and the structure of these documents can vary as it is not enforced like SQL databases.

Mongoose is an Object Data Modelling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

[**Automattic/mongoose**](https://github.com/Automattic/mongoose)

### MochaJS

Mocha.js is a JavaScript test framework based on Node.js. It enables you to test both in console and in the browser. You can use this really fast testing suite to do the unit and integration testing plus it works with testing patterns such as TDD (_Test-Driven Development_) and BDD (_Behavior Driven Development_). Mocha works well with other assertion libraries such as Chai, Sinon, Should.js. This is an advantage and the reason for its popularity.

```js
const assert = require('assert');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```

[**mochajs/mocha**](https://github.com/mochajs/mocha)

### Chai

Chai is a TDD and BDD assertion framework for Node.js which can be paired with any test runner framework. As an assertion tool, you can use Chai with its rich plugin system such as `chai-as-promised`, `chai-events`, `chai-spies-next`. It gives me much simpler and more readable tests than using my own assertion helpers or other less popular libraries.

[**chaijs/chai**](https://github.com/chaijs/chai)

### SinonJS

This is a standalone testing framework for Node.js. The advantage it possess is that it works with any testing framework. You will find many examples of it being used with Mocha and Chai. It requires minimal integration and supports stubs, spies and mocks. It also supports most browsers (cross-browser support) and runs on the server using Node.js.

[**sinonjs/sinon**](https://github.com/sinonjs/sinon)

### AVA

This is a minimal testing framework to test Node.js applications. It utilizes the async I/O nature of Node and runs concurrent tests, hence, it vastly decreases test suite times. Some of its highlights are:

- Magic assertion in which it adds code excerpts and clean diffs for actual and expected values. If values in the assertion are objects or arrays, only a diff is displayed, to remove the noise and focus on the problem.
- Clean stack traces by automatically removing unrelated lines in stack traces, allowing you to find the source of an error much faster, as seen above.
- supports latest JavaScript features using [**Babel 7**](https://babeljs.io/).

[**avajs/ava**](https://github.com/avajs/ava)

### Jest

Jest is an open source framework that built for writing and running tests in JavaScript. It is open source, created and maintained by the Facebook. It is built with multiple layers on top of jasmine (_another test running framework_) by keeping some of good parts from jasmine. Its strengths are:

- is fast
- it can perform snapshot testing
- is opinionated, and provides everything out of the box without requiring you to make choices

The advantage it has over other NodeJS testing frameworks such as Mocha that it uses its own assertion API whereas using Mocha you have to install another third party module in order to create and run tests. Jest is human friendly framework. It has gained its attraction by its well supported and very fast testing behavior.

[**facebook/jest**](https://github.com/facebook/jest)

### CloudRail

Using CloudRail, you can easily integrate external APIs into your application. CloudRail provides abstracted interfaces that take several services and then exposes a developer-friendly API that uses common functions between all providers.

This means that, for example, upload() works in exactly the same way for Dropbox as it does for Google Drive, OneDrive, and other Cloud Storage Services, and getEmail() works similarly the same way across all social networks.

[**CloudRail/cloudrail-si-node-sdk**](https://github.com/CloudRail/cloudrail-si-node-sdk)

### agenda

Job scheduling is a big part of any server side framework. Luckily, Nodejs has one awesome framework to schedule jobs to run at a particular time and run on a particular day. `agenda` is a light-weight job scheduling library for Node.js. It uses promised based API and has Mongo backed persistence layer.

[**agenda/agenda**](https://github.com/agenda/agenda)

### Nodemon

It is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. It does not require any additional changes to your code or method of development.

`nodemon` is a replacement wrapper for node, to use `nodemon` replace the word `node` on the command line when executing your script. It was originally written to restart hanging processes such as web servers, but now supports apps that cleanly exit.

[**remy/nodemon**](https://github.com/remy/nodemon)

### Keystone CMS

It is a content management system and web application framework built on Express framework and uses Mongoose as the ODM. It makes it easy to create sophisticated web sites and apps, and comes with a beautiful auto-generated Admin UI. Currently, the Admin UI is a single page application written using React, Redux and Elemental UI. You can use your own Express instance and integrate Keystone as a library.

[**keystonejs/keystone**](https://github.com/keystonejs/keystone)

### Strapi

Another open source Content Management System for Nodejs application, Strapi has its own advantages. One of them is it being headless and supporting multiple databases such as MySQL, Postgres and MongoDB. It has many features such as:

- Modern Admin Panel: Elegant, entirely customizable and fully extensible admin panel
- Secure by default: Reusable policies, CSRF, CORS, P3P, Xframe, XSS
- Plugins Oriented: Install auth system, content management, custom plugins, and more, in seconds
- Powerful CLI: Scaffold projects and APIs on the fly
- Front-end Agnostic: Use any front-end frameworks (React, Vue, Angular, etc.), mobile apps or even IoT
- Blazing Fast: Built on top of Node.js, Strapi delivers amazing performances.

[**strapi/strapi**](https://github.com/strapi/strapi)

### FakerJS

When we start to build an application, we generally do not want to worry much about data. To create a database and fill it with sample data seems much of a hassle to me personally.

```js
var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties
```

FakerJS a wonderful node module to create fake/mock data when you are starting to build a prototype or an application. It has its own API that has a variety of generators to construct mock data as per your needs.

[**Marak/faker.js**](https://github.com/marak/Faker.js/)

### Dotenv

Saving sensitive data in the form of environmental variables is one good practice to be followed when working with Nodejs web frameworks. Environmental variables are local variables that are made available to an application. Creating these variables is made easy with a tool like `dotenv`.

This module loads environment variables from a `.env` file that you create and adds them to the `process.env` object that is made available to the application. This module allows you to create secret keys that your application needs to function and keep them from going public.

[**motdotla/dotenv**](https://github.com/motdotla/dotenv)

### Conclusion

Nodejs is a mature platform. Working with third party libraries is a huge part of the JavaScript ecosystem and you cannot run from it. Apart from your personal opinion, if you do not appreciate working with different third party libraries then you should definitely think about the tech stack you are working with.

_I hope this list gets you started to with most commonly used open source packages that are used in_ [**_Node.js_**](https://nodejs.org) _community._

---
date: '2017-01-11'
title: 'Migrating from Expressjs 4 to 5'
thumbnail: '/thumbnails/node.png'
slug: 'migrating-from-expressjs-4-to-5'
tag: ' nodejs'
canonicalUrl: 'https://hackernoon.com/migrating-from-expressjs-4-to-5-156dcd80eb11'
---

ExpressJS 5.0 is in alpha release stage but I believe we’ll be adding it as a dependency in our `package.json` files in matter of no time. This article gives some tips regarding the way we are writing code using this framework and how we should adapt the new changes even if we are using ExpressJS _version 4.0_.

I’ll start with most common thing such as `response`.

Express 5 no longer supports the signature `res.send`, instead we should adapt using this method in this form:

`res.status(statusCode).send();`

We have to set the status code before sending the response object. This new version of `res.send` is basically a chain of two methods: `res.status` & `res.send`.

With that mind, ExpressJS 5 deprecates `res.send(statusCode)` method where `statusCode` is the number representing the HTTP response header status code. To send just the statusCode, that is, without sending the response object, we can use `res.sendStatus(statusCode)` method.

In similar manner, other methods that have been changed are:

```js
res.json()-- > res.status().json();
res.jsonp()-- > res.status.jsonp();
```

Another notable method that is going to be deprecated in next version of ExpressJS is `res.sendfile()`. Instead, we must adapt its new form, the camelCase one: `res.sendFile()` which is already been supported by the ExpressJS versions later than `4.8.x`. It comes with optional parameters that you can check them [**here**](http://expressjs.com/en/4x/api.html#res.sendFile)**.**

Whether you are planning to use the alpha release of Express 5.0 or still going on with the latest versions of Express 4.0, I would suggest to start adapting these methods immediately.

_The full list of changes or the official Express Migration Guide is to be found_ [here](http://expressjs.com/en/guide/migrating-5.html)**_._**

[Originally Published at Hackernoon.com](https://hackernoon.com/migrating-from-expressjs-4-to-5-156dcd80eb11)

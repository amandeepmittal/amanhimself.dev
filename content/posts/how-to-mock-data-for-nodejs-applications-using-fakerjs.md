---
title: 'How to Mock Data for Node.js Applications using faker.js'
date: '2017-04-01'
thumbnail: '/thumbnails/node.png'
slug: 'how-to-mock-data-for-nodejs-applications-using-fakerjs'
tag: 'nodejs'
canonicalUrl: 'https://hackernoon.com/how-to-mock-data-for-node-js-applications-using-faker-js-b1f4c0e78102'
---

> [Originally Published at Hackernoon.com](https://hackernoon.com/how-to-mock-data-for-node-js-applications-using-faker-js-b1f4c0e78102)

When we start to build an application, we generally do not want to worry much about data. To create a database and fill it with sample data seems much of a hassle to me personally. I instead focus more on creating RESTful API and the front end of the application when I am prototyping.

However, this doesn’t mean I don’t pay attention to data organization in the database. It’s important to have schemas of collections and documents or any other way you want to organize your data. With this aspect complete, it clarifies _what_ and _how_ questions when creating APIs.

In a recent scenario, building a prototype of an E-Commerce web application for a client, I found myself in a similar situation. I had a deadline to deliver the prototype with a maximum number of functionalities checked required by the client. After settling on how to architecture database’s schemas, I went on searching​ and finding a gem to solve this issue: **faker.js.**

### Enter faker.js

It’s a wonderful node module to create fake/mock data when you face a similar situation. fakerjs has its own API, and it’s huge. All credit goes to [**Marak**](https://twitter.com/marak), who built it. It has a vast API for almost every use case with an excellent [_documentation_ that can help you get familiar in minutes on Github.](https://github.com/marak/Faker.js/)

Let’s consider a test case where I want some _a user_ to have the following amount of fields:

- name
- email
- website
- address
- bio
- image/avatar

```js
const faker = require('faker');

const User = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  website: faker.internet.url(),
  address:
    faker.address.streetAddress() +
    faker.address.city() +
    faker.address.country(),
  bio: faker.lorem.sentences(),
  image: faker.image.avatar()
};

module.exports = User;
```

<img src='https://cdn-images-1.medium.com/max/1200/1*t8BjRlFjuUnbf0iXl-FZCQ.png' />

That’s it. This is how you mock data using faker.js. It’s quick, simple to setup and no hassle at all. You just have to add it to your `npm` dependencies:

```shell
npm install faker --save
```

#### faker.js Data

List of data that can generate faker.js:

- address
- commerce
- company
- date
- finance
- hacker
- helpers
- image
- internet
- lorem
- name
- phone
- random
- system

Each element has many sub-items that you can check [here](https://github.com/Marak/faker.js) in the documentation.

Another good thing about Faker I like is that it’s not only restricted to server-side JavaScript only. You can mock data for browser JavaScript too. A little snippet from the documentation shows how to do this:

```html
<script src="faker.js" type="text/javascript"></script>
<script>
  var randomName = faker.name.findName(); // Caitlyn Kerluke
  var randomEmail = faker.internet.email(); // Rusty@arne.info
  var randomCard = faker.helpers.createCard(); // random contact card containing many properties
</script>
```

This API will help you to prototype your JavaScript/Node.js applications at a faster rate. Not only that, you can easily mock your TDD/BDD tests when creating a RESTful API utilizing this library.

For full source code at [this Github Repository](https://github.com/amandeepmittal/fakerjs)

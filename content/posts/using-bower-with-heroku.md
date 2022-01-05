---
title: 'Using Bower With Heroku'
date: '2016-12-29'
thumbnail: '/thumbnails/heroku.png'
slug: 'using-bower-with-heroku'
tag: 'tools'
canonicalUrl: 'https://hackernoon.com/using-bower-with-heroku-cdc791320c88'
---

> [Originally Published at Hackernoon.com](https://hackernoon.com/using-bower-with-heroku-cdc791320c88)

Yes, I use [Bower](http://bower.io) to maintain front-end dependencies, mostly for my side projects. Whatever you say, Bower is good and I am too anxious to mess with npm dependencies for front-end development. Plus, I feel that maintaining front-end dependencies with Bower helps in keeping my application’s skeleton clean.

So for last two of my projects, I have been using [Heroku](http://heroku.com) for deployment. Since I am maintaining front-end dependencies using Bower, I went through [_this article_](https://devcenter.heroku.com/articles/buildpacks) which is about generating buildpacks on Heroku. I find generating buildpacks adds unnecessary complexity in the process of application deployment, at least for _rapid prototyping_. Thus, I choose a different path. Adding Bower as an npm dependency seems an easy process and doesn’t add any kind of complexity. I find it’s great only if you are using Bower for rapid prototyping JavaScript applications.

After you are done with building your application, all you have to do is add `Bower` as an npm dependency in `package.json` file and then add a script under `npm scripts` to execute a command that will install bower dependencies before the application is deployed on Heroku.

Bower as dependency in `package.json` :

```json
"dependencies": {
     "bower": "1.8.0"
}
```

And then add a`postinstall` command in `npm scripts` :

```json
"scripts": {
    "postinstall": "./node\_modules/bower/bin/bower install"
}
```

You can read more about customizing [**Heroku Build Process here**](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process)**.**

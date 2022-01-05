---
date: '2016-12-25'
title: 'Writing a Node.js Twitter Bot Part 1'
thumbnail: '/thumbnails/node.png'
slug: 'node-js-twitter-bot-tutorial'
tag: 'nodejs'
canonicalUrl: 'https://community.risingstack.com/node-js-twitter-bot-tutorial/'
---

In this tutorial, we will create a Twitter Bot with Node.js that retweets or favorites based on hashtags, and replies to users if they follow the account.

## What do you need to create this bot?

- You must have [Node.js](http://nodejs.org) installed on your system.
- A Twitter Account.
- Your bot will be using [`twit`](https://www.npmjs.com/package/twit) which is an npm module to manipulate tweets and streams, and to communicate with the [Twitter API](https://dev.twitter.com/docs).

## Let’s Start

Setup an empty directory and initialise it with:`$ npm init` to configure this web application with `package.json` file. Then create two new files: `bot.js` & `config.js` in that directory.

`bot.js` will be our main app file in which we will be writing the source code of our Twitter Bot, and so in `package.json` edit the `main` field to:

```json
{
  "main": "bot.js"
}
```

Your current directory structure should look like this:

```shell
root/project-name
|- bot.js
|- config.js
|- package.json
```

## Configuring and granting permissions from Twitter API

After logging to to your Twitter account, follow to this link: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new) to create a new application. Fill out the necessary fields in the form click on the button _Create Your Twitter Application._ After creating the application, look for `Keys and Access Tokens` under the nav-panes and click on `Generate Token Actions\` and then copy:

- Consumer Key
- Consumer Secret
- Access Token
- Access Token Secret

Open the `config.js` file and paste all four values inside it. Expose those values using `module.export`:

```js
//config.js
/\*\* TWITTER APP CONFIGURATION
 \* consumer\_key
 \* consumer\_secret
 \* access\_token
 \* access\_token\_secret
 \*/

module.exports = {
  consumer\_key: '',
  consumer\_secret: '',
  access\_token: '',
  access\_token\_secret: ''
}
```

Now, the Twitter bot’s configuration is step is complete. _Please note,_ for every different application, the `consumer key`, `consumer secret`, `access_token` and `access_token_secret` will differ.

## Building the bot

Since the configuration step is complete, now let’s install our third requisite that is [Twitter API client for node](https://www.npmjs.com/package/twit) and will help us to communicate to Twitter API and provide an API for all necessary actions _(such as retweet and favorite a tweet)._

We will start by installing the dependency we need for our application.

```shell
$ npm install --save twit
```

After the dependency has finished installing, go to the `bot.js` file and require the dependency and `config.js` file.

```js
var twit = require(’twit’);
var config = require(’./config.js’);
```

Pass the configuration (_consumer and access tokens_) of our Twitter application in `config.js` to `twit:`

```js
var Twitter = new twit(config);
```

So far, so good?

**PLEASE NOTE: You must refer to** `[**twit**](https://www.npmjs.com/package/twit)` [**documentation**](https://www.npmjs.com/package/twit) **for a deep reference.**

#### Retweet Bot

Let’s write a function expression that finds the latest tweets according to the query passed as a parameter. We will initialise a `params` object that will hold various properties to search a tweet, but most importantly `query` or `q` property that will refine our searches. Whatever value you feed in this property, our bot will search the tweets to retweet based on this criteria. You can feed this property values like a twitter handler, to monitor a specific twitter account or a #hashtag. For our example bot, we have find latest tweets on #nodejs.

This is how the functionality of the retweet bot starts:

```js
var retweet = function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result\_type: 'recent',
    lang: 'en'
  }
```

The other two properties: `result_type` and `lang` are optional. On defining the `result_type: 'recent'` notifies bot to only search for the latest tweets, tweets that have occurred in the time period since our bot has started or it made the last retweet.

[There is a list of parameters provided by the Twitter API](//%20for%20more%20parametes,%20see:%20https://dev.twitter.com/rest/reference/get/search/tweets).

Our next step is to search for the tweets based on our parameters. For this, we will use `Twitter.get` function provided by `twit` API to GET any of the REST API endpoints. The REST API endpoint is a reference to the T[witter API endpoint](https://dev.twitter.com/docs) we are going to make a call to search for tweets. The `Twitter.get` function accepts three arguments: API endpoint, params object (defined by us) and a callback.

```js
// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function () {
  var params = {
    q: '#nodejs, #Nodejs', // REQUIRED
    result_type: 'recent',
    lang: 'en'
  };
  // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

  Twitter.get('search/tweets', params, function (err, data) {
    // if there no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell TWITTER to retweet
      Twitter.post(
        'statuses/retweet/:id',
        {
          id: retweetId
        },
        function (err, response) {
          if (response) {
            console.log('Retweeted!!!');
          }
          // if there was an error while tweeting
          if (err) {
            console.log(
              'Something went wrong while RETWEETING... Duplication maybe...'
            );
          }
        }
      );
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
};
```

To post or to retweet the tweet our bot has found we use `Twitter.post()` method to _POST any of the REST API endpoints_. It also takes the same number of arguments as `Twitter.get()`.

Now to automate this action we defined above, we can use JavaScript’s timer function `setInterval()` to search and retweet after a specific period of time.

```js
// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);
```

Please note that all JavaScript’s Timer functions take the _amount of time_ argument in milliseconds.

#### Favorite Bot

Similar to `retweet` bot we can define and initialise another function expression that will search and _favorite_ a tweet randomly. Yes, the difference here is to search and grab the tweet randomly. We will start by creating a parameter object `params` that will consist of three properties as in `retweet()` function expression. The bot will search for tweets using the same `.get()` function provided by `twit` API to GET any of the Twitter API endpoints. In our case, we need `search/tweets`. Then we will store the status of the search for tweet to _favorite_ in a variable and in a another variable we will apply the random function by passing the “status of the search” variable as an argument.

```js
// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function () {
  var params = {
    q: '#nodejs, #Nodejs', // REQUIRED
    result_type: 'recent',
    lang: 'en'
  };
  // for more parametes, see: https://dev.twitter.com/rest/reference

  // find the tweet
  Twitter.get('search/tweets', params, function (err, data) {
    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet); // pick a random tweet

    // if random tweet exists
    if (typeof randomTweet != 'undefined') {
      // Tell TWITTER to 'favorite'
      Twitter.post(
        'favorites/create',
        { id: randomTweet.id_str },
        function (err, response) {
          // if there was an error while 'favorite'
          if (err) {
            console.log('CANNOT BE FAVORITE... Error');
          } else {
            console.log('FAVORITED... Success!!!');
          }
        }
      );
    }
  });
};
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
```

Note that the tweets searched by our bot are all stored in an array. Again, we use JavaScript’s timer function `setInterval()`to search and favorite the tweet after a specific period of time in milliseconds.

The complete module: `bot.js` :

```js
// Dependencies =========================
var twit = require('twit'),
  config = require('./config');

var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function () {
  var params = {
    q: '#nodejs, #Nodejs', // REQUIRED
    result_type: 'recent',
    lang: 'en'
  };
  Twitter.get('search/tweets', params, function (err, data) {
    // if there no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell TWITTER to retweet
      Twitter.post(
        'statuses/retweet/:id',
        {
          id: retweetId
        },
        function (err, response) {
          if (response) {
            console.log('Retweeted!!!');
          }
          // if there was an error while tweeting
          if (err) {
            console.log(
              'Something went wrong while RETWEETING... Duplication maybe...'
            );
          }
        }
      );
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
};

// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function () {
  var params = {
    q: '#nodejs, #Nodejs', // REQUIRED
    result_type: 'recent',
    lang: 'en'
  };
  // find the tweet
  Twitter.get('search/tweets', params, function (err, data) {
    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet); // pick a random tweet

    // if random tweet exists
    if (typeof randomTweet != 'undefined') {
      // Tell TWITTER to 'favorite'
      Twitter.post(
        'favorites/create',
        { id: randomTweet.id_str },
        function (err, response) {
          // if there was an error while 'favorite'
          if (err) {
            console.log('CANNOT BE FAVORITE... Error');
          } else {
            console.log('FAVORITED... Success!!!');
          }
        }
      );
    }
  });
};
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
```

#### Usage

To run this bot, go to your terminal:

```shell
$ node bot.js
```

To avoid this monotonous process you can use `npm scripts` or `nodemon.` You can also deploy this app on `Heroku` for a continuous integration.

To use npm scripts, make this edit under `scripts` in `package.json` :

```json
{
  "scripts": {
    "start": "node bot.js"
  }
}
```

Then from terminal:

```shell
$ npm start
```

## Conclusion

There are various ways to write a Twitter Bot, this is just one way. Your bot can be smart and you can do various things with it. You just have to refer to [twit documentation](https://www.npmjs.com/package/twit) for other RESTful API methods to manipulate [Twitter API endpoints](http://REST%20API%20Endpoints:%20https://dev.twitter.com/rest/public).

For further reading check out [Botwiki.org](https://botwiki.org/bots/twitterbots/) for various types of bots on vast amount of platforms. For advanced reading, check out [Botwiki’s list of tutorials of Twitter Bots in different programming languages](https://botwiki.org/tutorials/twitterbots/).

Update: the second part of this tutorial is available [here!](https://community.risingstack.com/how-to-make-a-twitter-bot-with-node-js/)

[Originally Published at RisingStack.com](https://community.risingstack.com/node-js-twitter-bot-tutorial/)

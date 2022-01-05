---
date: '2016-12-25'
title: 'Writing a Node.js Twitter Bot Part 2'
thumbnail: '/thumbnails/node.png'
slug: 'node-js-twitter-bot-tutorial-part-2'
tag: 'nodejs'
canonicalUrl: 'https://community.risingstack.com/how-to-make-a-twitter-bot-with-node-js/'
---

If you read the [first part of my tutorial](https://community.risingstack.com/node-js-twitter-bot-tutorial/), you already know how to make a Twitter Bot with Node.js that retweets and favorites tweets using the Twitter API.

In the second part of the Twitter Bot tutorial, we will continue to extend our Bot by adding functionality that will tweet back to any Twitter user who follows our bot.

Before starting this, make sure your directory structure includes:

- `package.json` (the configuration file for our Node.js application)
- `config.js` (the configuration file of our Twitter application that contains both consumer and access key & tokens)
- `bot.js` (our main application file)

The representation would be:

```shell
root/project-name
|- bot.js
|- config.js
|- package.json
```

You can take a look at the complete bot.js file from [the first part of this tutorial](https://community.risingstack.com/node-js-twitter-bot-tutorial/).

Also, make sure you have the [twit](https://www.npmjs.com/search?q=twit) npm module installed.

## How to make a Twitter bot that replies

After setting up the dependencies and loading/requiring the configuration related to our application, we are going to develop a functionality that is going to tweet back to a Twitter user who follows the Bot's Twitter Handler.

We are going to use [Twitter's Streaming API](https://dev.twitter.com/streaming/overview) to interact with our followers.

## Setting up the Streams API

First, we have to set up a stream. Fortunately, the third party npm dependency `twit` provides an API function `.stream()` to do this task.

```js
// Use Streams API for interacting with a USER
// set up a user stream

var stream = Twitter.stream('user');
```

`.stream()` keeps the connection alive, and returns an `EventEmitter`.

`twit` provides a list of stream events to listen on, such as 'follow', 'unfollow', 'favorite' and 'unfavorite'.

Right now we are only interested in the follow event, however the basic syntax is similar to every event.

```js
// when someone follows
stream.on('follow', followed);
```

When a user follows our Twitter Bot, the `follow` event will trigger the callback associated with it, in our case `followed`.

```js
// ...trigger the callback
function followed(event) {
    console.log('Follow Event is running');
    //get user's twitter handler (screen name)
    var name = event.source.name,
    var screenName = event.source.screen_name;
    // function that replies back to the user who followed
    tweetNow('@' + screenName + ' Thank you for the follow up.');
}
```

## Replying with tweetnow()

In the followed callback, we pass an event argument which gets the Twitter handle and the screen name of the user. In the last line, we invoke a `tweetnow()` function that replies back to the user who followed our bot.

The `tweetnow()` function takes a string as an argument and updates our bots status. In other terms, it tweets by using `.post()`function provided by the `twit` API to post to the `statuses/update`Twitter API endpoint.

This endpoint gets called whenever you tweet from your Twitter account.

If you noticed in the [previous tutorial](https://community.risingstack.com/node-js-twitter-bot-tutorial/) when retweeting or to favorite a tweet, we used `.post()` to update our status.

```js
function tweetNow(tweetTxt) {
  var tweet = {
    status: tweetTxt
  };
  Twitter.post('statuses/update', tweet, function (err, data, response) {
    if (err) {
      console.log('Error in Replying');
    } else {
      console.log('Gratitude shown successfully');
    }
  });
}
```

Unlike in the previous tutorial, we don't need JavaScripts Timer function this time, since we are using the Streaming API which helps to keep the connection alive.

Here comes the complete code of our bot:

```js
// Use Streams API for interacting with a USER ==========
// set up a user stream

var stream = Twitter.stream('user');

// FOLLOW-Reply BOT ===========================

// when someone follows
stream.on('follow', followed);

// ...trigger the callback
function followed(event) {
  console.log('Follow Event is running');
  //get their twitter handler (screen name)
  var name = event.source.name,
    screenName = event.source.screen_name;
  // function that replies back to the user who followed
  tweetNow('@' + screenName + ' Thank you for the follow up.');
}

// function definition to tweet back to user who followed
function tweetNow(tweetTxt) {
  var tweet = {
    status: tweetTxt
  };
  Twitter.post('statuses/update', tweet, function (err, data, response) {
    if (err) {
      console.log('Error in Replying');
    } else {
      console.log('Gratitude shown successfully');
    }
  });
}
```

## Running the Twitter Bot

To run this bot, go to your terminal:

```shell
node bot.js
```

To avoid this monotonous process, you can use npm scripts or `nodemon`. You can also deploy this app on Heroku for a continuous deployment.

If you are planning to deploy on Heroku, make sure to include a `Procfile` in the root of your directory structure and add the following line to the file:

```shell
worker: node bot.js
```

If you are using npm scripts, make sure you edit the `scripts` attribute in the`package.json` file:

```json
{
  "scripts": {
    "start": "node bot.js"
  }
}
```

Then to run from terminal:

```shell
$ npm start
```

## Next up

To do further smart things with your bot, go and check out the [twit documentation](https://www.npmjs.com/package/twit) for other RESTful API methods and Streaming API events.

If you are interested in Twitter Bots, check [Botwiki.org](https://botwiki.org/bots/twitterbots/) - as they have the vast collection of Twitter Bots in different programming languages.

The sole purpose of Bot as a web application is automation. For example, when I created my first Twitter Bot [@nodejstweets](https://twitter.com/nodejstweet), the whole idea was to remain up to date with the most recent happenings.

You can do a lot of things with a Twitter Bot, whether for your own sole purpose or to solve a purpose for a community. See [@100DaysOfCode](http://twitter.com/@_100DaysOfCode) as a great example.

[Originally Published at RisingStack.com](https://community.risingstack.com/how-to-make-a-twitter-bot-with-node-js/)

---
title: 'How to Create a Chatbot with Dialogflow, NodeJS, and Webhooks'
date: '2019-07-19'
slug: 'build-chatbot-dialogflow-nodejs-webhooks'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://crowdbotics.ghost.io/build-chatbot-dialogflow-nodejs-webhooks/'
---

![cover_image](https://i.imgur.com/cOAePoA.jpg)

> [Originally published at Crowdbotics](https://crowdbotics.ghost.io/build-chatbot-dialogflow-nodejs-webhooks/)

Chatbots are the hottest things in the modern digital world. Every day, organizations and individuals are powering their digital products such as websites or messenger apps to provide conversational experiences for their users. Each conversational experience depends on the implementation of the chatbot to either be a good or poor experience for the user. The modern day world is living in the technology wave of Artificial Intelligence, and chatbots are a massive part of it.

In this tutorial, you are going to be introduced to an easy to use tool for such uses cases known as [Dialogflow](https://dialogflow.com/). Formerly known as API.AI, it can be customized to provide information such as weather in your user's city or information about a movie they like to see. This customization, however, can only be applied using a third party API that is consistent in delivering results for the specific search term.

By providing a step by step on setting up and running the chatbot and how to use a third party API with Dialogflow. You are going to create a custom webhook using Nodejs, deploy it as a service, and then use it with your Dialogflow setups to develop agents and intents. _What are webhooks, you ask?_

A Webhook is a simple HTTP callback that gets triggered based on some event. These events are defined by the user, for example, publishing a comment to blog post, or publishing a new tweet on your Twitter app.

You are going to build a movie chatbot that provides information about a movie using [The Open Movie Database API](http://www.omdbapi.com). The webhooks will be used to fetch the details of a film.

**Table of Contents**

- Requirements
- Create a Node Server
- Fetching the Movie
- Deploy the Webhook on Heroku
- Setup Dialogflow
- Create Training Phrases
- Enable the Webhook
- Conclusion

## Requirements

To follow this tutorial, you need the following:

- Nodejs v8.x.x or higher installed along with npm/yarn as the package manager
- Github Account
- Crowdbotics App builder Platform account (preferably log in with your valid Github ID)
- Dialogflow account (_you can use your Google ID_)
- [OMDb API API Key](https://developers.themoviedb.org/3/getting-started/introduction): make sure when you register the account, you request for an API key. It is very to get one, register an account.
- Heroku or some similar service to deploy the webhook

## Create a Node Server

The following steps have to perform inside the project directory you have set up to create the Nodejs server. Once you are inside the server folder, make sure you run the following commands sequentially using a terminal window. The first command will initialize the server directory as a node server and generate a package.json file. The second command will let you install all the required dependencies.

```shell
# to initialize
npm init --yes

# to install dependencies
npm install -save express dotenv
```

Once all the dependencies are installed, let us bootstrap a small server and see if everything is working or not. Create a new file `index.js` and add the following snippet to it.

```js
const express = require('express');
// will use this later to send requests
const http = require('http');
// import env variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Server is working.');
});

app.listen(port, () => {
  console.log(`🌏 Server is running at http://localhost:${port}`);
});
```

The above server is simple as it can be with only one `/` home route for now. This route is created now only to test whether the server being bootstrapped in this section is going to work or not. Sometimes small errors are time wasters, so it is better to check out. The module `dotenv` enable the file to read environment variables and their values from the file `.env`. Here is how the `.env` the file looks like.

```shell
API_KEY=XXXX
```

The Xs are going to be the value of the API key that you have got from registering an account at OMDB API. Replace the value of these Xs with that key. Now, go to the terminal window and execute the command `node index.js`. This will prompt with the message you have defined in the above snippet. Visit the URL `http://localhost:3000` from the browser window, and you will get the following result.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss3-1.png' />

## Fetching the Movie

In this section, you are going to create a route called `/getmovie`. It is going to be a post request. This request is going to search for the movie specified on the user's input. If that movie exists, it will return the user with the details of the movie such as the name itself, the year it was released, a summarised plot, and so on.

Open `index.js` file and the following after you have defined middleware functions.

```js
app.post('/getmovie', (req, res) => {
  const movieToSearch =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.movie
      ? req.body.result.parameters.movie
      : '';

  const reqUrl = encodeURI(
    `http://www.omdbapi.com/?t=${movieToSearch}&apikey=${process.env.API_KEY}`
  );
  http.get(
    reqUrl,
    responseFromAPI => {
      let completeResponse = '';
      responseFromAPI.on('data', chunk => {
        completeResponse += chunk;
      });
      responseFromAPI.on('end', () => {
        const movie = JSON.parse(completeResponse);

        let dataToSend = movieToSearch;
        dataToSend = `${movie.Title} was released 
        in the year ${movie.Year}. It is directed 
        by ${movie.Director} and stars ${movie.Actors}.\n Here some glimpse of the plot: $
        {movie.Plot}.
                }`;

        return res.json({
          fulfillmentText: dataToSend,
          source: 'getmovie'
        });
      });
    },
    error => {
      return res.json({
        fulfillmentText: 'Could not get results at this time',
        source: 'getmovie'
      });
    }
  );
});
```

The `http` module is from Nodejs core. It is going to send the request which is the variable `reqUrl` and a callback function `responseFromAPI`. This function is going to trigger two events: `data` and `end`. The event `data` is going to return the information about the movie from API in chunks.

The `completeResponse` holds the data is parsed into JSON when the response from the API is ended. The customized response that is being returned in the above route's snippet should contain the field `fulfillmentText` and `error` response for cases that might now work at all.

On a side note, here is how an object for a specific movie data in JSON looks like from the OMDB API.

```json
{
  "Title": "Flashbacks of a Fool",
  "Year": "2008",
  "Rated": "R",
  "Released": "17 Oct 2008",
  "Runtime": "109 min",
  "Genre": "Drama",
  "Director": "Baillie Walsh",
  "Writer": "Baillie Walsh",
  "Actors": "Emile Robert, Scoutt Lowe, Daniel Craig, Julie Ordon",
  "Plot": "A fading Hollywood star looks back at
  the days of his youth as he returns home from his
  best friend's funeral.",
  "Language": "English",
  "Country": "UK",
  "Awards": "N/A",
  "Poster": "https://m.media-amazon.com/images/M/
  MV5BMTIzMDk0MDc3OV5BMl5BanBnXkFtZTcwODMwODY5MQ@@.
  _V1_SX300.jpg",
  "Ratings": [
    { "Source": "Internet Movie Database", "Value": "6.8/10" },
    { "Source": "Rotten Tomatoes", "Value": "38%" }
  ],
  "Metascore": "N/A",
  "imdbRating": "6.8",
  "imdbVotes": "11,348",
  "imdbID": "tt1037218",
  "Type": "movie",
  "DVD": "22 Sep 2008",
  "BoxOffice": "N/A",
  "Production": "Anchor Bay Entertainment",
  "Website": "http://www.thefilmfactory.co.uk/flashbacks/",
  "Response": "True"
}
```

From this considerable object, you are only using some amount of information described in the previous snippet. To test that the result is being fetched from the OMDB API, start the server by going to the terminal window. Execute command `node index.js`.

Open your favorite rest clients such as Postman or Insomnia. Enter the URL `http://localhost:3000/getmovie` and even though it is POST request, and you will have to enter the `parameters` as shown below. Let us test out if the API is returning the details of the movie name entered or not. In the below image, you can verify that the information related to the data is being replaced.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/SS4.png' />

## Deploy the Webhook on Heroku

Since the route `/getmovie` is working, it is time to deploy the webhook you successfully build in the previous step. [Login](https://id.heroku.com/login) to your Heroku account or if you do not have one, create an account. You can upload up to five web applications that can run for free to some number of hours (_called as dynos_).

Before you proceed with any of the steps below, in the `package.json` file, make sure the `start` script exists as specified below.

```json
"scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
}
```

Once you log in, you will be welcomed by the screen known as Dashboard. Create on the button **New** on the top right corner and then create choose **Create new app**.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss5-1.png' />

Fill in the name of the application. Once you have entered the details, click the button **Create app**.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss6-1.png' />

Now, you will be welcomed by the following page that has instructions to deploy your current Node app. If you are using Github, go ahead and choose the **Connect to Github** deployment method. I am going to use [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss7-1.png' />

To proceed with the following set of instructions, also as mentioned in the above screen under the section **Deploy using Heroku Git**. What this means is that the instance of your complete Node application is going to be deployed from the local development environment where the application is currently located. Once you have installed the Heroku CLI, enter the following command to proceed. Also, if you are using the Crowdbotics platform to generate the current demo app or have initialized the directory, you are working using the command `git init`, ignore the section **Clone the repository** in the above image.

```shell
# login
heroku login

# to deploy
$ git add .
$ git commit -am "deploy"
$ git push heroku master
```

The only thing to notice here is that you are not going to `git push` to the `origin` but `heroku`. Once the deployment is done, you will get a message like below in the terminal window.

```shell
remote:        https://getmoviehook.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/getmoviehook.git
 * [new branch]      master -> master
```

You will get the URL `https://getmoviehook.herokuapp.com/` from the above deployment procedure. To test it out, you cannot merely send a GET request by visiting the URL `https://getmoviehook.herokuapp.com/getmovie` from a browser window. You can again use a REST client like Postman. Just replace the `localhost` URL with deployed one that is previously mentioned.

You will get successful results.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss8-1.png' />

## Setup Dialogflow

Dialogflow is a Natural Language Processing (NLP) service from Google. It has many integrations, SDKs for programming languages and some prebuilt agents. It works very straightforward with Google Assistant. Visit the [Dialogflow website](https://dialogflow.com/) and create a new account or log-in with your existing Google ID.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss9-2.png' />

Once you are logged in, you will be welcomed by a screen that consists of different **Agents**.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss10.png' />

Click on the Create Agent button to make one for yourself. Name it something similar to `OMDBbot`. Fill in the details like below.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss11.png' />

After filling out the details, click on the button **Create**.

Generally, for small applications, you will have one agent. In Dialogflow, the basic flow of conversation involves these steps:

- The user giving input in the form of a query
- Your Dialogflow agent parses the input from the training phrases
- Your agent returns a response back to the user

These agents understand the varied nuances of human language. They can translate that to standard and structured meaning that chatbot applications and services can understand. Each agent contains different **intents**. The intent is the action taken based on the user's input. It can be the response sent back to the user in a chatbot application. It can contain different types of responses or actions. The next step in the process is to create your first intent.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss12.png' />

Click on the button **Create intent** and fill in the name `getmovie`. You can name your intent anything.

Intent can be a simple text response that is displayed back to the user or a set of trained phrases. There are also actions and parameters that extract information from user queries. Examples of this kind of information include dates, times, names, places, and more.

## Create Training Phrases

Let us create new training phrases in this section. To create a new phrase, go to the section **Training phrases** and a unique user expression as shows below.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss13.png' />

For the movie chatbot, each user expression is going to contain the name of the movie. The Dialogflow agent is not smart enough to extract the name of the movie out of the user's expression. You have to provide an entity that can highlight the name of the movie every time a new training phrase is introduced to the bot.

From the sidebar menu, go to the entity section and click on the button **Create Entity**. Fill in the name of your entity as `movie` because this is what is being passed inside the webhook's request body. From the server, remember the following line:

```js
req.body.queryResult.parameters.movie;
```

Once you have saved your entity, go back to the intent.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss14.png' />

## Enable the Webhook

To test out that everything is working, let us use the default response provided by the Dialogflow intent. As shown below, on the right-hand side of the screen, you can test out by entering a user expression. The movie chatbot will return the default response.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss15.png' />

This is okay and verifies that the intent has been created successfully. Now, to use the real-time data from the OMDB API, you are going to enable the webhook. From the sidebar menu, go to the **Fulfillment** section. You will be welcomed by the following screen.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss16.png' />

Enable the **Webhook** and then enter the **URL** of the deployed endpoint.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss17.png' />

Once that is done, go back to the **Intents** section, and scroll down to the bottom of the web page. There is a **Fulfillment** section. Toggle the button to **Enable webhook call for this intent**.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss18.png' />

Once that is done, go to the right side of the screen to test it out. Fill in the user expression similar to a training phrase you have provided earlier. The agent will get a response back with the details of the movie.

<img src='https://crowdbotics.ghost.io/content/images/2019/07/ss19.png' />

## Conclusion

You have successfully created, deployed, and tested a Nodejs Webhook for Dialogflow chatbot application. By the end of this tutorial, we are sure you have learned how easy it is to create a new chatbot agent using Dialogflow. The possibilities of using a powerful API such as Dialogflow are endless. In no time, you can build up your own chatbot interface for front-end clients using Reactjs, Angular, and even mobile cross-platform framework like React Native. We hope this tutorial provided you an easy walkthrough to grab the concepts and build something of your own.

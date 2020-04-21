---
date: 2019-07-02
title: 'Visualize Google Analytics Data In A Node.js App'
template: post
thumbnail: '../thumbnails/node.png'
slug: how-to-visualize-google-analytics-data-in-a-nodejs-app
categories:
  - Nodejs
tags:
  - nodejs
---

![cover_image](https://blog.crowdbotics.com/content/images/2019/07/crowdbotics-google-analytics.jpg)

Google Analytics is the go-to means to analyze and report incoming user traffic on a website. It has a dashboard that you can utilize to find all the reports and data. But what if you want to display some of that data on your website? It is an open world, and people all over the world love stats. I love sharing stats of my monthly views/subscribers of my mailing list too. That is what you are going to do learn in this article.

In the following tutorial, you are going to learn how to enable Google Analytics API and the use of data coming from that API in a Nodejs application. To keep things simple and usable, I am going to walk you through step by step. Another thing to notice before you proceed, you can hook your authentication library or logic if you want to.

## Table of Contents

## Requirements

- Nodejs `v8.x.x` or higher installed along with npm/yarn as the package manager
- Google ID to enable Analytics API and user consent with OAuth

## Getting Started with an Express app

Let us begin by setting up the server. Install the following dependencies that will help you create a server using the Express framework. Also, do not forget to initialize your empty project with `package.json` file first.

```shell
# initialize project
npm init --yes

# install dependencies
npm install --save express moment connect-ensure-login cookie-parser dotenv express-session googleapis
```

After installing those dependencies create a new file called `index.js` and add the following snippet of code to kickstart a demo server to verify if everything is working.

```js
const express = require('express');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

Create a new directory called `views` and make sure this directory is located at the root of your Node project. Inside this directory, create a new file called `index.html`. This file is going to be the home page of the application. For now, add some boilerplate code to it.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Google Analytics Data Visualization</title>
    <meta name="description" content="Google Analytics Data Visualization" />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      header {
        text-align: center;
      }
    </style>
  </head>

  <body>
    <header>
      <h1>Google Analytics Data Visualization with a Nodejs Server</h1>
    </header>
  </body>
</html>
```

Now go the terminal window, run the command `node index.js`. This will trigger the server. After this, if you do not get any errors, visit the URL `http://localhost:3000` and you will get the following result.

![ss1](https://blog.crowdbotics.com/content/images/2019/06/ss1-3.png)

## Getting Google Analytics Credentials

To enable server-to-server interactions with any Google API, the preferred method is to a Service Account. The [Google Cloud Platform API console](https://console.cloud.google.com/) is the directory where you can manage all of the APIs provided by Google.

To enable one, you will need to set up a way to authenticate the Google Analytics for the user to use with this application interface we are building. To get started, create a new project on the Google API console. Make sure you are logged in with your Google ID to proceed with the following steps successfully. Visit [console.developers.google.com](https://console.developers.google.com/). Click on the **Select a project** drop-down menu.

![ss2](https://blog.crowdbotics.com/content/images/2019/06/ss2-3.png)

Next step will open a screen that will ask you for the name of the project or if you want to associate this project to a specific organization. For the project, choose something you can identify later on, like `analytics-nodejs`. Then click on the button **Create**.

![ss3](https://blog.crowdbotics.com/content/images/2019/06/ss3-3.png)

After the project gets created, you are now required to enable the API key for Google Drive API. On the **Dashboard** screen as shown below, click on the button **Enable APIS and Services**.

![ss4](https://blog.crowdbotics.com/content/images/2019/06/ss4-2.png)

You need to enable two APIs, **Google Analytics Reporting API** and **Google Analytics API** as shown below.

![ss5](https://blog.crowdbotics.com/content/images/2019/06/ss5-2.png)

Select each of them and once you are redirected towards the API's dedicated page, click on the button **Enable**.

After enabling both of them, you have to set up a way to create and store authentication credentials in the Node app. There are three ways to authenticate with Google APIs:

- OAuth 2
- Service to Service
- API key

You are going to use OAuth 2 method in this demo. To create credentials, click the menu button on the left sidebar with the same name. The following screen will welcome you.

![ss6](https://blog.crowdbotics.com/content/images/2019/06/ss6-1.png)

Click on the button **Create Credentials** and select the second option from the drop-down menu that just popped up, called **OAuth client ID**. This option will allow the application to access a user's data with their permission.

![ss7](https://blog.crowdbotics.com/content/images/2019/06/ss7-1.png)

Next, it will prompt you to configure the consent screen. Click on the button, as shown below.

![ss8](https://blog.crowdbotics.com/content/images/2019/06/ss8-1.png)

It will redirect you to the following screen. Fill up the **Application name** in the form as shown below and click on the **Save** button.

![ss9](https://blog.crowdbotics.com/content/images/2019/06/ss9.png)

It will redirect you to the following screen. The process to get OAuth credentials now starts. Select the **Application Type** to **Web application**. Then let the name be the suggested default. Under the section, **Authorized redirect URIs**, enter.

![ss10](https://blog.crowdbotics.com/content/images/2019/06/ss10-1.png)

After that, click the button **Create** and you will get a pop up giving the Client ID and Client Secret. To save them, create a new file at the root the Node project and name it `.env`. This file is going to keep this sensitive piece of information. I do suggest, do not commit this file if you are going to save this project on Github.

```env
CLIENT_ID=XXXX
CLIENT_SECRET=XXXX
PORT=3000

# replace the Xs with your credentials and values
```

Replace the Xs with the real values that you get from the screen, as shown below.

![ss11](https://blog.crowdbotics.com/content/images/2019/06/ss11-1.png)

That's it for creating getting credentials for utilizing Google Analytics API services.

## Setting up the Server

To set up the Node server, you have already made a small working skeleton app. Import the dependencies that are required to make OAuth work. In the below snippet, after importing the dependencies you installed earlier, you are also going to set up some middleware functions.

```js
const express = require('express');
const moment = require('moment');
const google = require('googleapis');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const googleAccounts = google.analytics('v3');
const googleAnalytics = google.analyticsreporting('v4');
let viewSelected;

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = 'http://localhost:3000/login/google/return';
const oauth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  callbackURL
);
const url = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: 'https://www.googleapis.com/auth/analytics.readonly'
});

app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: 'as!883@bnr$',
    resave: true,
    saveUninitialized: true
  })
);

// ... rest of the code remains the same
```

The cookies and session are being used to save the user authentication data. To access the analytics and Google's OAuth user consent, you are going to use the npm dependency called `googleapis`. It is the official library that Google offers to work with their API. The `clientID` and the `clientSecret` are the same values that you obtained in the previous step. Using `dotenv` module, they can be imported as environment variables. The callback URL is what the API response is going to redirect on success.

The variable `oauth2Client` in the preceding snippet takes all three OAuth values required to get the user's consent. The most important thing here to notice is `scope` and the value inside `oauth2Client.generateAuthUrl` method.

The scope determines how you want to access the Google Analytics API. This API has several scopes such as the one you have defined in the above snippet, and the few more like the following:

- `https://www.googleapis.com/auth/analytics` is used to view and manage data
- `https://www.googleapis.com/auth/analytics.edit` is used to edit entities

The `scope` you are accessing is only to view the data; hence, the suffix `readonly`. You can always pick the scope that suits your application's use case.

## Define Routes

To make this application work, it needs to have an interface. You are going to use static HTML files to keep things simple. Define the following routes in the same `index.js` file. You have already defined the index route to serve the home page of the application using the existing view file `index.html`. The next routes are defined in the following snippet are related to authenticating a user and handing redirect URL.

```js
app.get('/auth/google', (req, res) => {
  res.redirect(url);
});

app.get('/login/google/return', (req, res) => {
  oauth2Client.getToken(req.query.code, (err, tokens) => {
    viewSelected = '';
    if (!err) {
      oauth2Client.setCredentials({
        access_token: tokens.access_token
      });
      res.redirect('/setcookie');
    } else {
      console.log('Error: ' + err);
    }
  });
});

app.get('/setcookie', (req, res) => {
  res.cookie('google-auth', new Date());
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  if (req.cookies['google-auth']) {
    res.sendFile(__dirname + '/views/success.html');
  } else {
    res.redirect('/');
  }
});

app.get('/clear', (req, res) => {
  viewSelected = '';
  res.redirect('/success');
});
```

On success, the cookie will be set the application will take the user to a new route called`/success`. Create a file `views/success.html` with the following code. The `viewSelected` holds the value of the analytics report associated with one of the multiple **Properties and Apps** you might have setup. The `clear` URL will be hit when none of the value is selected from **Properties and Apps**.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Google Analytics Data Visualization</title>
    <meta name="description" content="Google Analytics Data Visualization" />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      header,
      main {
        text-align: center;
      }
    </style>
  </head>

  <body>
    <header>
      <h1>Google Analytics Data Visualization</h1>
    </header>

    <main>
      <p id="deets">
        <select style="display: none"></select>
      </p>
      <p><a href="/clear">Switch view</a> | <a href="/logoff">Log off</a></p>
    </main>

    <script
      src="https://code.jquery.com/jquery-2.2.1.min.js"
      integrity="sha256-gvQgAFzTH6trSrAWoH1iPo9Xc96QxSZ3feW6kem+O00="
      crossorigin="anonymous"
    ></script>
    <script src="/success.js"></script>
  </body>
</html>
```

It is associated with a script called `success.js` that is responsible for displaying charts. For the chart API, Google Charts is the perfect use case for this demo.

```js
$(function () {
  $.get('/getData', function (datum) {
    if (datum == 'An error occurred') {
      $('<span></span>')
        .text('Error: ' + datum)
        .appendTo('p#deets');
    } else if (datum.type == 'views') {
      $('select').css('display', 'block');
      $('select').append('<option value=""> Select a view');
      datum.results.forEach(function (view) {
        $('select').append('<option value="' + view.id + '"> ' + view.name);
      });
    } else {
      $('<div></div>').text('Stats:').appendTo('p#deets');
      $('p#deets').append(
        '<h4>Views</h4><img src="//chart.googleapis.com/chart?chxp=0,0&chxl=0:|A month ago|Now|1:|0|' +
          datum[1] +
          '&chbh=17,1,0&chxt=x,y&cht=bvs&chs=600x125&chco=c0c0c0&chd=t:' +
          datum[0] +
          '&chds=0,' +
          datum[1] +
          '" />'
      );
    }
  });

  $('select').on('change', function (event) {
    var active = $('select').val();
    if (active != 'null') {
      $.get('/getData?' + $.param({ view: active }), function () {
        window.location.reload();
      });
    }
  });
});
```

Next, define the route `/getData` where the business logic behind what happens when the user selected a view or when no view is selected. The selection of view here is one of the multiple **Properties and Apps**.

```js
app.get('/getData', function (req, res) {
  if (req.query.view) {
    viewSelected = req.query.view;
  }
  if (!viewSelected) {
    googleAccounts.management.profiles.list(
      {
        accountId: '~all',
        webPropertyId: '~all',
        auth: oauth2Client
      },
      (err, data) => {
        if (err) {
          console.error('Error: ' + err);
          res.send('An error occurred');
        } else if (data) {
          let views = [];
          data.items.forEach(view => {
            views.push({
              name:
                view.webPropertyId +
                ' - ' +
                view.name +
                ' (' +
                view.websiteUrl +
                ')',
              id: view.id
            });
          });
          res.send({ type: 'views', results: views });
        }
      }
    );
  } else {
    let now = moment().format('YYYY-MM-DD');
    let aMonthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
    let repReq = [
      {
        viewId: viewSelected,
        dateRanges: [
          {
            startDate: aMonthAgo,
            endDate: now
          }
        ],
        metrics: [
          {
            expression: 'ga:hits'
          }
        ],
        dimensions: [
          {
            name: 'ga:day'
          }
        ]
      }
    ];

    googleAnalytics.reports.batchGet(
      {
        headers: {
          'Content-Type': 'application/json'
        },
        auth: oauth2Client,
        resource: {
          reportRequests: repReq
        }
      },
      (err, data) => {
        if (err) {
          console.error('Error: ' + err);
          res.send('An error occurred');
        } else if (data) {
          let views = [];
          let max = 0;
          data.reports[0].data.rows.forEach(view => {
            views.push(view.metrics[0].values[0]);
            if (parseInt(view.metrics[0].values[0]) > parseInt(max))
              max = view.metrics[0].values[0];
          });
          res.send([views, max]);
        }
      }
    );
  }
});

app.get('/logoff', (req, res) => {
  res.clearCookie('google-auth');
  res.redirect('/');
});
```

The last URL `/logoff` is to sign out the user from the application. Lastly, edit the `index.html` file. Add the following segment after the `header`. This will act as a bare minimum button to login with a Google account.

```html
<main>
  <a class="container" href="/auth/google">Log In with Google</a>
</main>
```

## Running the application

Everything is setup now; let us run the application. Go to the terminal window, run the command `node index.js` to start the server, and visit the URL `http://localhost:3000` in the browser window. The following screen will welcome you.

![ss12](https://blog.crowdbotics.com/content/images/2019/06/ss12-1.png)

Click the login button, and it will redirect you to the sign in with a Google ID.

![ss13](https://blog.crowdbotics.com/content/images/2019/06/ss13-1.png)

Enter the login ID and password for the Google ID, and you will be redirected to the following page. First, it will ask for your permission to allow the app to read the data.

![ss14](https://blog.crowdbotics.com/content/images/2019/06/ss14-1.png)

![ss15](https://blog.crowdbotics.com/content/images/2019/06/ss15-Redacted.png)

Next, you will be given a `select` menu like below to select the Analytics app and view its data. The below image demonstrates the content of `success.html` web page.

![ss16](https://blog.crowdbotics.com/content/images/2019/06/ss16-1.png)

If you click on the **Log off** button, it will redirect you back to the home page, also known as the `index` route.

## Conclusion

You have successfully integrated Google Analytics API with a Nodejs server and visualize a specific amount of data. The challenge is now to either modify or elaborate the strategy we disucssed in this tutorial and implement with your own ideas. Maybe use a frontend library like Reactjs.

---

[Originally published at Crowdbotics](https://blog.crowdbotics.com/how-to-visualize-google-analytics-data-in-a-nodejs-app/)

---
date: 2019-06-17
title: 'How To Setup A Stripe Checkout Page From Scratch'
template: post
thumbnail: '../thumbnails/node.png'
slug: how-to-setup-a-stripe-checkout-page-in-a-crowdbotics-app
categories:
  - Nodejs
tags:
  - node
---

[Crowdbotics App Builder](http://app.crowdbotics.com/) platform has a lot to offer when it comes to building an application. It helps both developers and non-developers to build, deploy, and scale applications by providing maintainable templates to make either your web or mobile application. Current web technologies such as Django, Nodejs, React, as well as to build a mobile app, React Native, and Swift templates are all supported as templates.

In this tutorial, you are going to learn how to setup a React and Nodejs template using Crowdbotics platform. Using that template project, we will setup a Stripe Payments Checkout Page from scratch. Make sure you checkout the requirements section before proceeding with the rest of the tutorial.

## Table of Contents

- Requirements
- Setting up a Web with Crowdbotics App Builder Platform
- Enable Test Mode in Stripe
- Setting up the server
- Creating a Stripe Route
- Build a Checkout Component
- Testing the Checkout Component
- Conclusion

## Requirements

To follow this tutorial, you are required to have installed the following on your local machine:

- Nodejs `v8.x.x` or higher installed along with npm/yarn as the package manager
- Postgresql app installed
- [Crowdbotics App builder Platform account](http://app.crowdbotics.com/) (_preferably log in with your valid Github ID_)
- Stripe Developer Account and API key Access

**What are we building?** Here is a short demo.

![ss9](https://blog.crowdbotics.com/content/images/2019/06/ss9.gif)

## Setting up a Web with Crowdbotics App Builder Platform

To setup, a new project on Crowdbotics app builder platform, visit [this link](https://www.crowdbotics.com/app-builder-signup?utm_campaign=blog&utm_content=blog-nav) and create a new account. Once you have an individual account, access the app building platform with those credentials, and the dashboard screen will welcome you like below.

![ss1](https://blog.crowdbotics.com/content/images/2019/06/ss1-1.png)

If this is your first time using Crowdbotics platform, you might not be having any projects as shown above. Click on the button **Create New Application**. You will are going to be directed to the following screen.

![ss2](https://blog.crowdbotics.com/content/images/2019/06/ss2-1.png)

This screen lets you select a template to create an application. For our current requirement, we are going to build a web application that is based on Nodejs and Reactjs. Select the **Nodejs** template in the **Web App**, scroll down the bottom of the page and fill in the name `stripe-checkout-demo` and click on the button **Create App**.

Once the project is setup by the platform, you will be redirected back to the dashboard screen, as shown below. This screen contains all the details related to the new application you are setting up right now.

![ss3](https://blog.crowdbotics.com/content/images/2019/06/ss3-1.png)

The reason I told you earlier to login with your Github account is that you can directly manage Crowdbotics app with your Github account. In the above image, you can see that even in the free tier, there many basic functionalities provided by Crowdbotics. Once the Github project is created, you will be able to either download or clone that Github repository to your local development environment.

![ss4](https://blog.crowdbotics.com/content/images/2019/06/ss4-1.png)

After you have cloned the repository, execute the commands below in the order, they are specified but first, navigate inside the project directory from the terminal window. Also, do not forget to rename the file `.env.example` to `.env` before you run below commands in the project directory.

```shell
# navigate inside the project directory
cd stripe-checkout-demo-4738

# install dependencies
npm install

# open postgresql.app first
# even though we only require the database for user login
# for non-mac users
psql -f failsafe.sql

# for mac users
psql postgres -f failsafe.sql

# to run the application
npm start
```

The Crowdbotics scaffolded Nodejs project uses a custom a webpack server configuration to bootstrap the web app. Visit `http://localhost:5000` from a browser window to see the application in action.

![ss5](https://blog.crowdbotics.com/content/images/2019/06/newss5.png)

Create a new account if you want and login in the app as a user, you will get a success toast alert at the bottom of the screen.

This section completes, how to setup a Nodejs and React app with Crowdbotics.

## Enable Test Mode in Stripe

Before you start with the rest of this tutorial, please make sure you have a Stripe account. Login into the account and go to the dashboard window. From the left sidebar menu, make sure you have enabled the test mode like below.

![ss7](https://blog.crowdbotics.com/content/images/2019/06/ss7.png)

In Stripe, you have access to two modes. Live and test. When in test mode, you will only see payments that were from the test application (_like the app we are going to build in this tutorial_). The developer menu gives you access to API keys that required to create the test application. These two types of API keys are:

- Publishable Key: used on the frontend (_React client side of the application_).
- Secret Key: used on the backend to enable charges (_Nodejs side of the application_).

Also, note that these API key changes when you change modes between live and test.

## Setting up the server

To start building the server application, all we need are the following packages.

- `express`
- `body-parser`
- `cors`
- `stripe`

The first, `express` and `body-parser` are already available with current Crowdbotics generated the project. For more information, what `npm` dependencies this project comes with, go through `package.json` file. We need to install the other two. Make sure you run the following command at the root of your project.

```shell
npm install -S cors stripe
```

At the server side, we are going to create a RESTful API endpoint. The package `stripe` will help us communicate with the Stripe Payment API. The `cors` package in scenarios where your server and front-end are not sharing the same origins.

Inside `server/config` folder create a new file called `stripe.js`. This file will hold the configuration and secret key for the Stripe API. In general terms, this file will help to enable the configuration between the server side part of the application and the Stripe API itself.

```js
const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = 'sk_text_XXXX';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
```

In the above snippet, just replace the `sk_text_XXXX` with your secret key. Lastly, to make the server work to add the following snippet of code by replacing the default middleware function as shown below. Open `app.js` in the root of your project directory.

```js
// ...
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// ...
```

Add this line of code will help to parse the incoming body with an HTTP request. The incoming body will contain the values like token, the amount, and so on. We do not have to get into details here since we are going to take a look at the Stripe dashboard which logs everything for us. But we will do this later after the frontend part is working.

## Creating a Stripe Route

The second missing part in the backend of our application is route configuration for the payments to happen. First, create a new file called `payment.js` inside `routes` folder. Then, add the following snippet of code to it.

```js
const stripe = require('../server/config/stripe');

const stripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const paymentAPI = app => {
  app.get('/', (req, res) => {
    res.send({
      message: 'Stripe Checkout server!',
      timestamp: new Date().toISOString
    });
  });

  app.post('/', (req, res) => {
    stripe.charges.create(req.body, stripeCharge(res));
  });

  return app;
};

module.exports = paymentAPI;
```

In the above snippet, we start by importing stripe instance that is configured with the secret key. Then, define a function that has a callback with one argument `res` called `stripeCharge`. This function is responsible for handling any incoming post request that will come from the client side when the user makes an official payment using Stripe API. The incoming request contains a payload of user's card information, the amount of the payment, and so on. This function further associates to a callback that runs only when the request to charge the user either fails or succeeds.

The post route uses this function with the argument `res`. Next, inside the already existing `index.js` file, import the `paymentAPI` as shown below.

```js
var express = require('express');
var router = express.Router();
var path = require('path');
var VIEWS_DIR = path.resolve(__dirname, '../client/public/views');
// import this
const paymentAPI = require('./payment');

module.exports = function (app) {
  // API Routes
  app.use('/api/user', require(path.resolve(__dirname, './api/v1/user.js')));

  /* GET home page. */
  app.route('/*').get(function (req, res) {
    res.sendFile(path.join(VIEWS_DIR, '/index.html'));
  });

  // after all other routes, add this
  paymentAPI(app);
};
```

The configuration part required to make the backend work is done.

## Build a Checkout Component

In this section, let us build a checkout component that will handle the communication by sending payment requests to the server as well as represent a UI on the client side of the application. Before you proceed, make sure you have installed the following dependencies that will help to build this checkout component. Go the terminal window, and execute the following command.

```shell
npm install -S axios react-stripe-checkout
```

`axios` is a promised based library that helps you make AJAX requests from the browser on the frontend side. This library is going to be used to make the payment request to the backend. `react-stipe-checkout` is a ready-to-use UI component to capture a user's information at the time of the payment. The gathered information here which include user's card number and other details is then sent back to the backend.

Now, create a new component file called `Checkout.jsx` inside the directory `client/app/components/`. Add the following code to that file.

```jsx
import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'XXXX';
const PAYMENT_SERVER_URL = 'http://localhost:5000';

const CURRENCY = 'USD';

const successPayment = data => {
  alert('Payment Successful');
  console.log(data);
};

const errorPayment = data => {
  alert('Payment Error');
  console.log(data);
};

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
```

In the above snippet, we import the required components from different libraries, but the most notable is `StripeCheckout`. This is a UI component that `react-stripe-checkout` consist. It accepts props such as `amount`, `token`, `currency` and most importantly the `stripeKey`. This stripe key is different from the one we used in the server side part of the application. The in the above snippet `STRIPE_PUBLISHABLE` is the publishable key provided by the Stripe Payment API. This type of key used on the client side of an application irrespective of the framework you are using to build one.

You are also required to declare a `PAYMENT_SERVER_URL` on which `axios` will make a post request with different user information on the checkout. The methods `successPayment` and `errorPayment` are for testing purposes to see if things work the way we want them. The `token` prop is an important one. It has its own method `onToken` inside which the payment request is made. It gets triggered in both the cases whether the payment is successful or not. `react-stripe-checkout` library creates this token on every request.

## Testing the Checkout Component

The last piece of the puzzle is to make this whole application work is to import the Checkout component inside `App.jsx` and the following snippet.

```js
// ... after other imports
import Checkout from './Checkout.jsx'

// ...

render() {
    console.log(this.state.isLoading);
    return (
      <div>
        <NavBar {...this.state} />
        <main className="site-content">
          <Checkout name='Crowdbotics' description='Stripe Checkout Example' amount={1000} />
          <div className="wrap container-fluid">
            {this.state.isLoading ? "Loading..." : this.props.children && React.cloneElement(this.props.children, this.state)}
          </div>
        </main>
        <Footer {...this.state} />
        <MainSnackbar {...this.state} />
      </div>
    );
  }
```

Once you have added the snippet and modified the render function as shown, go back to the terminal window and run the command `npm start`. Visit the URL `http://localhost:5000/` from your browser window, and you will notice that there is a new button, as shown below. Notice the `amount` prop. The value of `1000` here represents only `$10.00`. Fun fact, to make a valid stripe payment, you least amount required is more than 50 cents in American dollars.

![ss8](https://blog.crowdbotics.com/content/images/2019/06/ss8.png)

Now, click on the the button **Pay With Card** and enter the following test values.

- Email: any existing email
- Card number: 4242 4242 4242 4242 (_Visa_)
- Date: a future date
- CVC: a random combination of three numbers

On completion, when hit the pay button, there will be an alert message whether the payment was successful or not. See the below demo.

![ss9](https://blog.crowdbotics.com/content/images/2019/06/ss9-1.gif)

If you go to the Stripe Dashboard screen, in the below screen, you can easily notice the amount of activity logged.

![ss10](https://blog.crowdbotics.com/content/images/2019/06/ss10.png)

There are proper logs generated with accurate information coming this web application.

![ss11](https://blog.crowdbotics.com/content/images/2019/06/ss11.png)

![ss12](https://blog.crowdbotics.com/content/images/2019/06/ss12.png)

## Conclusion

This completes the step-by-step guide to integrate Stripe Payment API in a web application built using Reactjs and Nodejs. In this tutorial, even though we used Crowdbotics generated project to focus more on the topic rather than building a complete fullstack application from scratch. You can easily use the code snippets and knowledge gained in your own use cases.

---

[Originally published at Crowdbotics](https://blog.crowdbotics.com/how-to-setup-a-stripe-checkout-page-in-a-crowdbotics-app/)

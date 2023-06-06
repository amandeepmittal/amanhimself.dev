---
title: 'Build a Progressive Web App using React'
slug: 'build-a-progressive-web-app-using-react'
date: '2018-02-01'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://www.zeolearn.com/magazine/an-introduction-to-progressive-web-apps-pwa'
---

> [Originally this article was published on Zeolearn.com](https://www.zeolearn.com/magazine/an-introduction-to-progressive-web-apps-pwa)

![cover_image](https://i.imgur.com/qQAmt3M.jpg)

**Progressive Web App with React!** When I read this I thought, why not build one ourselves. If you are familiar with React and a bit about its ecosystem such as Create-React-App utility, this guide is for you.

If you spend at least third quarter of your day on internet then you have seen or read about progressive web apps here and there. _No?_ PWA are performance focused web applications that are especially streamlined for a mobile device. They can be saved over a device’s home screen and tend to consist a native app feel and look. The first PWA app I used on my mobile device is the Lite Twitter one which got released a few months back. Here is the link if you want to try: [https://lite.twitter.com/](https://lite.twitter.com/). They even support push notifications and offline support these days.

### Getting Started

Let us create a basic React app using _Create-React-App_ generator, the official scaffolding tool to generate _Reactjs_ _App_ released and maintained by _Facebook_. To install it, we will use our command line tool:

```shell
npm install --global create-react-app
```

Once the installation process is complete, go to your desired directory and create an empty project. Run this from your command-line interface:

```shell
create-react-app react-pwa-example

# and cd in that directory
cd react-pwa-example
```

Go ahead and take a look at the directory structure and **package.json** file. See what dependencies come with this scaffolding tool.

CRA or Create React App is one of the best with minimum hassle tool that I am currently using to build apps and prototypes with React. It is running all that Babel, Webpack stuff behind the scenes. If you want more information or want to customize the process, read [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject).

I hope, regardless of the timeline, your package.json file looks like this:

```json
{
  "name": "react-pwa-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-scripts": "1.0.17"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

We need to one more dependency and that is React-Router: Go Back to your terminal:

```shell
npm install --save react-router-dom@4.2.2
```

You can now try running the application from terminal and see if everything is working:

```shell
npm run start
```

The boilerplate code will and look like this:

![](https://i.imgur.com/3vGXI94.png)

### Building the PWA App

Since the sole purpose of this guide is to make you familiar with the build process, I am not going to work out a complex application. For sake of simplicity and your precious time, we will build a simple app. Go to `src/App.js` file and make amendments exactly like below:

```js
import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React App</h2>
        </div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
```

In above we are including two pages using `react-router-dom.`Further we define **Home** and **About** Components in `src/components/` directory. It is always a best practice to use this approach and make sure that react components are short and readable.

For `Home.js`:

```js
import React from 'react';
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <div title="Home">
      <h1>Home Page</h1>
      <p>
        <Link to="/about">About</Link>
      </p>
    </div>
  );
};

export default home;
```

And for `About.js`:

```js
import React from 'react';
import { Link } from 'react-router-dom';

const about = () => {
  return (
    <div title="About">
      <h1>About Page</h1>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default about;
```

Now to see if everything working, run `npm start` from your terminal window, and you will get a similar result:

![](https://i.imgur.com/qdqY2YP.png)

If you click on the **About** button/hyperlink, the `react-router-dom` will render the **about** page without changing the common Header part that is defined in `App.js`. This is a bare minimum single page application.

Our main job is still yet to be done. Let’s convert this bare minimum React application to a PWA.

### Installing Lighthouse

Lighthouse is a free tool from Google that evaluates your app based on their PWA checklist. Add it to your Chrome browser from [here](https://developers.google.com/web/tools/lighthouse/). Once installed as an extension we can start the auditiing process by clicking on the Lighthouse at top right corner where other extension might exist in your browser. Click on the icon and then make sure you are on right tab by checking the URL shown in the lighthouse popup. Also, make sure that development server of Create-react-app from terminal is running. Otherwise Lighthouse won’t be able to generate report. The report that is generated by the Lighthouse is based on a checklist that available to view [here](https://developers.google.com/web/progressive-web-apps/checklist).

![](https://i.imgur.com/c3oDUYx.png)

Click on the Generate Report button. After the process is completed, a new window will open where Lighthouse has generated a report. By the looks of it, it does not look pleasing to the Lighthouse and as a Progressive Web App.

![](https://i.imgur.com/khE0Q5o.png)
![](https://i.imgur.com/8OjdMK4.png)

We will be solving these issues one by one.

### Setting up a Service Worker

Let’s setup a service worker first. That is the first thing Lighthouse audited. What is a service worker, you ask? Well, it is a proxy server that sit between web applications, browsers and the network. We can use it to make React Apps work offline (remember the earlier point we discussed. Progressive Web Apps are focused on performance). You can definitey read details about it on [Google’s Web Fundamental Docs](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=en).

It is a two step process. First we will create a`service-worker.js` file (service worker, after all is JavaScript code) and then register that worker in our `index.html`.

In the `public` directory of our app strucutre, create a file `service-worker.js`. I am going to use Addy Osmani's service worker configuraiton and I will recommend you to do so, at least for this one. You can find the complete thing in much much detail [here](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c). To continue, make sure you add the following code in `service-worker.js` file:

```js
var doCache = false;

var CACHE_NAME = 'my-pwa-cache-v1';

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('install', function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        fetch('manifest.json')
          .then(response => {
            response.json();
          })
          .then(assets => {
            const urlsToCache = ['/', assets['main.js']];
            cache.addAll(urlsToCache);
            console.log('cached');
          });
      })
    );
  }
});

self.addEventListener('fetch', function (event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
```

Our next step is to register the our service worker by loading the one we just wrote in `service-worker.js`. Add this before the closing `</body>` tag in `index.html`.

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(
          function (registration) {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            );
          },
          function (err) {
            console.log('ServiceWorker registration failed: ', err);
          }
        )
        .catch(function (err) {
          console.log(err);
        });
    });
  } else {
    console.log('service worker is not supported');
  }
</script>
```

Make sure you restart the dev server by running `npm run start` from the terminal. You must see this line if you open Chrome's DevTools > Console:

![](https://i.imgur.com/HRVYgGB.png)

If we run the Lighthouse audit process again, I hope we will get a better result.

![](https://i.imgur.com/xaTMUez.png)

Yes, you can clearly compare the above with our previous audit. It has imporved, and our previous first issue is now coming under Passed Audits. Now let’s move and add some enhancement.

### Adding Progressive Enhancement

Progressive Enhancement is way to improve the app/site since it will work without any JavaScript loading. Now, we want to display a loading message and some CSS or none (your choice) before the React app initializes the DOM. Let’s add a the required CSS and a loading message to our `index.html`. To increase performance, I am also adding all our CSS (that is CSS contained inside `App.css` and `index.css`) in our `index.html` file.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  <title>React App</title>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }
    .App {
      text-align: center;
    }
    .App-logo {
      height: 80px;
    }
    .App-header {
      background-color: #222;
      height: 150px;
      padding: 20px;
      color: white;
    }
    .App-title {
      font-size: 1.5em;
    }
    .App-intro {
      font-size: large;
    }
    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  </style>
</head>

<body>
  <div id="root">
    <div class="App">
      <p>
        Loading...
      </p>
    </div>

    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
          }).catch(function (err) {
            console.log(err)
          });
        });
      } else {
        console.log('service worker is not supported');
      }
    </script>

</body>

</html>
```

We can now delete `App.css` and `index.css` file from out project directory and also remove their import references from `App.js` and `index.js`.

The above process improves the performance of our app by 10 points. The overall PWA score is same though:

![](https://i.imgur.com/lHn2hZG.png)

### Adding it to Device’s Home Screen

The creators of create-react-app is so good to us that they have already included a `manifest.json` file in `public` directory with some basic configuration. This feature that we are currently adding allows a user to save our PWA site page on their device's home screen. In future, if the user wish to open the app, they can do that just by using PWA as a normal application and it will open in their phone's default browser.

For this purpose, we are going to edit `public/manifest.json`:

```json
{
  "short_name": "PWA React App",
  "name": "Progressive React App Example",
  "icons": [
    {
      "src": "logo.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "logo-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000",
  "background_color": "#000"
}
```

Let’s talk about this file a bit. The `short_name` is the name of app that will appear on Home Screen of device. `name` will appear on the splash screen. `icons` is important and is the main icon of our app and will appear along the `short_name` on home screen, just like a native mobile application. The size of the icon must be `192x192`. I haven't played around with other image formats but you can. [Here](https://i.imgur.com/RaN7Qey.png) is the link to a dummy logo for this walkthrough we are working on. Add it to the `public` directory. The 512 setting is for splash screen and is a requirement in auditing process. So here is the [link](https://i.imgur.com/TmblrhM.png) to download that.

Next is `start_url` that notifies that the app was started frome Home Screen. Below it there are three more properties. `display` is for the appearance of the app, and I am making `theme_color` and `background_color` to be same since I want the application to match header background.

We will now solve one of our issue in the previous audit. We are left with only some of them to resolve.

![](https://i.imgur.com/zyot782.png)

### Deployment

First, let us turn the caching on. In `service-worker.js` edit the first line and change the existing boolean value to `true`.

```js
var doCache = true;
```

I will be using [Firebase](https://firebase.google.com/) here for deployment since it is easy to connect it with a web/mobile application for prototyping IMO. First, in Firebase console, create a new project `pwa-example-1`. Now, install the firebase-tool we need to deploy our PWA app. We will be installing this dependency as a global module.

Now the CLI tool will prompt for some questions. I am adding a series of images for clarity, make sure you choose the same answers when prompted.

```shell
npm install -g firebase-tools

# then run the following commands
firebase login
firebase init
```

![](https://i.imgur.com/0cg1Dtt.png)
![](https://i.imgur.com/7pg1Di0.png)
![](https://i.imgur.com/7pg1Di0.png)

Press the Enter key for final time and you will get a success message and two firebase config files generated in your project directory: `.firebaserec` and `firebase.json`.

Now, it is time to deploy our app. From terminal run:

```shell
npm run build && firebase deploy
```

The above command tells create-react-app to build our project into the build/ folder, which Firebase CLI tool then deploys. Firebase CLI tool will give you back a URL, save it and open it in Chrome, and then run our Lighthouse audit for the last time. The hosting url will be similar to below:

```shell
Hosting URL: https://pwa-example-1.firebaseapp.com
```

This solves our main issue from starting regarding using HTTTPS over HTTP. With that, all of our issues our solved and our PWA app gets 100/100 score.

![](https://i.imgur.com/VSEWUqI.png)
![](https://i.imgur.com/2GJL7m5.png)

The score looks good to me for our first application. The performance bar above of our application can be improved and there are few ways to that. I will not get into that since the scope of this application is for learning purpose.

You can find the complete code at [this Github repository](https://github.com/amandeepmittal/react-pwa-app). Go ahead to clone the repo, don’t forget to `npm install` once inside the project directory and then head start by trying out aforementioned PWA tips and techniques.

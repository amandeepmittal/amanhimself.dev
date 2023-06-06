---
title: 'How to use React Router and real time user monitoring in React apps'
date: '2020-08-14'
slug: 'react-router-real-time-user-monitoring-react-apps'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://amanhimself.dev/blog/blog/react-router-real-time-user-monitoring-react-apps/'
---

React is often used for building single-page applications (SPAs). SPAs tend to have multiple page views so when navigating from one-page view to another, reloading the entire page view is tedious and inefficient. To work as it should, a SPA must render different parts of a view when required instead of reloading the entire page.

Routing comes into the picture when navigating from one page to another in a SPA app. Routing can be categorized in two ways: static and dynamic. SPAs follow a dynamic approach. In this tutorial, we will discuss a popular routing library used with React applications known as [React Router](https://reacttraining.com/react-router/web/guides/quick-start). After setting up our routes, we are also going to discuss how to set up performance monitoring with [Sematext](https://sematext.com/) in React apps with React Router library.

## Prerequisites

Before you begin this tutorial, you’re going to need the following:

- [Node.js](https://nodejs.org/) version above 12.x.x installed on your local machine
- Access to a package manager such as npm or yarn or npx
- Basic JavaScript and ES6 knowledge
- Basic knowledge of Reactjs
- Access [Sematext](https://sematext.com/) account (_trial version also acceptable_)

## Getting started

Start by creating a new React project. Run the following command using [npx](https://www.npmjs.com/package/npx). Once the project is generated, navigate inside the newly created directory and install the `react-router-dom` library.

```shell
npx create-react-app react-router-demo

# navigate inside the directory
cd react-router-demo

# install react-router-dom
yarn add react-router-dom
```

React Router library (as per version 5) contains three different npm packages.

- react-router
- react-router-dom
- react-router-native

Each of the packages has a different use case. The first one, `react-router` is the core package and is used with the next two packages listed above. The `react-router-dom` is used when building a web application. This is what we are going to use in this tutorial. The last one `react-router-native` is used in apps using [React Native](https://amanhimself.dev/getting-started-with-react-native-in-2019-build-your-first-app/).

To see the React app generated, currently in action, make sure you are inside the root directory of the React project before you run the following command.

```shell
yarn run start
```

This is going to open the boilerplate React app screen at the URL `http://localhost:3000/` in a browser window.

![ss1](https://i.imgur.com/HtBY0g4.png)

### Create the first route with React Router

To create the first route in the React app, import the `Router` and `Route` from the `react-router-dom` library. Open `src/App.js` file and add the following import statement.

```js
import React from 'react';
import { Router, Route } from 'react-router-dom';
```

Let's also add a `history` object to use with navigation. Unlike `BrowserRouter`, the `Router` component is a low-level interface for all router components. This means that you have to manually pass the `history` object to make it work. Later, this `history` object is going to be used for the monitoring tool. Import `createBrowserHistory` as following:

```js
import { createBrowserHistory as createHistory } from 'history';

const history = createHistory();
```

A `Route` is required to create an actual route. It is where the logic of routing is placed. It renders the UI of a component. It has a prop called `path` that is always matched with the current location of the app. Based on this prop, the desired component gets rendered. When the component is not getting rendered, `Route` returns null. The `component` name is also passed as a prop. All `Routes` are wrapped inside the `Router` component.

```js
function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}
```

The path is currently pointing towards the Home component which has the following UI logic. Create a `Home` component inside `src/components/Home.js` file.

```js
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1> Home Page</h1>
    </div>
  );
}
```

Now, import this component inside the `App.js` file.

```js
import Home from './components/Home';
```

Visit the web browser and see the Home component being rendered right now.

![ss2](https://i.imgur.com/Q2IwXJ7.png)

This is a bare minimum example. Now let us add another route with the same props as the Home. Call this route About with a similar rendering logic as Home.

## Adding the second route

Start by adding another component file inside `src/components` and name it `About.js`. Add the following code snippet to it.

```js
import React from 'react';

export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
```

Now add this function component as the second route, below the `Home` route in `App.js` file. Make sure to import it.

```js
// After other import statements
import About from './components/About';

// Add another route
function App() {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}
```

Visit the URL `http://localhost:3000/about`. You will notice that both the components are being rendered right now on the path /about.

![ss3](https://i.imgur.com/krpy60b.png)

The reason for this is that the regular expression engine that React Router uses internally considers both the routes that are being started with a forward slash `/` equal. To solve this issue, we can use another essential prop on the Home route called `exact`.

```js
<Route path="/" exact component={Home} />
```

This `exact` prop is also known as a qualifier which states that the path must match exactly the `/` and nothing after it, such as `/about`. Now, if you visit the browser window at the URL `http://localhost:3000/about` you will notice that only the about component is getting rendered this time.

![ss4](https://i.imgur.com/rTVSwFM.png)

## Wrapping routes with Switch

The `Switch` component is a unique one since it renders the component at the `path` of the `Route` exclusively. It renders a default component once the app initially renders by matching the first child `Route`. It allows switching between different routes when a path is matched. It is helpful if you are using the `Redirect` component with the `Route` component. Even though in this current demo, we are not going to have any redirects, let's wrap all our routes inside a `Switch`. Modify the `App.js` file as follows:

```js
// import the Switch component
import { Router, Route, Switch } from 'react-router-dom';

// App component
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}
```

### Adding a navbar

To navigate between to web pages in HTML, there is an `<a href=""></a>` anchor tag available. However, using this traditional approach will lead to a browser refresh. To overcome this, React Router API offers a `NavLink` component that can be used to navigate to a particular URL or a component.

Let us try to create a navigation menu with this new knowledge. Import `NavLink` from `react-router-dom` in App.js file. Here is the modified snippet of App component.

```js
import { Router, Route, Switch, NavLink } from 'react-router-dom';

function App() {
  return (
    <Router history={history}>
      <nav style={{ margin: 10 }}>
        <NavLink exact to="/" style={{ padding: 10 }}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ padding: 10 }}>
          About
        </NavLink>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}
```

In the above snippet, notice that all the links are being added before all the `Route` components. The styling attributes inside `style` are optional for now. Go to the browser window, you are going to notice a navigation menu pops up at the top. Try clicking links to navigate between different components.

![ss5](https://i.imgur.com/P0xZkiI.gif)

## Adding Parameters to the Routes

In this section, you will learn how to create and manage dynamic routes based on a query parameter such as `:id`. We start by creating a static array that will serve as the mock data.

The idea is to demonstrate a route as `/posts` which displays all the posts that are coming from the array. However, each post in the array will be having an `id` or a unique identifier. Using that unique identifier, you will be approaching the concept of dynamic content rendering by writing the logic for URLs such as `/posts/:id` where `:id` will be represented by the specific id of a post.

To start, let us add a bunch of mock posts in the state inside a new component file called `components/Posts.js`. Import the following statements.

```js
import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
```

A `Link` component is similar to `NavLink` with the difference being that it can be used for other purposes rather than a navigation menu where an `anchor` tag is required.

Next, declare a static array of different posts.

```js
const POSTS = [
  {
    id: 1,
    title: 'Hello Blog World!'
  },
  {
    id: 2,
    title: 'My second post'
  },
  {
    id: 3,
    title: 'What is React Router?'
  }
];
```

Next, define a function component called `Child`. It reads anything coming from the URL parameters, such as, in this case, the `id` of each post. This component is going to accept one prop called `match` object. This object contains information about how a `<Route path>` matched the URL. It has four different props, but the prop you are going to use is an object called `params` to read the `id` of the post. A `params` object contains key/value pairs that are parsed from the URL corresponding to the dynamic segments of the `path`.

```js
function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}
```

Then, define the `Posts` function component. It is going to have a state variable called `posts` that are going to have a default value of the mock array `POSTS`. Using the JavaScript's `map` function is going to render the list of Posts and display them as a list whenever the current location in the web browser matches `/posts`. The `Child` component is going to be the value of displaying the content (`id` in this case) of each post.

```js
export default function Posts() {
  const [posts, setPosts] = useState(POSTS);

  return (
    <div className="posts">
      <h1>Posts List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Route path="/posts/:id" component={Child} />
    </div>
  );
}
```

Now, import the newly created component inside `App.js` where other routes already exist.

```js
import Posts from './components/Posts';

function App() {
  return (
    <Router history={history}>
      <nav style={{ margin: 10 }}>
        <NavLink exact to="/" style={{ padding: 10 }}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ padding: 10 }}>
          About
        </NavLink>
        <NavLink to="/posts" style={{ padding: 10 }}>
          Posts
        </NavLink>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/posts" component={Posts} />
      </Switch>
    </Router>
  );
}
```

Now, visit the URL `http://localhost:3000/posts` and you are going to see the list of posts.

![ss6](https://i.imgur.com/79STiT7.png)

Clicking one of the posts is going to show the contents of that post.

![ss7](https://i.imgur.com/LmscMwA.png)

![ss8](https://i.imgur.com/a6np7at.png)

## Real user monitoring tool with Sematext

Configuring a monitoring tool can be a good asset for your React application. It is helpful to determine a user's experience in terms of performance. If you're web app is not loading as expected, when in production, you can lose a lot of users and potential customers.

A monitoring tool like Sematext Real user monitoring tool provides a way to test out performance-related issues regarding the user experience in your web app. It allows you to track page loading time, HTTP requests, UI interactions, application crashes, and so on.

This tool can be a critical part of understanding how a user behaves when using your web app. The features provided by their tool are hard to implement otherwise.

This tool can be a critical part of understanding how a user behaves when using your web app. The features provided by their tool are hard to implement otherwise.

## Configure a Sematext monitoring app

To follow further, you do require a [Sematext account](https://sematext.com/experience/) and do note that they have a 30 day trial period that you can leverage. If you are planning to use this in production, you can also leverage their pricing plan that is defined per app.

![ss9](https://i.imgur.com/y8Nekfj.png)

Once you are logged in to your account, you are going to be welcomed by a dashboard screen that might look similar to below.

![ss10](https://i.imgur.com/tuLIO58.png)

To start configuring Sematext Experience in the current demo React app, click on the `New App` button in the top right corner and then select `Experience`.

![ss11](https://i.imgur.com/A40CG1G.png)

Then, enter the name of the app in the modal screen as well as make sure to check the `About Website` option since the current React app is trying to simulate a SPA behavior. Click the button `Continue`.

![ss12](https://i.imgur.com/sRIIczJ.png)

## Installing monitoring scripts in React app

In the Sematext dashboard, you will be redirected to a page where there are steps to install the Experience tool. It contains some installation scripts that are necessary to add. These scripts are the integration point between the monitoring tool and your React app.

Go back to the React app and open the `public/index.html` file. Paste the first installation script as similar to one below, inside the `head` tag of the HTML file. The installation script contains the unique token provided by SemaText.

```html
<script type="text/javascript">
  (function (e, r, n, t, s) {
    var a = [];
    e[s] = function () {
      a.push(arguments);
    };
    e[s].queue = a;
    var o = [];
    var i = [];
    var c = true;
    var p = void 0;
    if (
      window.PerformanceObserver &&
      window.PerformanceObserver.supportedEntryTypes &&
      (PerformanceObserver.supportedEntryTypes.indexOf('longtask') >= 0 ||
        PerformanceObserver.supportedEntryTypes.indexOf('element') >= 0)
    ) {
      p = new PerformanceObserver(function (e) {
        e.getEntries().forEach(function (e) {
          switch (e.entryType) {
            case 'element':
              i.push(e);
              break;
            case 'longtask':
              o.push(e);
              break;
            default:
              break;
          }
        });
      });
      p.observe({ entryTypes: ['longtask', 'element'] });
    }
    e[s + 'lt'] = {
      longTasks: o,
      timingElements: i,
      inPageLoad: c,
      observer: p
    };
    if (t) {
      var u = r.createElement(n);
      u.async = 1;
      u.src = t;
      var f = r.getElementsByTagName(n)[0];
      f.parentNode.insertBefore(u, f);
    }
  })(window, document, 'script', '//cdn.sematext.com/rum.js', 'strum');
</script>
<script type="text/javascript">
  strum('config', {
    token: 'e3451b53-a95f-45c6-ba8e-1368cb4f2407',
    receiverUrl: 'https://rum-receiver.sematext.com'
  });
</script>
```

Follow this by the second step where you have to add an event listener called `routeChange` at the top component in your React app or where the navigation configuration is written.

Open the file `src/App.js` and paste the following after you have defined the `history` object.

```js
history.listen((location, action) => {
  if (action !== 'REPLACE') {
    window.strum('routeChange', window.location.href);
  }
});
```

This event listener is responsible for tracking whenever a route changes. It is essential, as discussed previously, the nature of a Single Page Application is to change the routes dynamically.

That's it. These are the only two steps required to configure and add the Sematext Real-time User Monitoring tool in your React app.

### Testing out the Real-time User Monitoring tool

After integrating the installation scripts, the next step is to build the React app by running the command from a terminal window:

```shell
yarn run build
```

Once this command runs successfully, you can serve it by using the command below:

```shell
npx serve -s build
```

This command serves all the files in the `build` folder as a single page application to simulate the hosted version experience. It is going to give you an URL that you can paste in a browser window.

Once the React app is built and served, you can test it out by playing around with the different routes. It might take a moment, but the Sematext monitoring tool is fast at detecting the user interactions in the React app.

The overview of the dashboard screen as shown below tells as the initial page loading time is excellent.

![ss13](https://i.imgur.com/n7rIiE2.png)

It also goes in detail by determining the exact page load time.

![ss14](https://i.imgur.com/cugGBau.png)

To check out the number of resources that are downloading for a particular URL, navigate to the `Resources` tab from the sidebar.

![ss15](https://i.imgur.com/tnetw9K.png)

From the `Users` tab in the sidebar menu, you can monitor the user data such as the number of active users on the web app at a given time, the top browser being used, the maximum number of users located in which country and so on.

![ss16](https://i.imgur.com/BPimzAR.png)

## Conclusion

Monitoring user experience in Real-time brings an advantage to single-page applications. It not only allows you to figure out how the user experience is going on for the majority of customers but you can use this information to improve the areas of your web app to provide a much better experience. Using the [Sematext Real-time User Monitoring tool](https://sematext.com/) with a React app is helpful in the scenario.

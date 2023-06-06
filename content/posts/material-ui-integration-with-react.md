---
title: 'How to integrate Material UI library in React apps'
date: '2020-05-24'
slug: 'material-ui-integration-with-react'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://amanhimself.dev/blog/material-ui-integration-with-react/'
---

Material design was introduced by Google around 2014 as a design language and it still shares some popularity among web and mobile applications. One of the common ways to integrate and use this design system in React apps is through [MaterialUI](https://material-ui.com/getting-started/installation/) library.

![ss1](https://i.imgur.com/l4PZ8tB.png)

In this post, let us take a look at how to integrate a material library that is available as an npm module and consists of built React components that you can use to build apps. You are going to learn from scratch on how to install and configure this library as well as build a small demo app.

![ss8](https://i.imgur.com/QxtWlBz.png)

## Prerequisites

Before you begin this tutorial you are going to need the following:

- a Web browser such as Chrome, Firefox and so on
- Node.js version above `12.x.x` installed on your local machine
- JavaScript/ES6 basics
- React basics
- npm/yarn install
- either `create-react-app` globally installed or access via `npx`

## Create a new React app

To start, you are going to need to setup a React project. Let's use `npx` to do so. Execute the following command in a terminal window.

```shell
npx create-react-app reactmaterial
```

By using the `npx` command (a part of the Node Package Manager (npm)) you execute `create-react-app` without the need to download and install the package globally.

When the new project is done scaffolding with the default dependencies such as React library and React DOM library installed.

Change in the new directory and you are going to be welcomed by the following structure of files and folders.

![ss2](https://i.imgur.com/W9D0ToF.png)

To verify that the React app is working, (_you can totally skip the step at this time_), run `yarn start` from the terminal window and open the default React app running at `http://localhost:3000` in a browser window.

![ss3](https://i.imgur.com/OkkceuE.png)

## Install Material UI library

The next step is to install the Material-UI library and integrate it to work with the current React app. The first is to install the core dependency of this library.

```shell
yarn add @material-ui/core
```

Material-UI was designed with the Roboto font in mind. If you wish to use it, you can follow the instructions. Go back to the terminal window and install the typeface package of the font. Also note that, the following steps to install this font are optional.

```shell
yarn add typeface-roboto
```

Then go to the entry point of your React app (preferably, `./src/index.js` file) and import the font.

```js
// rest of the import statements
import 'typeface-roboto';
```

Alternatively, if you do not wish to install the above npm module for the font, you can also use the CDN version of the font and read about it [here](https://material-ui.com/components/typography/#roboto-font-cdn).

## Using AppBar to create a custom navigation bar

In this section let us build a navigation bar. Create a new file called `./src/components/Navbar.js` and start by importing the components `AppBar`, `ToolBar`, and `Typography` from the MaterialUI library.

The `AppBar` component is used to display branding, screen titles, and navigation of the web app. That is what you are going to use it for. The `ToolBar` component is wrapper where you can place your components horizontally. The `Typography` component applies the Material UI theme that is available by default.

```js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
```

Next, export a function component called `Navbar` with the following JSX.

```js
export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6">React and Material-UI App</Typography>
      </Toolbar>
    </AppBar>
  );
}
```

In the code snippet above, notice the `variant` prop on the `Typography` component. It uses the variant mapping to properly associate a UI element with an HTML semantic element (_such as h6 in the code snippet_).

Now, to see it in action, import the `Navbar` component in the `App.js` file.

```js
import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
```

You are going to get the following result after this step.

![ss4](https://i.imgur.com/HhDhiP3.png)

## Implementing a Paper component

Two components that are going to be used in this section in order to layout a view for the items of the list are called `Grid` and `Paper`.

Material Design’s responsive UI is based on a 12-column grid layout. The `Grid` component helps you implement this layout system and then provide the values or the number of grids you want to display. A basic grid might look like below:

![ss5](https://i.imgur.com/UqiYt1i.png)

Material UI uses CSS's Flexbox to manage layout alignments and sizing of the grid columns.

The other component `Paper` actually displays the physical properties of a paper on the screen. It resembles a flat, texture of a sheet of paper, and using a prop called `elevation` you can manipulate its default display behavior. Do note that, this component does need an initial width and height.

Create a new component file called `./src/components/List.js` which is going to be used as a reusable component later. This presentational component is going to display a `Paper` component inside `Grid` with custom styles.

```js
import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 100,
    flexGrow: 1
  },
  paper: {
    height: 220,
    width: 340,
    backgroundColor: '#ebebeb'
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100
  }
}));

export default function List() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.root} xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid key={1} item>
            <Paper className={classes.paper} elevation={2} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
```

The `makeStyles` comes from the Material UI API. It links a style sheet with a function component and returns a hook that you use inside the component.

You can modify the `App.js` file to include the `List` component.

```js
// rest of the import statements
import List from './components/List';

function App() {
  return (
    <div>
      <Navbar />
      <List />
    </div>
  );
}
```

Here is the result you are going to get after this step.

![ss6](https://i.imgur.com/8PL5Xrs.png)

## Fetching random user data

To display data inside `List` component, let us use [https://randomuser.me/](https://randomuser.me/) API. In the `App` component the data is going to be fetched on the initial render using `useEffect` hook. The `useState` hook is used to store the fetched data by defining a state variable whose initial value is an empty array.

To start, first, import the hooks from the `react` library.

```js
import React, { useState, useEffect } from 'react';
```

After that create a state variable called `data` inside the `App` component. Along with the `data` variable, define two other state variables, `isLoading` to track the whether app is in loading mode (that is, the data is being fetched from the API) and `error` to track if there is an error while fetching the data. The loading state of the React app is going to be `true` by default.

```js
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  //rest of the code
}
```

The `useEffect` hook is going to have a callback that is going to fetch the data using JavaScript's `fetch` API.

```js
useEffect(() => {
  fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then(
      result => {
        setIsLoading(false);
        setData(result.results);
      },
      error => {
        setIsLoading(false);
        setError(error);
      }
    );
}, []);
```

You can conditionally render the JSX based on the state variables.

```js
if (isLoading) {
  return <div>Loading ...</div>;
} else if (error) {
  return <div>There is an error fetching data.</div>;
} else {
  return (
    <div>
      <Navbar />
      <List />
    </div>
  );
}
```

Now, when you refresh the React app, you are going to see the JSX being rendered that is related to the loading state of the app, for split seconds.

![ss7](https://i.imgur.com/hBWfaYc.gif)

## Display a list of users

You can now pass the user information you want to display in the form of the prop at the `List` component. Use JavaScript's `map` function to traverse the array `data`.

```js
{
  data.map(item => (
    <List
      key={item.id.value}
      userAvatar={item.picture.large}
      firstName={item.name.first}
      lastName={item.name.last}
    />
  ));
}
```

These props are then passed as arguments to the `List` component.

```js
xport default function List({ userAvatar, firstName, lastName }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.root} xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid key={1} item>
            <Paper className={classes.paper} elevation={2}>
              <Grid container justify="center">
                <Avatar
                  alt="User"
                  className={classes.avatarImage}
                  src={userAvatar}
                />
                <Typography variant="p">
                  Name: {firstName} {lastName}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
```

The above code snippet uses few more core components from Material UI (such as `Avatar`). You can find their reference in the official documentation of this library.

Here is the final result you are going to get when you back to the browser screen.

![ss8](https://i.imgur.com/QxtWlBz.png)

## Conclusion

I hope in this post, you get the idea of how you can leverage the core components of [Material UI library](https://material-ui.com/getting-started/installation/) in your React apps and save a ton of development time.

References:

- [Materia UI official docs](https://material-ui.com/getting-started/installation/)
- [AJAX calls in React](https://reactjs.org/docs/faq-ajax.html)
- [Random User API](https://randomuser.me/documentation#howto) to mock data in your React apps
- To learn more about React Hooks, check out my post on that [here](https://dev.to/amanhimself/build-a-expense-tracker-app-with-react-hooks-and-localstorage-api-4lfj)

---
title: 'How to add Dark mode functionality with React Hooks'
date: '2020-01-09'
slug: 'dark-mode-with-react-hooks'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://blog.crowdbotics.com/how-to-add-dark-mode-functionality-with-react-hooks/'
---

![cover](https://i.imgur.com/WDIlL4i.png)

Developers seems to love dark mode. A lot of popular websites like Twitter, Reddit, and YouTube are now supporting this dark mode on their websites and applications as well. It is more than a trend. It's easy on user's eyes and decreasing the problem of eye fatigue.

In this post, I am going to show you how you can add this functionality in your React apps whether it is an admin dashboard that is consuming some third party API hosted elsewhere or a web blog using static site generators like [Gatsby](https://www.gatsbyjs.org/). The steps discussed below are going to be same whether you decide to use `create-react-app` utility to generate a React app or using any static site generator.

This tutorial is going to use React hooks. If you are not familiar with them at all, it is recommended that you get familiar with them from the [official React docs](https://reactjs.org/docs/hooks-reference.html). Otherwise, whenever hooks are used, a brief overview is provided.

## Table of Contents

- Requirements
- Setting up a base theme
- Add a toggle button to change the theme
- Adding theme persistence using local storage
- Connecting Crowdbotics support to Your Github Repo
- Conclusion

## Requirements

Note: These requirements are needed if you are looking to follow this post from a technical point of view, which means, if you are looking to try out Crowdbotics for the first using a custom template from the marketplace or are actually interested in building a custom dating app using Crowdbotics template, React Native, and Expo. If later is your scenario, this post can act as a guide and an entry point to the template.

- [Node.js](https://nodejs.org/en/) (>=`10.x.x`) with npm/yarn installed.
- [create-react-app](https://www.npmjs.com/package/create-react-app) to generate a new React app
- [Crowdbotics App builder platform](http://app.crowdbotics.com/) account (preferably log in with your valid Github ID)

## Setting up a base theme

In this section, let us start by adding a base React app that uses light mode by default. To start, using `create-react-app` create a new directory. After you have created a new directory, navigate inside the project directory. You can copy and paste the following steps in your terminal window.

```shell
create-react-app react-darkmode-app

cd react-darkmode-app
```

Once inside the project directory, open `App.css` file and the following styles for the base light theme.

```css
body {
  margin: 0;
  text-align: center;
}

.light-theme {
  background-color: #fff;
  color: #444444;
}

nav {
  display: flex;
  text-align: center;
  background-color: #503d81;
  width: 100%;
  padding: 20px;
  color: #f8f8f8;
}

.content {
  padding: 0.5em;
  margin: 0 auto;
  max-width: 600px;
  font-size: 1.2rem;
  line-height: 1.1;
  height: 90vh;
}
```

To apply these styles, open `App.js` component file and replace the default code with the below snippet.

```js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="light-theme">
      <nav>Toggle button will go here</nav>
      <div className="content">
        <h1>Light Mode</h1>
      </div>
    </div>
  );
}

export default App;
```

Now, try to run the app using the command `yarn start` from a terminal window. Visit the URL `http://localhost:3000` in a browser window and you will get the following result.

![ss1](https://crowdbotics.ghost.io/content/images/2019/08/ss1-1.png)

Head back to the `App.css` file and create base styles for the dark theme.

```css
.dark-theme {
  background-color: #1f1b24;
  color: #f8f8f8;
}

.dark-theme nav {
  background-color: #332940;
}

.dark-theme code {
  color: red;
}
```

Notice that using CSS selector property, you are changing the background color of the navbar and the rest of the styles remain the same as before. For example, the text `color` property is going to be the same as in light theme. To test out the dark theme, change the `className` of the first `div` element inside the `App.js` file to `dark-theme`.

```js
function App() {
  return (
    <div className="dark-theme">
      <nav>Toggle button will go here</nav>
      <div className="content">
        <h1>Dark Mode</h1>
        <p>
          Do take a note of the <code>color</code> property in the nav bar.
        </p>
      </div>
    </div>
  );
}
```

Looking back at the browser window, you get the following result.

![ss2](https://crowdbotics.ghost.io/content/images/2019/08/ss2-1.png)

At this point, you have a very simplified version of the app, but it doesn't fulfill the purpose. It has to keep track of which theme the user selects and show the styles accordingly.

## Add a toggle button to change the theme

To let the end-user decide which theme they want to the view, your React app would be done by adding a toggle button. To change the theme between the light or dark, there is a need for a variable to keep track of what theme the user has selected. For this purpose, let us add the new concepts of _React Hooks_ rather than converting the current `App` component into a class component.

To give a brief overview of React Hooks, one can say they are available to React since the version `16.8.x`. They are functions that allow you to initialize and use React state and a component's life-cycle methods in a functional component. Hooks do not work with classes. If you are familiar with React, you know that the functional component has been called as a functional stateless component. Not any more.

React provides a few built-in Hooks such as `useState` to initialize a default state of a component similarly as in a class component with the keyword `state`. Open `App.js` file and initialize the state as below.

```js
function App() {
  const [darkTheme, setDarkTheme] = React.useState(false);
  // rest remains same
}
```

In the above snippet, the default value of `darkTheme` variable is `false`. This means that it is not the default set of styles that the app will use. Using conditional operator, update the `return` function inside `App()`.

```js
return (
  43 -
  (
    <div className={darkTheme ? 'dark-theme' : 'light-theme'}>
      <nav>
        <div className="button-container">
          <button onClick={() => setDarkTheme(prevTheme => !prevTheme)}>
            Toggle Theme
          </button>
        </div>
      </nav>
      <div className="content">
        <h1>{darkTheme ? 'Dark Mode' : 'Light Mode'}</h1>
        <p>
          Do take a note of the <code>color</code> property in the nav bar.
        </p>
      </div>
    </div>
  )
);
```

Starting from the first `div` element, it uses the conditional operator to check whether the value of the state variable `darkTheme` is true or false. If it is true, the styles related to the dark theme are going to be applicable. Otherwise, the default light theme is activated. The same conditional operator goes on the `h1` element to display the text of which theme is being currently used.

The `button` uses an `onClick` event to toggle the behavior of light and a dark theme. The `prevTheme` is used to apply functional updates. It computes the value of the previous state and then returns an updated value. In the current case, the value here represented is the theme itself.

Here is the output in the browser window. Click the `Toggle Theme` button to change the theme and the heading in the content.

![ss3](https://crowdbotics.ghost.io/content/images/2019/08/ss3.gif)

Here are the corresponding styles for the `button-container`.

```css
.button-container {
  display: flex;
  margin: 0 auto;
}
```

## Adding theme persistence using local storage

Right now, the user can easily switch between the two themes your app is running on. However, whenever the web page reloads, the default theme shown is light even though the last theme you selected was dark. To provide the pragmatic solution, in this section, you are going to store the value of dark theme in the browser's local storage.

As compared to lifecycle methods in class components, in modern-day React functional components, you can easily add the same working functionality using `useEffect`. It accepts a function in the form of an argument. This function can be written with the keyword `function` or use an arrow function. Also, this function passed to `useEffect` as the argument will run after every render is completed.

To avoid this, you can conditionally render the `useEffect` method. This is done by passing an empty array as the second argument. The value this array will contain is going to be the value of the `darkTheme`. After you have defined the state in the `App` component, add this effect method.

```js
React.useEffect(() => {
  localStorage.setItem('dark', JSON.stringify(darkTheme));
}, [darkTheme]);
```

Using an arrow function as the first argument, it is setting the value of `darkTheme` in the browser's `localStorage`. To add a theme value to the local storage, there are two things required in combination. An identifier or a key has to be passed as the first argument to `setItem()` along with boolean value of `darkTheme` as the second argument.

Now, go back to the browser window and open dev tools. In the tab, `Application` look for the **Storage > Local Storage** as described in the image below. You will find a key `dark` that has the value of `false`.

![ss4](https://crowdbotics.ghost.io/content/images/2019/08/ss4.png)

On clicking the button `Toggle Theme` the value of the key `dark` in the local storage changes to `true`.

![ss5](https://crowdbotics.ghost.io/content/images/2019/08/ss5-1.png)

It works but on reloading the React app, switches back to the light theme. This is because the default value provided to the dark theme is always false. Let us change that.

Go back to the `App` component and create a new function, `getDefaultTheme`. It will keep track of getting the value of the `dark` from the local storage. Also, the default value of the `darkTheme` in the state is going to be read from this function (_in other words, from the local storage_) rather than a boolean `false`.

```js
const [darkTheme, setDarkTheme] = React.useState(getDefaultTheme());

React.useEffect(() => {
  localStorage.setItem('dark', JSON.stringify(darkTheme));
}, [darkTheme]);

function getDefaultTheme() {
  const selectedTheme = JSON.parse(localStorage.getItem('dark'));
  return selectedTheme || false;
}
```

Notice in below demo of how the value of the dark is saved in the local storage even when the React app reloads.

![ss6](https://crowdbotics.ghost.io/content/images/2019/08/ss6-1.gif)

## Connecting Crowdbotics support to your Github Repo

Once everything is working, now let us add git version to this React project and then, further add the support for Crowdbotics app building platform. Open a terminal window and execute:

```shell
git init

# add all files
git add .

# commit
git commit -m "update"
```

Once all the files are committed, add this repository to your Github account. Crowdbotics app building platform now gives you an option to connect a Github repository directly using GitHub OAuth integration ( which means you need to have a Crowdbotics account or login into one using your Github account).

![ss7](https://crowdbotics.ghost.io/content/images/2019/08/ss7.png)

More and in-detail information about this process could be found [here](https://medium.com/crowdbotics/connect-your-github-repo-to-crowdbotics-36008d35e681).

## Conclusion

_Congratulations!_ You have made to the end. I hope you learned something useful here. React Hooks is a powerful concept, and getting more commonly used as the time progress. Here are some resources related to this post:

- [Hooks official docs](https://reactjs.org/docs/hooks-intro.html)
- [Using Hooks in a React Native app](https://crowdbotics.ghost.io/react-hooks-basics-building-a-react-native-app-with-react-hooks/)

Originally published at [Crowdbotics.com](https://crowdbotics.ghost.io/how-to-add-dark-mode-functionality-with-react-hooks/)

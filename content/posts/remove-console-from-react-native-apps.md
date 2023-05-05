---
title: 'How to remove console statements from React Native apps'
slug: 'remove-console-log-from-react-native-apps-in-production'
date: '2022-06-19'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/remove-console-from-react-native-apps/'
---

<!-- ![cover_image](https://i.imgur.com/wTa1g5A.png) -->

For debugging purposes, I often use `console.log` statements in React Native and Expo applications.

A babel plugin called [babel-plugin-transform-remove-console](https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-remove-console) takes care of removing any `console` statements from the code. This is a great plugin that I like to use, especially before releasing apps in production.

## How to use it

Install the plugin as a dev dependency in the project:

```shell
yarn add -D babel-plugin-transform-remove-console
```

Then, add it as a plugin under `env.production` in the `babel.config.js` file:

```js
module.exports = function () {
  return {
    // ... other project config such as presets and plugins
    env: {
      production: {
        plugins: ['transform-remove-console']
      }
    }
  };
};
```

This will remove any `console` statements from the code.

## Why does it work

React Native uses [Babel](https://babeljs.io/) as a tool to read and parse React and ES6 (or later) syntax into a specific version of JavaScript code that can run in an environment (that doesn't support newer ES6 or React syntax).

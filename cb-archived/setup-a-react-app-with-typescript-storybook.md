---
title: 'How to Setup a React App with TypeScript, Storybook'
slug: 'setup-a-react-app-with-typescript-storybook'
date: '2019-06-14'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://blog.crowdbotics.com/setup-a-react-app-with-typescript-storybook-and-crowdbotics/'
---

If you are building web applications with ReactJS, you might have heard or used TypeScript. They say TypeScript is the missing part from JavaScript's ecosystem. I must say, I did not enjoy writing React apps in TypeScript at first. But over time, I have learned this valuable lesson that if you want to continue a project that has a focused development process, TypeScript should be the way to go. Including types and structures like interfaces as an extension of JavaScript help to make the development process more predictable and safer. TypeScript offers other benefits in the form of code suggestions in a workspace and highlights errors as early as possible too.

**In this tutorial, we are going to take a look at how to setup a React app that uses TypeScript along with Storybook.** It is targeted towards
developers who are want to learn these two important tools of ReactJS development. It can be a bit of a hassle to setup a TypeScript and Storybook together in one project but this tutorial will walk you through a smooth process and will showcase you that it is not a hassle at all.

**Tld;**

- Requirements
- Creating a new React app
- Adding Storybook
- Adding Storybook configuration
- First Storybook Component
- Connecting Crowdbotics support to Your Github Repo
- Conclusion

## Requirements

In order to follow this tutorial, you must have:

- NodeJS `v8.x.x` or higher installed along with npm/yarn
- `create-react-app` installed globally to on your local dev machine generate a new React project

Bonus: You can also, use `npx` to generate a new React project without installing `create-react-app`.

## Creating a new React app

To get started with a React project, generate one by running the below command in a terminal window

```shell
create-react-app hello-tsx-storybook
--scripts-version=react-scripts-ts
```

This command will take a few moments to execute completely. Once the React + TypeScript project is generated you will get the following file structure. Notice how there some of the files in the root directory are TypeScript's configuration files and in `src` directory, where the magic happens, has component files (such as `App.tsx`) with an extension of `tsx` at the end of file name rather a `.js`. This indicates that the component file now supports TypeScript.

![](https://crowdbotics.ghost.io/content/images/2019/05/ss1-3.png)

To run the app in the current state, open command line interface, traverse inside the project root and run `npm start`. Once the webpack dev server starts, you will be directed to the URL `http://localhost:3000/` in a default web browser window with the following screen like below.

![](https://crowdbotics.ghost.io/content/images/2019/05/ss2-2.png)

## Adding Storybook

**[Storybook](https://storybook.js.org/docs/basics/introduction/)** is a user interface development environment for UI components. If you are building a UI and you want to showcase all or some of the functionalities of the individual components but totally isolated from the current app's lifecycle and dependencies.

Storybook is available for many front-end frameworks and libraries such as [ReactJS](https://medium.com/crowdbotics/building-a-mern-stack-app-with-material-ui-33ff8ca4da01), [Angular](https://medium.com/crowdbotics/learn-to-build-a-simple-progressive-web-app-pwa-with-angular-and-lighthouse-hacker-news-clone-51aca763032f), and [React Native](https://medium.com/crowdbotics/how-to-build-a-real-time-logo-detection-app-with-react-native-google-vision-api-and-crowdbotics-9ed65fbcd15).

To install Storybook as dev dependency for React, run the following command.

```shell
yarn add --dev @storybook/react @types/storybook__react
```

Why install it as `devDependency`? We won't require storybook and its use in the production build, ever. So it is better to stick with it in the development environment only. One this dependency is installed, you have to install some of the peer dependencies that are required. Two of them are `react` and `react-dom` which we already have installed. The rest of them can be installed using the below command.

```shell
yarn add --dev babel-loader @babel/core
```

Lastly, there three more dependencies that are required just to compile TypeScript.

```shell
yarn add --dev awesome-typescript-loader react-docgen-typescript-loader react-docgen-typescript-webpack-plugin
```

## Adding Storybook configuration

Before we can make Storybook work, we need to add a few more things. Let us start by creating a new directory `.storybook` in the root directory.

```shell
mkdir .storybook
```

Inside this folder, there are several files that are required to be created.

```shell
cd .storybook

touch addons.js config.js tsconfig.json webpack.config.js
```

The output of the above command is going to be:

![](https://crowdbotics.ghost.io/content/images/2019/05/ss3-3.png)

For a basic Storybook configuration, the only thing you need to do is tell Storybook where to find stories and include the path inside `.storybook/config.js`. In our current scenario, we are going to stories inside the `src/components` directory (_just a personal preference_).

```js
import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
```

Note, that, prior to this step, `components` directory inside `src` did not exist. You will have to create that manually. The above snippet of code is to create a pattern such that all the stories match a particular glob. code is Next file that needs to be configured is `tsconfig.json` inside the storybook directory. This file is going to be responsible to compile stories from TypeScript to JavaScript. Add the following to this file.

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "allowSyntheticDefaultImports": true,
    "module": "es2015",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": false,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "../",
    "outDir": "dist",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "build",
    "dist",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts",
    "**/*/*.test.ts",
    "examples"
  ]
}
```

Lastly, add the following code inside the file `.storybook/webpack.config.js`.

```js
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
          configFileName: './.storybook/tsconfig.json'
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
```

To complete the setup, open `package.json` file and add the script to run the storybook interface.

```json
"storybook": "start-storybook -p 4000 -c .storybook"
```

## First Storybook Component

In order to proceed and test our current setup to work as expected, let us write a new component and its story. Create a new file called `Button.tsx` inside `components` directory with the following code for the component itself.

```tsx
import * as React from 'react';

export interface IButtonProps {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
}

const styles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10
};

const Button: React.SFC<IButtonProps> = props => (
  <button onClick={props.onClick} style={styles} type="button">
    {props.children}
  </button>
);

Button.defaultProps = {
  children: null,
  onClick: () => {}
};
export default Button;
```

The above component is a stateless component (_aka functional component_). Now, while being inside the same directory, create another file `button.stories.tsx` with the following snippet of code.

```tsx
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => <Button>😀 😎 👍 💯</Button>);
```

Go to the terminal window and run the script `yarn run storybook`. This will open a new window in your default web browser at URL: `http://localhost:4000/?path=/story/button--with-text` with the following result.

![](https://crowdbotics.ghost.io/content/images/2019/05/ss4-2.png)

![](https://crowdbotics.ghost.io/content/images/2019/05/ss5-3.png)

## Conclusion

Kudos to you if have reached so far. You have configured Storybook work with TypeScript and wrote a story for a custom `Button` component using the TypeScript. This tutorial was just an introduction. To dive deep inside the world of storybooks, I would recommend you to go through their official docs [here](https://storybook.js.org/docs/guides/guide-react/).

[Originally published at Crowdbotics](https://crowdbotics.ghost.io/setup-a-react-app-with-typescript-storybook-and-crowdbotics/)

---
title: How to configure ESLint and Prettier in an Expo project
author: Aman Mittal
pubDatetime: 2023-07-25T03:42:51Z
slug: configure-eslint-prettier-expo-project
featured: false
draft: false
tags:
  - expo
description: ""
---

> Make sure to see the official Expo documentation for latest details on using [ESLint](https://docs.expo.dev/guides/using-eslint/) in your React Native project.

When writing JavaScript, I spend a good amount of time fixing basic mistakes. Different project files sometimes end up following different syntax and formatting conventions.

Using ESLint rescues me from those mistakes. It is a linter for the JavaScript programming language that helps keep the code syntax consistent and match conventions and warns against the possible source of problems. It is written in Node.js.

Also, I like to use some specific set of Prettier rules in my projects. ESLint configures well with it.

## Create a new project

To create a new React Native project, I use `create-expo-app`:

```shell
npx create-expo-app projectName

# Navigate inside the project folder
cd projectName
```

## Install ESLint and Prettier dev dependencies

After creating a new project, the next step is to install ESLint and Prettier as dev dependencies.

The Expo team has been awesome to provide a package called [eslint-config-universe](https://github.com/expo/expo/tree/master/packages/eslint-config-universe) that comes with basic and shared ESLint configuration for Node.js, React Native and web projects. This is useful because I don't have to set up and define the ESLint configuration from scratch.

Run the following command in the terminal:

```shell
yarn add --dev eslint-config-universe eslint prettier
```

These packages are installed as `devDependencies` since they are only required during the development of the project.

## Configure ESLint

Start by creating a new file called `.eslintrc.js` at the root of the project. This file is responsible to contain all the configuration and linting rules.

Here is the minimal configuration I use:

```js
module.exports = {
  extends: ["universe", "universe/native"],
  rules: {
    "import/order": 0,
    "react-native/no-inline-styles": 0,
    "import/namespace": 0,
    "no-duplicate-imports": "error",
  },
};
```

Sometimes I extend this configuration or tweak with rules but for most of the projects I start with this configuration.

In the above snippet, the `extends` is used to apply the pre-defined set of rules from `universe` and `universe/native`.

The `universe` contains basic config JavaScript projects. The `universe/native` contains the config for React Native and Expo projects, with support for React and JSX.

## Configure Prettier

Prettier is a code formatter that ensures that all the code files follow a consistent styling. If you are into Web development, chances are you are already using it.

Create a new file called `.prettierrc` and inside it add the following (_minimal_) configuration:

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "bracketSameLine": true,
  "trailingComma": "es5",
  "arrowParens": "avoid"
}
```

## Ignore files

I also created two new files to ignore trivial or other configurable files and folders from both linting and formatting. Both `.eslintignore` and `.prettierignore` have the following snippet:

```shell
node_modules/**
package.json
yarn.lock
ios/**
android/**
assets/**
.vscode
.expo-shared
.prettirrc
.eslintrc.js
```

## Conclusion

There are about a dozen ways one can configure ESLint rules. However, in this post, I wanted to share this minimal configuration for my future self.

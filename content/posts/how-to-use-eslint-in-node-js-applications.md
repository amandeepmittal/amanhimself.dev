---
title: 'How to use ESLint in Node.js Applications'
date: '2017-04-28'
thumbnail: '/thumbnails/node.png'
slug: 'blog/how-to-use-eslint-in-node-js-applications'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/hackernoon/how-to-use-eslint-in-node-js-applications-cc4b2298ce55'
---

> [Originally Published at Hackernoon.com](https://medium.com/hackernoon/how-to-use-eslint-in-node-js-applications-cc4b2298ce55)

ESLint is an open source JavaScript linting utility that help you overcome developer errors as JavaScript is loosely-typed language. There are quite a few options such as JSHint and JSCS in Javascript community for code linting and this post doesn’t suggest that you cannot use them.

ESLint is designed to have all rules completely pluggable. That’s one of the primary reasons it came into existence. It allows developers to create their own linting rules. Every rule provided in the [ESLint official guide](http://eslint.org/docs/user-guide) is standalone rule and a developer at any point can decide whether to use a specific rule or not.

### Installing

_Note_: You must have Node.js installed in order to access ESLint via it’s package manager `npm`.

For local installation to a project directory:

```shell
npm install eslint --save-dev
```

For a global installation in your working system:

```shell
npm install eslint -g
```

ESLint will now be available via `eslint` command in your terminal.

### Configuration

Easiest way to configure it to setup a `.eslintrc` JSON file where are all the linting rules can be described.

An example of `.eslintrc`:

```json
{
  "env": {
    "node": 1,
    "browser": 1
  },
  "globals": {
    "exampleGlobalVariable": true
  },
  "rules": {
    "eqeqeq": 1
  },
  "plugins": []
}
```

If you installed eslint globally, you can also generate config file using:

```shell
eslint --init
```

Other case, if you have installed it locally to a project, you will need to type in your terminal:

```shell
./node_modules/.bin/eslint --init
```

In both cases, you will be prompted with set of basic questions to generate `.eslintrc` file.

<img src='https://cdn-images-1.medium.com/max/800/0*RMPR1vjmB6jsHtHw.png' />

An example of file generated after above prompt:

```json
{
  "env": {
    "browser": true,
    "commonjs": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
}
```

For detailed information on Configuration, [read here](http://eslint.org/docs/user-guide/configuring).

### Rules

Rules in ESLint are added individually. No rules are enforced by default. You have to specify rules explicitly, then only it will be enabled for the linting process.

You can find a complete list of rules in the [official documentation here](http://eslint.org/docs/rules/)

After deciding which rules to include, you have to set there error levels. Each error level can be defined as following:

- `0` - Turn the rule off
- `1` - Turn the rule on as a warning
- `2` - Turn the rule on as an error

The difference between an error and a warning is the exit code that eslint will have when it finishes. If any errors are found, eslint will exit with a `1` exit code, otherwise it will exit with a `0`. If you are linting within a build step this allows you to control which rules should "break your build" and which ones should be considered as warnings.

Learn how to [configure rules in detail here](http://eslint.org/docs/user-guide/configuring#configuring-rules).

### Environments

The code you are writing might be suitable for a particular environment such as, you might be writing a REST API in Node.js application using Express Framework (Sinatra) and the frontend of that application is going to be built in AngularJS. Two different projects, two different environments and both can have separate eslint configurations in one file even though the client and the server are under one project directory that is been considered as root of your project.

How is it done? By setting the environment id to true in the `"env"` section of `.eslintrc`.

### Linting

ESLint comes with a command line interface (CLI) to lint your files or directory.

```js
eslint file.js
eslint dir/
```

The output generated will be grouped by file, and will specify the `line:column` number, warning/error, reason for the error, and the name of the rule for each failure.

### Use ESLint with your preferred Coding Style

ESLint personally does not promote any coding style. You can setup `.eslintrc` file to enforce coding style using [style rules](http://eslint.org/docs/rules/#stylistic-issues) that you like.

You can also use ESLint with Style guides such as [JavaScript Standard Style](http://standardjs.com/). You have to use extra plugin for that. The full guide can be found here [https://github.com/feross/eslint-config-standard](https://github.com/feross/eslint-config-standard).

To add a plugin to `.eslintrc`:

Some plugins for popular libraries: [Angular](https://www.npmjs.com/package/eslint-plugin-angular) | [React](https://www.npmjs.com/package/eslint-plugin-react)

Another plugin, I find very useful is [one variable per var](https://www.npmjs.com/package/eslint-plugin-one-variable-per-var) just to maintain code consistency over a large/open-source project.

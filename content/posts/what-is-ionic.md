---
date: '2017-10-12'
title: 'What is Ionic?'
thumbnail: '/thumbnails/ionic.png'
slug: 'what-is-ionic'
tag: 'ionic'
canonicalUrl: 'https://medium.com/hackernoon/what-is-ionic-c1da6eab0d8a'
---

Ionic is an open source, front-end SDK for developing Hybrid Mobile Applications using web technologies such as HTML, CSS and JavaScript. It provides mobile optimised web technology based components as well as native APIs using Cordova and Ionic Native.

Ionic with it’s latest version, is performance efficient using minimal DOM manipulation. Angular also plays a major role in increasing the performance of an Ionic application.

It has it’s own command line interface tool that is really helpful to scaffold and develop an application and majorly in avoid writing boilerplate code, thus, saving precious time.

### Development Setup for Ionic

### Nodejs and npm

To develop and run Ionic apps, we need Nodejs, most importantly, because Ionic uses Node’s CLI to build tasks and generate resources. Navigate to [Nodejs official website](https://nodejs.org/) to download Nodejs and it’s package manager: `npm`.

To check of Nodejs is installed correctly, in your terminal window:

```shell
$ node -v
v6.11.0

$ npm -v
3.10.10
```

npm is a Package Manager that is used to download almost every dependency in an Ionic Project.

### TypeScript

Next step is to install TypeScript compiler.

```shell
$ npm install -g typescript

# After installtion, to check if installed correctly:
$ tsc -v
Version 2.3.4
```

### Install Cordova and Ionic CLI

```shell
$ npm install -g cordova ionic
```

Verify your installation by:

```shell
$ cordova -v
7.0.1

$ ionic info
global packages:

    @ionic/cli-utils : 1.3.0
    Ionic CLI        : 3.3.0

System:

    Node       : v6.11.0
    OS         : macOS Sierra
    Xcode      : Xcode 8.1 Build version 8B62
    ios-deploy : not installed
    ios-sim    : not installed
```

### Platfrom Guides

To install platform such as iOS and espcially android, I will want you to refer the official guidelines:

- for iOS: [Cordova iOS Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/)
- for android: [Cordova android Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/)

[Originally Published at Hackernoon.com](https://medium.com/hackernoon/what-is-ionic-c1da6eab0d8a)

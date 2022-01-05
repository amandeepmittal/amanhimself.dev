---
title: 'Ionic 2/3 CLI Reference'
date: '2017-12-19'
thumbnail: '/thumbnails/ionic.png'
slug: 'ionic-2-3-cli-reference'
tag: 'ionic'
canonicalUrl: 'https://medium.com/hackernoon/ionic-2-3-cli-reference-13f9fae3f964'
---

> [Originally Published at Hackernoon.com](https://medium.com/hackernoon/ionic-2-3-cli-reference-13f9fae3f964)

> _The Ionic CLI is your go-to tool for developing Ionic apps._

Ionic CLI is a great tool when it comes to avoid writing a lot of boilerplate code. It generates pages, services, can run or emulate your Ionic application with and generate needed resources for the mobile application such as splash screen.

This is a quick reference into Ionic CLI.

### Installing the CLI Tool

You can install it with npm:

```shell
$ npm install -g ionic
```

To check if it has installed correctly, in your terminal window, type:

```shell
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

### Starting a new App

To start with a new mobile application, Ionic framework provides different set of ready-to-use templates:

```shell
$ ionic start --list

tabs ............... ionic-angular A starting project with a simple tabbed interface
blank .............. ionic-angular A blank starter project
sidemenu ........... ionic-angular A starting project with
                    a side menu with navigation in the content area
super .............. ionic-angular A starting project
                    complete with pre-built pages,
                    providers and best practices
                    for Ionic development.
conference ......... ionic-angular A project that
                    demonstrates a realworld application
tutorial ........... ionic-angular A tutorial based
                      project that goes along with the
                      Ionic documentation
aws ................ ionic-angular AWS Mobile Hub Starter
```

For creating a new project:

```shell
$ ionic start my-new-app blank
```

_With update to Ionic 3, no more adding tags such as_ `_--v2_` _after the template name in the above command. By default, Ionic app generated will be of version 2/3. To generate an Ionic app of version 1 (with good ol' Angularjs):_

```shell
$ ionic start my-new-app blank --v1
```

### Serving

Once you `cd` into your project’s directory, serve your app on your local machine with `serve`:

```shell
$ ionic serve
```

To serve on a different port:

```shell
$ ionic serve --port 9100
```

Use `–-lab` tag to see your app side by side on multiple platforms (such as iOS, Android and Windows Mobile):

```shell
$ ionic serve --lab
```

To serve without live reload:

```shell
$ ionic serve --nolivereload
```

### Generating Providers and Pages

To generate a new page:

```shell
$ ionic  g page Page2
```

To generate a provider/service:

```shell
$ ionic g provider DataService
```

Know them all- List the available generators:

```shell
$ ionic g --list
```

### Generating Resources

To generate the app icon and splash screen with resources:

```shell
$ ionic cordova resources
```

To generate just the app icon:

```shell
$ ionic cordova resources --icon
```

Or, just the splash screen:

```shell
$ ionic cordova resources --splash
```

Now, generate resources for a specific platform:

```shell
$ ionic cordova resources android
```

## Add Ionic Plugins

```shell
$ ionic cordova plugin [action] [plugin]

# Example
$ ionic cordova plugin add cordova-plugin-x-socialsharing
```

### Adding Platform

To add a target mobile platform for the app to use:

```shell
$ ionic cordova add android
```

### App on an Emulator

To start an emulator:

```shell
$ ionic cordova emulate ios
```

Emulate with livereload:

```shell
$ ionic cordova emulate ios --livereload
```

### Running Ionic App on a Connected Device

Let’s say, I have an iOS device connected, so to run the app on that device:

```shell
$ ionic cordova run ios --device
```

Production check:

```shell
$ ionic cordova run android --prod --release
```

### Git Initialisation

Another advantage of using Ionic CLI tool is that it initialises a git repository when creating an Ionic project using the `ionic start` command from the terminal with an `initial commit` already. You can verify that by running:

```shell
$ git log --oneline --graph --decorate --color

# Output
* 029f86e (HEAD -> master) Initial commit
```

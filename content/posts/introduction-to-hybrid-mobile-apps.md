---
date: '2017-10-05'
title: 'Introduction to Hybrid Mobile Apps'
thumbnail: '/thumbnails/ionic.png'
slug: 'introduction-to-hybrid-mobile-apps'
tag: 'ionic'
canonicalUrl: 'https://medium.com/hackernoon/introduction-to-hybrid-mobile-apps-c97720b30557'
---

### What is a Hybrid Mobile App?

> _Hybrid application is a type of mobile application that uses browser window to display its interface._

A hybrid mobile application is built with HTML, CSS and JavaScript and is contained in a native wrapper so that it can be installed on a mobile device. This can be done without having to learn the native programming languages (e.g. Swift, Java).

It does mean that there is one codebase for all different platforms such iOS, and android.

This comes under the classification of types of mobile applications that consists of three types:

- Native: developed using platform specific programming language such as Objective C or Java
- Mobile Websites: developed using web technologies such as HTML, CSS & JavaScript and are accessible only through mobile web browser. They are actually web applications.
- Hybrid: cross-platform and have access to native APIs (mostly through plugins)

For example, an architecture of Hybrid Mobile application developed using Ionic Framework consists of two concepts that one must be familiar with ASAP: WebView & Apache Cordova.

### What is a WebView?

Think it of as a browser that runs inside the scope of a mobile application using a framework such as Ionic that mimics the native UI. This browser implements code written in HTML, CSS and JavaScript.

The application on a specific mobile operating system runs via tool like [Cordova](https://cordova.apache.org/). It provides APIs written in JavaScript to interact with Native features of mobile device such as access to camera or a microphone.

WebView communicates with Cordova’s APIs which then further communicates with mobile devices.

<img src='https://cdn-images-1.medium.com/max/800/1*hdwWntqxD-qOL8vf87DmAQ.png' />

WebViews are so common these days that you can build desktop applications using [Electron](http://electron.atom.io/).

### Why To Go Hybrid?

Before answering this question mysellf, I think you should read [_Myths around Hybrid Mobile Applications?_](https://devdactic.com/myth-hybrid-development/) written by Simon of [Devdatic.com](https://devdactic.com/).

This will answer the question above and along with it, my POV is that if you already know web development and or have experience with frameworks like Angular, or React, opting for Hybrid mobile development is a good way to expand your skills and take leverage of your current coding skills. After all, I love creating stuff and for me this is a great start.

### Alternatives

There are few alternates/frameworks available in the world of Hybrid Development. One of them is [Ionic Framework](https://ionicframework.com/) and with its next release earlier this year, it provides better performance for the hybrid apps. It also has a huge and helpful community to help you out whenever you get stuck.

Other options which I haven’t tried yet but think are worth mentioning include compile-to-native frameworks like [React Native](https://facebook.github.io/react-native/) and [NativeScript](https://www.nativescript.org/).

[Originally Published at Hackernoon.com](https://medium.com/hackernoon/introduction-to-hybrid-mobile-apps-c97720b30557)

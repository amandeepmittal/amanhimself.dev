---
title: 'Week 2 With React Native - Building a Weather App'
slug: 'week-2-with-react-native-building-a-weather-app'
date: '2018-07-16'
thumbnail: '/thumbnails/expo.png'
template: post
tag: 'expo'
canonicalUrl: 'https://medium.com/hackernoon/week-2-with-react-native-building-a-weather-app-ca50fcfcb1e1'
---

> [Originally published at Hackernoon.com](https://medium.com/hackernoon/week-2-with-react-native-building-a-weather-app-ca50fcfcb1e1)

This post was supposed to come out last weekend. I had a busy weekend could not find the time to write it nor had the energy to pull off it. Last week, I announced publicly, [in the first post](https://medium.com/@amanhimself/starting-over-with-react-native-aff0dbdf5909), that I have re-started learning and getting hands on experience using React Native. This post is a continuation to that one.

This week I advanced further in my journey. I completed [Spencer Carli](https://medium.com/u/1ec17560bf99)’s “[How to Setup a new React Native Project](https://learn.handlebarlabs.com/courses/enrolled/253279)”. The course goes through absolute basics of setting up a bare minimum app in which I got to learn things like:

- configuring iOS simulator on MAC
- linting with ESlint
- Prettier: using code formatting tool
- Debugging

Though, I had been already familiar with the process of lint and prettier since I use both of them in my daily workflow. Debugging and other modules are a delight to get familiar with in the start and will give an overall aspect of things such that you do not loose patience with yourself when trying to use them later. Moreover, Spencer is a calm instructor and has soothing voice. I enjoyed his method of teaching.

### eslint-config 🛠

I took the linting process with ESLint a step further. I worked on a small npm module called [eslint-config-amanhimself](https://www.npmjs.com/package/eslint-config-amanhimself) and the advantage of using it is that, now I do not have to setup and configure every other React-Native project I start from scratch. The other advantages of using lint tool if you are familiar with web programming, you do not need an introduction.

I personally, recommend you to use [ESLint](https://eslint.org/) with your projects, not only React Native but any other JavaScript library or framework you choose to work with. It does bring consistency in writing code and save minute errors from occurring at the time of compilation.

[**amandeepmittal/eslint-config-amanhimself**](https://github.com/amandeepmittal/eslint-config-amanhimself)

This tool is completely open source and saves a lot of my time and yours will too, if you decide to use it. At least give it a try. I want you to know that I am open to contributors if we can make this utility better that benefits every one.

### Weather Cards ⛅️

Next thing I worked on was a small application that I built to fetch weather of city using a third party API and display a set of data in the form of a card. This is how it looks like.

![](https://i.imgur.com/XPIOrxO.png)
![](https://i.imgur.com/5rz4eNi.png)

The main elements that I used in building this application are the following:

- Background image (using `ImageBackground`)
- InputText Value
- Fetching Weather Data from the API `[https://www.metaweather.com/api/](https://www.metaweather.com/api/)`
- Card View UI to display Data

Background Image changes accordingly to the type of the weather which is fetched from the API. In this process, I also learned a bit about using React Native’s `Platform` API and how to elevate the card style which is done differently for iOS and android.

Developing for Mobile is different from developing an app for web. In mobile, there are so many different elements to use and take care of. For example, in the below screen notice two things. One is a little cross button to delete the text in one action from the input field (only supported for iOS by RN API, I am sure there might be solution for android but I haven’t tried yet). Next, is the `KeyboardAvoidingView` which automatically re-positions the keyboard (or any other UI element) in the view to show maximum display elements.

![KeyboardAvoidingView Example](https://i.imgur.com/a81AmEV.gif)

In this process, I also learned that creating a custom component is not so hard but publishing it on `npm` for React Native apps is a difficult task. The card view in this application I am using can be found here as a separate component:

[**amandeepmittal/react-native-simple-card**](https://github.com/amandeepmittal/react-native-simple-card)

To setup and build this project I have used _Create-React-Native-App_ which is another wonderful open source tool to quickly kickstart a React Native project.

I had a fun week with React Native. I tried to spend as much time as I could get. _🙏 Thank you for reading this post_.

I also published another article this week on React Native:

[_React Native: How to Setup Your First App_](https://medium.com/@amanhimself/react-native-how-to-setup-your-first-app-a36c450a8a2f)

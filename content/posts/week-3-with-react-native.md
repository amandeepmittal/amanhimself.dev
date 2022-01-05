---
title: 'Week 3 with React Native - Why use Expo?'
date: '2018-07-26'
slug: 'week-3-with-react-native'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://medium.com/hackernoon/week-3-with-react-native-107f6779a831'
---

[Originally published at Hackernoon.com](https://medium.com/hackernoon/week-3-with-react-native-107f6779a831)

This week has been a hectic one for me. Deadline coming closer, and too many tasks to complete. It has been a happening one also. I got the invite to join Gatsbyjs open source team, to help and maintain the on going projects. I love contributing to open source communities and projects.

![](https://i.imgur.com/K7zj9sl.png)

### 👍

This week I took a dive deeper in Expo and React Native. I successfully, implemented Facebook login and access to Firebase database in a RN app using Expo API. Expo is beautiful to work with. It takes care of a lot of native work that otherwise one would be integrating by opening either Xcode or Android Studio. I found these links helpful to go through for providing a Facebook authentication in a React Native app.

- [Expo Facebook](https://docs.expo.io/versions/latest/sdk/facebook#__next)
- For Firebase SDK setup and integration in a React Native app go through [this link](https://docs.expo.io/versions/latest/guides/using-firebase#__next), also provided by Expo API.

One good thing about Expo is that it comes with Create-React-Native-App starter project. Second most important thing I went through this week was integrating and implementing a Redux store in a React Native. To quickly get started, I went through a [Udemy Course by Stefan Hyltoft](https://www.udemy.com/learn-redux-in-react-native-in-less-than-2-hours/) since enrolling was free and seemed to the point. His explanation of concepts is clear but his methodology of working did not appeal me. Any recommendation on how to organize the actions and reducers will be helpful.

### Why Use Expo for React Native?

Expo is popular because it handles a lot of headache tasks itself and provide smooth APIs that work with React Native app outside the box. It is open source and does cost anything to use. To test on a real iOS device you need an Apple developer account (\$99/year). You can accomplish this using Expo for both platforms: iOS and android. Expo provides a client app and by downloading it from the respective stores based on the mobile platform your device runs, you can easily test applications.

Currently, Expo’s SDK handles camera, maps, location tracking, analytics, push notifications and much more. Distributing it an Expo app is easy to. You can complete the process just by running the following command. It has dedicated [store](https://expo.io/) where you can publish apps for others to use. Quite helpful in prototyping.

```shell
exp publish
```

For standalone applications there are command available from the Expo CLI tool that you can use. A standalone app does not need the Expo client to run the application. You can generate IPA or apk files by running:

```shell
exp build:ios

# OR

exp build:android
```

There are shortcomings using Expo. I am not going to list them here but the team behind it seems to works rapidly to implement these new features. You can submit a feature or upvote one using this or get involved as a contributor.

[**Feature Requests - Expo**](https://expo.canny.io/feature-requests)

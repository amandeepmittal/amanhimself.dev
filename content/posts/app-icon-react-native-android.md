---
title: 'How to add an app icon in a React Native Android app'
slug: 'app-icon-react-native-android'
date: '2021-01-06'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/app-icon-react-native-android'
---

![cover_image](https://i.imgur.com/tZtGF2K.png)

In this post, let's generate an app icon and learn how to add it to an Android app build with React Native.

## Generating an app icon

### Quickly build an app icon

To create an app icon we are going to make use of a free tool called [Expo Icon Builder](https://buildicon.netlify.app/). Thanks to [Evan Bacon](https://twitter.com/baconbrix?lang=en) for making it free and available for us to use. You are free to use any other design tool of your own choice such as Figma.

This tool allows building an app icon quickly using an Emoji icon with a customized background color scheme. For example, in the below image you will find that we have selected the coffee icon emoji since it is going to represent the main app. The Emoji icon is selected from the right-hand panel. The selected item is shown on the left-hand side. You can also add a customized background color.

![04-1](https://i.imgur.com/ulbO2nm.png)

After selecting the icon you have to download it by clicking the download button at the top left corner.

![04-2](https://i.imgur.com/dnvBU00.png)

### Generate different assets for Android

Android requires five separate sizes for different screen pixel densities. Icons for lower resolution are created automatically from the baseline (_mdpi_). Refer to the table below for more information on pixel densities:

|   Resolution    | Density | Pixel units |
| :-------------: | :-----: | :---------: |
| mdpi (Baseline) | 160 dpi |     1×      |
|      hdpi       | 240 dpi |    1.5×     |
|      xhdpi      | 320 dpi |     2×      |
|     xxhdpi      | 480 dpi |     3×      |
|     xxxhdpi     | 640 dpi |     4×      |

Another free service I like to use to generate different assets for the app icon is called [makeappicon.com](https://makeappicon.com/). This service generate different assets for various pixel densities based on the above table.

All you have to do is upload the app icon we created in the previous step and provide an email where the icons will be available to download.

![04-3](https://i.imgur.com/JHjruoR.png)

It creates icons for both platforms iOS and Android. For this demo app, we are only interested in the `android/` directory it generates. A different set of directories are created that are prefixed with `mipmap` and suffixed with different sizes like `hdpi` and `mdpi`.

![04-4](https://i.imgur.com/lKLlS1a.png)

## Where to place the icon?

Within an Android app, the icons live at the following path: `android/app/src/main/res`. Now copy the contents of the `android/` directory generated in the previous step and paste them to that location. Note that there going to be the same directory names. You will have to replace those old directories with the new ones to be pasted.

![04-5](https://i.imgur.com/myCrBZc.png)

## Should the icons be rounded or squared?

Depending on the Android device the system will decide whether to use a square icon or a rounded icon. You may need both types of the icon. For this demo app, we are going to use the icon we generated and exclude the rounded icon from the configuration of the Android app.

To not use the rounded icon, open `android/app/src/main/AndroidManifest.xml` file and remove the modify following line:

```xml
android:roundIcon="@mipmap/ic_launcher_round"
```

To the same icon generated in the previous step:

```xml
android:roundIcon="@mipmap/ic_launcher"
```

In the same file, you will find the code snippet: `android:icon="@mipmap/ic_launcher"` points towards the original icon filename.

You will have to run the build command `npx react-native run-android` to apply these changes to show the app icon.

![04-6](https://i.imgur.com/KYxddTW.jpg)

## Resources

That's it to generate and a new icon for your Android app. Please find the [link here](https://developer.android.com/google-play/resources/icon-design-specifications) to learn more about Google Play's icon design specifications.

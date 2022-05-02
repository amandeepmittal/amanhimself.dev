---
title: 'How to remove bottom tab bar border in React Navigation'
slug: 'react-navigation-remove-tab-bar-border'
date: '2021-01-17'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://amanhimself.dev/blog/react-navigation-remove-tab-bar-border/'
---

> Updated: May 2, 2022

![cover_image](https://i.imgur.com/Tu5dv1l.png)

Navigation plays an important role in mobile applications and the React Navigation library does an awesome job in providing a completely customizable interface for utilizing different navigation patterns to React Native apps.

Having the liberty to customize tab bars with React Navigation, one customizable option available (depending on the UI design of an app) is to remove the border from the Tab bar.

Here is an example of the border that is the default when the React Navigation Bottom Tabs library is utilized to create a tab bar.

![ss1](https://i.imgur.com/ttIMI5V.png)

For the demonstration purpose, I am using an Expo project created using the `expo-cli` command-line tool. To create a similar new Expo project, you can execute the command and choose the `tabs` option.

```shell
expo init yourProjectName

# when prompted, choose the tabs option
# in managed workflow
```

This expo project comes with a default bottom tab navigator whose configuration can be found in the file `navigation/BottomTabNavigator.tsx`.

## Customize the TabBar

The Bottom Tab Bar React Navigation library gives an object called `screenOptions` to customize a tab bar. This object contains props that can be used to apply custom styles and one of the generic property it has is called `tabBarStyle`. This property is commonly used to change the styles of the tab bar, for example, by applying the `backgroundColor` styles' property.

To remove the border, add the `screenOptions` prop and inside it, add a `tabBarStyle` property called `borderTopWidth` with a value `0`.

```js
<BottomTab.Navigator
  initialRouteName='TabOne'
  screenOptions={{
    // ...
    tabBarStyle: {
       borderTopWidth: 0
    }
  }}
>
```

Here is the output:

![ss2](https://i.imgur.com/WqR3X9I.png)

Do note that this property can also be used to increase the width of the top border.

## Removing shadow on Android Device

After applying this `tabBarStyle` property, the width of the top border is removed from an Android device. However, there is a shadow at the top border of the tab bar that remains.

![ss3](https://i.imgur.com/ofnBBis.jpg)

To remove this shadow, set the `elevation` to `0`:

```js
tabBarStyle: {
  borderTopWidth: 0,
  elevation: 0
}
```

![ss4](https://i.imgur.com/3TEx5ib.jpg)

[Source code available at GitHub](https://github.com/amandeepmittal/react-native-examples/tree/main/remove-tabbar-border)

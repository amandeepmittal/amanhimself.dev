---
title: 'How to use React Native Localize in React Native apps'
date: '2020-01-01'
slug: 'how-to-use-react-native-localize'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://heartbeat.fritz.ai/how-to-use-react-native-localize-in-react-native-apps-3bb3d510f801'
---

Not every app require global customers but if you have plans to have, you would need internationalization in your React Native app. Using [`react-native-localize`](https://github.com/react-native-community/react-native-localize) your app can detect the operating system or the device language and support the multi-languages.

In this tutorial, let us build a small demo that uses `react-native-localize` along with a popular internationalization library [`i18n-js`](https://github.com/fnando/i18n-js). The app will display some mock locales based on the device's language and region settings.

## Table of contents

- Requirements
- Installing react-native-localize
- Add locales
- Add i18n Functionality
- Completing the App component
- Run the app
- Conclusion

## Requirements

- Node.js >= `10.x.x` version installed
- watchman
- react-native-cli

Do note that I’m going to use an iOS simulator for this tutorial.

## Installing react-native-localize

To get started, open a terminal window and generate a new React Native app. Also, install the following dependencies after navigating inside the app directory.

```shell
react-native init rni18nDemo

cd rni18nDemo

yarn add react-native-localize i18n-js lodash.memoize

# for ios only
cd ios/
pod install
```

If you are using `react-native` version greater than `0.60.x` you won't have to link the library `react-native-localize` manually. If you are below the specified version, please refer to the module's official documentation [here](https://github.com/react-native-community/react-native-localize).

This library gives you access to localization constants related to a particular device. These constants are not included in `i18n-js` library.

The `lodash.memoize` package is going to be used since `i18n-js` does not have a concept of caching.

## Add locales

Create two new files `en.json` and `nl.json` inside the directory `src/translations/`. Both of these files are for separate languages: English, and Dutch. Inside these files are JSON objects that have key-value pairs. The key for both files or the languages is going to be the same. The value for each key is going to differ as it contains the actual translation.

Following are the contents of each file:

```json
// en.json
{
 "hello": "Hello!",
 "Good morning": "Good morning",
 "Currency": "USD"
}

// nl.json
{
 "hello": "Hallo!",
 "Good morning": "Goedemorgen",
 "Currency": "EUR"
}
```

## Add i18n Functionality

Open `App.js` file and import the following statements.

```js
import React from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
```

Next, require the translation files from the directory created in the previous step, using an object `translationGetters`.

```js
const translationGetters = {
  en: () => require('./src/translations/en.json'),
  nl: () => require('./src/translations/nl.json')
};
```

Add the helper function `translate` that is going to translate the keywords on the language selection.

```js
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);
```

Next, add another helper method that is going to detect the fallback language when there is no proper translation available for a particular word or phrase.

Also, using `RNLocalize.findBestAvailableLanguage()` method, you can let the app detect the possible language tag (_value for each tag is coming from the language getters object_) and if not tag is available, it is going to use the fallback language tag. This method can also be used with some languages to detect their reading direction (_such as RTL_).

```js
const setI18nConfig = () => {
  const fallback = { languageTag: 'en' };
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  translate.cache.clear();

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
```

## Completing the App component

Lastly, let us create the `App` component. In the `App.js` file, start by adding a `constructor` method that is going to be used to set the i18n config helper method.

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    setI18nConfig();
  }

  // ...
}

export default App;
```

Then, using the lifecycle methods `componentDidMount` and `componentWillUnmount`, you are going to add and remove event listeners to listen for any localization change.

```js
componentDidMount() {
 RNLocalize.addEventListener('change', this.handleLocalizationChange)
 }

 componentWillUnmount() {
 RNLocalize.removeEventListener('change', this.handleLocalizationChange)
 }

 handleLocalizationChange = () => {
 setI18nConfig()
 .then(() => this.forceUpdate())
 .catch(error => {
 console.error(error)
 })
 }
```

Here is the rest of the component file with the `render` method and the styles used in it. Apart from translation locales, `react-native-localize` provide ready to use helper methods such as `getCountry()`. This particular method returns a value in the form of a country code based on the device's locale.

```js
render() {
 return (
 <SafeAreaView style={styles.safeArea}>
 <Text style={styles.value}>{translate('hello')}</Text>
 <Text style={styles.value}>{translate('Good morning')}</Text>
 <Text style={styles.value}>Currency: {translate('Currency')}</Text>
 <Text style={styles.value}>Country: {RNLocalize.getCountry()}</Text>
 </SafeAreaView>
 )
}

// styles
const styles = StyleSheet.create({
 safeArea: {
 backgroundColor: 'white',
 flex: 1,
 alignItems: 'center',
 justifyContent: 'center'
 },
 value: {
 fontSize: 24
 }
})
```

## Run the app

Make sure you build the app before running it on the platform of your choice. Here are the commands you need to run depending on the device.

```shell
# ios
react-native run-ios

# android
react-native run-android
```

When the app's build process is complete, it is going to run the English locales by default.

<img src='https://miro.medium.com/max/350/1*3KLq-CScY5yMp1pPnf1qjg.png' />

On changing the locale, the correct result is reflected in the app.

<img src='https://miro.medium.com/max/377/1*cURVMx8splW7SgIaLd6y_g.gif' />

## Conclusion

This completes the tutorial on how to use `react-native-localize` to add and use language translations in a React Native app.

Here is the complete code for this demo in a **[Github repo](https://github.com/amandeepmittal/rni18nDemo)**.

Checkout [Jonathan Palma's](https://twitter.com/jonathanpalma__) who wrote [a small i18n library](https://github.com/jonathanpalma/react-native-simple-i18n#readme) after being inspired from this post. Check the library here on [GitHub](https://github.com/jonathanpalma/react-native-simple-i18n#readme).

Originally published at [Heartbeat.fritz.ai](https://heartbeat.fritz.ai/how-to-use-react-native-localize-in-react-native-apps-3bb3d510f801)

---
title: 'Environment Variables in Expo and TypeScript'
slug: 'environment-variables-in-expo-managed-workflow'
date: '2021-08-04'
thumbnail: '/thumbnails/expo.png'
tag: 'expo'
canonicalUrl: 'https://amanhimself.dev/blog/environment-variables-in-expo-managed-workflow/'
---

> Updated: Apr 12, 2023

Managing different keys for different environments, such as development or production, is common among JavaScript developers. Therefore, variables defined in this file may change during development and production, but the code remains unchanged. Hence, the mechanism of the `.env` file exists.

Using Expo, there are different ways you can set up and use environment variables. My preferred method is to use the dotenv file. Environment variables defined in this file are loaded using a package called `dotenv`.

## Install dotenv

To set up environment variables in an Expo app, the initial step is to install the `dotenv` and `expo-constants` packages.

```bash
npx expo install dotenv expo-constants
```

## Rename app.json

Next, rename the `app.json` file to `app.config.js` or, if using TypeScript: `app.config.ts`, at the root of your project. Then, add the import statement to use the `dotenv` configuration. Since it's a JSON file, you will have to export all Expo configuration variables and add an `extra` object containing Environment variables.

```ts
import 'dotenv/config';

export default {
  expo: {
    // ...
    extra: {
      // Add your extra configs here
      apiKey: process.env.API_KEY
    }
  }
};
```

## Constants with expo-constants

All the keys inside the extra object are readable app-wide using `expo-constants`. An environment variable is accessible through `Expo.Constants.manifest.apiKey`.

In the case of TypeScript, use optional parameter syntax to avoid squiggly: `"Object is possibly 'undefined' or 'null'"`.

```tsx
const API_KEY = Constants?.manifest?.extra?.apiKey;
```

## More

To learn more about how to use Environment variables in an Expo project, refer to Expo's [official documentation](https://docs.expo.dev/guides/environment-variables/).

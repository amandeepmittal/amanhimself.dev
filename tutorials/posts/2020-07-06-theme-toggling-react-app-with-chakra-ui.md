---
date: 2020-07-06
title: 'How to change themes in React apps using Chakra UI'
template: post
thumbnail: '../thumbnails/react.png'
slug: theme-toggling-react-app-with-chakra-ui
categories:
  - Reactjs
tags:
  - react
---

![cover_image](https://i.imgur.com/UOcZFrw.png)

[Chakra UI](https://chakra-ui.com/) is a modular component library for React apps that uses Emotion and Styled System. While building a React app it is beneficial to take advantage of isolated UI components to speed up the building process.

The library provides a convenient way of styling components using utility props for styling. For example, a button component can be written as:

```js
<Button color="primary" textAlign="center />
```

In the post, let's create a basic theme toggling app using the default dark and light mode themes provided by the Chakra UI.

## Install the dependencies

To get started with Chakra UI, the initial step is to install the dependency that allows using this component library as well as its peer dependencies. Open a terminal window, to follow along you can create a new React project and install these dependencies.

```shell
npx create-react-app themetoggler

cd themetoggler

yarn add @chakra-ui/core@0.8.0 @emotion/core@10.0.28 @emotion/styled@10.0.27 emotion-theming@10.0.27
```

## Add a ThemeProvider

Chakra UI provides a default theme that can be leveraged to toggle between dark and light modes. Using the provider `ColorModeProvider` and `useColorMode` hook the styles of components can be switched between these two modes can be handled. The default theme can be extended.

To start, inside the `App.js` file import the following statement and return a `ThemeProvider` from the `App` component. Make sure to add the `CSSReset` component to remove all the browser's default styling. It is a recommended way according to the official documentation.

```js
import React from 'react';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
      </ColorModeProvider>
    </ThemeProvider>
  );
}
```

The `ColorModeProvider` is going to allow the user to toggle between dark and light mode. Most of the components provided in this library are dark mode compatible.

The `theme` object is where the application's color palette, font stacks, type scale, breakpoints, and so on can be defined with custom values.

Currently, if you are going to run the development server, you are going to see the default dark mode with no text inside the browser window. To start the development server, execute the command `yarn start`.

![ss1](https://i.imgur.com/rvCUHL3.png)

## Toggle between the themes

In this section let us create a new component called `ThemeToggler.js`. Create this new file inside the `src/components/` directory. If the `components/` directory does not exist, create it too.

Import the following statements.

```js
import React from 'react';
import { useColorMode, Box, IconButton } from '@chakra-ui/core';
```

The `useColorMode` hook in the React app is going to change the color mode.

The `Box` component renders an equivalent of the `div` element. It can be used to create responsive layouts as well as use styles to pass them as props. Inside the `ThemeToggler` component, the `Box` component is used to pass on style props.

The style props in the Chakra UI component library provide many shorthand variants which do add a little bit of a learning curve (_but which component library doesn't_).

To find the complete reference to Style Props, please refer to the official documentation [here](https://chakra-ui.com/style-props#style-props-reference). some of the common ones you are going to use:

- `m` for margin
- `mt` for marginTop
- `mr` for marginRight
- `p` for padding
- `pt` for paddingTop
- `pr` for paddingRight
- `py` for padding-left and padding-right

All these style prop shorthands consist are spacing CSS properties.

Add the following function component inside the `ThemeToggler` file.

```js
export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign='right' py={4} mr={12}>
      <IconButton
        icon={colorMode === 'light' ? 'moon' : 'sun'}
        onClick={toggleColorMode}
        variant='ghost'
      />
    </Box>
  );
}
```

The `IconButton` component is another convenient way to render only an icon but that has capabilities of a `Button` component to perform an action when clicked.

There is a default list of icons that Chakra UI comes with but you can [add custom icons](https://chakra-ui.com/icon#adding-custom-icons).

The `IconButton` here is going to switch between the two icons depending on the state of the current theme mode which is determined by `colorMode` property from `useColorMode` hook. The `toggleColorMode` property from the same hook helps the React app toggle between the two modes. The `variant` property on the `IconButton` itself removes any default styles.

The `variant` property without the value of `ghost` on `IconButton`.

![ss2](https://i.imgur.com/yKnYqxx.png)

The `variant` property with the value of `ghost` on `IconButton`.

![ss3](https://i.imgur.com/SrVVXuk.png)

To use this theme toggler, import it in the `App` component as shown below.

```js
// rest of the import statements
import ThemeToggler from './components/ThemeToggler';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <ThemeToggler />
      </ColorModeProvider>
    </ThemeProvider>
  );
}
```

![ss4](https://i.imgur.com/92PrFHi.png)

The value of the current theme is stored in the `localStorage` of the browser by the key of `darkMode` and is handled by the Chakra UI on its own.

![ss5](https://i.imgur.com/C3Eas5S.png)

When the theme mode toggles, the value in the `localStorage` changes as well.

![ss6](https://i.imgur.com/Mx7cgNx.gif)

## Conclusion

Any component library has its advantage when it comes to focusing on the development of a React app by leveraging the in-built components. The advantage Chakra UI's `ThemeProvider` give is to manage storing the value of the current in `localStorage`.

Source code available at [GitHub](https://github.com/amandeepmittal/blog-examples/tree/master/react/themeswitcher-chakraui).

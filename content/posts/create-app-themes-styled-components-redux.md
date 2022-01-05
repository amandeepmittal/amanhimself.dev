---
title: 'Changing app themes using React Native, Styled Components and Redux'
date: '2019-10-02'
slug: 'create-app-themes-styled-components-redux'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://blog.jscrambler.com/changing-app-themes-using-react-native-styled-components-and-redux/'
---

![cover](https://i.imgur.com/RSo1BSr.jpg)

> [Originally published at Jscrambler](https://blog.jscrambler.com/changing-app-themes-using-react-native-styled-components-and-redux/)

If you are getting into React Native or have already dipped your toes, you know that there are different ways you can style a React Native app. React Native uses JavaScript objects to style by default. If you have some experience with the CSS of the web, you know that styling a component is nothing more than writing code by using proper styling syntax.

This tutorial is going to be about styling your React Native apps using 💅 [Styled Components](https://www.styled-components.com/) and switching between two themes using Redux as state management library with it. It is a third-party open-source library. Using it is a matter of choice, but also another way to add styling to your app, and many might find it easy to use, especially if you have used this library before with other frameworks.

## Requirements

To follow this tutorial, please make sure you have the following installed on your local development environment and have access to the services mentioned below:

- Nodejs (>=`10.x.x`) with npm/yarn installed.
- `react-native-cli`
- Mac users must be running an iOS simulator.
- Windows/Linux users must be running an Android emulator.

To know more about how to setup a development environment for React Native using `react-native-cli` please refer to the [official documentation here](https://facebook.github.io/react-native/docs/getting-started).

You can find the complete code for this tutorial at [this Github repository](https://github.com/amandeepmittal/StyledThemeApp).

## Installing styled-components

Assuming that you have created a new React Native project using the command `react-native init StyledThemeApp` from a terminal window, please navigate inside the newly generated directory. When inside it, please execute the following command to install `styled-components` library.

```shell
npm install styled-components
```

_That's all you need to do to use it in your React Native app!_

Styled Components is a CSS-in-JS library that enables developers to write each component with their styles and allows the code to be in a single location. By coupling your styles with the components, it results in optimizing developer experience and output.

Let us create a simple component that will act as a primary screen of the app. Create a new file inside `screens/HomeScreen.js`. It is a class component that displays a text inside a box. The visual components are created using `styled-components`. To consume this library, you start by writing an import statement from `styled-components/native`.

```js
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.View`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid palevioletred;
`;

const Title = styled.Text`
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
  color: palevioletred;
`;

class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <TextContainer>
          <Title>Themed App with React Native & Styled Components</Title>
        </TextContainer>
      </Container>
    );
  }
}

export default HomeScreen;
```

`styled-components` utilizes tagged template literals to style your components using backtick. The `Container` and the `TextContainer` are React Native `View` and have styling attached to them. The `Title` uses `Text` from React Native. The `styled-components` library uses the same `flexbox` model that React Native Layouts. The advantage here is that you get to write styles in the same understandable syntax that you have been using in web development and standard CSS.

Import the `HomeScreen` component inside the entry point file, `App.js`. Replace its existing content with the following.

```js
import React from 'react';

import HomeScreen from './screens/HomeScreen';

const App = () => {
  return <HomeScreen />;
};

export default App;
```

Open the app in a simulator. You can execute either of the commands from the terminal window depending on the mobile platform you are using.

```shell
# for ios
react-native run-ios

# for android
react-native run-android
```

You will get the following result.

![ss1](https://i.imgur.com/4IsQKiW.png)

## Define Themes

In the current React Native app, you have are going to make use of the classic example of a dark and a light mode.

Create a new file called `/styles/theme.js`. It is going to contain the style attributes that are going to be changed when setting a theme at the run time.

These attributes are nothing but colors for different React Native components. In a later section, using `props` from `styled-components` you learn how to extend the current styles of `HomeScreen` component.

```js
export const darkTheme = {
  mode: 'dark',
  PRIMARY_BACKGROUND_COLOR: '#353c51',
  PRIMARY_TEXT_COLOR: '#767d92',
  SECONDARY_TEXT_COLOR: '#ffffff',
  PRIMARY_BUTTON_COLOR: '#152642',
  SECONDARY_BUTTON_COLOR: '#506680'
};
export const lightTheme = {
  mode: 'light',
  PRIMARY_BACKGROUND_COLOR: '#ffefd5',
  PRIMARY_TEXT_COLOR: '#DB7093',
  SECONDARY_TEXT_COLOR: '#333333',
  PRIMARY_BUTTON_COLOR: '#b9d6f3',
  SECONDARY_BUTTON_COLOR: '#a1c9f1'
};
```

## Adding Redux

To manage to switch between two themes, let us use Redux. With the help of this state management library, you are going to create a store that will keep an initial value of a theme. Redux will help to change switch between two themes (_defined in the previous section_) at the run time. This means you do not have to hard code these values every time you want to add a new theme. Every time a theme is changed, the component or the screen will be re-rendered to display the new style attributes.

First, you will have to install the following libraries to create a store.

```shell
yarn add redux react-redux redux-thunk
```

Apart from `redux`, the other two packages have important uses. `react-redux` lets your React Native components connect with the Redux store. `redux-thunk` is a middleware that enables you to make Redux actions return asynchronous operations. A `thunk` is a function that wraps an expression to delay its evaluation.

## Creating actions and reducer

In Redux, the state of the whole application is represented by one JavaScript object. Think of this object as read-only, since you cannot make changes to this state (which is represented in the form of a tree) directly. That is what `actions` are for.

Actions are like events in Redux. They can be triggered in the form of a user's touch on a button, key presses, timers, or network requests. The nature of each event mentioned is mutable. An action is a JavaScript object. To define an action, there’s one requirement. Each action has its type property. Every action needs a type property for describing how the state should change.

Create a new folder called `redux` in the root of your project. This directory is going to contain all the files related to Redux. To define an action, create a new file called `action.js` inside this folder.

There is the only action required right now called `switchTheme`. It will accept one parameter, the value of the theme.

```js
// define type
export const SWITCH_THEME = 'SWITCH_THEME';

// dispatch actions
export const switchTheme = BaseTheme => {
  return dispatch => {
    dispatch({
      type: SWITCH_THEME,
      baseTheme: BaseTheme
    });
  };
};
```

To change the state of the app when using Redux, or in our case, to change the state of the value of the theme, dispatching the theme from the action `switchTheme` is the only way.

Next, let us define `themeReducer` that will take the initial state of the application's theme and action to change that theme.

```js
import { lightTheme } from '../styles/theme';
import { SWITCH_THEME } from './actions';

const initialState = {
  theme: { ...lightTheme }
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      let newState = {
        ...state,
        theme: { ...state.theme, ...action.baseTheme }
      };
      return newState;
    default:
      return state;
  }
};

export default themeReducer;
```

A reducer is a pure function that calculates the next state based on the initial or previous state. It always produces the same output if the state is unchanged. In the above snippet, the current state of this application is the light theme. This theme will change whenever the user is going to press the button to switch it to the dark theme.

## Creating Store

To create the store, you will have to modify the `App.js` file. Start by adding the following import statements.

```js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import themeReducer from './redux/themeReducer';
import HomeScreen from './screens/HomeScreen';
```

A store is an object that brings actions and reducers together. It provides and holds state at the application level instead of individual components. Redux is not an opinionated library in terms of which framework or library should use it or not.

Next, create the following store.

```js
const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);
```

To bind a React Native application with Redux, you do it with `react-redux` module. This is done by using the high ordered component `Provider`. It basically passes the store down to the rest of the React Native application.

```js
const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};
```

## Updating HomeScreen Component

In this section, you are going write the logic to consume the state from redux's store as well as make use of `ThemeProvider`.

`styled-components` has gives React Native components theming support by a `ThemeProvider` wrapper component. In the render tree all `styled-components` such as `Container`, `Title` and so on, will have access to the provided theme. Open `HomeScreen.js` file adds the following import statements.

```js
import styled, { ThemeProvider } from 'styled-components/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTheme } from '../redux/actions';
import { darkTheme, lightTheme } from '../styles/theme';
```

In the above code snippet, do note that you are also importing both the theme objects from `styles/theme.js` file. This is necessary because, initially, you will have to pass a theme value for `ThemeProvider` to know and display the components accordingly. Then, the redux action `switchTheme` that is responsible for the change theme, expects a parameter of the current theme value.

Next, modify the render function inside the `HomeScreen` component. Wrap all of its previous contents inside `ThemeProvider` wrapper and then add a new component called `Button` which will be display the contents to change the current theme.

```js
class HomeScreen extends React.Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Container>
          <TextContainer>
            <Title>Themed App with React Native & Styled Components</Title>
          </TextContainer>
          {this.props.theme.mode === 'light' ? (
            <Button onPress={() => this.props.switchTheme(darkTheme)}>
              <ButtonText>Switch to Dark Theme</ButtonText>
            </Button>
          ) : (
            <Button onPress={() => this.props.switchTheme(lightTheme)}>
              <ButtonText>Switch to Light Theme</ButtonText>
            </Button>
          )}
        </Container>
      </ThemeProvider>
    );
  }
}
```

Now, a question you may ask, how come `this.props.theme` & `this.props.switchTheme` are available to the above component. In `App.js`, which is the parent component for `HomeScreen`, is not passing any props down the component tree.

Well, from the previous import statements, you are importing two important Redux methods: `bindActionCreators` and `connect`. The bindActionCreators maps actions to an object using the names of the action functions. These functions automatically dispatch the action to the store when the function is invoked. As we learned earlier, to change the data, we need to dispatch an action.

To enable this, you further need two things: `mapStateToProps` and `mapDispatchToProps`. You have to connect both of them with `HomeScreen` component. This connection is done by using the `connect()` method from the `react-redux` package which connects the current React Native component to the Redux store.

Add the following at the end of component file:

```js
const mapStateToProps = state => ({
  theme: state.themeReducer.theme
});

const mapDispatchToProps = dispatch => ({
  switchTheme: bindActionCreators(switchTheme, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
```

## Using Props in styled-components

By passing an interpolated function `${props => props...}` to a styled component's template literal you can extend that component's styles. Take a look at the following code snippet, and modify the styles wherever necessary.

```js
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.View`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.PRIMARY_TEXT_COLOR};
`;

const Title = styled.Text`
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.PRIMARY_TEXT_COLOR};
`;

const Button = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${props => props.theme.SECONDARY_BUTTON_COLOR};
  border-radius: 5px;
  padding: 10px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.SECONDARY_TEXT_COLOR};
`;
```

Now, go to the simulator running and you will notice a new button with a text that says `Switch to ...` name of the next theme. If you have been following this tutorial, you will notice that the initial or current theme is the light mode. By pressing the button, you can switch to the dark mode.

![ss2](https://i.imgur.com/W6offhJ.gif)

## Conclusion

_Congratulations!_ You have successfully integrated redux and styled-components in a React Native app to create style attributes for React Native and manage themes. Using `props` in styled-components you learned how to manage and write composable components. This is just one of the way to create a themeable React Native app.

To dwell more into styled-components, please refer to the official documentation [**here**](https://www.styled-components.com/docs/basics#react-native).

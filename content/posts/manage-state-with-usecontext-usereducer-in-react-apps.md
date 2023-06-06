---
title: 'How to manage state in React apps with useReducer and useContext hooks'
date: '2020-11-06'
slug: 'manage-state-with-usecontext-usereducer-in-react-apps'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://amanhimself.dev/blog/manage-state-with-usecontext-usereducer-in-react-apps/'
---

![cover](https://i.imgur.com/Q0W4kzf.jpg)

Choosing a state management library to manage and handle a global state in a React app can be tricky and time-consuming. A lot depends on the scope of the React app and there are many options available.

With the adaption of React Hooks API, one such option is to use a combination of `useReducer` hook and the Context API. In this post, let's take a look at how to manage global state in a React app using both of them.

## Prerequisites

To take full advantage of this tutorial, or run along with the example, please make sure you following installed/access to in your local development environment.

- Node.js version >= `12.x.x `installed
- have access to one package manager such as `npm` or `yarn`
- `create-react-app` cli installed or use `npx`
- basics of React Hooks

If you are not familiar with React Hooks, I recommend you to go through the [in-depth post on React hooks here](https://amanhimself.dev/blog/react-app-with-localstorage-api-and-hooks).

## State management in React apps with useReducer

There are two types of states to deal with in React apps. The first type is the local state that is used only within a React component. The second type is the global state that can be shared among multiple components within a React application.

With the release of Context API as well as Hooks API, implementing a global state is possible without installing any additional state management library. The `useReducer` hook is a great way to manage complex state objects and state transitions. You may have seen or used `useState` to manage [simple or local state](https://amanhimself.dev/blog/react-app-with-localstorage-api-and-hooks) in React apps.

The `useReducer` hook is different from `useState`. The main advantage it has over `useState` is that covers the use case when there is a need of handling complex data structures or a state object that contains multiple values. It updates the state by accepting a reducer function and an initial state. Then, it returns the actual state and a dispatch function. This dispatch function is used to make changes to the state.

## Create a new React app & installing dependencies

To get started, create a new React project by executing the following command in a terminal window:

```shell
npx create-react-app react-expense-tracker

cd react-expense-tracker
```

To focus on the main topic of this tutorial as well as to give the demo app a nice look and feel, let's use pre-defined components from [Reactstrap](https://reactstrap.github.io/). It provides Bootstrap 4 components that are based on Flexbox and useful to handle the layout of a web app. To get started using Bootstrap in a React app, install the following dependencies:

```shell
yarn add bootstrap@4.5.0 reactstrap@8.5.1 uuid@8.2.0
```

After installing these dependencies, open the React project you created and open the file `index.js`. Add an import statement to include the Bootstrap CSS file.

```js
// after other imports
import 'bootstrap/dist/css/bootstrap.min.css';
```

That's it to set up Bootstrap in the current React app.

## Defining a global state

Start by creating a new file called `GlobalState.js` inside the `src/` directory.

Let's use React's context API to create a Context provider that can is going to share the state across multiple components. You can think of this example as mimicking Redux' philosophy. Import the required statements.

```js
import React, { useReducer, createContext } from 'react';
import { v4 as uuid } from 'uuid';
```

Next, create an empty context for Expense and define an initial state object. This initial state is going to have one expense item present. This also helps to define a schema or data model for all other expense items (_but do note that this for demonstration purpose in context to this post_).

```js
export const ExpenseContext = createContext();

const initialState = {
  expenses: [
    {
      id: uuid(),
      name: 'Buy Milk',
      amount: 10
    }
  ]
};
```

Then define a function called `reducer`. It is going to take two arguments, the current state and action. This reducer's job is to modify or update the state object whenever there is an action taken within the app by the user. One example of an action is a user adding an expense.

For the following example, this `reducer` function is going to have one action type, which is to add the expense. If there are no changes or modifications, this `reducer` function is going to return the current state (_which is the default case_).

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        expenses: [...state.expenses, action.payload]
      };
    default:
      return {
        state
      };
  }
};
```

Next, define an `ExpenseContextProvider` that is going to behave like a store (_as a store in [Redux](https://amanhimself.dev/blog/redux-with-react-native-hooks)_).

```js
export const ExpenseContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ExpenseContext.Provider value={[state, dispatch]}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
```

The `useReducer` hook allows us to create a reducer using the `reducer` function defined previously. The `initialState` is passed as the second argument.

## Wrap the App with the provider

When the `ExpenseContextProvider` is wrapped around any component in the React app, that component and its children will be able to access the current state as well as modify the state object.

In this section, that's what we are going to do. Open, `App.js` file, and modify it as below.

```js
import React from 'react';
import { Container } from 'reactstrap';

import { ExpenseContextProvider } from './GlobalState';

import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';

export default function App() {
  return (
    <ExpenseContextProvider>
      <Container className="text-center">
        <Header />
        <Form />
        <List />
      </Container>
    </ExpenseContextProvider>
  );
}
```

In the next sections, let us create other components that are children to this `App` component. Create a `components/` directory and then create three new component files:

- `Header.js`
- `Form.js`
- `List.js`

## Add the header of the app

In this section, let us define a presentational component called `Header`. It's going to be a simple jumbotron component from Bootstrap displaying the title of the app and the logo.

Open `Header.js` and add the following snippet:

```js
import React from 'react';
import { Jumbotron } from 'reactstrap';
import Logo from '../logo.svg';

export default function Headers() {
  return (
    <Jumbotron fluid>
      <h3 className="display-6">
        Expense Tracker React App
        <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
      </h3>
    </Jumbotron>
  );
}
```

## Add a form component

Open `Form.js` file and import the following statements.

```js
import React, { useState, useContext } from 'react';
import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button
} from 'reactstrap';
import { v4 as uuid } from 'uuid';

import { ExpenseContext } from '../GlobalState';
```

The `uuid` module is going to generate a unique id for each expense item in the global state.

Define a `Form` component that is going to access values from `ExpenseContext` using `useContext` hook.

```js
export default function Form() {
  const [state, dispatch] = useContext(ExpenseContext);

  //...
}
```

Using the `useState` reducer, define two state variables that are going to be local to this component. These state variables are going to help us define controlled input fields. A controlled input field accepts its current value as a prop as well as a callback to change that value.

Add the following initial state for `name` and `amount` using `useState`. Both of them are going to have an empty string as their initial value.

```js
const [name, setName] = useState('');
const [amount, setAmount] = useState('');
```

To update their values when a user starts typing, add the following handler methods. Both of these functions are going to retrieve the value from the corresponding field. The console statements are for testing purposes.

```js
const handleName = event => {
  console.log('Name ', event.target.value);
  setName(event.target.value);
};

const handleAmount = event => {
  console.log('Amount ', event.target.value);
  setAmount(event.target.value);
};
```

Lastly, to submit the form, there is going to be another handler method called `handleSubmitForm`. This method when triggered is going to dispatch the action to add the expense (`ADD_EXPENSE`). This is how the `reducer` function in the global state updates the state.

```js
const handleSubmitForm = event => {
  event.preventDefault();
  if (name !== '' && amount > 0) {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: { id: uuid(), name, amount }
    });

    // clean input fields
    setName('');
    setAmount('');
  } else {
    console.log('Invalid expense name or the amount');
  }
};
```

Lastly, add the following JSX to display the component.

```js
return (
  <BTForm style={{ margin: 10 }} onSubmit={handleSubmitForm}>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        Name of Expense
      </Label>
      <Col sm={4}>
        <Input
          type="text"
          name="name"
          id="expenseName"
          placeholder="Name of expense?"
          value={name}
          onChange={handleName}
        />
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        Amount
      </Label>
      <Col sm={4}>
        <Input
          type="number"
          name="amount"
          id="expenseAmount"
          placeholder="$ 0"
          value={amount}
          onChange={handleAmount}
        />
      </Col>
    </FormGroup>
    <Button type="submit" color="primary">
      Add
    </Button>
  </BTForm>
);
```

## Display a list of items

In this section, let's add the `List.js` component to display a list of items from the current state object provided by the `ExpenseContext`. Open the file and add the following import statements:

```js
import React, { useContext } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { ExpenseContext } from '../GlobalState';
```

Next, map the `state` value to display the name of the expense and the amount of the expense as a list item.

```js
export default function List() {
  const [state] = useContext(ExpenseContext);
  return (
    <ListGroup>
      {state.expenses.map(item => {
        return (
          <ListGroupItem key={item.id}>
            {item.name} - $ {item.amount}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
```

## Running the app

All the components of the simple Expense Tracker app are complete. Now, let's run the app and see it as an action. On the initial render, the Rect app is going to look like below.

![ss1](https://i.imgur.com/KrlTYS6.png)

It is going to display one expense item that is defined as the object in the initial state. Try adding a new item in the list and see if the list updates and form gets cleared or not.

![ss2](https://i.imgur.com/92qztPT.gif)

## Conclusion

Using `useReducer` in conjunction with React's Context API is a great way to quickly get started with managing your state. However, some caveats come with React's Context API. Re-rendering of multiple components unnecessarily can become a huge problem and its something you should take care.

---
title: 'Build an Expense Tracker app with React Hooks and LocalStorage API'
date: '2020-03-11'
slug: 'react-app-with-localstorage-api-and-hooks'
thumbnail: '/thumbnails/react.png'
tag: 'reactjs'
canonicalUrl: 'https://blog.crowdbotics.com/build-a-react-app-with-localstorage-api-and-hooks/'
---

Hooks in React have been available since the version 16.7.0-alpha. They are functions that allow you to use React state and a component's lifecycle methods in a functional component. Hooks do not work with classes. If you are familiar with React, you know that the functional component has been called as a functional stateless component. Not any more.

Since previously, only a class component allowed you to have a local state. Using Hooks, you do not have to refactor a class component when using React or React Native into a functional component only because you want to introduce local state or lifecycle methods in that component. In other words, Hooks allow us to write apps in React with functional components.

In this tutorial, you are going to build a small Expense Tracker app that using React Hooks. Furthermore, to add real-time functionality, you are going to learn how to use `localStorage` API in a React application.

## What are we building?

Here is a demo of how the end result of this tutorial will look like.

![ss10](https://crowdbotics.ghost.io/content/images/2019/09/ss10.gif)

## Table of Contents

- Requirements
- Setup Bootstrap
- Implementing Hooks in a React app
- Building the Expense Tracker App
- Add input fields
- Add a list to display expenses
- Handling controlled input fields
- Handling Form submission
- Adding localStorage API to persist data
- Adding side-effects
- Deleting all items from the list
- Conclusion

## Requirements

In order to follow this tutorial, you are required to have the following installed on your dev machine:

- NodeJS above `10.x.x` installed on your local machine
- Know, how to run simple npm/yarn commands
- JavaScript/ES6 and React basics

## Setup Bootstrap

Bootstrap 4 uses `flexbox` to handle the layout of a web app. In order to get started using Bootstrap in a React app, you have first to create a react app.

```shell
npx create-react-app react-expense-tracker
```

Next, install the following libraries to add Bootstrap. I am going to use [reactstrap](https://reactstrap.github.io/) that offers built-in Bootstrap 4 components. Reactstrap does not include Bootstrap CSS, so it needs to be installed.

```shell
yarn add bootstrap reactstrap
```

After installing these dependencies, open the React project you created and open the file `index.js`. Add an import statement to include Bootstrap CSS file.

```js
// after other imports
import 'bootstrap/dist/css/bootstrap.min.css';
```

The last step is to test and verify that `reactstrap` components are available to the current React app. Let us add a simple button. Open `App.js` file and import both `Container` and `Button` components from `reactstrap`. A `Container` is a layout component.

```js
import React from 'react';
import { Button, Container } from 'reactstrap';

function App() {
  return (
    <Container style={{ marginTop: 20 }}>
      <Button color="success">Let's start</Button>
    </Container>
  );
}

export default App;
```

Now, go back to the terminal window and run `yarn start`. You will see similar results in the browser window on the URL `http://localhost:3000`.

![ss1](https://crowdbotics.ghost.io/content/images/2019/09/ss1-1.png)

That's it for setting up Bootstrap 4 in a React app.

## Implementing Hooks in a React App

In this section, you are going to learn how to use `useState` hook to define an initial state to a React component. Open `App.js` file and start by importing `useState` from React core. All built-in hooks can be imported this way.

```js
import React, { useState } from 'react';
```

The `useState` hook returns two values in an array. The first value is the current value of the state object and the second value in the array is a function to update the state value of the first. This why the second value starts with a conventional prefix of `set`. Although you can make it anything but following conventions that are commonly used in the React world is a good practice to follow.

Hooks are always called at the top level of function. Meaning when defining a state, they must be the first thing in the function, especially before returning a JSX. Let us implement a classic example of incrementing and decrementing an initial value of `0`. Inside the `App` function, define the following.

```js
const [count, setCount] = useState(0);
```

React preserves this state between all the re-rendering happening. `useState()` hook also takes a single argument that represents the initial state. Here is the code of the complete `App` function.

```js
function App() {
  const [count, setCount] = useState(0);

  return (
    <Container style={{ marginTop: 20 }}>
      <p className="text-primary">You clicked {count} times.</p>
      <Button onClick={() => setCount(count + 1)} color="success">
        Increase the count
      </Button> <Button onClick={() => setCount(count - 1)} color="danger">
        Decrease the count
      </Button>
    </Container>
  );
}
```

Make sure that `yarn start` is running and go the browser window to see this component in action. Click on any of the button to increase or decrease the count's value.

![ss2](https://crowdbotics.ghost.io/content/images/2019/09/ss2.gif)

It works!

## Building the Expense Tracker App

The Expense Tracker React application you are going to build going to contain two input fields that will contain the expense cause or the name of the expense and amount of that expense. It will also be going to show the total amount of all expenses below a list of individual expenses. These are the main functionalities you have to implement first.

To get started, let us define an initial array that is going to store the value of each expense and the name or the title of the expense. Then, using this array with `useState` you can render to the total amount of all expenses. Open `App.js` file and define an object `ALL_EXPENSES` as below.

```js
const ALL_EXPENSES = [
  { id: 1, name: 'Buy a book', amount: 20 },
  { id: 2, name: 'Buy a milk', amount: 5 },
  { id: 3, name: 'Book a flight ticket', amount: 225 }
];
```

The `App` function is going to be simple since there are now handler functions to modify or add a new expense for now. Define the state `expenses` with its initial value being all the expenses stored in `ALL_EXPENSES`. Then, using `array.reduce`, you calculate the sum of all the expenses.

```js
import React, { useState } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import Logo from './logo.svg';

const ALL_EXPENSES = [
  { id: 1, name: 'Buy a book', amount: 20 },
  { id: 2, name: 'Buy a milk', amount: 5 },
  { id: 3, name: 'Book a flight ticket', amount: 225 }
];

function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES);

  return (
    <Container className="text-center">
      <Jumbotron fluid>
        <h3 className="display-6">
          Expense Tracker React App
          <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
        </h3>
        <div>
          <p>
            Total Expense:{' '}
            <span className="text-success">
              ${' '}
              {expenses.reduce((accumulator, currentValue) => {
                return (accumulator += parseInt(currentValue.amount));
              }, 0)}
            </span>
          </p>
        </div>
      </Jumbotron>
    </Container>
  );
}

export default App;
```

The `reduce()` method executes a function to output a single value from all the individual values from an array. In the current case, you have to calculate the total sum of all the `amount` in `ALL_EXPENSES` array. This method executes a callback that takes two arguments once for each assigned value present in the array.

The first argument, `accumulator` returns the value of the previous invocation of the callback. If the callback hasn't invoked yet, provide an initial value (_in the current scenario_) such that the `accumulator` will be equal to it on the first iteration. On the initial run of the callback, the `currentValue` is going to be equal to the first value of the array. As this callback will run for each of value in the array, on the second iteration, the `accumulator` is equal to the `currentValue` of the first or initial iteration. That is going to be the first value in the array. Also, on the second iteration, the `currentValue` will be equal to the second value in the array. The process continues. To read more about how `reduce()` works, visit this [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

Now, if you go to the browser window, you will get the following result.

![ss3](https://crowdbotics.ghost.io/content/images/2019/09/ss3-1.png)

## Add input fields

The application currently requires two input fields and a button. Both the input field are going to represent the name of the expense and the amount of each expense. The button is going to add these expenses to the list of all expenses (_which still needs to be created_). Let us set up a new component inside `components` within a new file called `Form`.

```js
import React from 'react';

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button
} from 'reactstrap';

const Form = () => (
  <BTForm style={{ margin: 10 }}>
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
        />
      </Col>
    </FormGroup>
    <FormGroup className="row">
      <Label for="exampleEmail" sm={2}>
        $ Amount
      </Label>
      <Col sm={4}>
        <Input
          type="number"
          name="amount"
          id="expenseAmount"
          placeholder="0.00"
        />
      </Col>
    </FormGroup>
    <Button type="submit" color="primary">
      Add
    </Button>
  </BTForm>
);

export default Form;
```

You will notice how helpful UI library such as `reactstrap` is going to be at the end of this section to serve the purpose of displaying a form, rather than adding your own CSS. Also, note that both the input fields are of a different type. The name of the expense is of type `text` whereas the amount of the expense is type `number`.

Import this component in the `App.js` file.

```js
// after other imports...
import Form from './components/Form';

function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES);

  return (
    <Container>
      <Jumbotron fluid>
        <h3 className="display-6 text-center">
          Expense Tracker React App
          <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
        </h3>
        <div className="text-center">
          <p>
            Total Expense:{' '}
            <span className="text-success">
              ${' '}
              {expenses.reduce((accumulator, currentValue) => {
                return (accumulator += parseInt(currentValue.amount));
              }, 0)}
            </span>
          </p>
        </div>
        {/* ADD THE BELOW LINE */}
        <Form />
      </Jumbotron>
    </Container>
  );
}

export default App;
```

In the browser window, you will get the following result.

![ss4](https://crowdbotics.ghost.io/content/images/2019/09/ss4.png)

## Add a list to display expenses

Let us setup another component that is going to display a list of expense items with their corresponding amount. To display the item in the list, items from array `ALL_EXPENSES` are going to be used since it will serve as some mock data for now.

Create a file `List.js` and use UI components `ListGroup` and `ListGroupItem` to create an unordered list.

```js
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const List = ({ expenses }) => (
  <div>
    <ListGroup>
      {expenses.map(item => (
        <ListGroupItem key={item.id}>
          {item.name} - $ {item.amount}
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default List;
```

Import this component in `App.js` file. In the above snippet, you will notice that it accepts one prop: `expenses`. This refers to the `ALL_EXPENSES` array from the initial value of `useState` hook.

```js
// after other impors
import List from './components/List';

function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES);

  return (
    <Container>
      <Jumbotron fluid>
        <h3 className="display-6" className="text-center">
          Expense Tracker React App
          <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
        </h3>
        <div className="text-center">
          <p>
            Total Expense:{' '}
            <span className="text-success">
              ${' '}
              {expenses.reduce((accumulator, currentValue) => {
                return (accumulator += parseInt(currentValue.amount));
              }, 0)}
            </span>
          </p>
        </div>
        <Form />
        {/* ADD THE BELOW LINE */}
        <List expenses={expenses} />
      </Jumbotron>
    </Container>
  );
}
```

Visiting the browser window will yield the following list.

![ss5](https://crowdbotics.ghost.io/content/images/2019/09/ss5.png)

## Handling controlled input fields with Hooks

In this section, let us manage to convert both the static input fields which are as of right now, of no use, into usable controlled input fields. A **controlled input field** accepts its current value as a prop as well as a callback to change that value.

Of course, you are going to use Hooks to do this. Add the following initial state for `name` and `amount` use `useState()` inside `App` component. Both of them are going to have an empty string as their initial values.

```js
const [name, setName] = useState('');
const [amount, setAmount] = useState('');
```

To update their values when a user starts typing, add the following handler methods. Both of these functions are going to retrieve the value from the corresponding field. The `console` statements are for testing purpose.

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

Lastly, to submit the form, there is going to be another handler method called `handleSubmitForm`.

```js
const handleSubmitForm = event => {
  event.preventDefault();
  // do something when submitting the form
};
```

Right now, it doesn't have business logic to add the expense to the list. It is just preventing the form from refreshing the whole page in submission using `event.preventDefault()`.

All of these have to be passed as props to the `Form` component. Modify it.

```js
<Form
  name={name}
  amount={amount}
  handleName={handleName}
  handleAmount={handleAmount}
  handleSubmitForm={handleSubmitForm}
/>
```

Next, open `Form.js` file and destructor the props as well as update both the input fields with attributes such as `value` and `onChange` method.

Here is how the modified `Form.js` component looks like.

```js
import React from 'react';

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button
} from 'reactstrap';

const Form = ({ name, amount, handleName, handleAmount, handleSubmitForm }) => (
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
        $ Amount
      </Label>
      <Col sm={4}>
        <Input
          type="number"
          name="amount"
          id="expenseAmount"
          placeholder="0.00"
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

export default Form;
```

Now, go to the browser window. Make sure to open **Console** tab from the **Developer Tools**. Start typing into an input field, and you will see the console statement corresponding to a particular input fields triggers.

![ss6](https://crowdbotics.ghost.io/content/images/2019/09/ss6-1.gif)

## Handling Form submission

In this section, you are going to add the logic to handle the form submission. Start by adding an `if/else` statement to check whether the first input field `name` is not empty, and the second input field `amount` is not a negative value.

Next, create a single `expense` object that takes the current value of `name` and `amount` input fields. Now the hard part. Right now, the `expenses` array has already an initial value with three individual expense objects. If you are going to add to that array, you will have to take care of not override the previous expense objects in that array. _Spread_ operator to the rescue.

```js
const handleSubmitForm = event => {
  event.preventDefault();
  //check whether the name is not empty and the amount is not negative
  if (name !== '' && amount > 0) {
    // single expense object
    const expense = { name, amount };
    // do not override previous values in the array
    // use spread operator to access previous values
    setExpenses([...expenses, expense]);

    // clean input fields
    setName('');
    setAmount('');
  } else {
    console.log('Invalid expense name or the amount');
  }
};
```

Lastly, you have to clear both the input fields after the form submission. Set them back to their initial values, that is, empty strings.

Go the browser window and try adding a few items. Do notice that the **Total Expense** gets an update after each form submission.

![ss7](https://crowdbotics.ghost.io/content/images/2019/09/ss7.gif)

On the empty submission, it will trigger the `else` clause. To see it in action, make sure you have **Console** tab from **Developer Tools** open.

![ss8](https://crowdbotics.ghost.io/content/images/2019/09/ss8.gif)

## Adding localStorage API to persist data

Right now, there is a way to persist these values permanently since all you are using a mock array to display and add new expenses. Using `localStorage()` API let us add the functionality to save all the expenses that the user adds to the list.

The `localStorage` API allows you to access a `Storage` object that is the stored data saved across browser sessions.

Each expense value you are going to store in the `localStorage` API is going to be a string so make sure you understand the difference between `JSON.stringify()` and `JSON.parse()`.

Replace the current mock `ALL_EXPENSES` with the following conditional operator.

```js
const ALL_EXPENSES = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];
```

Using the method `getItem()` from the `localStorage` API you can read any value stored. However, right now, there is no value stored so it is going to be an empty array. You can verify this by opening **Developer Tools** > **Application** > **Storage** > **LocalStorage** > **https://localhost:3000**.

![ss9](https://crowdbotics.ghost.io/content/images/2019/09/ss9.png)

## Adding side-effects

Using the hook `useEffect` you can handle lifecycle methods directly inside the functional components. By default, it runs after every render including the initial render, but you can control that behavior by passing _dependencies_ in an array. If dependency being passed changes or gets an update, then only it will run.

Import the `useEffect` app from React in `App.js` file.

```js
import React, { useState, useEffect } from 'react';
```

Inside this `useEffect` function you are going to use `localStorage.setItem()` to store the expenses. It accepts two parameters. First is going to be a callback function and second is going to the _dependency_.

This dependency is going to be the `expenses` from the state. Basically, you are saying that, whenever there is an update to the initial value of the `expenses`, run the `useEffect` method.

Add the following after other handler methods.

```js
useEffect(() => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}, [expenses]);
```

Make sure the key (`expenses`) you are passing in `setItem()` is the same as the key whose value you are getting using `getItem`.

The `useEffect` is still going to run after the initial render but won't run after that until there is a change in the value of `expenses`.

See the demo below.

![ss10](https://crowdbotics.ghost.io/content/images/2019/09/ss10-1.gif)

Notice that it works. If you refresh the browser window, the list stays as it is.

![ss11](https://crowdbotics.ghost.io/content/images/2019/09/ss11.gif)

## Deleting all items from the list

This is a small section in which you are going to add the functionality of clearing the whole list of expenses with a single button click. To do so, create a handler method and inside it, set the initial value of the `expenses` to an empty array.

Open `App.js` file and add this:

```js
const handleClearExpenses = () => {
  setExpenses([]);
};
```

Pass it as a prop to the `Form` component.

```js
<Form
  name={name}
  amount={amount}
  handleName={handleName}
  handleAmount={handleAmount}
  handleSubmitForm={handleSubmitForm}
  handleClearExpenses={handleClearExpenses}
/>
```

Next, edit the `Form.js` file and add a new button to delete the list of items. Do not forget to destructor the new prop `handleClearExpenses`.

```js
import React from 'react';

import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Col,
  Button
} from 'reactstrap';

const Form = ({
  name,
  amount,
  handleName,
  handleAmount,
  handleSubmitForm,
  handleClearExpenses
}) => (
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
        $ Amount
      </Label>
      <Col sm={4}>
        <Input
          type="number"
          name="amount"
          id="expenseAmount"
          placeholder="0.00"
          value={amount}
          onChange={handleAmount}
        />
      </Col>
    </FormGroup>
    <Button type="submit" color="primary">
      Add
    </Button>{' '}
    <Button type="submit" color="danger" onClick={handleClearExpenses}>
      Delete
    </Button>
  </BTForm>
);

export default Form;
```

Notice, that right now there are three items in the list, as shown below.

![ss12](https://crowdbotics.ghost.io/content/images/2019/09/ss12.png)

On clicking the delete button will erase all the items from the localstorage.

![ss13](https://crowdbotics.ghost.io/content/images/2019/09/ss13.gif)

## Conclusion

_Congratulations 🎉_

You have just learned the basics of React hooks and how to implement them in a real-time application. Also, using `localStorage` API is easy. I hope you had fun and gained something useful out of this tutorial. Go ahead, and try to extend this app by adding features like:

- editing a single item in the list
- deleting a single item in the list
- adding a uniquely generated id for each item

To learn more about React hooks, I can highly recommend following React official documentation [**here**](https://reactjs.org/docs/hooks-effect.html).

_Originally published at [Crowdbotics' Blog](https://crowdbotics.ghost.io/build-a-react-app-with-localstorage-api-and-hooks/)_.

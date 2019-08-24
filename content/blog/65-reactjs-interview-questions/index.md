---
slug: reactjs-interview-questions
date: 2018-09-29
title: 'ReactJS Interview Questions'
categories: ['reactjs']
description: '---'
published: true
author: 'Aman Mittal'
banner:
---

1. What is used to change the state of a React component?
   setState() and forceUpdate(). Both forceUpdate() and setState() are called within a React Component. Both of these functions tell React to re-render the component.

2. What is Virtual DOM in ReactJS? Is it a valid JavaScript Object?
   Yes, virtual DOM is a JavaScript object which initially is just the copy of the real DOM. It is a node tree that lists the elements, their attributes, and content as Objects and their properties. The render function is used to create a tree of nodes out of the React components.

3. What are props?
   Props are the shorthand for Properties in React. They are read-only components. They are always passed down from the parent to the child components throughout the application.

4. Can a child component send a prop back to the parent?
   A child component can never send a prop back to the parent component. This help in maintaining the unidirectional data flow and are generally used to render the dynamically generated data.

5. When is componenDidMount lifecycle method is called?
   This method is executed after the first rendering and only on the client side.

6. What is the difference between a class component and a function component?
   A Functional Component cannot have state or access to lifecycle methods whereas a class component in React can have access to state and lifecycle methods.

7. What are Stateless Components in React?
   Stateless components are also known as the functional component in React. When a component is “stateless”, it never mutates the state. With the same inputs, it will always produce the same output. It means it has no knowledge of the past, current or future state changes.

8. What are callback refs?
   Callback refs are the recommended way of using refs by React. Instead of passing a ref attribute, you pass a function and give it control over setting and unsetting of a ref. You should avoid using string refs and inline ref callbacks.

9. What is the process of re-rendering a tree of UI components in React called?
   It is called Lifecycle methods or hooks. They are special functions provided by React API that help to manipulate a react component by inserting or removing a code snippet when the component itself mounts, updates, or unmounts.

10. Is it true that Virtual DOM in react manipulates real DOM?
    Yes. React creates a virtual DOM. When state changes in a component it firstly runs a “diffing” algorithm, which identifies what has changed in the virtual DOM. The second step is reconciliation, where it updates the DOM with the results of diff.

11. What is flux?
    Flux is an architectural pattern which enforces the uni-directional data flow. It controls derived data and enables communication between multiple components using a central Store which has authority for all data. Any update in data throughout the application must occur here only. Flux provides stability to the application and reduces run-time errors.

12. What is a high order component?
    A higher-order component is a function that takes a component and returns a new component. HOC’s allow you to reuse code, logic and bootstrap abstraction.

13. Which Lifecycle Method can be used to make an AJAX request from a React Component?
    componentDidMount() is where AJAX requests and DOM or state updates usually occurs. This method is also used for integration with other JavaScript frameworks.

14. Can you use ref inside a functional component?
    No, you cannot use ref inside a functional component since functional components are stateless and they produce the same output. However, ref attribute is used to get the reference to a DOM node or an instance of a component in React and then manipulate its instance.

15. What is used to pass a ref from a parent component its child component?
    React.forwardRef which is also known as Ref forwarding. It is a technique for automatically passing a ref through a component to one of its children.

16. What is the most common way to fetch data from an API in a React Component?
    Axios is a Javascript library used to make HTTP requests or XMLHttpRequests from the browser that also supports the ES6 Promise API.

17. What is React Fiber?
    It is an experimental API that allows you to pass data down through a tree of components without having to use props. Its main goal is to enable incremental rendering of the virtual DOM.

18. What is a pure function? Do all React components have to act like pure functions with respect to their props?
    A pure function is a function that doesn’t depend on and doesn’t modify the states of variables out of its scope. Essentially, this means that a pure function will always return the same result given the same parameters so yes.

19. Is JSX a regular JavaScript object?
    JSX is a syntax extension to JavaScript and comes with the full power of JavaScript. After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

20. Explain Lifecycle phases of a React Component?
    Initial/Mount Phase: This is the phase when the components start the journey of their life to make their way to DOM.
    Updating Phase: At the time when components are added to DOM and update and rendered when a state or prop changes occur.
    Unmounting Phase: This is called the final phase of the component in which the component gets destroyed.
21. What does shouldComponentUpdate() do?
    This method returns true or false value to determine whether if a component will be updated or not.

22. How can you access the state of a component inside a member function?
    Using this.state. The state is a data structure that starts with a default value when a Component mounts. It may be mutated across time, mostly as a result of user events.

23. When is lifecycle method componentWillReceiveProps() called?
    This method is invoked as soon as the props are updated before another render is called.

24. What is a ref?
    Refs are the shorthand for References in React. Refs are used to getting the reference to a DOM node or an instance of a component in React.

25. What is Babel?
    Babel is the tool that is used by React to compile JSX and other ES6 code and evaluate into JavaScript Objects representing ES5 JS Code. Browsers cannot read JSX syntax.

26. To render multiple components or items in an array, what do you use?
    We use JavaScript’s map() function.

27. How would you prevent a component from rendering?
    Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods.

28. What are events in react?
    In React, events are the triggered reactions to specific actions like mouse hover, mouse click, key press, etc.

29. What is conditional rendering?
    In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application. This is called Conditional Rendering. In React it works the same way conditions work in JavaScript. Use JavaScript operators like if or the conditional operator to create elements representing the current state, and let React update the UI to match them.

30. What are the keys?
    Keys in React are used to identify unique elements in Virtual DOM.

    > [Originally published at javabeginnerstutorial.com](https://javabeginnerstutorial.com/javascript-2/reactjs-interview-questions/)

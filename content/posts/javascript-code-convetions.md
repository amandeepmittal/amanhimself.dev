---
date: '2016-01-08'
title: 'JavaScript Code Conventions'
thumbnail: '/thumbnails/js.png'
slug: 'javascript-code-conventions'
tag: 'javascript'
canonicalUrl: 'https://amanhimself.dev/blog/javascript-code-conventions/'
---

This article is about coding conventions. Everywhere I read articles about complex things in programming, links to other good/better/awesome articles, but nobody seems to talk about the basic things in programming.

Like the coding conventions used by programmers in their work, I am a JavaScript enthusiast, and never once did I came across a good article on basic conventions and guidelines to write code that is helpful for me and others to read my code.

Thus, this is my attempt, and this article contains some general coding conventions as well as some specific guidelines only applicable to JavaScript.

## So what are Code Conventions?

These are the guidelines about programming practices, file and directory structure, and commenting.

Now you may be wondering why do you need guidelines for files and directory structure? Well, to keep it simple, and when working in a team, you have to follow some rules for a specific file structure for that application. Otherwise, it will be a huge mess.

## Style Guidelines

They are the type of Code Convention that includes the layout of the code within a file.

## Indentation

The first thing to do when writing code in a file is how to handle indentation.

```js
if (num === 1) {
  for (i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      //some code
    } else if (array[i] === array.length) {
      // code
    }
  }
}
```

Observe in the previous example there is a flow. This is what indentation is all about. It makes the program readable. The else if statement is used for the if statement inside the for loop and not the outside if statement.

Two ways to achieve indentation:

- using tabs
- using spaces

**Using Tabs**
For each indentation level, use one tab character. Thus, the second level will have two tab characters and so on.

**Using Space**

Each indentation level is made up of multiple spaces. The levels contain spaces in pairs, like two spaces for the first level, four spaces for the second level, etc.

The advantage of using spaces over tabs is that all text editors are configured according to spaces and are treated exactly the same. The disadvantage here is to put spaces in each line. Thankfully, we are in an era where text editors are smart enough and they automatically do indentation.

## Avoid ASI Automatic Semicolon Insertion

Avoiding semicolons is possible, and if JavaScript has a mechanism called ASI, why the hell care about semicolons? If you are comfortable with ASI carry on. But the rules of ASI are complex, and using your time in writing code rather than worrying about ASI is better.

It causes errors, and sometimes things won’t work because the JavaScript parser may read things differently from the way they are written.

Also, semicolons improve the readability of the code for other programmers too. If you are working collaboratively, it’s a great help.

## Avoid Horizontal Scrolling

The recommended length of code in a line is 80 characters. Even though the text editors have become smart, the length of 80 characters has is still used as a convention.

## Blank Lines are not harmful

Using blank lines to separate unrelated lines of code. It improves readability.

Without blank lines:

```js
if (num === 1) {
  for (i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      //some code
    } else if (array[i] === array.length) {
      // code
    }
  }
}
```

With blank lines:

```js
if (num === 1) {
  for (i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      //some code
    } else if (array[i] === array.length) {
      // code
    }
  }
}
```

## Naming Convention

ECMAScript uses camelCase convention. You should too when naming Variables and Functions. And try to use meaningful names for those variables and functions and keep them short.

## Function Naming

In JS, all we do is make functions in the form of callbacks and events. Author of Maintainable Javascript Nicholas Zakas introduces some common conventions for functions. I find this helpful:

- can Function that returns a boolean
- has Function that returns a boolean
- is a Function that returns a boolean
- get Function that returns a non boolean
- set Function that is used to save a value

## Constructors

Constructors are functions too and are used to create objects via a new operator. But avoid using camelCase and use PascalCase instead.

It is helpful since JavaScript uses the same for naming pre-defined constructors.

## Comments

For single-line comments, I observed this when using JSLint, after // use a space between them(the two slashes) and the comment.

```js
// Single-Line Comment
```

> Following all conventions can be hard and a stressful matter at times when you are focusing on the logic part of the code. Thus, there is an alternative that works for me most of the time, is the [Beautify](https://atom.io/packages/atom-beautify) package that I use in the text editor [Atom](http://www.atom.io/) and I am sure it is available for the majority of other text editors.

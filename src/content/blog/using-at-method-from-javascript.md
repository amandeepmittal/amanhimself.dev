---
title: Using at() method in JavaScript to get the last item from an array
author: Aman Mittal
pubDatetime: 2025-02-05T00:00:01Z
slug: using-at-method-from-javascript
featured: false
draft: false
tags:
  - javascript
description: ''
---

There are different ways in JavaScript to get the list item of an array. Recently, I learned about the `at()` method, and this post explores the traditional approach to getting the last item and the approach of using the `at()` method.

Let's assume you have the following array in your JavaScript code:

```js
const numbers = [1, 2, 3, 4];
```

Getting the last item of the array can be done by manually calculating the array's length and reducing `1` since the first item of the array is indexed at `0`, the second item is indexed at `1`, and so on.

```js
const lastItem = numbers[numbers.length - 1];
```

You can use the `slice()` method, which extracts a portion of an array and returns another array. Pass the `-1` as an argument to this method so it counts from the end of the array and then includes `[0]` so the return value is a number and not an array.

```js
const lastItem = numbers.slice(-1)[0];
```

There's another way you can extract the last item from the `numbers` array. You can use the `at()` method and pass the index value as an argument to this method to get the desired value.

Both positive and negative numbers can be passed as index values to this method. So, in the example of the `numbers` array, you can pass the `-1`, which tells this method to get the last item from this array.

```js
const lastItem = numbers.at(-1);
```

In the above example, the `-1` index will always point to the last item of the array.

When seeing this method in the code, the intent is clear; it is used to get a specific item from the array input.

The `at()` method works with any array-like object:

```js
// Strings
const message = 'Hello';

console.log(greeting.at(-2)); // Output: "l"
```

Comparing the `at()` method with `slice()` or doing manual calculations with the `length` property, the `at()` method is a much more readable solution. It also doesn't require calculating by inverting the array to read the last item from the array.

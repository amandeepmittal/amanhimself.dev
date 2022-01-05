---
title: 'GET Request params with Axios'
date: '2021-08-11'
thumbnail: '/thumbnails/js.png'
slug: 'get-request-params-with-axios'
tag: 'javascript'
canonicalUrl: 'https://amanhimself.dev/blog/get-request-params-with-axios/'
---

One of the popular libraries in JavaScript land to perform HTTP requests is [axios](https://github.com/axios/axios). It is promised based and allows writing code using `async await` syntax.

## Installation

Run the command below:

```bash
yarn add axios
```

## Simple GET HTTP request with axios

A simple GET HTTP request may look like:

```js
axios.get({
  url: `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`,
  method: 'get'
});
```

This returns a promise object. Using async await syntax, the promise object can be resolved.

```js
export const getPopularMovies = async () => {
  try {
    return await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`
    );
  } catch (error) {
    console.error(`[API RESPONSE ERROR]: ${error}`);
  }
};
```

## Adding parameters to GET requests

A GET response can contain parameters. With Axios you can add parameters to the URL:

```js
axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`);
```

Or can use `params` property in the options:

```js
axios.get(`${BASE_URL}/movie/popular`, {
  params: {
    api_key: API_KEY,
    page: pageNumber
  }
});
```

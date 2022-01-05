---
title: 'Converting a Buffer to JSON and Utf8 Strings in Nodejs'
date: '2017-08-10'
thumbnail: '/thumbnails/node.png'
slug: 'converting-a-buffer-to-json-and-utf8-strings-in-nodejs'
tag: 'nodejs'
canonicalUrl: 'https://amanhimself.dev/blog/converting-a-buffer-to-json-and-utf8-strings-in-nodejs'
---

Nodejs and browser based JavaScript differ because Node has a way to handle binary data even before the ES6 draft came up with `ArrayBuffer`. In Node, `Buffer` class is the primary data structure used with most I/O operations. It is a raw binary data that is allocated outside the V8 heap and once allocated, cannot be resized.

Before Nodejs v6.0, to create a new buffer you could just call the constructor function with `new` keyword:

```js
let newBuff = new Buffer('New String');
```

To create a new buffer instance, in latest and current stable releases of Node:

```js
let newBuff = Buffer.from('New String');
```

The `new Buffer()` constructor have been deprecated and replaced by separate `Buffer.from()`, `Buffer.alloc()`, and `Buffer.allocUnsafe()` methods.

More information can be read through [**official documentation**](https://nodejs.org/api/buffer.html).

### Convert a Buffer to JSON

Buffers can convert to JSON.

```js
let bufferOne = Buffer.from('This is a buffer example.');
console.log(bufferOne);

// Output: <Buffer 54 68 69 73 20 69 73 20 61 20 62 75 66
// 66 65 72 20 65 78 61 6d 70 6c 65 2e>

let json = JSON.stringify(bufferOne);
console.log(json);

// Output: {"type":"Buffer","data":[84,104,105,115,32,105,
// 115,32,97,32,98,117,102,102,101,114,32,101,120,97,109,
// 112,108,101,46]}
```

The JSON specifies that the type of object being transformed is a `Buffer`, and its data.

### Convert JSON to Buffer

```js
let bufferOriginal = Buffer.from(JSON.parse(json).data);
console.log(bufferOriginal);

// Output: <Buffer 54 68 69 73 20 69 73 20 61 20 62 75 66
// 66 65 72 20 65 78 61 6d 70 6c 65 2e>
```

### Convert Buffer to Utf-8 String

```js
console.log(bufferOriginal.toString('utf8'));

// Output: This is a buffer example.
```

`.toString()` is not the only way to convert a buffer to a string. Also, it by defaults converts to a utf-8 format string.

The other way to convert a buffer to a string is using `StringDecoder` core module from Nodejs API.

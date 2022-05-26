---
title: 'Common Prop Types in TypeScript and React'
date: '2021-06-29'
slug: 'common-prop-types-in-typescript-and-react'
thumbnail: '/thumbnails/typescript.png'
tag: 'typescript'
canonicalUrl: 'https://amanhimself.dev/blog/common-prop-types-in-typescript-and-react'
---

All **primitives in JS** are available in TS.

```ts
type Props = {
  size: number;
  name: string;
  disabled: boolean;
};
```

An **object** **type** is simply an empty object or an object with keys. An empty object can have any number of properties and values.

If the object is defined explicitly with keys, it will only accept those values. The shape of the object will remain certain.

```ts
type Props = {
  emptyObject: {};
  product: {
    id: string;
    price: number;
  };
};
```

Using square brackets `[]`, an **array type** is defined:

```ts
type ListProps = {
  items: string[];
};
```

The prop `items` here only expects values in the array of `string` type. To define an array of objects of a certain shape:

```ts
type ListProps = {
  items: {
    id: string;
    name: string;
    price: number;
  }[];
};
```

TypeScript does not asks you to define the shape of each object. Although, refactoring `ListProps` as below is valid:

```ts
type Item = {
  id: string;
  name: string;
  price: number;
};

type ListProps = {
  item: Item;
  items: Item[];
};
```

Using **[union type](https://react-typescript-cheatsheet.netlify.app/docs/basic/troubleshooting/types/#union-types-and-type-guarding)**, certain values for a prop can be described as:

```ts
type Button = {
  variant: 'primary' | 'danger' | 'info';
  value: string | number;
};
```

TypeScript cares when it comes to passing arguments on a function.

```ts
type Props = {
  onEventListener: () => void; // some times event listeners do not have return type
  onChangeText: (title: string) => void;
};
```

On a function, it is possible to define return type as inline type declaration:

```ts
function add(x: number, y: number): number {
  return a + b;
}
```

---
title: Mapped types in TypeScript
author: Aman Mittal
pubDatetime: 2025-01-29T00:00:01Z
slug: mapped-types-in-typescript
featured: false
draft: false
tags:
  - typescript
description: ''
---

As per [TypeScript's documentation](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html), mapped types can be used to avoid repeating the type information inside a new type. A mapped type might look complex at first glance, but they do save the repetition.

A mapped type allows to create a new type based on existing ones. This new type then can map over the property of the existing type without the needing to redefine those types.

To understand this, let's start with a JavaScript object. The following `pokemonColors` is a simple object that contains three pokemon properties:

```ts
const pokemonColors = {
  fire: 'red',
  water: 'blue',
  grass: 'green'
};
```

Each property has its own color value to resemble the type of the pokemon. Also notice that each color value is manually typed to its pokemon type. Writing this in TypeScript will become:

```ts
interface PokemonTypeColorMap {
  fire: string;
  water: string;
  grass: string;
}
```

This is fine. Each pokemon type defined is of type string. That is something not going to change through out the pokemon data set. Also, if you want to add more pokemon types, you will have to update this interface manually.

Using mapped types, you can avoid manually managing this interface. Instead of writing each property, you can define the list of types:

```ts
type PokemonType = 'fire' | 'water' | 'grass';
```

This type is a union of strings.This is important because a mapped type only works with a union of strings or numbers or symbols.

Now, you can create mapped type to create properties for each type:

```ts
type PokemonTypeColorMap = {
  [Type in PokemonType]: string;
};
```

The `Type in PokemonType` is actual pokemon type property and the `: string` means each property holds a string value. The maintenance of `PokemonType` also becomes a bit easier. When you add a new property type to the `PokemonType`, all you need to do is expand the union of strings.

Now, when defining the color values for a pokemon property type, you can use `PokemonColors` type:

```ts
export const Colors: PokemonTypeColorMap = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850'
};
```

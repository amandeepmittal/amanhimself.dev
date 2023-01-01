---
title: "When to use keyExtractor prop in React Native's FlatList"
slug: 'use-key-extractor-in-react-native-flatlist'
date: '2022-03-27'
thumbnail: '/thumbnails/react.png'
tag: 'react-native'
canonicalUrl: 'https://amanhimself.dev/blog/use-key-extractor-in-react-native-flatlist'
---

![cover_image](https://i.imgur.com/sRxXsyt.png)

In React Native, the [FlatList component](https://reactnative.dev/docs/flatlist) works well to render a long list of data. It renders only the items are shown on the screen in a scrolling list and not all the data items at once.

To render a scrollable list of items using `FlatList`, you need to pass the required `data` prop to the component. The `data` prop accepts an array of items. Each item in the array represents a single item in the list. Another required prop is `renderItem`, which takes an item from the `data` and renders it on the list. This prop accepts a function that returns the JSX to be rendered.

To display an item in the scrollable list, the `FlatList` component requires that each item has a unique key such as an `id`. This key is what allows the `FlatList` component (since it uses [VirtualizedList](https://reactnative.dev/docs/virtualizedlist) under the hood) to track the order of items in the list. The key from the data array is extracted using the `keyExtractor` prop on the `FlatList` component.

In this post, let's talk about where you might need to use `keyExtractor` and what scenarios it is not required.

## Display a list of items using FlatList

Consider the following structure of data. There are ten items in the array, and each item has two properties, `id` and `title`. The `id` is the unique key for each item.

```js
const DATA_WITH_ID = [
  {
    id: 1,
    title: 'quidem molestiae enim'
  },
  {
    id: 2,
    title: 'sunt qui excepturi placeat culpa'
  },
  {
    id: 3,
    title: 'omnis laborum odio'
  },
  {
    id: 4,
    title: 'non esse culpa molestiae omnis sed optio'
  },
  {
    id: 5,
    title: 'eaque aut omnis a'
  },
  {
    id: 6,
    title: 'natus impedit quibusdam illo est'
  },
  {
    id: 7,
    title: 'quibusdam autem aliquid et et quia'
  },
  {
    id: 8,
    title: 'qui fuga est a eum'
  },
  {
    id: 9,
    title: 'saepe unde necessitatibus rem'
  },
  {
    id: 10,
    title: 'distinctio laborum qui'
  }
];
```

Using the `FlatList` component, you want to render the `title` of each item as shown below:

```js
export default function App() {
  const renderList = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={DATA_WITH_ID} renderItem={renderList} />
    </View>
  );
}
```

The result of the above component will display a list of items without any errors or warnings. In addition, the `FlatList` component doesn't require a unique key to identify each item since the original data structure already contains a key called `id`.

Here is the output on a device's screen from the above snippet:

![ss2](https://i.imgur.com/ShoysNV.png)

## Using the keyExtractor prop

By default, the `keyExtractor` prop checks for properties like `key` and `id` (in that order). If any of the two is present in the original data structure, it will be considered a the unique key by the `FlatList` component. In this case(as in the previous example), you do not have to explicitly use the `keyExtractor` prop.

If none of them are provided, the `FlatList` component will throw a warning "VirtualizedList: missing keys for items ...":

![ss1](https://i.imgur.com/0zN4FXy.png)

Now, let's consider a scenario where array of data contains a unique key with each list item but the name of the unique key is neither `key` nor `id`. It contains a unique key property with the name of `userId`.

```js
const DATA_WITH_USER_ID = [
  {
    userId: 1,
    title: 'quidem molestiae enim'
  },
  {
    userId: 2,
    title: 'sunt qui excepturi placeat culpa'
  },
  {
    userId: 3,
    title: 'omnis laborum odio'
  },
  {
    userId: 4,
    title: 'non esse culpa molestiae omnis sed optio'
  },
  {
    userId: 5,
    title: 'eaque aut omnis a'
  },
  {
    userId: 6,
    title: 'natus impedit quibusdam illo est'
  },
  {
    userId: 7,
    title: 'quibusdam autem aliquid et et quia'
  },
  {
    userId: 8,
    title: 'qui fuga est a eum'
  },
  {
    userId: 9,
    title: 'saepe unde necessitatibus rem'
  },
  {
    userId: 10,
    title: 'distinctio laborum qui'
  }
];
```

When rendering the list, you will see the warning in this case because the `FlatList` component doesn't recognize the `userId` as the `key` or `id` name in the original data structure.

For custom key names such as `userId` in the example above, the `keyExtractor` prop is used. It extracts the unique key name and its value and tells the `FlatList` component to track the items based on that value.

For the above array of data, modify the `FlatList` component and use the `keyExtractor` prop to extract the key:

```js
<FlatList
  data={DATA_WITH_ID}
  renderItem={renderList}
  keyExtractor={item => item.userId}
/>
```

The warning will also disappear after this step.

## Conclusion

When using a `FlatList` component, if the data array has a unique `id` or a `key` property, you do not need to use the `keyExtractor` prop explicitly. However, for custom id names, use the `keyExtractor` prop to explicitly tell the component which unique key to extract.

If you like to learn more about React Native, check out the [React Native category](https://amanhimself.dev/tags/react-native/) and [Expo category](https://amanhimself.dev/tags/expo/) pages on my blog. You can also subscribe my [newsletter](https://amanhimself.substack.com/) or follow on [Twitter](https://twitter.com/amanhimself) to get updates on whenever I publish a new article or tutorial.

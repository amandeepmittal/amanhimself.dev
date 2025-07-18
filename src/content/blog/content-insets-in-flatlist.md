---
title: 'Content insets with FlatList in React Native'
author: Aman Mittal
pubDatetime: 2025-07-18T00:00:01Z
slug: content-insets-with-flatlist
featured: false
draft: false
tags:
  - react-native
  - expo
description: ''
---

In this quick post, let's explore how to use content insets available within FlatList in React Native to ensure that the content is properly presented behind the header. This post is a continuation of [Header blur effect in Expo Router](/blog/blur-effect-in-header-with-expo-router).

## Current approach: using `useHeaderHeight` hook

In React Native apps, `FlatList` is a component that renders a list of items. It is a common component that can be used to render a list of items in a scrollable container.

In previous tutorial, `useHeaderHeight` hook was used to get the height of the header and then use it to offset the content for iOS devices.

```tsx
import { useHeaderHeight } from '@react-navigation/elements';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <FlatList
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' ? headerHeight : 0
      }}
    />
  );
}
```

The `headerHeight` is then applied as `paddingTop` to the `FlatList` component's `contentContainerStyle` and it is made available using `@react-navigation/elements` library.

There's nothing wrong with the approach of calculating the header height manually using `useHeaderHeight` hook. However, the core list view component in React Native provides a way to handle content insets by passing a couple of props to the `FlatList` component. However, `FlatList`, and more over the underlying `ScrollView` component, has a property called `contentInsetAdjustmentBehavior` that can be used to adjust the content insets of the `FlatList` component.

## Using `contentInsetAdjustmentBehavior` and `automaticallyAdjustContentInsets`

Content insets define padding or margins that should be applied to scrollable content to prevent it from being obscured by system elements like the status bar, notches, or navigation bars. Without proper inset management, your content might extend under these UI elements, making parts of it inaccessible.

The `FlatList` component uses the same two props that `ScrollView` does: `contentInsetAdjustmentBehavior` and `automaticallyAdjustContentInsets`. The `contentInsetAdjustmentBehavior` prop can be set to `automatic` to automatically adjust the content insets based on the safe area and navigation bars. The `automaticallyAdjustContentInsets` prop can be set to `true` to enable this automatic adjustment.

```tsx
<FlatList
  data={trendingManga}
  renderItem={renderMangaItem}
  showsVerticalScrollIndicator={false}
  contentInsetAdjustmentBehavior="automatic"
  automaticallyAdjustContentInsets={true}
  ListHeaderComponent={<Text style={styles.sectionTitle}>Trending Manga</Text>}
/>
```

You won't need to use `useHeaderHeight` hook anymore. The `contentInsetAdjustmentBehavior` and `automaticallyAdjustContentInsets` work together to ensure that the content starts at the appropriate position, accounting for the transparent header, without requiring manual height calculations. This change results in the same behavior as the previous approach:

<img src="/images/react-native/manga-list-08.png" width="540" />

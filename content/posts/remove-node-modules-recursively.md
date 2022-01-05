---
date: '2017-09-10'
title: 'Remove node_modules Recursively'
thumbnail: '/thumbnails/node.png'
slug: 'remove-node-modules-recursively'
tag: 'nodejs'
canonicalUrl: 'https://amanhimself.dev/blog/remove-node-modules-recursively/'
---

`node_modules` tend to take a lot of space in your local system especially if you work with Node.js or related frameworks (such as client side frameworks: React or Angular). They are the part and parcel of modern day JavaScript applications and workflow.

Each day `npm` registry is getting around [350 million downloads](https://twitter.com/seldo/status/864298310785310720) daily, at the current time of writing this post. That's almost 2.2 billion downloads per week and you can take the calculation further.

Here’s Laurie Voss [(@seldo)](https://twitter.com/seldo) [tweet](https://twitter.com/seldo/status/864298310785310720), sharing the aforementioned details:

<img src='https://cdn-images-1.medium.com/max/800/0*HHMm699bdI2QMoOy.jpg' />

Nonetheless, after all your efforts are paid of and everything is deployed and is over cloud, either Github or some deployment service you or your client prefers, I think it will be generous to remove `node_modules` that take useful space on our local machines (especially, Mac users with limited GigaBytes of SSD).

There’s a simple command that you can run in your terminal either in a folder or from the root.

```shell
find . -name "node_modules" -exec rm -rf '{}' +
```

This will delete `node_modules` folder in every local repository/directory that's on your system so take precaution or exclude those projects that you are currently working on.

However, don’t panic. Everything can be back to normal just by going into the project’s directory and running package installing command:

```shell
npm install
```

I have used this command earlier today it saved me up to 9 GB of space from local system over several projects that I am currently not working or are already on [Github](https://github.com/amandeepmittal).

I even replaced `node_modules` with `bower_components` to do the same thing:

```shell
find . -name "bower_components" -exec rm -rf '{}' +
```

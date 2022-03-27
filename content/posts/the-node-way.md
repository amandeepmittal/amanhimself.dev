---
title: 'The Node way - Philosophy of a Platform'
date: '2016-03-10'
thumbnail: '/thumbnails/node.png'
slug: 'the-node-way'
tag: 'nodejs'
canonicalUrl: 'https://amanhimself.dev/blog/the-node-way/'
---

Last week, when [Node.js](https://nodejs.org/en/blog/) community introduced its logo, it got me into thinking of why this technology as fresh in my mind as when I was first introduced to it a few months back. Why is that spark still ignited in the back of my head? The answer to this is the philosophy behind the technology of Node.js platform.

Every platform has its own philosophy, its own set of rules, its own principles and guidelines. This is necessary for the evolution of a platform and is important for developing an application using that platform. (Otherwise, we all can get carried away.) Node.js has its own philosophy, since its a platform, and it manages to find a middleground between JavaScript and UNIX.

Two of the most important principles of UNIX that are adaptable in Node.js are:

- Modularity, keeping simple parts short, connected with clean interfaces.
- A program should do one thing and it should do that awesomely.

Other rules described by Eric Steven Raymond in [The Art of UNIX Programming](http://www.catb.org/esr/writings/taoup/html/index.html) might fit to some extent but the two aforementioned are necessary to use Node.js pragmatically.

In Node.js this pragmaticism is provided the by a ‘module’. Module is the fundamental to structure the code of a program in Node.js. Module is also the building block of a package. (A package is any application or reusable libraries).

The principle here is to design small modules in terms of code and in terms of application scope. This principle provides:

- reusability of code
- easier to understand the code
- thus, making it simple to test and maintain

---

Another important aspect in the Node Philosophy is the dependency of each package. Writing a Node.js application, one tends to use a lot of packages (which is the genesis of Node.js Ecosystem: npm) and this might create a common problem known as: dependency hell. To overcome this conflict, Node.js manages dependencies of each installed package to have its own separate set of dependencies.

---
title: 'Add Environment Variables in a Netlify Deployment'
date: '2020-09-01'
slug: 'add-environment-variables-in-netlify-deployment'
thumbnail: '/thumbnails/netlify.png'
tag: 'nodejs'
canonicalUrl: 'https://amanhimsefl.dev/blog/add-environment-variables-in-netlify-deployment/'
---

![cover_image](https://i.imgur.com/SX2uERE.png)

Recently I migrated my blog (the one you reading right now) from [Gatsby](https://www.gatsbyjs.com/) to [Next.js](https://nextjs.org/) for some specific reasons. The first reason, me being curious about how Next.js works and how is the developer experience. The second one, I want to have minimal effort and spend less time in managing a blog's UI and spend more time on writing posts. Lately, the vice versa has been the reality.

To not write every CSS element from scratch for responsive design, I am using [Chakra UI](https://blog.logrocket.com/how-to-create-forms-with-chakra-ui-in-react-apps/) for this blog which is a UI component library for React apps. It serves the purpose.

## The idea for the post

The idea of the post came from a problem of my own. Since I am a fan of minimal effort, this blog has been running from a [GitHub repository](https://github.com/amandeepmittal/amanhimself.dev) deployed with [Netlify](https://www.netlify.com/).

There are many advantages to this bare infrastructure such as free HTTPS certificate, using a custom domain, and so on. This way, Netlify manages continuous deployment runs the build command from a Gatsby or a Next.js rendered site. It also triggers a deployment whenever there is a new commit pushed in the GitHub repository.

## The problem that leads me to use an environment variable

That said, let's get back to the main topic. After deploying the blog with 90+ posts, I ran into an issue that is known as "Allocation failed - JavaScript heap out of memory" in Node.js world.

The issue occurs when the deployment build runs out of memory. Node.js does not handle this by rolling back and moves forward with the build which eventually concludes in the build to fail.

Regardless of what stack or framework you use to deploy your site, if the deployment instance is using a node server, one day you might run into an issue as shown below.

![ss1](https://i.imgur.com/heymZ2D.png)

## The good "Old space" problem in V8

Diving further I got to learn a new thing even though I've been using Node.js since the starting of my own developer career. This issue occurs when the memory consumption of garbage collection in V8 reaches its max limit. If the limit is exceeded, V8 kills the process.

> More information on this issue can be found on [Stackoverflow here](https://stackoverflow.com/questions/48387040/nodejs-recommended-max-old-space-size/48392705). It also explains, when to increase the memory and when to avoid.

## Increasing the memory limit with Environment Variable

According to Chris McCraw's answer [here](https://community.netlify.com/t/fatal-error-call-and-retry-last-allocation-failed-javascript-heap-out-of-memory/1840/4), a Netlify build (if not using an Enterprise plan) should not exceed the limit of 3GB for reliability. In the same thread, there is a proper solution and that leads to the use of environment variables.

If you face this problem using the same approach with Netlify as I did, or for some other reason you want to use environment variables, here is how to get started. Step one is to go to your deployment on Netlify and click the option **Deploy Settings**.

![ss2](https://i.imgur.com/qjEP2pR.png)

This is where all the deployment-related settings are stored. On the next screen, observe a sidebar and under the tab **Build & deploy** there is a sub-tab called **Environment**. Click on that and then click on the button **Edit variables**. Now, you can add the key and value for each environment variable as shown below.

![ss3](https://i.imgur.com/5NKWri1.png)

## Further reading

Here is a list of all the links I came across when resolving this issue. Might be helpful:

- [The JavaScript heap out of memory thread](https://community.netlify.com/t/fatal-error-call-and-retry-last-allocation-failed-javascript-heap-out-of-memory/1840/4)
- [The Stackoverflow thread that explains shortcomings of V8 in managing memory](https://stackoverflow.com/questions/48387040/nodejs-recommended-max-old-space-size/48392705)
- [Features of Netlify + GitHub app](https://github.com/apps/netlify)

---
slug: how-to-build-a-hacker-news-app-with-react-and-next-js
date: 2019-01-16
title: 'How To Build a Hacker News App with React and Next.js'
categories: ['reactjs, nextjs']
description:  '---'
published: true
author: 'Aman Mittal'
banner:
---

![](https://cdn-images-1.medium.com/max/2560/1*jnpVKN2bUercq2dZdZ8zbw.png)

Building (or cloning) a JavaScript-based app using React as the front-end framework comes with some challenges. You want to focus on building and shipping the application rather than spending too much time configuring, code-splitting, determining content loading architecture, and bundling it all together in order to serve it as a web application.

_Welcome, Next.js!_

I appreciate Next.js as a React framework because it addresses the above-mentioned problems and is, more or less, a zero-configuration framework for React applications. For example, when you are releasing a public app or a website, you need to render the content so that search engines can index your website. Next.js tends to solve this common challenge by handling server-side rendering for you.

**In this tutorial, we are going to build a small Hacker News React app using the Next.js framework.** By completing this tutorial, you will have experience with setting up and building an app with Next.js, and you will hopefully also get a feel for just how much it handles for you, out of the box.

In this tutorial, we’ll cover:

- Getting Started with Next.js
- Building a ‘Hello World’ App
- Creating `pages`
- Routing in Next.js
- Building a Real Time App (a mini Hacker News clone)
- Fetching data from third party api
- Significant use of `getInitialProps` in any Next.js app
- Built-in components like `Link` , `Error` , and `Head`
- Learn how to use `styled-jsx` to style Next applications
- Implement Pagination using a third party API and `query` parameters

> [**Try out the Crowdbotics App Builder to instantly scaffold and deploy a React app.**](https://app.crowdbotics.com/dashboard/?utm_campaign=cb-medium&utm_source=blog-post&utm_medium=Medium&utm_content=react-native)

### ⚙️ Pre-requisites

To continue with this tutorial, you will need the following:

- `npm` installed on your machine.
- Knowledge of ES6 JavaScript features such anonymous arrow functions `=>`, `import` and `export` statements, `async/await` and so on.
- `React` itself

### First Universal JavaScript App

A Next.js project can be easily initialized using `npm`.

Create a new directory, traverse inside it, and install the following dependencies.

```shell
mkdir react-next-demo

cd react-next-demo

# Initialize npm demo

npm init --yes

npm install -S next react react-dom
```

The next step is to edit the `package.json` file with following `scripts`.

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

If you run the command `npm run dev` now, there will be an error stating that there is a missing `pages` folder. The name of this folder is significant, which we will discuss later. For right now, create a new folder `pages` in the root of your project and inside create a new file called `index.js` with the following content.

```js
import React from 'react'

export default () => <h1>👋 Hello from Nextjs </h1>
```

The file-system of your project is the main API that Next uses to serve on the client. Every `.js` file becomes a route and gets rendered.

Now run the `npm run dev` command from your terminal and go to URL `http://localhost:3000/` to see the following result.

![](https://cdn-images-1.medium.com/max/800/1*eAllT222QETZdlyL_aKuSw.png)

> **Note** that you can define your own port as a command line option when running the `dev` script. `npm run dev -- -p <your port here>`. `3000` is the default port used by Next when there is no custom port number defined.

Now, in a typical React project, you might have webpack to bundle your component files, or in our case `pages/index.js` and use Babel to transpile the JavaScript/JSX code inside it. Next does this automatically for you. Another important aspect to notice here is that Next uses _Hot Code Reloading_ when in development mode. Any changes you make inside `index.js` file are going to be automatically reflected in the browser window.

![](https://cdn-images-1.medium.com/max/800/1*H58dRvq4D-XyLJcb4o_a2w.png)

### Creating Pages

The `pages` directory here is the routing system Next uses. There is no need for `react-router` or any other routing library integration. Now let us add another page. Create a new file called `second.js` with the following content.

```js
import React from 'react'

export default () => (
  <div>
    <h1>Second Page</h1>
  </div>
)
```

This page can be simply accessed using the URL `http://localhost:3000/second`. You can even have sub-directories and use them as a normal route. For example, create a new sub-directory inside `pages/crypto/index.js` with a file and the following code.

```js
export default () => (
  <div>
    <p>This is a Crypto App!</p>
  </div>
)
```

To see this in action, visit the URL `http://localhost:3000/crypto` and see the following message in the browser window.

![](https://cdn-images-1.medium.com/max/800/1*Zq4_NmQeU-JfawGanTr-Jg.png)

Another thing to notice here is that we are not using the `import React...` statement in `crypto/index.js` file. You can use anything from React in Next without having to import it. Next has its own presets when compiling the code and adds that for you. If you want to see how it does that, you will notice that in your project there is a hidden directory called `.next`. Visit this path: `.next/static/development/pages/crypto` to view how Next is rendering our routes behind the scene. You will also notice it uses Webpack.

### Routing in Next.js

Now we have three pages in the Next.js project.

In this section, I’ll show you how to do a proper client-side navigation in Next.js that is SEO friendly. In order to support client-side navigation, let us use Next.js’ Link API, which is exported via `next/link`.

Edit both `index.js` and `second.js` files like below in order to make this recipe work.

```js
// index.js
import Link from 'next/link'

export default () => (
  <div>
    <h1>👋 Hello from Nextjs </h1>
    <Link href="/second">
      <a>Second Page</a>
    </Link>
  </div>
)
```

In the above code snippet, notice that the `href` attribute is used on `Link` rather than `<a>` tag. This is the Next.js way of doing things. Also, using anchor tag inside `<Link>` makes it SEO friendly.

```js
// second.js
import Link from 'next/link'

export default () => (
  <div>
    <h1>Second Page </h1>
    <Link href="/index">
      <a>Home Page</a>
    </Link>
  </div>
)
```

You can verify the results below.

![](https://cdn-images-1.medium.com/max/800/1*Awn_COfQc2YLBjFezGlHjQ.gif)

### 🚀 Building a Real Time App

So far we have covered (some of) the basics of Next.js.

From this section onwards, you are going to build a real-time application using Next.js and apply the routing knowledge you just learned.

You are going to build a Hacker News clone using the [Y Combinator](https://medium.com/u/cb8adc841a29) Hacker News API. Along the way, you’ll learn an important concept of using APIs in a Next.js application. Let’s get started!

### Initializing the Project

You can start a new project and follow the same procedure of initializing it with `npm` and installing the required dependencies. Once you have done that, create the `pages/` directory and add a home page in a file called `index.js`. Run the `npm run dev` command and see if everything is working fine.

```js
export default () => (
  <div>
    <h1>Hacker News Clone</h1>
  </div>
)
```

Now, let’s install a dependency that is going to make AJAX requests to the Hacker News API to fetch stories and help us display them through our own custom React components. Install the following package from your terminal.

```shell
npm install -S isomorphic-fetch
```

Why are we using this package instead of the `fetch` API that comes with latest JavaScript or even a more popular module like `axios` that is common in React community?

The `fetch` API is a just a polyfill for browsers which do not have it available as a function yet. The `fetch` API adds the function itself to the `window` object of your browser. The package you are going to use `isomorphic-fetch` is an implementation of fetch for both the server (the _Node.js part_) and the browser build up on that polyfill.

### Fetching Data from the API

Now, let us fetch those stories from the API. For our demo purpose, I am going to use an open-source API called [**node-HNAPI**](https://github.com/cheeaun/node-hnapi/). Edit the `index.js` file by importing `fetch` from `isomorphic-fetch`, creating a class component from `React.Components` and initializing the props in order to fetch the stories.

```js
import fetch from 'isomorphic-fetch'

class Index extends React.Component {
  static async getInitialProps() {
    let stories

    try {
      const response = await fetch(
        'https://node-hnapi.herokuapp.com/news?page=1'
      )
      stories = await response.json()
    } catch (err) {
      console.log(err)
      stories = []
    }

    return { stories }
  }

  render() {
    const { stories } = this.props
    return (
      <div>
        <h1>Hacker News Clone</h1>
        <div>
          {stories.map(story => (
            <h3 key={story.id}>{story.title}</h3>
          ))}
        </div>
      </div>
    )
  }
}

export default Index
```

To load data when the home page of the application loads, in Next.js we use, `getInitialProps` which is an `async` method. This means, it can fetch the data required asynchronously and resolves the result or `response` object in the case above into a plain JavaScript object that populates React's `props`. Data returned from `getInitialProps` is serialized when server rendering, similar to a `JSON.stringify`.

> One thing to remember here is that, in any Next app, you can only use `getInitialProps` in a file that exists inside the `pages/` directory. It cannot be used with children components.

Using `try/catch` block, we are fetching `stories` from the API URL `https://node-hnapi.herokuapp.com/news?page=1`. The significance of using `try/catch` will become clear to you later as we are going to deliberately cause an error in the app and hook a way to handle it.

Lastly, the `render` function gets `stories` from `this.props` and using JavaScript's `map` we can query on the array which currently holds the data to display it on the screen. Try running the `npm run dev` command and see the following result like below.

![](https://cdn-images-1.medium.com/max/800/1*1X1MKyxp4KeNeA-nYzsQHA.png)

### Using built-in Error Page

Next.js provides a built-in error page to display to the user in a case when there is a problem fetching the data from the API. This is available through `Error` Component from `next/error` and can be used directly in the code. Modify the `index.js` file like below.

```js
import fetch from 'isomorphic-fetch'
import Error from 'next/error'

class Index extends React.Component {
  static async getInitialProps() {
    let stories

    try {
      const response = await fetch(
        // TODO: change this back to
        // TODO:  https://node-hnapi.herokuapp.com/news?page=1
        // MODIFY THIS LINE TO POINT TO AN UNKNOWN API LINK
        'https://node-hnapi.herokuapp.com/abs'
      )
      stories = await response.json()
    } catch (err) {
      console.log(err)
      // RETURN EMPTY Stories when there is an error
      stories = []
    }

    return { stories }
  }

  render() {
    const { stories } = this.props

    if (stories.length === 0) {
      return <Error statusCode={503} />
    }

    return (
      <div>
        <h1>Hacker News Clone</h1>
        <div>
          {stories.map(story => (
            <h3 key={story.id}>{story.title}</h3>
          ))}
        </div>
      </div>
    )
  }
}

export default Index
```

In the above snippet, the API link is not correct. It will not fetch the data and instead show a weird error that is recommended not to be shown on the client side because the end user doesn’t care about the specific error. That is for us to handle. Changing the previously working API URL to error-causing non-functional URL: `https://node-hnapi.herokuapp.com/abs`, is handled in the render function using the built-in `Error` component as shown above.

Do take a note that, we are passing an empty array to stories in the `catch` block to check if the stories are unavailable due to some reason, we can display the following to the end user.

![](https://cdn-images-1.medium.com/max/800/1*zEfD8R1kBovzaAzqcHleYA.png)

After this step, leave out the built-in error part but change the API URL back to `https://node-hnapi.herokuapp.com/news?page=1` and things will start working again.

### Using Components in Next.js

Using re-usable components in Next.js is completely identical to how you would do the process in any React application. This certainly clarifies the beginner doubts related to _Next.js is all about pages_. Let’s build one for ourselves.

Create a new directory in the root of the project and name it `components`. Inside it, create a new component `StoryList.js` with the following code.

```js
const StoryList = ({ stories }) => (
  <div>
    {stories.map(story => (
      <h3 key={story.id}>{story.title}</h3>
    ))}
  </div>
)

export default StoryList
```

This component receives all stories from the page `index.js` as props. To make this work, you will have to import this component inside `index.js` and pass stories that are being fetched from the API as `props`.

```js
import StoryList from '../components/StoryList'

// {...}

return (
  <div>
    <h1>Hacker News Clone</h1>
    <StoryList stories={stories} />
  </div>
)
```

We’ll now continue to build the component in order to display other details we are getting them from the API. If you visit the API URL `https://node-hnapi.herokuapp.com/news?page=1` you will notice that each story is an object that contains different information including `points`, comment counts and the link to the individual story to its original URL. We start by importing the `Link` from `next/link`.

![](https://cdn-images-1.medium.com/max/1200/1*CyzMmWVIg0fhSDa5RooZbQ.png)

We are going to leverage that object. Modify `StoryList` component like below.

```js
import Link from 'next/link'

const StoryList = ({ stories }) => (
  <div className="story-list">
    {stories.map(story => (
      <div key={story.id} className="story">
        <h2 className="story-title">
          <a href={story.url}>{story.title}</a>
        </h2>
        <div className="story-detail">
          <span>{story.points || 0} points</span>
          <Link href={`/story?id=${story.id}`}>
            <a>{story.comments_count || 0} comments</a>
          </Link>
        </div>
      </div>
    ))}
  </div>
)

export default StoryList
```

The title is another link that will re-direct you to the link of the original post but does not use Next’s `Link` component.

![](https://cdn-images-1.medium.com/max/800/1*tr0UiaZVkvpZeEMSth7TSA.png)

### Styling Components in Next.js

So far, our Hacker News Clone does what we are telling it to do. However, the look and feel are unappealing. In this section, you are going to make it look decent. Next.js comes pre-loaded with a CSS framework called [styled-jsx](https://github.com/zeit/styled-jsx) to design your React components. It allows you to write scoped CSS rules inside your component using the familiar CSS syntax.

Normally, in a React app, you can use `style={{}}` directly to add styling. In Next.js, you do not use `style` directly. Instead, you use `<style jsx></style>` element and all styles are written inside a template string.

Open `StoryList.js` to add the following styling.

```js
import Link from 'next/link'

const StoryList = ({ stories }) => (
  <div className="story-list">
    {stories.map(story => (
      <div key={story.id} className="story">
        <h2 className="story-title">
          <a href={story.url} target="_blank">
            {story.title}
          </a>
        </h2>
        <div className="story-detail">
          <span>{story.points || 0} points</span>
          <Link href={`/story?id=${story.id}`}>
            <a>{story.comments_count || 0} comments</a>
          </Link>
        </div>
      </div>
    ))}

    <style jsx>
      {`
        .story-list {
          padding: 0 1em;
        }
        .story {
          padding: 1em 0;
        }
        .story-title {
          font-size: 1rem;
          font-weight: 400;
          margin: 0;
          margin-bottom: 0.5rem;
        }
        .story-title a {
          color: #444444;
          text-decoration: none;
        }
        .story-title a:hover,
        .story-detail a:hover {
          text-decoration: underline;
        }
        .story-detail {
          font-size: 0.8rem;
          font-weight: bold;
        }
        .story-detail span {
          margin-right: 1rem;
        }
        .story-detail a {
          color: #ffa500;
          text-decoration: none;
        }
      `}
    </style>
  </div>
)

export default StoryList
```

Visiting the home page URL in the browser window, you will get a similar look.

![](https://cdn-images-1.medium.com/max/800/1*31X7TJLSebgu4I7ayL60xg.png)

This looks okay but if we are making a simple clone, putting a bit more effort can result in similar results. Create a new component called `Layout.js` inside `components/`. This will be like the navigation menu bar on the original Hacker News site.

```js
import Link from 'next/link'

const Layout = ({ children }) => (
  <div>
    <div className="container">
      <nav>
        <Link>
          <a>
            <span className="title">Hacker News Clone</span>
          </a>
        </Link>
      </nav>
      {children}
    </div>

    <style jsx>{`
      .container {
        max-width: 960px;
        margin: 0 auto;
        background: #f6f6ee;
      }
      nav {
        background: #ffa600;
        padding: 1em;
      }
      nav > * {
        display: inline-block;
        color: #000000;
      }
      nav a {
        text-decoration: none;
      }
      nav .main-title {
        font-weight: bold;
      }
    `}</style>
    <style global jsx>
      {`
        body {
          background: white;
        }
      `}
    </style>
  </div>
)

export default Layout
```

From the above code, you can note that is a simple component that has its own styling with one navigation item, the title. Do notice how we are defining the global styles using `<style global jsx>`. These styles are going to be applied to any children component of this component. This component also accepts `children` components. In our case, that is going to be the `StoryList` component. Open the `pages/index.js` file, import the `Layout` component and change the render method.

```js
import Layout from '../components/Layout'

// ...

return (
  <Layout>
    <StoryList stories={stories} />
  </Layout>
)
```

![](https://cdn-images-1.medium.com/max/800/1*eV8Y1Xjk9uWvnOnJslIxeA.png)

### Head Component In Next.js

Right now, if you take a look at the browser window, in the title section of the tab, you won’t see anything other than `localhost...`.

![](https://cdn-images-1.medium.com/max/800/1*wyPiVTGjy17mgJ7NUcE6pA.png)

This notifies us that we are missing a `head` element which is used to set the title of any page on any website or application dynamically. Next has a custom `Head` component that can be imported from `next/head`. From our `index.js` we are going to send the title of the app as props.

```js
return (
  <Layout title="Hacker News Clone">
    <StoryList stories={stories} />
  </Layout>
)
```

To receive these props, open `Layout.js` and add the following.

```js
import Link from 'next/link'
import Head from 'next/head'

const Layout = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <div className="container">
      <nav>
        <Link>
          <a>
            <span className="title">{title}</span>
          </a>
        </Link>
      </nav>
      {children}
    </div>

    <style jsx>{/* STYLE REMAINS SAME*/}</style>
    <style global jsx>
      {`
        body {
          background: white;
        }
      `}
    </style>
  </div>
)

export default Layout
```

`Head` component can be used for SEO purposes like by adding a `description`. I am not going to go into SEO details here as it will be out of the context of this article.

### Pagination

In this section, you are going to implement a dynamic way to fetch stories from Hacker News API endpoint that are listed on page two, three and so on. Currently, on the home page, the stories that are being displayed are only from the first page of the Hacker News API. If you remember the URL `'https://node-hnapi.herokuapp.com/news?page=1'` you can see, we have hardcoded the query parameters `page=1`.

The `getInitialProps` in Next provides a `context` of the server that further contains details about the `req` and the `res`, where both are HTTP objects for request and response. Another parameter we can pass in it is called `query` which is generally defined as the string section of URL parsed as an object.

Now, we are going to define a custom variable called `page` inside the `getInitialProps`. By default, its value is going to be `1` which indicates that initially, it will be loading the first page. To fetch the next page, it will get increment by `1` every time the user clicks a button. Then we pass this page variable as `props` to the `Index` class.

```js
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import Error from 'next/error'
import Layout from '../components/Layout'
import StoryList from '../components/StoryList'

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories
    let page

    try {
      page = Number(query.page) || 1

      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      )
      stories = await response.json()
    } catch (err) {
      console.log(err)
      // Return Empty Stories when there is an error
      stories = []
    }

    return { page, stories }
  }

  render() {
    const { stories, page } = this.props

    if (stories.length === 0) {
      return <Error statusCode={503} />
    }

    return (
      <Layout title="Hacker News Clone">
        <StoryList stories={stories} />

        <button>
          <Link href={`/?page=${page + 1}`}>
            <a>Load More</a>
          </Link>
        </button>

        <style jsx>
          {`
            button {
              font-size: 24px;
              font-weight: 600;
            }
            button a {
              text-decoration: none;
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default Index
```

By using `Link` component, we are defining a button that uses a dynamic approach to trigger and loads the next page from the API. Take a look at the `` href={`/?page=\${page + 1}`} ``. You will now find a **Load More** button which triggers this behavior into the action.

![](https://cdn-images-1.medium.com/max/800/1*8GcgcoQuGmwvehDTHnVV4Q.png)

Similarly, just by adding another button you can decrement the number of pages to visit the previous page.

```html
<button>
	<Link href={`/?page=${page + 1}`}>
		<a>Load More</a>
	</Link>
</button>

<button>
	<Link href={`/?page=${page - 1}`}>
		<a>Previous</a>
	</Link>
</button>
```

![](https://cdn-images-1.medium.com/max/800/1*ao7Ki5F1rYgV0RK9Uod6ug.png)

### Conclusion

This completes our tutorial.

Some of the features you can try extending from our demo are displaying comments for each individual story as the next page in this application.

**Next.js** tries to solve the problem as a framework by increasing development speed, taking of care of tooling, and bundling the application files behind the scenes. The rest is a mix of your effort, imagination, and curiosity.

The sole purpose of this tutorial was to give you quick start with NextJS, as learning a new framework can overwhelming at first.

**_The complete code of this tutorial can be found in the Github repository below. 👇_**

[**amandeepmittal/react-nextjs-demo**](https://github.com/amandeepmittal/react-nextjs-demo)

> [Originally published at Crowdbotics](https://medium.com/crowdbotics/how-to-build-a-hacker-news-app-with-react-and-next-js-5fe0c5a64c12)
